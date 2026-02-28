# Task: Churn Prevention Design

**Task ID:** churn-prevention
**Version:** 1.0
**Purpose:** Design UX patterns to reduce both voluntary and involuntary churn
**Agent:** @patrick-campbell
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Designs a comprehensive churn prevention system addressing both voluntary churn (customers choosing to leave) and involuntary churn (customers lost to payment failures). Patrick Campbell's research at ProfitWell found that involuntary churn accounts for 20-40% of all churn in SaaS businesses and is almost entirely recoverable with proper systems. This task builds the full anti-churn architecture: cancellation flow with salvage offers, payment failure recovery sequences, retention hooks embedded in the product, and win-back campaigns for lost customers.

```
INPUT (product_description, current_churn_rate, cancellation_reasons, payment_methods)
    |
[PHASE 1: CHURN TYPE ANALYSIS]
    -> Classify and quantify voluntary vs involuntary churn sources
    |
[PHASE 2: CANCELLATION FLOW DESIGN]
    -> Design cancellation experience with salvage offers and feedback capture
    |
[PHASE 3: PAYMENT FAILURE RECOVERY]
    -> Build dunning sequences to recover failed payments automatically
    |
[PHASE 4: RETENTION HOOK INTEGRATION]
    -> Embed product features that increase switching costs and habit formation
    |
[PHASE 5: WIN-BACK STRATEGY]
    -> Design campaigns to recover churned customers
    |
OUTPUT: Complete churn prevention system with flows, sequences, and retention features
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Product overview with core value proposition and key engagement patterns |
| current_churn_rate | number | Yes | Monthly or annual churn rate with breakdown by voluntary vs involuntary if available |
| cancellation_reasons | list | Yes | Top reasons customers cancel, ranked by frequency (from exit surveys or support data) |
| payment_methods | list | Yes | Accepted payment methods and current payment failure rates per method |
| customer_segments | list | No | Customer segments with their specific churn patterns and risk factors |
| product_usage_data | object | No | Engagement metrics showing usage patterns before churn events |
| current_dunning | object | No | Existing payment failure recovery process if any |

---

## Preconditions

- Churn rate data is available with at least 6 months of history for meaningful pattern analysis
- Cancellation reasons have been collected through exit surveys, support tickets, or customer interviews
- Payment processing infrastructure supports retry logic, card updater services, and dunning emails
- Product analytics can identify engagement decline patterns that predict churn (leading indicators)
- Stakeholders understand that churn reduction has a higher ROI than new customer acquisition and are committed to investment
- Legal and compliance requirements for cancellation flows are understood (some jurisdictions require easy cancellation)
- Customer communication channels (email, in-app, SMS) are available for retention messaging

---

## Steps

### Phase 1: Churn Type Analysis
1. Separate total churn into voluntary (active cancellation) and involuntary (payment failure, card expiration) categories; calculate each as a percentage of total churn
2. For voluntary churn, categorize cancellation reasons into actionable groups:
   - **Price-sensitive:** "Too expensive," "Found cheaper alternative," "Budget cuts"
   - **Value-gap:** "Not using enough," "Does not solve my problem," "Missing features"
   - **Competitor:** "Switching to [competitor]," "Better alternative found"
   - **Circumstantial:** "Company closed," "Project ended," "Role changed"
   - **Experience:** "Too complex," "Poor support," "Bugs/reliability"
3. For involuntary churn, categorize payment failure types:
   - Hard declines (insufficient funds, stolen card, closed account) — lower recovery potential
   - Soft declines (temporary hold, processor error, expired card) — high recovery potential
   - Calculate the recovery potential for each failure type based on industry benchmarks
4. Identify churn leading indicators from product usage data: what behaviors predict cancellation 30-60 days before it happens? (e.g., login frequency drop, feature usage decline, support ticket spike)
5. Segment churn by customer tenure: are you losing customers in the first 90 days (onboarding failure) or after 12+ months (value fatigue)?
6. Calculate the revenue impact of each churn category to prioritize interventions by dollar impact
7. Create a churn risk scoring model: assign risk levels (low/medium/high/critical) based on behavioral signals
8. Document the churn baseline with targets: what is the achievable churn rate after implementing prevention measures?

### Phase 2: Cancellation Flow Design
1. Design the cancellation entry point: accessible but not prominent; comply with regulations requiring easy cancellation (FTC Click-to-Cancel rules)
2. Build a multi-step cancellation flow (3-4 steps maximum):
   - Step 1: Reason capture — "We are sorry to see you go. What is your primary reason for cancelling?" (multiple choice + free text)
   - Step 2: Targeted salvage offer based on the selected reason (see step 3)
   - Step 3: Confirmation with consequences — show what the customer will lose (data, history, team access, pricing lock)
   - Step 4: Final confirmation with feedback opportunity
3. Design reason-specific salvage offers:
   - Price-sensitive: offer a discount (20-30% for 3 months), downgrade to a lower tier, or pause subscription
   - Value-gap: offer a product walkthrough, success manager call, or feature preview of upcoming releases
   - Competitor: ask which competitor and why; offer a comparison or match specific capabilities
   - Circumstantial: offer pause (1-3 months) or account transfer to a colleague
   - Experience: escalate to support lead, offer dedicated onboarding session, or bug fix commitment
4. Design the "pause" option as a churn alternative: allow customers to pause for 1-3 months without losing data or settings; ProfitWell data shows pause reduces churn by 15-20%
5. Create the downgrade path: make it easy to move to a lower tier instead of cancelling; show the specific tier that matches their current usage
6. Design the post-cancellation survey: 3-5 questions maximum, delivered via email 24 hours after cancellation when emotions have settled
7. Define the data retention policy: how long is customer data kept after cancellation? Communicate this clearly as both a safety net and a win-back lever
8. Set salvage offer conversion targets: aim for 15-25% of cancellation attempts to be saved through offers

### Phase 3: Payment Failure Recovery
1. Implement smart retry logic based on failure type:
   - Soft declines: retry in 24 hours, then 48 hours, then 72 hours (3 retries over 7 days)
   - Hard declines: retry once after 5 days (allow time for customer to resolve), then escalate to customer notification
   - Expired cards: check if card updater service has a new card number before first retry
2. Design the dunning email sequence (4-email sequence over 14 days):
   - Email 1 (Day 1): Friendly notification — "Your payment did not go through. Update your card to keep your account active." No urgency, helpful tone
   - Email 2 (Day 4): Value reminder — "You have [X projects, Y team members, Z data] in your account. Update your payment to keep everything safe."
   - Email 3 (Day 8): Urgency introduction — "Your account will be downgraded in 6 days. Update your payment method to maintain full access."
   - Email 4 (Day 12): Final notice — "Last chance: your account will be downgraded tomorrow. One click to update your card and keep everything."
3. Design the in-app payment failure banner: persistent but not blocking, with a one-click "update payment" action; disappears immediately upon successful payment
4. Implement the card updater integration: automatically attempt to update expired card details through the payment processor's account updater service before sending any dunning communications
5. Design the grace period experience: during the dunning window, do not restrict access; restricting access during payment issues causes voluntary churn on top of involuntary churn
6. Create the downgrade behavior at sequence end: if payment is not recovered after 14 days, downgrade to free tier (do not delete data); this preserves the win-back opportunity
7. Build the "payment recovered" celebration: when payment succeeds after a failure, send a confirmation email with a positive message, not a receipt
8. Set recovery rate targets: aim for 50-70% recovery of soft declines and 20-30% of hard declines through the complete dunning sequence

### Phase 4: Retention Hook Integration
1. Identify and design "sticky" features that increase switching costs naturally:
   - Data accumulation: the more data users store, the harder it is to leave (history, analytics, content)
   - Integrations: connections to other tools create dependency webs
   - Team collaboration: shared workspaces and permissions make individual cancellation difficult
   - Customization: templates, workflows, and settings that represent invested effort
   - Content creation: user-generated content that only exists in the product
2. Design the "investment visualization" feature: show users how much value they have accumulated ("You have created 47 projects, collaborated with 12 team members, and saved 230 hours this year")
3. Build engagement loops that drive habitual usage:
   - Daily: notifications, activity feeds, task reminders
   - Weekly: digest emails with usage summaries and insights
   - Monthly: progress reports, ROI calculations, usage milestones
4. Design the milestone celebration system: acknowledge user achievements that reinforce the product's value (first project, 100th task, 1-year anniversary)
5. Create the "health score" dashboard for customer success teams: aggregate engagement signals into a single score that predicts churn risk and triggers proactive outreach
6. Design the proactive intervention triggers: when a user's engagement drops below threshold, what automated actions fire? (re-engagement email, in-app tip, success manager alert)
7. Build the feature adoption campaign: guide users to discover and use features they have not tried yet, expanding their product footprint and increasing stickiness
8. Design the community and education layer: forums, webinars, certifications that create social bonds and expertise investment beyond the product itself

### Phase 5: Win-Back Strategy
1. Define the win-back window: segment churned customers by recency (0-30 days, 31-90 days, 91-180 days, 180+ days) with different strategies per window
2. Design the win-back email sequence:
   - 0-30 days: "We miss you" + address their specific cancellation reason + offer to return at a discount
   - 31-90 days: "Here is what is new" + product updates that address their pain points + limited-time return offer
   - 91-180 days: "A lot has changed" + major feature launches + fresh trial of new capabilities
   - 180+ days: Annual check-in only; reduce frequency to avoid spam perception
3. Create the "return offer" tier: what incentive brings churned customers back? (50% off for 2 months, free month, upgraded tier for the price of the lower tier)
4. Design the re-onboarding experience: returning customers should not repeat basic onboarding; restore their data and settings, then highlight what is new
5. Build the win-back landing page: dedicated page for returning customers with their account status, data preservation confirmation, and return offer
6. Define win-back success metrics: target 5-10% reactivation rate for customers within the first 90 days of churn
7. Create the "open door" policy: make it clear during cancellation that the customer can return anytime with their data intact; this reduces cancellation anxiety
8. Design the competitor-switch win-back: if a customer left for a competitor, monitor for competitor dissatisfaction signals (social media, review sites) and time outreach accordingly

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| churn_analysis_report | markdown | Complete churn type breakdown with revenue impact, leading indicators, and risk scoring model |
| cancellation_flow_spec | markdown | Multi-step cancellation experience with salvage offers, copy, and conversion targets |
| dunning_sequence_spec | markdown | Payment failure recovery system with retry logic, email sequence, and in-app notifications |
| retention_hooks_plan | markdown | Sticky feature design, engagement loops, and proactive intervention trigger definitions |
| winback_campaign_spec | markdown | Segmented win-back strategy with email sequences, offers, and re-onboarding experience |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Churn types quantified | blocking | Voluntary and involuntary churn must be separated and quantified with revenue impact |
| Cancellation flow compliant | blocking | Cancellation flow must comply with FTC Click-to-Cancel and applicable regulations |
| Salvage offers reason-specific | blocking | Each cancellation reason category must have a tailored salvage offer designed |
| Dunning sequence complete | blocking | Payment failure recovery must include retry logic, 4-email sequence, and in-app notification |
| Win-back segments defined | blocking | Churned customers must be segmented by recency with differentiated win-back strategies |
| Retention hooks identified | warning | At least 4 sticky features or engagement loops must be designed to increase switching costs |
| Recovery targets set | warning | Specific recovery rate targets must be defined for salvage offers, dunning, and win-back campaigns |
| Grace period preserved | warning | Payment failure recovery must not restrict access during the dunning window |

---

## Handoff

- **On completion:** Hand to @dan-mall for visual design of cancellation flow, dunning emails, and retention UI components
- **On pricing restructure needs:** Hand to @patrick-campbell for value-metric reassessment if price is the dominant churn reason
- **On UX flow validation:** Hand to @sophia-prater for cancellation and recovery flow object mapping
- **On issues:** Escalate to @design-chief
