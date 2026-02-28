---
task: Extract All Layers
responsavel: "@mind-mapper"
responsavel_type: Agente
atomic_layer: Organism
elicit: false

Entrada:
  - campo: sources_master_path
    tipo: string
    origem: "pipeline"
    obrigatorio: true
    validacao: "file exists && is valid YAML"

Saida:
  - campo: layer_artifacts
    tipo: "object { layers_1_4: string, layer_5: string, layer_6: string, layer_7: string, layer_8: string }"
    destino: "file"
    persistido: true
  - campo: extraction_summary
    tipo: "object { total_extractions: number, confidence_per_layer: object, overall_confidence: number, total_gaps: number, human_checkpoints_passed: number }"
    destino: "user output"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "sources_master.yaml existe e tem fontes classificadas com cobertura razoavel"
      tipo: pre-condition
      blocker: true
      validacao: "file_exists(sources_master_path) && sources.length > 0"
    - descricao: "Pelo menos 3 fontes independentes disponiveis para triangulacao (layers 5-8)"
      tipo: pre-condition
      blocker: false
      validacao: "sources.filter(s => s.tier <= 2).length >= 3"
  post-conditions:
    - descricao: "5 artefatos de layer gerados (1-4 batch, 5, 6, 7, 8)"
      tipo: post-condition
      blocker: true
      validacao: "layer_artifacts.layers_1_4 && layer_artifacts.layer_5 && layer_artifacts.layer_6 && layer_artifacts.layer_7 && layer_artifacts.layer_8"
    - descricao: "Cada artefato tem pelo menos 1 extracao documentada"
      tipo: post-condition
      blocker: true
      validacao: "all artifacts have extractions.length > 0"
    - descricao: "Triangulacao aplicada para layers 5-8"
      tipo: post-condition
      blocker: true
      validacao: "layers 5-8 have triangulation evidence"
    - descricao: "Human checkpoints realizados para layers 6, 7, 8"
      tipo: post-condition
      blocker: true
      validacao: "human_checkpoints_passed === 3"
    - descricao: "Extraction summary gerado com metricas completas"
      tipo: post-condition
      blocker: true
      validacao: "extraction_summary.confidence_per_layer && extraction_summary.overall_confidence"
  acceptance-criteria:
    - descricao: "Todas as 8 layers representadas nos artefatos de saida"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Nenhuma layer deep identity (6-8) consolidada sem human checkpoint"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Gaps documentados para planejamento de elicitation futura"
      tipo: acceptance
      blocker: false
      manual_check: true

Performance:
  duration_expected: "interactive (30-60min)"
  cost_estimated: "$0"
  cacheable: false
  parallelizable: false

Error_Handling:
  strategy: fallback
  fallback: "Se extracao de uma layer falhar, salvar progresso parcial e continuar com proxima layer. Reportar layers incompletas no summary."
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

# *extract-all

Extracao sequencial de todas as 8 layers do DNA Mental com checkpoints humanos obrigatorios para layers 6, 7 e 8. Orquestra chamadas internas a `*extract-layer` para cada grupo.

## Uso

```
@mind-mapper
*extract-all
# -> Usa sources_master.yaml do diretorio padrao do projeto

*extract-all --sources-master ./data/sources_master.yaml
# -> Usa sources_master de path especifico
```

## Workflow

### Step 1: Load Sources Master
- Carregar `sources_master.yaml` do path fornecido
- Validar estrutura e integridade
- Reportar: total de fontes, distribuicao por tier, cobertura por layer
- Se cobertura critica (< 30% em qualquer layer): ALERTAR usuario antes de prosseguir

### Step 2: Extract Layers 1-4 (Observable — Batch)
- Extrair Layer 1 (Behavioral Patterns)
- Extrair Layer 2 (Communication Style)
- Extrair Layer 3 (Routines & Habits)
- Extrair Layer 4 (Recognition Patterns)
- Estas layers nao requerem triangulacao — evidencia observavel suficiente
- Gerar artefato consolidado: `layers-1-4-observable.yaml`
- Reportar confidence individual por layer

### Step 3: Extract Layer 5 (Cognitive — With Triangulation)
- Extrair Layer 5 (Mental Models)
- Aplicar triangulacao: 3+ fontes independentes por claim
- Layer 5 e a ponte entre observable e deep identity
- Gerar artefato: `layer-5-mental-models.yaml`
- Reportar confidence e gaps

### Step 4: CHECKPOINT — Review Layers 1-5
- Apresentar resumo das layers 1-5 extraidas
- Metricas: total de extracoes, confidence por layer, gaps encontrados
- Perguntar ao usuario se deseja ajustar algo antes de prosseguir para deep identity
- Se usuario aprova: continuar
- Se usuario quer ajustar: permitir re-extracao de layer especifica

### Step 5: Extract Layer 6 (Values Hierarchy — Triangulation Required)
- Extrair Layer 6 (Values Hierarchy)
- Triangulacao obrigatoria: 3+ fontes independentes
- Buscar: valores declarados, nao-negociaveis, trade-offs aceitos, prioridades demonstradas
- Gerar artefato: `layer-6-values-hierarchy.yaml`

### Step 6: HUMAN CHECKPOINT — Review Layer 6
- PARAR execucao
- Apresentar extracoes de Layer 6 para validacao humana
- Perguntar: "Estes valores estao corretos? Falta algum valor critico?"
- Aguardar aprovacao explicita antes de prosseguir
- Se rejeitado: re-extrair com feedback do usuario

### Step 7: Extract Layer 7 (Core Obsessions — Triangulation Required)
- Extrair Layer 7 (Core Obsessions)
- Triangulacao obrigatoria: 3+ fontes independentes
- Buscar: drives existenciais, "por que atras do por que", temas recorrentes ao longo do tempo
- Gerar artefato: `layer-7-core-obsessions.yaml`

### Step 8: HUMAN CHECKPOINT — Review Layer 7
- PARAR execucao
- Apresentar extracoes de Layer 7 para validacao humana
- Perguntar: "Estas obsessoes centrais estao corretas? Alguma drive faltando?"
- Aguardar aprovacao explicita antes de prosseguir
- Se rejeitado: re-extrair com feedback do usuario

### Step 9: Extract Layer 8 (Productive Paradoxes — Triangulation Required)
- Extrair Layer 8 (Productive Paradoxes)
- Triangulacao obrigatoria: 3+ fontes independentes
- Buscar: tensoes geradoras, contradicoes aparentes que sao superpoderes, dualismos produtivos
- Gerar artefato: `layer-8-productive-paradoxes.yaml`

### Step 10: HUMAN CHECKPOINT — Review Layer 8
- PARAR execucao
- Apresentar extracoes de Layer 8 para validacao humana
- Perguntar: "Estes paradoxos produtivos sao validos? Alguma tensao importante faltando?"
- Aguardar aprovacao explicita antes de prosseguir
- Se rejeitado: re-extrair com feedback do usuario

### Step 11: Generate Extraction Summary
- Compilar metricas finais:
  - total_extractions: soma de extracoes em todas as layers
  - confidence_per_layer: { layer_1: X%, ..., layer_8: X% }
  - overall_confidence: media ponderada (layers deep identity pesam 2x)
  - total_gaps: numero total de gaps identificados
  - human_checkpoints_passed: 3 (layers 6, 7, 8)
- Apresentar summary ao usuario
- Recomendar proximos passos: `*generate-identity-core` ou `*gap-analysis`

## Output

5 artefatos de layer:
- `layers-1-4-observable.yaml` — Layers 1-4 consolidadas
- `layer-5-mental-models.yaml` — Layer 5 com triangulacao
- `layer-6-values-hierarchy.yaml` — Layer 6 com human checkpoint
- `layer-7-core-obsessions.yaml` — Layer 7 com human checkpoint
- `layer-8-productive-paradoxes.yaml` — Layer 8 com human checkpoint

Mais extraction summary com confidence por layer e gaps para elicitation.
