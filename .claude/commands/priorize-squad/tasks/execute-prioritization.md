# Execute Prioritization

**Task ID:** `execute-prioritization`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 1.0
**Last Updated:** 2026-02-13

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Execute Prioritization Session |
| **status** | `pending` |
| **responsible_executor** | priorize-chief (Agent) |
| **execution_type** | `Hybrid` |
| **input** | Technique ID + items to prioritize |
| **output** | Ranked/classified list with scores |
| **action_items** | 7 steps |
| **acceptance_criteria** | 5 criteria |

**Estimated Time:** 10-120 minutes (depends on technique and item count)

## Overview

Executes a complete prioritization session using a specific technique. Guides the user through every step of the chosen technique, collecting inputs, calculating scores, and producing a ranked output. Supports all 23 techniques in the catalog.

## Input

- **technique_id** (string): ID of the technique to execute (e.g., "rice", "eisenhower")
  - Required: Yes
  - If not provided: Ask user to choose or run *select-technique first
- **items** (array): List of items to prioritize
  - Required: Yes
  - If not provided: Elicit from user
- **context** (text): Optional context from *select-technique

## Output

- **Prioritized result** (structured): Ranked list, matrix, or classified items
  - Format depends on technique type (matrix, scored table, categorized list)

## Action Items

### Step 1: Validate Inputs

1. Confirm technique is valid (exists in catalog)
2. Collect items if not provided:

```
List the items you want to prioritize.
You can paste a list (one per line) or describe them:
```

3. Validate item count:
   - If >50 items: Warn and suggest pre-filtering
   - If <2 items: Inform that prioritization needs at least 2 items

### Step 2: Explain the Technique (Brief)

Before starting, give a 3-sentence explanation:

```
**[Technique Name]**

[How it works in 2-3 sentences]
[What we'll do: brief process description]

Items to prioritize: [count]
Estimated time: [time based on technique x items]

Let's begin.
```

### Step 3: Execute Technique-Specific Workflow

Load the technique from data/technique-catalog.yaml and follow its `steps` field exactly.

#### FOR MATRIX TECHNIQUES (eisenhower, value_effort, pick_chart):

For each item, ask the relevant 2 questions:

**Eisenhower:**
```
**[Item Name]**
- Is this URGENT? (time-sensitive, has a deadline pressing) → Yes/No
- Is this IMPORTANT? (contributes to goals, high impact if done) → Yes/No
→ Quadrant: [Q1/Q2/Q3/Q4]
```

**Value vs. Effort:**
```
**[Item Name]**
- Value (1-10): How much business value does this deliver?
- Effort (1-10): How much time/resources does this require?
→ Quadrant: [Quick Win / Big Project / Fill-in / Money Pit]
```

**PICK Chart:**
```
**[Item Name]**
- Ease (easy/hard): How easy is this to implement?
- Payoff (low/high): How much impact will this have?
→ Category: [Possible / Implement / Challenge / Kill]
```

Present final matrix:
```
|              | [Axis 1 Low]    | [Axis 1 High]    |
|--------------|-----------------|-------------------|
| [Axis 2 High]| [items]        | [items]           |
| [Axis 2 Low] | [items]        | [items]           |
```

#### FOR SCORING TECHNIQUES (rice, ice, gut, wsjf, weighted_scoring, cd3):

For each item, ask for scores on each criterion:

**RICE:**
```
**[Item Name]**
1. Reach (users per quarter): ___
2. Impact (0.25=minimal, 0.5=low, 1=medium, 2=high, 3=massive): ___
3. Confidence (50%, 80%, or 100%): ___
4. Effort (person-months): ___
→ RICE Score = (Reach × Impact × Confidence) / Effort = ___
```

**ICE:**
```
**[Item Name]**
1. Impact (1-10): ___
2. Confidence (1-10): ___
3. Ease (1-10): ___
→ ICE Score = Impact × Confidence × Ease = ___
```

**GUT:**
```
**[Item Name]**
1. Gravity (1-5): Impact if not solved? (1=minimal, 5=catastrophic)
2. Urgency (1-5): How time-sensitive? (1=can wait, 5=immediate)
3. Tendency (1-5): Will it get worse? (1=stable, 5=rapid deterioration)
→ GUT Score = G × U × T = ___
```

**WSJF:**
```
**[Item Name]**
1. User-Business Value (fibonacci 1-21): ___
2. Time Criticality (fibonacci 1-21): ___
3. Risk Reduction / Opportunity (fibonacci 1-21): ___
4. Job Size (fibonacci 1-21): ___
→ Cost of Delay = Value + Criticality + Risk = ___
→ WSJF = CoD / Job Size = ___
```

**Weighted Scoring:**
```
First, define your criteria and weights:

| Criterion | Weight (%) |
|-----------|-----------|
| [User-defined] | __% |
| [User-defined] | __% |
| [User-defined] | __% |
| [User-defined] | __% |
Total: 100%

Then for each item:
**[Item Name]**
- [Criterion 1] (1-10): ___
- [Criterion 2] (1-10): ___
- [Criterion 3] (1-10): ___
→ Weighted Score = Σ(score × weight) = ___
```

Present final ranking table:
```
| Rank | Item | [Criteria columns] | Score |
|------|------|--------------------|-------|
| 1 | ... | ... | ... |
| 2 | ... | ... | ... |
```

#### FOR CATEGORIZATION TECHNIQUES (moscow, kano, abcde, three_feature_buckets):

For each item, ask the classification question:

**MoSCoW:**
```
**[Item Name]**
Does the project FAIL without this?
- Yes → **Must have**
- No → Is it IMPORTANT for success?
  - Yes → **Should have**
  - No → Would users APPRECIATE it?
    - Yes → **Could have**
    - No → **Won't have** (this cycle)
```

**ABCDE:**
```
**[Item Name]**
- A: Must do — serious consequences if not done?
- B: Should do — mild consequences if not done?
- C: Nice to do — no consequences either way?
- D: Delegate — someone else can do this?
- E: Eliminate — not needed at all?
→ Category: ___
```

Present final categorized list:
```
**Must Have (M):**
- [items]

**Should Have (S):**
- [items]

**Could Have (C):**
- [items]

**Won't Have (W):**
- [items]
```

#### FOR VISUAL/MAPPING TECHNIQUES (story_mapping, impact_mapping):

Guide the user through the mapping structure:

**Story Mapping:**
```
Step 1: Define the user journey backbone (activities left to right)
Step 2: Under each activity, list user stories
Step 3: Arrange vertically by priority (essential on top)
Step 4: Draw the release line
```

**Impact Mapping:**
```
Step 1: Define the GOAL (measurable business outcome)
Step 2: Identify WHO (actors that can help/hinder)
Step 3: For each actor, define HOW (behavior change)
Step 4: For each impact, define WHAT (deliverables)
Step 5: Prioritize deliverables by connection to goal
```

#### FOR GROUP TECHNIQUES (ahp, ngt):

**NGT:**
```
Step 1: Present the question to the group
Step 2: Silent generation (5-10 min, each person writes ideas)
Step 3: Round-robin sharing (one idea per turn)
Step 4: Clarification discussion (no arguing, just clarifying)
Step 5: Voting (each person picks top 5, ranks 5-4-3-2-1)
Step 6: Tally and present results
```

**AHP:**
```
Step 1: Define criteria (3-7)
Step 2: Pairwise comparison of criteria (1-9 scale)
Step 3: Calculate priority weights
Step 4: Check consistency ratio (<0.1)
Step 5: Compare options under each criterion
Step 6: Calculate final weighted scores
```

### Step 4: Calculate Results

- Apply the technique formula/classification correctly
- Double-check calculations
- Rank from highest to lowest (for scoring techniques)
- Group by category (for categorization techniques)

### Step 5: Present Results

Present in the technique's natural output format (table, matrix, list, map).

Always include:
1. **Summary header** with technique name and item count
2. **Results** in formatted table/matrix
3. **Top 3 priorities** highlighted
4. **Key insights** (any surprises, close scores, etc.)

### Step 6: Sanity Check

```
**Sanity Check**

The top 3 priorities are:
1. [Item] (score/category)
2. [Item] (score/category)
3. [Item] (score/category)

Does this ranking match your intuition?

1. Yes, looks right
2. Something seems off — let me explain
3. I'd like to adjust some scores
```

If user wants to adjust:
- Allow re-scoring specific items
- Recalculate and present updated results

### Step 7: Provide Next Steps

```
**Next Steps:**
- Priority #1: [Item] — Start with this
- Priority #2: [Item] — Queue after #1
- Priority #3: [Item] — Plan for next cycle

**Actions:**
- [ ] Share this ranking with [stakeholders]
- [ ] Add top items to [sprint/roadmap/to-do list]
- [ ] Schedule review in [timeframe] to re-prioritize
```

## Acceptance Criteria

- [ ] **AC-1:** All items scored/classified — no skips
- [ ] **AC-2:** Scores calculated correctly (formula verified)
- [ ] **AC-3:** Results ranked and presented in clear formatted output
- [ ] **AC-4:** Sanity check performed with user
- [ ] **AC-5:** Actionable next steps provided

## Veto Conditions

- **VETO:** Do NOT skip any item during scoring
- **VETO:** Do NOT accept all-same scores (e.g., everything is 10/10 impact) — force differentiation
- **VETO:** Do NOT present results without calculation verification
- **VETO:** Do NOT mix techniques mid-session

## Error Handling

### User Unsure About Scores
- Provide anchoring examples: "If [most impactful item] is a 10, where does [this item] fall?"
- Suggest using relative comparison: "Is this more or less impactful than [previous item]?"

### Too Many Items
- If >30 items for scoring technique: Suggest doing a quick MoSCoW pre-filter first
- If >50 items: Strongly recommend pre-filtering before detailed scoring

### Tied Scores
- If items tie: Ask user for tiebreaker criterion
- Suggest looking at effort/ease as tiebreaker for value-based techniques

---

_Task Version: 1.0_
_Pattern: HO-TP-001_
