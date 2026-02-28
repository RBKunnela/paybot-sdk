# setup-support-system

**Task ID:** setup-support-system
**Squad:** project-management-clickup
**Type:** setup
**Complexity:** high
**Estimated Tokens:** 2000-2500

---

## Objetivo

Configurar sistema completo de suporte ao cliente no ClickUp, incluindo tickets, SLAs, knowledge base, workflows de escalacao e metricas de atendimento.

---

## Trigger Phrases

- "setup suporte no clickup"
- "sistema de tickets"
- "configurar atendimento ao cliente"
- "SLA de suporte"
- "knowledge base"

---

## Agents Envolvidos

| Agent | Role | Contribuicao |
|-------|------|--------------|
| pm-orchestrator | Orchestrator | Coordena setup |
| support-operations-specialist | Lead | Metodologia de suporte |
| clickup-architect | ClickUp | Estrutura tecnica |
| automation-engineer | Automacoes | SLA e escalacao automatica |

---

## Input Obrigatorio

```yaml
support_input:
  channels:
    type: list
    required: true
    example: ["WhatsApp", "Email", "Instagram DM"]

  team_size:
    type: number
    required: true
    example: 2

  products:
    type: list
    required: true
    example: ["Agenda Magica", "Cura Pelas Maos", "MAV"]

  sla_targets:
    type: object
    required: false
    example:
      critical: "4h"
      normal: "24h"
      low: "72h"
```

---

## Steps

### Step 1: Diagnostico de Suporte Atual
```yaml
action: elicit
agent: support-operations-specialist
questions:
  - "Quais canais de atendimento voce usa?"
  - "Quantas pessoas atendem suporte?"
  - "Quais os tipos de chamado mais frequentes?"
  - "Tem algum SLA definido hoje?"
  - "Usa alguma ferramenta de suporte atual?"
```

### Step 2: Criar Estrutura ClickUp
```yaml
action: execute
agent: clickup-architect
tasks:
  - "Criar Space SUPORTE (ou List dentro de Space existente)"
  - "Criar Lists: Tickets Abertos, Em Atendimento, Resolvidos"
  - "Configurar statuses de suporte"
  - "Configurar custom fields de suporte"
  - "Criar Formulario de intake de tickets"
  - "Criar views especializadas"
```

### Step 3: Configurar SLAs e Escalacao
```yaml
action: execute
agent: support-operations-specialist
tasks:
  - "Definir SLAs por tipo de ticket"
  - "Criar matriz de escalacao (L1 > L2 > L3)"
  - "Configurar prioridades automaticas"
  - "Definir horario de atendimento"
```

### Step 4: Knowledge Base
```yaml
action: execute
agent: support-operations-specialist
tasks:
  - "Criar List de FAQ / Knowledge Base"
  - "Popular com artigos iniciais (ver data/knowledge-base-articles.md)"
  - "Configurar templates de resposta (ver templates/response-templates.md)"
  - "Criar workflow de criacao de novos artigos"
```

### Step 5: Automacoes de Suporte
```yaml
action: execute
agent: automation-engineer
tasks:
  - "Automacao: Novo ticket → Atribuicao round-robin"
  - "Automacao: SLA proximo de estourar → Escalar"
  - "Automacao: Ticket sem resposta 48h → Notificar"
  - "Automacao: Ticket resolvido → Enviar pesquisa de satisfacao"
  - "Setup n8n: WhatsApp incoming → Criar ticket ClickUp"
```

### Step 6: Dashboard de Suporte
```yaml
action: execute
agent: support-operations-specialist
tasks:
  - "Criar dashboard de suporte"
  - "Widgets: Tickets abertos, SLA compliance, Tempo medio, Satisfacao"
  - "Relatorio semanal automatizado"
```

---

## Output

```yaml
output:
  type: clickup_workspace
  includes:
    - "Sistema de tickets configurado"
    - "SLAs definidos e automatizados"
    - "Knowledge base com artigos iniciais"
    - "Templates de resposta prontos"
    - "Automacoes de escalacao ativas"
    - "Dashboard de metricas"
    - "Formulario de intake"
```

---

## Acceptance Criteria

- [ ] Space/List de suporte criado com hierarquia
- [ ] Statuses configurados (Novo > Em Atendimento > Aguardando > Resolvido > Fechado)
- [ ] Custom fields aplicados (Canal, Tipo Ticket, SLA, Satisfacao)
- [ ] SLAs definidos e automacoes de escalacao ativas
- [ ] Knowledge base com pelo menos 10 artigos
- [ ] Templates de resposta prontos para uso
- [ ] Dashboard com metricas de atendimento
- [ ] Formulario de intake funcional
