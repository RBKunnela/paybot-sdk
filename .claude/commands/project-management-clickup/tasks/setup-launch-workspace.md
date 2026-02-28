# setup-launch-workspace

**Task ID:** setup-launch-workspace
**Squad:** project-management-clickup
**Type:** setup
**Complexity:** high
**Estimated Tokens:** 2000-2500

---

## Objetivo

Configurar workspace completo no ClickUp para gerenciar um lançamento de infoproduto, seguindo a metodologia Fórmula de Lançamento (PLF) com todas as fases, checklists e automações.

---

## Trigger Phrases

- "setup lançamento"
- "preparar lançamento no ClickUp"
- "estruturar lançamento"
- "workspace de lançamento"
- "organizar lançamento"

---

## Agents Envolvidos

| Agent | Role | Contribuição |
|-------|------|--------------|
| pm-orchestrator | Orchestrator | Coordena setup |
| launch-operations-manager | Lead | Metodologia de lançamento |
| clickup-architect | ClickUp | Estrutura técnica |
| automation-engineer | Automações | Workflows automatizados |

---

## Input Obrigatório

```yaml
lancamento_input:
  identificacao:
    nome_lancamento: "Nome do Lançamento"
    produto: "Nome do Produto"
    data_abertura: "DD/MM/YYYY"
    data_fechamento: "DD/MM/YYYY"

  tipo:
    modelo: "classico | interno | semente | relampago"
    ticket: "low | mid | high"
    estrutura_vendas: "perpetuo_depois | unico"

  equipe:
    responsaveis:
      estrategia: "nome"
      trafego: "nome"
      copy: "nome"
      design: "nome"
      suporte: "nome"

  metas:
    faturamento: "R$ X"
    leads: "X leads"
    conversao: "X%"
```

---

## Framework de Setup

### FASE 1: Estrutura de Spaces/Folders (@clickup-architect)

```markdown
## 1. Hierarquia ClickUp

### Estrutura Completa
```
📁 Space: Lançamentos
└── 📁 Folder: [Nome do Lançamento] - [Mês/Ano]
    │
    ├── 📋 List: 🎯 Overview
    │   └── Tasks: Dashboard, Metas, Timeline
    │
    ├── 📁 Folder: 1️⃣ PPL (Pré-Pré-Lançamento)
    │   ├── 📋 Estratégia
    │   ├── 📋 Conteúdo Aquecimento
    │   ├── 📋 Setup Técnico
    │   └── 📋 Tráfego Captação
    │
    ├── 📁 Folder: 2️⃣ PL (Pré-Lançamento)
    │   ├── 📋 CPL 1
    │   ├── 📋 CPL 2
    │   ├── 📋 CPL 3
    │   ├── 📋 CPL 4
    │   └── 📋 Engajamento
    │
    ├── 📁 Folder: 3️⃣ L (Lançamento)
    │   ├── 📋 Evento Principal
    │   ├── 📋 Abertura Carrinho
    │   ├── 📋 Vendas (D1-D7)
    │   └── 📋 Fechamento
    │
    ├── 📁 Folder: 4️⃣ PÓS (Pós-Lançamento)
    │   ├── 📋 Onboarding Alunos
    │   ├── 📋 Análise de Resultados
    │   └── 📋 Documentação
    │
    └── 📁 Folder: 📊 Métricas
        ├── 📋 KPIs Diários
        └── 📋 Reports
```

### Custom Fields por Fase
| Field | Tipo | Opções | Uso |
|-------|------|--------|-----|
| Fase | Dropdown | PPL, PL, L, Pós | Filtro |
| Prioridade | Dropdown | P0, P1, P2 | Urgência |
| Responsável Squad | Dropdown | Tráfego, Copy, Design, Tech | Área |
| Status Aprovação | Dropdown | Pendente, Aprovado, Recusado | Workflow |
| Data Go-Live | Date | - | Deadline |
| Dependência Externa | Checkbox | - | Blocker |
```

### FASE 2: Tasks por Fase PLF (@launch-operations-manager)

```markdown
## 2. Checklist de Tasks

### PPL - Pré-Pré-Lançamento (4-8 semanas antes)

#### Estratégia
- [ ] Definir avatar e dores principais
- [ ] Mapear objeções e como tratar
- [ ] Definir oferta e bônus
- [ ] Criar timeline do lançamento
- [ ] Definir metas (leads, faturamento, ROAS)

#### Conteúdo Aquecimento
- [ ] Planejar série de aquecimento (posts, stories)
- [ ] Criar conteúdo de antecipação
- [ ] Preparar sequência de emails PPL
- [ ] Gravar vídeos de aquecimento

#### Setup Técnico
- [ ] Configurar página de captura
- [ ] Configurar automações de email
- [ ] Configurar pixel e tracking
- [ ] Testar fluxo completo de captura
- [ ] Setup checkout e ofertas

#### Tráfego Captação
- [ ] Criar públicos de campanha
- [ ] Desenvolver criativos (imagem + vídeo)
- [ ] Configurar campanhas no Ads Manager
- [ ] Definir orçamento por fase

### PL - Pré-Lançamento (1-2 semanas)

#### CPL 1 - Oportunidade
- [ ] Roteiro aprovado
- [ ] Vídeo gravado e editado
- [ ] Página do CPL 1 criada
- [ ] Emails de entrega configurados
- [ ] Tráfego de entrega ativo

#### CPL 2 - Transformação
- [ ] Roteiro aprovado
- [ ] Vídeo gravado e editado
- [ ] Página do CPL 2 criada
- [ ] Emails de entrega configurados

#### CPL 3 - Experiência de Dono
- [ ] Roteiro aprovado
- [ ] Vídeo gravado e editado
- [ ] Página do CPL 3 criada
- [ ] Emails de entrega configurados

#### CPL 4 - Oferta
- [ ] Roteiro aprovado
- [ ] Vídeo gravado e editado
- [ ] Página do CPL 4 / Vendas criada
- [ ] Checkout configurado e testado

### L - Lançamento (5-7 dias)

#### Evento Principal
- [ ] Setup StreamYard/plataforma
- [ ] Roteiro da live aprovado
- [ ] Slides preparados
- [ ] Teste técnico realizado
- [ ] Notificações agendadas

#### Abertura Carrinho
- [ ] Página de vendas final
- [ ] Email de abertura
- [ ] WhatsApp de abertura
- [ ] Tráfego de vendas ativo

#### Vendas D1-D7
- [ ] Emails diários de reforço
- [ ] Stories diários
- [ ] Tratamento de objeções
- [ ] Remarketing ativo
- [ ] Monitoramento de métricas

#### Fechamento
- [ ] Sequência de urgência
- [ ] Último email (última chance)
- [ ] Contagem regressiva
- [ ] Fechar carrinho

### PÓS - Pós-Lançamento

#### Onboarding
- [ ] Email de boas-vindas
- [ ] Acesso liberado
- [ ] Sequência de onboarding
- [ ] Suporte ativo

#### Análise
- [ ] Coletar todas as métricas
- [ ] Calcular ROI e ROAS
- [ ] Documentar aprendizados
- [ ] Planejar melhorias
```

### FASE 3: Automações (@automation-engineer)

```markdown
## 3. Automações ClickUp

### Automação 1: Notificação de Aprovação
```yaml
trigger: Status changes to "Aguardando Aprovação"
action:
  - Notify: @responsavel-aprovacao
  - Set due date: +24 hours
  - Add comment: "Aguardando sua aprovação"
```

### Automação 2: Blocker Alert
```yaml
trigger: Custom field "Dependência Externa" = checked
action:
  - Change priority: P0
  - Add tag: "BLOCKER"
  - Notify: @pm-orchestrator
```

### Automação 3: Fase Transition
```yaml
trigger: All tasks in folder completed
action:
  - Update parent task status
  - Notify: @equipe
  - Add celebration comment 🎉
```

### Automação 4: Daily Standup
```yaml
trigger: Every day at 9:00 AM
action:
  - Create task: "Daily Check - [date]"
  - Assign: @lead
  - Add checklist from template
```

### Automação 5: Deadline Approaching
```yaml
trigger: 24 hours before due date AND status != "Concluído"
action:
  - Notify: @assignee, @manager
  - Change priority: P0
  - Add comment: "⚠️ Deadline em 24h"
```
```

### FASE 4: Views e Dashboards (@clickup-architect)

```markdown
## 4. Views Customizadas

### View: Timeline do Lançamento (Gantt)
```
Configuração:
- Group by: Fase
- Sort by: Due date
- Show: Dependencies
- Filter: Status != Concluído
```

### View: Board por Status (Kanban)
```
Colunas:
- Backlog
- Em Andamento
- Aguardando Aprovação
- Concluído
Group by: Responsável
```

### View: Métricas Diárias (Table)
```
Columns:
- Data
- Leads captados
- Investimento
- CPL
- Conversões
- ROAS
```

### Dashboard do Lançamento
```
┌─────────────────────────────────────────────────────┐
│  🎯 DASHBOARD: [Nome do Lançamento]                 │
├─────────────────────────────────────────────────────┤
│  Scorecards:                                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Leads   │ │ Conv.   │ │ Fat.    │ │ ROAS    │   │
│  │  X      │ │  Y%     │ │ R$ Z    │ │  W.Wx   │   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
├─────────────────────────────────────────────────────┤
│  Progresso por Fase:                                │
│  PPL ████████░░ 80%                                 │
│  PL  ███░░░░░░░ 30%                                 │
│  L   ░░░░░░░░░░ 0%                                  │
├─────────────────────────────────────────────────────┤
│  Tasks Atrasadas: X    │    Blockers: Y            │
├─────────────────────────────────────────────────────┤
│  Timeline (próximos 7 dias)                         │
│  [Gantt mini view]                                  │
└─────────────────────────────────────────────────────┘
```
```

---

## Output Esperado

```markdown
# WORKSPACE DE LANÇAMENTO

**Lançamento:** [nome]
**Produto:** [produto]
**Período:** [datas]
**Criado por:** PM ClickUp Squad

---

## Estrutura Criada

### Spaces/Folders
- [x] Space: Lançamentos
- [x] Folder: [Nome] com subfolders por fase
- [x] Lists por área

### Custom Fields
- [x] Fase
- [x] Prioridade
- [x] Responsável Squad
- [x] Status Aprovação
- [x] Data Go-Live

### Tasks Criadas
- PPL: X tasks
- PL: X tasks
- L: X tasks
- Pós: X tasks
- **Total:** X tasks

### Automações
- [x] Notificação de aprovação
- [x] Alert de blockers
- [x] Transição de fase
- [x] Daily standup
- [x] Deadline approaching

### Views
- [x] Timeline (Gantt)
- [x] Board (Kanban)
- [x] Table de métricas
- [x] Dashboard

---

## Próximos Passos

1. [ ] Treinar equipe no uso do workspace
2. [ ] Começar tasks do PPL
3. [ ] Configurar integrações (se necessário)
4. [ ] Agendar daily standups
```

---

## Completion Criteria

- [ ] Estrutura de folders criada
- [ ] Custom fields configurados
- [ ] Tasks de todas as fases criadas
- [ ] Automações implementadas
- [ ] Views customizadas criadas
- [ ] Dashboard configurado
- [ ] Equipe com acesso
- [ ] Documentação entregue

---

## Related Files

- checklists/launch-readiness-checklist.md
- workflows/wf-launch-operations.yaml
- templates/template-launch-tracker.md

---

## Version

```yaml
version: 1.0.0
created: 2026-02-04
author: Squad Creator
last_update: 2026-02-04
```
