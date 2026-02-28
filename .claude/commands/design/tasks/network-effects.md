# Task: Network Effect Design

**Task ID:** network-effects
**Version:** 1.0
**Purpose:** Design network effects and solve the cold start problem for platform and social products to build long-term defensibility
**Agent:** @sean-ellis
**Mode:** Elicitation-based (interactive)
**Quality Standard:** AIOS Level

---

## Overview

Designs network effects that make the product more valuable as more users join, and creates strategies to overcome the cold start problem — the chicken-and-egg challenge that kills most network-effect businesses before they reach critical mass. Based on Andrew Chen's "The Cold Start Problem" framework and platform strategy research, this task classifies the network type, designs cold start solutions, analyzes tipping points, and builds defensibility through network effects.

```
INPUT (product_description, network_type, current_users, value_proposition)
    |
[PHASE 1: NETWORK TYPE CLASSIFICATION]
    -> Identify the network effect type and its growth dynamics
    |
[PHASE 2: COLD START STRATEGY]
    -> Design strategies to bootstrap the network from zero
    |
[PHASE 3: TIPPING POINT ANALYSIS]
    -> Model the critical mass needed for self-sustaining growth
    |
[PHASE 4: DEFENSIBILITY DESIGN]
    -> Engineer switching costs and network moats for long-term protection
    |
OUTPUT: Network effect blueprint with cold start playbook, tipping point model, and defensibility strategy
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| product_description | string | Yes | Description of the product, how users interact, and the value exchange between participants |
| network_type | string | Yes | Type of network: marketplace (two-sided), social network, platform, communication tool, data network, or protocol |
| current_users | number | Yes | Current number of active users or participants on each side of the network |
| value_proposition | string | Yes | Core value proposition and how it changes as the network grows |
| network_sides | list | No | For multi-sided networks: description of each side (buyers/sellers, creators/consumers, etc.) |
| geographic_scope | string | No | Whether the network is local, regional, national, or global |
| competitor_networks | list | No | Existing networks competing for the same users |
| single_player_value | string | No | Value the product provides to a single user with no network (if any) |

---

## Preconditions

- Product has a clear multi-user or multi-participant component where value increases with more participants
- The team understands which side(s) of the network need to be built and in what order
- There is a willingness to invest in supply-side or demand-side subsidization during the cold start phase
- The product can be launched in a constrained scope (single geography, single vertical, single community) for atomic network testing
- Competitive landscape is understood: who else is competing for the same network participants
- The business model can sustain a period of negative unit economics during network building

---

## Steps

### Phase 1: Network Type Classification
1. Classify the primary network effect type:
   - **Direct (same-side) network effects:** Each additional user makes the product more valuable for all users on the same side (messaging apps, social networks, phone system)
   - **Indirect (cross-side) network effects:** Users on one side attract users on the other side (marketplaces, app stores, payment networks)
   - **Data network effects:** More usage generates more data which improves the product for everyone (Waze, Google Search, recommendation engines)
   - **Protocol/standard network effects:** Adoption of a standard increases its value (email, USB, cryptocurrency)
   - **Local network effects:** Value depends on density within a specific geography or community (Uber, Nextdoor, Yelp)
2. Determine the network strength: how strong is the value increase per additional user? Plot a rough value-per-user curve as the network grows
3. Identify whether the network effects are positive (more users = more value) or if there are negative network effects at scale (congestion, spam, noise)
4. For multi-sided networks, identify which side is the "hard side" — the side that is harder to attract and more valuable to the network
5. Assess asymmetry: does one power user contribute as much as 10 or 100 regular users? If so, identify and profile these "atomic units"
6. Determine the "atomic network" — the smallest possible network that is self-sustaining and delivers value (e.g., one office for Slack, one neighborhood for Nextdoor, one city for Uber)
7. Document the network effect thesis: why this product will benefit from network effects and how strong the effect is expected to be

### Phase 2: Cold Start Strategy
1. Design the "come for the tool, stay for the network" strategy: what standalone single-player value can attract initial users before the network exists
2. Select the cold start approach based on the network type:
   - **Seeding strategy:** Manually recruit or create initial supply (Reddit founding team creating content, PayPal sending checks)
   - **Single-player mode:** Build a valuable tool that works without the network (Instagram filters, Delicious bookmarking)
   - **Marquee supply:** Recruit a small number of high-value supply-side participants that attract demand (exclusive restaurants on OpenTable)
   - **Subsidization:** Pay one side to participate until the other side grows (Uber driver guarantees, credit card rewards)
   - **Community hijacking:** Build on top of an existing network and migrate users (Facebook from Harvard, Airbnb from Craigslist)
   - **Constraint strategy:** Launch in a deliberately small, high-density scope to reach critical mass quickly (one campus, one city, one vertical)
3. Design the launch sequence: which side to build first, which community or geography to target, and how to create a concentrated pocket of activity
4. Define the minimum viable network: the smallest group of users that creates enough value to retain without subsidization
5. Plan the early user experience: how do the first 10, 100, and 1000 users experience value when the network is sparse
6. Design fake-it-til-you-make-it tactics (ethically): curated content, concierge service, manual matching, or partnerships that simulate network density
7. Create the supply-demand balance plan: how to maintain equilibrium as the network grows to prevent one side from degrading the experience
8. Define the metrics to track during cold start: supply-to-demand ratio, match rate, time-to-match, usage frequency per user, organic vs subsidized activity

### Phase 3: Tipping Point Analysis
1. Define the tipping point: the moment when the network becomes self-sustaining and organic growth exceeds churn without ongoing subsidization
2. Model the tipping point quantitatively: at what number of users on each side does the network generate enough value to drive organic acquisition above the churn rate
3. Identify the leading indicators that predict approach to tipping point:
   - Organic signup rate increasing relative to paid/subsidized signups
   - User-to-user engagement increasing without prompting
   - Time-to-value decreasing as the network densifies
   - Retention curves flattening at a healthy level
4. Map the growth phases: Phase 1 (cold start, manual effort), Phase 2 (early traction, mixed organic/paid), Phase 3 (approaching tipping point, increasing organic), Phase 4 (post-tipping point, self-sustaining growth)
5. Identify the "escape velocity" metrics: the growth rate at which network effects compound faster than churn erodes the user base
6. Model the risk of "network collapse" — the inverse tipping point where if the network drops below a critical mass, it enters a death spiral
7. For local network effects, determine whether to pursue a "city-by-city" or "thin layer everywhere" expansion strategy; model the trade-offs
8. Create a milestone roadmap: specific user counts, density metrics, and engagement thresholds that indicate progression through each growth phase

### Phase 4: Defensibility Design
1. Design the switching cost architecture: what makes it progressively harder for users to leave as they invest more in the network
   - **Content lock-in:** User-generated content, history, reputation, ratings, reviews
   - **Social graph lock-in:** Relationships, connections, followers, groups
   - **Integration lock-in:** Connected tools, workflows, data, and customizations
   - **Economic lock-in:** Earned credits, status levels, marketplace history, accumulated benefits
2. Identify multi-homing risk: can users easily participate in a competing network simultaneously? If so, design features that reward exclusive or primary usage
3. Design network bridging: how to connect sub-networks (communities, geographies, verticals) to create a larger unified network with stronger effects
4. Plan for "network quality" at scale: moderation, curation, trust/safety, and relevance algorithms that prevent negative network effects from degrading value
5. Design data network effects if applicable: how does accumulated usage data improve the product in ways that a new competitor cannot replicate quickly
6. Assess vulnerability to "cherry-picking" — can a competitor target and peel off the most valuable segment of the network? Design defenses
7. Create the defensibility scorecard: rate the network moat on switching costs (1-10), network effect strength (1-10), data advantages (1-10), and multi-homing resistance (1-10)
8. Define the long-term network strategy: how does the network evolve over 1, 3, and 5 years? What adjacent network effects could be added?

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| network_classification | markdown | Network type analysis with effect strength, atomic network definition, and hard-side identification |
| cold_start_playbook | markdown | Complete cold start strategy with launch sequence, minimum viable network, and early user experience design |
| tipping_point_model | markdown | Quantitative tipping point analysis with growth phases, milestones, and leading indicators |
| defensibility_strategy | markdown | Switching cost architecture, multi-homing defenses, and long-term network moat plan |
| network_metrics_dashboard | markdown | Key metrics to track across cold start, growth, and maturity phases |

---

## Validation

| Criterion | Type | Description |
|-----------|------|-------------|
| Network type classified | blocking | The network effect type must be identified with strength assessment and atomic network definition |
| Cold start strategy defined | blocking | At least 2 cold start tactics must be designed with launch sequence and minimum viable network |
| Tipping point modeled | blocking | The tipping point must be estimated quantitatively with leading indicators defined |
| Defensibility assessed | blocking | Switching costs and network moat must be designed with a scored defensibility assessment |
| Ethical constraints respected | blocking | Cold start tactics must not involve deceptive practices (fake users, fabricated activity, misleading density) |
| Multi-homing addressed | warning | Strategy should account for the risk of users participating in competing networks |
| Negative effects mitigated | warning | Plan should address potential negative network effects at scale (spam, congestion, quality degradation) |

---

## Handoff

- **On completion:** Hand to @pm for story creation to implement cold start and network growth mechanics
- **On viral loop design needs:** Hand to @sean-ellis for viral-loop task to engineer sharing mechanics
- **On growth engine context needed:** Hand to @sean-ellis for growth-engine task to map the full AARRR funnel
- **On issues:** Escalate to @design-chief
