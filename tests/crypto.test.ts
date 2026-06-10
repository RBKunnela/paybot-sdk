import { describe, it, expect } from 'vitest';
import { generateEIP3009Nonce } from '../src/crypto.js';

describe('generateEIP3009Nonce', () => {
  it('should return a 0x-prefixed hex string', () => {
    const nonce = generateEIP3009Nonce();
    expect(nonce).toMatch(/^0x[0-9a-f]{64}$/);
  });

  it('should return 32 bytes (64 hex chars + 0x prefix)', () => {
    const nonce = generateEIP3009Nonce();
    expect(nonce.length).toBe(66); // "0x" + 64 hex chars
  });

  it('should generate unique nonces', () => {
    const nonces = new Set(Array.from({ length: 10 }, () => generateEIP3009Nonce()));
    expect(nonces.size).toBe(10);
  });
});
