# PRD: PayBot SDK Liability Management

> **PRD ID:** PAYBOT-LM-001
> **Version:** 1.0.0
> **Author:** @architect (Aria) — AIOS Agent Flows
> **Date:** 2026-03-20
> **Status:** Draft — Pending @po review
> **Priority:** HIGH
> **Origin:** Community feedback (sparkxu, karma 1843) via Moltbook

---

## 1. Problem Statement

### The Liability Window

PayBot SDK enables AI agents to make USDC payments on Base blockchain via the x402 HTTP protocol. The current architecture has a **critical liability gap**: between the moment an agent commits to a payment (verify) and the moment settlement completes on-chain (settle), there is no mechanism for dispute resolution, payment reversal, or conditional release.

**Why this matters:**
- USDC settlement on Base is **fast and final** — no chargebacks
- The SDK's `pay()` method executes a 2-stage flow (`POST /verify` → `POST /settle`) with no ability to pause, hold, or reverse between stages
- Once `settle` returns a `txHash`, funds are irreversibly transferred
- If a vendor disputes delivery, or an agent was deceived, there is no recourse
- Trust levels cap amounts but don't address **post-settlement liability**

**Current mitigations (insufficient):**
- Trust levels (0-5) with spending caps ($1 → $10,000 per tx)
- Server-side spending limit enforcement
- Encrypted private key storage in vault

**Missing mitigations (this PRD):**
- No escrow mechanism
- No time-based release windows
- No audit trail with review triggers
- No dispute resolution API
- No refund capability
- No payment state visibility between verify and settle

### Community Signal

> "The real question: how do you handle gap between agent-commits and human-approves? USDC settlement is fast and final. That window is where liability lives." — sparkxu (Moltbook, karma 1843)

### Competitive Pressure

- **$ALPHA Agent SDK** already has escrow contracts
- **MCP Bitcoin Wallets** have multi-chain support with 47 active wallets
- PayBot differentiates on x402 protocol + trust levels, but escrow gap is a blocker for enterprise adoption

---

## 2. User Personas

### Agent Developer (Builder)
- Integrates PayBot SDK into their AI agent
- Needs: clear payment state, error recovery, audit logs
- Pain: "My agent paid for an API call but got a 500 error. Funds gone, no recourse."

### Agent Owner (Operator)
- Manages trust levels, spending caps, reviews transactions
- Needs: dashboard with flagged transactions, dispute flow, override controls
- Pain: "I see my agent spent $800 yesterday but I can't tell if deliveries were received."

### Vendor (API Provider)
- Receives payments via x402 middleware (`paybot402`)
- Needs: proof of delivery, dispute resolution, payment holds for large orders
- Pain: "A bot paid me $500 for a batch job, then the bot operator claims non-delivery. I delivered but can't prove it."

### Platform (PayBot/FriendlyAI)
- Operates the facilitator service
- Needs: audit compliance, dispute mediation, risk management
- Pain: "We're collecting commission but have no dispute resolution — regulatory risk."

---

## 3. User Stories

### Phase 1: Enhanced Audit Trail + Flagging (Weeks 1-2)

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| US-01 | Agent Owner | see a complete audit log of all transactions with metadata | I can review what my agent spent and on what | MUST |
| US-02 | Agent Owner | receive automatic flags when transactions exceed thresholds | I don't have to manually monitor every payment | MUST |
| US-03 | Agent Owner | see flagged transactions in a review queue | I can approve, investigate, or dispute them | MUST |
| US-04 | Agent Developer | attach context metadata to payments (purpose, resource, agent reasoning) | audit trails are meaningful, not just amounts | SHOULD |
| US-05 | Vendor | see payment receipts with signed proofs | I can prove I was paid for a specific delivery | SHOULD |
| US-06 | Platform | query audit logs by operator, bot, date range, amount range | compliance reporting and risk monitoring work | MUST |

### Phase 2: Time-Based Release Windows (Weeks 3-4)

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| US-07 | Agent Owner | set a configurable hold period before settlement finalization | I have a window to review and cancel if needed | MUST |
| US-08 | Agent Developer | check payment status during the hold period | my agent knows if payment is pending, released, or cancelled | MUST |
| US-09 | Agent Owner | cancel a pending payment during the hold window | bad transactions can be stopped before they're final | MUST |
| US-10 | Vendor | receive notification when payment is released (not just initiated) | I only deliver after funds are confirmed and past the hold | SHOULD |
| US-11 | Agent Developer | set per-payment hold durations based on amount or trust level | small payments clear fast, large ones get review time | SHOULD |

### Phase 3: Escrow Smart Contracts (Weeks 5-8)

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| US-12 | Agent Owner | have funds locked in escrow for transactions > configurable threshold | neither party can run off with the money | MUST |
| US-13 | Vendor | confirm delivery to release escrowed funds | I get paid when I prove I delivered | MUST |
| US-14 | Agent Developer | query escrow status (locked, released, disputed, returned) | my agent can track payment lifecycle | MUST |
| US-15 | Agent Owner | initiate a dispute on an escrowed payment | funds stay locked until resolution | MUST |
| US-16 | Platform | resolve disputes as arbiter (release to vendor or return to agent) | we can mediate when parties disagree | SHOULD |
| US-17 | Agent Developer | have escrow auto-release after configurable timeout if no dispute | normal transactions aren't held indefinitely | MUST |

---

## 4. Functional Requirements

### 4.1 Enhanced Audit Trail (Phase 1)

#### FR-01: Transaction Audit Log
- Every `pay()` call MUST generate an audit event with:
  - `eventId` (UUID v4)
  - `timestamp` (ISO 8601, UTC)
  - `botId`, `operatorId`
  - `paymentRequest` (resource, amount, payTo, network)
  - `paymentResult` (success, txHash, gross, net, commission, errorCode)
  - `context` (optional metadata from caller: purpose, agentReasoning, resourceType)
  - `trustLevel` at time of payment
  - `dailySpentBefore` and `dailySpentAfter`

#### FR-02: Flagging Rules Engine
- SDK MUST support configurable flagging rules:
  - **Amount threshold**: flag if tx amount > configurable USD value (default: $100)
  - **Repeated payee**: flag if same `payTo` address receives > N payments in 24h (default: 5)
  - **Velocity**: flag if > N transactions per hour (default: 10)
  - **New payee**: flag first payment to any new address
  - **Error rate**: flag if > 30% of recent payments failed
- Flags MUST be attached to audit events as `flags: string[]`

#### FR-03: Review Queue API
- New SDK methods:
  ```typescript
  client.flaggedTransactions(options?: FlaggedTxFilter): Promise<FlaggedTransaction[]>
  client.reviewTransaction(eventId: string, action: 'approve' | 'investigate' | 'dispute'): Promise<void>
  ```
- Facilitator MUST expose `/audit/flagged` and `/audit/review` endpoints

#### FR-04: Payment Context Metadata
- `PaymentRequest` type MUST be extended with optional `context`:
  ```typescript
  interface PaymentRequest {
    // existing fields...
    context?: {
      purpose?: string;        // "API call to weather service"
      agentReasoning?: string; // "User asked for weather, cheapest provider"
      resourceType?: string;   // "api_call" | "data_purchase" | "subscription"
      tags?: string[];         // ["weather", "one-time"]
    };
  }
  ```

#### FR-05: Signed Payment Receipts
- After successful `settle`, SDK MUST generate a signed receipt:
  ```typescript
  interface PaymentReceipt {
    receiptId: string;
    txHash: string;
    amount: string;
    payTo: string;
    network: string;
    timestamp: string;
    botId: string;
    signature: string;  // EIP-191 signed by bot's wallet
  }
  ```
- `PaymentResult` MUST include optional `receipt: PaymentReceipt`

### 4.2 Time-Based Release Windows (Phase 2)

#### FR-06: Hold Period Configuration
- New configuration in `PayBotConfig`:
  ```typescript
  interface PayBotConfig {
    // existing fields...
    holdPeriod?: {
      enabled: boolean;
      defaultSeconds: number;     // default: 0 (immediate)
      thresholds: Array<{
        minAmount: string;        // USD
        holdSeconds: number;      // hold duration
      }>;
    };
  }
  ```

#### FR-07: Payment State Machine
- Payments MUST transition through states:
  ```
  INITIATED → VERIFIED → HELD → RELEASED → SETTLED
                                    ↘ CANCELLED
                         ↘ EXPIRED → RETURNED
  ```
- New type:
  ```typescript
  type PaymentState = 'initiated' | 'verified' | 'held' | 'released' | 'settled' | 'cancelled' | 'expired' | 'returned';
  ```

#### FR-08: Payment Status Query
- New SDK method:
  ```typescript
  client.paymentStatus(txHashOrEventId: string): Promise<PaymentStatusResult>

  interface PaymentStatusResult {
    eventId: string;
    state: PaymentState;
    amount: string;
    payTo: string;
    holdExpiresAt?: string;  // ISO 8601
    stateHistory: Array<{
      state: PaymentState;
      timestamp: string;
      actor: string;  // "agent" | "owner" | "system" | "vendor"
    }>;
  }
  ```

#### FR-09: Cancel Held Payment
- New SDK method:
  ```typescript
  client.cancelPayment(eventId: string, reason: string): Promise<CancelResult>
  ```
- MUST only work when state is `HELD`
- Cancellation triggers refund transaction on-chain (gas cost borne by operator)

#### FR-10: Auto-Release on Hold Expiry
- If hold period expires without cancellation, payment MUST auto-transition to `RELEASED` → `SETTLED`
- Facilitator handles via scheduled job (cron or event-driven)

### 4.3 Escrow Smart Contracts (Phase 3)

#### FR-11: Escrow Contract on Base
- Deploy Solidity escrow contract on Base:
  - `deposit(address payee, uint256 amount, uint256 timeout)` — lock USDC
  - `release(bytes32 escrowId)` — release to payee (by depositor or arbiter)
  - `dispute(bytes32 escrowId)` — flag for arbiter review (by either party)
  - `refund(bytes32 escrowId)` — return to depositor (by arbiter after dispute)
  - `autoRelease()` — triggered after timeout if no dispute
- Contract MUST be upgradeable (proxy pattern) for future changes
- Contract MUST emit events for all state changes

#### FR-12: Escrow SDK Integration
- New SDK methods:
  ```typescript
  client.payWithEscrow(request: EscrowPaymentRequest): Promise<EscrowResult>
  client.escrowStatus(escrowId: string): Promise<EscrowStatusResult>
  client.releaseEscrow(escrowId: string): Promise<ReleaseResult>
  client.disputeEscrow(escrowId: string, reason: string): Promise<DisputeResult>
  ```

#### FR-13: Automatic Escrow Routing
- Payments above configurable threshold (default: $100) MUST be automatically routed to escrow
- Below threshold: existing direct payment flow (no change)
- Configurable per-operator via `setLimits()`

#### FR-14: Escrow Timeout
- Default timeout: 72 hours
- Configurable per-payment (min: 1 hour, max: 30 days)
- After timeout without dispute: auto-release to vendor

---

## 5. Non-Functional Requirements

### NFR-01: Performance
- Audit logging MUST NOT add > 50ms latency to `pay()` calls
- Hold period checks MUST resolve in < 100ms
- Escrow contract interactions: < 5 second confirmation on Base

### NFR-02: Reliability
- Audit events MUST be persisted before `pay()` returns (write-ahead)
- Hold state MUST survive facilitator restarts (persisted in database)
- Escrow state is on-chain (inherently durable)

### NFR-03: Security
- Audit logs MUST be append-only (no modification or deletion)
- Payment receipts MUST be cryptographically signed (EIP-191)
- Escrow contract MUST be audited before mainnet deployment
- Escrow contract MUST have admin-only pause/unpause for emergencies

### NFR-04: Backwards Compatibility
- All Phase 1+2 features MUST be opt-in (existing behavior unchanged by default)
- `pay()` return type MUST remain `PaymentResult` (extended, not replaced)
- No breaking changes to existing `PayBotConfig`

### NFR-05: Observability
- New metrics: audit events/sec, flagged tx rate, hold cancellation rate, escrow dispute rate
- Facilitator dashboard endpoint: `/admin/liability-metrics`

### NFR-06: Compliance
- Audit logs retained for minimum 7 years (configurable)
- Escrow disputes logged with full state history
- GDPR: operator can request audit log export (anonymized amounts, preserved hashes)

---

## 6. Architecture Overview

### Component Map

```
┌─────────────────────────────────────────────────────┐
│                    PayBot SDK                        │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │ client.ts│  │ audit.ts │  │ escrow-client.ts │  │
│  │ (pay)    │→ │ (log)    │  │ (escrow ops)     │  │
│  └────┬─────┘  └────┬─────┘  └────────┬─────────┘  │
│       │              │                 │             │
└───────┼──────────────┼─────────────────┼─────────────┘
        │              │                 │
        ▼              ▼                 ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────────┐
│  Facilitator │ │  Facilitator │ │  Base Blockchain  │
│  /verify     │ │  /audit/*    │ │  Escrow Contract  │
│  /settle     │ │  /hold/*     │ │  (Solidity)       │
└──────────────┘ └──────────────┘ └──────────────────┘
```

### New Files (SDK)

| File | Phase | Purpose |
|------|-------|---------|
| `src/audit.ts` | 1 | Audit event creation, flagging rules, receipt signing |
| `src/hold.ts` | 2 | Hold period management, state machine, cancel/release |
| `src/escrow-client.ts` | 3 | Escrow contract interaction via viem |
| `src/escrow-abi.ts` | 3 | Escrow contract ABI (generated from Solidity) |
| `src/types-liability.ts` | 1 | All new types (audit, hold, escrow, flags) |

### New Files (Facilitator — paybot-core)

| File | Phase | Purpose |
|------|-------|---------|
| `src/routes/audit.ts` | 1 | `/audit/events`, `/audit/flagged`, `/audit/review` |
| `src/routes/hold.ts` | 2 | `/hold/status`, `/hold/cancel`, `/hold/release` |
| `src/services/flagging.ts` | 1 | Rules engine for transaction flagging |
| `src/services/hold-scheduler.ts` | 2 | Hold expiry scheduler (auto-release) |
| `src/db/migrations/audit.sql` | 1 | Audit events table, flags table, indexes |
| `src/db/migrations/hold.sql` | 2 | Hold state table, state history |

### New Files (Smart Contract)

| File | Phase | Purpose |
|------|-------|---------|
| `contracts/PayBotEscrow.sol` | 3 | Escrow contract (USDC ERC-20 compatible) |
| `contracts/PayBotEscrowProxy.sol` | 3 | Upgradeable proxy |
| `test/PayBotEscrow.test.ts` | 3 | Contract tests (Hardhat/Foundry) |

---

## 7. Success Metrics

### Phase 1 (Audit Trail)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Audit event coverage | 100% of `pay()` calls logged | Count audit events / count payments |
| Flag accuracy | < 5% false positives | Manually reviewed sample of 100 flags |
| Review response time | < 24h for HIGH flags | Median time from flag to review action |
| SDK latency impact | < 50ms added | p99 latency before/after |

### Phase 2 (Time-Based Release)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Hold adoption | > 30% of operators enable holds | Config analytics |
| Cancel rate | < 5% of held payments cancelled | Cancels / total held |
| Auto-release success | > 99% release on time | Released on schedule / total expired |
| Dispute prevention | 50% reduction in post-settlement complaints | Before/after comparison |

### Phase 3 (Escrow)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Escrow adoption | > 50% of transactions > $100 use escrow | Escrow vs direct for qualifying txs |
| Dispute rate | < 2% of escrowed transactions | Disputes / total escrows |
| Resolution time | < 48h median | Time from dispute to resolution |
| Gas overhead | < 15% of transaction amount | Average gas cost / payment amount |

---

## 8. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|-----------|
| Escrow contract vulnerability | CRITICAL | Medium | Professional audit + bug bounty before mainnet |
| Gas costs make small escrows uneconomical | HIGH | High | Set minimum escrow threshold ($50+), batch operations |
| Hold period delays frustrate vendors | MEDIUM | Medium | Make holds opt-in, allow vendor-initiated release |
| Audit log storage grows unbounded | MEDIUM | High | Implement retention policy, archive to cold storage after 90 days |
| Regulatory classification of escrow as financial service | HIGH | Medium | Legal review before launch, jurisdiction analysis |
| Existing integrations break | HIGH | Low | Strict backwards compatibility, all features opt-in |

---

## 9. Phased Delivery Plan

```
Week 1:  [Phase 1] Audit types + event creation + flagging rules
Week 2:  [Phase 1] Review queue API + payment receipts + tests
Week 3:  [Phase 2] Hold period config + state machine + status query
Week 4:  [Phase 2] Cancel/release API + auto-release scheduler + tests
Week 5:  [Phase 3] Escrow contract (Solidity) + unit tests
Week 6:  [Phase 3] Escrow SDK client + facilitator integration
Week 7:  [Phase 3] Escrow integration tests + Base Sepolia deployment
Week 8:  [Phase 3] Security audit prep + documentation + mainnet readiness
```

### Dependencies Between Phases

```
Phase 1 (Audit) ──→ Phase 2 (Hold) ──→ Phase 3 (Escrow)
     │                    │                    │
     │ audit.ts needed    │ state machine      │ escrow extends
     │ for hold logging   │ needed for         │ hold state model
     │                    │ escrow states       │
     ▼                    ▼                    ▼
  Required              Required            Independent
  by Phase 2           by Phase 3          (contract is separate)
```

---

## 10. Out of Scope (This PRD)

- Multi-chain escrow (future PRD — extend to Solana, Polygon after Base proven)
- Automated dispute resolution (AI arbiter — requires separate legal/product review)
- Insurance/guarantees (financial product — regulatory implications)
- Batch payment escrow (optimization — after single payment escrow works)
- Multi-sig wallet integration (separate effort, different trust model)

---

## 11. Open Questions

| # | Question | Owner | Due |
|---|----------|-------|-----|
| 1 | Should escrow contract be deployed by FriendlyAI or per-operator? | @architect + @pm | Week 4 |
| 2 | What jurisdiction governs escrow disputes? (Finland? Agent's location?) | Legal | Week 6 |
| 3 | Should we use existing escrow protocols (OpenZeppelin Escrow, Safe) or custom? | @architect | Week 3 |
| 4 | What's the commission model for escrowed transactions? (Same 2.5% or different?) | @pm | Week 2 |
| 5 | Do we need KYC for operators using escrow above certain thresholds? | Legal + @pm | Week 4 |

---

## 12. Complexity Assessment (*assess-complexity)

```json
{
  "featureId": "PAYBOT-LM-001",
  "featureName": "PayBot Liability Management",
  "result": "COMPLEX",
  "totalScore": 19,
  "dimensions": {
    "scope": {
      "score": 4,
      "notes": "5 new SDK files, 6+ facilitator files, 2 contract files, modifications to client.ts, types.ts, index.ts. Cross-cutting change affecting payment flow, API surface, and on-chain interactions."
    },
    "integration": {
      "score": 4,
      "notes": "Base blockchain (escrow contract deployment + interaction), facilitator API (6+ new endpoints), existing verify/settle flow modification, viem contract client, potential OpenZeppelin dependencies."
    },
    "infrastructure": {
      "score": 4,
      "notes": "Smart contract deployment on Base (testnet + mainnet), database migrations for audit/hold tables, scheduler service for hold expiry, contract monitoring/alerting."
    },
    "knowledge": {
      "score": 4,
      "notes": "Solidity escrow patterns, EIP-3009 integration with escrow, upgradeable proxy contracts, on-chain event indexing, financial compliance requirements, gas optimization. Domain expertise in agent payment liability not widely available."
    },
    "risk": {
      "score": 3,
      "notes": "Handles real USDC (user funds). Smart contract bugs = fund loss. But phased approach mitigates: Phase 1-2 are off-chain (low risk), Phase 3 escrow is highest risk but comes last with audit buffer."
    }
  },
  "pipelinePhases": ["gather", "assess", "research", "spec", "critique", "plan"],
  "estimatedEffort": "8 weeks (3 phases)",
  "recommendation": "Execute in strict phase order. Phase 1 (audit) and Phase 2 (hold) are prerequisite for Phase 3 (escrow). Consider hiring external Solidity auditor for Phase 3 contract before mainnet deployment."
}
```

---

**PRD Status:** Draft v1.0.0 — Ready for @po (Pax) review
**Next:** @po validates → @sm creates sprint stories → @dev implements Phase 1
**Author:** @architect (Aria) — AIOS Agent Flows
**Last Updated:** 2026-03-20
