# Task: Design Team Interactions

**Task ID:** design-team-interactions
**Version:** 1.0
**Execution Type:** Agent
**Purpose:** Design optimal interaction protocols between teams using the 3 interaction modes
**Orchestrator:** @manuel-pais
**Mode:** Agent (LLM-driven design with human checkpoint)
**Quality Standard:** AIOS Level (300+ lines)
**Workflow:** wf-design-team-structure (phase_3)

---

## Overview

Manuel Pais designs how teams interact with each other. Takes Matthew Skelton's team topology and defines interaction modes (Collaboration, X-as-a-Service, Facilitation), team contracts, SLAs, coupling analysis, and communication protocols for every team pair that has dependencies.

```
INPUT (team-topology-design from @matthew-skelton)
    |
[PHASE 1: DEPENDENCY MAPPING]
    -> Map all team-to-team dependencies
    -> Classify dependency type and strength
    |
[PHASE 2: INTERACTION MODE DESIGN]
    -> Assign interaction mode per dependency
    -> Design team contracts and SLAs
    |
[PHASE 3: COUPLING ANALYSIS]
    -> Assess temporal, knowledge, ownership coupling
    -> Eliminate unnecessary coupling
    |
[PHASE 4: VALIDATION & HANDOFF]
    -> Verify interactions are sustainable
    -> Produce interaction design document
    |
OUTPUT: Team Interaction Design Document
```

---

## Task Anatomy (8 Fields)

### Field 1: ID
- **id:** `design-team-interactions`

### Field 2: Purpose
Design explicit interaction protocols between all teams in the topology. Every team dependency gets an interaction mode, a contract, an SLA, and a communication protocol. Goal: minimize synchronous coupling while maximizing team autonomy.

### Field 3: Executor
- **type:** Agent
- **rationale:** Interaction pattern design benefits from systematic analysis of all team pairs
- **guardrails:**
  - Must reference Matthew's topology
  - Every dependency must have explicit interaction mode
  - Human checkpoint before finalizing

### Field 4: Inputs

| Parameter | Type | Required | Source | Description |
|-----------|------|----------|--------|-------------|
| `team_topology_design` | file | Yes | design-team-topology | Matthew's complete topology |
| `team_roster` | list | Yes | design-team-topology | Teams with types and APIs |
| `dependency_map` | list | Yes | design-team-topology | Cross-team dependencies |
| `cognitive_load_matrix` | table | Yes | design-team-topology | Per-team load assessment |

### Field 5: Preconditions

- [ ] `design-team-topology` task completed successfully
- [ ] Team roster has explicit types for every team
- [ ] Dependency map is complete
- [ ] Cognitive load matrix is available

### Field 6: Steps

#### PHASE 1: Dependency Mapping (15 min)

**Step 1.1: Enumerate All Dependencies**
```yaml
action: "List every team-to-team dependency"
for_each_dependency:
  - "Source team → Target team"
  - "What does source need from target?"
  - "How often? (continuous, daily, weekly, ad-hoc)"
  - "How critical? (blocking, important, nice-to-have)"
output: "Complete dependency registry"
```

**Step 1.2: Classify Dependency Strength**
```yaml
action: "Rate each dependency as strong, medium, or weak"
classification:
  strong: "Source cannot function without target's output"
  medium: "Source is slowed but not blocked without target"
  weak: "Source prefers target's service but has alternatives"
output: "Dependency strength matrix"
```

#### PHASE 2: Interaction Mode Design (30 min)

**Step 2.1: Assign Interaction Modes**
```yaml
action: "For each dependency, select the optimal interaction mode"
modes:
  collaboration:
    when: "New capability being developed jointly"
    properties:
      - "High-touch, synchronous"
      - "Time-boxed (weeks, not months)"
      - "Both teams actively contribute"
    rule: "MUST be time-boxed. Permanent collaboration = organizational smell"

  x_as_a_service:
    when: "Stable capability consumed via well-defined interface"
    properties:
      - "Low-touch, asynchronous"
      - "Self-service consumption"
      - "Provider owns interface, consumer uses it"
    rule: "PREFERRED mode for most dependencies. Scales best."

  facilitation:
    when: "One team needs to learn capability from another"
    properties:
      - "Teaching/coaching interaction"
      - "Temporary (3-6 months)"
      - "Goal: make learner independent"
    rule: "Must have exit criteria. No permanent facilitation."

veto_condition: "STOP if >3 collaboration modes exist simultaneously — org cannot sustain this much sync coupling"
output: "Interaction mode assignments"
```

**Step 2.2: Design Team Contracts**
```yaml
action: "For each X-as-a-Service interaction, define the contract"
contract_template:
  provider: "{team name}"
  consumer: "{team name}"
  service: "{what is provided}"
  interface: "{API, shared library, documentation}"
  sla:
    availability: "{uptime percentage}"
    response_time: "{latency target}"
    support_hours: "{when support available}"
  versioning: "{how changes are communicated}"
output: "Team contract registry"
```

**Step 2.3: Design Communication Protocols**
```yaml
action: "Define how teams communicate for each interaction mode"
protocols:
  collaboration:
    - "Shared Slack channel for duration"
    - "Daily standup (15 min max)"
    - "Joint sprint planning"
    - "Shared board/tracker"
  x_as_a_service:
    - "API documentation (self-service)"
    - "Support ticket system"
    - "Quarterly review meeting"
    - "Changelog notifications"
  facilitation:
    - "Weekly coaching sessions"
    - "Shared learning resources"
    - "Progress tracking"
    - "Exit criteria review (monthly)"
output: "Communication protocol document"
```

#### PHASE 3: Coupling Analysis (15 min)

**Step 3.1: Assess Coupling Types**
```yaml
action: "For each interaction, assess coupling along 3 dimensions"
dimensions:
  temporal: "Do teams need to be available at the same time?"
  knowledge: "Does one team need to understand the other's internals?"
  ownership: "Is there shared code/data ownership?"
thresholds:
  low: "Independent operation possible"
  medium: "Some coordination needed"
  high: "Tightly coupled — risk of bottleneck"
veto_condition: "STOP if any interaction has HIGH coupling on all 3 dimensions — redesign needed"
output: "Coupling analysis matrix"
```

**Step 3.2: Eliminate Unnecessary Coupling**
```yaml
action: "For each HIGH coupling, propose reduction strategy"
strategies:
  - "Convert sync to async (events, queues)"
  - "Extract shared service to platform team"
  - "Introduce interface/contract to decouple knowledge"
  - "Split shared ownership into clear boundaries"
output: "Coupling reduction recommendations"
```

#### PHASE 4: Validation & Handoff (10 min)

**Step 4.1: Sustainability Check**
```yaml
blocking_checks:
  - check: "Every dependency has explicit interaction mode"
    type: blocking
  - check: "Every X-as-a-Service has contract defined"
    type: blocking
  - check: "No more than 3 active collaboration modes"
    type: blocking
  - check: "All facilitation engagements have exit criteria"
    type: warning
```

**Step 4.2: Prepare Handoff**
```yaml
handoff:
  to: "@team-taxonomy-chief"
  artifact: "team-interaction-design.md"
  format: "Structured markdown"
  includes:
    - "Interaction mode assignments for all dependencies"
    - "Team contracts (X-as-a-Service)"
    - "Communication protocols"
    - "Coupling analysis matrix"
    - "Coupling reduction recommendations"
  next_task: "synthesize-report"
```

### Field 7: Outputs

| Output | Format | Location | Description |
|--------|--------|----------|-------------|
| Interaction Design | markdown | `outputs/team-interaction-design.md` | Complete interaction architecture |
| Team Contracts | yaml | embedded | Per-pair contracts with SLAs |
| Coupling Matrix | markdown | embedded | Coupling analysis for all pairs |
| Communication Protocols | markdown | embedded | How teams communicate |

### Field 8: Validation

```yaml
validation_criteria:
  blocking:
    - "Every dependency has interaction mode assigned"
    - "Every X-as-a-Service has contract"
    - "No more than 3 active collaboration modes"
    - "No HIGH coupling on all 3 dimensions"

  warning:
    - "X-as-a-Service is the dominant mode (>60% of interactions)"
    - "All facilitation has exit criteria with date"
    - "Communication protocols documented for every mode"
```

---

## Veto Conditions

```yaml
veto_conditions:
  - id: "VT-DTI-001"
    trigger: ">3 collaboration modes active simultaneously"
    action: "STOP — Organization cannot sustain this much sync coupling"
    severity: blocking

  - id: "VT-DTI-002"
    trigger: "Any interaction has HIGH coupling on all 3 dimensions"
    action: "STOP — This dependency will become a bottleneck"
    severity: blocking

  - id: "VT-DTI-003"
    trigger: "Facilitation engagement without exit criteria"
    action: "WARN — Permanent facilitation becomes dependency"
    severity: warning
```

---

## Anti-Patterns

```yaml
anti_patterns:
  - name: "Permanent Collaboration"
    description: "Two teams 'collaborating' indefinitely"
    why_bad: "Means teams aren't properly separated — merge or decouple"
    correct: "Time-box all collaboration (2-6 weeks)"

  - name: "Fake X-as-a-Service"
    description: "Calling it XaaS but actually requiring meetings for every request"
    why_bad: "Hidden sync coupling disguised as async"
    correct: "True XaaS means self-service — no meetings required"

  - name: "Meeting-Driven Interaction"
    description: "Using meetings as primary coordination mechanism"
    why_bad: "Doesn't scale, creates calendar bloat"
    correct: "APIs, documentation, async communication first"

  - name: "Implicit Contracts"
    description: "Teams 'just know' what others provide"
    why_bad: "Breaks when people change, creates invisible dependencies"
    correct: "Every interaction has written contract"
```

---

## Handoff

```yaml
handoff:
  to: "@team-taxonomy-chief"
  trigger: "Interaction design validated (all blocking checks pass)"
  artifact: "team-interaction-design.md"
  format: "Structured markdown with mode assignments, contracts, coupling analysis"
  next_task: "synthesize-report"
  context_passed:
    - "Interaction mode assignments"
    - "Team contracts (all XaaS pairs)"
    - "Communication protocols"
    - "Coupling analysis and reduction recommendations"
```

---

_Task Version: 1.0_
_Workflow: wf-design-team-structure (phase_3)_
_Agent: @manuel-pais_
_Lines: 300+_
