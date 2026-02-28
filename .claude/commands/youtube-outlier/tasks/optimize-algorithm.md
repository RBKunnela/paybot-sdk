---
task: Optimize Algorithm & SEO
responsavel: "@algorithm-expert"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - video_topic: Topic of the video to optimize
  - target_keywords: Primary and secondary keywords
  - video_type: Long-form, Short, or both
  - current_metadata: Existing title, description, tags (if optimizing existing video)
Saida: |
  - optimized_title: SEO-optimized title with curiosity gap
  - optimized_description: 200+ word description with keywords
  - tag_strategy: 15-20 optimized tags
  - chapter_markers: Keyword-rich timestamps
  - seo_score: Estimated SEO score with improvement notes
  - algorithm_strategy: Signal optimization recommendations
---

# *optimize-seo - Algorithm & SEO Optimization

Full SEO optimization for a YouTube video, including title, description, tags, chapters, and algorithm signal strategy.

## Flow

```
1. Collect video information
   ├── Topic and target audience
   ├── Primary keyword (what should this rank for?)
   ├── Secondary keywords (related searches)
   ├── Video type (long-form, Short, both)
   └── Is this a new or existing video?

2. Keyword Analysis
   ├── Validate primary keyword search volume
   ├── Identify related keywords and long-tail variations
   ├── Assess competition level
   ├── Find keyword gaps (high demand, low competition)
   └── Map keywords to content sections

3. Title Optimization
   ├── Primary keyword in first 5 words
   ├── Create curiosity gap
   ├── Keep under 60 characters
   ├── Generate 5-10 title variations
   ├── Score each for CTR potential
   └── Recommend top 3 for A/B testing

4. Description Optimization
   ├── Primary keyword in first sentence
   ├── 200+ words of natural content
   ├── 3-5 related keywords woven naturally
   ├── Include timestamps (chapter markers)
   ├── Include relevant links
   ├── Add 3-5 hashtags
   └── Include subscribe CTA

5. Tag Strategy
   ├── Primary keyword as first tag
   ├── Add 5-7 related keywords
   ├── Add 3-5 broad category tags
   ├── Add 3-5 long-tail variations
   └── Total: 15-20 tags

6. Chapter Markers
   ├── Create keyword-rich timestamp labels
   ├── Ensure first chapter starts at 0:00
   ├── Group by content sections
   └── Each label includes a relevant keyword

7. End Screen & Card Strategy
   ├── End screen: Subscribe + best video for viewer
   ├── Cards: Related videos at retention dip points
   └── Playlist assignment recommendation

8. Algorithm Signal Strategy
   ├── CTR optimization (title + thumbnail synergy)
   ├── Retention optimization (hook + pattern interrupts)
   ├── Session duration (what video to suggest next)
   ├── Engagement prompts (specific question for comments)
   └── View velocity (publish time + notification strategy)

9. Generate SEO scorecard
   └── Score breakdown with improvement suggestions
```

## Elicitation Questions

```
? What is the video topic?
  > [text input]

? What primary keyword should this rank for?
  > [text input]

? Is this a new video or optimizing an existing one?
  > New video (pre-publish optimization)
    Existing video (post-publish optimization)

? What type of video?
  > Long-form (8+ minutes)
    Short (under 60 seconds)
    Both (long-form + Short version)
```

## SEO Optimization Output Template

```markdown
## SEO Optimization Report

**Topic:** {topic}
**Primary Keyword:** {keyword}
**Video Type:** {type}

### Optimized Title (Top 3 Options)
1. {title_1} — CTR Score: {X}/10
2. {title_2} — CTR Score: {X}/10
3. {title_3} — CTR Score: {X}/10

### Optimized Description
{Full 200+ word description with keywords naturally integrated}

### Tags (Copy-Paste Ready)
{tag1}, {tag2}, {tag3}, ... {tag20}

### Chapter Markers
0:00 - {keyword-rich label}
{timestamp} - {keyword-rich label}
...

### Algorithm Signal Strategy
- **Hook strategy:** {first 30 seconds plan}
- **Engagement prompt:** {specific question for comments}
- **End screen:** {what to recommend}
- **Publish time:** {optimal based on audience data}

### SEO Score: {X}/100
{Breakdown by component with improvement notes}
```
