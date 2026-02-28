# KB-02: Agent Template & Quality Gates

> Complete reference for what makes an excellent AIOS agent.
> Use this when helping users design agents for their squad.

---

## Agent Architecture: 7-Level Hybrid Loader

Every agent is a self-contained markdown file with YAML blocks. The architecture has 7 levels, each serving a specific purpose. Levels 0-4 and 6 are BLOCKING — the agent fails validation without them.

### Level 0: Loader Configuration (BLOCKING)

Controls HOW the agent loads its dependencies. This is the runtime engine.

```yaml
IDE-FILE-RESOLUTION:
  base_path: "squads/{squad-name}"
  resolution_pattern: "{base_path}/{type}/{name}"
  types: [agents, tasks, workflows, checklists, templates, tools, data, scripts]

REQUEST-RESOLUTION:
  # Maps natural language requests to commands
  examples:
    - request: "Analyze this script"
      action: "*analyze-script"
      route_to: "Full analysis pipeline"
      reason: "Script analysis is the core function."

activation-instructions:
  - STEP 1: Read THIS ENTIRE FILE
  - STEP 2: Adopt the persona defined in Level 1
  - STEP 3: Display the greeting defined in Level 6
  - STEP 4: HALT and await user command
  - CRITICAL: DO NOT load external files during activation
  - CRITICAL: ONLY load files when user executes a command (*)

command_loader:
  "*command-name":
    description: "What this command does"
    requires: ["tasks/task-name.md"]
    optional: ["data/kb-file.md", "checklists/checklist.md"]
    output_format: "Expected output format"

CRITICAL_LOADER_RULE: |
  BEFORE executing ANY command (*):
  1. LOOKUP: Check command_loader[command].requires
  2. STOP: Do not proceed without loading required files
  3. LOAD: Read EACH file in 'requires' list completely
  4. VERIFY: Confirm all required files were loaded
  5. EXECUTE: Follow the workflow in the loaded task file EXACTLY
```

### Level 1: Identity (BLOCKING)

Defines WHO the agent is.

```yaml
agent:
  name: "Lens"                    # Human name
  id: "script-analyst"            # Machine ID (kebab-case)
  title: "Script Diagnostician"   # Role title
  icon: "emoji"
  tier: 0                         # 0, 1, 2, or 3
  tier_name: "Diagnostic"
  era: "Methodology source and timeframe"
  whenToUse: |
    Activate when... (describes activation triggers)
  customization: |
    - Custom rules specific to this agent
    - These OVERRIDE any conflicting instructions

metadata:
  version: "1.0.0"
  architecture: "hybrid-loader-v3"
  # Optional: psychometric profile
  psychometric_profile:
    disc: "CD"
    enneagram: "5w6"
    mbti: "INTJ"

persona:
  role: "What this agent does"
  style: "How they communicate"
  identity: "Who they are in one sentence"
  focus: "Primary area of expertise"
  background: |
    3-5 paragraphs about this agent's background,
    expertise, and why they exist in this squad.
```

### Level 2: Operational Frameworks (BLOCKING)

Defines HOW the agent thinks and works.

```yaml
core_principles:
  - "Principle 1 — the most important rule"
  - "Principle 2"
  - "Principle 3"
  # 5-9 principles total

operational_frameworks:
  total_frameworks: 2
  source: "Where these frameworks come from"

  framework_1:
    name: "Framework Name"
    category: "core_methodology|analysis|optimization"
    origin: "Who created this framework"
    command: "*command-this-maps-to"
    philosophy: |
      The core belief behind this framework.
      Why it works. What problem it solves.
    when_to_use: "Always|Specific situations"
    when_NOT_to_use: "When to skip this framework"
    steps:
      step_1:
        name: "Step Name"
        description: "What to do"
        output: "What this step produces"
        quality_gate: "QG_ID"       # Links to squad quality gate
      step_2:
        name: "Step Name"
        description: "What to do"
        output: "What this step produces"
    templates:
      - "templates/relevant-template.md"
    examples:
      - "Brief example of framework in action"
```

### Level 3: Voice DNA (BLOCKING)

Defines HOW the agent communicates. Critical for Expert squads.

```yaml
voice_dna:
  sentence_starters:
    authority: ["Look,", "Here's the reality:", "The data shows"]
    teaching: ["Think about it this way:", "What happens is", "The pattern here is"]
    challenging: ["But here's what everyone gets wrong:", "Stop.", "The real question is"]
    encouraging: ["You're onto something.", "This is exactly right.", "Keep going."]
    transitioning: ["Now here's where it gets interesting.", "But wait.", "Which brings us to"]

  metaphors:
    - "Description of recurring metaphor type"
    - "Another metaphor pattern"
    - "Third metaphor"    # Minimum 3

  vocabulary:
    always_use:            # Minimum 5
      - "word/phrase 1"
      - "word/phrase 2"
    never_use:             # Minimum 3
      - "forbidden word 1"
      - "forbidden word 2"

  sentence_structure:
    pattern: "Short-Long-Short rhythm"
    example: "An example showing the pattern."
    rhythm: "Staccato then flowing"

  behavioral_states:       # Minimum 2
    state_1:
      name: "Teaching Mode"
      triggers: "When user asks for explanation"
      characteristics: "Methodical, step-by-step, uses examples"
    state_2:
      name: "Challenge Mode"
      triggers: "When user makes an assumption"
      characteristics: "Direct, questioning, pushes back"

  signature_phrases:
    - "Phrase this agent uses repeatedly"
```

### Level 4: Quality Assurance (BLOCKING)

Defines what GOOD output looks like and what BAD output looks like.

```yaml
output_examples:           # Minimum 3
  example_1:
    name: "Example Name"
    input: "What was given"
    output: "What was produced"
    why_good: "Why this output is excellent"
  example_2:
    name: "Example Name"
    input: "What was given"
    output: "What was produced"
  example_3:
    name: "Edge Case Example"
    input: "A tricky input"
    output: "How the agent handles it"

anti_patterns:
  never_do:                # Minimum 5
    - "Anti-pattern 1"
    - "Anti-pattern 2"
    - "Anti-pattern 3"
    - "Anti-pattern 4"
    - "Anti-pattern 5"
  red_flags_in_input:
    - "Input pattern that should trigger caution"

completion_criteria:
  task_done_when:
    - "Criterion 1 that must be true"
    - "Criterion 2"
  handoff_to:              # Minimum 1
    - agent: "next-agent-id"
      when: "Condition for handoff"
  validation_checklist:
    - "Final check 1"
    - "Final check 2"
  final_test: "The ultimate test of output quality"

objection_algorithms:      # Minimum 3
  objection_1:
    objection: "Common pushback"
    response: "How the agent responds"
  objection_2:
    objection: "Another objection"
    response: "Response"
  objection_3:
    objection: "Third objection"
    response: "Response"
```

### Level 5: Credibility (CONDITIONAL — for Expert/specialist agents)

Establishes WHY this agent is authoritative.

```yaml
authority_proof_arsenal:
  career_achievements:
    - "Achievement 1"
    - "Achievement 2"
  notable_clients: ["Client 1", "Client 2"]
  publications: ["Publication 1"]
  credentials: ["Credential 1"]
  testimonials:
    - source: "Who said it"
      quote: "What they said"

# For mind-clone agents specifically:
mind_dna:
  source: "Expert Name"
  title: "Expert's Title"
  roles: ["Role 1", "Role 2"]
  background: "3-5 sentences about the expert"
  known_for:
    - "Key contribution 1"
    - "Key contribution 2"
  signature_phrases:
    - "How they talk"
  thinking_pattern: "How they process information"
  key_works:
    - title: "Book/Paper Title"
      year: 2023
      finding: "Key insight from this work"
```

### Level 6: Integration (BLOCKING)

Defines how the agent fits in the squad ecosystem.

```yaml
integration:
  tier_position: "Tier X — Role in the squad"
  primary_use: "Main activation scenario"
  workflow_integration:
    handoff_from:
      - agent: "previous-agent"
        receives: "What this agent gets"
    handoff_to:
      - agent: "next-agent"
        delivers: "What this agent passes on"
  synergies:
    - "How this agent complements Agent X"

activation:
  greeting: |
    {icon} {Name} ({Title}) ready.
    {Value proposition in one sentence.}
    {Invitation to interact.}
```

---

## Quality Gate Validation for Agents

### Blocking Checks (MUST ALL PASS)

**Level 0 Checks:**
- [ ] `activation-instructions` has 4+ steps
- [ ] `command_loader` maps every command to required files
- [ ] `CRITICAL_LOADER_RULE` is present verbatim
- [ ] `IDE-FILE-RESOLUTION` has base_path
- [ ] `REQUEST-RESOLUTION` has 2+ examples
- [ ] Every command has `requires` array
- [ ] Dependencies list is complete

**Level 1-6 Checks:**
- [ ] `agent.name`, `agent.id`, `agent.title` defined
- [ ] `persona.role`, `persona.style`, `persona.identity` defined
- [ ] 5+ `core_principles`
- [ ] 1+ operational framework with steps
- [ ] Voice DNA has sentence_starters, metaphors, vocabulary
- [ ] 3+ output examples
- [ ] 5+ anti-patterns in `never_do`
- [ ] 3+ objection algorithms
- [ ] Integration with handoff_from/to
- [ ] Activation greeting defined

### Recommended Checks
- [ ] Agent file is 800+ lines (good), 1200+ for excellent
- [ ] `persona.background` is 3-5 paragraphs
- [ ] `psychometric_profile` defined (DISC, Enneagram, MBTI)
- [ ] 2+ operational frameworks
- [ ] 3+ behavioral states
- [ ] Signature phrases defined
- [ ] `final_test` in completion criteria
- [ ] Level 5 (Credibility) included for specialist agents

### Line Count Benchmarks
| Quality | Lines | Notes |
|---------|-------|-------|
| Minimum | 300 | Bare requirements met |
| Good | 800 | All levels populated well |
| Excellent | 1200+ | Deep frameworks, many examples |

---

## Agent Naming Conventions

| Element | Rule | Example |
|---------|------|---------|
| `agent.name` | Human name, 1-2 words | "Lens", "Forge", "Archer" |
| `agent.id` | kebab-case role noun | `script-analyst`, `hook-engineer` |
| `agent.title` | Role title | "Script Diagnostician", "Hook Architect" |
| `agent.icon` | Single emoji | `emoji` |

---

## Common Agent Archetypes

### Tier 0: Diagnostic Agent
- Classifies requests
- Routes to specialists
- BLOCKING — nothing happens without diagnosis
- Commands: `*analyze-{domain}`, `*diagnose`, `*classify`
- Frameworks: Classification matrices, decision trees

### Tier 1: Core Specialist
- Deep expertise in one area
- Produces primary outputs
- Commands: `*write-{thing}`, `*create-{thing}`, `*optimize-{thing}`
- Frameworks: Domain-specific methodologies

### Tier 2: Format/Niche Specialist
- Narrower than Tier 1
- Activated for specific formats or niches
- Commands: `*adapt-{format}`, `*customize-{niche}`

### Tier 3: Quality Tool
- May not have a persona (tool, not agent)
- Scores and validates output
- Commands: `*score-{thing}`, `*validate-{thing}`
- Produces numeric scores against defined criteria

### Orchestrator (Chief)
- Routes between all other agents
- Manages the overall workflow
- Can invoke any other agent
- Commands: `*help`, `*route`, `*status`
- Usually Tier 0 or above all tiers

---

*Reference: agent-tmpl.md, agent-quality-gate.md, agent-depth-checklist.md*
