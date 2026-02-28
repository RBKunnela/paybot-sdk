# Task: ICE Prioritization

**Task ID:** ice-score
**Version:** 1.0
**Purpose:** Prioritize growth experiments using Impact, Confidence, and Ease scoring to maximize learning and results per unit of effort
**Agent:** @sean-ellis
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Applies the ICE (Impact x Confidence x Ease) prioritization framework to a set of growth hypotheses, producing a ranked experiment backlog with detailed experiment briefs for the top candidates. ICE scoring, popularized by Sean Ellis, provides a lightweight yet effective way to prioritize growth experiments when speed matters more than precision. This task ensures experiments are scored consistently, biases are surfaced, and the highest-leverage experiments are executed first.

```
INPUT (growth_hypotheses, team_resources, current_metrics)
    |
[PHASE 1: EXPERIMENT BRAINSTORM]
    -> Expand and refine the hypothesis list into testable experiments
    |
[PHASE 2: ICE SCORING]
    -> Score each experiment on Impact, Confidence, and Ease (1-10)
    |
[PHASE 3: PRIORITIZED BACKLOG]
    -> Rank experiments and select the execution batch
    |
[PHASE 4: EXPERIMENT BRIEF CREATION]
    -> Create detailed briefs for top-priority experiments
    |
OUTPUT: Scored experiment backlog with prioritized briefs ready for execution
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| growth_hypotheses | list | Yes | List of growth ideas, hypotheses, or experiment concepts to evaluate (minimum 5) |
| team_resources | string | Yes | Available team capacity: number of engineers, designers, and time per sprint for experiments |
| current_metrics | object | Yes | Baseline metrics for the growth areas being targeted (conversion rates, traffic, activation, retention, etc.) |
| north_star_metric | string | No | The North Star Metric to evaluate impact against; defaults to primary growth metric |
| funnel_stage_focus | string | No | Specific AARRR stage to focus experiments on (acquisition, activation, retention, revenue, referral) |
| past_experiments | list | No | Previously run experiments and their results to calibrate confidence scoring |
| constraints | list | No | Technical, legal, or resource constraints that limit experiment design |

---

## Preconditions

- At least 5 growth hypotheses or experiment ideas are available for scoring
- Team has dedicated capacity for running growth experiments (not 100% allocated to feature work)
- Baseline metrics exist for the areas being experimented on so that impact can be measured
- An experimentation infrastructure exists or can be set up (A/B testing tool, feature flags, analytics)
- Stakeholders agree on using ICE as the prioritization method and will respect the ranked output
- The team understands that ICE scores are directional estimates, not precise predictions

---

## Steps

### Phase 1: Experiment Brainstorm
1. Review the provided growth hypotheses and ensure each is framed as a testable statement: "If we [action], then [metric] will [change] because [reason]"
2. Rewrite any vague ideas into specific, measurable hypotheses; reject ideas that cannot be tested within one sprint
3. Identify gaps in the hypothesis list: are all relevant funnel stages covered? Are there both incremental optimizations and bold bets?
4. Add 3-5 additional experiment ideas inspired by growth best practices relevant to the product and business model
5. Deduplicate and consolidate similar hypotheses into single experiments with variants
6. Assign each experiment a unique ID and categorize by funnel stage (acquisition, activation, retention, revenue, referral)
7. Final list should contain 10-20 experiments for scoring; if fewer than 10, brainstorm additional ideas; if more than 20, pre-filter the weakest

### Phase 2: ICE Scoring
1. Define the scoring rubric for each dimension:
   - **Impact (1-10):** How much will this move the target metric if it works? 10 = 2x improvement or more, 7-9 = significant measurable lift, 4-6 = moderate improvement, 1-3 = marginal change
   - **Confidence (1-10):** How certain are we that this will work? 10 = proven by past data or competitor evidence, 7-9 = strong hypothesis with supporting data, 4-6 = educated guess with some signal, 1-3 = pure speculation or untested assumption
   - **Ease (1-10):** How easy is this to implement and measure? 10 = less than 1 day with existing tools, 7-9 = less than 1 week, one team, 4-6 = 1-2 weeks or cross-team coordination, 1-3 = major engineering effort or external dependencies
2. Score each experiment independently on all three dimensions using the rubric
3. Calculate the ICE score for each experiment: ICE = (Impact + Confidence + Ease) / 3, using the average method for balanced weighting
4. Flag experiments where any single dimension is below 3 — these are likely not worth running regardless of other scores
5. Flag experiments with high Impact but low Confidence — these are good candidates for small-scale validation tests before full execution
6. Check for scoring bias: are all scores clustered in the middle (5-7)? If so, force-rank to create separation
7. If past experiment data exists, calibrate scores by comparing predicted vs actual results of previous experiments
8. Document the reasoning behind each score, especially where judgment calls were made

### Phase 3: Prioritized Backlog
1. Rank all experiments by ICE score from highest to lowest
2. Group experiments into tiers: Tier 1 (top 3-5, execute immediately), Tier 2 (next 5, execute next sprint), Tier 3 (remainder, backlog for future)
3. Check for dependencies: does any Tier 1 experiment depend on another? Adjust sequencing if so
4. Check for conflicts: would any two experiments interfere with each other's measurement if run simultaneously? Separate conflicting experiments into different time periods
5. Validate that Tier 1 experiments fit within the available team resources for the current sprint
6. Apply the "portfolio" check: ensure Tier 1 contains a mix of high-confidence incremental wins and at least one bold bet
7. Present the final ranked backlog as a table with experiment ID, name, I/C/E scores, ICE average, tier, and funnel stage
8. Identify the single highest-leverage experiment — the one that should be started first if only one can run

### Phase 4: Experiment Brief Creation
1. For each Tier 1 experiment, create a detailed experiment brief containing:
   - **Experiment name and ID**
   - **Hypothesis:** "If we [action], then [metric] will [change] by [amount] because [reason]"
   - **Primary metric:** The single metric that determines success or failure
   - **Guardrail metrics:** Metrics that must not degrade (e.g., retention, NPS, support ticket volume)
   - **Target lift:** Minimum detectable effect that would make this experiment worth shipping
   - **Test design:** A/B test, multivariate, before/after, or staged rollout; include control and variant descriptions
   - **Audience:** Who is included in the experiment (all users, new users, specific segment)
   - **Sample size:** Required number of users to reach statistical significance at 95% confidence
   - **Duration:** Estimated time to complete based on traffic and required sample size
   - **Implementation spec:** What needs to be built, configured, or changed; level of effort estimate
   - **Success criteria:** What result means "ship it," "iterate," or "kill it"
   - **Rollback plan:** How to revert if the experiment causes unexpected negative effects
2. Create a shared experiment tracking template for recording results as experiments complete
3. Define the experiment review cadence: weekly check-in on running experiments, decision meeting at experiment conclusion
4. Set the "next up" trigger: when a Tier 1 experiment concludes, automatically promote the top Tier 2 experiment

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| hypothesis_list | markdown | Refined and expanded list of testable experiment hypotheses with IDs and categories |
| ice_scorecard | markdown | Complete ICE scoring table with individual dimension scores, averages, and ranking |
| prioritized_backlog | markdown | Tiered experiment backlog with sequencing, dependencies, and resource allocation |
| experiment_briefs | markdown | Detailed briefs for each Tier 1 experiment ready for implementation |
| experiment_tracker | markdown | Template for tracking experiment execution, results, and decisions |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Minimum experiments scored | blocking | At least 10 experiments must be scored using the ICE framework |
| Scoring rubric applied | blocking | All scores must reference the defined rubric with documented reasoning |
| Tier 1 selected | blocking | Top 3-5 experiments must be identified with complete briefs |
| Resource fit verified | blocking | Tier 1 experiments must fit within stated team capacity |
| Hypotheses testable | blocking | Every hypothesis must be specific, measurable, and achievable within one sprint |
| Bias check performed | warning | Scoring distribution should be reviewed for clustering bias and adjusted if needed |
| Portfolio balance | warning | Tier 1 should contain both incremental and bold experiments |

---

## Handoff

- **On completion:** Hand to @pm for story creation to implement Tier 1 experiments
- **On growth engine context needed:** Hand to @sean-ellis for growth-engine task to establish funnel baselines
- **On experiment implementation:** Hand to @dev for technical implementation of experiment variants
- **On issues:** Escalate to @design-chief
