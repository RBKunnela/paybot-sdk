# Squad Preparation Document (SPD)
## Generated: {YYYY-MM-DD}
## Status: READY | CONDITIONAL | DRAFT
## Prepared by: Forge (Squad Prep Room)

---

### 1. SQUAD IDENTITY

```yaml
name: "{squad-name}"
version: "1.0.0"
short-title: "{Human Readable Title}"
description: "{Full description, max 500 chars}"
domain: "{domain-name}"
author: "{Author Name}"
license: "{MIT|Apache-2.0|ISC|GPL-3.0|UNLICENSED}"
slashPrefix: "{slash-prefix}"
tags: [{tag1}, {tag2}, {tag3}]
squad-type: "{expert|pipeline|hybrid}"

aios:
  minVersion: "2.1.0"
  type: squad
```

### 2. TIER ARCHITECTURE

```yaml
orchestrator: "{chief-agent-id}"

tiers:
  tier_0:
    name: "{Diagnostic|Routing|Analysis}"
    agents:
      - "{agent-id}"
  tier_1:
    name: "{Masters|Core Specialists}"
    agents:
      - "{agent-id}"
      - "{agent-id}"
  tier_2:
    name: "{Specialists|Format Experts}"
    agents:
      - "{agent-id}"
  tier_3:                    # Optional
    name: "{Optimization|Tools}"
    agents: []
    tools:
      - "{tool-id}"
```

### 2b. COMPONENTS REGISTRY

```yaml
components:
  agents:
    - "{agent-id}.md"
  tasks:
    - "{task-name}.md"
  workflows:
    - "{workflow-name}.md"
  checklists:
    - "{checklist-name}.md"
  templates:
    - "{template-name}.md"
  tools: []
  scripts: []
```

### 3. AGENT DEFINITIONS

For each agent:

```yaml
agents:
  - id: "{agent-id}"
    name: "{Human Name}"
    title: "{Role Title}"
    icon: "{emoji}"
    tier: 0
    tier_name: "{Tier Name}"
    role: "{What this agent does -- 5-200 chars}"
    inspiration: "{Real expert name, if any}"
    domain: "{Agent's specialty}"
    frameworks:
      - name: "{Framework Name}"
        origin: "{Who created it}"
        philosophy: "{Core belief}"
        when_to_use: "{When to apply}"
        when_NOT_to_use: "{When to avoid}"
        steps:
          - "{Step 1}"
          - "{Step 2}"
          - "{Step 3}"
    commands:
      - name: "{command-name}"
        description: "{What it does}"
    anti_patterns:
      - "{What this agent should NEVER do}"
    confidence: 0.85
    handoff_rules:
      - to: "{other-agent-id}"
        when: "{Condition for handoff}"
```

### 4. TASK DEFINITIONS

```yaml
tasks:
  - name: "{task-name}"
    agent: "{owning-agent-id}"
    description: "{Task description}"
    entrada:
      - "{input-1}"
      - "{input-2}"
    saida:
      - "{output-1}"
      - "{output-2}"
    confidence: 0.88
    checklist:
      - "[ ] {Validation item 1}"
      - "[ ] {Validation item 2}"
```

### 5. MIND CLONE SOURCES (Expert Squads Only)

For each expert:

```yaml
minds:
  - expert_name: "{Expert Full Name}"
    agent_id: "{agent-based-on-this-expert}"
    domain: "{Expert's domain}"

    source_assessment:
      total_sources: {N}
      tier_1_count: {N}
      source_types: {N}
      content_volume: "{X books (Y pages) + Z hours video}"
      triangulation_confirmed: {true|false}
      go_decision: "{GO|CONDITIONAL|NO-GO}"
      conditions: ["{condition if CONDITIONAL}"]

    core_frameworks:
      - name: "{Framework Name}"
        confirmed_in_sources: ["{Source 1}", "{Source 2}", "{Source 3}"]
        steps:
          - "{Step 1}"
          - "{Step 2}"
        anti_patterns:
          - "{Common misapplication}"

    books:
      - title: "{Book Title}"
        year: {YYYY}
        status: "{consumed|partial|not-consumed}"
        pages: {N}
        relevance: "{Why this book matters}"

    other_sources:
      - title: "{Source Title}"
        type: "{interview|video|article|course|podcast}"
        tier: {1|2|3}
        duration: "{X hours|X pages}"
        key_frameworks: ["{Framework referenced}"]

    voice_indicators:
      signature_phrases:
        - "{How they typically open}"
        - "{Recurring phrase}"
      never_says:
        - "{What they'd never say}"
      tone: "{1-2 word tone description}"
      teaching_style: "{How they explain things}"
```

### 6. QUALITY GATES

```yaml
quality_gates:
  - id: "{PREFIX}_QG_001"
    name: "{Gate Name}"
    description: "{What this checks}"
    blocking: true
    minimum_score: {N}
  - id: "{PREFIX}_QG_002"
    name: "{Gate Name}"
    description: "{What this checks}"
    blocking: true
    veto: true
    minimum_score: {N}
    bypass_allowed: false
```

### 7. ROUTING

```yaml
routing:
  foundation_first: true
  entry_point: "{chief-agent-id}"
  qa_gate: "{scoring-agent-or-tool}"
  flow: |
    1. {agent} classifies the request (BLOCKING)
    2. {agent} handles the primary task
    3. {agent} validates quality (BLOCKING)
    4. Output delivered
```

### 8. VOICE & TONE (Expert Squads)

```yaml
voice:
  owner: "{Voice owner}"
  tone: "{tone description}"
  words_use: ["{word1}", "{word2}", "{word3}"]
  words_avoid: ["{word1}", "{word2}", "{word3}"]
  emotional_anchors:
    - "{anchor1}"
    - "{anchor2}"
```

### 9. WORKFLOWS (If Applicable)

```yaml
workflows:
  - name: "{workflow-name}"
    description: "{What this workflow does}"
    phases:
      - name: "{Phase 1}"
        agent: "{agent-id}"
        output: "{What this phase produces}"
        gate: "{quality-gate-id}"
      - name: "{Phase 2}"
        agent: "{agent-id}"
        output: "{What this phase produces}"
```

### 10. ADDITIONAL CONTEXT

```yaml
target_audience:
  name: "{Audience name}"
  description: "{Who they are}"

products:
  - name: "{Product name}"
    type: "{free|paid}"
    description: "{What it is}"

config:
  extends: extend
  knowledge-base: "data/{squad-name}-kb.md"

dependencies:
  squads: []
  node: []
  python: []
```

### 11. CHECKLISTS (Recommended)

```yaml
checklists:
  - name: "{checklist-name}"
    purpose: "{What this validates}"
    items:
      - "{Actionable check item 1}"
      - "{Actionable check item 2}"
```

### 12. GAPS & WARNINGS

```yaml
gaps:
  - area: "{What's missing}"
    severity: "{critical|important|nice-to-have}"
    action: "{What the user should do}"

warnings:
  - "{Any concerns about the squad design}"
```

---

**INSTRUCTIONS FOR CLAUDE CODE:**
Paste this entire document as context when talking to the Squad Creator agent (Craft).
Craft will interpret this SPD and use it to drive `*design-squad` or `*create-squad`.
All information has been pre-validated against AIOS squad requirements.
Squad type: {expert|pipeline|hybrid}
Source assessment: {GO|CONDITIONAL|NO-GO|N/A}
