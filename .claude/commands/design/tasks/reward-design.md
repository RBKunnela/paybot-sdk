# Task: Variable Reward Design

**Task ID:** reward-design
**Version:** 1.0
**Purpose:** Design a variable reward system using Nir Eyal's three reward types — Rewards of the Tribe, the Hunt, and the Self — to sustain user engagement
**Agent:** @nir-eyal
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Designs a comprehensive variable reward system based on the principle that variability drives engagement. Predictable rewards lose their appeal; variable rewards create a focused state of desire that keeps users coming back. This task audits the current reward structure, selects the most appropriate reward types for the product, engineers variability into each reward, and designs a reward schedule that sustains long-term engagement without manipulation. The framework draws from B.F. Skinner's variable ratio reinforcement research as applied through Nir Eyal's categorization into tribe (social), hunt (resources), and self (mastery).

```
INPUT (product_description, user_goals, current_rewards)
    |
[PHASE 1: CURRENT REWARD AUDIT]
    -> Catalog existing rewards and assess their variability
    |
[PHASE 2: REWARD TYPE SELECTION]
    -> Choose primary and secondary reward types for the product
    |
[PHASE 3: VARIABILITY ENGINEERING]
    -> Design variability into each reward to prevent hedonic adaptation
    |
[PHASE 4: REWARD SCHEDULE DESIGN]
    -> Define timing, frequency, and escalation of rewards
    |
OUTPUT: Variable reward system document with reward map and implementation guide
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Description of the product or feature being designed |
| user_goals | string | Yes | What users are trying to achieve when they use the product |
| current_rewards | string | Yes | Existing reward mechanisms in the product (likes, points, content, feedback, etc.) |
| internal_trigger | string | No | The emotional driver identified from hook-model analysis |
| engagement_data | string | No | Current engagement metrics showing where users drop off or disengage |
| reward_constraints | string | No | Budget, technical, or ethical constraints on reward design |

---

## Preconditions

- The product has a defined core action that users perform repeatedly
- User goals are understood well enough to identify what constitutes a meaningful reward
- The team recognizes the difference between variable rewards and random rewards; variability must still satisfy the user's core need
- Existing reward mechanisms (if any) have been documented even if informal
- The team is committed to ethical reward design that respects user autonomy

---

## Steps

### Phase 1: Current Reward Audit

1. Catalog every reward currently delivered to the user, including implicit rewards (content loaded, data displayed, status updated)
2. Classify each reward by type: tribe (social), hunt (material/informational), self (mastery/completion)
3. Assess variability: rate each reward as fixed (same every time), semi-variable (some variation), or fully variable (different each time)
4. Identify "dead rewards" — rewards that users have become desensitized to due to predictability or low value
5. Map reward timing: when does each reward appear relative to the user's action? Immediate, delayed, or unpredictable?
6. Evaluate reward-trigger alignment: does the reward satisfy the internal trigger that drove the user to act?
7. Document reward gaps: where users perform actions that receive no feedback, acknowledgment, or reward
8. Calculate the reward density: how many rewards per session does the average user experience?

### Phase 2: Reward Type Selection

1. **Rewards of the Tribe** — Evaluate opportunities for social rewards:
   - Peer validation: likes, upvotes, comments, reactions
   - Cooperation: shared goals, team achievements, collaborative streaks
   - Competition: leaderboards, rankings, comparative performance
   - Social proof: follower counts, endorsements, testimonials
   - Assess: does the product have a social component? Can one be added authentically?
2. **Rewards of the Hunt** — Evaluate opportunities for search-and-find rewards:
   - Information: feeds, search results, news, updates
   - Resources: deals, savings, coupons, rare items
   - Discovery: new content, recommendations, surprises
   - Assess: does the product involve seeking, scrolling, or exploring?
3. **Rewards of the Self** — Evaluate opportunities for mastery rewards:
   - Completion: checklists, progress bars, streaks, badges
   - Competence: skill levels, personal bests, unlocked features
   - Consistency: maintaining habits, daily streaks, commitment records
   - Assess: does the product involve personal growth, learning, or achievement?
4. Select the primary reward type that most closely aligns with the user's internal trigger and core motivation
5. Select one or two secondary reward types to create a multi-layered reward experience
6. Document the rationale for each selection, connecting reward type to user psychology

### Phase 3: Variability Engineering

1. For each selected reward type, identify the fixed element (what the user can always count on) and the variable element (what changes each time)
2. Design variability along three dimensions:
   - **Content variability**: what the user receives changes (different posts, different results, different feedback)
   - **Magnitude variability**: how much they receive changes (sometimes a small win, sometimes a big one)
   - **Timing variability**: when they receive it changes (sometimes instant, sometimes after a delay)
3. Apply the "slot machine principle" carefully: the user should always get something, but the quality and nature should vary
4. Guard against dark patterns: variability should create delight, not anxiety; the user should feel satisfied, not manipulated
5. Test for hedonic adaptation resistance: will the variability mechanism itself become predictable over time? If so, add a meta-variability layer
6. Design "jackpot moments" — rare, highly rewarding experiences that create memorable peaks (per the Peak-End Rule)
7. Ensure the variable reward still resolves the user's original need; variability that distracts from the core value proposition is harmful
8. Document the variability mechanism for each reward with specific examples of different outcomes

### Phase 4: Reward Schedule Design

1. Define the reward schedule type: continuous (every action rewarded), variable ratio (rewarded after an unpredictable number of actions), or variable interval (rewarded at unpredictable time intervals)
2. For new users: design a denser reward schedule that quickly demonstrates value and builds the initial habit
3. For returning users: design a sparser, more variable schedule that maintains engagement without creating dependency
4. For power users: design escalating rewards that recognize investment and deepen commitment
5. Map the reward schedule across the user lifecycle: onboarding, activation, retention, and resurrection phases
6. Define reward escalation: how do rewards compound or evolve as the user invests more in the product?
7. Set boundary conditions: maximum rewards per session to prevent obsessive use, minimum rewards per session to prevent abandonment
8. Design "reward droughts" intentionally — brief periods of lower reward density followed by a burst, which research shows increases perceived value
9. Create a reward calendar or schedule document that maps reward delivery across a typical user week

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| reward_system_document | markdown | Complete variable reward design with types, variability, and schedule |
| reward_map | markdown | Visual mapping of all rewards by type, variability, and lifecycle phase |
| implementation_guide | markdown | Technical specification for implementing each reward mechanism |
| ethics_review | markdown | Assessment of reward design against manipulation and autonomy criteria |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Reward types identified | blocking | At least one primary and one secondary reward type must be selected with rationale |
| Variability designed | blocking | Each reward must have a documented variability mechanism, not just fixed outcomes |
| Schedule defined | blocking | A reward schedule must be specified for at least three lifecycle phases |
| Trigger alignment | blocking | Variable rewards must demonstrably satisfy the internal trigger that drives usage |
| Autonomy preserved | warning | Reward design must not employ coercive patterns (loss aversion traps, guilt mechanics) |
| Hedonic adaptation addressed | warning | The design should include strategies to prevent reward desensitization over time |

---

## Handoff

- **On completion:** Hand to @nir-eyal for hook-model integration if designing a full hook cycle
- **On gamification implementation:** Hand to @dev for technical reward system implementation
- **On UX design of reward surfaces:** Hand to @dan-mall for interface design of reward moments
- **On ethics concerns:** Hand to @nir-eyal for ethics-check assessment
- **On issues:** Escalate to @design-chief
