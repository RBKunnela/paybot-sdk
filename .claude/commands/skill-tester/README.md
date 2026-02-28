# Skill Tester

Compares 2+ skills (prompts, system prompts, slash commands, agent definitions) side by side using controlled scenarios, quantitative scoring (1-10 per criterion), and qualitative analysis. Produces a ranked comparison report with a justified verdict. Includes a specialized UI/UX evaluation rubric calibrated against the frontend-design-hybrid skill (9.1/10 benchmark).

## Agents

| Agent | Role | Type |
|-------|------|------|
| eval-chief | Lead Evaluator & Test Architect — designs criteria, delegates execution, synthesizes verdict | Chief |
| test-runner | Skill Executor — runs skills against scenarios and collects raw outputs | Specialist |
| quality-judge | Quality Scorer — blind-evaluates outputs, scores per criterion, identifies strengths/weaknesses | Specialist |
| skill-tester | User-Facing Orchestrator — entry point for activating the squad | Activatable |

## Knowledge Docs

| Document | Content |
|----------|---------|
| [EVALUATION-METHODOLOGY.md](knowledge/EVALUATION-METHODOLOGY.md) | Blind sequential evaluation, 6 criteria with weights, scoring scale 1-10, justification protocol |
| [UI-UX-EVALUATION-RUBRIC.md](knowledge/UI-UX-EVALUATION-RUBRIC.md) | 28-point pre-delivery checklist, anti-patterns, bonus criteria, benchmark calibration |
| [STANDARD-TEST-SCENARIOS.md](knowledge/STANDARD-TEST-SCENARIOS.md) | SaaS Dashboard, Landing Page Hero, Onboarding Form, custom scenario protocol |
| [INDEX.md](knowledge/INDEX.md) | Knowledge index with decision map and quick reference |

## Workflow Pipeline

```
User → @skill-tester → eval-chief
                          │
                          ├── 1. Setup: Define criteria + scenarios
                          │
                          ├── 2. Execute: test-runner runs each skill
                          │      with identical inputs and collects outputs
                          │
                          ├── 3. Evaluate: quality-judge scores each
                          │      output blindly per criterion
                          │
                          └── 4. Compare: eval-chief consolidates
                                 scorecard + verdict + report
```

## Key Commands

| Command | Description |
|---------|-------------|
| `*compare-skills` | Full comparison: setup → execute → evaluate → report |
| `*quick-compare` | Rapid comparison: 1 scenario, scorecard, verdict |
| `*setup-criteria` | Define custom evaluation criteria before comparing |
| `*run-skill` | Execute a single skill against scenarios |
| `*evaluate` | Evaluate and score a specific output |

## Templates

| Template | Use |
|----------|-----|
| `scorecard-template.md` | Quantitative comparison table with scores per criterion |
| `comparison-report-template.md` | Full qualitative report with analysis and verdict |

## Quick Start

```
@skill-tester "compare skill-A.md vs skill-B.md"
```

### Skill Types Accepted

- **Prompts**: User/assistant prompt text
- **System Prompts**: System instructions / persona definitions
- **Slash Commands**: `.claude/skills/*.md` skill files
- **Agent Definitions**: `.aios-core/squads/*/agents/*.md` agent files

## Integration with Other Squads

| Squad | Use Case |
|-------|----------|
| squad-creator | Validate skills of newly created squads |
| copywriting | Compare copy prompts, A/B test angles |
| youtube-content | Compare thumbnail prompts, test hooks |
| creative-studio | Benchmark visual generation prompts |
| design-system | Evaluate frontend skill quality against benchmark |
