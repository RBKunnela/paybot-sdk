---
task: Research Competitive Titles
responsavel: "@title-researcher"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - topic: The video topic or content theme to research
  - niche: The specific niche within faceless YouTube (e.g., finance, productivity, motivation)
  - competitors: (Optional) List of competitor channels to analyze
Saida: |
  - title_research_brief: Complete research brief with niche analysis, patterns, gaps, keyword intelligence, and trigger recommendations
---

# *research - Research Competitive Titles

## Overview

This task is the foundation of the the platform Title Pipeline. Before any title is written, the Title Researcher conducts deep competitive analysis to understand what is working, what is saturated, and where the gaps live. The output — a Title Research Brief — feeds directly into all four title generators (curiosity, power, pattern, trigger).

The researcher thinks like a strategist, not a creator. The goal is not to copy what works but to understand WHY it works and find angles that nobody else is exploiting.

## Elicitation Points

When activated, the researcher asks:

1. **Topic/Theme**: "What is the video about? Give me the core idea in one sentence."
2. **Niche**: "What niche does this fall under? (e.g., side hustles, productivity, personal finance, motivation)"
3. **Competitors**: "Any specific channels you want me to analyze? (Optional — I'll find the top performers either way)"
4. **Audience Mood**: "What emotional state is the Working Professional in when they'd search for this? (e.g., frustrated, curious, desperate, hopeful)"

## Flow

### Step 1: Identify Niche Landscape
- Map the niche's top 10-15 channels producing similar content
- Note subscriber ranges, posting frequency, average view counts
- Identify which channels consistently get outsized views relative to their subscriber count (this signals strong titles)

### Step 2: Analyze Top 10 Performing Titles
- Pull the top 10 highest-performing titles in this niche/topic from the last 90 days
- For each title, document:
  - Exact title text
  - View count and channel size (to calculate view-to-sub ratio)
  - Title type (curiosity gap, direct value, pattern interrupt, psychological trigger)
  - Primary hook mechanism
  - Character length
  - Thumbnail pairing strategy

### Step 3: Identify Patterns and Gaps
- **Patterns**: What structures repeat? What words appear most? What numbers dominate?
- **Saturation signals**: Which angles are overused? What makes a viewer scroll past?
- **Gaps**: What angles are MISSING? What questions does the audience have that nobody is answering with a compelling title?
- **Timing gaps**: Are there seasonal or news-cycle opportunities?

### Step 4: Generate Keyword Intelligence
- Primary keywords (high search volume, direct match)
- Secondary keywords (related terms, long-tail opportunities)
- Trending phrases (rising search terms in the last 30 days)
- Forbidden keywords (terms that trigger low CTR or attract the wrong audience)
- YouTube autocomplete suggestions for the topic

### Step 5: Recommend Mental Triggers
Based on the research, recommend which psychological triggers are most likely to work for THIS specific topic:
- **Loss Aversion**: If the topic involves risk or missed opportunity
- **Social Proof**: If numbers or authority figures are relevant
- **Curiosity Gap**: If there is a surprising revelation or counterintuitive truth
- **Urgency**: If timing or deadlines are relevant
- **Identity**: If the audience sees themselves in the title
- **Specificity**: If concrete numbers or methods differentiate

### Step 6: Compile Title Research Brief

## Output Format

```markdown
# Title Research Brief
**Topic**: [topic]
**Niche**: [niche]
**Date**: [date]
**Researcher**: @title-researcher

## Niche Landscape
| Channel | Subscribers | Avg Views | View/Sub Ratio | Title Style |
|---------|-------------|-----------|----------------|-------------|
| ...     | ...         | ...       | ...            | ...         |

## Top 10 Performing Titles
1. "[Title]" — [views] views ([channel], [subs] subs) — Type: [type]
   - Hook: [mechanism] | Length: [chars] | Thumbnail: [strategy]
...

## Patterns Identified
- Pattern 1: [description]
- Pattern 2: [description]
- Pattern 3: [description]

## Gaps & Opportunities
- Gap 1: [description + why it matters]
- Gap 2: [description + why it matters]

## Keyword Intelligence
- **Primary**: [keyword1], [keyword2], [keyword3]
- **Secondary**: [keyword1], [keyword2]
- **Trending**: [keyword1], [keyword2]
- **Avoid**: [keyword1], [keyword2]

## Recommended Triggers
1. [Trigger] — Strength: [High/Medium/Low] — Reason: [why]
2. [Trigger] — Strength: [High/Medium/Low] — Reason: [why]
3. [Trigger] — Strength: [High/Medium/Low] — Reason: [why]

## Strategic Recommendation
[2-3 sentences on the best angle for this topic given the research]
```

## Examples

### Example 1: Topic = "How to start a faceless YouTube channel with no money"

**Elicitation**:
- Topic: Starting a faceless YouTube channel with zero budget
- Niche: Faceless YouTube / side hustles
- Competitors: Matt Par, Think Media, Film Booth
- Audience Mood: Frustrated, feels stuck, wants proof it's possible

**Brief excerpt**:
- Top pattern: Numbers in titles ("$0 to $10K", "In 30 Days") dominate with 2.3x average CTR
- Gap found: Nobody addresses the "I have a family and no time" angle — every title assumes unlimited free time
- Recommended triggers: Loss Aversion ("You're leaving money on the table"), Identity ("For people who hate being on camera"), Specificity ("The $0 method that got 100K views")

### Example 2: Topic = "Why most people fail at building passive income"

**Elicitation**:
- Topic: Common passive income failures and what actually works
- Niche: Personal finance / side hustles
- Competitors: Graham Stephan, Ali Abdaal, Codie Sanchez
- Audience Mood: Skeptical, burned before, wants honesty

**Brief excerpt**:
- Top pattern: Contrarian angles outperform positive framing 1.8x in this sub-niche
- Gap found: Almost nobody calls out the guru industry directly while offering a real alternative
- Recommended triggers: Pattern Interrupt ("Passive income is a lie"), Social Proof with inversion ("I tried 7 passive income ideas — only 1 actually worked"), Specificity ("The math nobody shows you")
