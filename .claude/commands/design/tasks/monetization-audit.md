# Task: Monetization Audit

**Task ID:** monetization-audit
**Version:** 1.0
**Purpose:** Comprehensive audit of current monetization strategy with data-driven recommendations
**Agent:** @patrick-campbell
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Conducts a thorough audit of the current monetization strategy using Patrick Campbell's ProfitWell methodology of quantitative buyer research and competitive benchmarking. This task examines every dimension of how the product captures value — pricing structure, willingness to pay, competitive positioning, revenue leakage, and growth opportunities. The output is an actionable optimization roadmap prioritized by revenue impact and implementation effort, giving stakeholders a clear path from current state to optimal monetization.

```
INPUT (product_description, current_pricing, revenue_data, competitor_pricing, user_segments)
    |
[PHASE 1: CURRENT PRICING ANALYSIS]
    -> Deconstruct and evaluate the existing pricing model
    |
[PHASE 2: WILLINGNESS-TO-PAY ASSESSMENT]
    -> Determine optimal price points using Van Westendorp and Gabor-Granger methods
    |
[PHASE 3: COMPETITIVE LANDSCAPE]
    -> Map competitive pricing positioning and identify differentiation gaps
    |
[PHASE 4: REVENUE LEAK IDENTIFICATION]
    -> Find where revenue is being left on the table
    |
[PHASE 5: OPTIMIZATION ROADMAP]
    -> Prioritize improvements by impact and build implementation plan
    |
OUTPUT: Complete monetization audit with findings, recommendations, and prioritized roadmap
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Product overview including value proposition, key features, and market position |
| current_pricing | object | Yes | Complete pricing structure: tiers, prices, value metric, billing options, discounts |
| revenue_data | object | Yes | Revenue metrics: MRR/ARR, ARPU, expansion revenue, contraction, churn revenue, LTV |
| competitor_pricing | list | Yes | At least 3 competitors with their pricing pages, tiers, features, and positioning |
| user_segments | list | Yes | Customer segments with size, revenue contribution, growth rate, and characteristics |
| customer_feedback | list | No | Pricing-related feedback from surveys, support tickets, sales calls, and reviews |
| conversion_data | object | No | Funnel metrics: trial-to-paid rate, plan distribution, upgrade/downgrade patterns |
| historical_pricing | list | No | Previous pricing changes with dates and impact on revenue and customer behavior |

---

## Preconditions

- Current pricing structure is documented and accessible with all tiers, add-ons, and discount policies
- Revenue data covers at least 12 months for meaningful trend analysis and seasonality detection
- At least 3 direct competitors have been identified with accessible pricing information
- Customer segments are defined with revenue attribution so impact can be quantified per segment
- Stakeholders are open to pricing changes based on audit findings and have authority to implement them
- Finance team can provide unit economics data (CAC, LTV, gross margin) per segment or tier
- Sales team can provide qualitative input on pricing objections and competitive displacement patterns

---

## Steps

### Phase 1: Current Pricing Analysis
1. Document the complete pricing architecture: number of tiers, price points, value metric, billing frequency options, and any add-ons or usage-based components
2. Analyze the plan distribution: what percentage of customers are on each tier? A healthy distribution is roughly 20/50/25/5 across Starter/Pro/Growth/Enterprise; heavy concentration in the lowest tier suggests underpricing or poor upgrade incentives
3. Calculate ARPU (Average Revenue Per User) by segment and by tier; compare to industry benchmarks for the product category
4. Evaluate the value metric: does the current unit of pricing (per user, per project, per GB) scale with customer value? Score against the three criteria: scales with usage, easy to understand, aligns with value
5. Analyze pricing page effectiveness: conversion rate, bounce rate, time on page, and plan selection patterns; identify where prospects drop off
6. Review discount and promotion policies: what discounts are offered, how frequently, and what is their impact on ARPU and LTV?
7. Examine billing and payment: what percentage of customers are on monthly vs. annual plans? Annual plans improve retention by 15-20%; if annual adoption is below 40%, this is a revenue opportunity
8. Assess pricing transparency: is the pricing clear and findable, or does it require "contact sales"? Hidden pricing reduces trust and increases acquisition cost for non-enterprise segments
9. Calculate the pricing power index: ratio of price increases that were absorbed without churn vs. those that caused cancellations
10. Document all findings as a "current state" baseline with specific metrics and identified concerns

### Phase 2: Willingness-to-Pay Assessment
1. Apply the Van Westendorp Price Sensitivity Meter framework to assess optimal pricing:
   - At what price would this product be too expensive to consider? (upper bound)
   - At what price would you question the quality? (lower bound)
   - At what price does it start to feel expensive but you would still consider it? (expensive threshold)
   - At what price is it a great deal? (bargain threshold)
2. If direct survey data is not available, triangulate willingness-to-pay from:
   - Current plan distribution and upgrade patterns (revealed preference)
   - Competitor pricing for similar value (market benchmark)
   - Customer feedback mentioning price (qualitative signals)
   - Sales win/loss data where price was a factor (deal analysis)
3. Apply Gabor-Granger demand curve analysis: for each 10% price increment, estimate the demand elasticity based on available data
4. Segment willingness-to-pay by customer type: enterprise customers typically accept 3-5x the SMB price for the same product with enterprise features
5. Identify the "indifference zone": the price range where changes do not materially affect conversion or churn (typically +/- 15% of current price)
6. Calculate the optimal price point: the intersection of maximum revenue (price x volume) considering both conversion impact and churn risk
7. Compare the optimal price point to the current price; quantify the revenue gap (underprice) or risk (overprice)
8. Document segment-specific pricing recommendations with confidence levels based on data quality

### Phase 3: Competitive Landscape
1. Create a competitive pricing matrix: map all competitors across tiers with prices, value metrics, and key feature inclusions
2. Position the product on a price-to-value map: plot competitors on an X (price) and Y (perceived value) chart; identify if the product is in the value leader, premium, economy, or overpriced quadrant
3. Analyze competitor value metrics: what units do competitors charge by? If the market has converged on a metric (e.g., per seat), deviating requires strong justification
4. Identify competitive pricing gaps: are there unserved price points or underserved segments where the product could position uniquely?
5. Evaluate competitor packaging strategies: how do competitors bundle features across tiers? Identify features that competitors gate at higher tiers but the product includes for free (potential undermonetization)
6. Assess competitive free tier offerings: if competitors offer generous free tiers, the product must match or differentiate on value, not just price
7. Monitor competitor pricing trends: have competitors raised or lowered prices recently? Frequency of changes signals market maturity
8. Document competitive advantages and disadvantages in pricing: where does the product win on value-for-price, and where does it lose?

### Phase 4: Revenue Leak Identification
1. Identify undermonetized features: features that customers value highly but are included in all tiers or given away; these should be gated to higher tiers
2. Calculate expansion revenue gaps: what percentage of customers grow in usage but never upgrade? This indicates the value metric or tier boundaries are misaligned
3. Find discount leakage: are sales teams offering ad-hoc discounts that erode ARPU? Calculate the annual revenue impact of non-standard discounts
4. Identify voluntary churn revenue leaks: revenue lost to cancellations that could have been saved with salvage offers (connect to churn-prevention task)
5. Quantify involuntary churn losses: revenue lost to payment failures that are not recovered through dunning (connect to churn-prevention task)
6. Assess pricing page conversion leakage: visitors who reach the pricing page but do not convert; estimate revenue impact at current conversion rate vs. industry benchmark
7. Find packaging misalignment: are features bundled in ways that force customers to overpay (creating resentment) or underpay (creating revenue loss)?
8. Identify missing revenue streams: are there opportunities for add-ons, professional services, marketplace fees, or usage-based charges that are not being captured?
9. Calculate the total addressable revenue leak: sum of all identified gaps expressed as a percentage of current ARR
10. Rank revenue leaks by ease of capture (low/medium/high effort) and impact (dollar value)

### Phase 5: Optimization Roadmap
1. Consolidate all findings from Phases 1-4 into a prioritized recommendations list using the Impact-Effort matrix:
   - **Quick wins** (high impact, low effort): price adjustments, CTA copy changes, discount policy updates
   - **Strategic initiatives** (high impact, high effort): value metric change, tier restructure, freemium launch
   - **Incremental improvements** (low impact, low effort): billing page optimization, payment method additions
   - **Long-term investments** (low impact, high effort): new revenue streams, enterprise pricing model, usage-based components
2. For each recommendation, provide:
   - Current state and the problem it causes
   - Recommended change with specific details
   - Expected revenue impact (conservative estimate with assumptions)
   - Implementation effort (days/weeks/months)
   - Risk level and mitigation strategy
   - Dependencies on other recommendations
3. Design the implementation sequence: recommendations should be ordered to build on each other (e.g., fix value metric before restructuring tiers)
4. Create the measurement plan: for each recommendation, define the success metric, baseline, target, and measurement timeline
5. Build the communication plan: how will pricing changes be communicated to existing customers? (grandfather existing, sunset with notice, immediate change)
6. Define the rollback criteria: under what conditions should a pricing change be reverted? (conversion drop > 20%, churn spike > 2x, NPS drop > 10 points)
7. Estimate the total revenue impact of the complete roadmap at 6, 12, and 24 months
8. Present findings in an executive summary format: 3 key findings, 3 top recommendations, expected revenue impact, and recommended timeline

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| audit_report | markdown | Complete monetization audit with current state analysis, findings, and evidence |
| competitive_analysis | markdown | Competitive pricing matrix with positioning map and gap analysis |
| revenue_leak_register | markdown | Quantified list of revenue leaks ranked by impact and capture difficulty |
| optimization_roadmap | markdown | Prioritized recommendations with impact estimates, effort levels, and implementation sequence |
| executive_summary | markdown | One-page summary with key findings, top 3 recommendations, and projected revenue impact |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Current state documented | blocking | Complete pricing architecture must be documented with plan distribution and ARPU metrics |
| Willingness-to-pay assessed | blocking | Optimal price point must be estimated using at least two triangulation methods |
| Competitive landscape mapped | blocking | At least 3 competitors must be analyzed with a price-to-value positioning map |
| Revenue leaks quantified | blocking | At least 5 revenue leaks must be identified and quantified with dollar impact estimates |
| Roadmap prioritized | blocking | All recommendations must be plotted on an Impact-Effort matrix with implementation sequence |
| Segment analysis included | warning | Findings must be broken down by customer segment where data permits |
| Rollback criteria defined | warning | Each pricing change recommendation must include conditions for reverting the change |
| Communication plan included | warning | Recommendations must include a plan for communicating changes to existing customers |

---

## Handoff

- **On pricing restructure:** Hand to @patrick-campbell for value-metric task to redesign the pricing foundation
- **On pricing page redesign:** Hand to @patrick-campbell for pricing-page task to implement page-level recommendations
- **On churn-related findings:** Hand to @patrick-campbell for churn-prevention task to address retention leaks
- **On freemium opportunity:** Hand to @patrick-campbell for freemium-design task to design free tier
- **On issues:** Escalate to @design-chief
