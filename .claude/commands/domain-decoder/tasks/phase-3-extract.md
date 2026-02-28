# Task: Phase 3 — Deep Extraction

**Task ID:** phase-3-extract
**Version:** 1.0
**Agents:** rule-archaeologist (L5 business rules), domain-modeler (L6 domain entities) — running in parallel
**Execution Type:** Parallel — both agents extract simultaneously from the same slice set, then merge outputs
**Purpose:** Perform deep multi-pass extraction on all selected slices to produce a comprehensive business rules catalog (L5) and domain entity model (L6), including domain events and an initial business model surface (L7 signals).

---

## Overview

Phase 3 is the core value delivery of Domain Decoder. It transforms source code into structured business intelligence using a rigorous multi-pass methodology grounded in the IEEE 5-step Business Rule Extraction (BRE) framework, augmented by Michael Feathers' seam detection and Eric Evans' domain modeling techniques.

Both agents work in parallel on the same selected slices but through different analytical lenses. Their outputs are merged and cross-validated before advancing to Phase 4.

```
INPUT: slice-selection.yaml + all Phase 1 outputs
    ↓
  [PARALLEL EXECUTION]
  ┌────────────────────────────────┬─────────────────────────────────┐
  │ rule-archaeologist             │ domain-modeler                   │
  │ L5 Business Rule Extraction    │ L6 Domain Entity Extraction      │
  │                                │                                  │
  │ Pass 1: SCAN candidates        │ Pass 1: ENTITIES from data layer │
  │ Pass 2: READ + semantic reason │ Pass 2: BOUNDARIES from graph    │
  │ Pass 3: SYNTHESIZE + catalog   │ Pass 3: LANGUAGE extraction      │
  │                                │ Pass 4: VALIDATE vs L5 output    │
  └────────────────────────────────┴─────────────────────────────────┘
    ↓
[MERGE] Cross-reference L5 rules with L6 entities
    ↓
[VETO CHECK] Business rule count threshold
    ↓
OUTPUT: business-rules.yaml, domain-entities.yaml, domain-events.yaml
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `slice_selection` | YAML file | Yes | `outputs/{repo-name}/phase-2/slice-selection.yaml` |
| `inventory` | YAML file | Yes | `outputs/{repo-name}/phase-1/inventory.yaml` |
| `dependency_graph` | YAML file | Yes | `outputs/{repo-name}/phase-1/dependency-graph.yaml` |
| `entry_points` | YAML file | Yes | `outputs/{repo-name}/phase-1/entry-points.yaml` |
| `tech_stack` | YAML file | Yes | `outputs/{repo-name}/phase-1/tech-stack.yaml` |

**Skills to Reuse:**
- `squad-creator:agents:sop-extractor` — rule format (IF/THEN/BECAUSE) adapted from meeting transcripts to code files
- `clone-engineering:tasks:mind-mapper-extract-all` — entity extraction methodology (adapted: domain entity vs person identity)
- `clone-engineering:tasks:mind-mapper-triangulate` — triangulation scoring (3+ sources = HIGH)
- `quality-shield:tasks:deep-trace` — code flow tracing for rule context
- `quality-shield:tasks:map-feature-flow` — feature flow mapping for L5 context

---

## Preconditions

- [ ] DD_SLC_001 (Slice Selection Gate) has passed
- [ ] rule-archaeologist agent is active
- [ ] domain-modeler agent is active
- [ ] Tools available: Glob, Grep, Read, Bash
- [ ] External tools (if available): ast-grep, Semgrep, Repomix, Serena

---

## AGENT A: rule-archaeologist — L5 Business Rule Extraction

**Methodology:** IEEE 5-Step Business Rule Extraction (BRE) Process

### BRE Step 1: Program Slicing

**Purpose:** Narrow the field to only the code most likely to contain business rules, using pattern-based scanning.

**Actions:**
```yaml
scan_patterns:
  high_value_function_names:
    - "Grep: function names matching calculate*, compute*, check*, validate*, can*, is*, should*, get*Price, get*Discount, apply*, enforce*"
    - "Grep: class names matching *Policy, *Rule, *Validator, *Guard, *Checker, *Calculator, *Engine"

  business_conditionals:
    - "Grep: if/else blocks with 3+ branches in service/, domain/, core/ directories"
    - "Grep: switch statements with string/enum cases (not error codes)"
    - "Grep: ternary chains (? x : y) in business logic files"

  business_constants:
    - "Grep: constants with business-sounding names: MAX_*, MIN_*, RATE_*, LIMIT_*, THRESHOLD_*, FEE_*, TAX_*"
    - "Grep: magic numbers in business context (not array indices or loop counters)"

  policy_enforcement:
    - "Grep: permission checks, role checks, tier checks"
    - "Grep: eligibility validations (isEligible, canProceed, hasAccess)"
    - "Grep: feature flag checks with business consequences"

  calculation_functions:
    - "Grep: functions with multiplication/division and domain variables"
    - "Grep: price/discount/commission/tax/fee calculation patterns"

  candidates_output:
    - "List of (file, line_range, snippet, pattern_type) for each candidate"
    - "Estimated candidate count should be 2–10x final rule count"
```

### BRE Step 2: Domain Variable Identification

**Purpose:** For each candidate, identify the domain variables (entities, attributes, and their business meaning) involved in the rule.

**Actions:**
```yaml
domain_variable_id:
  per_candidate:
    - "Read the function's full context (100 lines before, 100 lines after)"
    - "Identify: Which domain entities are involved? (Order, Customer, Product, etc.)"
    - "Identify: Which attributes drive the conditional? (status, tier, amount, quantity)"
    - "Identify: What is the outcome? (rejection, modification, routing, calculation)"
    - "Cross-reference variable names against inventory entity names"

  disambiguation:
    - "If variable name is ambiguous (e.g., 'user'), check the function's bounded context"
    - "Look at the file's directory and module imports to determine context"
```

### BRE Step 3: Data Flow Analysis

**Purpose:** Trace how data flows into and out of each business rule candidate to understand preconditions, postconditions, and side effects.

**Actions:**
```yaml
data_flow_analysis:
  per_candidate:
    - "Trace inputs: Where does the condition variable come from? (parameter, database, config)"
    - "Trace outputs: What changes after the rule fires? (return value, exception, event, state change)"
    - "Identify side effects: Does the rule trigger other rules? (rule chains)"
    - "Cross-reference with entry-points.yaml: Is this rule reachable from an entry point?"

  tool_usage:
    repomix: "Feed entire slice to Claude with full file context for deep semantic analysis"
    serena: "LSP navigation to follow symbol definitions across files"
    ast_grep: "Structural pattern matching to find all rule invocation sites"
```

### BRE Step 4: Rule Presentation

**Purpose:** Transform the analyzed candidate into the standardized IF/THEN/BECAUSE rule format.

**Actions:**
```yaml
rule_formulation:
  format:
    condition: "IF {natural language condition using domain terms}"
    action: "THEN {what the system does — in business terms, not code terms}"
    rationale: "BECAUSE {why this rule exists — the business reason}"

  rules:
    - "Use domain entity names, not variable names (say 'Order' not 'o', 'Customer' not 'usr')"
    - "Use active voice (reject, apply, route, calculate)"
    - "Never reference implementation details (no function names, no library names)"
    - "If rationale is not evident from code, mark as 'RATIONALE_INFERRED' and note"
    - "Categorize: validation | calculation | routing | access_control | transformation | workflow"

  confidence_pre_triangulation:
    - "Strong signal patterns (3+ grep patterns match, 2+ code expressions agree): MEDIUM"
    - "Weak signal (1 grep pattern, 1 code expression): LOW"
    - "Will be upgraded to HIGH after triangulation"
```

### BRE Step 5: Triangulation Validation

**Purpose:** Confirm each extracted rule against independent evidence sources to assign final confidence.

**Actions:**
```yaml
triangulation:
  evidence_sources:
    code: "The implementation itself (if/else, condition)"
    schema: "Database constraints, model validations that enforce the same rule"
    tests: "Test assertions that encode the same business expectation"
    comments: "Developer comments explaining the rule"
    api: "API response codes, error messages, endpoint naming"
    ui: "Frontend form validation messages, UI labels, disabled states"
    logs: "Log messages that describe the business event"

  scoring:
    high: ">= 3 independent sources confirm the rule"
    medium: "2 independent sources confirm"
    low: "1 source only — flag for human validation"

  fast_track: "If 5+ sources agree, rule is HIGH confidence and skips Roundtable"

  triangulation_record:
    - "For each rule, record which sources were checked and whether they confirmed"
    - "Record the source file/line/snippet for each confirming source"
```

---

## AGENT B: domain-modeler — L6 Domain Entity Extraction

**Methodology:** Eric Evans DDD-adapted 4-pass extraction process

### Domain Pass 1: Entity Extraction from Data Layer

**Actions:**
```yaml
entity_extraction:
  sources:
    schema_files:
      - "*.prisma → model definitions"
      - "*.graphql → type definitions"
      - "migrations/ → table definitions and constraints"
      - "schema.rb → ActiveRecord models"
      - "*.sql → CREATE TABLE statements"
    model_files:
      - "Grep: class * extends BaseEntity, @Entity, @Table annotations"
      - "Grep: interface * { ... } in domain/ or models/ directories"
    dto_files:
      - "Grep: *DTO, *Request, *Response class definitions"

  per_entity:
    - "Name: Use the business name (not technical artifact name)"
    - "Attributes: Extract with type and business meaning"
    - "Relationships: FK references, embed relationships, reference arrays"
    - "Classify: aggregate_root | entity | value_object"
    - "Constraints: Database-level constraints (NOT NULL, UNIQUE, CHECK)"
```

### Domain Pass 2: Boundary Discovery from Dependency Graph

**Actions:**
```yaml
boundary_discovery:
  input: "dependency-graph.yaml (Phase 1)"
  method:
    - "Load module clusters from Phase 1 bounded-context-hypotheses.yaml"
    - "Validate each hypothesis against entity co-location"
    - "Entities in same cluster = same bounded context candidate"
    - "Entities referenced across clusters = integration points"

  context_mapping:
    patterns:
      - "Customer/Supplier: One context consumes another's data"
      - "Shared Kernel: Two contexts share a common model subset"
      - "Conformist: One context follows another's schema without negotiation"
      - "Anti-Corruption Layer: Explicit translation between contexts"
    method: "Infer pattern from import direction and data transformation code"
```

### Domain Pass 3: Ubiquitous Language Extraction

**Actions:**
```yaml
ubiquitous_language:
  sources:
    - "All entity names from Pass 1"
    - "All method names in domain files"
    - "All event names (EventEmitter patterns, Kafka topics, domain events)"
    - "UI labels from frontend files (button text, form labels, error messages)"
    - "API endpoint paths (nouns in URL paths)"
    - "Log messages (especially info-level business event logs)"
    - "README and documentation files"
    - "Comment blocks in domain logic files"

  processing:
    - "Collect all candidate terms"
    - "Group by bounded context"
    - "Identify synonyms: same business concept, different code names"
    - "Identify homonyms: same code name, different meaning in different contexts"
    - "Define each term in plain English from business perspective"

  output:
    term: "The exact word/phrase used in code"
    definition: "Business meaning in plain English"
    context: "Which bounded context this term belongs to"
    synonyms: "Other names for the same concept"
    source_locations: "Files where this term appears"
```

### Domain Pass 4: Cross-Reference with L5 Rules

**Actions:**
```yaml
l5_crossref:
  for_each_business_rule_from_rule-archaeologist:
    - "Identify which domain entities are involved"
    - "Assign the rule to its owning bounded context"
    - "Flag rules that span multiple bounded contexts (integration rules)"
    - "Flag entities that have no business rules (may be pure infrastructure)"

  validation_checks:
    - "Every bounded context must contain at least 1 business rule"
    - "Every business rule must reference at least 1 domain entity"
    - "Rules spanning 2+ contexts must be documented as integration rules"
```

---

## Parallel Execution Coordination

```yaml
parallel_execution:
  start_condition: "DD_SLC_001 passed AND both agents available"
  synchronization_point: "After both agents complete their final pass"

  data_exchange:
    during_execution:
      - "rule-archaeologist writes drafts to: outputs/{repo-name}/phase-3/draft-rules.yaml"
      - "domain-modeler reads draft rules (read-only) during Pass 4 for cross-reference"
      - "No other cross-agent reads during execution"
    after_execution:
      - "Merge: rule-archaeologist output + domain-modeler output"
      - "Cross-reference: each rule gets its entity assignments, each entity gets its rule list"

  max_passes:
    rule-archaeologist: "3 passes (SCAN → READ → SYNTHESIZE) — no infinite loops"
    domain-modeler: "4 passes (ENTITIES → BOUNDARIES → LANGUAGE → VALIDATE)"
    retry_policy: "If LLM extraction fails (token limit), retry with smaller context window — never same prompt"
```

---

## Business Rule Output Format

```yaml
# business-rules.yaml
metadata:
  extraction_date: "{ISO 8601}"
  extractor_agent: "rule-archaeologist"
  total_rules: 0
  rules_by_confidence:
    high: 0
    medium: 0
    low: 0

rules:
  - id: "BR-001"
    name: "Order minimum order amount threshold"
    category: "validation"
    bounded_context: "Order Management"
    condition: "IF customer.creditTier is not ENTERPRISE AND order.total is less than minimum order amount"
    action: "THEN reject the order with an insufficient minimum error"
    rationale: "BECAUSE the business requires a minimum order amount to cover processing costs"
    confidence: "HIGH"
    evidence:
      code:
        source_file: "src/services/order-validator.ts"
        source_line: 142
        snippet: "if (order.total < MIN_ORDER_AMOUNT && customer.tier !== 'enterprise') { ... }"
      schema:
        source_file: "prisma/schema.prisma"
        detail: "orders.total has CHECK constraint > 0"
      tests:
        source_file: "src/services/__tests__/order-validator.test.ts"
        assertion: "expect(validateOrder({total: 10})).toThrow(OrderBelowMinimumError)"
      api:
        detail: "POST /orders returns 422 with error code ORDER_BELOW_MINIMUM"
      comments: null
      ui: null
      logs: null
      source_count: 4
      triangulated: true
    related_entities: ["Order", "Customer"]
    related_rules: []
    l8_tech_debt_notes: ""
    extracted_by: "rule-archaeologist"
    validated_by: "pending-phase-5"
    validation_date: ""
    roundtable_required: false
    roundtable_id: ""
```

---

## Domain Entity Output Format

```yaml
# domain-entities.yaml
metadata:
  extraction_date: "{ISO 8601}"
  extractor_agent: "domain-modeler"
  total_entities: 0
  total_bounded_contexts: 0

bounded_contexts:
  - name: "Order Management"
    classification: "Core"
    description: "Handles the complete order lifecycle from creation to fulfillment"
    confidence: "HIGH"
    entities:
      - name: "Order"
        type: "aggregate_root"
        bounded_context: "Order Management"
        attributes:
          - { name: "id", type: "UUID", business_meaning: "Unique order identifier" }
          - { name: "status", type: "enum", business_meaning: "Current lifecycle state of the order" }
          - { name: "total", type: "Decimal", business_meaning: "Total order amount after discounts and taxes" }
        relationships:
          - { target: "OrderItem", type: "contains", cardinality: "1:N" }
          - { target: "Customer", type: "placed_by", cardinality: "N:1" }
        business_rules: ["BR-001", "BR-003"]
        source_files:
          - "src/models/order.ts"
          - "prisma/schema.prisma"
        confidence: "HIGH"
    ubiquitous_language:
      - { term: "checkout", definition: "The act of converting a shopping cart into a pending order", context: "Order Management" }
      - { term: "fulfillment", definition: "The process from order confirmation through to delivery", context: "Order Management" }
    source_directories:
      - "src/orders/"

# domain-events.yaml
domain_events:
  - id: "DE-001"
    name: "OrderPlaced"
    trigger: "Customer completes checkout"
    payload_fields: ["order_id", "customer_id", "total", "items_count"]
    bounded_context: "Order Management"
    source_file: "src/events/order-events.ts"
    source_line: 12
    listeners: ["notifications-service", "inventory-service"]
    confidence: "HIGH"
```

---

## Veto Conditions

| ID | Condition | Type | Action |
|----|-----------|------|--------|
| DD_SUM_001 | `business_rules_count < 50` from a codebase with `total_loc > 100000` | HARD VETO | Likely extraction failure. The codebase cannot have only 50 business rules at this size. Retry with expanded scan patterns or smaller context windows. Max 1 retry. |
| DD_SUM_002 | `bounded_contexts_count < 2` from a codebase with `total_loc > 50000` | WARN (escalated) | Insufficient domain modeling. Either the codebase is a monolith with no module separation (valid outcome, note it) or the extraction failed to find boundaries. Escalate to chief for decision. |
| DD_SUM_003 | `triangulated_rules_percentage < 40%` (fewer than 40% of rules have 2+ evidence sources) | WARN | Evidence quality is low. Phase 5 validation will require extra scrutiny. Note in summary. |
| DD_SUM_W01 | `low_confidence_rules_percentage > 40%` | WARN | More than 40% of extracted rules are LOW confidence — will require significant human review in Phase 5. |
| DD_SUM_W02 | `domain_events_count == 0` | WARN | No domain events detected — system may be purely synchronous or events use non-standard patterns. Note in output. |

---

## Outputs

| Artifact | Format | Path | Description |
|----------|--------|------|-------------|
| `business-rules.yaml` | YAML | `outputs/{repo-name}/phase-3/business-rules.yaml` | Full IF/THEN/BECAUSE rule catalog with evidence and confidence |
| `domain-entities.yaml` | YAML | `outputs/{repo-name}/phase-3/domain-entities.yaml` | All entities, aggregates, value objects, and bounded contexts |
| `domain-events.yaml` | YAML | `outputs/{repo-name}/phase-3/domain-events.yaml` | Catalog of domain events with triggers and payloads |
| `ubiquitous-language-draft.yaml` | YAML | `outputs/{repo-name}/phase-3/ubiquitous-language-draft.yaml` | Draft glossary (refined in Phase 4) |
| `extraction-summary.yaml` | YAML | `outputs/{repo-name}/phase-3/extraction-summary.yaml` | Counts, confidence distribution, extraction metrics |

---

## Completion Criteria

**Checkpoint:** `DD_SUM_001` — Deep Extraction Complete

```yaml
heuristic_id: DD_SUM_001
name: "Deep Extraction Gate Passed"
blocking: true
required_before: "phase-4-model"

criteria:
  - business_rules_yaml_exists: true
  - domain_entities_yaml_exists: true
  - domain_events_yaml_exists: true
  - business_rules_count: ">= 10 (absolute minimum regardless of codebase size)"
  - bounded_contexts_count: ">= 1"
  - no_hard_veto_fired: true
  - rule_entity_crossref_complete: true

on_fail:
  action: "STOP pipeline — report extraction metrics and ask for retry guidance"
  retry_allowed: true
  retry_condition: "Expand scan patterns OR reduce context window size OR add focus area"
  max_retries: 1
```

## Agent Notes

- **Model routing:** L5 extraction MUST use Opus. The semantic reasoning required to interpret a business rule from an if/else block cannot be done reliably with Haiku or Sonnet. Use `model: "opus"` when spawning rule-archaeologist tasks.
- **Max 3 passes for L5:** Do not add a fourth pass to "refine" rules. The refinement happens in Phase 5 (validation). Phase 3 is for extraction, not perfection.
- **Read-only always:** Neither agent modifies ANY source file. All outputs go to `outputs/{repo-name}/phase-3/`.
- **No invention:** If a rule's rationale cannot be inferred from the code, mark as `RATIONALE_INFERRED: true`. Never fabricate a business reason.
- **Parallelism handshake:** rule-archaeologist and domain-modeler must both signal completion before the merge step begins. Neither agent waits for the other during their passes — they run independently.
