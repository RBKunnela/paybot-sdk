---
task: Standardize Process
responsavel: "@sales-ops"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - process_name: Nome do processo a padronizar
Saida: |
  - standardized_sop: SOP (Standard Operating Procedure) padronizado
  - checklist: Checklist de execução
  - training_guide: Guia de treinamento
Checklist:
  - "[ ] Mapear processo atual (as-is)"
  - "[ ] Identificar gargalos e ineficiências"
  - "[ ] Desenhar processo otimizado (to-be)"
  - "[ ] Gerar SOP padronizado"
  - "[ ] Criar checklist de execução"
  - "[ ] Criar guia de treinamento"
---

# *standardize-process

Padroniza um processo comercial gerando SOP, checklist e guia de treinamento.

## Uso

```
@sales-ops
*standardize-process "visita ao revendedor"
*standardize-process "onboarding de novo revendedor"
```

## Flow

1. Mapear o processo atual (as-is) — etapas, responsáveis, ferramentas
2. Identificar gargalos, retrabalho e pontos de falha
3. Desenhar processo otimizado (to-be) com boas práticas
4. Gerar SOP com passo-a-passo detalhado
5. Criar checklist operacional para execução diária
6. Criar guia de treinamento para capacitação da equipe
