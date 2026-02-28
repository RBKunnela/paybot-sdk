# Workflow: Weekly Sprint

## Metadata
- id: weekly-sprint
- version: 2.0.0
- type: multi-agent
- estimated_time: 7-8 horas (distribuído ao longo da semana)
- phases: 6
- agents_involved: [@caleb-ralston, @dan-koe, @alex-hormozi, @gary-vaynerchuk, @vanessa-lau, @justin-welsh, @nicolas-cole, @george-blackman, @eugene-schwartz, @devil-advocate, @oraculo-torriani]

## Purpose

Executar um ciclo de sprint semanal completo em 6 fases — desde coleta de dados e diagnóstico até produção com debate e review final — produzindo uma semana inteira de conteúdo alinhado ao posicionamento "Clareza em meio ao caos" para todas as plataformas.

## Inputs

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| week_number | integer | sim | Número da semana do sprint para rastreamento |
| theme_suggestion | string | não | Override de tema; se vazio, derivado do Brand Journey |
| proofs | list | não | Resultados recentes de clientes, screenshots, depoimentos |
| priority_platform | string | não | Plataforma priorizada (default: Instagram) |

## Visão Geral das 6 Fases

```
Fase 0: DADOS (automático)        → 15min
Fase 1: CONTEXTO                  → 30min
Fase 2: PLANEJAMENTO MACRO        → 1h
Fase 3: PLANEJAMENTO MICRO        → 2h
Fase 4: PRODUÇÃO DE COPY + DEBATE → 3-4h
Fase 5: REVIEW + TRACKER          → 30min
                                    ─────
                              Total: 7-8h
```

---

## Fase 0 — DADOS (automático)

**Tempo estimado**: 15 minutos
**Tipo**: Automático (coleta e sumarização)
**Agentes**: Nenhum (processamento de dados)

### Objetivo
Coletar e sumarizar todos os dados necessários para o sprint, criando uma base factual para as decisões estratégicas.

### Inputs

| Input | Fonte | Descrição |
|-------|-------|-----------|
| Métricas Instagram | `data/metrics-template.md` | Métricas da semana anterior (alcance, engajamento, saves, shares, follows) |
| Review anterior | `reviews/review-semana-{N-1}.md` | Review da semana anterior com scores e hipóteses |
| Feedback acumulado | `tracker/tracker-semana-{N-1}.md` | Feedback registrado no tracker da semana anterior |
| Métricas por peça | Instagram Insights | Performance individual de cada peça publicada |

### Steps

1. **Coletar métricas da semana anterior**
   - Preencher template `data/metrics-template.md` com dados reais do Instagram Insights
   - Incluir: alcance total, impressões, engajamento rate, saves, shares, follows ganhos/perdidos
   - Métricas por peça: qual post performou melhor? Qual pior? Por quê?

2. **Ler review da semana anterior**
   - Recuperar `reviews/review-semana-{N-1}.md`
   - Extrair: hipótese testada, resultado, aprendizados, recomendações

3. **Consolidar feedback do tracker**
   - Ler `tracker/tracker-semana-{N-1}.md`
   - Extrair: peças com feedback positivo, peças com feedback negativo, padrões identificados

4. **Gerar relatório de performance sumarizado**
   - Top 3 peças (por engajamento)
   - Bottom 3 peças (por engajamento)
   - Tendência: crescendo, estável ou declinando?
   - Padrão de horário: qual horário performou melhor?
   - Padrão de formato: carrossel vs estático vs reel

### Outputs

| Output | Formato | Descrição |
|--------|---------|-----------|
| `performance_report` | markdown | Relatório sumarizado de performance da semana anterior |
| `top_patterns` | lista | Padrões que funcionaram (formato, horário, tema, tom) |
| `weak_spots` | lista | Pontos fracos identificados para evitar/corrigir |
| `hypothesis_result` | string | Resultado da hipótese da semana anterior |

### Checkpoint
- [ ] Métricas coletadas e verificadas
- [ ] Review anterior lido
- [ ] Feedback consolidado
- [ ] Relatório de performance gerado

---

## Fase 1 — CONTEXTO (30min)

**Tempo estimado**: 30 minutos
**Agentes**: @caleb-ralston + @eugene-schwartz
**Frameworks**: Brand Journey (Caleb), 5 Levels of Awareness (Schwartz)

### Objetivo
Diagnosticar o momento atual da marca e da audiência, definindo o ângulo estratégico da semana com base em dados reais.

### Inputs

| Input | Fonte | Descrição |
|-------|-------|-----------|
| `performance_report` | Fase 0 | Relatório de performance sumarizado |
| `top_patterns` | Fase 0 | O que funcionou |
| `weak_spots` | Fase 0 | O que não funcionou |
| `hypothesis_result` | Fase 0 | Resultado da hipótese anterior |
| Design System | `docs/design-system.md` | Identidade visual e templates |
| HTML templates | `docs/instagram/templates/` | Templates disponíveis para render |
| Posicionamento | `data/positioning.md` | Posicionamento completo do Tiago |
| Produtos/Serviços | — | Next Step (beta gratuito — sessão de clareza e direção) |

### Steps

#### @caleb-ralston (Brand Journey Diagnosis)

1. **Ler contexto completo**
   - Design system, templates HTML, posicionamento, produtos
   - Review e feedbacks da semana anterior (Fase 0)

2. **Diagnóstico Brand Journey**
   - Onde a audiência está no Brand Journey? (Awareness → Consideration → Decision)
   - Comparar com a semana anterior: avançou, estável ou regrediu?
   - Justificar com dados do `performance_report`
   - Framework: Brand Journey (Caleb Ralston)

3. **Recomendação de ângulo semanal**
   - Baseado no estágio do Brand Journey, qual ângulo maximiza progressão?
   - Se audiência em Awareness: conteúdo de tese/provocação
   - Se audiência em Consideration: conteúdo de método/prova
   - Se audiência em Decision: conteúdo de oferta/CTA direto

#### @eugene-schwartz (Awareness Diagnosis)

4. **Diagnóstico de Awareness Level**
   - Qual o nível de awareness predominante da audiência?
     - Level 1: Unaware (não sabe que tem problema)
     - Level 2: Problem Aware (sabe do problema, não da solução)
     - Level 3: Solution Aware (sabe que existem soluções)
     - Level 4: Product Aware (conhece o Next Step)
     - Level 5: Most Aware (pronto para comprar)
   - Framework: 5 Levels of Awareness (Eugene Schwartz)

5. **Diagnóstico de Market Sophistication**
   - Qual o nível de sofisticação do mercado?
     - Level 1: Primeiro no mercado (claim direto)
     - Level 2: Segundo no mercado (claim ampliado)
     - Level 3: Mecanismo (como funciona)
     - Level 4: Mecanismo aprimorado
     - Level 5: Identificação/prova social
   - Impacto: determina o tipo de copy necessária

6. **Síntese de recomendação**
   - Combinar Brand Journey (Caleb) + Awareness Level (Schwartz)
   - Output: ângulo semanal recomendado com justificativa
   - Exemplo: "Audiência em Consideration + Awareness L3 → foco em método/prova com mecanismo claro"

### Outputs

| Output | Formato | Agente | Descrição |
|--------|---------|--------|-----------|
| `brand_journey_stage` | string | @caleb-ralston | Estágio atual (Awareness/Consideration/Decision) |
| `brand_journey_trend` | string | @caleb-ralston | Tendência vs semana anterior |
| `awareness_level` | integer (1-5) | @eugene-schwartz | Nível de awareness predominante |
| `sophistication_level` | integer (1-5) | @eugene-schwartz | Nível de sofisticação do mercado |
| `weekly_angle` | string | Ambos | Ângulo recomendado para a semana |
| `angle_justification` | string | Ambos | Justificativa com dados |

### Checkpoint (QG-002 — Blocking)
- [ ] Brand Journey diagnosticado com justificativa baseada em dados
- [ ] Awareness level identificado (1-5)
- [ ] Sophistication level identificado (1-5)
- [ ] Ângulo semanal definido e justificado
- [ ] Ângulo conecta com "Clareza em meio ao caos"

### Gate Rule
**BLOCKING**: Sem diagnóstico completo, Fase 2 NÃO inicia. Se dados forem insuficientes para diagnóstico preciso, usar melhor estimativa com flag "[estimado — dados insuficientes]".

---

## Fase 2 — PLANEJAMENTO MACRO (1h)

**Tempo estimado**: 1 hora
**Agentes**: @caleb-ralston + @dan-koe + @alex-hormozi
**Frameworks**: Accordion Method (Caleb), Art of Focus (Dan Koe), 1-to-54 Repurposing (Vanessa)

### Objetivo
Definir o tema semanal, a One Big Idea, a peça HERO e o mapa de derivações.

### Inputs
- Todos os outputs da Fase 1 (`brand_journey_stage`, `awareness_level`, `weekly_angle`, etc.)
- `theme_suggestion` (se fornecido pelo usuário)

### Steps

#### @caleb-ralston (Tema Semanal + One Big Idea)

1. **Definir tema semanal**
   - Usar `weekly_angle` da Fase 1 como ponto de partida
   - Se `theme_suggestion` foi fornecido pelo usuário, validar contra o ângulo
   - Aplicar **Accordion Method**: zoom out para a tese ("Obesidade mental trava. Clareza liberta."), zoom in para o ângulo específico da semana
   - O tema deve ser específico o suficiente para gerar conteúdo concreto, mas amplo o suficiente para derivar múltiplas peças
   - Exemplo: "O mito da produtividade: por que fazer mais te atrasa"
   - Framework: Accordion Method (Caleb Ralston)

2. **Articular a One Big Idea**
   - Uma frase que conecta TODAS as peças da semana
   - Deve ser tweetável (max 280 chars) e acionável
   - Teste: se alguém lê só essa frase, já entende o ponto da semana?
   - Exemplo: "Produtividade sem direção é a forma mais cara de procrastinar"
   - Regra: a One Big Idea é o DNA — tudo deriva dela

#### @dan-koe (Peça HERO + Filosofia de Conteúdo)

3. **Definir peça HERO**
   - A peça HERO é o conteúdo âncora da semana — a mais longa e profunda
   - Hierarquia de preferência:
     1. YouTube long-form (10-20min) — máximo de derivações possíveis
     2. Long Reel (60-90s) — se não houver YouTube nessa semana
     3. Carousel hero (10 slides aprofundados) — último recurso
   - Fallback explícito: se não há YouTube nessa semana, HERO = long Reel ou Carousel hero
   - Framework: Art of Focus (Dan Koe) — uma ideia profunda, múltiplos ângulos
   - Output: tipo da peça HERO, tema específico, ângulo, duração estimada

4. **Economia de conteúdo: 1 gravação = máximo de peças**
   - Princípio central: uma sessão de gravação/criação gera o máximo de conteúdo derivado
   - Se HERO é YouTube: 1 gravação gera o vídeo completo + clips + quotes + newsletter
   - Se HERO é Reel: 1 roteiro gera o reel + variações de caption + posts estáticos
   - Framework: Newsletter-First (Dan Koe) — a ideia escrita é o alicerce

#### @alex-hormozi (Mapa de Derivações)

5. **Mapear derivações: HERO → todas as peças**
   - Aplicar lógica de repurposing do HERO para cada formato/plataforma
   - Framework: combinação de 1-to-54 Repurposing (Vanessa) + Hook-Retain-Reward (Hormozi)
   - Cada derivação deve ter hook próprio (não copiar o hook do HERO)

6. **Criar mapa visual de derivações**

   ```
   HERO (YouTube/Reel/Carousel)
   ├── Reels (2-3x): clips com hooks diferentes
   │   ├── Reel 1: hook provocação
   │   ├── Reel 2: hook dado/número
   │   └── Reel 3: hook história
   ├── Newsletter (1x): versão escrita aprofundada
   ├── Carrossel (1-2x): método ou framework extraído
   │   ├── Carousel 1: framework step-by-step
   │   └── Carousel 2: mitos vs realidade
   ├── Post estático (1-2x): frase-tese extraída
   │   ├── Static 1: frase provocadora
   │   └── Static 2: reflexão/citação
   ├── Stories (5-7x/dia): bastidores + processo + interação
   ├── TikTok: clips adaptados (formato vertical nativo)
   └── LinkedIn: versão autoridade (tom profissional)
   ```

7. **Validar economia de conteúdo**
   - Mínimo: HERO gera pelo menos 8 peças derivadas
   - Cada peça derivada tem vida própria (funciona sem ver o HERO)
   - Nenhuma peça é copy-paste — cada uma tem hook e ângulo únicos

### Outputs

| Output | Formato | Agente | Descrição |
|--------|---------|--------|-----------|
| `weekly_theme` | string | @caleb-ralston | Tema específico da semana |
| `one_big_idea` | string | @caleb-ralston | Frase-DNA que conecta tudo |
| `hero_piece` | object | @dan-koe | Tipo, tema, ângulo e duração da peça HERO |
| `hero_type` | string | @dan-koe | "youtube" / "long-reel" / "carousel-hero" |
| `content_economy` | string | @dan-koe | Descrição da sessão de produção |
| `derivation_map` | tree/table | @alex-hormozi | Mapa completo: HERO → todas as derivações |
| `total_pieces` | integer | @alex-hormozi | Total de peças na semana |
| `pieces_per_platform` | table | @alex-hormozi | Distribuição por plataforma |

### Checkpoint
- [ ] Tema semanal definido e conectado à tese "Clareza em meio ao caos"
- [ ] One Big Idea articulada (tweetável, acionável)
- [ ] Peça HERO escolhida com justificativa (YouTube > long Reel > Carousel hero)
- [ ] Mapa de derivações completo com mínimo 8 peças
- [ ] Cada derivação tem hook e ângulo próprios
- [ ] Economia de conteúdo: 1 sessão de gravação = máximo de peças
- [ ] Frameworks citados: Accordion Method, Art of Focus, 1-to-54 Repurposing

---

## Fase 3 — PLANEJAMENTO MICRO (2h)

**Tempo estimado**: 2 horas
**Agentes**: @vanessa-lau + @gary-vaynerchuk + @justin-welsh
**Frameworks**: ANC Funnel, 9 Content Pillars, Platform-Native Architecture, ContentOS

### Objetivo
Para CADA dia e CADA peça: definir horário, formato, dimensões, tag ANC, pilar de conteúdo, direção de arte completa, roteiro/texto, caption com hashtags e grid tracker.

### Inputs
- Todos os outputs da Fase 2 (`weekly_theme`, `one_big_idea`, `hero_piece`, `derivation_map`)
- Design System (`docs/design-system.md` seção 10 — Templates Instagram)

### Steps

#### @vanessa-lau (Instagram Detailing + ANC Funnel)

1. **Classificar cada peça com tag ANC**
   - **A (Attract)**: conteúdo para atrair novos seguidores (hooks provocadores, temas amplos)
   - **N (Nurture)**: conteúdo para nutrir a audiência existente (método, história, valor)
   - **C (Convert)**: conteúdo para converter em leads/clientes (CTA direto, Next Step)
   - Distribuição ideal na semana: 40% Attract / 40% Nurture / 20% Convert
   - Framework: ANC Funnel (Vanessa Lau)

2. **Classificar cada peça nos 9 Content Pillars**
   - Pilar 1: Educacional (ensinar algo aplicável)
   - Pilar 2: Inspiracional (motivar, provocar reflexão)
   - Pilar 3: Entretenimento (humor, trending, relatable)
   - Pilar 4: Pessoal (bastidores, rotina, filha, devocional — 20% da regra 80/20)
   - Pilar 5: Autoridade (resultados, provas, cases)
   - Pilar 6: Comunidade (perguntas, enquetes, interação)
   - Pilar 7: Controversial (opinião forte, contra-corrente)
   - Pilar 8: Storytelling (narrativa pessoal ou de cliente)
   - Pilar 9: Promocional (Next Step, serviço, CTA direto)
   - Garantir diversidade: mínimo 4 pilares diferentes na semana
   - Framework: 9 Content Pillars (Vanessa Lau)

3. **Definir formato e dimensões para cada peça**
   - Feed/Carrossel: 1080x1350 (4:5)
   - Stories/Reels: 1080x1920 (9:16)
   - Template HTML para usar (de `docs/instagram/templates/`):
     - `cover` — capa de carrossel, 1o slide
     - `content-basic` — slides internos com badge/número
     - `content-list` — slides com lista de itens
     - `static-post` — frase-tese, opinião, reflexão
     - `story-frame` — frames de story sequence
   - Definir se a peça é tipográfica (render.ts) ou foto + overlay

#### @gary-vaynerchuk (Horários + Plataformas)

4. **Definir horário exato de publicação para cada peça**
   - Baseado nos `top_patterns` da Fase 0 (qual horário performou melhor?)
   - Se sem dados: usar defaults:
     - Feed: 11h30 ou 18h30 (horário de Brasília)
     - Stories: 8h, 12h, 18h, 21h (4 janelas)
     - Reels: 12h ou 19h
   - Regra: máximo 2 peças de feed no mesmo dia
   - Framework: Day Trading Attention (Gary Vaynerchuk)

5. **Adaptar peças para cada plataforma**
   - Instagram: formato nativo (feed, stories, reels)
   - TikTok: vertical, hook nos primeiros 0.5s, texto na tela
   - LinkedIn: tom profissional, sem emojis excessivos, parágrafo curto
   - Substack: newsletter long-form (derivada do HERO)
   - Cada adaptação deve parecer NATIVA da plataforma (não copy-paste)
   - Framework: Platform-Native Architecture (Gary Vaynerchuk)

#### @justin-welsh (Detalhamento Micro + Grid Tracker)

6. **Detalhar cada peça do sprint**

   Para CADA peça, documentar:

   ```markdown
   ### Peça: [nome/ID]
   - **Dia**: Segunda/Terça/.../Domingo
   - **Horário**: HH:MM (BRT)
   - **Plataforma**: Instagram Feed / Stories / Reels / TikTok / LinkedIn / Substack
   - **Formato**: Carrossel / Estático / Reel / Story / Newsletter
   - **Dimensões**: 1080x1350 / 1080x1920
   - **Template**: cover / content-basic / content-list / static-post / story-frame
   - **ANC Tag**: Attract / Nurture / Convert
   - **Pilar**: [1-9]
   - **Art Direction**:
     - Fundo: Navy (#14213D) / Branco (#FFFFFF) / Gold (#FCA311) / Cinza (#F5F5F5 ou #2D2D2D)
     - Tipografia: Inter ExtraBold (headline) + Courier Prime (body)
     - Cor do texto: [hex]
     - Foto ou tipografia pura?
     - Se foto: descrição da foto + overlay navy 60%
     - Safe zones: top/bottom/laterais conforme formato
   - **Roteiro/Script** (se vídeo): texto completo com marcações
   - **Texto de slides** (se carrossel): headline + body por slide
   - **Caption completa**: com hooks, corpo e CTA
   - **Hashtags**: 15-20 relevantes (mix de nichos)
   ```

   - Framework: ContentOS (Justin Welsh)

7. **Configurar grid tracker**
   - Alternância visual: slides/posts ímpares = fundo claro, pares = fundo escuro
   - Verificar que o grid do perfil mantém diversidade visual
   - Marcar cada peça com status inicial: (pendente)

8. **Compilar sprint-semana-N.md**
   - Arquivo completo com TODAS as peças detalhadas
   - Organizado por dia (Segunda → Domingo)
   - Inclui sumário no topo com contadores:
     - Total de peças
     - Distribuição ANC (X Attract / Y Nurture / Z Convert)
     - Pilares usados
     - Plataformas cobertas

### Outputs

| Output | Formato | Agente | Descrição |
|--------|---------|--------|-----------|
| `sprint_semana_N` | markdown | @justin-welsh | Sprint completo com todas as peças detalhadas |
| `anc_distribution` | object | @vanessa-lau | Distribuição ANC (Attract/Nurture/Convert) |
| `pillars_used` | list | @vanessa-lau | Pilares de conteúdo usados na semana |
| `posting_schedule` | table | @gary-vaynerchuk | Calendário de publicação com horários |
| `platform_map` | table | @gary-vaynerchuk | Peças por plataforma |
| `grid_tracker` | table | @justin-welsh | Tracker visual do grid Instagram |

### Checkpoint
- [ ] Cada peça tem: horário, formato, dimensões, ANC tag, pilar, art direction completa
- [ ] Roteiro/texto completo para cada peça (inclusive slides de carrossel)
- [ ] Caption com hashtags para cada peça (15-20 hashtags)
- [ ] Grid tracker configurado com alternância claro/escuro
- [ ] Distribuição ANC equilibrada (~40/40/20)
- [ ] Mínimo 4 pilares diferentes na semana
- [ ] Todas as 5 plataformas cobertas (Instagram, YouTube, TikTok, LinkedIn, Substack)
- [ ] Se `docs/design-system.md` seção 10 não existir: CRIAR a seção com dimensões, safe zones, paleta, tipografia
- [ ] Frameworks citados: ANC Funnel, 9 Content Pillars, Platform-Native, ContentOS

---

## Fase 4 — PRODUÇÃO DE COPY + DEBATE (3-4h)

**Tempo estimado**: 3-4 horas
**Agentes**: Vários (debate por peça) + @devil-advocate + @oraculo-torriani
**Workflow**: `workflows/debate-session.md`

### Objetivo
Produzir copy final para cada peça de feed via debate estruturado, com validação Torriani.

### Inputs
- `sprint_semana_N` da Fase 3 (briefing completo por peça)

### Steps

#### Para CADA peça de FEED: ativar debate-session.md

1. **Identificar par de debate**
   - Consultar `debate.agent_pairs` no config:
     - Carrossel: @nicolas-cole vs @alex-hormozi (consolidador: @nicolas-cole)
     - Reel script: @george-blackman vs @nicolas-cole (consolidador: @nicolas-cole)
     - Post estático: @nicolas-cole vs @dan-koe (consolidador: @nicolas-cole)
     - Email/Landing: @joanna-wiebe vs @stefan-georgi (consolidador: @joanna-wiebe)
   - Cada debate segue `workflows/debate-session.md`

2. **Executar debate por peça (workflow debate-session.md)**
   - **Round 1**: Agente A produz versão 1 (headline + body + caption)
   - **Round 1**: Agente B produz versão 2 (headline + body + caption)
   - **Round 1**: @devil-advocate ataca ambas versões:
     - Teste da Substituição: "Se trocar o nome da marca, funciona pra qualquer um?"
     - Teste do Dado: "Isso é uma versão diluída de algo? Falta dado/prova?"
     - Teste do Scroll: "Eu pararia de scrollar por isso?"
     - Devil's Advocate NAO reescreve — só aponta fraquezas
   - **Consolidação**: Consolidador (geralmente @nicolas-cole) faz merge das melhores partes
   - **Validação**: @oraculo-torriani dá score (0-10)
     - Score >= 7: aprovado (QG-004 passa)
     - Score < 7: volta para Round 2

3. **Round 2 (se necessário)**
   - Consolidador revisa baseado no feedback do Torriani
   - @devil-advocate reavalia
   - @oraculo-torriani dá novo score
   - Score >= 7: aprovado
   - Score < 7: Round 3 (última chance)

4. **Escalação (se Round 2 falhar)**
   - 3a rejeição do Torriani = decisão humana (Tiago)
   - Apresentar: versão final + feedback Torriani + score + recomendação
   - Tiago decide: aprovar, reescrever manualmente, ou descartar

5. **Limite de iteração**
   - Máximo 2 rounds de debate
   - Tempo máximo por debate: 30-45 minutos
   - Se peça travar, marcar como "[ESCALADO]" e seguir para próxima

#### Para STORIES: produção direta (sem debate)

6. **Produção direta de stories**
   - Agente: @vanessa-lau + checklist
   - Sem debate — stories são efêmeros e de baixo risco
   - Checklist: hook no 1o frame, texto legível, CTA no último, swipe-up se aplicável
   - Output: texto + art direction por story frame

#### Para CADA peça aprovada: gerar output final

7. **Montar copy final validada**
   - Headline final (após debate/validação)
   - Body final
   - Caption completa com hashtags
   - Framework usado: documentar qual framework cada agente aplicou
   - Torriani score registrado

8. **Gerar JSON batch para render.ts**
   - Para cada peça tipográfica, gerar entry no batch JSON
   - Formato compatível com `docs/instagram/render.ts`
   - Variáveis por template (ver `templates/render-batch-tmpl.md`)
   - JSON batch salvo como `output/batch-semana-N.json`

9. **Montar art direction para peças com foto**
   - Para peças que usam foto + overlay (capas, alguns estáticos)
   - Descrição da foto necessária
   - Especificação do overlay: `rgba(20, 33, 61, 0.6)`
   - Texto sobre overlay: cor, fonte, tamanho
   - Referência para geração/edição de imagem

### Outputs

| Output | Formato | Agente | Descrição |
|--------|---------|--------|-----------|
| Copy final por peça | markdown | Consolidador | Headline + body + caption + hashtags validados |
| Debate log por peça | markdown | — | Versões A/B + ataques + merge + scores |
| JSON batch | json | — | `batch-semana-N.json` para render.ts |
| Art direction foto | markdown | — | Descrição de foto + overlay para peças visuais |
| Torriani scores | tabela | @oraculo-torriani | Score por peça (mín 7/10 social) |
| Frameworks usados | tabela | Todos | Framework citado por peça |

### Checkpoint
- [ ] Debate completo para cada peça de feed (QG-003)
- [ ] @devil-advocate atacou cada peça (3 testes)
- [ ] @oraculo-torriani score >= 7/10 para cada peça de feed (QG-004)
- [ ] Stories produzidos diretamente (sem debate)
- [ ] JSON batch gerado compatível com render.ts
- [ ] Art direction documentada para peças com foto
- [ ] Framework usado citado em cada peça
- [ ] Peças escaladas marcadas como "[ESCALADO]" (se houver)
- [ ] Máximo 2 rounds de debate por peça respeitado

---

## Fase 5 — REVIEW + TRACKER (30min)

**Tempo estimado**: 30 minutos
**Agente**: @caleb-ralston

### Objetivo
Revisar alinhamento de posicionamento, inicializar tracker e definir hipótese da próxima semana.

### Inputs
- Todas as peças finais da Fase 4
- Posicionamento (`data/positioning.md`)

### Steps

#### @caleb-ralston (Review de Alinhamento)

1. **Avaliar alinhamento de posicionamento por peça**
   - Para CADA peça de feed produzida na Fase 4:
     - Score de alinhamento (1-10): quão bem a peça reflete "Clareza em meio ao caos"?
     - Critérios:
       - Tom direto, sem verniz, prático? (+2)
       - Conecta com a tese "Obesidade mental trava. Clareza liberta."? (+2)
       - Fala para o avatar (profissional travado, sobrecarregado)? (+2)
       - Tem ação clara (não é só reflexão vazia)? (+2)
       - Se encaixa na regra 80/20 (expertise vs personalidade)? (+2)
   - Framework: Brand Journey Review (Caleb Ralston)

2. **Calcular média de alinhamento**
   - Média dos scores de todas as peças de feed
   - Se média < 7/10: revisar as peças fracas (score < 6)
   - Peças fracas: listar quais e por que falharam no alinhamento
   - Recomendação: ajustar headline/caption ou trocar peça inteira

3. **Definir hipótese para a próxima semana**
   - Formato: "Se dobrarmos X sobre Y, esperamos Z"
   - Baseado nos padrões observados na semana atual + dados da Fase 0
   - Exemplos:
     - "Se dobrarmos posts com dados concretos (números, %) sobre produtividade, esperamos +20% saves"
     - "Se usarmos mais storytelling pessoal (pilar 4) nas quintas, esperamos +15% engajamento"
   - A hipótese será testada na semana seguinte e avaliada na Fase 0

#### Inicialização do Tracker

4. **Criar tracker-semana-N.md**
   - Para CADA peça do sprint, criar entrada no tracker:

   ```markdown
   ## Tracker — Semana N

   | # | Peça | Formato | Plataforma | Dia | Horário | Status | Score Torriani | Score Alinhamento | Feedback |
   |---|------|---------|------------|-----|---------|--------|----------------|-------------------|----------|
   | 1 | [nome] | Carrossel | Instagram | Seg | 11:30 | ⬜ | 8/10 | 9/10 | — |
   | 2 | [nome] | Estático | Instagram | Ter | 18:30 | ⬜ | 7/10 | 8/10 | — |
   | ... | ... | ... | ... | ... | ... | ⬜ | ... | ... | — |

   ### Contadores
   - Total: X peças
   - ⬜ Pendente: X
   - 🟡 Produzido: 0
   - 🟢 Publicado: 0

   ### Hipótese da Semana
   > Se dobrarmos X sobre Y, esperamos Z

   ### Feedback Acumulado
   [Atualizado conforme feedback é registrado via task update-tracker.md]
   ```

   - Status inicial: ⬜ (pendente) para todas as peças
   - Integração: Fase 4 marca como 🟡 (produzido), publicação marca como 🟢 (publicado)
   - Feedback: seção atualizada quando feedback é registrado

5. **Criar review-semana-N.md**

   ```markdown
   ## Review — Semana N

   ### Sumário
   - Tema: [tema semanal]
   - One Big Idea: [frase]
   - HERO: [tipo + título]
   - Total de peças: X
   - Média de alinhamento: X/10
   - Hipótese testada: [da semana anterior]
   - Resultado: [observado]

   ### Scores de Alinhamento
   | Peça | Score | Notas |
   |------|-------|-------|
   | [nome] | X/10 | [observação] |
   | ... | ... | ... |

   ### Peças Fracas (score < 6)
   [Lista com justificativa e recomendação]

   ### Hipótese para Semana N+1
   > Se dobrarmos X sobre Y, esperamos Z

   ### Aprendizados
   - O que funcionou:
   - O que não funcionou:
   - O que mudar na próxima semana:
   ```

6. **Conexão com weekly-review.md**
   - O `review-semana-N.md` é input da Fase 0 da próxima semana
   - O `tracker-semana-N.md` é input do feedback acumulado da próxima Fase 0
   - Ciclo: Review N → Dados N+1 → Contexto N+1 → ...

### Outputs

| Output | Formato | Agente | Descrição |
|--------|---------|--------|-----------|
| `review_semana_N` | markdown | @caleb-ralston | Review com scores de alinhamento por peça |
| `tracker_semana_N` | markdown | @caleb-ralston | Tracker inicializado com todas as peças em ⬜ |
| `alignment_scores` | tabela | @caleb-ralston | Score de alinhamento por peça |
| `average_alignment` | float | @caleb-ralston | Média de alinhamento (deve ser >= 7/10) |
| `weak_pieces` | lista | @caleb-ralston | Peças com score < 6 + justificativa |
| `next_week_hypothesis` | string | @caleb-ralston | "Se dobrarmos X sobre Y, esperamos Z" |

### Checkpoint
- [ ] Score de alinhamento calculado para cada peça de feed
- [ ] Média de alinhamento >= 7/10 (se menor, peças fracas revisadas)
- [ ] Tracker inicializado com todas as peças em ⬜
- [ ] Contadores zerados (⬜=total, 🟡=0, 🟢=0)
- [ ] Hipótese da próxima semana definida (formato "Se X, esperamos Y")
- [ ] Review salvo como `reviews/review-semana-N.md`
- [ ] Tracker salvo como `tracker/tracker-semana-N.md`
- [ ] Conexão estabelecida: review → Fase 0 da próxima semana

---

## Quality Gates

- [ ] Fase 0: Dados coletados e sumarizados
- [ ] Fase 1: QG-002 — Diagnóstico completo (awareness + sophistication + ângulo)
- [ ] Fase 2: Tema + One Big Idea + HERO + mapa de derivações
- [ ] Fase 3: Sprint completo com detalhamento por peça
- [ ] Fase 4: QG-003 (debate) + QG-004 (Torriani >= 7/10) para cada peça de feed
- [ ] Fase 5: Alinhamento médio >= 7/10 + tracker inicializado
- [ ] QG-005: Output final — tudo pronto para publicação

## Regras Gerais

1. **Ordem das fases é sagrada**: nunca pule uma fase ou inverta a sequência
2. **Dados antes de opinião**: Fase 0 alimenta todas as decisões
3. **Debate é obrigatório** para conteúdo de feed (carrosséis, posts, reels)
4. **Stories são exceção**: produção direta (1 agente + checklist), sem debate
5. **Torriani é gate final**: nenhuma peça de feed sai sem score >= 7/10
6. **Framework citado**: cada agente documenta qual framework usou
7. **Posicionamento sempre**: "Clareza em meio ao caos" como filtro em todas as fases
8. **Produto = Next Step**: nunca "Mapa de Direção"
9. **Economia de conteúdo**: 1 sessão de gravação = máximo de peças derivadas
10. **Iteração limitada**: máx 2 rounds de debate; 3a rejeição Torriani = decisão humana
