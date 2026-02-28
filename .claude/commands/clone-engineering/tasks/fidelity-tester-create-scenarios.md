---
task: Create Test Scenarios
responsavel: "@fidelity-tester"
responsavel_type: Agente
atomic_layer: Organism
elicit: true

Entrada:
  - campo: cognitive_spec_path
    tipo: string
    origem: "pipeline"
    obrigatorio: true
    validacao: "length >= 5 && value.endsWith('.yaml')"
  - campo: decision_matrix_path
    tipo: string
    origem: "pipeline"
    obrigatorio: false
    padrao: null
    validacao: "value == null || value.endsWith('.yaml')"
  - campo: scenario_count
    tipo: number
    origem: "user input"
    obrigatorio: false
    padrao: 50
    validacao: "value >= 50"
  - campo: scenario_types
    tipo: "array<string>"
    origem: "user input"
    obrigatorio: false
    padrao: ["strategic", "tactical", "people", "stress"]
    validacao: "value.every(t => ['strategic', 'tactical', 'people', 'stress'].includes(t))"

Saida:
  - campo: test_scenarios
    tipo: "object { scenarios: array<object { id: string, type: string, title: string, context: string, prompt: string, expected_decision: string, expected_reasoning: string, expected_persona: string, expected_values: array<string>, difficulty: string }> }"
    destino: "file"
    persistido: true
  - campo: scenario_stats
    tipo: "object { total: number, strategic: number, tactical: number, people: number, stress: number, difficulty_distribution: object { easy: number, medium: number, hard: number } }"
    destino: "user output"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "Cognitive spec file exists and is valid YAML"
      tipo: pre-condition
      blocker: true
      validacao: "fileExists(cognitive_spec_path) && isValidYaml(cognitive_spec_path)"
    - descricao: "Cognitive spec contains values, mental_models, and decision_patterns sections"
      tipo: pre-condition
      blocker: true
      validacao: "cognitive_spec.values && cognitive_spec.mental_models && cognitive_spec.decision_patterns"
    - descricao: "Decision matrix file exists if provided"
      tipo: pre-condition
      blocker: false
      validacao: "decision_matrix_path == null || fileExists(decision_matrix_path)"
  post-conditions:
    - descricao: "Total scenario count meets minimum (50+)"
      tipo: post-condition
      blocker: true
      validacao: "test_scenarios.scenarios.length >= 50"
    - descricao: "Strategic decision scenarios >= 15"
      tipo: post-condition
      blocker: true
      validacao: "test_scenarios.scenarios.filter(s => s.type == 'strategic').length >= 15"
    - descricao: "Tactical decision scenarios >= 15"
      tipo: post-condition
      blocker: true
      validacao: "test_scenarios.scenarios.filter(s => s.type == 'tactical').length >= 15"
    - descricao: "People decision scenarios >= 10"
      tipo: post-condition
      blocker: true
      validacao: "test_scenarios.scenarios.filter(s => s.type == 'people').length >= 10"
    - descricao: "Stress/edge-case scenarios >= 10"
      tipo: post-condition
      blocker: true
      validacao: "test_scenarios.scenarios.filter(s => s.type == 'stress').length >= 10"
    - descricao: "Every scenario has expected_decision, expected_reasoning, and expected_persona defined"
      tipo: post-condition
      blocker: true
      validacao: "test_scenarios.scenarios.every(s => s.expected_decision && s.expected_reasoning && s.expected_persona)"
    - descricao: "Scenarios cover all top values from cognitive spec"
      tipo: post-condition
      blocker: true
      validacao: "cognitive_spec.values.top.every(v => test_scenarios.scenarios.some(s => s.expected_values.includes(v)))"
    - descricao: "test-scenarios.yaml written to squad data directory"
      tipo: post-condition
      blocker: true
      validacao: "fileExists('squads/clone-engineering/data/test-scenarios.yaml')"
  acceptance-criteria:
    - descricao: "Scenarios are diverse — no two scenarios test the exact same value+persona combination"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Expected responses are realistic and grounded in actual cognitive spec data"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Stress scenarios include genuinely ambiguous or conflicting situations"
      tipo: acceptance
      blocker: false
      manual_check: true

Performance:
  duration_expected: "interactive (15-25min)"
  cost_estimated: "$0"
  cacheable: false
  parallelizable: false

Error_Handling:
  strategy: fallback
  fallback: "If cognitive spec is incomplete, generate scenarios from available sections and flag gaps for @mind-mapper"
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

# *create-scenarios

Generate 50+ test scenarios from cognitive spec and identity core, covering all 4 decision categories required for fidelity validation.

## Uso

```
@fidelity-tester
*create-scenarios
# -> Modo interativo: pergunta por paths e preferencias

*create-scenarios --cognitive-spec "squads/clone-engineering/data/cognitive-spec.yaml"
# -> Gera cenarios a partir de spec especifica
```

## Workflow

### Step 1: Load Cognitive Spec
- Read `cognitive-spec.yaml` from provided path
- Extract: top values, mental models, decision patterns, personas, overrides
- Validate all required sections are present
- If decision matrix provided, load it for cross-reference

### Step 2: Elicit Emphasis Areas
- Ask user: "Are there specific scenario areas you want to emphasize?"
- Present options:
  1. Balanced (default distribution across all 4 types)
  2. Decision-heavy (more strategic + tactical)
  3. People-heavy (more people + stress)
  4. Custom (user specifies counts per type)
- Apply chosen distribution while respecting minimums

### Step 3: Generate Strategic Decision Scenarios (15+)
- Major life/business decisions requiring deep value alignment
- Examples: career pivots, large investments, partnership commitments, market entry
- Each scenario must define:
  - Context (realistic situation with enough detail)
  - Prompt (what the clone will be asked)
  - Expected decision (what the subject would choose)
  - Expected reasoning (which mental models would be used)
  - Activated persona (which persona should respond)
  - Core values exercised (which top values are tested)

### Step 4: Generate Tactical Decision Scenarios (15+)
- Day-to-day operational decisions
- Examples: prioritization, resource allocation, process choices, tool selection
- Must test decision speed and pragmatism vs perfectionism balance
- Include scenarios where multiple personas could apply

### Step 5: Generate People Decision Scenarios (10+)
- Hiring, partnerships, collaborations, conflict resolution
- Test empathy, communication style, trust evaluation patterns
- Include scenarios with emotional complexity
- Must exercise interpersonal mental models from cognitive spec

### Step 6: Generate Stress/Edge-Case Scenarios (10+)
- Under pressure, ambiguity, conflicting values, ethical dilemmas
- Test override rules from cognitive spec
- Include scenarios where two top values directly conflict
- Include scenarios with incomplete information
- Include scenarios that test emotional resilience patterns

### Step 7: Validate Diversity and Coverage
- Verify no two scenarios test identical value+persona combinations
- Verify all top values appear in at least 2 scenarios
- Verify all personas are activated in at least 3 scenarios
- Verify difficulty distribution: ~30% easy, ~40% medium, ~30% hard
- Calculate and display scenario_stats

### Step 8: Write test-scenarios.yaml
- Write structured YAML to `squads/clone-engineering/data/test-scenarios.yaml`
- Include metadata header with generation timestamp and cognitive spec version
- Each scenario as a structured entry with all fields

## Output

```yaml
# test-scenarios.yaml
metadata:
  generated_at: "2026-02-01T10:00:00Z"
  cognitive_spec_version: "1.0.0"
  total_scenarios: 52
  generator: "@fidelity-tester *create-scenarios"

scenarios:
  - id: "STR-001"
    type: strategic
    title: "Career pivot under financial pressure"
    context: "Subject has stable income but opportunity..."
    prompt: "You have a chance to leave your stable job..."
    expected_decision: "Evaluate risk with framework..."
    expected_reasoning: "Risk-reward mental model + family impact override"
    expected_persona: "business-strategist"
    expected_values: ["family-first", "calculated-risk"]
    difficulty: medium

  # ... 51+ more scenarios
```

## Stats Summary

```
| Category   | Min Required | Generated | Status |
|------------|-------------|-----------|--------|
| Strategic  | 15          | XX        | OK/FAIL|
| Tactical   | 15          | XX        | OK/FAIL|
| People     | 10          | XX        | OK/FAIL|
| Stress     | 10          | XX        | OK/FAIL|
| TOTAL      | 50          | XX        | OK/FAIL|
```
