---
task: Optimize Prompt
responsavel: "@prompt-architect"
responsavel_type: Agente
atomic_layer: Organism
elicit: false

Entrada:
  - campo: system_prompt_path
    tipo: string
    origem: "user input"
    obrigatorio: true
    validacao: "file exists && file.endsWith('.md')"
  - campo: target_size_kb
    tipo: number
    origem: "user input"
    obrigatorio: false
    padrao: 50
    validacao: "value > 0 && value <= 100"
  - campo: fidelity_threshold
    tipo: number
    origem: "user input"
    obrigatorio: false
    padrao: 93
    validacao: "value >= 0 && value <= 100"

Saida:
  - campo: optimized_prompt
    tipo: "string (markdown file with reduced version of system prompt)"
    destino: "file"
    persistido: true
  - campo: optimization_report
    tipo: "string (markdown with before/after comparison, changes made, size delta, fidelity impact estimate)"
    destino: "user output"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "System prompt file exists and is readable"
      tipo: pre-condition
      blocker: true
      validacao: "system_prompt_path != null && fileExists(system_prompt_path)"
    - descricao: "System prompt is larger than target size (otherwise optimization is unnecessary)"
      tipo: pre-condition
      blocker: false
      validacao: "currentSize > target_size_kb"
  post-conditions:
    - descricao: "Optimized prompt is smaller than or equal to target size"
      tipo: post-condition
      blocker: false
      validacao: "optimized_prompt_size_kb <= target_size_kb"
    - descricao: "All mandatory sections are preserved (identity_core, decision_trees, guardrails, anti_patterns)"
      tipo: post-condition
      blocker: true
      validacao: "optimized_prompt.includes('Identity') && optimized_prompt.includes('Decision') && optimized_prompt.includes('Guardrails') && optimized_prompt.includes('Anti-Patterns')"
    - descricao: "Core values are preserved verbatim (not paraphrased or summarized)"
      tipo: post-condition
      blocker: true
      validacao: "originalValues.every(v => optimized_prompt.includes(v))"
    - descricao: "Decision trees are structurally intact (no steps removed)"
      tipo: post-condition
      blocker: true
      validacao: "originalTreeSteps.every(s => optimized_prompt.includes(s))"
    - descricao: "Optimization report includes before/after size comparison"
      tipo: post-condition
      blocker: true
      validacao: "optimization_report.includes('Before') && optimization_report.includes('After')"
    - descricao: "Estimated fidelity impact is above threshold"
      tipo: post-condition
      blocker: true
      validacao: "estimated_fidelity >= fidelity_threshold"
  acceptance-criteria:
    - descricao: "Persona voice is still recognizable after optimization — no personality loss"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Compression techniques are reversible — original content can be recovered from optimization report"
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
  fallback: "If target size is not achievable without breaking fidelity threshold, report minimum achievable size and recommend Tier 2 offloading for remaining content"
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

# *optimize-prompt

Reduce system prompt size while maintaining persona fidelity. Targets the ~50KB context window budget for core identity content. Uses compression techniques that preserve high-impact content (values, decision trees, anti-patterns) while reducing redundancy and verbose sections.

## Uso

```
@prompt-architect
*optimize-prompt
# -> Asks for prompt path, uses default 50KB target and 93% fidelity threshold

*optimize-prompt --prompt ./prompts/generalista.md
# -> Optimizes with defaults

*optimize-prompt --prompt ./prompts/generalista.md --target 40 --fidelity 95
# -> Optimizes to 40KB with 95% minimum fidelity
```

## Workflow

### Step 1: Read and Measure Current Prompt
- Read system prompt file from system_prompt_path
- Calculate current size in KB
- Estimate token count (approximate: size_bytes / 4)
- If already under target, report "Prompt is already within target size" and exit

### Step 2: Section Size Analysis
- Parse prompt into sections: identity_core, psychometric_foundation, mental_models, decision_trees, communication_style, guardrails, anti_patterns
- Measure each section size in KB
- Rank sections by size (largest first)
- Calculate percentage of total for each section
- Output section size table

### Step 3: Identify Redundancies
- Scan for repeated phrases across sections (exact and near-duplicate)
- Identify overlapping content between sections (e.g., values mentioned in identity AND guardrails)
- Find verbose explanations that could be condensed
- Flag examples that duplicate the same concept
- Catalog all redundancy candidates with estimated savings

### Step 4: Apply Compression Techniques
- **Technique 1 — Deduplication:** Remove repeated phrases, keep single authoritative instance with cross-references
- **Technique 2 — Sentence condensation:** Shorten verbose sentences without losing meaning (remove filler words, combine related sentences)
- **Technique 3 — Section merging:** Combine sections with >60% overlap into unified sections
- **Technique 4 — Example reduction:** If multiple examples illustrate the same point, keep the strongest 1-2
- **Technique 5 — Format optimization:** Remove redundant headers, use tables instead of prose where appropriate, use compact list format

### Step 5: Evaluate Low-Impact Content
- For each section, estimate fidelity impact if removed (0-100 scale)
- Content with <1% fidelity impact is candidate for removal
- Content with 1-5% impact is candidate for Tier 2 offloading (move to KB for RAG retrieval)
- Content with >5% impact is protected — never remove
- Fidelity impact categories:
  - Core values: 100% impact (never touch)
  - Decision trees: 90% impact (never remove steps)
  - Anti-patterns: 80% impact (keep all)
  - Communication style markers: 70% impact (keep key markers)
  - Detailed examples: 20-40% impact (prime compression target)
  - Background context: 10-20% impact (compression target)

### Step 6: Re-test Critical Sections
- After compression, verify critical content is intact:
  - All core values present verbatim
  - All decision tree steps present
  - All anti-patterns present
  - Persona switching triggers present (if generalista)
- If any critical content was lost, restore it and compress elsewhere

### Step 7: Measure Final Size
- Calculate optimized prompt size in KB
- Calculate size delta (original - optimized)
- Calculate compression ratio (optimized / original * 100)
- Estimate new token count
- Compare against target_size_kb

### Step 8: Generate Optimization Report
- Before/after size comparison table
- List of every change made with justification
- Section-by-section size comparison
- Estimated fidelity impact per change
- Aggregate estimated fidelity score
- Recommendation: accept optimization / further compress / revert specific changes

## Output

### optimization_report Structure

```markdown
# Prompt Optimization Report

## Summary
| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Total Size (KB) | [X] | [Y] | -[Z] |
| Token Estimate | [X] | [Y] | -[Z] |
| Compression Ratio | — | [%] | — |
| Estimated Fidelity | 100% | [%] | -[%] |

## Section Size Comparison
| Section | Before (KB) | After (KB) | Delta | Technique Used |
|---------|-------------|------------|-------|----------------|
| Identity Core | [X] | [Y] | [Z] | [technique] |
| Psychometric | [X] | [Y] | [Z] | [technique] |
| Mental Models | [X] | [Y] | [Z] | [technique] |
| Decision Trees | [X] | [Y] | [Z] | [technique] |
| Communication | [X] | [Y] | [Z] | [technique] |
| Guardrails | [X] | [Y] | [Z] | [technique] |
| Anti-Patterns | [X] | [Y] | [Z] | [technique] |

## Changes Made
### Change 1: [Description]
- **Section:** [affected section]
- **Technique:** [compression technique used]
- **Savings:** [KB saved]
- **Fidelity Impact:** [estimated %]
- **Reversible:** [yes/no]

[Repeat for each change]

## Protected Content (Not Touched)
- Core values: [list]
- Decision tree steps: [count] steps preserved
- Anti-patterns: [count] patterns preserved

## Recommendation
[Accept / Further compress / Revert specific changes]
```

## Compression Priority Table

| Priority | Content Type | Action | Fidelity Impact |
|----------|-------------|--------|-----------------|
| 1 (safe) | Redundant phrases | Deduplicate | <1% |
| 2 (safe) | Verbose explanations | Condense | 1-2% |
| 3 (moderate) | Duplicate examples | Keep best 1-2 | 2-5% |
| 4 (moderate) | Background context | Move to Tier 2 | 5-10% |
| 5 (risky) | Communication details | Summarize | 10-15% |
| NEVER | Values, trees, anti-patterns | Protected | >50% |
