# CRM Implementation Checklist

Use este checklist para validar a implementação de um CRM no ClickUp.

## Metadata
```yaml
id: crm-implementation-checklist
name: Checklist de Implementação de CRM
version: 1.0.0
executor: crm-builder
related_task: configure-crm
```

---

## Fase 1: Pipeline de Vendas

### Estrutura
| # | Check | Status | Notas |
|---|-------|--------|-------|
| 1 | Estágios do pipeline definidos? | [ ] | Total: ___ |
| 2 | Estágios refletem processo real? | [ ] | |
| 3 | Critérios de passagem documentados? | [ ] | |
| 4 | Cores dos estágios diferenciadas? | [ ] | |
| 5 | Status "ganho" e "perdido" definidos? | [ ] | |

### Configuração
| # | Check | Status |
|---|-------|--------|
| 6 | Board view configurada? | [ ] |
| 7 | WIP limits definidos (se aplicável)? | [ ] |
| 8 | Estágios sem tasks obsoletas? | [ ] |

**Score Pipeline:** ___/8

---

## Fase 2: Custom Fields CRM

### Campos de Contato
| # | Check | Status |
|---|-------|--------|
| 9 | Nome completo? | [ ] |
| 10 | Email (tipo email)? | [ ] |
| 11 | Telefone/WhatsApp? | [ ] |
| 12 | Origem do lead? | [ ] |
| 13 | Data de entrada? | [ ] |

### Campos de Qualificação
| # | Check | Status |
|---|-------|--------|
| 14 | Produto/Serviço de interesse? | [ ] |
| 15 | Budget disponível? | [ ] |
| 16 | Urgência/Timing? | [ ] |
| 17 | Lead Score (se aplicável)? | [ ] |

### Campos de Deal
| # | Check | Status |
|---|-------|--------|
| 18 | Valor do deal (Money)? | [ ] |
| 19 | Data prevista de fechamento? | [ ] |
| 20 | Responsável pelo lead? | [ ] |
| 21 | Motivo de perda (dropdown)? | [ ] |

**Score Custom Fields:** ___/13

---

## Fase 3: Automações CRM

### Entrada de Leads
| # | Check | Status |
|---|-------|--------|
| 22 | Webhook para captura automática? | [ ] |
| 23 | Integração com fonte principal? | [ ] |
| 24 | Lead criado com campos mapeados? | [ ] |
| 25 | Notificação de novo lead? | [ ] |

### Movimentação do Pipeline
| # | Check | Status |
|---|-------|--------|
| 26 | Auto-assign para vendedor? | [ ] |
| 27 | Notificação de mudança de estágio? | [ ] |
| 28 | Reminder de follow-up? | [ ] |
| 29 | Alerta de lead parado? | [ ] |

### Fechamento
| # | Check | Status |
|---|-------|--------|
| 30 | Automação ao fechar ganho? | [ ] |
| 31 | Automação ao fechar perdido? | [ ] |
| 32 | Atualização em sistema externo? | [ ] |

**Score Automações:** ___/11

---

## Fase 4: Integrações

| # | Check | Status |
|---|-------|--------|
| 33 | Fonte principal de leads integrada? | [ ] |
| 34 | WhatsApp/Comunicação integrada? | [ ] |
| 35 | Sistema de pagamento integrado? | [ ] |
| 36 | Email marketing integrado? | [ ] |
| 37 | Webhooks testados e funcionando? | [ ] |

**Score Integrações:** ___/5

---

## Fase 5: Dashboard e Métricas

### Métricas Essenciais
| # | Check | Status |
|---|-------|--------|
| 38 | Total de leads no período? | [ ] |
| 39 | Leads por origem? | [ ] |
| 40 | Leads por estágio (funil)? | [ ] |
| 41 | Taxa de conversão? | [ ] |
| 42 | Valor total em pipeline? | [ ] |
| 43 | Ticket médio? | [ ] |

### Dashboard
| # | Check | Status |
|---|-------|--------|
| 44 | Dashboard criado? | [ ] |
| 45 | Widgets atualizando corretamente? | [ ] |
| 46 | Filtros de período disponíveis? | [ ] |

**Score Dashboard:** ___/9

---

## Fase 6: Teste e Validação

| # | Check | Status |
|---|-------|--------|
| 47 | Lead de teste criado manualmente? | [ ] |
| 48 | Lead de teste via integração? | [ ] |
| 49 | Movimentação pelo pipeline testada? | [ ] |
| 50 | Fechamento ganho testado? | [ ] |
| 51 | Fechamento perdido testado? | [ ] |
| 52 | Métricas atualizaram corretamente? | [ ] |

**Score Teste:** ___/6

---

## Scoring Final

```
Itens completados: ___/52
Porcentagem: ___%

Qualidade do CRM:
[ ] EXCELENTE (>90%) - Production ready
[ ] BOM (80-90%) - Pequenos ajustes
[ ] REGULAR (70-80%) - Gaps nas automações
[ ] FRACO (<70%) - Retrabalhar implementação
```

---

## Quick Reference

### Pipeline Padrão

```yaml
pipeline_infoprodutor:
  - "Novo Lead" (gray)
  - "Qualificado" (blue)
  - "Proposta Enviada" (yellow)
  - "Em Negociação" (orange)
  - "Ganho" (green) [closed]
  - "Perdido" (red) [closed]
```

### Custom Fields Essenciais CRM

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| Nome | Text | Sim |
| Email | Email | Sim |
| WhatsApp | Phone | Sim |
| Origem | Dropdown | Sim |
| Interesse | Dropdown | Sim |
| Valor | Money | Não |
| Responsável | People | Sim |

### Métricas Chave

| Métrica | Fórmula |
|---------|---------|
| Taxa de Conversão | Ganhos ÷ Total Leads |
| Ticket Médio | Valor Total ÷ Quantidade Ganhos |
| Ciclo de Vendas | Média (Data Fechamento - Data Entrada) |
| Leads por Origem | Contagem por valor de Origem |

### Integrações Comuns

| Fonte | Webhook/API |
|-------|-------------|
| Hotmart | Webhook de compra |
| Typeform | Webhook de resposta |
| Instagram | Meta Lead Ads |
| Landing Page | Form webhook |
| WhatsApp | API oficial ou terceiros |

### Red Flags CRM

| ❌ Problema | Impacto |
|-------------|---------|
| Leads manuais | Leads perdidos |
| Sem follow-up automatizado | Oportunidades morrem |
| Sem métricas | Decisões sem dados |
| Pipeline muito complexo | Equipe não usa |
| Campos obrigatórios demais | Fricção para registrar |
| Sem motivo de perda | Não aprende com erros |
