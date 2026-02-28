---
task: Comparativo de Regimes Tributarios
responsavel: "@gerencial"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - faturamento_anual: Faturamento anual (real ou projetado)
  - atividade: Atividade principal (CNAE)
  - folha_pagamento: Valor da folha de pagamento (para Fator R)
  - custos_dedutiveis: Custos dedutiveis no Lucro Presumido/Real
Saida: |
  - comparativo: Tabela comparativa MEI vs Simples vs Presumido vs Real
  - carga_efetiva: Carga tributaria efetiva em cada regime
  - recomendacao: Regime recomendado com justificativa
  - alertas: Restricoes e pontos de atencao por regime
Checklist:
  - "[ ] Coletar dados financeiros e operacionais"
  - "[ ] Simular carga no MEI (se aplicavel)"
  - "[ ] Simular carga no Simples Nacional (por anexo)"
  - "[ ] Simular carga no Lucro Presumido"
  - "[ ] Simular carga no Lucro Real (se relevante)"
  - "[ ] Comparar cargas efetivas e beneficios"
  - "[ ] Recomendar regime com fundamentacao"
---

# *comparativo-regimes

Compara a carga tributaria efetiva entre MEI, Simples Nacional, Lucro Presumido e Lucro Real para identificar o regime mais vantajoso.

## Uso

```
@gerencial
*comparativo-regimes
```

## Contexto 2026

- Considerar opcao "por dentro" vs "por fora" do DAS (geracao de creditos)
- Avaliar impacto da transicao IBS/CBS na competitividade entre regimes
- Fator R: folha/faturamento para migrar Anexo V → Anexo III

## Flow

1. Coletar dados da empresa (faturamento, atividade, folha, custos)
2. Calcular carga tributaria em cada regime aplicavel
3. Considerar Fator R para atividades do Anexo V
4. Avaliar opcao DAS "por dentro" vs "por fora" no Simples
5. Montar tabela comparativa com carga efetiva
6. Analisar vantagens nao-tributarias (simplicidade, creditos, obrigacoes)
7. Recomendar regime com fundamentacao completa
