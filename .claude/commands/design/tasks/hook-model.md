# Task: Hook Model Design

**Task ID:** hook-model
**Version:** 1.0
**Purpose:** Design a complete Hook Model cycle (Trigger, Action, Variable Reward, Investment) for a product to build habit-forming experiences
**Agent:** @nir-eyal
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Designs a full Hook Model cycle based on Nir Eyal's framework from "Hooked." The Hook Model describes a four-phase loop that, when repeated, creates unprompted user engagement. This task walks through each phase systematically: identifying the internal trigger that drives the user, reducing friction so the desired action is effortless, designing variable rewards that satisfy the user's need while leaving them wanting more, and creating an investment that loads the next trigger. The result is a documented, validated hook cycle ready for product implementation.

```
INPUT (product_description, target_user, current_behavior, desired_behavior)
    |
[PHASE 1: INTERNAL TRIGGER DISCOVERY]
    -> Identify the emotion or situation that precedes product use
    |
[PHASE 2: ACTION DESIGN]
    -> Apply Fogg Behavior Model: motivation + ability + trigger
    |
[PHASE 3: VARIABLE REWARD DESIGN]
    -> Design rewards of the tribe, hunt, and self
    |
[PHASE 4: INVESTMENT LOOP]
    -> Define user investments that store value and load next trigger
    |
[PHASE 5: HOOK CYCLE VALIDATION]
    -> Validate the complete cycle for coherence and ethics
    |
OUTPUT: Complete Hook Model document with cycle diagram and implementation plan
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Description of the product or feature being analyzed |
| target_user | string | Yes | Primary user persona including demographics, goals, and pain points |
| current_behavior | string | Yes | What the user currently does to address their need (existing habits, workarounds) |
| desired_behavior | string | Yes | The target behavior the product should make habitual |
| usage_context | string | No | Environment or situation where the product is used |
| competitor_hooks | string | No | Known hook cycles from competing products for differentiation |

---

## Preconditions

- The product concept is defined enough to describe a core user interaction loop
- A target user persona exists or can be articulated with sufficient detail
- The desired behavior is specific and observable, not vague aspirational language
- The team has access to user research or can make informed assumptions about user motivations
- Ethical boundaries have been discussed: the product should genuinely improve the user's life
- Stakeholders understand the Hook Model framework or are open to learning it during the session

---

## Steps

### Phase 1: Internal Trigger Discovery

1. Identify the primary negative emotion the user experiences before turning to the product (boredom, loneliness, uncertainty, fear of missing out, frustration, confusion)
2. Map the user's existing coping behaviors: what do they currently do when this emotion arises?
3. Conduct a "5 Whys" analysis starting from the surface-level desire down to the root internal trigger
4. Document the trigger moment: the specific situation, time of day, emotional state, and environmental context
5. Validate that the internal trigger occurs frequently enough to support habit formation (at minimum weekly, ideally daily)
6. Articulate the internal trigger as a concise statement: "When [user] feels [emotion] in [context], they will [desired behavior]"

### Phase 2: Action Design (Fogg Behavior Model)

1. Define the simplest action the user can take in anticipation of the reward; this must be simpler than thought (e.g., scroll, tap, search)
2. Assess motivation factors using Fogg's core motivators: seek pleasure/avoid pain, seek hope/avoid fear, seek acceptance/avoid rejection
3. Map the six ability factors and identify which are bottlenecks: time, money, physical effort, brain cycles, social deviance, non-routine
4. Simplify the action by reducing the scarcest ability factor; document specific UX changes needed
5. Design the external trigger that prompts the action: what notification, CTA, or cue will the user see?
6. Validate that the action can be completed in under 3 seconds with zero ambiguity
7. Document the complete action sequence from trigger to first reward signal

### Phase 3: Variable Reward Design

1. Audit the current reward structure: what does the user get today after performing the action?
2. Design Rewards of the Tribe: social validation, cooperation, competition, or peer recognition elements
3. Design Rewards of the Hunt: search for resources, information, or deals that vary each time
4. Design Rewards of the Self: mastery, competence, completion, and personal achievement mechanics
5. Select the primary reward type that best aligns with the internal trigger and user motivation
6. Engineer variability into the reward: the user should never know exactly what they will get, but it must always satisfy the underlying need
7. Ensure the reward satisfies the original internal trigger while simultaneously leaving the user wanting more
8. Validate that rewards maintain user autonomy; forced engagement patterns signal manipulation, not facilitation

### Phase 4: Investment Loop

1. Identify what stored value the user can contribute: data, content, followers, reputation, or skill
2. Design the investment action that occurs after the reward, when motivation is highest
3. Ensure the investment requires effort but not so much that it creates friction or abandonment
4. Map how the investment improves the product for the user on their next visit (personalization, social capital, saved preferences)
5. Design how the investment loads the next external trigger (e.g., setting a reminder, inviting a friend, creating content others will respond to)
6. Document the compound value curve: how does the product get better the more the user invests?
7. Validate that the investment creates genuine switching costs without feeling coercive

### Phase 5: Hook Cycle Validation

1. Walk through the complete cycle end-to-end: trigger leads to action leads to variable reward leads to investment leads to next trigger
2. Verify cycle frequency: can this loop repeat at least weekly? Ideally daily or multiple times daily?
3. Test the cycle against three different user scenarios to ensure robustness
4. Run the cycle through the Manipulation Matrix ethics check (see ethics-check task)
5. Identify the weakest link in the cycle and propose strengthening strategies
6. Document the complete Hook Model as a one-page reference with cycle diagram
7. Create an implementation priority list: what to build first to validate the hook before full investment

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| hook_model_document | markdown | Complete Hook Model with all four phases documented and rationale |
| cycle_diagram | ascii/markdown | Visual representation of the trigger-action-reward-investment loop |
| implementation_plan | markdown | Prioritized list of features to build, ordered by hook validation priority |
| ethics_assessment | markdown | Brief ethical evaluation of the designed hook cycle |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Internal trigger identified | blocking | A specific emotion and context must be documented as the internal trigger |
| Action simplicity | blocking | The core action must be completable in under 3 seconds with minimal cognitive load |
| Reward variability | blocking | At least one reward type must include genuine variability, not just random content |
| Investment loads trigger | blocking | The investment phase must demonstrably load the next trigger in the cycle |
| Cycle coherence | blocking | All four phases must connect logically in a continuous loop |
| Ethics check passed | warning | The hook should classify as Facilitator in the Manipulation Matrix |
| Frequency validation | warning | The cycle should support at minimum weekly repetition |

---

## Handoff

- **On completion:** Hand to @design-chief for integration into product design strategy
- **On ethics concerns:** Hand to @nir-eyal for ethics-check task before proceeding
- **On UX implementation:** Hand to @dan-mall for interface design of hook touchpoints
- **On issues:** Escalate to @design-chief
