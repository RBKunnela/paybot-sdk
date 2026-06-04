/**
 * Supported blockchain network configurations for PayBot.
 * PoC supports Base Sepolia (testnet) and Base Mainnet.
 */

import { PayBotApiError } from './errors.js';

export interface NetworkConfig {
  readonly name: string;
  readonly chainId: number;
  readonly caip2: string;
  readonly rpcUrl: string;
  readonly usdcAddress: string;
  readonly explorerUrl: string;
  readonly isTestnet: boolean;
}

export const NETWORKS: Record<string, NetworkConfig> = {
  'eip155:8453': {
    name: 'Base Mainnet',
    chainId: 8453,
    caip2: 'eip155:8453',
    rpcUrl: 'https://mainnet.base.org',
    usdcAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    explorerUrl: 'https://basescan.org',
    isTestnet: false,
  },
  'eip155:84532': {
    name: 'Base Sepolia',
    chainId: 84532,
    caip2: 'eip155:84532',
    rpcUrl: 'https://sepolia.base.org',
    usdcAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    explorerUrl: 'https://sepolia.basescan.org',
    isTestnet: true,
  },

  // --- Phase A network expansion: Optimism, Arbitrum, Polygon (+ testnets) ---
  // USDC addresses are Circle-official NATIVE USDC deployments (NOT bridged).
  // Source: developers.circle.com/stablecoins/usdc-contract-addresses.

  'eip155:10': {
    name: 'Optimism',
    chainId: 10,
    caip2: 'eip155:10',
    rpcUrl: 'https://mainnet.optimism.io',
    usdcAddress: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
    explorerUrl: 'https://optimistic.etherscan.io',
    isTestnet: false,
  },
  'eip155:11155420': {
    name: 'OP Sepolia',
    chainId: 11155420,
    caip2: 'eip155:11155420',
    rpcUrl: 'https://sepolia.optimism.io',
    usdcAddress: '0x5fd84259d66Cd46123540766Be93DFE6D43130D7',
    explorerUrl: 'https://sepolia-optimism.etherscan.io',
    isTestnet: true,
  },

  'eip155:42161': {
    name: 'Arbitrum One',
    chainId: 42161,
    caip2: 'eip155:42161',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    usdcAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    explorerUrl: 'https://arbiscan.io',
    isTestnet: false,
  },
  'eip155:421614': {
    name: 'Arbitrum Sepolia',
    chainId: 421614,
    caip2: 'eip155:421614',
    rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc',
    usdcAddress: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
    explorerUrl: 'https://sepolia.arbiscan.io',
    isTestnet: true,
  },

  'eip155:137': {
    name: 'Polygon PoS',
    chainId: 137,
    caip2: 'eip155:137',
    rpcUrl: 'https://polygon-rpc.com',
    // NATIVE USDC (0x3c49…), NOT bridged USDC.e (0x2791…) — the bridged token
    // is NOT EIP-3009/x402-compatible. See research trap note.
    usdcAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    explorerUrl: 'https://polygonscan.com',
    isTestnet: false,
  },
  'eip155:80002': {
    name: 'Polygon Amoy',
    chainId: 80002,
    caip2: 'eip155:80002',
    rpcUrl: 'https://rpc-amoy.polygon.technology',
    usdcAddress: '0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582',
    explorerUrl: 'https://amoy.polygonscan.com',
    isTestnet: true,
  },
} as const;

/**
 * USDC token configuration shared across networks.
 *
 * Kept exported for back-compat. The multi-token registry below ({@link TOKENS})
 * supersedes it for new code; this is the legacy single-token view.
 */
export const USDC_CONFIG = {
  symbol: 'USDC',
  decimals: 6,
  name: 'USD Coin',
} as const;

/**
 * Configuration for a single fungible token the SDK can pay with.
 *
 * The split between {@link TokenConfig.name} and {@link TokenConfig.eip712Name}
 * is deliberate and load-bearing for signing:
 *
 *   - `name` is the **human-readable** token name (e.g. "USD Coin").
 *   - `eip712Name` is the **on-chain EIP-712 domain name** the token's contract
 *     actually uses in its `DOMAIN_SEPARATOR` (e.g. USDC contracts sign as the
 *     literal string `"USDC"`, NOT "USD Coin"). This string is what gets hashed
 *     into the signature, so it MUST match the deployed contract byte-for-byte
 *     or every signature will be rejected.
 *
 * When `eip712Name` is omitted, {@link getEip712Domain} falls back to `name`.
 */
/**
 * The cryptographic method a token uses to authorize a gasless transfer.
 *
 * - `'eip3009'` — EIP-3009 `transferWithAuthorization`. This is the ONLY method
 *   the SDK's gasless signing path implements (USDC, EURC, PYUSD). A signed
 *   EIP-3009 authorization can be submitted by a relayer/facilitator with no gas
 *   from the payer.
 * - `'eip2612'` — EIP-2612 (or DAI's legacy non-standard) `permit`. The SDK does
 *   NOT implement a permit-based payment flow. Tokens declared `'eip2612'` are
 *   registered for discoverability/documentation but are rejected at signing
 *   time with `UNSUPPORTED_SIGNING_METHOD` — a deliberate, loud config-time
 *   refusal rather than a silent on-chain failure.
 */
export type SigningMethod = 'eip3009' | 'eip2612';

export interface TokenConfig {
  /** Token ticker symbol, used as the registry key (e.g. `'USDC'`, `'EURC'`). */
  readonly symbol: string;
  /** Number of base-unit decimals (USDC, EURC, PYUSD use 6; RLUSD, DAI use 18). */
  readonly decimals: number;
  /** Human-readable token name (e.g. `'USD Coin'`). NOT necessarily the EIP-712 name. */
  readonly name: string;
  /**
   * The on-chain EIP-712 domain `name` the token contract signs under. Defaults
   * to {@link TokenConfig.name} when absent. For USDC this is `'USDC'` (the
   * deployed Circle contract's domain name), distinct from the display name.
   */
  readonly eip712Name?: string;
  /**
   * The on-chain EIP-712 domain `version` string the token contract signs under.
   * Defaults to `'2'` when absent (USDC and EURC sign as version `'2'`). PYUSD
   * signs as version `'1'` (verified against its mainnet `DOMAIN_SEPARATOR`), so
   * it MUST set this explicitly or every PYUSD signature would be rejected.
   */
  readonly eip712Version?: string;
  /**
   * How this token authorizes a gasless transfer. Defaults to `'eip3009'` (the
   * only signing path the SDK implements). Tokens that can only `permit`
   * (`'eip2612'`) are rejected at signing time with `UNSUPPORTED_SIGNING_METHOD`.
   *
   * Defaulting to `'eip3009'` keeps USDC/EURC byte-identical (they omit the
   * field), so existing signatures are unchanged.
   */
  readonly signingMethod?: SigningMethod;
  /**
   * Map of CAIP-2 network id → the token's ERC-20 contract address on that
   * network. This public registry intentionally carries only the addresses that
   * are safe to ship open-core (e.g. testnet deployments). Mainnet addresses for
   * regulated tokens are resolved at runtime from the operator layer via
   * {@link PayBotConfig.tokenAddressOverrides} — never hardcoded here.
   */
  readonly addressByNetwork: Record<string, string>;
}

/**
 * Registry of supported tokens, keyed by ticker symbol.
 *
 * Addresses are reused from / kept in sync with the per-network `usdcAddress`
 * for USDC (do not diverge). EURC addresses are Circle's official deployments.
 */
export const TOKENS: Record<string, TokenConfig> = {
  USDC: {
    symbol: 'USDC',
    decimals: 6,
    name: 'USD Coin',
    // USDC contracts sign their EIP-712 domain as the literal "USDC".
    eip712Name: 'USDC',
    addressByNetwork: {
      // Reuses NETWORKS[...].usdcAddress — keep identical, do not diverge.
      'eip155:8453': '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      'eip155:84532': '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
      // Phase A: native USDC on Optimism / Arbitrum / Polygon (+ testnets).
      'eip155:10': '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
      'eip155:11155420': '0x5fd84259d66Cd46123540766Be93DFE6D43130D7',
      'eip155:42161': '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      'eip155:421614': '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
      'eip155:137': '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
      'eip155:80002': '0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582',
    },
  },
  EURC: {
    symbol: 'EURC',
    decimals: 6,
    name: 'EURC',
    eip712Name: 'EURC',
    // signingMethod defaults to 'eip3009' (omitted) — keeps signatures unchanged.
    addressByNetwork: {
      // Public open-core registry carries ONLY the Base Sepolia testnet
      // deployment. The EURC mainnet address is operator-private and must be
      // injected at runtime via PayBotConfig.tokenAddressOverrides — it is
      // deliberately NOT hardcoded here.
      'eip155:84532': '0x808456652fdb597867f38412077A9182bf77359F',
    },
  },

  // --- Phase A token breadth: PYUSD (working), RLUSD + DAI (documented-but-rejected) ---

  PYUSD: {
    // PayPal USD. Supports EIP-3009 transferWithAuthorization, so it fits the
    // SDK's existing gasless signing path verbatim. (No regulatory/compliance
    // framing is attached to any token here, by design.)
    symbol: 'PYUSD',
    decimals: 6,
    name: 'PayPal USD',
    // The PYUSD contract's EIP-712 domain `name` is the literal "PayPal USD"
    // and its `version` is "1" (NOT "2" like USDC/EURC) — both VERIFIED against
    // the mainnet DOMAIN_SEPARATOR (0xf0d0fba6...). Either being wrong rejects
    // every signature, so both are pinned explicitly here.
    eip712Name: 'PayPal USD',
    eip712Version: '1',
    signingMethod: 'eip3009',
    addressByNetwork: {
      // PYUSD is deployed on Ethereum mainnet (and Solana); it is NOT on Base /
      // Optimism / Arbitrum / Polygon. The address below is documentation: the
      // SDK only signs for networks present in NETWORKS, and Ethereum mainnet is
      // intentionally absent from this SDK's NETWORKS table. To pay PYUSD on a
      // supported network, supply the contract via PaymentRequest.tokenContract
      // or PayBotConfig.tokenAddressOverrides. This address is non-forbidden
      // (verify-open-core-boundary.sh) and safe to ship.
      'eip155:1': '0x6c3ea9036406852006290770BEdFcAbA0e23A0e8',
    },
  },
  RLUSD: {
    // Ripple USD. permit-ONLY (ERC-2612) — it does NOT implement EIP-3009.
    // Registered for discoverability but rejected at signing time with
    // UNSUPPORTED_SIGNING_METHOD (the SDK has no permit-based payment flow).
    symbol: 'RLUSD',
    decimals: 18, // VERIFIED on-chain (decimals() == 18) on mainnet 0x8292Bb45...
    name: 'Ripple USD',
    eip712Name: 'RLUSD',
    signingMethod: 'eip2612',
    addressByNetwork: {
      'eip155:1': '0x8292Bb45bf1Ee4d140127049757C2E0fF06317eD',
    },
  },
  DAI: {
    // MakerDAO DAI. Uses the legacy NON-standard DAI permit (NOT EIP-3009, and
    // not even standard EIP-2612 shape). Classified 'eip2612' here only to route
    // it through the same loud UNSUPPORTED_SIGNING_METHOD rejection — the SDK
    // does not sign permits of any flavor.
    symbol: 'DAI',
    decimals: 18,
    name: 'Dai Stablecoin',
    eip712Name: 'Dai Stablecoin',
    signingMethod: 'eip2612',
    addressByNetwork: {
      'eip155:1': '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    },
  },
} as const;

/**
 * Look up a token's full configuration by symbol.
 *
 * @param symbol - The token ticker (e.g. `'USDC'`, `'EURC'`). Case-sensitive.
 * @returns The {@link TokenConfig}, or `undefined` when the symbol is unknown.
 *
 * @example
 *   getToken('USDC')?.decimals; // 6
 *   getToken('DOGE');           // undefined
 */
export function getToken(symbol: string): TokenConfig | undefined {
  return TOKENS[symbol];
}

/**
 * Resolve a token's ERC-20 contract address on a specific network.
 *
 * @param symbol - The token ticker (e.g. `'USDC'`).
 * @param network - The CAIP-2 network id (e.g. `'eip155:8453'`).
 * @returns The contract address, or `undefined` when either the token is
 *          unknown OR the token is not deployed on that network.
 *
 * @example
 *   getTokenAddress('EURC', 'eip155:84532'); // '0x...' (testnet deployment)
 *   getTokenAddress('USDC', 'eip155:1');     // undefined (not deployed here)
 *   getTokenAddress('DOGE', 'eip155:8453');  // undefined (unknown token)
 */
export function getTokenAddress(symbol: string, network: string): string | undefined {
  return TOKENS[symbol]?.addressByNetwork[network];
}

/**
 * Resolve a token's contract address with an optional operator override layer.
 *
 * Resolution precedence (first match wins):
 *   1. `overrides[symbol][network]` — operator-injected address (e.g. a mainnet
 *      deployment intentionally kept out of the public registry).
 *   2. The public {@link TOKENS} registry ({@link getTokenAddress}).
 *
 * Use this instead of {@link getTokenAddress} when an operator may supply
 * addresses at runtime via {@link PayBotConfig.tokenAddressOverrides}. The
 * helper is deliberately generic — it carries no token-specific or regulatory
 * data, only the symbol→network→address lookup.
 *
 * @param symbol - The token ticker (e.g. `'USDC'`, `'EURC'`).
 * @param network - The CAIP-2 network id (e.g. `'eip155:8453'`).
 * @param overrides - Optional operator-supplied `symbol → network → address` map.
 * @returns The resolved contract address, or `undefined` when neither the
 *          override map nor the public registry has an entry.
 *
 * @example
 *   resolveTokenAddress('EURC', 'eip155:8453');                 // undefined (not public)
 *   resolveTokenAddress('EURC', 'eip155:8453', {
 *     EURC: { 'eip155:8453': '0x...' },
 *   });                                                          // '0x...' (operator-injected)
 */
export function resolveTokenAddress(
  symbol: string,
  network: string,
  overrides?: Record<string, Record<string, string>>,
): string | undefined {
  const override = overrides?.[symbol]?.[network];
  if (override) {
    return override;
  }
  return getTokenAddress(symbol, network);
}

/**
 * List the ticker symbols of all tokens in the registry.
 *
 * @returns An array of supported token symbols (e.g. `['USDC', 'EURC']`).
 *
 * @example
 *   getSupportedTokens(); // ['USDC', 'EURC']
 */
export function getSupportedTokens(): string[] {
  return Object.keys(TOKENS);
}

/**
 * Build the EIP-712 domain for signing an EIP-3009 `TransferWithAuthorization`
 * for a given token on a given network.
 *
 * The domain is token-specific: USDC signs as `name: 'USDC'` at the USDC
 * contract address; EURC signs as `name: 'EURC'` at the EURC contract address.
 * This is the multi-token generalization of the legacy {@link EIP712_DOMAINS}
 * table (which only ever held USDC).
 *
 * REGRESSION GUARANTEE: for `symbol === 'USDC'` this returns a domain
 * byte-identical to `EIP712_DOMAINS[network]` (same `name`, `version`,
 * `chainId`, `verifyingContract`), so existing USDC signatures are unchanged.
 *
 * @param network - The CAIP-2 network id (e.g. `'eip155:8453'`).
 * @param symbol - The token ticker (default `'USDC'`).
 * @param verifyingContractOverride - Optional contract address to sign against,
 *   used when the address is supplied at runtime by the operator layer (i.e. the
 *   token has no public-registry entry for `network`, such as EURC mainnet).
 *   When omitted, the address is taken from the public {@link TOKENS} registry.
 * @returns The EIP-712 domain, or `undefined` when the token is unknown, the
 *          network is unsupported, OR no contract address can be resolved
 *          (neither an override nor a public-registry entry).
 *
 * @example
 *   getEip712Domain('eip155:8453', 'USDC');
 *   // { name: 'USDC', version: '2', chainId: 8453, verifyingContract: '0x8335...' }
 *   getEip712Domain('eip155:84532', 'EURC');
 *   // { name: 'EURC', version: '2', chainId: 84532, verifyingContract: '0x...' }
 *   getEip712Domain('eip155:8453', 'EURC', '0x...'); // operator-injected mainnet address
 *   getEip712Domain('eip155:8453', 'DOGE');          // undefined
 */
export function getEip712Domain(
  network: string,
  symbol = 'USDC',
  verifyingContractOverride?: string,
): { name: string; version: string; chainId: number; verifyingContract: `0x${string}` } | undefined {
  const token = TOKENS[symbol];
  if (!token) {
    return undefined;
  }
  const verifyingContract = verifyingContractOverride ?? token.addressByNetwork[network];
  const networkConfig = NETWORKS[network];
  if (!verifyingContract || !networkConfig) {
    return undefined;
  }
  return {
    name: token.eip712Name ?? token.name,
    // Default '2' (USDC/EURC). PYUSD pins '1'. Wrong version → rejected signature.
    version: token.eip712Version ?? '2',
    chainId: networkConfig.chainId,
    verifyingContract: verifyingContract as `0x${string}`,
  };
}

/**
 * Get network config by CAIP-2 identifier.
 */
export function getNetwork(caip2: string): NetworkConfig | undefined {
  return NETWORKS[caip2];
}

/**
 * Get all supported network CAIP-2 identifiers.
 */
export function getSupportedNetworks(): string[] {
  return Object.keys(NETWORKS);
}

/**
 * Parsed components of a CAIP-2 chain identifier.
 *
 * @see https://chainagnostic.org/CAIPs/caip-2
 */
export interface Caip2 {
  /** CAIP-2 namespace (e.g. `eip155` for EVM chains). */
  namespace: string;
  /** CAIP-2 reference (e.g. `8453` — the EVM chain id). */
  reference: string;
}

/**
 * Parse a CAIP-2 identifier of the form `eip155:<chainId>` into its
 * `{ namespace, reference }` parts.
 *
 * Validates the x402-relevant `eip155` shape: the namespace MUST be `eip155`
 * and the reference MUST be a non-empty run of digits (an EVM chain id). The
 * generic CAIP-2 grammar allows other namespaces, but x402 networks are EVM
 * chains, so this helper is intentionally strict — anything else is rejected
 * rather than silently passed through.
 *
 * @param id - The CAIP-2 string to parse (e.g. `'eip155:8453'`).
 * @returns The parsed `{ namespace, reference }`.
 * @throws {PayBotApiError} code `INVALID_CAIP2` (HTTP 400) when `id` is not a
 *          well-formed `eip155:<digits>` identifier.
 *
 * @example
 *   parseCaip2('eip155:8453'); // { namespace: 'eip155', reference: '8453' }
 *   parseCaip2('solana:foo');  // throws PayBotApiError INVALID_CAIP2
 */
export function parseCaip2(id: string): Caip2 {
  if (typeof id !== 'string' || id.length === 0) {
    throw new PayBotApiError(
      `Invalid CAIP-2 identifier: expected a non-empty string, got ${typeof id}`,
      'INVALID_CAIP2',
      400,
    );
  }

  // Strict eip155:<chainId> shape. Reject extra colons, empty parts, and
  // non-digit references. (Generic CAIP-2 permits more, but x402 is EVM-only.)
  const match = /^(eip155):(\d+)$/.exec(id);
  if (!match) {
    throw new PayBotApiError(
      `Invalid CAIP-2 identifier: '${id}' is not a well-formed eip155:<chainId>`,
      'INVALID_CAIP2',
      400,
      { id },
    );
  }

  return { namespace: match[1], reference: match[2] };
}

/**
 * Test whether a CAIP-2 identifier is both well-formed AND maps to a network
 * this SDK actually supports (present in {@link NETWORKS}).
 *
 * Never throws — malformed input simply returns `false`. Use
 * {@link parseCaip2} when you want a hard error on malformed input.
 *
 * @param id - The CAIP-2 string to check.
 * @returns `true` if `id` is a supported, well-formed CAIP-2 network id.
 *
 * @example
 *   isSupportedCaip2('eip155:8453');   // true  (Base Mainnet)
 *   isSupportedCaip2('eip155:1');      // false (well-formed but unsupported)
 *   isSupportedCaip2('not-a-caip2');   // false (malformed)
 */
export function isSupportedCaip2(id: string): boolean {
  try {
    parseCaip2(id);
  } catch {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(NETWORKS, id);
}

/**
 * EIP-712 domain separators for USDC contracts.
 * Used for EIP-3009 transferWithAuthorization signature verification.
 */
export const EIP712_DOMAINS: Record<string, { name: string; version: string; chainId: number; verifyingContract: `0x${string}` }> = {
  'eip155:84532': {
    name: 'USDC',
    version: '2',
    chainId: 84532,
    verifyingContract: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
  },
  'eip155:8453': {
    name: 'USDC',
    version: '2',
    chainId: 8453,
    verifyingContract: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  },
} as const;

/**
 * EIP-3009 TransferWithAuthorization typed data definition.
 * Used for viem's signTypedData / verifyTypedData.
 */
export const EIP3009_TYPES = {
  TransferWithAuthorization: [
    { name: 'from', type: 'address' },
    { name: 'to', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'validAfter', type: 'uint256' },
    { name: 'validBefore', type: 'uint256' },
    { name: 'nonce', type: 'bytes32' },
  ],
} as const;
