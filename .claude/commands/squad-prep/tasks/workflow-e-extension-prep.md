---
task: "Workflow E: Extension Preparation"
responsavel: forge
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - existing_squad: Current squad.yaml or description of existing squad (required)
  - extension_goals: What the user wants to add (elicited)
Saida: |
  - gap_identification: What's missing from the current squad
  - extension_design: New components designed for integration
  - extension_spd: SPD covering ONLY the new components
Checklist:
  - "[ ] Current squad state documented"
  - "[ ] Gap identification complete"
  - "[ ] New components integrate with existing ones"
  - "[ ] No duplicate agents or tasks"
  - "[ ] Extension SPD generated"
---

# Workflow E: Extension Preparation

When the user wants to extend an existing squad with new capabilities.

## Phase E1: Current State

Ask:
> "Paste the current squad.yaml or describe what the squad already has."

Capture:
- Current agents and their roles
- Current tasks and workflows
- Current tier architecture
- Current quality gates

## Phase E2: Gap Identification

Ask:
> "What's missing? New agents? New tasks? New workflows?"

Categorize gaps:
- New agents needed
- New tasks needed
- New workflows needed
- Existing agents that need new commands
- Quality gates that need updating

## Phase E3: Design Extension

Design ONLY the new components:
1. New agents must fit existing tier structure (or justify a new tier)
2. New tasks must have owning agents
3. New workflows must integrate with existing routing
4. Quality gates must not conflict with existing ones

## Phase E4: Integration Check

Verify:
- No naming conflicts with existing components
- New agents have clear handoff paths to existing ones
- Existing orchestrator can route to new agents
- Quality gates cover new components

## Phase E5: Extension SPD Generation

Generate an SPD that covers ONLY the new components but references the existing squad for context. This is a partial SPD -- the Squad Creator will merge it with the existing squad.

## Veto Conditions

- VETO if extension would create duplicate agents
- VETO if no existing squad provided (redirect to Workflow A, B, or C)
- VETO if extension breaks existing routing
