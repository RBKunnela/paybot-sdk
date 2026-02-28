# Task: Analyze Team Structure

**Task ID:** analyze-team-structure
**Version:** 1.0
**Execution Type:** Agent
**Purpose:** Analyze existing team topology and recommend structural changes based on diagnostic findings
**Orchestrator:** @matthew-skelton
**Mode:** Agent (LLM-driven analysis with human checkpoint)
**Quality Standard:** AIOS Level (300+ lines)
**Workflow:** wf-org-health-check (phase_2a)

---

## Overview

Matthew Skelton analyzes the current team structure against Team Topologies principles when Ruth Malan's diagnosis identifies a STRUCTURE PROBLEM. Produces a gap analysis between current and ideal topology with a concrete transition plan.

```
INPUT (org-health-diagnostic-report from @ruth-malan)
    |
[PHASE 1: CURRENT STATE ANALYSIS]
    -> Map current teams to 4-type model
    -> Identify misalignments with value streams
    |
[PHASE 2: GAP ANALYSIS]
    -> Compare current vs ideal topology
    -> Quantify cognitive load gaps
    -> Identify Conway's Law violations
    |
[PHASE 3: REDESIGN PROPOSAL]
    -> Propose new topology
    -> Create transition plan
    -> Estimate effort and timeline
    |
[PHASE 4: VALIDATION & HANDOFF]
    -> Verify proposal addresses root causes
    -> Handoff to @manuel-pais if interaction redesign also needed
    |
OUTPUT: Team Structure Analysis + Redesign Proposal
```

---

## Task Anatomy (8 Fields)

### Field 1: ID
- **id:** `analyze-team-structure`

### Field 2: Purpose
Analyze current team topology against Team Topologies principles. Identify where the current structure creates friction, overload, or Conway's Law violations. Propose redesigned topology with transition plan.

### Field 3: Executor
- **type:** Agent
- **rationale:** Structural analysis benefits from systematic comparison against Team Topologies patterns
- **guardrails:**
  - Must reference Ruth's diagnosis as input
  - Must calculate cognitive load (not estimate)
  - Human checkpoint before recommending restructuring

### Field 4: Inputs

| Parameter | Type | Required | Source | Description |
|-----------|------|----------|--------|-------------|
| `diagnostic_report` | file | Yes | diagnose-org-health | Ruth's complete diagnosis |
| `current_structure` | string | Yes | diagnose-org-health | Current team org chart |
| `business_goal` | string | Yes | diagnose-org-health | Business objectives |
| `problem_classification` | yaml | Yes | diagnose-org-health | Root cause classification |

### Field 5: Preconditions

- [ ] `diagnose-org-health` task completed
- [ ] Problem classification includes STRUCTURE component (>20%)
- [ ] Current structure is documented
- [ ] Ruth's veto conditions are cleared

### Field 6: Steps

#### PHASE 1: Current State Analysis (20 min)

**Step 1.1: Classify Current Teams**
```yaml
action: "Map each existing team to Team Topologies model"
for_each_team:
  - "What type is this team? (SA/Platform/Enabling/CS or 'none fits')"
  - "What value stream does it serve? (or does it serve multiple?)"
  - "How many responsibilities does it carry?"
  - "What are its dependencies?"
flag_if: "A team serves multiple value streams — likely needs splitting"
output: "Current team classification map"
```

**Step 1.2: Identify Structural Anti-Patterns**
```yaml
action: "Detect known structural anti-patterns"
patterns_to_detect:
  - "Technology-layer teams (frontend/backend/data)"
  - "Teams serving multiple value streams"
  - "Platform teams without consumers"
  - "No enabling teams despite capability gaps"
  - "Teams >12 people (too large)"
  - "Teams <3 people (too small to sustain)"
output: "Anti-pattern detection report"
```

#### PHASE 2: Gap Analysis (20 min)

**Step 2.1: Compare Current vs Ideal**
```yaml
action: "Design ideal topology and compare with current"
analysis:
  - "For each value stream: what team SHOULD own it?"
  - "Where does current structure deviate?"
  - "What's the minimum change needed?"
veto_condition: "STOP if ideal topology requires >50% team changes — may indicate diagnosis was wrong, re-validate with Ruth"
output: "Gap analysis matrix"
```

**Step 2.2: Cognitive Load Gap Analysis**
```yaml
action: "Compare current cognitive load vs sustainable levels"
for_each_team:
  - "Current responsibilities count"
  - "Current dependency count"
  - "Sustainable threshold (based on team size)"
  - "Gap: over/under loaded"
output: "Cognitive load gap report"
```

**Step 2.3: Conway's Law Assessment**
```yaml
action: "Check if current structure produces wrong system architecture"
checks:
  - "Do team boundaries match desired service boundaries?"
  - "Are communication paths creating unwanted coupling in the system?"
  - "Would restructuring align system architecture with business goals?"
output: "Conway's Law assessment"
```

#### PHASE 3: Redesign Proposal (15 min)

**Step 3.1: Propose New Topology**
```yaml
action: "Design the target team structure"
principles:
  - "Minimize disruption (smallest change with biggest impact)"
  - "Align teams to value streams"
  - "Keep cognitive load sustainable"
  - "Apply Conway's Law inversion"
template:
  current_team: "{name}"
  proposed_change: "{keep/split/merge/reclassify/dissolve}"
  rationale: "{why this change}"
  impact: "{who is affected}"
output: "Proposed topology with rationale"
```

**Step 3.2: Create Transition Plan**
```yaml
action: "Design phased transition from current to target"
phases:
  phase_1: "Quick wins (reclassify existing teams, clarify ownership)"
  phase_2: "Structural changes (split, merge teams)"
  phase_3: "Stabilization (monitor, adjust)"
timeline:
  phase_1: "1-2 weeks"
  phase_2: "1-3 months"
  phase_3: "3-6 months"
output: "Transition plan with timeline"
```

#### PHASE 4: Validation & Handoff (10 min)

**Step 4.1: Validate Proposal**
```yaml
blocking_checks:
  - check: "Proposed topology addresses identified root causes"
    type: blocking
  - check: "Every team in proposed topology has sustainable cognitive load"
    type: blocking
  - check: "Conway's Law violations resolved"
    type: blocking
  - check: "Transition plan is phased (not big-bang)"
    type: warning
```

**Step 4.2: Handoff**
```yaml
handoff:
  to: "@manuel-pais"
  condition: "if interaction redesign also needed"
  artifact: "team-structure-analysis.md"
  next_task: "redesign-team-interactions"
  alternative_handoff:
    to: "@team-taxonomy-chief"
    condition: "if only structure changes needed"
    next_task: "synthesize-report"
```

### Field 7: Outputs

| Output | Format | Location | Description |
|--------|--------|----------|-------------|
| Structure Analysis | markdown | `outputs/team-structure-analysis.md` | Gap analysis + redesign proposal |
| Anti-Pattern Report | markdown | embedded | Detected structural anti-patterns |
| Transition Plan | markdown | embedded | Phased implementation plan |
| Cognitive Load Gaps | table | embedded | Current vs target per team |

### Field 8: Validation

```yaml
validation_criteria:
  blocking:
    - "Every existing team classified by type"
    - "Gap analysis covers all value streams"
    - "Proposed topology addresses root causes"
    - "Cognitive load sustainable in proposed topology"
  warning:
    - "Transition plan is phased"
    - "Disruption minimized (fewer changes preferred)"
    - "Rollback plan exists"
```

---

## Veto Conditions

```yaml
veto_conditions:
  - id: "VT-ATS-001"
    trigger: "Ideal topology requires >50% team changes"
    action: "STOP — May indicate diagnosis was wrong. Re-validate with @ruth-malan"
    severity: blocking

  - id: "VT-ATS-002"
    trigger: "Proposed topology still has RED cognitive load teams"
    action: "STOP — Redesign must resolve all RED loads"
    severity: blocking

  - id: "VT-ATS-003"
    trigger: "Big-bang transition proposed (all changes at once)"
    action: "WARN — Phase the transition to reduce risk"
    severity: warning
```

---

## Anti-Patterns

```yaml
anti_patterns:
  - name: "Big-Bang Restructuring"
    description: "Changing everything at once"
    why_bad: "Massive disruption, high risk of failure, no learning"
    correct: "Phase changes, start with lowest-risk highest-impact"

  - name: "Restructuring Without Diagnosis"
    description: "Jumping to structure changes without understanding root cause"
    why_bad: "May fix wrong problem — expensive and disruptive for nothing"
    correct: "Always require Ruth's diagnosis before structural changes"

  - name: "Copy-Paste Topology"
    description: "Copying another company's team structure"
    why_bad: "Different context, different constraints, different value streams"
    correct: "Design topology for YOUR value streams and constraints"
```

---

## Handoff

```yaml
handoff:
  to: "@manuel-pais OR @team-taxonomy-chief"
  trigger: "Structure analysis complete and validated"
  artifact: "team-structure-analysis.md"
  next_task: "redesign-team-interactions OR synthesize-report"
  context_passed:
    - "Current vs proposed topology comparison"
    - "Anti-patterns detected"
    - "Transition plan"
    - "Cognitive load analysis"
```

---

_Task Version: 1.0_
_Workflow: wf-org-health-check (phase_2a)_
_Agent: @matthew-skelton_
_Lines: 300+_
