---
task: Analyze Impact
responsavel: "@impact-analyst"
responsavel_type: agent
squad: quality-shield
atomic_layer: task
elicit: false
Entrada: |
  - diagnosis_report: Relatorio do Diagnostician com causa raiz e arquivos
  - severity: Nivel de severidade
Saida: |
  - impact_report: Relatorio de impacto com raio de explosao
  - regression_checklist: Checklist especifico para o Regression Guard
  - dev_context: Contexto para o @dev (o que nao quebrar)
Checklist:
  - "[ ] Carregar dependency-graph.yaml"
  - "[ ] Carregar feature-flows.md"
  - "[ ] Carregar known-interconnections.md"
  - "[ ] Identificar escopo da mudanca (arquivos/funcoes)"
  - "[ ] Tracar consumidores diretos"
  - "[ ] Tracar consumidores transitivos"
  - "[ ] Mapear fluxos de usuario afetados"
  - "[ ] Classificar risco de cada fluxo (HIGH/MEDIUM/LOW)"
  - "[ ] Gerar checklist de regressao especifico"
  - "[ ] Gerar contexto para @dev"
---

# \*analyze-impact

Mapeia o raio de explosao de uma mudanca proposta, identificando tudo que pode quebrar.

## Entrada

O Impact Analyst (Nova) recebe do Chief (via Diagnostician):

- **Diagnosis Report**: Causa raiz, arquivos envolvidos, fluxo afetado
- **Severidade**: Nivel definido pelo usuario

## Execucao

### Passo 1: Carregar Contexto do Sistema

```
Ler:
- squads/quality-shield/data/dependency-graph.yaml
- squads/quality-shield/data/feature-flows.md
- squads/quality-shield/data/known-interconnections.md
```

### Passo 2: Identificar Escopo da Mudanca

```
Do relatorio do Diagnostician:
1. Quais arquivos serao modificados?
2. Quais funcoes serao alteradas?
3. Que tipo de mudanca? (assinatura, comportamento, estado, timing)
4. Ler cada arquivo para entender comportamento atual
```

### Passo 3: Tracar Consumidores

```
Para cada arquivo/funcao afetada:
1. Grep por imports e referencias
2. Para cada consumidor:
   a. Ler o arquivo
   b. A mudanca afeta o comportamento dele?
   c. Ele passa os dados afetados para OUTROS? (transitivo)
3. Construir arvore de consumidores:
   Arquivo modificado
   ├── Consumidor direto 1
   │   ├── Transitivo 1a
   │   └── Transitivo 1b
   └── Consumidor direto 2
```

### Passo 4: Mapear Fluxos Afetados

```
Para cada consumidor (direto + transitivo):
1. Qual feature flow passa por ele? (de feature-flows.md)
2. Qual acao do usuario toca esse codigo?
3. Classificar risco:
   - HIGH: Fluxo core (login, feed, reviews, discover, lists, profile)
   - MEDIUM: Fluxo importante (notifications, settings, social)
   - LOW: Edge case ou path raro
4. Marcar fluxos com diferenca localhost vs prod
```

### Passo 5: Gerar Relatorio de Impacto

```
Inclui:
- Raio de explosao geral (LOW/MEDIUM/HIGH/CRITICAL)
- Consumidores diretos (tabela)
- Consumidores transitivos (tabela com chain)
- Fluxos afetados (tabela com risco)
- Checklist de regressao ESPECIFICO (passos exatos, nao generico)
- Alertas (localhost vs prod, race conditions, timing)
- Contexto para @dev (o que NAO alterar, cuidados, o que testar localmente)
```

## Saida

- **Impact Report** → passado ao @dev via Chief (contexto para implementar)
- **Regression Checklist** → passado ao Regression Guard via Chief (o que testar)

## Regras

- SEMPRE tracar consumidores transitivos (nao so diretos)
- O checklist de regressao deve ter PASSOS EXATOS, nao generico
- Classificar CADA fluxo afetado com risco
- Incluir contexto para @dev sobre o que nao quebrar
