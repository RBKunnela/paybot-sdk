# Task: Trigger Mapping

**Task ID:** trigger-map
**Version:** 1.0
**Purpose:** Map all external and internal triggers for a product and design the transition strategy from external prompts to internal, emotion-driven usage
**Agent:** @nir-eyal
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Maps the complete trigger landscape for a product, covering all four types of external triggers (paid, earned, relationship, owned) and the internal triggers (emotions and situations) that drive unprompted use. The critical insight from Nir Eyal's framework is that products must transition users from external triggers (which require ongoing investment) to internal triggers (which are self-sustaining). This task audits existing triggers, discovers internal trigger opportunities, designs trigger-action couplings, and creates a transition strategy that moves users from needing external prompts to reaching for the product instinctively.

```
INPUT (product_description, user_context, entry_points)
    |
[PHASE 1: EXTERNAL TRIGGER AUDIT]
    -> Catalog all paid, earned, relationship, and owned triggers
    |
[PHASE 2: INTERNAL TRIGGER DISCOVERY]
    -> Identify emotions and situations that drive unprompted usage
    |
[PHASE 3: TRIGGER-ACTION COUPLING]
    -> Design tight connections between each trigger and the desired action
    |
[PHASE 4: TRANSITION STRATEGY]
    -> Plan the migration from external to internal triggers over time
    |
OUTPUT: Complete trigger map with transition strategy and implementation plan
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Description of the product and its core value proposition |
| user_context | string | Yes | The user's daily environment, routines, device usage, and emotional landscape |
| entry_points | string | Yes | Current ways users first encounter or return to the product |
| marketing_channels | string | No | Active marketing and communication channels |
| notification_data | string | No | Current notification types, frequency, and engagement rates |
| user_journey_map | string | No | Existing user journey map if available |

---

## Preconditions

- The product has identifiable entry points where users begin or resume interaction
- User context is understood or can be reasonably inferred from research or persona data
- The team recognizes the cost differential between external triggers (ongoing spend) and internal triggers (self-sustaining)
- Notification and communication infrastructure exists or is planned
- The product delivers enough value to justify building internal trigger associations

---

## Steps

### Phase 1: External Trigger Audit

1. **Paid triggers** — Catalog all paid acquisition channels:
   - Advertising (search, social, display, video)
   - Sponsorships and partnerships
   - Content marketing and SEO investment
   - Influencer campaigns
   - Assess: cost per trigger activation, conversion rate, sustainability without continued spend
2. **Earned triggers** — Catalog all organic exposure channels:
   - Press coverage and media mentions
   - App store features and editorial placements
   - Viral content and social sharing
   - Word of mouth and organic referrals
   - Assess: reliability, controllability, and decay rate of each earned trigger
3. **Relationship triggers** — Catalog all person-to-person triggers:
   - Invitations and referral mechanics
   - Shared content and collaborative features
   - Social proof and recommendation systems
   - Community and forum mentions
   - Assess: virality coefficient, quality of referred users, and authenticity of the trigger
4. **Owned triggers** — Catalog all triggers the product controls directly:
   - Push notifications (categorize by type and purpose)
   - Email communications (transactional, marketing, re-engagement)
   - In-app badges, indicators, and reminders
   - Widgets, browser extensions, and ambient presence
   - Assess: opt-in rates, engagement rates, unsubscribe/disable rates, annoyance threshold
5. Rate each external trigger on three dimensions: reach (how many users it touches), relevance (how well-targeted it is), and response rate (what percentage of triggered users take action)
6. Identify trigger fatigue: which external triggers are losing effectiveness over time?
7. Calculate trigger dependency: what percentage of all usage is initiated by external triggers vs. self-initiated?

### Phase 2: Internal Trigger Discovery

1. Identify the primary emotion that precedes product use using the 5 Whys technique:
   - Start with the surface need ("I want to check my feed")
   - Ask why five times until reaching the root emotion ("I feel lonely and want connection")
2. Map the emotional trigger landscape — document all emotions that could drive usage:
   - Negative emotions: boredom, loneliness, uncertainty, anxiety, frustration, FOMO, insecurity
   - Positive emotions: curiosity, excitement, anticipation, pride, desire to share
   - Note: negative emotions are more powerful internal triggers because they create an itch that demands scratching
3. Map situational triggers — document contexts that precede usage:
   - Time-based: morning routine, lunch break, evening wind-down, weekend
   - Location-based: commute, waiting room, office, bed
   - Social-based: alone, in a group, after a conversation, after a meeting
   - Activity-based: after completing a task, during a break, while procrastinating
4. Identify existing internal trigger associations: do users already reach for the product without prompting? When and why?
5. Research competing internal trigger associations: when users feel the identified emotion, what do they currently reach for? (phone, social media, food, cigarette, other app)
6. Prioritize internal triggers by frequency (how often the emotion/situation occurs) and intensity (how strongly it drives action)
7. Select the primary internal trigger: the single emotion-context pair that occurs most frequently and aligns best with the product's value

### Phase 3: Trigger-Action Coupling

1. For each trigger (external and internal), define the specific action the user should take when triggered
2. Ensure the action is the simplest possible behavior: one tap, one scroll, one search — not a multi-step process
3. Design the trigger-to-action gap: the time and friction between feeling the trigger and completing the action should be near zero
4. Create trigger-action statements: "When I feel [trigger], I [action] on [product]"
5. Identify coupling failures: where does the trigger fire but the user does NOT take the desired action? What breaks the coupling?
6. Design reinforcement mechanisms: how does the product strengthen the trigger-action association over time?
7. Map the coupling across devices: does the trigger-action coupling work on mobile, desktop, tablet, and wearable?
8. Test coupling clarity: if you described the trigger to a user, would they immediately know what action to take? Ambiguity kills coupling

### Phase 4: Transition Strategy

1. Design the transition timeline: how long should it take for users to move from external-trigger-dependent to internal-trigger-driven?
2. Map the transition phases:
   - **Phase A — External dependency** (weeks 1-4): Rely on owned triggers (notifications, emails) to establish the behavior pattern
   - **Phase B — Association building** (weeks 4-8): Pair external triggers with the emotional context to build the internal association
   - **Phase C — External reduction** (weeks 8-12): Gradually reduce external trigger frequency as internal triggers strengthen
   - **Phase D — Internal dominance** (week 12+): Most usage is self-initiated; external triggers serve as re-engagement for lapsed users
3. Design the "weaning protocol" for reducing external triggers:
   - Start with high-frequency, high-value notifications
   - Gradually reduce frequency as engagement data shows self-initiated usage increasing
   - Monitor for engagement drops that indicate premature weaning
4. Create a notification hierarchy: classify all notifications by necessity (critical/important/nice-to-have) and reduce from the bottom up
5. Design internal trigger reinforcement touchpoints within the product:
   - Celebrate unprompted visits ("Welcome back!")
   - Show value accrued since last visit
   - Highlight what they would have missed if they hadn't come
6. Define measurement criteria for transition success:
   - Percentage of sessions initiated without external trigger
   - Time between sessions without external prompting
   - Notification opt-out rate remaining stable (users keep notifications because they value them, not because they depend on them)
7. Create a rollback plan: if transition is failing, how to re-engage with external triggers without resetting progress

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| trigger_map | markdown | Complete catalog of all external and internal triggers with ratings |
| coupling_matrix | markdown | Matrix mapping each trigger to its paired action and reinforcement mechanism |
| transition_plan | markdown | Phased strategy for migrating users from external to internal triggers |
| notification_strategy | markdown | Redesigned notification plan aligned with the transition timeline |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| All four external types covered | blocking | Paid, earned, relationship, and owned triggers must each be assessed |
| Internal trigger identified | blocking | At least one primary internal trigger must be identified with 5 Whys analysis |
| Coupling defined | blocking | Every trigger must have a paired action documented |
| Transition plan phased | blocking | The transition strategy must include at least three temporal phases |
| Measurement defined | warning | Success metrics for the transition must be quantified |
| Notification audit complete | warning | Current notifications must be categorized and assessed for fatigue |

---

## Handoff

- **On completion:** Hand to @nir-eyal for hook-model integration as the trigger phase of the Hook
- **On notification UX design:** Hand to @dan-mall for notification interface and interaction design
- **On marketing channel strategy:** Escalate to @design-chief for cross-functional coordination
- **On issues:** Escalate to @design-chief
