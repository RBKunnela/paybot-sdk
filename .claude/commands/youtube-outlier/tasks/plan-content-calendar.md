---
task: Plan Content Calendar
responsavel: "@content-strategist"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - niche: Channel niche
  - frequency: Publishing frequency (videos/week)
  - time_horizon: Calendar length (2/4/8/12 weeks)
  - content_buckets: Discovery/Community/Hero distribution
  - keyword_data: From algorithm-expert (optional)
Saida: |
  - content_calendar: Week-by-week publishing plan
  - video_briefs: Title, thumbnail concept, hook, bucket type per video
  - backlog_strategy: How to stay ahead of schedule
  - shorts_strategy: Shorts integration plan
---

# *plan-calendar - Content Calendar Planning

Creates a strategic content calendar with the 3-Bucket System (Discovery 40%, Community 40%, Hero 20%) and backlog strategy for consistent publishing.

## Flow

```
1. Collect calendar parameters
   ├── Channel niche
   ├── Publishing frequency (1-3 videos/week recommended)
   ├── Calendar length (default: 4 weeks)
   ├── Shorts strategy (yes/no, how many per week)
   └── Available time per week

2. Define content buckets
   ├── Discovery (40%): Search-driven, new audience
   ├── Community (40%): Existing audience, loyalty
   ├── Hero (20%): Big swings, viral attempts
   └── Adjust percentages based on channel stage

3. Generate video ideas per bucket
   ├── Discovery ideas: keyword-driven topics
   ├── Community ideas: audience-requested topics
   ├── Hero ideas: outlier-inspired concepts
   └── Score each: search potential + competition + fit

4. Assign to calendar slots
   ├── Alternate bucket types for variety
   ├── Place hero content on highest-traffic days
   ├── Group related videos for series potential
   └── Leave buffer for trending topic insertion

5. Create video briefs for each slot
   ├── Working title (to be optimized by algorithm-expert)
   ├── Thumbnail concept (3-word visual description)
   ├── Hook type (curiosity, pain, identity, challenge)
   ├── Key talking points (3-5 bullets)
   ├── Bucket type (Discovery/Community/Hero)
   └── Estimated length

6. Build backlog strategy
   ├── Target: 2-4 weeks ahead of publish date
   ├── Batch creation schedule
   ├── Emergency content (evergreen videos pre-recorded)
   └── Vacation/sick day contingency

7. Integrate Shorts strategy
   ├── Repurpose highlights from long-form
   ├── Standalone Short concepts
   ├── Publishing frequency (3-7 per week)
   └── Cross-promotion between Shorts and long-form

8. Package calendar
```

## Elicitation Questions

```
? How many long-form videos per week?
  > 1 video/week (sustainable for 4 hrs/week)
    2 videos/week (moderate pace)
    3+ videos/week (aggressive growth)

? How many weeks should the calendar cover?
  > 2 weeks (quick plan)
    4 weeks (standard month)
    8 weeks (two months)
    12 weeks (quarter plan)

? Do you want Shorts integrated?
  > Yes, 3-5 per week (Recommended)
    Yes, 1-2 per week (minimal)
    No Shorts for now

? What's the channel growth stage?
  > New (0-1K subscribers)
    Growing (1K-10K subscribers)
    Established (10K-100K subscribers)
    Scaling (100K+ subscribers)
```

## Content Calendar Template

```markdown
## Content Calendar: {channel_name}

**Period:** {start_date} to {end_date}
**Frequency:** {X} long-form/week + {X} Shorts/week
**Bucket Mix:** Discovery {X}% | Community {X}% | Hero {X}%

### Week 1: {theme}

| Day | Type | Bucket | Title | Hook | Length |
|-----|------|--------|-------|------|--------|
| {day} | Long-form | Discovery | {title} | {hook_type} | {min} |
| {day} | Short | - | {title} | {hook_type} | {sec} |
| {day} | Short | - | {title} | {hook_type} | {sec} |

**Week 1 Notes:** {strategic notes}

### Week 2: {theme}
{same format}

### Week 3: {theme}
{same format}

### Week 4: {theme}
{same format}

### Backlog Strategy
- Current backlog: {X} videos ahead
- Target backlog: {X} videos ahead
- Batch creation day: {day_of_week}
- Emergency content: {X} evergreen videos ready

### Shorts Repurpose Plan
{How to extract Shorts from each long-form video}
```
