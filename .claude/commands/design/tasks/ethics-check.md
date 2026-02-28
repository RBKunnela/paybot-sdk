# Task: Manipulation Matrix Ethics Check

**Task ID:** ethics-check
**Version:** 1.0
**Purpose:** Evaluate a product through Nir Eyal's Manipulation Matrix to classify it as Facilitator, Peddler, Entertainer, or Dealer, and provide ethical design recommendations
**Agent:** @nir-eyal
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Applies Nir Eyal's Manipulation Matrix to assess the ethical standing of a product's habit-forming design. The matrix uses two questions: "Would I use this product myself?" and "Does this product materially improve the user's life?" The intersection of these answers places the product in one of four quadrants. Facilitators (yes/yes) build products they believe in that help users. Peddlers (no/yes) believe the product helps but would not use it themselves. Entertainers (yes/no) enjoy the product but acknowledge it may not improve lives. Dealers (no/no) neither use the product nor believe it helps users. This assessment is critical before launching any habit-forming feature.

```
INPUT (product_description, target_behavior, business_model)
    |
[PHASE 1: SELF-USE ASSESSMENT]
    -> Honestly evaluate whether the maker would use their own product
    |
[PHASE 2: USER BENEFIT ASSESSMENT]
    -> Evaluate whether the product materially improves the user's life
    |
[PHASE 3: MATRIX CLASSIFICATION]
    -> Place the product in the appropriate quadrant with justification
    |
[PHASE 4: ETHICS RECOMMENDATIONS]
    -> Provide actionable guidance based on classification
    |
OUTPUT: Ethics assessment report with classification and recommendations
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Description of the product and its core value proposition |
| target_behavior | string | Yes | The specific behavior the product is designed to make habitual |
| business_model | string | Yes | How the product generates revenue (ads, subscription, freemium, data, etc.) |
| hook_model | string | No | Output from the hook-model task if available |
| user_testimonials | string | No | Real user feedback about the product's impact on their lives |
| team_survey | string | No | Survey results from the product team about their own product usage |

---

## Preconditions

- The product has defined or proposed habit-forming mechanics (triggers, rewards, investments)
- The team is willing to engage in honest self-assessment, including uncomfortable conclusions
- The business model is transparent enough to evaluate alignment between user benefit and revenue
- Stakeholders understand that this assessment may result in recommendations to change or abandon certain features
- The assessment is being done proactively, not as post-hoc justification

---

## Steps

### Phase 1: Self-Use Assessment

1. Ask the core question directly: "Would the makers of this product use it themselves?" Document the honest answer
2. Survey the product team (or simulate): how many team members actively use the product for its intended purpose?
3. Distinguish between "using it because I work here" and "I would choose this product as a regular user even if I left the company"
4. Identify any cognitive dissonance: do makers rationalize non-use with excuses ("I'm not the target audience") that mask deeper concerns?
5. Evaluate whether the makers fall within the target user demographic; if not, assess whether they would use it if they did
6. Document specific reasons for self-use or non-use; vague answers are red flags
7. Apply the "family test": would you be comfortable with your family members or children developing this habit?
8. Rate self-use confidence on a scale: definitely yes, probably yes, uncertain, probably no, definitely no

### Phase 2: User Benefit Assessment

1. Ask the core question: "Does this product materially improve the user's life?" Document the honest answer
2. Define "material improvement" for this product category: time saved, money saved, health improved, relationships strengthened, knowledge gained, stress reduced
3. Gather evidence of user benefit: testimonials, outcome data, health metrics, productivity gains, or quality-of-life indicators
4. Evaluate the counterfactual: what would users do without this product? Is the alternative worse, equal, or better?
5. Assess negative externalities: does the product improve one aspect of life while degrading another (e.g., social connection at the expense of sleep)?
6. Examine the business model alignment: does the company profit more when users benefit more, or when users are more engaged regardless of benefit?
7. Identify vulnerable users: does the product disproportionately affect people who are less able to regulate their own behavior (children, people with addiction tendencies)?
8. Look for dark patterns: countdown timers creating false urgency, infinite scroll preventing natural stopping points, notification spam exploiting FOMO
9. Rate user benefit confidence: clear benefit, probable benefit, neutral, probable harm, clear harm

### Phase 3: Matrix Classification

1. Combine the self-use and user-benefit assessments to place the product in the matrix:
   - **Facilitator** (self-use: yes, benefit: yes): The product improves lives and the makers believe in it. This is the ethical ideal. Example: fitness trackers, meditation apps, educational tools
   - **Peddler** (self-use: no, benefit: yes): The makers believe it helps but would not use it. This often indicates a disconnect between the team and the users. Example: products for demographics far from the makers
   - **Entertainer** (self-use: yes, benefit: no): The makers enjoy the product but it does not materially improve lives. Not inherently unethical but should be honest about its nature. Example: casual games, entertainment platforms
   - **Dealer** (self-use: no, benefit: no): The makers neither use nor believe in the product. This is ethically indefensible for habit-forming products. Example: manipulative gambling apps, engagement-maximizing feeds with no user value
2. Document the classification with specific evidence from Phases 1 and 2
3. Identify any ambiguity: if the product sits on a boundary between quadrants, note which direction it is trending
4. Assess whether the classification changes for different user segments (power users vs. casual, adults vs. teens)
5. Compare the classification to the team's self-perception; misalignment between self-perception and assessment is common and important to surface

### Phase 4: Ethics Recommendations

1. **For Facilitators:** Affirm the ethical position but recommend ongoing vigilance:
   - Monitor for feature creep that shifts the product toward entertainment or dealing
   - Maintain user autonomy: provide usage dashboards, allow notification controls, respect time boundaries
   - Continue gathering user benefit evidence to validate the classification
2. **For Peddlers:** Recommend closing the empathy gap:
   - Have the team use the product as real users for a sustained period
   - Conduct deeper user research to understand whether the perceived benefit is real
   - Consider hiring team members who are part of the target user demographic
3. **For Entertainers:** Recommend honesty and moderation tools:
   - Be transparent that the product is entertainment, not a life-improvement tool
   - Add usage awareness features (time spent notifications, session limits)
   - Avoid dark patterns that exploit compulsion rather than genuine enjoyment
4. **For Dealers:** Recommend fundamental change:
   - This classification demands a product pivot, not incremental improvement
   - Either redesign for genuine user benefit or stop employing habit-forming mechanics
   - Consider the long-term reputational and regulatory risks of continuing
5. For all quadrants: document specific feature-level recommendations, not just strategic advice
6. Create a re-assessment schedule: when should this ethics check be repeated? (Recommended: quarterly or after major feature launches)
7. Propose accountability mechanisms: who is responsible for maintaining the ethical classification?

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| ethics_report | markdown | Complete Manipulation Matrix assessment with evidence and classification |
| matrix_visual | ascii/markdown | Visual representation of the product's position on the 2x2 matrix |
| recommendations | markdown | Specific, actionable recommendations based on the classification |
| reassessment_plan | markdown | Schedule and criteria for periodic ethics re-evaluation |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Self-use assessed | blocking | The self-use question must be answered with documented evidence, not assumption |
| User benefit assessed | blocking | User benefit must be evaluated with at least two forms of evidence or reasoned analysis |
| Classification justified | blocking | The matrix quadrant must be explicitly stated with supporting rationale |
| Recommendations provided | blocking | At least three specific, actionable recommendations must be documented |
| Honesty check | warning | The assessment should include dissenting views or uncomfortable truths, not only favorable analysis |
| Vulnerable users considered | warning | Impact on vulnerable user populations must be addressed |

---

## Handoff

- **On Facilitator classification:** Return to requesting agent with green light and monitoring recommendations
- **On Peddler classification:** Hand to @design-chief for user research strategy to close empathy gap
- **On Entertainer classification:** Hand to @nir-eyal for moderation feature design via hook-model task
- **On Dealer classification:** Escalate to @design-chief with urgent recommendation for product pivot
- **On issues:** Escalate to @design-chief
