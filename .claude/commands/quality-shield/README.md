# quality-shield

Squad operacional para resolver bugs com fluxo 100% automatico. Diagnostico de causa raiz, analise de impacto, fix seguro, teste de regressao, deploy com rollback plan, e verificacao em producao. Knowledge base que aprende com cada bug resolvido.

## Quick Start

```
/AIOS:agents:quality-shield
```

O Chief ativa, roda health check rapido em producao, e aguarda seu report.

### Comandos

| Comando | Descricao |
|---------|-----------|
| `*fix` | Reportar bug e iniciar fluxo automatico completo |
| `*health-check` | Health check em todos os fluxos criticos (producao) |
| `*kb-search {termo}` | Buscar bugs similares na knowledge base |
| `*kb-record` | Registrar bug manualmente na KB |
| `*build-graph` | Construir/reconstruir grafo de dependencias |
| `*map-flows` | Mapear todos os fluxos de usuario |
| `*status` | Status do squad (KB entries, graph, ultimo health check) |
| `*help` | Todos os comandos |
| `*exit` | Sair do modo quality-shield |

## Agents

| Agent | Persona | Papel |
|-------|---------|-------|
| **Chief** | Commander | Orchestrador. Ponto unico de contato. Recebe bug e roda o fluxo inteiro. |
| **Diagnostician** (Sage) | Analyst | Traca causa raiz via code tracing. Produz diagnostico com evidencia. |
| **Impact Analyst** (Nova) | Mapper | Mapeia raio de explosao. Identifica fluxos afetados e gera checklist de regressao. |
| **Regression Guard** (Shield) | Guardian | Testa regressao em N niveis conforme severidade. Aprova ou reprova fix. |
| **Production Monitor** (Sentinel) | Watcher | Verifica fluxos em producao via Playwright. Confirma deploy ou aciona rollback. |

**External:** @dev (Dex) implementa fixes, @devops (Gage) faz deploy com rollback plan.

## Bug Fix Flow

```
Usuario reporta bug → Chief pergunta severidade
    │
    ▼
KB Search → Diagnostician (causa raiz) → Impact Analyst (raio de explosao)
    │
    ▼
@dev implementa fix → Regression Guard (N niveis por severidade)
    │
    ├── REPROVADO → loop back (max 3x)
    │
    ▼ APROVADO
@devops deploy → Health Check Gate → Production Verify (CRITICO/ALTO)
    │
    ├── ROLLBACK → @devops reverte + loop back
    │
    ▼ CONFIRMADO
KB Record → Resultado Final ao usuario
```

O usuario so interage no inicio (report + severidade). Tudo entre KB Search e KB Record e automatico.

## Severity Matrix

| Severidade | Regressao | Producao | Max Loops | Exemplos |
|------------|-----------|----------|-----------|----------|
| CRITICO | Niveis 1-4 | Sim | 3 | login, discover, feed, reviews, listas, profile |
| ALTO | Niveis 1-3 | Sim | 2 | notifications, settings, social |
| MEDIO | Niveis 1-2 | Nao | 1 | Funcoes secundarias |
| BAIXO | Nivel 1 | Nao | 1 | UI, texto, estilo |

**Niveis de regressao:**
1. `npm test` (unitarios)
2. Static flow trace (fluxos afetados)
3. Integration tests (CRITICO/ALTO)
4. Manual checklist step-by-step (CRITICO)

## Structure

```
squads/quality-shield/
├── squad.yaml                    # Manifest
├── README.md                     # Este arquivo
├── config/
│   └── squad-config.yaml         # Timeouts, severidade, health check, regression config
├── agents/
│   ├── chief.md                  # Orchestrador
│   ├── diagnostician.md          # Sage - causa raiz
│   ├── impact-analyst.md         # Nova - raio de explosao
│   ├── regression-guard.md       # Shield - testes de regressao
│   └── production-monitor.md     # Sentinel - verificacao producao
├── tasks/
│   ├── diagnose.md               # Diagnostico de causa raiz
│   ├── analyze-impact.md         # Analise de impacto
│   ├── regression-check.md       # Teste de regressao (4 niveis)
│   ├── production-verify.md      # Verificacao pos-deploy
│   ├── health-check.md           # Health check (quick/full)
│   ├── kb-record.md              # Registrar na knowledge base
│   ├── kb-search.md              # Buscar na knowledge base
│   ├── build-dependency-graph.md # Construir grafo de dependencias
│   ├── map-feature-flow.md       # Mapear fluxo individual
│   └── map-all-flows.md          # Mapear todos os fluxos
├── workflows/
│   └── bug-fix-flow.md           # Fluxo completo de resolucao
├── checklists/
│   └── regression-checklist.md   # Checklist base de regressao
├── templates/
│   ├── diagnosis-report.md       # Template de relatorio de diagnostico
│   ├── impact-report.md          # Template de relatorio de impacto
│   └── kb-entry.yaml             # Template de entrada na KB
├── tools/
│   └── playwright-setup.md       # Setup do Playwright para health checks
├── scripts/
│   ├── scan-imports.md           # Scanner de imports do codebase
│   └── kb-search-helper.md       # Helper de busca na KB
└── data/
    ├── feature-flows.md          # 77 sub-fluxos mapeados (2,248 linhas)
    ├── dependency-graph.yaml     # Grafo de dependencias do projeto
    ├── knowledge-base.yaml       # Bugs resolvidos (memoria institucional)
    ├── known-interconnections.md # Conexoes conhecidas entre modulos
    └── regression-patterns.md    # Padroes de regressao documentados
```

## Timeouts

| Etapa | Timeout | Se exceder |
|-------|---------|------------|
| KB Search | 1 min | Skip, analise fresca |
| Diagnostico | 5 min | Diagnostico parcial + pedir contexto |
| Analise de Impacto | 3 min | Analise parcial (consumidores diretos) |
| Fix | 15 min | Verificar status com @dev |
| Regressao | 5 min | Resultados parciais (niveis completos) |
| Deploy | 3 min | Verificar status do deploy |
| Producao | 5 min | Verificacao parcial |
| **Fluxo Total** | **40 min** | Parar, salvar estado, escalar |

## Health Check vs Production Verify

| Aspecto | Health Check | Production Verify |
|---------|-------------|-------------------|
| Quando | On activation, on demand, gate pos-deploy | Somente apos deploy no bug-fix-flow |
| Escopo | Quick (login+feed) ou Full (8 fluxos) | Fluxos afetados + todos os criticos |
| Objetivo | Monitoramento proativo | Verificacao do deploy |
| Se falha | Alerta usuario | Rollback imediato + loop back |
| Severidade | Todas | CRITICO e ALTO |

## Data

### Feature Flows (77 sub-fluxos)

Cada sub-fluxo documenta: entry point, path completo (Component -> Hook -> Service -> Supabase), arquivos envolvidos, e estados (loading/success/error).

- **Lists**: 12 sub-fluxos (criar, editar, excluir, mudar foto, salvar/dessalvar, reordenar, compartilhar, add/remove restaurante)
- **Feed**: 24 sub-fluxos (like, comment, reply, delete, edit, share, report, save to list, follow, infinite scroll, etc.)
- **Profile**: 18 sub-fluxos (edit, change photo, followers/following, follow/unfollow, block, report, etc.)
- **NewReview**: 9 sub-fluxos (select restaurant, upload photos, set scores, tags, draft, submit)
- **Discover**: 6 sub-fluxos (search restaurants, filter, search profiles, recent searches)
- **Settings**: 5 sub-fluxos (edit profile, change password, privacy, notifications, logout)
- **Notifications**: 3 sub-fluxos (view, mark as read, navigate)

### Knowledge Base

YAML-based. Cada entrada registra: sintoma, causa raiz, fix aplicado, arquivos, fluxos afetados, ambiente, severidade, data. Padroes similares sao detectados automaticamente em bugs futuros via `*kb-search`.

### Dependency Graph

Grafo completo de dependencias do projeto mapeando: screens -> hooks -> services -> Supabase tables, com metadata de tipo e relacoes.

## Requirements

- **AIOS**: >= 2.1.0
- **Playwright**: Para health checks e production verify (instalar com `npx playwright install chromium`)
- **Node.js**: Para `npm test` nos testes de regressao

## Version

- **Current**: 1.3.0
- **Author**: opone
- **License**: MIT
