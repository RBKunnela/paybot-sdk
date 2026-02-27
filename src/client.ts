import type {
  PayBotConfig,
  PaymentRequest,
  PaymentResult,
  BalanceResult,
  TransactionHistoryItem,
  LimitsConfig,
  RegisterResult,
  HealthResult,
  TrustLevel,
} from './types.js';
import { getErrorMessage, PayBotApiError } from './errors.js';
import { generateEIP3009Nonce } from './crypto.js';
import { EIP712_DOMAINS, EIP3009_TYPES } from './networks.js';
import { privateKeyToAccount } from 'viem/accounts';

/**
 * PayBotClient — the SDK entry point for bot developers.
 *
 * Usage (mock mode):
 * ```typescript
 * const client = new PayBotClient({
 *   apiKey: 'pb_test_...',
 *   botId: 'my-bot',
 * });
 * ```
 *
 * Usage (real mode — signs EIP-3009 authorizations):
 * ```typescript
 * const client = new PayBotClient({
 *   apiKey: 'pb_test_...',
 *   botId: 'my-bot',
 *   walletPrivateKey: '0x...',
 * });
 * ```
 */
export class PayBotClient {
  private config: Required<Pick<PayBotConfig, 'apiKey' | 'facilitatorUrl' | 'botId' | 'operatorId'>> & { walletPrivateKey?: string };

  constructor(config: PayBotConfig) {
    this.config = {
      apiKey: config.apiKey,
      facilitatorUrl: config.facilitatorUrl ?? 'http://localhost:3000',
      botId: config.botId,
      operatorId: config.operatorId ?? 'default-operator',
      walletPrivateKey: config.walletPrivateKey,
    };
  }

  /**
   * Shared fetch wrapper that sets auth headers and throws PayBotApiError on failure.
   */
  private async _request<T>(
    path: string,
    options: { method?: string; body?: unknown; query?: Record<string, string> } = {}
  ): Promise<T> {
    const url = new URL(path, this.config.facilitatorUrl);
    if (options.query) {
      for (const [key, value] of Object.entries(options.query)) {
        url.searchParams.set(key, value);
      }
    }

    const headers: Record<string, string> = {
      'X-API-Key': this.config.apiKey,
    };
    if (options.body !== undefined) {
      headers['Content-Type'] = 'application/json';
    }

    let response: Response;
    try {
      response = await fetch(url.toString(), {
        method: options.method ?? 'GET',
        headers,
        body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      });
    } catch (error: unknown) {
      throw new PayBotApiError(
        `Network error: ${getErrorMessage(error)}`,
        'NETWORK_ERROR',
        0
      );
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as Record<string, unknown>;
      throw new PayBotApiError(
        (errorData.error as string) ?? `HTTP ${response.status}`,
        (errorData.code as string) ?? 'HTTP_ERROR',
        response.status,
        errorData.details as Record<string, unknown> | undefined
      );
    }

    return response.json() as Promise<T>;
  }

  /**
   * Execute a payment through the PayBot facilitator.
   */
  async pay(request: PaymentRequest): Promise<PaymentResult> {
    try {
      const network = request.network ?? 'eip155:84532';
      const tokenContract = request.tokenContract ?? '0x036CbD53842c5426634e7929541eC2318f3dCF7e';
      const amountBaseUnits = this.usdToBaseUnits(request.amount);

      const payloadString = await this.buildPaymentPayload(
        request.payTo,
        amountBaseUnits,
        network
      );

      const response = await fetch(`${this.config.facilitatorUrl}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.config.apiKey,
        },
        body: JSON.stringify({
          botId: this.config.botId,
          payload: {
            x402Version: 1,
            resource: request.resource,
            accepted: true,
            payload: payloadString,
          },
          requirements: {
            scheme: 'exact',
            network,
            asset: `${network}/erc20:${tokenContract}`,
            amount: amountBaseUnits,
            payTo: request.payTo,
            maxTimeoutSeconds: 300,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})) as Record<string, unknown>;
        return {
          success: false,
          grossAmount: '0',
          netAmount: '0',
          commissionAmount: '0',
          commissionRate: 0,
          error: (errorData.error as string) ?? `HTTP ${response.status}`,
          errorCode: (errorData.code as string) ?? undefined,
          errorDetails: errorData.details as Record<string, unknown> | undefined,
        };
      }

      const verifyData = await response.json() as Record<string, unknown>;
      const settlementToken = verifyData.settlementToken as string | undefined;
      if (!settlementToken) {
        return {
          success: false,
          grossAmount: '0',
          netAmount: '0',
          commissionAmount: '0',
          commissionRate: 0,
          error: 'Verify response missing settlement token',
        };
      }

      // Now settle
      const settleResponse = await fetch(`${this.config.facilitatorUrl}/settle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.config.apiKey,
        },
        body: JSON.stringify({
          botId: this.config.botId,
          settlementToken,
          payload: {
            x402Version: 1,
            resource: request.resource,
            accepted: true,
            payload: payloadString,
          },
          requirements: verifyData.modifiedRequirements ?? {
            scheme: 'exact',
            network,
            asset: `${network}/erc20:${tokenContract}`,
            amount: amountBaseUnits,
            payTo: request.payTo,
            maxTimeoutSeconds: 300,
          },
          commission: verifyData.commission,
        }),
      });

      if (!settleResponse.ok) {
        const errorData = await settleResponse.json().catch(() => ({})) as Record<string, unknown>;
        return {
          success: false,
          grossAmount: '0',
          netAmount: '0',
          commissionAmount: '0',
          commissionRate: 0,
          error: (errorData.error as string) ?? `Settlement HTTP ${settleResponse.status}`,
          errorCode: (errorData.code as string) ?? undefined,
          errorDetails: errorData.details as Record<string, unknown> | undefined,
        };
      }

      const settleData = await settleResponse.json() as Record<string, unknown>;

      const commissionData = verifyData.commission as Record<string, unknown> | undefined;

      return {
        success: true,
        txHash: settleData.transaction as string | undefined,
        grossAmount: String(commissionData?.grossAmount ?? '0'),
        netAmount: String(commissionData?.netAmount ?? '0'),
        commissionAmount: String(commissionData?.commissionAmount ?? '0'),
        commissionRate: Number(commissionData?.commissionRate ?? 0),
        network: settleData.network as string | undefined,
      };
    } catch (error: unknown) {
      return {
        success: false,
        grossAmount: '0',
        netAmount: '0',
        commissionAmount: '0',
        commissionRate: 0,
        error: getErrorMessage(error),
      };
    }
  }

  /**
   * Build the payment payload string.
   * If walletPrivateKey is set, signs an EIP-3009 authorization.
   * Otherwise, uses mock format.
   */
  private async buildPaymentPayload(
    payTo: string,
    amountBaseUnits: string,
    network: string
  ): Promise<string> {
    if (!this.config.walletPrivateKey) {
      return `payer:${this.config.botId}`;
    }

    const domain = EIP712_DOMAINS[network];
    if (!domain) {
      throw new Error(`No EIP-712 domain for network: ${network}`);
    }

    const account = privateKeyToAccount(this.config.walletPrivateKey as `0x${string}`);
    const nonce = generateEIP3009Nonce();
    const nowSeconds = BigInt(Math.floor(Date.now() / 1000));
    const validAfter = 0n;
    const validBefore = nowSeconds + 3600n; // 1 hour from now

    const value = BigInt(amountBaseUnits);

    const signature = await account.signTypedData({
      domain,
      types: EIP3009_TYPES,
      primaryType: 'TransferWithAuthorization',
      message: {
        from: account.address,
        to: payTo as `0x${string}`,
        value,
        validAfter,
        validBefore,
        nonce,
      },
    });

    return JSON.stringify({
      from: account.address,
      to: payTo,
      value: value.toString(),
      validAfter: validAfter.toString(),
      validBefore: validBefore.toString(),
      nonce,
      signature,
    });
  }

  /**
   * Get the current trust status and remaining budget for this bot.
   * Throws PayBotApiError on non-2xx responses.
   */
  async balance(): Promise<BalanceResult> {
    return this._request<BalanceResult>('/balance', {
      query: { botId: this.config.botId },
    });
  }

  /**
   * Get transaction history for this bot.
   * Throws PayBotApiError on non-2xx responses.
   */
  async history(limit: number = 50): Promise<TransactionHistoryItem[]> {
    return this._request<TransactionHistoryItem[]>('/history', {
      query: { botId: this.config.botId, limit: String(limit) },
    });
  }

  /**
   * Update spending limits for this bot.
   * Throws PayBotApiError on non-2xx responses.
   */
  async setLimits(limits: LimitsConfig): Promise<void> {
    await this._request<{ success: boolean }>('/limits', {
      method: 'PUT',
      body: { botId: this.config.botId, ...limits },
    });
  }

  /**
   * Register a new bot with the PayBot facilitator.
   * Throws PayBotApiError on non-2xx responses (e.g. 409 if already registered).
   */
  async register(trustLevel?: TrustLevel): Promise<RegisterResult> {
    return this._request<RegisterResult>('/bots', {
      method: 'POST',
      body: { botId: this.config.botId, trustLevel: trustLevel ?? 1 },
    });
  }

  /**
   * Check facilitator health.
   * Throws PayBotApiError if the server is unreachable.
   */
  async health(): Promise<HealthResult> {
    return this._request<HealthResult>('/health');
  }

  /**
   * Convert USD amount string to USDC base units (6 decimals).
   */
  private usdToBaseUnits(usdAmount: string): string {
    const parts = usdAmount.split('.');
    const whole = parts[0] ?? '0';
    const fraction = (parts[1] ?? '').padEnd(6, '0').slice(0, 6);
    return `${whole}${fraction}`.replace(/^0+/, '') || '0';
  }
}
