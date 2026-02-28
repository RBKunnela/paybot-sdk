# Checklist: Team Design Validation

**Purpose:** Validates outputs of wf-design-team-structure workflow
**Workflow:** wf-design-team-structure
**Quality Gate:** TT-QG-001
**Type:** BLOCKING — workflow cannot be marked complete until this passes

---

## Pre-Check: Phase Completion

```yaml
phase_completion:
  - check: "Phase 1 (Context Analysis) completed by @ruth-malan"
    type: blocking
    artifact: "context-analysis-report.md"
    fail_action: "BLOCK — Cannot validate without diagnosis"

  - check: "Phase 2 (Topology Design) completed by @matthew-skelton"
    type: blocking
    artifact: "team-topology-design.md"
    fail_action: "BLOCK — Cannot validate without topology"

  - check: "Phase 3 (Interaction Design) completed by @manuel-pais"
    type: blocking
    artifact: "team-interaction-design.md"
    fail_action: "BLOCK — Cannot validate without interactions"

  - check: "Synthesis completed by @team-taxonomy-chief"
    type: blocking
    artifact: "synthesis-report.md"
    fail_action: "BLOCK — Cannot validate without synthesis"
```

---

## 1. Context Analysis Validation (Phase 1)

- [ ] **Value streams identified** (at least 2)
  ```yaml
  type: blocking
  check: "context-analysis-report contains explicit value stream list"
  fail_action: "BLOCK — No value streams = no foundation for design"
  ```

- [ ] **Problem type classified** with evidence
  ```yaml
  type: blocking
  check: "Classification has >=3 evidence points"
  fail_action: "BLOCK — Unsubstantiated diagnosis"
  ```

- [ ] **Cognitive load assessed** per existing team
  ```yaml
  type: warning
  check: "Load assessment exists for each team"
  fail_action: "WARN — Load assessment improves design quality"
  ```

- [ ] **Decision authority mapped**
  ```yaml
  type: warning
  check: "Decision authority gaps identified"
  fail_action: "WARN — Governance gaps may surface later"
  ```

---

## 2. Topology Design Validation (Phase 2)

- [ ] **Every team has explicit type** (SA/Platform/Enabling/CS)
  ```yaml
  type: blocking
  check: "All teams in roster have type field"
  fail_action: "BLOCK — Unclassified teams create ambiguity"
  ```

- [ ] **Stream-aligned teams are majority** (>50%)
  ```yaml
  type: warning
  check: "Count SA teams > Count other types"
  fail_action: "WARN — Organization may be infrastructure-heavy"
  ```

- [ ] **Cognitive load sustainable** (no RED teams)
  ```yaml
  type: blocking
  check: "No team has RED cognitive load"
  fail_action: "BLOCK — Overloaded teams will fail"
  ```

- [ ] **Team APIs defined** (provides/consumes for each team)
  ```yaml
  type: blocking
  check: "Every team has provides[] and consumes[] lists"
  fail_action: "BLOCK — Teams without APIs create hidden dependencies"
  ```

- [ ] **Conway's Law check passed**
  ```yaml
  type: blocking
  check: "Team boundaries align with desired system architecture"
  fail_action: "BLOCK — Structure will produce wrong architecture"
  ```

- [ ] **Enabling teams have sunset dates**
  ```yaml
  type: warning
  check: "All enabling teams have exit criteria and timeline"
  fail_action: "WARN — Permanent enabling teams become bottlenecks"
  ```

---

## 3. Interaction Design Validation (Phase 3)

- [ ] **Every dependency has interaction mode**
  ```yaml
  type: blocking
  check: "All team pairs with dependencies have mode assigned"
  fail_action: "BLOCK — Undefined interactions are chaotic interactions"
  ```

- [ ] **X-as-a-Service contracts written**
  ```yaml
  type: blocking
  check: "Every XaaS interaction has contract with SLA"
  fail_action: "BLOCK — XaaS without contract is not XaaS"
  ```

- [ ] **No more than 3 active collaboration modes**
  ```yaml
  type: blocking
  check: "Count collaboration modes <= 3"
  fail_action: "BLOCK — Too much sync coupling, org cannot sustain"
  ```

- [ ] **Coupling analysis completed**
  ```yaml
  type: warning
  check: "Temporal, knowledge, ownership coupling assessed"
  fail_action: "WARN — Hidden coupling may surface later"
  ```

- [ ] **Communication protocols defined**
  ```yaml
  type: warning
  check: "Each interaction mode has communication protocol"
  fail_action: "WARN — Teams won't know HOW to interact"
  ```

---

## 4. Synthesis Validation

- [ ] **All specialist outputs integrated**
  ```yaml
  type: blocking
  check: "Synthesis report references all 3 specialist outputs"
  fail_action: "BLOCK — Incomplete synthesis"
  ```

- [ ] **Contradictions resolved** with rationale
  ```yaml
  type: blocking
  check: "Any specialist disagreements are documented and resolved"
  fail_action: "BLOCK — Hidden disagreements will surface during implementation"
  ```

- [ ] **Implementation roadmap exists** with owners and dates
  ```yaml
  type: blocking
  check: "Roadmap has phases, owners, timeline"
  fail_action: "BLOCK — Report without roadmap is analysis paralysis"
  ```

- [ ] **Success metrics defined** and measurable
  ```yaml
  type: warning
  check: "Metrics have measurement method and target values"
  fail_action: "WARN — Cannot verify success without metrics"
  ```

---

## Scoring

```yaml
scoring:
  total_checks: 16
  blocking_checks: 10
  warning_checks: 6

  pass_criteria:
    blocking: "ALL blocking checks must pass (10/10)"
    warning: "At least 4/6 warning checks should pass"

  score_calculation:
    blocking_pass: "Each blocking check = 6 points (60 total)"
    warning_pass: "Each warning check = 4 points (24 total)"
    bonus: "All checks pass = 16 bonus points"
    max_score: 100

  thresholds:
    pass: ">= 76 (all blocking + 4 warnings)"
    excellent: ">= 90 (all blocking + 5+ warnings)"
    fail: "< 60 (any blocking check failed)"
```

---

**Checklist Version:** 1.0
**Created:** 2026-02-10
**Squad:** team-taxonomy
