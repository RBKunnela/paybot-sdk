# setup-content-pipeline

**Task ID:** setup-content-pipeline
**Squad:** project-management-clickup
**Type:** setup
**Complexity:** medium
**Estimated Tokens:** 1500-2000

---

## Objetivo

Configurar pipeline de produção de conteúdo no ClickUp, incluindo calendário editorial, workflow de aprovação, e integração com squads de conteúdo.

---

## Trigger Phrases

- "pipeline de conteúdo"
- "calendário editorial no ClickUp"
- "organizar produção de conteúdo"
- "workflow de conteúdo"
- "setup de conteúdo"

---

## Agents Envolvidos

| Agent | Role | Contribuição |
|-------|------|--------------|
| pm-orchestrator | Orchestrator | Coordena setup |
| content-operations-manager | Lead | Workflow de conteúdo |
| clickup-architect | ClickUp | Estrutura técnica |

---

## Input Obrigatório

```yaml
conteudo_input:
  canais:
    - nome: "Instagram"
      frequencia: "1 post/dia"
      tipos: ["carrossel", "reels", "stories"]
    - nome: "YouTube"
      frequencia: "1 video/semana"
      tipos: ["aula", "shorts"]
    - nome: "Email"
      frequencia: "2-3/semana"
      tipos: ["newsletter", "promocional"]

  equipe:
    estrategista: "nome"
    redator: "nome"
    designer: "nome"
    videomaker: "nome"
    aprovador: "nome"

  workflow:
    etapas: ["Ideia", "Briefing", "Produção", "Revisão", "Aprovação", "Agendamento", "Publicado"]
```

---

## Framework de Setup

### FASE 1: Estrutura (@clickup-architect)

```markdown
## 1. Hierarquia ClickUp

### Estrutura de Content Pipeline
```
📁 Space: Marketing
└── 📁 Folder: Content Pipeline
    │
    ├── 📋 List: 💡 Banco de Ideias
    │   └── Status: Nova, Aprovada, Arquivada
    │
    ├── 📋 List: 📝 Produção em Andamento
    │   └── Status: Briefing, Redação, Design, Revisão
    │
    ├── 📋 List: ✅ Aprovação
    │   └── Status: Aguardando, Aprovado, Revisões
    │
    ├── 📋 List: 📅 Calendário Editorial
    │   └── View: Calendar view por data de publicação
    │
    ├── 📋 List: ✨ Publicados
    │   └── Arquivo de conteúdos publicados
    │
    └── 📁 Folder: Por Canal
        ├── 📋 Instagram
        ├── 📋 YouTube
        ├── 📋 Email
        └── 📋 Blog
```

### Custom Fields
| Field | Tipo | Opções | Obrigatório |
|-------|------|--------|-------------|
| Canal | Dropdown | Instagram, YouTube, Email, Blog | Sim |
| Tipo de Conteúdo | Dropdown | Carrossel, Reels, Video, Artigo | Sim |
| Pilar de Conteúdo | Dropdown | Educacional, Inspiracional, Promocional | Sim |
| Data de Publicação | Date | - | Sim (em produção) |
| Link do Arquivo | URL | - | Não |
| Performance | Number | - | Não (pós) |
| Status Aprovação | Dropdown | Pendente, Aprovado, Revisões | Sim |
```

### FASE 2: Workflow de Produção (@content-operations-manager)

```markdown
## 2. Fluxo de Trabalho

### Etapas do Workflow
```
1. IDEIA
   │ Owner: Qualquer pessoa
   │ Ação: Registrar ideia no Banco de Ideias
   │
   ▼
2. APROVAÇÃO DE PAUTA
   │ Owner: Estrategista
   │ Ação: Aprovar ou arquivar ideia
   │ SLA: 48h
   │
   ▼
3. BRIEFING
   │ Owner: Estrategista
   │ Ação: Criar briefing detalhado
   │ Template: Usar template de briefing
   │
   ▼
4. PRODUÇÃO
   │ Owner: Redator + Designer
   │ Ação: Criar conteúdo conforme briefing
   │ SLA: Depende do tipo
   │
   ▼
5. REVISÃO
   │ Owner: Estrategista
   │ Ação: Revisar qualidade e alinhamento
   │ SLA: 24h
   │
   ▼
6. APROVAÇÃO FINAL
   │ Owner: Aprovador (Natália)
   │ Ação: Aprovar para publicação
   │ SLA: 24h
   │
   ▼
7. AGENDAMENTO
   │ Owner: Social Media
   │ Ação: Agendar publicação
   │
   ▼
8. PUBLICADO
   │ Ação: Registrar métricas após 7 dias
```

### SLAs por Tipo de Conteúdo
| Tipo | Briefing→Produção | Produção | Revisão | Total |
|------|-------------------|----------|---------|-------|
| Post simples | 1 dia | 1 dia | 1 dia | 3 dias |
| Carrossel | 1 dia | 2 dias | 1 dia | 4 dias |
| Reels | 2 dias | 3 dias | 1 dia | 6 dias |
| Vídeo YouTube | 3 dias | 7 dias | 2 dias | 12 dias |
| Email | 1 dia | 1 dia | 1 dia | 3 dias |
```

### FASE 3: Views e Calendário (@clickup-architect)

```markdown
## 3. Views Customizadas

### Calendar View (Calendário Editorial)
```
Configuração:
- Date field: Data de Publicação
- Group by: Canal
- Filter: Status = Aprovado, Agendado
- Color by: Canal
```

### Board View (Kanban de Produção)
```
Colunas:
- Backlog
- Briefing
- Em Produção
- Revisão
- Aprovação
- Agendado
- Publicado

Swimlanes: Por Canal
```

### Table View (Controle Geral)
```
Colunas:
- Título
- Canal
- Tipo
- Responsável
- Status
- Data Publicação
- Aprovação
- Performance
```

### Embed Calendar
```
Para visualizar em outras ferramentas:
Settings → Share → Public Calendar
```
```

### FASE 4: Automações (@content-operations-manager)

```markdown
## 4. Automações

### Auto-assign por Canal
```yaml
trigger: Custom field "Canal" changes
conditions:
  - Canal = Instagram
actions:
  - Assign: @social-media
  - Add watchers: @estrategista
```

### Notificação de Aprovação
```yaml
trigger: Status changes to "Aguardando Aprovação"
actions:
  - Notify: @aprovador
  - Set due date: +24 hours
  - Add comment: "Conteúdo pronto para aprovação"
```

### SLA Alert
```yaml
trigger: Due date arrives
conditions:
  - Status != Publicado
actions:
  - Notify: @assignee, @estrategista
  - Change priority: Urgent
  - Add tag: "atrasado"
```

### Mover para Publicados
```yaml
trigger: Status changes to "Publicado"
actions:
  - Move to list: "Publicados"
  - Create task: "Registrar métricas em 7 dias"
    - Due date: +7 days
    - Assignee: @analista
```

### Criar Briefing Automático
```yaml
trigger: Status changes to "Aprovada" (no Banco de Ideias)
actions:
  - Create task in: "Produção em Andamento"
  - Copy: Task description
  - Status: "Briefing"
  - Add template checklist: "Briefing de Conteúdo"
```
```

### FASE 5: Templates (@clickup-architect)

```markdown
## 5. Templates de Task

### Template: Briefing de Conteúdo
```markdown
## Briefing

**Objetivo:** [O que queremos alcançar]
**Público:** [Para quem é este conteúdo]
**CTA:** [Qual a chamada para ação]

## Diretrizes

**Tom de voz:** [Como falar]
**Referências:** [Links de inspiração]
**Hashtags:** [Lista de hashtags]

## Checklist de Produção
- [ ] Copy aprovada
- [ ] Imagens/vídeos produzidos
- [ ] Revisado pelo estrategista
- [ ] Aprovado pelo(a) expert
- [ ] Agendado na ferramenta
```

### Template: Post Instagram
```markdown
## Detalhes

**Tipo:** [Carrossel/Reels/Static/Stories]
**Pilar:** [Educacional/Inspiracional/Promocional]
**Gancho:** [Frase de abertura]

## Conteúdo

**Copy:**
[Texto do post]

**Slides (se carrossel):**
1. [Slide 1]
2. [Slide 2]
...

## Assets

**Imagens:** [Link Canva/Drive]
**Vídeo:** [Link]

## Publicação

**Data:** [DD/MM/YYYY]
**Horário:** [HH:MM]
**Hashtags:** [Lista]
```
```

---

## Output Esperado

```markdown
# PIPELINE DE CONTEÚDO

**Workspace:** [workspace]
**Data:** [data]
**Criado por:** PM ClickUp Squad

---

## Estrutura Criada

### Lists
- [x] Banco de Ideias
- [x] Produção em Andamento
- [x] Aprovação
- [x] Calendário Editorial
- [x] Publicados
- [x] Lists por canal

### Custom Fields
- [x] Canal
- [x] Tipo de Conteúdo
- [x] Pilar
- [x] Data de Publicação
- [x] Status Aprovação

### Views
- [x] Calendar View
- [x] Board View (Kanban)
- [x] Table View

### Automações
- [x] Auto-assign por canal
- [x] Notificação de aprovação
- [x] SLA alerts
- [x] Transição automática

### Templates
- [x] Briefing de conteúdo
- [x] Template por tipo de conteúdo

---

## Próximos Passos

1. [ ] Treinar equipe no workflow
2. [ ] Migrar ideias existentes
3. [ ] Configurar integrações (Canva, Google Drive)
4. [ ] Definir reunião semanal de pauta
```

---

## Completion Criteria

- [ ] Estrutura de lists criada
- [ ] Custom fields configurados
- [ ] Workflow definido e documentado
- [ ] Views customizadas criadas
- [ ] Automações implementadas
- [ ] Templates criados
- [ ] Equipe treinada

---

## Related Files

- workflows/wf-content-operations.yaml
- checklists/content-quality-checklist.md

---

## Version

```yaml
version: 1.0.0
created: 2026-02-04
author: Squad Creator
last_update: 2026-02-04
```
