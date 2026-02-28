---
task: Generate Curiosity Gap Titles
responsavel: "@curiosity-architect"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - title_research_brief: Complete research brief from @title-researcher
  - video_topic: The core topic and revelation of the video
Saida: |
  - curiosity_titles: 5 curiosity-gap titles with gap type, mechanism, strength score, and thumbnail synergy note
---

# *generate-curiosity - Generate Curiosity Gap Titles

## Overview

The Curiosity Architect is a specialist in the psychology of incomplete information. This agent generates titles that exploit the brain's need for closure — the gap between what the viewer knows and what they NEED to know. Every title must create a specific, irresistible itch that only clicking can scratch.

The Curiosity Architect draws from George Loewenstein's Information Gap Theory: curiosity is triggered when we perceive a gap between what we know and what we want to know. The wider the perceived gap (without being too abstract), the stronger the click impulse.

Key principle: The best curiosity gap is NOT vague mystery. It is SPECIFIC mystery. "A secret trick" is weak. "The trick that got a janitor to $10K/month" is strong — because it is specific enough to be believable but incomplete enough to demand resolution.

## Flow

### Step 1: Read Title Research Brief
- Absorb niche analysis, patterns, gaps, and keyword intelligence
- Identify which curiosity mechanisms are underused in this niche
- Note any competitor titles that used curiosity well (and how to improve them)

### Step 2: Identify Core Revelation
- What is the ONE thing the viewer will learn or realize from this video?
- What is the "aha moment" — the point where everything clicks?
- This is the anchor for all curiosity gaps

### Step 3: Find the Optimal Information Gap
- Too small = boring ("A good way to make money") — no click
- Too large = unbelievable ("The secret to unlimited wealth") — no click
- Optimal = specific + surprising + achievable ("The income stream my boss doesn't know I have")

### Step 4: Generate 5 Curiosity Gap Titles

Each title must use a DIFFERENT gap type:

**Gap Type 1 — The Knowledge Gap**
"I know something you don't" — Implies hidden information exists
- Structure: Reveals the existence of information without revealing the information itself
- Example: "The YouTube strategy nobody talks about (because it actually works)"

**Gap Type 2 — The Outcome Gap**
"Here's what happened when..." — Shows a journey with an unrevealed destination
- Structure: Sets up a scenario and withholds the result
- Example: "I followed a $0 YouTube method for 90 days — here's my analytics"

**Gap Type 3 — The Contradiction Gap**
"This shouldn't work, but..." — Creates cognitive dissonance
- Structure: Pairs two things that seem incompatible
- Example: "I make $8K/month from YouTube and I've never shown my face"

**Gap Type 4 — The Identity Gap**
"People like you don't know this" — Makes it personal
- Structure: Targets the viewer's self-concept and implies they're missing something
- Example: "What your 9-to-5 is actually costing you (it's not just time)"

**Gap Type 5 — The Specificity Gap**
"Exact number + vague mechanism" — Precision creates credibility, vagueness creates curiosity
- Structure: Combines a concrete data point with an undefined method
- Example: "The 47-minute system that replaced my corporate salary"

### Step 5: Score Each Title's Curiosity Strength
Rate each title on a 1-10 scale across:
- **Gap Clarity** (1-10): Is the gap obvious and specific?
- **Resolution Desire** (1-10): How badly does the viewer need to close the gap?
- **Believability** (1-10): Does it feel real, not clickbait?
- **Scroll-Stop Power** (1-10): Would this stop a thumb mid-scroll?
- **Curiosity Strength Score**: Average of above four dimensions

### Step 6: Recommend Top Pick with Thumbnail Synergy
- Select the strongest title
- Describe the ideal thumbnail pairing
- Explain how title + thumbnail create COMBINED curiosity (neither tells the full story alone)

## Output Format

```markdown
# Curiosity Gap Titles
**Topic**: [topic]
**Brief Reference**: [brief date/id]
**Generator**: @curiosity-architect

## Core Revelation
[The key insight the video delivers]

## Optimal Gap Identified
[Description of the sweet spot between too vague and too specific]

## Generated Titles

### Title 1 — Knowledge Gap
**Title**: "[title text]"
**Character Count**: [count]
**Gap Mechanism**: [how the gap works]
**Scores**: Gap Clarity: [x]/10 | Resolution Desire: [x]/10 | Believability: [x]/10 | Scroll-Stop: [x]/10
**Curiosity Strength**: [average]/10
**Thumbnail Note**: [ideal thumbnail pairing]

### Title 2 — Outcome Gap
[same structure]

### Title 3 — Contradiction Gap
[same structure]

### Title 4 — Identity Gap
[same structure]

### Title 5 — Specificity Gap
[same structure]

## Top Pick
**Recommended Title**: "[title]"
**Why**: [1-2 sentences explaining why this title has the strongest pull]
**Thumbnail Synergy**: [how title + thumbnail work together to maximize CTR]
```

## Examples

### Example: Topic = "How I built a faceless channel to 100K subs while working 9-to-5"

**Core Revelation**: You don't need to quit your job or show your face — a simple system of batching and automation can build a real channel in the margins of a busy life.

**Generated Titles**:

1. **Knowledge Gap**: "The faceless YouTube method my coworkers still don't know about"
   - Curiosity Strength: 7.5/10
   - Thumbnail: Office cubicle with YouTube play button glowing on a hidden laptop screen

2. **Outcome Gap**: "I built a YouTube channel in my lunch breaks for 6 months — here's what happened"
   - Curiosity Strength: 8.0/10
   - Thumbnail: Split screen — suit and tie on left, analytics dashboard on right, face blurred

3. **Contradiction Gap**: "I work 50 hours a week and still grew a YouTube channel to 100K"
   - Curiosity Strength: 8.5/10
   - Thumbnail: Exhausted office worker with 100K subscriber plaque, clock showing 5:00 AM

4. **Identity Gap**: "If you have a 9-to-5 and a family, this YouTube strategy was built for you"
   - Curiosity Strength: 7.0/10
   - Thumbnail: Dad at kitchen table with laptop, kids in background, YouTube analytics visible

5. **Specificity Gap**: "The 4-hour weekend system that got me 100K subscribers without showing my face"
   - Curiosity Strength: 8.8/10
   - Thumbnail: Timer showing 4:00:00 next to a faceless YouTube channel analytics screenshot

**Top Pick**: Title 5 — Specificity Gap
- The combination of "4-hour weekend" (specific, achievable) + "100K subscribers" (impressive) + "without showing my face" (removes objection) creates a triple-layered curiosity that the viewer MUST resolve.
- Thumbnail synergy: The timer makes the "4 hours" concrete and visual, while the analytics prove the claim without revealing the method.
