# Story 1.2: Add Input Validation

**Epic:** EPIC-TD-1
**Status:** Done
**Priority:** P1
**Estimated Effort:** 3h
**Depends on:** Story 1.1

---

## Objective

Add runtime validation for `PayBotConfig` constructor inputs and `usdToBaseUnits()` to prevent silent failures and incorrect payment amounts.

## Tasks

- [x] **TD-H5:** Add constructor validation for `PayBotConfig`:
  - `apiKey` must be non-empty string
  - `botId` must be non-empty string
  - `facilitatorUrl` if provided must be valid URL
  - `walletPrivateKey` if provided must start with `0x`
  - Throw descriptive errors on invalid input
- [x] **TD-M1:** Add input validation to `usdToBaseUnits()`:
  - Reject negative values
  - Reject non-numeric strings
  - Reject empty strings
  - Handle edge cases (e.g., "0", ".5", "100.")
- [x] Add tests for all validation cases

## Acceptance Criteria

- [x] `new PayBotClient({ apiKey: '', botId: 'x' })` throws with clear message
- [x] `new PayBotClient({ apiKey: 'x', botId: '' })` throws with clear message
- [x] `usdToBaseUnits('-1')` throws or returns error
- [x] `usdToBaseUnits('abc')` throws or returns error
- [x] All existing tests still pass
- [x] New validation tests added (6+ tests)

## Definition of Done

- [x] Code changes committed
- [x] Tests pass: `npm test`
- [x] Type check passes: `npm run type-check`
- [x] Edge cases documented in test file

## File List

- `src/client.ts` — Validation logic
- `tests/client.test.ts` — Validation tests

---

*Created by @pm — Story 1.2*
