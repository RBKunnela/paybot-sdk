# Task: Phase 5 — Validation

**Task ID:** phase-5-validate
**Version:** 1.0
**Agent:** validation-arbiter
**Execution Type:** Sequential — structured Roundtable debate protocol with coverage scoring
**Purpose:** Validate all extracted findings from Phases 3 and 4 using the Roundtable Protocol (Propositor → Devil's Advocate → Arbiter) and coverage metrics, computing a composite validation score. Findings below the threshold are flagged for human review or re-extraction.

---

## Overview

Phase 5 is the quality gate that separates confident findings from speculation. No matter how rigorous the extraction in Phases 3 and 4 was, business rule extraction from code is inherently probabilistic. Phase 5 applies a structured challenge-and-defend mechanism to every L5–L7 finding, then measures coverage across four dimensions to compute a composite score. If the composite is below 0.70, the phase vetoes and re-extraction is required.

This phase implements the Roundtable Protocol from the Domain Decoder brainstorm, adapted from the MMOS debate agent (steel-man format).

```
INPUT: business-rules.yaml, domain-entities.yaml, domain-events.yaml,
       context-map.mermaid, aggregate-map.yaml, ubiquitous-language.yaml,
       business-model-canvas.yaml, pricing-matrix.yaml
    ↓
[STEP 5.1] Triage findings — which require Roundtable, which are fast-tracked
    ↓
[STEP 5.2] Batch Roundtable debates — Propositor → Devil's Advocate → Arbiter
    ↓
[STEP 5.3] Apply triangulation scoring — source count → confidence label
    ↓
[STEP 5.4] Calculate coverage metrics across 4 dimensions
    ↓
[STEP 5.5] Compute composite validation score
    ↓
[VETO CHECK] Composite score >= 0.70 (BLOCKING)
    ↓
[STEP 5.6] Generate validation report with per-finding verdicts
    ↓
OUTPUT: validation-report.yaml, coverage-metrics.yaml, disputed-findings.yaml
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `business_rules` | YAML file | Yes | `outputs/{repo-name}/phase-3/business-rules.yaml` |
| `domain_entities` | YAML file | Yes | `outputs/{repo-name}/phase-3/domain-entities.yaml` |
| `domain_events` | YAML file | Yes | `outputs/{repo-name}/phase-3/domain-events.yaml` |
| `aggregate_map` | YAML file | Yes | `outputs/{repo-name}/phase-4/aggregate-map.yaml` |
| `context_map` | Mermaid file | Yes | `outputs/{repo-name}/phase-4/context-map.mermaid` |
| `ubiquitous_language` | YAML file | Yes | `outputs/{repo-name}/phase-4/ubiquitous-language.yaml` |
| `business_model_canvas` | YAML file | Yes | `outputs/{repo-name}/phase-4/business-model-canvas.yaml` |
| `entry_points` | YAML file | Yes | `outputs/{repo-name}/phase-1/entry-points.yaml` (for coverage calculation) |

**Skills to Reuse:**
- `clone-engineering:tasks:mind-mapper-triangulate` — triangulation scoring methodology (reuse as-is)
- `clone-engineering:tasks:fidelity-tester-run-scenarios` — 5-dimension confidence scoring (adapted dimensions)
- `quality-shield:tasks:regression-check` — validate extracted rules haven't changed between passes

---

## Preconditions

- [ ] DD_DDD_001 (Model Recovery Gate) has passed
- [ ] All Phase 3 and Phase 4 output files exist and are valid YAML
- [ ] validation-arbiter agent is active
- [ ] No pending parallel agent operations (Phases 3 and 4 both fully complete)

---

## Phase Steps

### Step 5.1: Finding Triage — Roundtable Routing

**Purpose:** Not every finding needs full Roundtable debate. Route findings efficiently to avoid token waste while ensuring quality.

**Actions:**
```yaml
roundtable_routing:
  fast_track_conditions:
    - "Finding has source_count >= 5 (5+ independent evidence sources)"
    - "L1–L4 finding with confidence HIGH"
    - "Entity attribute with direct schema source (NOT NULL, type definition)"
    - "Domain event with explicit EventEmitter.emit() call and registered listener"
    → "Add to fast-track list — assign current confidence, no debate needed"

  mandatory_roundtable_conditions:
    - "All L5 business rule findings, ANY confidence level"
    - "L6 bounded context boundary decisions"
    - "L7 business model findings (revenue streams, pricing rules)"
    - "L8 tech debt findings with severity HIGH"
    - "Any finding where two extracted rules contradict each other"
    - "Any finding with confidence LOW"
    → "Add to roundtable queue"

  batch_strategy:
    - "Group related findings by bounded context for debate efficiency"
    - "Debate the cluster as a unit — not each finding individually"
    - "Maximum batch size: 10 findings per debate round"
    - "Time-box: 3 rounds maximum per batch (propose, challenge, resolve)"
```

### Step 5.2: Roundtable Protocol Execution

**Purpose:** For each batch of findings, execute the structured Propositor → Devil's Advocate → Arbiter debate.

**Roles:**
```yaml
roundtable_roles:
  propositor:
    identity: "The agent that discovered the finding (rule-archaeologist for L5, domain-modeler for L6, business-model-analyst for L7)"
    responsibility: "Present the finding with ALL evidence. Must cite minimum 2 independent sources."

  devils_advocate:
    identity: "validation-arbiter (acting as DA)"
    responsibility: |
      Challenge the finding rigorously. Must provide at least ONE of:
      - Alternative interpretation of the same code
      - Missing evidence that should exist but doesn't
      - Contradiction with another extracted finding
      - Scope error (rule is too broad or too narrow)
      Note: Devil's Advocate must use EVIDENCE, not opinion. "I doubt it" is not a valid challenge.

  arbiter:
    identity: "validation-arbiter (final verdict)"
    responsibility: |
      After hearing propositor and Devil's Advocate:
      1. Assess the strength of both cases
      2. Make one of four decisions: accept | reject | revise | defer
      3. Document reasoning
      4. Assign final confidence label
```

**Debate Format:**
```yaml
roundtable_entry_format:
  id: "RT-{layer}-{sequence}"
  batch_id: "BATCH-{bounded_context}-{sequence}"
  finding_ids: ["BR-001", "BR-002"]  # Findings in this debate
  layer: "L5 | L6 | L7"

  propositor_statement:
    agent: "rule-archaeologist"
    finding_summary: "Plain English description of what was found"
    evidence:
      code_refs:
        - { file: "src/orders/order-service.ts", lines: "142-168", snippet: "..." }
      schema_refs:
        - { table: "orders", constraint: "total > 0 CHECK" }
      test_refs:
        - { file: "tests/orders.test.ts", assertion: "expects 422 when total < 25" }
      other_refs:
        - { type: "api", detail: "POST /orders returns ORDER_BELOW_MINIMUM" }
      source_count: 4

  devils_advocate_challenge:
    agent: "validation-arbiter (DA role)"
    challenge_type: "alternative_interpretation | missing_evidence | contradiction | scope_error"
    argument: "The $25 minimum appears in 3 different hardcoded locations — the 'real' rule may not be $25 but rather derived from a config. Is there a config file that overrides this?"
    counter_evidence: "src/config/business.ts line 12 defines MIN_ORDER_AMOUNT = process.env.MIN_ORDER || 25"
    recommendation: "revise"

  arbiter_decision:
    verdict: "accepted | rejected | revised | deferred"
    rationale: "The finding is valid but the DA identified that the value is configurable. Revise to: IF MIN_ORDER_AMOUNT is exceeded (default: $25, configurable)"
    revision_applied: "Updated condition to reference configurable minimum"
    final_confidence: "HIGH | MEDIUM | LOW"
    dispute_resolved: true
```

### Step 5.3: Triangulation Confirmation

**Purpose:** Apply the standard triangulation scoring to all findings (including fast-tracked) to assign/confirm confidence labels.

**Actions:**
```yaml
triangulation_scoring:
  method:
    - "For each finding, count independent source types that confirm it"
    - "Sources: code, schema, tests, comments, api, ui, logs"
    - "Each source type counts at most once (multiple code refs = 1 code source)"

  labels:
    high: "3+ independent source types confirm the finding"
    medium: "2 independent source types confirm"
    low: "1 source type only"

  downgrade_triggers:
    - "Finding was revised during Roundtable → downgrade by 1 level (HIGH → MEDIUM, MEDIUM → LOW)"
    - "Finding's evidence includes only comments (highest uncertainty source) → cap at MEDIUM"
    - "Finding spans 2+ bounded contexts without an Anti-Corruption Layer → flag as 'integration_risk'"

  flag_for_human_review:
    conditions:
      - "final_confidence == LOW after Roundtable"
      - "Finding was rejected but propositor disagrees (escalated dispute)"
      - "Finding has no test evidence AND it's an L5 business rule"
      - "Contradicts another accepted finding"
```

### Step 5.4: Coverage Metrics Calculation

**Purpose:** Measure how well the extraction covers the system's observable behavior across four dimensions.

**Actions:**
```yaml
coverage_dimensions:
  dimension_1_entry_point_coverage:
    label: "Entry Point Coverage"
    target: ">= 85%"
    weight: 0.35
    method:
      - "For each entry point in entry-points.yaml:"
      - "Check: does at least 1 business rule reference this entry point's handler file?"
      - "Score: covered_entry_points / total_entry_points"
    rationale: "Entry points are the observable API surface. Every entry point should have at least one business rule explaining what it does."

  dimension_2_test_implied_coverage:
    label: "Test-Implied Rule Coverage"
    target: ">= 70%"
    weight: 0.25
    method:
      - "For each test file in the test suite:"
      - "Extract: what business assertions does this test make? (expect conditions)"
      - "Check: is there a corresponding extracted business rule for this assertion?"
      - "Score: matched_test_assertions / total_test_assertions"
    rationale: "Tests encode business expectations. If a test checks a condition and we didn't extract that condition as a rule, we missed something."

  dimension_3_entity_coverage:
    label: "Domain Entity Coverage"
    target: ">= 80%"
    weight: 0.25
    method:
      - "For each domain entity in domain-entities.yaml:"
      - "Check: does at least 1 business rule reference this entity?"
      - "Score: entities_with_rules / total_entities"
    rationale: "A domain entity with no business rules is either pure infrastructure (acceptable) or a missed extraction target (problem)."

  dimension_4_conditional_coverage:
    label: "Conditional Logic Coverage"
    target: ">= 75%"
    weight: 0.15
    method:
      - "Grep the selected slices for: if, switch, ternary (?) in service/domain files"
      - "Total conditional count: N"
      - "Matched conditionals: conditions that correspond to an extracted business rule"
      - "Score: matched_conditionals / total_conditionals"
    rationale: "Every business conditional in the code should have a corresponding business rule. This measures extraction completeness at the code level."
```

### Step 5.5: Composite Score Computation

**Formula:**
```
composite_score = (entry_point_coverage × 0.35)
               + (test_implied_coverage × 0.25)
               + (entity_coverage × 0.25)
               + (conditional_coverage × 0.15)
```

**Confidence Scoring Formula (per-finding):**
```
finding_confidence_score = (completeness × 0.30)
                         + (accuracy × 0.25)
                         + (clarity × 0.20)
                         + (traceability × 0.15)
                         + (confidence_label × 0.10)
```

| Dimension | Scoring Criteria |
|-----------|-----------------|
| `completeness` | Does the rule cover all known edge cases from the code? (0–1) |
| `accuracy` | Does the rule correctly describe what the code does? (0–1) |
| `clarity` | Is the rule understandable by a non-technical business analyst? (0–1) |
| `traceability` | Can the rule be traced back to a specific source file and line? (0–1) |
| `confidence_label` | HIGH=1.0, MEDIUM=0.6, LOW=0.2 |

### Step 5.6: Generate Validation Report

**Actions:**
```yaml
report_generation:
  per_finding_verdict:
    - "accepted: Propositor's case held up, DA challenge was addressed"
    - "accepted_revised: Accepted with modifications from Roundtable"
    - "rejected: Finding is not supported by evidence — remove from catalog"
    - "deferred: Insufficient evidence to decide — flag for human expert review"
    - "fast_tracked: HIGH confidence, skipped Roundtable per routing rules"

  aggregate_metrics:
    - "Total findings reviewed: N"
    - "Accepted (unchanged): N"
    - "Accepted (revised): N"
    - "Rejected: N"
    - "Deferred (human review required): N"
    - "Fast-tracked: N"
    - "Rejection rate: N% (warn if > 30%)"
    - "Composite coverage score: X.XX"

  disputed_findings_catalog:
    - "All rejected findings with reasoning"
    - "All deferred findings with what evidence is needed to resolve"
    - "All escalated disputes (propositor disagrees with verdict)"
```

---

## Veto Conditions

| ID | Condition | Type | Action |
|----|-----------|------|--------|
| DD_VAL_001 | `composite_coverage_score < 0.70` | HARD VETO (BLOCKING) | Pipeline stops. Must re-extract. Report which dimension is failing and provide targeted re-extraction recommendation (e.g., "Entry point coverage at 51% — re-run Phase 3 with focus on uncovered entry points"). |
| DD_VAL_002 | `rejection_rate > 30%` | WARN (escalated to chief) | More than 30% of Roundtable debates resulted in rejections — indicates the extraction methodology produced too many low-quality findings. Chief must decide: accept remaining findings and proceed, or re-extract targeted slices. |
| DD_VAL_003 | `deferred_findings_percentage > 20%` | WARN | More than 20% of findings are deferred — high human review burden. Note prominently in validation report and executive summary. |
| DD_VAL_W01 | `entity_coverage < 50%` (before veto threshold) | WARN | More than half of domain entities have no associated business rules. Either the entities are pure infrastructure or the rule extraction missed significant domain logic. |

---

## Outputs

| Artifact | Format | Path | Description |
|----------|--------|------|-------------|
| `validation-report.yaml` | YAML | `outputs/{repo-name}/phase-5/validation-report.yaml` | Per-finding verdicts with Roundtable debate records |
| `coverage-metrics.yaml` | YAML | `outputs/{repo-name}/phase-5/coverage-metrics.yaml` | All 4 coverage dimensions with scores and composite |
| `disputed-findings.yaml` | YAML | `outputs/{repo-name}/phase-5/disputed-findings.yaml` | Rejected and deferred findings requiring human review |
| `validated-business-rules.yaml` | YAML | `outputs/{repo-name}/phase-5/validated-business-rules.yaml` | Cleaned rule catalog (only accepted findings) |
| `validated-domain-model.yaml` | YAML | `outputs/{repo-name}/phase-5/validated-domain-model.yaml` | Cleaned domain model (accepted entities + contexts) |

---

## Completion Criteria

**Checkpoint:** `DD_VAL_001` — Validation Gate Passed

```yaml
heuristic_id: DD_VAL_001
name: "Validation Gate Passed"
blocking: true
required_before: "phase-6-document"

criteria:
  - validation_report_exists: true
  - coverage_metrics_exist: true
  - composite_coverage_score: ">= 0.70"
  - validated_business_rules_exist: true
  - validated_domain_model_exists: true
  - no_hard_veto_fired: true

on_fail:
  action: "STOP pipeline — surface failing coverage dimension and recommend re-extraction"
  retry_allowed: true
  retry_condition: "Re-run Phase 3 with targeted expansion on low-coverage area"
  max_retries: 1
```

## Agent Notes

- **Arbiter role integrity:** The validation-arbiter plays both Devil's Advocate and Arbiter within the same debate. This is an intentional design — it forces the arbiter to genuinely consider the challenge before making a verdict. The arbiter must not rubber-stamp the propositor's findings.
- **Efficiency safeguard:** If the total number of findings is large (>200 rules), batch debates aggressively. A single batch can cover an entire bounded context. The goal is quality assurance, not exhaustive individual interrogation.
- **Triangulation is objective:** Confidence labels must reflect source count, not the arbiter's intuition. HIGH = 3+ sources, period. No exceptions.
- **Deferred is not rejected:** Deferred findings are legitimate outputs. They represent the honest boundary of what the extraction can determine without human domain expertise. They appear in the final report as "requires validation" — not as failures.
- **Model routing:** Phase 5 requires Opus for the Roundtable debate reasoning. The arbiter must be capable of genuine argumentation, not just pattern matching.
