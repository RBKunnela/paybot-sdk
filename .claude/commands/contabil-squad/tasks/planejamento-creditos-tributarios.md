---
task: Analise de Creditos Tributarios
responsavel: "@planejamento"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - regime: Regime tributario atual (Simples Nacional)
  - faturamento_pj: Percentual de vendas para PJ
  - clientes_pj: Perfil dos clientes PJ (regime deles)
  - atividade: Atividade e anexo do Simples
Saida: |
  - analise_creditos: Viabilidade de geracao de creditos
  - comparativo: DAS por dentro vs por fora — impacto financeiro
  - impacto_clientes: Impacto nos clientes PJ (competitividade)
  - recomendacao: Opcao recomendada com fundamentacao
Checklist:
  - "[ ] Analisar perfil de vendas (PJ vs PF)"
  - "[ ] Identificar demanda de clientes PJ por creditos"
  - "[ ] Simular opcao DAS 'por dentro' (atual)"
  - "[ ] Simular opcao DAS 'por fora' (geracao de creditos)"
  - "[ ] Comparar impacto financeiro das duas opcoes"
  - "[ ] Recomendar opcao com base no perfil comercial"
---

# *creditos-tributarios

Analisa a viabilidade e impacto da geracao de creditos tributarios via opcao de recolhimento "por fora" do DAS.

## Uso

```
@planejamento
*creditos-tributarios
```

## Contexto 2026

- Empresas do Simples poderao optar por recolher tributos "por fora" do DAS
- Vantagem: gera creditos de IBS/CBS para clientes PJ
- Desvantagem: maior complexidade operacional e custo potencialmente maior
- Decisao estrategica: depende do perfil de clientes (B2B vs B2C)
- Clientes no regime geral valorizam creditos para abater seus proprios impostos

## Flow

1. Analisar composicao de vendas (PJ vs PF)
2. Identificar se clientes PJ demandam creditos tributarios
3. Simular carga tributaria com DAS "por dentro" (modelo atual)
4. Simular carga tributaria com recolhimento "por fora"
5. Comparar custo tributario vs vantagem competitiva
6. Avaliar impacto operacional (mais obrigacoes acessorias)
7. Recomendar opcao com fundamentacao
