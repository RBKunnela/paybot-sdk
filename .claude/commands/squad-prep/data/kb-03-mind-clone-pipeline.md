# KB-03: Mind Clone Pipeline

> Complete reference for creating Expert squads based on real people's methodologies.
> This is the most complex part of squad creation — do not shortcut it.

---

## Overview

Mind cloning creates AI agents that think and communicate like specific experts. It requires:
1. **Source Collection** — Gathering enough material about the expert
2. **Thinking DNA Extraction** — HOW they think (frameworks, heuristics, decisions)
3. **Voice DNA Extraction** — HOW they communicate (vocabulary, stories, tone)
4. **Knowledge Extraction** — WHAT they know (domain expertise, data)

The Prep Room handles Step 1 and prepares structured input for Steps 2-4 (which happen in Claude Code during squad creation).

---

## Step 1: Source Collection (YOU DO THIS)

### Source Tier System

| Tier | Type | Confidence | Examples |
|------|------|------------|----------|
| **Tier 0** | User-provided materials | HIGHEST | Personal notes, course transcripts, private PDFs the user owns — indexed with maximum trust |
| **Tier 1** | Primary (BY the expert) | HIGH | Books they wrote, their interviews, their talks, their courses, their blog posts, their social media |
| **Tier 2** | Secondary (ABOUT the expert) | MEDIUM | Biographies, case studies of their work, analyses of their methodology, academic citations |
| **Tier 3** | Tertiary (AGGREGATED) | LOW | Wikipedia, AI summaries, summary blog posts by others, encyclopedia entries |

**Source Acquisition Strategy (Fallback Chain):**
1. **User materials** → Index as Tier 0 (highest confidence)
2. **Auto-acquire** → YouTube transcripts, book summaries, podcast appearances, articles
3. **Manual search** → If auto-acquire finds <10 sources
4. **FAIL** → Expert too obscure, <5 sources found total

### BLOCKING Minimum Requirements

| Requirement | Minimum | Why |
|-------------|---------|-----|
| Total sources | 10+ | Coverage breadth |
| Tier 1 sources (or Tier 0) | 5+ | Must have enough primary material |
| Different source types | 3+ | Books alone aren't enough |
| Content volume | 5+ hours OR 200+ pages | Need depth, not just breadth |
| Framework triangulation | Confirmed in 3+ sources | Prevents false patterns |

### Recommended (Non-Blocking)

| Requirement | Target | Why |
|-------------|--------|-----|
| Temporal coverage | 2+ time periods | Captures expert's evolution |

### Source Types to Collect

**BOOKS (Most Important for Thinking DNA):**
```yaml
books:
  - title: "Full Book Title"
    author: "Author Name"
    year: 2020
    pages: 300
    status: "consumed|partial|not-consumed"
    relevance: "Why this book matters for the agent"
    key_chapters:
      - chapter: "Chapter Name"
        concepts: ["concept1", "concept2"]
    core_frameworks:
      - name: "Framework Name"
        description: "Brief description"
        steps: ["Step 1", "Step 2", "Step 3"]
    key_quotes:
      - quote: "The exact quote"
        context: "Where/why it matters"
    anti_patterns:
      - "What the book warns AGAINST doing"
```

**INTERVIEWS & PODCASTS (Best for Voice DNA):**
```yaml
interviews:
  - title: "Interview/Podcast Title"
    host: "Interviewer/Show Name"
    year: 2023
    duration: "1h 30m"
    url: "URL"
    status: "consumed|not-consumed"
    key_insights:
      - "Insight 1"
      - "Insight 2"
    signature_phrases_heard:
      - "Phrase they said naturally"
    stories_told:
      - "Brief description of a story/anecdote they shared"
```

**VIDEOS & TALKS (Good for Both):**
```yaml
videos:
  - title: "Talk Title"
    event: "Conference/Channel name"
    year: 2022
    duration: "45m"
    url: "URL"
    status: "consumed|not-consumed"
    frameworks_demonstrated:
      - "Framework they walked through"
    teaching_style_notes: "How they explain things (e.g., uses whiteboards, tells stories first)"
```

**COURSES & WORKSHOPS:**
```yaml
courses:
  - title: "Course Title"
    platform: "Platform name"
    year: 2024
    duration: "8 hours"
    url: "URL"
    status: "consumed|not-consumed"
    modules_relevant:
      - "Module covering key framework"
    exercises_or_worksheets:
      - "Description of practical exercises"
```

**ARTICLES & BLOG POSTS:**
```yaml
articles:
  - title: "Article Title"
    source: "Publication/Blog"
    year: 2023
    url: "URL"
    key_point: "Main argument or insight"
```

### GO/NO-GO Assessment

After collecting sources, make this determination:

```yaml
go_decision:
  # All 5 must pass for GO
  checks:
    - name: "10+ total sources"
      status: "PASS|FAIL"
      actual: N
    - name: "5+ Tier 1 sources"
      status: "PASS|FAIL"
      actual: N
    - name: "3+ source types"
      status: "PASS|FAIL"
      actual: N
    - name: "5+ hours OR 200+ pages"
      status: "PASS|FAIL"
      actual: "X hours / Y pages"
    - name: "Core framework in 3+ sources"
      status: "PASS|FAIL"
      sources: ["Source 1", "Source 2", "Source 3"]

  decision: "GO|CONDITIONAL|NO-GO"
  # GO: All 5 pass
  # CONDITIONAL: 4/5 pass, clear plan to fill gap
  # NO-GO: <4/5 pass — need more material
```

---

## Step 2: Thinking DNA Extraction (Prep the Input)

The Squad Creator will extract Thinking DNA, but the Prep Room should pre-organize what the user knows about HOW the expert thinks.

### What Thinking DNA Captures

**Recognition Patterns:** What does the expert notice immediately?
```yaml
recognition_patterns:
  instant_detection:
    - "What they spot right away in their domain"
  blind_spots:
    - "What they might miss or undervalue"
  attention_triggers:
    - "What grabs their attention"
```

**Frameworks:** The expert's structured methodologies.
```yaml
frameworks:
  primary_framework:
    name: "The main framework they're known for"
    steps: ["Step 1", "Step 2", "Step 3"]
    when_to_use: "When this framework applies"
    when_NOT_to_use: "When this framework fails"
  secondary_frameworks:
    - name: "Supporting framework"
      relationship_to_primary: "How it complements the main one"
```

**Decision Heuristics:** IF/THEN rules they follow.
```yaml
heuristics:
  decision_heuristics:     # Minimum 5
    - id: "H001"
      rule: "IF {condition} THEN {action}"
      source: "Where this heuristic comes from"
  veto_heuristics:         # Minimum 2
    - id: "V001"
      rule: "NEVER {action} when {condition}"
      why: "Why this is a hard rule"
  prioritization:
    - "How they decide what's most important"
```

**Anti-Patterns:** What the expert explicitly warns against.
```yaml
anti_patterns:
  never_do:                # Minimum 3
    - action: "What to avoid"
      why: "Why it's dangerous"
      expert_quote: "Their words about it"
  common_mistakes:
    - "Mistake their students/followers commonly make"
```

### Quality Check for Thinking DNA Input
- [ ] Primary framework has 3+ steps
- [ ] 5+ decision heuristics documented
- [ ] 2+ veto heuristics (hard "never do" rules)
- [ ] Decision pipeline mapped (how they approach problems)
- [ ] 3+ anti-patterns with rationale
- [ ] 2+ recognition patterns (what they notice first)
- [ ] All heuristics have source references (which book/interview)

---

## Step 3: Voice DNA Extraction (Prep the Input)

Voice DNA captures HOW the expert communicates. The Prep Room should collect raw material for this.

### What Voice DNA Captures

**Vocabulary:**
```yaml
vocabulary:
  power_words:             # 10-15 words they use often
    - "word/phrase"
  signature_phrases:       # 5-10 phrases that are uniquely theirs
    - "phrase"
  metaphors:               # 3-5 recurring metaphors
    - "metaphor description"
  vocabulary_rules:
    always_use: ["words they always use"]
    never_use: ["words they'd never use"]
    transforms:
      - from: "Generic word"
        to: "Their version of it"
```

**Stories & Anecdotes:**
```yaml
stories:
  recurring_stories:       # Stories they tell in multiple contexts
    - "Brief description of story"
  personal_anecdotes:
    - "Personal experience they share"
  favorite_examples:
    - "Go-to example they use to illustrate points"
  story_structure:
    opening: "How they start stories"
    build_up: "How they build tension"
    payoff: "How they deliver the lesson"
    callback: "How they reference it later"
```

**Tone & Voice Dimensions (1-10 scale):**
```yaml
tone_dimensions:
  warmth_distance: 7       # 1=cold, 10=warm
  direct_indirect: 8       # 1=indirect, 10=very direct
  formal_casual: 4         # 1=formal, 10=casual
  complex_simple: 6        # 1=complex, 10=simple
  emotional_rational: 5    # 1=emotional, 10=rational
  humble_confident: 7      # 1=humble, 10=confident
  serious_playful: 3       # 1=serious, 10=playful
```

**Communication Anti-Patterns:**
```yaml
communication_anti_patterns:
  never_say:               # Words/phrases they'd never use
    - "word/phrase"
  never_do:                # Communication patterns they reject
    - "pattern"
  rejected_styles:
    - "Communication style they explicitly dislike"
```

**Voice Contradictions (IMPORTANT — preserve, don't resolve):**
```yaml
voice_paradoxes:
  - paradox: "How they seem to contradict themselves"
    explanation: "Why both sides are authentic"
    # Example: "Is direct but also nurturing" — both are real
```

### Quality Check for Voice DNA Input
- [ ] 10+ power words identified
- [ ] 5+ signature phrases
- [ ] 3+ recurring metaphors
- [ ] Story structure documented (opening, build-up, payoff)
- [ ] All 7 tone dimensions scored
- [ ] 3+ communication anti-patterns
- [ ] Voice paradoxes noted (not resolved)
- [ ] Source referenced for each element

---

## Step 4: Framework Documentation (The Deep Work)

For the MOST IMPORTANT framework of each expert, create a comprehensive breakdown:

```yaml
deep_framework:
  name: "Framework Name"
  expert: "Expert Name"
  version: "As taught in {book/course}"

  philosophy:
    core_belief: "The fundamental belief behind this framework"
    problem_it_solves: "What problem this addresses"
    unique_angle: "What makes this different from other approaches"

  prerequisites:
    - "What someone needs to know/have before using this"

  steps:
    step_1:
      name: "Step Name"
      description: "Detailed description"
      inputs: ["What you need"]
      outputs: ["What you produce"]
      common_mistakes:
        - "What people get wrong at this step"
      expert_tip: "The expert's specific advice for this step"

    step_2:
      # Same structure...

  success_criteria:
    - "How you know you did it right"

  failure_modes:
    - "How you know you did it wrong"

  advanced_variations:
    - "How experts modify this framework for specific situations"

  real_examples:
    - context: "Situation description"
      application: "How the framework was applied"
      result: "What happened"
      source: "Where this example comes from"
```

---

## Common Pitfalls in Mind Clone Preparation

### 1. "I watched a YouTube summary"
YouTube summaries are Tier 3. They compress nuance. The mind clone will be shallow.
**Fix:** Read at least one primary book. Watch 3+ hours of the expert speaking.

### 2. "I know the framework generally"
General knowledge produces generic agents. Specificity is everything.
**Fix:** Can you explain each step with an example? If not, go deeper.

### 3. "I have 15 Tier 3 sources"
Quantity of low-quality sources doesn't replace quality. 15 Wikipedia summaries < 2 books.
**Fix:** Prioritize Tier 1. Get 5 primary sources minimum.

### 4. "I'll skip the anti-patterns"
Knowing what the expert would NEVER do is as important as what they WOULD do.
**Fix:** For each framework, ask "What does {expert} warn against?"

### 5. "The voice DNA doesn't matter for a technical expert"
Even technical experts have communication patterns. A bland agent = unused agent.
**Fix:** Watch interviews. Note how they open sentences, what metaphors they use.

### 6. "I can't find enough sources"
Some experts don't have enough public material. That's OK.
**Options:**
- Ask if the user has private materials (course transcripts, personal notes)
- Consider a Hybrid squad instead of Expert
- Mark as NO-GO and suggest an alternative expert

---

## Source Research Assistance

When the user knows the expert but needs help finding sources:

### Book Discovery
- Search: "{Expert Name} books"
- Check: Amazon, Goodreads, the expert's website
- Ask: "What's their most recommended book?" (usually Tier 1 gold)

### Interview Discovery
- Search YouTube: "{Expert Name} interview"
- Search podcast platforms: "{Expert Name} podcast guest"
- Check: The expert's own YouTube channel
- Look for: Long-form interviews (1+ hour) over short clips

### Course Discovery
- Check: Expert's website for courses
- Search: Udemy, Skillshare, Coursera, their own platform
- Ask: "Have you taken any of their courses?"

### Time Estimation for Source Consumption
| Source Type | Time to Consume | Depth Value |
|-------------|----------------|-------------|
| Book (200 pages) | 5-8 hours | Very High |
| Book (300+ pages) | 8-12 hours | Very High |
| Long interview (1h) | 1 hour | High |
| Short video (15m) | 15 minutes | Medium |
| Article | 10-20 minutes | Low-Medium |
| Course (full) | 5-20 hours | Very High |

---

*Reference: collect-sources.md, extract-thinking-dna.md, extract-voice-dna.md, extract-knowledge.md*
