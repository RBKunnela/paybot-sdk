---
task: Blind A/B Test
responsavel: "@fidelity-tester"
responsavel_type: Agente
atomic_layer: Organism
elicit: true

Entrada:
  - campo: test_queries
    tipo: "array<string>"
    origem: "user input"
    obrigatorio: true
    validacao: "value.length >= 10"
  - campo: original_responses
    tipo: "array<string>"
    origem: "user input"
    obrigatorio: false
    padrao: null
    validacao: "value == null || value.length == test_queries.length"
  - campo: system_prompt_path
    tipo: string
    origem: "pipeline"
    obrigatorio: true
    validacao: "length >= 5 && value.endsWith('.md')"

Saida:
  - campo: blind_test_report
    tipo: string
    destino: "file"
    persistido: true
  - campo: indistinguishability_score
    tipo: "number (0-100)"
    destino: "user output"
    persistido: false
  - campo: identified_differences
    tipo: "array<object { query_index: number, difference_type: string, description: string, severity: string }>"
    destino: "user output"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "At least 10 test queries provided"
      tipo: pre-condition
      blocker: true
      validacao: "test_queries.length >= 10"
    - descricao: "Test queries cover multiple personas and decision types"
      tipo: pre-condition
      blocker: false
      validacao: "manual verification — queries should span strategic, tactical, people, and casual contexts"
    - descricao: "System prompt file exists and is non-empty"
      tipo: pre-condition
      blocker: true
      validacao: "fileExists(system_prompt_path) && fileSize(system_prompt_path) > 100"
    - descricao: "If original responses provided, count matches query count"
      tipo: pre-condition
      blocker: true
      validacao: "original_responses == null || original_responses.length == test_queries.length"
  post-conditions:
    - descricao: "Every query has been tested with both A and B responses"
      tipo: post-condition
      blocker: true
      validacao: "blind_pairs.length == test_queries.length"
    - descricao: "Indistinguishability score calculated as percentage (0-100)"
      tipo: post-condition
      blocker: true
      validacao: "indistinguishability_score >= 0 && indistinguishability_score <= 100"
    - descricao: "Every identified difference has type, description, and severity"
      tipo: post-condition
      blocker: true
      validacao: "identified_differences.every(d => d.difference_type && d.description && ['low', 'medium', 'high', 'critical'].includes(d.severity))"
    - descricao: "Blind test report written to squad data directory"
      tipo: post-condition
      blocker: true
      validacao: "fileExists('squads/clone-engineering/data/blind-test-report.md')"
  acceptance-criteria:
    - descricao: "Indistinguishability score reaches target of 94%"
      tipo: acceptance
      blocker: false
      manual_check: false
    - descricao: "A/B pairs were genuinely blinded — order was randomized"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Identified differences are specific and actionable (not vague)"
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
  fallback: "If original responses not available, generate expected responses from cognitive-spec and flag as synthetic baseline"
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

# *blind-test

Run blind A/B comparison between clone responses and original subject responses. Measures whether an evaluator can distinguish the clone from the real person.

## Uso

```
@fidelity-tester
*blind-test
# -> Modo interativo: solicita queries e respostas originais

*blind-test --queries "squads/clone-engineering/data/blind-queries.yaml" --prompt "squads/clone-engineering/data/system-prompt.md"
# -> Usa queries de arquivo, gera baseline sintetico
```

## Concept

The blind test is the ultimate fidelity validation. If an evaluator cannot distinguish clone responses from original subject responses, the clone has achieved true fidelity. Target: 94% indistinguishability.

## Workflow

### Step 1: Collect Test Queries
- Minimum 10 queries covering all personas and contexts
- Ask user: "Do you have specific queries to test, or should I generate from cognitive spec?"
- If generating: create queries spanning:
  - 3+ strategic/business queries
  - 3+ tactical/operational queries
  - 2+ people/relationship queries
  - 2+ casual/personal queries
- Ensure variety in complexity and emotional tone

### Step 2: Obtain Reference Responses
- **If original_responses provided:**
  - Use actual subject responses as the "original" baseline
  - Flag as "authentic baseline" (highest validity)
- **If original_responses NOT provided:**
  - Load cognitive spec from squad data
  - Generate expected responses using cognitive spec as guide
  - Flag as "synthetic baseline" (lower validity — note in report)
  - Ask user: "These are synthetic baselines. For maximum accuracy, provide actual subject responses."

### Step 3: Generate Clone Responses
- Load system prompt from system_prompt_path
- For each test query, generate clone response using the system prompt
- Capture full response text

### Step 4: Create Blinded A/B Pairs
For each query:
- Randomly assign original → Response A or Response B (coin flip)
- Assign clone → the other slot
- Record the mapping (hidden from evaluation)
- Result: array of pairs where evaluator does not know which is which

```
Query 1: "How would you handle a team conflict?"
  Response A: [could be original or clone]
  Response B: [could be original or clone]
```

### Step 5: Evaluate Each Pair
For each blinded pair, evaluate on 4 criteria:

**5a. Authenticity Assessment**
- Which response sounds more like a real person (not AI)?
- Score: A, B, or TIE

**5b. Voice Consistency**
- Which response better matches the known communication style?
- Score: A, B, or TIE

**5c. Decision Authenticity**
- Which response makes a decision more consistent with the subject's values?
- Score: A, B, or TIE

**5d. Overall Indistinguishability**
- Can the evaluator confidently identify which is clone vs original?
- Score: INDISTINGUISHABLE, SLIGHT_DIFFERENCE, CLEARLY_DIFFERENT

### Step 6: Calculate Indistinguishability Score
- For each pair where evaluation is INDISTINGUISHABLE: 100 points
- For each pair where evaluation is SLIGHT_DIFFERENCE: 60 points
- For each pair where evaluation is CLEARLY_DIFFERENT: 0 points
- If evaluator picked clone as "more authentic": bonus 20 points (clone exceeded original)
- indistinguishability_score = total_points / (max_possible_points) * 100
- Target: >= 94%

### Step 7: Identify Telltale Differences
For pairs scored below INDISTINGUISHABLE:
- **difference_type**: "vocabulary", "tone", "decision_style", "emotional_range", "formality", "specificity"
- **description**: Specific observable difference
- **severity**: "low" (subtle), "medium" (noticeable), "high" (obvious), "critical" (breaks immersion)
- Map each difference to a potential fix target (@prompt-architect or @kb-curator)

### Step 8: Generate Blind Test Report
- Write comprehensive report to `squads/clone-engineering/data/blind-test-report.md`
- Include: methodology, per-pair results (unblinded), scores, differences, recommendations
- Include comparison table with blinded results then reveal

## Output

### Report Structure (blind-test-report.md)

```markdown
# Blind A/B Test Report

## Summary
- Date: 2026-02-01
- Queries tested: 12
- Baseline type: authentic | synthetic
- Indistinguishability score: XX%
- Target: 94%
- Status: PASSED | BELOW TARGET

## Methodology
[Description of blinding process and evaluation criteria]

## Results Per Pair

### Query 1: "[query text]"
| Criterion | Picked | Actual | Correct? |
|-----------|--------|--------|----------|
| Authenticity | A | Clone=A | Clone preferred |
| Voice | B | Original=B | Original preferred |
| Decision | TIE | - | Indistinguishable |
| Overall | INDISTINGUISHABLE | - | PASS |

[...repeat for all queries]

## Score Breakdown
| Metric | Value |
|--------|-------|
| Indistinguishable pairs | X/Y |
| Slight difference pairs | X/Y |
| Clearly different pairs | X/Y |
| Clone preferred (bonus) | X times |
| Final score | XX% |

## Identified Differences
| # | Type | Description | Severity | Fix Target |
|---|------|-------------|----------|------------|
| 1 | vocabulary | Clone uses more formal language | medium | @prompt-architect |
| 2 | emotional_range | Clone lacks humor in casual context | high | @kb-curator |

## Recommendations
[Actionable fixes to close the gap]
```

## Interpretation Guide

| Score Range | Interpretation | Action |
|-------------|----------------|--------|
| 95-100% | Elite — clone exceeds expectations | Minor polish only |
| 90-94% | Strong — very close to target | Targeted fixes |
| 80-89% | Acceptable — noticeable gaps | Iteration needed |
| 60-79% | Below standard — significant issues | Major revision |
| < 60% | Failed — fundamental problems | Escalate to @el-clonador |
