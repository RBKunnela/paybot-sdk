# Checklist: Interaction Quality Gate

**Purpose:** Quality gate for team interaction pattern designs
**Quality Gate:** TT-QG-005
**Type:** BLOCKING — interaction design cannot be approved without passing this gate

---

## When to Use

Run this checklist whenever interaction patterns are designed or redesigned, whether for:
- New team structures (wf-design-team-structure, phase_3)
- Existing team fixes (wf-org-health-check, phase_2b)
- Any interaction pattern modification

---

## 1. Mode Assignment

- [ ] **Every dependency has interaction mode**
  ```yaml
  type: blocking
  check: "All team pairs with dependencies have Collaboration/XaaS/Facilitation assigned"
  fail_action: "BLOCK — Undefined interactions default to chaos"
  ```

- [ ] **X-as-a-Service is dominant mode** (>60% of interactions)
  ```yaml
  type: warning
  check: "Majority of interactions are async/contract-based"
  fail_action: "WARN — Sync-heavy organization doesn't scale"
  ```

- [ ] **No more than 3 active Collaboration modes**
  ```yaml
  type: blocking
  check: "Count of Collaboration interactions <= 3"
  fail_action: "BLOCK — Organization cannot sustain >3 simultaneous high-touch collaborations"
  ```

- [ ] **All Collaboration modes are time-boxed**
  ```yaml
  type: blocking
  check: "Every Collaboration interaction has end date"
  fail_action: "BLOCK — Open-ended collaboration = unrecognized coupling"
  ```

---

## 2. Contracts

- [ ] **XaaS interactions have written contracts**
  ```yaml
  type: blocking
  check: "Every XaaS pair has provider, consumer, service, SLA defined"
  fail_action: "BLOCK — XaaS without contract is theater, not service"
  ```

- [ ] **Contracts have SLAs** (availability, response time)
  ```yaml
  type: blocking
  check: "Each contract has measurable SLA targets"
  fail_action: "BLOCK — SLA-less contracts have no accountability"
  ```

- [ ] **Escalation paths defined** for SLA violations
  ```yaml
  type: warning
  check: "Each contract specifies what happens when SLA is broken"
  fail_action: "WARN — SLA violations without escalation are ignored"
  ```

---

## 3. Coupling

- [ ] **Coupling assessed** (temporal, knowledge, ownership)
  ```yaml
  type: blocking
  check: "All interactions have 3-dimension coupling rating"
  fail_action: "BLOCK — Hidden coupling is the #1 org dysfunction"
  ```

- [ ] **No HIGH coupling on all 3 dimensions** for any pair
  ```yaml
  type: blocking
  check: "No interaction has HIGH/HIGH/HIGH coupling"
  fail_action: "BLOCK — Triple-high coupling = teams should be merged or decoupled urgently"
  ```

- [ ] **Coupling reduction strategies** for HIGH-rated dimensions
  ```yaml
  type: warning
  check: "Each HIGH coupling has specific reduction strategy"
  fail_action: "WARN — HIGH coupling without plan will worsen"
  ```

---

## 4. Communication

- [ ] **Communication protocols per mode**
  ```yaml
  type: warning
  check: "Each interaction mode has defined communication channels and cadence"
  fail_action: "WARN — Teams won't know HOW to interact"
  ```

- [ ] **No circular dependencies**
  ```yaml
  type: blocking
  check: "No A->B->C->A dependency cycles"
  fail_action: "BLOCK — Circular deps create deadlocks"
  ```

---

## 5. Facilitation

- [ ] **Exit criteria defined** for all Facilitation interactions
  ```yaml
  type: warning
  check: "Each facilitation has measurable exit criteria and timeline"
  fail_action: "WARN — Endless facilitation = permanent dependency"
  ```

---

## Scoring

```yaml
scoring:
  total_checks: 13
  blocking_checks: 8
  warning_checks: 5

  pass_criteria:
    blocking: "ALL 8 blocking checks must pass"
    warning: "At least 3/5 warning checks should pass"

  score_calculation:
    blocking_weight: 10
    warning_weight: 5
    max_score: 105  # (8 x 10) + (5 x 5)
    formula: "(passed_blocking x 10) + (passed_warning x 5)"

  thresholds:
    excellent: ">= 100 (all checks pass)"
    pass: ">= 80 (all blocking pass)"
    fail: "< 80 or any blocking check fails"
```

---

**Checklist Version:** 1.0
**Created:** 2026-02-10
**Squad:** team-taxonomy
