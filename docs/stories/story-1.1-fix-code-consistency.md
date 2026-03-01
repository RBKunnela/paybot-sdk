# Story 1.1: Fix Code Consistency

**Epic:** EPIC-TD-1
**Status:** Done
**Priority:** P0
**Estimated Effort:** 2.6-3.6h

---

## Objective

Fix critical code consistency issues in `client.ts` and correct documentation mismatches.

## Tasks

- [x] **TD-M3:** Fix JSDoc URL in `types.ts:9` — change "facilitator.paybot.dev" to "api.paybotcore.com"
- [x] **TD-C2:** Replace hardcoded USDC contract `0x036CbD53842c5426634e7929541eC2318f3dCF7e` in `pay()` default with reference to `NETWORKS` config from `networks.ts`
- [x] **TD-C1:** Refactor `pay()` to use the shared `_request()` wrapper for verify and settle calls, or extract the shared fetch+auth logic to avoid duplication
- [x] Update existing tests if method signatures change
- [x] Verify all 52+ tests still pass

## Acceptance Criteria

- [x] `types.ts` JSDoc URL matches actual default facilitator URL
- [x] `pay()` no longer hardcodes USDC contract address
- [x] `pay()` uses consistent auth header and error handling pattern with other methods
- [x] All existing tests pass
- [x] TypeScript compiles without errors

## Definition of Done

- [x] Code changes committed
- [x] Tests pass: `npm test`
- [x] Type check passes: `npm run type-check`
- [x] No regressions in payment flow

## File List

- `src/types.ts` — JSDoc fix
- `src/client.ts` — Refactor pay(), extract hardcoded address
- `tests/client.test.ts` — Update if needed

---

*Created by @pm — Story 1.1*
