# KB-04: Excellent Squad Examples

> Real patterns from production squads. Use these as reference when helping users design theirs.

---

## What Makes a Squad Excellent

Based on analysis of 4 production squads, excellent squads share these patterns:

1. **Tiered architecture** — Tier 0 diagnostic is typical (some squads like family-specialist skip it with `foundation_first: false` when the coordinator routes flexibly)
2. **Numeric quality gates** — Not "good enough" but "9.5 minimum, no bypass"
3. **Veto dimensions** — Single metrics that can auto-fail regardless of composite
4. **Foundation-first routing** — Diagnosis before action is the default (exceptions exist — see family-specialist)
5. **Cross-referenced quality gates** — Same gate ID in squad.yaml, agent files, AND task files
6. **Voice definition** — For brand-aligned squads, explicit word lists and emotional anchors
7. **Knowledge base separation** — Frameworks live in `data/kb.md`, not duplicated across agents
8. **Output examples in agents** — Show, don't just tell
9. **Mind DNA** — For expert agents, intellectual lineage documented (not just "does X")
10. **Self-documenting naming** — File names tell you what's inside

**The meta-pattern:** Excellent squads are SYSTEMS, not collections. Every piece references every other piece.

---

## Example 1: ontarget-scripts (Expert Squad)

**The gold standard for Expert squads with quality gates.**

### squad.yaml Highlights

```yaml
name: ontarget-scripts
version: 2.0.0
description: >
  World-class YouTube scriptwriting team with 15 elite minds,
  15 niches, cross-platform optimization, AI authenticity detection,
  and 9.5+ quality gate for elite-only script delivery
author: Max Henrique
license: UNLICENSED
slashPrefix: ontarget-scripts

orchestrator: script-chief

tiers:
  tier_0:
    name: Diagnostic & Analysis
    agents: [script-analyst]
  tier_1:
    name: Core Scriptwriters
    agents: [hook-engineer, retention-architect, story-sculptor]
  tier_2:
    name: Format Specialists
    agents: [conversion-strategist, shorts-specialist, faceless-producer]
  tier_3:
    name: Optimization
    agents: [niche-adapter]
    tools: [script-scorer]    # NOTE: tools are non-persona scoring scripts

components:
  agents:                      # 10 agents total
    - script-chief.md
    - script-analyst.md
    - hook-engineer.md
    - retention-architect.md
    - story-sculptor.md
    - conversion-strategist.md
    - shorts-specialist.md
    - faceless-producer.md
    - niche-adapter.md
    - script-scorer.md
  tasks:                       # 11 tasks (ratio: ~1:1.1)
    - analyze-script.md
    - analyze-prompt.md
    - write-script.md
    - write-hook.md
    - write-shorts-script.md
    - optimize-retention.md
    - adapt-niche.md
    - score-script.md
    - audit-prompt.md
    - rewrite-script.md
    - compare-versions.md
  workflows: [full-script-pipeline.md]
  checklists:                  # 6 checklists (strong coverage)
    - script-quality-checklist.md
    - retention-checklist.md
    - hook-checklist.md
    - shorts-quality-checklist.md
    - faceless-script-checklist.md
    - conversion-script-checklist.md
  templates:                   # 6 templates
    - script-brief-template.md
    - hook-template.md
    - shorts-script-template.md
    - full-script-output-template.md
    - faceless-script-template.md
    - conversion-script-template.md
```

### Quality Gates (The Differentiator)

```yaml
quality_gates:
  - id: YS_QG_001
    name: Request Classification
    blocking: false            # Soft gate — warns but doesn't stop

  - id: YS_QG_002
    name: Script Analysis
    description: Existing script fully diagnosed before action
    blocking: true             # Hard gate — stops workflow

  - id: YS_QG_003
    name: Retention Check
    description: Script meets retention benchmarks for the niche
    blocking: true

  - id: YS_QG_004
    name: Quality Score
    description: Script scores 9.5+ on PCCE and retention metrics
    blocking: true
    minimum_score: 9.5         # Specific numeric threshold
    individual_minimum: 8.0    # No dimension below 8.0
    hook_minimum: 9.0          # Hook has higher bar
    bypass_allowed: false      # EXPLICITLY no bypass

  - id: YS_QG_005
    name: AI Authenticity Veto
    description: VETO dimension — auto-fail regardless of composite
    blocking: true
    veto: true                 # NEW PATTERN: single dimension kills output
    minimum_score: 7.0
```

**Key pattern:** The veto gate (YS_QG_005) means even a perfect 10.0 composite score FAILS if AI Authenticity is below 7.0. This prevents "good average, terrible on one thing."

### Routing

```yaml
routing:
  foundation_first: true       # Diagnostic before action
  qa_gate: script-scorer       # Final validation
  flow: |
    1. script-analyst diagnoses the request type and niche (BLOCKING)
    2. Appropriate specialist writes/optimizes the script
    3. script-scorer validates quality (BLOCKING)
```

### Voice & Audience

```yaml
target_audience:
  name: The Trapped Corporate Worker
  age: 30+
  situation: Full-time corporate job, family provider
  psychology: Wants to build $5k/month YouTube income while keeping job
  test: "The 2 AM Test — lying in bed calculating years to financial freedom"
```

---

## Example 2: ontarget-outlier (Hybrid Squad)

**Demonstrates advanced routing with multiple quality gates and voice DNA.**

### Key Structure

```yaml
name: ontarget-outlier
orchestrator: strategy-chief

tiers:
  tier_0:
    name: Diagnostic
    agents: [channel-strategist]
  tier_1:
    name: Strategy Masters
    agents: [algorithm-expert, content-strategist]
  tier_2:
    name: Analysis
    agents: [analytics-analyst]

components:
  agents:                      # 5 agents total
    - strategy-chief.md
    - channel-strategist.md
    - algorithm-expert.md
    - content-strategist.md
    - analytics-analyst.md
  tasks:                       # 27 tasks (ratio: ~1:5.4 — typical Hybrid)
    # channel-strategist: audit-channel, create-growth-strategy, competitive-analysis, etc.
    # algorithm-expert: optimize-algorithm, policy-check, keyword-research, etc.
    # content-strategist: plan-content-calendar, generate-video-ideas, go-viral-strategy, etc.
    # analytics-analyst: analyze-performance, retention-analysis, benchmarking-analysis, etc.
  workflows: [full-channel-strategy.md, content-optimization.md, weekly-growth-cycle.md]
  checklists: 6               # strategy, audit, SEO, content, routing, performance
  templates: 8                # audit report, growth strategy, content calendar, etc.
```

### Advanced Voice Configuration

```yaml
voice:
  owner: Max Henrique
  tone: direct, no-BS, family-first mentor
  words_use:
    - bridge
    - momentum
    - consistent
    - backlog
    - leverage
    - system
    - compound
    - execute
    - build
    - outlier
  words_avoid:
    - unlimited
    - revolutionary
    - passive income
    - secret
    - guaranteed
    - synergy
    - hack
    - guru
  emotional_anchors:
    - family (wife, kids, daughter, partner)
    - kitchen table, coffee at home
    - 2 AM (worry time)
    - lunch break (work time)
    - Rome/vacation (freedom symbol)
```

**Key pattern:** Emotional anchors are SYMBOLIC — "2 AM" isn't a time, it's a psychological state. "Rome" isn't a place, it's freedom.

---

## Example 3: prompt-architects (Pipeline Squad with Security)

**Demonstrates feasibility gates and security-focused quality.**

### Security Quality Gates

```yaml
quality_gates:
  - id: PA_QG_001
    name: Request Analysis
    blocking: true

  - id: PA_QG_002
    name: Feasibility Analysis
    description: Confirmed prompting is the right approach for this task
    blocking: true
    # KEY PATTERN: This gate REJECTS the request if AI isn't the right tool

  - id: PA_QG_004
    name: Security Review
    description: No prompt injection risks or security issues
    blocking: true
    # KEY PATTERN: Security is a blocking gate, not optional
```

**Key pattern:** PA_QG_002 is a "should we even do this?" gate. It prevents over-use of AI prompting when a simpler solution exists.

---

## Example 4: family-specialist (Expert Squad — No Tier 0)

**Demonstrates the `specialists` registry, multi-specialist routing, and `foundation_first: false`.**

**IMPORTANT PATTERN:** This squad has NO Tier 0 diagnostic agent. The orchestrator (`family-coordinator`) routes flexibly without a blocking diagnosis step. This is a VALID alternative when the coordinator is smart enough to route directly.

### Tier Structure (No Tier 0)

```yaml
orchestrator: family-coordinator

tiers:
  tier_1:                        # NOTE: starts at tier_1, no tier_0
    name: Core Family Specialists
    agents:
      - child-development-specialist
      - family-therapist
      - pediatric-health-advisor
      - maternal-wellness-specialist
      - paternal-engagement-specialist
  tier_2:
    name: Specialized Advisors
    agents:
      - education-specialist
      - nutrition-specialist
      - emotional-intelligence-coach
      - cultural-family-advisor
      - positive-discipline-specialist
      - postpartum-specialist
      - family-finance-advisor

routing:
  foundation_first: false        # KEY: No blocking diagnostic step
  flow: |
    1. Family Coordinator receives the question/concern
    2. Coordinator classifies by domain
    3. Coordinator routes to the most relevant specialist(s)
    4. For multi-faceted situations, Coordinator convenes a "family council" with 2-4 specialists
    5. Each specialist responds using their frameworks and cultural expertise
    6. Coordinator synthesizes into actionable family guidance
```

### Inline Specialist Registry

```yaml
specialists:
  - id: child-development-specialist
    name: Dr. Yuna
    inspiration: >
      Inspired by top Korean early childhood development research
      (Seoul National University) and Dr. Alison Gopnik
    domain: Child cognitive development, milestones, play-based learning, brain development 0-12
    frameworks:
      - Developmental Milestone Tracking (WHO + Korean KICCE standards)
      - Play-Based Learning Architecture
      - Brain Development Windows (Critical Periods)
      - Attachment-Informed Development

  - id: family-therapist
    name: Dr. Helena
    inspiration: >
      Inspired by Dr. Sue Johnson (EFT), John Gottman, and Brazilian
      family therapy traditions (Instituto de Familia de Porto Alegre)
    domain: Couple relationships, family dynamics, conflict resolution, co-parenting
    frameworks:
      - Gottman Method (Four Horsemen, Sound Relationship House)
      - Emotionally Focused Therapy (EFT)
      - Brazilian Systemic Family Therapy
      - Co-Parenting Alliance Framework

  - id: positive-discipline-specialist
    name: Dr. Hana
    inspiration: Inspired by Jane Nelsen (Positive Discipline), Alfie Kohn
    domain: Behavior management, boundary setting, positive reinforcement
    frameworks:
      - Positive Discipline (Jane Nelsen)
      - Unconditional Parenting (Alfie Kohn)
      - Respectful Limit-Setting Framework
```

**Key patterns:**
- Each specialist has `inspiration` (source), `domain` (scope), and `frameworks` (methodology)
- This is a compact way to define mind DNA without full voice extraction
- 13 agents across 2 tiers — the largest agent roster of any production squad
- Multi-specialist "family council" routing for complex situations

---

## Patterns to Copy

### 1. Component Naming
```
agents/    → {role-noun}.md          (script-analyst, hook-engineer)
tasks/     → {verb-noun}.md          (analyze-script, write-hook)
workflows/ → {adj-noun-pipeline}.md  (full-script-pipeline)
checklists/ → {domain-checklist}.md  (script-quality-checklist)
templates/ → {artifact-template}.md  (hook-template)
data/      → {squad-name-kb}.md      (ontarget-scripts-kb)
```

### 2. Quality Gate ID Pattern
```
{SQUAD_PREFIX}_QG_{NNN}
```
- `YS_QG_001` (YouTube Scripts)
- `PA_QG_001` (Prompt Architects)
- Keep prefix short (2-3 chars)
- Number sequentially

### 3. Task Frontmatter Pattern
```yaml
---
task: "Human Readable Name"
responsavel: agent-id
responsavel_type: agent
atomic_layer: task
Entrada: |
  - input_name: Description (required|optional)
Saida: |
  - output_name: Description
Checklist:
  - [ ] Validation item
---
```

### 4. Agent Greeting Pattern
```
{icon} {Name} ({Title}) ready.
{One-sentence value proposition.}
{Commands hint or invitation.}
```
Example:
```
🔍 Lens (Script Diagnostician) ready.
Every script gets diagnosed before it leaves this squad.
Use *analyze-script to begin.
```

### 5. README Structure Pattern
```markdown
# {Squad Name}

> {One-line description}

## Squad Overview
{Agent count, tier breakdown}

## Agent Roster
| Agent | Tier | Methodology | Covers |
|-------|------|-------------|--------|

## Activation
{Slash command}

## Quick Commands
{Task shortcuts}

## Quality Gates
{Blocking thresholds}

## Elite Minds Embedded (Expert squads)
{List of experts with brief credentials}
```

---

## Anti-Patterns to Avoid

### 1. "Flat" Squad (No Tiers)
All agents at the same level with no diagnostic routing.
**Why bad:** Users don't know who to ask. No quality control entry point.

### 2. "One Giant Agent" Squad
One agent does everything with 20+ commands.
**Why bad:** Exceeds context window, loses expertise depth.

### 3. "No Quality Gates"
Squad produces output but never validates it.
**Why bad:** Garbage output. Users lose trust quickly.

### 4. "Vague Gates"
Quality gate says "good quality" without a number.
**Why bad:** Different agents interpret "good" differently. Need 9.5, not "good."

### 5. "Orphan Components"
Tasks without agents, agents without tasks, templates nobody uses.
**Why bad:** Fails validation. Confuses users.

### 6. "Copy-Paste Agents"
Multiple agents that are essentially the same with different names.
**Why bad:** Bloat without value. Each agent must be distinctly expert.

### 7. "No KB Separation"
Framework details duplicated across every agent file.
**Why bad:** Inconsistency when one copy is updated and others aren't.
**Fix:** Put shared knowledge in `data/{squad}-kb.md`, reference from agents.

---

*Reference: ontarget-scripts/squad.yaml, ontarget-outlier/squad.yaml, prompt-architects/squad.yaml, family-specialist/squad.yaml*
