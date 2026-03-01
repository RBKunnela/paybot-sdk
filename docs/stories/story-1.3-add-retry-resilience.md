# Story 1.3: Add Retry/Timeout Resilience

**Epic:** EPIC-TD-1
**Status:** Done
**Priority:** P1
**Estimated Effort:** 3-4h
**Depends on:** Story 1.1

---

## Objective

Add configurable retry logic with exponential backoff and request timeouts to prevent network failures from causing immediate SDK errors.

## Tasks

- [x] **TD-H1:** Add retry logic to `_request()`:
  - Configurable max retries (default: 1)
  - Exponential backoff (100ms, 200ms, 400ms...)
  - Only retry on network errors and 5xx responses
  - Do NOT retry on 4xx (client errors)
- [x] Add configurable request timeout via AbortController
  - Default: 30 seconds
  - Configurable in `PayBotConfig`
- [x] Add `retries` and `timeout` to `PayBotConfig` interface
- [x] Add tests for retry behavior
- [x] Add tests for timeout behavior

## Acceptance Criteria

- [x] Network errors trigger 1 automatic retry
- [x] 5xx responses trigger 1 automatic retry
- [x] 4xx responses fail immediately (no retry)
- [x] Requests timeout after 30 seconds by default
- [x] Retry count and timeout are configurable
- [x] All existing tests still pass
- [x] New retry/timeout tests added (5+ tests)

## Definition of Done

- [x] Code changes committed
- [x] Tests pass: `npm test`
- [x] Type check passes: `npm run type-check`
- [x] Retry behavior documented in README

## File List

- `src/types.ts` — Add `retries`, `timeout` to PayBotConfig
- `src/client.ts` — Implement retry + timeout in `_request()`
- `tests/client.test.ts` — Retry/timeout tests

---

*Created by @pm — Story 1.3*
