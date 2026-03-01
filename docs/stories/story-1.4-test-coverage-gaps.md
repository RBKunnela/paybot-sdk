# Story 1.4: Fill Test Coverage Gaps

**Epic:** EPIC-TD-1
**Status:** Done
**Priority:** P1
**Estimated Effort:** 3h
**Depends on:** None (independent)

---

## Objective

Add tests for identified coverage gaps: EIP-3009 signing, header-based 402 parsing, usdToBaseUnits edge cases, and configure coverage reporting.

## Tasks

- [x] **TG-1:** Add EIP-3009 signing integration test — verify `buildPaymentPayload()` produces valid signed payload when `walletPrivateKey` is provided
- [x] **TG-2:** Add test for header-based 402 parsing in x402 handler (`X-Payment-Amount` + `X-Payment-Address` headers)
- [x] **TG-3:** Add `usdToBaseUnits()` edge case tests (covered by Story 1.2 validation, but add explicit conversion tests)
- [x] **TG-4:** Add test for `pay()` with custom `network` and `tokenContract` parameters
- [x] **TG-5:** Configure vitest coverage reporting (c8 provider)

## Acceptance Criteria

- [x] Signing test verifies EIP-3009 payload structure with valid signature
- [x] Header-based 402 parsing returns correct amount/payTo
- [x] USD conversion tests cover: "0.01" → "10000", "1" → "1000000", "0.000001" → "1"
- [x] Custom network/token parameters are passed through correctly
- [x] `npx vitest run --coverage` works and reports coverage
- [x] Total test count: 60+

## Definition of Done

- [x] All new tests pass
- [x] Coverage report generated
- [x] Type check passes

## File List

- `tests/client.test.ts` — Signing, custom network, USD conversion tests
- `tests/x402-handler.test.ts` — Header-based 402 test
- `vitest.config.ts` — Add coverage configuration

---

*Created by @pm — Story 1.4*
