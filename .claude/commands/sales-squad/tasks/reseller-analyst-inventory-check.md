---
task: Inventory Check
responsavel: "@reseller-analyst"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - reseller_id: Identificador do revendedor
Saida: |
  - stock_levels: Níveis de estoque por categoria
  - overstock_alerts: Alertas de excesso de estoque
  - reorder_suggestions: Sugestões de reposição
Checklist:
  - "[ ] Consultar níveis de estoque atuais"
  - "[ ] Comparar com histórico de giro"
  - "[ ] Identificar itens em overstock"
  - "[ ] Identificar itens próximos de ruptura"
  - "[ ] Gerar sugestões de reorder"
---

# *inventory-check

Verifica níveis de estoque com alertas de overstock e sugestões de reposição.

## Uso

```
@reseller-analyst
*inventory-check {reseller_id}
```

## Flow

1. Consultar níveis de estoque atuais do revendedor
2. Comparar com histórico de giro por produto
3. Identificar itens em overstock (estoque > 3x giro mensal)
4. Identificar itens em risco de ruptura (estoque < 1x giro mensal)
5. Gerar sugestões de reorder com quantidades recomendadas
