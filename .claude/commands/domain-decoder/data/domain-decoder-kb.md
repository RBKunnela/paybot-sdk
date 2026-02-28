# Domain Decoder: Knowledge Base

**Version:** 1.0.0
**Date:** 2026-02-19
**Status:** Reference Document

This knowledge base consolidates the methodologies, protocols, metrics, and frameworks
that Domain Decoder agents use during extraction. Agents reference this document for
decision-making context. It is not a process file — it is an intellectual reference.

---

## Table of Contents

1. [Key Methodologies](#1-key-methodologies)
2. [Reference Frameworks](#2-reference-frameworks)
3. [The Roundtable Protocol](#3-the-roundtable-protocol)
4. [Coverage Proxy Metrics](#4-coverage-proxy-metrics)
5. [The 23 Veto Conditions (Summary)](#5-the-23-veto-conditions-summary)
6. [Confidence Scoring Model](#6-confidence-scoring-model)
7. [Model Routing Decisions](#7-model-routing-decisions)

---

## 1. Key Methodologies

### 1.1 IEEE 5-Step Business Rule Extraction (BRE)

The IEEE standard for systematic business rule extraction provides the academic foundation
for Domain Decoder's multi-pass approach. Adapted for LLM-assisted extraction:

**Step 1 — Elicitation:** Gather candidate rules from all source types (code, schema, tests,
comments, API contracts, UI, logs). This maps to Domain Decoder's Pass 1 (SCAN) in L5 extraction.

**Step 2 — Analysis:** Examine candidates for completeness, conflicts, and redundancy.
This maps to Pass 2 (READ) — deep LLM analysis of each candidate.

**Step 3 — Representation:** Express rules in structured, unambiguous format.
This maps to Pass 3 (SYNTHESIZE) — generating plain-English catalog entries with YAML structure.

**Step 4 — Validation:** Verify with subject matter experts that rules are correctly captured.
This maps to Domain Decoder's Roundtable protocol and the final human validation flagging.

**Step 5 — Management:** Maintain rules as the system evolves.
This maps to the ongoing use of Domain Decoder for repeated extractions on evolving codebases.

**Key Insight from IEEE BRE:**
Single-source extraction has an average accuracy rate of 45-65%. Multi-source triangulation
(3+ source types) raises accuracy to 85-94%. This is the empirical foundation for
Domain Decoder's triangulation requirement.

### 1.2 KDM/ADM Standard (OMG)

The Object Management Group's Knowledge Discovery Metamodel (KDM) and Architecture-Driven
Modernization (ADM) standards define a formal metamodel for extracting knowledge from
legacy systems. Domain Decoder's Code DNA framework maps to KDM's four abstraction layers:

| KDM Layer | Domain Decoder Layer | Description |
|-----------|---------------------|-------------|
| Infrastructure | L1, L2 | Platform-level constructs, interfaces |
| Program | L3, L4 | Call graphs, data flows, control flows |
| Runtime | L5 | Business-level computational behavior |
| Conceptual | L6, L7 | Business model, domain concepts |

**Key Insight from KDM/ADM:**
KDM distinguishes between "code facts" (syntactic, automatically extractable) and
"design facts" (semantic, requiring interpretation). Domain Decoder's Surface/Deep
zone distinction mirrors this precisely: L1-L4 are code facts, L5-L7 are design facts.

### 1.3 ArchAgent Approach (LLM-Driven Reverse Engineering)

The ArchAgent research pattern (2024-2025) demonstrates that LLM agents achieve
significantly better results on code understanding when given:

1. **Structured analysis tasks** rather than open-ended "explain this code" prompts
2. **Multi-agent validation** rather than single-agent extraction
3. **Iterative refinement** with explicit feedback loops
4. **External tool integration** for precision (AST parsers, dependency graphs)

**Key Finding:** Multi-agent squads outperform single agents by 90.2% on complex
code understanding tasks. The BA+Developer+QA agent triad model (SoftServe) achieved
50% reduction in reverse-engineering time compared to single-agent approaches.

**Domain Decoder's Implementation:**
The Tier 1 analysts (code-cartographer, rule-archaeologist, domain-modeler,
business-model-analyst) implement the multi-agent validation through cross-layer
consistency requirements and the Roundtable protocol.

### 1.4 Feathers Seam Model

Michael Feathers' Seam Model (from "Working Effectively with Legacy Code") defines a
**seam** as a place in code where you can alter behavior without editing the code itself.

**Why It Matters for Domain Decoder:**
Seams are where business logic is most clearly isolated. Finding seams in L5 extraction
identifies the natural boundaries for business rule isolation.

**Seam Types:**
- **Object Seams:** Constructor injection points, dependency inversion boundaries
- **Preprocessing Seams:** Conditional compilation, feature flags
- **Link Seams:** Module boundaries, plugin interfaces
- **Interface Seams:** Abstract base classes, interface implementations

**Domain Decoder Application:**
The rule-archaeologist agent applies seam thinking to isolate business logic from
infrastructure logic. Code at a seam is a business policy — code inside the seam
is implementation detail.

**Characterization Tests:**
Feathers' characterization tests capture existing behavior rather than desired behavior.
For Domain Decoder, test assertions are treated as characterization evidence for
business rules — they describe what the code actually does, which is the ground truth.

---

## 2. Reference Frameworks

### 2.1 DDD Reverse Engineering (Eric Evans Adapted)

Domain-Driven Design was designed for forward modeling (from domain knowledge to code).
Domain Decoder adapts it for **reverse modeling** (from code back to domain knowledge).

**Bounded Context Identification Heuristics:**

1. **High internal cohesion, low external coupling:** A group of modules that imports
   heavily from each other but minimally from others = bounded context candidate.

2. **Namespace/module boundaries:** Natural boundaries in code organization often
   reflect intentional domain boundaries. `src/modules/orders/` vs `src/modules/payments/`
   is a strong bounded context signal.

3. **Database schema boundaries:** Tables that are never joined across a certain boundary
   suggest separate bounded contexts. Shared tables suggest shared kernel or conformist.

4. **Team boundaries (if discoverable from git blame):** Conway's Law — systems reflect
   the communication structure of the organization that built them. Different teams
   working on different modules = different bounded contexts.

5. **API versioning boundaries:** If one module has a v1/v2/v3 API and another doesn't,
   they likely have different stability requirements = different bounded contexts.

**Context Map Patterns to Detect:**

| Pattern | Code Signal | What It Means |
|---------|-------------|---------------|
| Shared Kernel | Two modules import the same shared model | Both contexts agree to share this concept |
| Customer/Supplier | One module calls another's API | Upstream (supplier) dictates contract to downstream (customer) |
| Conformist | One module exactly mirrors another's types | Downstream gave up influencing upstream |
| Anti-Corruption Layer | Translation object/mapper between two modules | Contexts use different terms for the same concept |
| Published Language | OpenAPI spec, event schema | Context exposes a formal interface |

**Ubiquitous Language Extraction:**
Language is found everywhere the business talks through code:
- Entity and attribute names (snake_case or camelCase to plain English)
- Function names (`calculateProration` = "proration calculation business rule")
- Exception names (`OrderMinimumNotMet` = "order minimum constraint")
- Enum values (`PaymentStatus.DISPUTED` = "payment can be disputed")
- Event names (`UserUpgradedToPro` = "users can upgrade to Pro")
- Error messages (`"Trial period has expired"` = "there is a trial period concept")
- Log messages (`"Applying seasonal discount"` = "seasonal discounts exist")

### 2.2 CodeScene Behavioral Analysis (Adam Tornhill)

Tornhill's core insight: **code history reveals more than current code state**.

**Hotspot Formula:**
```
hotspot_score = cyclomatic_complexity × change_frequency_last_12_months
```

Files in the 75th percentile of BOTH dimensions are hotspots. These are the files where:
- Business logic is most complex
- Business logic is most volatile (the business is actively using/changing it)
- Risk of regression is highest

**Implementation for Domain Decoder (without CodeScene):**
```bash
# Step 1: Get change frequency per file (last 12 months)
git log --since="12 months ago" --name-only --format="" | sort | uniq -c | sort -rn > change_frequency.txt

# Step 2: Get complexity per file
scc src/ -f json | jq '[.[] | .Files[]] | sort_by(.Complexity) | reverse' > complexity.json

# Step 3: Manual cross-reference for hotspot calculation
# Files appearing in top quartile of BOTH lists = hotspots
```

**Temporal Coupling:**
Files that change together in commits even without import relationships reveal
hidden business coupling. This is often more revealing than structural coupling.

```bash
# Find files that co-change frequently
git log --name-only --format="" | awk 'NF > 1 {for(i=1;i<=NF;i++) for(j=i+1;j<=NF;j++) print $i, $j}' | sort | uniq -c | sort -rn | head -20
```

**Knowledge Silos (from git blame):**
```bash
# Find files changed only by one author
git log --format="%ae" -- <file> | sort -u | wc -l
# If output == 1: single-author file = knowledge silo
```

**Domain Decoder Application:**
The tech-debt-geologist uses hotspot analysis to:
1. Prioritize L5 extraction — hotspot files have the most business-critical rules
2. Flag high-risk business rules — rules in hotspot files are most likely to change
3. Identify knowledge silos — rules in silo files need special human validation

### 2.3 Brandolini Event Storming (Reverse-Adapted)

Alberto Brandolini designed Event Storming for forward discovery (group workshops
with sticky notes). Domain Decoder adapts it for **reverse discovery** from code:

**Original Event Storming:** Domain expert describes events → facilitator maps domain
**Domain Decoder Adaptation:** Code describes events → agent reconstructs domain

**Reverse Event Storming Discovery Process:**

1. **Find Domain Events in Code:**
   - Named events in event emitters (`EventEmitter.emit('order.placed', ...)`)
   - Message queue topic names (`queue.add('payment.process', ...)`)
   - Webhook payload types (`type: 'checkout.session.completed'`)
   - Database trigger names
   - Audit log entries

2. **Find Commands (what triggers each event):**
   - API endpoints that lead to event emission
   - Background job triggers
   - Manual admin actions

3. **Find Aggregates (what owns each event):**
   - The entity whose state changes when the event fires
   - The repository/service responsible for persisting the change

4. **Find Policies (what reacts to each event):**
   - Event handlers and listeners
   - Webhooks consumers
   - Saga compensation logic

5. **Find Hotspots (where contention exists):**
   - Events that trigger multiple reactions
   - Events that can be cancelled/compensated
   - Events with complex guards/conditions

---

## 3. The Roundtable Protocol

### Purpose

The Roundtable is Domain Decoder's quality assurance mechanism for deep/semantic findings
(L5, L6, L7). It implements a structured debate where extracted findings are challenged
before acceptance into the final catalog.

**Fidelity Target:** 94% — when the final catalog is shown to a domain expert,
at least 94% of findings should be confirmed as accurate or "close enough to be useful."

### Trigger Conditions

| Condition | Roundtable? | Rationale |
|-----------|-------------|-----------|
| L1-L4 finding, confidence HIGH | NO | Surface-level, automatically verifiable |
| L1-L4 finding, confidence LOW | YES | Unusual surface-level finding warrants scrutiny |
| L5 finding, any confidence | YES | Business rules are high-stakes, always debate |
| L6 finding — bounded context boundary | YES | Context boundaries have systemic impact |
| L6 finding — entity attribute | NO | Low-impact, verifiable from schema |
| L7 finding, any confidence | YES | Business model extraction is high-stakes |
| L8 finding, severity HIGH | YES | High-severity debt affects all layers |
| Contradiction detected between layers | YES (mandatory) | Contradictions indicate misunderstanding |
| Finding has 5+ source types | NO | Fast-tracked (DD_SUM_001 fast_track rule) |

### Debate Format

Each Roundtable entry follows this structure:

```yaml
roundtable_entry:
  id: RT-{layer}-{sequence}              # e.g., RT-L5-042
  finding: "{plain English description}"
  proposed_by: "{agent_id}"
  evidence:
    code_refs:
      - file: "{path}"
        lines: "{range}"
        snippet: "{relevant code}"
    schema_refs:
      - table: "{name}"
        constraint: "{description}"
    test_refs:
      - file: "{path}"
        assertion: "{what it tests}"
    supporting_sources: "{count}/7 source types"
  confidence: "{HIGH|MEDIUM|LOW}"

  devils_advocate:
    agent: "{agent_id}"
    challenges:
      - type: "{alternative_interpretation|missing_evidence|contradiction|scope_error}"
        argument: "{the challenge}"
        counter_evidence: "{if any}"
    recommendation: "{accept|reject|revise|needs_more_evidence}"

  arbiter_decision:
    agent: domain-decoder-chief
    verdict: "{accepted|rejected|revised|deferred}"
    rationale: "{why}"
    revision: "{if revised, what changed}"
    final_confidence: "{HIGH|MEDIUM|LOW}"
```

### Efficiency Safeguards

**Batch Debates:** Group related findings and debate the cluster, not each individually.
For example, debate all pricing-related rules as a cluster rather than each price rule separately.

**Time-Box:** Each debate has a 3-round maximum:
- Round 1: Propositor presents finding + evidence
- Round 2: Devil's Advocate presents challenges
- Round 3: Arbiter (domain-decoder-chief) resolves

**Fast Track:** Findings with 5+ source types agreeing skip Roundtable automatically.
These findings have sufficient triangulation that debate would add negligible value.

**Escalation Only:** L5-L7 findings start as "tentative". They only formally enter
Roundtable if: (a) another agent's findings contradict them, or (b) confidence < MEDIUM.

### Roles

| Role | Agent | Responsibility |
|------|-------|---------------|
| Propositor | The discovering agent | Presents finding with all evidence; explains confidence |
| Devil's Advocate | Rotates (opposing expertise) | Challenges finding; finds alternatives; requests evidence |
| Arbiter | domain-decoder-chief | Makes final verdict; cannot be overruled |

**Devil's Advocate Assignment:**
- For L5 (business rules): domain-modeler serves as Devil's Advocate (DDD lens)
- For L6 (domain model): rule-archaeologist serves as Devil's Advocate (implementation lens)
- For L7 (business model): tech-debt-geologist serves as Devil's Advocate (historical lens)

---

## 4. Coverage Proxy Metrics

Because Domain Decoder cannot know what it does NOT know (unknown unknowns), it uses
proxy metrics to estimate extraction completeness. These are borrowed from the
test coverage measurement philosophy: coverage doesn't guarantee correctness,
but low coverage guarantees gaps.

### The 5 Coverage Proxies

**1. Entry Point Coverage (target: >= 85%)**

*What it measures:* What fraction of all entry points (API endpoints, CLI commands,
scheduled jobs, event handlers) have been successfully traced through the extraction pipeline.

*Formula:* `traced_entry_points / total_entry_points`

*Why it matters:* Every un-traced entry point is a potential source of unextracted
business rules. Low entry point coverage means significant parts of the system
were not analyzed.

*How to measure:*
```
total_entry_points = L2 endpoint count + L3 cron job count + L3 queue worker count + L3 event handler count
traced_entry_points = L5 rules with at least one entry point reference
```

**2. Test-Implied Rule Coverage (target: >= 70%)**

*What it measures:* What fraction of extracted L5 business rules have corresponding
test assertions that independently confirm the rule.

*Formula:* `l5_rules_with_test_evidence / l5_total_rules`

*Why it matters:* Tests are the most reliable triangulation source because they
were written by developers who understood the intended behavior at the time.
Low test coverage means high reliance on code-only evidence (more brittle).

*How to measure:* For each L5 rule, check if any test file contains assertions
that reference the same conditions or values.

**3. Domain Entity Coverage (target: >= 80%)**

*What it measures:* What fraction of database entities (tables, ORM models, schema types)
have been documented in the L6 domain taxonomy.

*Formula:* `l6_documented_entities / total_db_entities`

*Why it matters:* Every undocumented entity is a potential gap in the domain model.
Entities with no L6 documentation may contain business rules that were missed.

*How to measure:*
```
total_db_entities = migration file table count + ORM model count (deduplicated)
l6_documented_entities = entities with a bounded context assignment in l6-domain-taxonomy.yaml
```

**4. Conditional Logic Coverage (target: >= 75%)**

*What it measures:* What fraction of business-layer if/else and switch statements
have been classified as either a business rule (L5) or infrastructure logic (excluded).

*Formula:* `classified_conditionals / total_conditionals_in_service_layer`

*Why it matters:* Every unclassified conditional is a potential unextracted business rule.
Low conditional coverage means the L5 extraction missed significant areas.

*How to measure using ast-grep/Semgrep:*
```
total_conditionals_in_service_layer = ast-grep count of if/switch in src/services/, src/domain/
classified_conditionals = conditionals with a corresponding BR-* entry in L5 catalog
```

**5. Composite Coverage Score (target: >= 0.70)**

*Formula:*
```
composite = (entry_point_coverage × 0.30) +
            (test_implied_coverage × 0.25) +
            (domain_entity_coverage × 0.20) +
            (conditional_logic_coverage × 0.15) +
            (l5_rules_at_medium_plus × 0.10)
```

*The composite score is the primary delivery gate metric.*
If composite < 0.70, delivery should be preceded by explicit scope limitation documentation.

### Important Caveat

Coverage proxies measure what Domain Decoder looked at, not what is correct.
A 100% coverage proxy score does not mean the extraction is correct — it means
the extraction attempted to cover all observable dimensions. Accuracy is measured
by the Roundtable fidelity target (94%) and human expert validation.

---

## 5. The 23 Veto Conditions (Summary)

Full definitions in `data/extraction-heuristics.yaml`. Summary reference:

### Phase 0: Triage (5 conditions)

| ID | Type | Condition |
|----|------|-----------|
| DD_GAP_001_A | BLOCKING | Codebase < 500 LOC |
| DD_GAP_001_B | BLOCKING | No executable code found |
| DD_GAP_001_C | BLOCKING | Code is obfuscated/minified without source maps |
| DD_GAP_001_D | WARN | No test files detected |
| DD_GAP_001_E | WARN | Single contributor with no comments or README |

### Phase 1: Foundation Scan (4 conditions)

| ID | Type | Condition |
|----|------|-----------|
| DD_INV_001_A | BLOCKING | Cannot identify primary language or architecture style |
| DD_INV_001_B | WARN | >50% circular dependencies in module graph |
| DD_INV_001_C | WARN | >5 languages detected (polyglot complexity) |
| DD_INV_001_D | WARN | Entry point coverage < 85% after L2 extraction |

### Phase 2: Behavior Mapping (3 conditions)

| ID | Type | Condition |
|----|------|-----------|
| DD_SLC_001_A | WARN | Zero workflows detected in non-CRUD system |
| DD_SLC_001_B | WARN | Validation count < 10% of endpoint count |
| DD_SLC_001_C | WARN | Business rule candidates < 10 after Pass 1 |

### Phase 3: Business Intelligence (4 conditions)

| ID | Type | Condition |
|----|------|-----------|
| DD_SUM_001_A | BLOCKING | L5 catalog < 70% at MEDIUM+ confidence (max 1 retry) |
| DD_SUM_001_B | BLOCKING | L6 has unbounded entities |
| DD_SUM_001_C | PASS | No financial logic found (valid outcome, document it) |
| DD_SUM_001_D | WARN | Roundtable rejection rate > 30% |

### Phase 4: Domain Model Validation (4 conditions)

| ID | Type | Condition |
|----|------|-----------|
| DD_DDD_001_A | BLOCKING | L5 rules without bounded context assignment |
| DD_DDD_001_B | WARN | Bounded contexts with zero business rules |
| DD_DDD_001_C | WARN | L7 revenue streams unmappable to L6 entities |
| DD_DDD_001_D | WARN | Ubiquitous language glossary < 5 terms |

### Phase 5: Business Model Validation (3 conditions)

| ID | Type | Condition |
|----|------|-----------|
| DD_BIZ_001_A | BLOCKING | Revenue streams without code references |
| DD_BIZ_001_B | WARN | Payment gateways detected but no revenue streams extracted |
| DD_BIZ_001_C | WARN | Conflicting pricing rules detected |

### Phase 6: Cross-Validation (4 conditions — all BLOCKING or critical)

| ID | Type | Condition |
|----|------|-----------|
| DD_VAL_001_A | BLOCKING | L5/L6 bidirectional coverage fails |
| DD_VAL_001_B | BLOCKING | Overall confidence < 60% |
| DD_VAL_001_C | WARN | >20% of findings flagged for human validation |
| DD_VAL_001_D | WARN | Coverage proxy composite < 0.70 |

### Phase 7: Documentation (4 conditions)

| ID | Type | Condition |
|----|------|-----------|
| DD_DOC_001_A | BLOCKING | Required deliverable files missing |
| DD_DOC_001_B | WARN | Executive summary readability fails "teste da filha" |
| DD_DOC_001_C | WARN | >5% of findings without source references |
| DD_DOC_001_D | WARN | Glossary < 5 entries for non-small codebase |

**Summary:**
- 9 BLOCKING veto conditions (stop the pipeline)
- 14 WARNING conditions (advisory, document and continue)
- 23 total quality control points across 7 phases

---

## 6. Confidence Scoring Model

### The 7 Source Types

Domain Decoder's confidence model requires corroboration across 7 independent source types:

| Source | Examples | Weight |
|--------|----------|--------|
| **Code** | The actual implementation (if/else, calculations, function bodies) | 1 |
| **Schema** | Database constraints, ORM model validations, migration definitions | 1 |
| **Tests** | Test assertions encoding business expectations | 1 |
| **Comments** | Developer notes explaining "why" — often the most honest documentation | 1 |
| **API** | Endpoint naming, request/response shapes, error message text | 1 |
| **UI** | Frontend labels, form fields, error messages, user-visible text | 1 |
| **Logs** | Log messages describing business events and state transitions | 1 |

### Confidence Thresholds

| Score | Label | Policy |
|-------|-------|--------|
| 5-7 sources | HIGH | Include in catalog. Fast-track (skip Roundtable). |
| 3-4 sources | HIGH | Include in catalog. Roundtable optional. |
| 2 sources | MEDIUM | Include with explicit MEDIUM annotation. Roundtable recommended. |
| 1 source | LOW | Include with prominent caveat. Flag for human validation. Roundtable required. |

### 5-Dimension Extraction Quality Score (adapted from clone-engineering fidelity-tester)

For each finding, agents assess:

| Dimension | Weight | What It Measures |
|-----------|--------|-----------------|
| Extraction completeness | 30% | Does the finding capture the full rule, not a fragment? |
| Accuracy | 25% | Is the plain-English description faithful to the code? |
| Clarity | 20% | Would a non-technical stakeholder understand this? |
| Traceability | 15% | Are all source references complete and verifiable? |
| Confidence | 10% | Is the confidence label appropriately conservative? |

**Composite extraction quality >= 0.70 required for inclusion in final catalog.**

---

## 7. Model Routing Decisions

Following the AIOS Model Routing Protocol, Domain Decoder routes tasks to models
based on semantic complexity:

| Phase / Task | Model | Rationale |
|-------------|-------|-----------|
| Phase 0: Triage | Haiku | Quick metrics, simple file counts, no reasoning |
| Phase 1: L1 extraction | Haiku | Pattern matching, Glob, file listing |
| Phase 1: L2 extraction | Haiku | Route definition detection, Grep patterns |
| Phase 2: L3 workflows | Sonnet | Moderate reasoning for event/queue identification |
| Phase 2: L4 validation | Sonnet | Validation schema classification |
| Phase 3: L5 Pass 1 (scan) | Haiku | Pattern matching, candidate identification |
| Phase 3: L5 Pass 2 (read) | Opus | Deep semantic reasoning across multiple files |
| Phase 3: L5 Pass 3 (synthesize) | Opus | Cross-file synthesis and rule articulation |
| Phase 3: L6 all passes | Opus | Complex clustering, naming interpretation, DDD reasoning |
| Phase 3: L7 all passes | Opus | Highest-stakes extraction, revenue logic inference |
| Phase 4: L8 grep extraction | Haiku | Pattern matching for TODO/FIXME/HACK |
| Phase 4: L8 git mining | Sonnet | Moderate analysis of commit patterns |
| Phase 4: L8 classification | Sonnet | Pattern recognition and severity categorization |
| Phase 5: Roundtable debates | Opus | Argumentation and counter-argumentation reasoning |
| Phase 6: Cross-validation | Sonnet | Consistency checking (not deep analysis) |
| Phase 7: Executive summary | Sonnet | Compilation and plain-English translation |
| Phase 7: Diagram generation | Sonnet | Mermaid syntax generation from structured data |

**Rule:** Never use Opus for tasks that Sonnet or Haiku can handle. The deep/semantic
layers (L5, L6, L7) justify Opus. Surface/contextual layers (L1-L4, L8) and synthesis
(Phase 7) do not.

---

## Appendix A: Expert Minds Reference

### Tier A: Core Minds (Full Agent Personas)

| Expert | APEX Score | Primary Contribution | Agent |
|--------|-----------|---------------------|-------|
| Michael Feathers | 93 | Seam Model, Characterization Tests, 25 dependency-breaking techniques | rule-archaeologist |
| Eric Evans | 92 | DDD, Bounded Contexts, Ubiquitous Language, Strategic DDD | domain-modeler |
| Adam Tornhill | 89 | Behavioral Code Analysis, Hotspot Detection, Temporal Coupling | tech-debt-geologist |
| Alberto Brandolini | 86 | Event Storming (reverse-adapted), Event Archaeology | rule-archaeologist (secondary) |

### Tier B: Strategic Minds (Supporting Personas)

| Expert | APEX Score | Primary Contribution | Referenced By |
|--------|-----------|---------------------|--------------|
| Nick Tune | 84 | Architecture Modernization, Core Domain Charts | domain-modeler |
| Sam Newman | 82 | Strangler Fig, Service Decomposition, Database Decomposition | business-model-analyst |

### Tier C: Knowledge Bases (minds/ directory, not full agents)

| Expert | Primary Contribution | Knowledge Base File |
|--------|---------------------|-------------------|
| Martin Fowler | Pattern Catalog (72 refactorings, Enterprise Application Patterns) | minds/martin-fowler.md |
| Marianne Bellotti | System Anthropology, why-the-code-looks-like-this reasoning | minds/marianne-bellotti.md |
| Nick Tune | Strategic DDD reference (in addition to Tier B role) | minds/nick-tune.md |

---

## Appendix B: Glossary

| Term | Definition |
|------|-----------|
| **Bounded Context** | A boundary within which a domain model applies consistently. (Evans) |
| **Characterization Test** | A test capturing existing behavior (not desired behavior) to confirm understanding. (Feathers) |
| **Code DNA** | Domain Decoder's 8-layer extraction framework, adapted from MMOS cognitive model. |
| **Composite Score** | Weighted coverage metric combining 5 proxy measures; >= 0.70 required for delivery. |
| **Domain Event** | A record of something business-significant that occurred in the system. (Brandolini) |
| **Event Storming** | Workshop format for domain discovery, adapted here for reverse discovery from code. |
| **Hotspot** | File with high complexity AND high change frequency — indicates business-critical volatile code. (Tornhill) |
| **Roundtable** | Domain Decoder's structured debate mechanism for validating deep/semantic findings. |
| **Seam** | A place in code where behavior can be altered without editing the code. (Feathers) |
| **Strangler Fig** | Migration pattern: new code gradually replaces legacy, growing around it. (Fowler/Newman) |
| **Temporal Coupling** | Files that change together in commits even without structural coupling. (Tornhill) |
| **Triangulation** | Requiring 3+ independent source types to confirm a finding at HIGH confidence. |
| **Ubiquitous Language** | Shared vocabulary between developers and domain experts within a bounded context. (Evans) |

---

*Domain Decoder Knowledge Base v1.0.0*
*Domain: brownfield_code_analysis*
*Reference: docs/research/2026-02-19-domain-decoder-brainstorm.md*
