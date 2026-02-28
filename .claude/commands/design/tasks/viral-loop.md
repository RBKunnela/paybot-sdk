# Task: Viral Loop Architecture

**Task ID:** viral-loop
**Version:** 1.0
**Purpose:** Design viral mechanics and calculate K-factor for organic growth through systematic viral loop engineering
**Agent:** @sean-ellis
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Designs viral mechanics that enable organic user acquisition by engineering sharing behaviors into the product experience. This task classifies the virality type, designs the complete viral loop, calculates the K-factor (viral coefficient), and identifies optimization levers to push K above 1.0 for exponential growth. Based on Andrew Chen's viral growth frameworks and Sean Ellis's growth hacking methodology.

```
INPUT (product_description, sharing_context, network_type)
    |
[PHASE 1: VIRALITY TYPE SELECTION]
    -> Classify the most natural viral mechanic for the product
    |
[PHASE 2: LOOP DESIGN]
    -> Architect the complete viral loop from trigger to conversion
    |
[PHASE 3: K-FACTOR CALCULATION]
    -> Calculate viral coefficient and cycle time
    |
[PHASE 4: VIRAL COEFFICIENT OPTIMIZATION]
    -> Identify levers to increase K-factor toward and beyond 1.0
    |
OUTPUT: Viral loop blueprint with K-factor model, optimization plan, and implementation spec
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Description of the product, its core value, and how users interact with it |
| sharing_context | string | Yes | Natural moments when users might share or invite others (collaboration, showing off, needing help, etc.) |
| network_type | string | Yes | Type of user network (professional, social, local, interest-based, marketplace) |
| current_referral_data | object | No | Existing referral metrics: invites sent per user, invite acceptance rate, etc. |
| platform_channels | list | No | Available sharing channels (email, SMS, social media, in-app, embed); defaults to all |
| incentive_budget | string | No | Budget available for referral incentives if applicable |

---

## Preconditions

- Product has a clear value proposition that can be articulated in a single sentence
- There is an identifiable moment in the user journey where sharing adds value for the sharer, the recipient, or both
- The product supports or can support multi-user interaction, collaboration, or content sharing
- Basic analytics tracking is in place or planned to measure sharing events and conversion
- The team is willing to integrate viral mechanics into the core product experience rather than bolting on a referral program
- User base is large enough to generate meaningful data from viral experiments (minimum 100 active users recommended)

---

## Steps

### Phase 1: Virality Type Selection
1. Analyze the product description to identify which virality types are naturally compatible with the product experience:
   - **Inherent virality:** Product requires multiple users to function (Slack, Zoom, multiplayer games)
   - **Collaboration virality:** Product becomes more valuable when shared (Google Docs, Figma, Notion)
   - **Word-of-mouth virality:** Product delivers remarkable results that users want to talk about (Superhuman, ChatGPT)
   - **Incentivized virality:** Product offers rewards for referrals (Dropbox, Uber, PayPal)
   - **Embedded virality:** Product output contains branding that attracts new users (Hotmail signature, Made with Squarespace)
   - **Social proof virality:** Product usage is visible to others and creates desire (Spotify Wrapped, GitHub contributions)
2. Evaluate each type against three criteria: naturalness (does it feel organic), scalability (can it grow without linear cost), and sustainability (does it maintain over time)
3. Select the primary virality type and up to two secondary types that complement the primary
4. Document why the selected type is the strongest fit for this specific product and audience
5. Identify anti-patterns to avoid: forced sharing, dark patterns, spam-like behavior that degrades brand trust

### Phase 2: Loop Design
1. Map the complete viral loop as a cycle with these stages:
   - **Trigger:** The moment in the user journey that prompts a sharing action (what just happened that makes the user want to share)
   - **Share action:** The specific mechanic the user uses to share (invite, link, embed, post, forward)
   - **Channel:** The medium through which the share travels (email, SMS, social, in-app notification, URL)
   - **Impression:** What the recipient sees and experiences when the share arrives (preview, landing page, notification)
   - **Conversion:** The action the recipient takes to become a new user (signup, download, accept invite)
   - **Value delivery:** How the new user quickly experiences the product value that will eventually trigger their own sharing
2. For each stage, define the key metric, current baseline (if known), and target conversion rate
3. Design the sharing UI/UX: where the share prompt appears, how it is worded, what the call-to-action looks like
4. Design the recipient experience: the landing page or invite acceptance flow optimized for conversion
5. Define the "viral content" — what exactly is shared (a link, an artifact, a preview, an invitation) and how it communicates value to the recipient
6. Map the time dimension: how long each stage takes and what the total viral cycle time is (faster cycles compound faster)
7. Identify friction points in the loop and design solutions for each

### Phase 3: K-Factor Calculation
1. Define the K-factor formula for this product: K = i * c, where i = number of invites/shares sent per user and c = conversion rate of each invite
2. Estimate or measure the current values for i (invites per user) and c (conversion rate per invite)
3. Calculate the current K-factor and interpret: K < 0.5 (minimal virality), 0.5-1.0 (viral assist), K > 1.0 (true viral growth)
4. Calculate the viral cycle time: average time from a user joining to their invitees joining; shorter is better
5. Model the compounding effect: given current K and cycle time, project user growth over 30, 60, and 90 days
6. Calculate the effective viral growth rate accounting for churn: net K = K * (1 - churn_rate)
7. Identify the specific levers that most efficiently increase K: increasing i versus increasing c, and the relative effort of each
8. Create a sensitivity analysis showing how K changes with improvements to each variable

### Phase 4: Viral Coefficient Optimization
1. **Increasing invites per user (i):**
   - Identify more natural sharing moments in the user journey
   - Design prompts that align with user goals rather than product goals
   - Reduce friction in the sharing action (pre-populated messages, one-tap sharing, smart contact suggestions)
   - Create shareable artifacts that users want to distribute (reports, badges, content, results)
   - Implement progressive sharing: start with low-commitment shares, escalate to invitations
2. **Increasing conversion rate per invite (c):**
   - Optimize the recipient landing experience for immediate value comprehension
   - Add social proof to the invitation (who invited them, how many others use the product)
   - Reduce signup friction for invited users (pre-filled information, single-click acceptance)
   - Create urgency or exclusivity where appropriate (limited access, time-bound invitations)
   - Personalize the invitation based on the relationship between sender and recipient
3. **Reducing cycle time:**
   - Shorten time to first share by accelerating the aha moment
   - Use real-time channels (push notifications, SMS) over async channels (email)
   - Create time-sensitive sharing triggers (live events, expiring content, collaboration deadlines)
4. Design 5 specific experiments to test viral optimizations, each with hypothesis, metric, and expected lift
5. Prioritize experiments by expected impact on K-factor and implementation effort
6. Define the viral metrics dashboard: K-factor, cycle time, invites per user, invite conversion rate, viral users as percentage of total acquisition

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| virality_classification | markdown | Analysis of virality types with primary and secondary selection and rationale |
| viral_loop_diagram | markdown | Complete loop design with stages, metrics, UX specifications, and friction analysis |
| k_factor_model | markdown | K-factor calculation with current values, projections, sensitivity analysis, and growth scenarios |
| optimization_plan | markdown | Prioritized experiments to increase K-factor with expected impact estimates |
| implementation_spec | markdown | Technical specification for viral mechanics including UI, sharing infrastructure, and tracking |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Virality type justified | blocking | Selected virality type must be justified with product-specific reasoning, not generic selection |
| Complete loop mapped | blocking | All six stages of the viral loop must be defined with metrics and conversion targets |
| K-factor calculated | blocking | K-factor must be calculated with clearly stated assumptions and sensitivity analysis |
| Optimization experiments | blocking | At least 5 optimization experiments must be designed with hypotheses and expected impact |
| Ethical sharing | blocking | Viral mechanics must not rely on dark patterns, spam, or deceptive practices |
| Cycle time estimated | warning | Viral cycle time should be estimated with a plan to reduce it |
| Anti-spam safeguards | warning | Design should include rate limiting and opt-out mechanisms for recipients |

---

## Handoff

- **On completion:** Hand to @pm for story creation to implement viral mechanics
- **On network effect design needs:** Hand to @sean-ellis for network-effects task
- **On activation optimization needs:** Hand to @sean-ellis for activation-flow task
- **On issues:** Escalate to @design-chief
