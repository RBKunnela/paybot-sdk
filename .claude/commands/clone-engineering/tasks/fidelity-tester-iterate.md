---
task: Iteration Analysis
responsavel: "@fidelity-tester"
responsavel_type: Agente
atomic_layer: Organism
elicit: false

Entrada:
  - campo: fidelity_report_path
    tipo: string
    origem: "pipeline"
    obrigatorio: true
    validacao: "length >= 5 && value.endsWith('.md')"
  - campo: test_results_path
    tipo: string
    origem: "pipeline"
    obrigatorio: true
    validacao: "length >= 5 && value.endsWith('.yaml')"
  - campo: iteration_number
    tipo: number
    origem: "pipeline"
    obrigatorio: true
    validacao: "value >= 1 && value <= 5"

Saida:
  - campo: iteration_recommendations
    tipo: string
    destino: "file"
    persistido: true
  - campo: fix_targets
    tipo: "object { prompt_architect_fixes: array<object { scenario_id: string, issue: string, fix_instruction: string, priority: string, expected_impact: number }>, kb_curator_fixes: array<object { scenario_id: string, issue: string, fix_instruction: string, priority: string, expected_impact: number }>, escalation: object { required: boolean, reason: string | null } }"
    destino: "user output"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "Fidelity report exists and has been generated from actual test run"
      tipo: pre-condition
      blocker: true
      validacao: "fileExists(fidelity_report_path)"
    - descricao: "Test results file exists with scored scenarios"
      tipo: pre-condition
      blocker: true
      validacao: "fileExists(test_results_path) && loadYaml(test_results_path).results.length > 0"
    - descricao: "At least one scenario failed (otherwise no iteration needed)"
      tipo: pre-condition
      blocker: true
      validacao: "loadYaml(test_results_path).results.some(r => r.weighted_score < 80)"
    - descricao: "Iteration number matches actual iteration count"
      tipo: pre-condition
      blocker: false
      validacao: "iteration_number >= 1"
  post-conditions:
    - descricao: "Every failure has root cause classified as prompt_issue, kb_gap, or both"
      tipo: post-condition
      blocker: true
      validacao: "all_failures.every(f => ['prompt_issue', 'kb_gap', 'both'].includes(f.root_cause))"
    - descricao: "Every failure has a specific fix instruction (not generic)"
      tipo: post-condition
      blocker: true
      validacao: "all_fixes.every(f => f.fix_instruction.length >= 20)"
    - descricao: "Fixes are assigned to correct target agent (@prompt-architect or @kb-curator)"
      tipo: post-condition
      blocker: true
      validacao: "fix_targets.prompt_architect_fixes.every(f => f.issue.includes('prompt') || f.issue.includes('voice') || f.issue.includes('persona')) && fix_targets.kb_curator_fixes.every(f => f.issue.includes('knowledge') || f.issue.includes('decision') || f.issue.includes('reasoning'))"
    - descricao: "Fixes are prioritized by expected fidelity impact"
      tipo: post-condition
      blocker: true
      validacao: "fix_targets.prompt_architect_fixes.every((f, i, arr) => i == 0 || f.expected_impact <= arr[i-1].expected_impact) && fix_targets.kb_curator_fixes.every((f, i, arr) => i == 0 || f.expected_impact <= arr[i-1].expected_impact)"
    - descricao: "Escalation triggered if iteration >= 3 and fidelity still below 93%"
      tipo: post-condition
      blocker: true
      validacao: "(iteration_number < 3) || (aggregate_fidelity >= 93) || (fix_targets.escalation.required == true)"
    - descricao: "iteration-recommendations.md written to squad data directory"
      tipo: post-condition
      blocker: true
      validacao: "fileExists('squads/clone-engineering/data/iteration-recommendations.md')"
  acceptance-criteria:
    - descricao: "Fix instructions are specific enough that target agent can execute without ambiguity"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Expected impact estimates are reasonable based on failure analysis"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Escalation decision is justified with clear reasoning"
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
  fallback: "If root cause analysis is inconclusive for a failure, classify as 'both' and provide fix instructions for both agents"
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

# *iterate

Analyze failures from fidelity test, trace each to root cause (prompt issue vs KB gap), and produce actionable fix recommendations assigned to the correct agent.

## Uso

```
@fidelity-tester
*iterate
# -> Uses default paths from squad data directory

*iterate --report "squads/clone-engineering/data/fidelity-report.md" --results "squads/clone-engineering/data/test_results.yaml" --iteration 2
# -> Uses specific paths
```

## Context

The clone engineering pipeline allows a maximum of 3 iteration cycles before escalation. Each iteration must produce measurable improvement. If after 3 iterations the fidelity is still below 93%, the issue is escalated to @el-clonador for pipeline-level review.

## Workflow

### Step 1: Load Fidelity Report and Test Results
- Read fidelity report for executive summary and identified weaknesses
- Read test results for per-scenario failure details
- Extract all failed scenarios (weighted_score < 80)
- Extract aggregate fidelity score
- Note current iteration number

### Step 2: Extract All Failures
For each failed scenario, collect:
- scenario_id and scenario_type
- All 5 dimension scores
- The existing failure_classification from run-scenarios
- The clone response that was scored
- The expected response from test scenarios

### Step 3: Root Cause Analysis (Per Failure)
For each failure, determine the root cause by analyzing which dimensions failed:

**Prompt Issue Indicators:**
- voice_accuracy < 70: System prompt does not capture the subject's voice correctly
- persona_accuracy < 70: System prompt persona definitions are incomplete or incorrect
- Tone/style deviations visible in clone response
- Correct information but wrong delivery

**KB Gap Indicators:**
- decision_alignment < 70: Clone lacks knowledge to make the same decision
- reasoning_quality < 70: Clone does not have access to the right mental models
- Missing domain-specific knowledge in response
- Generic response where specific knowledge was expected

**Both Indicators:**
- Multiple dimensions below 70 spanning both categories
- Response shows both wrong information AND wrong delivery
- Value violation combined with voice mismatch

Classification rules:
```
IF voice_accuracy < 70 OR persona_accuracy < 70:
  AND decision_alignment >= 70 AND reasoning_quality >= 70:
    -> prompt_issue

IF decision_alignment < 70 OR reasoning_quality < 70:
  AND voice_accuracy >= 70 AND persona_accuracy >= 70:
    -> kb_gap

IF (voice OR persona < 70) AND (decision OR reasoning < 70):
    -> both
```

### Step 4: Group Fixes by Target Agent
Separate all fixes into two groups:

**@prompt-architect fixes** (for prompt_issue and "both" failures):
- Voice accuracy issues: specific vocabulary, tone, sentence structure changes
- Persona accuracy issues: persona definition refinements, activation trigger adjustments
- Style guide updates needed

**@kb-curator fixes** (for kb_gap and "both" failures):
- Decision alignment issues: missing knowledge chunks, incorrect facts
- Reasoning quality issues: missing mental models, incomplete decision frameworks
- Knowledge base additions or corrections needed

### Step 5: Prioritize by Fidelity Impact
For each fix, estimate the expected fidelity impact:
- **expected_impact**: Estimated points of fidelity improvement if this fix is applied (1-10 scale)
- Prioritization logic:
  1. Fixes affecting multiple scenarios rank higher
  2. Fixes for higher-weighted dimensions rank higher (decision_alignment > reasoning > voice > values > persona)
  3. Fixes in failing categories (pass rate < 80%) rank higher
- Sort each agent's fixes by expected_impact descending (highest impact first)
- Assign priority labels: P0 (critical), P1 (high), P2 (medium)

### Step 6: Generate Specific Fix Instructions
For each fix, provide actionable instructions:

**Format for @prompt-architect fixes:**
```
Scenario: [ID] - [title]
Issue: [specific problem observed]
Current behavior: "[exact quote from clone response]"
Expected behavior: "[what the subject would actually say]"
Fix instruction: [specific change to make in system prompt]
Section to modify: [which section of the prompt]
Expected impact: X points fidelity improvement
Priority: P0/P1/P2
```

**Format for @kb-curator fixes:**
```
Scenario: [ID] - [title]
Issue: [specific knowledge gap]
Missing knowledge: "[what the clone didn't know]"
Expected knowledge: "[what the subject knows]"
Fix instruction: [specific KB chunk to add or correct]
Source suggestion: [where to find this information]
Expected impact: X points fidelity improvement
Priority: P0/P1/P2
```

### Step 7: Evaluate Escalation
If iteration_number >= 3 AND aggregate_fidelity < 93%:
- Set escalation.required = true
- Set escalation.reason with analysis:
  - "3 iterations completed. Fidelity at XX% (target: 93%). Remaining gaps require pipeline-level review by @el-clonador."
  - Include: what was tried, what improved, what persists
  - Recommend: cognitive spec review, source material re-collection, or pipeline stage rollback

If iteration_number < 3 OR aggregate_fidelity >= 93%:
- Set escalation.required = false
- Set escalation.reason = null

### Step 8: Write iteration-recommendations.md
- Write to `squads/clone-engineering/data/iteration-recommendations.md`
- Include all sections, fix assignments, and escalation decision

## Output

### Report Structure (iteration-recommendations.md)

```markdown
# Iteration #X Recommendations

## Status
- Current Fidelity: XX.X%
- Target: 93-97%
- Gap: XX.X points
- Failed Scenarios: XX/XX
- Escalation Required: YES/NO

## Failure Summary
| Scenario | Type | Score | Root Cause | Target Agent |
|----------|------|-------|------------|-------------|
| STR-005 | strategic | 48.5 | kb_gap | @kb-curator |
| PEO-003 | people | 72.3 | prompt_issue | @prompt-architect |
| EDG-002 | stress | 65.8 | both | @prompt-architect + @kb-curator |

## Fixes for @prompt-architect (X fixes)

### P0 - Critical
#### Fix 1: [Scenario ID] - [Title]
- **Issue:** [specific problem]
- **Current:** "[clone said this]"
- **Expected:** "[subject would say this]"
- **Fix:** [specific instruction]
- **Impact:** +X.X points estimated

### P1 - High
[...]

### P2 - Medium
[...]

## Fixes for @kb-curator (X fixes)

### P0 - Critical
#### Fix 1: [Scenario ID] - [Title]
- **Issue:** [specific knowledge gap]
- **Missing:** "[clone didn't know this]"
- **Expected:** "[subject knows this]"
- **Fix:** [specific KB change]
- **Source:** [where to find info]
- **Impact:** +X.X points estimated

### P1 - High
[...]

### P2 - Medium
[...]

## Escalation (if applicable)
- **Reason:** [why escalating]
- **Iteration history:** [what was tried]
- **Recommendation for @el-clonador:** [suggested pipeline action]

## Expected Outcome
- If all P0 fixes applied: estimated fidelity +X.X points -> XX.X%
- If all P0+P1 fixes applied: estimated fidelity +X.X points -> XX.X%
- If all fixes applied: estimated fidelity +X.X points -> XX.X%
```

## Escalation Rules

```
Iteration 1: Normal — analyze and recommend fixes
Iteration 2: Urgent — prioritize P0 fixes, tighter success criteria
Iteration 3: Final — if still below 93%, escalate to @el-clonador
              Escalation includes:
              - Full iteration history
              - What worked / what didn't
              - Recommendation: re-extract cognitive spec OR
                re-collect source material OR
                pipeline stage rollback
```
