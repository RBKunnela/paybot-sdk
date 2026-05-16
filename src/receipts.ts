import { verifyMessage } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import type { SignedReceipt, UnsignedReceipt } from './types.js';

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue | undefined };

function normalize(value: unknown): JsonValue {
  if (value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(normalize);
  }
  if (typeof value === 'object') {
    const result: { [key: string]: JsonValue } = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b))) {
      if (item !== undefined) {
        result[key] = normalize(item);
      }
    }
    return result;
  }
  throw new Error(`Unsupported receipt value: ${typeof value}`);
}

function unsignedReceipt(receipt: SignedReceipt | UnsignedReceipt): UnsignedReceipt {
  const payload = { ...receipt } as Partial<SignedReceipt>;
  delete payload.signature;
  return payload as UnsignedReceipt;
}

/**
 * Canonical JSON serialization used for receipt signing.
 *
 * Object keys are sorted recursively and undefined fields are omitted so both
 * browser and server verifiers can reproduce the exact EIP-191 message bytes.
 */
export function canonicalize(value: unknown): string {
  return JSON.stringify(normalize(value));
}

/**
 * Return the canonical payload bytes represented as a string.
 * The signature field is intentionally excluded.
 */
export function receiptSigningPayload(receipt: SignedReceipt | UnsignedReceipt): string {
  return canonicalize(unsignedReceipt(receipt));
}

/**
 * Sign an unsigned receipt with an EVM private key using EIP-191.
 */
export async function signReceipt(
  receipt: UnsignedReceipt,
  privateKey: `0x${string}`
): Promise<SignedReceipt> {
  const account = privateKeyToAccount(privateKey);
  const signature = await account.signMessage({
    message: receiptSigningPayload({
      ...receipt,
      signerAddress: receipt.signerAddress ?? account.address,
    }),
  });

  return {
    ...receipt,
    signerAddress: receipt.signerAddress ?? account.address,
    signature,
  };
}

/**
 * Verify a signed receipt against its embedded signerAddress or an expected
 * signer address supplied by the caller.
 */
export async function verifyReceipt(
  receipt: SignedReceipt,
  expectedSigner?: `0x${string}`
): Promise<boolean> {
  const address = expectedSigner ?? receipt.signerAddress;
  if (!address) return false;

  return verifyMessage({
    address: address as `0x${string}`,
    message: receiptSigningPayload(receipt),
    signature: receipt.signature,
  });
}
