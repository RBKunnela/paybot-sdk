# Prioritization Quality Review Checklist

**Checklist ID:** `technique-review`
**Version:** 1.2
**Purpose:** Validate that a prioritization session was executed correctly and produced reliable results.

---

## Scoring

Each checked item = 1 point. Maximum = 16 points.

| Result | Score | Action |
|--------|-------|--------|
| **PASS** | ≥12/16 | Session results are reliable |
| **CONDITIONAL** | 9-11/16 | Review flagged items before using results |
| **FAIL** | ≤8/16 | Re-run the session addressing failed checks |

---

## Pre-Prioritization Checks (5 pts)

- [ ] **Context defined:** What we're prioritizing is clear (features, tasks, projects, problems)
  - _If failed:_ Write a single sentence: "We are prioritizing [WHAT] to decide [DECISION]." If you can't complete this sentence, the context isn't clear enough. Go back and align with the requestor.

- [ ] **Items complete:** All relevant items are included (no important ones missing)
  - _If failed:_ Ask each participant: "Is there anything missing that you'd regret not including?" Add mentioned items. If the list changed by >20%, re-evaluate technique choice.

- [ ] **Technique appropriate:** Selected technique matches the context (complexity, data, time, team)
  - _If failed:_ Run `*select-technique` with current context. If it recommends a different technique, switch before proceeding. Common mismatch: using RICE without Reach data, or AHP with <15 min available.

- [ ] **Participants aligned:** Everyone understands the technique and scoring criteria
  - _If failed:_ Do a 2-minute dry run: score 1 throwaway item together. If anyone asks "what does this dimension mean?" during the real session, alignment was insufficient.

- [ ] **Criteria defined:** Scoring criteria are clear and agreed upon (for scoring techniques)
  - _If failed:_ Write each criterion on a shared surface with its scale definition. Example: "Impact: 1 = barely noticeable, 5 = transformative." If participants define the scale differently, agree on anchors first.

## During Execution (6 pts)

- [ ] **All items scored:** Every item was evaluated — no skips
  - _If failed:_ Identify skipped items. Common cause: "we'll come back to it" (you won't). Score them now, even roughly. Incomplete scoring invalidates the ranking.

- [ ] **Differentiation exists:** Not all items received the same scores (force ranking applied)
  - _If failed:_ If >50% of items share the same score, apply forced differentiation: "Pick the top 3 from this tied group" or add a secondary dimension to break ties.

- [ ] **Scores are consistent:** Similar items received similar scores
  - _If failed:_ Find the inconsistency: two similar items scored very differently = someone changed their internal criteria mid-session. Re-score the inconsistent pair using the anchor item as reference.

- [ ] **Anchoring used:** Reference items were established for calibration
  - _If failed:_ Pick the most well-understood item, score it as a group, and use it as the reference. Then re-score any items that were evaluated before anchoring was established.

- [ ] **Bias check:** No single person dominated scoring (for group techniques)
  - _If failed:_ Switch to silent/written scoring for remaining items. Compare individual scores to group scores — if one person's scores have >0.8 correlation with the final, their voice dominated.

- [ ] **Formula correct:** Calculations verified (spot-check at least 3 items)
  - _If failed:_ Recalculate the top 3 and bottom 1 items manually. If any differ, recalculate ALL items. Common error: inconsistent scale interpretation (e.g., Effort as "effort level" vs. "person-months").

## Post-Prioritization Validation (5 pts)

- [ ] **Sanity check passed:** Top 3 priorities make intuitive sense
  - _If failed:_ Present the top 3 without scores and ask: "Would you bet your quarterly goal on these being the right priorities?" If hesitation, investigate which input dimension is off. Usually Impact or Confidence was over/under-estimated.

- [ ] **No obvious errors:** Items that should be high aren't ranked low (and vice versa)
  - _If failed:_ Identify the misranked item. Find which dimension caused it to rank wrong. Either the score on that dimension is wrong, or the technique's weighting doesn't match your context. Fix the score or add a weighted dimension.

- [ ] **Actionable output:** Clear next steps defined for top priorities
  - _If failed:_ For each top-3 item, write: "Owner: [who], Next action: [what], By: [when]." If you can't fill these fields, the prioritization produced a ranking but not an action plan. Add this step.

- [ ] **Stakeholder alignment:** Key decision-makers agree with the ranking
  - _If failed:_ Identify which items the stakeholder disagrees with. Re-score those items with stakeholder present. If disagreement persists, the criteria don't reflect their priorities — add their dimension as a weighted factor.

- [ ] **Documentation:** Results saved and shareable
  - _If failed:_ Export the scoring table + technique used + date + participants + key decisions. Save where the team can access it. Undocumented prioritization will be re-debated within a week.

## Common Pitfalls to Watch For

| Pitfall | Detection | Mitigation |
|---------|-----------|------------|
| **Recency bias** | Recent items scored higher | Ask: "Would you score this the same 2 weeks ago?" |
| **Anchoring** | First item sets the scale | Randomize item order |
| **Groupthink** | Everyone agrees too quickly | Use silent scoring before discussion |
| **HiPPO effect** | Highest-paid person's opinion dominates | Anonymous scoring round |
| **Analysis paralysis** | Can't decide on scores | Set time limit per item (2 min max) |
| **Scope creep** | Items grow during scoring | Lock the item list before starting |
| **All-high scoring** | Everything is "high priority" | Force relative ranking: "If you can only do 3, which 3?" |

## Scoring Quality Indicators

| Indicator | Good | Warning | Bad |
|-----------|------|---------|-----|
| **Score distribution** | Normal-ish spread | Bimodal (everything high or low) | All same score |
| **Confidence alignment** | High confidence = clear items | Mixed | High confidence on uncertain items |
| **Team agreement** | <20% variance between raters | 20-40% variance | >40% variance |
| **Completion rate** | 100% items scored | 90%+ items scored | <90% items scored |

## Re-Prioritization Triggers

Re-run the prioritization when:
- [ ] New information changes the context significantly
- [ ] 30+ days have passed since last prioritization
- [ ] Major items were added or removed
- [ ] Business goals or strategy changed
- [ ] Previous top priority was completed (shift remaining items up)

---

_Checklist Version: 1.2_
