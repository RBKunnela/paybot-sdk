---
task: "Workflow A: Expert Squad Preparation"
responsavel: forge
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - squad_idea: User's squad concept involving real experts/authors (required)
  - expert_names: Names of experts the squad is based on (elicited)
  - source_materials: Books, interviews, courses consumed by user (elicited)
Saida: |
  - spd_document: Complete SPD with mind clone sources, READY/CONDITIONAL/DRAFT status
  - source_assessment: GO/NO-GO per expert with gap analysis
  - framework_extractions: Core frameworks documented per expert
Checklist:
  - "[ ] Every expert has source assessment (GO/NO-GO)"
  - "[ ] 10+ sources per expert (or documented gap)"
  - "[ ] 5+ Tier 1 sources per expert (or documented gap)"
  - "[ ] Core framework triangulated in 3+ sources"
  - "[ ] SPD status correctly reflects assessment"
---

# Workflow A: Expert Squad Preparation (Mind-Clone Based)

This is the most complex workflow. Expert squads require source material collection and validation BEFORE the SPD can be marked as READY.

## Phase A1: Expert Identification

**Elicit from user for EACH expert:**

1. Full name
2. Domain/specialty
3. Why this expert? What makes their methodology unique?
4. What agent in the squad will this expert power?

Record answers in structured format.

## Phase A2: Source Material Audit (CRITICAL -- DO NOT SKIP)

For EACH expert, ask these questions IN ORDER:

```
Q1: "What books by {expert} have you read?"
    → For each book: Title, year, did you finish it? Key takeaways?

Q2: "What videos, talks, or interviews by {expert} have you watched?"
    → For each: Title/topic, approximate duration, key insights?

Q3: "Have you taken any courses or workshops by {expert}?"
    → Details of what was covered

Q4: "What are the 2-3 core FRAMEWORKS this expert teaches?"
    → Name each framework, describe the steps
    → Can you explain it without looking at notes? (tests depth)

Q5: "What would this expert NEVER say or do?"
    → Anti-patterns are critical for mind clones

Q6: "Are there any memorable quotes or principles you remember?"
    → Direct quotes reveal voice DNA

Q7: "Have you actually consumed this material, or are you working from summaries?"
    → BE HONEST in your assessment. Summaries = Tier 3, not Tier 1.
```

## Phase A3: Source Gap Analysis

Evaluate against BLOCKING minimums:

| Requirement | Minimum | User Has | Status |
|-------------|---------|----------|--------|
| Total sources | 10+ | ? | ? |
| Tier 1 sources (BY the expert) | 5+ | ? | ? |
| Different source types | 3+ | ? | ? |
| Content volume | 5+ hours OR 200+ pages | ? | ? |
| Core framework in 3+ sources | Yes (triangulation) | ? | ? |

**GO/NO-GO Decision:**
- **GO:** All 5 blocking checks pass -> Proceed to SPD
- **CONDITIONAL:** 4/5 pass, with clear plan to fill gap -> Proceed with warnings
- **NO-GO:** <4/5 pass -> STOP. Help user create a consumption plan.

## Phase A4: Source Consumption Plan (If NO-GO or CONDITIONAL)

If insufficient material:
1. Identify expert's top 1-2 books -> Recommend reading
2. Find 3-5 notable interviews/talks on YouTube -> Provide search guidance
3. Find blog/website/social media -> Note it
4. Tell them honestly: "Come back when you can explain the framework without notes."
5. Save partial SPD as DRAFT status

## Phase A5: Framework Deep-Dive

For each expert's core framework, extract:
- Name and origin
- Philosophy (core belief)
- When to use / When NOT to use
- Steps (detailed)
- Anti-patterns (common mistakes)
- Key quote that captures the essence

## Phase A6: Agent Architecture Design

Design the tier structure:
- Tier 0: Diagnostic/routing agent
- Tier 1: Core specialists (one per expert)
- Tier 2: Niche specialists (if needed)
- Tier 3: Quality tools (if needed)
- Orchestrator designation

## Phase A7: Quality Gates & Routing

Define:
- Quality gate IDs and thresholds
- Routing flow with BLOCKING markers
- Veto dimensions (if applicable)

## Phase A8: SPD Generation

Load `templates/spd-template.md` and fill all 12 sections.
Run `checklists/spd-validation-checklist.md` before marking status.

## Veto Conditions

- VETO if user wants to skip source collection entirely
- VETO if marking READY with <3/5 blocking checks passing
- VETO if no orchestrator designated
