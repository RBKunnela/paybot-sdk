---
task: Generate Direct Value Titles
responsavel: "@power-titler"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - title_research_brief: Complete research brief from @title-researcher
  - video_topic: The core topic and value proposition of the video
Saida: |
  - power_titles: 5 direct-value titles with value type, mechanism, strength score, and thumbnail synergy note
---

# *generate-power - Generate Direct Value Titles

## Overview

The Power Titler is a specialist in direct-value, results-driven titles. No mystery, no games — these titles tell the viewer exactly what they will GET from clicking. The power comes from specificity, credibility, and the sheer weight of the promised transformation.

This agent draws from three masters:
- **Alex Hormozi**: The value equation — Dream Outcome x Perceived Likelihood / Time Delay x Effort & Sacrifice. Every title maximizes the numerator and minimizes the denominator.
- **David Ogilvy**: The headline carries 80% of the advertising weight. Be specific. Use numbers. Make a promise. Keep it.
- **Ali Abdaal**: Authenticity sells. Real numbers from real experience beat hypothetical promises every time. The viewer trusts a person who has done the thing.

Key principle: A direct value title succeeds when the viewer thinks "I would be stupid NOT to click this." It is not about curiosity — it is about perceived ROI of their time investment.

## Flow

### Step 1: Read Title Research Brief
- Absorb niche analysis, keyword intelligence, and competitive patterns
- Identify what value propositions are overused (avoid) and underused (exploit)
- Note which number ranges and timeframes perform best in this niche

### Step 2: Define the Value Stack
Answer these questions to build the value foundation:
- What SPECIFIC result does this video help the viewer achieve?
- In what TIMEFRAME can they see results?
- What is the EFFORT level required?
- What PROOF exists that this works?
- What OBJECTION does this preemptively crush?

### Step 3: Apply the Hormozi Value Equation
For each title, maximize:
- **Dream Outcome**: Make the result vivid and desirable
- **Perceived Likelihood**: Include proof elements that make it feel achievable
- **Minimize Time Delay**: Show speed or compressed timelines
- **Minimize Effort/Sacrifice**: Show simplicity, no special skills, no big investment

### Step 4: Generate 5 Direct Value Titles

Each title must use a DIFFERENT value mechanism:

**Value Type 1 — The Number Stack**
Lead with concrete, specific numbers that prove the value
- Structure: [Number] + [Method/Thing] + [Result] + [Timeframe/Qualifier]
- Principle: Ogilvy — specificity creates believability
- Example: "5 faceless YouTube niches that pay $3,000+/month in 2025"

**Value Type 2 — The Transformation Promise**
Show the before-and-after in the title itself
- Structure: [Starting Point] to [End Point] + [Method/Qualifier]
- Principle: Hormozi — dream outcome front and center
- Example: "$0 to $5,000/month with a faceless YouTube channel (step-by-step)"

**Value Type 3 — The Speed Play**
Emphasize how FAST the result can happen
- Structure: [Result] + [Compressed Timeframe] + [Qualifier for believability]
- Principle: Hormozi — minimize time delay
- Example: "How to get your first 1,000 subscribers in 30 days (even starting from zero)"

**Value Type 4 — The Effort Minimizer**
Show how EASY or SIMPLE the method is
- Structure: [Result] + [Low Effort Signal] + [Proof Element]
- Principle: Hormozi — minimize effort and sacrifice
- Example: "The laziest way to build a $5K/month YouTube channel (no filming, no editing)"

**Value Type 5 — The Authority Framework**
Position a system, method, or framework as the vehicle for results
- Structure: [Named System/Framework] + [What It Delivers] + [Proof]
- Principle: Abdaal — real experience, named methods, authentic proof
- Example: "The batch-and-bank system: how I run 3 YouTube channels in 10 hours a week"

### Step 5: Score Each Title's Value Strength
Rate each title on a 1-10 scale across:
- **Outcome Clarity** (1-10): Is the promised result crystal clear?
- **Believability** (1-10): Does the viewer believe this is achievable for THEM?
- **Specificity** (1-10): Are there concrete numbers, names, timeframes?
- **Scroll-Stop Power** (1-10): Would this stop a thumb mid-scroll?
- **Value Strength Score**: Average of above four dimensions

### Step 6: Recommend Top Pick with Thumbnail Synergy
- Select the strongest title
- Describe the ideal thumbnail pairing
- Explain how the thumbnail AMPLIFIES the value promise visually

## Output Format

```markdown
# Direct Value Titles
**Topic**: [topic]
**Brief Reference**: [brief date/id]
**Generator**: @power-titler

## Value Stack
- **Result**: [specific result]
- **Timeframe**: [how fast]
- **Effort**: [how easy]
- **Proof**: [why believable]
- **Objection Crushed**: [what doubt is eliminated]

## Generated Titles

### Title 1 — Number Stack
**Title**: "[title text]"
**Character Count**: [count]
**Value Mechanism**: [how the value is communicated]
**Hormozi Equation**: Dream Outcome [x/10] x Likelihood [x/10] / Time [x/10] x Effort [x/10]
**Scores**: Outcome Clarity: [x]/10 | Believability: [x]/10 | Specificity: [x]/10 | Scroll-Stop: [x]/10
**Value Strength**: [average]/10
**Thumbnail Note**: [ideal thumbnail pairing]

### Title 2 — Transformation Promise
[same structure]

### Title 3 — Speed Play
[same structure]

### Title 4 — Effort Minimizer
[same structure]

### Title 5 — Authority Framework
[same structure]

## Top Pick
**Recommended Title**: "[title]"
**Why**: [1-2 sentences on why this delivers the strongest value signal]
**Thumbnail Synergy**: [how the thumbnail amplifies the value promise]
```

## Examples

### Example: Topic = "Best faceless YouTube niches for beginners in 2025"

**Value Stack**:
- Result: Know exactly which niches to start in for maximum revenue
- Timeframe: Actionable immediately after watching
- Effort: No guesswork — curated and ranked list
- Proof: Based on real revenue data and channel analytics
- Objection Crushed: "But I don't know which niche to pick"

**Generated Titles**:

1. **Number Stack**: "7 faceless YouTube niches paying $2,000-$10,000/month in 2025 (with proof)"
   - Value Strength: 8.5/10
   - Thumbnail: Grid of 7 niche icons with dollar signs, green upward arrows

2. **Transformation Promise**: "From corporate job to $8K/month — the faceless niche that changed everything"
   - Value Strength: 7.5/10
   - Thumbnail: Split — office badge on left, revenue screenshot on right

3. **Speed Play**: "Pick the right faceless niche in 15 minutes (and save yourself 6 months of failure)"
   - Value Strength: 8.0/10
   - Thumbnail: Stopwatch at 15:00 with a list of niches behind it

4. **Effort Minimizer**: "The easiest faceless YouTube niche for complete beginners (lowest effort, highest pay)"
   - Value Strength: 8.2/10
   - Thumbnail: Hammock with laptop, YouTube analytics showing upward trend

5. **Authority Framework**: "The niche scoring system: how I evaluate every YouTube niche before starting"
   - Value Strength: 7.8/10
   - Thumbnail: Whiteboard with scoring matrix, checkmarks and X marks

**Top Pick**: Title 1 — Number Stack
- "7 faceless YouTube niches paying $2,000-$10,000/month in 2025 (with proof)" — The combination of a specific number of niches, a believable revenue range, a current year, and the "(with proof)" qualifier creates maximum value density in minimum characters.
- Thumbnail synergy: The grid of 7 niche icons makes the value tangible and scannable, while the dollar signs reinforce the revenue promise without repeating the title text.
