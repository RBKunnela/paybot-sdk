---
task: Search Knowledge Base
responsavel: "@chief"
responsavel_type: agent
squad: quality-shield
atomic_layer: task
elicit: false
Entrada: |
  - query: Sintoma, arquivo, fluxo, padrao ou keyword para buscar
Saida: |
  - matches: Lista de bugs similares encontrados
  - patterns: Padroes relacionados
  - recommendations: Sugestoes baseadas no historico
Checklist:
  - "[ ] Ler knowledge-base.yaml"
  - "[ ] Buscar por sintoma similar"
  - "[ ] Buscar por arquivos similares"
  - "[ ] Buscar por fluxos similares"
  - "[ ] Buscar por padroes similares"
  - "[ ] Retornar matches ordenados por relevancia"
---

# \*kb-search

Busca na knowledge base por bugs similares ao problema atual.

## Entrada

- **Query**: Pode ser um sintoma, nome de arquivo, nome de fluxo, ou keyword

## Execucao

### Passo 1: Ler KB

```
Ler: squads/quality-shield/data/knowledge-base.yaml
Ler: squads/quality-shield/data/regression-patterns.md
```

### Passo 2: Buscar Matches (com pesos)

Para cada entrada na KB, calcular score de similaridade usando pesos:

```
PESOS DE RELEVANCIA:
  symptom_exact:    10   # Query aparece como substring exata no symptom
  symptom_partial:   5   # Palavras-chave do query aparecem no symptom
  files_match:       8   # Query referencia um arquivo afetado (path parcial conta)
  pattern_match:     8   # Query se encaixa num padrao de regression-patterns.md
  root_cause_match:  6   # Palavras-chave do query aparecem na root_cause
  flows_match:       4   # Query menciona um fluxo afetado
  what_caused_match: 3   # Palavras-chave no what_caused_it
  environment_match: 2   # Mesmo ambiente (localhost/prod)

CALCULO:
  score = soma de todos os pesos que deram match
  Se multiplos campos match: score recebe bonus de +3 (correlacao forte)

CLASSIFICACAO:
  score >= 15: ALTA relevancia
  score >= 8:  MEDIA relevancia
  score >= 3:  BAIXA relevancia
  score < 3:   descartado
```

Para cada entrada na KB, verificar match em:

1. **Sintoma (peso 10/5):** O query aparece no campo symptom? Exato ou parcial?
2. **Arquivos (peso 8):** O query referencia algum arquivo afetado? (match parcial de path conta)
3. **Padrao (peso 8):** O query se encaixa num padrao de regression-patterns.md?
4. **Causa raiz (peso 6):** O query se parece com alguma causa raiz conhecida?
5. **Fluxos (peso 4):** O query menciona algum fluxo afetado?
6. **Explicacao (peso 3):** Palavras-chave aparecem no what_caused_it?
7. **Ambiente (peso 2):** O contexto e o mesmo (localhost vs prod)?

### Passo 3: Rankear e Retornar

```
ALGORITMO:
  1. Calcular score para cada entrada na KB
  2. Descartar entries com score < 3
  3. Ordenar por score decrescente
  4. Retornar top 5 (configuravel em squad-config.yaml: knowledge_base.max_search_results)

BONUS:
  - Se query contem nome de arquivo E esse arquivo tem padrao conhecido: +5
  - Se query descreve sintoma E existe bug com mesma severidade: +2

FALLBACK (KB com < 5 entries):
  - Reduzir threshold para score >= 1
  - Incluir TODOS os padroes de regression-patterns.md como sugestoes
  - Informar: "KB em fase inicial - X entries. Padroes conhecidos listados como referencia."

Retornar top 5 matches com:
  - ID do bug
  - Sintoma original
  - Causa raiz
  - Fix que foi aplicado
  - Score numerico + classificacao (ALTA/MEDIA/BAIXA)
  - Campo(s) que deram match (para o Diagnostician saber por que e relevante)
```

## Formato de Saida

```
### Bugs Similares Encontrados

| # | ID | Sintoma | Causa Raiz | Score | Relevancia | Match em |
|---|----|---------|------------|-------|------------|----------|
| 1 | BUG-XXX | [sintoma] | [causa] | 18 | ALTA | symptom, files, pattern |
| 2 | BUG-YYY | [sintoma] | [causa] | 10 | MEDIA | files, root_cause |

### Padroes Relacionados
- [padrao-nome]: [descricao do padrao]
  - Primeira acao: [o que checar primeiro]
  - Arquivos tipicos: [onde costuma estar o problema]

### Recomendacao
[Se score >= 15]: "Bug similar ja resolvido (BUG-ID). Verificar se mesma causa raiz. Fix anterior: [resumo]."
[Se score >= 8]: "Padrao conhecido: [nome]. Verificar [arquivos/funcoes especificos]."
[Se score >= 3]: "Match parcial encontrado. Usar como ponto de partida, mas analise fresca recomendada."
[Se sem match]: "Nenhum bug similar encontrado na KB (X entries analisadas). Analise fresca necessaria."
[Se KB vazia]: "KB vazia. Padroes conhecidos de regression-patterns.md listados como referencia."
```

## Regras

- Executada SEMPRE antes do Diagnostician comecar analise fresca
- Retornar no maximo 5 matches mais relevantes
- Incluir o fix que foi aplicado anteriormente (pode ser util)
- Se match de alta relevancia, destacar - pode economizar horas de diagnostico
