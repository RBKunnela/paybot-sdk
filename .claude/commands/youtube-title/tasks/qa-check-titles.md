---
task: QA Check Titles
responsavel: "@title-qa"
responsavel_type: agent
atomic_layer: task
elicit: false
Entrada: |
  - scored_titles: Top 10 ranked titles from @title-scorer
  - title_scorecard: Complete scorecard with rankings and improvement notes
Saida: |
  - qa_report: QA report with pass/fail for each title, flagged issues, voice compliance scores, and final approved list
---

# *qa-check - QA Check Titles

## Overview

The Title QA agent is the final gate before any title reaches the audience. This agent is the guardian of the brand — ensuring every title that goes live is honest, on-voice, audience-aligned, and mechanically sound. No title ships without passing QA, no matter how high its CTR score.

The QA agent is deliberately conservative. A great CTR score means nothing if the title damages brand trust, attracts the wrong audience, or sounds like every other YouTube guru. The QA agent's job is to protect the long game — the creator's reputation, the the platform community's trust, and the Working Professional's intelligence.

Key principle: It is better to ship a good title that is 100% on-brand than a great title that is 90% on-brand. The 10% gap is where trust erodes.

## Flow

### Step 1: Receive Top 10 Scored Titles
Import the top 10 titles from @title-scorer along with their full scorecards and improvement notes. Also import alternate titles (ranked 11-15) in case QA rejects any top 10 titles and replacements are needed.

### Step 2: Banned Words Check
Scan each title against the the platform Banned Words List. ANY match is an automatic flag.

**Banned Words (immediate flag):**
- unlimited, revolutionary, passive income, get rich, hack, guru
- secret (when used as clickbait — "the secret to...")
- easy money, no work, autopilot, set and forget
- guaranteed, never fail, foolproof, risk-free
- hustle culture glorification terms: grind, crush it, beast mode
- Exaggerated superlatives: best ever, greatest, #1, ultimate (when unsubstantiated)

**Caution Words (review context, not automatic flag):**
- simple, easy, fast, quick (acceptable if qualified with honest conditions)
- free (acceptable if genuinely free, not bait-and-switch)
- money, income, revenue (acceptable with real numbers, not hype)

**Result per title**: PASS (no banned words) / FLAG (banned word found — specify which)

### Step 3: Voice DNA Compliance
Each title is evaluated against the creator's Voice DNA profile:

**Voice DNA Markers — the creator:**
- **Tone**: Direct, no-BS, no sugar-coating, but never mean or condescending
- **Register**: Conversational, like talking to a friend who happens to be smart
- **Perspective**: Family-first — everything is framed through "providing for your people"
- **Vocabulary**: Uses brand vocabulary naturally (bridge, momentum, system, foundation, build, stack)
- **Anti-patterns**: Never sounds like a guru, never sounds corporate, never sounds desperate
- **Authenticity**: Speaks from experience, not theory — "I did this" not "you should do this"

**Voice Compliance Scoring (0-100):**
- 90-100: Sounds exactly like the creator wrote it
- 70-89: Close but needs minor tone adjustment
- 50-69: Off-voice — needs rewrite to match the creator's tone
- Below 50: Does not sound like the platform at all

**Check each title for:**
- [ ] Would the creator actually say this out loud in a video?
- [ ] Does it sound like advice from a friend, not a salesperson?
- [ ] Is there at least one word from brand vocabulary? (where natural — do not force it)
- [ ] Does it avoid guru energy (hype, empty promises, manufactured urgency)?
- [ ] Does family-first framing appear where relevant?

### Step 4: Honest Promise Validation
Every title makes a promise — explicit or implied. QA verifies that promise is HONEST.

**Check each title for:**
- [ ] Can the video ACTUALLY deliver on what the title implies?
- [ ] Are any numbers in the title real and verifiable?
- [ ] Would a viewer feel SATISFIED after watching, not tricked?
- [ ] Does the title set appropriate expectations (not overselling)?
- [ ] Would the creator stand behind this title if challenged publicly?

**Result per title**: HONEST / STRETCH (slightly overpromises) / DISHONEST (fails)

Any title marked DISHONEST is automatically rejected. STRETCH titles get a specific note on how to correct.

### Step 5: Title Length Verification
YouTube truncates titles in different contexts. Optimal lengths:

- **Optimal**: 40-60 characters (fully visible on all devices)
- **Acceptable**: 61-70 characters (may truncate on mobile but core message intact)
- **Too Long**: 71+ characters (truncation risks losing the hook)
- **Too Short**: Under 30 characters (likely not enough information to compel a click)

**Additional length checks:**
- [ ] First 3 words are the most compelling (mobile truncation shows these first)
- [ ] If truncated at 50 characters, does the remaining text still make sense?
- [ ] No wasted words (every word earns its place)

### Step 6: Audience Alignment Check
Verify each title speaks to the Working Professional:

**Target Audience Profile:**
- Age: 30+, likely 30-45
- Situation: Corporate job, family, paycheck to paycheck or close to it
- Mindset: Feels trapped, wants a bridge out, risk-averse because family depends on them
- Intelligence: Smart — they are corporate professionals, not naive
- Emotional state: Frustrated, cautious, skeptical of "opportunities"

**Check each title for:**
- [ ] Would a 35-year-old corporate worker with a family find this relevant?
- [ ] Does it respect their intelligence (no dumbing down, no condescension)?
- [ ] Is it honest about timelines and effort (no "get rich overnight" energy)?
- [ ] Does it acknowledge their constraints (time, money, risk tolerance)?
- [ ] Would they feel comfortable if a coworker saw this in their browser history?

### Step 7: Voice Compliance Score
Calculate a final voice compliance score for each title (0-100):

```
Voice Score = (Banned Words: 0 or -30) +
              (Voice DNA Match: 0-40) +
              (Honest Promise: 0-20) +
              (Length Compliance: 0-10) +
              (Audience Alignment: 0-20)

Adjusted base: Start at 100, subtract deductions
```

### Step 8: Flag Issues and Recommend Fixes
For any title that does not achieve a clean PASS, provide:
- The specific issue
- The severity (BLOCK = cannot ship, WARN = can ship with note, INFO = minor suggestion)
- A recommended fix

### Step 9: Compile QA Report

## Output Format

```markdown
# Title QA Report
**Topic**: [topic]
**Date**: [date]
**QA Agent**: @title-qa
**Titles Evaluated**: 10
**Titles Approved**: [count]
**Titles Flagged**: [count]
**Titles Rejected**: [count]

## QA Results

### Title 1: "[title text]"
**CTR Score**: [from scorer] | **Voice Score**: [x]/100
| Check | Result | Notes |
|-------|--------|-------|
| Banned Words | PASS/FLAG | [details if flagged] |
| Voice DNA | [score]/40 | [notes] |
| Honest Promise | HONEST/STRETCH/DISHONEST | [details] |
| Title Length | [count] chars — OPTIMAL/ACCEPTABLE/TOO LONG | [truncation note] |
| Audience Alignment | PASS/WARN | [details] |
**Overall**: APPROVED / REVISE / REJECTED
**Issues**: [list any issues]
**Fix**: [recommended fix if needed]

### Title 2: "[title text]"
[same structure]

... [continue for all 10]

## Final Approved List
| Rank | Title | CTR Score | Voice Score | Status |
|------|-------|-----------|-------------|--------|
| 1 | "[title]" | [x]/100 | [x]/100 | APPROVED |
| 2 | ... | ... | ... | ... |
...

## Rejected / Revision Needed
| Title | Issue | Severity | Recommended Fix |
|-------|-------|----------|-----------------|
| "[title]" | [issue] | BLOCK/WARN | [fix] |
...

## Replacement Titles (from alternates)
[If any top 10 titles were rejected, pull from alternates 11-15 and QA those]

## QA Summary
- **Approval Rate**: [x]/10 titles passed
- **Most Common Issue**: [pattern in flagged issues]
- **Voice Compliance Average**: [average score]/100
- **Recommendation**: [overall assessment — ready to ship, needs revision pass, etc.]
```

## Examples

### Example: QA Result for one title

**Title**: "The 4-hour weekend system that got me 100K subscribers without showing my face"
**CTR Score**: 81.5/100

| Check | Result | Notes |
|-------|--------|-------|
| Banned Words | PASS | No banned words detected |
| Voice DNA | 35/40 | "system" is brand vocabulary. Direct, experiential tone. Slight concern: "got me" could be slightly more on-brand as "built me" |
| Honest Promise | HONEST | If the creator actually has 100K subs on a faceless channel, this is fully truthful |
| Title Length | 71 chars — ACCEPTABLE (borderline) | Truncates after "...100K subscribers" on mobile — hook survives |
| Audience Alignment | PASS | Weekend system = respects time constraints. "Without showing my face" = addresses camera fear. Speaks directly to corporate worker building on the side |

**Voice Score**: 92/100
**Overall**: APPROVED
**Issues**: Length is 1 character over acceptable range
**Fix**: Consider "The 4-hour weekend system behind my 100K faceless channel" (58 chars) — tighter, same impact

### Example: QA Rejection

**Title**: "The secret YouTube hack that guarantees passive income"
**CTR Score**: 65/100

| Check | Result | Notes |
|-------|--------|-------|
| Banned Words | FLAG | "secret" (clickbait usage), "hack", "guarantees", "passive income" — 4 banned words |
| Voice DNA | 8/40 | Sounds like a guru ad, not the creator |
| Honest Promise | DISHONEST | Nothing "guarantees" income. "Passive" is misleading for YouTube |
| Title Length | 54 chars — OPTIMAL | Length is fine |
| Audience Alignment | WARN | Would make a 35-year-old professional cringe |

**Voice Score**: 18/100
**Overall**: REJECTED
**Issues**: Multiple banned words, dishonest promise, off-brand voice
**Fix**: Complete rewrite required — this title cannot be salvaged
