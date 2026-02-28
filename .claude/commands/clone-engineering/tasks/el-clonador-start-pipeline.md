---
task: Start MMOS Pipeline
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
  - campo: fidelity_target
    tipo: number
    origem: "user input"
    obrigatorio: false
    padrao: 93
    validacao: "value >= 70 && value <= 100"
  - campo: deployment_context
    tipo: string
    origem: "user input"
    obrigatorio: false
    padrao: null

Saida:
  - campo: prd
    tipo: "file (PRD.md)"
    destino: "file"
    persistido: true
  - campo: todo
    tipo: "file (TODO.md)"
    destino: "file"
    persistido: true
  - campo: metadata
    tipo: "file (metadata.yaml)"
    destino: "file"
    persistido: true
  - campo: project_directory
    tipo: "directory structure"
    destino: "file"
    persistido: true
  - campo: pipeline_summary
    tipo: "object { subject: string, apex_score: number, icp_score: number, decision: string, directory: string, files_created: array<string> }"
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
    - descricao: "fidelity_target esta entre 70 e 100 (ou default 93)"
      tipo: pre-condition
      blocker: false
      validacao: "fidelity_target >= 70 && fidelity_target <= 100"
  post-conditions:
    - descricao: "PRD.md gerado com secoes: Overview, Objectives, APEX Score, ICP Analysis, Scope, Timeline"
      tipo: post-condition
      blocker: true
      validacao: "fs.existsSync(projectDir + '/PRD.md') && fileContainsSections(['Overview', 'Objectives', 'APEX Score', 'ICP Analysis'])"
    - descricao: "TODO.md gerado com todas as 7 fases do pipeline e suas tarefas"
      tipo: post-condition
      blocker: true
      validacao: "fs.existsSync(projectDir + '/TODO.md') && fileContainsPhases(7)"
    - descricao: "metadata.yaml gerado com subject info, scores, timestamps e config"
      tipo: post-condition
      blocker: true
      validacao: "fs.existsSync(projectDir + '/metadata.yaml') && yamlValid(metadata)"
    - descricao: "Estrutura de diretorios do projeto criada com todas as pastas necessarias"
      tipo: post-condition
      blocker: true
      validacao: "directoryStructureComplete(projectDir)"
    - descricao: "APEX score calculado e decisao GO/NO-GO registrada"
      tipo: post-condition
      blocker: true
      validacao: "metadata.apex_score != null && metadata.decision != null"
  acceptance-criteria:
    - descricao: "APEX score >= 6.0 para decisao GO (ou pipeline abortado com justificativa para NO-GO)"
      tipo: acceptance
      blocker: false
      manual_check: false
    - descricao: "PRD reflete fielmente o subject e seus materiais fonte"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "TODO.md tem tarefas acionaveis para cada fase do pipeline"
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
  fallback: "Solicitar mais informacoes sobre o subject ou fontes alternativas"
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

# *start-pipeline

Inicializa o pipeline MMOS para um novo subject de clonagem. Coleta informacoes do subject, verifica fontes, executa avaliacao de viabilidade APEX + ICP, e gera os documentos fundacionais (PRD, TODO, metadata) com a estrutura de diretorios do projeto.

## Uso

```
@el-clonador
*start-pipeline
# -> Modo interativo, elicita subject name, source path, fidelity target

*start-pipeline --subject "Pedro Valerio" --sources ./sources/pedro/
# -> Inicializa com subject e fontes especificos

*start-pipeline --subject "Expert Name" --sources ./docs/ --fidelity 95 --context "ChatGPT Custom GPT"
# -> Inicializacao completa com fidelity target e deployment context
```

## Workflow

### Step 1: Coletar Informacoes do Subject
- Perguntar nome completo do subject
- Coletar contexto: area de atuacao, audiencia, proposta de valor
- Identificar goals do clone: para que sera usado, qual a plataforma target
- Se `deployment_context` fornecido, registrar como constraint

### Step 2: Verificar Disponibilidade de Material Fonte
- Validar que `source_path` existe e esta acessivel
- Listar todos os arquivos encontrados no path
- Classificar tipos de material: texto, audio, video, social media, etc.
- Contar volume total de material (paginas, horas, posts)
- Se material insuficiente (< 5 fontes): alertar e solicitar mais

### Step 3: Classificar Qualidade Inicial das Fontes (Quick Scan)
- Amostragem rapida de 3-5 fontes representativas
- Classificar por tier (T1: autoria propria, T2: entrevistas, T3: sobre o subject)
- Identificar gaps obvios (ex: sem material de T1)
- Registrar distribuicao de tiers

### Step 4: Executar APEX Viability Scoring
- Avaliar 6 dimensoes (0-10 cada):
  - **A**uthority: presenca e reconhecimento no mercado
  - **P**rofundidade: profundidade do conteudo e metodologias
  - **E**xpertise: nivel de expertise demonstrado
  - **X**pressividade: estilo unico e reconhecivel
  - **C**onsistencia: coerencia across fontes e periodos
  - **D**ocumentabilidade: volume e qualidade do material disponivel
- Calcular media ponderada APEX

### Step 5: Executar ICP Match Scoring
- Analisar market size para o clone
- Identificar audience profile (quem consumiria)
- Avaliar differentiation potential (unicidade)
- Calcular ICP match percentage (0-100%)

### Step 6: Phase Gate Decision
- **GO**: APEX >= 6.0 AND ICP >= 70%
- **NO-GO**: APEX < 6.0 OR ICP < 70%
- Se NO-GO: apresentar scores detalhados e justificativa, sugerir melhorias
- Se GO: prosseguir para geracao de documentos

### Step 7: Gerar PRD.md
- Overview do subject e seu clone
- Objectives do projeto de clonagem
- APEX Score detalhado (6 dimensoes)
- ICP Analysis com market context
- Scope: o que sera clonado e o que nao
- Timeline estimada por fase

### Step 8: Gerar TODO.md
- Fase 1: Viability Assessment (checkboxes)
- Fase 2: Research Collection (checkboxes)
- Fase 3: Cognitive Analysis (checkboxes por layer)
- Fase 4: Knowledge Synthesis (checkboxes)
- Fase 5: Prompt Engineering (checkboxes)
- Fase 6: Fidelity Validation (checkboxes)
- Fase 7: Production Deployment (checkboxes)

### Step 9: Gerar metadata.yaml e Criar Estrutura de Diretorios
- metadata.yaml com: subject info, APEX scores, ICP scores, decision, timestamps, config
- Criar estrutura:
  ```
  clones/{subject-slug}/
  ├── PRD.md
  ├── TODO.md
  ├── metadata.yaml
  ├── sources/
  ├── layers/
  ├── kb/
  ├── system_prompts/
  ├── tests/
  └── deployment/
  ```

### Step 10: Exibir Pipeline Initialization Summary
- Subject name e scores
- Decisao GO/NO-GO com justificativa
- Arquivos criados
- Proximos passos (handoff para Phase 2: Research)

## Output

Pipeline inicializado com:
- PRD.md com visao completa do projeto
- TODO.md com checklist por fase
- metadata.yaml com scores e configuracao
- Estrutura de diretorios pronta para as 7 fases
- Summary com decisao GO/NO-GO e proximos passos
