---
task: Propose Product Mix
responsavel: "@sales-consultant"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - reseller_profile: Perfil do revendedor (resultado de *analyze-reseller)
  - sales_history: Histórico de vendas
Saida: |
  - product_mix_proposal: Proposta de mix de produtos personalizada
  - expected_margin: Margem esperada com o novo mix
Checklist:
  - "[ ] Analisar perfil e histórico do revendedor"
  - "[ ] Identificar gaps no mix atual"
  - "[ ] Recomendar produtos complementares"
  - "[ ] Calcular margem esperada"
  - "[ ] Gerar proposta formatada"
---

# *propose-mix

Propõe mix de produtos personalizado baseado no perfil e histórico do revendedor.

## Uso

```
@sales-consultant
*propose-mix {reseller_id}
```

## Flow

1. Carregar perfil do revendedor
2. Analisar mix atual vs catálogo completo
3. Identificar categorias com potencial de crescimento
4. Considerar sazonalidade e tendências regionais
5. Calcular margem esperada para o revendedor
6. Gerar proposta com justificativas técnicas
