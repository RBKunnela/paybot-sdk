---
task: KPI Dashboard
responsavel: "@sales-ops"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - team_id: Identificador do time/região (opcional)
  - period: Período de análise
Saida: |
  - kpi_report: Relatório de KPIs
  - performance_trends: Tendências de performance
  - alerts: Alertas de desvio
Checklist:
  - "[ ] Coletar dados de performance do período"
  - "[ ] Calcular KPIs principais"
  - "[ ] Identificar tendências"
  - "[ ] Gerar alertas de desvio"
  - "[ ] Formatar dashboard"
---

# *kpi-dashboard

Gera dashboard de KPIs com tendências de performance e alertas.

## Uso

```
@sales-ops
*kpi-dashboard --period "Q1-2026"
*kpi-dashboard --team "sudeste" --period "jan-2026"
```

## KPIs Monitorados

- Volume de vendas (R$ e unidades)
- Ticket médio por revendedor
- Taxa de conversão de visitas
- Cobertura da carteira (% revendedores ativos)
- NPS / satisfação do revendedor
- Tempo médio de ciclo de venda
- Mix de produtos vendidos

## Flow

1. Coletar dados de vendas e CRM do período
2. Calcular KPIs principais
3. Comparar com metas e período anterior
4. Identificar tendências (positivas e negativas)
5. Gerar alertas para KPIs fora da meta
6. Formatar dashboard visual
