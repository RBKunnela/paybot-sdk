# Knowledge Base: Project Management ClickUp Squad

## Visão Geral

Este squad é especialista em gestão de projetos com domínio avançado do ClickUp. Combina metodologias GTD, PARA e Ágeis para estruturar, documentar e automatizar todos os processos do negócio da Natália Tanaka.

---

## Metodologias Core

### 1. GTD (Getting Things Done) - David Allen

**Princípios Fundamentais:**

1. **Capture** - Tire tudo da cabeça
   - Toda ideia, tarefa, compromisso vai para um inbox
   - Não julgue durante a captura
   - Use ferramentas de captura rápida

2. **Clarify** - Processe o que significa
   - É acionável?
   - Qual é o próximo passo físico?
   - Leva menos de 2 minutos? Faça agora

3. **Organize** - Coloque no lugar certo
   - Projetos (resultados com múltiplos passos)
   - Próximas ações (por contexto)
   - Aguardando (delegado)
   - Calendário (data específica)
   - Algum dia/talvez

4. **Reflect** - Review regular
   - Daily: O que preciso fazer hoje?
   - Weekly: Revisão completa do sistema
   - Monthly/Quarterly: Revisão de metas

5. **Engage** - Execute com confiança
   - Confie no sistema
   - Foque no que está na frente
   - Contexto → Tempo → Energia → Prioridade

**Aplicação no ClickUp:**
- Inbox → List "Inbox" no Space de Operações
- Projetos → Folders com listas específicas
- Próximas Ações → Tasks com due dates e assignees
- Aguardando → Status "Aguardando" com automação
- Algum dia → List "Backlog" ou "Ideias"

---

### 2. PARA (Projects, Areas, Resources, Archives) - Tiago Forte

**Estrutura:**

| Categoria | Definição | ClickUp Mapping |
|-----------|-----------|-----------------|
| **Projects** | Resultados com prazo | Folders dentro de Spaces |
| **Areas** | Responsabilidades contínuas | Spaces principais |
| **Resources** | Temas de referência | Space "Recursos" ou Docs |
| **Archives** | Itens inativos | Space "Arquivo" |

**Regras de Ouro:**
1. Projetos têm fim; Áreas não
2. Organize por acionabilidade, não por tema
3. Arquive proativamente
4. Mantenha hierarquia rasa (max 3 níveis)

**Aplicação no ClickUp:**

```
Workspace
├── 🚀 LANÇAMENTOS (Projects)
├── 📝 CONTEÚDO (Area)
├── 💰 COMERCIAL (Area)
├── 💻 SAAS (Area)
├── 🎧 SUPORTE (Area)
├── ⚙️ OPERAÇÕES (Area)
├── 📚 RECURSOS (Resources)
└── 🗄️ ARQUIVO (Archives)
```

---

### 3. Metodologias Ágeis

#### Scrum
- **Sprint:** 1-2 semanas de trabalho focado
- **Backlog:** Lista priorizada de trabalho
- **Sprint Planning:** Definir o que entra no sprint
- **Daily:** Check-in rápido diário
- **Review:** Demo do que foi entregue
- **Retrospectiva:** O que melhorar

#### Kanban
- **Visual:** Board com colunas de status
- **WIP Limits:** Limite de itens em andamento
- **Flow:** Foco em fluxo contínuo
- **Pull:** Puxar trabalho, não empurrar

**Quando usar cada um:**
- **Scrum:** Desenvolvimento de produto, projetos com entregas definidas
- **Kanban:** Operações contínuas, suporte, conteúdo

---

## ClickUp: Guia Avançado

### Hierarquia de Organização

```
Workspace (1 por organização)
└── Space (Áreas principais - máx 10-15)
    └── Folder (Projetos ou sub-áreas)
        └── List (Workflows específicos)
            └── Task (Unidade de trabalho)
                └── Subtask (Decomposição)
```

### Convenções de Nomenclatura

| Elemento | Padrão | Exemplo |
|----------|--------|---------|
| Space | CAPS com emoji | 🚀 LANÇAMENTOS |
| Folder | Title Case | Lançamento Método X |
| List | Title Case | Pré-Lançamento |
| Task | Verbo + Objeto | Criar landing page |
| Subtask | Ação específica | Escrever headline |

### Custom Fields Estratégicos

**Universais (usar em todo lugar):**
- Prioridade (Dropdown)
- Esforço Estimado (Dropdown)
- Tipo de Tarefa (Dropdown)

**Por Contexto:**
- CRM: Origem, Ticket, Valor, Probabilidade
- Conteúdo: Tipo, Canal, Data Publicação
- Produto: Severidade, Story Points, Sprint

### Automações Essenciais

**Template: Notificação de Status**
```
WHEN: Status changes TO [status]
THEN: Notify [pessoa]
AND: Add comment "[mensagem]"
```

**Template: SLA/Deadline**
```
WHEN: Due date is [X] days away
AND: Status is not Done
THEN: Notify assignee
AND: Set priority to High
```

**Template: Handoff**
```
WHEN: Status changes TO [próximo status]
THEN: Change assignee TO [próxima pessoa]
AND: Notify new assignee
```

### Views Essenciais

| View | Uso | Configuração |
|------|-----|--------------|
| List | Visão detalhada | Group by: Status ou Custom Field |
| Board | Workflow visual | Group by: Status |
| Calendar | Planejamento temporal | Date field: Due Date |
| Gantt | Dependências | Dependencies habilitadas |
| Dashboard | Métricas | Widgets customizados |

---

## Processos por Área

### Lançamentos

**Modelos Suportados:**
1. PLF (Product Launch Formula)
2. Perpétuo (Evergreen)
3. High Ticket (Aplicação)
4. Webinário
5. Desafios

**Fases PLF:**
1. PPL (Pré-pré-lançamento): 2-4 semanas
2. PL (Pré-lançamento): 7-10 dias
3. Carrinho Aberto: 5-7 dias
4. Pós-lançamento: 1-2 semanas

**KPIs de Lançamento:**
- Leads capturados
- Taxa de abertura de emails
- Views de CPL
- Taxa de conversão
- Faturamento total
- ROI de tráfego

### Conteúdo

**Pipeline de Produção:**
```
Ideação → Planejamento → Criação → Revisão → Agendamento → Publicação → Análise
```

**Frequências Sugeridas:**
- YouTube (longo): 1-2x/semana
- Shorts/Reels: 1x/dia
- Instagram: 1x/dia
- Newsletter: 1x/semana

**Batch Production:**
- Agrupar gravações de vídeo
- Produzir 1 mês de posts em 1 sessão
- Escrever 4 newsletters de uma vez

### CRM/Comercial

**Pipeline por Ticket:**

| Ticket | Estágios | Automação |
|--------|----------|-----------|
| Low (<R$500) | Novo → Engajado → Carrinho → Cliente | 90% automático |
| Mid (R$500-2k) | Novo → Contato → Negociação → Proposta → Fechado | 50% automático |
| High (>R$2k) | Aplicação → Qualificado → Call → Proposta → Negociação → Cliente | 20% automático |

**Lead Scoring:**
- Engajamento (email, cliques): +5-40 pts
- Perfil (fit, budget): +15-25 pts
- Recência: multiplicador 0.3-1.5x

### SaaS/Produto

**Gestão de Backlog:**
- RICE Score: (Reach × Impact × Confidence) / Effort
- MoSCoW: Must/Should/Could/Won't

**Bug Triage:**
| Severidade | SLA | Ação |
|------------|-----|------|
| Crítico | 4h | Drop everything |
| Alto | 24h | Próximo do sprint |
| Médio | 1 sprint | Se couber |
| Baixo | Backlog | Quando conveniente |

**Sprint:**
- Duração: 2 semanas
- Capacidade: 70-80% (buffer para imprevistos)
- Velocity: Média dos últimos 3 sprints

### Suporte

**Categorias de Ticket:**
1. Problema Técnico
2. Acesso/Conta
3. Financeiro
4. Dúvida de Conteúdo
5. Feedback
6. Cancelamento (prioridade!)

**SLA por Prioridade:**
| Prioridade | 1ª Resposta | Resolução |
|------------|-------------|-----------|
| Crítico | 1h | 4h |
| Alto | 4h | 24h |
| Normal | 8h | 48h |
| Baixo | 24h | 72h |

**Métricas Chave:**
- SLA Compliance (meta: >95%)
- CSAT (meta: >4.5/5)
- Tempo Médio de Resolução
- First Contact Resolution

---

## Integrações entre Squads

### Matriz de Comunicação

| De | Para | Tipo de Handoff |
|----|------|-----------------|
| PM Orchestrator | Qualquer agente | Demandas iniciais |
| Process Diagnostician | ClickUp Architect | Processo documentado |
| ClickUp Architect | Automation Engineer | Estrutura para automatizar |
| Launch Ops | Copy/Design/Ads Squads | Entregas de lançamento |
| Content Ops | YouTube/Copy/Design | Produções de conteúdo |
| CRM Builder | Comercial Squad | Pipeline de vendas |
| SaaS Ops | Full-Stack Dev | Features e bugs |
| Support Ops | SaaS Ops | Bugs confirmados |

### Squads Externos Integrados

1. **@copywriting** - Copy de emails, páginas, scripts
2. **@full-stack-dev** - Desenvolvimento técnico
3. **@youtube-content** - Produção de vídeos
4. **@youtube-lives** - Lives e eventos ao vivo
5. **@design-system** - Design e assets visuais
6. **@media-buy** - Tráfego pago e anúncios
7. **@comercial-natalia-tanaka** - Equipe comercial
8. **@natalia** - Aprovações e decisões estratégicas
9. **@orquestrador-global** - Coordenação geral

---

## Comandos Rápidos

### PM Orchestrator
- `*help` - Ver todos os comandos
- `*status` - Visão geral de projetos
- `*diagnose` - Iniciar diagnóstico de processo
- `*setup-clickup` - Configurar ClickUp
- `*automate` - Criar automação
- `*launch-setup` - Preparar lançamento
- `*content-ops` - Operações de conteúdo
- `*crm` - Configurar CRM
- `*saas-ops` - Operações do SaaS
- `*support` - Sistema de suporte

### Por Especialista
- `*quick-map` - Mapeamento rápido (Process Diagnostician)
- `*create-views` - Criar views (ClickUp Architect)
- `*setup-time-tracking` - Time tracking (Automation Engineer)
- `*launch-status` - Status do lançamento (Launch Ops)
- `*editorial-calendar` - Calendário editorial (Content Ops)
- `*pipeline-status` - Pipeline de vendas (CRM Builder)
- `*sprint-status` - Status do sprint (SaaS Ops)
- `*ticket-status` - Status de tickets (Support Ops)

---

## Métricas e KPIs

### Dashboard Executivo

| Área | Métrica Principal | Meta |
|------|-------------------|------|
| Lançamentos | Taxa de Conversão | Varia por produto |
| Conteúdo | Publicações/Semana | Definir por canal |
| Comercial | Conversão do Pipeline | >20% |
| SaaS | Velocity (story points) | Estável/crescente |
| Suporte | CSAT | >4.5/5 |

### Review Cadence

| Frequência | O que revisar |
|------------|---------------|
| Diário | Tasks do dia, bloqueios |
| Semanal | Projetos, pipeline, métricas |
| Mensal | Roadmap, processos, resultados |
| Trimestral | Estratégia, OKRs, ajustes |

---

## Troubleshooting Comum

### "Onde crio essa tarefa?"
1. É um projeto com prazo? → Folder específico
2. É operação contínua? → List da área
3. Não sei ainda? → Inbox para processar depois

### "Quem é responsável?"
1. Tarefa técnica? → @full-stack-dev
2. Copy/texto? → @copywriting
3. Design? → @design-system
4. Estratégico? → @natalia ou @rafael

### "Processo não está documentado"
1. Acionar @process-diagnostician
2. Mapear as etapas
3. Criar estrutura com @clickup-architect
4. Automatizar com @automation-engineer

### "Preciso de algo urgente"
1. Definir prioridade real (é urgente mesmo?)
2. Comunicar claramente o deadline
3. Verificar dependências
4. Escalar se necessário

---

## Changelog

### v1.0.0 (2025-02-03)
- Criação inicial do squad
- 9 agentes configurados
- Metodologias GTD, PARA, Ágeis documentadas
- Estruturas para todas as áreas
