---
task: Fidelity Report
responsavel: "@fidelity-tester"
responsavel_type: Agente
atomic_layer: Organism
elicit: false

Entrada:
  - campo: test_results_path
    tipo: string
    origem: "pipeline"
    obrigatorio: true
    validacao: "length >= 5 && value.endsWith('.yaml')"
  - campo: blind_test_path
    tipo: string
    origem: "pipeline"
    obrigatorio: false
    padrao: null
    validacao: "value == null || value.endsWith('.md')"
  - campo: iteration_number
    tipo: number
    origem: "pipeline"
    obrigatorio: false
    padrao: 1
    validacao: "value >= 1 && value <= 5"

Saida:
  - campo: fidelity_report
    tipo: string
    destino: "file"
    persistido: true
  - campo: executive_summary
    tipo: "object { aggregate_fidelity: number, blind_test_score: number | null, tier: string, iteration: number, top_strengths: array<string>, top_weaknesses: array<string>, recommendation: string }"
    destino: "user output"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "Test results file exists and contains scored scenarios"
      tipo: pre-condition
      blocker: true
      validacao: "fileExists(test_results_path) && loadYaml(test_results_path).results.length > 0"
    - descricao: "Blind test report exists if path provided"
      tipo: pre-condition
      blocker: false
      validacao: "blind_test_path == null || fileExists(blind_test_path)"
    - descricao: "Iteration number is consistent with existing reports"
      tipo: pre-condition
      blocker: false
      validacao: "iteration_number >= 1"
  post-conditions:
    - descricao: "Fidelity report includes per-dimension score breakdown"
      tipo: post-condition
      blocker: true
      validacao: "fidelity_report.includes('Decision Alignment') && fidelity_report.includes('Reasoning Quality') && fidelity_report.includes('Voice Accuracy') && fidelity_report.includes('Value Preservation') && fidelity_report.includes('Persona Accuracy')"
    - descricao: "Fidelity report includes per-category score breakdown (strategic, tactical, people, stress)"
      tipo: post-condition
      blocker: true
      validacao: "fidelity_report.includes('Strategic') && fidelity_report.includes('Tactical') && fidelity_report.includes('People') && fidelity_report.includes('Stress')"
    - descricao: "Top 5 strengths and top 5 weaknesses identified"
      tipo: post-condition
      blocker: true
      validacao: "executive_summary.top_strengths.length == 5 && executive_summary.top_weaknesses.length == 5"
    - descricao: "Tier classification is correct based on aggregate fidelity"
      tipo: post-condition
      blocker: true
      validacao: "(aggregate_fidelity >= 93 && tier == 'Elite') || (aggregate_fidelity >= 85 && aggregate_fidelity < 93 && tier == 'Strong') || (aggregate_fidelity >= 70 && aggregate_fidelity < 85 && tier == 'Acceptable') || (aggregate_fidelity < 70 && tier == 'Below Standard')"
    - descricao: "Recommendation is appropriate for the tier and iteration"
      tipo: post-condition
      blocker: true
      validacao: "executive_summary.recommendation != null && executive_summary.recommendation.length >= 20"
    - descricao: "fidelity-report.md written to squad data directory"
      tipo: post-condition
      blocker: true
      validacao: "fileExists('squads/clone-engineering/data/fidelity-report.md')"
  acceptance-criteria:
    - descricao: "Report provides clear, actionable insights — not just numbers"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Strengths and weaknesses are specific to actual test results, not generic"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Iteration comparison shows progress (if iteration > 1)"
      tipo: acceptance
      blocker: false
      manual_check: true

Performance:
  duration_expected: "interactive (5-10min)"
  cost_estimated: "$0"
  cacheable: false
  parallelizable: false

Error_Handling:
  strategy: fallback
  fallback: "If blind test data unavailable, generate report from scenario test results only and note incomplete assessment"
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

# *fidelity-report

Generate comprehensive fidelity assessment report from test results, combining scenario scores and blind test data into an actionable executive summary.

## Uso

```
@fidelity-tester
*fidelity-report
# -> Uses default paths from squad data directory

*fidelity-report --results "squads/clone-engineering/data/test_results.yaml" --blind "squads/clone-engineering/data/blind-test-report.md" --iteration 2
# -> Uses specific paths and iteration number
```

## Workflow

### Step 1: Load Test Results
- Read test_results.yaml from provided path
- Extract all per-scenario scores and aggregate fidelity
- Count total scenarios, passed, failed
- Group results by scenario type (strategic, tactical, people, stress)

### Step 2: Load Blind Test Results (if available)
- Read blind-test-report.md if path provided
- Extract indistinguishability score
- Extract identified differences
- If not available, note in report: "Blind test data not included — assessment is partial"

### Step 3: Calculate Per-Dimension Scores
Calculate average score for each dimension across all scenarios:

| Dimension | Weight | Average Score | Status |
|-----------|--------|---------------|--------|
| Decision Alignment | 0.30 | mean(all decision_alignment scores) | OK if >= 85 |
| Reasoning Quality | 0.25 | mean(all reasoning_quality scores) | OK if >= 85 |
| Voice Accuracy | 0.20 | mean(all voice_accuracy scores) | OK if >= 85 |
| Value Preservation | 0.15 | mean(all value_preservation scores) | OK if >= 90 |
| Persona Accuracy | 0.10 | mean(all persona_accuracy scores) | OK if >= 80 |

### Step 4: Calculate Per-Category Scores
Calculate average weighted score for each scenario category:

| Category | Scenario Count | Avg Weighted Score | Pass Rate |
|----------|---------------|-------------------|-----------|
| Strategic | count | mean | passed/total |
| Tactical | count | mean | passed/total |
| People | count | mean | passed/total |
| Stress | count | mean | passed/total |

### Step 5: Identify Top 5 Strengths
Analyze results to find the 5 strongest aspects:
- Highest-scoring dimensions
- Categories with 100% pass rate
- Scenarios where clone exceeded expectations
- Values that were never violated
- Personas that consistently activated correctly
- Format: specific, evidence-based statements (not generic praise)

### Step 6: Identify Top 5 Weaknesses
Analyze results to find the 5 weakest aspects:
- Lowest-scoring dimensions
- Categories with lowest pass rate
- Recurring failure patterns across scenarios
- Values that were occasionally violated
- Personas that activated incorrectly
- Format: specific, evidence-based statements with scenario references

### Step 7: Analyze Persona Distribution Compliance
- For each persona defined in cognitive spec:
  - Count scenarios where it was expected to activate
  - Count scenarios where it actually activated correctly
  - Calculate persona compliance rate
- Flag any persona with < 80% compliance

### Step 8: Classify Tier
| Tier | Score Range | Description |
|------|------------|-------------|
| Elite | 93-97% | Production-ready clone with exceptional fidelity |
| Strong | 85-92% | High-quality clone, minor refinements needed |
| Acceptable | 70-84% | Functional clone, targeted iteration required |
| Below Standard | < 70% | Significant gaps, major revision or escalation needed |

- If score > 97%: flag potential overfitting concern

### Step 9: Generate Iteration Recommendations
Based on tier and iteration number:
- **Elite (93-97%)**: "Clone approved for deployment. Optional: run additional blind tests for confidence."
- **Strong (85-92%)**: "Iteration recommended. Focus on top 3 weaknesses. Target agents: [list]."
- **Acceptable (70-84%)**: "Iteration required. Address all 5 weaknesses. Coordinate @prompt-architect and @kb-curator."
- **Below Standard (< 70%)**: "Major revision needed. If iteration >= 3, escalate to @el-clonador for pipeline review."

### Step 10: Write fidelity-report.md
- Write comprehensive report to `squads/clone-engineering/data/fidelity-report.md`
- Include all sections, tables, and recommendations
- Include iteration history if iteration > 1

## Output

### Report Structure (fidelity-report.md)

```markdown
# Fidelity Assessment Report

## Executive Summary
| Metric | Value |
|--------|-------|
| Aggregate Fidelity | XX.X% |
| Blind Test Score | XX% (or N/A) |
| Tier | Elite / Strong / Acceptable / Below Standard |
| Iteration | #X |
| Scenarios Tested | XX |
| Pass Rate | XX/XX (XX%) |
| Recommendation | [action statement] |

## Per-Dimension Breakdown
| Dimension | Weight | Avg Score | Status |
|-----------|--------|-----------|--------|
| Decision Alignment | 0.30 | XX.X | OK/WARN/FAIL |
| Reasoning Quality | 0.25 | XX.X | OK/WARN/FAIL |
| Voice Accuracy | 0.20 | XX.X | OK/WARN/FAIL |
| Value Preservation | 0.15 | XX.X | OK/WARN/FAIL |
| Persona Accuracy | 0.10 | XX.X | OK/WARN/FAIL |

## Per-Category Breakdown
| Category | Count | Avg Score | Pass Rate | Status |
|----------|-------|-----------|-----------|--------|
| Strategic | XX | XX.X% | XX/XX | OK/WARN/FAIL |
| Tactical | XX | XX.X% | XX/XX | OK/WARN/FAIL |
| People | XX | XX.X% | XX/XX | OK/WARN/FAIL |
| Stress | XX | XX.X% | XX/XX | OK/WARN/FAIL |

## Persona Compliance
| Persona | Expected | Correct | Rate |
|---------|----------|---------|------|
| [persona-1] | XX | XX | XX% |
| [persona-2] | XX | XX | XX% |

## Top 5 Strengths
1. [Specific strength with evidence]
2. [Specific strength with evidence]
3. [Specific strength with evidence]
4. [Specific strength with evidence]
5. [Specific strength with evidence]

## Top 5 Weaknesses
1. [Specific weakness with scenario references]
2. [Specific weakness with scenario references]
3. [Specific weakness with scenario references]
4. [Specific weakness with scenario references]
5. [Specific weakness with scenario references]

## Blind Test Integration (if available)
- Indistinguishability: XX%
- Key differences found: [list]
- Correlation with scenario tests: [analysis]

## Iteration History (if iteration > 1)
| Iteration | Fidelity | Blind Test | Changes Made |
|-----------|----------|------------|-------------|
| #1 | XX% | XX% | Initial test |
| #2 | XX% | XX% | [what was fixed] |

## Recommendations
### Immediate Actions
[Prioritized list of fixes]

### Target Agents
- @prompt-architect: [specific prompt changes needed]
- @kb-curator: [specific KB gaps to fill]

### Next Steps
[What should happen next based on tier]
```

## Tier Thresholds Reference

```
97%+ -------- OVERFITTING CONCERN (review for memorization)
93-97% ------ ELITE TIER (target zone - deploy)
85-92% ------ STRONG TIER (iterate - minor fixes)
70-84% ------ ACCEPTABLE TIER (iterate - targeted work)
<70% -------- BELOW STANDARD (escalate if iteration >= 3)
```
