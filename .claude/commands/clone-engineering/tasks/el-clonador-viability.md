---
task: Viability Assessment
responsavel: "@el-clonador"
responsavel_type: Agente
atomic_layer: Organism
elicit: true

Entrada:
  - campo: subject_name
    tipo: string
    origem: "user input"
    obrigatorio: true
    validacao: "length >= 2"
  - campo: source_path
    tipo: string
    origem: "user input"
    obrigatorio: true
    validacao: "path exists && contains readable files"
  - campo: market_context
    tipo: string
    origem: "user input"
    obrigatorio: false
    padrao: null

Saida:
  - campo: apex_score
    tipo: "object { authority: number, profundidade: number, expertise: number, expressividade: number, consistencia: number, documentabilidade: number, weighted_average: number }"
    destino: "user output"
    persistido: false
  - campo: icp_match_score
    tipo: "number (0-100)"
    destino: "user output"
    persistido: false
  - campo: viability_decision
    tipo: "string (GO | NO-GO)"
    destino: "user output"
    persistido: false
  - campo: viability_report
    tipo: "string (markdown)"
    destino: "user output"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "subject_name esta definido e tem pelo menos 2 caracteres"
      tipo: pre-condition
      blocker: true
      validacao: "subject_name != null && subject_name.length >= 2"
    - descricao: "source_path existe e contem arquivos legiveis"
      tipo: pre-condition
      blocker: true
      validacao: "fs.existsSync(source_path) && fs.readdirSync(source_path).length > 0"
    - descricao: "Pelo menos 3 fontes de material disponivel para analise"
      tipo: pre-condition
      blocker: true
      validacao: "countFiles(source_path) >= 3"
  post-conditions:
    - descricao: "Todas 6 dimensoes APEX avaliadas com score 0-10"
      tipo: post-condition
      blocker: true
      validacao: "apex_score.authority >= 0 && apex_score.authority <= 10 && apex_score.profundidade >= 0 && apex_score.profundidade <= 10 && apex_score.expertise >= 0 && apex_score.expertise <= 10 && apex_score.expressividade >= 0 && apex_score.expressividade <= 10"
    - descricao: "Media ponderada APEX calculada corretamente"
      tipo: post-condition
      blocker: true
      validacao: "apex_score.weighted_average >= 0 && apex_score.weighted_average <= 10"
    - descricao: "ICP match score calculado entre 0-100%"
      tipo: post-condition
      blocker: true
      validacao: "icp_match_score >= 0 && icp_match_score <= 100"
    - descricao: "Decisao de viabilidade e GO ou NO-GO com justificativa"
      tipo: post-condition
      blocker: true
      validacao: "['GO', 'NO-GO'].includes(viability_decision) && viability_report.length > 100"
  acceptance-criteria:
    - descricao: "Scores APEX sao fundamentados em evidencias das fontes (nao arbitrarios)"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "ICP analysis reflete realidade de mercado do subject"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Viability report e claro, acionavel e permite decisao informada"
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
  fallback: "Solicitar fontes adicionais ou contexto de mercado para refinar scoring"
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

# *viability

Executa avaliacao de viabilidade APEX + ICP para um subject de clonagem. Analisa materiais fonte, pontua 6 dimensoes de qualidade, avalia match com mercado alvo, e emite decisao GO/NO-GO fundamentada.

## Uso

```
@el-clonador
*viability
# -> Modo interativo, elicita subject e fontes

*viability --subject "Pedro Valerio" --sources ./sources/pedro/
# -> Avalia viabilidade para subject especifico

*viability --subject "Expert Name" --sources ./docs/ --market "Consultoria em gestao de operacoes"
# -> Avalia com contexto de mercado especifico
```

## APEX Framework

O APEX scoring avalia a "clonabilidade" de um subject em 6 dimensoes:

| Dimensao | Peso | O que avalia | Score |
|----------|------|--------------|-------|
| **A**uthority | 20% | Presenca, reconhecimento, credibilidade no mercado | 0-10 |
| **P**rofundidade | 20% | Profundidade do conteudo, metodologias proprias, frameworks | 0-10 |
| **E**xpertise | 20% | Nivel de expertise demonstrado, resultados comprova veis | 0-10 |
| **X**pressividade | 20% | Estilo unico, voz reconhecivel, personalidade distinta | 0-10 |
| Consistencia | 10% | Coerencia across fontes, estabilidade de posicionamento | 0-10 |
| Documentabilidade | 10% | Volume e qualidade do material disponivel para extracao | 0-10 |

**Threshold GO:** Media ponderada >= 6.0

## ICP Match Framework

| Criterio | Peso | O que avalia |
|----------|------|--------------|
| Market Size | 30% | Tamanho da audiencia potencial para o clone |
| Audience Profile | 25% | Clareza e definicao do publico alvo |
| Differentiation | 25% | Unicidade vs clones/assistentes existentes no nicho |
| Monetization Potential | 20% | Viabilidade comercial do clone |

**Threshold GO:** ICP Match >= 70%

## Workflow

### Step 1: Coletar Informacoes do Subject
- Se nao fornecido interativamente: nome, area, contexto
- Registrar market_context se disponivel
- Identificar publico-alvo primario do subject

### Step 2: Escanear Materiais Fonte
- Listar todas as fontes em source_path
- Classificar por tipo: texto, audio transcrito, video transcrito, social media, artigos
- Classificar por tier:
  - **T1 (Autoria propria):** livros, cursos, metodologias, frameworks
  - **T2 (Participacao direta):** entrevistas, podcasts, palestras, lives
  - **T3 (Sobre o subject):** artigos de terceiros, reviews, mentions
- Calcular distribuicao de tiers e volume total

### Step 3: Pontuar APEX - Authority (0-10)
- Verificar: publicacoes proprias, certificacoes, cargos, cases publicados
- Evidencias de reconhecimento pelo mercado
- Presenca em midia especializada
- Atribuir score com justificativa

### Step 4: Pontuar APEX - Profundidade (0-10)
- Verificar: metodologias proprias, frameworks documentados
- Profundidade de conteudo (superficial vs aprofundado)
- Conexoes entre conceitos, visao sistemica
- Atribuir score com justificativa

### Step 5: Pontuar APEX - Expertise (0-10)
- Verificar: anos de experiencia, resultados demonstrados
- Cases de sucesso documentados
- Dominio tecnico comprovavel
- Atribuir score com justificativa

### Step 6: Pontuar APEX - Expressividade (0-10)
- Verificar: estilo de comunicacao unico, bordoes, vocabulario proprio
- Personalidade reconhecivel nas fontes
- Tom e ritmo consistentes
- Atribuir score com justificativa

### Step 7: Pontuar APEX - Consistencia e Documentabilidade (0-10 cada)
- Consistencia: mensagem coerente across fontes e periodos
- Documentabilidade: volume, qualidade e acessibilidade das fontes
- Atribuir scores com justificativa

### Step 8: Calcular APEX Weighted Average
- Aplicar pesos: A(20%), P(20%), E(20%), X(20%), Consistencia(10%), Documentabilidade(10%)
- Media ponderada final (0-10)

### Step 9: Analisar ICP Match
- Market Size: quantificar audiencia potencial
- Audience Profile: definir persona ideal do consumidor do clone
- Differentiation: comparar com assistentes/clones existentes no nicho
- Monetization Potential: avaliar viabilidade comercial
- Calcular ICP Match (0-100%)

### Step 10: Emitir Decisao e Gerar Report
- **GO:** APEX >= 6.0 AND ICP >= 70%
- **NO-GO:** APEX < 6.0 OR ICP < 70%
- Gerar viability report em markdown com:
  - Scores detalhados por dimensao (com justificativas)
  - ICP analysis com market context
  - Decisao final com fundamentacao
  - Se NO-GO: recomendacoes para viabilizar (mais fontes, ajuste de escopo)

## Output

Viability Report com:
- APEX Score detalhado (6 dimensoes + media ponderada)
- ICP Match Score (4 criterios + percentual final)
- Decisao GO/NO-GO com fundamentacao em evidencias
- Recomendacoes (se NO-GO: como viabilizar / se GO: riscos a monitorar)
