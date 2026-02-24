/**
 * Configuration for the PayBot client.
 */
export interface PayBotConfig {
  /** PayBot API base URL */
  baseUrl: string;
  /** API key issued by PayBot */
  apiKey: string;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
}

/**
 * A payment request sent to PayBot.
 */
export interface PaymentRequest {
  /** Recipient wallet address (0x...) */
  to: string;
  /** Amount in USDC (human-readable, e.g. "10.00") */
  amount: string;
  /** Description of what the payment is for */
  memo?: string;
  /** Idempotency key to prevent duplicate payments */
  idempotencyKey?: string;
}

/**
 * Response from a payment submission.
 */
export interface PaymentResponse {
  /** Unique payment ID assigned by PayBot */
  paymentId: string;
  /** Current status of the payment */
  status: PaymentStatus;
  /** On-chain transaction hash (available once submitted) */
  txHash?: string;
  /** Commission amount deducted by PayBot */
  commission?: string;
  /** Timestamp of creation */
  createdAt: string;
}

/**
 * Payment lifecycle status.
 */
export type PaymentStatus =
  | 'pending'
  | 'submitted'
  | 'confirmed'
  | 'failed'
  | 'expired';
