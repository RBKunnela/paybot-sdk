# Task: Setup ClickUp Workspace

## Metadata
```yaml
id: setup-clickup-workspace
name: Configurar Workspace ClickUp
version: 1.0.0
executor: clickup-architect
workflow: wf-clickup-advanced-setup
estimated_time: 2-4h
```

## Purpose

Criar e configurar um workspace ClickUp completo com hierarquia de Spaces, Folders e Lists, Custom Fields, Views e automações básicas.

---

## Input Requirements

| Campo | Tipo | Obrigatório | Exemplo |
|-------|------|-------------|---------|
| workspace_name | string | Sim | "Clínica Natália Tanaka" |
| business_type | string | Sim | "infoprodutor" / "agencia" / "saas" |
| team_size | number | Sim | 5 |
| processes | list | Sim | ["marketing", "vendas", "operações"] |
| integrations | list | Não | ["zapier", "make", "n8n"] |

## Trigger

```yaml
trigger:
  type: command
  command: "*setup-clickup"
  aliases:
    - "*configurar-clickup"
    - "*criar-workspace"
```

---

## Execution Flow

### Fase 1: Discovery (30min)

**Task 1.1: Diagnóstico de Processos**
- Executor: @process-diagnostician
- Input: business_type, processes
- Output: mapa de processos atual

**Task 1.2: Requisitos**
- Executor: @pm-orchestrator
- Input: mapa de processos, team_size
- Output: requisitos de estrutura

### Fase 2: Arquitetura (45min)

**Task 2.1: Design da Hierarquia**
- Executor: @clickup-architect
- Input: requisitos
- Output: estrutura de Spaces/Folders/Lists

```yaml
estrutura_exemplo:
  spaces:
    - name: "Marketing"
      folders:
        - name: "Conteúdo"
          lists:
            - "Calendário Editorial"
            - "Posts em Produção"
            - "Publicados"
        - name: "Campanhas"
          lists:
            - "Planejamento"
            - "Em Execução"
            - "Finalizadas"
    - name: "Vendas"
      # ...
```

**Task 2.2: Design de Custom Fields**
- Executor: @clickup-architect
- Input: processos, business_type
- Output: campos customizados por List

### Fase 3: Implementação (1-2h)

**Task 3.1: Criar Estrutura**
- Executor: @clickup-architect
- Usar: ClickUp API / Manual
- Output: Workspace configurado

**Task 3.2: Configurar Views**
- Executor: @clickup-architect
- Views: Board, List, Calendar, Gantt (conforme necessário)

**Task 3.3: Configurar Automações**
- Executor: @automation-engineer
- Automações básicas: status changes, notifications, assignments

### Fase 4: Validação (30min)

**Task 4.1: Testar Fluxos**
- Criar tasks de teste
- Verificar automações
- Validar views

**Task 4.2: Documentar**
- Guia de uso para equipe
- Mapa de estrutura

---

## Output Deliverables

| Entregável | Formato | Responsável |
|------------|---------|-------------|
| Workspace configurado | ClickUp | clickup-architect |
| Mapa de estrutura | Markdown | clickup-architect |
| Guia de uso | Markdown | pm-orchestrator |
| Lista de automações | YAML | automation-engineer |

---

## Quality Gates

### Gate 1: Estrutura
- [ ] Spaces criados conforme requisitos
- [ ] Folders organizados logicamente
- [ ] Lists têm propósito claro
- [ ] Nomenclatura consistente

### Gate 2: Custom Fields
- [ ] Campos relevantes para cada List
- [ ] Tipos de campo corretos
- [ ] Opções de dropdown definidas
- [ ] Campos obrigatórios marcados

### Gate 3: Views
- [ ] View principal por List
- [ ] Filtros configurados
- [ ] Agrupamentos úteis
- [ ] Ordenação padrão definida

### Gate 4: Automações
- [ ] Status changes automatizados
- [ ] Notificações configuradas
- [ ] Assignees automáticos (se aplicável)
- [ ] Testadas e funcionando

---

## Success Metrics

| Métrica | Alvo | Descrição |
|---------|------|-----------|
| Adoção | 100% | Equipe usando em 1 semana |
| Estrutura | Aprovada | Sem reorganização em 30 dias |
| Automações | 5+ | Funcionando corretamente |

---

## Example

### Input
```yaml
workspace_name: "Clínica Natália Tanaka"
business_type: "infoprodutor"
team_size: 4
processes: ["conteudo", "lancamento", "atendimento", "financeiro"]
integrations: ["n8n", "hotmart"]
```

### Output Structure
```
📁 Workspace: Clínica Natália Tanaka
├── 🟣 Space: Marketing
│   ├── 📁 Folder: Conteúdo YouTube
│   │   ├── 📋 Ideias
│   │   ├── 📋 Em Produção
│   │   └── 📋 Publicados
│   └── 📁 Folder: Redes Sociais
│       ├── 📋 Calendário
│       └── 📋 Posts
├── 🟡 Space: Vendas
│   ├── 📁 Folder: CRM
│   │   ├── 📋 Leads
│   │   ├── 📋 Oportunidades
│   │   └── 📋 Clientes
│   └── 📁 Folder: Lançamentos
│       ├── 📋 Planejamento
│       └── 📋 Execução
├── 🟢 Space: Operações
│   └── 📁 Folder: Atendimento
│       ├── 📋 Inbox
│       └── 📋 Resolvidos
└── 🔵 Space: Financeiro
    └── 📋 Contas a Pagar/Receber
```
