---
task: Build Dependency Graph
responsavel: "@chief"
responsavel_type: agent
squad: quality-shield
atomic_layer: task
elicit: false
Entrada: |
  - codebase_path: Raiz do projeto (default: .)
Saida: |
  - dependency_graph: Grafo completo em dependency-graph.yaml
Checklist:
  - "[ ] Escanear todas as screens em src/screens/"
  - "[ ] Escanear todos os hooks em src/hooks/"
  - "[ ] Escanear todos os services em src/services/"
  - "[ ] Escanear todos os contexts em src/contexts/"
  - "[ ] Escanear todos os components em src/components/"
  - "[ ] Mapear imports entre todos os modulos"
  - "[ ] Identificar shared utilities (usados por 3+ modulos)"
  - "[ ] Gerar dependency-graph.yaml"
---

# \*build-dependency-graph

Escaneia o codebase e gera o grafo completo de dependencias.

## Quando Usar

- **Setup inicial**: Primeira vez que o squad e configurado
- **Rebuild**: Quando muita coisa mudou e o grafo esta desatualizado

## Execucao

### Passo 1: Escanear Modulos

```
Para cada diretorio:
  src/screens/     → Listar todas as telas
  src/hooks/       → Listar todos os hooks
  src/services/    → Listar todos os services
  src/contexts/    → Listar todos os contexts
  src/components/  → Listar todos os components
  src/App.tsx      → Entry point e rotas
  src/AppContext.tsx → Global state
  src/constants.ts → Constants
  src/types.ts     → Shared types
```

### Passo 2: Mapear Imports

```
Para cada arquivo encontrado:
  1. Ler o arquivo
  2. Extrair todas as linhas de import
  3. Classificar cada import:
     - Local (src/*) → registrar dependencia
     - External (node_modules) → registrar pacote
     - Relative (../) → resolver path e registrar
  4. Registrar: { from: arquivo, to: dependencia, type: local|external }
```

### Passo 3: Construir Grafo

```yaml
# Formato do dependency-graph.yaml
screens:
  FeedScreen:
    file: src/screens/FeedScreen.tsx
    imports:
      hooks: [useFeed, useAuth, useSupabase]
      services: [feed.service]
      components: [ReviewCard, LoadingSpinner]
      contexts: [AppContext]
    imported_by: [] # screens geralmente nao sao importadas

hooks:
  useFeed:
    file: src/hooks/useFeed.ts
    imports:
      services: [feed.service]
      hooks: [useSupabase]
      contexts: [AppContext]
    imported_by:
      screens: [FeedScreen]
      # ... outros consumidores

services:
  feed.service:
    file: src/services/feed.service.ts
    imports:
      types: [types.ts]
    imported_by:
      hooks: [useFeed]

# ... etc para todos os modulos
```

### Passo 4: Identificar Pontos Criticos

```
Shared utilities = modulos importados por 3+ outros modulos
→ Esses sao os pontos de maior risco de regressao em cascata
→ Marcar com flag: critical: true

Exemplo:
  useAuth → usado por 10+ telas → CRITICO
  useSupabase → usado por todos os hooks → CRITICO
  AppContext → usado por tudo → CRITICO
```

### Passo 5: Detectar Dependencias Circulares

```
Verificar se existem ciclos no grafo:
  1. Para cada modulo A que importa B: verificar se B (ou cadeia de B) importa A
  2. Ciclos encontrados → marcar com flag: circular: true
  3. Documentar o ciclo completo: A → B → C → A
  4. Ciclos sao pontos de alto risco - mudanca em qualquer no afeta todos
```

### Passo 6: Adicionar Metadados de Versao

```
No topo do dependency-graph.yaml, incluir:
  metadata:
    generated_at: "YYYY-MM-DD HH:MM"
    source_hash: [hash do ultimo commit ao gerar]
    total_modules: [contagem]
    critical_modules: [contagem dos critical: true]
    circular_dependencies: [contagem]

Para verificar staleness:
  - Se source_hash != HEAD atual: grafo potencialmente desatualizado
  - Recomendar rebuild se > 10 commits desde ultima geracao
  - Trigger automatico: Chief verifica freshness no *status command
```

### Passo 7: Salvar

```
Salvar em: squads/quality-shield/data/dependency-graph.yaml
```

## Regras

- Escanear TODOS os arquivos .ts e .tsx em src/
- Resolver paths relativos para paths absolutos
- Identificar e marcar shared utilities
- Detectar e marcar dependencias circulares
- Incluir metadados de versao (generated_at, source_hash)
- O grafo deve ser completo o suficiente para o Impact Analyst mapear qualquer mudanca
