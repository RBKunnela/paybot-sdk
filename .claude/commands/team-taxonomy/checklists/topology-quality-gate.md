# Checklist: Topology Quality Gate

**Purpose:** Quality gate for team topology designs (human or AI agent)
**Quality Gate:** TT-QG-004
**Type:** BLOCKING — topology cannot be approved without passing this gate

---

## When to Use

Run this checklist whenever a team topology design is produced, whether for:
- Human team structures (wf-design-team-structure)
- AI agent squad structures (wf-validate-ai-agents)
- Any topology redesign or modification

---

## 1. Structure Fundamentals

- [ ] **All teams classified** using 4-type model
  ```yaml
  type: blocking
  check: "Every team/agent is Stream-Aligned, Platform, Enabling, or Complicated-Subsystem"
  fail_action: "BLOCK — Unclassified units create organizational ambiguity"
  ```

- [ ] **Value stream alignment** verified
  ```yaml
  type: blocking
  check: "Every stream-aligned team maps to exactly one value stream"
  fail_action: "BLOCK — Teams serving multiple streams will be pulled in conflicting directions"
  ```

- [ ] **No technology-layer teams**
  ```yaml
  type: blocking
  check: "No team organized purely by technology (frontend, backend, data)"
  fail_action: "BLOCK — Technology layers create handoff friction across every feature"
  ```

- [ ] **Team sizes within bounds** (3-12 people / 2-8 agents)
  ```yaml
  type: blocking
  check: "All teams within size guidelines"
  fail_action: "BLOCK — Too small = unsustainable, too large = communication overhead"
  ```

---

## 2. Cognitive Load

- [ ] **Load assessed per team**
  ```yaml
  type: blocking
  check: "Every team has responsibilities count + dependencies count"
  fail_action: "BLOCK — Cannot validate sustainability without load data"
  ```

- [ ] **No RED load teams**
  ```yaml
  type: blocking
  check: "No team exceeds cognitive load threshold"
  fail_action: "BLOCK — Overloaded teams produce poor quality and high turnover"
  ```

- [ ] **Dependencies counted** and minimized
  ```yaml
  type: warning
  check: "Each team has <=3 direct dependencies"
  fail_action: "WARN — Many dependencies increase coordination overhead"
  ```

---

## 3. Conway's Law

- [ ] **Team boundaries match system boundaries**
  ```yaml
  type: blocking
  check: "Team ownership aligns with desired service/component boundaries"
  fail_action: "BLOCK — Misaligned boundaries produce wrong system architecture"
  ```

- [ ] **Communication paths match data flow**
  ```yaml
  type: warning
  check: "Team-to-team communication follows expected data/artifact flow"
  fail_action: "WARN — Communication misalignment creates hidden coupling"
  ```

---

## 4. Temporal Aspects

- [ ] **Enabling teams have sunset** criteria
  ```yaml
  type: warning
  check: "All enabling teams have exit criteria and timeline"
  fail_action: "WARN — Permanent enabling = permanent dependency"
  ```

- [ ] **Evolution path documented**
  ```yaml
  type: warning
  check: "Expected topology changes over 6-12 months noted"
  fail_action: "WARN — Static topology becomes stale"
  ```

---

## Scoring

```yaml
scoring:
  total_checks: 11
  blocking_checks: 7
  warning_checks: 4

  pass_criteria:
    blocking: "ALL 7 blocking checks must pass"
    warning: "At least 2/4 warning checks should pass"

  score_calculation:
    blocking_weight: 10
    warning_weight: 5
    max_score: 90  # (7 x 10) + (4 x 5)
    formula: "(passed_blocking x 10) + (passed_warning x 5)"

  thresholds:
    excellent: ">= 85 (all checks pass)"
    pass: ">= 70 (all blocking pass)"
    fail: "< 70 or any blocking check fails"
```

---

**Checklist Version:** 1.0
**Created:** 2026-02-10
**Squad:** team-taxonomy
