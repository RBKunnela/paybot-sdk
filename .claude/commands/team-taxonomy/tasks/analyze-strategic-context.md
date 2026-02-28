# Task: Analyze Strategic Context

**Task ID:** analyze-strategic-context
**Version:** 1.0
**Execution Type:** Agent
**Purpose:** Diagnose socio-technical landscape and value streams before any team design begins
**Orchestrator:** @ruth-malan
**Mode:** Agent (LLM-driven analysis with human checkpoint)
**Quality Standard:** AIOS Level (300+ lines)
**Workflow:** wf-design-team-structure (phase_1)

---

## Overview

This task is the mandatory first step in any team structure design. Ruth Malan performs socio-technical diagnosis to understand the strategic context, identify value streams, assess cognitive load points, and map decision-making authority BEFORE any topology or interaction design happens.

**Key Principle:** Diagnosis before design. Restructuring without diagnosis is organizational superstition.

```
INPUT (strategic_direction + team_size_range + pain_points)
    |
[PHASE 1: CONTEXT GATHERING]
    -> Collect strategic direction, constraints, current state
    |
[PHASE 2: SOCIO-TECHNICAL ANALYSIS]
    -> Analyze communication patterns, decision architecture
    -> Map value streams and dependencies
    |
[PHASE 3: DIAGNOSTIC SYNTHESIS]
    -> Classify problem type (structure/interaction/governance)
    -> Produce context analysis report
    |
[PHASE 4: VALIDATION & HANDOFF]
    -> Verify value streams are clear
    -> Handoff to @matthew-skelton with full context
    |
OUTPUT: Context Analysis Report + Value Stream Map
```

---

## Task Anatomy (8 Fields)

### Field 1: ID
- **id:** `analyze-strategic-context`
- **format:** kebab-case, unique within squad

### Field 2: Purpose
Diagnose the socio-technical landscape of an organization to identify value streams, cognitive load pressure points, and decision-making authority gaps. This diagnosis is the FOUNDATION for all subsequent team topology and interaction design work.

### Field 3: Executor
- **type:** Agent
- **rationale:** Analysis is exploratory and benefits from LLM reasoning over large context. Low impact if wrong (diagnosis is reviewed before action).
- **guardrails:**
  - Confidence threshold: 0.75
  - Self-review before output
  - Human checkpoint after diagnosis

### Field 4: Inputs

| Parameter | Type | Required | Source | Description |
|-----------|------|----------|--------|-------------|
| `strategic_direction` | string | Yes | user | Business strategy, product roadmap, market position |
| `team_size_range` | string | Yes | user | Current and planned team size |
| `current_pain_points` | string | Yes | user | What doesn't work in current organization |
| `constraints` | string | No | user | Budget, hiring, location, compliance constraints |
| `existing_structure` | string | No | user | Current org chart (if restructuring vs greenfield) |

### Field 5: Preconditions

- [ ] Business strategy is articulated (even roughly)
- [ ] At least one organizational pain point is identified
- [ ] Stakeholder is available for questions during analysis
- [ ] No parallel restructuring is in progress (would invalidate diagnosis)

### Field 6: Steps

#### PHASE 1: Context Gathering (15 min)

**Step 1.1: Collect Strategic Direction**
```yaml
action: "Extract business strategy, product vision, and market positioning"
elicit: true
questions:
  - "What is the business trying to achieve in the next 12-18 months?"
  - "What are the primary value streams (how does money/value flow)?"
  - "What are the non-negotiable constraints (regulatory, budget, location)?"
output: "Strategic context summary"
```

**Step 1.2: Map Current State**
```yaml
action: "Document current organizational structure and pain points"
elicit: true
questions:
  - "How many teams exist and what do they own?"
  - "What are the biggest coordination problems?"
  - "Where do decisions get stuck?"
output: "Current state map"
```

#### PHASE 2: Socio-Technical Analysis (30 min)

**Step 2.1: Value Stream Identification**
```yaml
action: "Identify primary value streams from strategy to delivery"
analysis:
  - "Map each value stream end-to-end (idea -> customer value)"
  - "Identify which teams touch each value stream"
  - "Count handoffs per value stream (each handoff = friction)"
veto_condition: "STOP if value streams cannot be identified — strategy is too unclear to proceed"
output: "Value stream map with team ownership"
```

**Step 2.2: Communication Pattern Analysis**
```yaml
action: "Analyze how information flows through the organization"
analysis:
  - "Map formal communication channels (meetings, standups)"
  - "Identify informal communication (Slack, hallway conversations)"
  - "Find communication gaps (who SHOULD talk but doesn't)"
  - "Apply Conway's Law: does communication structure match desired architecture?"
output: "Communication pattern analysis"
```

**Step 2.3: Decision Architecture Assessment**
```yaml
action: "Map where decisions are made, who makes them, and how fast"
analysis:
  - "List key decision types (technical, product, operational)"
  - "For each: who decides? How long does it take? Is there escalation?"
  - "Identify bottlenecks (single points of decision authority)"
  - "Assess decision quality (are right people deciding?)"
output: "Decision authority map"
```

**Step 2.4: Cognitive Load Assessment**
```yaml
action: "Evaluate cognitive load pressure on each team"
analysis:
  - "Count responsibilities per team"
  - "Count dependencies per team"
  - "Assess context-switching frequency"
  - "Flag teams with unsustainable load (>7 major responsibilities)"
veto_condition: "STOP if any team has >15 major responsibilities — immediate triage needed"
output: "Cognitive load heat map"
```

#### PHASE 3: Diagnostic Synthesis (15 min)

**Step 3.1: Problem Classification**
```yaml
action: "Classify root cause of organizational dysfunction"
classification:
  STRUCTURE_PROBLEM:
    indicators:
      - "Teams don't map to value streams"
      - "Cognitive load unsustainable"
      - "Critical cross-team dependencies"
    fix: "Restructuring needed (escalate to Matthew)"

  INTERACTION_PROBLEM:
    indicators:
      - "Teams exist but interact chaotically"
      - "Too much sync collaboration"
      - "No clear contracts"
    fix: "Fix interaction modes (escalate to Manuel)"

  GOVERNANCE_PROBLEM:
    indicators:
      - "Decisions are slow"
      - "Unclear authority"
      - "No escalation paths"
    fix: "Clarify decision authority"

  MIXED:
    indicators:
      - "Multiple problem types present"
    fix: "Address in priority order"
output: "Problem classification with evidence"
```

**Step 3.2: Risk Assessment**
```yaml
action: "Identify risks of restructuring vs maintaining status quo"
analysis:
  - "Cost of inaction (what happens if we don't change?)"
  - "Cost of action (disruption, transition effort, morale impact)"
  - "Reversibility (can we undo if it doesn't work?)"
output: "Risk assessment matrix"
```

#### PHASE 4: Validation & Handoff (10 min)

**Step 4.1: Checkpoint Validation**
```yaml
action: "Verify diagnosis is complete and actionable"
blocking_checks:
  - check: "Value streams identified"
    type: blocking
    fail_action: "STOP — cannot design topology without clear value streams"
  - check: "Problem type classified"
    type: blocking
    fail_action: "STOP — cannot recommend fix without diagnosis"
  - check: "At least 3 evidence points per classification"
    type: warning
    fail_action: "WARN — diagnosis may be premature"
```

**Step 4.2: Prepare Handoff**
```yaml
action: "Package diagnosis for next specialist"
handoff:
  to: "@matthew-skelton"
  artifact: "context-analysis-report.md"
  format: "markdown with structured sections"
  includes:
    - "Strategic direction summary"
    - "Value stream map"
    - "Cognitive load assessment"
    - "Problem classification"
    - "Constraints and risks"
    - "Recommended approach"
```

### Field 7: Outputs

| Output | Format | Location | Description |
|--------|--------|----------|-------------|
| Context Analysis Report | markdown | `outputs/context-analysis-report.md` | Complete socio-technical diagnosis |
| Value Stream Map | markdown | embedded in report | Visual mapping of value streams to teams |
| Cognitive Load Heat Map | markdown | embedded in report | Per-team cognitive load assessment |
| Decision Authority Map | markdown | embedded in report | Who decides what, how fast |
| Problem Classification | yaml | embedded in report | Root cause with evidence |

### Field 8: Validation

```yaml
validation_criteria:
  blocking:
    - "Value streams are explicitly identified (at least 2)"
    - "Problem type is classified with evidence"
    - "Cognitive load assessed for each existing team"
    - "Handoff artifact is complete"

  warning:
    - "At least 3 evidence points per classification"
    - "Risk assessment includes both action and inaction costs"
    - "Stakeholder alignment confirmed"
```

---

## Veto Conditions

```yaml
veto_conditions:
  - id: "VT-ASC-001"
    trigger: "Value streams cannot be identified from provided strategy"
    action: "STOP — Return to stakeholder for strategy clarification"
    severity: blocking
    rationale: "Team design without value streams is random organization"

  - id: "VT-ASC-002"
    trigger: "Any team has >15 major responsibilities"
    action: "STOP — Immediate triage needed before full analysis"
    severity: blocking
    rationale: "Critically overloaded team needs emergency relief"

  - id: "VT-ASC-003"
    trigger: "Stakeholders disagree on business strategy"
    action: "STOP — Strategy alignment needed before org design"
    severity: blocking
    rationale: "Designing org for conflicting strategies wastes effort"
```

---

## Anti-Patterns

```yaml
anti_patterns:
  - name: "Skip Diagnosis"
    description: "Jump straight to team design without understanding context"
    why_bad: "Will restructure around wrong value streams"
    correct: "Always complete this task before topology design"

  - name: "Symptom-Based Diagnosis"
    description: "Accept surface-level complaints as root cause"
    why_bad: "Fixes symptoms, not causes — problems return"
    correct: "Use 5-whys analysis to find true root cause"

  - name: "Single-Source Diagnosis"
    description: "Base diagnosis on one person's perspective"
    why_bad: "Biased view misses systemic issues"
    correct: "Gather multiple perspectives before classifying"

  - name: "Analysis Paralysis"
    description: "Spend weeks diagnosing without producing actionable output"
    why_bad: "Organization suffers while waiting for perfect diagnosis"
    correct: "Time-box to 2-3 hours, produce actionable report"
```

---

## Handoff

```yaml
handoff:
  to: "@matthew-skelton"
  trigger: "Context analysis report complete and validated"
  artifact: "context-analysis-report.md"
  format: "Structured markdown with value streams, constraints, risks"
  next_task: "design-team-topology"
  context_passed:
    - "Strategic direction summary"
    - "Value stream map (primary deliverable)"
    - "Cognitive load assessment"
    - "Problem classification with evidence"
    - "Constraints and risks"
    - "Team size range"
```

---

## Output Example

```markdown
# Context Analysis Report

## Strategic Direction
Build AI-powered healthcare diagnostics platform serving 10M+ patients.
Focus: Speed to market (12 months), regulatory compliance (HIPAA), AI accuracy.

## Value Streams Identified
1. **Patient Data Pipeline:** Ingest -> Clean -> Store -> Serve
2. **AI Diagnostics:** Train -> Validate -> Deploy -> Monitor
3. **Patient Portal:** Auth -> Profile -> Results -> Communication

## Cognitive Load Assessment
| Team | Responsibilities | Dependencies | Load | Status |
|------|-----------------|--------------|------|--------|
| Backend | 8 | 4 | HIGH | WARNING |
| Frontend | 5 | 3 | MEDIUM | OK |
| Data | 6 | 5 | HIGH | WARNING |
| DevOps | 4 | 2 | LOW | OK |

## Problem Classification
**PRIMARY: STRUCTURE PROBLEM (70%)**
- Teams organized by technology layer, not value stream
- Each value stream crosses all teams (3+ handoffs)
- Evidence: Backend team owns pieces of all 3 value streams

**SECONDARY: INTERACTION PROBLEM (30%)**
- No team contracts or APIs
- All communication is synchronous (meetings)

## Recommendation
Restructure around value streams (requires @matthew-skelton).
Fix interactions simultaneously (requires @manuel-pais).
```

---

## Error Handling

```yaml
error_handling:
  unclear_strategy:
    cause: "Stakeholder cannot articulate business direction"
    handling: "Use analyst agent to facilitate strategy workshop"
    recovery: "Resume after strategy is clear"

  missing_data:
    cause: "Current org structure not documented"
    handling: "Interview available stakeholders, build from scratch"
    recovery: "Document what we learn, flag gaps"

  conflicting_perspectives:
    cause: "Different stakeholders describe different problems"
    handling: "Document all perspectives, identify common themes"
    recovery: "Present synthesis to stakeholders for alignment"
```

---

## Heuristics Reference

| Heuristic | Where Applied | Blocking |
|-----------|---------------|----------|
| TTC001 - Diagnosis Gate | Phase 2, Step 2.1 | Yes |
| VT-ASC-001 - Value Stream Required | Phase 4 | Yes |
| VT-ASC-002 - Overload Triage | Phase 2, Step 2.4 | Yes |

---

_Task Version: 1.0_
_Workflow: wf-design-team-structure (phase_1)_
_Agent: @ruth-malan_
_Lines: 300+_
