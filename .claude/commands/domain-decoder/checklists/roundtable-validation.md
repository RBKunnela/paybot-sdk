# Checklist: Roundtable Validation Protocol

**Checklist ID:** DD-CL-002
**Version:** 1.0
**Purpose:** Ensure every Roundtable debate session meets the quality and integrity standards required for the Domain Decoder validation protocol. Applied before each debate batch begins and after each debate batch concludes.
**Owner:** validation-arbiter
**Invoked By:** `tasks/phase-5-validate.md` (Step 5.2) and `tasks/roundtable-debate.md` (all invocations)
**Related Task:** roundtable-debate.md

---

## PRE-DEBATE CHECKLIST

Complete before starting each Roundtable debate session.

### Setup

- [ ] Finding IDs to be debated are valid — all exist in their source catalog file
- [ ] Source catalog file is the LATEST version (post-extraction, pre-roundtable)
- [ ] Batch size is **<= 10 findings** per debate round
- [ ] Batch is coherent — findings in the same batch share a bounded context or thematic group
- [ ] Relevant source code files are accessible for evidence verification (Read tool available)

### Routing Verification

- [ ] Fast-track check completed for all findings in the batch:
  - [ ] Findings with **>= 5 independent source types** have been routed to fast-track (no debate needed)
  - [ ] L1–L4 findings with HIGH confidence have been routed to fast-track
  - [ ] Entity attributes with direct schema source (NOT NULL, explicit type) have been routed to fast-track
  - [ ] Only findings that genuinely require debate remain in the batch

### Propositor Readiness

- [ ] Propositor agent is identified (who extracted the finding?)
- [ ] Propositor has access to all original evidence references from the finding's source entry
- [ ] Propositor statement template is ready (from `roundtable-debate.md` format)

---

## DURING DEBATE: ROUND 1 (PROPOSITOR STATEMENT)

Validate the Propositor statement before proceeding to Round 2.

- [ ] Propositor cited **>= 2 independent evidence sources** (MANDATORY — if not met, finding auto-defers)
- [ ] Every evidence citation includes: **file path + line number** (not just "somewhere in billing module")
- [ ] Finding is stated in plain English using domain terminology (no variable names, no function names)
- [ ] Propositor clearly states the **current confidence level** and the basis for it
- [ ] Propositor disclosed any **known gaps** in the evidence (e.g., "rationale inferred, not stated in comments")
- [ ] No circular reasoning used (e.g., "it's a rule because it's in the rules file")
- [ ] No appeals to authority without evidence (e.g., "this is obviously a business rule")

---

## DURING DEBATE: ROUND 2 (DEVIL'S ADVOCATE CHALLENGE)

Validate the Devil's Advocate challenge before Arbiter resolution.

- [ ] DA provided **>= 1 challenge with evidence** (opinion-only challenges are invalidated)
- [ ] DA challenge is classified by type:
  - [ ] `alternative_interpretation` — same code, different business meaning
  - [ ] `missing_evidence` — evidence that should exist but doesn't
  - [ ] `contradiction` — conflicts with another extracted finding
  - [ ] `scope_error` — rule stated too broadly or too narrowly
  - [ ] `dead_code` — code implementing the rule is unreachable or deprecated
- [ ] DA did NOT challenge with generic skepticism ("I doubt this is right" = invalid)
- [ ] DA challenge count is **<= 5** per batch (time-box enforcement)
- [ ] If DA identifies a contradiction with another finding: that finding is flagged for cross-debate

---

## DURING DEBATE: ROUND 3 (ARBITER RESOLUTION)

Complete before writing the final verdict.

- [ ] Arbiter evaluated the Propositor's evidence strength (not just presence)
- [ ] Arbiter evaluated each DA challenge individually — not as a group
- [ ] Arbiter selected exactly one verdict per finding: `accepted`, `accepted_revised`, `rejected`, or `deferred`
- [ ] Arbiter documented **reasoning** — not just the verdict label
- [ ] If verdict is `accepted_revised`: revised finding text is written out in full
- [ ] If verdict is `rejected`: reason for rejection is documented in `disputed-findings.yaml`
- [ ] If verdict is `deferred`: specific evidence needed to resolve the finding is documented
- [ ] Arbiter did NOT change a verdict after it was recorded in the transcript

---

## POST-DEBATE CHECKLIST

Complete after each debate session.

### Triangulation Confirmation

- [ ] Final confidence label matches source count rule:
  - [ ] `HIGH` = **>= 3** independent source types confirmed
  - [ ] `MEDIUM` = **2** independent source types confirmed
  - [ ] `LOW` = **1** source type only
- [ ] Downgrade rule applied if finding was revised during Roundtable (HIGH → MEDIUM, MEDIUM → LOW)
- [ ] Cap applied if evidence includes ONLY comments (maximum MEDIUM — comments are the most uncertain source)
- [ ] `integration_risk` flag applied if finding spans 2+ bounded contexts without an Anti-Corruption Layer

### Confidence Scoring

- [ ] Per-finding confidence score computed using 5-dimension formula:
  - [ ] `completeness × 0.30` — covers all edge cases from the code
  - [ ] `accuracy × 0.25` — correctly describes what the code does
  - [ ] `clarity × 0.20` — understandable by a non-technical business analyst
  - [ ] `traceability × 0.15` — can be traced to specific source file and line
  - [ ] `confidence_label × 0.10` — HIGH=1.0, MEDIUM=0.6, LOW=0.2

### Human Review Flagging

- [ ] All `LOW` confidence findings after Roundtable are flagged for human review
- [ ] All `deferred` findings are in `disputed-findings.yaml` with resolution requirements
- [ ] All escalated disputes (Propositor disagrees with verdict) are flagged for chief review
- [ ] Findings with no test evidence that are L5 business rules are flagged with warning

### Transcript Integrity

- [ ] Debate transcript written to `outputs/{repo-name}/roundtable/{batch_id}-transcript.yaml`
- [ ] Transcript contains: debate_id, batch_id, finding_ids, propositor statement, DA challenge, arbiter verdict
- [ ] Transcript is COMPLETE — no partial debates left unresolved
- [ ] Transcript is IMMUTABLE — not edited after writing (new debates open new transcripts)
- [ ] Source catalog updated with final confidence labels and verdicts

### Batch Metrics

- [ ] Rejection rate for this batch is calculated and recorded
- [ ] If batch rejection rate > 30%: flagged for chief review (may indicate extraction methodology issue)
- [ ] Total findings processed, accepted, revised, rejected, and deferred counted
- [ ] Metrics added to `validation-report.yaml`

---

## AGGREGATE VALIDATION CHECKLIST

Complete after ALL Roundtable sessions for a full-decode run.

- [ ] All L5 business rule findings have been either debated OR fast-tracked (none skipped)
- [ ] All L6 bounded context boundary decisions have been debated
- [ ] All L7 business model findings have been debated
- [ ] All contradictions between findings have been resolved (no unresolved contradictions)
- [ ] Overall rejection rate across all batches is **<= 30%**
- [ ] Deferred findings count is documented and communicated to the user
- [ ] Coverage metrics computed across all 4 dimensions (entry point, test-implied, entity, conditional)
- [ ] Composite coverage score **>= 0.70** (or pipeline is vetoed and re-extraction required)

---

## Quick Reference: Valid vs Invalid Debate Moves

| Action | Valid? | Notes |
|--------|--------|-------|
| Propositor cites 1 evidence source | NO | Minimum 2 sources required — auto-defers |
| Propositor cites file path without line number | WARN | Acceptable but weaker — note the imprecision |
| DA says "I'm not sure this is right" | NO | Opinion, not evidence — challenge invalidated |
| DA identifies contradicting rule BR-045 | YES | Cross-finding contradiction is valid |
| DA challenges with code observation showing edge case | YES | Evidence-backed challenge |
| Arbiter accepts finding with 0 evidence sources | PROHIBITED | System blocks this |
| Arbiter changes verdict 30 minutes later | PROHIBITED | Verdicts are immutable |
| Extending debate to Round 4 | PROHIBITED | Max 3 rounds — defer if unresolved |
| Fast-tracking a LOW confidence finding | PROHIBITED | LOW always requires debate |
| Fast-tracking finding with 5+ source types | VALID | Fast-track is correct routing |

---

*Domain Decoder Roundtable Validation Checklist v1.0*
*Applied at: Before, during, and after every Roundtable debate session*
