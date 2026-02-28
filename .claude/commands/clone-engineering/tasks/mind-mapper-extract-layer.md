---
task: Extract DNA Mental Layer
responsavel: "@mind-mapper"
responsavel_type: Agente
atomic_layer: Organism
elicit: true

Entrada:
  - campo: layer_number
    tipo: number
    origem: "user input"
    obrigatorio: true
    validacao: "value >= 1 && value <= 8"
  - campo: source_files
    tipo: "array<string>"
    origem: "pipeline"
    obrigatorio: false
    padrao: null
    validacao: "defaults to all relevant sources from sources_master.yaml"

Saida:
  - campo: layer_artifact
    tipo: "object { layer: number, name: string, extractions: array<object { pattern: string, evidence: string, source: string, source_tier: number, confidence: string }>, aggregate_confidence: number, gaps: array<string> }"
    destino: "file"
    persistido: true
  - campo: confidence_score
    tipo: number
    destino: "user output"
    persistido: false
  - campo: gaps_found
    tipo: "array<string>"
    destino: "user output"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "sources_master.yaml existe e esta classificado"
      tipo: pre-condition
      blocker: true
      validacao: "file_exists('sources_master.yaml') && sources_master.sources.length > 0"
    - descricao: "layer_number esta no range valido (1-8)"
      tipo: pre-condition
      blocker: true
      validacao: "layer_number >= 1 && layer_number <= 8"
    - descricao: "Para layers 5-8: pelo menos 3 fontes independentes disponiveis"
      tipo: pre-condition
      blocker: false
      validacao: "layer_number <= 4 || relevant_sources.length >= 3"
  post-conditions:
    - descricao: "Layer artifact YAML gerado com pelo menos 1 extracao"
      tipo: post-condition
      blocker: true
      validacao: "layer_artifact.extractions.length > 0"
    - descricao: "Cada extracao tem evidence e source documentados"
      tipo: post-condition
      blocker: true
      validacao: "layer_artifact.extractions.every(e => e.evidence && e.source)"
    - descricao: "Confidence tag presente em cada extracao (Alta/Media/Baixa)"
      tipo: post-condition
      blocker: true
      validacao: "layer_artifact.extractions.every(e => ['Alta', 'Media', 'Baixa'].includes(e.confidence))"
    - descricao: "Para layers 5-8: triangulacao aplicada (3+ fontes por claim)"
      tipo: post-condition
      blocker: true
      validacao: "layer_number <= 4 || extractions with Alta confidence have 3+ sources"
    - descricao: "Aggregate confidence calculado"
      tipo: post-condition
      blocker: true
      validacao: "confidence_score >= 0 && confidence_score <= 100"
  acceptance-criteria:
    - descricao: "Extracoes refletem evidencia real, nao inferencia"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Para layers 6-8: human checkpoint realizado antes de consolidar"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Gaps flagueados honestamente — melhor elicitar do que inferir"
      tipo: acceptance
      blocker: false
      manual_check: true

Performance:
  duration_expected: "interactive (10-25min)"
  cost_estimated: "$0"
  cacheable: false
  parallelizable: false

Error_Handling:
  strategy: fallback
  fallback: "Se fontes insuficientes para triangulacao, flaguear gap e sugerir elicitation questions"
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
  author: "Felipe Rosa"
  created_at: "2026-02-01"
  updated_at: "2026-02-01"
---

# *extract-layer

Extrai uma layer especifica (1-8) do DNA Mental a partir das fontes classificadas. Aplica triangulacao obrigatoria para layers 5-8. Gera artefato YAML da layer com confidence tagging.

## Uso

```
@mind-mapper
*extract-layer
# -> Modo interativo, solicita numero da layer

*extract-layer 5
# -> Extrai Layer 5 (Mental Models)

*extract-layer 6 --sources file1.md,file2.md,file3.md
# -> Extrai Layer 6 usando fontes especificas
```

## Workflow

### Step 1: Load Sources Master
- Carregar `sources_master.yaml`
- Validar que existe e tem fontes classificadas
- Se nao existe: orientar usuario a rodar `*classify-sources` primeiro

### Step 2: Filter Relevant Sources
- Filtrar fontes com `layer_relevance` incluindo a layer-alvo
- Ordenar por tier (Tier 1 primeiro, depois Tier 2, depois Tier 3)
- Se `source_files` fornecido como input, usar essas em vez do filtro automatico
- Reportar quantas fontes serao analisadas

### Step 3: Read and Analyze Each Source
- Para cada fonte relevante:
  - Ler conteudo completo
  - Buscar padroes especificos da layer:
    - **Layer 1** (Behavioral Patterns): habitos de trabalho, aprendizado, tomada de decisao, interacao social
    - **Layer 2** (Communication Style): vocabulario recorrente, tom, metaforas, adaptacao por audiencia
    - **Layer 3** (Routines & Habits): rotinas diarias, rituais criativos, padroes de recuperacao
    - **Layer 4** (Recognition Patterns): areas de expertise, insights signature, limites de dominio
    - **Layer 5** (Mental Models): frameworks de raciocinio, heuristicas de decisao, ferramentas conceituais
    - **Layer 6** (Values Hierarchy): valores declarados, nao-negociaveis, trade-offs aceitos
    - **Layer 7** (Core Obsessions): drives existenciais, "por que atras do por que", temas recorrentes
    - **Layer 8** (Productive Paradoxes): tensoes geradoras, contradicoes aparentes que sao superpoderes
  - Extrair citacoes/evidencias diretas

### Step 4: Extract Layer-Specific Patterns
- Consolidar extracoes de todas as fontes
- Para cada padrao encontrado:
  - Documentar: pattern (o que), evidence (citacao/referencia), source (arquivo), source_tier

### Step 5: Triangulate (Layers 5-8 Only)
- Para layers 5-8: cada claim precisa de 3+ fontes independentes
- Cross-referenciar extracoes entre fontes
- Se claim aparece em < 3 fontes: marcar confidence como Baixa
- Se claim aparece em 2 fontes: marcar como Media
- Se claim aparece em 3+ fontes: marcar como Alta
- Documentar evidencia de triangulacao

### Step 6: Tag Confidence
- Para cada extracao, atribuir confidence:
  - **Alta** (90%+): 3+ fontes concordam, pelo menos 1 Tier 1
  - **Media** (70-89%): 2 fontes concordam, ou 1 Tier 1 forte
  - **Baixa** (<70%): 1 fonte apenas, ou apenas Tier 3

### Step 7: Generate Layer YAML
- Gerar artefato YAML usando template `layer-template.yaml`:
  - layer, name, extractions[], aggregate_confidence, gaps[]
- Salvar como `layer-{N}-{name}.yaml` (ex: `layer-5-mental-models.yaml`)

### Step 8: Calculate Aggregate Confidence
- Media ponderada das confidences individuais
- Peso: Alta = 3, Media = 2, Baixa = 1
- Reportar score final (0-100)

### Step 9: Flag Gaps for Elicitation
- Identificar sub-topicos da layer sem evidencia suficiente
- Gerar perguntas de elicitation para cada gap
- Para layers 6-8: recomendar entrevista direta com sujeito

### Step 10: Human Checkpoint (Layers 6-8)
- Para layers 6, 7, 8: PARAR e solicitar revisao humana
- Apresentar extracoes para validacao
- Aguardar aprovacao antes de consolidar artefato final

## Output

Artefato YAML da layer (`layer-{N}-{name}.yaml`) com:
- Todas as extracoes com evidence e source documentados
- Confidence tag por extracao (Alta/Media/Baixa)
- Score de confianca agregado (0-100)
- Lista de gaps identificados com perguntas de elicitation sugeridas
