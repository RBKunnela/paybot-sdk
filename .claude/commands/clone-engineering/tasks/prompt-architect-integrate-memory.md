---
task: Integrate Memory System
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
  - campo: kb_index_path
    tipo: string
    origem: "user input"
    obrigatorio: true
    validacao: "file exists"
  - campo: memory_config
    tipo: "object | null"
    origem: "user input"
    obrigatorio: false
    padrao: null
    validacao: "value == null || (typeof value === 'object' && Object.keys(value).length > 0)"

Saida:
  - campo: updated_prompt
    tipo: "string (markdown file with memory integration added)"
    destino: "file"
    persistido: true
  - campo: memory_architecture
    tipo: "object (YAML file with formal memory system specification)"
    destino: "file"
    persistido: true

Checklist:
  pre-conditions:
    - descricao: "System prompt file exists and has identity core section"
      tipo: pre-condition
      blocker: true
      validacao: "system_prompt_path != null && fileExists(system_prompt_path) && promptContains('Identity')"
    - descricao: "KB index file exists and lists available knowledge domains"
      tipo: pre-condition
      blocker: true
      validacao: "kb_index_path != null && fileExists(kb_index_path)"
    - descricao: "System prompt does not already have a fully configured memory system"
      tipo: pre-condition
      blocker: false
      validacao: "!promptContains('Memory System') || promptContains('TODO: memory')"
  post-conditions:
    - descricao: "Updated prompt contains Tier 1 section (permanent identity in prompt)"
      tipo: post-condition
      blocker: true
      validacao: "updated_prompt.includes('Tier 1') && updated_prompt.includes('Permanent')"
    - descricao: "Updated prompt contains Tier 2 section (RAG retrieval from KB)"
      tipo: post-condition
      blocker: true
      validacao: "updated_prompt.includes('Tier 2') && updated_prompt.includes('RAG')"
    - descricao: "Updated prompt contains Tier 3 section (session context)"
      tipo: post-condition
      blocker: true
      validacao: "updated_prompt.includes('Tier 3') && updated_prompt.includes('Session')"
    - descricao: "Memory priority rules are defined (Tier 1 > Tier 2 > Tier 3)"
      tipo: post-condition
      blocker: true
      validacao: "updated_prompt.includes('priority') || updated_prompt.includes('Priority')"
    - descricao: "memory-architecture.yaml file is written with complete spec"
      tipo: post-condition
      blocker: true
      validacao: "fileExists(memory_architecture_path) && memoryArch.tiers.length == 3"
    - descricao: "Retrieval instructions reference actual KB domains from index"
      tipo: post-condition
      blocker: true
      validacao: "updated_prompt.includes(kb_domains[0])"
  acceptance-criteria:
    - descricao: "Memory tiers are clearly delineated — no ambiguity about what goes where"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Conflict resolution rules are explicit — model knows which tier wins when information conflicts"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Retrieval instructions are actionable — model can actually execute KB search based on the instructions"
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
  fallback: "If KB index is incomplete, create memory architecture with Tier 1 and Tier 3 only, flag Tier 2 as pending KB setup"
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

# *integrate-memory

Add 3-tier memory system references and retrieval logic to a system prompt. Defines what knowledge lives permanently in the prompt (Tier 1), what is retrieved via RAG from the knowledge base (Tier 2), and what is managed as session context (Tier 3). Produces both the updated prompt and a formal memory-architecture.yaml specification.

## Uso

```
@prompt-architect
*integrate-memory
# -> Asks for prompt path and KB index path

*integrate-memory --prompt ./prompts/generalista.md --kb-index ./data/kb-index.yaml
# -> Integrates memory with default config

*integrate-memory --prompt ./prompts/generalista.md --kb-index ./data/kb-index.yaml --config '{"tier2_top_k": 5, "tier2_similarity_threshold": 0.8, "tier3_max_turns": 20}'
# -> Integrates with custom retrieval parameters
```

## Workflow

### Step 1: Read Current System Prompt
- Read system prompt from system_prompt_path
- Identify existing sections and their sizes
- Check if any memory references already exist (partial integration)
- Map which content is currently embedded (candidate for tier classification)

### Step 2: Read KB Index
- Read KB index file from kb_index_path
- Extract available knowledge domains (e.g., "business-frameworks", "life-philosophy", "ai-knowledge")
- Map domain coverage: what topics the KB can answer
- Identify gaps: what topics are NOT in KB (must stay in Tier 1 or be flagged)

### Step 3: Define Tier 1 — Permanent Identity
- Content that MUST live in the system prompt at all times:
  - Core values and non-negotiables
  - Identity markers (name, role, fundamental beliefs)
  - Decision trees (strategic, tactical, people)
  - Persona switching logic (if generalista)
  - Key anti-patterns and guardrails
  - Communication style markers (top-5 most distinctive)
- Rule: Tier 1 content is never retrieved — it is always present
- Size target: largest tier by importance, but optimized for context window

### Step 4: Define Tier 2 — RAG Retrieval
- Content retrieved on-demand from the knowledge base:
  - Detailed domain knowledge (business frameworks, methodologies)
  - Extended examples and case studies
  - Specific quotes and references
  - Historical context and background information
  - Detailed mental model applications
- Configure retrieval parameters:
  - top_k: number of chunks to retrieve per query (default: 5)
  - similarity_threshold: minimum relevance score (default: 0.78)
  - chunk_size: expected chunk size for retrieval (reference from KB config)
  - reranking: whether to rerank results (default: true if available)
- Map KB domains to persona contexts (which domain serves which persona)

### Step 5: Define Tier 3 — Session Context
- Content managed within the conversation:
  - User preferences learned during session
  - Current conversation topic and context
  - Previous responses in this session (for consistency)
  - Temporary context (user-provided facts for this session only)
- Define session memory rules:
  - max_turns_to_remember: how far back to look (default: 20)
  - summary_strategy: how to compress old turns (summarize vs. drop)
  - priority_signals: what to always remember within session (user corrections, stated preferences)

### Step 6: Add Retrieval Instructions to Prompt
- Write explicit instructions the model follows to use Tier 2:
  - When to trigger retrieval: "When you need specific examples, frameworks, or detailed knowledge beyond your core identity"
  - How to formulate search query: "Extract the key concept and search the knowledge base"
  - How to use retrieved content: "Integrate retrieved knowledge naturally, speaking in your persona voice — never quote raw chunks"
  - When NOT to retrieve: "For identity, values, and decision-making — use Tier 1 (already in this prompt)"

### Step 7: Add Memory Priority Rules
- Explicit conflict resolution hierarchy:
  - **Tier 1 ALWAYS wins:** If the prompt says X and KB says Y, follow the prompt (identity is authoritative)
  - **Tier 2 supplements:** KB content adds detail but never contradicts core identity
  - **Tier 3 is temporary:** Session context can override Tier 2 for current conversation but never overrides Tier 1
- Edge cases:
  - User corrects a fact in session (Tier 3) that contradicts KB (Tier 2): follow user for this session, note discrepancy
  - KB has updated info that contradicts prompt (Tier 1): follow prompt, flag for human review

### Step 8: Write memory-architecture.yaml
- Formal specification of the entire memory system
- Includes: tier definitions, retrieval params, priority rules, domain mapping
- This file serves as the reference for KB curator and other agents

### Step 9: Update System Prompt
- Insert memory system section into the system prompt
- Place after identity core and decision trees, before guardrails
- Ensure the section is clearly labeled and self-contained
- Verify the prompt still reads naturally with the new section
- Measure new prompt size and report delta

## Output

### Memory Section Added to Prompt

```markdown
## Memory System

### Tier 1: Permanent Identity (This Prompt)
Everything above this section is Tier 1. It is your permanent identity.
Never contradict Tier 1 content. It is always authoritative.

### Tier 2: Knowledge Base Retrieval (RAG)
When you need detailed knowledge beyond your core identity:
1. Identify the knowledge domain: [list of available domains]
2. Formulate a search query based on the user's question
3. Retrieve top-[K] relevant chunks (similarity >= [threshold])
4. Integrate retrieved knowledge in your persona voice
5. Never quote raw chunks — synthesize and speak naturally

**Available Domains:**
[Domain list from KB index]

**When to Retrieve:**
- Specific frameworks, methodologies, or detailed examples
- Historical context or background information
- Quotes, references, or specific data points

**When NOT to Retrieve:**
- Identity questions (use Tier 1)
- Decision-making (use decision trees in Tier 1)
- Communication style (use Tier 1 markers)

### Tier 3: Session Context (Conversation Memory)
- Remember user preferences stated in this conversation
- Track current topic and conversation flow
- If user corrects you, adopt the correction for this session
- Summarize older turns to preserve context window

### Memory Priority Rules
**Tier 1 > Tier 2 > Tier 3**
- Identity (Tier 1) is NEVER overridden
- KB content (Tier 2) supplements but never contradicts identity
- Session context (Tier 3) is temporary and conversation-scoped
```

### memory-architecture.yaml Structure

```yaml
memory_system:
  version: "1.0.0"
  clone: "[clone name]"

  tier_1:
    name: "Permanent Identity"
    location: "system_prompt"
    content:
      - identity_core
      - decision_trees
      - persona_switching
      - communication_markers
      - guardrails
      - anti_patterns
    size_kb: [measured]
    retrieval: "none — always present"

  tier_2:
    name: "Knowledge Base Retrieval"
    location: "vector_store"
    retrieval:
      method: "RAG"
      top_k: [number]
      similarity_threshold: [number]
      reranking: [boolean]
      chunk_size_tokens: [number]
    domains:
      - name: "[domain-1]"
        description: "[what this domain covers]"
        persona_affinity: "[which persona uses this most]"
      - name: "[domain-2]"
        description: "[...]"
        persona_affinity: "[...]"

  tier_3:
    name: "Session Context"
    location: "conversation_memory"
    config:
      max_turns: [number]
      summary_strategy: "sliding_window | full_summary"
      priority_signals:
        - "user corrections"
        - "stated preferences"
        - "topic changes"

  priority_rules:
    - "Tier 1 > Tier 2 > Tier 3"
    - "Identity is never overridden by retrieval"
    - "Session corrections apply to current session only"

  conflict_resolution:
    tier1_vs_tier2: "Tier 1 wins — identity is authoritative"
    tier2_vs_tier3: "Tier 3 wins for current session — user corrections take precedence temporarily"
    tier1_vs_tier3: "Tier 1 wins — identity cannot be overridden by session context"
```
