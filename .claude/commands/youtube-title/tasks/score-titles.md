---
task: Score and Rank Titles
responsavel: "@title-scorer"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - curiosity_titles: 5 titles from @curiosity-architect
  - power_titles: 5 titles from @power-titler
  - pattern_titles: 5 titles from @pattern-disruptor
  - trigger_titles: 5 titles from @trigger-specialist
Saida: |
  - title_scorecard: Complete scorecard with all 20 titles ranked, top 10 selected, A/B test pairs recommended, and improvement notes
---

# *score - Score and Rank Titles

## Overview

The Title Scorer is the analytical engine of the the platform Title Pipeline. While the four generators create titles from different psychological angles, the Scorer evaluates all 20 titles through a single, unified scoring framework. No favoritism, no bias toward any style — only data-driven assessment of CTR potential.

This agent operates like a casting director: every title gets a fair audition across 8 dimensions, and only the top 10 advance. The Scorer also identifies which titles pair well for A/B testing and provides specific improvement notes for titles that are close but not quite there.

Key principle: A title's job is to get clicked by the RIGHT person. High CTR with the wrong audience is worse than moderate CTR with the right audience. Every scoring dimension accounts for audience alignment with the Working Professional.

## Flow

### Step 1: Receive All 20 Titles
Collect the 5 titles from each generator:
- 5 from @curiosity-architect (curiosity gap titles)
- 5 from @power-titler (direct value titles)
- 5 from @pattern-disruptor (pattern interrupt titles)
- 5 from @trigger-specialist (psychological trigger titles)

Organize them in a master list with source attribution.

### Step 2: Score Each Title on 8 Dimensions

Each dimension is scored 1-10. All 20 titles are scored on the same scale.

**Dimension 1: Curiosity (Weight: 15%)**
- Does the title create a specific information gap?
- Would a viewer feel INCOMPLETE without clicking?
- Is the gap strong enough to overcome scroll momentum?
- Scoring guide: 1-3 = no gap, 4-6 = mild interest, 7-8 = strong pull, 9-10 = irresistible

**Dimension 2: Value Promise (Weight: 15%)**
- Is there a clear benefit or outcome promised?
- Does the viewer know what they will GET from this video?
- Is the value specific enough to feel real?
- Scoring guide: 1-3 = no clear value, 4-6 = vague value, 7-8 = clear value, 9-10 = extraordinary value

**Dimension 3: Emotional Charge (Weight: 15%)**
- Does the title trigger a felt emotional response?
- Would the viewer FEEL something when reading this?
- Is the emotion appropriate for the topic and audience?
- Scoring guide: 1-3 = flat, 4-6 = mild feeling, 7-8 = strong emotion, 9-10 = visceral response

**Dimension 4: Specificity (Weight: 10%)**
- Does the title contain concrete numbers, names, timeframes?
- Is it specific enough to be believable?
- Does specificity create credibility?
- Scoring guide: 1-3 = generic, 4-6 = somewhat specific, 7-8 = concrete, 9-10 = laser-precise

**Dimension 5: Readability (Weight: 10%)**
- Can you read it aloud naturally in one breath?
- Are the words simple and conversational?
- Is the structure clean (no awkward phrasing)?
- Scoring guide: 1-3 = clunky, 4-6 = acceptable, 7-8 = smooth, 9-10 = effortless

**Dimension 6: SEO Alignment (Weight: 10%)**
- Does it contain relevant keywords from the research brief?
- Would YouTube's search algorithm surface this?
- Does it balance searchability with clickability?
- Scoring guide: 1-3 = no SEO value, 4-6 = some keywords, 7-8 = well-optimized, 9-10 = SEO-perfect

**Dimension 7: Uniqueness (Weight: 10%)**
- Has this title structure been used by competitors?
- Would it stand out in a feed of similar content?
- Does it feel fresh and original?
- Scoring guide: 1-3 = copy/generic, 4-6 = slightly different, 7-8 = notably fresh, 9-10 = never seen before

**Dimension 8: Thumbnail Synergy (Weight: 15%)**
- Can you immediately imagine a compelling thumbnail?
- Would title + thumbnail tell a complete story?
- Does the title AVOID repeating what the thumbnail would show?
- Scoring guide: 1-3 = hard to visualize, 4-6 = workable, 7-8 = strong pairing, 9-10 = title + thumb = magic

### Step 3: Calculate Composite CTR Prediction Score

```
CTR Score = (Curiosity x 0.15) + (Value x 0.15) + (Emotion x 0.15) +
            (Specificity x 0.10) + (Readability x 0.10) + (SEO x 0.10) +
            (Uniqueness x 0.10) + (Thumbnail x 0.15)

Final Score = CTR Score x 10 (to convert to 1-100 scale)
```

### Step 4: Rank All 20 Titles
Sort all titles by CTR Prediction Score, highest to lowest. Ties broken by:
1. Higher Curiosity score
2. Higher Emotional Charge score
3. Higher Uniqueness score

### Step 5: Select Top 10
- Top 10 titles advance to QA (@title-qa)
- Titles ranked 11-15 are "alternates" (available if QA rejects a top 10 title)
- Titles ranked 16-20 are archived with notes for future reference

### Step 6: Recommend A/B Test Pairs
From the top 10, identify 2-3 optimal A/B test pairs:
- **Pair criteria**: Same topic angle but DIFFERENT psychological mechanism
- Example: A curiosity title vs. a power title on the same theme
- Each pair should test a specific hypothesis (e.g., "Does loss aversion outperform curiosity for this audience on this topic?")

### Step 7: Provide Improvement Notes
For each title in the top 10, provide ONE specific improvement suggestion:
- A word swap that could increase impact
- A structural tweak that improves readability
- A number adjustment that increases believability
- An emotional amplifier that could be added

## Output Format

```markdown
# Title Scorecard
**Topic**: [topic]
**Date**: [date]
**Scorer**: @title-scorer
**Titles Evaluated**: 20
**Top 10 Selected**: Yes

## Complete Rankings

### Rank 1 — CTR Score: [score]/100
**Title**: "[title text]"
**Source**: @[generator-agent]
**Type**: [curiosity/power/pattern/trigger]
| Dimension | Score |
|-----------|-------|
| Curiosity | [x]/10 |
| Value Promise | [x]/10 |
| Emotional Charge | [x]/10 |
| Specificity | [x]/10 |
| Readability | [x]/10 |
| SEO Alignment | [x]/10 |
| Uniqueness | [x]/10 |
| Thumbnail Synergy | [x]/10 |
**Improvement Note**: [specific suggestion]

### Rank 2 — CTR Score: [score]/100
[same structure]

... [continue for all 20]

## Top 10 Summary
| Rank | Title | Source | Type | CTR Score |
|------|-------|--------|------|-----------|
| 1 | "[title]" | @agent | type | [score] |
| 2 | ... | ... | ... | ... |
... [to 10]

## Alternates (11-15)
| Rank | Title | Source | CTR Score | Note |
|------|-------|--------|-----------|------|
| 11 | "[title]" | @agent | [score] | [why it didn't make top 10] |
...

## A/B Test Recommendations

### Pair 1: [Hypothesis being tested]
- **Title A**: "[title]" (CTR Score: [x])
- **Title B**: "[title]" (CTR Score: [x])
- **What we learn**: [what the A/B result would tell us about this audience]

### Pair 2: [Hypothesis being tested]
[same structure]

### Pair 3: [Hypothesis being tested]
[same structure]

## Scoring Notes
[Any overall observations about patterns in the scores — which title types performed strongest, any systematic weaknesses, recommendations for future title generation]
```

## Examples

### Example: Scoring excerpt for one title

**Title**: "The 4-hour weekend system that got me 100K subscribers without showing my face"
**Source**: @curiosity-architect | Type: Curiosity (Specificity Gap)

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Curiosity | 9/10 | "4-hour weekend system" — what IS that? Must know |
| Value Promise | 8/10 | 100K subscribers is a massive, specific outcome |
| Emotional Charge | 7/10 | Hope + "if they can, I can" resonance |
| Specificity | 9/10 | 4 hours, weekend, 100K, faceless — all concrete |
| Readability | 8/10 | Reads naturally, one breath, conversational |
| SEO Alignment | 7/10 | "faceless YouTube" + "subscribers" are searchable |
| Uniqueness | 8/10 | "Weekend system" framing is fresh in this niche |
| Thumbnail Synergy | 9/10 | Timer + analytics screenshot = visual proof |

**CTR Score**: (9x.15)+(8x.15)+(7x.15)+(9x.10)+(8x.10)+(7x.10)+(8x.10)+(9x.15) = 81.5/100

**Improvement Note**: Consider "The 4-hour weekend method" instead of "system" — "method" implies actionable steps while "system" can feel corporate. Alternatively, test "blueprint" for authority framing.

### Example: A/B Test Pair

**Pair 1: Curiosity vs. Loss Aversion**
- Title A: "The 4-hour weekend system that got me 100K subscribers without showing my face" (CTR: 81.5)
- Title B: "Every weekend you waste is 1,000 subscribers you'll never get back" (CTR: 78.0)
- What we learn: Does our audience respond more to aspirational possibility (curiosity) or fear of waste (loss aversion)? This data shapes ALL future title generation for this topic cluster.
