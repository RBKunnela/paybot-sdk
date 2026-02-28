# Quick Prioritize

**Task ID:** `quick-prioritize`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 1.0
**Last Updated:** 2026-02-13

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Quick Prioritize |
| **status** | `pending` |
| **responsible_executor** | priorize-chief (Agent) |
| **execution_type** | `Hybrid` |
| **input** | List of items (text) |
| **output** | Ranked list |
| **action_items** | 5 steps |
| **acceptance_criteria** | 3 criteria |

**Estimated Time:** 3-10 minutes

## Overview

Fast prioritization for simple lists. Auto-selects the most appropriate lightweight technique based on item count and context, then executes it with minimal questions. Designed for users who need a quick answer without going through technique selection.

## Input

- **items** (array): List of items to prioritize
  - Required: Yes
  - Accepts: Comma-separated, numbered list, or bullet points

## Output

- **Ranked list** (markdown): Items in priority order with brief rationale

## Action Items

### Step 1: Collect Items

If items not provided:
```
List the items you want to prioritize.
Paste them as a list, one per line, or comma-separated:
```

Parse the input into a clean numbered list.

### Step 2: Auto-Select Technique

Based on item count and apparent context:

| Items | Technique | Why |
|-------|-----------|-----|
| 1-5 | Value vs. Effort (simplified) | Quick 2-axis rating |
| 6-13 | ICE Scoring (simplified) | Fast 3-factor scoring |
| 14-30 | MoSCoW + ICE within categories | Categorize first, then rank |
| 30+ | MoSCoW pre-filter only | Too many for quick mode |

Inform the user:
```
Auto-selected: [Technique] (best for [count] items in quick mode)
```

### Step 3: Rapid Scoring

**For 1-5 items (Value vs. Effort simplified):**

Present all items at once:
```
Rate each item on two dimensions (1-5):

| # | Item | Value (1-5) | Effort (1-5) |
|---|------|-------------|--------------|
| 1 | [item] | ? | ? |
| 2 | [item] | ? | ? |
...

You can answer as: "5,2 / 4,3 / 3,1 / ..." (value,effort pairs)
```

**For 6-13 items (ICE simplified):**

Present in groups of 3-4:
```
Rate each item (1-5 for each):

**Group 1:**
| # | Item | Impact (1-5) | Confidence (1-5) | Ease (1-5) |
|---|------|-------------|------------------|------------|
| 1 | [item] | ? | ? | ? |
| 2 | [item] | ? | ? | ? |
| 3 | [item] | ? | ? | ? |

Quick format: "4,3,5 / 2,4,3 / 5,5,2"
```

**For 14-30 items (MoSCoW + ICE):**

First pass - quick categorization:
```
Classify each as M (Must), S (Should), C (Could), W (Won't):

1. [item]: ?
2. [item]: ?
...

Quick format: "M, S, M, C, W, S, ..."
```

Then ICE-score only the M and S items.

**For 30+ items:**
```
With 30+ items, quick mode can only do a rough categorization.
For detailed ranking, use `*execute` with RICE or WSJF.

Let's do a quick MoSCoW pass:
Classify each as M/S/C/W...
```

### Step 4: Calculate and Rank

- Apply the appropriate formula
- Rank from highest to lowest
- Present clean results

**Output format:**

```
**Quick Priority Ranking:**

| # | Item | Score | Action |
|---|------|-------|--------|
| 1 | [item] | [score] | Do first |
| 2 | [item] | [score] | Do next |
| 3 | [item] | [score] | Queue |
...

**Technique used:** [name] (quick mode)
**Time spent:** ~[X] minutes
```

### Step 5: Offer Deeper Analysis

```
This was a quick ranking. For more precision:
- `*execute rice` — Full RICE scoring with detailed inputs
- `*select-technique` — Find the optimal technique for your context
```

## Acceptance Criteria

- [ ] **AC-1:** All items scored/classified — no skips
- [ ] **AC-2:** Clear ranked output produced in under 10 minutes
- [ ] **AC-3:** Deeper analysis option offered

## Veto Conditions

- **VETO:** Do NOT use complex techniques (AHP, Kano, QFD) in quick mode
- **VETO:** Do NOT score 30+ items individually in quick mode — categorize only
- **VETO:** Do NOT allow all items to receive the same score

---

_Task Version: 1.0_
_Pattern: HO-TP-001_
