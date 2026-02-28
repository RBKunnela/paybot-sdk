---
task: Seasonality Report
responsavel: "@reseller-analyst"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - reseller_id: Identificador do revendedor
  - category: Categoria de produto (opcional, todas se não informado)
Saida: |
  - seasonal_patterns: Padrões sazonais identificados
  - restock_recommendations: Recomendações de reposição por período
Checklist:
  - "[ ] Coletar histórico de vendas (mínimo 12 meses)"
  - "[ ] Identificar padrões sazonais por categoria"
  - "[ ] Mapear picos e vales de demanda"
  - "[ ] Gerar recomendações de reposição antecipada"
  - "[ ] Apresentar calendário de planejamento"
---

# *seasonality-report

Gera relatório de sazonalidade com padrões e recomendações de reposição.

## Uso

```
@reseller-analyst
*seasonality-report {reseller_id} --category "iluminação"
```

## Flow

1. Coletar histórico de vendas (mínimo 12 meses)
2. Analisar padrões sazonais por categoria
3. Identificar picos e vales de demanda
4. Cruzar com dados regionais e de mercado
5. Gerar recomendações de reposição antecipada
6. Apresentar calendário visual de planejamento
