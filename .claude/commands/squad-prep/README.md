# Squad Prep - Squad Preparation Architect

Guides users through designing AIOS squads from scratch -- brainstorming ideas, researching experts, collecting source materials, and producing a complete Squad Preparation Document (SPD) that the Squad Creator agent (Craft) interprets to build the actual squad.

## Agent

| Agent | Role | Tier |
|-------|------|------|
| **Forge** | Squad Preparation Architect | 0 |

## Workflows

| Workflow | Description |
|----------|-------------|
| A - Expert Squad | Mind-clone based squads with source material collection |
| B - Pipeline/Hybrid Squad | Process-driven squads without expert personas |
| C - Discovery Brainstorm | Guided brainstorm for vague ideas |
| D - Document-Driven Design | Extract squad design from existing PRD/spec |
| E - Extension Prep | Extend an existing squad with new components |

## Quality Gates

| ID | Name | Blocking |
|----|------|----------|
| SP_QG_001 | Source Audit | Yes (min 4.0) |
| SP_QG_002 | SPD Completeness | Yes |
| SP_QG_003 | Architecture Validation | Yes |

## Usage

```
@squad-prep        # Activate Forge
@squad-prep:forge  # Direct activation
```

Forge will guide you through the appropriate workflow based on your squad idea and produce an SPD document ready to paste into Claude Code for the Squad Creator.

## Output

The final output is a **Squad Preparation Document (SPD)** in markdown format containing:
- Squad identity and configuration
- Tier architecture and agent definitions
- Task definitions with entrada/saida
- Mind clone sources (expert squads)
- Quality gates and routing
- Voice and tone configuration
- Gaps and warnings

## Knowledge Base

Reference files in `data/`:
- `KB-01-squad-architecture-reference.md`
- `KB-02-agent-template-quality-gates.md`
- `KB-03-mind-clone-pipeline.md`
- `KB-04-excellent-squad-examples.md`
