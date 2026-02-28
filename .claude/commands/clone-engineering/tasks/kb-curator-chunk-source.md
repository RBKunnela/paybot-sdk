---
task: Chunk Source Material
responsavel: "@kb-curator"
responsavel_type: Agente
atomic_layer: Organism
elicit: true

Entrada:
  - campo: source_file
    tipo: string
    origem: "user input"
    obrigatorio: true
    validacao: "file_exists(source_file) && file_extension in ['.md', '.txt', '.yaml', '.json', '.html']"
  - campo: domain
    tipo: string
    origem: "user input"
    obrigatorio: true
    validacao: "value in ['ia-expertise', 'philosophy-consciousness', 'business-strategy', 'frameworks-mental-models', 'personal-development', 'case-studies-examples']"
  - campo: persona
    tipo: "string | null"
    origem: "user input"
    obrigatorio: false
    padrao: null
    validacao: "value in ['ia-expert', 'vida-legendaria', 'overlap'] || value == null"
  - campo: source_tier
    tipo: "number | null"
    origem: "user input"
    obrigatorio: false
    padrao: null
    validacao: "value in [1, 2, 3] || value == null"

Saida:
  - campo: chunk_files
    tipo: "array<object { chunk_id: string, file_path: string, word_count: number, metadata_fields: number }>"
    destino: "file"
    persistido: true
  - campo: chunk_count
    tipo: number
    destino: "user output"
    persistido: false
  - campo: chunk_manifest
    tipo: "array<string>"
    destino: "pipeline"
    persistido: true

Checklist:
  pre-conditions:
    - descricao: "Source file exists and is readable"
      tipo: pre-condition
      blocker: true
      validacao: "file_exists(source_file)"
    - descricao: "Domain is one of the 6 valid domains"
      tipo: pre-condition
      blocker: true
      validacao: "domain in ['ia-expertise', 'philosophy-consciousness', 'business-strategy', 'frameworks-mental-models', 'personal-development', 'case-studies-examples']"
    - descricao: "kb/domains/{domain}/ directory exists or can be created"
      tipo: pre-condition
      blocker: true
      validacao: "directory_accessible('kb/domains/' + domain)"
    - descricao: "index.yaml exists or can be created"
      tipo: pre-condition
      blocker: false
      validacao: "file_exists('kb/index.yaml') || can_create('kb/index.yaml')"
  post-conditions:
    - descricao: "All chunks are 300-500 words (no chunk exceeds boundaries)"
      tipo: post-condition
      blocker: true
      validacao: "chunk_files.every(c => c.word_count >= 300 && c.word_count <= 500)"
    - descricao: "Adjacent chunks have 50-word overlap"
      tipo: post-condition
      blocker: true
      validacao: "adjacent_overlap_check(chunk_files, 50)"
    - descricao: "Every chunk has 15+ metadata fields"
      tipo: post-condition
      blocker: true
      validacao: "chunk_files.every(c => c.metadata_fields >= 15)"
    - descricao: "No chunk breaks mid-sentence"
      tipo: post-condition
      blocker: true
      validacao: "chunk_files.every(c => ends_at_sentence_boundary(c))"
    - descricao: "Chunk files written to kb/domains/{domain}/"
      tipo: post-condition
      blocker: true
      validacao: "chunk_files.every(c => file_exists(c.file_path))"
    - descricao: "index.yaml updated with new chunk entries"
      tipo: post-condition
      blocker: true
      validacao: "index_contains(chunk_manifest)"
  acceptance-criteria:
    - descricao: "Chunks preserve complete semantic thoughts (no framework split across chunks)"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Metadata accurately reflects content (domain, persona, temporal, fidelity)"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Cross-references point to genuinely related existing chunks"
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
  fallback: "If source file is too short for multiple chunks, create a single chunk with minimum metadata. If semantic boundaries are ambiguous, present boundary options to user for manual selection."
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

# *chunk-source

Process a single source file into 300-500 word semantic chunks with rich metadata (15+ fields per chunk), 50-word overlap between adjacent chunks, and cross-references to existing knowledge base entries.

## Uso

```
@kb-curator
*chunk-source
# -> Modo interativo, elicita source_file e domain

*chunk-source --source_file "sources/raw/pedro-podcast-ep12.md" --domain "business-strategy"
# -> Processa arquivo especifico no dominio indicado

*chunk-source --source_file "sources/raw/ia-paper.md" --domain "ia-expertise" --persona "ia-expert" --source_tier 1
# -> Processa com persona e tier explicitos
```

## Workflow

### Step 1: Read Source File
- Load the complete source file into memory
- Count total words and estimate chunk count (total_words / 400 average)
- Detect file format (markdown, plain text, YAML, etc.)
- Report to user: "Source has ~{N} words, will produce approximately {M} chunks"

### Step 2: Identify Semantic Boundaries
- Scan for natural break points:
  - Heading transitions (H1, H2, H3 in markdown)
  - Topic shifts (new subject, new framework, new example)
  - Paragraph boundaries that represent complete thoughts
  - Framework boundaries (beginning/end of a mental model explanation)
- Mark potential split points
- Ensure no framework or concept is split across chunks

### Step 3: Create Chunks (300-500 words)
- Split at identified semantic boundaries
- Enforce word count limits: minimum 300, maximum 500
- If a semantic unit exceeds 500 words, find a sub-boundary within it
- If a semantic unit is under 300 words, merge with adjacent unit
- Preserve complete sentences — never break mid-sentence

### Step 4: Apply 50-Word Overlap
- For each pair of adjacent chunks (chunk N and chunk N+1):
  - Copy the last ~50 words of chunk N to the beginning of chunk N+1
  - Mark the overlap region with metadata field `overlap_source: chunk_N_id`
- First chunk has no leading overlap
- Last chunk has no trailing overlap

### Step 5: Apply Metadata Schema (15+ fields per chunk)
For each chunk, populate:
1. `chunk_id` — unique identifier (format: `{domain}-{source_hash}-{seq}`)
2. `domain` — one of 6 domains
3. `persona` — ia-expert / vida-legendaria / overlap
4. `temporal_era` — current / foundational / transitional / historical
5. `fidelity_importance` — high / medium / low
6. `tags` — array of 3-8 relevant topic tags
7. `cross_refs` — array of related chunk IDs from existing KB
8. `source_tier` — 1 (primary), 2 (secondary), 3 (tertiary)
9. `source_file` — original file path
10. `source_title` — title or heading from source
11. `word_count` — exact word count of chunk content
12. `overlap_words` — number of overlap words (0 for first chunk)
13. `sequence` — position in source file (1-based)
14. `total_chunks_in_source` — total chunks from this source
15. `created_at` — timestamp
16. `content_hash` — SHA-256 hash of chunk content (for deduplication)

### Step 6: Assign Fidelity Importance
- **high** — Core beliefs, key frameworks, defining stories, strong opinions
- **medium** — Supporting examples, context, elaborations
- **low** — Tangential references, background information, fillers
- When uncertain, default to medium and flag for review

### Step 7: Create Cross-References
- Load existing index.yaml
- For each new chunk, find related chunks by:
  - Matching tags (>= 2 tags in common)
  - Same domain with related topics
  - Same persona with related temporal_era
- Add bidirectional cross-references (update existing chunks too)

### Step 8: Write Chunk YAML Files
- Write each chunk to `kb/domains/{domain}/{chunk_id}.yaml`
- Format:
  ```yaml
  chunk_id: "{chunk_id}"
  domain: "{domain}"
  persona: "{persona}"
  temporal_era: "{temporal_era}"
  fidelity_importance: "{fidelity_importance}"
  tags: [...]
  cross_refs: [...]
  source_tier: {tier}
  source_file: "{source_file}"
  source_title: "{source_title}"
  word_count: {N}
  overlap_words: {N}
  sequence: {N}
  total_chunks_in_source: {N}
  created_at: "{timestamp}"
  content_hash: "{hash}"
  content: |
    {chunk text here}
  ```

### Step 9: Update index.yaml
- Add new entries for all chunks created
- Update domain statistics
- Report: "Created {N} chunks in {domain}, index updated"

## Output

For each source file processed:
- **Chunk files** — YAML files in `kb/domains/{domain}/`, one per chunk
- **Chunk count** — Total number of chunks created
- **Chunk manifest** — List of all chunk IDs created
- **Summary** — Word count stats, metadata completeness, cross-reference count
