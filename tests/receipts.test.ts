import { describe, it, expect } from 'vitest';
import {
  canonicalize,
  receiptSigningPayload,
  signReceipt,
  verifyReceipt,
} from '../src/receipts.js';
import type { SignedReceipt, UnsignedReceipt } from '../src/types.js';

const payerPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const otherPrivateKey = '0x59c6995e998f97a5a0044976f5787df9739ce7bbd781e9d6d1edaea8c2ea7a9f';

function baseReceipt(): UnsignedReceipt {
  return {
    version: '1.0',
    receiptId: 'receipt_20260516_0001',
    payer: {
      botId: 'payer-bot',
      walletAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    },
    payee: {
      botId: 'payee-bot',
      walletAddress: '0x0000000000000000000000000000000000000001',
      serviceCardRef: 'https://example.com/agent-card.json',
    },
    capability: {
      id: 'text.summarize.v1',
      descriptor: 'Summarize one document',
      requestHash: 'sha256:request',
    },
    settlement: {
      txHash: '0x1234',
      network: 'eip155:8453',
      grossAmount: '100000',
      netAmount: '97500',
      timestamp: '2026-05-16T21:30:00.000Z',
    },
    artifact: {
      hash: 'sha256:artifact',
      contentType: 'text/markdown',
      uri: 'ipfs://bafyreceipt',
    },
    reputation: {
      registryUri: 'https://reputation.example.com',
      payeeRecordId: 'payee-bot',
    },
    signedBy: 'payer',
  };
}

describe('receipt signing primitives', () => {
  it('canonicalizes object keys recursively and omits undefined fields', () => {
    expect(canonicalize({
      z: 1,
      a: { b: 2, a: undefined, c: [{ y: true, x: 'ok' }] },
    })).toBe('{"a":{"b":2,"c":[{"x":"ok","y":true}]},"z":1}');
  });

  it('excludes the signature from the signing payload', () => {
    const unsigned = baseReceipt();
    const signed = {
      ...unsigned,
      signerAddress: unsigned.payer.walletAddress,
      signature: '0xdeadbeef',
    } as SignedReceipt;

    expect(receiptSigningPayload(signed)).toBe(receiptSigningPayload({
      ...unsigned,
      signerAddress: unsigned.payer.walletAddress,
    }));
    expect(receiptSigningPayload(signed)).not.toContain('deadbeef');
  });

  it('signs and verifies a receipt with the embedded signer address', async () => {
    const signed = await signReceipt(baseReceipt(), payerPrivateKey);

    expect(signed.signature).toMatch(/^0x[0-9a-f]+$/i);
    expect(signed.signerAddress).toBe('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    await expect(verifyReceipt(signed)).resolves.toBe(true);
  });

  it('rejects tampered receipt content', async () => {
    const signed = await signReceipt(baseReceipt(), payerPrivateKey);
    const tampered: SignedReceipt = {
      ...signed,
      capability: {
        ...signed.capability,
        id: 'audio.transcribe.v1',
      },
    };

    await expect(verifyReceipt(tampered)).resolves.toBe(false);
  });

  it('verifies against an explicit signer and rejects the wrong signer', async () => {
    const signed = await signReceipt(baseReceipt(), payerPrivateKey);
    const otherSigned = await signReceipt(baseReceipt(), otherPrivateKey);

    await expect(verifyReceipt(
      signed,
      '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    )).resolves.toBe(true);
    await expect(verifyReceipt(
      otherSigned,
      '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    )).resolves.toBe(false);
  });
});
