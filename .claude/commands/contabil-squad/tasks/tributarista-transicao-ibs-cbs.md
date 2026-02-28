---
task: Orientacao Transicao IBS CBS
responsavel: "@tributarista"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - tipo_empresa: MEI ou Simples Nacional
  - atividade: Atividade principal (comercio, servico, industria)
  - faturamento_anual: Faturamento anual estimado
Saida: |
  - impacto_2026: Impactos imediatos em 2026
  - cronograma_transicao: Cronograma 2026-2033 personalizado
  - acoes_recomendadas: Lista de acoes a tomar
  - riscos: Riscos identificados
Checklist:
  - "[ ] Identificar tipo de empresa e regime atual"
  - "[ ] Mapear tributos atuais que serao substituidos"
  - "[ ] Detalhar cronograma de transicao aplicavel"
  - "[ ] Identificar impactos em 2026 (campos NF-e, obrigacoes)"
  - "[ ] Listar acoes recomendadas por fase"
  - "[ ] Alertar sobre riscos e pontos de atencao"
---

# *transicao-ibs-cbs

Orienta sobre a transicao dos tributos atuais (PIS, COFINS, ICMS, ISS, IPI) para IBS e CBS conforme cronograma da Reforma Tributaria.

## Uso

```
@tributarista
*transicao-ibs-cbs
```

## Contexto 2026

- Reforma Tributaria aprovada manteve MEI e Simples Nacional
- Transicao inicia em janeiro de 2026 com testes
- PIS/COFINS → CBS (federal), ICMS/ISS → IBS (estadual/municipal)
- Em 2026: MEI e Simples dispensados de campos IBS/CBS na NF-e
- A partir de 2027: obrigatoriedade dos novos campos
- Transicao completa prevista para 2032-2033

## Flow

1. Identificar regime tributario atual (MEI ou Simples)
2. Mapear tributos atuais da empresa (PIS, COFINS, ICMS, ISS)
3. Explicar equivalencia: PIS+COFINS → CBS / ICMS+ISS → IBS
4. Detalhar cronograma de transicao fase a fase
5. Listar impactos especificos para 2026 (dispensas, preparativos)
6. Recomendar acoes para cada fase da transicao
7. Alertar sobre riscos (mudancas em 2027, sistemas desatualizados)
