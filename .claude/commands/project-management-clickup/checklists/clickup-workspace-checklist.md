# ClickUp Workspace Checklist

Use este checklist para validar a qualidade de uma configuração de workspace ClickUp.

## Metadata
```yaml
id: clickup-workspace-checklist
name: Checklist de Workspace ClickUp
version: 1.0.0
executor: clickup-architect
related_task: setup-clickup-workspace
```

---

## Fase 1: Estrutura Hierárquica

### Spaces
| # | Check | Status | Notas |
|---|-------|--------|-------|
| 1 | Spaces organizados por área/departamento? | [ ] | |
| 2 | Nomenclatura consistente? | [ ] | |
| 3 | Ícones/cores diferenciados? | [ ] | |
| 4 | Permissões configuradas? | [ ] | |

### Folders
| # | Check | Status |
|---|-------|--------|
| 5 | Folders agrupam Lists relacionadas? | [ ] |
| 6 | Não há folders vazios? | [ ] |
| 7 | Hierarquia faz sentido lógico? | [ ] |

### Lists
| # | Check | Status |
|---|-------|--------|
| 8 | Cada List tem propósito claro? | [ ] |
| 9 | Nomenclatura indica conteúdo? | [ ] |
| 10 | Templates de List configurados? | [ ] |

**Score Estrutura:** ___/10

---

## Fase 2: Custom Fields

### Configuração
| # | Check | Status |
|---|-------|--------|
| 11 | Campos relevantes para cada List? | [ ] |
| 12 | Tipos de campo corretos? | [ ] |
| 13 | Dropdowns com opções completas? | [ ] |
| 14 | Campos obrigatórios marcados? | [ ] |
| 15 | Campos padrão removidos se não usados? | [ ] |

### Organização
| # | Check | Status |
|---|-------|--------|
| 16 | Campos ordenados logicamente? | [ ] |
| 17 | Descrições/tooltips adicionados? | [ ] |
| 18 | Campos reutilizáveis entre Lists? | [ ] |

**Score Custom Fields:** ___/8

---

## Fase 3: Views

### Views Essenciais
| # | Check | Status |
|---|-------|--------|
| 19 | View padrão definida para cada List? | [ ] |
| 20 | Board view para fluxos de status? | [ ] |
| 21 | List view para detalhamento? | [ ] |
| 22 | Calendar view para datas? | [ ] |

### Configuração de Views
| # | Check | Status |
|---|-------|--------|
| 23 | Filtros salvos? | [ ] |
| 24 | Agrupamentos úteis? | [ ] |
| 25 | Colunas visíveis relevantes? | [ ] |
| 26 | Ordenação padrão? | [ ] |

**Score Views:** ___/8

---

## Fase 4: Statuses

| # | Check | Status |
|---|-------|--------|
| 27 | Statuses refletem fluxo real? | [ ] |
| 28 | Cores diferenciadas e lógicas? | [ ] |
| 29 | Status "fechados" definidos? | [ ] |
| 30 | Não há statuses redundantes? | [ ] |
| 31 | Ordem dos statuses é sequencial? | [ ] |

**Score Statuses:** ___/5

---

## Fase 5: Automações

### Automações Básicas
| # | Check | Status |
|---|-------|--------|
| 32 | Notificações de novo item? | [ ] |
| 33 | Auto-assign configurado? | [ ] |
| 34 | Status transitions automatizados? | [ ] |
| 35 | Due date reminders? | [ ] |

### Automações Avançadas
| # | Check | Status |
|---|-------|--------|
| 36 | Integrações externas funcionando? | [ ] |
| 37 | Webhooks configurados? | [ ] |
| 38 | Automações testadas? | [ ] |

**Score Automações:** ___/7

---

## Fase 6: Documentação e Onboarding

| # | Check | Status |
|---|-------|--------|
| 39 | Guia de uso documentado? | [ ] |
| 40 | Mapa de estrutura atualizado? | [ ] |
| 41 | Convenções de nomenclatura documentadas? | [ ] |
| 42 | Treinamento da equipe realizado? | [ ] |

**Score Documentação:** ___/4

---

## Scoring Final

```
Itens completados: ___/42
Porcentagem: ___%

Qualidade do Workspace:
[ ] EXCELENTE (>90%) - Production ready
[ ] BOM (80-90%) - Pequenos ajustes
[ ] REGULAR (70-80%) - Gaps significativos
[ ] FRACO (<70%) - Retrabalhar estrutura
```

---

## Quick Reference

### Hierarquia ClickUp

```
Workspace (organização)
└── Space (departamento/área)
    └── Folder (projeto/categoria)
        └── List (backlog/board)
            └── Task (item de trabalho)
                └── Subtask (decomposição)
```

### Tipos de Custom Fields

| Tipo | Uso |
|------|-----|
| Text | Campos livres |
| Number | Métricas, valores |
| Money | Valores monetários |
| Date | Datas e prazos |
| Dropdown | Opções fixas |
| Labels | Tags múltiplas |
| People | Responsáveis |
| Checkbox | Sim/Não |
| Progress | Porcentagem |
| Formula | Cálculos |
| Relationship | Links entre tasks |

### Views Recomendadas por Tipo de Lista

| Tipo de Lista | Views Recomendadas |
|---------------|-------------------|
| Backlog | List, Board |
| Pipeline | Board, List |
| Calendário | Calendar, List |
| Projeto | Gantt, Board |
| CRM | Board, Dashboard |

### Automações Essenciais

```yaml
automacoes_basicas:
  - trigger: "Task criada"
    action: "Notificar equipe"

  - trigger: "Task movida para Em Progresso"
    action: "Atribuir criador"

  - trigger: "Due date chegando"
    action: "Notificar responsável"

  - trigger: "Task movida para Concluído"
    action: "Notificar stakeholders"
```

### Red Flags

| ❌ Problema | Impacto |
|-------------|---------|
| Muitos Spaces | Navegação confusa |
| Lists vazias | Estrutura inflada |
| Campos demais | Fricção para criar tasks |
| Sem automações | Trabalho manual desnecessário |
| Sem Views personalizadas | Informação difícil de encontrar |
