# Task: Pricing Page Design

**Task ID:** pricing-page
**Version:** 1.0
**Purpose:** Design a conversion-optimized pricing page with tier psychology and social proof
**Agent:** @patrick-campbell
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Designs a high-converting pricing page that leverages tier psychology, anchoring effects, and social proof to guide prospects toward the optimal plan. This task applies ProfitWell's data-driven approach to pricing presentation, ensuring every element on the page — from tier naming to CTA copy — is intentionally designed to reduce friction and increase conversion. The pricing page is often the highest-leverage page on a SaaS website, and small changes can produce outsized revenue impact.

```
INPUT (product_description, pricing_tiers, target_segments, competitor_pricing)
    |
[PHASE 1: TIER ARCHITECTURE]
    -> Structure 3-tier optimal layout with clear differentiation
    |
[PHASE 2: FEATURE DIFFERENTIATION MATRIX]
    -> Map features to tiers with strategic gating
    |
[PHASE 3: ANCHOR PRICING STRATEGY]
    -> Set price points using anchoring and decoy psychology
    |
[PHASE 4: SOCIAL PROOF & TRUST PLACEMENT]
    -> Position testimonials, logos, and trust signals strategically
    |
[PHASE 5: CTA OPTIMIZATION]
    -> Design CTAs with urgency, clarity, and friction reduction
    |
OUTPUT: Complete pricing page specification with layout, copy, and conversion strategy
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Product overview including core value proposition and differentiators |
| pricing_tiers | object | Yes | Defined tiers with names, prices, and included features from value-metric task |
| target_segments | list | Yes | Customer segments mapped to their ideal tier with buying motivations |
| competitor_pricing | list | Yes | Competitor pricing pages with tier structures, prices, and positioning |
| brand_guidelines | object | No | Visual identity constraints including colors, typography, and tone of voice |
| current_page_data | object | No | Analytics from existing pricing page (conversion rate, drop-off points, heatmaps) |

---

## Preconditions

- Pricing tiers and value metric have been defined (ideally via the value-metric task)
- At least 3 competitor pricing pages have been analyzed for positioning context
- Target segments are clearly defined with their primary buying motivations and objections
- Brand guidelines or design system is available for visual consistency
- Stakeholders have approved the pricing structure before page design begins
- Feature list is finalized and mapped to tiers with clear differentiation rationale
- Legal has reviewed any pricing claims, guarantees, or comparison statements for compliance

---

## Steps

### Phase 1: Tier Architecture
1. Validate the 3-tier structure as optimal: Starter (entry), Professional (recommended), Enterprise (premium); research shows 3 tiers maximize conversion by reducing choice paralysis
2. Define tier naming strategy: names should reflect the customer's identity, not feature levels (e.g., "Growth" not "Basic Plus"; "Scale" not "Tier 2")
3. Establish the visual hierarchy: the recommended tier (typically middle) receives 115-120% visual weight through size, color, border, or badge treatment
4. Design the "recommended" or "most popular" badge for the target tier; this social proof label increases selection by 20-30% on average
5. Set the layout pattern: horizontal card layout for desktop (3 columns), vertical stack for mobile with recommended tier first
6. Define the information density per tier card: tier name, price, value metric unit, 5-7 key features, CTA button, and one differentiating headline
7. Plan the toggle component for billing frequency: monthly vs annual with savings percentage displayed (e.g., "Save 20%"); annual should be the default selected state

### Phase 2: Feature Differentiation Matrix
1. Create a complete feature-to-tier matrix listing every feature and its availability per tier (included, limited, not available)
2. Apply the "good-better-best" principle: each tier should include everything from the tier below plus meaningful additions
3. Identify 2-3 "hero features" per tier that justify the price difference; these appear prominently on the tier card
4. Design the feature comparison table for below-the-fold placement: full matrix with checkmarks, limits, and tooltips for complex features
5. Use strategic feature gating: gate features that signal growth (more users, more projects, more integrations) rather than features that feel punitive to remove
6. Add feature tooltips or expandable descriptions for features that are not self-explanatory; reduce cognitive load
7. Group features by category in the comparison table (e.g., Core, Collaboration, Security, Support) for scanability
8. Highlight the differential value between tiers: what specifically does the customer gain by upgrading? Make the delta obvious

### Phase 3: Anchor Pricing Strategy
1. Set the enterprise tier price first as the anchor; this makes all other tiers feel more accessible by comparison
2. Apply the decoy effect: ensure the price gap between Starter and Professional is smaller than between Professional and Enterprise, making Professional the obvious value choice
3. Display prices with appropriate framing: per-user/per-month for low unit costs, annual total for enterprise; always show the unit that appears smallest
4. If offering annual billing, show the monthly equivalent price with the annual savings ("$29/mo billed annually — save $70/year")
5. Use charm pricing strategically: $29, $49, $99 for self-serve tiers; round numbers ($500, $1,000) for enterprise to signal premium positioning
6. Design the price display typography: price number should be 2-3x larger than the surrounding text; currency symbol should be smaller than the number
7. Add a "starting at" prefix for usage-based tiers to reduce sticker shock while maintaining transparency
8. If competitor pricing is available, position the recommended tier within 10-20% of the market median to avoid being perceived as overpriced or undervalued

### Phase 4: Social Proof and Trust Placement
1. Place customer logos immediately below the pricing header: 4-6 recognizable logos that represent the target segment's aspirational peers
2. Add tier-specific testimonials: each tier card or section should include a quote from a customer in that tier validating the value at that price point
3. Display aggregate social proof: "Trusted by X,000+ companies" or "X million [value metric units] processed" — use the value metric for consistency
4. Position a money-back guarantee or free trial badge near the CTA buttons to reduce purchase anxiety
5. Add security badges (SOC 2, GDPR, SSL) in the footer area for enterprise buyers who need compliance reassurance
6. Include a "featured in" press section if applicable; third-party validation reduces perceived risk
7. Design a FAQ section below the pricing table addressing the top 5-7 objections: billing flexibility, cancellation policy, data portability, upgrade/downgrade process, onboarding support
8. Add a live chat or "talk to sales" option specifically for enterprise tier to capture high-value leads that need human touch

### Phase 5: CTA Optimization
1. Design tier-specific CTAs: "Start Free Trial" for Starter, "Start Free Trial" or "Get Started" for Professional, "Contact Sales" for Enterprise
2. Use action-oriented, first-person copy: "Start my free trial" outperforms "Sign up" by 25-30% in conversion tests
3. Set CTA button hierarchy: recommended tier gets the primary button color (filled), other tiers get secondary (outlined) to create visual flow
4. Add micro-copy below CTAs to reduce friction: "No credit card required," "14-day free trial," "Cancel anytime"
5. Design the sticky CTA behavior: on scroll, the pricing header with tier names and CTAs should become a sticky bar for easy access
6. Create urgency without false pressure: "Lock in this price" for annual plans or "Start building today" — avoid countdown timers or fake scarcity
7. Plan the post-click flow: CTA should lead to a streamlined signup with minimal fields (email + password or SSO only); every additional field reduces conversion by 10-15%
8. Add a secondary CTA for comparison shoppers: "Compare all features" link that smooth-scrolls to the full feature matrix below

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| page_specification | markdown | Complete pricing page spec with layout, content hierarchy, and component requirements |
| feature_matrix | markdown | Full feature-to-tier comparison table with gating rationale |
| copy_document | markdown | All page copy including headlines, tier descriptions, CTAs, FAQ, and micro-copy |
| conversion_strategy | markdown | Psychological principles applied, A/B test hypotheses, and success metrics |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Three-tier structure validated | blocking | Page must present exactly 3 primary tiers with a clear recommended option |
| Anchor pricing applied | blocking | Enterprise tier must be priced to make the recommended tier feel accessible |
| Social proof included | blocking | At least 3 forms of social proof must be present (logos, testimonials, aggregate stats) |
| CTA differentiation clear | blocking | Each tier must have a distinct CTA with friction-reducing micro-copy |
| Feature matrix complete | warning | Every feature must be mapped to tiers with clear availability indicators |
| Mobile layout specified | warning | Responsive behavior must be defined with recommended tier appearing first on mobile |
| FAQ addresses top objections | warning | At least 5 common pricing objections must be addressed in the FAQ section |

---

## Handoff

- **On completion:** Hand to @dan-mall for visual design execution and design system integration
- **On freemium addition:** Hand to @patrick-campbell for freemium-design to define the free tier
- **On UX flow questions:** Hand to @sophia-prater for checkout flow object mapping
- **On issues:** Escalate to @design-chief
