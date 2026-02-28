---
task: Generate Cognitive Spec
responsavel: "@mind-mapper"
responsavel_type: Agente
atomic_layer: Organism
elicit: false

Entrada:
  - campo: layers_directory
    tipo: string
    origem: "pipeline"
    obrigatorio: true
    validacao: "directory exists && contains all 5 layer artifacts"
  - campo: identity_core_path
    tipo: string
    origem: "pipeline"
    obrigatorio: true
    validacao: "file exists && is valid YAML"

Saida:
  - campo: cognitive_spec
    tipo: "object { subject: string, version: string, behavioral_patterns: object, communication_style: object, routines: object, recognition_patterns: object, mental_models: object, identity_core: object, persona_variants: array<object { name: string, trigger: string, communication_mode: string }>, decision_framework: object, completeness: object { layers_represented: number, total_extractions: number, aggregate_confidence: number } }"
    destino: "file"
    persistido: true
  - campo: spec_summary
    tipo: "string (markdown summary of cognitive architecture)"
    destino: "file"
    persistido: true

Checklist:
  pre-conditions:
    - descricao: "Todos os 5 artefatos de layer existem (1-4, 5, 6, 7, 8)"
      tipo: pre-condition
      blocker: true
      validacao: "all 5 layer artifacts exist in layers_directory"
    - descricao: "identity-core.yaml existe e foi sintetizado"
      tipo: pre-condition
      blocker: true
      validacao: "file_exists(identity_core_path) && identity_core.top_5_values.length > 0"
    - descricao: "Layers 6-8 passaram por human checkpoint"
      tipo: pre-condition
      blocker: false
      validacao: "manual verification"
  post-conditions:
    - descricao: "Todas as 8 layers representadas no cognitive-spec"
      tipo: post-condition
      blocker: true
      validacao: "completeness.layers_represented === 8"
    - descricao: "Identity core integrado com valores, obsessoes e paradoxos"
      tipo: post-condition
      blocker: true
      validacao: "cognitive_spec.identity_core != null && cognitive_spec.identity_core.top_5_values"
    - descricao: "Persona variants definidos com triggers de switching"
      tipo: post-condition
      blocker: true
      validacao: "cognitive_spec.persona_variants.length > 0 && persona_variants.every(p => p.trigger)"
    - descricao: "Decision framework integrado com mental models"
      tipo: post-condition
      blocker: true
      validacao: "cognitive_spec.decision_framework != null"
    - descricao: "cognitive-spec.yaml gerado e salvo"
      tipo: post-condition
      blocker: true
      validacao: "file_exists('cognitive-spec.yaml')"
  acceptance-criteria:
    - descricao: "Spec e completo — todas as 8 layers representadas sem lacunas criticas"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Persona variants sao acionaveis — triggers claros e communication modes distintos"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Spec pronto para consumo por @prompt-architect (downstream Phase 5)"
      tipo: acceptance
      blocker: false
      manual_check: true

Performance:
  duration_expected: "interactive (15-30min)"
  cost_estimated: "$0"
  cacheable: false
  parallelizable: false

Error_Handling:
  strategy: fallback
  fallback: "Se layer artifact ausente, gerar spec parcial com flag de incompletude e documentar qual layer falta"
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
    - mind-mapper-extract-all.md
    - mind-mapper-generate-identity-core.md
    - persona-switching-rules.md
  author: "Felipe Rosa"
  created_at: "2026-02-01"
  updated_at: "2026-02-01"
---

# *generate-cognitive-spec

Gera cognitive-spec.yaml completo a partir de todos os 8 layers e identity-core. Documento final de arquitetura cognitiva que alimenta @prompt-architect e @kb-curator downstream.

## Uso

```
@mind-mapper
*generate-cognitive-spec
# -> Busca layer artifacts e identity-core no diretorio padrao

*generate-cognitive-spec --layers ./data/layers/ --identity-core ./data/identity-core.yaml
# -> Usa paths especificos
```

## Workflow

### Step 1: Load All Layer Artifacts
- Carregar os 5 artefatos de layer:
  - `layers-1-4-observable.yaml`
  - `layer-5-mental-models.yaml`
  - `layer-6-values-hierarchy.yaml`
  - `layer-7-core-obsessions.yaml`
  - `layer-8-productive-paradoxes.yaml`
- Validar que cada artefato tem extracoes validas
- Se artefato faltando: ALERTAR e documentar incompletude

### Step 2: Load Identity Core
- Carregar `identity-core.yaml`
- Validar: top_5_values, obsession_value_map, paradox_patterns presentes
- Se identity-core incompleto: recomendar rodar `*generate-identity-core` primeiro

### Step 3: Compile Behavioral Patterns (Layers 1-4)
- Estruturar secao behavioral_patterns:
  - work_patterns: habitos de trabalho, ritmo, foco
  - learning_patterns: como aprende, absorve, retém
  - decision_speed: rapido vs. deliberado, em quais contextos
  - social_patterns: como interage, lidera, colabora
- Estruturar communication_style (Layer 2):
  - vocabulary: palavras/expressoes signature
  - tone: default tone e variacoes por contexto
  - metaphors: metaforas recorrentes
  - audience_adaptation: como muda por audiencia
- Estruturar routines (Layer 3) e recognition_patterns (Layer 4)

### Step 4: Integrate Mental Models (Layer 5) with Decision Framework
- Estruturar secao mental_models:
  - Listar cada framework de raciocinio identificado
  - Mapear heuristicas de decisao
  - Documentar ferramentas conceituais favoritas
- Criar decision_framework integrando mental models com valores:
  - Quando valor X conflita com valor Y, qual mental model resolve?
  - Quais heuristicas sao acionadas em cenarios de pressao?

### Step 5: Embed Identity Core (Layers 6-8)
- Integrar identity-core.yaml na estrutura do spec:
  - top_5_values com ranks e evidencia
  - obsession_value_map com links causais
  - paradox_patterns com resolution patterns
- Conectar identity core com behavioral patterns:
  - "Valor rastreabilidade -> comportamento de documentar tudo"

### Step 6: Map Communication Style to Persona Variants
- Usando dados das layers 1-4 e regras de `persona-switching-rules.md`:
  - Identificar modos de comunicacao distintos (ex: ensino, lideranca, colaboracao, critica)
  - Para cada modo, definir:
    - name: nome do variant
    - trigger: quando este modo e ativado
    - communication_mode: tom, vocabulario, ritmo
  - Exemplo: "Modo Professor" triggered by "alguem pede explicacao", communication_mode: "didatico, usa metaforas, repete pontos-chave"

### Step 7: Define Persona Switching Triggers
- Mapear condicoes que causam mudanca de persona variant:
  - Contexto (ensino vs. decisao vs. critica)
  - Audiencia (junior vs. par vs. cliente)
  - Emocao (calmo vs. frustrado vs. entusiasmado)
- Documentar regras de transicao claras

### Step 8: Generate cognitive-spec.yaml
- Compilar estrutura final completa:
  - subject, version, generated_at
  - behavioral_patterns (L1-4)
  - communication_style (L2)
  - routines (L3)
  - recognition_patterns (L4)
  - mental_models (L5)
  - decision_framework (L5 + L6)
  - identity_core (L6-8)
  - persona_variants (L1-4 + switching rules)
  - completeness metrics
- Salvar como `cognitive-spec.yaml`

### Step 9: Validate Completeness
- Verificar: todas as 8 layers representadas
- Contar total de extracoes integradas
- Calcular aggregate confidence
- Se alguma layer com confidence < 70%: flaguear no completeness
- Reportar completeness metrics

### Step 10: Generate Spec Summary
- Gerar `spec-summary.md` com:
  - Overview da arquitetura cognitiva em linguagem natural
  - Pontos fortes da extracao (alta confianca)
  - Areas de incerteza (baixa confianca)
  - Persona variants descobertos
  - Recomendacoes para @prompt-architect
- Este summary e o handoff document para downstream

## Output

Arquivo `cognitive-spec.yaml` com:
- Arquitetura cognitiva completa das 8 layers
- Identity core integrado com valores, obsessoes e paradoxos
- Persona variants com triggers de switching documentados
- Decision framework integrando mental models e valores
- Metricas de completude e confianca

Mais `spec-summary.md` como handoff para downstream agents.
