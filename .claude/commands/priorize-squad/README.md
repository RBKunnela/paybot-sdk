# Prioritization Squad

> AI-powered prioritization toolkit with 23 documented techniques and 3 specialized agents.

## Overview

The Prioritization Squad helps you **choose and execute** the right prioritization technique for any situation. From a 5-minute Eisenhower matrix for your daily tasks to a full AHP analysis for project portfolio decisions — this squad guides you through the entire process.

## Architecture

```
            ┌─────────────────────────────┐
            │  🎯 priorize-chief (Tier 0) │
            │  Diagnosis & Orchestration   │
            └──────────┬──────────────────┘
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
┌──────────────────┐    ┌───────────────────────┐
│ ⚡ technique-     │    │ 📊 technique-analyst  │
│ executor (Tier 1)│    │      (Tier 2)         │
│ Scoring Sessions │    │ Comparison & Analysis │
└──────────────────┘    └───────────────────────┘
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed component flow diagram.

## What's Included

| Component | Count | Description |
|-----------|-------|-------------|
| Agents | 3 | Prioritization Architect (Tier 0), Technique Executor (Tier 1), Technique Analyst (Tier 2) |
| Tasks | 4 | select-technique, execute, compare, quick-prioritize |
| Data | 1 | Technique catalog (23 techniques) |
| Checklists | 1 | Prioritization quality review (16-point, with inline auto-correction) |

## Agents

| Agent | Tier | Role |
|-------|------|------|
| `priorize-chief` | 0 (Orchestrator) | Diagnoses context, selects technique, delegates execution, validates output |
| `technique-executor` | 1 (Specialist) | Executes scoring sessions step-by-step for all 23 techniques |
| `technique-analyst` | 2 (Specialist) | Compares techniques on 8 dimensions, analyzes trade-offs |

## Techniques Catalog (23 Frameworks)

### Matrix-Based (Visual 2x2)
| Technique | Creator | Complexity | Best For |
|-----------|---------|-----------|----------|
| Eisenhower Matrix | Eisenhower/Covey | Low | Daily tasks, personal productivity |
| Value vs. Effort | Lean/Agile community | Low | Sprint planning, quick triage |
| PICK Chart | Lockheed Martin | Low | Process improvement, Lean Six Sigma |

### Numeric Scoring
| Technique | Creator | Complexity | Best For |
|-----------|---------|-----------|----------|
| RICE | Intercom | Medium | Product backlog, data-driven teams |
| ICE | Sean Ellis | Low | Growth hacking, quick experiments |
| GUT | Kepner & Tregoe | Low | Problems, risks, industrial quality |
| WSJF | Reinertsen/SAFe | Medium | Enterprise portfolio, SAFe/Lean |
| Weighted Scoring | Generic PM | Medium | Custom multi-criteria decisions |
| CD3 | Reinertsen | High | Economic prioritization |

### Categorization
| Technique | Creator | Complexity | Best For |
|-----------|---------|-----------|----------|
| MoSCoW | Dai Clegg | Low | MVP definition, scope negotiation |
| Kano Model | Dr. Noriaki Kano | High | Customer-driven features |
| ABCDE Method | Brian Tracy | Low | Personal daily productivity |
| Three Feature Buckets | Adam Nash | Low | Product roadmap balance |

### Principles/Lenses
| Technique | Creator | Complexity | Best For |
|-----------|---------|-----------|----------|
| Pareto 80/20 | Pareto/Juran | Low | Quick focus, resource allocation |
| 1/3/9 Technique | Community | Low | Daily focus management |

### Visual/Mapping
| Technique | Creator | Complexity | Best For |
|-----------|---------|-----------|----------|
| Story Mapping | Jeff Patton | Medium | Release planning, MVP |
| Impact Mapping | Gojko Adzic | Medium | Strategic alignment |

### Group Decision
| Technique | Creator | Complexity | Best For |
|-----------|---------|-----------|----------|
| AHP | Thomas L. Saaty | High | Complex strategic decisions |
| NGT | Delbecq & Van de Ven | Medium | Balanced group decisions |

### Research/Customer
| Technique | Creator | Complexity | Best For |
|-----------|---------|-----------|----------|
| Opportunity Scoring | Anthony Ulwick | Medium | Customer-driven innovation |
| Buy a Feature | Luke Hohmann | Medium | Stakeholder workshops |
| QFD / House of Quality | Akao & Mizuno | High | Engineering requirements |

### Validation
| Technique | Creator | Complexity | Best For |
|-----------|---------|-----------|----------|
| Walking Skeleton | Alistair Cockburn | Medium | Early-stage product validation |

## Commands

| Command | Description |
|---------|-------------|
| `*select-technique` | Guided questionnaire to find the best technique for your situation |
| `*execute [technique]` | Run a prioritization session step-by-step |
| `*compare [tech1] [tech2]` | Compare techniques side-by-side |
| `*quick` | Fast prioritization for simple lists (auto-selects technique) |
| `*explain [technique]` | Deep explanation of any technique |
| `*catalog` | Show all 23 techniques grouped by category |
| `*help` | Show all commands |

## Quick Start

### "I need to prioritize but don't know which technique to use"
```
*select-technique
```
The guided questionnaire will ask 3-5 questions and recommend the best technique.

### "I know what technique I want"
```
*execute rice
```
Runs a full RICE scoring session step-by-step.

### "I just need a quick ranking"
```
*quick
Feature A, Feature B, Feature C, Feature D, Feature E
```
Auto-selects the lightest technique and produces a ranking in minutes.

### "Which technique is better: RICE or ICE?"
```
*compare rice ice
```
Side-by-side comparison on 8 dimensions.

## Technique Selector (Quick Reference)

```
What are you prioritizing?
├── Personal daily tasks → Eisenhower, ABCDE, 1/3/9
├── Product features
│   ├── With data → RICE, WSJF, Weighted Scoring
│   ├── Without data → ICE, MoSCoW, Value vs. Effort
│   └── With customer research → Kano, Opportunity Scoring
├── Projects/portfolio → WSJF, CD3, AHP, Weighted Scoring
├── Problems/risks → GUT, Pareto, Eisenhower
├── Team ideas → NGT, PICK Chart, Value vs. Effort
└── Strategic alignment → Impact Mapping, Story Mapping
```

## Pack Structure

```
squads/priorize-squad/
├── squad.yaml                    # Squad configuration (v1.1.0)
├── README.md                     # This file
├── ARCHITECTURE.md               # Component flow diagram & tier organization
├── CHANGELOG.md                  # Version history
├── agents/
│   ├── priorize-chief.md         # Tier 0: Diagnosis & orchestration
│   ├── technique-executor.md     # Tier 1: Scoring session specialist
│   └── technique-analyst.md      # Tier 2: Comparison & trade-off analyst
├── tasks/
│   ├── select-technique.md       # Guided technique selection
│   ├── execute-prioritization.md # Execute any technique step-by-step
│   ├── compare-techniques.md     # Side-by-side comparison
│   └── quick-prioritize.md       # Fast prioritization
├── data/
│   └── technique-catalog.yaml    # 23 techniques database
└── checklists/
    └── technique-review.md       # Quality review checklist (v1.2, 16-point)
```

## Market Area Coverage

| Area | Techniques |
|------|-----------|
| Software / Product | MoSCoW, RICE, ICE, WSJF, Kano, Story Mapping, Value vs. Effort, Impact Mapping, Three Buckets, Walking Skeleton |
| Engineering / Quality | GUT, Pareto, Kano, WSJF, QFD, PICK Chart |
| Growth / Marketing | ICE, RICE, Opportunity Scoring, Buy a Feature, Pareto |
| Management / Daily | Eisenhower, Pareto, 1/3/9, Value vs. Effort, GUT, ABCDE |
| Startups / Innovation | ICE, Buy a Feature, Value vs. Effort, MoSCoW, Opportunity Scoring, Walking Skeleton |
| Enterprise / Portfolio | WSJF, CD3, AHP, Weighted Scoring |

---

*Prioritization Squad v1.1 — Priorize Pack for AIOS*
