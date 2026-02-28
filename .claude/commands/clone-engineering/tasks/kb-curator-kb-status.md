---
task: KB Status
responsavel: "@kb-curator"
responsavel_type: Agente
atomic_layer: Organism
elicit: false

Entrada:
  - campo: kb_path
    tipo: string
    origem: "user input"
    obrigatorio: false
    padrao: "kb/"
    validacao: "directory_exists(kb_path)"

Saida:
  - campo: status_report
    tipo: string
    destino: "user output"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "kb_path directory exists"
      tipo: pre-condition
      blocker: true
      validacao: "directory_exists(kb_path)"
    - descricao: "index.yaml exists in kb_path (run *index-chunks first if missing)"
      tipo: pre-condition
      blocker: true
      validacao: "file_exists(kb_path + '/index.yaml')"
  post-conditions:
    - descricao: "Status report generated with all sections (summary, domains, personas, temporal, coverage, health)"
      tipo: post-condition
      blocker: true
      validacao: "status_report.includes('Summary') && status_report.includes('Domain') && status_report.includes('Coverage') && status_report.includes('Health')"
    - descricao: "Coverage percentages calculated against 800-1200 chunk target"
      tipo: post-condition
      blocker: true
      validacao: "coverage_calculated()"
    - descricao: "Under-served domains identified (< 50% of proportional target)"
      tipo: post-condition
      blocker: false
      validacao: "underserved_domains_checked()"
  acceptance-criteria:
    - descricao: "Report is readable and provides actionable insights at a glance"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Numbers in report match actual files on disk"
      tipo: acceptance
      blocker: false
      manual_check: true

Performance:
  duration_expected: "interactive (1-2min)"
  cost_estimated: "$0"
  cacheable: false
  parallelizable: false

Error_Handling:
  strategy: fallback
  fallback: "If index.yaml is missing or corrupt, suggest running *index-chunks first. If kb_path does not exist, report that the knowledge base has not been initialized yet and suggest the setup steps."
  retry:
    max_attempts: 2
    backoff: linear
    backoff_ms: 0
  abort_workflow: false
  notification: log

Metadata:
  version: "1.0.0"
  dependencies: ["kb-curator-index-chunks"]
  author: "Felipe Rosa"
  created_at: "2026-02-01"
  updated_at: "2026-02-01"
---

# *kb-status

Display a comprehensive knowledge base dashboard with statistics, coverage analysis, and health metrics. Quick read-only check that shows the current state of the KB without modifying anything.

## Uso

```
@kb-curator
*kb-status
# -> Usa path padrao kb/

*kb-status --kb_path "kb/"
# -> Path explicito para o knowledge base
```

## Workflow

### Step 1: Load index.yaml
- Read `{kb_path}/index.yaml`
- If file does not exist:
  - Report: "index.yaml not found. Run *index-chunks first to build the index."
  - Abort
- If file exists but is empty or invalid YAML:
  - Report: "index.yaml is corrupt. Run *index-chunks to rebuild."
  - Abort
- Extract: entries array, statistics section, updated_at timestamp

### Step 2: Count Chunks Per Domain (vs Target)
- Target range: 800-1200 chunks total
- Proportional target per domain: total_target / 6 (133-200 per domain)
- For each of the 6 domains:
  - Count actual chunks
  - Calculate percentage of proportional target
  - Classify: under-served (< 50%), developing (50-79%), healthy (80-99%), complete (100%+)

### Step 3: Count Chunks Per Persona
- Count chunks tagged as:
  - `ia-expert` — Technical AI knowledge
  - `vida-legendaria` — Life philosophy, personal brand
  - `overlap` — Content relevant to both personas
- Calculate percentage distribution

### Step 4: Count Chunks Per Temporal Era
- Count chunks per temporal classification:
  - `current` — Present-day, actively relevant
  - `foundational` — Core beliefs, unlikely to change
  - `transitional` — Evolving views, may update
  - `historical` — Past views, kept for context
- Calculate percentage distribution

### Step 5: Calculate Domain Coverage
- For each domain, compute:
  - `chunk_count` — Total chunks
  - `coverage_pct` — Percentage of proportional target (133-200)
  - `tier_distribution` — Count per tier within domain
  - `avg_fidelity` — Average fidelity score (high=3, medium=2, low=1)
  - `avg_word_count` — Average words per chunk
- Identify the 3 most under-served domains
- Identify the 3 most complete domains

### Step 6: Identify Under-Served Domains
- Flag domains with < 50% of proportional target
- For each under-served domain:
  - Current count vs target
  - Number of chunks needed to reach 50%
  - Number of chunks needed to reach 80%
  - Suggested action: "Add {N} chunks from {source_type} sources"

### Step 7: Check Metadata Completeness
- For each chunk in index, verify all 15+ required fields exist:
  - chunk_id, domain, persona, temporal_era, fidelity_importance, tags, cross_refs, source_tier, source_file, source_title, word_count, overlap_words, sequence, total_chunks_in_source, created_at
- Calculate: `metadata_completeness = chunks_with_all_fields / total_chunks * 100`
- List fields most commonly missing

### Step 8: Check Cross-Reference Health
- Count chunks with zero cross-references (orphans)
- Calculate: `orphan_rate = orphan_chunks / total_chunks * 100`
- Healthy: < 10% orphans
- Warning: 10-25% orphans
- Critical: > 25% orphans
- List top 5 orphan chunks by domain

### Step 9: Display Dashboard
- Generate and display:
  ```
  ================================================================
  KB STATUS DASHBOARD
  ================================================================
  Last indexed: {updated_at}
  Total chunks: {N} / 800-1200 target ({N}%)

  DOMAIN COVERAGE
  ----------------------------------------------------------------
  ia-expertise              | ████████░░ | {N}/{target} ({N}%) {status}
  philosophy-consciousness  | ██████░░░░ | {N}/{target} ({N}%) {status}
  business-strategy         | █████████░ | {N}/{target} ({N}%) {status}
  frameworks-mental-models  | ███████░░░ | {N}/{target} ({N}%) {status}
  personal-development      | ████░░░░░░ | {N}/{target} ({N}%) {status}
  case-studies-examples     | ██░░░░░░░░ | {N}/{target} ({N}%) {status}

  PERSONA DISTRIBUTION
  ----------------------------------------------------------------
  ia-expert:        {N} chunks ({N}%)
  vida-legendaria:  {N} chunks ({N}%)
  overlap:          {N} chunks ({N}%)

  TEMPORAL DISTRIBUTION
  ----------------------------------------------------------------
  current:       {N} chunks ({N}%)
  foundational:  {N} chunks ({N}%)
  transitional:  {N} chunks ({N}%)
  historical:    {N} chunks ({N}%)

  FIDELITY DISTRIBUTION
  ----------------------------------------------------------------
  high:    {N} chunks ({N}%)
  medium:  {N} chunks ({N}%)
  low:     {N} chunks ({N}%)

  HEALTH METRICS
  ----------------------------------------------------------------
  Metadata completeness:  {N}% (target: 100%)
  Orphan rate:            {N}% (target: < 10%)
  Avg words/chunk:        {N} (target: 300-500)

  UNDER-SERVED DOMAINS (need attention)
  ----------------------------------------------------------------
  1. {domain} — needs {N} more chunks to reach 80%
  2. {domain} — needs {N} more chunks to reach 80%
  3. {domain} — needs {N} more chunks to reach 80%

  TOP ACTIONS
  ----------------------------------------------------------------
  1. {actionable recommendation}
  2. {actionable recommendation}
  3. {actionable recommendation}
  ================================================================
  ```

## Output

- **status_report** — Complete markdown dashboard with statistics, coverage gaps, health metrics, and top action items
