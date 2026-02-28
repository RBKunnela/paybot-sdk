# 🔄 GUIA COMPLETO: OS 12 WORKFLOWS DE DESENVOLVIMENTO DO AIOS
## O Que São, Para Que Servem e Como Usar Cada Um

> **Estes 12 workflows são os fluxos de trabalho que orquestram os agentes do seu AIOS.**
> Cada workflow define QUEM faz O QUÊ e em QUAL ORDEM.

---

## 📋 ÍNDICE

1. [Mapa Geral — Qual Workflow Usar Quando](#1-mapa-geral)
2. [Story Development Cycle — O Workflow Universal](#2-story-cycle)
3. [Spec Pipeline — De Ideia a Especificação](#3-spec-pipeline)
4. [QA Loop — O Ciclo de Qualidade](#4-qa-loop)
5. [Auto-Worktree — Isolamento de Desenvolvimento](#5-auto-worktree)
6. [Greenfield Full-Stack — App do Zero (Completa)](#6-greenfield-fullstack)
7. [Greenfield UI — Frontend do Zero](#7-greenfield-ui)
8. [Greenfield Service — Backend/API do Zero](#8-greenfield-service)
9. [Brownfield Discovery — Auditoria de Projeto Existente](#9-brownfield-discovery)
10. [Brownfield Full-Stack — Melhorar App Existente](#10-brownfield-fullstack)
11. [Brownfield UI — Melhorar Frontend Existente](#11-brownfield-ui)
12. [Brownfield Service — Melhorar Backend Existente](#12-brownfield-service)
13. [Design System Build Quality — Pipeline de Qualidade](#13-design-system)
14. [Como os Workflows se Conectam](#14-conexoes)

---

## 1. MAPA GERAL — QUAL WORKFLOW USAR QUANDO

### Decisão Rápida

```
Você tem um projeto existente?
├── NÃO (Greenfield — do zero)
│   ├── App completa (front+back)? → Greenfield Full-Stack
│   ├── Só frontend?              → Greenfield UI
│   └── Só backend/API?           → Greenfield Service
│
└── SIM (Brownfield — existente)
    ├── Precisa auditar primeiro?  → Brownfield Discovery
    ├── App completa (front+back)? → Brownfield Full-Stack
    ├── Só frontend?              → Brownfield UI
    └── Só backend/API?           → Brownfield Service

Qualquer que seja o caso:
├── Precisa transformar ideia em spec?  → Spec Pipeline
├── Precisa desenvolver uma story?      → Story Development Cycle
├── Precisa rodar QA?                   → QA Loop
├── Precisa isolar branches?            → Auto-Worktree
└── Precisa validar Design System?      → Design System Build Quality
```

### Tabela Resumo

| Workflow | Tipo | Para Quê | Duração | Agentes |
|----------|------|----------|---------|---------|
| **Story Development Cycle** | Universal | Desenvolver qualquer story (criar → validar → implementar → QA) | 1-4h | @sm, @po, @dev, @qa |
| **Spec Pipeline** | Universal | Transformar ideia informal em especificação formal executável | 1-3h | @pm, @analyst, @architect, @qa |
| **QA Loop** | Universal | Ciclo de review e correção de qualidade | 30min-2h | @qa, @dev, @architect |
| **Auto-Worktree** | Infra | Criar branches isoladas para desenvolvimento paralelo | 2min | @dev, @devops |
| **Greenfield Full-Stack** | Greenfield | Construir app full-stack do zero | 2-5 dias | @analyst, @pm, @ux, @architect, @po, @sm, @dev, @qa, @devops |
| **Greenfield UI** | Greenfield | Construir frontend do zero | 1-3 dias | @analyst, @pm, @ux, @architect, @po, @sm, @dev, @qa |
| **Greenfield Service** | Greenfield | Construir backend/API do zero | 1-3 dias | @analyst, @pm, @architect, @po, @sm, @dev, @qa |
| **Brownfield Discovery** | Brownfield | Auditoria completa de codebase existente | 4-8h | @analyst, @architect, @data, @dev, @devops, @pm, @qa, @ux |
| **Brownfield Full-Stack** | Brownfield | Melhorar app existente (front+back) | 2-5 dias | @analyst, @architect, @pm, @po, @sm, @dev, @qa |
| **Brownfield UI** | Brownfield | Melhorar frontend existente | 1-3 dias | @analyst, @architect, @ux, @pm, @po, @sm, @dev, @qa |
| **Brownfield Service** | Brownfield | Melhorar backend/API existente | 1-3 dias | @analyst, @architect, @pm, @po, @sm, @dev, @qa, @devops |
| **Design System Build Quality** | Qualidade | Validar Design System pós-migração | 2-4h | Automação (4 steps) |

---

## 2. STORY DEVELOPMENT CYCLE — O WORKFLOW UNIVERSAL

**ID**: `story-development-cycle` (843 linhas)
**Arquivo fonte**: `.aios-core/development/workflows/story-development-cycle.yaml`
**Para quê**: É o workflow CENTRAL do AIOS — desenvolve qualquer story do começo ao fim.

### O Que Faz

Automatiza o ciclo completo: **criar → validar → implementar → QA review**. Funciona tanto para greenfield quanto brownfield, features novas, bug fixes e melhorias.

### As 4 Fases

**Step 1 — Create Story** (@sm cria, @po valida): O Scrum Master cria a story com contexto, requisitos e acceptance criteria. O Product Owner valida se está alinhada com prioridades.

**Step 2 — Validate Story** (@po revisa): O PO revisa a story, verifica se acceptance criteria são claros, se o escopo está correto. Gate: story deve estar "Ready for Development".

**Step 3 — Implement Story** (@dev implementa): O Dev implementa seguindo os acceptance criteria e tarefas definidas. Inclui o CodeRabbit Self-Healing Loop para qualidade. Gera código, testes, documentação.

**Step 4 — QA Review** (@qa valida): O QA revisa a implementação, roda testes, valida acceptance criteria. Veredito: PASS (pronto), PASS_WITH_NOTES (aceito com observações), ou FAIL (volta para correção).

### 3 Modos de Execução

**YOLO**: Execução autônoma — decisões são logadas mas o sistema segue sem parar. 0-1 prompts ao usuário.

**Interactive** (PADRÃO): Checkpoints de decisão e feedback educacional. 5-10 prompts.

**Pre-Flight**: Planejamento completo antes de qualquer execução. 10-15 prompts upfront.

### Quando Usar

Sempre que precisar desenvolver uma story individual, independente do tipo de projeto. É o workflow mais usado no dia a dia.

---

## 3. SPEC PIPELINE — DE IDEIA A ESPECIFICAÇÃO

**ID**: `spec-pipeline` (1.031 linhas)
**Para quê**: Transforma descrições informais em especificações formais e executáveis.

### O Que Faz

Pega algo como "quero um sistema de login" e transforma em PRD com requisitos funcionais, não-funcionais, constraints, architecture design e implementation plan — tudo rastreável.

### As 6 Fases (+2 condicionais)

**Fase 1 — Gather Requirements** (@pm): Coleta requisitos do usuário através de perguntas estruturadas. Identifica stakeholders, user stories, regras de negócio, entidades.

**Fase 2 — Assess Complexity** (@architect): Avalia complexidade do requisito (Simple, Medium, Complex, Epic). Define quais fases subsequentes serão executadas e em que profundidade.

**Fase 3 — Research Dependencies** (@analyst): Pesquisa dependências técnicas, bibliotecas, padrões existentes. Valida viabilidade técnica.

**Fase 4 — Write Specification** (@pm): Escreve a especificação formal seguindo o princípio "No Invention" — nada inventado, tudo derivado dos inputs.

**Fase 5 — Critique Specification** (@qa): Revisa criticamente a spec buscando gaps, ambiguidades, contradições.

**Fase 5b — Revise (se COMPLEX)**: Revisão da spec baseada na crítica. Só acontece para projetos complexos.

**Fase 5c — Second Critique (se COMPLEX)**: Segunda rodada de crítica. Só para complexos.

**Fase 6 — Create Implementation Plan** (@architect): Cria plano de implementação com stories, prioridades e dependências.

### Princípio Fundamental

**No Invention**: Nenhuma informação é inventada. Todo statement na spec deve rastrear para um requisito funcional, não-funcional, constraint ou finding de research.

### Quando Usar

Antes de qualquer desenvolvimento significativo. É o primeiro passo dos workflows Greenfield.

---

## 4. QA LOOP — O CICLO DE QUALIDADE

**ID**: `qa-loop` (1.111 linhas — o mais detalhado!)
**Para quê**: Ciclo automatizado de review e correção de qualidade.

### O Que Faz

O QA revisa → se encontra problemas → cria fix request → Dev corrige → QA revisa de novo. Repete até passar ou atingir limite de iterações.

### As 5 Fases

**Step 1 — Review** (@qa): QA analisa a implementação, roda testes, verifica acceptance criteria, quality standards.

**Step 2 — Check Verdict**: Avalia resultado do review. PASS → fim. FAIL → continua para fix.

**Step 3 — Create Fix Request** (@qa): QA documenta exatamente o que precisa ser corrigido, com prioridades e contexto.

**Step 4 — Fix Issues** (@dev): Dev corrige os problemas seguindo o fix request. Pode escalar para @architect se for problema estrutural.

**Step 5 — Increment Iteration**: Incrementa contador de iterações. Se atingir limite (configurável, padrão 3) → escala para humano.

### Escalação

Se após 3 iterações o QA loop não resolver, escala para revisão humana com relatório completo do que foi tentado.

### Quando Usar

Dentro do Story Development Cycle (Step 4) ou standalone quando precisa validar qualquer implementação.

---

## 5. AUTO-WORKTREE — ISOLAMENTO DE DESENVOLVIMENTO

**ID**: `auto-worktree` (789 linhas)
**Para quê**: Cria worktrees Git isoladas para desenvolvimento paralelo de múltiplas stories.

### O Que Faz

Quando uma story é iniciada, automaticamente cria uma branch e worktree Git separada. Isso permite trabalhar em múltiplas stories simultaneamente sem conflitos.

### Os 6 Steps

**Step 1 — Extract Story Context**: Extrai ID da story do contexto atual.

**Step 2 — Check Existing**: Verifica se já existe worktree para essa story.

**Step 3 — Auto Cleanup**: Remove worktrees obsoletas (stories já finalizadas).

**Step 4 — Create Worktree**: Cria branch + worktree Git isolada.

**Step 5 — Switch Context**: Muda o contexto de desenvolvimento para a nova worktree.

**Step 6 — Display Summary**: Mostra resumo do que foi criado.

### Triggers Automáticos

É acionado automaticamente por evento `story_started` (quando @dev inicia story) ou `story_assigned` (quando @po atribui story). Também pode ser acionado manualmente com `*auto-worktree`.

### Quando Usar

Quando está desenvolvendo múltiplas stories em paralelo e precisa de isolamento entre elas.

---

## 6. GREENFIELD FULL-STACK — APP DO ZERO (COMPLETA)

**ID**: `greenfield-fullstack` (796 linhas)
**Para quê**: Construir aplicação full-stack completa do zero.
**Tipos suportados**: web-app, saas, enterprise-app, prototype, mvp

### O Que Faz

O workflow mais completo do AIOS. Leva do conceito até o desenvolvimento passando por todas as etapas profissionais: discovery, planejamento, especificação, arquitetura, desenvolvimento e QA.

### As 4 Fases (com subfases)

**FASE 0 — Environment Bootstrap** (@devops): Configura ambiente de desenvolvimento, ferramentas, CI/CD.

**FASE 1 — Discovery & Planning**:
- @analyst (Atlas): Análise de mercado, competidores, requisitos
- @pm (Morgan): Criação do PRD completo
- @ux (Uma): Pesquisa de UX, wireframes, design
- @architect (Aria): Arquitetura do sistema
- @po (Pax): Validação e priorização

**FASE 2 — Document Sharding** (@po): Fragmenta os documentos grandes (PRD, Architecture) em stories menores e gerenciáveis.

**FASE 3 — Development Cycle** (Loop): Para cada story gerada: @sm cria → @dev implementa → @qa valida. Repete até todas as stories serem entregues.

### Quando Usar

Quando vai construir uma aplicação completa com front-end e back-end do zero, especialmente se é um projeto significativo que precisa de planejamento estruturado.

---

## 7. GREENFIELD UI — FRONTEND DO ZERO

**ID**: `greenfield-ui` (922 linhas)
**Para quê**: Construir aplicação frontend do zero.
**Tipos suportados**: spa, mobile-app, micro-frontend, static-site, ui-prototype, simple-interface

### O Que Faz

Similar ao Full-Stack mas focado em frontend. Inclui pesquisa de UX/UI, design system, especificação de componentes.

### As 4 Fases

**Fase 1 — Planejamento e Especificação**: @analyst pesquisa, @pm cria PRD, @ux faz design, @architect define arquitetura frontend.

**Fase 2 — Validação e Ajustes**: @po valida, corrige issues se necessário.

**Fase 3 — Desenvolvimento**: Loop de stories com @dev implementando e @qa validando.

**Fase 4 — Finalização**: Retrospectiva e handoff.

### Quando Usar

Quando vai construir apenas a camada de frontend — SPA, app mobile, micro-frontend, site estático.

---

## 8. GREENFIELD SERVICE — BACKEND/API DO ZERO

**ID**: `greenfield-service` (784 linhas)
**Para quê**: Construir backend ou API do zero.
**Tipos suportados**: rest-api, graphql-api, microservice, backend-service, api-prototype, simple-service

### O Que Faz

Workflow otimizado para backend. Sem etapa de UX. Foco em arquitetura de API, schemas de banco, endpoints, lógica de negócio.

### Os 15 Steps

**Steps 1-3**: Criar Project Brief → PRD → Arquitetura de API.

**Step 4**: Atualizar PRD se necessário (condicional).

**Step 5-6**: Validar artefatos → Corrigir problemas (condicional).

**Step 7**: Fragmentar documentos em stories.

**Steps 8-13**: Loop de desenvolvimento — criar story → review draft → implementar → QA review → fix QA → próxima story.

**Steps 14-15**: Retrospectiva → Projeto completo.

### Quando Usar

Quando vai construir apenas backend — API REST, GraphQL, microserviço, serviço independente.

---

## 9. BROWNFIELD DISCOVERY — AUDITORIA DE PROJETO EXISTENTE

**ID**: `brownfield-discovery` (921 linhas)
**Para quê**: Avaliação completa de débito técnico em projetos existentes.
**Duração**: 4-8 horas
**Usa TODOS os 8 agentes**

### O Que Faz

Este é o workflow mais amplo em termos de agentes envolvidos. Avalia TUDO de um projeto existente: código, banco de dados, frontend, infraestrutura, segurança, performance. Especialmente útil para projetos vindos de Lovable, v0.dev ou codebases legados.

### As 3 Fases

**Fase 1 — Quick Wins (1-2 semanas)**: Identifica melhorias rápidas que podem ser feitas imediatamente. Documenta o sistema atual.

**Fase 2 — Fundação (2-4 semanas)**: Resolve débitos técnicos fundamentais — arquitetura, banco, segurança.

**Fase 3 — Otimização (4-6 semanas)**: Otimizações de performance, escalabilidade, UX.

### Casos de Uso

Migração de projeto Lovable/v0.dev, auditoria completa de codebase, planejamento de modernização, assessment pré-investimento, onboarding em projeto legado, due diligence técnica.

### Quando Usar

Antes de qualquer trabalho significativo em um projeto existente que você não conhece bem. É o "raio-X" do projeto.

---

## 10. BROWNFIELD FULL-STACK — MELHORAR APP EXISTENTE

**ID**: `brownfield-fullstack` (838 linhas)
**Para quê**: Aprimorar aplicações full-stack existentes.
**Tipos**: feature-addition, refactoring, modernization, integration-enhancement

### O Que Faz

Similar ao Greenfield Full-Stack mas com uma diferença crucial: começa analisando o que já existe antes de planejar mudanças. Garante que modificações não quebram funcionalidades existentes.

### Os 18 Steps

**Steps 1-4**: Classificar enhancement → Rotear decisão → Verificar docs → Analisar projeto (condicional).

**Steps 5-9**: Criar PRD Brownfield → Decisão de arquitetura → Criar arquitetura (condicional) → Validar PO → Corrigir issues.

**Steps 10-12**: Fragmentar docs → Criar stories → Revisar drafts.

**Steps 13-18**: Implementar → QA review → Fix QA → Ciclo de desenvolvimento → Retrospectiva → Conclusão.

### Diferença do Greenfield

O Brownfield analisa impacto em código existente antes de qualquer mudança. Tem steps de "Classificação" e "Roteamento" que não existem no Greenfield.

### Quando Usar

Quando precisa adicionar features, refatorar ou modernizar uma app full-stack existente.

---

## 11. BROWNFIELD UI — MELHORAR FRONTEND EXISTENTE

**ID**: `brownfield-ui` (891 linhas)
**Para quê**: Aprimorar frontend de aplicação existente.

### O Que Faz

Analisa o frontend existente (componentes, design system, padrões CSS, acessibilidade) antes de planejar melhorias. Inclui @ux para redesign quando necessário.

### Os 15 Steps

**Steps 1-4**: Análise UI existente → PRD Brownfield → Especificação Frontend → Arquitetura Brownfield.

**Steps 5-6**: Validação PO → Correções (condicional).

**Steps 7-9**: Fragmentação → Criação de stories (ciclo) → Revisão.

**Steps 10-15**: Implementação → QA → Fix QA → Ciclo → Retrospectiva → Completo.

### Quando Usar

Quando precisa modernizar UI, migrar design system, adicionar componentes ou redesenhar partes do frontend.

---

## 12. BROWNFIELD SERVICE — MELHORAR BACKEND EXISTENTE

**ID**: `brownfield-service` (812 linhas)
**Para quê**: Aprimorar serviços backend e APIs existentes.
**Tipos**: service-modernization, api-enhancement, microservice-extraction, performance-optimization, integration-enhancement

### O Que Faz

Analisa serviço/API existente antes de planejar mudanças. Lida com versionamento de API, breaking changes, migrações de schema de banco.

### Os 14 Steps

**Steps 1-3**: Análise do serviço → PRD → Arquitetura.

**Steps 4-6**: Validação → Correção → Fragmentação.

**Steps 7-14**: Criação de stories → Revisão → Implementação → QA → Fix → Ciclo → Retrospectiva → Fim.

### Quando Usar

Quando precisa adicionar endpoints, otimizar performance, extrair microserviço de monolito, ou fazer versionamento de API.

---

## 13. DESIGN SYSTEM BUILD QUALITY — PIPELINE DE QUALIDADE

**ID**: `design-system-build-quality` (845 linhas)
**Para quê**: Validar qualidade de Design System pós-migração.

### O Que Faz

Pipeline sequencial de 4 steps que garante qualidade completa de um Design System após criação ou migração.

### Os 4 Steps

**Step 1 — Build Atomic Components**: Compila tokens e componentes atômicos. Verifica se tudo builda corretamente.

**Step 2 — Generate Documentation**: Gera Pattern Library com exemplos e guias de uso.

**Step 3 — Accessibility Audit**: Valida conformidade WCAG 2.1 AA. Testa contraste, semântica, navegação por teclado.

**Step 4 — Calculate ROI**: Calcula métricas de economia e valor entregue. Quantifica benefícios do Design System.

### Modos de Execução

**Autônomo**: Roda sem intervenção. **Interativo** (padrão): Checkpoints. **Pre-Flight**: Planejamento completo primeiro.

### Quando Usar

Após migração ou criação de Design System, release de nova versão de Pattern Library, auditoria periódica de qualidade (trimestral), validação pré-produção.

---

## 14. COMO OS WORKFLOWS SE CONECTAM

Os workflows não são isolados — eles se encadeiam:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     FLUXO COMPLETO GREENFIELD                           │
│                                                                         │
│  1. Spec Pipeline        Ideia → Especificação formal                  │
│         ↓                                                               │
│  2. Greenfield (FS/UI/S) Especificação → Stories fragmentadas          │
│         ↓                                                               │
│  3. Auto-Worktree        Branch isolada para cada story                │
│         ↓                                                               │
│  4. Story Dev Cycle      Cada story: criar → validar → implementar     │
│         ↓                                                               │
│  5. QA Loop              Revisão → Fix → Revisão (até passar)          │
│         ↓                                                               │
│  6. Design System BQ     Se tiver DS: validar qualidade                │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                     FLUXO COMPLETO BROWNFIELD                           │
│                                                                         │
│  1. Brownfield Discovery  Auditoria completa do projeto                │
│         ↓                                                               │
│  2. Brownfield (FS/UI/S)  Discovery → PRD → Arquitetura → Stories     │
│         ↓                                                               │
│  3. Auto-Worktree         Branch isolada para cada story               │
│         ↓                                                               │
│  4. Story Dev Cycle       Cada story: criar → validar → implementar    │
│         ↓                                                               │
│  5. QA Loop               Revisão → Fix → Revisão (até passar)        │
└─────────────────────────────────────────────────────────────────────────┘
```

### O Padrão Universal

Todo desenvolvimento no AIOS segue o mesmo DNA:

**Planejar** (Spec Pipeline ou Discovery) → **Fragmentar** (Stories) → **Isolar** (Auto-Worktree) → **Implementar** (Story Dev Cycle) → **Validar** (QA Loop)

A diferença é se você está começando do zero (Greenfield) ou melhorando algo existente (Brownfield), e se é full-stack, só frontend ou só backend.

---

> **Os 12 workflows totalizam 10.083 linhas de documentação detalhada.**
> *Documento gerado em 14/02/2026 — Baseado nos arquivos enviados*
