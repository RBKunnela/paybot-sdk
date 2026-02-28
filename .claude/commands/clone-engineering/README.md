# Clone Engineering Squad

AI Clone Engineering squad implementing the MMOS pipeline with DNA Mental 8-layer methodology.

## Purpose

Creates high-fidelity cognitive clones (93-97% target) of any subject using a structured 7-phase pipeline.

## Agents

| Agent | Role | Pipeline Phase |
|-------|------|----------------|
| **El Clonador** (Lead) | Pipeline Orchestrator | All phases |
| **Mind Mapper** | Cognitive Extraction | Phase 2-3 (Research + Analysis) |
| **KB Curator** | Knowledge Base Architect | Phase 4 (Synthesis) |
| **Prompt Architect** | System Prompt Engineer | Phase 5 (Implementation) |
| **Fidelity Tester** | Validation QA | Phase 6 (Testing) |

## Pipeline (MMOS)

```
Phase 1: Viability ──> Phase 2: Research ──> Phase 3: Analysis
    (El Clonador)         (Mind Mapper)        (Mind Mapper)
         │                                          │
         │                                    8 DNA Mental Layers
         │                                    + identity-core.yaml
         │                                          │
Phase 7: Production <── Phase 6: Testing <── Phase 5: Implementation <── Phase 4: Synthesis
    (El Clonador)      (Fidelity Tester)     (Prompt Architect)          (KB Curator)
```

## Quick Start

```
@el-clonador *start-pipeline
```

## Structure

```
squads/clone-engineering/
├── squad.yaml           # Manifest
├── README.md            # This file
├── config/              # Squad configuration
├── agents/              # 5 agent definitions
├── tasks/               # 25 task definitions
├── workflows/           # 3 workflow definitions
├── checklists/          # 3 validation checklists
├── templates/           # 5 artifact templates
├── data/                # 3 reference data files
├── tools/               # Custom tools
└── scripts/             # Utility scripts
```

## Related Documentation

- Blueprint: `squads/.designs/clone-engineering-blueprint.yaml`
- Source docs: `aprendizado/clones-new-agents/alan_nicolas/`
- MMOS methodology: DNA Mental 8-layer cognitive extraction
