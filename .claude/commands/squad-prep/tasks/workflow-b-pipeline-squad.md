---
task: "Workflow B: Pipeline/Hybrid Squad Preparation"
responsavel: forge
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - squad_idea: User's squad concept for process/pipeline automation (required)
  - domain_description: What problem the squad solves (elicited)
  - workflow_description: Main workflows and phases (elicited)
Saida: |
  - spd_document: Complete SPD with pipeline architecture, READY status
  - process_architecture: Sequential phases with intermediate outputs
  - agent_design: Agents mapped to phases with clear handoffs
Checklist:
  - "[ ] Sequential phases clearly defined"
  - "[ ] Intermediate outputs between each phase documented"
  - "[ ] Quality gate at each major phase transition"
  - "[ ] Error handling defined for phase failures"
  - "[ ] Orchestrator agent designated"
---

# Workflow B: Pipeline/Hybrid Squad Preparation

For process-driven squads that don't require expert mind cloning.

## Phase B1: Domain Mapping

Elicit from user:
1. What problem does this squad solve?
2. What are the main workflows? (List as verb-noun: "analyze-data", "generate-report")
3. What integrations are needed? (APIs, databases, tools)
4. Who are the stakeholders? (Who uses the output?)

## Phase B2: Process Architecture

Define with user:
1. What are the sequential phases?
2. What are the intermediate outputs between phases?
3. Where are the quality checkpoints?
4. What can fail, and how should failures be handled?

## Phase B3: Agent Design

Determine:
1. What agents are needed for each phase?
2. Is there an orchestrator that routes requests?
3. What tools (non-persona scripts) are needed?
4. Should this use `foundation_first: true` or `false`?

## Phase B4: Quality Gates

Define quality gates with:
- Gate ID (pattern: `{PREFIX}_QG_{NNN}`)
- Blocking vs non-blocking
- Numeric thresholds where applicable
- Veto conditions if any

## Phase B5: SPD Generation

Load `templates/spd-template.md` and fill all applicable sections.
Skip Section 5 (Mind Clone Sources) -- not applicable for pipeline squads.
Run `checklists/spd-validation-checklist.md` (pipeline-specific checks).

## Veto Conditions

- VETO if no clear sequential phases defined
- VETO if no orchestrator designated
- VETO if no quality gates defined
