# weekly-review

**Task ID:** weekly-review
**Squad:** project-management-clickup
**Type:** review
**Complexity:** low
**Estimated Tokens:** 1000-1500

---

## Objetivo

Executar o processo de review semanal (GTD) para garantir que todos os projetos, tarefas e processos estao em dia, identificando bloqueios e definindo prioridades da proxima semana.

---

## Trigger Phrases

- "weekly review"
- "revisao semanal"
- "review da semana"
- "como estao os projetos"
- "o que preciso fazer essa semana"

---

## Agents Envolvidos

| Agent | Role | Contribuicao |
|-------|------|--------------|
| pm-orchestrator | Lead | Conduz o review |

---

## Steps

### Step 1: Coletar Status
```yaml
action: execute
agent: pm-orchestrator
tasks:
  - "Listar todos os projetos ativos (Folders com tasks abertas)"
  - "Identificar tasks atrasadas (Due Date < Today, Status != Done)"
  - "Identificar tasks bloqueadas (Status = Blocked)"
  - "Listar tasks concluidas na semana"
tools:
  - mcp__clickup__searchTasks
  - mcp__clickup__getListInfo
```

### Step 2: Processar Inbox
```yaml
action: elicit
agent: pm-orchestrator
prompt: |
  Revise as tasks na Inbox/Backlog e para cada uma, decida:

  1. **Fazer** — Mover para To Do com due date
  2. **Delegar** — Atribuir a alguem
  3. **Agendar** — Colocar due date futuro
  4. **Referencia** — Mover para Recursos
  5. **Eliminar** — Fechar como nao necessario
```

### Step 3: Revisar Projetos Ativos
```yaml
action: elicit
agent: pm-orchestrator
questions:
  - "Para cada projeto ativo, perguntar:"
  - "Qual o status geral? (on track / at risk / blocked)"
  - "Proxximo milestone?"
  - "Precisa de alguma acao imediata?"
```

### Step 4: Definir Prioridades da Semana
```yaml
action: execute
agent: pm-orchestrator
tasks:
  - "Listar top 5 prioridades para a proxima semana"
  - "Verificar capacidade da equipe"
  - "Identificar dependencias entre prioridades"
  - "Atualizar due dates se necessario"
```

### Step 5: Gerar Resumo
```yaml
action: output
agent: pm-orchestrator
template: |
  ## Weekly Review - Semana de {data}

  ### Status Geral
  - Projetos ativos: {N}
  - Tasks concluidas esta semana: {N}
  - Tasks atrasadas: {N}
  - Tasks bloqueadas: {N}

  ### Conquistas da Semana
  - {lista de entregas}

  ### Alertas
  - {tasks atrasadas ou bloqueadas}

  ### Prioridades Proxima Semana
  1. {prioridade 1}
  2. {prioridade 2}
  3. {prioridade 3}
  4. {prioridade 4}
  5. {prioridade 5}

  ### Acoes Necessarias
  - {acoes imediatas}
```

---

## Output

```yaml
output:
  type: report
  format: markdown
  includes:
    - "Status de todos os projetos"
    - "Tasks atrasadas e bloqueadas"
    - "Prioridades da proxima semana"
    - "Acoes necessarias"
```

---

## Acceptance Criteria

- [ ] Todos os projetos ativos revisados
- [ ] Inbox processada (zero items nao classificados)
- [ ] Tasks atrasadas identificadas com plano de acao
- [ ] Top 5 prioridades definidas para proxima semana
- [ ] Resumo formatado e entregue
