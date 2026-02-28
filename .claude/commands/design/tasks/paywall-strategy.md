# Task: Paywall Strategy

**Task ID:** paywall-strategy
**Version:** 1.0
**Purpose:** Design paywall timing, type, and UX to maximize conversion without destroying trust
**Agent:** @patrick-campbell
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Designs the paywall experience — the critical moment when a user encounters a gate between free and paid access. A well-designed paywall converts without creating resentment; a poorly designed one drives users away permanently. This task applies Patrick Campbell's conversion-centric methodology to determine the right paywall type, optimal timing, persuasive UX copy, and a rigorous A/B testing plan to continuously optimize conversion rates while maintaining user trust and product reputation.

```
INPUT (product_description, content_type, current_conversion, user_journey_stage)
    |
[PHASE 1: PAYWALL TYPE SELECTION]
    -> Choose hard, soft, or metered paywall based on product and content type
    |
[PHASE 2: VALUE GATE TIMING]
    -> Determine when in the user journey to present the paywall
    |
[PHASE 3: UPGRADE PROMPT UX]
    -> Design the paywall UI, copy, and interaction flow
    |
[PHASE 4: A/B TEST PLAN]
    -> Define experiments to optimize paywall conversion
    |
OUTPUT: Complete paywall specification with type, timing, UX design, and test plan
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Product overview with content or feature type being paywalled |
| content_type | string | Yes | Type of content or feature behind the paywall (articles, features, data, tools, media) |
| current_conversion | number | Yes | Current conversion rate at the paywall point (or estimated baseline if new) |
| user_journey_stage | string | Yes | Where in the journey the paywall appears (onboarding, mid-engagement, power-user) |
| free_tier_spec | object | No | Free tier specification from freemium-design task if completed |
| user_behavior_data | object | No | Analytics on user behavior before, during, and after paywall encounters |
| competitor_paywalls | list | No | Competitor paywall approaches with screenshots and conversion data if available |

---

## Preconditions

- The product or content has demonstrated value that users are willing to pay for (validated through research or early signals)
- A clear distinction exists between free and paid value that can be gated without feeling arbitrary
- User journey mapping is complete enough to identify optimal paywall placement
- Analytics infrastructure can track paywall impressions, click-through, conversion, and bounce rates
- Stakeholders understand that paywall design requires iteration and are committed to A/B testing
- Legal and compliance requirements for payment collection and subscription terms are understood
- The product's brand positioning supports the chosen paywall approach (aggressive paywalls conflict with community-first brands)

---

## Steps

### Phase 1: Paywall Type Selection
1. Evaluate three paywall types against the product and content characteristics:
   - **Hard paywall:** Complete access block; users must pay to see any content/use any feature beyond the gate. Best for: high-value proprietary content, professional tools with no substitutes (e.g., The Information, Bloomberg Terminal)
   - **Soft paywall:** Partial access with encouragement to upgrade; users see some content or limited functionality. Best for: content platforms, freemium SaaS, products where sampling drives conversion (e.g., Medium, Spotify)
   - **Metered paywall:** Full access up to a quota, then gate. Best for: content with high volume, tools with natural usage cycles (e.g., NYT 10 articles/month, API rate limits)
2. Score each type on five criteria (1-5 scale):
   - Conversion potential: which type maximizes paid conversions for this product?
   - User experience: which type preserves trust and satisfaction?
   - Content/feature discoverability: which type lets users understand what they are paying for?
   - Revenue predictability: which type produces the most predictable revenue stream?
   - Implementation complexity: which type is feasible within current technical constraints?
3. Analyze competitor paywalls to understand market norms; users have learned behaviors from existing paywalls in the category
4. Consider the "value preview" principle: users must experience enough value to justify payment but not so much that payment feels unnecessary
5. Select the paywall type with documented rationale; define any hybrid elements (e.g., metered with a soft upsell before the hard gate)
6. Document the emotional design goal: what should users feel when encountering the paywall? (intrigued, not frustrated; motivated, not blocked)

### Phase 2: Value Gate Timing
1. Map the user journey from first touch to the paywall encounter; identify the critical engagement milestones:
   - First value moment (user sees the product working)
   - Aha moment (user understands the product's unique value)
   - Habit moment (user returns repeatedly)
   - Investment moment (user has created content, data, or workflows in the product)
2. Apply the "after aha, before habit" timing principle: the paywall should appear after the user understands the value but before they can fully satisfy their need for free
3. For metered paywalls, set the meter based on engagement data:
   - Analyze the distribution of content/feature consumption among free users
   - Set the meter at the 70th percentile: 70% of users stay free, 30% hit the gate
   - The meter resets on a cadence that matches natural usage patterns (daily, weekly, monthly)
4. For soft paywalls, define the "teaser depth": how much of the content or feature is visible before the gate?
   - Content: show first 30-40% of articles, blur the rest
   - Features: show the feature interface with sample data, require payment for real data
   - Tools: allow 3-5 uses before requiring upgrade
5. Design the pre-paywall priming sequence: subtle indicators that prepare users for the gate (e.g., "3 free articles remaining" counter, premium badges on locked content)
6. Define paywall suppression rules: when should the paywall NOT appear? (first session ever, during critical workflows, after a failed payment, during active support tickets)
7. Create a timing matrix mapping user segments to optimal paywall moments based on their journey velocity
8. Test for "paywall fatigue": if users see the paywall repeatedly without converting, escalate messaging or reduce frequency after N exposures

### Phase 3: Upgrade Prompt UX
1. Design the paywall modal or inline component with these mandatory elements:
   - Clear headline explaining what is behind the gate (value-first, not restriction-first)
   - Visual preview of the gated content or feature (screenshot, blurred preview, sample output)
   - Price with context (per month, savings vs. monthly, cost per unit of value)
   - Primary CTA button with action-oriented copy
   - Secondary action (dismiss, "remind me later," "learn more")
   - Trust signals (guarantee, trial period, social proof)
2. Write paywall copy using the PAS framework (Problem - Agitate - Solution):
   - Problem: "You have hit your free limit for this month"
   - Agitate: "Your team is creating great work — do not let limits slow you down"
   - Solution: "Upgrade to Pro for unlimited access and advanced features"
3. Design the dismissal experience: when users close the paywall, what happens?
   - Graceful degradation: return to free experience without penalty
   - Soft reminder: subtle banner or badge indicating upgrade availability
   - No passive-aggressive messaging (avoid "No thanks, I do not want to grow my business")
4. Create mobile-specific paywall design: full-screen takeover on mobile with thumb-friendly CTA placement
5. Design the "social paywall" variant: if applicable, allow users to unlock content by sharing, referring, or completing actions instead of paying
6. Define accessibility requirements: paywall must be keyboard navigable, screen reader compatible, and maintain contrast ratios
7. Create the animation and transition spec: how does the paywall appear? (slide-up, fade-in, inline expansion) — avoid jarring or interruptive patterns
8. Design the error state: what happens if payment fails at the paywall? Inline error with retry, alternative payment methods, and support contact

### Phase 4: A/B Test Plan
1. Define the primary metric: paywall conversion rate (users who see paywall / users who complete payment)
2. Define secondary metrics: paywall bounce rate, time-to-conversion, revenue per paywall impression, downstream retention of converted users
3. Design Test 1 — Paywall Type: test hard vs. soft vs. metered variants with equal traffic allocation for 2-4 weeks
4. Design Test 2 — Timing: test early paywall (before aha moment) vs. standard (after aha) vs. late (after habit) timing
5. Design Test 3 — Copy: test value-first headline ("Unlock unlimited access") vs. urgency-first ("Your trial ends in 3 days") vs. social-proof-first ("Join 10,000+ professionals")
6. Design Test 4 — Price Presentation: test monthly price vs. annual price with monthly equivalent vs. daily cost equivalent ("Less than a coffee a day")
7. Define minimum sample size per variant using statistical significance calculator; require 95% confidence level and 80% statistical power
8. Create a test sequencing plan: run tests in priority order, apply winners cumulatively, and document learnings
9. Define guardrail metrics: tests must not increase churn rate by more than 5% or decrease NPS by more than 3 points
10. Plan the long-term optimization cadence: quarterly paywall reviews with fresh test hypotheses based on accumulated data

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| paywall_specification | markdown | Complete paywall design with type, timing, UX components, and copy |
| timing_matrix | markdown | User segment to paywall timing mapping with journey stage criteria |
| ux_wireframe_spec | markdown | Detailed component specification for the paywall UI with states and behaviors |
| ab_test_plan | markdown | Four prioritized experiments with hypotheses, metrics, sample sizes, and sequencing |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Paywall type justified | blocking | Selected paywall type must be scored against alternatives with documented rationale |
| Timing aligned with journey | blocking | Paywall must appear after the aha moment and include suppression rules for inappropriate contexts |
| UX copy is value-first | blocking | All paywall copy must lead with value gained, not access restricted |
| A/B test plan complete | blocking | At least 4 experiments must be defined with hypotheses, metrics, and sample size requirements |
| Dismissal experience graceful | warning | Users who decline the paywall must return to a functional free experience without penalty |
| Accessibility requirements met | warning | Paywall must meet WCAG 2.1 AA standards for keyboard navigation, screen readers, and contrast |
| Mobile design specified | warning | Mobile-specific paywall layout must be defined with touch-friendly interactions |

---

## Handoff

- **On completion:** Hand to @dan-mall for visual design implementation of the paywall components
- **On conversion funnel needs:** Hand to @patrick-campbell for freemium-design to align the broader conversion funnel
- **On UX flow validation:** Hand to @sophia-prater for user journey and object model review
- **On issues:** Escalate to @design-chief
