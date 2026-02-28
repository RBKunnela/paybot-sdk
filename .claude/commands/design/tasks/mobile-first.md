# Task: Mobile-First Design

**Task ID:** mobile-first
**Version:** 1.0
**Purpose:** Apply mobile-first design principles to prioritize content and interactions for constrained screens
**Agent:** @luke-wroblewski
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Applies Luke Wroblewski's mobile-first design methodology to ensure products are designed for the most constrained environment first, then progressively enhanced for larger screens. This approach forces content prioritization, eliminates feature bloat, and leverages unique mobile capabilities (touch, GPS, camera, accelerometer). The result is a focused, performant experience that scales gracefully across all device classes.

```
INPUT (product_description, screen_inventory, content_hierarchy, target_devices)
    |
[PHASE 1: CONTENT PRIORITY AUDIT]
    -> Rank all content and features by user value on constrained screens
    |
[PHASE 2: CONSTRAINT-FIRST DESIGN]
    -> Design core experience within mobile constraints (viewport, bandwidth, input)
    |
[PHASE 3: PROGRESSIVE ENHANCEMENT STRATEGY]
    -> Define how experience layers on for tablet, desktop, and large screens
    |
[PHASE 4: TOUCH TARGET OPTIMIZATION]
    -> Size and space interactive elements for reliable touch input
    |
[PHASE 5: PERFORMANCE BUDGET]
    -> Set weight and timing budgets per screen to ensure fast mobile delivery
    |
OUTPUT: Mobile-first design spec with content priority matrix, enhancement map, and performance budget
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Description of the product, its purpose, and primary user goals |
| screen_inventory | list | Yes | List of all screens or views in the product requiring mobile-first treatment |
| content_hierarchy | object | Yes | Current content and feature ranking by business and user priority |
| target_devices | list | Yes | Primary device classes and breakpoints to design for (e.g., phone, tablet, desktop) |
| analytics_data | object | No | Existing device usage analytics (screen sizes, OS distribution, connection speeds) |
| existing_designs | string | No | Link to current desktop-first designs that need mobile-first redesign |
| performance_baseline | object | No | Current performance metrics (page weight, load time, Time to Interactive) |

---

## Preconditions

- Product description and user goals are well-defined and approved by stakeholders
- Screen inventory is complete and covers all primary user flows
- Content hierarchy has been reviewed by product owner or equivalent
- Target device list reflects actual or projected user device distribution
- Team has agreed to adopt mobile-first as the design methodology for this work
- Design system or brand guidelines are available for visual constraint alignment
- Development team is aware of and supports the mobile-first implementation approach

---

## Steps

### Phase 1: Content Priority Audit
1. List every piece of content and every feature across all screens in the inventory
2. Score each item on two axes: user value (critical, important, nice-to-have) and frequency of use (daily, weekly, rare)
3. Create a content priority matrix mapping each item to its score; items in the bottom-right quadrant are candidates for removal or demotion
4. Identify content that is desktop-only habit (e.g., sidebar widgets, hover tooltips) and evaluate whether it serves a real user need
5. Interview or survey 3-5 representative users (or review existing research) to validate the priority ranking
6. Produce a final ranked content list per screen: Tier 1 (must show on mobile), Tier 2 (show on tablet+), Tier 3 (desktop enhancement only)
7. Document content that was removed entirely and the rationale for each removal decision
8. Get stakeholder sign-off on the content priority matrix before proceeding

### Phase 2: Constraint-First Design
1. Define the smallest target viewport (typically 320px CSS width) and design the Tier 1 experience within it
2. Apply a single-column layout for all primary screens; no horizontal scrolling, no multi-column grids on mobile
3. Design navigation for thumb-zone reachability: primary actions in bottom 60% of screen, secondary in top 40%
4. Replace hover-dependent interactions with tap-compatible alternatives (long-press menus, swipe actions, toggle reveals)
5. Design for intermittent connectivity: identify which features need offline support and plan for loading/empty states
6. Reduce cognitive load: limit choices per screen to 5-7 items, use progressive disclosure for secondary options
7. Design input interactions for mobile keyboards: appropriate input types (tel, email, number), minimal free-text entry
8. Create wireframes or low-fidelity mockups for all Tier 1 screens at the smallest breakpoint

### Phase 3: Progressive Enhancement Strategy
1. Define breakpoint thresholds for each device class (e.g., 320-767px phone, 768-1023px tablet, 1024px+ desktop)
2. For each breakpoint, specify which Tier 2 and Tier 3 content becomes visible and how it is integrated
3. Design layout transformations: single-column to two-column at tablet, multi-column grid at desktop
4. Plan interaction enhancements: hover states, keyboard shortcuts, drag-and-drop at desktop breakpoints
5. Specify typography scale adjustments across breakpoints (base size, heading ratios, line lengths)
6. Define image and media strategy: art direction changes, resolution switching, lazy loading thresholds
7. Document component behavior changes across breakpoints in a responsive behavior matrix
8. Ensure no mobile functionality is lost at larger breakpoints; enhancement adds, never subtracts

### Phase 4: Touch Target Optimization
1. Audit all interactive elements (buttons, links, form fields, toggles) against minimum touch target size (44x44 CSS pixels per WCAG 2.5.8)
2. Ensure minimum 8px spacing between adjacent touch targets to prevent mis-taps
3. Map the thumb zone for one-handed use (comfortable, stretch, hard-to-reach areas) and place primary actions in the comfortable zone
4. Design touch feedback states: active/pressed state visible within 100ms, distinct from hover state
5. Evaluate gesture-based interactions (swipe, pinch, long-press) and document discoverability mechanisms for each
6. Test interactive element sizing with users who have varying hand sizes and motor abilities
7. Create a touch target compliance report listing all elements, their sizes, spacing, and pass/fail status
8. Provide remediation guidance for any elements that fail touch target requirements

### Phase 5: Performance Budget
1. Set a total page weight budget per screen (recommended: under 500KB for initial load on mobile)
2. Define Time to Interactive (TTI) target: under 3 seconds on a mid-tier mobile device over 3G
3. Allocate the weight budget across asset types: HTML, CSS, JavaScript, images, fonts, third-party scripts
4. Identify the heaviest assets in the current design and propose optimization strategies (compression, lazy loading, code splitting)
5. Set a web font budget: maximum 2 font families, 4 weights total, with system font fallback strategy
6. Define image optimization requirements: format (WebP/AVIF with fallback), maximum dimensions per breakpoint, lazy loading threshold
7. Establish a third-party script policy: each script must justify its weight against user value delivered
8. Create a performance budget document with per-screen targets, monitoring thresholds, and alert triggers

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| content_priority_matrix | markdown table | Ranked content list per screen with tier assignments and removal rationale |
| mobile_wireframes | design file | Low-fidelity wireframes for all screens at the smallest breakpoint |
| progressive_enhancement_map | markdown | Breakpoint-by-breakpoint specification of content and interaction additions |
| touch_target_report | markdown table | Compliance audit of all interactive elements with pass/fail status |
| performance_budget | markdown | Per-screen weight and timing budgets with asset allocation breakdown |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Content prioritized | blocking | Every screen must have a Tier 1/2/3 content classification with stakeholder approval |
| Smallest viewport designed | blocking | All primary screens must have wireframes at the smallest target breakpoint |
| Touch targets compliant | blocking | All interactive elements must meet 44x44px minimum with 8px spacing |
| Performance budget set | blocking | Every screen must have a defined weight budget and TTI target |
| Progressive enhancement documented | warning | Enhancement map should cover at least 3 breakpoint tiers |
| Offline consideration | warning | At least critical screens should have offline/loading state designs |

---

## Handoff

- **On completion:** Hand to @brad-frost for atomic design decomposition of mobile-first components
- **On form-heavy screens:** Hand to self via `form-optimize` task for form-specific optimization
- **On conversion flows:** Hand to self via `conversion-arch` task for conversion funnel design
- **On accessibility concerns:** Hand to @accessibility-lead for WCAG compliance review
- **On issues:** Escalate to @design-chief
