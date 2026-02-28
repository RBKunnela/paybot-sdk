---
task: Index Chunks
responsavel: "@kb-curator"
responsavel_type: Agente
atomic_layer: Organism
elicit: false

Entrada:
  - campo: kb_path
    tipo: string
    origem: "user input"
    obrigatorio: true
    validacao: "directory_exists(kb_path) && directory_exists(kb_path + '/domains')"

Saida:
  - campo: index_yaml
    tipo: "object { version: string, updated_at: string, total_chunks: number, entries: array }"
    destino: "file"
    persistido: true
  - campo: index_stats
    tipo: "object { total: number, per_domain: object, per_persona: object, per_tier: object, per_temporal: object, per_fidelity: object, orphan_count: number }"
    destino: "user output"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "kb_path directory exists with domains/ subdirectory"
      tipo: pre-condition
      blocker: true
      validacao: "directory_exists(kb_path) && directory_exists(kb_path + '/domains')"
    - descricao: "At least one chunk YAML file exists in domains/"
      tipo: pre-condition
      blocker: true
      validacao: "glob(kb_path + '/domains/**/*.yaml').length > 0"
  post-conditions:
    - descricao: "index.yaml written to kb_path root"
      tipo: post-condition
      blocker: true
      validacao: "file_exists(kb_path + '/index.yaml')"
    - descricao: "Every chunk file in domains/ has a corresponding index entry"
      tipo: post-condition
      blocker: true
      validacao: "index_entry_count == chunk_file_count"
    - descricao: "Statistics calculated for all dimensions (domain, persona, tier, temporal, fidelity)"
      tipo: post-condition
      blocker: true
      validacao: "index_stats.per_domain && index_stats.per_persona && index_stats.per_tier && index_stats.per_temporal && index_stats.per_fidelity"
    - descricao: "Orphan chunks identified (chunks with zero cross-references)"
      tipo: post-condition
      blocker: false
      validacao: "index_stats.orphan_count != null"
  acceptance-criteria:
    - descricao: "Index is valid YAML and can be parsed without errors"
      tipo: acceptance
      blocker: false
      manual_check: false
    - descricao: "Statistics accurately reflect the actual chunk files on disk"
      tipo: acceptance
      blocker: false
      manual_check: true

Performance:
  duration_expected: "interactive (2-5min)"
  cost_estimated: "$0"
  cacheable: false
  parallelizable: false

Error_Handling:
  strategy: fallback
  fallback: "If a chunk file has invalid YAML or missing required fields, skip it, add to errors list, and continue indexing. Report all skipped files at the end."
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

# *index-chunks

Scan all chunk files in the knowledge base, rebuild the master index (index.yaml), recalculate statistics across all dimensions, and identify orphan chunks with no cross-references.

## Uso

```
@kb-curator
*index-chunks
# -> Uses default kb/ path from project root

*index-chunks --kb_path "kb/"
# -> Explicit path to knowledge base directory
```

## Workflow

### Step 1: Scan All Chunk Files
- Recursively scan `{kb_path}/domains/` for all `.yaml` files
- Expected directory structure:
  ```
  kb/
  ├── domains/
  │   ├── ia-expertise/
  │   │   ├── ia-expertise-abc123-001.yaml
  │   │   └── ia-expertise-abc123-002.yaml
  │   ├── philosophy-consciousness/
  │   ├── business-strategy/
  │   ├── frameworks-mental-models/
  │   ├── personal-development/
  │   └── case-studies-examples/
  └── index.yaml
  ```
- Count total files found per domain directory
- Report: "Found {N} chunk files across {M} domains"

### Step 2: Read Each Chunk's Metadata
- For each chunk YAML file, extract:
  - `chunk_id` (required — skip file if missing)
  - `domain` (required)
  - `persona` (required)
  - `temporal_era` (required)
  - `fidelity_importance` (required)
  - `tags` (required)
  - `cross_refs` (optional, default empty)
  - `source_tier` (required)
  - `source_file` (required)
  - `source_title` (optional)
  - `word_count` (required)
  - `content_hash` (optional)
- If a file has invalid YAML or missing required fields:
  - Add to `errors` list with file path and reason
  - Skip and continue

### Step 3: Build Index Entries
- Create one index entry per valid chunk:
  ```yaml
  - chunk_id: "{chunk_id}"
    domain: "{domain}"
    persona: "{persona}"
    temporal_era: "{temporal_era}"
    fidelity_importance: "{fidelity_importance}"
    tags: [...]
    cross_refs: [...]
    source_tier: {tier}
    source_file: "{source_file}"
    word_count: {N}
    file_path: "{relative path to chunk file}"
  ```
- Deduplicate by `chunk_id` — if duplicates found, keep the one with newer timestamp and log warning

### Step 4: Sort Index
- Primary sort: by domain (alphabetical)
- Secondary sort: by fidelity_importance (high > medium > low)
- Tertiary sort: by chunk_id (alphabetical)

### Step 5: Calculate Statistics
- **Per domain:**
  - Count chunks in each of the 6 domains
  - Calculate percentage of total
  - Calculate vs. target (800-1200 total, proportional per domain)
- **Per persona:**
  - Count chunks tagged ia-expert, vida-legendaria, overlap
  - Calculate percentage of total
- **Per tier:**
  - Count chunks per source tier (1, 2, 3)
- **Per temporal era:**
  - Count chunks per temporal_era (current, foundational, transitional, historical)
- **Per fidelity:**
  - Count chunks per fidelity_importance (high, medium, low)

### Step 6: Identify Orphan Chunks
- An orphan chunk has `cross_refs` that is empty or missing
- Count total orphans
- List orphan chunk IDs grouped by domain
- Orphans are not blockers but should be flagged for review

### Step 7: Write Updated index.yaml
- Write to `{kb_path}/index.yaml`:
  ```yaml
  version: "1.0.0"
  updated_at: "{timestamp}"
  total_chunks: {N}
  statistics:
    per_domain:
      ia-expertise: {N}
      philosophy-consciousness: {N}
      business-strategy: {N}
      frameworks-mental-models: {N}
      personal-development: {N}
      case-studies-examples: {N}
    per_persona:
      ia-expert: {N}
      vida-legendaria: {N}
      overlap: {N}
    per_tier:
      tier_1: {N}
      tier_2: {N}
      tier_3: {N}
    per_temporal:
      current: {N}
      foundational: {N}
      transitional: {N}
      historical: {N}
    per_fidelity:
      high: {N}
      medium: {N}
      low: {N}
    orphan_chunks: {N}
  entries:
    - chunk_id: "..."
      # ... full entry
  errors:
    - file: "..."
      reason: "..."
  ```

### Step 8: Report Statistics
- Display summary table:
  ```
  KB Index Summary
  ================
  Total chunks: {N} (target: 800-1200)
  Coverage: {N}%

  By Domain:
    ia-expertise:              {N} chunks
    philosophy-consciousness:  {N} chunks
    business-strategy:         {N} chunks
    frameworks-mental-models:  {N} chunks
    personal-development:      {N} chunks
    case-studies-examples:     {N} chunks

  Orphan chunks: {N}
  Errors (skipped): {N}
  ```

## Output

- **index.yaml** — Complete master index file at `{kb_path}/index.yaml`
- **index_stats** — Statistics object with counts across all dimensions (domain, persona, tier, temporal, fidelity, orphans)
