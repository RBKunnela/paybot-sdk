# Task: Growth Engine Design

**Task ID:** growth-engine
**Version:** 1.0
**Purpose:** Design a growth engine using the AARRR Pirate Metrics framework to systematically drive sustainable product growth
**Agent:** @sean-ellis
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Designs a comprehensive growth engine by mapping the full AARRR (Acquisition, Activation, Retention, Revenue, Referral) funnel, identifying the North Star Metric, locating bottlenecks, and designing data-driven experiments to unlock growth. This task produces an actionable growth model that connects product decisions to business outcomes using the Pirate Metrics framework popularized by Dave McClure and operationalized by Sean Ellis.

```
INPUT (product_description, current_metrics, business_model, target_audience)
    |
[PHASE 1: NORTH STAR METRIC SELECTION]
    -> Define the single metric that best captures value delivery
    |
[PHASE 2: FUNNEL MAPPING]
    -> Map each AARRR stage with metrics, benchmarks, and current performance
    |
[PHASE 3: BOTTLENECK IDENTIFICATION]
    -> Analyze funnel data to find the highest-leverage constraint
    |
[PHASE 4: EXPERIMENT DESIGN]
    -> Design growth experiments targeting the bottleneck
    |
[PHASE 5: GROWTH MODEL]
    -> Build a quantitative model connecting inputs to growth outcomes
    |
OUTPUT: Growth engine blueprint with North Star, funnel map, experiments, and growth model
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Description of the product, its core value proposition, and key features |
| current_metrics | object | Yes | Current performance data across funnel stages (traffic, signups, activation rate, retention, revenue, referrals) |
| business_model | string | Yes | Revenue model type (SaaS, marketplace, e-commerce, freemium, ad-supported, etc.) |
| target_audience | string | Yes | Primary user segments and their characteristics |
| growth_stage | string | No | Current company stage (pre-PMF, post-PMF, scaling); defaults to post-PMF |
| competitive_landscape | string | No | Key competitors and differentiation points |
| growth_budget | string | No | Available budget for paid growth channels |
| time_horizon | string | No | Planning horizon for growth targets; defaults to 90 days |

---

## Preconditions

- Product has launched and has at least minimal user data available for analysis
- Current metrics are available or can be reasonably estimated for each funnel stage
- Business model is defined and revenue mechanics are understood
- Target audience has been validated through at least initial user research or sales data
- Stakeholders have agreed on the importance of data-driven growth and are willing to run experiments
- Analytics infrastructure exists or is planned to track funnel metrics accurately
- Team has capacity to implement and measure at least 2-3 experiments per sprint

---

## Steps

### Phase 1: North Star Metric Selection
1. Review the product description and business model to understand the core value exchange between the product and its users
2. Identify 3-5 candidate North Star Metrics that reflect value delivered to users (not just business value); examples: weekly active users, messages sent, bookings completed, reports generated
3. Evaluate each candidate against the North Star criteria: measures value delivery, is a leading indicator of revenue, is actionable by the team, and is comprehensible across the organization
4. Select the single North Star Metric and define its measurement methodology, data source, and reporting cadence
5. Define 2-3 supporting input metrics that directly influence the North Star (e.g., if NSM is weekly active users, inputs might be new signups, activation rate, and weekly retention)
6. Document the North Star Metric selection with rationale and how it connects to both user value and business outcomes

### Phase 2: Funnel Mapping (AARRR)
1. **Acquisition:** Identify all channels driving traffic and signups; map current volume, cost per acquisition, and conversion rate for each channel; rank by efficiency
2. **Activation:** Define the activation event (the moment a user first experiences core value); measure current activation rate; identify the critical path from signup to activation
3. **Retention:** Map retention curves by cohort; identify Day 1, Day 7, Day 30 retention rates; determine whether retention is flattening (healthy) or declining to zero (problem)
4. **Revenue:** Map the monetization funnel from free user to paying customer; calculate conversion rate, ARPU, LTV, and payback period; identify revenue expansion opportunities
5. **Referral:** Measure current organic referral rate and K-factor; identify existing sharing behaviors and viral loops; assess Net Promoter Score if available
6. Create a unified funnel visualization showing volume and conversion rates at each stage with industry benchmarks for comparison
7. Calculate the overall funnel efficiency: percentage of acquired users who reach the revenue stage

### Phase 3: Bottleneck Identification
1. Compare conversion rates at each funnel stage against industry benchmarks and best-in-class performers
2. Calculate the absolute and relative opportunity at each stage: if this stage improved by X%, what would the impact on revenue and North Star Metric be
3. Apply the "biggest leak" analysis: identify where the largest absolute number of users are dropping off
4. Apply the "highest leverage" analysis: identify where a small percentage improvement would produce the largest downstream impact
5. Rank bottlenecks by combined impact score (absolute opportunity multiplied by feasibility of improvement)
6. Select the primary bottleneck to focus on and document the evidence supporting this selection
7. Identify secondary bottlenecks to address once the primary one is resolved

### Phase 4: Experiment Design
1. Brainstorm 8-12 experiment ideas targeting the primary bottleneck; include both incremental optimizations and bold bets
2. Score each experiment using ICE (Impact, Confidence, Ease) on a 1-10 scale
3. Select the top 3-5 experiments based on ICE score and resource availability
4. For each selected experiment, create an experiment brief containing: hypothesis statement, success metric, target lift, test design (A/B, multivariate, before/after), sample size requirements, and estimated duration
5. Define the experiment roadmap with sequencing, dependencies, and resource allocation
6. Establish the experimentation cadence: how many experiments per sprint, review rhythm, and decision criteria for scaling winners
7. Design the measurement framework: what data to collect, how to attribute results, and statistical significance thresholds

### Phase 5: Growth Model
1. Build a quantitative growth model connecting top-of-funnel inputs through each AARRR stage to revenue output
2. Define the key assumptions and conversion rates at each stage based on current metrics
3. Model three scenarios: conservative (current trajectory), moderate (bottleneck improvements), and aggressive (multiple improvements plus new channels)
4. Calculate the compounding effect of improvements: how a 10% improvement at each stage compounds across the full funnel
5. Identify the sensitivity of the model: which single input variable has the largest impact on revenue output
6. Define quarterly growth targets for each funnel stage that roll up to the North Star Metric
7. Create a growth dashboard specification showing the key metrics to monitor weekly
8. Document the growth model with all assumptions, formulas, and data sources for future updates

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| north_star_definition | markdown | North Star Metric definition with rationale, measurement methodology, and input metrics |
| funnel_map | markdown | Complete AARRR funnel visualization with metrics, benchmarks, and conversion rates at each stage |
| bottleneck_analysis | markdown | Prioritized bottleneck analysis with evidence, impact estimates, and recommended focus area |
| experiment_roadmap | markdown | Prioritized experiment backlog with ICE scores, experiment briefs, and sequencing plan |
| growth_model | markdown | Quantitative growth model with scenarios, sensitivity analysis, and quarterly targets |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| North Star defined | blocking | A single North Star Metric must be selected with clear measurement methodology |
| All AARRR stages mapped | blocking | Every funnel stage must have current metrics and at least one benchmark comparison |
| Bottleneck identified | blocking | Primary bottleneck must be identified with quantitative evidence |
| Experiments designed | blocking | At least 3 experiments must have complete briefs with hypotheses and success metrics |
| Growth model complete | blocking | Quantitative model must connect inputs to outputs with at least 3 scenarios |
| Data-driven decisions | warning | All recommendations should reference specific metrics or benchmarks |
| Actionable timeline | warning | Experiment roadmap should fit within the specified time horizon |

---

## Handoff

- **On completion:** Hand to @pm for story creation to implement top-priority experiments
- **On activation bottleneck:** Hand to @sean-ellis for activation-flow optimization task
- **On experiment prioritization needs:** Hand to @sean-ellis for ICE scoring task
- **On issues:** Escalate to @design-chief
