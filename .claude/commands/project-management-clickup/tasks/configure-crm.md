# Task: Configurar CRM no ClickUp

## Metadata
```yaml
id: configure-crm
name: Configurar CRM Completo no ClickUp
version: 1.0.0
executor: crm-builder
workflow: wf-crm-implementation
estimated_time: 3-5h
```

## Purpose

Implementar um sistema CRM completo dentro do ClickUp, com pipeline de vendas, automações de nurturing, integrações com fontes de leads e dashboards de métricas.

---

## Input Requirements

| Campo | Tipo | Obrigatório | Exemplo |
|-------|------|-------------|---------|
| pipeline_stages | list | Sim | ["lead", "qualificado", "proposta", "negociação", "fechado"] |
| lead_sources | list | Sim | ["hotmart", "instagram", "indicação"] |
| team_members | list | Sim | ["vendedor1", "vendedor2"] |
| automation_tool | string | Não | "n8n" / "make" / "zapier" |
| integration_sources | list | Não | ["hotmart", "typeform", "instagram"] |

## Trigger

```yaml
trigger:
  type: command
  command: "*setup-crm"
  aliases:
    - "*configurar-crm"
    - "*crm-clickup"
```

---

## Execution Flow

### Fase 1: Design do Pipeline (30min)

**Task 1.1: Mapear Estágios**
- Executor: @crm-builder
- Definir status do pipeline
- Definir critérios de passagem entre estágios

```yaml
pipeline_padrao:
  stages:
    - name: "Novo Lead"
      color: "gray"
      criteria: "Lead entrou no sistema"
    - name: "Qualificado"
      color: "blue"
      criteria: "Respondeu qualificação"
    - name: "Proposta Enviada"
      color: "yellow"
      criteria: "Proposta foi enviada"
    - name: "Em Negociação"
      color: "orange"
      criteria: "Follow-up ativo"
    - name: "Ganho"
      color: "green"
      criteria: "Comprou"
    - name: "Perdido"
      color: "red"
      criteria: "Desistiu ou não qualificado"
```

### Fase 2: Custom Fields (45min)

**Task 2.1: Campos de Lead**
- Executor: @crm-builder
- Campos essenciais para CRM

```yaml
custom_fields:
  contact:
    - name: "Nome Completo"
      type: "text"
      required: true
    - name: "Email"
      type: "email"
      required: true
    - name: "WhatsApp"
      type: "phone"
      required: true
    - name: "Origem"
      type: "dropdown"
      options: ["Hotmart", "Instagram", "Indicação", "Orgânico"]

  qualification:
    - name: "Interesse"
      type: "dropdown"
      options: ["Curso X", "Curso Y", "Mentoria"]
    - name: "Budget"
      type: "dropdown"
      options: ["Até R$500", "R$500-2000", "Acima R$2000"]
    - name: "Urgência"
      type: "dropdown"
      options: ["Imediato", "30 dias", "Sem pressa"]
    - name: "Score"
      type: "number"
      formula: "calculado via automação"

  deal:
    - name: "Valor do Deal"
      type: "currency"
    - name: "Data Prevista de Fechamento"
      type: "date"
    - name: "Responsável"
      type: "people"
```

### Fase 3: Estrutura no ClickUp (1h)

**Task 3.1: Criar Space CRM**
- Executor: @crm-builder
- Criar estrutura de Lists

```
📁 Space: CRM
├── 📋 Leads (status: pipeline stages)
├── 📋 Clientes (fechados ganhos)
└── 📋 Perdidos (arquivo)
```

**Task 3.2: Configurar Views**
- Board view por status
- List view com filtros
- Calendar view para follow-ups
- Dashboard de métricas

### Fase 4: Automações (1-2h)

**Task 4.1: Automações Internas ClickUp**
- Executor: @automation-engineer
- Automações de status e notificação

```yaml
automacoes_clickup:
  - trigger: "Task movida para Qualificado"
    action: "Notificar vendedor responsável"

  - trigger: "Task sem atividade há 3 dias"
    action: "Criar subtask de follow-up"

  - trigger: "Task movida para Ganho"
    action: "Mover para lista Clientes"
```

**Task 4.2: Integrações Externas**
- Executor: @automation-engineer
- n8n/Make/Zapier webhooks

```yaml
integracoes:
  hotmart_webhook:
    trigger: "Nova compra Hotmart"
    action: "Criar/Atualizar task no CRM"
    mapping:
      nome: "buyer.name"
      email: "buyer.email"
      produto: "product.name"
      status: "Ganho"

  typeform_webhook:
    trigger: "Nova resposta Typeform"
    action: "Criar task como Novo Lead"
```

### Fase 5: Dashboard (30min)

**Task 5.1: Criar Dashboard**
- Executor: @crm-builder
- Métricas essenciais

```yaml
dashboard_widgets:
  - name: "Leads por Origem"
    type: "pie_chart"
    source: "Campo Origem"

  - name: "Pipeline Funil"
    type: "bar_chart"
    source: "Status count"

  - name: "Valor em Pipeline"
    type: "number"
    source: "Soma Valor do Deal"

  - name: "Taxa de Conversão"
    type: "number"
    formula: "Ganhos / Total Leads"
```

---

## Output Deliverables

| Entregável | Formato | Responsável |
|------------|---------|-------------|
| CRM configurado | ClickUp | crm-builder |
| Automações | n8n/Make workflows | automation-engineer |
| Dashboard | ClickUp Dashboard | crm-builder |
| Documentação | Markdown | pm-orchestrator |

---

## Quality Gates

### Gate 1: Estrutura
- [ ] Pipeline stages definidos
- [ ] Custom fields configurados
- [ ] Views funcionais

### Gate 2: Automações
- [ ] Webhooks funcionando
- [ ] Automações ClickUp ativas
- [ ] Leads sendo criados automaticamente

### Gate 3: Dashboard
- [ ] Métricas visíveis
- [ ] Dados atualizando corretamente

### Gate 4: Teste
- [ ] Lead de teste criado
- [ ] Movimentação pelo pipeline testada
- [ ] Notificações chegando

---

## Success Metrics

| Métrica | Alvo | Descrição |
|---------|------|-----------|
| Leads capturados | 100% | Nenhum lead perdido |
| Tempo resposta | < 5min | Lead criado automaticamente |
| Visibilidade | 100% | Todos os dados no dashboard |
