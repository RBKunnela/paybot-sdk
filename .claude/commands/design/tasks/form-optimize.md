# Task: Form Optimization

**Task ID:** form-optimize
**Version:** 1.0
**Purpose:** Optimize form UX for completion rate using data-driven field reduction and interaction patterns
**Agent:** @luke-wroblewski
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Applies data-driven form design principles from Luke Wroblewski's extensive research on web forms to maximize completion rates and minimize user frustration. Every unnecessary field, confusing label, or delayed validation is friction that drives abandonment. This task systematically audits form fields, optimizes labeling and layout, implements real-time validation, leverages smart defaults, and projects completion rate improvements based on established research benchmarks.

```
INPUT (form_purpose, current_fields, completion_rate, target_platform)
    |
[PHASE 1: FIELD AUDIT]
    -> Eliminate unnecessary fields; justify every remaining field
    |
[PHASE 2: LABEL STRATEGY]
    -> Select optimal label placement and style for context
    |
[PHASE 3: VALIDATION DESIGN]
    -> Design inline, real-time validation with clear error recovery
    |
[PHASE 4: SMART DEFAULTS & AUTOCOMPLETE]
    -> Reduce manual input through intelligent defaults and autofill
    |
[PHASE 5: COMPLETION RATE PROJECTION]
    -> Estimate improvement based on changes and research benchmarks
    |
OUTPUT: Optimized form spec with field inventory, label strategy, validation rules, and projected completion rate
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| form_purpose | string | Yes | What the form achieves (registration, checkout, lead capture, data entry, etc.) |
| current_fields | list | Yes | List of all current form fields with their types and required/optional status |
| completion_rate | number | No | Current form completion rate as a percentage (if analytics are available) |
| target_platform | string | Yes | Primary platform: mobile, desktop, or responsive (affects label strategy) |
| abandonment_data | object | No | Field-level abandonment data showing where users drop off |
| user_segments | list | No | Different user types who fill this form (affects smart default strategy) |
| regulatory_requirements | list | No | Fields required by law or regulation that cannot be removed (GDPR, KYC, etc.) |

---

## Preconditions

- The form purpose and business goals are clearly defined
- Current field list is complete and accurate
- Product owner has authority to approve field removal
- Target platform is confirmed and representative test devices are available
- If completion rate data exists, it is recent (within 90 days) and statistically significant
- Development team can implement inline validation and autocomplete features
- Legal/compliance has been consulted on any regulatory field requirements

---

## Steps

### Phase 1: Field Audit
1. List every field in the current form with its label, input type, required/optional status, and data purpose
2. For each field, answer: "Can we complete the transaction without this data?" — if yes, mark as removal candidate
3. For each field, answer: "Can we obtain this data later, after the primary conversion?" — if yes, mark as deferral candidate
4. For each field, answer: "Can we derive this data from another field?" (e.g., city from zip code) — if yes, mark as derivable
5. Classify remaining fields: essential (blocks transaction), important (improves experience), optional (nice-to-have)
6. Propose a reduced field set: essential fields only for the initial form, with important/optional fields deferred to post-conversion
7. Calculate field reduction percentage and reference research benchmarks (Expedia: removed 1 field, gained $12M/year; Imagescape: 11 to 4 fields, 120% increase in conversions)
8. Get stakeholder approval on the reduced field set before proceeding

### Phase 2: Label Strategy
1. Evaluate three label placement options against the form context:
   - **Top-aligned labels:** Fastest completion time, best for unfamiliar forms, requires more vertical space
   - **Float labels:** Space-efficient, good for mobile, placeholder transforms to label on focus
   - **Left-aligned labels:** Slowest completion, only appropriate for very long forms requiring careful scanning
2. Select the primary label strategy based on form length, platform, and user familiarity:
   - Short forms (under 6 fields) on mobile: float labels
   - Medium forms (6-12 fields): top-aligned labels
   - Long forms (12+ fields) on desktop: top-aligned with grouped sections
3. Write clear, concise label text: use sentence case, avoid jargon, front-load the key word
4. Design help text placement: inline hints below the field (not tooltips) for fields that historically cause confusion
5. Determine required field indication strategy: mark optional fields (not required ones, since most fields should be required after the audit)
6. Specify label-to-field association for accessibility: every field must have a programmatic label (not placeholder-only)
7. Design the visual hierarchy of labels: font size, weight, color, and spacing relative to input fields
8. Create a label specification document with exact text, placement, and styling for every field

### Phase 3: Validation Design
1. Define validation timing for each field:
   - **Inline validation:** Validate on blur (when user leaves the field), not on every keystroke
   - **Real-time formatting:** Apply formatting as user types for structured fields (phone, credit card, date)
   - **Submit validation:** Only for cross-field rules that cannot be checked inline
2. Design success states: show a checkmark or green border when a field passes validation (positive reinforcement)
3. Design error states following these rules:
   - Show the error message directly below the field, not in a summary at the top
   - Use red border and icon, plus descriptive text explaining how to fix (not just "Invalid")
   - Preserve the user's input so they can correct rather than re-enter
   - Use friendly, specific language: "Please enter a valid email (e.g., name@example.com)" not "Invalid input"
4. Design password field validation: show requirements as a checklist that updates in real-time as the user types
5. Handle optional field validation: never show errors on optional fields unless the user has entered partial data
6. Design form-level error recovery: on submit failure, scroll to the first error, focus the field, and announce to screen readers
7. Specify validation rules for each field in a structured format (field, rule, success message, error message)
8. Plan for server-side validation feedback: how async checks (username availability, address verification) display to users

### Phase 4: Smart Defaults and Autocomplete
1. Identify fields that can be pre-filled from context: location from IP/GPS, date from current time, country from locale
2. Specify HTML autocomplete attributes for every field to enable browser autofill (name, email, tel, address, cc-number, etc.)
3. Design input type optimization for mobile keyboards: type="email" for email, type="tel" for phone, inputmode="numeric" for numbers
4. Identify fields replaceable with smart selectors: date pickers instead of text, steppers instead of number input, toggles instead of checkboxes for binary choices
5. Design address autocomplete integration: use Google Places or similar API to autofill address fields from partial input
6. Plan progressive profiling: for returning users, pre-fill known data and only ask for new information
7. Design default selection strategy: pre-select the most common option for radio/select fields based on usage data
8. Specify fallback behavior: what happens when autocomplete/defaults are unavailable or incorrect

### Phase 5: Completion Rate Projection
1. Calculate the baseline metrics: current completion rate (if known) or industry benchmark for the form type
2. Estimate impact of field reduction: research shows each field removed can increase completion by 5-10%
3. Estimate impact of label optimization: top-aligned labels complete 2x faster than left-aligned (Matteo Penzo research)
4. Estimate impact of inline validation: Luke Wroblewski's research showed 22% increase in success rate, 22% decrease in errors, 31% increase in satisfaction
5. Estimate impact of smart defaults: address autocomplete alone can reduce form completion time by 30%
6. Produce a projected completion rate with confidence range: conservative, expected, and optimistic scenarios
7. Define measurement plan: what analytics events to track (field focus, field blur, field error, form submit, form abandon)
8. Propose an A/B test plan: test the optimized form against the current form with a defined sample size and success criteria

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| field_inventory | markdown table | Complete field audit with keep/remove/defer decisions and rationale |
| label_specification | markdown | Label text, placement, styling, and help text for every field |
| validation_rules | markdown table | Per-field validation timing, rules, success states, and error messages |
| autocomplete_spec | markdown table | Autocomplete attributes, input types, and smart default values per field |
| completion_projection | markdown | Projected completion rate improvement with research citations and measurement plan |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Field audit complete | blocking | Every field must have a documented keep/remove/defer decision with rationale |
| Label strategy selected | blocking | A label placement strategy must be chosen and justified for the platform |
| Validation rules defined | blocking | Every required field must have inline validation rules and error messages |
| Autocomplete attributes set | blocking | Every field must have appropriate HTML autocomplete and input type attributes |
| Completion projection provided | warning | A projected completion rate improvement should be calculated with supporting data |
| Accessibility compliance | warning | All fields must have programmatic labels, not placeholder-only labeling |

---

## Handoff

- **On completion:** Hand to @brad-frost for component-level design system integration of form elements
- **On mobile form needs:** Hand to self via `mobile-first` task for mobile-specific layout optimization
- **On conversion flow integration:** Hand to self via `conversion-arch` task for funnel-level form placement
- **On accessibility review:** Hand to @accessibility-lead for WCAG form compliance audit
- **On issues:** Escalate to @design-chief
