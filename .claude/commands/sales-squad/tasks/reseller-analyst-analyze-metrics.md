---
task: Analyze Reseller Metrics
responsavel: "@reseller-analyst"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - reseller_id: Identificador do revendedor
  - period: Período de análise (ex: últimos 6 meses)
Saida: |
  - margin_analysis: Análise de margem por categoria
  - turnover_rate: Taxa de giro de estoque
  - stock_health: Saúde geral do estoque
Checklist:
  - "[ ] Coletar dados de vendas do período"
  - "[ ] Calcular margem por categoria"
  - "[ ] Calcular giro de estoque"
  - "[ ] Avaliar saúde do estoque"
  - "[ ] Gerar insights e alertas"
---

# *analyze-metrics

Analisa métricas do revendedor: margem, giro e saúde do estoque.

## Uso

```
@reseller-analyst
*analyze-metrics {reseller_id} --period "6m"
```

## Flow

1. Coletar dados de vendas e estoque do período
2. Calcular margem por categoria de produto
3. Calcular taxa de giro (turnover rate)
4. Avaliar saúde do estoque (overstock, ruptura, equilíbrio)
5. Gerar dashboard com insights e alertas
