# Checklist: Org Health Check Validation

**Purpose:** Validates outputs of wf-org-health-check workflow
**Workflow:** wf-org-health-check
**Quality Gate:** TT-QG-002
**Type:** BLOCKING — workflow cannot be marked complete until this passes

---

## Pre-Check: Phase Completion

```yaml
phase_completion:
  - check: "Phase 1 (Root Cause Diagnosis) completed by @ruth-malan"
    type: blocking
    artifact: "org-health-diagnostic-report.md"
    fail_action: "BLOCK — Cannot proceed without diagnosis"

  - check: "Phase 2a (Structure Analysis) by @matthew-skelton — if STRUCTURE problem"
    type: conditional
    condition: "problem_classification includes STRUCTURE"
    artifact: "team-structure-analysis.md"
    fail_action: "BLOCK — Structure problem identified but not analyzed"

  - check: "Phase 2b (Interaction Redesign) by @manuel-pais — if INTERACTION problem"
    type: conditional
    condition: "problem_classification includes INTERACTION or GOVERNANCE"
    artifact: "interaction-redesign-plan.md"
    fail_action: "BLOCK — Interaction problem identified but not addressed"

  - check: "Synthesis completed by @team-taxonomy-chief"
    type: blocking
    artifact: "synthesis-report.md"
    fail_action: "BLOCK — Cannot validate without synthesis"
```

---

## 1. Diagnostic Quality (Phase 1)

- [ ] **Root cause identified** (not just symptoms)
  ```yaml
  type: blocking
  check: "Report contains 5-whys analysis for each problem"
  fail_action: "BLOCK — Symptom-level diagnosis leads to wrong fixes"
  ```

- [ ] **Problem type classified** (Structure/Interaction/Governance/Tools/Culture)
  ```yaml
  type: blocking
  check: "Classification with percentage weights and evidence"
  fail_action: "BLOCK — Cannot route to correct specialist without classification"
  ```

- [ ] **Evidence-based diagnosis** (at least 3 evidence points)
  ```yaml
  type: blocking
  check: "Each classification has >=3 supporting data points"
  fail_action: "BLOCK — Premature diagnosis without evidence"
  ```

- [ ] **Not person-blaming**
  ```yaml
  type: blocking
  check: "Root causes are systemic, not individual"
  fail_action: "BLOCK — Person-blame is always a symptom, not a cause"
  ```

- [ ] **Fix priority order defined**
  ```yaml
  type: blocking
  check: "Fixes ordered by impact/cost ratio"
  fail_action: "BLOCK — Without priority, stakeholders pick wrong fix first"
  ```

---

## 2. Structure Analysis (Phase 2a — Conditional)

- [ ] **Current teams classified** against 4-type model
  ```yaml
  type: blocking
  condition: "phase_2a was executed"
  check: "Every team has type classification"
  fail_action: "BLOCK — Cannot identify gaps without current classification"
  ```

- [ ] **Gap analysis completed**
  ```yaml
  type: blocking
  condition: "phase_2a was executed"
  check: "Current vs ideal topology comparison exists"
  fail_action: "BLOCK — No gap analysis = no clear target"
  ```

- [ ] **Transition plan is phased** (not big-bang)
  ```yaml
  type: warning
  condition: "phase_2a was executed"
  check: "Transition has multiple phases"
  fail_action: "WARN — Big-bang restructuring is high risk"
  ```

---

## 3. Interaction Redesign (Phase 2b — Conditional)

- [ ] **Every dysfunctional interaction addressed**
  ```yaml
  type: blocking
  condition: "phase_2b was executed"
  check: "All identified interaction problems have new mode assigned"
  fail_action: "BLOCK — Unaddressed interactions remain dysfunctional"
  ```

- [ ] **Team contracts created** for XaaS interactions
  ```yaml
  type: blocking
  condition: "phase_2b was executed"
  check: "Written contracts with SLAs exist"
  fail_action: "BLOCK — XaaS without contract is not real"
  ```

- [ ] **Decision authority matrix** (if governance problem)
  ```yaml
  type: blocking
  condition: "problem includes GOVERNANCE"
  check: "Matrix defines who decides what, with escalation"
  fail_action: "BLOCK — Governance problem requires authority matrix"
  ```

- [ ] **Quick wins identified** (week 1 actions)
  ```yaml
  type: warning
  condition: "phase_2b was executed"
  check: "At least 2 actions for immediate implementation"
  fail_action: "WARN — Quick wins build momentum and trust"
  ```

---

## 4. Synthesis Validation

- [ ] **Diagnosis-to-fix alignment**
  ```yaml
  type: blocking
  check: "Recommended fixes directly address classified root causes"
  fail_action: "BLOCK — Fixes don't match diagnosis"
  ```

- [ ] **Implementation roadmap with owners**
  ```yaml
  type: blocking
  check: "Every action has an owner and a deadline"
  fail_action: "BLOCK — Unowned actions never get done"
  ```

- [ ] **Success metrics defined**
  ```yaml
  type: warning
  check: "Measurable before/after metrics"
  fail_action: "WARN — Cannot prove improvement without metrics"
  ```

- [ ] **Monitoring plan exists**
  ```yaml
  type: warning
  check: "Cadence for checking if fixes work"
  fail_action: "WARN — Fixes may drift without monitoring"
  ```

---

## Scoring

```yaml
scoring:
  total_checks: 16
  blocking_checks: 10
  warning_checks: 4
  conditional_checks: 2

  pass_criteria:
    blocking: "ALL applicable blocking checks must pass"
    warning: "At least 3/4 warning checks should pass"

  score_calculation:
    blocking_pass: "Each blocking check = 7 points"
    warning_pass: "Each warning check = 5 points"
    bonus: "All checks pass = 10 bonus points"
    max_score: 100

  thresholds:
    pass: ">= 70"
    excellent: ">= 90"
    fail: "Any blocking check failed"
```

---

**Checklist Version:** 1.0
**Created:** 2026-02-10
**Squad:** team-taxonomy
