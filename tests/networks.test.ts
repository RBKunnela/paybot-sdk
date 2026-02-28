import { describe, it, expect } from 'vitest';
import {
  NETWORKS,
  USDC_CONFIG,
  getNetwork,
  getSupportedNetworks,
  EIP712_DOMAINS,
  EIP3009_TYPES,
} from '../src/networks.js';

describe('NETWORKS', () => {
  it('should include Base Sepolia (testnet)', () => {
    const net = NETWORKS['eip155:84532'];
    expect(net).toBeDefined();
    expect(net.name).toBe('Base Sepolia');
    expect(net.chainId).toBe(84532);
    expect(net.isTestnet).toBe(true);
    expect(net.usdcAddress).toMatch(/^0x[0-9a-fA-F]{40}$/);
  });

  it('should include Base Mainnet', () => {
    const net = NETWORKS['eip155:8453'];
    expect(net).toBeDefined();
    expect(net.name).toBe('Base Mainnet');
    expect(net.chainId).toBe(8453);
    expect(net.isTestnet).toBe(false);
  });
});

describe('getNetwork', () => {
  it('should return config for known CAIP-2 ID', () => {
    const net = getNetwork('eip155:84532');
    expect(net).toBeDefined();
    expect(net!.caip2).toBe('eip155:84532');
  });

  it('should return undefined for unknown CAIP-2 ID', () => {
    expect(getNetwork('eip155:99999')).toBeUndefined();
  });
});

describe('getSupportedNetworks', () => {
  it('should return array of CAIP-2 IDs', () => {
    const networks = getSupportedNetworks();
    expect(networks).toContain('eip155:8453');
    expect(networks).toContain('eip155:84532');
    expect(networks.length).toBe(2);
  });
});

describe('USDC_CONFIG', () => {
  it('should have 6 decimals', () => {
    expect(USDC_CONFIG.decimals).toBe(6);
  });

  it('should have correct symbol', () => {
    expect(USDC_CONFIG.symbol).toBe('USDC');
  });
});

describe('EIP712_DOMAINS', () => {
  it('should have domain for Base Sepolia', () => {
    const domain = EIP712_DOMAINS['eip155:84532'];
    expect(domain).toBeDefined();
    expect(domain.chainId).toBe(84532);
    expect(domain.name).toBe('USDC');
    expect(domain.verifyingContract).toMatch(/^0x/);
  });

  it('should have domain for Base Mainnet', () => {
    const domain = EIP712_DOMAINS['eip155:8453'];
    expect(domain).toBeDefined();
    expect(domain.chainId).toBe(8453);
  });

  it('should use USDC address as verifyingContract', () => {
    const domain = EIP712_DOMAINS['eip155:84532'];
    expect(domain.verifyingContract).toBe(NETWORKS['eip155:84532'].usdcAddress);
  });
});

describe('EIP3009_TYPES', () => {
  it('should define TransferWithAuthorization fields', () => {
    const fields = EIP3009_TYPES.TransferWithAuthorization;
    expect(fields).toHaveLength(6);
    const names = fields.map((f) => f.name);
    expect(names).toEqual(['from', 'to', 'value', 'validAfter', 'validBefore', 'nonce']);
  });
});
