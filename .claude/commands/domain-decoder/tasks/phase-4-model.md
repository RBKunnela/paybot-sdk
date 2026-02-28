# Task: Phase 4 — Model Recovery

**Task ID:** phase-4-model
**Version:** 1.0
**Agents:** domain-modeler (primary — context map + DDD artifacts), business-model-analyst (primary — revenue logic + pricing) — running in parallel
**Execution Type:** Parallel — both agents process Phase 3 outputs simultaneously to produce complementary higher-order models
**Purpose:** Recover the full domain model (L6 — bounded contexts, aggregates, ubiquitous language) and business model (L7 — revenue flows, pricing logic, user lifecycle) from the raw extraction outputs of Phase 3, elevating findings from individual rules and entities into coherent, navigable models.

---

## Overview

Phase 3 extracted the raw material: individual business rules, isolated entities, scattered events. Phase 4 synthesizes this material into two coherent models:

1. **Domain Model (L6 — full recovery):** The complete DDD-aligned picture of subdomains, bounded contexts, aggregates, and the ubiquitous language that connects business and code.
2. **Business Model (L7):** The revenue logic — how money enters, flows, and is distributed in the system. Pricing matrices, subscription tiers, user lifecycle, and monetization workflows.

These two models together answer the question: "What does this system do as a business, and how is it structured to do it?"

```
INPUT: business-rules.yaml, domain-entities.yaml, domain-events.yaml (all from Phase 3)
    ↓
  [PARALLEL EXECUTION]
  ┌──────────────────────────────────────────────┬─────────────────────────────────────────────┐
  │ domain-modeler                                │ business-model-analyst                      │
  │ L6 Domain Model Recovery                      │ L7 Business Model Extraction                │
  │                                              │                                             │
  │ Step A: Subdomain identification             │ Step A: Money trail — find financial code   │
  │ Step B: Bounded context finalization         │ Step B: Flow reconstruction — trace charges │
  │ Step C: Ubiquitous language finalization     │ Step C: Business model synthesis            │
  │ Step D: Aggregate + event mapping            │ Step D: Pricing matrix + lifecycle map      │
  └──────────────────────────────────────────────┴─────────────────────────────────────────────┘
    ↓
[MERGE] Cross-reference domain model with business model
    ↓
[VETO CHECK] Bounded context count and model completeness
    ↓
OUTPUT: context-map.mermaid, aggregate-map.yaml, ubiquitous-language.yaml,
        business-model-canvas.yaml, user-lifecycle.mermaid, pricing-matrix.yaml
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `business_rules` | YAML file | Yes | `outputs/{repo-name}/phase-3/business-rules.yaml` |
| `domain_entities` | YAML file | Yes | `outputs/{repo-name}/phase-3/domain-entities.yaml` |
| `domain_events` | YAML file | Yes | `outputs/{repo-name}/phase-3/domain-events.yaml` |
| `ubiquitous_language_draft` | YAML file | Yes | `outputs/{repo-name}/phase-3/ubiquitous-language-draft.yaml` |
| `inventory` | YAML file | Yes | `outputs/{repo-name}/phase-1/inventory.yaml` |
| `dependency_graph` | YAML file | Yes | `outputs/{repo-name}/phase-1/dependency-graph.yaml` |
| `tech_stack` | YAML file | Yes | `outputs/{repo-name}/phase-1/tech-stack.yaml` |

**Skills to Reuse:**
- `clone-engineering:tasks:mind-mapper-generate-cognitive-spec` — domain model specification format (adapted: cognitive spec → domain model spec)
- `design:tasks:shared-vocabulary` — domain glossary structure (adapted: design vocabulary → ubiquitous language)
- `design:tasks:orca-process` — entity-first domain modeling (OOUX methodology adapted to DDD)
- `design:tasks:relationship-map` — entity relationship visualization
- `design:tasks:naming-convention` — identifier analysis for ubiquitous language extraction

---

## Preconditions

- [ ] DD_SUM_001 (Deep Extraction Gate) has passed
- [ ] Phase 3 output files exist and are valid YAML
- [ ] domain-modeler and business-model-analyst agents are active
- [ ] Tools available: Glob, Grep, Read, Bash

---

## AGENT A: domain-modeler — L6 Domain Model Recovery

**Methodology:** Eric Evans DDD Strategic Design + Nick Tune's Core Domain Charts

### Step A: Subdomain Identification

**Purpose:** Classify every bounded context candidate from Phase 3 into DDD subdomain categories: Core, Supporting, or Generic. This strategic classification determines which parts of the codebase warrant the deepest documentation and modernization attention.

**Actions:**
```yaml
subdomain_classification:
  for_each_bounded_context_hypothesis:
    core_domain_signals:
      - "Contains the highest density of unique business rules (BR count > median)"
      - "Has the highest change frequency (from Phase 2 hotspot data)"
      - "Is NOT replaceable by an off-the-shelf product"
      - "Directly implements the business's competitive differentiator"
      - "Example: For an e-commerce platform, Order Management and Pricing are Core"

    supporting_subdomain_signals:
      - "Necessary for Core to function, but not differentiating"
      - "Could theoretically be built custom but not strategically important"
      - "Example: User Authentication, Notification Service"

    generic_subdomain_signals:
      - "Industry-standard problem with off-the-shelf solutions"
      - "No unique business rules — configures a library or service"
      - "Example: Email delivery (uses SendGrid), PDF generation, CSV export"

  output_per_context:
    classification: "Core | Supporting | Generic"
    rationale: "1-2 sentence explanation"
    confidence: "HIGH | MEDIUM | LOW"
    replacement_candidate: "true if Generic — suggest alternative product"
```

### Step B: Bounded Context Finalization

**Purpose:** Validate, merge, or split bounded context hypotheses from Phase 3 using DDD context mapping patterns.

**Actions:**
```yaml
context_finalization:
  validation_rules:
    - "Every business rule must belong to exactly one bounded context"
    - "Every domain entity must belong to at least one bounded context"
    - "A bounded context must have a clear name understandable by business stakeholders"
    - "A bounded context must have at least 1 business rule and 1 aggregate root"

  merge_criteria:
    - "Two contexts with >80% entity overlap AND no clear boundary → merge"
    - "Two contexts where one completely depends on the other with no independent rules → consider merge"

  split_criteria:
    - "A context with 2+ distinct entity clusters that never share business rules → split"
    - "A context where the same term means different things in different parts → split (ubiquitous language violation)"

  context_mapping:
    for_each_context_pair:
      pattern: "Customer/Supplier | Shared Kernel | Conformist | Anti-Corruption Layer | Open Host | Partnership"
      detection_method:
        customer_supplier: "A imports from B, but B has no imports from A — B is upstream supplier"
        shared_kernel: "Both import from a common shared module and co-own it"
        conformist: "A imports from B and uses B's model directly without transformation"
        anti_corruption: "A imports from B but transforms B's data through an explicit translator/adapter class"
      output: "Context map with relationship patterns annotated"
```

### Step C: Ubiquitous Language Finalization

**Purpose:** Produce the definitive domain glossary from the draft assembled in Phase 3.

**Actions:**
```yaml
language_finalization:
  input: "ubiquitous-language-draft.yaml from Phase 3"
  steps:
    - "Deduplicate: merge entries referring to the same concept"
    - "Resolve synonyms: pick the canonical term (prefer the one used in API contracts)"
    - "Resolve homonyms: document that the same word has different meanings in different contexts"
    - "Enrich definitions: add business meaning that goes beyond the code implementation"
    - "Add antonyms: what is the OPPOSITE of this term? (e.g., 'placed order' vs 'abandoned cart')"
    - "Assign certainty: HIGH (appears in code + tests + UI), MEDIUM (code only), LOW (inferred)"

  format_per_term:
    term: "The canonical term"
    context: "Which bounded context owns this definition"
    definition: "Business meaning in plain English (no code references)"
    synonyms: "Other names found in the codebase"
    homonyms: "Same word, different meaning in other contexts"
    code_occurrences: "How many times it appears in source files (frequency signal)"
    first_seen: "Earliest file where it appears"
    certainty: "HIGH | MEDIUM | LOW"
```

### Step D: Aggregate and Event Map

**Purpose:** Finalize the aggregate hierarchy and produce a complete domain event catalog with ownership assignments.

**Actions:**
```yaml
aggregate_mapping:
  per_bounded_context:
    - "Identify aggregate roots (entities that own transaction boundaries)"
    - "Map child entities within each aggregate"
    - "Map value objects (immutable types used as attributes)"
    - "Assign domain events to aggregates (which aggregate emits which events)"
    - "Map event consumers across bounded contexts"

  state_machine_recovery:
    for_entities_with_status_enum:
      - "Extract all status values"
      - "Map valid transitions (from Phase 3 business rules about state changes)"
      - "Generate state machine diagram in Mermaid format"

  output:
    aggregate_map: "Hierarchy of aggregate roots → child entities → value objects"
    event_ownership: "Which aggregate emits each domain event"
    state_machines: "Mermaid stateDiagram-v2 for each entity with status lifecycle"
```

---

## AGENT B: business-model-analyst — L7 Business Model Extraction

**Methodology:** Revenue surface discovery → flow tracing → model synthesis

### Step A: Money Trail Discovery

**Purpose:** Find all financial touchpoints in the codebase — the entry points of the revenue flow.

**Actions:**
```yaml
money_trail:
  search_keywords:
    payment_gateways:
      - "Grep: stripe, paypal, braintree, adyen, square, paddle, recurly, chargebee"
      - "These indicate real money movement — highest priority files"

    business_financial_terms:
      - "Grep: payment, charge, invoice, subscription, billing, price, discount"
      - "Grep: coupon, refund, credit, debit, commission, revenue, fee"
      - "Grep: tier, plan, trial, premium, pro, enterprise, freemium"
      - "Grep: upsell, downgrade, upgrade, cancel, churn"

    configuration_files:
      - "Grep for price/limit configuration: plans.ts, pricing.ts, config/billing.ts"
      - "Grep for feature flags with plan gating: isFeatureEnabled, hasAccess"

  output:
    financial_touchpoints: "List of files and functions that handle money"
    payment_gateway: "Identified gateway(s) and integration approach"
    business_model_type_hint: "subscription | marketplace | e-commerce | usage-based | freemium | hybrid"
```

### Step B: Revenue Flow Reconstruction

**Purpose:** Trace each financial touchpoint from its trigger (user action) to the charge (gateway call), mapping every business condition along the way.

**Actions:**
```yaml
flow_reconstruction:
  per_payment_touchpoint:
    - "Identify trigger: What user action initiates this flow? (button click, API call, cron job)"
    - "Trace the code path from trigger to the actual charge/record"
    - "Document every conditional between trigger and charge (each = a pricing rule or business constraint)"
    - "Identify: one-time payment, recurring subscription, usage-based, or hybrid"

  revenue_stream_template:
    name: "Human-readable revenue stream name"
    type: "one-time | recurring | usage-based | commission"
    trigger: "What event causes revenue"
    amount_source: "Where the amount comes from (fixed config, calculated, user input)"
    conditions: "What conditions must be met (active subscription, trial expired, etc.)"
    gateway_call: "File + function that makes the actual charge"
    billing_rules: "References to extracted L5 rules that govern this stream"
```

### Step C: Business Model Synthesis

**Purpose:** Organize individual revenue streams into a coherent business model description.

**Actions:**
```yaml
business_model_synthesis:
  canvas_sections:
    revenue_streams: "All identified revenue streams with descriptions"
    pricing_model: "Subscription | Usage-based | Freemium | Marketplace | Transactional"
    monetization_events: "What user actions generate revenue"
    free_tier_logic: "What is free, and what triggers conversion"
    enterprise_logic: "Is there a custom/sales-driven tier? What is different?"

  classification:
    primary_model: "The dominant revenue mechanism"
    secondary_models: "Additional revenue layers"
    monetization_maturity: "Simple (1 tier) | Intermediate (2–4 tiers) | Complex (5+ tiers or custom)"
```

### Step D: Pricing Matrix and User Lifecycle

**Actions:**
```yaml
pricing_matrix:
  for_each_tier:
    - "Name: The plan/tier name"
    - "Price: Monthly and annual price (or 'custom' for sales-driven)"
    - "Limits: Every quantitative limit (storage, users, API calls, projects, etc.)"
    - "Features: Features exclusive to this tier (feature flags)"
    - "Source: File + line where pricing is defined"

  upgrade_triggers:
    - "What causes a user to upgrade from tier A to tier B?"
    - "Is the trigger manual (user decides) or automatic (limit exceeded)?"
    - "Where in the code does this trigger fire?"

  user_lifecycle_mapping:
    stages:
      - "Signup / Trial Start"
      - "Activation (first value moment)"
      - "Conversion to paid"
      - "Expansion (plan upgrade or seat addition)"
      - "Retention / renewal"
      - "Cancellation / churn"
      - "Reactivation"
    for_each_stage:
      - "Does code exist for this stage? (or is it implicit)"
      - "What events / rules govern the transition between stages?"
      - "Source file references"
```

---

## Veto Conditions

| ID | Condition | Type | Action |
|----|-----------|------|--------|
| DD_DDD_001 | `bounded_contexts_count < 3` from a codebase with `total_loc > 100000` | HARD VETO | A 100K+ LOC system cannot be adequately described with fewer than 3 bounded contexts. This indicates either extraction failure or a genuinely monolithic codebase with no module boundaries. Chief must decide: retry extraction or document as "undifferentiated monolith." |
| DD_DDD_002 | `aggregate_roots_count == 0` | HARD VETO | No aggregate roots found — either domain-modeler failed to identify them or the codebase uses a Table Module / Transaction Script pattern (valid architecture, but requires note in output). |
| DD_DDD_W01 | `l7_financial_touchpoints == 0` | WARN (not blocking) | No financial logic detected. System may be internal tooling, open-source, or B2B with invoicing handled externally. Document as "No monetization logic detected in codebase" and proceed. |
| DD_DDD_W02 | `ubiquitous_language_terms < 20` | WARN | Fewer than 20 domain terms extracted — either a very small domain or extraction was too shallow. |
| DD_DDD_W03 | `context_map_has_no_patterns` | WARN | All context relationships are unlabeled. Domain-modeler should attempt to infer at minimum the directional relationships even without full pattern classification. |

---

## Outputs

| Artifact | Format | Path | Description |
|----------|--------|------|-------------|
| `context-map.mermaid` | Mermaid | `outputs/{repo-name}/phase-4/context-map.mermaid` | Visual bounded context map with relationship patterns |
| `aggregate-map.yaml` | YAML | `outputs/{repo-name}/phase-4/aggregate-map.yaml` | Full aggregate hierarchy with events |
| `ubiquitous-language.yaml` | YAML | `outputs/{repo-name}/phase-4/ubiquitous-language.yaml` | Finalized domain glossary |
| `state-machines.mermaid` | Mermaid | `outputs/{repo-name}/phase-4/state-machines.mermaid` | State machine diagrams for stateful entities |
| `business-model-canvas.yaml` | YAML | `outputs/{repo-name}/phase-4/business-model-canvas.yaml` | Business model structured description |
| `pricing-matrix.yaml` | YAML | `outputs/{repo-name}/phase-4/pricing-matrix.yaml` | Tier/plan pricing with limits and features |
| `user-lifecycle.mermaid` | Mermaid | `outputs/{repo-name}/phase-4/user-lifecycle.mermaid` | User journey state machine |
| `model-recovery-summary.yaml` | YAML | `outputs/{repo-name}/phase-4/model-recovery-summary.yaml` | Counts, coverage, and confidence metrics |

---

## Completion Criteria

**Checkpoint:** `DD_DDD_001` — Model Recovery Complete

```yaml
heuristic_id: DD_DDD_001
name: "Model Recovery Gate Passed"
blocking: true
required_before: "phase-5-validate"

criteria:
  - context_map_exists: true
  - aggregate_map_exists: true
  - ubiquitous_language_exists: true
  - business_model_canvas_exists: true
  - bounded_contexts_count: ">= 1 (absolute minimum)"
  - no_hard_veto_fired: true
  - all_business_rules_assigned_to_context: true

on_fail:
  action: "STOP pipeline — report which models are missing and surface extraction metrics"
  retry_allowed: true
  retry_condition: "Chief approves narrower context definitions OR user confirms low-context system"
```

## Agent Notes

- **No invention rule applies to L7:** If no financial code is found, the output is "No monetization logic detected," not a guess about potential revenue streams. This is explicitly permitted output.
- **Mermaid quality:** All Mermaid diagrams must be valid and renderable. Test with `mmdc` if available.
- **Context map is strategic:** The context map should be understandable by a CTO who has never seen the code. Bounded context names must be business terms, not technical terms.
- **Model routing:** domain-modeler uses Opus for bounded context reasoning; business-model-analyst uses Opus for revenue flow reconstruction. Both tasks require deep semantic inference.
