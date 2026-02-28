# Workflow: Carousel Creation

## Metadata
- id: carousel-creation
- version: 1.0.0
- type: multi-agent
- estimated_time: 1-2 hours
- agents_involved: [@alex-hormozi, @nicolas-cole, @vanessa-lau]

## Purpose
Create a high-converting Instagram carousel — from hook strategy through final copy — aligned with "Clareza em meio ao caos" positioning and optimized for saves and shares.

## Inputs
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| topic | string | yes | Core topic for the carousel |
| target_audience_pain | string | yes | Specific pain point to address (e.g., "overwhelmed by too many priorities") |
| cta_goal | string | yes | Desired action: dm, link_click, save, share, follow, next_step |
| slide_count | integer | no | Number of slides (default: 8-10 including hook and CTA) |
| proof | string | no | Client result or data point to include |
| tone_override | string | no | Tone adjustment if needed (default: direto, sem verniz, pratico) |

## Phases

### Phase 1: HOOK STRATEGY
- **Agent**: @alex-hormozi
- **Framework**: Hook-Retain-Reward
- **Inputs**: topic, target_audience_pain, cta_goal
- **Steps**:
  1. Identify the core transformation: from [pain state] to [desired state]
  2. Generate 5 hook options using Hormozi's 6 hook types:
     - Question hook: "Voce sabe por que continua travado mesmo fazendo tudo certo?"
     - Contrarian hook: "O problema nao e falta de foco. E excesso de clareza falsa."
     - Story hook: "Ele faturava 50k/mes e nao conseguia decidir o proximo passo."
     - Stat hook: "83% dos profissionais de alta performance relatam paralisia decisoria."
     - Challenge hook: "Se voce nao consegue explicar sua direcao em 1 frase, leia isso."
     - List hook: "5 sinais de que obesidade mental esta travando sua carreira"
  3. Score each hook on curiosity gap (1-10) and positioning alignment (1-10)
  4. Select best hook and define the retention strategy (what keeps them swiping)
  5. Define the reward: what insight do they get that makes them save/share?
- **Outputs**: selected_hook, hook_alternatives[], retention_strategy, reward_definition
- **Checkpoint**: Selected hook must score 8+/10 on curiosity gap AND connect to "obesidade mental" thesis
- **Estimated Time**: 20 min

### Phase 2: COPY
- **Agent**: @nicolas-cole
- **Framework**: Headline Engineering + Rate of Revelation
- **Inputs**: selected_hook, retention_strategy, reward_definition, topic, proof
- **Steps**:
  1. Write hook slide (Slide 1): headline only, maximum 8 words, high contrast
  2. Write setup slides (Slides 2-3): establish the problem, create empathy
     - Use Rate of Revelation: reveal just enough to keep them swiping
     - Each slide = one idea, one sentence, one punch
  3. Write content slides (Slides 4-7): deliver the insight/framework
     - Apply Headline Engineering: every slide headline must work standalone
     - Use specificity over vagueness ("3 decisoes" not "algumas coisas")
     - Integrate proof naturally if available
  4. Write CTA slide (final): clear next step aligned with cta_goal
     - For next_step: "Quer clareza real? Link na bio — Next Step"
     - For save: "Salva pra reler quando a cabeca travar de novo"
     - For share: "Manda pra quem precisa ouvir isso"
  5. Write caption: 3-5 lines reinforcing the carousel message + relevant hashtags
- **Outputs**: slide_copy[] (headline + body per slide), caption, hashtags[]
- **Checkpoint**: Each slide headline must be readable in 2 seconds; body in 5 seconds
- **Estimated Time**: 40 min

### Phase 3: FORMAT
- **Agent**: @vanessa-lau
- **Framework**: 9 Content Pillars + ANC Funnel
- **Inputs**: slide_copy[], caption, cta_goal
- **Steps**:
  1. Map carousel to Content Pillar: Educational, Inspirational, Personal Story, Authority, Community, Behind-the-Scenes, Promotional, Trending, Controversial
  2. Map to ANC Funnel stage:
     - Attract: hook optimized for explore/shares
     - Nurture: content builds trust and credibility
     - Convert: CTA drives specific action
  3. Define visual specs:
     - Slide dimensions: 1080x1350px (4:5 ratio)
     - Font hierarchy: headline (bold, large), body (regular, readable)
     - Color scheme: B&W base + accent dourado (#C9A84C) for emphasis
     - Max words per slide: headline 8, body 25
  4. Add formatting notes: text placement, whitespace, emphasis markers
  5. Suggest posting time and companion stories sequence
- **Outputs**: format_specs, visual_guidelines, posting_recommendation, stories_sequence
- **Checkpoint**: All slides respect word limits; visual specs match brand identity
- **Estimated Time**: 20 min

### Phase 4: QA
- **Agent**: All agents (review round)
- **Framework**: Quality Scorecard
- **Inputs**: All outputs from Phases 1-3
- **Steps**:
  1. Positioning check: Does every slide reinforce "Clareza em meio ao caos"?
  2. Hook strength: Would the target audience stop scrolling? (score 1-10)
  3. Retention: Is there a reason to swipe to the next slide? (score per transition)
  4. Reward: Does the audience feel smarter/clearer after reading? (score 1-10)
  5. CTA clarity: Is the next step obvious and frictionless? (score 1-10)
  6. Tone check: direto, sem verniz, pratico — no fluff, no jargon
  7. Calculate composite quality_score (weighted average)
- **Outputs**: quality_scorecard, quality_score, revision_notes (if score < 7)
- **Checkpoint**: quality_score must be 7+/10; if below, return to Phase 2 with revision_notes
- **Estimated Time**: 15 min

## Outputs
| Deliverable | Format | Description |
|-------------|--------|-------------|
| slide_copy | markdown[] | Headline + body for each slide (hook through CTA) |
| caption | string | Instagram caption with hashtags |
| format_specs | object | Visual guidelines, dimensions, fonts, colors |
| hook_alternatives | markdown[] | 4 backup hooks for A/B testing |
| quality_scorecard | object | Detailed scoring across 6 criteria |
| quality_score | float | Composite score (must be 7+/10) |
| posting_recommendation | object | Best time, day, companion stories |
| stories_sequence | markdown[] | Story frames to post alongside carousel |

## Quality Gates
- [ ] All 4 phases completed in order
- [ ] Hook scores 8+/10 on curiosity gap
- [ ] Every slide readable in under 5 seconds
- [ ] CTA aligned with cta_goal input
- [ ] Positioning alignment verified against thesis
- [ ] Tone is direto, sem verniz, pratico
- [ ] Visual specs match brand identity (B&W + #C9A84C)
- [ ] Composite quality_score 7+/10
- [ ] If proof provided, it's integrated naturally (not forced)
