# Task: Onboarding Flow Design

**Task ID:** onboarding-flow
**Version:** 1.0
**Purpose:** Design onboarding that minimizes time-to-value through progressive disclosure and empty states
**Agent:** @luke-wroblewski
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Designs onboarding experiences that minimize the time between a user's first interaction and their first moment of realized value. Rather than front-loading tutorials or feature tours, this approach uses progressive disclosure, meaningful empty states, and contextual guidance to teach through doing. The goal is to get users to their "aha moment" as fast as possible while building the habits that drive long-term retention. Based on proven patterns from products that have optimized activation rates through systematic onboarding design.

```
INPUT (product_description, key_features, aha_moment, target_user_type)
    |
[PHASE 1: VALUE MOMENT MAPPING]
    -> Identify the aha moment and map the shortest path to reach it
    |
[PHASE 2: PROGRESSIVE DISCLOSURE STRATEGY]
    -> Layer feature introduction to avoid overwhelming new users
    |
[PHASE 3: EMPTY STATE DESIGN]
    -> Design empty states that educate and motivate action
    |
[PHASE 4: CONTEXTUAL GUIDANCE]
    -> Place help and hints at the point of need, not before
    |
[PHASE 5: ONBOARDING METRICS]
    -> Define activation metrics and measurement framework
    |
OUTPUT: Onboarding design spec with value map, disclosure plan, empty states, guidance system, and metrics framework
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Description of the product, its core value, and what problem it solves |
| key_features | list | Yes | List of primary features with descriptions of user value each delivers |
| aha_moment | string | Yes | The specific moment when a user first experiences the product's core value |
| target_user_type | string | Yes | Primary user persona: technical/non-technical, beginner/expert, individual/team |
| current_onboarding | string | No | Description of existing onboarding flow (if any) for comparison |
| activation_rate | number | No | Current percentage of new users who reach the aha moment within first session |
| churn_data | object | No | Data on when and why users abandon during the first 7 days |
| competitor_onboarding | list | No | Notes on how competitors handle onboarding for benchmarking |

---

## Preconditions

- The product's core value proposition is validated and clearly articulated
- The aha moment is identified and agreed upon by product and design teams
- Key features are prioritized by user value and business importance
- Target user type is defined with enough detail to inform design decisions
- The product has a working or near-working build to reference for screen flows
- Analytics infrastructure exists or is planned to track onboarding metrics
- Stakeholders agree that onboarding optimization is a priority for the current phase

---

## Steps

### Phase 1: Value Moment Mapping
1. Define the aha moment precisely: what does the user see, do, or experience that makes them understand the product's value?
2. Map the current path from signup/first-open to the aha moment: count every step, screen, decision, and data entry required
3. Calculate the current time-to-value: how many minutes/actions does it take a new user to reach the aha moment?
4. Identify every gate between the user and the aha moment: account creation, profile setup, configuration, data import, team invitation
5. For each gate, evaluate: is this gate required before value delivery, or can it be deferred?
6. Design the shortest possible path to the aha moment: remove or defer every gate that is not strictly required
7. Create a "first five minutes" storyboard showing exactly what the user sees and does in their first 300 seconds
8. Define a secondary aha moment for users who cannot reach the primary one quickly (e.g., sample data, demo mode, sandbox)
9. Produce a value moment map showing the optimized path with time estimates for each step

### Phase 2: Progressive Disclosure Strategy
1. Categorize all features into disclosure tiers:
   - **Tier 1 (Day 1):** Features essential to reach the aha moment; visible immediately
   - **Tier 2 (Week 1):** Features that enhance the core experience; introduced after activation
   - **Tier 3 (Month 1):** Power features; revealed as user demonstrates proficiency
2. For each Tier 1 feature, design the minimal viable interaction: the simplest way to use it successfully
3. Design the disclosure triggers for Tier 2 features: what user behavior or milestone unlocks each feature?
4. Design the disclosure triggers for Tier 3 features: proficiency signals (usage frequency, feature adoption) that indicate readiness
5. Specify how newly disclosed features are introduced: tooltip, banner, badge, inline prompt, or contextual suggestion
6. Ensure disclosed features do not clutter the interface: use progressive reveal patterns (expandable sections, advanced menus)
7. Plan the "complexity budget" per screen: no screen should introduce more than 2 new concepts simultaneously
8. Create a disclosure timeline document mapping each feature to its tier, trigger, and introduction method

### Phase 3: Empty State Design
1. Inventory every empty state in the product: screens or components that have no content when a user first encounters them
2. For each empty state, design content that serves three purposes: educate (what goes here), motivate (why add content), and instruct (how to add content)
3. Design empty states with actionable CTAs: the empty state itself should be the starting point for the first action
4. Create sample/placeholder content that demonstrates what the populated state will look like (not lorem ipsum, but realistic examples)
5. Design empty states for collaborative features: "Invite your team to see activity here" with a direct invite action
6. Ensure empty states are visually engaging but not distracting: use illustrations sparingly, focus on the action
7. Design the transition from empty to populated state: the first item added should feel like an achievement
8. Create empty state specifications for every identified instance: illustration/icon, headline, body copy, CTA text, and CTA action

### Phase 4: Contextual Guidance
1. Reject the traditional product tour model: no modal walkthroughs, no forced tours, no "skip tutorial" patterns
2. Design point-of-need guidance: help appears when and where the user needs it, triggered by their current context
3. Design contextual tooltips for complex UI elements: appear on first encounter, dismissible, with "don't show again" option
4. Create inline coach marks for multi-step processes: highlight the current step without obscuring the interface
5. Design a persistent but unobtrusive help system: searchable help, contextual links, keyboard shortcut discoverability
6. Plan for error-state guidance: when a user makes a mistake, the error message itself should teach the correct approach
7. Design progressive complexity hints: as users repeat actions, hints evolve from basic ("Click here to add") to advanced ("Try keyboard shortcut Ctrl+N")
8. Create a guidance inventory mapping each guidance element to its trigger, content, and dismissal behavior

### Phase 5: Onboarding Metrics
1. Define the activation metric: the specific measurable action that indicates a user has reached the aha moment
2. Define time-to-activation: the target time from signup to activation (aggressive: under 5 minutes, standard: under first session)
3. Identify 5-8 onboarding funnel steps between signup and activation, each with a measurable event
4. Define Day 1, Day 7, and Day 30 retention targets correlated with onboarding completion
5. Design a cohort analysis framework: compare activation and retention rates across onboarding versions
6. Specify analytics events for every onboarding interaction: step viewed, step completed, step skipped, guidance dismissed
7. Define the "struggling user" signal: what pattern of behavior indicates a user is stuck and needs intervention (email, in-app prompt)?
8. Create an onboarding metrics dashboard specification with key charts: activation funnel, time-to-activation distribution, retention curves by cohort
9. Propose success criteria for the onboarding design: minimum activation rate and retention improvement required to consider the design successful

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| value_moment_map | markdown + diagram | Optimized path from signup to aha moment with time estimates and gate analysis |
| disclosure_timeline | markdown table | Feature disclosure tiers, triggers, and introduction methods mapped to user journey |
| empty_state_specs | markdown | Specifications for every empty state: content, illustration, CTA, and transition behavior |
| guidance_inventory | markdown table | Contextual guidance elements with triggers, content, and dismissal rules |
| metrics_framework | markdown | Activation metric, funnel events, retention targets, and dashboard specification |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Aha moment defined | blocking | A specific, measurable aha moment must be identified and agreed upon |
| Shortest path designed | blocking | The optimized path to aha moment must have fewer gates than the current flow |
| Empty states designed | blocking | Every empty state must have educational content and an actionable CTA |
| Activation metric set | blocking | A quantitative activation metric must be defined with a target threshold |
| Progressive disclosure planned | warning | All features should be categorized into disclosure tiers with defined triggers |
| No forced tours | warning | Onboarding should not include modal product tours or forced walkthroughs |
| Retention targets set | warning | Day 1, Day 7, and Day 30 retention targets should be defined |

---

## Handoff

- **On completion:** Hand to @brad-frost for component design of empty states, tooltips, and coach marks
- **On conversion flow integration:** Hand to self via `conversion-arch` task for signup-to-activation conversion optimization
- **On microinteraction needs:** Hand to self via `microinteractions` task for onboarding animation and feedback design
- **On mobile onboarding:** Hand to self via `mobile-first` task for mobile-specific onboarding constraints
- **On issues:** Escalate to @design-chief
