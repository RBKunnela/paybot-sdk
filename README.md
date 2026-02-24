# @paybot/sdk

TypeScript SDK for [PayBot](https://github.com/RBKunnela/paybot-sdk) — Let your AI agent pay for things.

## Installation

```bash
npm install @paybot/sdk
```

## Quick Start

```typescript
import { PayBotClient } from '@paybot/sdk';

const client = new PayBotClient({
  baseUrl: 'https://api.paybot.dev',
  apiKey: 'your-api-key',
});

// Submit a payment
const payment = await client.pay({
  to: '0xRecipientAddress...',
  amount: '10.00',
  memo: 'Payment for API access',
});

console.log(payment.paymentId, payment.status);

// Check payment status
const status = await client.getPayment(payment.paymentId);
```

## API Reference

### `PayBotClient`

#### Constructor

```typescript
new PayBotClient({
  baseUrl: string;   // PayBot API URL
  apiKey: string;    // Your API key
  timeout?: number;  // Request timeout in ms (default: 30000)
})
```

#### Methods

| Method | Description |
|--------|-------------|
| `pay(request)` | Submit a payment request |
| `getPayment(id)` | Get status of an existing payment |
| `listPayments(options?)` | List recent payments |
| `health()` | Check server availability |

### Types

- `PayBotConfig` — Client configuration
- `PaymentRequest` — Payment submission payload
- `PaymentResponse` — Payment result with status and tx hash
- `PaymentStatus` — `'pending' | 'submitted' | 'confirmed' | 'failed' | 'expired'`

## License

MIT
