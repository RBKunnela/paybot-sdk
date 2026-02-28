# Squad: Project Management ClickUp

> Squad especialista em gestao de projetos com dominio avancado do ClickUp para negocios de infoprodutos e SaaS.

## Visao Geral

Este squad combina metodologias **GTD**, **PARA** e **Ageis** para estruturar, documentar e automatizar todos os processos do negocio. Ele transforma processos informais em sistemas organizados no ClickUp.

### Para Quem

- **Rafael** (Estrategista)
- **Natalia Tanaka** (Expert)
- **Squads de Agentes**

### Contexto do Negocio

| Aspecto | Valor |
|---------|-------|
| Tipo | Infoprodutos + SaaS |
| Tickets | R$ 29,97 ate R$ 10.997 |
| Modelos de Lancamento | PLF, Perpetuo, High Ticket, Webinario, Desafios |
| ClickUp Atual | Intermediario > **Avancado** |

---

## Agentes (9)

### Orchestrator

| Agente | Funcao |
|--------|--------|
| **PM Orchestrator** | Ponto de entrada, roteia demandas para especialistas |

### Tier 0 - Diagnostico

| Agente | Funcao |
|--------|--------|
| **Process Diagnostician** | Mapeia e documenta processos nao formalizados |

### Tier 1 - Arquitetura

| Agente | Funcao |
|--------|--------|
| **ClickUp Architect** | Estrutura workspaces, folders, views, custom fields |
| **Automation Engineer** | Cria automacoes, time tracking, dependencies |

### Tier 2 - Operacoes

| Agente | Funcao |
|--------|--------|
| **Launch Operations Manager** | Gerencia operacoes de lancamentos |
| **Content Operations Manager** | Pipeline de producao de conteudo |
| **CRM Builder** | Estrutura CRM e pipeline de vendas |

### Tier 3 - Especialistas

| Agente | Funcao |
|--------|--------|
| **SaaS Operations Specialist** | Roadmap, sprints, bugs, releases |
| **Support Operations Specialist** | Sistema de tickets e atendimento |

---

## Comandos Rapidos

### Geral
```
*help                    # Ver todos os comandos
*status                  # Visao geral de projetos
*weekly-review           # Review semanal GTD
```

### Processos
```
*diagnose [processo]     # Diagnosticar processo nao documentado
*setup-clickup [area]    # Configurar ClickUp para uma area
*automate [descricao]    # Criar automacao
```

### Lancamentos
```
*launch-setup [produto] [modelo] [data]   # Preparar lancamento
```

### Conteudo
```
*content-ops             # Estruturar operacoes de conteudo
```

### Comercial
```
*crm                     # Configurar/gerenciar CRM
```

### SaaS
```
*saas-ops                # Operacoes do produto
*saas-setup              # Configurar workspace SaaS
```

### Suporte
```
*support                 # Estruturar sistema de suporte
*support-setup           # Configurar sistema de tickets completo
```

---

## MCP Tools Disponiveis

| MCP | Tools | Uso |
|-----|-------|-----|
| `clickup` | 12 | CRUD de tasks, comments, time entries, docs |
| `mission-control` | 6 | Webhook automations, routing rules |

---

## Estrutura ClickUp Recomendada

```
WORKSPACE: Natalia Tanaka Business

├── LANCAMENTOS (Projects)
│   ├── [Produto] - [Modelo] - [Data]
│   │   ├── Pre-Pre-Lancamento
│   │   ├── Pre-Lancamento
│   │   ├── Lancamento
│   │   └── Pos-Lancamento
│   └── Templates de Lancamento
│
├── CONTEUDO (Area)
│   ├── YouTube
│   ├── Social Media
│   └── Newsletter/Blog
│
├── COMERCIAL (Area)
│   ├── Pipeline (CRM)
│   └── Clientes
│
├── SAAS (Area)
│   ├── Roadmap
│   ├── Sprint
│   └── Bugs
│
├── SUPORTE (Area)
│   ├── Tickets
│   └── Knowledge Base
│
├── OPERACOES (Area)
│   └── Processos
│
├── RECURSOS (Resources)
│   ├── Templates
│   └── SOPs
│
└── ARQUIVO (Archives)
    └── Projetos Concluidos
```

---

## Metodologias

### GTD (Getting Things Done)
- **Capture** > Tudo vai para o Inbox
- **Clarify** > Processar e definir proxima acao
- **Organize** > Colocar no lugar certo
- **Reflect** > Review semanal
- **Engage** > Executar com confianca

### PARA (Projects, Areas, Resources, Archives)
- **Projects** = Resultados com prazo (Folders)
- **Areas** = Responsabilidades continuas (Spaces)
- **Resources** = Material de referencia (Docs)
- **Archives** = Itens inativos

### Ageis
- **Scrum** para desenvolvimento (sprints de 2 semanas)
- **Kanban** para operacoes continuas

---

## Integracoes com Outros Squads

| Squad | Integracao |
|-------|------------|
| @copywriting | Briefings e entregas de copy |
| @full-stack-dev | Sprints e bugs do SaaS |
| @youtube-content | Pipeline de videos |
| @youtube-lives | Calendario de lives |
| @design-system | Requests de design |
| @media-buy | Campanhas e metricas |
| @sales | CRM e pipeline de vendas |
| @natalia-tanaka | Aprovacoes e estrategia |
| @orquestrador-global | Coordenacao macro |

---

## Arquivos do Squad

```
project-management-clickup/
├── squad.yaml                           # Manifest (AIOS registry)
├── config.yaml                          # Full configuration
├── agent-registry.yaml                  # Agent routing index
├── README.md                            # This file
│
├── agents/ (9)
│   ├── pm-orchestrator.md               # Orchestrator
│   ├── process-diagnostician.md         # Tier 0
│   ├── clickup-architect.md             # Tier 1
│   ├── automation-engineer.md           # Tier 1
│   ├── launch-operations-manager.md     # Tier 2
│   ├── content-operations-manager.md    # Tier 2
│   ├── crm-builder.md                   # Tier 2
│   ├── saas-operations-specialist.md    # Tier 3
│   └── support-operations-specialist.md # Tier 3
│
├── tasks/ (9)
│   ├── diagnose-process.md              # Process diagnosis
│   ├── setup-clickup-workspace.md       # Workspace setup
│   ├── configure-crm.md                 # CRM configuration
│   ├── setup-launch-workspace.md        # Launch workspace
│   ├── create-automations.md            # Automation creation
│   ├── setup-content-pipeline.md        # Content pipeline
│   ├── setup-saas-workspace.md          # SaaS workspace
│   ├── setup-support-system.md          # Support system
│   └── weekly-review.md                 # Weekly GTD review
│
├── workflows/ (6)
│   ├── wf-process-documentation.yaml
│   ├── wf-clickup-advanced-setup.yaml
│   ├── wf-crm-implementation.yaml
│   ├── wf-launch-operations.yaml
│   ├── wf-content-operations.yaml
│   └── wf-support-setup.yaml
│
├── checklists/ (4)
│   ├── clickup-workspace-checklist.md
│   ├── crm-implementation-checklist.md
│   ├── process-documentation-checklist.md
│   └── launch-readiness-checklist.md
│
├── templates/ (9)
│   ├── template-project-brief.md
│   ├── template-task-complete.md
│   ├── template-crm-deal.md
│   ├── template-content-calendar.md
│   ├── template-launch-tracker.md
│   ├── template-space-structure.yaml
│   ├── response-templates.md
│   ├── automation-documentation.md
│   └── user-story-template.md
│
├── knowledge/ (4)
│   ├── README.md
│   ├── CLICKUP-BEST-PRACTICES.md
│   ├── AUTOMATION-PATTERNS.md
│   └── N8N-WORKFLOW-API-RULES.md
│
├── data/ (17)
│   ├── project-management-clickup-kb.md
│   ├── custom-fields-library.yaml
│   ├── automation-patterns-library.yaml
│   ├── launch-models-library.yaml
│   ├── lead-scoring-rules.yaml
│   ├── process-documentation-template.md
│   ├── knowledge-base-articles.md
│   ├── crm-natalia-tanaka-config.md
│   ├── crm-clickup-ids.json
│   ├── crm-webhooks.json
│   ├── n8n-workflows.json
│   ├── n8n-workflows-smart-routing.json
│   ├── mission-control-n8n-workflows.json
│   ├── mission-control-ids.json
│   ├── mission-control-automations-guide.md
│   ├── whatsapp-groups-mapping.json
│   └── notification-routing-strategy.md
│
├── scripts/ (14)
│   ├── setup-crm-clickup.cjs
│   ├── webhook-server.cjs
│   ├── setup-crm-webhooks.cjs
│   ├── setup-n8n-workflows.cjs
│   ├── test-crm-lead.cjs
│   ├── check-n8n-executions.cjs
│   ├── setup-mission-control.cjs
│   ├── setup-mission-control-views.cjs
│   ├── setup-mission-control-n8n.cjs
│   ├── notification-router.cjs
│   ├── deploy-smart-routing.cjs
│   ├── implement-smart-routing-n8n.mjs
│   ├── test-mission-control-v2.sh
│   └── mission-control-fix-n8n.sh
│
└── docs/ (3)
    ├── setup-crm-clickup-passo-a-passo.md
    ├── automacoes-crm-guia.md
    └── n8n-workflows-crm.md
```

---

## Metricas de Sucesso

| Area | Metrica | Meta |
|------|---------|------|
| Processos | Documentados e ativos no ClickUp | 100% |
| Lancamentos | Taxa de conversao | Benchmark por modelo |
| Conteudo | Publicacoes/semana | Conforme calendario |
| CRM | Conversao do pipeline | >20% |
| SaaS | Velocity estavel | Sprint over sprint |
| Suporte | CSAT | >4.5/5 |

---

## Versao

- **Squad:** project-management-clickup
- **Versao:** 2.0.0
- **Criado em:** 2025-02-03
- **Atualizado em:** 2026-02-10
- **Agentes:** 9
- **Tasks:** 9
- **Workflows:** 6
- **Templates:** 9
- **Knowledge:** 4
- **Metodologias:** GTD, PARA, Scrum, Kanban, PLF
