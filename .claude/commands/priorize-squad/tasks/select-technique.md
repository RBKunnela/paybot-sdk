# Select Prioritization Technique

**Task ID:** `select-technique`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 1.0
**Last Updated:** 2026-02-13

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Select Prioritization Technique |
| **status** | `pending` |
| **responsible_executor** | priorize-chief (Agent) |
| **execution_type** | `Hybrid` |
| **input** | User context description |
| **output** | Recommended technique(s) with rationale |
| **action_items** | 6 steps |
| **acceptance_criteria** | 4 criteria |

**Estimated Time:** 3-5 minutes

## Overview

Guided questionnaire that analyzes the user's prioritization context across 5 dimensions and recommends the optimal technique from the 23-technique catalog. Uses a decision tree with adaptive questioning — stops as soon as a clear recommendation emerges.

## Input

- **User context** (text): Description of what needs to be prioritized
  - Required: Yes
  - If not provided: Elicit through questions

## Output

- **Technique recommendation** (structured): Primary recommendation + alternatives
  - Format: Context analysis + recommendation table + next step

## Action Items

### Step 1: Elicit Context (5 Dimensions)

Ask the user up to 5 questions, STOPPING as soon as you have enough to recommend.
Present as numbered options. Accept both numbers and text answers.

**Question 1: What are you prioritizing?**

```
What are you prioritizing?

1. Personal daily tasks (to-do list, work tasks)
2. Product features / backlog items
3. Projects in a portfolio
4. Problems, bugs, or risks
5. Team brainstorming results / ideas
6. Strategic initiatives
7. Other (please describe)
```

**SHORTCUT RULES:**
- If answer is 1 (personal tasks) → Skip to Step 4, recommend: Eisenhower, ABCDE, or 1/3/9
- If answer is 4 (problems/risks) → Skip to Step 4, recommend: GUT, Pareto, Eisenhower
- If answer is 5 (brainstorming) → Ask Q5 only, recommend: NGT, PICK Chart, Value vs. Effort

**Question 2: How many items?** (Only if answer was 2, 3, or 6)

```
Approximately how many items do you need to prioritize?

1. Less than 10
2. 10-30
3. 30-100
4. More than 100
```

**SHORTCUT RULES:**
- If >100 items → Suggest pre-filtering with MoSCoW first, then scoring technique
- If <10 items → Simpler techniques preferred (Value vs. Effort, ICE)

**Question 3: What data do you have?**

```
What data do you have available?

1. None — just opinions and intuition
2. Basic usage metrics (DAU, page views, etc.)
3. Customer feedback / feature requests
4. Customer satisfaction surveys
5. Financial data (revenue, costs, margins)
6. Multiple data sources
```

**ROUTING:**
- 1 (no data) → ICE, MoSCoW, Value vs. Effort, Three Buckets
- 2 (usage) → RICE, Opportunity Scoring
- 3 (feedback) → Buy a Feature, MoSCoW, Story Mapping
- 4 (surveys) → Kano, Opportunity Scoring, QFD
- 5 (financial) → WSJF, CD3, Weighted Scoring
- 6 (multiple) → RICE, WSJF, Weighted Scoring, AHP

**Question 4: How much time do you have?**

```
How much time can you dedicate to this prioritization?

1. Under 15 minutes (need it fast)
2. 15-60 minutes (reasonable session)
3. 1-3 hours (thorough analysis)
4. Half day or more (deep evaluation)
```

**FILTER:**
- Under 15 min → Only complexity 1 techniques
- 15-60 min → Complexity 1-2 techniques
- 1-3 hours → Complexity 1-3 techniques
- Half day+ → Any complexity

**Question 5: Who is involved?** (Only if not individual)

```
Who will participate in the prioritization?

1. Just me
2. Small team (2-6 people)
3. Large team (7+ people)
4. External stakeholders (clients, executives)
```

### Step 2: Analyze Context

Summarize the 5 dimensions in a context card:

```
**Context Analysis:**
- Prioritizing: [what]
- Items: [how many]
- Data available: [type]
- Time available: [duration]
- Team size: [who]
```

### Step 3: Apply Decision Tree

Cross-reference the answers against the selection_tree in technique-catalog.yaml.
Apply filters (complexity, group_size, data_required) to narrow recommendations.

**Algorithm:**
1. Start with all 23 techniques
2. Filter by what's being prioritized (eliminates ~50%)
3. Filter by data availability (eliminates ~30% more)
4. Filter by time constraint (complexity filter)
5. Filter by team size
6. From remaining, pick the BEST FIT as primary recommendation

### Step 4: Present Recommendation

Format:

```
**Recommended: [Technique Name]**

Why this technique:
- [Reason 1 tied to user's context]
- [Reason 2 tied to user's context]
- [Reason 3 tied to user's context]

How it works (brief):
[2-3 sentence explanation]

Time to execute: [estimate]

**Alternatives:**

| Technique | Pros | Cons |
|-----------|------|------|
| [Alt 1] | [advantage] | [disadvantage] |
| [Alt 2] | [advantage] | [disadvantage] |
```

### Step 5: Confirm Selection

```
Ready to prioritize using [technique]?

1. Yes, let's start → (triggers *execute [technique])
2. Tell me more about [technique] → (triggers *explain)
3. I'd prefer [alternative] → (adjusts selection)
4. None of these fit — let me explain more
```

### Step 6: Hand Off to Execution

If user confirms, automatically trigger `*execute [technique_id]` with the collected context.

## Acceptance Criteria

- [ ] **AC-1:** All 5 context dimensions assessed (or shortcutted with valid reason)
- [ ] **AC-2:** Primary technique recommended with at least 3 contextual reasons
- [ ] **AC-3:** At least 2 alternatives presented with pros/cons
- [ ] **AC-4:** User confirmed selection or conversation continued to clarify

## Veto Conditions

- **VETO:** Do NOT recommend Kano or QFD if user has no customer survey data
- **VETO:** Do NOT recommend AHP if user has <15 minutes
- **VETO:** Do NOT recommend individual techniques (Eisenhower, ABCDE, 1/3/9) for team decisions with 7+ people
- **VETO:** Do NOT recommend WSJF or CD3 without at least basic financial/value data

## Error Handling

### User Can't Decide
- Narrow to 2 options and present a direct comparison
- Use *compare to show side-by-side analysis

### User Describes Unusual Scenario
- Fall back to Weighted Scoring Model (most flexible technique)
- Let user define custom criteria

---

_Task Version: 1.0_
_Pattern: HO-TP-001_
