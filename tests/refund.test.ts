import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PayBotClient } from '../src/client.js';
import type { PayBotTracer, PayBotSpan } from '../src/telemetry.js';

// OTel SpanStatusCode mirror (1=OK, 2=ERROR).
const STATUS_OK = 1;

// --- fetch mock (mirrors tests/client.test.ts + tests/idempotency.test.ts) ---

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

function jsonResponse(data: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
    headers: new Headers(),
  } as unknown as Response;
}

/** Queue a successful /refund receipt (one refund() round-trip = 1 fetch). */
function mockSuccessfulRefund(
  overrides: Record<string, unknown> = {}
): void {
  mockFetch.mockResolvedValueOnce(
    jsonResponse({
      success: true,
      refundTxHash: '0xRefundHash',
      status: 'confirmed',
      amount: '0.05',
      network: 'eip155:84532',
      ...overrides,
    })
  );
}

const refundReq = (overrides: Record<string, unknown> = {}) => ({
  originalTxHash: '0xOriginalTxHash',
  ...overrides,
});

// --- Mock tracer / span recording every interaction (mirrors telemetry.test.ts) ---

interface RecordedSpan {
  name: string;
  attributes: Record<string, string | number | boolean>;
  status?: { code: number; message?: string };
  exceptions: unknown[];
  ended: boolean;
}

class MockSpan implements PayBotSpan {
  constructor(public readonly recorded: RecordedSpan) {}
  setAttribute(key: string, value: string | number | boolean): void {
    this.recorded.attributes[key] = value;
  }
  setStatus(status: { code: number; message?: string }): void {
    this.recorded.status = status;
  }
  recordException(err: unknown): void {
    this.recorded.exceptions.push(err);
  }
  end(): void {
    this.recorded.ended = true;
  }
}

class MockTracer implements PayBotTracer {
  public readonly spans: RecordedSpan[] = [];
  startSpan(name: string): PayBotSpan {
    const recorded: RecordedSpan = { name, attributes: {}, exceptions: [], ended: false };
    this.spans.push(recorded);
    return new MockSpan(recorded);
  }
  byName(name: string): RecordedSpan | undefined {
    return this.spans.find((s) => s.name === name);
  }
}

function newClient(extra: Record<string, unknown> = {}): PayBotClient {
  return new PayBotClient({
    apiKey: 'pb_test_key',
    botId: 'test-bot',
    facilitatorUrl: 'https://api.test.com',
    maxRetries: 0,
    ...extra,
  });
}

describe('refund() — happy path', () => {
  let client: PayBotClient;

  beforeEach(() => {
    mockFetch.mockReset();
    client = newClient();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('[UNIT] refund — returns success:true with refundTxHash/status and echoes originalTxHash', async () => {
    mockSuccessfulRefund();

    const res = await client.refund(refundReq());

    expect(res.success).toBe(true);
    expect(res.refundTxHash).toBe('0xRefundHash');
    expect(res.status).toBe('confirmed');
    expect(res.amount).toBe('0.05');
    expect(res.network).toBe('eip155:84532');
    // originalTxHash is always echoed back from the request.
    expect(res.originalTxHash).toBe('0xOriginalTxHash');
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('[UNIT] refund — POSTs to /refund with botId + originalTxHash + amount + reason', async () => {
    mockSuccessfulRefund();

    await client.refund(refundReq({ amount: '0.03', reason: 'duplicate charge' }));

    const [url, opts] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/refund');
    expect(opts.method).toBe('POST');
    const body = JSON.parse(opts.body as string);
    expect(body).toEqual({
      botId: 'test-bot',
      originalTxHash: '0xOriginalTxHash',
      amount: '0.03',
      reason: 'duplicate charge',
    });
  });

  it('[EDGE] refund — defaults status to pending when the facilitator omits it', async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ success: true, refundTxHash: '0xR' })
    );

    const res = await client.refund(refundReq());
    expect(res.success).toBe(true);
    expect(res.status).toBe('pending');
    // amount falls back to the request value (here: undefined).
    expect(res.amount).toBeUndefined();
  });
});

describe('refund() — failure (never throws)', () => {
  let client: PayBotClient;

  beforeEach(() => {
    mockFetch.mockReset();
    client = newClient();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('[ERROR] refund — core 4xx → success:false + errorCode, status failed, no throw', async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ error: 'Refund window closed', code: 'REFUND_WINDOW_CLOSED' }, 400)
    );

    const res = await client.refund(refundReq());

    expect(res.success).toBe(false);
    expect(res.status).toBe('failed');
    expect(res.error).toBe('Refund window closed');
    expect(res.errorCode).toBe('REFUND_WINDOW_CLOSED');
    // Even on failure, the original hash is echoed for caller correlation.
    expect(res.originalTxHash).toBe('0xOriginalTxHash');
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('[ERROR] refund — policy 403 → success:false with server code, never throws', async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ error: 'Trust violation', code: 'TRUST_VIOLATION' }, 403)
    );

    const res = await client.refund(refundReq());
    expect(res.success).toBe(false);
    expect(res.errorCode).toBe('TRUST_VIOLATION');
    expect(res.status).toBe('failed');
  });

  it('[ERROR] refund — network error → success:false NETWORK_ERROR, never throws', async () => {
    mockFetch.mockRejectedValue(new TypeError('socket hang up'));

    const res = await client.refund(refundReq());
    expect(res.success).toBe(false);
    expect(res.errorCode).toBe('NETWORK_ERROR');
    expect(res.status).toBe('failed');
  });
});

describe('refund() — idempotency', () => {
  let client: PayBotClient;

  beforeEach(() => {
    mockFetch.mockReset();
    client = newClient();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('[UNIT] refund — same key returns cached result (one network call)', async () => {
    mockSuccessfulRefund({ refundTxHash: '0xFIRST' });

    const first = await client.refund(refundReq({ idempotencyKey: 'r-key-1' }));
    expect(first.success).toBe(true);
    expect(mockFetch).toHaveBeenCalledTimes(1);

    // Second call: no new mocks queued, so any network access would reject.
    const second = await client.refund(refundReq({ idempotencyKey: 'r-key-1' }));
    expect(second).toEqual(first);
    expect(second.refundTxHash).toBe('0xFIRST');
    expect(mockFetch).toHaveBeenCalledTimes(1); // still only the first call
  });

  it('[UNIT] refund — sends X-Idempotency-Key on the wire when key provided', async () => {
    mockSuccessfulRefund();
    await client.refund(refundReq({ idempotencyKey: 'wire-key' }));

    const opts = mockFetch.mock.calls[0][1] as RequestInit;
    expect((opts.headers as Record<string, string>)['X-Idempotency-Key']).toBe('wire-key');
  });

  it('[EDGE] refund — omits the header when no key is provided', async () => {
    mockSuccessfulRefund();
    await client.refund(refundReq());

    const opts = mockFetch.mock.calls[0][1] as RequestInit;
    expect((opts.headers as Record<string, string>)['X-Idempotency-Key']).toBeUndefined();
  });

  it('[ERROR] refund — does NOT cache a failed refund (retry hits the network)', async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ error: 'temporary', code: 'REFUND_PENDING' }, 409)
    );
    const failed = await client.refund(refundReq({ idempotencyKey: 'r-fail' }));
    expect(failed.success).toBe(false);
    expect(mockFetch).toHaveBeenCalledTimes(1);

    // Retry with the same key must NOT short-circuit — it hits the network again.
    mockSuccessfulRefund({ refundTxHash: '0xRECOVERED' });
    const recovered = await client.refund(refundReq({ idempotencyKey: 'r-fail' }));
    expect(recovered.success).toBe(true);
    expect(recovered.refundTxHash).toBe('0xRECOVERED');
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('[EDGE] refund — caches are per-instance', async () => {
    mockSuccessfulRefund({ refundTxHash: '0xClientA' });
    const a = await client.refund(refundReq({ idempotencyKey: 'shared' }));
    expect(a.refundTxHash).toBe('0xClientA');

    const other = newClient({ botId: 'other-bot' });
    mockSuccessfulRefund({ refundTxHash: '0xClientB' });
    const b = await other.refund(refundReq({ idempotencyKey: 'shared' }));
    expect(b.refundTxHash).toBe('0xClientB');
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});

describe('refund() — telemetry', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('[INTEGRATION] refund — emits client.refund span with attrs + success/refund_tx_hash (OK)', async () => {
    const tracer = new MockTracer();
    const client = newClient({ telemetry: { tracer } });
    mockSuccessfulRefund({ refundTxHash: '0xRefundHash' });

    await client.refund(refundReq({ amount: '0.05' }));

    const span = tracer.byName('paybot.client.refund');
    expect(span).toBeDefined();
    expect(span?.attributes).toMatchObject({
      originalTxHash: '0xOriginalTxHash',
      amount: '0.05',
      bot_id: 'test-bot',
      success: true,
      refund_tx_hash: '0xRefundHash',
    });
    expect(span?.status).toEqual({ code: STATUS_OK });
    expect(span?.exceptions).toHaveLength(0);
    expect(span?.ended).toBe(true);
  });

  it('[INTEGRATION] refund — returned failure is OK span with success=false, NOT recordException', async () => {
    const tracer = new MockTracer();
    const client = newClient({ telemetry: { tracer } });
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ error: 'Trust violation', code: 'TRUST_VIOLATION' }, 403)
    );

    const res = await client.refund(refundReq());
    expect(res.success).toBe(false);

    const span = tracer.byName('paybot.client.refund');
    expect(span?.attributes.success).toBe(false);
    // A returned failure is NOT a thrown exception at the client.refund level.
    expect(span?.exceptions).toHaveLength(0);
    expect(span?.status).toEqual({ code: STATUS_OK });
    expect(span?.ended).toBe(true);
  });

  it('[INTEGRATION] refund — no-op telemetry path: works, emits zero spans', async () => {
    const tracer = new MockTracer();
    const client = newClient(); // no telemetry
    mockSuccessfulRefund();

    const res = await client.refund(refundReq());
    expect(res.success).toBe(true);
    expect(tracer.spans).toHaveLength(0);
  });
});
