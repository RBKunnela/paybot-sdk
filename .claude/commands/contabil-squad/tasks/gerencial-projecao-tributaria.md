---
task: Projecao de Impacto Tributario
responsavel: "@gerencial"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - faturamento_projetado: Faturamento projetado por periodo
  - regime_atual: Regime tributario atual
  - cenarios: Cenarios a simular (crescimento, estabilidade, reducao)
Saida: |
  - projecao_mensal: Projecao tributaria mes a mes
  - impacto_faixas: Impacto de mudanca de faixa/anexo
  - alertas_limite: Alertas sobre limites de faturamento
  - graficos: Dados para visualizacao grafica
Checklist:
  - "[ ] Definir premissas de projecao"
  - "[ ] Projetar faturamento por periodo"
  - "[ ] Calcular RBT12 projetado mes a mes"
  - "[ ] Identificar mudancas de faixa ao longo do ano"
  - "[ ] Calcular impacto tributario acumulado"
  - "[ ] Alertar sobre limites (R$ 81k MEI, R$ 4.8M Simples)"
---

# *projecao-tributaria

Projeta o impacto tributario ao longo do ano considerando crescimento de faturamento, mudancas de faixa e limites de regime.

## Uso

```
@gerencial
*projecao-tributaria
```

## Flow

1. Definir premissas (taxa de crescimento, sazonalidade)
2. Projetar faturamento mensal
3. Calcular RBT12 acumulado mes a mes
4. Aplicar aliquotas efetivas conforme faixa de cada mes
5. Identificar meses de mudanca de faixa
6. Alertar sobre proximidade de limites de regime
7. Consolidar projecao anual com impacto total
