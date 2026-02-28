# Checklist: Agent Validation

**Purpose:** Validates outputs of wf-validate-ai-agents workflow
**Workflow:** wf-validate-ai-agents
**Quality Gate:** TT-QG-003
**Type:** BLOCKING — workflow cannot be marked complete until this passes

---

## Pre-Check: Phase Completion

```yaml
phase_completion:
  - check: "Phase 1 (Topology Assessment) completed by @matthew-skelton"
    type: blocking
    artifact: "agent-topology-assessment.md"
    fail_action: "BLOCK — Cannot validate without topology assessment"

  - check: "Phase 2 (Orchestration Design) completed by @barry-hawkins"
    type: blocking
    artifact: "agent-orchestration-design.md"
    fail_action: "BLOCK — Cannot validate without orchestration design"

  - check: "Phase 3 (Game-Theoretic Validation) completed by @yoav-shoham"
    type: blocking
    artifact: "game-theoretic-validation-report.md"
    fail_action: "BLOCK — Cannot validate without game-theoretic analysis"

  - check: "Synthesis completed by @team-taxonomy-chief"
    type: blocking
    artifact: "synthesis-report.md"
    fail_action: "BLOCK — Cannot validate without synthesis"
```

---

## 1. Topology Assessment (Phase 1)

- [ ] **Every agent classified by type**
  ```yaml
  type: blocking
  check: "All agents have SA/Platform/Enabling/CS/Orchestrator type"
  fail_action: "BLOCK — Unclassified agents create role ambiguity"
  ```

- [ ] **No agent with HIGH cognitive load** (>7 responsibilities)
  ```yaml
  type: blocking
  check: "Cognitive load matrix shows no RED entries"
  fail_action: "BLOCK — Overloaded agents produce poor quality"
  ```

- [ ] **Orchestration pattern recommended**
  ```yaml
  type: blocking
  check: "Sequential/Parallel/Hierarchical/Conditional pattern specified"
  fail_action: "BLOCK — No pattern = undefined agent behavior"
  ```

- [ ] **Conway's Law check performed**
  ```yaml
  type: warning
  check: "Agent boundaries align with artifact boundaries"
  fail_action: "WARN — Misalignment may cause unexpected outputs"
  ```

---

## 2. Orchestration Design (Phase 2)

- [ ] **Every agent has boundary matrix** (can/cannot/requires)
  ```yaml
  type: blocking
  check: "All agents have explicit can_do, cannot_do, requires_approval lists"
  fail_action: "BLOCK — Unbounded agents are unsafe"
  ```

- [ ] **Every feedback loop has iteration limit**
  ```yaml
  type: blocking
  check: "All loops specify max_iterations"
  fail_action: "BLOCK — Unlimited loops crash systems"
  ```

- [ ] **FMEA completed** for critical paths
  ```yaml
  type: blocking
  check: "Failure modes identified with likelihood, severity, mitigation"
  fail_action: "BLOCK — Unknown failure modes will surprise at runtime"
  ```

- [ ] **No CRITICAL failure** without mitigation
  ```yaml
  type: blocking
  check: "All CRITICAL failures have mitigation strategies"
  fail_action: "BLOCK — Unmitigated critical failures = unsafe deployment"
  ```

- [ ] **Human-in-the-loop gates** for irreversible actions
  ```yaml
  type: blocking
  check: "Irreversible actions (delete, publish, deploy) have human gates"
  fail_action: "BLOCK — Irreversible actions must have human approval"
  ```

- [ ] **Handoff protocols defined** between agents
  ```yaml
  type: warning
  check: "Each agent-to-agent handoff has artifact, format, validation"
  fail_action: "WARN — Undefined handoffs cause data loss"
  ```

---

## 3. Game-Theoretic Validation (Phase 3)

- [ ] **Every interaction modeled** as game
  ```yaml
  type: blocking
  check: "All agent-to-agent interactions have game model"
  fail_action: "BLOCK — Unmodeled interactions have unknown dynamics"
  ```

- [ ] **Equilibria identified** for all games
  ```yaml
  type: blocking
  check: "Nash equilibria found and classified (desirable/undesirable)"
  fail_action: "BLOCK — Cannot validate without equilibrium analysis"
  ```

- [ ] **No unmitigated pathological equilibria**
  ```yaml
  type: blocking
  check: "Deadlocks, infinite loops, collusion all have mitigations"
  fail_action: "BLOCK — Pathological states will manifest at runtime"
  ```

- [ ] **GO/NO-GO decision issued**
  ```yaml
  type: blocking
  check: "Explicit GO or NO-GO with rationale"
  fail_action: "BLOCK — Cannot proceed without deployment decision"
  ```

- [ ] **Stability assessment completed**
  ```yaml
  type: warning
  check: "Equilibria tested for robustness under perturbation"
  fail_action: "WARN — Fragile equilibria may break under load"
  ```

---

## 4. Synthesis Validation

- [ ] **All 3 specialist outputs integrated**
  ```yaml
  type: blocking
  check: "Synthesis references topology + orchestration + validation"
  fail_action: "BLOCK — Incomplete synthesis"
  ```

- [ ] **GO/NO-GO is consistent** across all phases
  ```yaml
  type: blocking
  check: "If Yoav says NO-GO, synthesis reflects this"
  fail_action: "BLOCK — Cannot override NO-GO without resolution"
  ```

- [ ] **Implementation checklist generated**
  ```yaml
  type: warning
  check: "Step-by-step implementation instructions"
  fail_action: "WARN — Developers need clear instructions"
  ```

---

## Scoring

```yaml
scoring:
  total_checks: 19
  blocking_checks: 14
  warning_checks: 5

  pass_criteria:
    blocking: "ALL blocking checks must pass (14/14)"
    warning: "At least 3/5 warning checks should pass"

  score_calculation:
    blocking_pass: "Each blocking check = 5 points (70 total)"
    warning_pass: "Each warning check = 4 points (20 total)"
    bonus: "All checks pass = 10 bonus points"
    max_score: 100

  thresholds:
    pass: ">= 82 (all blocking + 3 warnings)"
    excellent: ">= 94 (all blocking + all warnings)"
    fail: "Any blocking check failed"
```

---

**Checklist Version:** 1.0
**Created:** 2026-02-10
**Squad:** team-taxonomy
