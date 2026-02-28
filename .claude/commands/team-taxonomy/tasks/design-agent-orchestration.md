# Task: Design Agent Orchestration

**Task ID:** design-agent-orchestration
**Version:** 1.0
**Execution Type:** Agent
**Purpose:** Design orchestration pattern, safety constraints, and failure mitigations for multi-agent systems
**Orchestrator:** @barry-hawkins
**Mode:** Agent (LLM-driven design with human checkpoint)
**Quality Standard:** AIOS Level (300+ lines)
**Workflow:** wf-validate-ai-agents (phase_2)

---

## Overview

Barry Hawkins designs the orchestration layer for multi-agent systems. Takes Matthew Skelton's agent topology and designs explicit boundaries, safety constraints, human-in-the-loop gates, failure modes, and cascade risk assessments.

**Key Principle:** Safety before deployment. Agents without explicit boundaries are chaos waiting to happen.

```
INPUT (agent-topology-assessment from @matthew-skelton)
    |
[PHASE 1: BOUNDARY DEFINITION]
    -> Define can-do / cannot-do / requires-approval per agent
    -> Map decision authority limits
    |
[PHASE 2: ORCHESTRATION PATTERN]
    -> Design concrete orchestration flow
    -> Define handoff protocols
    -> Set up human-in-the-loop gates
    |
[PHASE 3: SAFETY & FAILURE ANALYSIS]
    -> Establish safety constraints
    -> FMEA (Failure Mode and Effects Analysis)
    -> Design cascade prevention
    |
[PHASE 4: VALIDATION & HANDOFF]
    -> Verify all agents have explicit boundaries
    -> Handoff to @yoav-shoham for game-theoretic validation
    |
OUTPUT: Agent Orchestration Design Document
```

---

## Task Anatomy (8 Fields)

### Field 1: ID
- **id:** `design-agent-orchestration`

### Field 2: Purpose
Design a safe, explicit orchestration system for multi-agent coordination. Every agent gets boundaries, every interaction gets a protocol, every failure mode gets a mitigation, and humans stay in the loop for critical decisions.

### Field 3: Executor
- **type:** Agent
- **guardrails:**
  - Must define boundaries for EVERY agent (no exceptions)
  - Must complete FMEA before declaring design done
  - Human checkpoint at safety constraints review

### Field 4: Inputs

| Parameter | Type | Required | Source | Description |
|-----------|------|----------|--------|-------------|
| `topology_assessment` | file | Yes | assess-agent-topology | Matthew's agent classification |
| `agent_types` | list | Yes | assess-agent-topology | Agent roster with types |
| `orchestration_pattern` | string | Yes | assess-agent-topology | Recommended pattern |
| `decision_authorities` | list | Yes | user | Authority limits per agent |

### Field 5: Preconditions

- [ ] `assess-agent-topology` task completed
- [ ] Every agent has a type classification
- [ ] Orchestration pattern is recommended
- [ ] Decision authorities are specified

### Field 6: Steps

#### PHASE 1: Boundary Definition (20 min)

**Step 1.1: Define Agent Boundaries**
```yaml
action: "For each agent, define explicit boundary matrix"
template:
  agent: "{name}"
  can_do:
    - "{list of autonomous actions}"
  cannot_do:
    - "{list of forbidden actions}"
  requires_approval:
    - "{list of actions needing human/chief approval}"
  escalation_path: "{who to escalate to}"
veto_condition: "STOP if any agent has no 'cannot_do' list — every agent must have limits"
output: "Agent boundary matrix"
```

**Step 1.2: Map Authority Limits**
```yaml
action: "Define what each agent can decide vs must escalate"
authority_levels:
  autonomous: "Agent decides alone, logs decision"
  advisory: "Agent recommends, human decides"
  forbidden: "Agent cannot take this action under any circumstance"
output: "Authority limit matrix"
```

#### PHASE 2: Orchestration Pattern (25 min)

**Step 2.1: Design Concrete Flow**
```yaml
action: "Translate topology pattern into concrete execution flow"
flow_elements:
  - "Entry point (which agent starts)"
  - "Sequential steps (A -> B -> C)"
  - "Conditional branches (IF X then Y else Z)"
  - "Parallel tracks (A || B then merge)"
  - "Feedback loops (with iteration limits)"
  - "Exit points (success, failure, escalation)"
veto_condition: "STOP if any feedback loop has no iteration limit — infinite loops crash systems"
output: "Orchestration flow diagram"
```

**Step 2.2: Define Handoff Protocols**
```yaml
action: "For each agent-to-agent handoff, define the protocol"
protocol:
  from: "{agent}"
  to: "{agent}"
  artifact_passed: "{what is handed off}"
  format: "{expected format}"
  validation: "{how receiver validates input}"
  on_invalid: "{what happens if input is rejected}"
output: "Handoff protocol registry"
```

**Step 2.3: Set Human-in-the-Loop Gates**
```yaml
action: "Identify where humans must approve/review"
gate_criteria:
  always_gate:
    - "Irreversible actions (delete, publish, deploy)"
    - "External-facing outputs (emails, documents to clients)"
    - "Financial decisions"
  conditional_gate:
    - "Agent confidence < threshold"
    - "Novel scenario (not seen in training data)"
    - "Iteration limit reached"
  never_gate:
    - "Internal analysis steps"
    - "Intermediate artifacts"
output: "Human gate registry"
```

#### PHASE 3: Safety & Failure Analysis (20 min)

**Step 3.1: Establish Safety Constraints**
```yaml
action: "Define system-wide safety constraints"
constraints:
  input_validation: "Every agent validates its inputs before processing"
  output_validation: "Every agent validates its outputs before handoff"
  scope_enforcement: "No agent operates outside its defined boundary"
  resource_limits: "Token limits, time limits, retry limits"
  audit_logging: "All decisions and actions are logged"
output: "Safety constraint matrix"
```

**Step 3.2: FMEA (Failure Mode and Effects Analysis)**
```yaml
action: "Identify every way the system can fail"
for_each_failure_mode:
  - "What can go wrong?"
  - "What is the effect on the system?"
  - "How likely is it? (High/Medium/Low)"
  - "How severe is the impact? (Critical/Major/Minor)"
  - "What is the mitigation?"
  - "What is the recovery procedure?"
common_failure_modes:
  - "Agent produces invalid output"
  - "Agent exceeds boundary"
  - "Infinite loop between agents"
  - "Agent crashes mid-execution"
  - "Human gate timeout (no response)"
  - "Cascade failure (one agent failure triggers others)"
veto_condition: "STOP if any CRITICAL failure mode has no mitigation — design is unsafe"
output: "FMEA report"
```

**Step 3.3: Cascade Prevention**
```yaml
action: "Design circuit breakers to prevent cascade failures"
mechanisms:
  - "Circuit breaker: If agent fails 3x, stop routing to it"
  - "Bulkhead: Isolate agent failures from rest of system"
  - "Timeout: Max execution time per agent"
  - "Fallback: Default behavior when agent unavailable"
output: "Cascade prevention design"
```

#### PHASE 4: Validation & Handoff (10 min)

**Step 4.1: Validate Design**
```yaml
blocking_checks:
  - check: "Every agent has explicit boundary matrix"
    type: blocking
  - check: "Every feedback loop has iteration limit"
    type: blocking
  - check: "FMEA completed for all critical paths"
    type: blocking
  - check: "No CRITICAL failure mode without mitigation"
    type: blocking
  - check: "Human gates defined for irreversible actions"
    type: blocking
```

**Step 4.2: Handoff**
```yaml
handoff:
  to: "@yoav-shoham"
  artifact: "agent-orchestration-design.md"
  format: "Structured markdown"
  includes:
    - "Agent boundary matrices"
    - "Orchestration flow diagram"
    - "Handoff protocols"
    - "Human gate registry"
    - "Safety constraints"
    - "FMEA report"
    - "Cascade prevention design"
  next_task: "validate-agent-protocols"
```

### Field 7: Outputs

| Output | Format | Location | Description |
|--------|--------|----------|-------------|
| Orchestration Design | markdown | `outputs/agent-orchestration-design.md` | Complete orchestration spec |
| Boundary Matrices | yaml | embedded | Per-agent can/cannot/requires |
| FMEA Report | table | embedded | Failure modes with mitigations |
| Safety Constraints | yaml | embedded | System-wide safety rules |

### Field 8: Validation

```yaml
validation_criteria:
  blocking:
    - "Every agent has boundary matrix"
    - "Every feedback loop has iteration limit"
    - "FMEA completed for critical paths"
    - "No unmitigated CRITICAL failures"
    - "Human gates for irreversible actions"
  warning:
    - "Cascade prevention mechanisms defined"
    - "Audit logging specified for all agents"
    - "Recovery procedures documented"
```

---

## Veto Conditions

```yaml
veto_conditions:
  - id: "VT-DAO-001"
    trigger: "Agent has no 'cannot_do' list"
    action: "STOP — Every agent must have explicit limits"
    severity: blocking

  - id: "VT-DAO-002"
    trigger: "Feedback loop without iteration limit"
    action: "STOP — Infinite loops will crash the system"
    severity: blocking

  - id: "VT-DAO-003"
    trigger: "CRITICAL failure mode without mitigation"
    action: "STOP — Design is unsafe for deployment"
    severity: blocking

  - id: "VT-DAO-004"
    trigger: "Irreversible action without human gate"
    action: "STOP — Humans must approve irreversible actions"
    severity: blocking
```

---

## Anti-Patterns

```yaml
anti_patterns:
  - name: "Trust All Agents"
    description: "Assuming agents will always behave correctly"
    why_bad: "LLMs are probabilistic — they WILL produce unexpected outputs"
    correct: "Validate every output, enforce every boundary"

  - name: "No Recovery Plan"
    description: "No way to recover from agent failure"
    why_bad: "System halts completely on any failure"
    correct: "Every failure mode has a recovery procedure"

  - name: "Security Theater"
    description: "Adding 'safety' labels without actual enforcement"
    why_bad: "False sense of safety, actual violations go uncaught"
    correct: "Safety constraints must be enforced programmatically"
```

---

## Handoff

```yaml
handoff:
  to: "@yoav-shoham"
  trigger: "Orchestration design validated (all blocking checks pass)"
  artifact: "agent-orchestration-design.md"
  next_task: "validate-agent-protocols"
  context_passed:
    - "Agent boundaries"
    - "Orchestration flow"
    - "Handoff protocols"
    - "Safety constraints"
    - "FMEA report"
```

---

_Task Version: 1.0_
_Workflow: wf-validate-ai-agents (phase_2)_
_Agent: @barry-hawkins_
_Lines: 300+_
