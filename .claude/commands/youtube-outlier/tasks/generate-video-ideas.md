---
task: Generate Video Ideas
responsavel: "@content-strategist"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - niche: Channel niche
  - count: Number of ideas to generate (default: 20)
  - bucket_focus: Discovery, Community, Hero, or all
  - keyword_data: From algorithm-expert (optional)
  - outlier_data: From competitor analysis (optional)
Saida: |
  - video_ideas: Scored and categorized list of video ideas
  - top_picks: Top 5 highest-potential ideas
  - title_options: 3 title variations per top pick
  - thumbnail_concepts: Visual concept per top pick
---

# *generate-ideas - Video Idea Generator

Generates strategic video ideas using 5 ideation methods: keyword-based, outlier-based, trend-based, comment-based, and gap-based. Every idea is scored and categorized by content bucket.

## Flow

```
1. Collect ideation parameters
   ├── Niche and sub-niche
   ├── Number of ideas (default: 20)
   ├── Bucket focus (all, or specific bucket)
   ├── Channel stage (new, growing, established)
   └── Any specific themes or constraints

2. Method 1: Keyword-Based Ideas
   ├── Pull from keyword research data (if available)
   ├── Identify high-search, low-competition topics
   ├── Generate "How to..." and "Best..." formats
   ├── Create list-format variations ("[Number] ways to...")
   └── Tag as Discovery bucket

3. Method 2: Outlier-Based Ideas
   ├── Review competitor outlier data (if available)
   ├── Identify topics that consistently outperform
   ├── Create your unique angle on proven topics
   ├── Adapt for faceless format
   └── Tag as Discovery or Hero bucket

4. Method 3: Trend-Based Ideas
   ├── Identify current trends in niche
   ├── Find trending topics on YouTube and social media
   ├── Create timely content angles
   ├── Assess trend longevity (flash vs. sustained)
   └── Tag as Hero bucket

5. Method 4: Comment-Based Ideas
   ├── Review common audience questions
   ├── Identify pain points from community
   ├── Create content that answers real questions
   ├── Build FAQ-style content series
   └── Tag as Community bucket

6. Method 5: Gap-Based Ideas
   ├── Find topics no one covers well
   ├── Identify underserved angles on popular topics
   ├── Create "the video that should exist but doesn't"
   ├── Target specific audience segments others ignore
   └── Tag as Discovery or Community bucket

7. Score each idea
   ├── Search Potential (1-10): Is anyone searching for this?
   ├── Competition Level (1-10): How crowded is this topic?
   ├── Audience Fit (1-10): Does this match our target audience?
   ├── Trend Timing (1-10): Is this timely or evergreen?
   ├── Faceless Viability (1-10): Can this work without showing face?
   └── Total Score: Average of all dimensions

8. Package results
   ├── Full list sorted by score
   ├── Top 5 picks with 3 title variations each
   ├── Thumbnail concepts for top 5
   └── Recommended content calendar integration
```

## Elicitation Questions

```
? What's the channel niche?
  > [text input or select from common niches]

? How many ideas do you need?
  > 10 (quick batch)
    20 (standard batch — Recommended)
    30+ (comprehensive ideation)

? Any specific bucket focus?
  > All buckets (balanced mix)
    Discovery (new audience growth)
    Community (existing audience loyalty)
    Hero (viral attempts)

? Any topics to avoid or constraints?
  > [text input — optional]
```

## Video Idea Output Template

```markdown
## Video Ideas: {niche}

**Generated:** {date}
**Total Ideas:** {count}
**Bucket Distribution:** Discovery: {X} | Community: {X} | Hero: {X}

### Top 5 Picks

#### 1. {idea_title} — Score: {X}/10
- **Bucket:** {Discovery/Community/Hero}
- **Method:** {keyword/outlier/trend/comment/gap}
- **Why:** {1-sentence rationale}
- **Title Options:**
  1. {title_1}
  2. {title_2}
  3. {title_3}
- **Thumbnail Concept:** {3-word visual description}
- **Hook:** {opening line or concept}
- **Estimated Length:** {minutes}

{Repeat for top 5}

### Full Idea List

| # | Idea | Bucket | Score | Method |
|---|------|--------|-------|--------|
| 1 | {idea} | {bucket} | {X}/10 | {method} |
| 2 | {idea} | {bucket} | {X}/10 | {method} |
...

### Integration Notes
{How to work these into the content calendar}
```
