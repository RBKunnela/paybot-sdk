# Compare Prioritization Techniques

**Task ID:** `compare-techniques`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 1.0
**Last Updated:** 2026-02-13

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Compare Prioritization Techniques |
| **status** | `pending` |
| **responsible_executor** | priorize-chief (Agent) |
| **execution_type** | `Agent` |
| **input** | 2-4 technique names + optional context |
| **output** | Comparison table with recommendation |
| **action_items** | 4 steps |
| **acceptance_criteria** | 3 criteria |

**Estimated Time:** 5-10 minutes

## Overview

Compares 2-4 prioritization techniques side-by-side on 8 dimensions, highlighting which is best for the user's specific context. Produces a clear winner with rationale.

## Input

- **techniques** (array): 2-4 technique names or IDs to compare
  - Required: Yes
  - If not provided: Ask which techniques to compare
- **context** (text): Optional description of the prioritization scenario
  - If provided: Adds contextual fit scores

## Output

- **Comparison table** (markdown): Side-by-side analysis on 8 dimensions
- **Recommendation** (text): Best technique for the context with rationale

## Action Items

### Step 1: Identify Techniques

If user didn't specify techniques:
```
Which techniques would you like to compare? (Pick 2-4)

1. Eisenhower Matrix
2. MoSCoW
3. RICE Scoring
4. ICE Scoring
5. GUT Matrix
6. Value vs. Effort
7. WSJF
8. Weighted Scoring
9. Kano Model
10. Other (name it)
```

Load technique details from data/technique-catalog.yaml.

### Step 2: Build Comparison Table

Compare on 8 standardized dimensions:

```
| Dimension | [Tech 1] | [Tech 2] | [Tech 3] |
|-----------|----------|----------|----------|
| **Complexity** | [1-5 stars] | ... | ... |
| **Time to Execute** | [estimate] | ... | ... |
| **Data Required** | [none/minimal/moderate/extensive] | ... | ... |
| **Best Group Size** | [individual/small/large/stakeholders] | ... | ... |
| **Output Precision** | [low/medium/high] | ... | ... |
| **Stakeholder Buy-in** | [low/medium/high] | ... | ... |
| **Repeatability** | [low/medium/high] | ... | ... |
| **Learning Curve** | [5min/30min/1h/training needed] | ... | ... |
```

### Step 3: Add Contextual Analysis (if context provided)

If the user described their scenario, add:

```
**Contextual Fit Analysis:**

| Technique | Fit Score | Why |
|-----------|-----------|-----|
| [Tech 1] | [1-10] | [reason based on context] |
| [Tech 2] | [1-10] | [reason based on context] |
```

### Step 4: Present Recommendation

```
**Recommendation: [Technique Name]**

Why [technique] wins for your context:
- [Reason 1]
- [Reason 2]
- [Reason 3]

When to prefer [alternative] instead:
- [Scenario where alternative is better]

Ready to execute? Type `*execute [technique_id]`
```

## Acceptance Criteria

- [ ] **AC-1:** All 8 dimensions compared accurately
- [ ] **AC-2:** Contextual fit analysis included (if context provided)
- [ ] **AC-3:** Clear winner identified with at least 3 contextual reasons

## Veto Conditions

- **VETO:** Do NOT compare more than 4 techniques at once (becomes confusing)
- **VETO:** Do NOT declare a winner without considering user context
- **VETO:** Do NOT present misleading comparisons (e.g., comparing Eisenhower complexity to AHP as if both are simple)

---

_Task Version: 1.0_
_Pattern: HO-TP-001_
