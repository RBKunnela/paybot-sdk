---
task: Dependency Risk Score
responsavel: "@impact-analyst"
responsavel_type: agent
squad: quality-shield
atomic_layer: task
elicit: false
Entrada: |
  - diagnosis_report: Relatorio do Diagnostician com causa raiz
  - deep_trace_report: Relatorio do deep-trace (se disponivel)
  - affected_files: Arquivos que serao modificados
  - severity: Nivel de severidade
Saida: |
  - risk_score: Score numerico 0-100 com classificacao
  - risk_breakdown: Detalhamento por categoria de risco
  - risk_matrix: Matriz visual de risco por fluxo
  - recommendation: Recomendacao baseada no score (proceed/caution/halt)
Checklist:
  - "[ ] Carregar dependency-graph.yaml e feature-flows.md"
  - "[ ] Contar consumidores diretos dos arquivos afetados"
  - "[ ] Contar consumidores transitivos (se deep-trace disponivel)"
  - "[ ] Classificar fluxos afetados por criticidade"
  - "[ ] Calcular score de coupling (acoplamento)"
  - "[ ] Calcular score de blast radius (raio de explosao)"
  - "[ ] Calcular score de flow criticality (criticidade dos fluxos)"
  - "[ ] Calcular score de environment sensitivity (sensibilidade a ambiente)"
  - "[ ] Computar score final ponderado"
  - "[ ] Gerar recomendacao baseada no score"
---

# \*dependency-risk-score

Quantifica o risco de uma mudanca proposta com um score numerico 0-100, permitindo decisoes objetivas sobre o nivel de cautela necessario.

## Entrada

O Impact Analyst (Nova) executa como parte do analyze-impact ou sob demanda:

- **Diagnosis Report**: Causa raiz e arquivos envolvidos
- **Deep Trace Report**: Arvore completa de dependencias (se deep-trace foi executado)
- **Affected Files**: Arquivos que serao modificados no fix
- **Severity**: Nivel de severidade do bug

## Execucao

### Passo 1: Carregar Dados

```
Ler:
- squads/quality-shield/data/dependency-graph.yaml
- squads/quality-shield/data/feature-flows.md
- squads/quality-shield/data/known-interconnections.md
```

### Passo 2: Calcular Metricas Individuais

```
4 categorias de risco, cada uma 0-25 pontos:

A) COUPLING SCORE (0-25)
   - Consumidores diretos do(s) arquivo(s) afetado(s)
   - 0-2 consumidores: 0-5 pontos
   - 3-5 consumidores: 6-12 pontos
   - 6-10 consumidores: 13-19 pontos
   - 11+ consumidores: 20-25 pontos
   - Bonus: +3 se arquivo e shared utility
   - Bonus: +3 se arquivo e context provider

B) BLAST RADIUS (0-25)
   - Numero de fluxos de usuario afetados
   - 1 fluxo: 0-5 pontos
   - 2-3 fluxos: 6-12 pontos
   - 4-6 fluxos: 13-19 pontos
   - 7+ fluxos: 20-25 pontos
   - Bonus: +5 se inclui fluxo de autenticacao

C) FLOW CRITICALITY (0-25)
   - Baseado nos fluxos afetados de feature-flows.md
   - So fluxos LOW: 0-5 pontos
   - Mix LOW+MEDIUM: 6-12 pontos
   - Algum HIGH: 13-19 pontos
   - Multiplos HIGH ou CRITICAL: 20-25 pontos
   - Peso: login=25, feed=20, discover=18, reviews=18, lists=15, profile=15

D) ENVIRONMENT SENSITIVITY (0-25)
   - Mudanca e agnositca de ambiente: 0-5 pontos
   - Usa env vars que diferem: 6-12 pontos
   - Depende de servico externo: 13-19 pontos
   - Multiplas dependencias externas + timing: 20-25 pontos
   - Bonus: +5 se envolve OAuth/PKCE
```

### Passo 3: Computar Score Final

```
RISK_SCORE = COUPLING + BLAST_RADIUS + FLOW_CRITICALITY + ENV_SENSITIVITY

Classificacao:
  0-20:  LOW       (verde)   - Mudanca segura, proceder normalmente
  21-40: MODERATE  (amarelo) - Cautela recomendada, seguir fluxo padrao
  41-60: HIGH      (laranja) - Atencao redobrada, deep-trace recomendado
  61-80: CRITICAL  (vermelho) - Risco alto, considerar fix parcial
  81-100: EXTREME  (preto)   - Escalar ao usuario antes de proceder
```

### Passo 4: Gerar Matriz Visual

```
## Risk Matrix

              LOW    MED    HIGH   CRIT
login          -      -      -     [X]
feed           -      -     [X]     -
discover       -     [X]     -      -
reviews        -      -      -      -
lists          -      -      -      -
profile        -      -      -      -
notifications  -      -      -      -
settings       -      -      -      -
```

### Passo 5: Gerar Recomendacao

```
Baseado no score:

LOW (0-20):
  "Proceder com fluxo padrao. Risco baixo."

MODERATE (21-40):
  "Seguir fluxo padrao com atencao. Garantir Nivel 2 de regressao."

HIGH (41-60):
  "Recomendado deep-trace antes de prosseguir.
   Executar regressao ate Nivel 3 independente da severidade."

CRITICAL (61-80):
  "Considerar fix parcial para reduzir blast radius.
   Executar regressao completa (Nivel 4).
   Production verify obrigatorio."

EXTREME (81-100):
  "ESCALAR ao usuario. Risco muito alto para fix automatico.
   Apresentar opcoes: fix parcial, fix faseado, ou aceitar risco."
```

## Saida

```
## Dependency Risk Score

**Score:** [N]/100 - [CLASSIFICACAO]

### Breakdown
| Categoria              | Score | Detalhes                    |
|------------------------|-------|-----------------------------|
| Coupling               | X/25  | N consumidores diretos      |
| Blast Radius           | X/25  | N fluxos afetados           |
| Flow Criticality       | X/25  | Fluxos: [lista]             |
| Environment Sensitivity| X/25  | [detalhes]                  |
| **TOTAL**              | **X/100** |                         |

### Risk Matrix
[matriz visual]

### Recomendacao
[recomendacao baseada no score]
```

## Regras

- SEMPRE mostrar o breakdown, nao so o score final.
- O score e OBJETIVO - seguir a formula, nao ajustar manualmente.
- Se dados insuficientes para alguma categoria, usar score MEDIO (12) e marcar como "estimado".
- A recomendacao e sugestao, nao decisao. Chief decide.
- Bonus points podem ultrapassar 25 na categoria, mas o total da categoria e capped em 25.
