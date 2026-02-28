# Task: Microinteraction Design

**Task ID:** microinteractions
**Version:** 1.0
**Purpose:** Design microinteractions (Trigger, Rules, Feedback, Loops) for key UI moments
**Agent:** @luke-wroblewski
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Designs microinteractions for key UI moments using Dan Saffer's four-part framework: Trigger (what initiates it), Rules (what happens), Feedback (how the user knows), and Loops/Modes (what happens over time). Microinteractions are the subtle, contained product moments that handle a single task — toggling a setting, liking content, refreshing a feed, completing a form field. When designed well, they create a sense of direct manipulation, provide instant feedback, and build the feeling of quality that distinguishes great products from good ones. This task inventories interaction moments, designs each microinteraction systematically, specifies animations, and assesses performance impact.

```
INPUT (product_description, key_interactions, platform, brand_personality)
    |
[PHASE 1: INTERACTION MOMENT INVENTORY]
    -> Catalog all UI moments that benefit from microinteraction design
    |
[PHASE 2: TRIGGER-RULE DESIGN]
    -> Define triggers and behavioral rules for each microinteraction
    |
[PHASE 3: FEEDBACK SYSTEM]
    -> Design visual, haptic, and audio feedback for each interaction
    |
[PHASE 4: ANIMATION SPECIFICATION]
    -> Specify timing, easing, and motion parameters for each animation
    |
[PHASE 5: PERFORMANCE IMPACT ASSESSMENT]
    -> Evaluate and optimize performance cost of all microinteractions
    |
OUTPUT: Microinteraction spec with interaction inventory, trigger-rule definitions, feedback system, animation specs, and performance report
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Description of the product and its interaction model |
| key_interactions | list | Yes | List of primary user interactions to design microinteractions for |
| platform | string | Yes | Target platform: web, iOS, Android, cross-platform (affects available feedback channels) |
| brand_personality | string | Yes | Brand voice and personality traits that should be reflected in interaction feel (e.g., playful, professional, minimal) |
| existing_motion | string | No | Link to existing motion/animation guidelines or design system motion tokens |
| performance_budget | object | No | Performance constraints: target frame rate, JS execution budget, battery considerations |
| accessibility_requirements | list | No | Specific accessibility needs: reduced motion preferences, screen reader compatibility |

---

## Preconditions

- Key user interactions are identified and prioritized
- Platform capabilities and constraints are understood (haptic API availability, animation performance)
- Brand personality and tone are documented and approved
- Design system exists or is being developed alongside this work
- Development team has experience with the target platform's animation APIs
- Performance baselines are established for the target platform
- Accessibility requirements (WCAG 2.1 AA minimum) are acknowledged and planned for

---

## Steps

### Phase 1: Interaction Moment Inventory
1. Walk through every screen and identify moments where the user performs a discrete action: tap, swipe, toggle, submit, navigate, load, error
2. Categorize each moment by type:
   - **Data input:** Typing, selecting, toggling, adjusting values
   - **Navigation:** Transitioning between screens, opening/closing panels, scrolling
   - **System feedback:** Loading, success, error, empty state, notification arrival
   - **Social/engagement:** Liking, sharing, commenting, reacting
   - **State change:** Saving, deleting, archiving, completing, undoing
3. Score each moment on user frequency (how often it occurs) and emotional weight (how much the user cares about the outcome)
4. Prioritize: design microinteractions for high-frequency + high-emotion moments first
5. Identify moments where the current experience feels "dead" — no feedback, no animation, no acknowledgment of user action
6. Map signature moments: 2-3 interactions that should feel uniquely like this product (brand-defining microinteractions)
7. Produce a prioritized interaction moment inventory with category, frequency, emotional weight, and current state

### Phase 2: Trigger-Rule Design
1. For each prioritized microinteraction, define the trigger:
   - **User trigger:** What action initiates it (tap, long-press, swipe, hover, type, scroll to position)
   - **System trigger:** What system event initiates it (data loaded, timer expired, notification received, error occurred)
2. For each microinteraction, define the rules (what happens when triggered):
   - What changes on screen (position, size, color, opacity, content)
   - What data changes (state updated, API called, local storage written)
   - What constraints apply (can only trigger once, requires confirmation, has undo window)
3. Define edge cases for each rule:
   - What happens on rapid repeated triggers (debounce, throttle, queue)
   - What happens during slow network (optimistic update, loading state, timeout)
   - What happens on failure (rollback, error state, retry option)
4. Define loops: how does the microinteraction change over time or with repeated use?
   - First-time behavior vs. repeated behavior (first like might be bigger, subsequent likes are subtle)
   - Long-term evolution (achievement unlocked after 100th use of a feature)
5. Define modes: does the microinteraction behave differently in different contexts?
   - Light mode vs. dark mode visual adjustments
   - Accessibility mode (reduced motion, high contrast)
   - Offline mode behavior
6. Create a trigger-rule specification sheet for each microinteraction

### Phase 3: Feedback System
1. Design visual feedback for each microinteraction:
   - Color change (state indication: green for success, red for error, blue for active)
   - Shape change (button depression, checkbox morphing, icon transformation)
   - Motion (element moves, scales, rotates, fades to indicate state change)
   - Content change (counter increments, label updates, progress advances)
2. Design haptic feedback for mobile interactions (if platform supports):
   - Light tap: selection, toggle, navigation
   - Medium impact: confirmation, success, completion
   - Heavy impact: error, destructive action confirmation
   - Custom pattern: signature brand haptic for key moments
3. Design audio feedback where appropriate (use sparingly):
   - Subtle confirmation sounds for significant completions
   - Error sounds that are informative, not alarming
   - Ensure all audio has a mute/disable option
4. Design the feedback hierarchy: primary feedback channel for each interaction (visual is always required; haptic and audio are supplementary)
5. Design the reduced-motion alternative for every animated feedback: users with `prefers-reduced-motion` must still receive clear feedback (opacity/color change instead of animation)
6. Ensure feedback is perceivable: meets WCAG contrast requirements, is not color-only, is announced to screen readers where appropriate
7. Create a feedback specification matrix mapping each interaction to its visual, haptic, and audio feedback

### Phase 4: Animation Specification
1. Define the motion language: consistent easing curves, duration ranges, and direction conventions for this product
   - Easing: standard (ease-out for entrances, ease-in for exits, ease-in-out for state changes)
   - Duration: micro (100-150ms for instant feedback), small (200-300ms for state changes), medium (300-500ms for transitions)
   - Direction: spatial model (where elements come from and go to should be spatially consistent)
2. Specify animation parameters for each microinteraction:
   - Property animated (transform, opacity, color, dimensions)
   - Duration in milliseconds
   - Easing function (cubic-bezier values or named curve)
   - Delay (if any, for sequenced animations)
3. Design animation sequences for multi-step microinteractions: define choreography order, stagger timing, and parallel vs. sequential execution
4. Specify spring-based animations for natural-feeling interactions: tension, friction, and mass values for physics-based motion
5. Define interruptibility: can the animation be interrupted by a new user action? How does the interrupted animation resolve?
6. Specify animation implementation approach per platform:
   - Web: CSS transitions/animations, Web Animations API, or JavaScript (GSAP, Framer Motion)
   - iOS: UIView.animate, Core Animation, SwiftUI animation modifiers
   - Android: Property animators, MotionLayout, Compose animation APIs
7. Create an animation specification document with exact values, preview descriptions, and implementation notes

### Phase 5: Performance Impact Assessment
1. Inventory all animations and classify by rendering cost:
   - **Cheap (compositor-only):** transform, opacity — no layout or paint triggered
   - **Medium (paint):** color, background, box-shadow — triggers paint but not layout
   - **Expensive (layout):** width, height, margin, padding, font-size — triggers full reflow
2. Ensure all high-frequency animations use only compositor-friendly properties (transform and opacity)
3. Measure frame rate impact: all animations must maintain 60fps (16.67ms per frame) on target devices
4. Assess JavaScript animation overhead: total JS execution time for animations should not exceed 3ms per frame
5. Evaluate battery impact for mobile: continuous or looping animations should be paused when the app is backgrounded
6. Test on low-end devices: identify the minimum viable device and verify acceptable animation performance
7. Define progressive enhancement for animations: what is the graceful degradation path on low-performance devices?
8. Produce a performance impact report with per-animation cost classification, frame rate benchmarks, and optimization recommendations

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| interaction_inventory | markdown table | Prioritized catalog of all UI moments with category, frequency, and emotional weight |
| trigger_rule_specs | markdown | Per-interaction trigger, rules, edge cases, loops, and modes specification |
| feedback_matrix | markdown table | Visual, haptic, and audio feedback mapped to each interaction with reduced-motion alternatives |
| animation_specs | markdown | Animation parameters (duration, easing, properties) for each microinteraction |
| performance_report | markdown | Per-animation rendering cost, frame rate impact, and optimization recommendations |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Inventory complete | blocking | All key interactions must be cataloged with category and priority |
| Trigger-rules defined | blocking | Every prioritized microinteraction must have documented triggers, rules, and edge cases |
| Visual feedback designed | blocking | Every interaction must have visual feedback that is perceivable within 100ms |
| Reduced motion provided | blocking | Every animated feedback must have a prefers-reduced-motion alternative |
| 60fps maintained | blocking | All animations must maintain 60fps on mid-tier target devices |
| Compositor-only properties | warning | High-frequency animations should use only transform and opacity |
| Brand alignment | warning | Signature microinteractions should reflect the stated brand personality |

---

## Handoff

- **On completion:** Hand to @brad-frost for design system integration of motion tokens and animation components
- **On CSS animation implementation:** Hand to @andy-bell for CSS-based animation architecture
- **On onboarding animations:** Hand to self via `onboarding-flow` task for onboarding-specific interaction design
- **On mobile-specific interactions:** Hand to self via `mobile-first` task for touch and gesture optimization
- **On issues:** Escalate to @design-chief
