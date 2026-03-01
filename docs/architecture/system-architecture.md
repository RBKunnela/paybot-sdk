# System Architecture — paybot-sdk

**Date:** 2026-03-01
**Version:** 0.2.0
**Branch:** `main` @ `e695725`
**Analyst:** @architect (Aria)

---

## 1. Project Overview

**paybot-sdk** is a lightweight TypeScript SDK for USDC payments via the [x402 protocol](https://www.x402.org/). It provides bot developers with a simple API to execute payments through a PayBot facilitator service, with support for both mock mode and real on-chain EIP-3009 `TransferWithAuthorization` signatures.

### Key Characteristics

| Attribute | Value |
|-----------|-------|
| Language | TypeScript (strict mode) |
| Module System | ESM (`"type": "module"`) |
| Target | ES2020 |
| Runtime | Node.js >= 18 |
| Dependencies | 1 (`viem` ^2.46.2) |
| Source Files | 7 |
| Test Files | 5 (52 tests, all passing) |
| Test Framework | Vitest 1.x |
| Build System | `tsc` (no bundler) |
| Package | npm (public, `paybot-sdk`) |
| License | MIT |

---

## 2. Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Language | TypeScript | ^5.3.0 | Type-safe development |
| Runtime | Node.js | >= 18 | Server-side execution |
| Crypto/Blockchain | viem | ^2.46.2 | EIP-712 signing, account management |
| Testing | Vitest | ^1.0.0 | Unit testing |
| Linting | ESLint | ^8.56.0 | Code quality |
| Formatting | Prettier | ^3.1.0 | Code style |
| Module Resolution | bundler | - | tsconfig moduleResolution |

---

## 3. Source File Structure

```
paybot-sdk/
├── src/
│   ├── index.ts           # Public API exports (barrel file)
│   ├── client.ts          # PayBotClient class (main SDK entry point)
│   ├── types.ts           # Public TypeScript interfaces
│   ├── errors.ts          # PayBotApiError class + getErrorMessage utility
│   ├── crypto.ts          # EIP-3009 nonce generation
│   ├── networks.ts        # Network configs, EIP-712 domains, EIP-3009 types
│   └── x402-handler.ts    # x402 auto-handler (fetch wrapper)
├── tests/
│   ├── client.test.ts     # 22 tests
│   ├── x402-handler.test.ts # 9 tests
│   ├── networks.test.ts   # 11 tests
│   ├── errors.test.ts     # 7 tests
│   └── crypto.test.ts     # 3 tests
├── dist/                  # Compiled output
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

---

## 4. Architecture Analysis

### 4.1 Core Components

#### PayBotClient (`client.ts` — 344 lines)

The main SDK class. Handles:
- Configuration with sensible defaults (`facilitatorUrl`, `operatorId`)
- Shared `_request<T>()` wrapper with auth headers and error handling
- `pay()` — verify + settle two-step payment flow
- `balance()`, `history()`, `setLimits()`, `register()`, `health()` — CRUD operations
- `buildPaymentPayload()` — EIP-3009 signing or mock payload
- `usdToBaseUnits()` — USD string to USDC 6-decimal conversion

#### x402 Handler (`x402-handler.ts` — 131 lines)

Fetch wrapper that:
- Intercepts HTTP 402 responses
- Parses payment requirements (JSON body or headers)
- Auto-pays if within `maxAutoPay` limit
- Retries original request with payment proof headers

#### Type System (`types.ts` — 87 lines)

Clean public interfaces:
- `PayBotConfig`, `PaymentRequest`, `PaymentResult`
- `BalanceResult`, `TransactionHistoryItem`, `LimitsConfig`
- `RegisterResult`, `HealthResult`, `TrustLevel`

#### Error Handling (`errors.ts` — 30 lines)

- `PayBotApiError` extends `Error` with `code`, `statusCode`, `details`
- `getErrorMessage()` utility for unknown error extraction

#### Networks (`networks.ts` — 92 lines)

- Base Mainnet and Base Sepolia configurations
- USDC contract addresses
- EIP-712 domain separators
- EIP-3009 typed data definitions

#### Crypto (`crypto.ts` — 8 lines)

- `generateEIP3009Nonce()` — 32 random bytes for EIP-3009

### 4.2 Data Flow

```
Bot Developer
    │
    ▼
PayBotClient.pay(request)
    │
    ├─ buildPaymentPayload()
    │   ├─ Mock: "payer:{botId}"
    │   └─ Real: EIP-3009 signed JSON
    │
    ├─ POST /verify → facilitator
    │   └─ Returns settlementToken
    │
    └─ POST /settle → facilitator
        └─ Returns txHash, commission data
```

```
x402 Handler
    │
    ├─ fetch(url) → HTTP 200 → return response
    │
    └─ fetch(url) → HTTP 402
        ├─ parse402Response()
        ├─ Check maxAutoPay limit
        ├─ PayBotClient.pay()
        └─ Retry with X-Payment-Proof header
```

### 4.3 External Dependencies

| Dependency | Role | Risk |
|-----------|------|------|
| PayBot Facilitator API | Payment verification & settlement | External service dependency |
| Base Network (Sepolia/Mainnet) | On-chain USDC transfers | Blockchain availability |
| viem | EIP-712 signing, account management | Well-maintained, large community |

---

## 5. Code Quality Assessment

### 5.1 Strengths

1. **Minimal dependency footprint** — Only `viem`, reduces supply chain risk
2. **Clean type system** — Strict TypeScript with explicit interfaces
3. **Comprehensive test coverage** — 52 tests across all 5 source modules
4. **Dual-mode support** — Mock and real payment modes
5. **Good error handling** — `PayBotApiError` with structured codes/details
6. **Clean barrel exports** — Well-organized public API
7. **ESM-native** — Modern module system

### 5.2 Patterns Observed

- **Result pattern for pay()** — Returns `{ success: false, error }` instead of throwing
- **Exception pattern for other methods** — Throws `PayBotApiError` on failure
- **Private shared request wrapper** — `_request<T>()` DRY pattern
- **Config defaults in constructor** — `facilitatorUrl`, `operatorId`
- **CAIP-2 network identifiers** — Standards-compliant network addressing

---

## 6. Technical Debt Inventory

### 6.1 Critical

| ID | Debt | Impact | Area |
|----|------|--------|------|
| TD-C1 | `pay()` method uses raw `fetch()` instead of `_request()` | Duplicated error handling, inconsistent patterns | `client.ts:114-206` |
| TD-C2 | Hardcoded USDC contract address in `pay()` default | Could diverge from `networks.ts` config | `client.ts:105` |

### 6.2 High

| ID | Debt | Impact | Area |
|----|------|--------|------|
| TD-H1 | No retry/timeout logic on HTTP requests | Network issues cause immediate failures | `client.ts` |
| TD-H2 | No request/response logging or observability hooks | Debugging production issues is difficult | `client.ts` |
| TD-H3 | `parse402Response()` consumes response body (no clone) | Original response becomes unusable if parsing fails partially | `x402-handler.ts:101` |
| TD-H4 | Mixed error handling patterns (`pay()` returns result vs others throw) | Confusing DX, easy to forget which methods throw | `client.ts` |
| TD-H5 | No input validation on `PayBotConfig` | Invalid configs fail at runtime with unhelpful errors | `client.ts:40-48` |

### 6.3 Medium

| ID | Debt | Impact | Area |
|----|------|--------|------|
| TD-M1 | `usdToBaseUnits()` doesn't handle negative values or invalid strings | Silent incorrect conversions | `client.ts:338-343` |
| TD-M2 | No AbortController / cancellation support | Long-running payments can't be cancelled | `client.ts`, `x402-handler.ts` |
| TD-M3 | `types.ts:9` facilitatorUrl JSDoc says "paybot.dev" but default is "paybotcore.com" | Doc/code mismatch | `types.ts` |
| TD-M4 | No event emitter or callback hooks for payment lifecycle | Can't observe payment stages (verify, settle) | `client.ts` |
| TD-M5 | `operatorId` defaults to `'default-operator'` — purpose unclear | May cause issues in multi-operator setups | `client.ts:45` |
| TD-M6 | No ESLint config file found in project root | `npm run lint` may use defaults | Config |
| TD-M7 | No `.prettierrc` config file | Formatting rules undefined | Config |

### 6.4 Low

| ID | Debt | Impact | Area |
|----|------|--------|------|
| TD-L1 | Test files not validated with `npm run lint` (only `src` in lint script) | Test code quality not enforced | `package.json:28` |
| TD-L2 | No `CHANGELOG.md` | Users can't track version changes | Documentation |
| TD-L3 | No CI/CD pipeline configuration | No automated quality gates | Infrastructure |
| TD-L4 | `devDependencies` versions use `^` ranges without lockfile | Build reproducibility risk | `package.json` |

---

## 7. Dependency Analysis

### Production

| Package | Version | Purpose | Latest | Update Needed |
|---------|---------|---------|--------|---------------|
| viem | ^2.46.2 | Blockchain interaction | Check npm | Minor updates likely |

### Development

| Package | Version | Purpose | Notes |
|---------|---------|---------|-------|
| typescript | ^5.3.0 | Compilation | Current |
| vitest | ^1.0.0 | Testing | v2.x available |
| eslint | ^8.56.0 | Linting | v9.x available (breaking) |
| prettier | ^3.1.0 | Formatting | Current |
| @typescript-eslint/* | ^7.0.0 | TS linting rules | v8.x available |
| @types/node | ^25.3.0 | Node.js types | Current |

---

## 8. Configuration Assessment

### Present
- `tsconfig.json` — Well-configured with strict mode
- `vitest.config.ts` — Minimal, correct
- `package.json` — Clean, proper exports field

### Missing
- ESLint config file (`.eslintrc` or `eslint.config.*`)
- Prettier config file (`.prettierrc`)
- `.npmignore` or refined `files` field
- CI/CD config (GitHub Actions, etc.)
- `CHANGELOG.md`

---

## 9. Security Considerations

| Area | Status | Notes |
|------|--------|-------|
| Private key handling | In-memory only | Not persisted, good |
| API key transmission | X-API-Key header | Standard, but no key rotation support |
| Input validation | Minimal | No schema validation on config or requests |
| Dependency audit | 1 prod dep | Low attack surface |
| Secrets in repo | `.env` in `.gitignore` (assumed) | Need to verify |

---

## 10. Summary

**paybot-sdk** is a well-structured, minimal SDK with clean TypeScript, comprehensive tests, and a focused feature set. The main technical debts are around the inconsistent use of `_request()` in the `pay()` method, lack of observability/retry mechanisms, and missing developer tooling configs (ESLint, Prettier files, CI/CD).

The codebase is small enough that all identified debts can be resolved in a focused sprint without architectural changes.

---

*Generated by @architect — Brownfield Discovery Phase 1*
