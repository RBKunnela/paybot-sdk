# Task: Product-Market Fit Test

**Task ID:** pmf-test
**Version:** 1.0
**Purpose:** Design and evaluate product-market fit using the Sean Ellis 40% Test and complementary PMF signals
**Agent:** @sean-ellis
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Designs and executes a product-market fit assessment using the Sean Ellis Test — the industry-standard survey where if 40% or more of users say they would be "very disappointed" without the product, you have achieved PMF. This task goes beyond the single question to create a comprehensive PMF assessment including survey design, audience selection, results analysis, and actionable recommendations for strengthening fit.

```
INPUT (product_description, target_users, current_user_count, survey_data)
    |
[PHASE 1: SURVEY DESIGN]
    -> Design the PMF survey with the Ellis question and supporting questions
    |
[PHASE 2: AUDIENCE SELECTION]
    -> Define who to survey and how to reach them for valid results
    |
[PHASE 3: RESULTS ANALYSIS]
    -> Analyze responses to calculate PMF score and extract insights
    |
[PHASE 4: PMF SCORE & RECOMMENDATIONS]
    -> Interpret the score and provide strategic recommendations
    |
OUTPUT: PMF assessment with score, segment analysis, and roadmap to strengthen fit
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Description of the product, its core value proposition, and key features |
| target_users | string | Yes | Description of the target user personas and segments |
| current_user_count | number | Yes | Total number of active users (needed to determine survey feasibility and statistical validity) |
| survey_data | object | No | Existing survey responses if already collected; if not provided, task designs the survey for future execution |
| user_segments | list | No | Defined user segments for cohort analysis (power users, casual, new, churned) |
| product_age | string | No | How long the product has been available to users |
| key_features | list | No | List of main features to assess individual feature-market fit |

---

## Preconditions

- Product has been available to real users for a sufficient period to form opinions (minimum 2 weeks of usage recommended)
- At least 30 active users exist to generate statistically meaningful results (ideal minimum: 100)
- Users have experienced the core value proposition at least once
- A method exists to reach users with the survey (email, in-app, direct message)
- Stakeholders are prepared to act on PMF results, including potentially pivoting if PMF is not achieved
- If survey_data is provided, responses include the core Sean Ellis question at minimum

---

## Steps

### Phase 1: Survey Design
1. Design the core Sean Ellis question: "How would you feel if you could no longer use [product]?" with response options:
   - Very disappointed
   - Somewhat disappointed
   - Not disappointed (it is not really that useful)
   - N/A — I no longer use [product]
2. Add the follow-up question for "very disappointed" respondents: "What is the primary benefit you receive from [product]?" (open text) — this reveals the core value proposition in users' own words
3. Add the follow-up question for "not disappointed" respondents: "What would you likely use as an alternative?" (open text) — this reveals competitive positioning
4. Add the improvement question for all respondents: "How can we improve [product] for you?" (open text) — this generates the product roadmap from PMF-positive users
5. Add the persona question: "What type of person do you think would benefit most from [product]?" (open text) — this reveals ideal customer profile in users' words
6. Add usage frequency question: "How often do you use [product]?" (daily, weekly, monthly, rarely) — for segmented analysis
7. Add optional demographic or firmographic questions relevant to the target audience for segment analysis
8. Design the survey flow: keep it under 5 minutes total, lead with the Ellis question, use conditional logic for follow-ups
9. Write the survey introduction and closing copy that maximizes completion rate without biasing responses

### Phase 2: Audience Selection
1. Define the survey audience criteria: users who have experienced the core product value at least twice, excluding users who signed up but never activated
2. Segment the audience by usage frequency, tenure, user type, and any relevant business dimensions
3. Calculate the required sample size for statistical significance: minimum 30 responses, target 100+ for segment analysis
4. Design the distribution strategy: channel (email, in-app modal, direct message), timing (after key actions, specific day/time), and incentive (if any)
5. Plan for non-response bias: compare respondents to non-respondents on available metrics (usage frequency, tenure, features used)
6. Set the survey window: typically 1-2 weeks to collect sufficient responses
7. Create a reminder strategy for non-responders: one follow-up after 3 days, second after 7 days
8. If survey_data is already provided, validate the audience composition and identify any selection bias in the existing sample

### Phase 3: Results Analysis
1. Calculate the headline PMF score: percentage of respondents who answered "very disappointed"
2. Apply the Sean Ellis benchmark: 40%+ = PMF achieved, 25-40% = approaching PMF, below 25% = PMF not yet achieved
3. Segment the PMF score by user cohort: power users vs casual, new vs tenured, by persona type, by acquisition channel
4. Identify the "high-expectation customer" (HXC): the segment with the highest PMF score; this is your ideal customer profile
5. Analyze open-text responses from "very disappointed" users: cluster the primary benefits mentioned to identify the core value proposition as users experience it
6. Analyze open-text responses from "not disappointed" users: map alternatives mentioned to understand competitive positioning and switching costs
7. Analyze improvement suggestions: separate into requests from PMF-positive users (enhance what works) vs PMF-negative users (may represent wrong audience)
8. Cross-reference PMF score with usage data: do high-frequency users correlate with "very disappointed" responses
9. Calculate PMF score trend if historical survey data exists: is PMF improving, stable, or declining

### Phase 4: PMF Score and Recommendations
1. Present the PMF score with confidence interval and segment breakdowns in a clear executive summary
2. **If PMF achieved (40%+):** Recommend doubling down on the high-expectation customer segment; prioritize improvements requested by "very disappointed" users; design growth experiments to acquire more of the ideal customer profile; caution against feature bloat that dilutes the core value
3. **If approaching PMF (25-40%):** Identify the segment closest to 40%; recommend narrowing focus to that segment; analyze what separates "very disappointed" from "somewhat disappointed" users; design experiments to convert "somewhat" to "very" disappointed
4. **If PMF not achieved (below 25%):** Recommend a strategic review of the value proposition; analyze whether the problem is the product, the audience, or the positioning; suggest rapid iteration cycles focused on the highest-scoring segment; consider pivoting if no segment exceeds 25%
5. Create the PMF improvement roadmap: specific actions ordered by expected impact on PMF score
6. Define the re-measurement plan: when to run the survey again (recommended every 6-8 weeks during pre-PMF, quarterly post-PMF)
7. Design the ongoing PMF tracking system: trigger-based surveys after key user milestones (Day 14, Day 30, Day 60)
8. Document the ideal customer profile based on the highest-PMF segment for use in acquisition targeting and messaging

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| survey_design | markdown | Complete survey with questions, flow logic, distribution plan, and copy |
| pmf_score_report | markdown | PMF score calculation with segment breakdowns, benchmarks, and confidence intervals |
| user_insight_analysis | markdown | Thematic analysis of open-text responses revealing core value, alternatives, and improvement priorities |
| ideal_customer_profile | markdown | Data-driven ICP based on the highest-PMF user segment |
| pmf_roadmap | markdown | Strategic recommendations and action plan based on the PMF score tier |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Ellis question included | blocking | The core Sean Ellis "very disappointed" question must be the foundation of the survey |
| Sample size adequate | blocking | Survey plan must target a statistically meaningful sample size (minimum 30, recommended 100+) |
| Segment analysis complete | blocking | PMF score must be broken down by at least 2 user segments to identify the high-expectation customer |
| Actionable recommendations | blocking | Recommendations must be specific and tied to the PMF score tier with clear next actions |
| Bias addressed | warning | Survey design should account for and mitigate non-response bias and selection bias |
| Open-text analysis | warning | Free-text responses should be thematically clustered and quantified where possible |

---

## Handoff

- **On PMF achieved:** Hand to @sean-ellis for growth-engine task to scale acquisition of the ideal customer
- **On PMF not achieved:** Hand to @pm for story creation to address core value proposition gaps
- **On activation issues identified:** Hand to @sean-ellis for activation-flow optimization task
- **On issues:** Escalate to @design-chief
