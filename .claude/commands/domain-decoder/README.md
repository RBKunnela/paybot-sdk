# Domain Decoder

**Version:** 1.0.0
**Type:** AIOS Expansion Pack — Brownfield Analysis Squad
**Status:** Active Development (Phase: Architecture + Creation)

Domain Decoder extracts the invisible business intelligence locked inside legacy and brownfield
codebases. It reads code as a business document — not a technical one.

---

## The Core Insight

> "The gap is METHOD, not agents."

Every organization that has said "nobody knows how this system works anymore" needs Domain Decoder.
Business knowledge is not in outdated documentation. It is in the code itself. But extracting it
requires a rigorous, repeatable, multi-pass analytical framework.

The winning formula: **static analysis for precision + LLMs for semantic reasoning**.
LLMs alone hallucinate structure. Static analysis alone lacks semantic understanding.
Domain Decoder operationalizes the combination.

---

## What Domain Decoder Produces

Given any brownfield or legacy codebase, Domain Decoder produces three primary deliverables:

**1. Business Rules Catalog**
Every conditional, policy, constraint, and calculation that governs business behavior —
extracted from scattered if/else trees, validators, and service layers into a structured,
human-readable catalog with source references and confidence scores.

**2. Domain Taxonomy Map**
The ontological map of the business: entities, aggregates, bounded contexts, relationships,
and the ubiquitous language buried in variable names, class hierarchies, and database schemas.

**3. Business Model Blueprint**
The revenue logic: how money enters the system, pricing rules, subscription tiers, billing
cycles, commission calculations, and monetization workflows.

---

## The 8-Layer Code DNA Framework

Adapted from the MMOS 8-Layer cognitive extraction model. Where MMOS extracts 8 layers
of a human expert's thinking, Code DNA extracts 8 layers of a codebase's business intelligence.

```
SURFACE ZONE (Observable — extracted automatically with HIGH confidence)
=======================================================================

L1  CODE PATTERNS        File organization, naming conventions, architecture style
                         Tools: Glob, Grep, ast-grep, Repomix
                         Agent: code-cartographer | Confidence: HIGH (95%+)

L2  API CONTRACTS        Endpoints, schemas, auth, external integrations
                         Tools: Grep, ast-grep, Semgrep, Context7
                         Agent: code-cartographer | Confidence: HIGH (90%+)

L3  WORKFLOWS            Cron jobs, queues, state machines, event handlers
                         Tools: code-graph-mcp, Serena, Grep
                         Agent: code-cartographer | Confidence: MEDIUM-HIGH (80%+)

L4  VALIDATION RULES     Guards, middleware, schema constraints, assertions
                         Tools: Semgrep, ast-grep, Grep
                         Agent: rule-archaeologist | Confidence: MEDIUM-HIGH (80%+)

DEEP ZONE (Semantic — requires LLM reasoning, triangulation mandatory)
=======================================================================

L5  BUSINESS RULES       IF/THEN logic, policies, calculations, state transitions
                         Tools: ast-grep, Semgrep, Claude Opus, Repomix
                         Agent: rule-archaeologist | Confidence: MEDIUM (65-80%)

L6  DOMAIN MODEL (DDD)   Bounded contexts, ubiquitous language, context map
                         Tools: code-graph-mcp, Claude Opus
                         Agent: domain-modeler | Confidence: MEDIUM (60-75%)

L7  BUSINESS MODEL       Revenue flows, pricing logic, user lifecycle
                         Tools: Grep, Claude Opus, code-graph-mcp
                         Agent: business-model-analyst | Confidence: LOW-MEDIUM (50-70%)

CONTEXTUAL ZONE (Behavioral — derived from git history and temporal data)
=======================================================================

L8  TECH DEBT            Hotspots, complexity trends, knowledge silos, trade-offs
                         Tools: scc, git CLI, Grep, CodeScene (optional)
                         Agent: tech-debt-geologist | Confidence: MEDIUM-HIGH (75-85%)
```

**Execution Order:**
L1 -> L2 -> L3 + L4 (parallel) -> L5 -> L6 -> L7 -> L8 (can run earlier for prioritization)

**Triangulation Rule:**
Deep findings (L5, L6, L7) require corroboration from 3+ independent source types
(code, schema, tests, comments, API, UI, logs) for HIGH confidence assignment.

---

## Agent Architecture

```
TIER 0: ORCHESTRATOR
  domain-decoder-chief
  Orchestrates the 7-phase pipeline. Enforces 9 blocking veto conditions.
  Runs Roundtable as arbiter. Pedro Valerio process design principles.

TIER 1: CORE ANALYSTS (business intelligence extractors)
  code-cartographer         L1 + L2 + L3
  Inventory, structure, dependency graph, workflows, API contracts.
  Auto-extraction — minimal LLM needed.

  rule-archaeologist        L4 + L5
  Validation rules and business rules.
  Feathers Seam Model mind. Multi-pass extraction methodology.

  domain-modeler            L6
  DDD bounded contexts, ubiquitous language, context map.
  Eric Evans mind. Brandolini Event Storming (reverse-adapted).

  business-model-analyst    L7
  Revenue logic, pricing rules, monetization flows.
  Sam Newman and Nick Tune strategic perspective.

TIER 2: SUPPORT ANALYSTS (quality, debt, synthesis)
  tech-debt-geologist       L8
  Hotspot detection, git forensics, knowledge silos.
  Adam Tornhill Behavioral Code Analysis mind.

  validation-arbiter        Cross-layer
  Roundtable facilitation, confidence scoring, cross-layer consistency.
  Enforces triangulation requirements.

  documentation-scribe      Final delivery
  Generates all final deliverables, diagrams, and glossaries.
  Applies "teste da filha" readability standard.

KNOWLEDGE BASES (minds/ directory — referenced by agents, not full agents):
  minds/michael-feathers.md   Seam Model, Characterization Tests
  minds/eric-evans.md         DDD reference, Strategic DDD
  minds/adam-tornhill.md      Behavioral analysis techniques
  minds/martin-fowler.md      Pattern catalog reference
  minds/marianne-bellotti.md  System anthropology lens
  minds/nick-tune.md          Strategic DDD and modernization
```

---

## 7-Phase Extraction Pipeline

```
Phase 0: TRIAGE
  Agent: domain-decoder-chief
  Purpose: Viability check, effort estimation, risk identification
  Veto: < 500 LOC, obfuscated code, no executable source
  Output: triage-report.yaml

Phase 1: FOUNDATION SCAN (L1 + L2)
  Agent: code-cartographer
  Purpose: Directory structure, API contracts, dependency graph
  Veto: Unknown primary language/architecture
  Output: l1-code-patterns.yaml + l2-api-contracts.yaml

Phase 2: BEHAVIOR MAPPING (L3 + L4)
  Agent: code-cartographer + rule-archaeologist
  Purpose: Workflows, validation rules, behavior map
  Gates: Workflow count, validation density
  Output: l3-workflows.yaml + l4-validation-rules.yaml

Phase 3: BUSINESS INTELLIGENCE EXTRACTION (L5 + L6 + L7 — parallel)
  Agents: rule-archaeologist (L5) + domain-modeler (L6) + business-model-analyst (L7)
  Purpose: The core value delivery — business rules, domain model, business model
  Veto: < 70% of L5 catalog at MEDIUM+ confidence; unbounded entities in L6
  Output: l5-business-rules.yaml + l6-domain-taxonomy.yaml + l7-business-model.yaml

Phase 4: DEBT AND FORENSICS (L8)
  Agent: tech-debt-geologist
  Purpose: Hotspot analysis, tech debt catalog, L5-L7 contextualization
  Gate: Informational only (no blocking vetos)
  Output: l8-tech-debt.yaml

Phase 5: ROUNDTABLE VALIDATION
  Agent: validation-arbiter + domain-decoder-chief (arbiter)
  Purpose: Structured debate of all L5-L7 findings; confidence scoring
  Gate: L5/L6 bidirectional coverage; overall confidence >= 60%
  Output: resolved-debates.yaml + confidence-dashboard.yaml

Phase 6: SYNTHESIS AND DELIVERY
  Agent: documentation-scribe
  Purpose: Final deliverables, executive summary, diagrams, glossary
  Veto: Missing required files; untraceable findings > 5%
  Output: domain-decoder-output/ (complete delivery package)
```

**Time Estimates:**
| Codebase Size | Estimated Pipeline Time |
|--------------|------------------------|
| Small (< 10K LOC) | ~1.5 hours |
| Medium (10K - 100K LOC) | ~5-7 hours |
| Large (100K+ LOC) | ~15-25 hours |
| Polyglot multiplier | +20-30% per additional language |

---

## Tool Dependencies

### Critical (install before first run)

| Tool | Type | Install | Fills Gap |
|------|------|---------|-----------|
| ast-grep MCP | MCP Server | `cargo install ast-grep --locked && uvx --from git+https://github.com/ast-grep/ast-grep-mcp ast-grep-server` | AST-aware structural search — L5 primary |
| Repomix MCP | MCP Server | `claude mcp add repomix -- npx repomix --mcp` | Whole-repo context packing |
| code-graph-mcp | MCP Server | `pip install code-graph-mcp ast-grep-py rustworkx && claude mcp add --scope project code-graph-mcp code-graph-mcp` | Call graphs, dependency mapping |
| Semgrep MCP | MCP Server | `pip install semgrep && claude mcp add semgrep -- semgrep mcp` | Business rule pattern extraction |
| scc | CLI | `scoop install scc` | Code metrics, complexity scores |

### Standard (install before production use)

| Tool | Type | Install | Fills Gap |
|------|------|---------|-----------|
| Serena | MCP Server | `uvx --from git+https://github.com/oraios/serena serena start-mcp-server` | LSP-level symbol resolution |
| mcp-server-tree-sitter | MCP Server | `pip install mcp-server-tree-sitter` | Raw AST access |
| dependency-cruiser | CLI | `npm install -g dependency-cruiser` | JS/TS dependency graphs |
| Mermaid CLI | CLI | `npm install -g @mermaid-js/mermaid-cli` | Diagram rendering |
| Syft | CLI | `scoop install syft` | SBOM / dependency inventory |

### Already Available (AIOS core)

Glob, Grep, Read, Write, Bash (git CLI), Exa, Context7, Zread, ZAI MCP Server, Happy Manager

---

## Quick Start

### Install Tools (first time only)

```bash
# 1. ast-grep (critical)
cargo install ast-grep --locked
uvx --from git+https://github.com/ast-grep/ast-grep-mcp ast-grep-server

# 2. Repomix
claude mcp add repomix -- npx repomix --mcp

# 3. code-graph-mcp
pip install code-graph-mcp ast-grep-py rustworkx
claude mcp add --scope project code-graph-mcp code-graph-mcp

# 4. Semgrep
pip install semgrep
claude mcp add semgrep -- semgrep mcp

# 5. scc metrics
scoop install scc
```

### Run a Full Extraction

```bash
# Via the squad chief:
@domain-decoder-chief *full-decode {path/to/codebase}

# Or step-by-step:
@domain-decoder-chief *triage {path}          # Phase 0: viability check
@code-cartographer *scan                       # Phase 1: L1 + L2
@code-cartographer *map-behavior               # Phase 2: L3 + L4
@rule-archaeologist *extract-rules             # Phase 3a: L5
@domain-modeler *extract-taxonomy              # Phase 3b: L6
@business-model-analyst *decode-model          # Phase 3c: L7
@tech-debt-geologist *forensic-analysis        # Phase 4: L8
@validation-arbiter *roundtable                # Phase 5: debate
@documentation-scribe *synthesize              # Phase 6: deliver
```

---

## Commands

| Command | Agent | Phase | Description |
|---------|-------|-------|-------------|
| `*full-decode {path}` | chief | 0-6 | Complete pipeline end-to-end |
| `*quick-scan {path}` | cartographer | 1-2 | Fast structural overview (L1+L2+L3) |
| `*triage {path}` | chief | 0 | Viability check and effort estimate |
| `*scan` | cartographer | 1 | Foundation scan (L1+L2) |
| `*map-behavior` | cartographer | 2 | Behavior mapping (L3+L4) |
| `*extract-rules` | archaeologist | 3 | Business rules extraction (L5) |
| `*extract-taxonomy` | modeler | 3 | Domain taxonomy extraction (L6) |
| `*decode-model` | analyst | 3 | Business model extraction (L7) |
| `*forensic-analysis` | geologist | 4 | Tech debt + hotspot analysis (L8) |
| `*roundtable` | arbiter | 5 | Structured debate on pending findings |
| `*synthesize` | scribe | 6 | Compile final deliverable package |
| `*status` | chief | any | Show current extraction progress |
| `*confidence` | arbiter | any | Show confidence dashboard |
| `*pause` | chief | any | Pause pipeline, surface state for human review |

---

## Final Deliverable Structure

```
domain-decoder-output/
  00-executive-summary.md          Non-technical stakeholder overview
  01-business-rules-catalog.md     All L5 findings with confidence scores
  02-domain-taxonomy.yaml          L6 bounded contexts, entities, glossary
  03-business-model-blueprint.md   L7 revenue streams, pricing tiers
  04-tech-debt-assessment.md       L8 hotspots, debt catalog, risk map
  05-modernization-roadmap.md      Recommended next steps (optional)
  06-confidence-dashboard.md       Per-finding and per-layer confidence metrics
  07-roundtable-decisions.md       Debate log with verdicts and rationale
  appendix-a-raw-extractions/      Source YAML files (L1-L8 findings)
  appendix-b-dependency-graph/     Visual dependency and context maps
  appendix-c-api-catalog/          Full L2 API contracts listing
```

---

## Key References

| Resource | Location | Purpose |
|----------|----------|---------|
| Brainstorm document | `docs/research/2026-02-19-domain-decoder-brainstorm.md` | Architecture, methodology, expert minds |
| Code DNA Framework | `data/code-dna-framework.yaml` | 8-layer extraction model definition |
| Extraction Heuristics | `data/extraction-heuristics.yaml` | 23 veto conditions across 7 phases |
| Knowledge Base | `data/domain-decoder-kb.md` | Methodologies, protocols, metrics reference |
| Skill Reuse Map | `data/skill-reuse-map.yaml` | Skills borrowed from other AIOS squads |
| Tool Mappings | `data/capability-tools.yaml` | Tool recommendations per capability |
| Squad Config | `config.yaml` | Full squad configuration |

---

## Design Philosophy

Domain Decoder's design follows five principles from Pedro Valerio's process methodology:

1. **Zero-wrong-paths:** Every phase output has a schema. Wrong outputs cannot be passed downstream.
2. **Unidirectional flow:** Phases go forward. Corrections are additive, never destructive.
3. **Veto conditions at every gate:** 9 blocking vetos that stop the pipeline, not warn it.
4. **Teste da filha:** Every output readable by a non-technical stakeholder.
5. **Five mandatory guardrails:** Loop prevention, idempotency, audit trail, manual escape, retry logic.

---

*Domain Decoder v1.0.0*
*Squad Type: Brownfield Analysis*
*Primary Output: Business Rules Catalog + Domain Taxonomy + Business Model Blueprint*
