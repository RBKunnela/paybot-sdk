# Task: Investment Loop Design

**Task ID:** investment-loop
**Version:** 1.0
**Purpose:** Design how users invest stored value into the product, improving their future experience and loading the next trigger in the Hook cycle
**Agent:** @nir-eyal
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Designs the Investment phase of the Hook Model — the critical step where users put something into the product that makes it better for next time. Unlike the Action phase (which delivers immediate reward), the Investment phase asks users to contribute effort in anticipation of future benefit. This stored value creates switching costs, improves the product through personalization, and most importantly loads the next trigger that re-starts the Hook cycle. Investments can take the form of data, content, reputation, skill, or social connections. The key principle: the more users invest, the harder it is to leave, and the better the product becomes — creating a virtuous cycle of increasing engagement.

```
INPUT (product_description, user_actions, stored_value_types)
    |
[PHASE 1: VALUE STORE IDENTIFICATION]
    -> Identify all forms of stored value: data, content, reputation, skill
    |
[PHASE 2: INVESTMENT EFFORT DESIGN]
    -> Design investment actions that feel natural and are appropriately effortful
    |
[PHASE 3: NEXT TRIGGER LOADING]
    -> Ensure each investment loads the next external or internal trigger
    |
[PHASE 4: COMPOUND VALUE MAPPING]
    -> Map how accumulated investments create compounding returns
    |
OUTPUT: Investment loop design with value map and trigger loading mechanics
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Description of the product and its core interaction loop |
| user_actions | string | Yes | The actions users currently perform within the product |
| stored_value_types | string | Yes | Types of value users currently store in the product (data, content, connections, etc.) |
| hook_phases | string | No | Output from hook-model task with trigger, action, and reward already defined |
| churn_data | string | No | Data on why users leave and what they lose when they do |
| competitive_switching | string | No | Information about ease of switching to competitors |

---

## Preconditions

- The product has a defined core action and reward cycle (even if informal)
- Users perform at least one action that could be considered an investment (contributing data, content, preferences, or social connections)
- The team understands the distinction between the action (done for immediate reward) and the investment (done for future benefit)
- The product has persistence: user contributions are stored and accessible across sessions
- The team is committed to investments that genuinely improve the user experience, not just create lock-in

---

## Steps

### Phase 1: Value Store Identification

1. **Data investments** — Identify all user data that improves the product:
   - Preferences and settings (language, theme, notification preferences)
   - Behavioral data (usage patterns that power recommendations, search history, watch history)
   - Personal information (profile data, linked accounts, saved addresses)
   - Assess: how much does each data type improve the next experience? Quantify where possible
2. **Content investments** — Identify all user-generated content:
   - Created content (posts, reviews, photos, videos, documents, playlists)
   - Curated content (saved items, bookmarks, collections, boards, organized libraries)
   - Annotations (comments, highlights, notes, tags)
   - Assess: is the content portable (can users take it elsewhere) or trapped (locked into this product)?
3. **Reputation investments** — Identify all social capital users build:
   - Follower/following networks and connections
   - Ratings, reviews, and credibility scores
   - Achievements, badges, and status indicators
   - Professional history and endorsements
   - Assess: how transferable is this reputation to competing platforms?
4. **Skill investments** — Identify all learned behaviors and expertise:
   - Platform-specific skills (keyboard shortcuts, workflow knowledge, advanced features mastered)
   - Community norms and language (understanding how the platform works socially)
   - Integration knowledge (connected tools, automations, custom setups)
   - Assess: how steep is the learning curve, and does mastery create meaningful switching costs?
5. Rank all value stores by three criteria:
   - Accumulation rate: how quickly does the value grow?
   - Switching cost: how much would the user lose by leaving?
   - Experience improvement: how much does this value improve the product for the user?
6. Identify value store gaps: where could the product store user value but currently does not?

### Phase 2: Investment Effort Design

1. Define the timing of investment requests: investments should come AFTER the reward, when user motivation is at its peak (the "post-reward glow")
2. Design investment actions that feel like natural extensions of usage, not separate tasks:
   - After consuming content: "Rate this" or "Save for later"
   - After completing a task: "Set the next one" or "Share your result"
   - After social interaction: "Follow this person" or "Add to contacts"
3. Calibrate effort level using the progressive commitment principle:
   - First visit investments: near-zero effort (accept a default, allow a permission)
   - Returning user investments: low effort (customize a setting, follow a topic)
   - Committed user investments: moderate effort (create content, invite friends, build a profile)
   - Power user investments: high effort (build workflows, mentor others, create integrations)
4. Design the "first investment" carefully: it must be so easy the user does it without thinking, but valuable enough to improve their next visit noticeably
5. Apply the IKEA Effect: users value things they helped create more than identical pre-made alternatives; design investments where users feel ownership of the result
6. Avoid investment fatigue: do not ask for too many investments in a single session; one meaningful investment per session is better than five trivial ones
7. Document each investment action with its effort level, timing, and expected user motivation at that moment

### Phase 3: Next Trigger Loading

1. For each investment action, define exactly how it loads the next trigger:
   - Content creation triggers notifications when others engage ("Someone liked your post")
   - Following a user triggers updates when they post new content
   - Setting a reminder triggers a future notification at the specified time
   - Inviting a friend triggers a notification when they join
   - Saving an item triggers a digest email of saved items
2. Map the trigger loading timeline: how long after the investment does the next trigger fire?
   - Immediate loading (seconds to minutes): social interactions, real-time content
   - Short-delay loading (hours): digest emails, daily summaries
   - Long-delay loading (days to weeks): re-engagement campaigns, milestone notifications
3. Design trigger reliability: every investment should produce a trigger; if the user invests and nothing comes back, the loop breaks
4. Create fallback triggers for low-activity scenarios: if the user invests (e.g., posts content) but no organic trigger fires (no one responds), design a synthetic trigger ("Your post has been viewed 10 times")
5. Ensure trigger relevance: the loaded trigger must be related to the investment, not generic marketing; users should feel the connection between what they put in and what came back
6. Design trigger escalation: as users invest more, triggers should become more personalized and valuable
7. Map the complete investment-to-trigger chain for each investment type in a table format

### Phase 4: Compound Value Mapping

1. Model the compound value curve: how does the product improve with each successive investment?
   - Linear compounding: each investment adds equal value (e.g., each saved article is equally useful)
   - Exponential compounding: investments create network effects (e.g., each connection multiplies the value of existing connections)
   - Logarithmic compounding: early investments are most valuable, with diminishing returns (e.g., initial preferences improve recommendations dramatically, later ones less so)
2. Identify the "investment threshold": the point at which enough value is stored that leaving becomes genuinely costly
3. Design visibility of accumulated value: users should see and feel their investment growing
   - Progress indicators and statistics
   - "Your account is worth X" or "You've contributed Y"
   - Historical timelines showing growth over time
4. Create the "what you'd lose" awareness (used ethically, not as a guilt mechanism):
   - Data export options that show volume of accumulated data
   - Account summary showing investment history
   - Comparison of personalized experience vs. new-user experience
5. Design cross-investment synergies: how do different value stores enhance each other?
   - Content + reputation = higher visibility for created content
   - Data + skill = more powerful personalized workflows
   - Social connections + content = richer feed and engagement
6. Plan for value portability: ethical products allow data export; this paradoxically increases trust and reduces churn
7. Create a compound value map showing each investment type, its compounding model, threshold, and visibility mechanism

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| investment_design | markdown | Complete investment loop design with all value stores and effort calibration |
| value_store_map | markdown | Visual mapping of all stored value types with accumulation and switching cost ratings |
| trigger_loading_matrix | markdown | Matrix connecting each investment action to the trigger it loads |
| compound_value_model | markdown | Model showing how accumulated investments create compounding product value |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Value stores identified | blocking | At least two distinct value store types must be documented with specific examples |
| Investment timing correct | blocking | Investments must be designed to occur after the reward phase, not before or during |
| Trigger loading verified | blocking | Every investment action must load at least one identifiable next trigger |
| Effort calibrated | blocking | Investment effort must be graduated across the user lifecycle, not one-size-fits-all |
| Compound value modeled | warning | The compounding behavior of at least one value store should be modeled |
| Ethical switching costs | warning | Switching costs should come from genuine accumulated value, not artificial lock-in |

---

## Handoff

- **On completion:** Hand to @nir-eyal for hook-model integration as the investment phase of the Hook
- **On data architecture needs:** Hand to @dev for technical design of value storage and trigger loading systems
- **On retention strategy:** Hand to @design-chief for broader product retention review
- **On issues:** Escalate to @design-chief
