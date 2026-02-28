---
task: Test Persona Voice
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
  - campo: system_prompt_path
    tipo: string
    origem: "user input"
    obrigatorio: true
    validacao: "file exists && file.endsWith('.md')"
  - campo: test_queries
    tipo: "array<string> | null"
    origem: "user input"
    obrigatorio: false
    padrao: null
    validacao: "value == null || value.length >= 3"

Saida:
  - campo: voice_test_report
    tipo: "string (markdown with query/response pairs, analysis per query, aggregate scores)"
    destino: "user output"
    persistido: false
  - campo: voice_fidelity_score
    tipo: "number (0-100)"
    destino: "user output"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "System prompt file exists and is readable"
      tipo: pre-condition
      blocker: true
      validacao: "system_prompt_path != null && fileExists(system_prompt_path)"
    - descricao: "Persona name matches a persona defined in the system prompt"
      tipo: pre-condition
      blocker: true
      validacao: "persona_name != null && systemPromptContains(persona_name)"
    - descricao: "System prompt has identity core and communication style sections"
      tipo: pre-condition
      blocker: true
      validacao: "systemPrompt.includes('Identity') && systemPrompt.includes('Communication')"
  post-conditions:
    - descricao: "At least 5 test queries were evaluated"
      tipo: post-condition
      blocker: true
      validacao: "voice_test_report.queries_evaluated >= 5"
    - descricao: "Each query has vocabulary match, tone match, decision alignment, and value preservation scores"
      tipo: post-condition
      blocker: true
      validacao: "voice_test_report.queries.every(q => q.vocabulary_match != null && q.tone_match != null && q.decision_alignment != null && q.value_preservation != null)"
    - descricao: "Aggregate voice fidelity score is calculated (0-100)"
      tipo: post-condition
      blocker: true
      validacao: "voice_fidelity_score >= 0 && voice_fidelity_score <= 100"
    - descricao: "Voice drift or inconsistencies are identified and documented"
      tipo: post-condition
      blocker: true
      validacao: "voice_test_report.includes('Drift Analysis') || voice_test_report.includes('drift_analysis')"
  acceptance-criteria:
    - descricao: "Test covers persona-triggering contexts (not generic questions)"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Report is actionable — drift findings include specific fix suggestions"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Voice fidelity score correlates with human perception of the persona"
      tipo: acceptance
      blocker: false
      manual_check: true

Performance:
  duration_expected: "interactive (5-15min)"
  cost_estimated: "$0"
  cacheable: false
  parallelizable: false

Error_Handling:
  strategy: fallback
  fallback: "If system prompt cannot be loaded, ask user to provide prompt content directly. If test queries fail to trigger persona, generate alternative queries with stronger context signals"
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

# *test-persona

Test persona voice accuracy with sample interactions. Evaluates whether the system prompt produces responses that match the target persona's vocabulary, tone, decision patterns, and value system. Generates a fidelity report with per-query scores and drift analysis.

## Uso

```
@prompt-architect
*test-persona
# -> Interactive mode: asks persona name and prompt path

*test-persona --persona "ia-expert" --prompt ./prompts/ia-expert.md
# -> Tests specific persona with auto-generated queries

*test-persona --persona "ia-expert" --prompt ./prompts/ia-expert.md --queries '["What AI tool should I use?", "Is AGI close?", "How do I learn ML?"]'
# -> Tests with user-provided queries
```

## Workflow

### Step 1: Load System Prompt
- Read the system prompt file from system_prompt_path
- Parse and identify: identity core, communication style, decision trees, guardrails
- Extract the specific persona's voice markers (vocabulary, tone, patterns)
- Build a voice reference profile for evaluation

### Step 2: Generate or Receive Test Queries
- If test_queries provided: validate they contain persona-triggering context
- If test_queries NOT provided: generate 5-10 queries that:
  - Include context triggers for the target persona (e.g., AI questions for ia-expert)
  - Cover different complexity levels (simple, moderate, complex)
  - Include at least 1 edge case (ambiguous context, cross-persona trigger)
  - Include at least 1 value-testing query (tests if core values emerge)
- Ask user: "Should I generate test queries or do you have specific ones?"

### Step 3: Include Persona-Triggering Context
- For each query, ensure the context activates the target persona
- Add situational framing that would naturally trigger the persona
- Include at least 2 queries where persona switching would be expected
- Tag each query with expected persona activation

### Step 4: Simulate Responses
- For each test query:
  - Apply the system prompt as instruction context
  - Generate the response the persona would produce
  - Capture: vocabulary used, tone expressed, decisions made, values referenced
  - Note any deviations from expected persona behavior

### Step 5: Evaluate Per-Query Fidelity
- For each query/response pair, score 4 dimensions (0-25 each):
  - **Vocabulary Match (0-25):** Does the response use persona-specific vocabulary? Avoids non-persona words?
  - **Tone Match (0-25):** Does the energy, formality, and emotional register match the persona?
  - **Decision Alignment (0-25):** When a decision or recommendation is made, does it follow the persona's decision trees?
  - **Value Preservation (0-25):** Do core values from identity-core appear in the response (especially under pressure)?
- Per-query score = sum of 4 dimensions (0-100)

### Step 6: Calculate Aggregate Voice Fidelity
- Average all per-query scores for overall voice_fidelity_score
- Weight: value_preservation and decision_alignment weighted 1.5x (they are harder to maintain)
- Score interpretation:
  - 90-100: Excellent — persona is highly authentic
  - 75-89: Good — minor voice drift, easily correctable
  - 60-74: Fair — noticeable inconsistencies, prompt needs revision
  - Below 60: Poor — persona is not recognizable, major rewrite needed

### Step 7: Identify Voice Drift
- Detect patterns across queries where the persona breaks character
- Common drift patterns:
  - Generic AI assistant tone replacing persona voice
  - Values contradicted when under pressure (value erosion)
  - Wrong decision tree applied (decision confusion)
  - Cross-persona contamination (wrong persona's vocabulary leaking in)
- For each drift instance, note: which query, what happened, what should have happened

### Step 8: Generate Test Report
- Compile all results into a structured markdown report
- Include: query/response pairs, per-query scores, aggregate score, drift analysis
- Add specific fix suggestions for each identified drift
- Recommend: keep prompt / adjust sections / major rewrite

## Output

### Voice Test Report Structure

```markdown
# Voice Fidelity Test Report: [Persona Name]

## Summary
- **Persona:** [name]
- **Prompt:** [path]
- **Queries Tested:** [count]
- **Aggregate Voice Fidelity:** [score]/100
- **Recommendation:** [Keep / Adjust / Rewrite]

## Per-Query Results

### Query 1: "[query text]"
**Expected Persona:** [persona name]
**Response:** [simulated response]
**Scores:**
| Dimension | Score | Notes |
|-----------|-------|-------|
| Vocabulary Match | [0-25] | [observation] |
| Tone Match | [0-25] | [observation] |
| Decision Alignment | [0-25] | [observation] |
| Value Preservation | [0-25] | [observation] |
| **Total** | **[0-100]** | |

[Repeat for each query]

## Drift Analysis
### Drift Pattern 1: [name]
- **Observed in:** Query [N]
- **What happened:** [description]
- **Expected behavior:** [what should have happened]
- **Fix suggestion:** [specific prompt edit]

## Recommendations
1. [Specific actionable fix]
2. [Specific actionable fix]
3. [...]
```

## Scoring Reference

| Score Range | Label | Action |
|-------------|-------|--------|
| 90-100 | Excellent | Prompt is production-ready |
| 75-89 | Good | Minor adjustments to vocabulary/tone sections |
| 60-74 | Fair | Revise communication style and guardrails |
| Below 60 | Poor | Re-run *create-prompt with stronger artifacts |
