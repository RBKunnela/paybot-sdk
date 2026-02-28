# Routing Decision Tree

## How the Chief Routes Problems to Specialists

This decision tree is used by the Team Taxonomy Chief to route incoming problems to the correct specialist(s).

---

## Step 1: Classify the Problem

```
Is this about EXISTING teams or NEW teams?
├── EXISTING teams with problems
│   → Go to Step 2A (Health Check Path)
│
├── NEW team design (greenfield)
│   → Go to Step 2B (Design Path)
│
└── AI AGENT squad design/validation
    → Go to Step 2C (Agent Path)
```

---

## Step 2A: Health Check Path

```
What kind of problem?
├── "Teams are slow / blocking each other / too many meetings"
│   → Route: @ruth-malan FIRST (diagnose root cause)
│   → Task: diagnose-org-health
│   → Workflow: wf-org-health-check
│
├── "We need to restructure"
│   → STOP — Do NOT restructure without diagnosis
│   → Route: @ruth-malan FIRST (Tier 0 veto applies)
│   → Task: diagnose-org-health
│   → Then: Route based on diagnosis
│
├── "Team interactions are chaotic"
│   → Route: @ruth-malan (confirm it's interaction, not structure)
│   → Then: @manuel-pais (redesign interactions)
│   → Task: diagnose-org-health → redesign-team-interactions
│
└── "Unclear who decides what"
    → Route: @ruth-malan (confirm governance problem)
    → Then: @manuel-pais (decision authority matrix)
    → Task: diagnose-org-health → redesign-team-interactions
```

### Post-Diagnosis Routing

```
Ruth's diagnosis says:
├── STRUCTURE PROBLEM (>50%)
│   → Route: @matthew-skelton
│   → Task: analyze-team-structure
│   → Then possibly: @manuel-pais (interaction redesign)
│
├── INTERACTION PROBLEM (>50%)
│   → Route: @manuel-pais
│   → Task: redesign-team-interactions
│   → Skip: Matthew (structure is OK)
│
├── GOVERNANCE PROBLEM (>50%)
│   → Route: @manuel-pais (decision authority matrix)
│   → Task: redesign-team-interactions
│
├── MIXED
│   → Route: Priority order from Ruth's fix roadmap
│   → Usually: Governance first → Interaction → Structure last
│
└── NOT AN ORG PROBLEM (tools/culture)
    → Route: OUT OF SQUAD — recommend appropriate team
    → Do NOT restructure for non-org problems
```

---

## Step 2B: Design Path (Greenfield)

```
New team design:
→ Route: @ruth-malan → @matthew-skelton → @manuel-pais
→ Workflow: wf-design-team-structure
→ Tasks (sequential):
  1. analyze-strategic-context (@ruth-malan)
  2. design-team-topology (@matthew-skelton)
  3. design-team-interactions (@manuel-pais)
  4. synthesize-report (@team-taxonomy-chief)
```

---

## Step 2C: Agent Path

```
AI agent squad:
├── Design new agent squad
│   → Route: @matthew-skelton → @barry-hawkins → @yoav-shoham
│   → Workflow: wf-validate-ai-agents
│   → Tasks (sequential):
│     1. assess-agent-topology (@matthew-skelton)
│     2. design-agent-orchestration (@barry-hawkins)
│     3. validate-agent-protocols (@yoav-shoham)
│     4. synthesize-report (@team-taxonomy-chief)
│
├── Validate existing agent protocol
│   → Route: @yoav-shoham FIRST (game-theoretic validation)
│   → Then: @barry-hawkins if redesign needed
│
└── Fix agent interaction problems
    → Route: @barry-hawkins (orchestration redesign)
    → Then: @yoav-shoham (re-validate)
```

---

## Quick Routing Reference

| Problem Type | First Specialist | Second | Third |
|-------------|-----------------|--------|-------|
| Existing team problems | @ruth-malan | varies by diagnosis | varies |
| New team design | @ruth-malan | @matthew-skelton | @manuel-pais |
| New agent squad | @matthew-skelton | @barry-hawkins | @yoav-shoham |
| Validate agent protocol | @yoav-shoham | @barry-hawkins (if needed) | — |
| Interaction issues only | @manuel-pais | — | — |

---

## Veto Gates

| Gate | Who | Power | When |
|------|-----|-------|------|
| Diagnostic Veto | @ruth-malan | Can STOP restructuring | Before any structural changes |
| Cognitive Load Veto | @matthew-skelton | Can BLOCK topology with RED load | Before interaction design |
| Safety Veto | @barry-hawkins | Can BLOCK deployment without safety | Before game-theoretic validation |
| Stability Veto | @yoav-shoham | Can issue NO-GO | Before synthesis |

---

_Routing Decision Tree Version: 1.0_
_Squad: team-taxonomy_
