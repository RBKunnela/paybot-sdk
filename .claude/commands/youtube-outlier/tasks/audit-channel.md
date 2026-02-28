---
task: Audit YouTube Channel
responsavel: "@channel-strategist"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - channel_url: YouTube channel URL or name
  - niche: Channel niche/topic area
  - goals: What the creator wants to achieve
Saida: |
  - audit_report: Complete 7-Pillar audit with scores
  - critical_issues: Top 3 issues to fix immediately
  - opportunities: Growth opportunities identified
  - roadmap_recommendation: Suggested next steps
---

# *audit - Full Channel Audit

Performs a comprehensive 7-Pillar channel audit using Paddy Galloway's methodology. This is the BLOCKING diagnostic step — no strategy should be created without this audit.

## Why This Matters

Creating YouTube strategy without auditing the channel first is like prescribing medicine without examining the patient. The audit reveals:
- What's actually working (keep doing it)
- What's broken (fix it immediately)
- What's missing (opportunities)
- What's the priority order (don't fix everything at once)

## Flow

```
1. Collect channel information
   ├── Channel URL or name
   ├── Niche / topic area
   ├── Current subscriber count and age
   ├── Publishing frequency
   └── Creator's goals (growth, revenue, brand)

2. Audit Pillar 1: Niche Clarity (Score 1-10)
   ├── Does every video serve the same audience?
   ├── Is the niche specific enough?
   ├── Is there demand for this niche?
   └── Is there room for growth (not oversaturated)?

3. Audit Pillar 2: Packaging Quality (Score 1-10)
   ├── Title analysis (last 10 videos)
   │   ├── Do titles create curiosity gaps?
   │   ├── Are primary keywords included?
   │   ├── Are they under 60 characters?
   │   └── Do they follow proven formulas?
   ├── Thumbnail analysis (last 10 videos)
   │   ├── Are they readable at mobile size?
   │   ├── Do they have 3 elements or fewer?
   │   ├── Is there high contrast?
   │   └── Do they complement (not duplicate) the title?
   └── Overall CTR assessment

4. Audit Pillar 3: Content Quality (Score 1-10)
   ├── Average retention curve shape
   ├── First 30 seconds hook effectiveness
   ├── Pattern interrupt frequency
   ├── Story structure usage
   └── Value density (insight per minute)

5. Audit Pillar 4: Upload Consistency (Score 1-10)
   ├── Publishing frequency (videos/week or month)
   ├── Schedule consistency (same days/times?)
   ├── Gaps longer than 2 weeks?
   ├── Backlog evidence (consistent even during holidays?)
   └── Algorithmic trust assessment

6. Audit Pillar 5: SEO Foundation (Score 1-10)
   ├── Description quality and length
   ├── Tag usage and relevance
   ├── Chapter markers present?
   ├── End screens configured?
   ├── Cards used effectively?
   ├── Hashtags present?
   └── Closed captions available?

7. Audit Pillar 6: Audience Engagement (Score 1-10)
   ├── Comment volume and quality
   ├── Creator response rate
   ├── Community tab usage
   ├── Like/dislike ratio
   └── Share and save signals

8. Audit Pillar 7: Monetization Alignment (Score 1-10)
   ├── Is content in a monetizable niche?
   ├── CPM potential of the niche
   ├── Affiliate opportunities
   ├── Digital product potential
   ├── Sponsor attractiveness
   └── Revenue diversification

9. Generate Audit Report
   ├── Overall channel health score (average of 7 pillars)
   ├── Top 3 critical issues (lowest-scoring pillars)
   ├── Top 3 opportunities (quick wins)
   ├── Competitive positioning
   └── Recommended roadmap priority

10. Package handoff for specialists
    ├── If SEO issues → handoff to algorithm-expert
    ├── If content issues → handoff to content-strategist
    ├── If analytics needed → handoff to analytics-analyst
    └── If multiple issues → handoff to strategy-chief for routing
```

## Elicitation Questions

```
? What's your YouTube channel URL or name?
  > [text input]

? What niche is the channel in?
  > Personal Finance
    Technology / Tech Reviews
    Productivity / Self-Improvement
    Business / Entrepreneurship
    Health / Fitness
    Education / How-To
    Entertainment / Commentary
    Other (specify)

? What are your primary goals?
  > Grow subscribers and views
    Increase revenue (monetization)
    Build authority in niche
    Drive traffic to external product/service
    All of the above
```

## Audit Report Template

```markdown
## Channel Audit Report

**Channel:** {channel_name}
**Niche:** {niche}
**Subscribers:** {sub_count}
**Total Videos:** {video_count}
**Channel Age:** {age}

### Overall Health Score: {X}/10

### 7-Pillar Breakdown

| Pillar | Score | Status |
|--------|-------|--------|
| 1. Niche Clarity | {X}/10 | {status_emoji} |
| 2. Packaging Quality | {X}/10 | {status_emoji} |
| 3. Content Quality | {X}/10 | {status_emoji} |
| 4. Upload Consistency | {X}/10 | {status_emoji} |
| 5. SEO Foundation | {X}/10 | {status_emoji} |
| 6. Audience Engagement | {X}/10 | {status_emoji} |
| 7. Monetization Alignment | {X}/10 | {status_emoji} |

### Critical Issues (Fix These First)
1. {issue_1} — {why_it_matters} — {how_to_fix}
2. {issue_2} — {why_it_matters} — {how_to_fix}
3. {issue_3} — {why_it_matters} — {how_to_fix}

### Quick Wins (Easy Improvements)
1. {opportunity_1}
2. {opportunity_2}
3. {opportunity_3}

### Recommended Next Steps
{Prioritized action plan based on audit findings}

### Specialist Routing
{Which specialist should handle each issue}
```
