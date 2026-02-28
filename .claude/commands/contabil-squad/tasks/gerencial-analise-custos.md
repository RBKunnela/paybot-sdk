---
task: Analise de Custos e Projecoes
responsavel: "@gerencial"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - custos_fixos: Lista de custos fixos mensais
  - custos_variaveis: Custos variaveis por unidade/percentual
  - faturamento: Faturamento atual e projetado
  - regime: Regime tributario (Simples / MEI)
Saida: |
  - estrutura_custos: Mapeamento completo de custos
  - ponto_equilibrio: Ponto de equilibrio operacional
  - margem_contribuicao: Margem de contribuicao por produto/servico
  - projecoes: Projecoes para 3, 6 e 12 meses
Checklist:
  - "[ ] Mapear custos fixos e variaveis"
  - "[ ] Classificar custos por categoria"
  - "[ ] Calcular margem de contribuicao"
  - "[ ] Determinar ponto de equilibrio"
  - "[ ] Projetar cenarios (otimista, realista, pessimista)"
  - "[ ] Identificar oportunidades de reducao de custos"
---

# *analise-custos

Analisa estrutura de custos e gera projecoes financeiras para tomada de decisao.

## Uso

```
@gerencial
*analise-custos
```

## Flow

1. Coletar e classificar custos fixos e variaveis
2. Calcular margem de contribuicao (preco - custos variaveis)
3. Determinar ponto de equilibrio (custos fixos / margem contribuicao)
4. Projetar cenarios para 3, 6 e 12 meses
5. Incluir impacto tributario do regime escolhido
6. Identificar oportunidades de otimizacao
