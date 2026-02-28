---
task: Estrategias de Reducao de Carga Tributaria
responsavel: "@planejamento"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - regime_atual: Regime tributario atual
  - faturamento: Faturamento anual
  - estrutura_custos: Custos e despesas dedutiveis
  - atividades: Atividades exercidas
Saida: |
  - estrategias: Lista de estrategias legais aplicaveis
  - economia_estimada: Economia estimada por estrategia
  - riscos: Riscos e limitacoes de cada estrategia
  - plano_implementacao: Plano de implementacao priorizado
Checklist:
  - "[ ] Diagnosticar carga tributaria atual"
  - "[ ] Identificar estrategias de elisao fiscal aplicaveis"
  - "[ ] Calcular economia estimada por estrategia"
  - "[ ] Avaliar riscos e viabilidade legal"
  - "[ ] Priorizar estrategias por impacto/risco"
  - "[ ] Elaborar plano de implementacao"
---

# *reducao-carga

Identifica estrategias legais de reducao de carga tributaria (elisao fiscal) aplicaveis ao perfil da empresa.

## Uso

```
@planejamento
*reducao-carga
```

## Contexto 2026

Estrategias comuns para MEI e Simples:
- Fator R: otimizacao de folha para migrar Anexo V → III
- Segregacao de receitas: operacoes com aliquotas diferenciadas
- Opcao DAS "por fora": geracao de creditos para clientes PJ
- Planejamento de faturamento: evitar mudancas desfavoraveis de faixa
- Revisao de CNAE: enquadramento em atividades com menor tributacao
- Uso de incentivos fiscais municipais/estaduais quando disponiveis

## Flow

1. Diagnosticar carga tributaria atual detalhada
2. Mapear estrategias de elisao fiscal aplicaveis ao perfil
3. Calcular economia potencial de cada estrategia
4. Avaliar riscos legais e operacionais
5. Priorizar por relacao impacto/risco/complexidade
6. Elaborar plano de implementacao com cronograma
