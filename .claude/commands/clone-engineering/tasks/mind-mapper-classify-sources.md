---
task: Classify Sources
responsavel: "@mind-mapper"
responsavel_type: Agente
atomic_layer: Organism
elicit: true

Entrada:
  - campo: source_path
    tipo: string
    origem: "user input"
    obrigatorio: true
    validacao: "path exists && is directory"
  - campo: subject_name
    tipo: string
    origem: "user input"
    obrigatorio: false
    padrao: null
    validacao: "length >= 2"

Saida:
  - campo: sources_master
    tipo: "object { subject: string, total_sources: number, sources: array<object { file: string, tier: number, tier_label: string, layer_relevance: array<number>, word_count: number, quality_signals: array<string> }>, coverage: object { layer_1: number, layer_2: number, layer_3: number, layer_4: number, layer_5: number, layer_6: number, layer_7: number, layer_8: number }, gaps: array<string> }"
    destino: "file"
    persistido: true
  - campo: classification_report
    tipo: "string (markdown summary of tier distribution and coverage)"
    destino: "user output"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "source_path existe e contem pelo menos 1 arquivo legivel"
      tipo: pre-condition
      blocker: true
      validacao: "source_path != null && directory.files.length > 0"
    - descricao: "Arquivos sao de formato suportado (md, txt, yaml, pdf, docx)"
      tipo: pre-condition
      blocker: false
      validacao: "manual verification"
  post-conditions:
    - descricao: "Cada fonte classificada em exatamente um Tier (1, 2 ou 3)"
      tipo: post-condition
      blocker: true
      validacao: "sources.every(s => [1, 2, 3].includes(s.tier))"
    - descricao: "Layer relevance mapeada para cada fonte"
      tipo: post-condition
      blocker: true
      validacao: "sources.every(s => s.layer_relevance.length > 0)"
    - descricao: "sources_master.yaml gerado e salvo no diretorio do projeto"
      tipo: post-condition
      blocker: true
      validacao: "file_exists('sources_master.yaml')"
    - descricao: "Coverage calculado para todas as 8 layers"
      tipo: post-condition
      blocker: true
      validacao: "Object.keys(coverage).length === 8"
    - descricao: "Gaps identificados para layers com coverage < 50%"
      tipo: post-condition
      blocker: true
      validacao: "gaps.length >= 0 && gaps validated against coverage"
  acceptance-criteria:
    - descricao: "Tier 1 (Crown Jewels) inclui apenas conteudo direto do sujeito (fala, escrita propria)"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Nenhuma fonte Tier 3 classificada como Tier 1 por engano"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Coverage report identifica lacunas reais para planejamento de elicitation"
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
  fallback: "Se diretorio vazio ou ilegivel, solicitar novo path ao usuario"
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
  author: "Felipe Rosa"
  created_at: "2026-02-01"
  updated_at: "2026-02-01"
---

# *classify-sources

Classifica materiais-fonte em Tier 1 (Crown Jewels), Tier 2 (Core) e Tier 3 (Supporting). Gera sources_master.yaml com inventario completo, classificacao por tier, relevancia por layer e contagem de palavras por fonte.

## Uso

```
@mind-mapper
*classify-sources
# -> Modo interativo, solicita path do diretorio de fontes

*classify-sources --path ./sources/pedro/
# -> Classifica fontes do diretorio especifico

*classify-sources --path ./sources/pedro/ --subject "Pedro Valerio"
# -> Classifica com nome do sujeito
```

## Workflow

### Step 1: Scan Source Directory
- Receber ou solicitar `source_path` do usuario
- Listar todos os arquivos no diretorio (recursivo)
- Filtrar por formatos suportados: .md, .txt, .yaml, .pdf, .docx
- Reportar total de arquivos encontrados

### Step 2: Read and Assess Quality Signals
- Para cada arquivo:
  - Ler conteudo completo
  - Calcular word_count
  - Identificar quality signals:
    - Primeira pessoa (eu, meu, minha) = sinal Tier 1
    - Transcricao de fala/video = sinal Tier 1
    - Conteudo estruturado/didatico = sinal Tier 2
    - Conteudo de terceiros/sobre o sujeito = sinal Tier 3

### Step 3: Classify into Tiers
- **Tier 1 — Crown Jewels**: Fala direta do sujeito, escrita propria, auto-analise, transcricoes de video/podcast onde o sujeito fala
- **Tier 2 — Core**: Cursos ministrados pelo sujeito, livros publicados, frameworks documentados, conteudo estruturado produzido pelo sujeito
- **Tier 3 — Supporting**: Conteudo de terceiros sobre o sujeito, entrevistas editadas, resumos, analises externas
- Regra: na duvida, classificar no tier mais baixo (conservador)

### Step 4: Map Layer Relevance
- Para cada fonte, identificar quais layers (1-8) o conteudo alimenta:
  - Descricao de rotinas/habitos -> Layer 1, 3
  - Vocabulario, tom, metaforas -> Layer 2
  - Expertise demonstrada -> Layer 4
  - Frameworks de decisao, heuristicas -> Layer 5
  - Declaracao de valores, prioridades -> Layer 6
  - Motivacoes profundas, "por que faco isso" -> Layer 7
  - Contradicoes produtivas, tensoes -> Layer 8

### Step 5: Calculate Coverage Per Layer
- Para cada layer (1-8):
  - Contar quantas fontes a alimentam
  - Calcular % de cobertura (fontes relevantes / total fontes)
  - Peso por tier: Tier 1 = 3x, Tier 2 = 2x, Tier 3 = 1x

### Step 6: Generate sources_master.yaml
- Gerar arquivo YAML com estrutura completa:
  - subject, total_sources, generated_at
  - Lista de sources com: file, tier, tier_label, layer_relevance, word_count, quality_signals
  - Coverage por layer
  - Gaps identificados
- Salvar no diretorio do projeto de clone

### Step 7: Report Coverage Gaps
- Identificar layers com coverage < 50%
- Identificar layers sem nenhuma fonte Tier 1
- Recomendar acoes: "Layer 7 precisa de elicitation direta" ou "Layer 3 precisa de mais fontes Tier 1"
- Apresentar resumo ao usuario

## Output

Arquivo `sources_master.yaml` com:
- Inventario completo de fontes classificadas por tier
- Mapeamento de relevancia por layer para cada fonte
- Metricas de cobertura por layer (1-8)
- Lista de gaps com recomendacoes de acao
- Word count por fonte para estimativa de esforco de processamento
