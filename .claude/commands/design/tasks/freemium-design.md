# Task: Freemium Architecture

**Task ID:** freemium-design
**Version:** 1.0
**Purpose:** Design freemium model that maximizes free-to-paid conversion while delivering value
**Agent:** @patrick-campbell
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Designs a freemium model that balances generous free value with compelling upgrade incentives. The freemium model is the most powerful acquisition channel in SaaS when designed correctly — and the most expensive cost center when designed poorly. This task applies Patrick Campbell's data-driven framework to determine the optimal freemium type, define free tier boundaries that create natural upgrade moments, and build a conversion funnel that transforms free users into paying customers without eroding perceived value.

```
INPUT (product_description, feature_list, target_conversion_rate, competitor_free_tiers)
    |
[PHASE 1: FREEMIUM TYPE SELECTION]
    -> Choose between feature-limited, usage-limited, or time-limited model
    |
[PHASE 2: FREE TIER BOUNDARY DESIGN]
    -> Define what is free vs paid with strategic gating
    |
[PHASE 3: UPGRADE TRIGGER STRATEGY]
    -> Design moments and prompts that drive conversion
    |
[PHASE 4: CONVERSION FUNNEL DESIGN]
    -> Build the end-to-end journey from free signup to paid customer
    |
OUTPUT: Complete freemium architecture with tier boundaries, triggers, and funnel spec
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Product overview with core value proposition and key differentiators |
| feature_list | list | Yes | Complete feature inventory with usage frequency and value perception data |
| target_conversion_rate | number | Yes | Desired free-to-paid conversion rate (industry median: 2-5% for B2C, 5-15% for B2B) |
| competitor_free_tiers | list | Yes | Competitor freemium offerings with their free tier boundaries and limitations |
| user_journey_data | object | No | Product analytics showing how free users engage and where they hit limits |
| value_metric | string | No | Primary value metric from value-metric task if completed |

---

## Preconditions

- Product has sufficient feature breadth to support meaningful differentiation between free and paid
- The business model can sustain a free tier economically (infrastructure costs per free user are understood)
- Target conversion rate is realistic for the market segment and product category
- Competitor free tier analysis is current (within 6 months) and covers at least 3 direct competitors
- Stakeholders agree that freemium is the right acquisition model (vs. free trial only, or paid-only)
- Product analytics infrastructure exists to track free user behavior and conversion events
- The product delivers standalone value in the free tier — it is not a crippled demo

---

## Steps

### Phase 1: Freemium Type Selection
1. Evaluate three freemium models against the product's characteristics:
   - **Feature-limited:** Free users get a subset of features; best for products with clear feature tiers (e.g., Slack: message history limited)
   - **Usage-limited:** Free users get full features with volume caps; best for products with natural consumption metrics (e.g., Dropbox: storage limited)
   - **Time-limited (reverse trial):** Free users get full product for N days, then revert to limited free; best for products requiring deep engagement to demonstrate value
2. Score each model on four criteria (1-5 scale):
   - Acquisition friction: how easy is it to start using the free tier?
   - Value demonstration: does the free tier let users experience the core "aha moment"?
   - Upgrade clarity: do users understand what they gain by paying?
   - Cost sustainability: can the business afford the free tier at scale?
3. Analyze competitor free tiers to identify market expectations; deviating too far from norms creates confusion
4. If the product has a strong network effect, favor feature-limited (more users = more value for everyone)
5. If the product has high per-user infrastructure costs, favor usage-limited (caps control costs)
6. If the product requires extended onboarding to show value, favor time-limited reverse trial
7. Select the primary freemium type with documented rationale; note if a hybrid approach is warranted (e.g., feature-limited with usage caps)
8. Define the "forever free" commitment: what promise does the free tier make to users that will never be taken away?

### Phase 2: Free Tier Boundary Design
1. Classify every feature into one of four categories:
   - **Free forever:** Core features that demonstrate the product's value and drive adoption
   - **Free with limits:** Features available in free tier but with usage caps that create natural upgrade moments
   - **Paid only:** Premium features that justify the price and are not needed for initial value realization
   - **Enterprise only:** Features with high delivery cost or complexity that serve only large organizations
2. Apply the "Aha Moment" rule: every feature needed to reach the product's aha moment must be in the free tier; identify the aha moment explicitly
3. Set usage limits using the 80/20 principle: 80% of free users should never hit the limit; the 20% who do are the upgrade candidates
4. Design limit notifications: when a user approaches 70%, 90%, and 100% of their free allocation, what do they see?
5. Define the "grace behavior" at limit: does the feature stop working (hard wall), degrade gracefully (soft wall), or allow temporary overage (metered wall)?
6. Ensure the free tier is genuinely useful as a standalone product; if free users cannot accomplish meaningful work, they will churn instead of convert
7. Test for "generosity calibration": is the free tier generous enough to create habit and switching costs, but limited enough to create desire for more?
8. Document the free tier spec with exact limits, feature access, and boundary behaviors

### Phase 3: Upgrade Trigger Strategy
1. Identify the top 5 natural upgrade moments — points in the user journey where free users encounter a limit that aligns with increased value:
   - Usage limit reached (e.g., "You have used 95% of your free storage")
   - Team growth (e.g., "Invite your 4th team member — upgrade to add unlimited collaborators")
   - Feature discovery (e.g., "Advanced analytics available on the Pro plan")
   - Time-based maturity (e.g., after 30 days of active use, introduce premium features)
   - Success milestone (e.g., "You have processed 1,000 orders — unlock bulk automation")
2. Design the upgrade prompt UX for each trigger moment: inline notification, modal, banner, or email
3. Apply the "value-first" principle: every upgrade prompt must lead with what the user gains, not what they lose
4. Create urgency without manipulation: "Your team is growing — unlock collaboration tools" not "Upgrade now or lose access"
5. Design the "peek behind the curtain" strategy: show paid features in the UI with a subtle lock icon and tooltip explaining the upgrade benefit
6. Build a progressive disclosure sequence: do not show all upgrade prompts at once; sequence them based on user maturity and engagement signals
7. Define the maximum frequency of upgrade prompts to avoid fatigue: no more than 1 prompt per session, no more than 3 per week
8. Create segment-specific upgrade messaging: different segments have different upgrade motivations (cost savings vs. capability vs. scale)

### Phase 4: Conversion Funnel Design
1. Map the complete free-to-paid funnel: Signup -> Activation (aha moment) -> Engagement (habit formation) -> Upgrade trigger -> Consideration -> Conversion -> Expansion
2. Define activation criteria: what must a free user do within the first 7 days to be considered "activated"? (e.g., create first project, invite one teammate, complete onboarding)
3. Design the onboarding flow to accelerate time-to-value: guide free users to the aha moment within the first session
4. Build engagement hooks that create daily or weekly return visits: notifications, digests, progress tracking, collaborative features
5. Design the upgrade flow: from trigger to payment in 3 clicks or fewer; pre-fill plan selection based on usage patterns
6. Create the "plan recommendation" logic: based on current usage, automatically suggest the most appropriate paid tier
7. Define conversion tracking metrics: signup-to-activation rate, activation-to-engagement rate, engagement-to-upgrade rate, and overall free-to-paid conversion rate
8. Design the post-conversion experience: immediate value delivery upon upgrade (unlock features, remove limits, welcome message) to reinforce the purchase decision
9. Plan the "save" flow for users who start to upgrade but abandon: exit-intent prompt, follow-up email sequence, limited-time offer
10. Create a dashboard specification for monitoring freemium health: conversion rate trends, free user cost, upgrade trigger effectiveness, and time-to-conversion distribution

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| freemium_architecture | markdown | Complete freemium model specification with type selection rationale and tier boundaries |
| feature_gating_matrix | markdown | Every feature mapped to free/limited/paid/enterprise with exact limits and boundary behaviors |
| upgrade_trigger_playbook | markdown | Top 5 upgrade triggers with UX specifications, copy, and frequency rules |
| conversion_funnel_spec | markdown | End-to-end funnel definition with stage criteria, metrics, and optimization plan |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Freemium type justified | blocking | Selected freemium model must be scored and justified against alternatives with documented rationale |
| Aha moment reachable for free | blocking | Free tier must include all features necessary to reach the product's aha moment |
| Upgrade triggers defined | blocking | At least 5 natural upgrade moments must be identified with UX specifications |
| Conversion funnel complete | blocking | Every stage from signup to conversion must be defined with entry/exit criteria |
| Free tier sustainability checked | warning | Per-user infrastructure cost of the free tier should be documented and validated as sustainable |
| Competitor parity maintained | warning | Free tier should be competitive with direct competitor offerings to avoid acquisition disadvantage |
| Prompt frequency capped | warning | Upgrade prompt frequency limits must be defined to prevent user fatigue |

---

## Handoff

- **On completion:** Hand to @patrick-campbell for pricing-page design to present the freemium + paid tiers
- **On paywall UX needs:** Hand to @patrick-campbell for paywall-strategy to design the upgrade gate experience
- **On UI implementation:** Hand to @dan-mall for visual design of upgrade prompts and limit notifications
- **On issues:** Escalate to @design-chief
