---
task: Diagnose Bug
responsavel: "@diagnostician"
responsavel_type: agent
squad: quality-shield
atomic_layer: task
elicit: false
Entrada: |
  - symptom: Descricao do sintoma reportado pelo usuario
  - severity: Nivel de severidade (CRITICO/ALTO/MEDIO/BAIXO)
  - kb_matches: Bugs similares encontrados na knowledge base (pode ser vazio)
Saida: |
  - diagnosis_report: Relatorio estruturado com causa raiz
  - root_cause: Causa raiz identificada
  - affected_files: Lista de arquivos envolvidos
  - affected_flows: Lista de fluxos afetados
  - evidence: Evidencia do trace (como chegou a conclusao)
  - environment: Localhost / Producao / Ambos
Checklist:
  - "[ ] Consultar knowledge base para bugs similares"
  - "[ ] Entender o sintoma completamente"
  - "[ ] Tracar o fluxo de codigo do ponto de entrada ate o sintoma"
  - "[ ] Identificar onde o fluxo diverge do esperado"
  - "[ ] Confirmar que a causa raiz explica TODOS os sintomas"
  - "[ ] Verificar diferenca localhost vs producao"
  - "[ ] Gerar relatorio de diagnostico estruturado"
---

# \*diagnose

Analisa um bug reportado e identifica a causa raiz real, sem propor fixes.

## Entrada

O Diagnostician (Sage) recebe do Chief:

- **Sintoma**: Descricao do que o usuario esta vendo
- **Severidade**: Nivel definido pelo usuario
- **KB Matches**: Bugs similares da knowledge base (se existirem)

## Execucao

### Passo 1: Verificar Knowledge Base

```
Ler: squads/quality-shield/data/knowledge-base.yaml
Buscar: sintomas similares, arquivos similares, padroes similares
Se encontrou: usar como hipotese inicial (mas ainda verificar)
Se nao: analise fresca
```

### Passo 2: Entender o Sintoma

```
Esclarecer se necessario:
- Qual tela/pagina?
- Qual acao disparou?
- O que esperava acontecer?
- O que aconteceu de fato?
- Localhost ou producao?
- Consistente ou intermitente?
```

### Passo 3: Trace do Fluxo

```
1. Identificar ponto de entrada (tela/componente)
2. Ler o codigo do componente
3. Seguir: componente → hook → service → API/DB
4. Em cada passo verificar:
   - Estado esperado vs real
   - Race conditions
   - Timing dependencies
   - Diferenca localhost vs prod
5. Identificar onde o fluxo diverge
6. Cruzar com dependency-graph.yaml
```

### Passo 4: Identificar Causa Raiz

```
1. Distinguir sintoma de causa
2. Verificar que a causa explica TODOS os sintomas
3. Checar se e especifico de ambiente
4. Perguntar "mas POR QUE isso acontece?" ate chegar na raiz verdadeira
```

### Passo 5: Gerar Relatorio

```
Formato estruturado com:
- Sintoma
- Causa raiz (explicacao tecnica)
- Arquivos envolvidos (com linhas)
- Fluxo afetado
- Evidencia (trace passo a passo)
- Ambiente
- Severidade
- Trace completo
- Patterns da KB
- Diferenca localhost vs producao
```

## Saida

Relatorio de diagnostico passado ao Impact Analyst (Nova) via Chief.

## Regras

- NUNCA propor um fix. Apenas diagnosticar.
- SEMPRE apresentar evidencia, nao suposicoes.
- Se nao conseguir determinar com certeza, dizer o que falta.
- O relatorio deve ser claro o suficiente para o Impact Analyst trabalhar.
