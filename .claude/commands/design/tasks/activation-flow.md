# Task: Activation Optimization

**Task ID:** activation-flow
**Version:** 1.0
**Purpose:** Optimize the activation flow to minimize time-to-value and accelerate the "aha moment" for new users
**Agent:** @sean-ellis
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Optimizes the user activation flow — the critical journey from signup to the moment a new user first experiences the core product value (the "aha moment"). Activation is the most important lever in the AARRR funnel because it compounds through every subsequent stage: users who activate retain better, pay more, and refer more. This task identifies the aha moment, audits the current flow, removes friction, and designs experiments to increase activation rate.

```
INPUT (product_description, onboarding_steps, current_activation_rate, aha_moment)
    |
[PHASE 1: AHA MOMENT IDENTIFICATION]
    -> Define the specific action or experience that correlates with long-term retention
    |
[PHASE 2: CURRENT FLOW AUDIT]
    -> Map every step from signup to aha moment and measure drop-off
    |
[PHASE 3: FRICTION REMOVAL]
    -> Identify and eliminate unnecessary steps, confusion, and barriers
    |
[PHASE 4: ACTIVATION EXPERIMENT DESIGN]
    -> Design experiments to increase activation rate
    |
OUTPUT: Optimized activation blueprint with aha moment definition, friction map, and experiment plan
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Description of the product, its core value proposition, and primary use cases |
| onboarding_steps | list | Yes | Current sequence of steps a new user goes through from signup to first value (include each screen, form, action) |
| current_activation_rate | number | Yes | Percentage of signed-up users who reach the defined activation event (or best estimate) |
| aha_moment | string | No | The hypothesized aha moment if already identified; if not provided, Phase 1 will define it |
| retention_data | object | No | Retention curves comparing users who completed specific actions vs those who did not |
| drop_off_data | object | No | Funnel data showing where users abandon the onboarding flow |
| user_feedback | string | No | Qualitative feedback from new users about the onboarding experience |
| time_to_activate | number | No | Average time from signup to activation event in minutes or days |

---

## Preconditions

- Product has a defined signup flow and at least a basic onboarding experience
- At least 50 users have gone through the current onboarding flow to provide baseline data
- Analytics tracking exists or can be added to measure each step of the onboarding funnel
- The team has the ability to modify the onboarding flow (UI changes, step reordering, content updates)
- There is a willingness to remove features or steps from onboarding if data supports it
- Access to user feedback channels (surveys, interviews, support tickets) for qualitative insights

---

## Steps

### Phase 1: Aha Moment Identification
1. If an aha moment is provided, validate it by checking whether users who reach this moment retain significantly better than those who do not
2. If no aha moment is defined, analyze the product to identify candidate aha moments — specific user actions that likely correlate with understanding the core value:
   - What is the simplest action that demonstrates the product's unique value?
   - What action, once completed, makes users unlikely to leave?
   - What do retained users do in their first session that churned users do not?
3. List 3-5 candidate aha moments with rationale for each
4. For each candidate, define the behavioral metric: the specific event and threshold (e.g., "created 3 documents," "invited 1 teammate," "completed first analysis")
5. If retention data is available, compare retention curves for users who completed each candidate action vs those who did not; select the action with the strongest retention correlation
6. Define the final aha moment with precision: the exact action, the minimum threshold, and the time window within which it should occur
7. Calculate the current aha moment completion rate: what percentage of signups reach this moment within the defined time window

### Phase 2: Current Flow Audit
1. Map every step of the current signup-to-activation journey as a numbered sequence: each screen, form field, action, decision point, and wait state
2. For each step, document: what the user sees, what action is required, what information is requested, and what value (if any) is delivered
3. Classify each step as one of: essential (directly contributes to reaching aha moment), supportive (helps but could be deferred), or unnecessary (adds friction without clear value)
4. Measure or estimate the drop-off rate at each step; identify the "cliff" — the step with the highest absolute drop-off
5. Calculate the time cost of each step: how many seconds or minutes does each step add to the path to activation
6. Identify cognitive load at each step: how much thinking, decision-making, or information retrieval is required from the user
7. Map the emotional journey: where does the user feel confused, frustrated, overwhelmed, or bored
8. Identify the "setup-to-payoff ratio" — how much setup work is required before the user receives any value; a ratio above 3:1 (3 setup steps per value moment) indicates a problem
9. Document the total time-to-value: minutes from signup completion to aha moment for the average user and for the 90th percentile user

### Phase 3: Friction Removal
1. Apply the "remove, defer, or simplify" framework to every non-essential step:
   - **Remove:** Eliminate steps that do not contribute to activation and are not legally required
   - **Defer:** Move nice-to-have steps (profile completion, preferences, integrations) to after the aha moment
   - **Simplify:** Reduce form fields, use smart defaults, auto-detect information, pre-populate data
2. Design a "straight-line path" — the minimum number of steps from signup to aha moment with zero detours
3. Identify opportunities to deliver value earlier: can the user see a preview of the product value before completing signup
4. Design progressive disclosure: reveal complexity gradually rather than upfront; start with the simplest possible flow
5. Replace empty states with pre-populated examples, templates, or sample data that let users experience value immediately
6. Identify technical friction: slow loading times, confusing error messages, broken flows on specific devices or browsers
7. Design contextual guidance: tooltips, inline help, and progress indicators that reduce cognitive load without adding steps
8. Create the optimized flow: a step-by-step redesign of the activation path incorporating all friction removals
9. Calculate the projected improvement: estimated new activation rate based on the friction removed

### Phase 4: Activation Experiment Design
1. Design 5-8 experiments targeting activation rate improvement, ordered by expected impact:
   - Experiment types: step removal, step reordering, copy changes, default changes, empty state replacement, guided tours, social proof, urgency/motivation
2. For each experiment, create a brief containing:
   - **Hypothesis:** Specific cause-and-effect statement ("If we remove the profile setup step, activation rate will increase by X% because users will reach the aha moment faster")
   - **Metric:** Primary metric (activation rate) and guardrail metrics (completion quality, retention, support tickets)
   - **Design:** A/B test, before/after, or multivariate; with control and variant descriptions
   - **Sample size:** Required number of new signups to reach statistical significance
   - **Duration:** Estimated time to complete the experiment based on current signup volume
3. Design a "nuclear option" experiment: what if onboarding was reduced to a single step or eliminated entirely; what would happen
4. Design an activation email/notification sequence for users who sign up but do not activate: timing, content, and call-to-action for each message
5. Define the activation metrics dashboard: activation rate by cohort, time-to-activate distribution, step-by-step funnel, activation by acquisition source
6. Create the experiment calendar with sequencing, avoiding conflicting experiments on the same user segment
7. Define success criteria: what activation rate improvement justifies shipping each experiment to all users

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| aha_moment_definition | markdown | Precise definition of the aha moment with behavioral metric, threshold, and retention correlation evidence |
| flow_audit | markdown | Complete audit of current activation flow with step classification, drop-off data, and friction map |
| optimized_flow | markdown | Redesigned activation flow with friction removals, deferred steps, and projected improvement |
| experiment_plan | markdown | Prioritized experiments with briefs, sample sizes, and calendar |
| activation_dashboard_spec | markdown | Metrics dashboard specification for ongoing activation monitoring |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Aha moment defined | blocking | A specific, measurable aha moment must be identified with retention correlation evidence or clear rationale |
| Full flow audited | blocking | Every step from signup to activation must be mapped with classification and drop-off estimates |
| Friction identified | blocking | At least 3 specific friction points must be identified with removal or mitigation strategies |
| Experiments designed | blocking | At least 5 experiments must have complete briefs with hypotheses and success metrics |
| Time-to-value measured | blocking | Current time-to-value must be calculated with a target for the optimized flow |
| User perspective maintained | warning | Audit should include qualitative user feedback or empathy mapping, not just quantitative analysis |
| Guardrail metrics defined | warning | Experiments should include guardrail metrics to prevent activation rate gaming at the cost of quality |

---

## Handoff

- **On completion:** Hand to @pm for story creation to implement the optimized activation flow
- **On retention issues discovered:** Hand to @sean-ellis for growth-engine task focusing on retention stage
- **On UX redesign needs:** Hand to @sophia-prater for object model review of the onboarding experience
- **On issues:** Escalate to @design-chief
