---
task: Create Generalist Prompt
responsavel: "@prompt-architect"
responsavel_type: Agente
atomic_layer: Organism
elicit: false

Entrada:
  - campo: identity_core_path
    tipo: string
    origem: "user input"
    obrigatorio: true
    validacao: "file exists && file.endsWith('.yaml')"
  - campo: cognitive_spec_path
    tipo: string
    origem: "user input"
    obrigatorio: true
    validacao: "file exists && file.endsWith('.yaml')"
  - campo: persona_prompts_dir
    tipo: "string | null"
    origem: "user input"
    obrigatorio: false
    padrao: null
    validacao: "value == null || directoryExists(value)"

Saida:
  - campo: generalista_prompt
    tipo: "string (markdown file with complete multi-persona system prompt)"
    destino: "file"
    persistido: true
  - campo: prompt_stats
    tipo: "object { total_size_kb: number, token_count_estimate: number, section_sizes: object, persona_count: number, persona_distribution: object }"
    destino: "user output"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "identity-core.yaml exists with shared identity (values, obsessions, paradoxes)"
      tipo: pre-condition
      blocker: true
      validacao: "identity_core_path != null && fileExists(identity_core_path)"
    - descricao: "cognitive-spec.yaml exists with all decision trees and mental models"
      tipo: pre-condition
      blocker: true
      validacao: "cognitive_spec_path != null && fileExists(cognitive_spec_path)"
    - descricao: "If persona_prompts_dir provided, directory contains at least 2 persona prompt files"
      tipo: pre-condition
      blocker: false
      validacao: "persona_prompts_dir == null || listFiles(persona_prompts_dir).length >= 2"
  post-conditions:
    - descricao: "Generalista prompt contains shared identity core section"
      tipo: post-condition
      blocker: true
      validacao: "generalista_prompt.includes('Identity Core') || generalista_prompt.includes('identity_core')"
    - descricao: "Persona switching logic is implemented with context triggers"
      tipo: post-condition
      blocker: true
      validacao: "generalista_prompt.includes('persona_switching') || generalista_prompt.includes('Persona Switching')"
    - descricao: "3-tier memory references are present (Tier 1, Tier 2, Tier 3)"
      tipo: post-condition
      blocker: true
      validacao: "generalista_prompt.includes('Tier 1') && generalista_prompt.includes('Tier 2') && generalista_prompt.includes('Tier 3')"
    - descricao: "All decision trees are embedded (strategic, tactical, people)"
      tipo: post-condition
      blocker: true
      validacao: "generalista_prompt.includes('Strategic') && generalista_prompt.includes('Tactical') && generalista_prompt.includes('People')"
    - descricao: "Persona distribution targets are defined with trackable ratios"
      tipo: post-condition
      blocker: true
      validacao: "generalista_prompt.includes('distribution') || generalista_prompt.includes('Distribution')"
    - descricao: "Total size is within ~50KB target for core identity"
      tipo: post-condition
      blocker: false
      validacao: "prompt_stats.total_size_kb <= 60"
    - descricao: "Comprehensive guardrails section with anti-patterns for each persona"
      tipo: post-condition
      blocker: true
      validacao: "generalista_prompt.includes('Guardrails') && generalista_prompt.includes('Anti-Patterns')"
  acceptance-criteria:
    - descricao: "Reading the prompt activates the correct persona for each context trigger"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Shared identity is consistent across all persona modes — core values never change"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Persona transitions are smooth — no identity fragmentation between switches"
      tipo: acceptance
      blocker: false
      manual_check: true

Performance:
  duration_expected: "interactive (15-30min)"
  cost_estimated: "$0"
  cacheable: false
  parallelizable: false

Error_Handling:
  strategy: fallback
  fallback: "If cognitive artifacts are incomplete, build generalista from available data and flag missing sections for later completion"
  retry:
    max_attempts: 2
    backoff: linear
    backoff_ms: 0
  abort_workflow: false
  notification: log

Metadata:
  version: "1.0.0"
  dependencies: []
  author: "Felipe Rosa"
  created_at: "2026-02-01"
  updated_at: "2026-02-01"
---

# *create-generalista

Create the all-personas generalist system prompt (the main clone prompt). This is the master prompt that integrates all persona variants into a single unified system with context-triggered persona switching, shared identity core, and 3-tier memory architecture.

## Uso

```
@prompt-architect
*create-generalista
# -> Reads artifacts from default paths and builds generalista

*create-generalista --identity ./data/identity-core.yaml --cognitive ./data/cognitive-spec.yaml --personas ./prompts/
# -> Builds generalista from specified artifacts and existing persona prompts
```

## Workflow

### Step 1: Load All Cognitive Artifacts
- Read identity-core.yaml (shared identity: values, obsessions, paradoxes)
- Read cognitive-spec.yaml (mental models, decision trees, cognitive patterns)
- If persona_prompts_dir provided, read all existing persona prompt files
- Catalog all available data for assembly

### Step 2: Build Shared Identity Core
- Extract the identity elements shared across ALL personas
- These are non-negotiable constants: core values, fundamental beliefs, life obsessions
- Embed verbatim — shared identity is the anchor that prevents persona fragmentation
- Format: clear section with explicit "these never change regardless of active persona"

### Step 3: Implement Persona Switching Logic
- Define context triggers for each persona:
  - Example: AI/technology question triggers ia-expert persona
  - Example: life/philosophy question triggers vida-legendaria persona
  - Example: business/strategy question triggers mentor persona
- Define transition rules:
  - How to detect context shift mid-conversation
  - Graceful blending when context is ambiguous
  - Default persona when no trigger matches
- Define activation format (internal metadata the model tracks)

### Step 4: Embed All Decision Trees
- Strategic decision tree (6-step): shared across personas, applied differently
- Tactical decision tree (3-step): persona-specific application rules
- People decision tree (3-step): relationship and team contexts
- For each tree, note which persona applies it and how

### Step 5: Implement 3-Tier Memory References
- **Tier 1 — Permanent Identity (in-prompt):** Core values, key mental models, decision trees embedded directly in the system prompt. Always available. Never retrieved.
- **Tier 2 — RAG Retrieval (from KB):** Domain knowledge, detailed examples, specific frameworks. Retrieved on-demand via search. Reference KB index structure.
- **Tier 3 — Session Context (conversation):** Current conversation history, user preferences learned in-session, temporary context. Managed by conversation memory.
- Add priority rules: Tier 1 > Tier 2 > Tier 3 when information conflicts

### Step 6: Add Tool Definitions
- Define available tools (InnerLens self-reflection, IA Agents if applicable)
- Specify when each tool should be invoked
- Add tool output formatting instructions
- Note: tools are optional — only include if the clone uses them

### Step 7: Build Comprehensive Guardrails
- Per-persona guardrails (what each persona must never do)
- Cross-persona guardrails (universal constraints)
- Anti-patterns per persona with correction instructions
- Identity protection rules (never break character, never contradict core values)
- Ethical boundaries (factual accuracy, no harmful advice)

### Step 8: Define Persona Distribution Targets
- Set target distribution ratios:
  - Example: 45% ia-expert / 40% vida-legendaria / 15% overlap
- Define how overlap zones work (blended responses)
- Add tracking instruction: model should note which persona is active
- These are targets, not hard constraints — natural conversation drives actual ratios

### Step 9: Optimize Total Size
- Measure total prompt size in KB and estimated tokens
- Target: ~50KB for core identity (Tier 1 content)
- If over target:
  - Move detailed examples to Tier 2 (KB retrieval)
  - Compress verbose sections without losing meaning
  - Merge overlapping guardrails across personas
- Preserve all high-impact content: values, decision trees, switching logic

### Step 10: Write Generalista File
- Write generalista.md with complete multi-persona system prompt
- Output prompt_stats with size breakdown and persona metadata
- Report completion with summary

## Output

### generalista.md Structure

```markdown
# System Prompt: [Clone Name] — Generalista

## Shared Identity Core
[Values, obsessions, paradoxes — constant across all personas]

## Persona Registry
### Persona: [name-1]
- Trigger: [context conditions]
- Voice: [tone, vocabulary, energy]
- Emphasis: [what this persona prioritizes]

### Persona: [name-2]
[...]

## Persona Switching Logic
### Context Triggers
[Trigger -> Persona mapping table]
### Transition Rules
[How to handle mid-conversation switches]
### Default Behavior
[What happens when no trigger matches]

## Mental Models
[Shared models with persona-specific application notes]

## Decision Trees
### Strategic (6-step)
### Tactical (3-step)
### People (3-step)

## Communication Style Matrix
| Dimension | [persona-1] | [persona-2] | [overlap] |
[Style differences per persona]

## Memory System
### Tier 1: Permanent Identity (this prompt)
### Tier 2: RAG Retrieval (KB reference)
### Tier 3: Session Context (conversation)

## Tools
[Available tools and invocation rules]

## Guardrails
### Universal
### Per-Persona
### Anti-Patterns

## Persona Distribution
[Target ratios and tracking instructions]
```

### prompt_stats Structure

```yaml
total_size_kb: [number]
token_count_estimate: [number]
persona_count: [number]
personas: ["ia-expert", "vida-legendaria", ...]
persona_distribution:
  ia-expert: 45
  vida-legendaria: 40
  overlap: 15
section_sizes:
  shared_identity: [kb]
  persona_registry: [kb]
  switching_logic: [kb]
  mental_models: [kb]
  decision_trees: [kb]
  communication_style: [kb]
  memory_system: [kb]
  tools: [kb]
  guardrails: [kb]
created_at: "[timestamp]"
```
