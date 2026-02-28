# Task: Habit Zone Analysis

**Task ID:** habit-zone
**Version:** 1.0
**Purpose:** Analyze whether a product sits in the Habit Zone by evaluating frequency of use against perceived utility, and recommend strategies to move into the zone
**Agent:** @nir-eyal
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Evaluates a product's position on the Habit Zone graph, where the X-axis represents frequency of use and the Y-axis represents perceived utility. Products in the Habit Zone (high frequency, high perceived utility) become defaults in users' lives. Products outside the zone must either increase usage frequency, increase perceived value, or both. This analysis identifies where the product currently sits, what competing behaviors occupy the same space, and provides concrete recommendations to shift into the Habit Zone.

```
INPUT (product_description, usage_frequency, competing_behaviors)
    |
[PHASE 1: FREQUENCY ASSESSMENT]
    -> Measure and categorize current usage frequency
    |
[PHASE 2: PERCEIVED UTILITY MAPPING]
    -> Evaluate how much value users believe the product provides
    |
[PHASE 3: HABIT ZONE POSITIONING]
    -> Plot the product on the Habit Zone graph and classify
    |
[PHASE 4: GAP RECOMMENDATIONS]
    -> Design strategies to move the product into the Habit Zone
    |
OUTPUT: Habit Zone analysis report with positioning and action plan
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Description of the product or feature being analyzed |
| usage_frequency | string | Yes | Current usage patterns: how often users engage (daily, weekly, monthly, etc.) |
| competing_behaviors | string | Yes | What users do instead or alongside this product to meet the same need |
| user_research_data | string | No | Any existing data on user engagement metrics, retention curves, or NPS scores |
| market_category | string | No | Product category for benchmark comparison (social, productivity, health, etc.) |
| retention_data | string | No | Day 1, Day 7, Day 30 retention rates if available |

---

## Preconditions

- The product has real or projected usage data, even if based on assumptions from user research
- Competing behaviors can be identified, whether they are other products, manual processes, or doing nothing
- The team understands that not every product needs to be habit-forming; some products are better as vitamins than painkillers
- Stakeholders are prepared to receive an honest assessment that may show the product is far from the Habit Zone

---

## Steps

### Phase 1: Frequency Assessment

1. Document the current usage frequency with specificity: times per day, per week, per month
2. Categorize the frequency tier: high (multiple times daily), medium (daily to weekly), low (weekly or less), rare (monthly or less)
3. Identify what drives each usage instance: is it prompted externally (notification, email) or internally (habit, emotion)?
4. Calculate the ratio of prompted vs. unprompted usage; unprompted usage above 50% suggests emerging habit
5. Compare usage frequency against category benchmarks (e.g., social media averages 8+ opens/day, email 5+/day, fitness apps 3-4/week)
6. Map usage frequency over time: is it increasing, stable, or declining? Declining frequency is a strong signal the product is outside the Habit Zone
7. Identify frequency ceiling: what is the maximum reasonable frequency for this product category?

### Phase 2: Perceived Utility Mapping

1. Define perceived utility: how much value does the user believe they get from each interaction?
2. Assess utility across three dimensions: functional value (does it solve a problem?), emotional value (does it make them feel good?), social value (does it connect them to others?)
3. Evaluate the "toothbrush test" (Google's framework): would users miss this product if it disappeared? Would they use it at least twice a day?
4. Map the utility curve: does perceived value increase with each use (network effects, personalization) or decrease (content exhaustion, novelty fade)?
5. Identify the "aha moment": the specific interaction after which users perceive significantly higher value
6. Compare perceived utility against the effort required; if effort exceeds perceived value, the product cannot reach the Habit Zone
7. Survey or estimate how users would describe the product's importance: nice-to-have, useful, important, or essential

### Phase 3: Habit Zone Positioning

1. Plot the product on the Habit Zone graph using frequency (X) and perceived utility (Y) assessments
2. Classify the product's position into one of four quadrants:
   - **Habit Zone** (high frequency, high utility): product is a default behavior
   - **Utility Tool** (low frequency, high utility): valuable but not habitual (e.g., tax software)
   - **Entertainment** (high frequency, low utility): frequently used but easily replaceable
   - **Dead Zone** (low frequency, low utility): at risk of abandonment
3. Plot competing behaviors on the same graph for relative positioning
4. Identify which quadrant boundary the product is closest to; this determines the most efficient path to the Habit Zone
5. Document the current gap: how far is the product from the Habit Zone on each axis?
6. Assess whether the product category naturally supports habit formation or if it is structurally a low-frequency product

### Phase 4: Gap Recommendations

1. If frequency is the gap: design strategies to increase touchpoints without annoying users
   - Add meaningful notifications tied to user value, not engagement metrics
   - Create content or data refresh cycles that give users a reason to return
   - Introduce social triggers (mentions, replies, shared activity)
   - Reduce time-to-value for each session to encourage more frequent short visits
2. If perceived utility is the gap: design strategies to increase the value of each interaction
   - Improve the core value proposition so each use delivers measurable benefit
   - Add personalization that compounds over time
   - Create progress visibility so users can see cumulative value
   - Introduce variable rewards that make each visit feel unique
3. If both are gaps: recommend starting with utility, since frequency without value creates churn
4. Prioritize recommendations by effort-to-impact ratio
5. Define measurable targets: what frequency and utility metrics would indicate the product has entered the Habit Zone?
6. Create a 30/60/90 day roadmap for Habit Zone migration
7. Identify risks: what could prevent the product from reaching the Habit Zone, and what mitigations exist?

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| habit_zone_report | markdown | Complete analysis with current positioning, gap assessment, and recommendations |
| positioning_graph | ascii/markdown | Visual plot of product and competitors on the Habit Zone axes |
| recommendation_plan | markdown | Prioritized action plan with 30/60/90 day targets for Habit Zone migration |
| benchmark_comparison | markdown | Category benchmark data showing where similar products fall on the graph |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Frequency quantified | blocking | Usage frequency must be stated in specific numeric terms, not vague descriptors |
| Utility assessed | blocking | Perceived utility must be evaluated across at least two dimensions (functional, emotional, social) |
| Position classified | blocking | Product must be explicitly placed in one of the four quadrants with justification |
| Competitors plotted | blocking | At least two competing behaviors must be positioned on the same graph |
| Actionable recommendations | warning | Each recommendation must include a specific, implementable change, not just strategic advice |
| Metrics defined | warning | Success metrics for Habit Zone entry must be quantified |

---

## Handoff

- **On completion:** Hand to @nir-eyal for hook-model task if the product needs a full hook cycle design
- **On product strategy questions:** Hand to @design-chief for strategic review
- **On engagement metric implementation:** Hand to @dev for analytics instrumentation
- **On issues:** Escalate to @design-chief
