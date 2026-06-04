/**
 * @module tests/cctp
 *
 * Unit tests for the CCTP V2 cross-chain USDC bridge ({@link CctpBridge}) and
 * its registry/helpers ({@link CCTP_DOMAINS}, {@link getCctpConfig},
 * {@link addressToBytes32}).
 *
 * CCTP is V2-native (V1 sunsets 2026-07-31) and orthogonal to the x402 pay flow.
 *
 * Determinism / isolation:
 *   - ALL on-chain effects go through injected wallet/public client factories —
 *     no real chain is ever touched.
 *   - Iris polling goes through an injected `fetchImpl` — no real network I/O.
 *
 * Test naming convention: `[CATEGORY] method — should [behavior] when [condition]`.
 */

import { describe, it, expect, vi } from 'vitest';
import { keccak256, toBytes } from 'viem';

import {
  CctpBridge,
  CCTP_DOMAINS,
  CCTP_EDGE_CONTRACTS,
  DEFAULT_IRIS_API_URL,
  getCctpConfig,
  getCctpSupportedNetworks,
  addressToBytes32,
  type CctpWalletClient,
  type CctpPublicClient,
  type FetchImpl,
} from '../src/cctp.js';
import { PayBotApiError, PayBotTimeoutError } from '../src/errors.js';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const TEST_PRIVATE_KEY =
  '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318' as const;

const DEST_ADDRESS = '0x000000000000000000000000000000000000bEEF';

const BASE = 'eip155:8453';
const ARB = 'eip155:42161';
const OP = 'eip155:10';

/** Operator-injected (test) contract addresses — same-address CCTP V2 pattern. */
const OVERRIDES = {
  [BASE]: {
    tokenMessengerV2: '0x1111111111111111111111111111111111111111',
    messageTransmitterV2: '0x2222222222222222222222222222222222222222',
  },
  [ARB]: {
    tokenMessengerV2: '0x1111111111111111111111111111111111111111',
    messageTransmitterV2: '0x2222222222222222222222222222222222222222',
  },
  [OP]: {
    tokenMessengerV2: '0x1111111111111111111111111111111111111111',
    messageTransmitterV2: '0x2222222222222222222222222222222222222222',
  },
};

const MESSAGE_SENT_TOPIC = keccak256(toBytes('MessageSent(bytes)'));
const FAKE_MESSAGE = '0xdeadbeef' as const;
const FAKE_BURN_TX = '0xabc123' as `0x${string}`;
const FAKE_MINT_TX = '0xdef456' as `0x${string}`;

/**
 * Build a mock wallet client that records `writeContract` calls and returns a
 * fixed tx hash. `txHash` lets initiate/complete return distinguishable hashes.
 */
function mockWallet(txHash: `0x${string}`): {
  client: CctpWalletClient;
  calls: unknown[];
} {
  const calls: unknown[] = [];
  const client: CctpWalletClient = {
    account: { address: '0x000000000000000000000000000000000000dEaD' },
    writeContract: vi.fn(async (args: unknown) => {
      calls.push(args);
      return txHash;
    }),
  };
  return { client, calls };
}

/** Build a mock public client whose receipt carries a MessageSent log. */
function mockPublicWithMessage(message: `0x${string}` = FAKE_MESSAGE): CctpPublicClient {
  return {
    waitForTransactionReceipt: vi.fn(async () => ({
      logs: [{ data: message, topics: [MESSAGE_SENT_TOPIC] as `0x${string}`[] }],
    })),
  };
}

/** Build a mock public client whose receipt has NO MessageSent log. */
function mockPublicNoMessage(): CctpPublicClient {
  return {
    waitForTransactionReceipt: vi.fn(async () => ({
      logs: [{ data: '0x00' as `0x${string}`, topics: ['0xother' as `0x${string}`] }],
    })),
  };
}

// ===========================================================================
// CCTP_DOMAINS registry + helpers
// ===========================================================================

describe('CCTP_DOMAINS registry', () => {
  it('[UNIT] CCTP_DOMAINS — should map the 4 Phase A mainnets to verified domain ids', () => {
    expect(CCTP_DOMAINS[BASE].cctpDomain).toBe(6);
    expect(CCTP_DOMAINS[OP].cctpDomain).toBe(2);
    expect(CCTP_DOMAINS[ARB].cctpDomain).toBe(3);
    expect(CCTP_DOMAINS['eip155:137'].cctpDomain).toBe(7);
  });

  it('[UNIT] CCTP_DOMAINS — should ship null contract addresses (operator-injected, never hardcoded)', () => {
    for (const cfg of Object.values(CCTP_DOMAINS)) {
      expect(cfg.tokenMessengerV2).toBeNull();
      expect(cfg.messageTransmitterV2).toBeNull();
    }
  });

  it('[UNIT] CCTP_EDGE_CONTRACTS — should expose the one verified (EDGE domain 28) contract pair', () => {
    expect(CCTP_EDGE_CONTRACTS.cctpDomain).toBe(28);
    expect(CCTP_EDGE_CONTRACTS.tokenMessengerV2).toBe('0x28b5a0e9C621a5BadaA536219b3a228C8168cf5d');
    expect(CCTP_EDGE_CONTRACTS.messageTransmitterV2).toBe('0x81D40F21F12A8F0E3252Bccb954D722d4c464B64');
  });

  it('[UNIT] getCctpSupportedNetworks — should list exactly the supported CAIP-2 ids', () => {
    const nets = getCctpSupportedNetworks();
    expect(nets).toEqual(expect.arrayContaining([BASE, OP, ARB, 'eip155:137']));
    expect(nets).toHaveLength(4);
  });

  it('[UNIT] getCctpConfig — should return base config for a supported network with no overrides (happy)', () => {
    const cfg = getCctpConfig(ARB);
    expect(cfg).toEqual({ cctpDomain: 3, tokenMessengerV2: null, messageTransmitterV2: null });
  });

  it('[UNIT] getCctpConfig — should merge operator overrides over the base config', () => {
    const cfg = getCctpConfig(BASE, OVERRIDES);
    expect(cfg).toEqual({
      cctpDomain: 6,
      tokenMessengerV2: '0x1111111111111111111111111111111111111111',
      messageTransmitterV2: '0x2222222222222222222222222222222222222222',
    });
  });

  it('[UNIT] getCctpConfig — should return undefined for an unsupported network (edge)', () => {
    expect(getCctpConfig('eip155:1')).toBeUndefined();
    expect(getCctpConfig('solana:foo')).toBeUndefined();
  });

  it('[UNIT] DEFAULT_IRIS_API_URL — should be the public Circle Iris endpoint', () => {
    expect(DEFAULT_IRIS_API_URL).toBe('https://iris-api.circle.com');
  });
});

describe('addressToBytes32', () => {
  it('[UNIT] addressToBytes32 — should left-pad a 20-byte address to 32 bytes (happy)', () => {
    const out = addressToBytes32(DEST_ADDRESS);
    expect(out).toBe(`0x${'0'.repeat(24)}${DEST_ADDRESS.slice(2).toLowerCase()}`);
    expect(out).toHaveLength(66); // 0x + 64 hex
  });

  it('[UNIT] addressToBytes32 — should throw INVALID_ADDRESS on a malformed address (error)', () => {
    expect(() => addressToBytes32('0x123')).toThrowError(PayBotApiError);
    try {
      addressToBytes32('not-an-address');
    } catch (e) {
      expect((e as PayBotApiError).code).toBe('INVALID_ADDRESS');
    }
  });

  it('[UNIT] addressToBytes32 — should throw on a non-string input (edge)', () => {
    expect(() => addressToBytes32(undefined as unknown as string)).toThrowError(PayBotApiError);
  });
});

// ===========================================================================
// constructor
// ===========================================================================

describe('CctpBridge constructor', () => {
  it('[UNIT] constructor — should accept a 0x-prefixed wallet key (happy)', () => {
    expect(() => new CctpBridge({ walletPrivateKey: TEST_PRIVATE_KEY })).not.toThrow();
  });

  it('[UNIT] constructor — should throw when wallet key lacks 0x prefix (error)', () => {
    expect(() => new CctpBridge({ walletPrivateKey: 'deadbeef' })).toThrowError(/must start with 0x/);
  });

  it('[UNIT] constructor — should construct with no options at all (edge)', () => {
    expect(() => new CctpBridge()).not.toThrow();
  });
});

// ===========================================================================
// initiateTransfer (burn)
// ===========================================================================

describe('CctpBridge.initiateTransfer', () => {
  function buildBridge(overrides = OVERRIDES) {
    const wallet = mockWallet(FAKE_BURN_TX);
    const publicClient = mockPublicWithMessage();
    const bridge = new CctpBridge({
      walletPrivateKey: TEST_PRIVATE_KEY,
      domainOverrides: overrides,
      walletClientFactory: () => wallet.client,
      publicClientFactory: () => publicClient,
    });
    return { bridge, wallet, publicClient };
  }

  it('[UNIT] initiateTransfer — should return burnTxHash/messageHash/nonce with mocked clients (happy)', async () => {
    const { bridge } = buildBridge();
    const r = await bridge.initiateTransfer({
      amount: '1000000',
      sourceNetwork: BASE,
      destNetwork: ARB,
      destAddress: DEST_ADDRESS,
    });
    expect(r.burnTxHash).toBe(FAKE_BURN_TX);
    expect(r.messageHash).toBe(keccak256(FAKE_MESSAGE));
    expect(r.nonce).toBe(keccak256(FAKE_MESSAGE));
    expect(r.fee).toBeUndefined(); // standard transfer surfaces no fee
  });

  it('[UNIT] initiateTransfer — should call depositForBurn with the DEST domain id + bytes32 recipient', async () => {
    const { bridge, wallet } = buildBridge();
    await bridge.initiateTransfer({
      amount: '5000000',
      sourceNetwork: BASE,
      destNetwork: ARB, // CCTP domain 3
      destAddress: DEST_ADDRESS,
    });
    const call = wallet.calls[0] as {
      address: string;
      functionName: string;
      args: unknown[];
    };
    expect(call.functionName).toBe('depositForBurn');
    expect(call.address).toBe('0x1111111111111111111111111111111111111111');
    // args: [amount, destinationDomain, mintRecipient, burnToken, destinationCaller, maxFee, minFinalityThreshold]
    expect(call.args[0]).toBe(5000000n);
    expect(call.args[1]).toBe(3); // Arbitrum CCTP domain — NOT chainId 42161
    expect(call.args[2]).toBe(addressToBytes32(DEST_ADDRESS));
    expect(call.args[6]).toBe(2000); // standard → hard-finality threshold
  });

  it('[UNIT] initiateTransfer — should surface a fee + fast finality threshold for transferType:fast', async () => {
    const { bridge, wallet } = buildBridge();
    const r = await bridge.initiateTransfer({
      amount: '1000000',
      sourceNetwork: BASE,
      destNetwork: OP,
      destAddress: DEST_ADDRESS,
      transferType: 'fast',
    });
    expect(r.fee).toBe('0');
    const call = wallet.calls[0] as { args: unknown[] };
    expect(call.args[6]).toBe(1000); // fast → faster-than-finality threshold
  });

  it('[UNIT] initiateTransfer — should throw UNSUPPORTED_NETWORK for an unsupported source (error)', async () => {
    const { bridge } = buildBridge();
    await expect(
      bridge.initiateTransfer({
        amount: '1000000',
        sourceNetwork: 'eip155:1', // Ethereum — not in CCTP_DOMAINS for this SDK
        destNetwork: ARB,
        destAddress: DEST_ADDRESS,
      }),
    ).rejects.toMatchObject({ code: 'UNSUPPORTED_NETWORK' });
  });

  it('[UNIT] initiateTransfer — should throw UNSUPPORTED_NETWORK for an unsupported dest (error)', async () => {
    const { bridge } = buildBridge();
    await expect(
      bridge.initiateTransfer({
        amount: '1000000',
        sourceNetwork: BASE,
        destNetwork: 'solana:foo',
        destAddress: DEST_ADDRESS,
      }),
    ).rejects.toMatchObject({ code: 'UNSUPPORTED_NETWORK' });
  });

  it('[UNIT] initiateTransfer — should throw MISSING_WALLET_KEY when no key configured (error)', async () => {
    const bridge = new CctpBridge({
      domainOverrides: OVERRIDES,
      walletClientFactory: () => mockWallet(FAKE_BURN_TX).client,
      publicClientFactory: () => mockPublicWithMessage(),
    });
    await expect(
      bridge.initiateTransfer({
        amount: '1000000',
        sourceNetwork: BASE,
        destNetwork: ARB,
        destAddress: DEST_ADDRESS,
      }),
    ).rejects.toMatchObject({ code: 'MISSING_WALLET_KEY' });
  });

  it('[UNIT] initiateTransfer — should throw CCTP_CONTRACT_NOT_CONFIGURED when source address is null (edge)', async () => {
    // No overrides → CCTP_DOMAINS ships null tokenMessengerV2.
    const bridge = new CctpBridge({
      walletPrivateKey: TEST_PRIVATE_KEY,
      walletClientFactory: () => mockWallet(FAKE_BURN_TX).client,
      publicClientFactory: () => mockPublicWithMessage(),
    });
    await expect(
      bridge.initiateTransfer({
        amount: '1000000',
        sourceNetwork: BASE,
        destNetwork: ARB,
        destAddress: DEST_ADDRESS,
      }),
    ).rejects.toMatchObject({ code: 'CCTP_CONTRACT_NOT_CONFIGURED' });
  });

  it('[UNIT] initiateTransfer — should throw INVALID_ADDRESS for a malformed destAddress (error)', async () => {
    const { bridge } = buildBridge();
    await expect(
      bridge.initiateTransfer({
        amount: '1000000',
        sourceNetwork: BASE,
        destNetwork: ARB,
        destAddress: '0xnope',
      }),
    ).rejects.toMatchObject({ code: 'INVALID_ADDRESS' });
  });

  it('[UNIT] initiateTransfer — should throw CCTP_MESSAGE_NOT_FOUND when the receipt lacks MessageSent (edge)', async () => {
    const wallet = mockWallet(FAKE_BURN_TX);
    const bridge = new CctpBridge({
      walletPrivateKey: TEST_PRIVATE_KEY,
      domainOverrides: OVERRIDES,
      walletClientFactory: () => wallet.client,
      publicClientFactory: () => mockPublicNoMessage(),
    });
    await expect(
      bridge.initiateTransfer({
        amount: '1000000',
        sourceNetwork: BASE,
        destNetwork: ARB,
        destAddress: DEST_ADDRESS,
      }),
    ).rejects.toMatchObject({ code: 'CCTP_MESSAGE_NOT_FOUND' });
  });

  it('[UNIT] initiateTransfer — should wrap a writeContract revert as CCTP_BURN_FAILED (error)', async () => {
    const failingWallet: CctpWalletClient = {
      account: { address: '0x000000000000000000000000000000000000dEaD' },
      writeContract: vi.fn(async () => {
        throw new Error('execution reverted');
      }),
    };
    const bridge = new CctpBridge({
      walletPrivateKey: TEST_PRIVATE_KEY,
      domainOverrides: OVERRIDES,
      walletClientFactory: () => failingWallet,
      publicClientFactory: () => mockPublicWithMessage(),
    });
    await expect(
      bridge.initiateTransfer({
        amount: '1000000',
        sourceNetwork: BASE,
        destNetwork: ARB,
        destAddress: DEST_ADDRESS,
      }),
    ).rejects.toMatchObject({ code: 'CCTP_BURN_FAILED' });
  });
});

// ===========================================================================
// getAttestation (Iris polling)
// ===========================================================================

describe('CctpBridge.getAttestation', () => {
  /** Build a fetch mock returning a queued sequence of responses. */
  function fetchSequence(
    responses: Array<{ ok: boolean; status: number; body: unknown }>,
  ): { impl: FetchImpl; calls: string[] } {
    const calls: string[] = [];
    let i = 0;
    const impl: FetchImpl = async (url: string) => {
      calls.push(url);
      const r = responses[Math.min(i, responses.length - 1)];
      i++;
      return { ok: r.ok, status: r.status, json: async () => r.body };
    };
    return { impl, calls };
  }

  it('[UNIT] getAttestation — should return complete + attestation when Iris reports complete (happy)', async () => {
    const { impl } = fetchSequence([
      { ok: true, status: 200, body: { status: 'complete', attestation: '0xattest' } },
    ]);
    const bridge = new CctpBridge({ fetchImpl: impl });
    const r = await bridge.getAttestation('0xmsg');
    expect(r.status).toBe('complete');
    expect(r.attestation).toBe('0xattest');
  });

  it('[UNIT] getAttestation — should return pending when Iris still pending after the poll budget (edge)', async () => {
    const { impl } = fetchSequence([
      { ok: true, status: 200, body: { status: 'pending_confirmations' } },
    ]);
    const bridge = new CctpBridge({ fetchImpl: impl, maxAttestationPolls: 1 });
    const r = await bridge.getAttestation('0xmsg');
    expect(r.status).toBe('pending');
    expect(r.attestation).toBeUndefined();
  });

  it('[UNIT] getAttestation — should treat 404 as pending and keep polling (edge)', async () => {
    const { impl, calls } = fetchSequence([
      { ok: false, status: 404, body: {} },
      { ok: true, status: 200, body: { status: 'complete', attestation: '0xok' } },
    ]);
    const bridge = new CctpBridge({ fetchImpl: impl, maxAttestationPolls: 3 });
    const r = await bridge.getAttestation('0xmsg');
    expect(r.status).toBe('complete');
    expect(calls.length).toBe(2); // polled twice: 404 then complete
  });

  it('[UNIT] getAttestation — should throw IRIS_ERROR on a non-ok non-404 response (error)', async () => {
    const { impl } = fetchSequence([{ ok: false, status: 500, body: {} }]);
    const bridge = new CctpBridge({ fetchImpl: impl });
    await expect(bridge.getAttestation('0xmsg')).rejects.toMatchObject({ code: 'IRIS_ERROR' });
  });

  it('[UNIT] getAttestation — should throw PayBotTimeoutError when an Iris poll aborts (timeout path)', async () => {
    const abortingFetch: FetchImpl = async (_url, init) => {
      // Simulate the AbortController firing.
      const err = new Error('aborted');
      err.name = 'AbortError';
      void init;
      throw err;
    };
    const bridge = new CctpBridge({ fetchImpl: abortingFetch, irisTimeoutMs: 5 });
    await expect(bridge.getAttestation('0xmsg')).rejects.toBeInstanceOf(PayBotTimeoutError);
  });

  it('[UNIT] getAttestation — should hit the configured irisApiUrl + messageHash in the poll URL', async () => {
    const { impl, calls } = fetchSequence([
      { ok: true, status: 200, body: { status: 'complete', attestation: '0xok' } },
    ]);
    const bridge = new CctpBridge({ fetchImpl: impl, irisApiUrl: 'https://sandbox.example' });
    await bridge.getAttestation('0xMYHASH');
    expect(calls[0]).toContain('https://sandbox.example');
    expect(calls[0]).toContain('0xMYHASH');
  });
});

// ===========================================================================
// completeTransfer (mint)
// ===========================================================================

describe('CctpBridge.completeTransfer', () => {
  it('[UNIT] completeTransfer — should return mintTxHash with a mocked wallet (happy)', async () => {
    const wallet = mockWallet(FAKE_MINT_TX);
    const bridge = new CctpBridge({
      walletPrivateKey: TEST_PRIVATE_KEY,
      domainOverrides: OVERRIDES,
      walletClientFactory: () => wallet.client,
    });
    const r = await bridge.completeTransfer({
      message: FAKE_MESSAGE,
      attestation: '0xattest',
      destNetwork: ARB,
    });
    expect(r.mintTxHash).toBe(FAKE_MINT_TX);
    const call = wallet.calls[0] as { functionName: string; address: string; args: unknown[] };
    expect(call.functionName).toBe('receiveMessage');
    expect(call.address).toBe('0x2222222222222222222222222222222222222222');
    expect(call.args).toEqual([FAKE_MESSAGE, '0xattest']);
  });

  it('[UNIT] completeTransfer — should throw MISSING_WALLET_KEY when no key configured (error)', async () => {
    const bridge = new CctpBridge({
      domainOverrides: OVERRIDES,
      walletClientFactory: () => mockWallet(FAKE_MINT_TX).client,
    });
    await expect(
      bridge.completeTransfer({ message: FAKE_MESSAGE, attestation: '0xa', destNetwork: ARB }),
    ).rejects.toMatchObject({ code: 'MISSING_WALLET_KEY' });
  });

  it('[UNIT] completeTransfer — should throw UNSUPPORTED_NETWORK for an unsupported dest (error)', async () => {
    const bridge = new CctpBridge({
      walletPrivateKey: TEST_PRIVATE_KEY,
      domainOverrides: OVERRIDES,
      walletClientFactory: () => mockWallet(FAKE_MINT_TX).client,
    });
    await expect(
      bridge.completeTransfer({ message: FAKE_MESSAGE, attestation: '0xa', destNetwork: 'eip155:1' }),
    ).rejects.toMatchObject({ code: 'UNSUPPORTED_NETWORK' });
  });

  it('[UNIT] completeTransfer — should throw CCTP_CONTRACT_NOT_CONFIGURED when dest address is null (edge)', async () => {
    const bridge = new CctpBridge({
      walletPrivateKey: TEST_PRIVATE_KEY,
      walletClientFactory: () => mockWallet(FAKE_MINT_TX).client,
    });
    await expect(
      bridge.completeTransfer({ message: FAKE_MESSAGE, attestation: '0xa', destNetwork: ARB }),
    ).rejects.toMatchObject({ code: 'CCTP_CONTRACT_NOT_CONFIGURED' });
  });

  it('[UNIT] completeTransfer — should wrap a revert as CCTP_MINT_FAILED (error)', async () => {
    const failingWallet: CctpWalletClient = {
      account: { address: '0x000000000000000000000000000000000000dEaD' },
      writeContract: vi.fn(async () => {
        throw new Error('nonce already used');
      }),
    };
    const bridge = new CctpBridge({
      walletPrivateKey: TEST_PRIVATE_KEY,
      domainOverrides: OVERRIDES,
      walletClientFactory: () => failingWallet,
    });
    await expect(
      bridge.completeTransfer({ message: FAKE_MESSAGE, attestation: '0xa', destNetwork: ARB }),
    ).rejects.toMatchObject({ code: 'CCTP_MINT_FAILED' });
  });
});

// ===========================================================================
// end-to-end (all mocked) — burn → attest → mint
// ===========================================================================

describe('CctpBridge end-to-end (mocked, zero real I/O)', () => {
  it('[UNIT] full flow — should chain burn → getAttestation → completeTransfer', async () => {
    const burnWallet = mockWallet(FAKE_BURN_TX);
    const mintWallet = mockWallet(FAKE_MINT_TX);
    let firstWalletServed = false;
    const fetchImpl: FetchImpl = async () => ({
      ok: true,
      status: 200,
      json: async () => ({ status: 'complete', attestation: '0xfinal' }),
    });

    const bridge = new CctpBridge({
      walletPrivateKey: TEST_PRIVATE_KEY,
      domainOverrides: OVERRIDES,
      fetchImpl,
      // First factory call (burn) uses burnWallet; second (mint) uses mintWallet.
      walletClientFactory: () => {
        if (!firstWalletServed) {
          firstWalletServed = true;
          return burnWallet.client;
        }
        return mintWallet.client;
      },
      publicClientFactory: () => mockPublicWithMessage(),
    });

    const burn = await bridge.initiateTransfer({
      amount: '1000000',
      sourceNetwork: BASE,
      destNetwork: ARB,
      destAddress: DEST_ADDRESS,
    });
    expect(burn.burnTxHash).toBe(FAKE_BURN_TX);

    const att = await bridge.getAttestation(burn.messageHash);
    expect(att.status).toBe('complete');
    expect(att.attestation).toBe('0xfinal');

    const mint = await bridge.completeTransfer({
      message: FAKE_MESSAGE,
      attestation: att.attestation!,
      destNetwork: ARB,
    });
    expect(mint.mintTxHash).toBe(FAKE_MINT_TX);
  });
});
