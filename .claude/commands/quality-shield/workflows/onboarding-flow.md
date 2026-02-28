---
workflow: Onboarding Flow
responsavel: "@chief"
responsavel_type: agent
squad: quality-shield
description: >
  Fluxo de onboarding para novos membros da equipe ou novos contextos.
  Apresenta capacidades do squad, dados disponiveis, fluxos criticos,
  e executa um health check demonstrativo.
trigger: "Primeiro uso do squad ou *onboarding"
---

# Onboarding Flow

Workflow que apresenta o Quality Shield squad para novos usuarios ou novos contextos de projeto. Garante que o usuario entenda as capacidades, dados disponiveis, e como acionar o squad.

## Quando Executar

- **Primeiro uso**: Detectado quando usuario ativa @quality-shield pela primeira vez
- **On demand**: Quando usuario solicita `*onboarding`
- **Novo contexto**: Quando projeto ou equipe muda significativamente

## Fluxo Visual

```
Usuario ativa @quality-shield (primeiro uso)
       │
       ▼
┌──────────────┐
│  Boas-Vindas │ Apresentacao do squad
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Inventario  │ Mostrar dados e cobertura atual
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Health Check │ Demonstrativo - verificar estado atual
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Comandos    │ Apresentar comandos disponiveis
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Pronto      │ Squad ativo e pronto para uso
└──────────────┘
```

## Etapas Detalhadas

### 1. Boas-Vindas

```
Chief apresenta:

## Quality Shield - Seu Squad de Qualidade

Ola! Sou o Chief do Quality Shield, seu squad operacional para resolucao
de bugs e manutencao de qualidade.

**Minha equipe:**
- **Sage** (Diagnostician) - Traca causa raiz de bugs
- **Nova** (Impact Analyst) - Mapeia raio de explosao de mudancas
- **Shield** (Regression Guard) - Testa regressao em niveis progressivos
- **Sentinel** (Production Monitor) - Verifica producao e roda health checks

**Agentes parceiros:**
- **@dev** (Dex) - Implementa fixes com contexto completo
- **@devops** (Gage) - Deploy com rollback plan

**Como funciona:**
Voce reporta um bug → eu orquestro a equipe do diagnostico ate o deploy verificado.
Voce so precisa dizer o que esta errado e a severidade. O resto e automatico.
```

### 2. Inventario de Dados

```
Chief verifica e apresenta o estado atual dos dados do squad:

### Dados Disponiveis

| Dado                  | Status | Entradas | Ultima Atualizacao |
|-----------------------|--------|----------|--------------------|
| Knowledge Base        | [OK/VAZIO] | N bugs | [data]         |
| Dependency Graph      | [OK/DESATUALIZADO] | N nodes | [data] |
| Feature Flows         | [OK/INCOMPLETO] | N fluxos | [data]   |
| Regression Patterns   | [OK/VAZIO] | N padroes | [data]       |
| Known Interconnections| [OK/VAZIO] | N | [data]               |

### Cobertura de Fluxos Criticos

| Fluxo              | Mapeado | Testavel | Health Check |
|--------------------|---------|----------|-------------|
| login-email        | [S/N]   | [S/N]    | [S/N]       |
| login-google-oauth | [S/N]   | [S/N]    | [S/N]       |
| reset-password     | [S/N]   | [S/N]    | [S/N]       |
| feed               | [S/N]   | [S/N]    | [S/N]       |
| discover           | [S/N]   | [S/N]    | [S/N]       |
| create-review      | [S/N]   | [S/N]    | [S/N]       |
| lists              | [S/N]   | [S/N]    | [S/N]       |
| profile            | [S/N]   | [S/N]    | [S/N]       |

Se dados desatualizados ou vazios:
  "Recomendo rodar *build-dependency-graph e *map-all-flows para
   preencher os dados. Isso melhora a qualidade do diagnostico."
```

### 3. Health Check Demonstrativo

```
Chief roda um quick health check para mostrar como funciona:

Executando health check rapido (demonstrativo)...

### Health Check - Quick
| Fluxo        | Status  | Nota                |
|--------------|---------|---------------------|
| Login page   | [OK/FAIL] | [detalhes se fail]|
| Feed         | [OK/FAIL] | [detalhes se fail]|

Se tudo OK:
  "Producao saudavel. O squad esta pronto para uso."

Se algo falhou:
  "Detectei um problema! Quer que eu inicie o fluxo de fix?
   Use: reportar o bug com a severidade adequada."
```

### 4. Comandos Disponiveis

```
Chief apresenta:

### Comandos do Quality Shield

**Resolver bugs (fluxo principal):**
- Reportar um bug → Chief orquestra automaticamente
- Definir severidade: CRITICO / ALTO / MEDIO / BAIXO

**Diagnostico e analise:**
- `*diagnose` - Diagnosticar um bug isoladamente
- `*analyze-impact` - Analisar impacto de uma mudanca
- `*deep-trace` - Trace profundo de dependencias
- `*dependency-risk-score` - Score de risco de uma mudanca

**Monitoramento:**
- `*health-check` - Verificar saude da producao
- `*production-verify` - Verificar deploy em producao

**Knowledge base:**
- `*kb-search` - Buscar na base de conhecimento
- `*kb-record` - Registrar bug resolvido
- `*kb-maintenance` - Manutencao periodica da KB

**Setup e mapeamento:**
- `*build-dependency-graph` - Construir grafo de dependencias
- `*map-feature-flow` - Mapear um fluxo especifico
- `*map-all-flows` - Mapear todos os fluxos criticos

**Regressao:**
- `*regression-check` - Executar testes de regressao
- `*regression-report` - Gerar relatorio de regressao

### Atalhos

- Para fix rapido de bug critico: reportar com severidade CRITICO
  → ativa hotfix-flow automaticamente
- Para verificar se deploy quebrou algo: `*health-check`
- Para investigar antes de mudar codigo: `*analyze-impact`
```

### 5. Finalizacao

```
Chief confirma:

Squad Quality Shield ativo e pronto.

Dica: quando encontrar um bug, basta descrever o que esta acontecendo
e eu cuido do resto. Vou perguntar a severidade e orquestrar a equipe.

Boa codificacao!
```

## Regras

- Onboarding deve ser CURTO e PRATICO - nao mais que 2 minutos de leitura
- Health check demonstrativo deve ser QUICK (login + feed), nunca full
- Se dados estao vazios, sugerir setup mas NAO bloquear o onboarding
- Apresentar comandos mais uteis primeiro, avancados depois
- Tom amigavel e direto - o usuario quer resolver bugs, nao ler documentacao
