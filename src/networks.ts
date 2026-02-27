/**
 * Supported blockchain network configurations for PayBot.
 * PoC supports Base Sepolia (testnet) and Base Mainnet.
 */

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
} as const;

/**
 * USDC token configuration shared across networks.
 */
export const USDC_CONFIG = {
  symbol: 'USDC',
  decimals: 6,
  name: 'USD Coin',
} as const;

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
