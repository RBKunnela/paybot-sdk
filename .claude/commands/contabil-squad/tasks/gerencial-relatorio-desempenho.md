---
task: Relatorio de Desempenho Financeiro
responsavel: "@gerencial"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - periodo: Periodo de analise (mensal, trimestral, anual)
  - dados_financeiros: Faturamento, custos, despesas do periodo
  - regime: Simples Nacional / MEI
Saida: |
  - dre_simplificada: DRE simplificada do periodo
  - indicadores: Indicadores-chave (margem, lucratividade, ponto de equilibrio)
  - tendencias: Analise de tendencias e comparativos
  - recomendacoes: Recomendacoes de melhoria
Checklist:
  - "[ ] Coletar dados financeiros do periodo"
  - "[ ] Elaborar DRE simplificada"
  - "[ ] Calcular indicadores-chave de desempenho"
  - "[ ] Analisar tendencias (comparativo com periodos anteriores)"
  - "[ ] Identificar pontos de atencao"
  - "[ ] Gerar recomendacoes acionaveis"
---

# *relatorio-desempenho

Gera relatorio de desempenho financeiro com DRE simplificada, indicadores-chave e analise de tendencias.

## Uso

```
@gerencial
*relatorio-desempenho
```

## Flow

1. Coletar dados financeiros (faturamento, CMV, despesas, impostos)
2. Montar DRE simplificada (Receita - CMV - Despesas - Impostos = Lucro)
3. Calcular indicadores: margem bruta, margem liquida, ponto de equilibrio
4. Comparar com periodos anteriores (tendencia)
5. Identificar desvios e pontos de atencao
6. Gerar recomendacoes com base na analise
