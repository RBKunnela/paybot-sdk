# setup-saas-workspace

**Task ID:** setup-saas-workspace
**Squad:** project-management-clickup
**Type:** setup
**Complexity:** high
**Estimated Tokens:** 2000-2500

---

## Objetivo

Configurar workspace no ClickUp para gerenciar operacoes de produto SaaS, incluindo roadmap, sprints, bug tracking, releases e metricas de produto.

---

## Trigger Phrases

- "setup saas no clickup"
- "configurar gestao de produto"
- "roadmap no clickup"
- "sprint planning no clickup"
- "bug tracking no clickup"

---

## Agents Envolvidos

| Agent | Role | Contribuicao |
|-------|------|--------------|
| pm-orchestrator | Orchestrator | Coordena setup |
| saas-operations-specialist | Lead | Metodologia e processos SaaS |
| clickup-architect | ClickUp | Estrutura tecnica |
| automation-engineer | Automacoes | Sprint e release automations |

---

## Input Obrigatorio

```yaml
saas_input:
  product_name:
    type: string
    required: true
    example: "AIOS Core"

  team_size:
    type: number
    required: true
    example: 3

  sprint_duration:
    type: string
    required: true
    options: ["1 semana", "2 semanas"]
    default: "2 semanas"

  current_tools:
    type: list
    required: false
    example: ["GitHub Issues", "planilha"]
```

---

## Steps

### Step 1: Diagnostico Atual
```yaml
action: elicit
agent: saas-operations-specialist
questions:
  - "Qual produto SaaS estamos gerenciando?"
  - "Qual o tamanho da equipe de desenvolvimento?"
  - "Ja usa alguma ferramenta de gestao (GitHub Issues, Jira, etc)?"
  - "Qual a frequencia de releases?"
  - "Principais metricas que quer acompanhar?"
```

### Step 2: Criar Estrutura ClickUp
```yaml
action: execute
agent: clickup-architect
tasks:
  - "Criar Space PRODUTO (ou adicionar a existente)"
  - "Criar Folders: Roadmap, Sprints, Bugs, Releases"
  - "Criar Lists por fase"
  - "Configurar statuses de desenvolvimento"
  - "Configurar custom fields SaaS"
  - "Criar views essenciais"
```

### Step 3: Configurar Sprint System
```yaml
action: execute
agent: saas-operations-specialist
tasks:
  - "Definir template de Sprint"
  - "Configurar Sprint Backlog"
  - "Criar checklist de Sprint Planning"
  - "Criar checklist de Sprint Review"
  - "Setup de Story Points"
```

### Step 4: Configurar Automacoes
```yaml
action: execute
agent: automation-engineer
tasks:
  - "Automacao: Bug criado → Triagem automatica"
  - "Automacao: Sprint task done → Update velocity"
  - "Automacao: Release tag → Notificar equipe"
  - "Setup time tracking para sprints"
```

### Step 5: Dashboard e Metricas
```yaml
action: execute
agent: saas-operations-specialist
tasks:
  - "Criar dashboard de produto"
  - "Widgets: Velocity, Bug rate, Release frequency"
  - "Configurar Goals para OKRs de produto"
```

---

## Output

```yaml
output:
  type: clickup_workspace
  includes:
    - "Space PRODUTO configurado"
    - "Sprint system operacional"
    - "Bug tracking ativo"
    - "Dashboard de metricas"
    - "Automacoes configuradas"
    - "Documentacao de uso"
```

---

## Acceptance Criteria

- [ ] Space criado com hierarquia completa
- [ ] Statuses de dev configurados (Backlog > Sprint > Dev > Review > Testing > Deployed)
- [ ] Custom fields SaaS aplicados (Tipo Issue, Impacto, Sprint, Story Points)
- [ ] Views criadas (Kanban, Sprint Board, Backlog, My Tasks)
- [ ] Automacoes de sprint e bug tracking ativas
- [ ] Dashboard com pelo menos 3 widgets de metricas
