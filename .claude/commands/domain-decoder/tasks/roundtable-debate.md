# Task: Roundtable Debate

**Task ID:** roundtable-debate
**Version:** 1.0
**Agent:** validation-arbiter
**Execution Type:** Sequential — structured 3-round debate protocol
**Purpose:** Run a focused Roundtable debate on a specific finding or set of findings that require challenge-and-defend validation before acceptance into the final catalog. Can be invoked standalone (for ad-hoc validation) or by Phase 5 as part of the pipeline validation process.

---

## Overview

The Roundtable is the core quality mechanism of Domain Decoder. It is a structured debate where every significant extracted finding must withstand challenge before being accepted. The protocol is adapted from the MMOS debate agent (steel-man format) and the academic peer review process.

**When to invoke Roundtable directly (outside Phase 5):**
- A domain expert disputes a specific finding after reviewing the catalog
- Two extracted findings appear to contradict each other
- A finding has LOW confidence and the user wants to attempt to elevate it
- A deferred finding (from Phase 5) receives new evidence and should be re-evaluated
- Spot-checking random findings for quality assurance

```
INPUT: finding_id(s) + evidence_for + optional evidence_against
    ↓
[STEP 1] Load finding(s) from source catalog
    ↓
[STEP 2] Propositor presentation — present evidence, cite sources
    ↓
[STEP 3] Devil's Advocate challenge — challenge with evidence, not opinion
    ↓
[STEP 4] Propositor rebuttal (if new evidence from DA)
    ↓
[STEP 5] Arbiter resolution — verdict + confidence assignment
    ↓
OUTPUT: Debate transcript + updated confidence for each finding
```

---

## Inputs

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `finding_ids` | list | Yes | One or more finding IDs to debate | `["BR-001", "BR-002"]` or `["DE-007"]` |
| `finding_source` | enum | Yes | Which catalog the findings come from | `"business_rules"`, `"domain_entities"`, `"domain_events"`, `"business_model"` |
| `evidence_for` | list | No | Additional evidence supporting the finding | `[{type: "test", file: "...", assertion: "..."}]` |
| `evidence_against` | list | No | Evidence challenging the finding | `[{type: "code", file: "...", observation: "contradicts finding"}]` |
| `batch_context` | string | No | Bounded context that unifies a batch of findings | `"Order Management"` |
| `focus` | string | No | Specific aspect to debate | `"Is the $25 minimum accurate or is it configurable?"` |

---

## Preconditions

- [ ] validation-arbiter agent is active
- [ ] The referenced finding IDs exist in their source catalog file
- [ ] If invoked by Phase 5: Phase 3 and Phase 4 outputs are complete

---

## Debate Protocol

### Round 1: Propositor Presentation

**Time-box:** One response per batch (no back-and-forth yet)

**Requirements:**
```yaml
propositor_statement:
  mandatory_elements:
    - "Plain English statement of the finding"
    - "Primary evidence (the strongest source)"
    - "Secondary evidence (at least 1 additional source)"
    - "Current confidence level and basis for that level"
    - "Any known limitations or gaps in the evidence"

  quality_gate:
    - "Propositor MUST cite at least 2 independent evidence sources"
    - "If only 1 source exists: finding automatically enters debate as LOW confidence"
    - "Evidence must be specific: file path + line number, not general claims"

  prohibited:
    - "No appeals to authority: 'This is clearly a rule' without evidence"
    - "No circular reasoning: 'It's a rule because it looks like a rule'"
    - "No speculation about business intent without code backing"
```

**Example propositor statement:**
```yaml
propositor:
  finding: "BR-001: Orders below $25 are rejected (except Enterprise tier)"
  primary_evidence:
    type: "code"
    file: "src/services/order-validator.ts"
    lines: "142-168"
    snippet: "if (order.total < MIN_ORDER_AMOUNT && customer.tier !== 'enterprise') { throw OrderBelowMinimumError }"
  secondary_evidence:
    - type: "test"
      file: "tests/order-validator.test.ts"
      assertion: "expects OrderBelowMinimumError when total=10 and tier=standard"
    - type: "api"
      detail: "POST /orders returns 422 ORDER_BELOW_MINIMUM when total < 25"
  current_confidence: "MEDIUM (2 sources)"
  known_gaps: "The $25 constant source was not found — may be hardcoded"
```

### Round 2: Devil's Advocate Challenge

**Time-box:** One response (no more than 5 challenges per batch)

**Requirements:**
```yaml
devils_advocate:
  mandatory_elements:
    - "At least 1 challenge with evidence (not opinion)"
    - "Challenge type classification"
    - "Recommendation: accept | reject | revise | needs_more_evidence"

  challenge_types:
    alternative_interpretation:
      description: "The code does what we claim, but the business reason is different"
      example: "The $25 isn't a business minimum — it's a payment processor minimum. Business rule is actually at the Stripe level."

    missing_evidence:
      description: "The claimed rule should leave other evidence traces that are absent"
      example: "If this were a firm business rule, it would appear in the API documentation or frontend error messages. Neither was found."

    contradiction:
      description: "Another extracted finding directly conflicts with this one"
      example: "BR-042 states that all orders under $50 need manager approval — but BR-001 says they're rejected. Both can't be true."

    scope_error:
      description: "The rule is stated too broadly or too narrowly"
      example: "The rule says 'all customers' but the code only applies to new customers (account.created_at > 30 days)."

    dead_code:
      description: "The code implementing the rule is unreachable or deprecated"
      example: "This function is called only from OrderServiceV1 which was replaced by OrderServiceV2 in commit abc123."

  prohibited:
    - "No challenges without evidence: 'I don't think this is right' is not a valid challenge"
    - "No more than 5 challenges per batch (time-box enforcement)"
    - "No re-challenging a finding that was already resolved in a previous Roundtable"
```

**Example DA challenge:**
```yaml
devils_advocate:
  challenge_type: "missing_evidence"
  argument: |
    If $25 is a firm business rule, it should appear in:
    (a) the frontend error message for failed checkout — not found in UI scan
    (b) the API documentation — not found in swagger.yaml
    (c) a named constant with a business-meaningful name — found, but as MIN_ORDER_AMOUNT = 25
    The absence of (a) and (b) suggests this may be a provisional implementation, not a firm business policy.
  counter_evidence:
    - type: "code"
      file: "src/constants/business.ts"
      observation: "MIN_ORDER_AMOUNT = process.env.MIN_ORDER || 25 — this is environment-configurable, suggesting it's a business-tunable parameter, not a hardcoded policy"
  recommendation: "revise"
  suggested_revision: "IF order.total < MIN_ORDER_AMOUNT (default: $25, configurable via environment) AND customer tier is not Enterprise THEN reject order"
```

### Round 3: Arbiter Resolution

**Time-box:** Final response — no additional rounds

**Requirements:**
```yaml
arbiter_resolution:
  must_address:
    - "Evaluate the strength of Propositor's case"
    - "Evaluate the validity of each DA challenge"
    - "Make a verdict (accept | reject | revise | defer)"
    - "Document reasoning — not just the verdict"
    - "Assign final confidence label"

  verdicts:
    accepted:
      conditions: "DA challenges were addressed or invalid. Finding stands."
      confidence_impact: "No change OR upgrade if DA helped surface new evidence"

    accepted_revised:
      conditions: "DA challenge revealed a legitimate issue. Finding is updated."
      confidence_impact: "Downgrade by 1 level (revision = uncertainty)"
      required: "Write the revised finding text"

    rejected:
      conditions: "DA challenge reveals the finding is unsupported or incorrect"
      confidence_impact: "N/A — finding is removed from catalog"
      required: "Document reason for rejection"

    deferred:
      conditions: "Evidence is insufficient to resolve. Needs human domain expert."
      confidence_impact: "Keep at LOW"
      required: "Document what evidence would resolve the debate"

  arbitration_prohibited:
    - "Arbiter cannot accept a finding that was never challenged (Roundtable requires genuine challenge)"
    - "Arbiter cannot defer a finding that has 3+ independent sources (triangulation resolves it)"
    - "Arbiter cannot change a verdict after it is recorded (immutable audit trail)"
```

**Example arbiter resolution:**
```yaml
arbiter:
  verdict: "accepted_revised"
  challenge_assessment: |
    The DA's challenge about configurability is valid — MIN_ORDER_AMOUNT IS environment-configurable.
    However, the business rule is still real: there IS a minimum, it IS enforced, and Enterprise IS exempt.
    The revision makes the finding more accurate without invalidating it.
  da_challenge_valid: true
  revision_applied: "Updated condition to reference MIN_ORDER_AMOUNT (default $25, configurable)"
  final_confidence: "HIGH"
  reasoning: |
    With the revision, we have: code (3 locations), test (2 assertions), API (error code).
    That's 3 independent source types = HIGH confidence.
  new_triangulation_score: "3/7 sources = HIGH"
```

---

## Output Format

```yaml
# debate-transcript-{batch_id}.yaml

metadata:
  debate_id: "RT-L5-{sequence}"
  batch_id: "BATCH-{bounded_context}-{sequence}"
  executed_at: "{ISO 8601}"
  arbiter_agent: "validation-arbiter"
  total_findings_debated: N
  verdicts:
    accepted: N
    accepted_revised: N
    rejected: N
    deferred: N
  elapsed_rounds: 3

debates:
  - finding_id: "BR-001"
    finding_layer: "L5"

    propositor:
      agent: "rule-archaeologist"
      statement: "..."
      evidence_sources: ["code", "test", "api"]
      source_count: 3
      initial_confidence: "MEDIUM"

    devils_advocate:
      challenge_type: "missing_evidence"
      argument: "..."
      counter_evidence: [...]
      recommendation: "revise"

    arbiter:
      verdict: "accepted_revised"
      reasoning: "..."
      revision: "Updated condition text"
      final_confidence: "HIGH"
      new_source_count: 3

  - finding_id: "BR-002"
    ...
```

---

## Veto Conditions

| ID | Condition | Type | Action |
|----|-----------|------|--------|
| RT_001 | Propositor cites 0 evidence sources | HARD VETO on finding | Finding is automatically deferred — cannot be accepted without evidence. |
| RT_002 | DA challenges with opinion only (no evidence) | DA challenge invalidated | Arbiter must note that DA challenge was invalidated and rule on Propositor's evidence alone. |
| RT_003 | Arbiter attempts to accept a finding with 0 evidence sources | HARD VETO | System prevents acceptance with no evidence. Finding must be rejected or deferred. |

---

## Outputs

| Artifact | Format | Path | Description |
|----------|--------|------|-------------|
| `debate-transcript-{batch_id}.yaml` | YAML | `outputs/{repo-name}/roundtable/{batch_id}-transcript.yaml` | Complete debate record |
| Updated source catalog | YAML | `outputs/{repo-name}/phase-5/validated-business-rules.yaml` | Findings updated with final confidence and verdicts |

---

## Completion Criteria

```yaml
completion_criteria:
  all_finding_ids_have_verdicts: true
  no_pending_rounds: true
  transcript_written: true
  source_catalog_updated: true
  no_accepted_findings_with_zero_evidence: true
```

## Agent Notes

- **Genuine challenge required:** The Devil's Advocate role must be performed authentically. Rubber-stamping the Propositor's findings defeats the purpose of the Roundtable. The arbiter must genuinely look for weaknesses.
- **Time-box is firm:** 3 rounds maximum. If resolution requires more rounds, the finding is deferred, not extended. Deferral is a valid outcome.
- **Batch efficiency:** Related findings (same bounded context, similar rule type) should be batched. The DA can make one overarching challenge that applies to the whole batch when appropriate.
- **Transcript is immutable:** Once written, debate transcripts cannot be edited. If a finding needs re-evaluation, a new debate session is opened with a new batch ID.
- **Model routing:** Roundtable debates require Opus for genuine argumentation quality. Do not run this task with Haiku or Sonnet.
