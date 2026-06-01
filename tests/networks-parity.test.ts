/**
 * Network parity / scaffolding guard.
 *
 * Enumerates EVERY key in {@link NETWORKS} and asserts that each chain is fully
 * wired for USDC payments. This catches a half-added chain — e.g. a network
 * present in NETWORKS but missing from TOKENS.USDC.addressByNetwork, or a
 * caip2 / chainId mismatch — before it ships.
 *
 * Per network it asserts:
 *   (a) getEip712Domain(network, 'USDC') resolves to a usable domain;
 *   (b) isSupportedCaip2(network) is true;
 *   (c) the USDC address is a 0x-prefixed 40-hex string;
 *   (d) NetworkConfig.chainId matches the numeric suffix of its CAIP-2 id;
 *   (e) the USDC address agrees across NETWORKS.usdcAddress, the TOKENS
 *       registry, and the resolved EIP-712 verifyingContract (no divergence).
 */

import { describe, it, expect } from 'vitest';
import {
  NETWORKS,
  getEip712Domain,
  isSupportedCaip2,
  getTokenAddress,
  parseCaip2,
} from '../src/networks.js';

const ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/;

const networkEntries = Object.entries(NETWORKS);

describe('NETWORKS parity (USDC scaffolding guard)', () => {
  it('should expose at least the 8 Phase A networks', () => {
    expect(networkEntries.length).toBeGreaterThanOrEqual(8);
  });

  it.each(networkEntries)('%s — config self-consistency', (caip2, config) => {
    // The map key must equal the embedded caip2 field.
    expect(config.caip2).toBe(caip2);
    expect(isSupportedCaip2(caip2)).toBe(true);

    // (d) chainId matches the numeric suffix of the CAIP-2 id.
    const { reference } = parseCaip2(caip2);
    expect(Number(reference)).toBe(config.chainId);
  });

  it.each(networkEntries)('%s — USDC address is well-formed (0x40-hex)', (_caip2, config) => {
    // (c) usable, well-formed USDC address on the network config.
    expect(config.usdcAddress).toMatch(ADDRESS_RE);
  });

  it.each(networkEntries)('%s — USDC EIP-712 domain resolves', (caip2, config) => {
    // (a) a resolvable USDC EIP-712 domain.
    const domain = getEip712Domain(caip2, 'USDC');
    expect(domain).toBeDefined();
    expect(domain!.name).toBe('USDC');
    expect(domain!.version).toBe('2');
    expect(domain!.chainId).toBe(config.chainId);
    expect(domain!.verifyingContract).toMatch(ADDRESS_RE);
  });

  it.each(networkEntries)('%s — USDC address agrees across all sources', (caip2, config) => {
    // (e) no divergence between NETWORKS.usdcAddress, the TOKENS registry, and
    // the EIP-712 verifyingContract — a single source of truth per chain.
    const registryAddress = getTokenAddress('USDC', caip2);
    expect(registryAddress).toBe(config.usdcAddress);

    const domain = getEip712Domain(caip2, 'USDC')!;
    expect(domain.verifyingContract).toBe(config.usdcAddress);
  });

  it('defaulting getEip712Domain (no symbol) resolves USDC on every network', () => {
    for (const [caip2, config] of networkEntries) {
      const domain = getEip712Domain(caip2);
      expect(domain).toBeDefined();
      expect(domain!.chainId).toBe(config.chainId);
    }
  });
});
