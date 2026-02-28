---
task: Create Growth Strategy
responsavel: "@channel-strategist"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - audit_report: Channel audit results (required - BLOCKING)
  - goals: Specific growth goals (subscribers, views, revenue)
  - timeline: Target timeline (3/6/12 months)
  - time_budget: Hours per week available
Saida: |
  - growth_strategy: Complete phased growth plan
  - milestones: Measurable milestones per phase
  - kpis: Key metrics to track
  - action_items: Weekly action items
---

# *roadmap - Create Growth Strategy

Creates a comprehensive, phased growth strategy based on the channel audit results. REQUIRES a completed channel audit before execution.

## Why This Matters

A growth strategy without an audit is guesswork. With the audit data, we know exactly what to prioritize. The strategy turns diagnosis into action — phased, measurable, and realistic for someone working 4 hours/week.

## Prerequisites

- Completed channel audit (*audit must have been run first)
- If no audit exists, route to channel-strategist for audit

## Flow

```
1. Verify audit exists
   ├── If audit complete → use audit data
   └── If no audit → STOP, route to *audit first

2. Collect growth parameters
   ├── Timeline: 3, 6, or 12 months?
   ├── Time budget: hours/week (default: 4 for side-hustle creators)
   ├── Goals: subscribers, views, revenue, authority
   └── Constraints: faceless requirement, budget limitations

3. Build Phase 1 (Foundation - Month 1-2)
   ├── Fix critical issues from audit
   ├── Establish publishing consistency
   ├── Optimize existing content packaging
   ├── Set up analytics tracking
   └── Milestone: Consistent publishing cadence

4. Build Phase 2 (Optimization - Month 3-4)
   ├── Implement SEO improvements
   ├── Start content bucket strategy (40/40/20)
   ├── Begin outlier video analysis
   ├── A/B test titles and thumbnails
   └── Milestone: CTR improvement + retention baseline

5. Build Phase 3 (Scale - Month 5-6)
   ├── Double down on proven content patterns
   ├── Launch hero content strategy
   ├── Implement content multiplication
   ├── Explore monetization diversification
   └── Milestone: Revenue target or growth rate target

6. Define KPIs per phase
   ├── Phase 1 KPIs: Publishing consistency, basic SEO score
   ├── Phase 2 KPIs: CTR, AVD, view velocity
   ├── Phase 3 KPIs: Revenue, subscriber growth rate, outlier frequency
   └── Track weekly with analytics-analyst

7. Generate weekly action plan
   ├── 4 hours/week breakdown
   │   ├── 1 hour: Content creation
   │   ├── 1 hour: Packaging (title/thumbnail)
   │   ├── 1 hour: Research and outlier analysis
   │   └── 1 hour: Analytics review and optimization
   └── Adjustable based on actual time budget

8. Package strategy document
```

## Elicitation Questions

```
? What's your growth timeline?
  > 3 months (quick wins focus)
    6 months (balanced growth)
    12 months (comprehensive strategy)

? How many hours per week can you dedicate?
  > 2-3 hours (minimal)
    4-5 hours (standard for side-hustle creators)
    6-8 hours (aggressive)
    8+ hours (full commitment)

? What's your primary growth goal?
  > Reach 1,000 subscribers (monetization threshold)
    Reach $1k/month revenue
    Reach $5k/month revenue
    Build authority in niche
    All of the above
```

## Growth Strategy Template

```markdown
## Growth Strategy: {channel_name}

**Timeline:** {X} months
**Time Budget:** {X} hours/week
**Primary Goal:** {goal}
**Starting Point:** {current_metrics from audit}

### Phase 1: Foundation (Month 1-2)
**Focus:** Fix critical issues, establish consistency

**Weekly Actions:**
- [ ] {action_1}
- [ ] {action_2}
- [ ] {action_3}
- [ ] {action_4}

**Milestone:** {specific, measurable milestone}
**KPIs:** {metrics to track}

### Phase 2: Optimization (Month 3-4)
**Focus:** Algorithm optimization, content strategy

**Weekly Actions:**
- [ ] {action_1}
- [ ] {action_2}
- [ ] {action_3}
- [ ] {action_4}

**Milestone:** {specific, measurable milestone}
**KPIs:** {metrics to track}

### Phase 3: Scale (Month 5-6)
**Focus:** Double down on what works, monetize

**Weekly Actions:**
- [ ] {action_1}
- [ ] {action_2}
- [ ] {action_3}
- [ ] {action_4}

**Milestone:** {specific, measurable milestone}
**KPIs:** {metrics to track}

### Risk Factors
{What could go wrong and how to handle it}

### Review Cadence
{When and how to review progress — recommend weekly with analytics-analyst}
```
