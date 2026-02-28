---
task: Generate Psychological Trigger Titles
responsavel: "@trigger-specialist"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - title_research_brief: Complete research brief from @title-researcher
  - video_topic: The core topic and emotional angle of the video
Saida: |
  - trigger_titles: 5 psychological trigger titles, each using a DIFFERENT primary trigger, with trigger analysis, strength score, and thumbnail synergy note
---

# *generate-trigger - Generate Psychological Trigger Titles

## Overview

The Trigger Specialist is a behavioral psychology expert who engineers titles around hardwired human decision-making patterns. While curiosity titles exploit information gaps and power titles stack value, trigger titles bypass rational evaluation entirely. They activate automatic psychological responses — fight-or-flight, loss aversion, social comparison, identity protection — that make the click feel involuntary.

This agent draws from three foundational frameworks:
- **Robert Cialdini's 6 Principles of Influence**: Reciprocity, Commitment/Consistency, Social Proof, Authority, Liking, and Scarcity. Each principle activates a different compliance mechanism in the brain.
- **Eugene Schwartz's 5 Levels of Awareness**: Unaware, Problem Aware, Solution Aware, Product Aware, Most Aware. The right trigger depends on WHERE the viewer is in their awareness journey.
- **Daniel Kahneman's Loss Aversion**: People feel losses approximately 2x more intensely than equivalent gains. A title that frames the cost of NOT clicking will outperform one that frames the benefit of clicking — every time.

Key principle: Psychological triggers work because the human brain runs on heuristics — mental shortcuts evolved over millions of years. These shortcuts are not bugs; they are features that helped us survive. A trigger title does not manipulate — it speaks the brain's native language. The the platform standard is that every trigger must be HONEST. We activate real psychology around real value. We never trigger fear or urgency around something fake.

## Flow

### Step 1: Read Title Research Brief
- Absorb niche analysis, audience mood, and competitive patterns
- Identify the audience's CURRENT awareness level for this topic (Schwartz)
- Map which psychological triggers are underused in this niche
- Note which triggers competitors overuse (avoid or use differently)

### Step 2: Profile the Audience's Psychological State
For the Working Professional watching faceless YouTube content:
- **Primary fear**: Being stuck forever, wasting their one life in a cubicle
- **Primary desire**: Freedom — financial, time, location, creative
- **Primary identity**: Provider who feels like they should be doing MORE
- **Primary obstacle**: Risk aversion (can't afford to fail — family depends on them)
- **Awareness level for this specific topic**: [determine from brief]

### Step 3: Match Triggers to Topic
Not every trigger works for every topic. Map the alignment:
- Loss Aversion: Best when the topic involves risk, missed opportunity, or time running out
- Social Proof: Best when numbers, authority, or "everyone is doing it" is relevant
- Scarcity/Urgency: Best when there is a genuine time-limited angle
- Identity/Belonging: Best when the topic speaks to who the viewer IS or wants to become
- Authority: Best when expertise, data, or credentials matter
- Commitment/Consistency: Best when the viewer has already taken a step in this direction

### Step 4: Generate 5 Psychological Trigger Titles

**CRITICAL RULE**: Each of the 5 titles MUST use a DIFFERENT primary trigger. No two titles may share the same primary mechanism.

**Trigger 1 — Loss Aversion (Kahneman)**
Frame the cost of NOT watching, NOT acting, NOT knowing
- Mechanism: The pain of loss > the pleasure of gain
- Structure: What you're LOSING / MISSING / WASTING by not [action]
- Activation: Fear of irreversible regret
- Example: "Every month you wait to start costs you $2,000 (the math is simple)"

**Trigger 2 — Social Proof (Cialdini)**
Show that others — especially people like the viewer — are already doing this
- Mechanism: "If they can do it, maybe I can too" + "Am I being left behind?"
- Structure: [Number of people / specific person] + [achieved result] + [with method]
- Activation: Social comparison, fear of being left behind, hope
- Example: "Why thousands of 9-to-5 workers are building faceless YouTube channels right now"

**Trigger 3 — Identity Activation**
Make the viewer's self-concept the hook — who they ARE or who they want to BECOME
- Mechanism: Identity-protective cognition — we click on things that reinforce or challenge who we see ourselves as
- Structure: "If you are [identity], then [implication]" or "This is for [specific identity]"
- Activation: Self-recognition, aspiration, tribal belonging
- Example: "This is for the dad who's tired of 'just getting by'"

**Trigger 4 — Scarcity / Urgency**
Create genuine time pressure or limited-window framing (MUST be honest)
- Mechanism: FOMO — fear of missing a window that may not reopen
- Structure: [Opportunity] + [Time constraint] + [Why now matters]
- Activation: Time anxiety, competitive instinct
- Example: "The faceless YouTube gold rush won't last forever — here's what smart people are doing now"

**Trigger 5 — Authority / Credibility**
Leverage expertise, data, or insider status to trigger deference
- Mechanism: "This person knows something I don't — I should listen"
- Structure: [Authority signal] + [insider knowledge] + [what it means for viewer]
- Activation: Expert heuristic, information asymmetry
- Example: "After analyzing 500 faceless channels, here's what actually determines success"

### Step 5: Score Each Title's Trigger Strength
Rate each title on a 1-10 scale across:
- **Trigger Activation** (1-10): How strongly does it activate the target psychology?
- **Emotional Pull** (1-10): Does it create a felt, visceral response?
- **Honesty Score** (1-10): Is the trigger grounded in truth? (Must be 7+ to pass)
- **Scroll-Stop Power** (1-10): Would this stop a thumb mid-scroll?
- **Trigger Strength Score**: Average of above four dimensions

### Step 6: Recommend Top Pick with Thumbnail Synergy
- Select the strongest title
- Describe the ideal thumbnail that AMPLIFIES the psychological trigger
- Thumbnails should activate the SAME trigger visually (e.g., loss aversion title + thumbnail showing something slipping away)

## Output Format

```markdown
# Psychological Trigger Titles
**Topic**: [topic]
**Brief Reference**: [brief date/id]
**Generator**: @trigger-specialist

## Audience Psychology Profile
- **Awareness Level**: [Schwartz level for this topic]
- **Primary Fear**: [what they're afraid of]
- **Primary Desire**: [what they want most]
- **Emotional State**: [how they feel right now]

## Generated Titles

### Title 1 — Loss Aversion
**Title**: "[title text]"
**Character Count**: [count]
**Primary Trigger**: Loss Aversion (Kahneman)
**Trigger Mechanism**: [exactly how this activates the loss response]
**Honesty Check**: [why this is a genuine, truthful framing]
**Scores**: Trigger Activation: [x]/10 | Emotional Pull: [x]/10 | Honesty: [x]/10 | Scroll-Stop: [x]/10
**Trigger Strength**: [average]/10
**Thumbnail Note**: [ideal thumbnail pairing]

### Title 2 — Social Proof
[same structure]

### Title 3 — Identity Activation
[same structure]

### Title 4 — Scarcity / Urgency
[same structure]

### Title 5 — Authority / Credibility
[same structure]

## Top Pick
**Recommended Title**: "[title]"
**Why**: [1-2 sentences on why this trigger is most potent for this topic and audience]
**Thumbnail Synergy**: [how the thumbnail amplifies the psychological trigger]
```

## Examples

### Example: Topic = "Why you should start a faceless YouTube channel in 2025"

**Audience Psychology Profile**:
- Awareness Level: Problem Aware (knows they're stuck, exploring solutions)
- Primary Fear: Wasting another year doing nothing about their situation
- Primary Desire: A real path out that doesn't require gambling the family's stability
- Emotional State: Frustrated but cautiously hopeful

**Generated Titles**:

1. **Loss Aversion**: "Every year you don't start costs you more than you think (I did the math)"
   - Trigger: The pain of calculable, accumulating loss
   - Honesty Check: Opportunity cost is real and quantifiable — this is honest math
   - Trigger Strength: 8.5/10
   - Thumbnail: Calculator showing a large number with "LOST" stamped across it in red

2. **Social Proof**: "347 people started faceless channels this month — here's what they know that you don't"
   - Trigger: Social comparison + fear of being left behind + information gap
   - Honesty Check: Only use if the number reflects real community/course data
   - Trigger Strength: 7.5/10
   - Thumbnail: Crowd of silhouettes with YouTube play buttons, one person standing apart looking in

3. **Identity Activation**: "Built for the 9-to-5 worker who refuses to stay stuck"
   - Trigger: Identity reinforcement — "I AM someone who refuses to stay stuck"
   - Honesty Check: Speaks to genuine aspiration, no false promises
   - Trigger Strength: 8.0/10
   - Thumbnail: Office worker at desk with determined expression, laptop showing YouTube Studio

4. **Scarcity / Urgency**: "Faceless YouTube is easier now than it will EVER be again (here's why)"
   - Trigger: Window-closing anxiety — the opportunity narrows over time
   - Honesty Check: Market saturation is real — early movers genuinely have advantages
   - Trigger Strength: 8.2/10
   - Thumbnail: Door slowly closing with light streaming through the narrowing gap

5. **Authority / Credibility**: "I've built 4 faceless channels to $5K/month — this is the playbook I wish I had on day one"
   - Trigger: Expert authority + insider access + compressed learning
   - Honesty Check: Only use with real, verifiable track record
   - Trigger Strength: 8.7/10
   - Thumbnail: Four YouTube play buttons in a row, each with a revenue number, hand holding a notebook

**Top Pick**: Title 5 — Authority / Credibility
- For a Problem Aware audience, authority is the most powerful trigger because they are actively looking for someone who has DONE the thing they want to do. The specific "4 channels to $5K/month" provides concrete proof, and "the playbook I wish I had" promises distilled wisdom that saves time and pain.
- Thumbnail synergy: The four play buttons with revenue numbers prove the claim visually without repeating the title. The notebook signals organized, transferable knowledge.
