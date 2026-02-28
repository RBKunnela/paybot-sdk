# SPD Validation Checklist

Run this checklist before marking any SPD as READY.

---

## Universal Checks (ALL Squads)

- [ ] Squad name is kebab-case, 2-50 chars, matches pattern `^[a-z0-9-]+$`
- [ ] Version is semver (e.g., 1.0.0)
- [ ] Description is under 500 chars
- [ ] Has a designated orchestrator agent
- [ ] Has a Tier 0 diagnostic agent OR uses `foundation_first: false` with a capable orchestrator
- [ ] Every task has an owning agent
- [ ] Every agent has at least one command
- [ ] No orphan agents (agents with zero tasks)
- [ ] No orphan tasks (tasks without an agent)
- [ ] Quality gates defined with IDs and thresholds
- [ ] Routing flow is clear with BLOCKING markers
- [ ] Agent:Task ratio is reasonable for squad type
- [ ] Components registry lists all agents, tasks, workflows, checklists, templates
- [ ] slashPrefix is defined and kebab-case
- [ ] Tags are relevant to the domain

## Expert Squad Checks (ADDITIONAL)

- [ ] Every expert-based agent has source materials listed
- [ ] Each expert has 10+ total sources
- [ ] Each expert has 5+ Tier 1 (primary) sources
- [ ] Each expert has 3+ different source types
- [ ] Content volume: 200+ pages OR 5+ hours per expert
- [ ] Core framework confirmed in 3+ sources (triangulation)
- [ ] GO/NO-GO assessment for each expert
- [ ] Books listed with consumption status (consumed/not-consumed)
- [ ] Voice indicators collected (signature phrases, never-says)
- [ ] Anti-patterns defined for each expert agent
- [ ] Voice configuration defined at squad level (if brand-aligned)
- [ ] Tone dimensions documented per expert agent

## Pipeline Squad Checks (ADDITIONAL)

- [ ] Clear sequential phases defined
- [ ] Intermediate outputs between each phase
- [ ] Quality gate at each major phase transition
- [ ] Error handling defined (what happens when a phase fails)
- [ ] Integration points documented (APIs, tools, databases)

## Hybrid Squad Checks (ADDITIONAL)

- [ ] Expert elements have source validation
- [ ] Pipeline elements have sequential phases
- [ ] Clear boundary between expert and pipeline components
- [ ] Quality gates cover both expert fidelity and process correctness

## Status Determination

| Condition | Status |
|-----------|--------|
| All universal + type-specific checks pass | **READY** |
| All universal pass, 1-2 type-specific fail with clear remediation plan | **CONDITIONAL** |
| Universal checks have failures OR 3+ type-specific failures | **DRAFT** |

## Veto Conditions (Override Any Status)

- No orchestrator defined -> Cannot be READY
- No quality gates defined -> Cannot be READY
- Expert squad with NO-GO on all experts -> Cannot be READY
- No agents defined -> Cannot be READY
- No tasks defined -> Cannot be READY
