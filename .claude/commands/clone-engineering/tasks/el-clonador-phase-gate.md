---
task: Phase Gate Review
responsavel: "@el-clonador"
responsavel_type: Agente
atomic_layer: Organism
elicit: false

Entrada:
  - campo: phase_id
    tipo: string
    origem: "pipeline"
    obrigatorio: false
    padrao: "current_phase"
    validacao: "value in ['viability', 'research', 'analysis', 'synthesis', 'implementation', 'testing', 'production']"
  - campo: pipeline_state_path
    tipo: string
    origem: "pipeline"
    obrigatorio: false
    padrao: "clones/{subject-slug}/metadata.yaml"
    validacao: "path exists && yaml valid"

Saida:
  - campo: gate_decision
    tipo: "string (GO | NO-GO | ITERATE)"
    destino: "user output"
    persistido: false
  - campo: gate_report
    tipo: "object { phase: string, criteria: array<object { name: string, status: string, required: boolean, details: string }>, deliverables_status: array<object { file: string, exists: boolean, quality: string }>, human_checkpoint: object { required: boolean, completed: boolean }, decision: string, blockers: array<string>, recommendations: array<string> }"
    destino: "user output"
    persistido: false
  - campo: next_phase_handoff
    tipo: "object { next_phase: string, next_agent: string, context: object } | null"
    destino: "pipeline"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "Pipeline state file existe e e YAML valido"
      tipo: pre-condition
      blocker: true
      validacao: "fs.existsSync(pipeline_state_path) && yamlValid(pipeline_state_path)"
    - descricao: "Phase ID e valido e corresponde a uma fase do pipeline MMOS"
      tipo: pre-condition
      blocker: true
      validacao: "['viability', 'research', 'analysis', 'synthesis', 'implementation', 'testing', 'production'].includes(phase_id)"
    - descricao: "Fase target e a fase atual ou anterior (nao pode avaliar fase futura)"
      tipo: pre-condition
      blocker: true
      validacao: "phaseIndex(phase_id) <= phaseIndex(current_phase)"
  post-conditions:
    - descricao: "Todos os criterios do gate foram avaliados individualmente"
      tipo: post-condition
      blocker: true
      validacao: "gate_report.criteria.length > 0 && gate_report.criteria.every(c => c.status != null)"
    - descricao: "Todos os deliverables obrigatorios foram verificados"
      tipo: post-condition
      blocker: true
      validacao: "gate_report.deliverables_status.length > 0 && gate_report.deliverables_status.every(d => d.exists != null)"
    - descricao: "Decisao e uma das tres opcoes validas: GO, NO-GO, ITERATE"
      tipo: post-condition
      blocker: true
      validacao: "['GO', 'NO-GO', 'ITERATE'].includes(gate_decision)"
    - descricao: "Se GO, handoff para proxima fase preparado com contexto"
      tipo: post-condition
      blocker: true
      validacao: "gate_decision != 'GO' || (next_phase_handoff != null && next_phase_handoff.next_agent != null)"
    - descricao: "Se NO-GO ou ITERATE, blockers e recommendations listados"
      tipo: post-condition
      blocker: true
      validacao: "gate_decision == 'GO' || (gate_report.blockers.length > 0 || gate_report.recommendations.length > 0)"
  acceptance-criteria:
    - descricao: "Gate report e compreensivel e acionavel para o usuario"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Decisao reflete com precisao o estado real dos deliverables"
      tipo: acceptance
      blocker: false
      manual_check: true

Performance:
  duration_expected: "automatic (1-3min)"
  cost_estimated: "$0"
  cacheable: false
  parallelizable: false

Error_Handling:
  strategy: fallback
  fallback: "Listar deliverables encontrados e ausentes, solicitar confirmacao manual do estado"
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

# *phase-gate

Avalia os criterios de phase gate da fase atual (ou especificada) do pipeline MMOS e emite decisao GO/NO-GO/ITERATE. Le o estado do pipeline, verifica deliverables, checa thresholds de qualidade e status de human checkpoints.

## Uso

```
@el-clonador
*phase-gate
# -> Avalia a fase atual do pipeline automaticamente

*phase-gate --phase analysis
# -> Avalia phase gate especifica (Phase 3: Cognitive Analysis)

*phase-gate --phase research --state ./clones/pedro-valerio/metadata.yaml
# -> Avalia fase especifica com state file customizado
```

## Phase Gate Criteria por Fase

| Phase | Gate Criteria | Owner |
|-------|--------------|-------|
| Viability | APEX >= 6.0 AND ICP >= 70% | el-clonador |
| Research | sources_master.yaml completo, tiers classificados | mind-mapper |
| Analysis | 8 layers extraidos, identity-core.yaml gerado | mind-mapper |
| Synthesis | 800+ chunks indexados, retrieval validado | kb-curator |
| Implementation | Persona prompts gerados, memory system integrado | prompt-architect |
| Testing | 50+ cenarios testados, fidelity >= 93% | fidelity-tester |
| Production | Documentacao completa, deployment package pronto | el-clonador |

## Workflow

### Step 1: Ler Pipeline State
- Carregar metadata.yaml do projeto
- Identificar fase atual (ou usar `phase_id` se especificado)
- Carregar historico de gates anteriores
- Verificar sequencia: nao pode avaliar fase futura

### Step 2: Carregar Criterios do Phase Gate
- Identificar criterios especificos da fase target
- Listar deliverables obrigatorios para a fase
- Identificar thresholds de qualidade aplicaveis
- Verificar se human checkpoint e obrigatorio nesta fase

### Step 3: Verificar Deliverables
- Para cada deliverable obrigatorio:
  - Verificar se arquivo/diretorio existe
  - Verificar se conteudo nao esta vazio
  - Classificar qualidade: complete / partial / missing
- Gerar lista de deliverables com status

### Step 4: Checar Quality Thresholds
- Verificar scores especificos da fase (ex: APEX >= 6.0, fidelity >= 93%)
- Verificar contagens minimas (ex: 800+ chunks, 50+ cenarios)
- Verificar completude de camadas (ex: todas 8 layers extraidas)
- Registrar cada threshold com status pass/fail

### Step 5: Verificar Human Checkpoint
- Fases com human checkpoint obrigatorio: Analysis (layers 6,7,8), Production
- Verificar se checkpoint foi realizado (registrado em metadata)
- Se nao realizado e obrigatorio: marcar como blocker

### Step 6: Emitir Decisao
- **GO**: Todos os criterios criticos atendidos, todos deliverables presentes
- **NO-GO**: Um ou mais criterios criticos falharam, gaps irrecuperaveis
- **ITERATE**: Criterios parcialmente atendidos, gaps fixaveis com mais trabalho
- Listar blockers especificos para NO-GO/ITERATE
- Listar recommendations para melhoria

### Step 7: Preparar Handoff (se GO)
- Identificar proxima fase e agente responsavel
- Compilar contexto necessario para a proxima fase
- Gerar resumo do que foi completado e o que vem a seguir
- Registrar gate passage em metadata.yaml

## Output

Gate Report com:
- Fase avaliada e criterios checados
- Status individual de cada deliverable
- Status de human checkpoints
- Decisao: GO / NO-GO / ITERATE
- Blockers e recommendations (se aplicavel)
- Handoff context para proxima fase (se GO)
