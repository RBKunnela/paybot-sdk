# Domain Decoder Report: {repo_name}

<!-- TEMPLATE INSTRUCTIONS (remove before delivery):
     Replace all {placeholder} values with actual extracted data.
     Sections marked [REQUIRED] must be populated — never left empty.
     Sections marked [IF APPLICABLE] may be replaced with "Not detected in this codebase" if empty.
     This template produces the executive-summary.md in outputs/{repo-name}/final/
-->

**Generated:** {date}
**Repository:** {repo_url}
**Scope:** {scope} — {scope_description}
**Languages:** {languages_comma_separated}
**LOC:** {total_loc:,} lines of source code
**Extraction Depth:** L1–L{max_layer}
**Composite Validation Score:** {composite_score_pct}% ({composite_score_label})
**Extraction Duration:** {total_duration}

---

## Executive Summary [REQUIRED]

<!-- 2–3 paragraphs for non-technical stakeholders. No code references. No jargon. -->
<!-- Answer: What does this system do? Who uses it? What business problem does it solve? -->

{paragraph_1_what_system_does}

{paragraph_2_key_capabilities_and_scale}

{paragraph_3_strategic_context_and_recommendations}

---

## Architecture Overview [REQUIRED]

<!-- Include the simplified context map — maximum 6 contexts for executive view -->

```mermaid
{context_map_mermaid_simplified}
```

### Domain Areas ({bounded_contexts_count} identified)

| Domain Area | Type | Entities | Business Rules | Description |
|-------------|------|----------|----------------|-------------|
| {context_name} | {Core\|Supporting\|Generic} | {entity_count} | {rule_count} | {one_sentence_description} |

---

## Business Rules ({total_rules_count} extracted) [REQUIRED]

<!-- Summary table for executive view. Full catalog is in business-rule-catalog.md -->

| Category | Count | Avg Confidence | Highlight Rule |
|----------|-------|----------------|----------------|
| Validation | {n} | {pct}% | {top_rule_summary} |
| Calculation | {n} | {pct}% | {top_rule_summary} |
| Access Control | {n} | {pct}% | {top_rule_summary} |
| Routing | {n} | {pct}% | {top_rule_summary} |
| Transformation | {n} | {pct}% | {top_rule_summary} |
| Workflow | {n} | {pct}% | {top_rule_summary} |
| **Total** | **{total}** | **{avg_pct}%** | |

**Confidence Distribution:**
- HIGH ({high_pct}%): {high_count} rules — confirmed by 3+ independent sources
- MEDIUM ({med_pct}%): {med_count} rules — confirmed by 2 sources
- LOW ({low_pct}%): {low_count} rules — require human expert validation

**Items requiring human review:** {deferred_count} findings flagged for domain expert validation.
See `disputed-findings.yaml` for the full list with resolution requirements.

---

## Domain Model [REQUIRED]

### Bounded Contexts

<!-- Context map diagram — full version for technical stakeholders -->

```mermaid
{context_map_mermaid_full}
```

### Aggregate Map

<!-- Key aggregates and their relationships — 1 table per bounded context -->

#### {context_name_1} (Core Domain)

| Aggregate Root | Child Entities | Value Objects | Domain Events |
|----------------|----------------|---------------|---------------|
| {aggregate} | {entities} | {value_objects} | {events} |

#### {context_name_2} ({classification})

| Aggregate Root | Child Entities | Value Objects | Domain Events |
|----------------|----------------|---------------|---------------|
| {aggregate} | {entities} | {value_objects} | {events} |

### Ubiquitous Language Glossary

<!-- Key terms — full glossary is in domain-glossary.md -->

| Term | Context | Definition |
|------|---------|-----------|
| {term} | {context} | {definition} |

*Full glossary: {ubiquitous_language_terms_count} terms defined in `domain-glossary.md`*

---

## Business Model [IF APPLICABLE]

<!-- If no financial logic detected: "No monetization logic was detected in this codebase.
     The system appears to be [internal tooling / open-source / B2B with external billing]." -->

**Business Model Type:** {model_type}
**Revenue Streams:** {revenue_streams_count}
**Pricing Tiers:** {tiers_count}

### Revenue Flows

| Revenue Stream | Type | Mechanism | Source Location |
|----------------|------|-----------|-----------------|
| {stream_name} | {one-time\|recurring\|usage-based} | {description} | `{file}` |

### Pricing Matrix

| Plan | Monthly Price | Annual Price | Key Limits |
|------|--------------|--------------|------------|
| {plan_name} | {price} | {price} | {limits_summary} |

### Key Monetization Rules

1. {monetization_rule_1}
   — Source: `{file}` line {N}

2. {monetization_rule_2}
   — Source: `{file}` line {N}

3. {monetization_rule_3}
   — Source: `{file}` line {N}

### User Lifecycle

```mermaid
{user_lifecycle_mermaid}
```

---

## Tech Debt Assessment [REQUIRED]

### Summary

| Metric | Value |
|--------|-------|
| Total tech debt items | {total_debt_count} |
| Critical severity | {critical_count} |
| High severity | {high_count} |
| Medium severity | {medium_count} |
| Low severity | {low_count} |
| Hotspot files (high complexity + high change) | {hotspot_count} |
| Business rules without test coverage | {untested_rules_count} of {total_rules_count} |
| Test coverage of business rules | {tested_rules_pct}% |

### Hotspots (Top 10 Most Business-Critical Risk Areas)

<!-- Hotspots = files with high complexity AND high change frequency (Tornhill method) -->

| # | Area | Risk Level | Business Rules Affected | Concern |
|---|------|-----------|------------------------|---------|
| 1 | {file_or_module} | {CRITICAL\|HIGH\|MEDIUM} | {N} rules | {plain_english_concern} |
| 2 | {file_or_module} | | | |
| 3 | {file_or_module} | | | |
| 4 | {file_or_module} | | | |
| 5 | {file_or_module} | | | |

*Full hotspot analysis in `tech-debt-report.md`*

### Top 5 Recommendations

| Priority | Action | Business Impact | Estimated Effort | Risk if Ignored |
|----------|--------|-----------------|-----------------|-----------------|
| 1 (HIGH) | {action} | {business_impact} | {effort} | {risk} |
| 2 (HIGH) | {action} | {business_impact} | {effort} | {risk} |
| 3 (MEDIUM) | {action} | {business_impact} | {effort} | {risk} |
| 4 (MEDIUM) | {action} | {business_impact} | {effort} | {risk} |
| 5 (LOW) | {action} | {business_impact} | {effort} | {risk} |

---

## Coverage Metrics [REQUIRED]

| Metric | Score | Threshold | Status |
|--------|-------|-----------|--------|
| Entry Point Coverage | {score_pct}% | ≥ 85% | {PASS\|FAIL\|WARN} |
| Test-Implied Rule Coverage | {score_pct}% | ≥ 70% | {PASS\|FAIL\|WARN} |
| Domain Entity Coverage | {score_pct}% | ≥ 80% | {PASS\|FAIL\|WARN} |
| Conditional Logic Coverage | {score_pct}% | ≥ 75% | {PASS\|FAIL\|WARN} |
| **Composite Score** | **{composite_pct}%** | **≥ 70%** | **{PASS\|FAIL}** |

**Interpretation:**
{1-2 sentence interpretation of what the composite score means for this specific codebase}

---

## Appendix

### A. Full Business Rule Catalog

Full catalog with source file references, confidence scores, and evidence documentation:
`outputs/{repo-name}/final/business-rule-catalog.md`

- Technical view (with source references): Section 1
- Business view (plain English): Section 2
- Executive view (top 10 rules): Section 3

### B. Disputed Findings

{deferred_count} findings were deferred for human expert validation:
`outputs/{repo-name}/phase-5/disputed-findings.yaml`

Each disputed finding includes:
- The proposed extraction
- The challenge that was raised
- What evidence would resolve the dispute

### C. Architecture Diagrams

All architecture diagrams (Mermaid format):
`outputs/{repo-name}/final/architecture-deck/`

- `01-context-map.mermaid` — Bounded context relationships
- `02-dependency-graph.mermaid` — Module dependency graph
- `03-data-flow.mermaid` — Data flow through key contexts
- `04-state-machines.mermaid` — Entity state lifecycle diagrams
- `05-user-lifecycle.mermaid` — User journey state machine

### D. Methodology Notes

**Extraction Method:** Code DNA 8-Layer Framework (L1–L8)
**Rule Format:** IEEE 5-step Business Rule Extraction (BRE)
**Validation:** Roundtable Protocol (Propositor → Devil's Advocate → Arbiter)
**Confidence System:** Triangulation (3+ sources = HIGH, 2 = MEDIUM, 1 = LOW)
**Expert Methodology References:**
- L5 Business Rules: Michael Feathers (Seam Model, characterization techniques)
- L6 Domain Model: Eric Evans (DDD, bounded contexts, ubiquitous language)
- L7 Business Model: Sam Newman (service decomposition, revenue flow tracing)
- L8 Tech Debt: Adam Tornhill (behavioral code analysis, hotspot detection)

**Raw extraction outputs:** `outputs/{repo-name}/phase-{N}/` directories
**Pipeline log:** `outputs/{repo-name}/pipeline-log.yaml`
**Full pipeline summary:** `outputs/{repo-name}/pipeline-summary.yaml`

---

*Generated by Domain Decoder v1.0 — Synkra AIOS*
*Extraction confidence: {composite_score_pct}% | Rules: {total_rules_count} | Contexts: {bounded_contexts_count}*
