---
task: Run Fidelity Test
responsavel: "@fidelity-tester"
responsavel_type: Agente
atomic_layer: Organism
elicit: false

Entrada:
  - campo: scenario_file
    tipo: string
    origem: "pipeline"
    obrigatorio: true
    validacao: "length >= 5 && value.endsWith('.yaml')"
  - campo: system_prompt_path
    tipo: string
    origem: "pipeline"
    obrigatorio: true
    validacao: "length >= 5 && value.endsWith('.md')"
  - campo: kb_path
    tipo: string
    origem: "pipeline"
    obrigatorio: false
    padrao: null
    validacao: "value == null || length >= 3"

Saida:
  - campo: test_results
    tipo: "object { results: array<object { scenario_id: string, scenario_type: string, clone_response: string, scores: object { decision_alignment: number, reasoning_quality: number, voice_accuracy: number, value_preservation: number, persona_accuracy: number }, weighted_score: number, passed: boolean, failure_classification: string | null }> }"
    destino: "file"
    persistido: true
  - campo: aggregate_fidelity
    tipo: "number (0-100)"
    destino: "user output"
    persistido: false
  - campo: failure_summary
    tipo: "array<object { scenario_id: string, weighted_score: number, failure_classification: string, primary_dimension_failed: string }>"
    destino: "user output"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "Test scenarios file exists and contains 50+ scenarios"
      tipo: pre-condition
      blocker: true
      validacao: "fileExists(scenario_file) && loadYaml(scenario_file).scenarios.length >= 50"
    - descricao: "System prompt file exists and is non-empty"
      tipo: pre-condition
      blocker: true
      validacao: "fileExists(system_prompt_path) && fileSize(system_prompt_path) > 100"
    - descricao: "KB path exists if provided"
      tipo: pre-condition
      blocker: false
      validacao: "kb_path == null || fileExists(kb_path)"
  post-conditions:
    - descricao: "Every scenario has been tested (results count matches scenarios count)"
      tipo: post-condition
      blocker: true
      validacao: "test_results.results.length == loadYaml(scenario_file).scenarios.length"
    - descricao: "Every result has all 5 dimension scores between 0 and 100"
      tipo: post-condition
      blocker: true
      validacao: "test_results.results.every(r => r.scores.decision_alignment >= 0 && r.scores.decision_alignment <= 100 && r.scores.reasoning_quality >= 0 && r.scores.reasoning_quality <= 100 && r.scores.voice_accuracy >= 0 && r.scores.voice_accuracy <= 100 && r.scores.value_preservation >= 0 && r.scores.value_preservation <= 100 && r.scores.persona_accuracy >= 0 && r.scores.persona_accuracy <= 100)"
    - descricao: "Weighted score calculated correctly for every result"
      tipo: post-condition
      blocker: true
      validacao: "test_results.results.every(r => Math.abs(r.weighted_score - (r.scores.decision_alignment * 0.30 + r.scores.reasoning_quality * 0.25 + r.scores.voice_accuracy * 0.20 + r.scores.value_preservation * 0.15 + r.scores.persona_accuracy * 0.10)) < 0.01)"
    - descricao: "Aggregate fidelity is the mean of all weighted scores"
      tipo: post-condition
      blocker: true
      validacao: "Math.abs(aggregate_fidelity - (test_results.results.reduce((sum, r) => sum + r.weighted_score, 0) / test_results.results.length)) < 0.01"
    - descricao: "All failures (score < 80) have failure_classification assigned"
      tipo: post-condition
      blocker: true
      validacao: "test_results.results.filter(r => r.weighted_score < 80).every(r => r.failure_classification != null && ['prompt_issue', 'kb_gap', 'both'].includes(r.failure_classification))"
    - descricao: "test_results.yaml written to squad data directory"
      tipo: post-condition
      blocker: true
      validacao: "fileExists('squads/clone-engineering/data/test_results.yaml')"
  acceptance-criteria:
    - descricao: "Scoring is consistent — similar responses get similar scores"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Failure classifications accurately identify root cause"
      tipo: acceptance
      blocker: false
      manual_check: true

Performance:
  duration_expected: "interactive (20-40min)"
  cost_estimated: "$0"
  cacheable: false
  parallelizable: false

Error_Handling:
  strategy: fallback
  fallback: "If a scenario fails to execute, log the error, score it as 0, classify as 'execution_error', and continue with remaining scenarios"
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

# *run-scenarios

Execute all test scenarios against the clone system prompt and measure fidelity across 5 weighted dimensions.

## Uso

```
@fidelity-tester
*run-scenarios
# -> Uses default paths from squad data directory

*run-scenarios --scenarios "squads/clone-engineering/data/test-scenarios.yaml" --prompt "squads/clone-engineering/data/system-prompt.md"
# -> Uses specific file paths
```

## Scoring Dimensions (Weighted)

| Dimension | Weight | What It Measures |
|-----------|--------|-----------------|
| Decision Alignment | 0.30 | Does the clone make the same decision the subject would? |
| Reasoning Quality | 0.25 | Does the clone use the correct mental models and frameworks? |
| Voice Accuracy | 0.20 | Does the clone sound like the subject (tone, vocabulary, style)? |
| Value Preservation | 0.15 | Are the subject's top values never violated? |
| Persona Accuracy | 0.10 | Does the correct persona activate for the given context? |

## Workflow

### Step 1: Load Test Scenarios
- Read `test-scenarios.yaml` from scenario_file path
- Validate structure: each scenario has id, type, context, prompt, expected fields
- Count scenarios and verify minimum of 50

### Step 2: Load Clone System Prompt
- Read system prompt markdown from system_prompt_path
- If kb_path provided, load knowledge base for context augmentation
- Prepare clone simulation context

### Step 3: Execute Scenarios (Per Scenario)
For each scenario in the test suite:

**3a. Present scenario to clone**
- Construct message using scenario context + prompt
- Use system prompt as the clone's instruction set
- If KB available, include relevant KB chunks as context
- Capture full clone response

**3b. Score Decision Alignment (weight: 0.30)**
- Compare clone's decision to expected_decision
- 100: Identical decision with matching rationale
- 80: Same decision, slightly different rationale
- 60: Similar decision, different approach
- 40: Different decision, some value overlap
- 20: Different decision, minimal alignment
- 0: Opposite decision or value violation

**3c. Score Reasoning Quality (weight: 0.25)**
- Compare reasoning to expected_reasoning and mental models
- 100: Uses exact mental models, correct application
- 80: Uses correct models, minor application differences
- 60: Uses some correct models, misses others
- 40: Generic reasoning, no specific mental models
- 20: Wrong mental models applied
- 0: No coherent reasoning

**3d. Score Voice Accuracy (weight: 0.20)**
- Analyze tone, vocabulary, sentence structure, communication style
- 100: Indistinguishable from subject
- 80: Very close, minor stylistic differences
- 60: Recognizable but noticeably different
- 40: Generic tone, not subject-specific
- 20: Wrong tone or communication style
- 0: Completely different voice

**3e. Score Value Preservation (weight: 0.15)**
- Check that top values from cognitive spec are not violated
- 100: All values perfectly preserved, priorities correct
- 80: All values preserved, minor priority differences
- 60: Most values preserved, one minor violation
- 40: Some values violated or missing
- 20: Core value violated
- 0: Multiple core values violated

**3f. Score Persona Accuracy (weight: 0.10)**
- Verify correct persona activated for the scenario context
- 100: Correct persona, correct activation triggers
- 80: Correct persona, slightly off activation
- 60: Related persona, not the expected one
- 40: Generic persona, no specialization
- 20: Wrong persona activated
- 0: No persona characteristics visible

**3g. Calculate Weighted Score**
- weighted_score = (decision * 0.30) + (reasoning * 0.25) + (voice * 0.20) + (values * 0.15) + (persona * 0.10)
- passed = weighted_score >= 80

### Step 4: Classify Failures
For each scenario with weighted_score < 80:
- **prompt_issue**: Low scores in voice_accuracy or persona_accuracy (system prompt needs tuning)
- **kb_gap**: Low scores in decision_alignment or reasoning_quality (knowledge base is missing information)
- **both**: Low scores across multiple dimension types

### Step 5: Calculate Aggregate Fidelity
- aggregate_fidelity = mean of all weighted_scores
- Target range: 93-97% (Elite Tier)
- If < 93%: iteration required
- If > 97%: potential overfitting, review for memorization vs understanding

### Step 6: Generate Results
- Write test_results.yaml to `squads/clone-engineering/data/test_results.yaml`
- Display aggregate fidelity score
- Display failure summary table
- Display per-category breakdown

## Output

```yaml
# test_results.yaml
metadata:
  executed_at: "2026-02-01T10:30:00Z"
  scenario_file: "test-scenarios.yaml"
  system_prompt: "system-prompt.md"
  total_scenarios: 52
  passed: 47
  failed: 5

aggregate_fidelity: 89.4

results:
  - scenario_id: "STR-001"
    scenario_type: strategic
    clone_response: "I would evaluate this opportunity..."
    scores:
      decision_alignment: 85
      reasoning_quality: 90
      voice_accuracy: 80
      value_preservation: 95
      persona_accuracy: 85
    weighted_score: 86.75
    passed: true
    failure_classification: null

  - scenario_id: "STR-005"
    scenario_type: strategic
    clone_response: "Let me schedule a meeting..."
    scores:
      decision_alignment: 40
      reasoning_quality: 50
      voice_accuracy: 70
      value_preservation: 30
      persona_accuracy: 60
    weighted_score: 48.50
    passed: false
    failure_classification: "kb_gap"
```

## Summary Display

```
FIDELITY TEST RESULTS
=====================
Aggregate Fidelity: 89.4% (Target: 93-97%)
Status: BELOW TARGET — iteration required

Per-Category:
| Category   | Avg Score | Pass Rate |
|------------|-----------|-----------|
| Strategic  | 87.2%     | 13/15     |
| Tactical   | 91.5%     | 15/15     |
| People     | 88.1%     | 9/10      |
| Stress     | 82.3%     | 7/10      |

Failures (5):
| Scenario | Score  | Classification | Primary Failure     |
|----------|--------|----------------|---------------------|
| STR-005  | 48.50  | kb_gap         | decision_alignment  |
| PEO-003  | 72.30  | prompt_issue   | voice_accuracy      |
| EDG-002  | 65.80  | both           | value_preservation  |
| EDG-007  | 71.20  | kb_gap         | reasoning_quality   |
| EDG-009  | 78.40  | prompt_issue   | persona_accuracy    |
```
