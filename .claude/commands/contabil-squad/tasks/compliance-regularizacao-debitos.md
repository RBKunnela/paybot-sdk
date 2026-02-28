---
task: Regularizacao de Debitos
responsavel: "@compliance"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - cnpj: CNPJ da empresa
  - debitos: Lista de debitos conhecidos
  - notificacao_exclusao: Se recebeu notificacao de exclusao (sim/nao)
  - prazo: Prazo para regularizacao
Saida: |
  - diagnostico: Diagnostico completo dos debitos
  - opcoes_regularizacao: Opcoes disponiveis (pagamento, parcelamento, compensacao)
  - plano_acao: Plano de acao com cronograma
  - custo_total: Estimativa de custo total com juros e multas
Checklist:
  - "[ ] Levantar todos os debitos (federais, estaduais, municipais)"
  - "[ ] Calcular valores atualizados (com juros e multa)"
  - "[ ] Verificar opcoes de parcelamento disponiveis"
  - "[ ] Avaliar possibilidade de compensacao"
  - "[ ] Elaborar plano de regularizacao"
  - "[ ] Protocolar pedido dentro do prazo legal"
---

# *regularizacao-debitos

Orienta sobre regularizacao de debitos tributarios para evitar exclusao do Simples Nacional ou MEI.

## Uso

```
@compliance
*regularizacao-debitos
```

## Contexto 2026

- Exclusao do Simples por debitos: principal causa de desenquadramento
- Parcelamento ordinario: ate 60 parcelas
- Programas especiais de regularizacao (RELP, Refis) conforme disponibilidade
- Prazo apos notificacao: 30 dias para regularizar
- Compensacao com creditos tributarios quando aplicavel

## Flow

1. Levantar todos os debitos (DAS, ISS, ICMS, taxas)
2. Atualizar valores com juros SELIC e multa de mora
3. Verificar opcoes: pagamento a vista, parcelamento, compensacao
4. Avaliar programas especiais de regularizacao vigentes
5. Elaborar plano de acao priorizado
6. Protocolar pedido de parcelamento/regularizacao
7. Monitorar cumprimento ate quitacao
