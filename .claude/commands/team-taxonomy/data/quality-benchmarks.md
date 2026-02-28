# Quality Benchmarks - Team Taxonomy Squad

## Agent Quality Benchmarks

| Agent | Min Lines | Required Sections | Tier |
|-------|-----------|-------------------|------|
| team-taxonomy-chief | 900 | voice_dna, thinking_dna, output_examples (3+), anti_patterns, completion_criteria, handoff_to, conflict_resolution, task_registry | Orchestrator |
| ruth-malan | 900 | voice_dna, thinking_dna, output_examples (3+), anti_patterns, completion_criteria, handoff_to | Tier 0 |
| matthew-skelton | 900 | voice_dna, thinking_dna, output_examples (3+), anti_patterns, completion_criteria, handoff_to | Tier 1 |
| manuel-pais | 900 | voice_dna, thinking_dna, output_examples (3+), anti_patterns, completion_criteria, handoff_to | Tier 1 |
| barry-hawkins | 900 | voice_dna, thinking_dna, output_examples (3+), anti_patterns, completion_criteria, handoff_to | Tier 2 |
| yoav-shoham | 900 | voice_dna, thinking_dna, output_examples (3+), anti_patterns, completion_criteria, handoff_to | Tier 2 |

---

## Task Quality Benchmarks

| Dimension | Minimum | Good | Excellent |
|-----------|---------|------|-----------|
| Lines | 250 | 300 | 400+ |
| Task Anatomy fields | 8/8 | 8/8 | 8/8 |
| Veto conditions | 2 | 3 | 5+ |
| Anti-patterns | 2 | 3 | 5+ |
| Phases | 3 | 4 | 5+ |
| Handoff block | Present | With artifact + format | With artifact + format + validation |

---

## Checklist Quality Benchmarks

| Dimension | Minimum | Good | Excellent |
|-----------|---------|------|-----------|
| Lines | 100 | 150 | 200+ |
| Blocking checks | 5 | 8 | 12+ |
| Warning checks | 2 | 4 | 6+ |
| Embedded YAML validation | Present | With fail_action | With fail_action + scoring |
| Scoring formula | Present | With thresholds | With pass/excellent/fail thresholds |

---

## Workflow Quality Benchmarks

| Dimension | Minimum | Good | Excellent |
|-----------|---------|------|-----------|
| Lines | 300 | 400 | 500+ |
| Phases | 3 | 4 | 5+ |
| Task references | All phases | All phases | All phases + synthesis |
| Checklist reference | 1 per workflow | 1 per workflow | 1 per workflow + quality gates |
| Checkpoints per phase | 1 | 2 | 3+ |
| Template outputs | 1 per phase | 1 per phase | 1 per phase |
| Veto conditions | 1 per phase | 2 per phase | 3+ per phase |

---

## Pedro Valerio's 5 Questions Benchmark

| # | Question (25% each unless noted) | Score Target | How We Achieve It |
|---|----------------------------------|-------------|-------------------|
| 1 | Impede erro sem ler o doc? | 20/25 | Tasks have inline veto conditions (STOP/BLOCK) |
| 2 | Impede pular passo? | 20/25 | Workflows have task gates per phase + checklists |
| 3 | Funciona sem pessoa X? (15%) | 12/15 | Tier system + conflict resolution + Chief arbitration |
| 4 | Handoffs automatizados? (20%) | 16/20 | Every task ends with explicit handoff block |
| 5 | Auto-explicativo? (15%) | 12/15 | QUICK-START.md + self-contained tasks |
| **Total** | | **80/100 = 8.0+** | |

---

## Scoring Thresholds

| Score | Status | Action |
|-------|--------|--------|
| 9.0+ | Excellent | Ready for production, best-in-class |
| 7.0-8.9 | Pass | Production-ready |
| 5.0-6.9 | Conditional | Fix gaps before production |
| <5.0 | Fail | Major rework needed |

---

_Benchmarks Version: 1.0_
_Squad: team-taxonomy_
