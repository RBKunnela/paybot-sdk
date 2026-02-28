# Task: Input Innovation Design

**Task ID:** input-design
**Version:** 1.0
**Purpose:** Design optimal input methods leveraging device capabilities and reducing user effort
**Agent:** @luke-wroblewski
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Designs optimal input methods for every data collection point in a product by selecting the right input control for each data type, leveraging device capabilities to eliminate manual entry, applying smart defaults to reduce effort, and ensuring accessibility compliance. The principle is simple: the best input is no input at all. Every keystroke, tap, or selection that can be eliminated through automation, inference, or device capability is friction removed. This task systematically evaluates every data collection moment and designs the lowest-effort, highest-accuracy input method for each.

```
INPUT (data_types_collected, target_devices, user_context, accessibility_requirements)
    |
[PHASE 1: INPUT METHOD SELECTION]
    -> Choose optimal input control for each data type (stepper, slider, picker, text)
    |
[PHASE 2: DEVICE CAPABILITY LEVERAGE]
    -> Replace manual input with device sensors where possible (camera, GPS, biometrics)
    |
[PHASE 3: SMART DEFAULT STRATEGY]
    -> Pre-fill and infer values to minimize user effort
    |
[PHASE 4: ACCESSIBILITY COMPLIANCE]
    -> Ensure all input methods are accessible across ability spectrums
    |
OUTPUT: Input design spec with method selection matrix, device integration plan, default strategy, and accessibility audit
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| data_types_collected | list | Yes | List of all data types the product collects from users (name, email, address, quantity, date, preference, etc.) |
| target_devices | list | Yes | Target device classes: smartphone, tablet, desktop, kiosk, wearable |
| user_context | string | Yes | Typical usage context: on-the-go, desk-based, distracted, time-pressured, one-handed |
| accessibility_requirements | string | Yes | Accessibility standard to comply with: WCAG 2.1 AA, WCAG 2.2 AAA, Section 508, or custom |
| current_inputs | list | No | List of current input implementations for comparison and improvement identification |
| error_rate_data | object | No | Data on which inputs generate the most errors or require the most corrections |
| device_capabilities | list | No | Confirmed device capabilities available: camera, GPS, NFC, biometrics, accelerometer, Bluetooth |

---

## Preconditions

- All data types collected by the product are documented and understood
- Target devices and their capability profiles are confirmed
- User context and typical usage scenarios are defined
- Accessibility standard is chosen and non-negotiable
- Development team is available to assess technical feasibility of device integrations
- Product owner has authority to approve changes to data collection methods
- Privacy and security team has been consulted on device capability usage (camera, GPS, biometrics)

---

## Steps

### Phase 1: Input Method Selection
1. Create a complete inventory of every data collection point in the product: field, data type, current input method, frequency of use
2. For each data type, evaluate the optimal input control:
   - **Numeric quantities (1-10):** Stepper (increment/decrement) — precise, low error rate
   - **Numeric ranges:** Slider — fast for approximate values, add text input for precision
   - **Dates:** Native date picker on mobile, calendar widget on desktop — never free-text date entry
   - **Time:** Time picker with AM/PM toggle — never free-text time entry
   - **Boolean (yes/no):** Toggle switch for settings, checkbox for forms — never dropdown with two options
   - **One of few (2-5 options):** Radio buttons or segmented control — all options visible at once
   - **One of many (6+ options):** Searchable dropdown or autocomplete — never a long scrollable list
   - **Multiple of many:** Checkbox group with search/filter for large sets
   - **Free text (short):** Single-line text input with appropriate input type and keyboard
   - **Free text (long):** Textarea with character count and auto-expand
3. Design custom input controls for domain-specific data: color pickers, rating selectors, price range sliders, map-based location pickers
4. Specify the mobile keyboard type for every text input: text, email, tel, url, number, search, decimal
5. Design input grouping: related fields should be visually and semantically grouped (address fields, name fields, payment fields)
6. Evaluate each input for error potential: which inputs generate the most user errors? Replace high-error text inputs with constrained controls
7. Create an input method selection matrix mapping each data point to its chosen control with rationale

### Phase 2: Device Capability Leverage
1. Inventory available device capabilities across target devices:
   - **Camera:** Document/card scanning, QR/barcode reading, photo capture for visual data
   - **GPS/Location:** Address pre-fill, location-based defaults, geofencing
   - **Biometrics:** Authentication (Face ID, Touch ID, fingerprint), payment authorization
   - **NFC:** Contactless data transfer, payment, device pairing
   - **Accelerometer/Gyroscope:** Shake to undo, tilt-based interaction, orientation detection
   - **Bluetooth:** Device pairing, proximity detection, accessory integration
   - **Microphone:** Voice input, voice search, dictation for long text
2. Map device capabilities to data collection points: which inputs can be replaced or augmented by device sensors?
   - Credit card entry -> Camera scan (OCR)
   - Address entry -> GPS location + autocomplete
   - Login credentials -> Biometric authentication
   - Product lookup -> Camera barcode/QR scan
   - Long text input -> Voice dictation
3. Design the capability detection flow: check for device capability availability, request permission gracefully, provide fallback
4. Design permission request UX: explain why the capability is needed before triggering the system permission dialog
5. Design fallback experiences: every device-capability input must have a manual entry fallback for devices without the capability
6. Evaluate privacy implications: document what data each device capability accesses and how it is handled
7. Specify integration requirements: API, SDK, or browser API needed for each capability with version requirements
8. Create a device capability integration plan with capability, use case, permission flow, fallback, and privacy notes

### Phase 3: Smart Default Strategy
1. Identify every field that can have a smart default based on:
   - **User context:** Current time, current location, device locale, screen orientation
   - **User history:** Previous entries, preferences, most-used values
   - **Statistical likelihood:** Most common selection for user segment (e.g., country defaults to user's locale)
   - **Derived data:** City/state from zip code, area code from phone prefix, company from email domain
2. Design the default presentation: pre-filled but editable, clearly distinguishable from user-entered data
3. Implement type-ahead and autocomplete for text fields:
   - Address: Google Places or Mapbox autocomplete
   - Name: No autocomplete (too personal)
   - Email: Domain suggestion after @ symbol
   - Search: Recent searches + popular queries
4. Design progressive form filling: as the user completes one field, use it to pre-fill or constrain subsequent fields
5. Plan for returning users: pre-fill all known data from previous sessions, highlight only what is new or needs updating
6. Design the "wrong default" correction flow: make it effortless to clear and replace a pre-filled value
7. Specify default values for every defaultable field with source (context, history, statistical, derived) and confidence level
8. Create a smart default strategy document mapping each field to its default source, presentation, and correction mechanism

### Phase 4: Accessibility Compliance
1. Audit every input against the target accessibility standard (WCAG 2.1 AA minimum):
   - **Perceivable:** Labels visible and programmatically associated, instructions clear, errors described in text
   - **Operable:** All inputs keyboard-accessible, touch targets 44x44px minimum, no timing constraints without extension
   - **Understandable:** Labels descriptive, error messages actionable, behavior predictable
   - **Robust:** Inputs work with assistive technology (screen readers, switch devices, voice control)
2. Ensure every input has a visible text label (not placeholder-only) with proper `for`/`id` association or `aria-labelledby`
3. Design focus management: logical tab order, visible focus indicator (3:1 contrast ratio minimum), focus trapped in modals
4. Design screen reader announcements for dynamic inputs: live regions for validation messages, role and state for custom controls
5. Ensure custom input controls (steppers, sliders, toggles) have proper ARIA roles, states, and keyboard interaction patterns:
   - Slider: `role="slider"`, arrow keys to adjust, Home/End for min/max
   - Toggle: `role="switch"`, Space to toggle, announced state
   - Stepper: Increment/decrement buttons with `aria-label`, value announced on change
6. Design for reduced motion: all input animations respect `prefers-reduced-motion`
7. Design for voice control: all inputs must be activatable by voice (visible labels that match accessible names)
8. Test with at least 2 assistive technologies: screen reader (NVDA/VoiceOver) and keyboard-only navigation
9. Produce an accessibility compliance report with per-input audit results, issues found, and remediation steps

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| input_method_matrix | markdown table | Every data point mapped to its optimal input control with rationale |
| device_integration_plan | markdown | Device capability leveraging plan with use cases, permissions, fallbacks, and privacy notes |
| smart_default_spec | markdown table | Per-field default values with source, presentation, confidence level, and correction mechanism |
| accessibility_report | markdown | Per-input WCAG compliance audit with issues and remediation guidance |
| input_specification | markdown | Combined implementation spec for developers covering all input methods, behaviors, and states |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| All inputs mapped | blocking | Every data collection point must have a documented input method selection with rationale |
| No free-text for structured data | blocking | Dates, times, quantities, and constrained choices must not use free-text input |
| Accessibility compliant | blocking | All inputs must pass the target WCAG standard with no blocking violations |
| Fallbacks provided | blocking | Every device-capability input must have a manual entry fallback |
| Labels present | blocking | Every input must have a visible, programmatically associated text label |
| Device capabilities evaluated | warning | All available device capabilities should be evaluated for input replacement opportunities |
| Smart defaults specified | warning | Fields with deterministic or statistical defaults should have pre-fill strategy documented |
| Keyboard types specified | warning | All text inputs should have appropriate mobile keyboard type specified |

---

## Handoff

- **On completion:** Hand to @brad-frost for atomic design integration of input components into the design system
- **On form integration:** Hand to self via `form-optimize` task for form-level layout and validation design
- **On mobile input patterns:** Hand to self via `mobile-first` task for mobile-specific input constraints
- **On microinteraction feedback:** Hand to self via `microinteractions` task for input feedback animation design
- **On issues:** Escalate to @design-chief
