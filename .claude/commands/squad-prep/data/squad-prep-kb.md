# Squad Prep Knowledge Base

Compiled reference for the Squad Preparation Architect (Forge).

## Knowledge Base Files

| File | Topic |
|------|-------|
| `kb-01-squad-architecture-reference.md` | Squad directory structure, squad.yaml schema, tier architecture, validation rules |
| `kb-02-agent-template-quality-gates.md` | 7-Level Hybrid Loader agent architecture, quality gate validation |
| `kb-03-mind-clone-pipeline.md` | Source collection, Thinking DNA, Voice DNA extraction for expert squads |
| `kb-04-excellent-squad-examples.md` | Production squad patterns from ontarget-scripts, ontarget-outlier, prompt-architects, family-specialist |

## Quick Reference

### Squad Types
- **Expert** - Mind-clone based, requires source material, Voice DNA + Thinking DNA
- **Pipeline** - Sequential processing, phase-based, process consistency
- **Hybrid** - Combines process automation with expert knowledge

### Source Tier System (Expert Squads)
- **Tier 0** - User-provided materials (HIGHEST confidence)
- **Tier 1** - Primary, BY the expert (HIGH)
- **Tier 2** - Secondary, ABOUT the expert (MEDIUM)
- **Tier 3** - Tertiary, aggregated summaries (LOW)

### Blocking Minimums for Expert Squads
- 10+ total sources
- 5+ Tier 1 sources
- 3+ different source types
- 5+ hours OR 200+ pages content volume
- Core framework confirmed in 3+ sources (triangulation)

### Quality Gate ID Pattern
`{SQUAD_PREFIX}_QG_{NNN}` (e.g., SP_QG_001)

### Agent Architecture Levels
- Level 0: Loader Configuration
- Level 1: Identity
- Level 2: Operational Frameworks
- Level 3: Voice DNA
- Level 4: Quality Assurance
- Level 5: Credibility (conditional)
- Level 6: Integration
