import type { PayBotConfig, PaymentRequest, PaymentResponse } from './types.js';

/**
 * PayBot SDK client.
 *
 * @example
 * ```ts
 * import { PayBotClient } from '@paybot/sdk';
 *
 * const client = new PayBotClient({
 *   baseUrl: 'https://api.paybot.dev',
 *   apiKey: 'your-api-key',
 * });
 *
 * const payment = await client.pay({
 *   to: '0x...',
 *   amount: '10.00',
 *   memo: 'Service payment',
 * });
 * ```
 */
export class PayBotClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly timeout: number;

  constructor(config: PayBotConfig) {
    this.baseUrl = config.baseUrl.replace(/\/+$/, '');
    this.apiKey = config.apiKey;
    this.timeout = config.timeout ?? 30_000;
  }

  /**
   * Submit a payment request.
   */
  async pay(request: PaymentRequest): Promise<PaymentResponse> {
    return this.request<PaymentResponse>('POST', '/v1/payments', request);
  }

  /**
   * Get the status of an existing payment.
   */
  async getPayment(paymentId: string): Promise<PaymentResponse> {
    return this.request<PaymentResponse>('GET', `/v1/payments/${paymentId}`);
  }

  /**
   * List recent payments.
   */
  async listPayments(options?: { limit?: number; offset?: number }): Promise<PaymentResponse[]> {
    const params = new URLSearchParams();
    if (options?.limit) params.set('limit', String(options.limit));
    if (options?.offset) params.set('offset', String(options.offset));
    const query = params.toString();
    return this.request<PaymentResponse[]>('GET', `/v1/payments${query ? `?${query}` : ''}`);
  }

  /**
   * Health check — verify the PayBot server is reachable.
   */
  async health(): Promise<{ status: string }> {
    return this.request<{ status: string }>('GET', '/health');
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorBody = await response.text().catch(() => 'Unknown error');
        throw new Error(`PayBot API error (${response.status}): ${errorBody}`);
      }

      return (await response.json()) as T;
    } finally {
      clearTimeout(timer);
    }
  }
}
