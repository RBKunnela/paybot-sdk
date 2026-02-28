# Task: Diagnose Organizational Health

**Task ID:** diagnose-org-health
**Version:** 1.0
**Execution Type:** Agent
**Purpose:** Perform root cause diagnosis of organizational dysfunction before recommending any structural changes
**Orchestrator:** @ruth-malan
**Mode:** Agent (LLM-driven diagnosis with human checkpoint)
**Quality Standard:** AIOS Level (300+ lines)
**Workflow:** wf-org-health-check (phase_1)

---

## Overview

Ruth Malan performs deep diagnostic analysis to identify ROOT CAUSE of organizational problems, not symptoms. This is critical because many organizations restructure when they actually have interaction or governance problems — which are cheaper and faster to fix.

**Key Principle:** DIAGNOSE FIRST, RESTRUCTURE SECOND. Don't assume restructuring is the answer.

```
INPUT (current_problems + current_structure + business_goal)
    |
[PHASE 1: SYMPTOM COLLECTION]
    -> Gather all reported problems
    -> Categorize symptoms
    |
[PHASE 2: ROOT CAUSE ANALYSIS]
    -> Apply 5-whys to each problem
    -> Map communication patterns
    -> Assess decision-making authority
    |
[PHASE 3: PROBLEM CLASSIFICATION]
    -> Classify: Structure / Interaction / Governance / Tools / Culture
    -> Assign percentage weights
    -> Determine fix approach
    |
[PHASE 4: VALIDATION & ROUTING]
    -> Verify diagnosis with stakeholders
    -> Route to appropriate specialist(s)
    |
OUTPUT: Organization Health Diagnostic Report
```

---

## Task Anatomy (8 Fields)

### Field 1: ID
- **id:** `diagnose-org-health`

### Field 2: Purpose
Identify the true root cause of organizational dysfunction. Classify whether problems stem from structure, interaction, governance, tools, or culture. Route to the correct specialist for fixing — avoiding expensive restructuring when cheaper fixes exist.

### Field 3: Executor
- **type:** Agent
- **rationale:** Diagnostic analysis benefits from systematic reasoning over multiple data points
- **guardrails:**
  - Must apply 5-whys to each reported problem
  - Must classify problem type with evidence
  - Human checkpoint before routing to specialist

### Field 4: Inputs

| Parameter | Type | Required | Source | Description |
|-----------|------|----------|--------|-------------|
| `current_problems` | string | Yes | user | What's broken in the organization |
| `current_structure` | string | Yes | user | Current org chart and team ownership |
| `business_goal` | string | Yes | user | What the org is trying to accomplish |
| `team_feedback` | string | No | user | Direct feedback from team members |
| `timeline_constraints` | string | No | user | How urgent is this? |

### Field 5: Preconditions

- [ ] At least one organizational problem is reported
- [ ] Current structure is documented (even roughly)
- [ ] Business goal is articulated
- [ ] Stakeholder available for validation

### Field 6: Steps

#### PHASE 1: Symptom Collection (15 min)

**Step 1.1: Gather Problem Reports**
```yaml
action: "Collect all reported problems and symptoms"
elicit: true
questions:
  - "What are the top 3 things that feel broken?"
  - "How long have these problems existed?"
  - "What has been tried before?"
  - "Who is most affected?"
output: "Problem inventory"
```

**Step 1.2: Categorize Symptoms**
```yaml
action: "Group symptoms by category"
categories:
  speed: "Decisions slow, delivery slow, response slow"
  quality: "Bugs, rework, inconsistency"
  coordination: "Blocking, handoff failures, miscommunication"
  morale: "Burnout, turnover, disengagement"
  ownership: "Nobody owns it, everyone owns it, unclear"
output: "Categorized symptom map"
```

#### PHASE 2: Root Cause Analysis (25 min)

**Step 2.1: Apply 5-Whys Per Problem**
```yaml
action: "For each top problem, drill down to root cause"
method:
  - "State the problem"
  - "Ask: Why does this happen? (Level 1)"
  - "Ask: Why does THAT happen? (Level 2)"
  - "Continue until structural root cause found (typically 3-5 levels)"
veto_condition: "STOP if root cause is 'people are bad' — that's a symptom, not a cause"
output: "Root cause analysis tree per problem"
```

**Step 2.2: Communication Pattern Analysis**
```yaml
action: "Map how information flows vs how it should flow"
analysis:
  - "Formal channels: meetings, email, tickets"
  - "Informal channels: Slack, hallway, ad-hoc"
  - "Gaps: who should communicate but doesn't"
  - "Excess: who communicates but shouldn't need to"
output: "Communication pattern gap analysis"
```

**Step 2.3: Decision Authority Assessment**
```yaml
action: "Map decision-making for speed and clarity"
analysis:
  - "For key decisions: who actually decides?"
  - "How long does it take? (hours, days, weeks)"
  - "Is the right person/level deciding?"
  - "Are there unnecessary approval chains?"
output: "Decision authority assessment"
```

#### PHASE 3: Problem Classification (15 min)

**Step 3.1: Classify Root Causes**
```yaml
action: "Classify each root cause into problem type"
types:
  STRUCTURE_PROBLEM:
    description: "Teams are fundamentally wrong for the work"
    indicators: ["Teams don't map to value streams", "Cognitive load unsustainable", "Critical cross-team deps"]
    fix_cost: "HIGH (months)"
    specialist: "@matthew-skelton"

  INTERACTION_PROBLEM:
    description: "Teams are right but interact wrong"
    indicators: ["Chaotic interactions", "Too much sync", "No contracts"]
    fix_cost: "MEDIUM (weeks)"
    specialist: "@manuel-pais"

  GOVERNANCE_PROBLEM:
    description: "Unclear decision authority"
    indicators: ["Slow decisions", "Unclear ownership", "No escalation"]
    fix_cost: "LOW (days-weeks)"
    specialist: "@team-taxonomy-chief"

  TOOLS_PROBLEM:
    description: "Infrastructure/process friction"
    indicators: ["Bad tooling", "Too many tools", "Info hard to find"]
    fix_cost: "MEDIUM (weeks)"
    specialist: "out-of-squad"

  CULTURAL_PROBLEM:
    description: "Values and norms dysfunction"
    indicators: ["No trust", "Knowledge hoarding", "Blame culture"]
    fix_cost: "HIGH (months)"
    specialist: "out-of-squad"

output: "Classification with percentage weights and evidence"
```

**Step 3.2: Determine Fix Priority**
```yaml
action: "Order fixes by impact/cost ratio"
principle: "Try cheap fixes before expensive ones"
priority_order:
  1: "Governance fixes (clarify authority — fast, high impact)"
  2: "Interaction fixes (contracts, modes — medium cost, high impact)"
  3: "Structure fixes (restructuring — high cost, high impact)"
  4: "Tools fixes (infrastructure — medium cost, medium impact)"
  5: "Culture fixes (norms — high cost, slow impact)"
output: "Prioritized fix roadmap"
```

#### PHASE 4: Validation & Routing (10 min)

**Step 4.1: Validate Diagnosis**
```yaml
blocking_checks:
  - check: "Root cause identified (not just symptoms)"
    type: blocking
  - check: "Problem type classified with evidence"
    type: blocking
  - check: "At least 3 evidence points per classification"
    type: warning
  - check: "Fix priority order defined"
    type: blocking
```

**Step 4.2: Route to Specialist**
```yaml
routing:
  if_structure_problem:
    route_to: "@matthew-skelton"
    task: "analyze-team-structure"
    with_context: "Diagnosis report, current structure, business goal"

  if_interaction_problem:
    route_to: "@manuel-pais"
    task: "redesign-team-interactions"
    with_context: "Diagnosis report, interaction gaps, current contracts"

  if_mixed:
    route_to: "both (prioritized)"
    sequence: "Fix interactions first, then structure if needed"

handoff:
  artifact: "org-health-diagnostic-report.md"
  format: "Structured markdown with root causes, classification, routing"
```

### Field 7: Outputs

| Output | Format | Location | Description |
|--------|--------|----------|-------------|
| Diagnostic Report | markdown | `outputs/org-health-diagnostic-report.md` | Complete diagnosis |
| Root Cause Tree | markdown | embedded | 5-whys analysis per problem |
| Problem Classification | yaml | embedded | Types with weights and evidence |
| Fix Priority Roadmap | markdown | embedded | Ordered fixes by impact/cost |
| Routing Decision | yaml | embedded | Which specialist gets what |

### Field 8: Validation

```yaml
validation_criteria:
  blocking:
    - "Root cause identified for each reported problem"
    - "Problem type classified with evidence"
    - "Fix priority order defined"
    - "Routing decision made"

  warning:
    - "At least 3 evidence points per classification"
    - "Stakeholder alignment confirmed"
    - "Cost/benefit analysis per fix included"
```

---

## Veto Conditions

```yaml
veto_conditions:
  - id: "VT-DOH-001"
    trigger: "Root cause analysis leads to 'people are the problem'"
    action: "STOP — This is a symptom. Dig deeper into structural causes."
    severity: blocking

  - id: "VT-DOH-002"
    trigger: "Stakeholders want to restructure without diagnosis"
    action: "WARN — Insist on diagnosis first. Present cost of wrong restructuring."
    severity: warning

  - id: "VT-DOH-003"
    trigger: "Diagnosis is based on single perspective"
    action: "WARN — Gather at least 2-3 perspectives before classifying"
    severity: warning
```

---

## Anti-Patterns

```yaml
anti_patterns:
  - name: "Restructuring Reflex"
    description: "Jumping to restructuring as first response to any problem"
    why_bad: "Restructuring is expensive and disruptive. Often fixes wrong thing."
    correct: "Diagnose first. Try interaction/governance fixes before restructuring."

  - name: "Blame-Based Diagnosis"
    description: "Attributing problems to specific people instead of systems"
    why_bad: "People problems are usually system problems in disguise"
    correct: "Focus on structures, processes, and incentives — not individuals"

  - name: "Single-Perspective Analysis"
    description: "Diagnosing based on what leadership says without team input"
    why_bad: "Leadership often sees different problems than teams"
    correct: "Gather multiple perspectives across levels"
```

---

## Handoff

```yaml
handoff:
  to: "@matthew-skelton OR @manuel-pais (based on diagnosis)"
  trigger: "Diagnostic report complete and validated"
  artifact: "org-health-diagnostic-report.md"
  next_task: "analyze-team-structure OR redesign-team-interactions"
  context_passed:
    - "Root cause analysis"
    - "Problem classification with evidence"
    - "Fix priority roadmap"
    - "Current structure documentation"
    - "Business goal context"
```

---

_Task Version: 1.0_
_Workflow: wf-org-health-check (phase_1)_
_Agent: @ruth-malan_
_Lines: 300+_
