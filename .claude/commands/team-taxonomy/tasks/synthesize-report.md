# Task: Synthesize Report

**Task ID:** synthesize-report
**Version:** 1.0
**Execution Type:** Agent
**Purpose:** Integrate outputs from multiple specialists into a unified, actionable deliverable
**Orchestrator:** @team-taxonomy-chief
**Mode:** Agent (LLM-driven synthesis with human review)
**Quality Standard:** AIOS Level (300+ lines)
**Workflow:** All workflows (synthesis phase)

---

## Overview

The Team Taxonomy Chief synthesizes outputs from all specialist consultations into a single, coherent deliverable. Resolves contradictions, creates unified recommendations, generates implementation roadmaps, and produces the final report that stakeholders act on.

This task is the final phase of EVERY workflow in the team-taxonomy squad.

```
INPUT (specialist outputs from preceding workflow phases)
    |
[PHASE 1: COLLECT & VERIFY]
    -> Gather all specialist outputs
    -> Verify completeness (all expected phases completed)
    |
[PHASE 2: INTEGRATE & RESOLVE]
    -> Identify commonalities across specialist outputs
    -> Detect and resolve contradictions
    -> Apply conflict resolution protocol
    |
[PHASE 3: SYNTHESIZE DELIVERABLE]
    -> Create unified report
    -> Generate implementation roadmap
    -> Define success metrics
    |
[PHASE 4: QUALITY GATE]
    -> Run checklist for the completed workflow
    -> Verify actionability
    -> Deliver to stakeholder
    |
OUTPUT: Unified Report + Implementation Roadmap
```

---

## Task Anatomy (8 Fields)

### Field 1: ID
- **id:** `synthesize-report`

### Field 2: Purpose
Integrate specialist outputs into a single actionable deliverable. Resolve contradictions using the tier-based conflict resolution protocol. Produce implementation roadmap with clear owners, timelines, and success metrics.

### Field 3: Executor
- **type:** Agent
- **rationale:** Synthesis benefits from systematic integration across large context
- **guardrails:**
  - Must verify ALL expected specialist outputs are present
  - Must explicitly address any contradictions (not ignore them)
  - Human review of final deliverable

### Field 4: Inputs

| Parameter | Type | Required | Source | Description |
|-----------|------|----------|--------|-------------|
| `specialist_outputs` | list | Yes | preceding tasks | All specialist reports |
| `workflow_id` | string | Yes | workflow | Which workflow this synthesizes |
| `conflict_resolution_rules` | yaml | Yes | config.yaml | Tier-based conflict rules |

### Field 5: Preconditions

- [ ] All required specialist phases completed
- [ ] No unresolved veto conditions from any phase
- [ ] Specialist outputs are accessible

### Field 6: Steps

#### PHASE 1: Collect & Verify (10 min)

**Step 1.1: Gather Specialist Outputs**
```yaml
action: "Collect all outputs from the workflow"
verification:
  wf_design_team_structure:
    - "Ruth: Context analysis report"
    - "Matthew: Team topology design"
    - "Manuel: Interaction design"
  wf_org_health_check:
    - "Ruth: Diagnostic report"
    - "Matthew: Structure analysis (if applicable)"
    - "Manuel: Interaction redesign (if applicable)"
  wf_validate_ai_agents:
    - "Matthew: Agent topology assessment"
    - "Barry: Orchestration design"
    - "Yoav: Game-theoretic validation"
veto_condition: "STOP if any required specialist output is missing — cannot synthesize incomplete data"
output: "Verified output inventory"
```

**Step 1.2: Check for Unresolved Issues**
```yaml
action: "Scan specialist outputs for unresolved flags"
checks:
  - "Any open veto conditions?"
  - "Any WARNING items not addressed?"
  - "Any specialist disagreements noted?"
output: "Issue inventory"
```

#### PHASE 2: Integrate & Resolve (20 min)

**Step 2.1: Identify Commonalities**
```yaml
action: "Find where specialists agree"
analysis:
  - "Shared recommendations"
  - "Consistent findings"
  - "Aligned priorities"
output: "Commonality map"
```

**Step 2.2: Detect Contradictions**
```yaml
action: "Find where specialists disagree"
analysis:
  - "Conflicting recommendations"
  - "Different priority orders"
  - "Incompatible designs"
output: "Contradiction inventory"
```

**Step 2.3: Resolve Conflicts**
```yaml
action: "Apply tier-based conflict resolution"
protocol:
  tier_0_veto:
    rule: "Ruth's diagnostic veto overrides all — if she says 'don't restructure', STOP"
    applies_to: "Structure vs interaction diagnosis"

  tier_1_conflict:
    rule: "Matthew vs Manuel disagreement → Chief arbitrates based on evidence"
    process:
      - "Review both arguments"
      - "Weigh evidence strength"
      - "Chief makes final decision with documented rationale"

  tier_2_conflict:
    rule: "Barry vs Yoav disagreement → escalate to Tier 1 for context"
    process:
      - "Present conflict to Matthew/Manuel for broader context"
      - "If still unresolved, Chief arbitrates"

  cross_tier:
    rule: "Lower tier cannot override higher tier without Chief approval"

output: "Conflict resolution log"
```

#### PHASE 3: Synthesize Deliverable (20 min)

**Step 3.1: Create Unified Report**
```yaml
action: "Write the final integrated report"
structure:
  executive_summary: "1-page overview for stakeholders"
  diagnosis: "What we found (from Ruth)"
  design: "What we recommend (from Matthew/Manuel/Barry)"
  validation: "Why it will work (from Yoav)"
  contradictions_resolved: "Where specialists disagreed and how we resolved it"
  implementation_roadmap: "Phased plan with owners and timelines"
  success_metrics: "How we'll know it worked"
  risks: "What could go wrong and mitigations"
output: "Unified report"
```

**Step 3.2: Generate Implementation Roadmap**
```yaml
action: "Create phased implementation plan"
phases:
  immediate: "Week 1 quick wins"
  short_term: "Weeks 2-4 structural changes"
  medium_term: "Months 2-3 stabilization"
  long_term: "Month 3+ monitoring and iteration"
for_each_action:
  - "What to do"
  - "Who owns it"
  - "By when"
  - "How to verify it's done"
output: "Implementation roadmap"
```

**Step 3.3: Define Success Metrics**
```yaml
action: "Define measurable success criteria"
metrics:
  leading: "Early indicators (decision speed, meeting reduction)"
  lagging: "Outcome indicators (delivery velocity, team satisfaction)"
  measurement_plan: "How, when, and who measures"
output: "Success metrics framework"
```

#### PHASE 4: Quality Gate (10 min)

**Step 4.1: Run Workflow Checklist**
```yaml
action: "Run the appropriate checklist for the completed workflow"
checklists:
  wf_design_team_structure: "team-design-checklist.md"
  wf_org_health_check: "org-health-checklist.md"
  wf_validate_ai_agents: "agent-validation-checklist.md"
```

**Step 4.2: Final Validation**
```yaml
blocking_checks:
  - check: "All specialist outputs integrated"
    type: blocking
  - check: "All contradictions resolved with rationale"
    type: blocking
  - check: "Implementation roadmap has owners and dates"
    type: blocking
  - check: "Success metrics are measurable"
    type: blocking
  - check: "Executive summary is actionable"
    type: warning
```

### Field 7: Outputs

| Output | Format | Location | Description |
|--------|--------|----------|-------------|
| Unified Report | markdown | `outputs/synthesis-report.md` | Complete integrated deliverable |
| Implementation Roadmap | markdown | embedded | Phased plan with owners |
| Conflict Resolution Log | yaml | embedded | How disagreements were resolved |
| Success Metrics | markdown | embedded | Measurable success criteria |

### Field 8: Validation

```yaml
validation_criteria:
  blocking:
    - "All specialist outputs are integrated"
    - "Contradictions resolved with documented rationale"
    - "Implementation roadmap exists with owners"
    - "Success metrics are defined and measurable"
  warning:
    - "Executive summary fits on 1 page"
    - "Risk mitigations are specific (not generic)"
    - "Stakeholder audience is clear"
```

---

## Veto Conditions

```yaml
veto_conditions:
  - id: "VT-SR-001"
    trigger: "Missing specialist output from required phase"
    action: "STOP — Cannot synthesize with incomplete data"
    severity: blocking

  - id: "VT-SR-002"
    trigger: "Unresolved contradiction between specialists"
    action: "STOP — Must resolve before finalizing"
    severity: blocking

  - id: "VT-SR-003"
    trigger: "Implementation roadmap has no owners"
    action: "WARN — Every action needs an owner to be actionable"
    severity: warning
```

---

## Anti-Patterns

```yaml
anti_patterns:
  - name: "Cherry-Pick Synthesis"
    description: "Only including the parts you agree with"
    why_bad: "Ignores important specialist insights, creates blind spots"
    correct: "Include ALL specialist findings, resolve disagreements explicitly"

  - name: "Report Without Roadmap"
    description: "Producing analysis without actionable next steps"
    why_bad: "Analysis paralysis — stakeholders don't know what to do"
    correct: "Every report ends with implementation roadmap"

  - name: "Ignoring Contradictions"
    description: "Pretending specialists didn't disagree"
    why_bad: "Hidden disagreements surface during implementation"
    correct: "Document contradictions and resolution rationale"
```

---

## Handoff

```yaml
handoff:
  to: "stakeholder (human)"
  trigger: "Synthesis complete, quality gate passed"
  artifact: "synthesis-report.md"
  format: "Structured markdown with executive summary, design, roadmap, metrics"
  next_steps:
    - "Stakeholder reviews report"
    - "Stakeholder approves or requests changes"
    - "Implementation begins per roadmap"
```

---

_Task Version: 1.0_
_Workflow: All workflows (synthesis phase)_
_Agent: @team-taxonomy-chief_
_Lines: 300+_
