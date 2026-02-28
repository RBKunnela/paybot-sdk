---
task: Calculo DAS MEI
responsavel: "@tributarista"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - atividade_mei: Atividade do MEI (comercio, servico, ambos)
  - mes_referencia: Mes/ano de referencia
Saida: |
  - valor_das: Valor do DAS MEI atualizado
  - composicao: Detalhamento INSS + ICMS/ISS
  - prazo: Data de vencimento
  - orientacoes: Instrucoes de pagamento e alertas
Checklist:
  - "[ ] Identificar atividade do MEI (comercio, servico ou ambos)"
  - "[ ] Obter salario minimo vigente 2026 (R$ 1.621,00)"
  - "[ ] Calcular contribuicao INSS (5% do SM)"
  - "[ ] Adicionar ICMS (R$ 1,00) e/ou ISS (R$ 5,00) conforme atividade"
  - "[ ] Informar prazo de vencimento (dia 20 do mes seguinte)"
  - "[ ] Alertar sobre limite de faturamento anual (R$ 81.000)"
---

# *calculo-das-mei

Calcula o valor atualizado do DAS MEI com base no salario minimo de 2026 e na atividade exercida.

## Uso

```
@tributarista
*calculo-das-mei
```

## Contexto 2026

- Salario minimo 2026: R$ 1.621,00
- INSS MEI: 5% do SM = R$ 81,05
- ICMS (comercio/industria): R$ 1,00
- ISS (servicos): R$ 5,00
- Limite faturamento anual MEI: R$ 81.000,00 (sem alteracao confirmada)
- Vencimento: dia 20 do mes seguinte ao de referencia

## Flow

1. Identificar atividade do MEI
2. Calcular INSS: 5% de R$ 1.621,00 = R$ 81,05
3. Adicionar ICMS (R$ 1,00) se comercio/industria
4. Adicionar ISS (R$ 5,00) se prestacao de servicos
5. Somar valores para total do DAS
6. Informar prazo de vencimento
7. Alertar sobre limite de faturamento e proporcionalidade
