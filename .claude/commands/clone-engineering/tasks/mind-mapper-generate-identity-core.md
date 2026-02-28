---
task: Generate Identity Core
responsavel: "@mind-mapper"
responsavel_type: Agente
atomic_layer: Organism
elicit: false

Entrada:
  - campo: layer_6_path
    tipo: string
    origem: "pipeline"
    obrigatorio: true
    validacao: "file exists && is valid YAML"
  - campo: layer_7_path
    tipo: string
    origem: "pipeline"
    obrigatorio: true
    validacao: "file exists && is valid YAML"
  - campo: layer_8_path
    tipo: string
    origem: "pipeline"
    obrigatorio: true
    validacao: "file exists && is valid YAML"

Saida:
  - campo: identity_core
    tipo: "object { subject: string, version: string, top_5_values: array<object { value: string, rank: number, non_negotiable: boolean, evidence: string }>, obsession_value_map: array<object { obsession: string, linked_values: array<string>, causal_link: string }>, paradox_patterns: array<object { paradox: string, resolution_pattern: string, linked_values: array<string> }>, synthesis_narrative: string }"
    destino: "file"
    persistido: true
  - campo: synthesis_notes
    tipo: "string (markdown notes on synthesis decisions)"
    destino: "file"
    persistido: true

Checklist:
  pre-conditions:
    - descricao: "layer-6-values-hierarchy.yaml existe e foi validado por human checkpoint"
      tipo: pre-condition
      blocker: true
      validacao: "file_exists(layer_6_path) && layer_6.extractions.length > 0"
    - descricao: "layer-7-core-obsessions.yaml existe e foi validado por human checkpoint"
      tipo: pre-condition
      blocker: true
      validacao: "file_exists(layer_7_path) && layer_7.extractions.length > 0"
    - descricao: "layer-8-productive-paradoxes.yaml existe e foi validado por human checkpoint"
      tipo: pre-condition
      blocker: true
      validacao: "file_exists(layer_8_path) && layer_8.extractions.length > 0"
  post-conditions:
    - descricao: "Top 5 valores identificados e ranqueados"
      tipo: post-condition
      blocker: true
      validacao: "identity_core.top_5_values.length === 5"
    - descricao: "Cada obsessao mapeada para pelo menos 1 valor"
      tipo: post-condition
      blocker: true
      validacao: "identity_core.obsession_value_map.every(o => o.linked_values.length > 0)"
    - descricao: "Cada paradoxo referencia pelo menos 1 valor"
      tipo: post-condition
      blocker: true
      validacao: "identity_core.paradox_patterns.every(p => p.linked_values.length > 0)"
    - descricao: "Cross-validacao: todo valor rastreavel a obsessao, todo paradoxo referencia valores"
      tipo: post-condition
      blocker: true
      validacao: "top_5_values.every(v => obsession_value_map.some(o => o.linked_values.includes(v.value)))"
    - descricao: "identity-core.yaml gerado e salvo"
      tipo: post-condition
      blocker: true
      validacao: "file_exists('identity-core.yaml')"
  acceptance-criteria:
    - descricao: "Sintese coerente — valores, obsessoes e paradoxos formam narrativa consistente"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Nenhum valor inventado — todos rastreiam a evidencia das layers 6-8"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Human review recomendado antes de uso em downstream (KB, Prompt)"
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
  fallback: "Se layers incompletas ou com baixa confianca, gerar identity-core parcial e documentar lacunas"
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
    - mind-mapper-extract-layer.md
  author: "Felipe Rosa"
  created_at: "2026-02-01"
  updated_at: "2026-02-01"
---

# *generate-identity-core

Sintetiza identity-core.yaml a partir das layers 6-8 (Values Hierarchy, Core Obsessions, Productive Paradoxes). Mapeia relacoes causais entre valores, obsessoes e paradoxos para formar o nucleo identitario do sujeito.

## Uso

```
@mind-mapper
*generate-identity-core
# -> Busca layers 6-8 no diretorio padrao do projeto

*generate-identity-core --l6 ./data/layer-6-values-hierarchy.yaml --l7 ./data/layer-7-core-obsessions.yaml --l8 ./data/layer-8-productive-paradoxes.yaml
# -> Usa paths especificos para cada layer
```

## Workflow

### Step 1: Read Layer 6 — Values Hierarchy
- Carregar `layer-6-values-hierarchy.yaml`
- Extrair todos os valores identificados com seus ranks e evidencias
- Identificar quais sao non-negotiable (declarados como absolutos pelo sujeito)
- Listar trade-offs documentados

### Step 2: Read Layer 7 — Core Obsessions
- Carregar `layer-7-core-obsessions.yaml`
- Extrair todas as obsessoes/drives existenciais identificadas
- Identificar padroes recorrentes ao longo do tempo (nao modismos)
- Mapear "por que atras do por que" para cada obsessao

### Step 3: Read Layer 8 — Productive Paradoxes
- Carregar `layer-8-productive-paradoxes.yaml`
- Extrair todos os paradoxos produtivos identificados
- Identificar como cada tensao se resolve na pratica
- Mapear quais comportamentos emergem da tensao

### Step 4: Extract Top 5 Non-Negotiable Values
- Dos valores da Layer 6, selecionar os 5 mais fortes por:
  - Frequencia de aparicao nas fontes
  - Forca da evidencia (confidence tag)
  - Declaracao explicita como non-negotiable pelo sujeito
- Ranquear de 1 (mais forte) a 5
- Documentar evidencia para cada

### Step 5: Map Obsessions to Values (Causal Links)
- Para cada obsessao da Layer 7:
  - Identificar qual(is) valor(es) ela serve ou manifesta
  - Documentar o link causal: "Obsessao X existe porque valor Y e prioritario"
  - Exemplo: "Obsessao com rastreabilidade" -> valores "transparencia" e "controle"
- Validar: toda obsessao deve linkar a pelo menos 1 valor

### Step 6: Identify Paradox Resolution Patterns
- Para cada paradoxo da Layer 8:
  - Identificar como a tensao se resolve (qual valor "vence" em qual contexto)
  - Mapear quais valores estao em tensao
  - Documentar o padrao de resolucao
  - Exemplo: "Controle vs. Liberdade" -> "Controle em processos core, liberdade em experimentacao"

### Step 7: Synthesize identity-core.yaml
- Compilar estrutura final:
  - subject, version, generated_at
  - top_5_values (ranked, com evidence)
  - obsession_value_map (com causal links)
  - paradox_patterns (com resolution patterns)
  - synthesis_narrative (paragrafo descritivo do nucleo identitario)
- Salvar como `identity-core.yaml`

### Step 8: Cross-Validate Integrity
- Verificar: todo valor no top 5 e referenciado por pelo menos 1 obsessao
- Verificar: todo paradoxo referencia pelo menos 1 valor do top 5
- Verificar: nenhum valor "orfao" (sem obsessao que o sustente)
- Se inconsistencia encontrada: documentar e recomendar revisao

### Step 9: Human Review Recommended
- Apresentar identity-core ao usuario
- Recomendar revisao humana antes de uso downstream
- Gerar synthesis_notes.md com decisoes tomadas durante sintese

## Output

Arquivo `identity-core.yaml` com:
- Top 5 valores non-negotiable ranqueados com evidencia
- Mapa obsessao-valor com links causais documentados
- Padroes de resolucao de paradoxos com valores em tensao
- Narrativa sintetica do nucleo identitario
- Synthesis notes com decisoes e justificativas
