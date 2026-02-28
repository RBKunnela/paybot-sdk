---
task: "Workflow C: Discovery Brainstorm"
responsavel: forge
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - vague_idea: User's rough, undefined squad concept (required)
Saida: |
  - refined_concept: Clear squad concept ready for Workflow A or B
  - squad_type: expert | pipeline | hybrid
  - routing_decision: Which workflow to execute next
Checklist:
  - "[ ] Problem statement clearly defined"
  - "[ ] Outcome vision articulated"
  - "[ ] Expert vs Process decision made"
  - "[ ] Scope defined (in/out for v1.0)"
  - "[ ] Routed to Workflow A or B"
---

# Workflow C: Discovery Brainstorm

When the user has a vague idea, guide them through discovery to refine it.

## Phase C1: Problem Statement

Ask:
> "Describe the problem this squad solves. Who has this problem? What do they do today without the squad?"

Wait for response. Do not proceed until the problem is clear.

## Phase C2: Outcome Vision

Ask:
> "If this squad existed and worked perfectly, what would the user get? Describe the ideal output."

Wait for response. Clarify if needed.

## Phase C3: Expert vs. Process

Ask:
> "Is this squad about applying a specific person's methodology, or is it about automating a process?"

This determines routing:
- Specific methodology -> Expert Squad (Workflow A)
- Process automation -> Pipeline Squad (Workflow B)
- Both -> Hybrid (Workflow B with expert elements)

## Phase C4: Existing Solutions

Ask:
> "Are there existing tools, frameworks, or experts that solve this? What's missing from them?"

This reveals the unique value proposition of the squad.

## Phase C5: Scope

Ask:
> "What's IN scope for v1.0? What's explicitly OUT of scope?"

Scope prevents feature creep and ensures focused design.

## Routing Decision

After C1-C5, you should have enough to route:

| Answers Suggest | Route To |
|----------------|----------|
| Expert with methodology | Workflow A: Expert Squad |
| Process with phases | Workflow B: Pipeline Squad |
| Still vague | Ask 1-2 more clarifying questions |

Announce the routing decision and immediately begin the target workflow.

## Veto Conditions

- VETO if skipping directly to SPD without completing C1-C5
- VETO if user cannot articulate the problem statement after 3 attempts
