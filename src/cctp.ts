/**
 * @module cctp
 *
 * CCTP V2 (Circle Cross-Chain Transfer Protocol) cross-chain USDC transport for
 * paybot-sdk Phase A.
 *
 * ## What this is (and is NOT)
 *
 * CCTP moves **native USDC** from one EVM chain to another by *burning* it on
 * the source chain and *minting* an equal amount on the destination chain
 * (1:1, no liquidity pools). The flow is:
 *
 * ```
 *   depositForBurn (source TokenMessengerV2)
 *        │  burns USDC, emits a CCTP message
 *        ▼
 *   Circle Iris attestation service   ← poll until 'complete'
 *        │  signs the burn message
 *        ▼
 *   receiveMessage(message, attestation) (dest MessageTransmitterV2)
 *        │  permissionlessly mints USDC to destAddress
 * ```
 *
 * This module is **orthogonal** to the x402 / MPP pay→verify→settle flow in
 * {@link PayBotClient}. CCTP is a *transport* (get USDC onto the chain you want
 * to pay on); x402 is the *payment authorization*. CCTP is deliberately NOT
 * threaded through `client.pay()`.
 *
 * ## V2-native ONLY
 *
 * CCTP V1 entered manual phase-out starting **2026-07-31**, so this SDK speaks
 * **only** the V2 contracts (`TokenMessengerV2` / `MessageTransmitterV2`). No V1
 * code path exists.
 *
 * ## Funded-context requirement
 *
 * Both on-chain steps cost native gas: `depositForBurn` on the source chain and
 * `receiveMessage` on the destination chain. The wallet derived from
 * `walletPrivateKey` MUST be funded with native gas on BOTH chains. Minting is
 * permissionless (anyone can submit a valid attestation), but *someone* pays the
 * destination gas.
 *
 * ## Address verification status
 *
 * Domain ids are Circle-official and verified. The standard same-address V2
 * contract addresses for Base/OP/Arbitrum/Polygon were NOT available in the
 * verified reference at authoring time and are therefore left `null` in
 * {@link CCTP_DOMAINS} — they MUST be supplied by the operator via the
 * `domainOverrides` constructor option (mirrors how EURC's mainnet address is
 * operator-injected, never hardcoded). The one verified contract pair (the EDGE
 * domain, 28) is documented in {@link CCTP_EDGE_CONTRACTS} but not wired to a
 * supported network here. See the build report for the unverified flag.
 */

import type { Address } from 'viem';
import { createWalletClient, createPublicClient, http, keccak256, toBytes } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import type {
  CctpDomainConfig,
  CctpTransferRequest,
  CctpBurnResult,
  CctpAttestation,
  CctpMintResult,
  CctpTransferType,
} from './types.js';
import { NETWORKS } from './networks.js';
import { PayBotApiError, PayBotTimeoutError, getErrorMessage } from './errors.js';

/**
 * Default Circle Iris (CCTP V2) attestation API base URL.
 *
 * The v2 attestation endpoint is `${irisApiUrl}/v2/messages/{sourceDomain}?...`
 * — see {@link CctpBridge.getAttestation}. Overridable via the constructor for
 * tests / sandbox.
 */
export const DEFAULT_IRIS_API_URL = 'https://iris-api.circle.com';

/**
 * The single VERIFIED CCTP V2 contract pair from the reference: the EDGE domain
 * (domain 28). This is the documented exception to the same-address CREATE2
 * deployment. It is NOT wired to a supported network in {@link CCTP_DOMAINS}
 * (paybot-sdk Phase A does not target the EDGE chain), but it is exported so the
 * one address pair we COULD verify is not lost.
 *
 * Source: Circle CCTP V2 EVM smart-contracts reference (developers.circle.com/cctp).
 */
export const CCTP_EDGE_CONTRACTS = {
  cctpDomain: 28,
  tokenMessengerV2: '0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d',
  messageTransmitterV2: '0x81D40F21F12A8F0E3252Bccb954D722d4c464B64',
} as const;

/**
 * CCTP V2 domain + contract registry, keyed by CAIP-2 network id.
 *
 * **Domain ids are Circle-official and VERIFIED** (Ethereum=0, Avalanche=1,
 * OP=2, Arbitrum=3, Base=6, Polygon=7).
 *
 * **Contract addresses are `null`** — the standard same-address V2 deployment
 * addresses were not present in the verified reference at authoring time, so
 * they are intentionally NOT hardcoded (no invented on-chain addresses). Supply
 * them at runtime via the {@link CctpBridge} constructor `domainOverrides`
 * option. CCTP V2 deploys at the same address across standard EVM chains
 * (CREATE2), so a single override address typically applies to all of them.
 *
 * Only mainnets are seeded: the reference did not carry per-chain testnet CCTP
 * V2 addresses, and testnet contracts are also operator-injectable via the same
 * override mechanism.
 */
export const CCTP_DOMAINS: Readonly<Record<string, CctpDomainConfig>> = {
  // Base Mainnet — CCTP domain 6.
  'eip155:8453': {
    cctpDomain: 6,
    tokenMessengerV2: null,
    messageTransmitterV2: null,
  },
  // Optimism — CCTP domain 2.
  'eip155:10': {
    cctpDomain: 2,
    tokenMessengerV2: null,
    messageTransmitterV2: null,
  },
  // Arbitrum One — CCTP domain 3.
  'eip155:42161': {
    cctpDomain: 3,
    tokenMessengerV2: null,
    messageTransmitterV2: null,
  },
  // Polygon PoS — CCTP domain 7.
  'eip155:137': {
    cctpDomain: 7,
    tokenMessengerV2: null,
    messageTransmitterV2: null,
  },
} as const;

/**
 * Minimal `TokenMessengerV2.depositForBurn` ABI fragment (CCTP V2 signature).
 *
 * V2 adds `destinationCaller`, `maxFee`, and `minFinalityThreshold` over V1.
 * `maxFee` carries the Fast-Transfer fee cap; `minFinalityThreshold` selects
 * standard (hard finality) vs fast (faster-than-finality) attestation.
 */
export const TOKEN_MESSENGER_V2_ABI = [
  {
    type: 'function',
    name: 'depositForBurn',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'destinationDomain', type: 'uint32' },
      { name: 'mintRecipient', type: 'bytes32' },
      { name: 'burnToken', type: 'address' },
      { name: 'destinationCaller', type: 'bytes32' },
      { name: 'maxFee', type: 'uint256' },
      { name: 'minFinalityThreshold', type: 'uint32' },
    ],
    outputs: [],
  },
] as const;

/**
 * Minimal `MessageTransmitterV2.receiveMessage` ABI fragment.
 */
export const MESSAGE_TRANSMITTER_V2_ABI = [
  {
    type: 'function',
    name: 'receiveMessage',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'message', type: 'bytes' },
      { name: 'attestation', type: 'bytes' },
    ],
    outputs: [{ name: 'success', type: 'bool' }],
  },
] as const;

/**
 * CCTP V2 `minFinalityThreshold` values. Circle uses 2000 for fast
 * (faster-than-finality) and 1000+ for hard finality; standard transfers pass
 * the max (hard finality), fast transfers pass the lower fast threshold.
 */
const FINALITY_THRESHOLD = {
  standard: 2000, // hard finality
  fast: 1000, // faster-than-finality
} as const;

/**
 * The minimal slice of a viem WalletClient this module needs. Declaring our own
 * structural type (rather than importing viem's full `WalletClient`) keeps the
 * test seam tiny: a mock only has to implement `writeContract` + `account`.
 */
export interface CctpWalletClient {
  writeContract(args: unknown): Promise<`0x${string}`>;
  account?: { address: Address };
}

/**
 * The minimal slice of a viem PublicClient this module needs (reading the burn
 * receipt to extract the message). Kept structural for the same test-seam reason.
 */
export interface CctpPublicClient {
  waitForTransactionReceipt(args: {
    hash: `0x${string}`;
  }): Promise<{ logs: ReadonlyArray<{ data: `0x${string}`; topics: ReadonlyArray<`0x${string}`> }> }>;
}

/**
 * Factory that builds a wallet client for a given network rpcUrl + private key.
 * Injectable so tests never construct a real client or hit a chain.
 */
export type WalletClientFactory = (network: string, privateKey: string) => CctpWalletClient;

/**
 * Factory that builds a public (read) client for a given network rpcUrl.
 * Injectable so tests never construct a real client or hit a chain.
 */
export type PublicClientFactory = (network: string) => CctpPublicClient;

/** A `fetch`-shaped function, injectable so Iris polling never hits the network in tests. */
export type FetchImpl = (
  input: string,
  init?: { signal?: AbortSignal },
) => Promise<{ ok: boolean; status: number; json(): Promise<unknown> }>;

/**
 * Constructor options for {@link CctpBridge}.
 */
export interface CctpBridgeOptions {
  /** Wallet private key (0x-prefixed) used to sign burn/mint transactions. */
  walletPrivateKey?: string;
  /** Circle Iris attestation API base URL (default {@link DEFAULT_IRIS_API_URL}). */
  irisApiUrl?: string;
  /** Injected fetch implementation (default: global `fetch`). Inject in tests. */
  fetchImpl?: FetchImpl;
  /**
   * Injected wallet-client factory (default: real viem `createWalletClient`).
   * Inject a mock in tests so no real chain is touched.
   */
  walletClientFactory?: WalletClientFactory;
  /**
   * Injected public-client factory (default: real viem `createPublicClient`).
   * Inject a mock in tests so no real chain is touched.
   */
  publicClientFactory?: PublicClientFactory;
  /**
   * Operator-supplied CCTP contract addresses, keyed `caip2 → { tokenMessengerV2,
   * messageTransmitterV2 }`. Overrides the (null) entries in {@link CCTP_DOMAINS}.
   * Because CCTP V2 deploys at the same address across standard EVM chains, the
   * same pair usually applies to every supported network.
   */
  domainOverrides?: Record<string, { tokenMessengerV2?: string; messageTransmitterV2?: string }>;
  /** Max attestation polls before {@link CctpBridge.getAttestation} times out (default 1). */
  maxAttestationPolls?: number;
  /** Per-request timeout (ms) for an Iris poll (default 30_000). */
  irisTimeoutMs?: number;
}

/**
 * The keccak-256 of the `MessageSent(bytes)` event signature emitted by
 * `MessageTransmitterV2` on burn. Used to locate the message in the burn receipt.
 */
const MESSAGE_SENT_TOPIC = keccak256(toBytes('MessageSent(bytes)'));

/**
 * Default viem-backed wallet-client factory.
 *
 * @param network - CAIP-2 network id; its rpcUrl comes from {@link NETWORKS}.
 * @param privateKey - 0x-prefixed signer key.
 * @returns A viem WalletClient (typed down to {@link CctpWalletClient}).
 * @throws {PayBotApiError} `UNSUPPORTED_NETWORK` if the network is not in NETWORKS.
 */
function defaultWalletClientFactory(network: string, privateKey: string): CctpWalletClient {
  const cfg = NETWORKS[network];
  if (!cfg) {
    throw new PayBotApiError(`Unknown network for CCTP wallet client: ${network}`, 'UNSUPPORTED_NETWORK', 402);
  }
  const account = privateKeyToAccount(privateKey as `0x${string}`);
  return createWalletClient({ account, transport: http(cfg.rpcUrl) }) as unknown as CctpWalletClient;
}

/**
 * Default viem-backed public-client factory.
 *
 * @param network - CAIP-2 network id; its rpcUrl comes from {@link NETWORKS}.
 * @returns A viem PublicClient (typed down to {@link CctpPublicClient}).
 * @throws {PayBotApiError} `UNSUPPORTED_NETWORK` if the network is not in NETWORKS.
 */
function defaultPublicClientFactory(network: string): CctpPublicClient {
  const cfg = NETWORKS[network];
  if (!cfg) {
    throw new PayBotApiError(`Unknown network for CCTP public client: ${network}`, 'UNSUPPORTED_NETWORK', 402);
  }
  return createPublicClient({ transport: http(cfg.rpcUrl) }) as unknown as CctpPublicClient;
}

/**
 * Look up the resolved CCTP config for a network, merging operator overrides.
 *
 * @param network - CAIP-2 network id.
 * @param overrides - Operator-supplied per-network address overrides.
 * @returns The merged {@link CctpDomainConfig}, or `undefined` when the network
 *          is not a CCTP-supported chain.
 */
export function getCctpConfig(
  network: string,
  overrides?: Record<string, { tokenMessengerV2?: string; messageTransmitterV2?: string }>,
): CctpDomainConfig | undefined {
  const base = CCTP_DOMAINS[network];
  if (!base) {
    return undefined;
  }
  const ov = overrides?.[network];
  if (!ov) {
    return base;
  }
  return {
    cctpDomain: base.cctpDomain,
    tokenMessengerV2: ov.tokenMessengerV2 ?? base.tokenMessengerV2,
    messageTransmitterV2: ov.messageTransmitterV2 ?? base.messageTransmitterV2,
  };
}

/**
 * List the CAIP-2 ids of every CCTP-supported network.
 *
 * @returns Array of supported CAIP-2 network ids (e.g. `['eip155:8453', ...]`).
 */
export function getCctpSupportedNetworks(): string[] {
  return Object.keys(CCTP_DOMAINS);
}

/**
 * Left-pad a 20-byte EVM address to a 32-byte (bytes32) value, as CCTP requires
 * for `mintRecipient` / `destinationCaller`.
 *
 * @param address - 0x-prefixed 20-byte EVM address.
 * @returns 0x-prefixed 32-byte hex string (12 zero bytes + the address).
 * @throws {PayBotApiError} `INVALID_ADDRESS` (400) when not a 20-byte hex address.
 */
export function addressToBytes32(address: string): `0x${string}` {
  if (typeof address !== 'string' || !/^0x[0-9a-fA-F]{40}$/.test(address)) {
    throw new PayBotApiError(
      `Invalid address for bytes32 conversion: '${address}'`,
      'INVALID_ADDRESS',
      400,
      { address },
    );
  }
  return `0x${'0'.repeat(24)}${address.slice(2).toLowerCase()}` as `0x${string}`;
}

/**
 * CCTP V2 cross-chain USDC bridge.
 *
 * Drives the burn → attest → mint flow. All external effects (chain writes,
 * receipt reads, Iris polls) go through injected seams so the whole class is
 * unit-testable with zero real I/O.
 *
 * @example
 * const bridge = new CctpBridge({
 *   walletPrivateKey: '0x...',
 *   domainOverrides: { 'eip155:8453': { tokenMessengerV2: '0x...', messageTransmitterV2: '0x...' } },
 * });
 * const burn = await bridge.initiateTransfer({
 *   amount: '1000000', sourceNetwork: 'eip155:8453', destNetwork: 'eip155:42161',
 *   destAddress: '0x...',
 * });
 * // poll Iris until complete, then completeTransfer(...)
 */
export class CctpBridge {
  private readonly walletPrivateKey?: string;
  private readonly irisApiUrl: string;
  private readonly fetchImpl: FetchImpl;
  private readonly walletClientFactory: WalletClientFactory;
  private readonly publicClientFactory: PublicClientFactory;
  private readonly domainOverrides?: Record<
    string,
    { tokenMessengerV2?: string; messageTransmitterV2?: string }
  >;
  private readonly maxAttestationPolls: number;
  private readonly irisTimeoutMs: number;

  /**
   * @param options - {@link CctpBridgeOptions}. `walletPrivateKey` must start
   *   with `0x` when provided.
   * @throws {Error} when `walletPrivateKey` is set but not 0x-prefixed.
   */
  constructor(options: CctpBridgeOptions = {}) {
    if (options.walletPrivateKey !== undefined && !options.walletPrivateKey.startsWith('0x')) {
      throw new Error('CctpBridge: walletPrivateKey must start with 0x');
    }
    this.walletPrivateKey = options.walletPrivateKey;
    this.irisApiUrl = options.irisApiUrl ?? DEFAULT_IRIS_API_URL;
    this.fetchImpl = options.fetchImpl ?? (globalThis.fetch as unknown as FetchImpl);
    this.walletClientFactory = options.walletClientFactory ?? defaultWalletClientFactory;
    this.publicClientFactory = options.publicClientFactory ?? defaultPublicClientFactory;
    this.domainOverrides = options.domainOverrides;
    this.maxAttestationPolls = options.maxAttestationPolls ?? 1;
    this.irisTimeoutMs = options.irisTimeoutMs ?? 30_000;
  }

  /**
   * Resolve a network's CCTP config or throw a typed error.
   *
   * @param network - CAIP-2 network id.
   * @param role - `'source'` or `'dest'` (for the error message).
   * @returns The resolved {@link CctpDomainConfig}.
   * @throws {PayBotApiError} `UNSUPPORTED_NETWORK` (402) when the network is not
   *   CCTP-supported.
   */
  private requireConfig(network: string, role: 'source' | 'dest'): CctpDomainConfig {
    const cfg = getCctpConfig(network, this.domainOverrides);
    if (!cfg) {
      throw new PayBotApiError(
        `CCTP ${role} network not supported: ${network}. Supported: ${getCctpSupportedNetworks().join(', ')}`,
        'UNSUPPORTED_NETWORK',
        402,
        { network, role },
      );
    }
    return cfg;
  }

  /**
   * Step 1 — burn USDC on the source chain via `TokenMessengerV2.depositForBurn`.
   *
   * Builds and submits the burn, then reads the receipt to extract the CCTP
   * message and derive its keccak-256 hash (the key for Iris polling).
   *
   * @param req - {@link CctpTransferRequest} (amount, source/dest networks, dest address, type).
   * @returns `{ burnTxHash, messageHash, nonce, fee? }` — see {@link CctpBurnResult}.
   * @throws {PayBotApiError} `MISSING_WALLET_KEY` (402) when no wallet key was configured.
   * @throws {PayBotApiError} `UNSUPPORTED_NETWORK` (402) when source/dest is not CCTP-supported.
   * @throws {PayBotApiError} `CCTP_CONTRACT_NOT_CONFIGURED` (402) when the source
   *   `tokenMessengerV2` address is null (operator must inject it).
   * @throws {PayBotApiError} `INVALID_ADDRESS` (400) when `destAddress` is malformed.
   *
   * @example
   * const r = await bridge.initiateTransfer({
   *   amount: '1000000', sourceNetwork: 'eip155:8453', destNetwork: 'eip155:10',
   *   destAddress: '0x...beef', transferType: 'fast',
   * });
   * r.burnTxHash; r.messageHash; r.nonce;
   */
  async initiateTransfer(req: CctpTransferRequest): Promise<CctpBurnResult> {
    if (!this.walletPrivateKey) {
      throw new PayBotApiError('Wallet private key required for CCTP burn', 'MISSING_WALLET_KEY', 402);
    }

    const sourceCfg = this.requireConfig(req.sourceNetwork, 'source');
    const destCfg = this.requireConfig(req.destNetwork, 'dest');

    if (!sourceCfg.tokenMessengerV2) {
      throw new PayBotApiError(
        `No TokenMessengerV2 address configured for CCTP source ${req.sourceNetwork}. ` +
          `Inject it via CctpBridge domainOverrides[${req.sourceNetwork}].tokenMessengerV2.`,
        'CCTP_CONTRACT_NOT_CONFIGURED',
        402,
        { network: req.sourceNetwork },
      );
    }

    const transferType: CctpTransferType = req.transferType ?? 'standard';
    const burnToken = NETWORKS[req.sourceNetwork]?.usdcAddress;
    if (!burnToken) {
      throw new PayBotApiError(
        `No USDC address for CCTP source ${req.sourceNetwork}`,
        'UNSUPPORTED_NETWORK',
        402,
        { network: req.sourceNetwork },
      );
    }

    const mintRecipient = addressToBytes32(req.destAddress);
    // destinationCaller = bytes32(0) → permissionless mint (anyone can call receiveMessage).
    const destinationCaller = `0x${'0'.repeat(64)}` as `0x${string}`;
    // maxFee 0 for standard; fast transfers accept a fee — left at 0 here so the
    // caller does not silently overpay. The fee field, when surfaced by Iris, is
    // reported back on completion; production callers should set a maxFee cap.
    const maxFee = 0n;

    const wallet = this.walletClientFactory(req.sourceNetwork, this.walletPrivateKey);

    let burnTxHash: `0x${string}`;
    try {
      burnTxHash = await wallet.writeContract({
        address: sourceCfg.tokenMessengerV2 as Address,
        abi: TOKEN_MESSENGER_V2_ABI,
        functionName: 'depositForBurn',
        args: [
          BigInt(req.amount),
          destCfg.cctpDomain,
          mintRecipient,
          burnToken as Address,
          destinationCaller,
          maxFee,
          FINALITY_THRESHOLD[transferType],
        ],
        account: wallet.account,
      });
    } catch (error) {
      throw new PayBotApiError(
        `CCTP depositForBurn failed: ${getErrorMessage(error)}`,
        'CCTP_BURN_FAILED',
        502,
        { sourceNetwork: req.sourceNetwork },
      );
    }

    // Read the receipt to recover the CCTP message bytes from the MessageSent log.
    const publicClient = this.publicClientFactory(req.sourceNetwork);
    const receipt = await publicClient.waitForTransactionReceipt({ hash: burnTxHash });

    const messageLog = receipt.logs.find(
      (log) => log.topics.length > 0 && log.topics[0] === MESSAGE_SENT_TOPIC,
    );
    if (!messageLog) {
      throw new PayBotApiError(
        'CCTP burn receipt missing MessageSent event — cannot derive messageHash',
        'CCTP_MESSAGE_NOT_FOUND',
        502,
        { burnTxHash },
      );
    }

    const message = messageLog.data;
    const messageHash = keccak256(message);
    // CCTP V2 nonce is the keccak of the message in the permissionless model;
    // surfaced for caller correlation. (V2 moved nonces off a sequential counter.)
    const nonce = messageHash;

    return {
      burnTxHash,
      messageHash,
      nonce,
      ...(transferType === 'fast' ? { fee: maxFee.toString() } : {}),
    };
  }

  /**
   * Step 2 — poll Circle's Iris attestation service for a burn message.
   *
   * Polls `${irisApiUrl}/v2/messages/...` (mirroring {@link PayBotClient}'s
   * fetchWithTimeout error style) up to `maxAttestationPolls` times. Returns as
   * soon as Iris reports `complete`; returns `{ status: 'pending' }` if the poll
   * budget is exhausted while still pending (NOT an error — the caller polls
   * again later).
   *
   * @param messageHash - The keccak-256 message hash from {@link initiateTransfer}.
   * @returns `{ status: 'pending' }` or `{ status: 'complete', attestation }`.
   * @throws {PayBotTimeoutError} when an individual Iris request exceeds `irisTimeoutMs`.
   * @throws {PayBotApiError} `IRIS_ERROR` (502) on a non-ok, non-404 Iris response.
   *
   * @example
   * const att = await bridge.getAttestation(messageHash);
   * if (att.status === 'complete') { await bridge.completeTransfer({ ... }); }
   */
  async getAttestation(messageHash: string): Promise<CctpAttestation> {
    let lastPending: CctpAttestation = { status: 'pending' };

    for (let attempt = 0; attempt < this.maxAttestationPolls; attempt++) {
      const url = `${this.irisApiUrl}/v2/messages/0?transactionHash=${messageHash}`;

      let response: { ok: boolean; status: number; json(): Promise<unknown> };
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.irisTimeoutMs);
      try {
        response = await this.fetchImpl(url, { signal: controller.signal });
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') {
          throw new PayBotTimeoutError(`Iris attestation poll timed out after ${this.irisTimeoutMs}ms`);
        }
        throw new PayBotApiError(
          `Iris attestation request failed: ${getErrorMessage(error)}`,
          'IRIS_ERROR',
          502,
        );
      } finally {
        clearTimeout(timeoutId);
      }

      // 404 = Iris hasn't indexed the message yet → still pending, keep polling.
      if (response.status === 404) {
        lastPending = { status: 'pending' };
        continue;
      }

      if (!response.ok) {
        throw new PayBotApiError(`Iris attestation HTTP ${response.status}`, 'IRIS_ERROR', 502, {
          httpStatus: response.status,
        });
      }

      const body = (await response.json()) as { status?: string; attestation?: string };
      if (body.status === 'complete' && typeof body.attestation === 'string') {
        return { status: 'complete', attestation: body.attestation };
      }
      lastPending = { status: 'pending' };
    }

    return lastPending;
  }

  /**
   * Step 3 — mint USDC on the destination chain via
   * `MessageTransmitterV2.receiveMessage(message, attestation)`.
   *
   * Minting is permissionless — the wallet here simply pays the destination gas
   * to relay the attested message. Requires a destination-chain-funded wallet
   * context.
   *
   * @param args - `{ message, attestation, destNetwork }`. `message` is the raw
   *   CCTP message bytes; `attestation` is the hex blob from {@link getAttestation}.
   * @returns `{ mintTxHash }` — see {@link CctpMintResult}.
   * @throws {PayBotApiError} `MISSING_WALLET_KEY` (402) when no wallet key was configured.
   * @throws {PayBotApiError} `UNSUPPORTED_NETWORK` (402) when destNetwork is not CCTP-supported.
   * @throws {PayBotApiError} `CCTP_CONTRACT_NOT_CONFIGURED` (402) when the dest
   *   `messageTransmitterV2` address is null.
   * @throws {PayBotApiError} `CCTP_MINT_FAILED` (502) when the on-chain call reverts.
   *
   * @example
   * const { mintTxHash } = await bridge.completeTransfer({
   *   message, attestation, destNetwork: 'eip155:42161',
   * });
   */
  async completeTransfer(args: {
    message: string;
    attestation: string;
    destNetwork: string;
  }): Promise<CctpMintResult> {
    if (!this.walletPrivateKey) {
      throw new PayBotApiError('Wallet private key required for CCTP mint', 'MISSING_WALLET_KEY', 402);
    }

    const destCfg = this.requireConfig(args.destNetwork, 'dest');
    if (!destCfg.messageTransmitterV2) {
      throw new PayBotApiError(
        `No MessageTransmitterV2 address configured for CCTP dest ${args.destNetwork}. ` +
          `Inject it via CctpBridge domainOverrides[${args.destNetwork}].messageTransmitterV2.`,
        'CCTP_CONTRACT_NOT_CONFIGURED',
        402,
        { network: args.destNetwork },
      );
    }

    const wallet = this.walletClientFactory(args.destNetwork, this.walletPrivateKey);

    let mintTxHash: `0x${string}`;
    try {
      mintTxHash = await wallet.writeContract({
        address: destCfg.messageTransmitterV2 as Address,
        abi: MESSAGE_TRANSMITTER_V2_ABI,
        functionName: 'receiveMessage',
        args: [args.message as `0x${string}`, args.attestation as `0x${string}`],
        account: wallet.account,
      });
    } catch (error) {
      throw new PayBotApiError(
        `CCTP receiveMessage failed: ${getErrorMessage(error)}`,
        'CCTP_MINT_FAILED',
        502,
        { destNetwork: args.destNetwork },
      );
    }

    return { mintTxHash };
  }
}
