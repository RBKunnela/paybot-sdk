---
task: Verificacao de Enquadramento Tributario
responsavel: "@compliance"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - cnpj: CNPJ da empresa
  - faturamento_12m: Faturamento acumulado ultimos 12 meses
  - atividades: Atividades exercidas (CNAE)
  - socios: Composicao societaria
Saida: |
  - enquadramento_atual: Regime tributario atual e validade
  - restricoes: Restricoes identificadas (atividade, faturamento, socios)
  - recomendacao: Manter ou alterar regime
  - alertas: Pontos de atencao e riscos de desenquadramento
Checklist:
  - "[ ] Verificar enquadramento atual (MEI, Simples, Presumido, Real)"
  - "[ ] Validar limites de faturamento do regime"
  - "[ ] Verificar atividades permitidas (CNAE) no regime"
  - "[ ] Analisar composicao societaria e vedacoes"
  - "[ ] Verificar debitos e pendencias que impedem manutencao"
  - "[ ] Recomendar regime adequado com fundamentacao"
---

# *verificacao-enquadramento

Verifica se a empresa esta enquadrada no regime tributario correto, analisando limites, atividades permitidas e vedacoes legais.

## Uso

```
@compliance
*verificacao-enquadramento
```

## Contexto 2026

- MEI: limite R$ 81.000/ano, vedacoes de atividade e socios
- Simples: limite R$ 4.8M/ano, vedacoes LC 123/2006 art. 17
- MAT: novo modulo exige formalizacao na adesao ao Simples
- Opcao anual: prazo ate ultimo dia util de janeiro

## Flow

1. Coletar dados da empresa (CNPJ, faturamento, atividades, socios)
2. Verificar regime atual e data de opcao
3. Validar limites de faturamento (R$ 81k MEI, R$ 4.8M Simples)
4. Checar atividades vedadas conforme LC 123/2006
5. Analisar composicao societaria (participacao em outras empresas)
6. Verificar debitos impeditivos
7. Recomendar manutencao ou alteracao de regime
