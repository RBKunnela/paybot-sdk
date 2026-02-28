---
task: Gap Analysis
responsavel: "@mind-mapper"
responsavel_type: Agente
atomic_layer: Organism
elicit: false

Entrada:
  - campo: layers_directory
    tipo: string
    origem: "pipeline"
    obrigatorio: true
    validacao: "directory exists && contains layer artifacts"
  - campo: sources_master_path
    tipo: string
    origem: "pipeline"
    obrigatorio: true
    validacao: "file exists && is valid YAML"

Saida:
  - campo: gap_report
    tipo: "string (markdown report with gaps per layer, severity, impact)"
    destino: "file"
    persistido: true
  - campo: elicitation_questions
    tipo: "array<object { question: string, target_layer: number, gap_description: string, priority: string, expected_impact: string }>"
    destino: "user output"
    persistido: true

Checklist:
  pre-conditions:
    - descricao: "Pelo menos 1 layer artifact existe no layers_directory"
      tipo: pre-condition
      blocker: true
      validacao: "layer artifacts count > 0"
    - descricao: "sources_master.yaml existe e tem classificacao completa"
      tipo: pre-condition
      blocker: true
      validacao: "file_exists(sources_master_path) && sources_master.sources.length > 0"
  post-conditions:
    - descricao: "Gap report gerado com analise por layer"
      tipo: post-condition
      blocker: true
      validacao: "gap_report != null && gap_report.length > 0"
    - descricao: "Elicitation questions geradas e priorizadas"
      tipo: post-condition
      blocker: true
      validacao: "elicitation_questions.length > 0 || no_gaps_found"
    - descricao: "Cada gap tem severity e impact documentados"
      tipo: post-condition
      blocker: true
      validacao: "all gaps have severity and impact"
    - descricao: "Questions priorizadas por impacto na fidelidade"
      tipo: post-condition
      blocker: true
      validacao: "elicitation_questions sorted by priority"
    - descricao: "Gaps de triangulacao identificados (layers 5-8 com < 3 fontes)"
      tipo: post-condition
      blocker: true
      validacao: "triangulation gaps checked for layers 5-8"
  acceptance-criteria:
    - descricao: "Gaps refletem lacunas reais, nao artefatos do processo"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Questions sao perguntas que o sujeito pode responder diretamente"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Priorizacao faz sentido — gaps em deep identity pesam mais que em observable"
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
  fallback: "Se nenhum layer artifact encontrado, gerar report basico a partir do sources_master (pre-extraction gap analysis)"
  retry:
    max_attempts: 2
    backoff: linear
    backoff_ms: 0
  abort_workflow: false
  notification: log

Metadata:
  version: "1.0.0"
  dependencies:
    - dna-mental-layers.md
    - mind-mapper-classify-sources.md
    - mind-mapper-extract-layer.md
  author: "Felipe Rosa"
  created_at: "2026-02-01"
  updated_at: "2026-02-01"
---

# *gap-analysis

Identifica lacunas de extracao em todas as layers e gera perguntas de elicitation priorizadas por impacto na fidelidade do clone. Analisa tanto cobertura de fontes quanto qualidade das extracoes.

## Uso

```
@mind-mapper
*gap-analysis
# -> Busca layers e sources_master no diretorio padrao

*gap-analysis --layers ./data/layers/ --sources-master ./data/sources_master.yaml
# -> Usa paths especificos
```

## Workflow

### Step 1: Load All Extracted Layers
- Buscar todos os artefatos de layer no diretorio:
  - `layers-1-4-observable.yaml`
  - `layer-5-mental-models.yaml`
  - `layer-6-values-hierarchy.yaml`
  - `layer-7-core-obsessions.yaml`
  - `layer-8-productive-paradoxes.yaml`
- Registrar quais layers existem e quais estao ausentes
- Se layer ausente: gap critico imediato

### Step 2: Load Sources Master
- Carregar `sources_master.yaml`
- Extrair metricas de cobertura por layer
- Identificar distribuicao de tiers por layer
- Computar: quais layers dependem majoritariamente de Tier 3 (baixa qualidade)

### Step 3: Check Coverage Per Layer
- Para cada layer (1-8):
  - Sub-topicos esperados vs. sub-topicos cobertos
  - **Layer 1**: work, learning, decision, social patterns
  - **Layer 2**: vocabulary, tone, metaphors, audience adaptation
  - **Layer 3**: daily routines, creative rituals, recovery patterns
  - **Layer 4**: domain expertise, signature insights, boundaries
  - **Layer 5**: reasoning frameworks, decision heuristics, conceptual tools
  - **Layer 6**: ranked values, non-negotiables, trade-offs
  - **Layer 7**: existential drives, "why behind the why", recurring themes
  - **Layer 8**: generative tensions, apparent contradictions, productive dualities
- Calcular % de sub-topicos cobertos por layer

### Step 4: Identify Low-Confidence Extractions
- Para cada layer, listar extracoes com confidence < 70% (Baixa)
- Categorizar: falta de fontes? fontes de baixa qualidade? evidencia ambigua?
- Priorizar: extracoes Baixa em layers deep identity (6-8) sao mais criticas

### Step 5: Identify Missing Triangulation
- Para layers 5-8:
  - Listar claims que tem < 3 fontes independentes
  - Calcular: quantas claims precisam de fontes adicionais
  - Identificar que tipo de fonte resolveria o gap (Tier 1? Tier 2? Elicitation direta?)

### Step 6: Rank Gaps by Fidelity Impact
- Score de impacto por gap:
  - Layer 6-8 gap = impacto ALTO (afeta nucleo identitario)
  - Layer 5 gap = impacto MEDIO-ALTO (afeta tomada de decisao)
  - Layer 1-4 gap = impacto MEDIO (afeta comportamento/superficie)
  - Ausencia total de layer = impacto CRITICO
  - Baixa confidence em non-negotiable value = impacto CRITICO
- Pesos adicionais:
  - Gap em sub-topico unico da layer = alto (sem redundancia)
  - Gap em sub-topico com cobertura parcial = medio
  - Ausencia de Tier 1 para layer = adicional alto

### Step 7: Generate Elicitation Questions
- Para cada gap identificado, gerar pergunta de elicitation:
  - Pergunta deve ser respondivel diretamente pelo sujeito
  - Pergunta deve ser especifica (nao vaga)
  - Formato: "Pergunta | Target Layer | Gap | Prioridade | Impacto Esperado"
  - Exemplo: "Quando voce precisa escolher entre velocidade e qualidade, qual prioriza? Pode dar um exemplo recente?" | Layer 6 | valor #3 sem triangulacao | Alta | Resolve ranking de valores
- Principio: perguntas que maximizam informacao por resposta

### Step 8: Prioritize Questions
- Ordenar por impacto na fidelidade (highest first):
  1. Questions que resolvem gaps CRITICOS
  2. Questions que completam triangulacao em layers 6-8
  3. Questions que elevam confidence de Baixa para Media/Alta
  4. Questions que cobrem sub-topicos totalmente ausentes
  5. Questions que melhoram layers 1-4 (menor prioridade)
- Limitar a top 15 questions (nao sobrecarregar o sujeito)

### Step 9: Generate Gap Report
- Gerar `gap-report.md` com:
  - Executive Summary: X gaps encontrados, Y criticos, Z questions geradas
  - Gap Analysis por Layer:
    - Layer N: coverage %, confidence media, gaps especificos, severity
  - Triangulation Gaps (layers 5-8 especificamente)
  - Elicitation Questions priorizadas (top 15)
  - Recomendacoes: quais fontes adicionais buscar, se elicitation direta necessaria
  - Next Steps: sugerir `*extract-layer` para re-extracao ou `*triangulate` para validacao

## Output

Arquivo `gap-report.md` com:
- Analise completa de gaps por layer com severity e impact
- Metricas de cobertura e confianca por layer
- Gaps de triangulacao identificados para layers 5-8
- Top 15 perguntas de elicitation priorizadas por impacto na fidelidade
- Recomendacoes de acao para fechar gaps criticos
