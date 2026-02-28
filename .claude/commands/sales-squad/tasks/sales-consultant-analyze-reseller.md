---
task: Analyze Reseller
responsavel: "@sales-consultant"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - reseller_id: Identificador do revendedor (obrigatório)
Saida: |
  - business_profile: Perfil completo do negócio do revendedor
  - opportunities: Oportunidades identificadas
  - risks: Riscos e pontos de atenção
Checklist:
  - "[ ] Coletar dados do revendedor"
  - "[ ] Analisar histórico de compras"
  - "[ ] Mapear perfil de negócio (margem, giro, estoque)"
  - "[ ] Identificar oportunidades de crescimento"
  - "[ ] Mapear riscos e pontos de atenção"
  - "[ ] Gerar relatório consolidado"
---

# *analyze-reseller

Analisa o perfil completo do revendedor — negócio, oportunidades e riscos.

## Uso

```
@sales-consultant
*analyze-reseller {reseller_id}
```

## Flow

1. Receber ID do revendedor
2. Buscar dados no CRM e histórico de compras
3. Analisar métricas do negócio (margem, giro, estoque, sazonalidade)
4. Identificar oportunidades (categorias sub-exploradas, crescimento)
5. Mapear riscos (inadimplência, queda de volume, overstock)
6. Gerar perfil consolidado com recomendações
