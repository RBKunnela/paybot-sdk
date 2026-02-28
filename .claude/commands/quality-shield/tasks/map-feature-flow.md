---
task: Map Feature Flow
responsavel: "@chief"
responsavel_type: agent
squad: quality-shield
atomic_layer: task
elicit: true
Entrada: |
  - feature_name: Nome do fluxo a mapear (ex: "google-oauth-login", "criar-review")
Saida: |
  - flow_map: Mapa completo do fluxo adicionado em feature-flows.md
Checklist:
  - "[ ] Identificar ponto de entrada do usuario"
  - "[ ] Tracar caminho: tela → componente → hook → service → API/DB"
  - "[ ] Identificar todos os estados possiveis (sucesso, erro, loading)"
  - "[ ] Identificar dependencias externas (OAuth, Google Places, etc)"
  - "[ ] Documentar diferenca localhost vs producao (se houver)"
  - "[ ] Adicionar em feature-flows.md"
---

# \*map-feature-flow

Mapeia um fluxo de usuario completo, do ponto de entrada ate o resultado final.

## Entrada

- **Feature Name**: Nome do fluxo a mapear

## Elicitacao

```
? Qual fluxo voce quer mapear?
  > google-oauth-login
    email-login
    reset-password
    feed
    discover
    criar-review
    listas
    profile
    [outro - especificar]
```

## Execucao

### Passo 1: Identificar Ponto de Entrada

```
Qual tela/componente inicia esse fluxo?
Ex: google-oauth-login → LoginScreen.tsx → botao "Entrar com Google"
```

### Passo 2: Tracar Caminho Completo

```
Seguir o codigo do ponto de entrada ate o resultado final:

Acao do usuario
  → Componente (qual? que funcao chama?)
    → Hook (qual? que metodo?)
      → Service (qual? que funcao?)
        → API/DB (qual endpoint? qual tabela?)
          → Resposta
        ← Service processa
      ← Hook atualiza estado
    ← Componente re-renderiza
  → Usuario ve resultado
```

### Passo 3: Mapear Estados

```
Para cada ponto do fluxo:
- Estado de sucesso: o que acontece quando tudo da certo
- Estado de erro: o que acontece quando falha
- Estado de loading: o que o usuario ve enquanto espera
- Edge cases: situacoes incomuns (timeout, rede lenta, dados invalidos)
```

### Passo 4: Dependencias Externas

```
Identificar servicos externos que o fluxo depende:
- OAuth providers (Google)
- Google Places API
- Supabase Edge Functions
- CDN/Storage para imagens
→ Esses sao pontos que podem se comportar diferente em localhost vs prod
```

### Passo 5: Documentar e Salvar

```
Adicionar em squads/quality-shield/data/feature-flows.md
Formato:

## [nome-do-fluxo]

**Ponto de entrada:** [tela/componente]
**Resultado esperado:** [o que o usuario deve ver]
**Dependencias externas:** [lista]

### Caminho
[acao] → [componente] → [hook] → [service] → [API/DB]

### Arquivos Envolvidos
- [arquivo1] - [papel]
- [arquivo2] - [papel]

### Estados
- Sucesso: [descricao]
- Erro: [descricao]
- Loading: [descricao]

### Diferenca Localhost vs Producao
[se aplicavel]
```

## Regras

- Tracar o caminho COMPLETO, nao pular etapas
- Incluir TODOS os arquivos envolvidos
- Documentar diferenca localhost vs producao sempre que houver
- O mapa deve ser detalhado o suficiente para o Impact Analyst avaliar impacto
