---
task: Deep Trace
responsavel: "@diagnostician"
responsavel_type: agent
squad: quality-shield
atomic_layer: task
elicit: false
Entrada: |
  - diagnosis_report: Relatorio inicial do diagnose (causa raiz direta)
  - affected_files: Arquivos identificados no diagnostico
  - severity: Nivel de severidade
  - trace_depth: Profundidade maxima do trace (default: 5)
Saida: |
  - deep_trace_report: Relatorio com arvore completa de dependencias afetadas
  - transitive_consumers: Lista de consumidores transitivos alem do nivel direto
  - hidden_risks: Riscos nao obvios encontrados no trace profundo
  - environment_divergences: Diferencas localhost vs producao encontradas no trace
Checklist:
  - "[ ] Carregar dependency-graph.yaml"
  - "[ ] Partir dos arquivos afetados do diagnostico inicial"
  - "[ ] Tracar consumidores nivel 1 (diretos)"
  - "[ ] Tracar consumidores nivel 2 (transitivos)"
  - "[ ] Tracar consumidores nivel 3+ (profundos, ate trace_depth)"
  - "[ ] Identificar ciclos ou dependencias circulares"
  - "[ ] Identificar shared utilities no caminho"
  - "[ ] Mapear diferencas de comportamento localhost vs producao em cada nivel"
  - "[ ] Classificar riscos ocultos encontrados"
  - "[ ] Gerar relatorio de trace profundo"
---

# \*deep-trace

Traca dependencias alem do nivel direto, construindo a arvore completa de impacto transitivo de uma mudanca. Complementa o diagnostico inicial com visao profunda.

## Entrada

O Diagnostician (Sage) executa apos o diagnostico inicial quando:

- **Severidade CRITICO ou ALTO**: Automaticamente (risco justifica trace profundo)
- **Blast radius HIGH**: Impact Analyst solicitou mais dados
- **On demand**: Chief solicita para investigacao mais profunda

Recebe:

- **Diagnosis Report**: Causa raiz e arquivos do diagnostico inicial
- **Affected Files**: Ponto de partida do trace
- **Severity**: Determina profundidade e rigor
- **Trace Depth**: Limite de niveis (default 5, max 8)

## Execucao

### Passo 1: Carregar Contexto

```
Ler:
- squads/quality-shield/data/dependency-graph.yaml
- squads/quality-shield/data/feature-flows.md
- squads/quality-shield/data/known-interconnections.md
```

### Passo 2: Construir Arvore de Dependencias

```
Para cada arquivo afetado (raiz):

Nivel 0: Arquivo modificado
  │
  Nivel 1: Grep imports diretos
  │  Para cada consumidor direto:
  │    - Ler o arquivo
  │    - Identificar COMO usa o codigo afetado
  │    - Marcar: re-exporta? Transforma? Passa adiante?
  │
  Nivel 2: Para cada consumidor que re-exporta ou passa adiante:
  │    - Repetir grep de imports
  │    - Identificar consumidores do consumidor
  │
  Nivel N: Continuar ate trace_depth ou ate nao encontrar mais consumidores
```

### Passo 3: Detectar Padroes de Risco

```
Para cada caminho na arvore:

1. Ciclos: A importa B que importa C que importa A?
   → ALERTA: Mudanca pode propagar infinitamente

2. Shared Utilities: Arquivo usado por 5+ consumidores?
   → ALERTA: Ponto de amplificacao de risco

3. Context Providers: Mudanca em context que alimenta N componentes?
   → ALERTA: Blast radius ampliado via React tree

4. Service Layer: Service usado por multiplos hooks?
   → ALERTA: Comportamento pode mudar para fluxos nao relacionados

5. State Propagation: Estado alterado propagado via props/context?
   → ALERTA: Side effects em componentes distantes
```

### Passo 4: Mapear Divergencias de Ambiente

```
Para cada nivel do trace:
1. O codigo tem comportamento diferente em localhost vs producao?
2. Usa environment variables?
3. Depende de servicos externos (OAuth, Google Places, Supabase Edge Functions)?
4. Tem caching que difere entre ambientes?
5. Tem timeouts que podem variar com latencia de rede?
```

### Passo 5: Gerar Relatorio

```
Formato:

## Deep Trace Report

**Profundidade alcancada:** N niveis
**Total de consumidores encontrados:** X
**Riscos ocultos:** Y

### Arvore de Dependencias
[arvore visual com niveis]

### Consumidores Transitivos
| Nivel | Arquivo | Como Usa | Risco | Nota |
|-------|---------|----------|-------|------|

### Riscos Ocultos
| Tipo | Descricao | Arquivo | Severidade |
|------|-----------|---------|------------|

### Divergencias de Ambiente
| Nivel | Arquivo | Divergencia | Impacto Potencial |
|-------|---------|-------------|-------------------|

### Recomendacoes
- [recomendacoes para o Impact Analyst]
```

## Saida

- **Deep Trace Report** → passado ao Impact Analyst (Nova) via Chief para refinar analise de impacto
- **Hidden Risks** → usados pelo Chief para decidir se escala ao usuario

## Regras

- NUNCA propor fix. Apenas tracar e reportar.
- Respeitar trace_depth - nao ir alem do limite.
- Se encontrar ciclo, PARAR naquele ramo e reportar.
- Shared utilities com 5+ consumidores sao SEMPRE high risk.
- Ser explicito sobre o que NAO conseguiu tracar (ex: dynamic imports).
