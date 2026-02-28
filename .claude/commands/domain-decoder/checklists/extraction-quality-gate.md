# Checklist: Extraction Quality Gate

**Checklist ID:** DD-CL-001
**Version:** 1.0
**Purpose:** Final quality gate before the Domain Decoder extraction package is delivered to the user. All items must pass. Any unchecked item is a BLOCKER — do not deliver until resolved.
**Owner:** domain-decoder-chief
**Invoked By:** End of Phase 6 (`tasks/phase-6-document.md`) and by `full-decode.md` before marking the pipeline as complete
**Related Checkpoint:** DD_DOC_001

---

## Section 1: Pipeline Completion

- [ ] All 7 phases completed without a HARD VETO firing unresolved
- [ ] `outputs/{repo-name}/pipeline-log.yaml` exists and all phases have `status: passed`
- [ ] No phase is marked `status: vetoed` without a documented resolution
- [ ] `pipeline-summary.yaml` generated and populated with final metrics

---

## Section 2: Validation Quality (Phase 5 Requirements)

- [ ] Composite coverage score is **>= 0.70** (documented in `coverage-metrics.yaml`)
- [ ] Entry point coverage is **>= 85%** OR a documented exception exists explaining why the threshold could not be met
- [ ] Test-implied rule coverage is **>= 70%** OR documented exception with reason
- [ ] Domain entity coverage is **>= 80%** OR documented exception with reason
- [ ] Conditional logic coverage is **>= 75%** OR documented exception with reason
- [ ] Roundtable rejection rate is **<= 30%** (if exceeded, chief has reviewed and approved)
- [ ] All disputed/deferred findings are in `disputed-findings.yaml` with documented resolution requirements
- [ ] `validated-business-rules.yaml` contains ONLY findings with verdict `accepted` or `accepted_revised`

---

## Section 3: Business Rules Catalog (L5)

- [ ] Every business rule has an `id` in `BR-{NNN}` format
- [ ] Every business rule has a `source_file` reference (file path, not just module name)
- [ ] Every business rule has a `source_line` reference (line number, not just file)
- [ ] Every business rule has a `confidence` label: `HIGH`, `MEDIUM`, or `LOW`
- [ ] Every `HIGH` confidence rule has **>= 3** independent evidence sources documented
- [ ] Every `MEDIUM` confidence rule has **>= 2** independent evidence sources documented
- [ ] Every business rule has a `bounded_context` assignment (no orphaned rules)
- [ ] Every business rule follows IF/THEN/BECAUSE format (no incomplete rules)
- [ ] No business rule rationale is marked `RATIONALE_INFERRED` without a note explaining why
- [ ] `business-rule-catalog.md` rule count matches `validated-business-rules.yaml` rule count

---

## Section 4: Domain Model (L6)

- [ ] Domain model has **>= 1** bounded context defined (minimum; >3 expected for large codebases)
- [ ] Every bounded context has a `classification`: `Core`, `Supporting`, or `Generic`
- [ ] Every bounded context has at least **1** aggregate root
- [ ] Every bounded context has at least **1** business rule assigned to it
- [ ] Every aggregate root is documented with its child entities and value objects
- [ ] `context-map.mermaid` is valid Mermaid syntax and renders without errors
- [ ] Context map uses business terminology for context names (not technical terms)
- [ ] Every entry in `ubiquitous-language.yaml` has a definition in plain English
- [ ] Homonyms (same term, different meaning across contexts) are explicitly flagged in the glossary
- [ ] All L5–L7 findings are triangulated: source count is documented per finding

---

## Section 5: Business Model (L7)

- [ ] `business-model-canvas.yaml` exists and is populated (or contains explicit "No monetization logic detected" if applicable)
- [ ] If pricing logic was found: `pricing-matrix.yaml` contains at least 1 tier definition with limits
- [ ] If no financial logic was found: the absence is explicitly documented — NOT an empty file
- [ ] Every revenue stream has a `source_file` reference pointing to the implementing code
- [ ] `user-lifecycle.mermaid` is valid Mermaid syntax (or explicitly absent with documented reason)

---

## Section 6: Documentation Package (Phase 6 Outputs)

- [ ] `final/executive-summary.md` exists and is **<= 2 pages** (approximately 800 words)
- [ ] Executive summary contains NO code references or technical jargon
- [ ] Executive summary contains a "What This System Does" section in plain English
- [ ] `final/business-rule-catalog.md` exists and has all 3 views: Technical, Business, Executive
- [ ] `final/domain-glossary.md` exists and is organized by bounded context
- [ ] `final/tech-debt-report.md` exists with a hotspot map and debt item catalog
- [ ] All 5 architecture diagrams in `final/architecture-deck/` exist:
  - [ ] `01-context-map.mermaid`
  - [ ] `02-dependency-graph.mermaid`
  - [ ] `03-data-flow.mermaid`
  - [ ] `04-state-machines.mermaid`
  - [ ] `05-user-lifecycle.mermaid`
- [ ] **No empty sections** in any output document (empty = no content; "None detected" is valid)

---

## Section 7: Tech Debt Report (L8)

- [ ] `tech-debt-report.md` has a Summary Metrics table with: total items, hotspot count, untested rule count
- [ ] Hotspot analysis was performed (using git history if available, file metrics as fallback)
- [ ] Top 10 hotspot files are listed with business impact notes
- [ ] Every tech debt item has a `severity`: `CRITICAL`, `HIGH`, `MEDIUM`, or `LOW`
- [ ] Every `CRITICAL` and `HIGH` severity item has a `recommended_fix` and `effort_estimate`
- [ ] Test gap analysis references the validated business rules catalog

---

## Section 8: Audit Trail Integrity

- [ ] `outputs/{repo-name}/phase-{N}/` directories exist for all 6 phases (0–6)
- [ ] No source files in the target codebase were modified (read-only policy enforced)
- [ ] All corrections made during Roundtable are in `revised` verdicts — original findings not overwritten
- [ ] Pipeline is reproducible: re-running with same inputs and `skip_phases` would produce consistent results

---

## Delivery Checklist (Sign-Off)

Before marking the extraction as delivered:

- [ ] All Section 1–8 items checked
- [ ] Chief has reviewed the executive summary for accuracy and readability
- [ ] Disputed and deferred findings count is communicated to the user
- [ ] User knows where to find the full output package: `outputs/{repo-name}/final/`
- [ ] User has been advised of any high-priority items requiring human expert validation

---

## How to Handle Failures

| Failure | Resolution |
|---------|------------|
| Coverage score below threshold | Re-run Phase 3 focused on the low-coverage dimension |
| Missing source reference on a rule | Trace the rule back to source using Grep + Read before delivery |
| Empty section in any output | Generate content from existing validated data (Phase 6 always has input to draw from) |
| Broken Mermaid syntax | Fix syntax — test with `mmdc` if available |
| Orphaned business rule (no bounded context) | Assign to nearest context by file location or flag as "cross-cutting concern" |
| Deferred findings > 20% | Add prominent notice to executive summary about review burden |

---

*Domain Decoder Extraction Quality Gate v1.0*
*Applied at: End of Phase 6, before delivery*
