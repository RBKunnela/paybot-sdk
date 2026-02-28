# diagnose-process

**Task ID:** diagnose-process
**Squad:** project-management-clickup
**Type:** diagnosis
**Complexity:** medium
**Estimated Tokens:** 1500-2000

---

## Objetivo

Diagnosticar um processo não documentado ou mal estruturado, identificando etapas, responsáveis, gargalos e oportunidades de melhoria antes de estruturar no ClickUp.

---

## Trigger Phrases

- "diagnosticar processo"
- "mapear processo"
- "entender fluxo"
- "documentar processo"
- "processo não documentado"

---

## Agents Envolvidos

| Agent | Role | Contribuição |
|-------|------|--------------|
| pm-orchestrator | Orchestrator | Coordena diagnóstico |
| process-diagnostician | Lead | Mapeamento e análise |
| clickup-architect | ClickUp | Tradução para estrutura |

---

## Input Obrigatório

```yaml
processo_input:
  identificacao:
    nome: "nome do processo"
    area: "marketing, vendas, operações, etc"
    frequencia: "diário, semanal, por demanda"

  contexto:
    responsavel_atual: "quem executa hoje"
    ferramentas_usadas: ["WhatsApp", "planilha", "etc"]
    dores: ["demora", "erros", "falta visibilidade"]

  objetivo:
    resultado_esperado: "o que queremos alcançar"
    metricas_sucesso: ["tempo de execução", "erros", "etc"]
```

---

## Framework de Diagnóstico

### FASE 1: Entrevista e Observação (@process-diagnostician)

```markdown
## 1. Descoberta do Processo

### Perguntas de Descoberta
1. **Trigger:** O que inicia este processo?
2. **Input:** Que informações são necessárias para começar?
3. **Etapas:** Quais são os passos do início ao fim?
4. **Output:** Qual é o resultado final esperado?
5. **Exceções:** O que pode dar errado? Como é tratado?

### Mapeamento "As-Is"
```
TRIGGER: [o que inicia]
    │
    ▼
┌─────────────┐
│  ETAPA 1    │ Responsável: [quem]
│  [descrição]│ Ferramenta: [qual]
│             │ Tempo: [quanto]
└─────────────┘
    │
    ▼
┌─────────────┐
│  ETAPA 2    │ Responsável: [quem]
│  [descrição]│ Ferramenta: [qual]
│             │ Tempo: [quanto]
└─────────────┘
    │
    ▼
   ...
    │
    ▼
┌─────────────┐
│   OUTPUT    │
│  [resultado]│
└─────────────┘
```

### Participantes Identificados
| Papel | Nome | Responsabilidades |
|-------|------|-------------------|
| Owner | [nome] | Responsável final |
| Executor | [nome] | Executa etapas |
| Aprovador | [nome] | Aprova entregas |
| Interessado | [nome] | Recebe output |
```

### FASE 2: Análise de Gargalos (@process-diagnostician)

```markdown
## 2. Identificação de Problemas

### Gargalos Encontrados
| # | Gargalo | Etapa | Impacto | Frequência |
|---|---------|-------|---------|------------|
| 1 | [descrição] | [etapa] | Alto/Médio/Baixo | Sempre/Às vezes |
| 2 | [descrição] | [etapa] | Alto/Médio/Baixo | Sempre/Às vezes |

### Tipos de Desperdício (Lean)
- [ ] **Espera:** Tempo parado esperando aprovação/informação
- [ ] **Movimento:** Buscar informações em múltiplos lugares
- [ ] **Transporte:** Mover dados entre ferramentas
- [ ] **Retrabalho:** Refazer por falta de clareza
- [ ] **Estoque:** Tarefas acumuladas sem processamento
- [ ] **Processamento extra:** Etapas desnecessárias
- [ ] **Defeitos:** Erros que precisam correção

### Matriz de Impacto
| Problema | Impacto no Tempo | Impacto na Qualidade | Impacto no Custo |
|----------|-----------------|---------------------|------------------|
| [problema 1] | ⬆️ +X horas | ⬇️ -Y% qualidade | ⬆️ +R$ Z |
| [problema 2] | ⬆️ +X horas | ⬇️ -Y% qualidade | ⬆️ +R$ Z |

### Root Cause Analysis (5 Porquês)
**Problema:** [problema principal]

1. Por quê? [resposta 1]
2. Por quê? [resposta 2]
3. Por quê? [resposta 3]
4. Por quê? [resposta 4]
5. Por quê? [resposta 5] ← Causa raiz
```

### FASE 3: Métricas Atuais (@pm-orchestrator)

```markdown
## 3. Baseline de Métricas

### Métricas de Tempo
| Métrica | Valor Atual | Meta | Gap |
|---------|-------------|------|-----|
| Tempo total do processo | X horas/dias | Y | Z |
| Tempo por etapa | [breakdown] | - | - |
| Tempo de espera | X horas | Y | Z |

### Métricas de Qualidade
| Métrica | Valor Atual | Meta | Gap |
|---------|-------------|------|-----|
| Taxa de erro | X% | Y% | Z% |
| Retrabalho | X% | Y% | Z% |
| Satisfação (se aplicável) | X/10 | Y | Z |

### Métricas de Volume
| Métrica | Valor Atual | Tendência |
|---------|-------------|-----------|
| Execuções por período | X/semana | ↑/↓/→ |
| Backlog atual | X itens | ↑/↓/→ |
| Capacidade | X/pessoa/dia | - |
```

### FASE 4: Recomendações (@clickup-architect)

```markdown
## 4. Oportunidades de Melhoria

### Quick Wins (Implementar imediato)
| # | Melhoria | Impacto | Esforço |
|---|----------|---------|---------|
| 1 | [melhoria] | Alto | Baixo |
| 2 | [melhoria] | Médio | Baixo |

### Melhorias de Médio Prazo
| # | Melhoria | Impacto | Esforço | Dependências |
|---|----------|---------|---------|--------------|
| 1 | [melhoria] | Alto | Médio | [deps] |
| 2 | [melhoria] | Alto | Médio | [deps] |

### Estrutura Sugerida no ClickUp
```
📁 Space: [Área]
└── 📁 Folder: [Processo]
    ├── 📋 List: Backlog
    ├── 📋 List: Em Andamento
    ├── 📋 List: Aguardando Aprovação
    └── 📋 List: Concluído
```

### Automações Recomendadas
| Trigger | Ação | Benefício |
|---------|------|-----------|
| Status → Em Andamento | Notificar responsável | Visibilidade |
| Status → Aprovação | Notificar aprovador | Agilidade |
| Due date próximo | Alert | Prevenção atraso |
```

---

## Output Esperado

```markdown
# DIAGNÓSTICO DE PROCESSO

**Processo:** [nome]
**Data:** [data]
**Diagnosticado por:** PM ClickUp Squad

---

## Resumo Executivo

| Aspecto | Situação Atual | Alvo |
|---------|---------------|------|
| Tempo total | X horas | Y horas (-Z%) |
| Taxa de erro | X% | Y% |
| Documentação | Inexistente/Parcial | Completa |
| Automação | Manual | Parcial/Total |

---

## Mapa do Processo Atual

[Diagrama do fluxo]

---

## Problemas Identificados

1. **[Problema #1]** - Impacto: [alto/médio/baixo]
   - Causa: [causa raiz]
   - Solução: [solução]

2. **[Problema #2]** - Impacto: [alto/médio/baixo]
   - Causa: [causa raiz]
   - Solução: [solução]

---

## Plano de Ação

### Imediato (Esta semana)
- [ ] [Ação 1]
- [ ] [Ação 2]

### Curto prazo (Próximas 2 semanas)
- [ ] [Ação 3]
- [ ] [Ação 4]

---

## Próximos Passos

1. Aprovar diagnóstico com stakeholders
2. Executar task: setup-clickup-workspace
3. Implementar automações
4. Treinar equipe
5. Monitorar métricas
```

---

## Completion Criteria

- [ ] Processo mapeado "as-is"
- [ ] Participantes identificados
- [ ] Gargalos documentados
- [ ] Métricas baseline coletadas
- [ ] Causa raiz identificada
- [ ] Recomendações priorizadas
- [ ] Estrutura ClickUp sugerida
- [ ] Plano de ação definido

---

## Related Files

- tasks/setup-clickup-workspace.md
- checklists/process-documentation-checklist.md

---

## Version

```yaml
version: 1.0.0
created: 2026-02-04
author: Squad Creator
last_update: 2026-02-04
```
