---
task: Validate KB Retrieval
responsavel: "@kb-curator"
responsavel_type: Agente
atomic_layer: Organism
elicit: true

Entrada:
  - campo: test_queries
    tipo: "array<string> | null"
    origem: "user input"
    obrigatorio: false
    padrao: null
    validacao: "value == null || (value.length > 0 && value.every(q => q.length >= 5))"
  - campo: top_k
    tipo: number
    origem: "user input"
    obrigatorio: false
    padrao: 5
    validacao: "value >= 1 && value <= 20"

Saida:
  - campo: precision_report
    tipo: "object { overall_precision: number, per_domain: object { ia-expertise: number, philosophy-consciousness: number, business-strategy: number, frameworks-mental-models: number, personal-development: number, case-studies-examples: number }, total_queries: number, total_relevant: number, total_partial: number, total_irrelevant: number }"
    destino: "user output"
    persistido: false
  - campo: failed_queries
    tipo: "array<object { query: string, domain: string, precision: number, top_results: array, failure_reason: string }>"
    destino: "user output"
    persistido: false
  - campo: overall_precision
    tipo: "number (0-100)"
    destino: "user output"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "Knowledge base index.yaml exists and is not empty"
      tipo: pre-condition
      blocker: true
      validacao: "file_exists('kb/index.yaml') && index_entry_count > 0"
    - descricao: "Chunk files referenced in index actually exist on disk"
      tipo: pre-condition
      blocker: true
      validacao: "index_file_integrity_check()"
    - descricao: "At least 3 domains have chunks for meaningful testing"
      tipo: pre-condition
      blocker: false
      validacao: "domains_with_chunks >= 3"
  post-conditions:
    - descricao: "Precision calculated for every domain that has chunks"
      tipo: post-condition
      blocker: true
      validacao: "Object.keys(precision_report.per_domain).length == domains_with_chunks"
    - descricao: "Every test query has a relevance assessment for its top-K results"
      tipo: post-condition
      blocker: true
      validacao: "all_queries_assessed()"
    - descricao: "Failed queries list includes only queries with precision < 60%"
      tipo: post-condition
      blocker: true
      validacao: "failed_queries.every(q => q.precision < 60)"
    - descricao: "Overall precision is the weighted average across all domains"
      tipo: post-condition
      blocker: true
      validacao: "overall_precision == weighted_avg(precision_report.per_domain)"
  acceptance-criteria:
    - descricao: "Overall precision >= 80% in top-5 results (project target)"
      tipo: acceptance
      blocker: false
      manual_check: false
    - descricao: "No domain has precision below 60% (minimum domain threshold)"
      tipo: acceptance
      blocker: false
      manual_check: false
    - descricao: "Failure analysis provides actionable recommendations"
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
  fallback: "If semantic search simulation fails, fall back to keyword-based matching. If a domain has zero chunks, skip that domain and note in report. If all queries fail, report infrastructure issue and suggest running *index-chunks first."
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

# *validate-retrieval

Test knowledge base retrieval quality by running sample queries across all 6 domains and measuring top-K precision. Target: 80%+ overall precision in top-5 results.

## Uso

```
@kb-curator
*validate-retrieval
# -> Gera queries automaticamente (10 por dominio = 60 total)

*validate-retrieval --top_k 10
# -> Testa com top-10 em vez de top-5

*validate-retrieval --test_queries '["Como Pedro pensa sobre automacao?", "Qual a visao sobre IA e consciencia?", "Framework de decisao para negocios"]'
# -> Usa queries customizadas fornecidas pelo usuario
```

## Workflow

### Step 1: Generate Test Queries (if not provided)
- If `test_queries` is null, generate 10 queries per domain (60 total):
  - **ia-expertise** (10): Questions about AI strategy, tool selection, agent architecture, prompt engineering, RAG systems, fine-tuning decisions, AI limitations, multi-agent orchestration, AI ethics, automation philosophy
  - **philosophy-consciousness** (10): Questions about consciousness, identity, meaning, free will, reality perception, mind-body relationship, existential purpose, awareness levels, philosophical frameworks, metaphysical views
  - **business-strategy** (10): Questions about scaling, market positioning, revenue models, team building, competitive advantage, resource allocation, growth strategy, partnerships, risk management, operational excellence
  - **frameworks-mental-models** (10): Questions about decision frameworks, mental models, cognitive biases, first principles, systems thinking, inversion, second-order effects, probabilistic thinking, Pareto application, feedback loops
  - **personal-development** (10): Questions about habits, productivity, learning methods, energy management, relationship building, communication style, self-awareness, goal setting, resilience, work-life integration
  - **case-studies-examples** (10): Questions about specific stories, real-world examples, success patterns, failure lessons, implementation details, before/after comparisons, metrics/results, timeline of events, key decisions made, unexpected outcomes
- Each query should be natural language, as a real user would ask

### Step 2: Simulate Semantic Search
- For each test query:
  - Load all chunk entries from index.yaml
  - Calculate relevance score using:
    - Tag overlap (query keywords vs chunk tags): weight 40%
    - Domain match (query intent vs chunk domain): weight 30%
    - Content keyword match (query terms in chunk content): weight 20%
    - Fidelity importance boost (high = 1.2x, medium = 1.0x, low = 0.8x): weight 10%
  - Rank chunks by composite relevance score
  - Return top-K results

### Step 3: Evaluate Results for Relevance
- For each query's top-K results, classify each result as:
  - **relevant** (score 1.0) — Directly answers or strongly relates to the query
  - **partial** (score 0.5) — Tangentially related, provides some useful context
  - **irrelevant** (score 0.0) — Not related to the query intent
- Calculate query precision: `sum(scores) / top_k * 100`
- Example: top-5 with [relevant, relevant, partial, irrelevant, relevant] = (1+1+0.5+0+1)/5*100 = 70%

### Step 4: Calculate Precision Per Domain
- Group queries by target domain
- For each domain:
  - Average precision across all queries targeting that domain
  - Flag domains below 60% as "critical"
  - Flag domains below 80% as "needs improvement"
  - Flag domains at 80%+ as "healthy"

### Step 5: Calculate Overall Precision
- Weighted average of domain precisions
- Weight by number of chunks in each domain (larger domains weighted more)
- Report overall precision as a single number 0-100

### Step 6: Identify Failing Queries
- Collect all queries with precision < 60% in top-K
- For each failing query, record:
  - The query text
  - Target domain
  - Precision achieved
  - Top-K results returned (chunk IDs and relevance classification)
  - Failure reason analysis (see Step 7)

### Step 7: Analyze Failure Patterns
- Categorize failures:
  - **Missing chunks** — Query topic not covered in KB at all
  - **Poor metadata** — Relevant chunks exist but tags/domain mismatch prevents retrieval
  - **Wrong domain** — Chunks classified in wrong domain
  - **Low fidelity** — Relevant content marked as low fidelity, deprioritized
  - **Missing cross-refs** — Related chunks not linked, isolated from retrieval paths
- Count failures per category
- Generate specific recommendations:
  - "Add {N} chunks about {topic} in {domain}"
  - "Reclassify chunk {id} from {domain_a} to {domain_b}"
  - "Update tags on chunk {id} to include: {tags}"
  - "Increase fidelity_importance on chunk {id} from low to medium"

### Step 8: Generate Precision Report
- Display comprehensive report:
  ```
  KB Retrieval Validation Report
  ==============================
  Overall Precision: {N}% (target: 80%)
  Status: {PASS/FAIL}

  Per Domain:
  | Domain                      | Precision | Status           | Queries |
  |-----------------------------|-----------|------------------|---------|
  | ia-expertise                | {N}%      | healthy/warning  | {N}     |
  | philosophy-consciousness    | {N}%      | healthy/warning  | {N}     |
  | business-strategy           | {N}%      | healthy/warning  | {N}     |
  | frameworks-mental-models    | {N}%      | healthy/warning  | {N}     |
  | personal-development        | {N}%      | healthy/warning  | {N}     |
  | case-studies-examples       | {N}%      | healthy/warning  | {N}     |

  Failing Queries: {N}/{total}
  Failure Patterns:
  - Missing chunks: {N}
  - Poor metadata: {N}
  - Wrong domain: {N}
  - Low fidelity: {N}
  - Missing cross-refs: {N}

  Top Recommendations:
  1. {recommendation}
  2. {recommendation}
  3. {recommendation}
  ```

## Output

- **precision_report** — Object with overall and per-domain precision scores
- **failed_queries** — Array of queries that failed the 60% threshold with detailed analysis
- **overall_precision** — Single number 0-100 representing knowledge base retrieval quality
