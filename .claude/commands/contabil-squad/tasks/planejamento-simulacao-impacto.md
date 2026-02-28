---
task: Simulacao de Cenarios Tributarios
responsavel: "@planejamento"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - dados_empresa: Faturamento, custos, folha, atividade
  - cenarios: Cenarios a simular (crescimento, estagnacao, reducao)
  - horizonte: Horizonte temporal (1, 3 ou 5 anos)
Saida: |
  - simulacoes: Resultados por cenario
  - comparativo: Tabela comparativa entre cenarios
  - impacto_reforma: Impacto da transicao IBS/CBS em cada cenario
  - recomendacao: Cenario recomendado e acoes
Checklist:
  - "[ ] Coletar dados base da empresa"
  - "[ ] Definir premissas para cada cenario"
  - "[ ] Simular carga tributaria por cenario"
  - "[ ] Incluir impacto da transicao IBS/CBS no horizonte"
  - "[ ] Comparar resultados entre cenarios"
  - "[ ] Recomendar estrategia com base nas simulacoes"
---

# *simulacao-impacto

Simula cenarios tributarios para avaliar impacto de diferentes estrategias e da Reforma Tributaria no negocio.

## Uso

```
@planejamento
*simulacao-impacto
```

## Contexto 2026

- Transicao IBS/CBS: impacto crescente de 2026 a 2033
- Cenarios devem considerar: regime atual, mudanca de regime, opcao DAS por fora
- Variavel-chave: taxa de crescimento e impacto nas faixas do Simples
- Considerar creditos tributarios na analise

## Flow

1. Coletar dados financeiros e operacionais da empresa
2. Definir 3 cenarios com premissas explicitas
3. Simular carga tributaria para cada cenario/ano
4. Projetar impacto da transicao IBS/CBS ao longo do horizonte
5. Comparar resultados em tabela/grafico
6. Identificar cenario mais favoravel
7. Recomendar estrategia e acoes por fase
