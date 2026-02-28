# GREENFIELD FULLSTACK — FLUXO SEQUENCIAL COMPLETO

> Referencia: `.aios-core/.aios-core/development/workflows/greenfield-fullstack.yaml`
> Gerado em: 2026-02-11

---

## PRE-FLOW — ORQUESTRACAO

```
AGENTE: @aios-master (Orion)
COMANDO: *workflow greenfield-fullstack
```

| # | Acao | Detalhe |
|---|------|---------|
| 0.0.1 | Ativar `@aios-master` | Orquestrador central do AIOS |
| 0.0.2 | `*workflow greenfield-fullstack` | Carrega workflow de `.aios-core/development/workflows/greenfield-fullstack.yaml` |
| 0.0.3 | Identificar phase atual | Verifica `.aios/project-status.yaml` pra saber onde parou |
| 0.0.4 | Direcionar pro agente correto | Indica qual agente ativar na sequencia |

**PAPEL DO @aios-master NO FLUXO:**
- NAO executa as tarefas — orquestra e direciona
- Pode ser chamado a QUALQUER MOMENTO pra saber "qual o proximo passo?"
- Usa `*status` pra mostrar progresso
- Usa `*plan` pra planejar proximas etapas
- Delega TUDO pra agentes especializados
- Volta a ser consultado entre phases/steps quando o usuario precisa de direcao

**HANDOFF →** "Ative `@devops` para fazer o environment bootstrap."

---

## PHASE 0 — ENVIRONMENT BOOTSTRAP

```
AGENTE: @devops (Gage)
COMANDO: *environment-bootstrap
TASK FILE: environment-bootstrap.md
```

| # | Acao | Detalhe |
|---|------|---------|
| 0.1 | Verificar CLIs | `git --version`, `gh --version`, `node --version`, `supabase --version`, `railway --version` |
| 0.2 | Instalar CLIs faltantes | Instala o que nao encontrou |
| 0.3 | Autenticar GitHub | `gh auth login` → verifica `gh auth status` |
| 0.4 | Autenticar Supabase | `supabase login` |
| 0.5 | Autenticar Railway | `railway login` |
| 0.6 | Criar repo Git local | `git init` + `.gitignore` + `README.md` + `package.json` |
| 0.7 | Criar repo GitHub | `gh repo create` |
| 0.8 | Scaffoldar estrutura AIOS | Cria `.aios/config.yaml` |
| 0.9 | Gerar report | Cria `.aios/environment-report.json` |

**OUTPUT:**
```
.aios/config.yaml
.aios/environment-report.json
.gitignore
README.md
package.json
```

**GATE:** `.aios/environment-report.json` existe → Phase 0 DONE

**HANDOFF →** "Abra novo chat. Ative `@analyst` para criar o project brief."

---

## PHASE 1 — DISCOVERY & PLANNING

---

### STEP 1.1 — PROJECT BRIEF

```
AGENTE: @analyst (Atlas)
COMANDO: *create-project-brief
TASK FILE: create-doc.md + project-brief-tmpl.yaml
```

| # | Acao | Detalhe |
|---|------|---------|
| 1.1.0 | (OPCIONAL) `*brainstorm {topic}` | Sessao de ideacao estruturada — task: `facilitate-brainstorming-session.md` |
| 1.1.1 | (OPCIONAL) `*research-prompt {topic}` | Gera prompt pra deep research externo — task: `create-deep-research-prompt.md` |
| 1.1.2 | Carregar template | Le `project-brief-tmpl.yaml` |
| 1.1.3 | Elicitar com usuario | Perguntas sobre visao, publico, problema, solucao, escopo |
| 1.1.4 | (OPCIONAL) Pesquisar mercado | `*perform-market-research` — task: `create-doc.md` + `market-research-tmpl.yaml` |
| 1.1.5 | (OPCIONAL) Analise competitiva | `*create-competitor-analysis` — task: `create-doc.md` + `competitor-analysis-tmpl.yaml` |
| 1.1.6 | Gerar project brief | Preenche template com respostas + pesquisa |
| 1.1.7 | Apresentar ao usuario | Mostra draft pra aprovacao |
| 1.1.8 | Salvar | `docs/project-brief.md` |

**OUTPUT:** `docs/project-brief.md`

**HANDOFF →** "Abra novo chat. Ative `@pm` para criar o PRD."

---

### STEP 1.2 — PRD (Product Requirements Document)

```
AGENTE: @pm (Morgan)
COMANDO: *create-prd
TASK FILE: create-doc.md + prd-tmpl.yaml
```

| # | Acao | Detalhe |
|---|------|---------|
| 1.2.1 | Ler `docs/project-brief.md` | Fonte unica de verdade |
| 1.2.2 | Carregar template | Le `prd-tmpl.yaml` |
| 1.2.3 | Elicitar gaps | Perguntas sobre o que o brief nao cobre |
| 1.2.4 | Definir visao & objetivos | Product vision, goals, success metrics |
| 1.2.5 | Definir publico | Target users, personas |
| 1.2.6 | Definir funcionalidades | Functional Requirements (FRs) |
| 1.2.7 | Definir NFRs | Performance, security, accessibility, scalability |
| 1.2.8 | Priorizar (MoSCoW/RICE) | Must/Should/Could/Won't |
| 1.2.9 | Organizar em Epics | Agrupar FRs em epics logicos |
| 1.2.10 | Criar stories iniciais | Stories de alto nivel por epic |
| 1.2.11 | Definir metricas | KPIs, success criteria |
| 1.2.12 | Embed quality gates | CodeRabbit integration por epic |
| 1.2.13 | Executar `pm-checklist.md` | Validar completude |
| 1.2.14 | Apresentar ao usuario | Draft pra aprovacao |
| 1.2.15 | Salvar | `docs/prd.md` |

**OUTPUT:** `docs/prd.md`

**HANDOFF →** "Abra novo chat. Ative `@ux-design-expert` para criar a front-end spec."

---

### STEP 1.3 — FRONT-END SPEC (UX/UI)

```
AGENTE: @ux-design-expert (Uma)
COMANDO: *create-front-end-spec (e opcionais)
TASK FILE: create-doc.md + front-end-spec-tmpl.yaml
```

| # | Acao | Detalhe |
|---|------|---------|
| 1.3.1 | Ler `docs/prd.md` | Requisitos funcionais |
| 1.3.2 | (OPCIONAL) `*research` | User research — task: `ux-user-research.md` — personas, jornadas, necessidades |
| 1.3.3 | `*wireframe {fidelity}` | Wireframes — task: `ux-create-wireframe.md` — low/mid/high fidelity |
| 1.3.4 | Definir telas | Lista de telas do app |
| 1.3.5 | Definir navigation flow | Fluxo de navegacao entre telas |
| 1.3.6 | Definir componentes | Inventario de componentes (Atomic Design) |
| 1.3.7 | Definir design tokens | Cores, tipografia, espacamento, shadows |
| 1.3.8 | Definir interacoes | Micro-interacoes, animacoes, estados |
| 1.3.9 | Definir responsividade | Breakpoints, adaptacoes mobile/tablet/desktop |
| 1.3.10 | Definir acessibilidade | WCAG AA minimum |
| 1.3.11 | Carregar template | Le `front-end-spec-tmpl.yaml` |
| 1.3.12 | Gerar spec completa | Preenche template |
| 1.3.13 | Salvar | `docs/front-end-spec.md` |

**OUTPUT:** `docs/front-end-spec.md`

| # | (OPCIONAL) Acao | Detalhe |
|---|------|---------|
| 1.3.14 | `*generate-ui-prompt` | Gera prompt AI — task: `generate-ai-frontend-prompt.md` |
| 1.3.15 | Usuario gera UI | Usa v0/Lovable/Bolt com o prompt |
| 1.3.16 | Download projeto | Baixa projeto gerado pra usar na arquitetura |

**HANDOFF →** "Abra novo chat. Ative `@architect` para criar a arquitetura fullstack."

---

### STEP 1.4 — FULLSTACK ARCHITECTURE

```
AGENTE: @architect (Aria)
COMANDO: *create-full-stack-architecture
TASK FILE: create-doc.md + fullstack-architecture-tmpl.yaml
```

| # | Acao | Detalhe |
|---|------|---------|
| 1.4.1 | Ler `docs/prd.md` | Requisitos completos |
| 1.4.2 | Ler `docs/front-end-spec.md` | Spec visual/UX |
| 1.4.3 | (OPCIONAL) `*research {topic}` | Pesquisa tecnica — task: `create-deep-research-prompt.md` |
| 1.4.4 | (CONDICIONAL) Revisar UI gerada | Se usuario usou v0/Lovable, analisa estrutura |
| 1.4.5 | Selecionar stack | Frontend framework, backend, banco, infra |
| 1.4.6 | Definir arquitetura de sistema | Monolith/microservices/serverless/hybrid |
| 1.4.7 | Definir estrutura de pastas | Source tree completa |
| 1.4.8 | Definir API design | REST/GraphQL/tRPC, endpoints, schemas |
| 1.4.9 | Definir data model | Entidades, relacionamentos (alto nivel — detalhe pro @data-engineer) |
| 1.4.10 | Definir auth/security | Auth strategy, RLS, encryption, RBAC |
| 1.4.11 | Definir frontend architecture | State management, routing, component structure |
| 1.4.12 | Definir backend architecture | Services, edge functions, middleware |
| 1.4.13 | Definir infra/deploy | CDN, hosting, CI/CD, environments |
| 1.4.14 | Definir cross-cutting | Logging, monitoring, error handling, caching |
| 1.4.15 | Definir performance strategy | Lazy loading, code splitting, SSR/SSG |
| 1.4.16 | Definir testing strategy | Unit, integration, E2E, coverage goals |
| 1.4.17 | Executar `architect-checklist.md` | Validar completude |
| 1.4.18 | Identificar mudancas no PRD | Novas stories necessarias? Alteracoes? |
| 1.4.19 | Salvar | `docs/fullstack-architecture.md` |

**OUTPUT:** `docs/fullstack-architecture.md` + lista de mudancas sugeridas ao PRD (se houver)

**HANDOFF →** "Ative `@data-engineer` para detalhar o schema do banco de dados."

---

### STEP 1.4b — DATABASE SCHEMA DESIGN (delegado pelo @architect)

```
AGENTE: @data-engineer (Dara)
COMANDOS: *model-domain → *create-schema → *create-rls-policies
TASK FILES: db-domain-modeling.md, create-doc.md + schema-design-tmpl.yaml, create-doc.md + rls-policies-tmpl.yaml
```

| # | Acao | Detalhe |
|---|------|---------|
| 1.4b.1 | Ler `docs/fullstack-architecture.md` | Data model de alto nivel do @architect |
| 1.4b.2 | Ler `docs/prd.md` | Requisitos funcionais que impactam dados |
| 1.4b.3 | `*model-domain` | Sessao de modelagem de dominio — task: `db-domain-modeling.md` |
| 1.4b.3a | ↳ Identificar entidades | Tabelas, relacionamentos, cardinalidade |
| 1.4b.3b | ↳ Definir access patterns | Como os dados serao consultados |
| 1.4b.3c | ↳ Definir constraints | NOT NULL, UNIQUE, CHECK, FK |
| 1.4b.4 | `*create-schema` | Design do schema completo — task: `create-doc.md` + `schema-design-tmpl.yaml` |
| 1.4b.4a | ↳ Definir tabelas | Colunas, tipos, defaults, PK |
| 1.4b.4b | ↳ Definir relacionamentos | FKs, cascading rules |
| 1.4b.4c | ↳ Definir indexes | Baseado em access patterns |
| 1.4b.4d | ↳ Definir audit fields | `id`, `created_at`, `updated_at` em toda tabela |
| 1.4b.4e | ↳ Definir soft deletes | `deleted_at` onde audit trail necessario |
| 1.4b.5 | `*create-rls-policies` | Politicas RLS — task: `create-doc.md` + `rls-policies-tmpl.yaml` |
| 1.4b.5a | ↳ Definir policies por tabela | SELECT, INSERT, UPDATE, DELETE |
| 1.4b.5b | ↳ Definir roles | authenticated, anon, service_role |
| 1.4b.5c | ↳ Definir row-level rules | `auth.uid() = user_id`, tenant isolation |
| 1.4b.6 | (OPCIONAL) `*design-indexes` | Estrategia de indexacao — task: `create-doc.md` + `index-strategy-tmpl.yaml` |
| 1.4b.7 | Salvar docs | |

**OUTPUT:**
```
docs/database-schema.md          # Schema completo
docs/rls-policies.md             # Politicas RLS
docs/index-strategy.md           # (opcional) Estrategia de indexacao
```

**HANDOFF →** Se @architect sugeriu mudancas no PRD: "Ative `@pm` para atualizar o PRD". Se nao: "Ative `@po` para validar."

---

### STEP 1.5 — (CONDICIONAL) ATUALIZAR PRD

```
CONDICAO: @architect sugeriu mudancas no PRD
AGENTE: @pm (Morgan)
```

| # | Acao | Detalhe |
|---|------|---------|
| 1.5.1 | Ler sugestoes do architect | Stories novas, alteracoes em stories, novos FRs |
| 1.5.2 | Atualizar PRD | Incorpora mudancas |
| 1.5.3 | Re-exportar | Sobrescreve `docs/prd.md` com versao atualizada |

**OUTPUT:** `docs/prd.md` (atualizado)

**HANDOFF →** "Ative `@po` para validar todos os artefatos."

---

### STEP 1.6 — VALIDACAO PO (MASTER CHECKLIST)

```
AGENTE: @po (Pax)
COMANDO: *execute-checklist-po
TASK FILE: execute-checklist.md + po-master-checklist.md
```

| # | Acao | Detalhe |
|---|------|---------|
| 1.6.1 | Ler `docs/project-brief.md` | |
| 1.6.2 | Ler `docs/prd.md` | |
| 1.6.3 | Ler `docs/front-end-spec.md` | |
| 1.6.4 | Ler `docs/fullstack-architecture.md` | |
| 1.6.5 | Executar PO Master Checklist | Item por item: |
| | ↳ Brief ↔ PRD alinhados? | Visao, escopo, publico consistentes |
| | ↳ PRD ↔ Spec UI cobertos? | Toda funcionalidade tem tela |
| | ↳ PRD ↔ Architecture viavel? | Stack suporta todos FRs/NFRs |
| | ↳ Stories cobrem todos FRs? | Nenhum FR sem story |
| | ↳ Acceptance criteria claros? | Testaveis, nao-ambiguos |
| | ↳ Dependencias sequenciadas? | Ordem logica de implementacao |
| | ↳ Quality gates planejados? | CodeRabbit em todo epic |
| 1.6.6 | **Se issues encontrados** | → Retorna ao agente responsavel |

**LOOP DE CORRECAO:**
```
1.6.6a  PO identifica issue no PRD       → @pm corrige → volta pro 1.6.5
1.6.6b  PO identifica issue na spec      → @ux corrige → volta pro 1.6.5
1.6.6c  PO identifica issue na arch      → @architect corrige → volta pro 1.6.5
1.6.6d  PO identifica issue no brief     → @analyst corrige → volta pro 1.6.5
        Repete ate ZERO issues
```

| # | Acao | Detalhe |
|---|------|---------|
| 1.6.7 | Aprovar todos artefatos | Status: VALIDATED |

**OUTPUT:** Nenhum arquivo novo — artefatos existentes validados

**GATE:** PO Master Checklist 100% PASS → Phase 1 DONE

**HANDOFF →** "Todos artefatos validados. Ative `@po` para shardar documentos."

---

## PHASE 2 — DOCUMENT SHARDING

```
AGENTE: @po (Pax)
COMANDO: *shard-doc
TASK FILE: shard-doc.md
```

| # | Acao | Detalhe |
|---|------|---------|
| 2.1 | `*shard-doc docs/prd.md` | Sharda PRD |
| 2.1a | ↳ Criar `docs/prd/index.md` | Indice com links pra cada shard |
| 2.1b | ↳ Criar `docs/prd/00-header.md` | Metadata, versao, status |
| 2.1c | ↳ Criar `docs/prd/01-vision.md` | Visao, objetivos, metricas |
| 2.1d | ↳ Criar `docs/prd/02-users.md` | Publico, personas |
| 2.1e | ↳ Criar `docs/prd/03-features.md` | Functional requirements |
| 2.1f | ↳ Criar `docs/prd/04-nfrs.md` | Non-functional requirements |
| 2.1g | ↳ Criar `docs/prd/05-priorities.md` | Priorizacao |
| 2.1h | ↳ Criar `docs/prd/06-epic-01.md` | Epic 1 completo |
| 2.1i | ↳ Criar `docs/prd/06-epic-02.md` ... `06-epic-NN.md` | Cada epic em arquivo separado |
| 2.1j | ↳ Criar `docs/prd/07-metrics.md` | KPIs e success criteria |
| 2.1k | ↳ Criar `docs/prd/08-next-steps.md` | Proximos passos |
| 2.2 | `*shard-doc docs/fullstack-architecture.md` | Sharda Architecture |
| 2.2a | ↳ Criar `docs/architecture/index.md` | Indice |
| 2.2b | ↳ Criar `docs/architecture/01-intro.md` ... `16-standards.md` | 16 secoes |
| 2.3 | Gerar `docs/source-tree.md` | Arvore de arquivos planejada |
| 2.4 | Gerar `docs/tech-stack.md` | Stack tecnica consolidada |
| 2.5 | Gerar `docs/coding-standards.md` | Padroes de codigo do projeto |

**OUTPUT:**
```
docs/prd/                    # 8+ secoes + N epics individuais
docs/prd/index.md
docs/architecture/           # 16+ secoes
docs/architecture/index.md
docs/source-tree.md
docs/tech-stack.md
docs/coding-standards.md
```

**GATE:** Todos shards criados + index gerados → Phase 2 DONE

**HANDOFF →** "Documentos shardados. Ative `@devops` para configurar CI/CD."

---

### STEP 2b — SETUP GITHUB (CI/CD, Branch Protection, CodeRabbit)

```
AGENTE: @devops (Gage)
COMANDO: *setup-github
TASK FILE: setup-github.md
```

| # | Acao | Detalhe |
|---|------|---------|
| 2b.1 | Configurar GitHub Actions | Criar `.github/workflows/` — CI pipeline |
| 2b.1a | ↳ `pr-automation.yml` | Lint + typecheck + test + story-validation por PR |
| 2b.1b | ↳ Coverage report | Post coverage como comentario no PR |
| 2b.1c | ↳ Quality summary | Gate status automatico |
| 2b.2 | Configurar branch protection | Rules pra `main`: require PR, require checks, no force push |
| 2b.3 | Configurar CodeRabbit | Integracao com repo pra review automatico |
| 2b.4 | Configurar secrets | GitHub Secrets necessarios (API keys, etc.) |
| 2b.5 | `*configure-ci` | Setup CI/CD completo — task: `ci-cd-configuration.md` |

**OUTPUT:**
```
.github/workflows/pr-automation.yml
.github/workflows/ci.yml
Branch protection rules configuradas
CodeRabbit integrado
```

**HANDOFF →** "CI/CD configurado. Ative `@ux-design-expert` para setup do design system."

---

### STEP 2c — DESIGN SYSTEM SETUP (opcional mas recomendado)

```
AGENTE: @ux-design-expert (Uma)
COMANDO: *setup
TASK FILE: setup-design-system.md
```

| # | Acao | Detalhe |
|---|------|---------|
| 2c.1 | Ler `docs/front-end-spec.md` | Design tokens, componentes planejados |
| 2c.2 | Ler `docs/architecture/` | Frontend architecture (framework, state mgmt) |
| 2c.3 | `*setup` | Inicializar estrutura do design system — task: `setup-design-system.md` |
| 2c.3a | ↳ Criar tokens base | Cores, tipografia, espacamento, shadows, borders |
| 2c.3b | ↳ Criar theme config | Tailwind config / CSS variables |
| 2c.3c | ↳ Criar component structure | Pastas atoms/molecules/organisms |
| 2c.4 | (OPCIONAL) `*bootstrap-shadcn` | Instalar Shadcn/Radix — task: `bootstrap-shadcn-library.md` |
| 2c.5 | (OPCIONAL) `*tokenize` | Extrair tokens formais — task: `extract-tokens.md` |
| 2c.6 | (OPCIONAL) `*export-dtcg` | Gerar W3C Design Tokens — task: `export-design-tokens-dtcg.md` |

**OUTPUT:**
```
Design tokens configurados (CSS vars / Tailwind)
Estrutura de componentes criada (atoms/molecules/organisms)
Shadcn/Radix instalado (se aplicavel)
```

**HANDOFF →** "Design system pronto. Inicie o dev cycle: ative `@sm` para criar a primeira story."

---

## PHASE 3 — DEVELOPMENT CYCLE

**Este eh um LOOP que repete para cada story de cada epic.**

```
Para cada EPIC (1..N):
  Para cada STORY do epic:
    3.1   @sm             cria story
    3.2   @po             valida story (opcional)
    3.2b  @data-engineer  bootstrap + migrations (condicional: story envolve DB)
    3.3   @dev            implementa story
    3.4   @qa             review (opcional)
    3.5   @dev            fix QA feedback (condicional)
    3.6   @devops         push + PR
  Fim stories
  3.7  @po epic retrospective (opcional)
Fim epics
→ PROJETO COMPLETO
```

---

### STEP 3.1 — CRIAR STORY

```
AGENTE: @sm (River)
COMANDO: *draft
TASK FILE: create-next-story.md + story-tmpl.yaml
CHECKLIST: story-draft-checklist.md
```

| # | Acao | Detalhe |
|---|------|---------|
| 3.1.1 | Ler epic shardado | `docs/prd/06-epic-XX.md` |
| 3.1.2 | Ler architecture shardada | Secoes relevantes de `docs/architecture/` |
| 3.1.3 | Ler `docs/coding-standards.md` | Padroes |
| 3.1.4 | Ler `docs/source-tree.md` | Estrutura de pastas |
| 3.1.5 | Ler `docs/tech-stack.md` | Stack |
| 3.1.6 | Identificar proxima story | Pela sequencia do epic, respeitando dependencias |
| 3.1.7 | Carregar `story-tmpl.yaml` | Template da story |
| 3.1.8 | Preencher Story section | Titulo, descricao, user story format |
| 3.1.9 | Definir Acceptance Criteria | Given-When-Then, testaveis |
| 3.1.10 | Definir Tasks | Lista de tasks com subtasks granulares |
| 3.1.11 | Definir Dev Notes | Contexto tecnico, APIs, patterns, referencia a arch |
| 3.1.12 | Definir Testing section | Testes esperados, cenarios edge case |
| 3.1.13 | Definir Dependencies | Stories que esta depende |
| 3.1.14 | Definir CodeRabbit Integration | Quality gates especificos pra esta story |
| 3.1.15 | Definir branch name | `feature/X.Y-story-name` |
| 3.1.16 | Executar `story-draft-checklist.md` | Validar completude da story |
| 3.1.17 | Status: "Draft" | |
| 3.1.18 | Salvar | `docs/stories/story-X.Y.Z.md` |

**OUTPUT:** `docs/stories/story-X.Y.Z.md` (status: Draft)

**HANDOFF →** "Story criada. Ative `@dev` para implementar." (ou `@po` pra validar, opcional)

---

### STEP 3.2 — (OPCIONAL) VALIDAR STORY DRAFT

```
AGENTE: @po (Pax)
COMANDO: *validate-story-draft {story-path}
TASK FILE: validate-next-story.md
```

| # | Acao | Detalhe |
|---|------|---------|
| 3.2.1 | Ler story draft | `docs/stories/story-X.Y.Z.md` |
| 3.2.2 | Verificar completude | Todos campos preenchidos |
| 3.2.3 | Verificar alinhamento | Story alinha com epic/PRD |
| 3.2.4 | Verificar testabilidade | ACs sao testaveis |
| 3.2.5 | Verificar granularidade | Tasks suficientemente detalhadas pro @dev |
| 3.2.6 | Aprovar ou devolver | Se OK: status → "Approved". Se nao: volta pro @sm |

**OUTPUT:** Story status atualizado (Draft → Approved)

---

### STEP 3.2b — (CONDICIONAL) DATABASE BOOTSTRAP + MIGRATIONS

```
CONDICAO: Story envolve banco de dados (criacao de tabelas, RLS, migrations)
AGENTE: @data-engineer (Dara)
COMANDOS: *setup-database → *snapshot → *dry-run → *apply-migration → *security-audit
TASK FILES: setup-database.md, db-snapshot.md, db-dry-run.md, db-apply-migration.md, security-audit.md
```

**Primeira story com DB do projeto (bootstrap):**

| # | Acao | Detalhe |
|---|------|---------|
| 3.2b.1 | `*setup-database` | Scaffold estrutura Supabase — task: `setup-database.md` |
| 3.2b.1a | ↳ Detectar tipo de banco | Supabase/PostgreSQL/MongoDB/MySQL/SQLite |
| 3.2b.1b | ↳ `*env-check` | Validar env vars — task: `db-env-check.md` |
| 3.2b.1c | ↳ `*bootstrap` | Criar estrutura `supabase/` — task: `db-bootstrap.md` |
| 3.2b.1d | ↳ Criar `supabase/migrations/` | Pasta de migrations |
| 3.2b.1e | ↳ Criar `supabase/seed.sql` | Seed data inicial |

**Toda story com DB (migrations):**

| # | Acao | Detalhe |
|---|------|---------|
| 3.2b.2 | Ler story | Identificar tabelas/campos/relacoes necessarios |
| 3.2b.3 | Ler `docs/database-schema.md` | Schema planejado no Step 1.4b |
| 3.2b.4 | Ler `docs/rls-policies.md` | Politicas RLS planejadas |
| 3.2b.5 | `*snapshot {label}` | Backup ANTES de qualquer alteracao — task: `db-snapshot.md` |
| 3.2b.6 | Escrever migration SQL | DDL: CREATE TABLE, ALTER, indexes, FKs |
| 3.2b.7 | Escrever rollback SQL | Script reverso pra cada migration |
| 3.2b.8 | `*verify-order {path}` | Validar ordem DDL (dependencias) — task: `db-verify-order.md` |
| 3.2b.9 | `*dry-run {path}` | Testar migration sem commitar — task: `db-dry-run.md` |
| 3.2b.10 | `*apply-migration {path}` | Aplicar migration com transacao — task: `db-apply-migration.md` |
| 3.2b.11 | `*policy-apply {table} {mode}` | Instalar RLS policy (KISS ou granular) — task: `db-policy-apply.md` |
| 3.2b.12 | `*security-audit rls` | Auditar cobertura RLS — task: `security-audit.md` |
| 3.2b.13 | `*test-as-user {user_id}` | Testar RLS emulando usuario — task: `test-as-user.md` |
| 3.2b.14 | `*smoke-test {version}` | Testes no schema migrado — task: `db-smoke-test.md` |
| 3.2b.15 | (OPCIONAL) `*seed {path}` | Seed data de teste — task: `db-seed.md` |

**OUTPUT:** Migrations aplicadas + RLS configurado + schema testado

**HANDOFF →** "Banco pronto. Ative `@dev` para implementar a story."

---

### STEP 3.3 — IMPLEMENTAR STORY

```
AGENTE: @dev (Dex)
COMANDO: *develop {story-path} | *develop-yolo | *develop-interactive | *develop-preflight
TASK FILE: dev-develop-story.md
CHECKLIST: story-dod-checklist.md
```

| # | Acao | Detalhe |
|---|------|---------|
| 3.3.1 | Ler story completa | `docs/stories/story-X.Y.Z.md` — UNICA fonte |
| 3.3.2 | Carregar devLoadAlwaysFiles | `coding-standards.md`, `tech-stack.md`, `source-tree.md` |
| 3.3.3 | Criar branch local | `git checkout -b feature/X.Y-story-name` |
| **POR CADA TASK DA STORY:** | | |
| 3.3.4 | Ler task atual | Task + subtasks |
| 3.3.5 | Implementar codigo | Seguindo Dev Notes, coding standards, patterns existentes |
| 3.3.6 | Escrever testes | Unit tests pra cada funcionalidade |
| 3.3.7 | Executar validacoes | `npm run lint` + `npm run typecheck` + `npm test` |
| 3.3.8 | Se TODOS passam | Marcar checkbox `[x]` na story |
| 3.3.9 | Atualizar File List | Listar arquivos criados/modificados/deletados |
| 3.3.10 | **Repetir 3.3.4-3.3.9** | Pra cada task |
| **APOS TODAS TASKS:** | | |
| 3.3.11 | Rodar CodeRabbit self-healing | `coderabbit --prompt-only -t uncommitted` |
| 3.3.12 | ↳ CRITICAL encontrado? | Auto-fix → re-rodar (max 2 iteracoes) |
| 3.3.13 | ↳ HIGH encontrado? | Documentar no Dev Notes da story |
| 3.3.14 | Rodar regressao completa | `npm run lint` + `npm run typecheck` + `npm test` (TODOS) |
| 3.3.15 | Executar `story-dod-checklist.md` | Definition of Done checklist |
| 3.3.16 | Atualizar story status | → "Ready for Review" |
| 3.3.17 | `git add` + `git commit` | Commit local |
| 3.3.18 | **HALT** | NAO FAZ PUSH. Aguarda @qa ou @devops |

**OUTPUT:** Codigo implementado + testes + story atualizada (status: Ready for Review)

**HANDOFF →** "Story completa. Ative `@qa` para review." (ou `@devops` pra push direto)

---

### STEP 3.4 — (OPCIONAL mas RECOMENDADO) QA REVIEW

```
AGENTE: @qa (Quinn)
COMANDO: *review {story-path}
TASK FILE: review-story.md
```

| # | Acao | Detalhe |
|---|------|---------|
| 3.4.1 | Ler story | `docs/stories/story-X.Y.Z.md` |
| 3.4.2 | Rodar CodeRabbit auto-scan | `coderabbit --prompt-only -t committed --base main` |
| 3.4.3 | **Self-healing loop (max 3 iter):** | |
| 3.4.3a | ↳ CRITICAL encontrado? | Auto-fix → re-rodar |
| 3.4.3b | ↳ HIGH encontrado? | Auto-fix → re-rodar |
| 3.4.3c | ↳ MEDIUM encontrado? | Criar tech debt issue |
| 3.4.3d | ↳ 3 iteracoes e ainda issues? | HALT, reportar ao usuario |
| 3.4.4 | Review manual — ACs | Verificar cada acceptance criterion |
| 3.4.5 | Review manual — Testes | Verificar cobertura, cenarios, edge cases |
| 3.4.6 | Review manual — Codigo | Qualidade, patterns, security, performance |
| 3.4.7 | Requirements traceability | Mapear AC → teste (Given-When-Then) |
| 3.4.8 | Risk assessment | Probabilidade x impacto |
| 3.4.9 | NFR validation | Security, performance, accessibility |
| 3.4.10 | **Quality Gate decision** | |
| | ↳ `PASS` | Tudo OK → story aprovada |
| | ↳ `CONCERNS` | OK mas com observacoes |
| | ↳ `FAIL` | Bloqueia, precisa fix |
| | ↳ `WAIVED` | Aceita com ressalvas documentadas |
| 3.4.11 | Atualizar QA Results na story | UNICA secao que pode editar |
| 3.4.12 | Gerar QA gate file | `docs/qa/gates/gate-X.Y.Z.md` |

**OUTPUT:** QA Results na story + gate file

**SE FAIL →** Step 3.5 (@dev fix)
**SE PASS →** Step 3.6 (@devops push)

---

### STEP 3.5 — (CONDICIONAL) FIX QA FEEDBACK

```
CONDICAO: QA deu FAIL ou deixou itens nao-checados
AGENTE: @dev (Dex)
COMANDO: *apply-qa-fixes
TASK FILE: apply-qa-fixes.md
```

| # | Acao | Detalhe |
|---|------|---------|
| 3.5.1 | Ler QA Results na story | Itens nao-checados, feedback |
| 3.5.2 | Implementar fixes | Pra cada issue reportado |
| 3.5.3 | Re-rodar testes | `npm run lint` + `npm run typecheck` + `npm test` |
| 3.5.4 | `git commit` | Commit local dos fixes |
| 3.5.5 | **Volta pro Step 3.4** | @qa re-review |

**LOOP:** @dev fix → @qa review → ate PASS

---

### STEP 3.6 — PUSH + PR

```
AGENTE: @devops (Gage)
COMANDOS: *pre-push → *push → *create-pr
TASK FILES: github-devops-pre-push-quality-gate.md → github-devops-github-pr-automation.md
```

| # | Acao | Detalhe |
|---|------|---------|
| 3.6.1 | `*pre-push` — Quality Gate | |
| 3.6.1a | ↳ `npm run lint` | Deve PASS |
| 3.6.1b | ↳ `npm test` | Deve PASS |
| 3.6.1c | ↳ `npm run typecheck` | Deve PASS |
| 3.6.1d | ↳ `npm run build` | Deve PASS |
| 3.6.1e | ↳ CodeRabbit scan | 0 CRITICAL issues |
| 3.6.1f | ↳ Story status check | Deve ser "Ready for Review" ou "Done" |
| 3.6.1g | ↳ No uncommitted changes | `git status` limpo |
| 3.6.1h | ↳ No merge conflicts | |
| 3.6.2 | Apresentar resumo | Mostra resultado de todos gates ao usuario |
| 3.6.3 | **Aguardar confirmacao** | Usuario confirma |
| 3.6.4 | `*push` | `git push -u origin feature/X.Y-story-name` |
| 3.6.5 | `*create-pr` | `gh pr create --title "..." --body "..."` |
| 3.6.5a | ↳ Titulo formato Conventional Commits | `feat(scope): descricao [Story X.Y]` |
| 3.6.5b | ↳ Body com summary + test plan | |
| 3.6.6 | Reportar sucesso | URL do PR |

**OUTPUT:** Branch pushed + PR criado no GitHub

---

### STEP 3.7 — (OPCIONAL) EPIC RETROSPECTIVE

```
CONDICAO: Todas stories do epic estao Done
AGENTE: @po (Pax)
```

| # | Acao | Detalhe |
|---|------|---------|
| 3.7.1 | Validar completude do epic | Todas stories Done |
| 3.7.2 | Documentar learnings | O que funcionou, o que melhorar |
| 3.7.3 | Salvar | `docs/epic-retrospective-XX.md` |

**HANDOFF →** "Epic completo. Volte ao Step 3.1 (@sm) para o proximo epic."

---

### STEP 3.8 — REPETIR

```
Proximo epic? → SIM → Volta ao Step 3.1
                 NAO → PROJETO COMPLETO!
```

---

## RESUMO VISUAL DO FLUXO COMPLETO

```
──  0.0.1──0.0.4   @aios-master    orquestracao — identifica phase, direciona agente
         │
P0  0.1──0.9       @devops         bootstrap (CLIs, auth, Git, GitHub)
         │
P1  1.1.1──1.1.8   @analyst        project-brief.md
         │
    1.2.1──1.2.15  @pm             prd.md
         │
    1.3.1──1.3.13  @ux             front-end-spec.md
         │
    1.3.14─1.3.16  @ux             (opcional) v0/lovable prompt
         │
    1.4.1──1.4.19  @architect      fullstack-architecture.md
         │
    1.4b.1─1.4b.7  @data-engineer  database-schema.md + rls-policies.md
         │
    1.5.1──1.5.3   @pm             (condicional) prd.md update
         │
    1.6.1──1.6.7   @po             validacao master ←──┐
         │                                              │ loop ate 0 issues
         └─── issues? ──→ agente corrige ──────────────┘
         │
P2  2.1──2.5       @po             shard PRD + arch + gerar docs auxiliares
         │
    2b.1──2b.5     @devops         setup-github (CI/CD, branch protection, CodeRabbit)
         │
    2c.1──2c.6     @ux             (recomendado) design system setup (tokens, theme, components)
         │
P3  ┌──→ 3.1.1──3.1.18   @sm             story-X.Y.Z.md
    │         │
    │    3.2.1──3.2.6     @po             (opcional) validar draft
    │         │
    │    3.2b.1──3.2b.15  @data-engineer  (condicional) migrations + RLS se story usa DB
    │         │
    │    3.3.1──3.3.18    @dev            implementar + testes + commit local
    │         │
    │    3.4.1──3.4.12    @qa             (opcional) review + gate
    │         │
    │    3.5.1──3.5.5     @dev            (condicional) fix QA
    │         │
    │    3.6.1──3.6.6     @devops         pre-push + push + PR
    │         │
    │    Mais stories? ──SIM──┘
    │         │
    │        NAO
    │         │
    │    3.7.1──3.7.3     @po             (opcional) epic retro
    │         │
    └── Mais epics? ──SIM──┘
              │
             NAO
              │
         PROJETO COMPLETO
```

---

## AGENTES NO FLUXO

| Agente | Nome | Fase(s) | Papel no fluxo |
|--------|------|---------|----------------|
| @aios-master | Orion | Pre-flow, entre phases | Orquestrador — direciona agentes, mostra progresso, planeja |
| @devops | Gage | P0, P2b, P3.6 | Bootstrap + CI/CD setup + Push/PR (unico autorizado pra git push) |
| @analyst | Atlas | P1.1 | Project brief + pesquisa + brainstorming |
| @pm | Morgan | P1.2, P1.5 | PRD + atualizacoes |
| @ux-design-expert | Uma | P1.3, P2c | Front-end spec + wireframes + design system setup |
| @architect | Aria | P1.4 | Fullstack architecture (alto nivel — delega DB pro @data-engineer) |
| @data-engineer | Dara | P1.4b, P3.2b | Schema design + migrations + RLS + security audit |
| @po | Pax | P1.6, P2, P3.2, P3.7 | Validacao + sharding + story review + retro |
| @sm | River | P3.1 | Criacao de stories |
| @dev | Dex | P3.3, P3.5 | Implementacao + fix QA |
| @qa | Quinn | P3.4 | Review + quality gate |

**Total: 11 agentes no fluxo completo.**
