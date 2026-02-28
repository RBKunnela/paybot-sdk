# create-automations

**Task ID:** create-automations
**Squad:** project-management-clickup
**Type:** implementation
**Complexity:** medium
**Estimated Tokens:** 1500-2000

---

## Objetivo

Criar automações no ClickUp para eliminar trabalho manual repetitivo, melhorar consistência e acelerar workflows.

---

## Trigger Phrases

- "criar automação"
- "automatizar no ClickUp"
- "automação de workflow"
- "regra automática"
- "automação de status"

---

## Agents Envolvidos

| Agent | Role | Contribuição |
|-------|------|--------------|
| pm-orchestrator | Orchestrator | Coordena criação |
| automation-engineer | Lead | Design de automações |
| clickup-architect | ClickUp | Implementação técnica |

---

## Input Obrigatório

```yaml
automacao_input:
  contexto:
    space: "nome do space"
    folder: "nome do folder (opcional)"
    list: "nome da list (opcional)"

  problema:
    descricao: "o que queremos automatizar"
    frequencia: "quantas vezes isso acontece"
    tempo_manual: "quanto tempo leva manualmente"

  regra:
    quando: "trigger desejado"
    entao: "ação desejada"
```

---

## Framework de Automação

### FASE 1: Análise de Oportunidade (@pm-orchestrator)

```markdown
## 1. Identificação de Automações

### Categorias de Automação
| Categoria | Exemplo | Impacto |
|-----------|---------|---------|
| Status Transitions | Quando concluir → mover para próxima fase | Alto |
| Notificações | Quando atribuído → notificar por email | Médio |
| Field Updates | Quando status X → preencher campo Y | Médio |
| Task Creation | Quando novo item → criar subtasks | Alto |
| Due Date | Quando criado → set due date +7 dias | Médio |

### ROI da Automação
```
Economia por execução = Tempo manual × Custo hora
Economia mensal = Economia × Frequência mensal
ROI = Economia mensal / Tempo para criar
```

### Priorização
| Automação | Frequência | Tempo Manual | Economia | Prioridade |
|-----------|------------|--------------|----------|------------|
| [auto 1] | X/dia | Y min | R$ Z | P0 |
| [auto 2] | X/semana | Y min | R$ Z | P1 |
| [auto 3] | X/mês | Y min | R$ Z | P2 |
```

### FASE 2: Design da Automação (@automation-engineer)

```markdown
## 2. Estrutura da Automação

### Anatomia de uma Automação ClickUp
```
TRIGGER (Quando)
    │
    ├── Condition 1 (E/OU)
    ├── Condition 2 (E/OU)
    │
    ▼
ACTION(S) (Então)
    ├── Action 1
    ├── Action 2
    └── Action 3
```

### Triggers Disponíveis
| Trigger | Descrição | Uso Comum |
|---------|-----------|-----------|
| Status changes | Quando status muda | Workflow transitions |
| Assignee changes | Quando assignee muda | Notificações |
| Task created | Quando task é criada | Setup inicial |
| Due date arrives | Quando due date chega | Alertas |
| Custom field changes | Quando campo muda | Conditional logic |
| Task moved | Quando task muda de list | Cross-list workflows |
| Subtask completed | Quando subtask completa | Parent updates |

### Actions Disponíveis
| Action | Descrição | Parâmetros |
|--------|-----------|------------|
| Change status | Muda status | Status destino |
| Change assignee | Muda responsável | Pessoa/equipe |
| Add comment | Adiciona comentário | Texto, mentions |
| Set custom field | Define campo | Campo, valor |
| Create task | Cria nova task | Template/detalhes |
| Send email | Envia email | Destinatário, template |
| Add tag | Adiciona tag | Nome da tag |
| Set due date | Define prazo | Data ou offset |
| Move to list | Move task | List destino |

### Template de Especificação
```yaml
automation:
  name: "[Nome descritivo]"
  location:
    space: "[space]"
    folder: "[folder]" # opcional
    list: "[list]" # opcional

  trigger:
    type: "[tipo do trigger]"
    value: "[valor]"
    conditions:
      - field: "[campo]"
        operator: "equals | not_equals | contains"
        value: "[valor]"

  actions:
    - type: "[tipo da action]"
      params:
        key: value
    - type: "[tipo da action]"
      params:
        key: value
```
```

### FASE 3: Biblioteca de Automações (@automation-engineer)

```markdown
## 3. Automações Comuns (Templates)

### Workflow de Aprovação
```yaml
name: "Workflow de Aprovação"
trigger:
  type: status_changes
  value: "Aguardando Aprovação"
actions:
  - type: notify
    params:
      users: ["@aprovador"]
      message: "Nova tarefa aguardando sua aprovação"
  - type: set_due_date
    params:
      offset: "+24 hours"
```

### Auto-assign por Tipo
```yaml
name: "Auto-assign por Tipo"
trigger:
  type: task_created
conditions:
  - field: "Tipo"
    operator: "equals"
    value: "Design"
actions:
  - type: change_assignee
    params:
      user: "@designer"
  - type: add_tag
    params:
      tag: "design"
```

### Escalação de Atraso
```yaml
name: "Escalação de Atraso"
trigger:
  type: due_date_arrives
  offset: "+1 day"
conditions:
  - field: "Status"
    operator: "not_equals"
    value: "Concluído"
actions:
  - type: change_priority
    params:
      priority: "Urgent"
  - type: notify
    params:
      users: ["@assignee", "@manager"]
      message: "⚠️ Tarefa atrasada!"
  - type: add_tag
    params:
      tag: "atrasado"
```

### Criação de Subtasks
```yaml
name: "Setup de Nova Feature"
trigger:
  type: task_created
  list: "Features"
actions:
  - type: create_subtask
    params:
      tasks:
        - "[ ] Criar spec"
        - "[ ] Design review"
        - "[ ] Implementar"
        - "[ ] Code review"
        - "[ ] QA"
        - "[ ] Deploy"
```

### Completar Parent quando Subtasks Completas
```yaml
name: "Auto-complete Parent"
trigger:
  type: all_subtasks_completed
actions:
  - type: change_status
    params:
      status: "Concluído"
  - type: add_comment
    params:
      text: "✅ Todas subtasks concluídas!"
```

### Mover para Próxima Fase
```yaml
name: "Transição de Fase"
trigger:
  type: status_changes
  value: "Concluído"
  list: "Fase 1"
actions:
  - type: move_to_list
    params:
      list: "Fase 2"
  - type: change_status
    params:
      status: "To Do"
  - type: notify
    params:
      users: ["@responsavel-fase-2"]
```
```

### FASE 4: Teste e Deploy (@clickup-architect)

```markdown
## 4. Implementação

### Checklist de Teste
- [ ] Trigger dispara corretamente
- [ ] Conditions filtram conforme esperado
- [ ] Todas actions executam
- [ ] Notificações chegam
- [ ] Não há loops infinitos
- [ ] Performance aceitável

### Casos de Teste
| Cenário | Input | Output Esperado | Passou |
|---------|-------|-----------------|--------|
| Happy path | [input] | [output] | ✅/❌ |
| Edge case 1 | [input] | [output] | ✅/❌ |
| Edge case 2 | [input] | [output] | ✅/❌ |

### Prevenção de Loops
```
⚠️ CUIDADO com loops infinitos:

RUIM:
Trigger: Status → "Review"
Action: Change status → "In Progress"
→ E ter outra automação que volta para "Review"

BOM:
- Adicionar condition que previne re-trigger
- Usar campos auxiliares para controle
- Testar em ambiente isolado primeiro
```

### Documentação
```markdown
## Automação: [Nome]

**ID:** [id no ClickUp]
**Criada em:** [data]
**Autor:** [nome]

### Descrição
[O que faz e por quê]

### Configuração
- Trigger: [descrição]
- Conditions: [descrição]
- Actions: [descrição]

### Observações
[Notas importantes, edge cases, etc]
```
```

---

## Output Esperado

```markdown
# AUTOMAÇÕES CRIADAS

**Workspace:** [workspace]
**Data:** [data]
**Criado por:** PM ClickUp Squad

---

## Automações Implementadas

| # | Nome | Trigger | Action | Status |
|---|------|---------|--------|--------|
| 1 | [nome] | [trigger] | [action] | ✅ Ativo |
| 2 | [nome] | [trigger] | [action] | ✅ Ativo |
| 3 | [nome] | [trigger] | [action] | ✅ Ativo |

---

## Economia Estimada

| Automação | Frequência | Economia/Exec | Economia/Mês |
|-----------|------------|---------------|--------------|
| [auto 1] | X/dia | Y min | Z horas |
| **Total** | - | - | **W horas** |

---

## Documentação Técnica

[Especificação de cada automação]

---

## Próximos Passos

1. [ ] Monitorar por 1 semana
2. [ ] Ajustar conforme feedback
3. [ ] Documentar casos edge
4. [ ] Treinar equipe
```

---

## Completion Criteria

- [ ] Automações identificadas e priorizadas
- [ ] Especificações documentadas
- [ ] Implementadas no ClickUp
- [ ] Testadas com casos reais
- [ ] Sem loops infinitos
- [ ] Equipe notificada
- [ ] Documentação entregue

---

## Related Files

- tasks/setup-clickup-workspace.md
- checklists/clickup-setup-checklist.md

---

## Version

```yaml
version: 1.0.0
created: 2026-02-04
author: Squad Creator
last_update: 2026-02-04
```
