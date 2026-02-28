---
task: Analyze Channel Performance
responsavel: "@analytics-analyst"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - channel_data: YouTube Analytics data or channel URL
  - period: Analysis period (7/30/90 days)
  - focus: Overall health, specific video, revenue, or growth
Saida: |
  - performance_scorecard: Full metrics scorecard with benchmarks
  - insights: Key findings and patterns
  - recommendations: Data-driven action items
  - trends: Performance trends over period
---

# *analyze - Channel Performance Analysis

Comprehensive YouTube Analytics interpretation with benchmarking, trend analysis, and actionable recommendations.

## Flow

```
1. Collect analytics data
   ├── Channel URL or analytics export
   ├── Analysis period (7, 30, or 90 days)
   ├── Focus area (overall, specific video, revenue, growth)
   └── Comparison baseline (previous period, or niche average)

2. Core Metrics Analysis
   ├── Views: Total, daily average, trend direction
   ├── Watch Time: Total hours, per video average
   ├── Subscribers: Net gain/loss, conversion rate
   ├── Impressions: Total, trend, share of browse vs. search
   └── Revenue: Total, RPM, CPM (if monetized)

3. Performance Scorecard
   ├── CTR: Current vs. benchmark (niche-specific)
   ├── AVD: Current vs. benchmark
   ├── Engagement Rate: Likes + comments / views
   ├── View Velocity: 48-hour performance
   ├── Sub Conversion: Views to subscriber ratio
   └── Overall Health: Composite score

4. Traffic Source Analysis
   ├── Browse features (algorithm recommendation)
   ├── Search (YouTube search)
   ├── Suggested videos (related content)
   ├── External (social media, website)
   ├── Shorts feed (if applicable)
   └── Which source is growing/declining?

5. Retention Analysis
   ├── Average retention curve shape across videos
   ├── Identify best-performing hooks (first 30 seconds)
   ├── Find common drop-off points
   ├── Compare: best video vs. worst video retention
   └── Pattern recommendations

6. Content Performance Ranking
   ├── Best performing videos (by views, watch time, CTR)
   ├── Worst performing videos
   ├── Outlier identification (3x+ average)
   ├── Topic/format patterns in top performers
   └── What to make more of vs. less of

7. Trend Analysis
   ├── Week-over-week growth rate
   ├── Month-over-month trend
   ├── Seasonal patterns
   ├── Algorithm push/pull patterns
   └── Projection if trend continues

8. Recommendations
   ├── Top 3 things to START doing (data-backed)
   ├── Top 3 things to STOP doing (data-backed)
   ├── Top 3 things to CHANGE (optimization)
   └── Priority order based on impact

9. Generate report
```

## Elicitation Questions

```
? What period should we analyze?
  > Last 7 days (weekly check)
    Last 30 days (monthly review)
    Last 90 days (quarterly analysis)

? What's the focus of this analysis?
  > Overall channel health
    Specific video performance
    Revenue optimization
    Growth trajectory
    All areas

? Do you have access to YouTube Studio analytics?
  > Yes, I can share screenshots/data
    No, analyze based on public data
```

## Performance Analysis Template

```markdown
## Performance Analysis Report

**Channel:** {channel_name}
**Period:** {start_date} to {end_date}
**Focus:** {focus_area}

### Executive Summary
{2-3 sentence overview of channel health and key finding}

### Performance Scorecard

| Metric | Current | Benchmark | Status | Trend |
|--------|---------|-----------|--------|-------|
| CTR | {X}% | {Y}% | {emoji} | {up/down/flat} |
| AVD | {X} min | {Y} min | {emoji} | {up/down/flat} |
| Engagement | {X}% | {Y}% | {emoji} | {up/down/flat} |
| View Velocity | {X} views/48h | {Y} | {emoji} | {up/down/flat} |
| Sub Conversion | {X}% | {Y}% | {emoji} | {up/down/flat} |
| RPM | ${X} | ${Y} | {emoji} | {up/down/flat} |

**Overall Health: {X}/10**

### Top Performing Content
1. {video_title} — {views} views, {CTR}% CTR, {AVD} AVD
2. {video_title} — {views} views, {CTR}% CTR, {AVD} AVD
3. {video_title} — {views} views, {CTR}% CTR, {AVD} AVD

**Pattern:** {what these have in common}

### Underperforming Content
1. {video_title} — {views} views, {CTR}% CTR, {AVD} AVD
2. {video_title} — {views} views, {CTR}% CTR, {AVD} AVD

**Pattern:** {what these have in common}

### Traffic Sources
{Breakdown with percentages and trend direction}

### Key Insights
1. {insight_1 — backed by specific data}
2. {insight_2 — backed by specific data}
3. {insight_3 — backed by specific data}

### Recommendations

**START doing:**
1. {recommendation} — Expected impact: {impact}
2. {recommendation} — Expected impact: {impact}
3. {recommendation} — Expected impact: {impact}

**STOP doing:**
1. {recommendation} — Why: {data_reason}

**CHANGE:**
1. {recommendation} — From {current} to {recommended}

### Next Review
Recommended: {date} ({weekly/monthly})
```
