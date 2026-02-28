---
task: Create Persona Prompt
responsavel: "@prompt-architect"
responsavel_type: Agente
atomic_layer: Organism
elicit: true

Entrada:
  - campo: persona_name
    tipo: string
    origem: "user input"
    obrigatorio: true
    validacao: "length >= 3"
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
  - campo: communication_style_ref
    tipo: "string | null"
    origem: "user input"
    obrigatorio: false
    padrao: null
    validacao: "value == null || file exists"

Saida:
  - campo: system_prompt
    tipo: "string (markdown file with complete system prompt)"
    destino: "file"
    persistido: true
  - campo: prompt_metadata
    tipo: "object { total_size_kb: number, section_sizes: object, token_count_estimate: number, persona_name: string, sections_included: array<string> }"
    destino: "file"
    persistido: true

Checklist:
  pre-conditions:
    - descricao: "identity-core.yaml exists and is valid YAML with values, obsessions, paradoxes"
      tipo: pre-condition
      blocker: true
      validacao: "identity_core_path != null && fileExists(identity_core_path)"
    - descricao: "cognitive-spec.yaml exists and is valid YAML with mental models, decision trees"
      tipo: pre-condition
      blocker: true
      validacao: "cognitive_spec_path != null && fileExists(cognitive_spec_path)"
    - descricao: "Persona name is defined and non-empty"
      tipo: pre-condition
      blocker: true
      validacao: "persona_name != null && persona_name.length >= 3"
  post-conditions:
    - descricao: "System prompt file written with all mandatory sections"
      tipo: post-condition
      blocker: true
      validacao: "system_prompt.includes('identity_core') && system_prompt.includes('psychometric_foundation') && system_prompt.includes('mental_models') && system_prompt.includes('decision_trees') && system_prompt.includes('communication_style') && system_prompt.includes('guardrails')"
    - descricao: "Anti-patterns section is present in the prompt"
      tipo: post-condition
      blocker: true
      validacao: "system_prompt.includes('anti-patterns') || system_prompt.includes('Anti-Patterns')"
    - descricao: "Prompt metadata includes token count estimate and section sizes"
      tipo: post-condition
      blocker: true
      validacao: "prompt_metadata.token_count_estimate > 0 && Object.keys(prompt_metadata.section_sizes).length >= 6"
    - descricao: "Total prompt size is within context window target (~50KB)"
      tipo: post-condition
      blocker: false
      validacao: "prompt_metadata.total_size_kb <= 60"
  acceptance-criteria:
    - descricao: "Persona voice is recognizable — reading the prompt makes the persona's identity clear"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Decision trees are operational — each has clear trigger, steps, and outcome"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Values from identity-core are embedded verbatim, not paraphrased"
      tipo: acceptance
      blocker: false
      manual_check: true

Performance:
  duration_expected: "interactive (10-20min)"
  cost_estimated: "$0"
  cacheable: false
  parallelizable: false

Error_Handling:
  strategy: fallback
  fallback: "If identity-core or cognitive-spec is incomplete, list missing fields and ask user to fill them before retrying"
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

# *create-prompt

Create a complete system prompt for a specific persona variant. Reads cognitive artifacts (identity-core, cognitive-spec) and engineers a high-fidelity prompt with all mandatory sections: identity, psychometrics, mental models, decision trees, communication style, guardrails, and anti-patterns.

## Uso

```
@prompt-architect
*create-prompt
# -> Interactive mode: asks persona name, paths to artifacts

*create-prompt --persona "ia-expert" --identity ./data/identity-core.yaml --cognitive ./data/cognitive-spec.yaml
# -> Creates prompt for specific persona with given artifacts
```

## Workflow

### Step 1: Load Identity Core
- Read identity-core.yaml file
- Extract: values, obsessions, paradoxes, core beliefs, non-negotiables
- Validate all required fields are present
- If missing fields, list them and ask user to complete

### Step 2: Load Cognitive Spec
- Read cognitive-spec.yaml file
- Extract: mental models (with operational definitions), decision trees, cognitive biases
- Validate decision trees have trigger/steps/outcome structure
- Map mental models to persona-relevant contexts

### Step 3: Load Communication Style Reference
- If communication_style_ref provided, read the reference file
- Extract: vocabulary patterns, tone markers, sentence structure preferences
- If not provided, ask: "What communication style should this persona use? (e.g., direct, analytical, storytelling)"

### Step 4: Elicit Persona Details
- Ask: "Which persona variant is this? (e.g., ia-expert, vida-legendaria, mentor)"
- Ask: "What deployment platform? (ChatGPT, Claude, API, custom)"
- Ask: "Any persona-specific constraints or emphasis areas?"

### Step 5: Build Identity Core Section
- Embed values verbatim (not paraphrased)
- Embed obsessions with behavioral manifestations
- Embed paradoxes with resolution patterns
- Format as structured prompt section with clear headers

### Step 6: Build Psychometric Foundation
- Embed personality dimensions from cognitive-spec
- Include cognitive strengths and blind spots
- Add emotional response patterns
- Reference empirical basis (MBTI, Big Five, etc. if available)

### Step 7: Build Mental Models Section
- For each mental model:
  - Name and operational definition
  - When to apply (trigger conditions)
  - How to apply (step-by-step)
  - Example application in persona context
- Prioritize models by frequency of use

### Step 8: Build Decision Trees
- Strategic decision tree (6-step): for big-picture, long-term decisions
- Tactical decision tree (3-step): for immediate, execution-level decisions
- People decision tree (3-step): for interpersonal and team decisions
- Each tree: clear entry point, branching conditions, leaf actions

### Step 9: Build Communication Style Section
- Vocabulary preferences (words to use, words to avoid)
- Tone calibration (formality level, energy level, humor presence)
- Sentence structure patterns (short/long, lists/prose, questions/statements)
- Persona-specific speech markers (catchphrases, recurring metaphors)

### Step 10: Build Guardrails and Anti-Patterns
- Guardrails: what the persona must NEVER do or say
- Anti-patterns: common failure modes with correction instructions
- Boundary conditions: where this persona defers to another
- Safety constraints: ethical and factual accuracy rules

### Step 11: Optimize for Context Window
- Measure total size in KB and estimated tokens
- If over 50KB, identify lowest-impact sections for compression
- Use concise formatting (no redundant headers, merged overlaps)
- Preserve all high-impact content (values, decision trees, anti-patterns)

### Step 12: Write Output Files
- Write system_prompt.md to appropriate location
- Write prompt_metadata.yaml with size stats, section breakdown, token estimate
- Report completion with summary of what was built

## Output

### system_prompt.md Structure

```markdown
# System Prompt: [Persona Name]

## Identity Core
[Values, obsessions, paradoxes — verbatim from source]

## Psychometric Foundation
[Personality dimensions, cognitive patterns]

## Mental Models
[Operational definitions with application examples]

## Decision Trees
### Strategic (6-step)
### Tactical (3-step)
### People (3-step)

## Communication Style
[Vocabulary, tone, structure, markers]

## Guardrails
[Hard constraints and boundaries]

## Anti-Patterns
[Common failures and corrections]
```

### prompt_metadata.yaml Structure

```yaml
persona: "[persona_name]"
total_size_kb: [number]
token_count_estimate: [number]
sections_included:
  - identity_core
  - psychometric_foundation
  - mental_models
  - decision_trees
  - communication_style
  - guardrails
  - anti_patterns
section_sizes:
  identity_core: [kb]
  psychometric_foundation: [kb]
  mental_models: [kb]
  decision_trees: [kb]
  communication_style: [kb]
  guardrails: [kb]
  anti_patterns: [kb]
created_at: "[timestamp]"
source_artifacts:
  identity_core: "[path]"
  cognitive_spec: "[path]"
```
