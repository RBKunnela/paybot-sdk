# squAId-criaTTivados

Agência criativa AI-powered completa para construção e gestão de marcas.

## Versão

- **Version:** 2.2
- **Atualizado:** 2026-02-10

## Tríade de uma Marca Forte

O squad implementa um fluxo estratégico completo:

```
DEENEA (Essência) → UNNIKO (Identidade) → storYOURtelling (Narrativa)
```

| Squad | Foco | Entrega |
|-------|------|---------|
| **DEENEA** | Diferenciação Simbólica | Brand Strategy Document |
| **UNNIKO** | Distintividade Tangível | Brand Identity + Design System |
| **storYOURtelling** | Conexão Emocional | Big Idea + Creative Campaign |

## Estrutura

```
squAId-criaTTivados/
├── squad.yaml              # Manifesto principal (entry_agent: cbo)
├── agents/
│   ├── atendimento/        # 5 agentes - Client Service
│   ├── search-insights/    # 5 agentes - Pesquisa/Inteligência
│   ├── deenea/             # 6 agentes - Essência/Estratégia
│   ├── unniko/             # 8 agentes - Identidade Visual/Verbal
│   ├── storytelling/       # 8 agentes - Narrativa/Criação
│   ├── content-ops/        # 5 agentes - Produção de Conteúdo
│   ├── growth-ops/         # 5 agentes - Growth/Performance
│   └── directors/          # 1 agente - CBO (orquestração)
├── data/                   # 47 arquivos de conhecimento
├── workflows/              # 14 fluxos de trabalho
├── tasks/                  # 30 tarefas atômicas
├── templates/              # 7 templates de documentos
├── checklists/             # 8 checklists de qualidade
└── config/                 # Configurações
```

## Dependências entre Sub-squads

O fluxo é **sequencial com gates bloqueantes**. Cada sub-squad depende dos outputs da anterior:

```
Atendimento ──→ Search & Insights ──→ DEENEA ──→ [CBO Gate 1]
                                                       │
                                                       ▼
                                                    UNNIKO ──→ [CBO Gate 2]
                                                                    │
                                                                    ▼
                                                          storYOURtelling ──→ [CBO Gate 3]
                                                                                    │
                                                                                    ▼
                                                                    Content-Ops ─┬─→ [CBO Gate 4] → Entrega
                                                                    Growth-Ops  ─┘
```

| De | Para | Output transferido | Formato |
|----|------|--------------------|---------|
| Atendimento | Search & Insights | Briefing BranDesire (16 campos) | YAML |
| Search & Insights | DEENEA | Insights Document (dados + tendências) | MD |
| DEENEA | CBO Gate 1 | Brand Strategy Document | MD |
| CBO Gate 1 | UNNIKO | Brand Strategy aprovado + feedback | MD |
| UNNIKO | CBO Gate 2 | Brand Identity Document + Design System | MD |
| CBO Gate 2 | storYOURtelling | Brand Identity aprovada + feedback | MD |
| storYOURtelling | CBO Gate 3 | Creative Brief + Big Idea | MD |
| CBO Gate 3 | Content-Ops / Growth-Ops | Creative Brief aprovado | MD |
| Content-Ops + Growth-Ops | CBO Gate 4 | Todos os entregáveis | MD |

## Ratio Agentes:Tasks (43:30)

| Sub-squad | Agentes | Tasks diretas | Agentes de suporte | Cobertura |
|-----------|---------|---------------|-------------------|-----------|
| Atendimento | 5 | 4 | 1 (asset-manager) | 100% |
| Search & Insights | 5 | 8 | 0 | 100% |
| DEENEA | 6 | 3 | 3 (executam fases internas) | 100% |
| UNNIKO | 8 | 3 | 4 (especialistas de passos) | 100% |
| storYOURtelling | 8 | 3 | 4 (especialistas de passos) | 100% |
| Content-Ops | 5 | 3 | 2 (visual-creator, social-media-strategist) | 100% |
| Growth-Ops | 5 | 3 | 2 (analytics-reader, traffic-manager) | 100% |
| Directors | 1 | 3 | 0 | 100% |

**22 agentes** são responsáveis diretos por tasks. **21 agentes** atuam como especialistas de suporte dentro de passos de tasks. Nenhum agente é redundante.

## Estimativas de Tempo por Stage

| Stage | Sub-squad | Estimativa | Complexidade |
|-------|-----------|-----------|--------------|
| 1 | Atendimento (Briefing) | 30-60 min | Baixa |
| 2 | Search & Insights | 60-120 min | Média |
| 3 | DEENEA (Posicionamento) | 90-180 min | Alta |
| 4 | CBO Gate 1 | 15-30 min | Baixa |
| 5 | UNNIKO (Diferenciação) | 60-120 min | Alta |
| 6 | CBO Gate 2 | 15-30 min | Baixa |
| 7 | storYOURtelling (Criação) | 90-180 min | Alta |
| 8 | CBO Gate 3 | 15-30 min | Baixa |
| 9 | Content-Ops + Growth-Ops | 60-120 min | Média |
| 10 | CBO Gate 4 + Entrega | 15-30 min | Baixa |
| **Total** | **Full Brand Journey** | **~7-14 horas** | |

## Fallback e Escalation

### Quando um CBO Gate rejeita

```
CBO Gate rejeita
    │
    ├─→ Feedback específico é gerado (quais critérios falharam)
    │
    ├─→ Documento volta para a sub-squad responsável
    │
    ├─→ Sub-squad corrige APENAS os pontos indicados
    │
    └─→ Resubmete ao CBO Gate (máximo 3 tentativas)
         │
         └─→ Se falhar 3x: escalation para revisão humana
```

### Quando uma task falha

| Cenário | Fallback |
|---------|----------|
| Briefing incompleto (< 16 campos) | Checkpoint-validator identifica gaps, retorna ao briefing-collector |
| Dados de mercado insuficientes | Research-director solicita coleta adicional ao data-miner |
| Posicionamento genérico | Strategic-synthesizer refaz com feedback do strategy-director |
| Big Idea fraca | Creative-director pede novas alternativas ao big-idea-architect |
| Conteúdo fora do tom | Brand-voice-director rejeita e indica correções ao copywriter |

## Exemplos de Output

### Brand Strategy Document (DEENEA)

```markdown
# Brand Strategy Document — [Nome da Marca]

## 1. Propósito
"Conectar [público] com [valor] através de [mecanismo]"

## 2. Positioning Statement
Para [público-alvo] que [necessidade/JTBD],
[marca] é a [categoria] que [diferencial único]
porque [razão de acreditar].

## 3. Arquétipos
- Primário: [Arquétipo] (70%)
- Secundário: [Arquétipo] (30%)

## 4. Personas (JTBD)
- Persona 1: [Nome], [Idade], [Job to be Done]
- Persona 2: [Nome], [Idade], [Job to be Done]
```

### Creative Brief (storYOURtelling)

```markdown
# Creative Brief — [Nome da Marca]

## Big Idea
"[Frase conceitual — máximo 7 palavras]"

## Tom de Voz
- Sempre: [3 atributos]
- Nunca: [3 anti-atributos]

## Narrativa
- Framework: [Hero's Journey / STEPPS / Hook Model]
- Emoção primária: [emoção]
- Call to action: [ação desejada]
```

## Frameworks Integrados

### DEENEA (Estratégia)

| Data File | Framework | Aplicação |
|-----------|-----------|-----------|
| `kahneman-dual-systems.yaml` | Sistema 1/2 (Kahneman) | Decisões rápidas vs lentas, vieses cognitivos |
| `brand-mythology-harari.yaml` | Ficções Intersubjetivas (Harari) | Mitologia de marca, significado compartilhado |
| `jtbd-framework.yaml` | Jobs To Be Done (Christensen) | Entender o "trabalho" que cliente quer realizar |
| `culture-values-framework.yaml` | Cultura e Valores (Lencioni, Godin) | Definir valores autênticos e comunidade |

### UNNIKO (Identidade)

| Data File | Framework | Aplicação |
|-----------|-----------|-----------|
| `wheeler-brand-process.yaml` | 5 Fases (Alina Wheeler) | Processo completo de identidade visual |
| `sensory-branding.yaml` | Branding Sensorial (Lindstrom) | Smashing Your Brand, Sensograma, USP→HSP |
| `behavioral-economics-branding.yaml` | Economia Comportamental (Ariely) | Vieses para branding (decoy, anchoring, FREE!) |

### storYOURtelling (Narrativa)

| Data File | Framework | Aplicação |
|-----------|-----------|-----------|
| `virality-frameworks.yaml` | STEPPS, SPEACC, REDUCE (Berger) | Frameworks de viralidade |
| `hook-model-eyal.yaml` | 4 Fases do Hábito (Nir Eyal) | Trigger→Action→Reward→Investment |
| `marketing-journey-kotler.yaml` | 5As Journey (Kotler) | Aware→Appeal→Ask→Act→Advocate |

## Agentes por Squad

### Atendimento (5 agentes)
- `account-director` - Diretor de atendimento, orquestrador
- `briefing-collector` - Coleta dos 16 campos BranDesire
- `client-analyst` - Análise de contexto e histórico do cliente
- `checkpoint-validator` - Validação de completude e gaps
- `asset-manager` - Organização de materiais recebidos

### Search & Insights (5 agentes)
- `research-director` - Supervisão de pesquisa
- `data-miner` - Coleta de dados de mercado
- `social-listener` - Monitoramento de redes sociais
- `trend-analyst` - Análise de tendências STEEP
- `insight-synthesizer` - Síntese e relatório final

### DEENEA (6 agentes)
- `strategy-director` - Supervisor estratégico
- `narrative-identity-architect` - Propósito, origem, POV
- `brand-personality-architect` - Arquétipos, tom, postura
- `culture-community-architect` - Valores, comunidade
- `audience-mapper` - Personas, JTBD
- `strategic-synthesizer` - Positioning Statement

### UNNIKO (8 agentes)
- `brand-director` - Supervisor de identidade
- `identity-architect` - Assets sensoriais, Brand Book
- `differentiation-strategist` - Mapeamento de diferenciais
- `brand-experience-designer` - Touchpoints, rituais
- `verbal-identity-specialist` - Naming, tagline, voz
- `design-system-architect` - Sistema visual
- `brand-auditor` - Auditoria de marca
- `competitive-analyst` - Análise competitiva

### storYOURtelling (8 agentes)
- `creative-director` - Supervisor criativo
- `big-idea-architect` - Big Idea
- `narrative-designer` - Estrutura narrativa
- `concept-writer` - Core Concept
- `copywriter` - Textos
- `art-director` - Direção visual
- `brand-voice-director` - Validação de voz
- `creative-brief-analyst` - Briefing

### Content-Ops (5 agentes)
- `content-director` - Direção de conteúdo
- `content-producer` - Produção de peças
- `scheduler` - Agendamento e publicação
- `social-media-strategist` - Estratégia de plataformas
- `visual-creator` - Criação visual

### Growth-Ops (5 agentes)
- `growth-director` - Direção de growth
- `funnel-architect` - Arquitetura de funis
- `campaign-optimizer` - Otimização de campanhas
- `traffic-manager` - Gestão de tráfego pago
- `analytics-reader` - Leitura de métricas

### Directors (1 agente)
- `cbo` - Chief Brand Officer (orquestração e gates de qualidade)

## Uso

```bash
# Ativar squad
@squAId-criaTTivados

# Comandos disponíveis
*build-brand-essence    # DEENEA - Fluxo completo
*build-brand-identity   # UNNIKO - Fluxo completo
*develop-big-idea       # storYOURtelling - Big Idea
```

## Referências Acadêmicas

### Estratégia
- Simon Sinek - Start With Why
- Jean-Noël Kapferer - Brand Identity Prism
- Al Ries & Jack Trout - Positioning

### Psicologia
- Daniel Kahneman - Thinking, Fast and Slow
- Dan Ariely - Predictably Irrational
- Jaak Panksepp - Affective Neuroscience

### Branding
- Martin Lindstrom - Brand Sense
- Alina Wheeler - Designing Brand Identity
- Byron Sharp - How Brands Grow

### Narrativa
- Jonah Berger - Contagious
- Nir Eyal - Hooked
- Joseph Campbell - The Hero's Journey

---

*squAId-criaTTivados v2.2 - Synkra AIOS*
