# Mission Control - Guia de Automações (ClickUp UI)

> A ClickUp API v2 NÃO suporta criação de automações.
> Todas devem ser criadas manualmente no UI.

## Onde criar

Space **MISSION CONTROL** > Settings > Automations

---

## Automação 1: Auto-Triage

**Objetivo:** Quando uma task chega com Squad preenchido, avança automaticamente para aprovação.

- **Trigger:** When STATUS changes to `inbox`
- **Condition:** Custom Field "Squad" IS SET
- **Action:** Change STATUS to `awaiting approval`

---

## Automação 2: Auto-Route por Squad

**Objetivo:** Quando uma task é aprovada e vai pro backlog, move automaticamente para a folder do squad correspondente.

Para **CADA folder**, criar uma automação separada:

| Folder | ID | Squads (Custom Field "Squad") |
|--------|-----|------|
| Content Ecosystem | 901316955023 | content-ecosystem, youtube-lives |
| Copywriting | 901316955027 | copywriting |
| Creative Studio | 901316955029 | creative-studio |
| Full Stack Dev | 901316955032 | full-stack-dev, aios-core-dev |
| Funnel Creator | 901316955033 | funnel-creator |
| Media Buy | 901316955034 | media-buy |
| Data & Research | 901316955035 | data-analytics, deep-scraper |
| Sales | 901316955038 | sales |
| Infoproduct Creation | 901316955040 | infoproduct-creation |
| Design System | 901316955041 | design-system |
| Suporte e Comunidade | 901316955046 | communication-nt, community-nt, strategy-nt |
| Operations | 901316955050 | project-management, devops |
| Advisory | 901316955051 | conselho |

**Config para cada:**
- **Trigger:** When STATUS changes to `backlog`
- **Condition:** Custom Field "Squad" IS `{squad-value}`
- **Action:** Move task to `{Folder Name}` > first list

---

## Automação 3: Priority Due Date

**Objetivo:** Definir due date automaticamente baseado na prioridade.

Criar **4 automações separadas**:

| Priority | Due Date |
|----------|----------|
| Urgent | today + 1 day |
| High | today + 3 days |
| Normal | today + 7 days |
| Low | today + 14 days |

**Config para cada:**
- **Trigger:** When PRIORITY is set to `{priority}`
- **Action:** Set due date = `today + {N} days`

---

## Automação 4: Archive Done Tasks

**Objetivo:** Arquivar tasks 30 dias após conclusão.

- **Trigger:** When STATUS changes to `done`
- **Wait:** 30 days
- **Action:** Change STATUS to `archived`

> Nota: O status "done" é o tipo "closed" no ClickUp. "archived" não existe como status — na prática, considerar usar "Close task" como action.

---

## Automação 5: Notify on Assignment (via n8n)

**Objetivo:** Notificar via WhatsApp quando task é atribuída.

- **Implementação:** Via n8n webhook + WAHA WhatsApp
- **Status:** Pendente (requer n8n ativo)
- **Depende de:** Phase 4 — n8n workflows ativos

---

## Total de automações a criar

| Tipo | Quantidade |
|------|-----------|
| Auto-Triage | 1 |
| Auto-Route (por folder) | 13 |
| Priority Due Date | 4 |
| Archive Done | 1 |
| **Total** | **19** |
