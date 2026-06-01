/**
 * Phase A token breadth tests.
 *
 * Covers the {@link TokenConfig.signingMethod} discriminator and the
 * `UNSUPPORTED_SIGNING_METHOD` guard that rejects permit-only tokens (RLUSD,
 * DAI) BEFORE any signature is produced, in BOTH signing paths:
 *   - client.ts  → PayBotClient.pay() → buildPaymentPayload()
 *   - x402-v2.ts → X402Handler.signPayment() → signX402()/signUpto()
 *
 * Also asserts:
 *   - PYUSD pays via the EIP-3009 path (signs, uses the "PayPal USD" / version
 *     "1" domain);
 *   - the signingMethod default is 'eip3009' for USDC/EURC (regression — their
 *     domains and signatures are unchanged).
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getToken,
  getEip712Domain,
  TOKENS,
} from '../src/networks.js';
import { PayBotClient } from '../src/client.js';
import { X402Handler } from '../src/x402-v2.js';
import {
  PayBotApiError,
  PayBotSignatureError,
  PayBotUnsupportedSigningMethodError,
} from '../src/errors.js';
import type { PaymentPayload, PaymentRequirements } from '../src/types.js';

// A throwaway test wallet (well-known Anvil/Hardhat key #0). Never holds funds.
const TEST_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const PAY_TO = '0x0000000000000000000000000000000000000001';
// PYUSD's real Ethereum-mainnet contract (non-forbidden by the boundary
// verifier). Used as an explicit tokenContract so PYUSD can be exercised on a
// network that IS in NETWORKS (PYUSD itself only deploys on eip155:1).
const PYUSD_MAINNET = '0x6c3ea9036406852006290770BEdFcAbA0e23A0e8';

function jsonResponse(data: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
    headers: new Headers(),
  } as unknown as Response;
}

describe('TokenConfig.signingMethod discriminator', () => {
  it('[happy] USDC/EURC default to eip3009 (field omitted → regression-safe)', () => {
    // The field is intentionally ABSENT so USDC/EURC configs are byte-identical
    // to before; the effective method defaults to 'eip3009'.
    expect(TOKENS.USDC.signingMethod).toBeUndefined();
    expect(TOKENS.EURC.signingMethod).toBeUndefined();
    expect(getToken('USDC')!.signingMethod ?? 'eip3009').toBe('eip3009');
    expect(getToken('EURC')!.signingMethod ?? 'eip3009').toBe('eip3009');
  });

  it('[happy] PYUSD is an explicit eip3009 token (working)', () => {
    const pyusd = getToken('PYUSD')!;
    expect(pyusd.signingMethod).toBe('eip3009');
    expect(pyusd.decimals).toBe(6);
    expect(pyusd.eip712Name).toBe('PayPal USD');
    expect(pyusd.eip712Version).toBe('1');
  });

  it('[happy] RLUSD and DAI are eip2612 (permit-only, rejected at signing)', () => {
    expect(getToken('RLUSD')!.signingMethod).toBe('eip2612');
    expect(getToken('RLUSD')!.decimals).toBe(18);
    expect(getToken('DAI')!.signingMethod).toBe('eip2612');
    expect(getToken('DAI')!.decimals).toBe(18);
  });

  it('[regression] USDC/EURC EIP-712 domains keep version "2" (unchanged)', () => {
    expect(getEip712Domain('eip155:8453', 'USDC')!.version).toBe('2');
    expect(getEip712Domain('eip155:84532', 'EURC')!.version).toBe('2');
  });

  it('[happy] PYUSD EIP-712 domain uses name "PayPal USD" and version "1"', () => {
    // Resolved via an explicit verifyingContract override since PYUSD has no
    // entry on a NETWORKS-listed chain.
    const domain = getEip712Domain('eip155:8453', 'PYUSD', PYUSD_MAINNET)!;
    expect(domain.name).toBe('PayPal USD');
    expect(domain.version).toBe('1');
    expect(domain.verifyingContract).toBe(PYUSD_MAINNET);
  });
});

describe('PayBotUnsupportedSigningMethodError taxonomy', () => {
  it('[unit] is a PayBotSignatureError / PayBotApiError with the right code', () => {
    const err = new PayBotUnsupportedSigningMethodError('RLUSD', 'eip2612');
    expect(err).toBeInstanceOf(PayBotUnsupportedSigningMethodError);
    expect(err).toBeInstanceOf(PayBotSignatureError);
    expect(err).toBeInstanceOf(PayBotApiError);
    expect(err.code).toBe('UNSUPPORTED_SIGNING_METHOD');
    expect(err.details).toEqual({ symbol: 'RLUSD', signingMethod: 'eip2612' });
  });
});

// ---------------------------------------------------------------------------
// Path 1: client.ts — PayBotClient.pay() → buildPaymentPayload()
// ---------------------------------------------------------------------------

describe('client.ts guard — pay() rejects permit-only tokens before signing', () => {
  const mockFetch = vi.fn();
  let client: PayBotClient;

  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch);
    mockFetch.mockReset();
    client = new PayBotClient({
      apiKey: 'pb_test_key',
      botId: 'breadth-bot',
      facilitatorUrl: 'https://api.test.com',
      walletPrivateKey: TEST_KEY,
      maxRetries: 0,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('[happy] PYUSD pays via the eip3009 path — signs with the PayPal USD domain', async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ valid: true, settlementToken: 'st_pyusd', commission: {} }),
    );
    mockFetch.mockResolvedValueOnce(jsonResponse({ success: true, transaction: '0xpyusd' }));

    const result = await client.pay({
      resource: 'https://example.com',
      amount: '0.05',
      payTo: PAY_TO,
      network: 'eip155:8453',
      token: 'PYUSD',
      // PYUSD deploys only on eip155:1; supply the contract explicitly so it can
      // be paid on a NETWORKS-listed chain. This still routes through the
      // eip3009 signing path (the guard lets PYUSD through).
      tokenContract: PYUSD_MAINNET,
    });

    expect(result.success).toBe(true);
    const verifyCall = JSON.parse(mockFetch.mock.calls[0][1].body as string);
    // A real EIP-3009 signature was produced (mock format only fires w/o a key).
    const signed = JSON.parse(verifyCall.payload.payload);
    expect(signed.signature).toMatch(/^0x[a-fA-F0-9]+$/);
    // PYUSD uses 6 decimals → 0.05 == 50000 base units.
    expect(signed.value).toBe('50000');
    expect(verifyCall.requirements.asset).toBe(`eip155:8453/erc20:${PYUSD_MAINNET}`);
  });

  it('[error] RLUSD → UNSUPPORTED_SIGNING_METHOD before any network round-trip', async () => {
    const result = await client.pay({
      resource: 'https://example.com',
      amount: '0.05',
      payTo: PAY_TO,
      network: 'eip155:8453',
      token: 'RLUSD',
      tokenContract: '0x8292Bb45bf1Ee4d140127049757C2E0fF06317eD',
    });

    expect(result.success).toBe(false);
    // NOT UNSUPPORTED_TOKEN — RLUSD is a KNOWN token; it is its signing method
    // that is unsupported.
    expect(result.errorCode).toBe('UNSUPPORTED_SIGNING_METHOD');
    expect(result.error).toContain('RLUSD');
    expect(result.errorDetails).toMatchObject({ symbol: 'RLUSD', signingMethod: 'eip2612' });
    // Guard fires BEFORE signing → no verify/settle round-trip happened.
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('[error] DAI → UNSUPPORTED_SIGNING_METHOD (not UNSUPPORTED_TOKEN), no round-trip', async () => {
    const result = await client.pay({
      resource: 'https://example.com',
      amount: '1.00',
      payTo: PAY_TO,
      network: 'eip155:8453',
      token: 'DAI',
      tokenContract: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    });

    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('UNSUPPORTED_SIGNING_METHOD');
    expect(result.errorCode).not.toBe('UNSUPPORTED_TOKEN');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('[edge] guard fires even in mock mode (no wallet key) — never signs eip2612', async () => {
    const mockModeClient = new PayBotClient({
      apiKey: 'pb_test_key',
      botId: 'mock-mode-bot',
      facilitatorUrl: 'https://api.test.com',
      // no walletPrivateKey → mock signing path; the guard must STILL reject.
    });
    const result = await mockModeClient.pay({
      resource: 'https://example.com',
      amount: '0.05',
      payTo: PAY_TO,
      network: 'eip155:8453',
      token: 'DAI',
      tokenContract: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    });
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('UNSUPPORTED_SIGNING_METHOD');
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('[regression] default USDC still pays (eip3009 path unbroken by the guard)', async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ valid: true, settlementToken: 'st_u', commission: {} }),
    );
    mockFetch.mockResolvedValueOnce(jsonResponse({ success: true, transaction: '0xu' }));

    const result = await client.pay({
      resource: 'https://example.com',
      amount: '1.00',
      payTo: PAY_TO,
      network: 'eip155:8453',
      // no token → defaults to USDC (signingMethod undefined → 'eip3009').
    });
    expect(result.success).toBe(true);
    const verifyCall = JSON.parse(mockFetch.mock.calls[0][1].body as string);
    const signed = JSON.parse(verifyCall.payload.payload);
    expect(signed.signature).toMatch(/^0x[a-fA-F0-9]+$/);
  });
});

// ---------------------------------------------------------------------------
// Path 2: x402-v2.ts — X402Handler.signPayment() → signX402()/signUpto()
// ---------------------------------------------------------------------------

function buildPayload(
  token: string | undefined,
  scheme: PaymentRequirements['scheme'] = 'exact',
): PaymentPayload {
  const requirements: PaymentRequirements = {
    scheme,
    network: 'eip155:8453',
    asset: 'eip155:8453/erc20:0x0',
    amount: '50000',
    payTo: PAY_TO,
    maxTimeoutSeconds: 300,
    ...(token ? { token } : {}),
  };
  return {
    paymentIntent: {
      intentId: 'intent_breadth',
      protocol: 'x402',
      requirements,
      version: '2.0',
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 300_000).toISOString(),
    },
    requirements,
  };
}

describe('x402-v2.ts guard — signPayment rejects permit-only tokens before signing', () => {
  const handler = new X402Handler(TEST_KEY);

  it('[error] signX402 path: RLUSD → UNSUPPORTED_SIGNING_METHOD', async () => {
    await expect(handler.signPayment(buildPayload('RLUSD'))).rejects.toMatchObject({
      code: 'UNSUPPORTED_SIGNING_METHOD',
    });
    await expect(handler.signPayment(buildPayload('RLUSD'))).rejects.toBeInstanceOf(
      PayBotUnsupportedSigningMethodError,
    );
  });

  it('[error] signX402 path: DAI → UNSUPPORTED_SIGNING_METHOD (not UNSUPPORTED_TOKEN)', async () => {
    try {
      await handler.signPayment(buildPayload('DAI'));
      throw new Error('expected signPayment to throw');
    } catch (err) {
      expect((err as PayBotApiError).code).toBe('UNSUPPORTED_SIGNING_METHOD');
      expect((err as PayBotApiError).code).not.toBe('UNSUPPORTED_TOKEN');
    }
  });

  it('[error] signUpto path: RLUSD (scheme=upto) → UNSUPPORTED_SIGNING_METHOD', async () => {
    // signUpto shares resolveDomain, so the guard covers the metered path too.
    await expect(handler.signPayment(buildPayload('RLUSD', 'upto'))).rejects.toMatchObject({
      code: 'UNSUPPORTED_SIGNING_METHOD',
    });
  });

  it('[regression] USDC (default) still signs through signX402 — guard does not fire', async () => {
    const signed = await handler.signPayment(buildPayload(undefined));
    expect(signed.signature).toMatch(/^0x[a-fA-F0-9]+$/);
    expect(signed.protocol).toBe('x402');
  });

  it('[edge] unknown token still surfaces UNSUPPORTED_TOKEN (guard ordered after token lookup)', async () => {
    await expect(handler.signPayment(buildPayload('DOGE'))).rejects.toMatchObject({
      code: 'UNSUPPORTED_TOKEN',
    });
  });
});
