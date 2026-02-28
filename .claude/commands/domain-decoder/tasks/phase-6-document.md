# Task: Phase 6 — Documentation

**Task ID:** phase-6-document
**Version:** 1.0
**Agents:** documentation-scribe (primary — final report package), tech-debt-geologist (primary — tech debt report and hotspot analysis) — running in parallel
**Execution Type:** Parallel — scribe produces the main documentation package while geologist runs the L8 tech debt analysis, both contributing to the final output directory
**Purpose:** Generate the complete, publication-ready documentation package from all validated extraction outputs — producing architecture diagrams, business rule catalog, domain glossary, tech debt report, and executive summary in three audience views: Technical, Business, and Executive.

---

## Overview

Phase 6 transforms structured YAML data into human-consumable documentation. This is the phase that non-technical stakeholders will actually read. Every output must be understandable by its intended audience without requiring knowledge of the extraction process. The documentation-scribe produces narrative and visual outputs; the tech-debt-geologist produces the L8 debt analysis using behavioral code analysis methodology (Adam Tornhill's techniques).

```
INPUT: All validated outputs from Phase 5 + Phase 4 Mermaid files
    ↓
  [PARALLEL EXECUTION]
  ┌─────────────────────────────────────────────┬────────────────────────────────────────────────┐
  │ documentation-scribe                         │ tech-debt-geologist                            │
  │                                             │                                                │
  │ Step A: Architecture diagram package        │ Step A: TODO/FIXME/HACK scan (grep-based)     │
  │ Step B: Business rule catalog (all 3 views) │ Step B: Hotspot analysis (Tornhill method)    │
  │ Step C: Domain glossary                     │ Step C: Test gap analysis                     │
  │ Step D: Executive summary                   │ Step D: Tech debt report generation           │
  └─────────────────────────────────────────────┴────────────────────────────────────────────────┘
    ↓
[MERGE] Combine all outputs into final package
    ↓
[VETO CHECK] No empty sections
    ↓
OUTPUT: Complete documentation package in outputs/{repo-name}/final/
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `validated_business_rules` | YAML file | Yes | `outputs/{repo-name}/phase-5/validated-business-rules.yaml` |
| `validated_domain_model` | YAML file | Yes | `outputs/{repo-name}/phase-5/validated-domain-model.yaml` |
| `coverage_metrics` | YAML file | Yes | `outputs/{repo-name}/phase-5/coverage-metrics.yaml` |
| `disputed_findings` | YAML file | Yes | `outputs/{repo-name}/phase-5/disputed-findings.yaml` |
| `context_map` | Mermaid file | Yes | `outputs/{repo-name}/phase-4/context-map.mermaid` |
| `aggregate_map` | YAML file | Yes | `outputs/{repo-name}/phase-4/aggregate-map.yaml` |
| `ubiquitous_language` | YAML file | Yes | `outputs/{repo-name}/phase-4/ubiquitous-language.yaml` |
| `business_model_canvas` | YAML file | Yes | `outputs/{repo-name}/phase-4/business-model-canvas.yaml` |
| `pricing_matrix` | YAML file | Yes | `outputs/{repo-name}/phase-4/pricing-matrix.yaml` |
| `user_lifecycle` | Mermaid file | Yes | `outputs/{repo-name}/phase-4/user-lifecycle.mermaid` |
| `state_machines` | Mermaid file | Yes | `outputs/{repo-name}/phase-4/state-machines.mermaid` |
| `triage_report` | YAML file | Yes | `outputs/{repo-name}/triage-report.yaml` |
| `dependency_graph` | Mermaid file | Yes | `outputs/{repo-name}/phase-1/dependency-graph.mermaid` |
| `entry_points` | YAML file | Yes | `outputs/{repo-name}/phase-1/entry-points.yaml` |
| `repo_path` | string | Yes | Path to source codebase (for geologist's grep-based debt scan) |

---

## Preconditions

- [ ] DD_VAL_001 (Validation Gate) has passed
- [ ] All Phase 4 and Phase 5 output files exist
- [ ] documentation-scribe and tech-debt-geologist agents are active
- [ ] `outputs/{repo-name}/final/` directory is writable
- [ ] Template files available: `templates/extraction-report-tmpl.md`

---

## AGENT A: documentation-scribe — Documentation Package

### Step A: Architecture Diagram Package

**Purpose:** Produce a complete set of visual architecture diagrams in Mermaid format for use in technical and business documentation.

**Actions:**
```yaml
architecture_diagrams:
  context_map:
    source: "outputs/{repo-name}/phase-4/context-map.mermaid"
    action: "Validate Mermaid syntax, add titles and annotations"
    audience: "Technical + Business"
    output: "final/architecture-deck/01-context-map.mermaid"

  dependency_graph:
    source: "outputs/{repo-name}/phase-1/dependency-graph.mermaid"
    action: "Simplify to module level (not file level) for readability. Highlight top 5 hotspot modules."
    audience: "Technical"
    output: "final/architecture-deck/02-dependency-graph.mermaid"

  data_flow:
    source: "Construct from entry-points.yaml + business-rules.yaml"
    method: |
      For each major bounded context:
      - Identify: what data enters (API inputs, event payloads)
      - Trace: through which services/aggregates does it flow
      - Identify: what data exits (API responses, events emitted, database writes)
    format: "Mermaid flowchart TD"
    audience: "Technical"
    output: "final/architecture-deck/03-data-flow.mermaid"

  state_machines:
    source: "outputs/{repo-name}/phase-4/state-machines.mermaid"
    action: "Validate syntax, add business-language annotations to transitions"
    audience: "Technical + Business"
    output: "final/architecture-deck/04-state-machines.mermaid"

  user_lifecycle:
    source: "outputs/{repo-name}/phase-4/user-lifecycle.mermaid"
    action: "Validate syntax, annotate transitions with revenue implications"
    audience: "Business + Executive"
    output: "final/architecture-deck/05-user-lifecycle.mermaid"

  diagram_quality_rules:
    - "Every diagram must have a title"
    - "Every node must use business terminology (not variable names)"
    - "No diagram may exceed 30 nodes (readability threshold)"
    - "Color coding: Core domain (green), Supporting (blue), Generic (gray)"
```

### Step B: Business Rule Catalog

**Purpose:** Produce the complete business rule catalog in three audience-specific views.

**Actions:**
```yaml
business_rule_catalog:
  source: "validated-business-rules.yaml"
  total_rules: "from validation report"

  technical_view:
    filename: "final/business-rule-catalog-technical.md"
    audience: "Developers and architects"
    content:
      - "Full IF/THEN/BECAUSE format for every rule"
      - "Source file + line reference for every rule"
      - "Confidence score and evidence count"
      - "Related entities and related rules"
      - "L8 tech debt notes per rule"
    organization: "By bounded context, then by category (validation, calculation, routing, etc.)"
    format: |
      ## {Bounded Context Name}
      ### Validation Rules
      #### BR-001: {Rule Name}
      **Condition:** IF {condition}
      **Action:** THEN {action}
      **Rationale:** BECAUSE {rationale}
      **Confidence:** HIGH | MEDIUM | LOW
      **Source:** `{file}` line {N}
      **Evidence:** {source_count} sources (code, schema, tests...)

  business_view:
    filename: "final/business-rule-catalog-business.md"
    audience: "Business analysts and product managers"
    content:
      - "Rule in plain English (no code references)"
      - "Business impact statement"
      - "Related business processes"
      - "Confidence indicator (High/Medium/Low)"
    format: "Table with columns: Rule, Description, When It Applies, Business Impact, Confidence"
    transformation:
      - "Remove all code references"
      - "Expand abbreviations"
      - "Convert technical conditions to business language"
      - "Add business context and rationale"

  executive_view:
    filename: "final/business-rule-catalog-executive.md"
    audience: "Executives and non-technical stakeholders"
    content:
      - "Top 10 most important business rules (by confidence × complexity)"
      - "Rule categories summary (N constraints, N calculations, N policies)"
      - "Risk highlights: rules that are poorly tested or in hotspot code"
    format: "Executive-friendly prose with summary tables"
```

### Step C: Domain Glossary

**Purpose:** Produce the definitive domain glossary from the validated ubiquitous language.

**Actions:**
```yaml
domain_glossary:
  source: "validated-domain-model.yaml (ubiquitous_language section)"
  filename: "final/domain-glossary.md"
  audience: "All (Technical + Business + Executive)"

  content:
    header: |
      # Domain Glossary: {repo_name}
      This glossary defines the business terms used in the {repo_name} system.
      Terms are organized by bounded context. Understanding these terms is essential
      for understanding how the system works.

    per_context_section:
      - "Context name and classification (Core/Supporting/Generic)"
      - "Alphabetically sorted terms within context"
      - "Per term: definition, synonyms, antonyms, code frequency"
      - "Cross-context homonyms: same word, different meaning (flagged clearly)"

  format_per_entry:
    - "**{term}** — {definition}"
    - "*Also called:* {synonyms}" (if any)
    - "*Not to be confused with:* {homonyms in other contexts}" (if any)
    - "*Appears {N} times in source code*"
```

### Step D: Executive Summary

**Purpose:** Produce a 1–2 page executive summary for non-technical stakeholders that answers: what does this system do, what is its domain structure, what does it earn, and what are the key risks?

**Actions:**
```yaml
executive_summary:
  filename: "final/executive-summary.md"
  max_pages: 2
  audience: "CTO, Product VP, Business stakeholders"

  sections:
    what_this_system_does:
      - "2–3 paragraph plain-English description"
      - "Generated from bounded context descriptions + business model canvas"
      - "No technical jargon"
      - "Answer: what problem does this software solve? Who uses it?"

    key_numbers:
      format: "Summary table"
      metrics:
        - "Lines of code analyzed: {LOC}"
        - "Business rules extracted: {N} ({H} high confidence, {M} medium, {L} low)"
        - "Domain areas identified: {N} bounded contexts"
        - "Business model: {type}"
        - "Extraction confidence score: {composite}%"

    business_structure:
      - "List bounded contexts with 1-sentence description each"
      - "Highlight Core domains vs Supporting vs Generic"
      - "Include simplified context map (max 6 contexts for exec view)"

    business_model_summary:
      - "How does this system generate revenue? (if applicable)"
      - "Pricing tiers (brief: name + price only)"
      - "Key monetization rules (top 3)"

    technical_health_snapshot:
      - "Key risk areas (hotspots) in plain language"
      - "Test coverage of business rules: {percentage}%"
      - "Items requiring human expert validation: {N}"

    recommended_actions:
      - "Top 3 recommended next steps based on findings"
      - "Each with: priority (High/Medium/Low), effort estimate, business impact"
```

---

## AGENT B: tech-debt-geologist — L8 Tech Debt Report

**Methodology:** Adam Tornhill's Behavioral Code Analysis (hotspot detection + temporal coupling)

### Step A: Debt Pattern Scan

**Actions:**
```yaml
debt_scan:
  grep_patterns:
    category_workaround:
      - "TODO, FIXME, HACK, WORKAROUND, XXX, KLUDGE in all source files"
      - "Extract: file, line, comment text, category"
    category_deprecated:
      - "@deprecated annotations"
      - "@ts-ignore, eslint-disable-next-line (TypeScript debt markers)"
      - "Python: # noqa, # type: ignore"
    category_known_issues:
      - "README sections: 'Known Issues', 'Limitations', 'Caveats'"
      - "KNOWN_ISSUES.md, BUGS.md if present"
    category_dead_code:
      - "Functions never called (requires import graph from Phase 1)"
      - "Unused imports (Grep for import * that never appears in file body)"

  per_item:
    - "id: TD-{NNN}"
    - "category: workaround | deprecated | known_issue | dead_code | design_flaw | test_gap"
    - "severity: CRITICAL | HIGH | MEDIUM | LOW (based on business rule proximity and hotspot score)"
    - "file + line"
    - "comment text (if grep-sourced)"
    - "affected_business_rules: cross-reference with validated-business-rules.yaml"
```

### Step B: Hotspot Analysis (Tornhill Method)

**Actions:**
```yaml
hotspot_analysis:
  if_git_history_available:
    method:
      - "Get change frequency from Phase 2 hotspot-map.yaml (already computed)"
      - "Compute complexity proxy: LOC + cyclomatic complexity estimate (if-else count)"
      - "Hotspot score = normalized_change_frequency × normalized_complexity"
      - "Threshold: score >= 0.5 = hotspot (high business risk)"

    top_hotspots:
      - "List top 10 files by hotspot score"
      - "For each: file, hotspot_score, change_frequency, complexity_estimate"
      - "Cross-reference: which business rules live in this file?"
      - "Risk note: business rules in hotspot files change frequently → regression risk"

    temporal_coupling:
      - "From Phase 2 hotspot-map.yaml temporal coupling data"
      - "Files that always change together but are architecturally separate = hidden coupling"
      - "List top 5 unexpected coupling pairs"
      - "Business interpretation: these files likely implement the same business rule"

  if_no_git_history:
    fallback:
      - "Use file size + if/else density as complexity proxy only"
      - "Note: no temporal analysis possible without git history"
```

### Step C: Test Gap Analysis

**Actions:**
```yaml
test_gap_analysis:
  source: "coverage-metrics.yaml (test-implied coverage from Phase 5)"

  per_business_rule:
    tested: "Has at least 1 test assertion referencing this rule"
    untested: "No test coverage found for this rule"

  risk_classification:
    critical: "Untested rule in hotspot file with HIGH confidence (rule exists, no test)"
    high: "Untested rule with MEDIUM confidence"
    medium: "Untested rule with LOW confidence (rule may be incorrect)"
    low: "Untested rule in non-hotspot, stable file"

  output:
    - "Total untested business rules: N"
    - "Critical test gaps: N rules"
    - "Top 5 highest-risk untested rules (by business impact)"
```

### Step D: Tech Debt Report Generation

**Actions:**
```yaml
tech_debt_report:
  filename: "final/tech-debt-report.md"
  audience: "Technical lead, engineering manager"

  sections:
    summary_metrics:
      - "Total debt items: N (N critical, N high, N medium, N low)"
      - "Hotspot count: N files"
      - "Untested business rules: N (of {total} total rules)"
      - "Estimated tech debt remediation effort: rough estimate"

    hotspot_map:
      - "Table: File | Hotspot Score | Business Rules Affected | Recommended Priority"
      - "Visual: Mermaid chart of top 10 hotspots (optional)"

    debt_catalog:
      - "All debt items, sorted by severity"
      - "Each with: ID, category, description, affected rules, recommended fix, effort estimate"

    modernization_recommendations:
      - "Top 5 highest-priority improvements"
      - "Each with: what to do, why (business impact), how long, risk if ignored"
      - "Prioritized by: (business rule count affected × hotspot score × untest factor)"
```

---

## Veto Conditions

| ID | Condition | Type | Action |
|----|-----------|------|--------|
| DD_DOC_001 | Any output section is empty (missing content, not 0-item lists) | HARD VETO | Identify which section is empty. If the section is empty because no data exists (e.g., no L7 data because no financial logic), the section must contain explicit text: "No [X] detected in this codebase during extraction." Empty = no content at all, not "content that says nothing was found." |
| DD_DOC_002 | Executive summary exceeds 3 pages | WARN | Must trim to maximum 2 pages. Remove technical details, keep business-facing content only. |
| DD_DOC_003 | Any Mermaid diagram contains syntax errors | WARN | Fix syntax before finalizing. Broken diagrams are worse than no diagrams. |
| DD_DOC_W01 | `business_rule_catalog_technical_md` has fewer rules than `validated-business-rules.yaml` | WARN | Mismatch between source data and generated document — reconcile before delivery. |

---

## Outputs

| Artifact | Format | Path | Description |
|----------|--------|------|-------------|
| `01-context-map.mermaid` | Mermaid | `final/architecture-deck/01-context-map.mermaid` | Bounded context map with relationship patterns |
| `02-dependency-graph.mermaid` | Mermaid | `final/architecture-deck/02-dependency-graph.mermaid` | Module-level dependency visualization |
| `03-data-flow.mermaid` | Mermaid | `final/architecture-deck/03-data-flow.mermaid` | Data flow through major bounded contexts |
| `04-state-machines.mermaid` | Mermaid | `final/architecture-deck/04-state-machines.mermaid` | State lifecycle diagrams for stateful entities |
| `05-user-lifecycle.mermaid` | Mermaid | `final/architecture-deck/05-user-lifecycle.mermaid` | User journey state machine |
| `business-rule-catalog.md` | Markdown | `final/business-rule-catalog.md` | Complete rule catalog (all 3 view sections) |
| `domain-glossary.md` | Markdown | `final/domain-glossary.md` | Ubiquitous language glossary |
| `tech-debt-report.md` | Markdown | `final/tech-debt-report.md` | Full tech debt assessment with hotspots |
| `executive-summary.md` | Markdown | `final/executive-summary.md` | 1–2 page stakeholder summary |

---

## Completion Criteria

**Checkpoint:** `DD_DOC_001` — Documentation Complete

```yaml
heuristic_id: DD_DOC_001
name: "Documentation Gate Passed"
blocking: true
required_before: "delivery"

criteria:
  - all_architecture_diagrams_exist: true
  - business_rule_catalog_exists: true
  - domain_glossary_exists: true
  - tech_debt_report_exists: true
  - executive_summary_exists: true
  - no_empty_sections: true
  - no_broken_mermaid_syntax: true
  - rule_count_matches_validated_source: true

on_fail:
  action: "STOP — identify missing section and generate it before delivery"
  retry_allowed: true
  retry_condition: "Missing section can always be generated from existing validated data"
```

## Agent Notes

- **Three-audience rule:** Every piece of content must have a designated audience (Technical / Business / Executive). If a section doesn't have a clear audience, it doesn't belong in the final output.
- **No new findings in Phase 6:** The documentation-scribe and tech-debt-geologist synthesize and present existing validated findings. They do not perform new extraction. If a gap is discovered, flag it in the report — do not extract.
- **Tech debt geologist reads code:** Unlike most Phase 6 work, the geologist DOES re-read the source codebase (grep-based debt scan). This is the only Phase 6 agent that touches the source. It is still read-only.
- **Mermaid validation:** After writing each Mermaid diagram, validate syntax by checking against the Mermaid grammar. A broken diagram in the final output is a quality failure.
- **Template use:** The `templates/extraction-report-tmpl.md` provides the overall structure for `executive-summary.md`. Use it as the base and fill in extracted values.
