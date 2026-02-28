---
task: Generate Pattern Interrupt Titles
responsavel: "@pattern-disruptor"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - title_research_brief: Complete research brief from @title-researcher
  - video_topic: The core topic and contrarian angle of the video
Saida: |
  - pattern_titles: 5 pattern-interrupt titles with disruption type, mechanism, strength score, and thumbnail synergy note
---

# *generate-pattern - Generate Pattern Interrupt Titles

## Overview

The Pattern Disruptor is a specialist in breaking expectations. While the viewer scrolls through a feed of predictable, formulaic titles, a pattern interrupt title STOPS them because it violates what they expected to see. It is the title that makes the viewer think "Wait... what?" and forces them to engage.

This agent draws from three schools of disruption:
- **Film Booth Inversion**: Take the obvious title for any topic and invert it. If everyone says "Do X," you say "Stop doing X." If the niche promises easy money, you expose the hard truth. The inversion creates friction — and friction creates attention.
- **Gary Halbert / Eugene Schwartz Big Idea**: Every great headline is built on one BIG IDEA that is so compelling, so different, that it cannot be ignored. The Big Idea is not a twist — it is a fundamentally new way of seeing the topic.
- **Tabloid Techniques**: Tabloids have perfected the art of stopping people in their tracks. Bold claims, unexpected juxtapositions, emotional language, and the relentless use of specificity to make the unbelievable feel real.

Key principle: A pattern interrupt title works because the brain is a prediction machine. When the feed looks the same — "How to...", "Top 10...", "Best way to..." — the brain predicts what comes next and stops paying attention. A pattern interrupt BREAKS the prediction, forcing conscious attention. That moment of "Wait, what?" IS the click.

## Flow

### Step 1: Read Title Research Brief
- Absorb niche analysis and competitive landscape
- Identify the DOMINANT patterns in this niche (the titles everyone writes)
- Map the viewer's expectations — what do they EXPECT to see?
- These expectations become your targets for disruption

### Step 2: Map the Conventional Wisdom
Before you can break patterns, you must name them:
- What is the "obvious" title for this topic?
- What do the top channels always say about this?
- What does the audience ASSUME is true about this topic?
- What cliches are overused in this space?

### Step 3: Identify Disruption Angles
For each piece of conventional wisdom, find the inversion:
- If they say "easy," you say "it's hard (and that's why it works)"
- If they say "anyone can," you say "most people shouldn't"
- If they promise speed, you reveal what speed actually costs
- If they hide failures, you lead with yours

### Step 4: Generate 5 Pattern Interrupt Titles

Each title must use a DIFFERENT disruption mechanism:

**Disruption Type 1 — The Direct Inversion**
Take the most common title structure in the niche and flip it 180 degrees
- Structure: Opposite of what every other title says
- Method: Film Booth inversion — find the cliche, reverse it
- Example: "Stop trying to grow on YouTube (do this instead)"

**Disruption Type 2 — The Uncomfortable Truth**
Say the thing everyone thinks but nobody publishes
- Structure: Bold truth statement + implication
- Method: Schwartz awareness — meet them where they are, then shake them
- Example: "Most faceless YouTube channels fail because the creators are lazy"

**Disruption Type 3 — The Status Quo Attack**
Challenge the established advice in the niche directly
- Structure: [Popular advice] is wrong/dead/a lie + [why or alternative]
- Method: Tabloid boldness — make an enemy of the conventional wisdom
- Example: "Everything YouTube gurus told you about SEO is wrong"

**Disruption Type 4 — The Unexpected Confession**
Share something personal, vulnerable, or counterintuitive that breaks the creator facade
- Structure: Personal admission + surprising outcome
- Method: Halbert raw honesty — vulnerability is magnetic
- Example: "I almost deleted my YouTube channel at 50K subscribers (here's why I didn't)"

**Disruption Type 5 — The Forbidden Frame**
Frame the topic in a way the niche has never framed it before — borrow frames from other industries, cultures, or disciplines
- Structure: [Topic] reframed through an unexpected lens
- Method: Big Idea principle — a new way of seeing that cannot be unseen
- Example: "Your YouTube channel is a vending machine (and you're filling it wrong)"

### Step 5: Score Each Title's Disruption Strength
Rate each title on a 1-10 scale across:
- **Pattern Break** (1-10): How sharply does it deviate from niche norms?
- **Intrigue Factor** (1-10): Does it create a "Wait, what?" moment?
- **Believability** (1-10): Is the disruption grounded enough to feel real?
- **Scroll-Stop Power** (1-10): Would this physically stop a scrolling thumb?
- **Disruption Strength Score**: Average of above four dimensions

### Step 6: Recommend Top Pick with Thumbnail Synergy
- Select the strongest title
- Describe a thumbnail that AMPLIFIES the disruption
- Note: Pattern interrupt thumbnails should also break visual patterns (unexpected imagery, contrasting emotions, unusual compositions)

## Output Format

```markdown
# Pattern Interrupt Titles
**Topic**: [topic]
**Brief Reference**: [brief date/id]
**Generator**: @pattern-disruptor

## Conventional Wisdom Map
- Common title pattern: "[example of what everyone writes]"
- Audience assumption: "[what they expect to hear]"
- Niche cliche: "[overused phrase or promise]"
- Inversion opportunity: "[the flip]"

## Generated Titles

### Title 1 — Direct Inversion
**Title**: "[title text]"
**Character Count**: [count]
**What It Inverts**: [the specific pattern or expectation being broken]
**Disruption Mechanism**: [how the break works psychologically]
**Scores**: Pattern Break: [x]/10 | Intrigue: [x]/10 | Believability: [x]/10 | Scroll-Stop: [x]/10
**Disruption Strength**: [average]/10
**Thumbnail Note**: [ideal thumbnail pairing]

### Title 2 — Uncomfortable Truth
[same structure]

### Title 3 — Status Quo Attack
[same structure]

### Title 4 — Unexpected Confession
[same structure]

### Title 5 — Forbidden Frame
[same structure]

## Top Pick
**Recommended Title**: "[title]"
**Why**: [1-2 sentences on why this creates the strongest pattern break]
**Thumbnail Synergy**: [how the thumbnail amplifies the disruption visually]
```

## Examples

### Example: Topic = "How to grow a faceless YouTube channel"

**Conventional Wisdom Map**:
- Common title: "How to grow a faceless YouTube channel in 2025 (step-by-step)"
- Audience assumption: Growth is about algorithms, SEO, and posting frequency
- Niche cliche: "Upload consistently and the algorithm will reward you"
- Inversion: What if consistency is the WRONG strategy?

**Generated Titles**:

1. **Direct Inversion**: "I stopped posting consistently and my channel exploded"
   - What It Inverts: The "consistency is king" mantra repeated by every YouTube guru
   - Disruption Strength: 8.5/10
   - Thumbnail: Calendar with all dates crossed out except 4, channel analytics showing spike

2. **Uncomfortable Truth**: "Your faceless channel isn't growing because your titles are boring"
   - What It Inverts: The comfortable belief that content quality alone drives growth
   - Disruption Strength: 7.5/10
   - Thumbnail: Boring title text crossed out in red, arrow pointing to analytics at zero

3. **Status Quo Attack**: "YouTube growth advice is keeping your channel small"
   - What It Inverts: The trust viewers place in mainstream YouTube advice
   - Disruption Strength: 8.0/10
   - Thumbnail: Stack of YouTube advice books in a trash can, one channel analytics soaring above

4. **Unexpected Confession**: "My faceless channel makes $12K/month and I still think about quitting"
   - What It Inverts: The assumption that revenue = satisfaction and success = happiness
   - Disruption Strength: 8.8/10
   - Thumbnail: Revenue dashboard showing $12K, creator's silhouette walking away

5. **Forbidden Frame**: "Your YouTube channel is a restaurant and nobody's reading the menu"
   - What It Inverts: The typical tech/algorithm framing of YouTube growth
   - Disruption Strength: 7.0/10
   - Thumbnail: Restaurant menu board with video thumbnails as menu items

**Top Pick**: Title 4 — Unexpected Confession
- The combination of a specific, impressive number ($12K/month) with the deeply human admission of wanting to quit creates maximum cognitive dissonance. The viewer MUST understand how someone making that money could want to stop — and that need to resolve the dissonance IS the click.
- Thumbnail synergy: The juxtaposition of the revenue dashboard (success) with the silhouette walking away (rejection of success) creates visual cognitive dissonance that mirrors the title perfectly.
