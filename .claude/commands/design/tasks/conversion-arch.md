# Task: Conversion Architecture

**Task ID:** conversion-arch
**Version:** 1.0
**Purpose:** Design conversion flow architecture minimizing friction between user intent and goal completion
**Agent:** @luke-wroblewski
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Designs the architecture of conversion flows to systematically eliminate friction between user intent and goal completion. Drawing on behavioral design, progressive engagement, and trust-building patterns, this task maps every step from first interaction to conversion, identifies and removes friction points, optimizes call-to-action hierarchy, and establishes micro-conversion tracking to measure incremental progress. The result is a conversion funnel engineered for maximum throughput with minimum cognitive and interaction cost.

```
INPUT (product_description, conversion_goal, current_flow, drop_off_data)
    |
[PHASE 1: FRICTION AUDIT]
    -> Map current flow and identify every friction point causing abandonment
    |
[PHASE 2: PROGRESSIVE ENGAGEMENT DESIGN]
    -> Restructure flow to build commitment gradually before asking for conversion
    |
[PHASE 3: TRUST & SOCIAL PROOF PLACEMENT]
    -> Position trust signals and social proof at decision-critical moments
    |
[PHASE 4: CTA HIERARCHY]
    -> Design primary, secondary, and tertiary call-to-action system
    |
[PHASE 5: MICRO-CONVERSION TRACKING]
    -> Define measurable micro-conversions for funnel optimization
    |
OUTPUT: Conversion architecture spec with friction map, engagement flow, trust placement, CTA system, and tracking plan
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Description of the product and its value proposition |
| conversion_goal | string | Yes | The primary conversion event (purchase, signup, subscription, lead capture, etc.) |
| current_flow | list | Yes | Step-by-step description of the current user flow from entry to conversion |
| drop_off_data | object | No | Analytics showing where users abandon the flow and at what rates |
| competitor_flows | list | No | Descriptions or screenshots of competitor conversion flows for benchmarking |
| user_objections | list | No | Known user objections, hesitations, or concerns that prevent conversion |
| pricing_model | string | No | Pricing structure (free trial, freemium, one-time, subscription) affects engagement strategy |

---

## Preconditions

- The conversion goal is clearly defined and agreed upon by stakeholders
- The current user flow is documented or can be walked through in the live product
- Product value proposition is articulated and validated with users
- Team has access to analytics tools for implementing tracking recommendations
- Design and development resources are available to implement flow changes
- Stakeholders are willing to modify the current flow based on audit findings
- If drop-off data exists, it is recent and collected from a statistically significant sample

---

## Steps

### Phase 1: Friction Audit
1. Map the complete current flow from first touchpoint (ad, search, referral) to conversion completion, documenting every screen, click, and form field
2. Count the total number of steps, clicks, fields, and decisions required to complete the conversion
3. Identify interaction friction: unnecessary steps, redundant data entry, confusing navigation, dead ends
4. Identify cognitive friction: unclear value proposition, too many choices, jargon, ambiguous CTAs, missing context
5. Identify trust friction: missing security indicators, no social proof, unclear pricing, hidden costs revealed late
6. Identify technical friction: slow load times, broken flows on mobile, payment failures, timeout errors
7. If drop-off data is available, overlay abandonment rates on the flow map to identify the highest-impact friction points
8. Prioritize friction points by impact (estimated abandonment caused) and effort (difficulty to fix): create a 2x2 impact/effort matrix
9. Produce a friction audit report with each friction point, its type, estimated impact, and proposed resolution

### Phase 2: Progressive Engagement Design
1. Define the commitment curve: what is the user willing to give at each stage (attention, email, personal data, payment)?
2. Restructure the flow to follow the commitment curve: ask for small commitments first, escalate gradually
3. Design a value-before-ask pattern: deliver meaningful value (preview, sample, result) before requesting registration or payment
4. Implement the foot-in-the-door technique: start with a micro-action (save item, customize, try feature) that psychologically commits the user
5. Design the flow to minimize account creation friction: allow guest checkout, social login, or email-only signup where possible
6. Break long forms into multi-step flows with progress indicators; each step should feel like a small, completable task
7. Design save-and-resume capability for complex flows: users should be able to leave and return without losing progress
8. Identify the point of no return in the flow and ensure maximum value is communicated just before it
9. Create a revised flow diagram showing the progressive engagement sequence with decision points and escape paths

### Phase 3: Trust and Social Proof Placement
1. Inventory all available trust signals: security badges, certifications, partner logos, media mentions, guarantees, policies
2. Inventory all available social proof: testimonials, reviews, ratings, user counts, case studies, before/after results
3. Map trust anxiety peaks in the conversion flow: moments where the user is asked to provide sensitive data or make a financial commitment
4. Place trust signals at anxiety peaks: security badges near payment fields, privacy assurances near personal data collection
5. Place social proof at decision points: testimonials near CTAs, user counts on landing pages, reviews on product pages
6. Design contextually relevant social proof: match the testimonial/review to the specific hesitation at that flow stage
7. Implement urgency and scarcity signals ethically: real-time inventory, limited-time offers (only if genuinely limited)
8. Design guarantee and risk-reversal messaging: money-back guarantees, free trial periods, no-commitment language
9. Create a trust signal placement map showing each signal, its position in the flow, and the anxiety it addresses

### Phase 4: CTA Hierarchy
1. Define the primary CTA: the single most important action on each screen that drives toward conversion
2. Define secondary CTAs: alternative paths that still move toward conversion (e.g., "Learn more" vs "Buy now")
3. Define tertiary CTAs: supporting actions that build engagement but do not directly convert (e.g., "Save for later," "Compare")
4. Design visual hierarchy: primary CTA gets maximum contrast, size, and whitespace; secondary is visually subordinate; tertiary is text-link level
5. Write CTA copy using action-benefit framing: "Start free trial" not "Submit," "Get your report" not "Continue"
6. Specify CTA placement per screen: above the fold for primary, after supporting content for secondary, inline for tertiary
7. Design CTA states: default, hover, active, disabled, loading — each must be visually distinct and provide feedback
8. Eliminate competing CTAs: no screen should have more than one primary CTA; audit for visual competition
9. Create a CTA specification document with copy, visual treatment, placement, and behavioral rules for each CTA type

### Phase 5: Micro-Conversion Tracking
1. Define the macro-conversion event (the primary conversion goal) and its tracking implementation
2. Identify 5-10 micro-conversions that indicate progress toward the macro-conversion (e.g., page view, scroll depth, CTA click, form start, field completion, account creation)
3. Map micro-conversions to the flow diagram to create a measurable funnel with step-by-step conversion rates
4. Define drop-off thresholds: at what abandonment rate should each step trigger an investigation or optimization?
5. Specify analytics events for each micro-conversion: event name, parameters, trigger conditions
6. Design a funnel dashboard showing conversion rates between each micro-conversion step
7. Define cohort analysis dimensions: segment conversion data by device, source, user type, time of day
8. Propose initial A/B test hypotheses: based on the friction audit, identify the top 3 changes to test first
9. Create a measurement plan document with event taxonomy, dashboard specifications, and testing roadmap

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| friction_audit | markdown | Complete friction map with categorized friction points, impact scores, and resolutions |
| engagement_flow | diagram (ASCII/Mermaid) | Revised flow diagram showing progressive engagement sequence and decision points |
| trust_placement_map | markdown table | Trust signals and social proof mapped to specific flow positions and anxieties |
| cta_specification | markdown | CTA hierarchy with copy, visual treatment, placement, and behavioral rules |
| measurement_plan | markdown | Micro-conversion event taxonomy, funnel dashboard spec, and A/B test roadmap |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Friction audit complete | blocking | Every step in the current flow must be evaluated for friction with documented findings |
| Flow restructured | blocking | A revised progressive engagement flow must be produced with fewer total friction points |
| Trust signals placed | blocking | Trust signals must be mapped to every anxiety peak in the flow |
| CTA hierarchy defined | blocking | Every screen must have exactly one primary CTA with no visual competition |
| Micro-conversions defined | blocking | At least 5 measurable micro-conversion events must be specified with tracking details |
| Step reduction | warning | Revised flow should have fewer total steps than the original (or justified if not) |
| A/B test plan | warning | At least 3 testable hypotheses should be proposed based on audit findings |

---

## Handoff

- **On completion:** Hand to @brad-frost for component design of trust badges, CTA buttons, and progress indicators
- **On form optimization needs:** Hand to self via `form-optimize` task for form-specific field and validation design
- **On onboarding flow:** Hand to self via `onboarding-flow` task for first-time user experience design
- **On mobile-specific conversion:** Hand to self via `mobile-first` task for mobile conversion optimization
- **On issues:** Escalate to @design-chief
