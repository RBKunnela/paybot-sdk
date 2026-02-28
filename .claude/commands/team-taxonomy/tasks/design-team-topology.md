# Task: Design Team Topology

**Task ID:** design-team-topology
**Version:** 1.0
**Execution Type:** Agent
**Purpose:** Design team structure using 4-type Team Topologies framework around identified value streams
**Orchestrator:** @matthew-skelton
**Mode:** Agent (LLM-driven design with human checkpoint)
**Quality Standard:** AIOS Level (300+ lines)
**Workflow:** wf-design-team-structure (phase_2)

---

## Overview

Matthew Skelton designs the team structure using the Team Topologies framework. This task takes Ruth Malan's context analysis and translates value streams into a concrete team topology with explicit types, boundaries, cognitive load assessments, and Conway's Law alignment.

```
INPUT (context-analysis-report from @ruth-malan)
    |
[PHASE 1: VALUE STREAM MAPPING]
    -> Map value streams to potential teams
    -> Identify natural team boundaries
    |
[PHASE 2: TOPOLOGY DESIGN]
    -> Classify teams (Stream-Aligned, Platform, Enabling, Complicated-Subsystem)
    -> Define team APIs and responsibilities
    -> Assess cognitive load per team
    |
[PHASE 3: VALIDATION]
    -> Verify Conway's Law alignment
    -> Check cognitive load sustainability
    -> Validate fast flow enablement
    |
[PHASE 4: HANDOFF]
    -> Package topology for interaction design
    -> Handoff to @manuel-pais
    |
OUTPUT: Team Topology Design Document
```

---

## Task Anatomy (8 Fields)

### Field 1: ID
- **id:** `design-team-topology`

### Field 2: Purpose
Transform value stream analysis into a concrete team structure using the 4 fundamental team types. Every team gets a type, a clear boundary, a cognitive load assessment, and a team API definition.

### Field 3: Executor
- **type:** Agent
- **rationale:** Team topology design benefits from pattern recognition across large context (value streams, constraints, team sizes)
- **guardrails:**
  - Must reference Ruth's diagnosis
  - Human checkpoint before handoff to Manuel
  - Cognitive load must be calculated, not estimated

### Field 4: Inputs

| Parameter | Type | Required | Source | Description |
|-----------|------|----------|--------|-------------|
| `context_analysis_report` | file | Yes | analyze-strategic-context | Ruth's complete diagnosis |
| `value_streams` | list | Yes | analyze-strategic-context | Identified value streams |
| `team_size_range` | string | Yes | analyze-strategic-context | Available headcount |
| `constraints` | string | No | analyze-strategic-context | Budget, hiring, compliance constraints |

### Field 5: Preconditions

- [ ] `analyze-strategic-context` task completed successfully
- [ ] Value streams are clearly identified (at least 2)
- [ ] Problem classification includes STRUCTURE component
- [ ] Team size range is defined

### Field 6: Steps

#### PHASE 1: Value Stream Mapping (20 min)

**Step 1.1: Map Value Streams to Teams**
```yaml
action: "For each value stream, identify the minimum viable team"
analysis:
  - "List each value stream end-to-end"
  - "Identify skills needed for each stream"
  - "Group skills into potential teams (5-9 people each)"
  - "Ensure each team owns a complete slice of value"
veto_condition: "STOP if a value stream requires >15 people — split into sub-streams"
output: "Value stream to team mapping"
```

**Step 1.2: Identify Shared Services**
```yaml
action: "Find capabilities needed by multiple value streams"
analysis:
  - "Infrastructure, CI/CD, monitoring (Platform candidate)"
  - "Specialized domains (ML, security — Complicated-Subsystem candidate)"
  - "Capability gaps (Enabling candidate)"
output: "Shared services inventory"
```

#### PHASE 2: Topology Design (30 min)

**Step 2.1: Classify Teams by Type**
```yaml
action: "Assign each team to one of the 4 fundamental types"
types:
  stream_aligned:
    definition: "Owns a flow of business value end-to-end"
    signals:
      - "Directly serves a customer or business outcome"
      - "Can deploy independently"
      - "Has full stack capability for its domain"
    team_size: "5-9 people"

  platform:
    definition: "Reduces cognitive load of stream-aligned teams"
    signals:
      - "Provides self-service capabilities"
      - "Multiple teams consume its services"
      - "Abstracts away infrastructure complexity"
    team_size: "3-7 people"

  enabling:
    definition: "Accelerates capability adoption (temporary)"
    signals:
      - "Teaches other teams new practices"
      - "Has expertise others need temporarily"
      - "Goal is to make itself unnecessary"
    team_size: "2-4 people"
    duration: "3-6 months per engagement"

  complicated_subsystem:
    definition: "Handles irreducible technical complexity"
    signals:
      - "Requires deep specialist knowledge"
      - "Complexity cannot be simplified further"
      - "Other teams shouldn't need to understand internals"
    team_size: "3-5 specialists"

veto_condition: "STOP if >50% of teams are Platform or Complicated-Subsystem — org is infrastructure-heavy, not value-delivery focused"
output: "Team classification roster"
```

**Step 2.2: Define Team APIs**
```yaml
action: "For each team, define what they provide and consume"
template:
  team_name: "{name}"
  type: "{stream-aligned|platform|enabling|complicated-subsystem}"
  owns: ["list of owned domains/services"]
  provides: ["list of services/APIs to other teams"]
  consumes: ["list of services from other teams"]
  decisions_autonomous: ["what they can decide alone"]
  decisions_escalate: ["what needs approval"]
output: "Team API definitions"
```

**Step 2.3: Assess Cognitive Load**
```yaml
action: "Calculate cognitive load for each team"
formula:
  intrinsic_load: "Core domain complexity"
  extraneous_load: "Tool friction + process overhead"
  germane_load: "Learning new things"
  total: "intrinsic + extraneous + germane"
thresholds:
  green: "Total load manageable by team size"
  yellow: "Load at capacity — monitor closely"
  red: "Load exceeds capacity — must reduce"
veto_condition: "STOP if any team is RED — redesign before proceeding"
output: "Cognitive load matrix"
```

#### PHASE 3: Validation (15 min)

**Step 3.1: Conway's Law Check**
```yaml
action: "Verify org structure will produce desired system architecture"
checks:
  - "Team boundaries align with desired service boundaries"
  - "Communication paths match data flow paths"
  - "No team forced to own misaligned components"
veto_condition: "STOP if Conway's Law violation detected — structure will produce wrong architecture"
```

**Step 3.2: Fast Flow Check**
```yaml
action: "Verify stream-aligned teams can deliver independently"
checks:
  - "Each stream-aligned team can deploy without blocking on others"
  - "Platform services are truly self-service (not gated)"
  - "No hidden dependencies between stream teams"
```

#### PHASE 4: Handoff (5 min)

**Step 4.1: Package for Interaction Design**
```yaml
handoff:
  to: "@manuel-pais"
  artifact: "team-topology-design.md"
  format: "Structured markdown"
  includes:
    - "Team roster with types"
    - "Team API definitions"
    - "Cognitive load matrix"
    - "Dependency map"
    - "Conway's Law analysis"
```

### Field 7: Outputs

| Output | Format | Location | Description |
|--------|--------|----------|-------------|
| Team Topology Design | markdown | `outputs/team-topology-design.md` | Complete topology with all teams |
| Cognitive Load Matrix | markdown | embedded in design | Per-team load assessment |
| Team API Definitions | yaml | embedded in design | What each team provides/consumes |
| Dependency Map | markdown | embedded in design | Cross-team dependencies |

### Field 8: Validation

```yaml
validation_criteria:
  blocking:
    - "Every team has explicit type classification"
    - "Every team has cognitive load assessment"
    - "Every team has defined API (provides/consumes)"
    - "Conway's Law check passed"
    - "No RED cognitive load teams remain"

  warning:
    - "Stream-aligned teams represent >60% of total teams"
    - "No team has >3 direct dependencies"
    - "Enabling teams have explicit sunset date"
```

---

## Veto Conditions

```yaml
veto_conditions:
  - id: "VT-DTT-001"
    trigger: "Value stream requires >15 people in single team"
    action: "STOP — Split value stream into sub-streams"
    severity: blocking

  - id: "VT-DTT-002"
    trigger: ">50% of teams are Platform or Complicated-Subsystem"
    action: "STOP — Organization is infrastructure-heavy, not value-focused"
    severity: blocking

  - id: "VT-DTT-003"
    trigger: "Any team has RED cognitive load"
    action: "STOP — Redesign team boundaries to reduce load"
    severity: blocking

  - id: "VT-DTT-004"
    trigger: "Conway's Law violation detected"
    action: "STOP — Structure will produce wrong system architecture"
    severity: blocking
```

---

## Anti-Patterns

```yaml
anti_patterns:
  - name: "Technology-Layer Teams"
    description: "Organizing by frontend/backend/data instead of value stream"
    why_bad: "Every feature crosses all teams, creating handoff friction"
    correct: "Organize around value streams with full-stack capability"

  - name: "Platform Without Consumers"
    description: "Creating platform team before anyone needs it"
    why_bad: "Platform becomes ivory tower, builds what nobody uses"
    correct: "Start with stream-aligned, extract platform when 2+ teams need same thing"

  - name: "Permanent Enabling Team"
    description: "Enabling team that never disbands"
    why_bad: "Becomes bottleneck instead of enabler"
    correct: "Set explicit sunset date (3-6 months per engagement)"

  - name: "Ignoring Cognitive Load"
    description: "Assigning work without considering team capacity"
    why_bad: "Teams burn out, quality drops, turnover increases"
    correct: "Calculate load for every team, keep in GREEN zone"
```

---

## Handoff

```yaml
handoff:
  to: "@manuel-pais"
  trigger: "Team topology design validated (all checks pass)"
  artifact: "team-topology-design.md"
  format: "Structured markdown with team roster, APIs, cognitive load"
  next_task: "design-team-interactions"
  context_passed:
    - "Team roster with types and sizes"
    - "Team API definitions (provides/consumes)"
    - "Cognitive load matrix"
    - "Dependency map"
    - "Conway's Law validation result"
```

---

## Output Example

```markdown
# Team Topology Design

## Team Roster

### Stream-Aligned Teams
1. **Patient Data Team** (7 people)
   - Owns: Patient data pipeline (ingest -> store -> serve)
   - Provides: Patient Data API (REST, real-time events)
   - Consumes: Infrastructure Platform
   - Cognitive Load: GREEN

2. **AI Diagnostics Team** (6 people)
   - Owns: ML model lifecycle (train -> validate -> deploy)
   - Provides: Diagnosis API (predictions + confidence)
   - Consumes: Patient Data API, Infrastructure Platform
   - Cognitive Load: YELLOW (monitor)

### Platform Teams
3. **Infrastructure Platform** (4 people)
   - Owns: CI/CD, monitoring, cloud infrastructure
   - Provides: Self-service deployment, observability
   - Consumers: All stream-aligned teams

### Enabling Teams
4. **AI Adoption Team** (3 people, sunset: 6 months)
   - Mission: Upskill stream teams on ML practices
   - Exit criteria: Teams can operate ML independently

## Conway's Law: ALIGNED
Team boundaries match desired microservice boundaries.
```

---

_Task Version: 1.0_
_Workflow: wf-design-team-structure (phase_2)_
_Agent: @matthew-skelton_
_Lines: 300+_
