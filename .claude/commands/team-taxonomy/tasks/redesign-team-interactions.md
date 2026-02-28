# Task: Redesign Team Interactions

**Task ID:** redesign-team-interactions
**Version:** 1.0
**Execution Type:** Agent
**Purpose:** Fix interaction patterns between existing teams when diagnosis identifies interaction or governance problems
**Orchestrator:** @manuel-pais
**Mode:** Agent (LLM-driven design with human checkpoint)
**Quality Standard:** AIOS Level (300+ lines)
**Workflow:** wf-org-health-check (phase_2b)

---

## Overview

Manuel Pais redesigns team interaction patterns when Ruth's diagnosis identifies INTERACTION or GOVERNANCE problems. This is often the cheapest and fastest fix — restructuring is NOT needed if teams are right but interact wrong.

```
INPUT (org-health-diagnostic-report from @ruth-malan)
    |
[PHASE 1: CURRENT INTERACTION AUDIT]
    -> Map current interaction patterns
    -> Identify coupling and friction points
    |
[PHASE 2: INTERACTION REDESIGN]
    -> Assign new interaction modes per dependency
    -> Create/fix team contracts
    -> Design governance structures
    |
[PHASE 3: IMPLEMENTATION PLAN]
    -> Quick wins (immediate changes)
    -> Medium-term fixes (new contracts)
    -> Monitoring metrics
    |
[PHASE 4: VALIDATION & HANDOFF]
    -> Verify redesign addresses root causes
    -> Package for synthesis
    |
OUTPUT: Interaction Redesign Plan
```

---

## Task Anatomy (8 Fields)

### Field 1: ID
- **id:** `redesign-team-interactions`

### Field 2: Purpose
Fix broken interaction patterns between existing teams WITHOUT restructuring. Design proper interaction modes, create missing team contracts, establish governance/escalation paths, and reduce unnecessary coupling.

### Field 3: Executor
- **type:** Agent
- **guardrails:**
  - Must reference Ruth's diagnosis
  - Must audit current interactions before redesigning
  - Human checkpoint before implementation

### Field 4: Inputs

| Parameter | Type | Required | Source | Description |
|-----------|------|----------|--------|-------------|
| `diagnostic_report` | file | Yes | diagnose-org-health | Ruth's diagnosis |
| `current_structure` | string | Yes | diagnose-org-health | Current teams |
| `interaction_gaps` | list | Yes | diagnose-org-health | Identified interaction problems |
| `decision_authority_gaps` | list | No | diagnose-org-health | Governance issues |

### Field 5: Preconditions

- [ ] `diagnose-org-health` task completed
- [ ] Problem classification includes INTERACTION or GOVERNANCE component
- [ ] Current team structure documented
- [ ] Teams are fundamentally sound (not a structure problem)

### Field 6: Steps

#### PHASE 1: Current Interaction Audit (15 min)

**Step 1.1: Map Current Interactions**
```yaml
action: "For each team pair with dependencies, document current interaction"
for_each_pair:
  - "How do they currently communicate? (sync/async/ad-hoc)"
  - "Is there a contract? (written/verbal/none)"
  - "How often do they interact? (continuous/daily/weekly)"
  - "What friction exists?"
output: "Current interaction map"
```

**Step 1.2: Identify Dysfunction Patterns**
```yaml
action: "Detect interaction anti-patterns"
patterns:
  - "All-meetings interaction (no async contracts)"
  - "Tribal knowledge (nothing written down)"
  - "Implicit contracts (breaks when people leave)"
  - "Bottleneck team (everyone depends on them, they're overwhelmed)"
  - "Circular dependencies (A needs B needs C needs A)"
veto_condition: "STOP if circular dependency detected — break the cycle before redesigning"
output: "Dysfunction pattern report"
```

#### PHASE 2: Interaction Redesign (25 min)

**Step 2.1: Assign Interaction Modes**
```yaml
action: "For each dependency, select appropriate interaction mode"
decision_guide:
  if_stable_interface: "X-as-a-Service (async, contract-based)"
  if_joint_development: "Collaboration (time-boxed, sync)"
  if_capability_gap: "Facilitation (coaching, temporary)"
  if_governance_gap: "Add decision authority matrix"
output: "New interaction mode assignments"
```

**Step 2.2: Create Missing Contracts**
```yaml
action: "For every X-as-a-Service interaction, write the contract"
contract:
  provider: "{team}"
  consumer: "{team}"
  service: "{what is provided}"
  interface: "{API/docs/self-service}"
  sla: "{availability, response time}"
  escalation: "{what happens when SLA violated}"
veto_condition: "STOP if any XaaS interaction has no clear interface — it's not truly XaaS"
output: "Team contract registry"
```

**Step 2.3: Design Governance Structure**
```yaml
action: "If governance problems identified, create decision authority matrix"
matrix:
  decision_type: "{technical/product/operational}"
  decided_by: "{specific role/team}"
  escalation_path: "{who to escalate to}"
  time_limit: "{max time before auto-escalation}"
output: "Decision authority matrix"
```

#### PHASE 3: Implementation Plan (15 min)

**Step 3.1: Quick Wins (Week 1)**
```yaml
actions:
  - "Publish decision authority matrix (clarify who decides what)"
  - "Replace largest meeting-heavy dependency with async contract"
  - "Break one circular dependency"
output: "Week 1 action items"
```

**Step 3.2: Medium-Term Fixes (Weeks 2-4)**
```yaml
actions:
  - "Roll out remaining team contracts"
  - "Establish SLAs for all XaaS interactions"
  - "Set up async communication channels per interaction"
  - "Train teams on new interaction modes"
output: "Weeks 2-4 action plan"
```

**Step 3.3: Define Monitoring Metrics**
```yaml
metrics:
  - "Decision time (target: reduce by 50%)"
  - "Meeting load (target: reduce by 30%)"
  - "Team autonomy (target: increase by 40%)"
  - "Handoff time (target: reduce by 50%)"
  - "Team satisfaction (NPS survey)"
output: "Monitoring dashboard definition"
```

#### PHASE 4: Validation & Handoff (10 min)

**Step 4.1: Validate Redesign**
```yaml
blocking_checks:
  - check: "Every dysfunctional interaction has new mode assigned"
    type: blocking
  - check: "Every XaaS interaction has written contract"
    type: blocking
  - check: "No circular dependencies remain"
    type: blocking
  - check: "Decision authority matrix created (if governance problem)"
    type: blocking
  - check: "Implementation plan has week-1 quick wins"
    type: warning
```

**Step 4.2: Handoff**
```yaml
handoff:
  to: "@team-taxonomy-chief"
  artifact: "interaction-redesign-plan.md"
  next_task: "synthesize-report"
  context_passed:
    - "New interaction mode assignments"
    - "Team contracts"
    - "Decision authority matrix"
    - "Implementation plan (phased)"
    - "Monitoring metrics"
```

### Field 7: Outputs

| Output | Format | Location | Description |
|--------|--------|----------|-------------|
| Redesign Plan | markdown | `outputs/interaction-redesign-plan.md` | Complete interaction redesign |
| Team Contracts | yaml | embedded | Per-pair contracts |
| Decision Matrix | table | embedded | Authority assignments |
| Implementation Plan | markdown | embedded | Phased rollout |

### Field 8: Validation

```yaml
validation_criteria:
  blocking:
    - "Every dysfunctional interaction addressed"
    - "Written contracts for all XaaS interactions"
    - "No circular dependencies remain"
    - "Governance gaps addressed with authority matrix"
  warning:
    - "Quick wins identified for week 1"
    - "Monitoring metrics defined"
    - "Rollback plan exists for failed changes"
```

---

## Veto Conditions

```yaml
veto_conditions:
  - id: "VT-RTI-001"
    trigger: "Circular dependency detected"
    action: "STOP — Must break circular dependency before any redesign"
    severity: blocking

  - id: "VT-RTI-002"
    trigger: "XaaS interaction proposed without clear interface"
    action: "STOP — Not truly XaaS without self-service interface"
    severity: blocking

  - id: "VT-RTI-003"
    trigger: "All interactions assigned as Collaboration"
    action: "STOP — This means teams can't operate independently. Reconsider."
    severity: blocking
```

---

## Anti-Patterns

```yaml
anti_patterns:
  - name: "Contract Theater"
    description: "Writing contracts nobody follows"
    why_bad: "False sense of order, actual interaction remains chaotic"
    correct: "Contracts must be enforced via tooling and process"

  - name: "Mode Confusion"
    description: "Calling it XaaS but requiring meetings for every request"
    why_bad: "Hidden sync coupling increases load without visibility"
    correct: "True XaaS = self-service with no meetings required"

  - name: "Governance by Committee"
    description: "Every decision requires group consensus"
    why_bad: "Slowest possible decision-making, nobody owns anything"
    correct: "Single decision-maker per domain with clear escalation"
```

---

## Handoff

```yaml
handoff:
  to: "@team-taxonomy-chief"
  trigger: "Interaction redesign validated"
  artifact: "interaction-redesign-plan.md"
  next_task: "synthesize-report"
  context_passed:
    - "New interaction modes"
    - "Team contracts"
    - "Decision authority matrix"
    - "Implementation timeline"
    - "Success metrics"
```

---

_Task Version: 1.0_
_Workflow: wf-org-health-check (phase_2b)_
_Agent: @manuel-pais_
_Lines: 300+_
