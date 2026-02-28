---
task: Batch Chunk Sources
responsavel: "@kb-curator"
responsavel_type: Agente
atomic_layer: Organism
elicit: true

Entrada:
  - campo: source_directory
    tipo: string
    origem: "user input"
    obrigatorio: true
    validacao: "directory_exists(source_directory)"
  - campo: tier
    tipo: "number | null"
    origem: "user input"
    obrigatorio: false
    padrao: null
    validacao: "value in [1, 2, 3] || value == null"
  - campo: domain_override
    tipo: "string | null"
    origem: "user input"
    obrigatorio: false
    padrao: null
    validacao: "value in ['ia-expertise', 'philosophy-consciousness', 'business-strategy', 'frameworks-mental-models', 'personal-development', 'case-studies-examples'] || value == null"
  - campo: max_files
    tipo: "number | null"
    origem: "user input"
    obrigatorio: false
    padrao: null
    validacao: "value == null || value > 0"

Saida:
  - campo: total_chunks_created
    tipo: number
    destino: "user output"
    persistido: false
  - campo: chunks_per_domain
    tipo: "object { ia-expertise: number, philosophy-consciousness: number, business-strategy: number, frameworks-mental-models: number, personal-development: number, case-studies-examples: number }"
    destino: "user output"
    persistido: false
  - campo: processing_report
    tipo: string
    destino: "file"
    persistido: true

Checklist:
  pre-conditions:
    - descricao: "Source directory exists and contains processable files"
      tipo: pre-condition
      blocker: true
      validacao: "directory_exists(source_directory) && list_files(source_directory).length > 0"
    - descricao: "sources_master.yaml exists for tier classification (if tier filter used)"
      tipo: pre-condition
      blocker: false
      validacao: "tier == null || file_exists('sources/sources_master.yaml')"
    - descricao: "kb/domains/ directory structure exists"
      tipo: pre-condition
      blocker: true
      validacao: "directory_exists('kb/domains/')"
    - descricao: "index.yaml is accessible for updates"
      tipo: pre-condition
      blocker: true
      validacao: "file_exists('kb/index.yaml') || can_create('kb/index.yaml')"
  post-conditions:
    - descricao: "All processed files produced valid chunks (300-500 words each)"
      tipo: post-condition
      blocker: true
      validacao: "all_chunks_valid(300, 500)"
    - descricao: "Every chunk has 15+ metadata fields"
      tipo: post-condition
      blocker: true
      validacao: "all_chunks_metadata_complete(15)"
    - descricao: "Cross-references generated across the entire batch"
      tipo: post-condition
      blocker: true
      validacao: "cross_refs_exist_across_batch()"
    - descricao: "Master index updated with all new chunks"
      tipo: post-condition
      blocker: true
      validacao: "index_contains_all_batch_chunks()"
    - descricao: "Processing report generated with statistics"
      tipo: post-condition
      blocker: true
      validacao: "file_exists(processing_report)"
  acceptance-criteria:
    - descricao: "First file was validated by user before batch continued"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Chunk quality is consistent across entire batch"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "No duplicate chunks across files in the batch"
      tipo: acceptance
      blocker: false
      manual_check: true

Performance:
  duration_expected: "interactive (10-30min)"
  cost_estimated: "$0"
  cacheable: false
  parallelizable: false

Error_Handling:
  strategy: fallback
  fallback: "If a file fails processing, skip it and add to error list in report. Continue with remaining files. Present error summary at end for manual review."
  retry:
    max_attempts: 2
    backoff: linear
    backoff_ms: 0
  abort_workflow: false
  notification: log

Metadata:
  version: "1.0.0"
  dependencies: ["kb-curator-chunk-source"]
  author: "Felipe Rosa"
  created_at: "2026-02-01"
  updated_at: "2026-02-01"
---

# *chunk-batch

Process multiple source files in batch with consistent metadata application. Validates the first file with the user before processing the rest to ensure quality and pattern consistency.

## Uso

```
@kb-curator
*chunk-batch
# -> Modo interativo, elicita source_directory

*chunk-batch --source_directory "sources/raw/"
# -> Processa todos os arquivos no diretorio

*chunk-batch --source_directory "sources/raw/" --tier 1 --max_files 10
# -> Apenas tier 1 sources, maximo 10 arquivos

*chunk-batch --source_directory "sources/raw/" --domain_override "ia-expertise"
# -> Forca todos os arquivos para o dominio ia-expertise
```

## Workflow

### Step 1: Scan Source Directory
- List all processable files in `source_directory`
- Supported extensions: `.md`, `.txt`, `.yaml`, `.json`, `.html`
- Sort by file size (smallest first for faster initial feedback)
- Report: "Found {N} processable files in {source_directory}"
- If `max_files` is set, take only first N files after filtering

### Step 2: Load Tier Classification
- Read `sources/sources_master.yaml` for tier assignments
- Tier 1: Primary sources (direct from subject, high fidelity)
- Tier 2: Secondary sources (curated content, medium fidelity)
- Tier 3: Tertiary sources (references, examples, low fidelity)
- If tier filter is specified, exclude files not matching the tier
- Report: "After tier filter: {N} files to process"

### Step 3: Filter and Sort
- Apply tier filter if specified
- Apply max_files limit if specified
- Determine domain for each file:
  - If `domain_override` is set, use it for all files
  - Otherwise, read domain from `sources_master.yaml` or infer from file path/content
- Report final list: "{N} files ready for processing"
- Present list to user for confirmation

### Step 4: Process First File as Sample
- Process the first file using the full `*chunk-source` workflow
- Show the user:
  - Number of chunks created
  - Sample chunk with full metadata
  - Word count distribution
  - Metadata completeness
- Ask: "Does this look correct? Should I proceed with the remaining {N-1} files?"
- **CRITICAL: Do NOT continue without user approval**

### Step 5: Batch Process Remaining Files
- For each remaining file:
  - Apply the same chunking pattern validated in Step 4
  - Create chunks with 300-500 words, 50-word overlap
  - Apply full 15+ field metadata schema
  - Assign domain (from override or per-file classification)
  - Track progress: "Processing file {X}/{N}: {filename}"
- If a file fails: log the error, skip it, continue with next file

### Step 6: Track Statistics Per Domain/Persona/Tier
- Maintain running counts:
  - `chunks_per_domain`: counts per each of the 6 domains
  - `chunks_per_persona`: counts per ia-expert, vida-legendaria, overlap
  - `chunks_per_tier`: counts per tier 1, 2, 3
  - `chunks_per_temporal`: counts per current, foundational, transitional, historical
  - `fidelity_distribution`: counts per high, medium, low

### Step 7: Generate Cross-References Across Batch
- After all files are processed, run a cross-reference pass:
  - Compare tags across all new chunks
  - Link chunks with >= 2 matching tags
  - Link chunks from same domain with related topics
  - Update existing KB chunks with new cross-references
- Report: "{N} cross-references created across batch"

### Step 8: Update Master Index
- Add all new chunk entries to `kb/index.yaml`
- Update aggregate statistics in index
- Verify no duplicate chunk IDs
- Report: "Index updated with {N} new entries"

### Step 9: Generate Processing Report
- Write report to `kb/reports/batch-{timestamp}.md`
- Contents:
  ```markdown
  # Batch Processing Report
  ## Summary
  - Files processed: {N}/{total}
  - Files skipped (errors): {N}
  - Total chunks created: {N}
  ## Distribution
  | Domain | Chunks | % of Total |
  | Persona | Chunks | % of Total |
  | Tier | Chunks | % of Total |
  ## Errors
  - {file}: {error reason}
  ## Quality Metrics
  - Avg words per chunk: {N}
  - Metadata completeness: {N}%
  - Cross-references created: {N}
  ```

## Output

- **total_chunks_created** — Grand total of chunks across all files
- **chunks_per_domain** — Breakdown by domain
- **processing_report** — Markdown report with full statistics, saved to `kb/reports/`
