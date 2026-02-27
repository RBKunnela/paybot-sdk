import { randomBytes } from 'crypto';

/**
 * Generate a random bytes32 nonce for EIP-3009.
 */
export function generateEIP3009Nonce(): `0x${string}` {
  return `0x${randomBytes(32).toString('hex')}` as `0x${string}`;
}
