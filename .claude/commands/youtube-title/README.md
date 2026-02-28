# youtube-title

World-class YouTube title creation & optimization pipeline for YouTube creators.

## Squad Overview

7 specialist agents + 1 QA tool, each engineered for maximum CTR, all calibrated to the creator's voice DNA. This squad turns any video topic into a bank of high-performing title options scored by click-through-rate potential.

## When to Use This Squad

- You need YouTube titles for any channel video
- You want to test multiple title angles for a single topic
- You need competitive research on what titles are winning in the niche
- You want CTR-optimized titles that still sound like the creator
- You need title/thumbnail synergy analysis

## Agents

| Agent | Tier | Methodology | Covers |
|-------|------|-------------|--------|
| `title-chief` | Orchestrator | Pipeline routing + QC | Routes requests, enforces quality gates, delivers final titles |
| `title-researcher` | T1 - Research | Competitive analysis | Analyzes top-performing titles in the niche before generation |
| `curiosity-architect` | T2 - Generator | Curiosity gap theory | Information gaps, open loops, "what happens next" titles |
| `power-titler` | T2 - Generator | Power word optimization | Emotional triggers, power words, high-arousal language |
| `pattern-disruptor` | T2 - Generator | Pattern interrupt theory | Scroll-stopping, unexpected, contrarian titles |
| `trigger-specialist` | T2 - Generator | Mental trigger psychology | Fear, urgency, social proof, authority-based titles |
| `title-scorer` | T3 - Optimization | CTR scoring algorithm | Scores and ranks all generated titles by CTR potential |
| `title-qa` | Tool | Voice DNA validation | the creator's tone enforcement on final title selections |

## Pipeline

```
Topic/Request --> title-chief routes -->
  1. title-researcher analyzes niche competition (BLOCKING)
  2. 4 generators create titles in PARALLEL:
     - curiosity-architect  (curiosity gap titles)
     - power-titler         (power word titles)
     - pattern-disruptor    (pattern interrupt titles)
     - trigger-specialist   (mental trigger titles)
  3. title-scorer scores and ranks ALL titles (BLOCKING)
  4. title-qa validates voice DNA on top titles (BLOCKING)
--> Top scored + validated titles delivered with scores
```

## Tasks

| Task | Agent | Description |
|------|-------|-------------|
| `research-titles` | title-researcher | Analyze competing titles in the niche for patterns, gaps, and opportunities |
| `generate-curiosity-titles` | curiosity-architect | Generate titles using curiosity gap and open loop techniques |
| `generate-power-titles` | power-titler | Generate titles using power words and emotional arousal |
| `generate-pattern-titles` | pattern-disruptor | Generate titles using pattern interrupts and contrarian angles |
| `generate-trigger-titles` | trigger-specialist | Generate titles using mental triggers (fear, urgency, social proof) |
| `score-titles` | title-scorer | Score all generated titles on CTR potential (1-100 scale) |
| `qa-check-titles` | title-qa | Validate top titles against the creator's voice DNA |

## Usage

### Activation

```
/squads:youtube-title
```

### Example 1: Generate titles for a specific topic

```
User: I need titles for a video about building a YouTube channel while working 9-to-5.

title-chief:
  Research first. No titles without competitive intel.

  1. @title-researcher -- Analyzing top-performing titles in the "side hustle YouTube" niche.
  2. Then 4 generators fire in parallel:
     - @curiosity-architect (curiosity gaps)
     - @power-titler (power words)
     - @pattern-disruptor (pattern interrupts)
     - @trigger-specialist (mental triggers)
  3. @title-scorer ranks every title by CTR potential.
  4. @title-qa validates voice DNA on the top picks.

  Stand by. Starting competitive research...
```

### Example 2: Research what titles are winning

```
User: What titles are crushing it right now in the faceless YouTube niche?

title-chief:
  Pure research request. No generation needed yet.

  @title-researcher -- Full competitive analysis on the faceless YouTube niche.
  Deliverables: top title patterns, word frequency, gap opportunities.

  Research first. Titles second. That's how you win.

  Starting...
```

### Example 3: Score existing title ideas

```
User: I have 5 title ideas, can you score them?

title-chief:
  Routing your titles through the scoring pipeline.

  1. @title-scorer -- Scoring your 5 titles on CTR potential (1-100).
  2. @title-qa -- Validating voice DNA on the top scorers.

  Skipping research and generation since you already have titles.

  Send them over.
```

## Squad Structure

```
squads/youtube-title/
├── squad.yaml                          # Squad configuration
├── README.md                           # This file
├── data/
│   └── youtube-title-kb.md            # Title knowledge base + voice DNA
├── agents/
│   ├── title-chief.md                  # Orchestrator agent
│   ├── title-researcher.md             # Niche research agent
│   ├── curiosity-architect.md          # Curiosity gap title generator
│   ├── power-titler.md                 # Power word title generator
│   ├── pattern-disruptor.md            # Pattern interrupt title generator
│   ├── trigger-specialist.md           # Mental trigger title generator
│   ├── title-scorer.md                 # CTR scoring agent
│   └── title-qa.md                     # Voice DNA validation tool
├── tasks/
│   ├── research-titles.md              # Competitive research task
│   ├── generate-curiosity-titles.md    # Curiosity title generation task
│   ├── generate-power-titles.md        # Power title generation task
│   ├── generate-pattern-titles.md      # Pattern title generation task
│   ├── generate-trigger-titles.md      # Trigger title generation task
│   ├── score-titles.md                 # Title scoring task
│   └── qa-check-titles.md             # Voice DNA QA task
└── checklists/
    └── title-quality-checklist.md      # Title quality validation checklist
```

## Quality Gates

| Gate ID | Name | Description | Blocking |
|---------|------|-------------|----------|
| OT_QG_001 | Niche Research | Competitive titles must be researched before any generation begins | Yes |
| OT_QG_002 | Title Scoring | All generated titles must be scored and ranked by CTR potential | Yes |
| OT_QG_003 | Voice DNA Validation | Top titles must pass the creator's voice DNA check before delivery | Yes |

## Voice

All titles are written in the creator's direct, no-BS, family-first mentor tone. Every title passes through title-qa for voice DNA validation before delivery. No guru language. No clickbait that doesn't deliver. Titles must be honest, punchy, and speak directly to the working professional.

## Target Audience

The Working Professional: 30+, family provider, full-time job, wants financial freedom but can't risk quitting. Titles must hit this person in the gut -- not with hype, but with truth they already feel at 2 AM.

## Products

- **[Your Free Lead Magnet]** (Free) - Ebook + resources
- **[Your Paid Product]** (Paid) - Your primary product
- **[Your Premium Offering]** (Paid) - Course + community + coaching
