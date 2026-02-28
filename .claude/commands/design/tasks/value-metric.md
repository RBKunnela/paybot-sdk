# Task: Value Metric Framework

**Task ID:** value-metric
**Version:** 1.0
**Purpose:** Identify the optimal value metric to align pricing with customer growth
**Agent:** @patrick-campbell
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Guides the discovery and validation of the ideal value metric — the unit of measurement that determines how customers are charged. A well-chosen value metric scales with customer usage, is easy to understand, and directly aligns with the value customers receive. This task applies Patrick Campbell's ProfitWell methodology of quantitative buyer research to eliminate guesswork from pricing decisions, ensuring the metric grows revenue as customers succeed.

```
INPUT (product_description, target_segments, current_pricing, feature_list)
    |
[PHASE 1: VALUE DRIVER DISCOVERY]
    -> Identify what customers value most and how they measure success
    |
[PHASE 2: METRIC EVALUATION]
    -> Score candidate metrics on scalability, clarity, and value alignment
    |
[PHASE 3: PRICING STRUCTURE DESIGN]
    -> Build pricing tiers around the chosen value metric
    |
[PHASE 4: GROWTH ALIGNMENT CHECK]
    -> Validate that the metric grows naturally with customer success
    |
OUTPUT: Validated value metric with pricing structure and growth projections
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Description of the product, its core functionality, and the problem it solves |
| target_segments | list | Yes | Customer segments with their characteristics, size, and willingness to pay |
| current_pricing | object | No | Existing pricing model, tiers, and metric if applicable |
| feature_list | list | Yes | Complete list of product features with usage data if available |
| usage_data | object | No | Product analytics showing how different segments use the product |
| competitor_metrics | list | No | Value metrics used by direct and indirect competitors |

---

## Preconditions

- Product has a clearly defined core value proposition that can be articulated in one sentence
- At least two distinct customer segments have been identified with differentiated needs
- Feature list is comprehensive and reflects the current state of the product
- Stakeholders understand that the value metric directly impacts revenue trajectory and are committed to acting on findings
- If current pricing exists, historical revenue and churn data are available for baseline analysis
- Team is prepared to potentially restructure pricing based on findings, not just validate existing assumptions
- Access to customer feedback, support tickets, or usage analytics is available for evidence-based decisions

---

## Steps

### Phase 1: Value Driver Discovery
1. Analyze the product description to extract the core value proposition; document the primary outcome customers pay for (time saved, revenue generated, risk reduced, etc.)
2. Map each target segment to their primary value drivers; rank drivers by importance using a weighted scoring model (impact x frequency)
3. Review the feature list and classify each feature as: core value (directly delivers the promise), supporting (enables core), or peripheral (nice-to-have)
4. Identify natural units of consumption: what do customers "use up" or "create" when extracting value from the product (e.g., API calls, users, projects, storage, messages)
5. If current pricing exists, analyze whether the existing metric correlates with customer success or creates friction (e.g., penalizing growth, rewarding inactivity)
6. Generate a candidate list of 4-6 potential value metrics based on the analysis; each must be a measurable, scalable unit
7. Document the value chain: how each candidate metric connects input (customer action) to output (customer outcome)

### Phase 2: Metric Evaluation
1. Score each candidate metric against three mandatory criteria using a 1-5 scale:
   - **Scales with usage**: Does the metric increase as customers get more value? (e.g., seats scale; flat fee does not)
   - **Easy to understand**: Can a customer predict their bill without a calculator? (e.g., per-user is intuitive; per-CPU-cycle is not)
   - **Aligns with value**: Does charging more mean the customer is getting more? (e.g., per-transaction for payments; per-login is arbitrary)
2. Apply the ProfitWell relative preference analysis: rank metrics by how each segment perceives fairness and predictability
3. Test for growth friction: does the metric create a barrier where customers avoid upgrading? (e.g., per-seat pricing discourages adding team members)
4. Test for revenue leakage: does the metric allow heavy usage without proportional payment? (e.g., unlimited plans with power users)
5. Evaluate competitive differentiation: does the metric position the product favorably against competitors or create confusion?
6. Calculate the sensitivity score: how much does a 10% change in the metric affect both customer cost and company revenue?
7. Select the top metric with a clear rationale; document why alternatives were rejected
8. If no single metric scores above 4.0 average, consider a hybrid approach (primary metric + secondary modifier)

### Phase 3: Pricing Structure Design
1. Design 3-4 pricing tiers built around the selected value metric; each tier should represent a natural usage threshold
2. Define tier boundaries using the 40/30/20/10 distribution principle: 40% of customers in the mid tier, 30% in starter, 20% in growth, 10% in enterprise
3. Map features to tiers using value-based bundling: core features available in all tiers, differentiating features gated by tier
4. Set anchor pricing: establish the enterprise tier first to make lower tiers feel accessible (anchoring effect)
5. Design the upgrade path: what triggers a customer to move from one tier to the next? Ensure the trigger is a positive signal (more success, not punishment)
6. Calculate unit economics for each tier: customer acquisition cost recovery period, lifetime value projection, gross margin target
7. Define overage handling: what happens when a customer exceeds their tier's metric allocation? (hard cap, soft cap with notification, automatic upgrade, per-unit overage)
8. Create a pricing calculator prototype that lets customers estimate their cost based on projected usage

### Phase 4: Growth Alignment Check
1. Model three growth scenarios per segment: conservative (10% metric growth), moderate (25%), and aggressive (50%) over 12 months
2. Validate that revenue grows proportionally with customer success; flag any scenario where customers hit a "cliff" (sudden cost jump)
3. Test for net revenue retention: does the metric naturally drive expansion revenue without requiring upsell effort?
4. Check for churn risk: at what metric level does the cost-to-value ratio become unfavorable for each segment?
5. Simulate segment migration: as starter customers grow, do they naturally flow into higher tiers at appropriate price points?
6. Validate with the "10x test": if a customer grows 10x in the metric, does the pricing still feel fair and proportional?
7. Document the final value metric recommendation with supporting data, rejected alternatives, and implementation considerations
8. Create a monitoring plan: what signals indicate the value metric is working (NRR > 110%, low billing-related churn, predictable revenue growth)?

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| value_metric_report | markdown | Complete analysis with selected metric, scoring rationale, and rejected alternatives |
| pricing_structure | markdown | Tier definitions with boundaries, features, and pricing aligned to the value metric |
| growth_model | markdown | Revenue projections under conservative, moderate, and aggressive growth scenarios |
| implementation_guide | markdown | Technical and operational steps to implement the chosen value metric in billing |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Metric scores above 4.0 | blocking | Selected value metric must score at least 4.0/5.0 average across all three evaluation criteria |
| Growth alignment verified | blocking | Revenue must grow proportionally in all three growth scenarios without cliff effects |
| Segment coverage confirmed | blocking | Value metric must work for all identified target segments without creating perverse incentives |
| Tier boundaries justified | warning | Each tier boundary should correspond to a natural usage threshold backed by data or segment analysis |
| Competitive positioning clear | warning | Value metric should be differentiated or at least not disadvantaged relative to competitor pricing |
| Unit economics validated | warning | Each tier should recover CAC within 12 months and achieve target gross margin |

---

## Handoff

- **On completion:** Hand to @patrick-campbell for pricing-page design using the validated metric and tier structure
- **On freemium consideration:** Hand to @patrick-campbell for freemium-design to define free tier boundaries
- **On competitive concerns:** Conduct competitive pricing analysis before finalizing metric selection
- **On issues:** Escalate to @design-chief
