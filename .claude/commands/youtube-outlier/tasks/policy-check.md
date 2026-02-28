---
task: YouTube Policy Compliance Check
responsavel: "@algorithm-expert"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - channel_type: Faceless, personal brand, or hybrid
  - content_methods: AI-generated, original footage, stock, mixed
  - monetization_status: Not yet, pending, approved
Saida: |
  - compliance_report: Policy compliance assessment
  - risk_areas: Identified policy risks
  - action_items: Steps to ensure compliance
  - disclosure_requirements: What needs to be disclosed
---

# *policy-check - YouTube Policy Compliance Audit

Comprehensive check of YouTube policy compliance, especially critical for faceless channels using AI tools. Covers Community Guidelines, Advertiser-Friendly Content Guidelines, AI Content Policy, and Monetization requirements.

## Why This Matters

One policy violation can demonetize your channel or get it terminated. For faceless channels using AI-generated content (which is the core method for AI-assisted creators), understanding the AI content policy is not optional — it's survival.

## Flow

```
1. Collect channel information
   ├── Channel type (faceless, personal brand, hybrid)
   ├── Content creation methods
   │   ├── AI-generated scripts? (default for AI-assisted creators: yes)
   │   ├── AI voiceover or human voiceover?
   │   ├── Stock footage, AI-generated visuals, or original?
   │   ├── AI-generated thumbnails?
   │   └── Any real person footage or deepfake-style content?
   ├── Monetization status
   └── Content categories

2. Community Guidelines Check
   ├── Spam and deceptive practices: No misleading metadata
   ├── Sensitive content: No harmful or dangerous content
   ├── Violent or graphic content: Check if applicable
   ├── Hateful content: Ensure none present
   ├── Harassment: Ensure none present
   └── Status: PASS / RISK / FAIL

3. Advertiser-Friendly Content Guidelines Check
   ├── Appropriate for all advertisers?
   ├── Profanity usage (avoid in first 8 seconds)
   ├── Controversial topics (handle with care)
   ├── Drug/alcohol references
   ├── Adult themes
   └── Status: PASS / RISK / FAIL

4. AI Content Policy Check (CRITICAL for AI-assisted creators)
   ├── AI-generated scripts: ALLOWED (no disclosure needed)
   ├── AI voiceover: ALLOWED (disclosure may be needed)
   ├── AI-generated visuals: ALLOWED (disclosure may be needed)
   ├── Synthetic faces/deepfakes: NOT ALLOWED (impersonation)
   ├── "Altered or synthetic" disclosure:
   │   ├── Required when: realistic-looking people, places, events
   │   ├── Not required when: clearly non-realistic content
   │   └── Location: Video description + Creator Studio toggle
   ├── Repetitious content flag:
   │   ├── Each video must be "meaningfully different"
   │   ├── Pure AI generation with no editing = risk
   │   ├── Must add unique value, commentary, or curation
   │   └── Recommended approach: AI-assisted, human-directed = SAFE
   └── Status: PASS / RISK / FAIL

5. Reused Content Policy Check
   ├── Original content only (no re-uploading others' work)
   ├── Compilation content rules
   ├── Reaction/commentary fair use considerations
   ├── Stock footage usage (commercial license required)
   └── Status: PASS / RISK / FAIL

6. Monetization Requirements Check
   ├── YPP threshold: 1,000 subs + 4,000 watch hours OR 10M Shorts views
   ├── Content eligibility for monetization
   ├── Ad-friendly content assessment
   ├── Revenue optimization readiness
   └── Status: NOT ELIGIBLE / PENDING / ELIGIBLE

7. Disclosure Requirements Summary
   ├── What needs to be disclosed
   ├── Where to disclose (description, Creator Studio)
   ├── How to word the disclosure
   └── When disclosure is NOT needed

8. Generate compliance report
```

## Elicitation Questions

```
? What content creation methods do you use?
  > AI scripts + human voiceover + stock footage (Recommended for AI-assisted creators)
    AI scripts + AI voiceover + stock footage
    AI scripts + AI voiceover + AI-generated visuals
    Fully AI-generated (all elements)
    Manual/original content only

? Is your channel currently monetized?
  > Not yet (under 1K subs or 4K watch hours)
    Applied and pending
    Yes, approved for monetization
    Demonetized (need to fix issues)

? What type of content do you create?
  > Educational / How-to
    Entertainment / Commentary
    News / Current events
    Product reviews / Comparisons
    Storytelling / Narrative
```

## Policy Compliance Report Template

```markdown
## YouTube Policy Compliance Report

**Channel:** {channel_name}
**Channel Type:** {faceless/personal/hybrid}
**Content Methods:** {methods}
**Date:** {date}

### Overall Status: {COMPLIANT / AT RISK / NON-COMPLIANT}

### Policy Breakdown

| Policy Area | Status | Risk Level | Action Needed |
|-------------|--------|------------|---------------|
| Community Guidelines | {PASS/RISK/FAIL} | {Low/Med/High} | {Yes/No} |
| Advertiser-Friendly | {PASS/RISK/FAIL} | {Low/Med/High} | {Yes/No} |
| AI Content Policy | {PASS/RISK/FAIL} | {Low/Med/High} | {Yes/No} |
| Reused Content | {PASS/RISK/FAIL} | {Low/Med/High} | {Yes/No} |
| Monetization | {status} | {Low/Med/High} | {Yes/No} |

### AI Content Disclosure Requirements
{Specific disclosure requirements and how to implement them}

### Risk Areas
1. {risk_1} — {severity} — {mitigation}
2. {risk_2} — {severity} — {mitigation}

### Action Items
- [ ] {action_1}
- [ ] {action_2}
- [ ] {action_3}

### Safe Practices (Keep Doing)
{List of current practices that are policy-compliant}

### Review Schedule
Recommended: Review policies every {X} months as YouTube updates guidelines frequently
```
