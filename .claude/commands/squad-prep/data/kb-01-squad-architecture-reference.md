# KB-01: Squad Architecture Reference

> Complete technical reference for AIOS squad structure, schemas, and validation rules.
> Use this when designing squad structure in the SPD.

---

## Squad Directory Structure

Every squad lives in `./squads/{squad-name}/` with this structure:

```
squads/my-squad/
  squad.yaml              # Manifest (REQUIRED)
  README.md               # Documentation (REQUIRED)
  config/
    coding-standards.md    # Or reference to project-level
    tech-stack.md
    source-tree.md
  agents/                  # Agent definitions (.md files)
  tasks/                   # Task definitions (.md files)
  workflows/               # Multi-step workflow definitions
  checklists/              # Validation checklists
  templates/               # Document/output templates
  tools/                   # Tool scripts (non-persona agents)
  scripts/                 # Utility scripts
  data/                    # Knowledge base files, static data
```

---

## squad.yaml Schema (Complete)

### Required Fields
```yaml
name: "kebab-case-name"     # 2-50 chars, pattern: ^[a-z0-9-]+$
version: "1.0.0"            # Semver pattern: ^\d+\.\d+\.\d+$
```

### Recommended Fields
```yaml
short-title: "Human Readable Title"    # max 100 chars
description: "What this squad does"    # max 500 chars
author: "Author Name"
license: "MIT"                         # MIT|Apache-2.0|ISC|GPL-3.0|UNLICENSED
slashPrefix: "squad-prefix"            # kebab-case, used for /prefix-* commands

aios:
  minVersion: "2.1.0"
  type: squad

tags: [keyword1, keyword2]
```

### Tier Architecture
```yaml
orchestrator: "{chief-agent-id}"

tiers:
  tier_0:
    name: "Diagnostic & Analysis"
    agents:
      - "{diagnostic-agent}"
  tier_1:
    name: "Core Specialists"
    agents:
      - "{specialist-1}"
      - "{specialist-2}"
  tier_2:
    name: "Format Specialists"
    agents:
      - "{narrow-specialist}"
  tier_3:                          # Optional
    name: "Optimization"
    agents:
      - "{optimizer}"
    tools:                         # Non-persona scripts
      - "{tool-name}"
```

### Components Registry
```yaml
components:
  agents:                          # Agent definition files
    - agent-name.md
  tasks:                           # Task files (PRIMARY — task-first!)
    - task-name.md
  workflows:
    - workflow-name.md
  checklists:
    - checklist-name.md
  templates:
    - template-name.md
  tools: []
  scripts: []
```

### Config Inheritance
```yaml
config:
  extends: "extend"                # extend|override|none
  coding-standards: "config/coding-standards.md"
  tech-stack: "config/tech-stack.md"
  source-tree: "config/source-tree.md"
  knowledge-base: "data/squad-name-kb.md"   # Optional KB reference
```

### Quality Gates
```yaml
quality_gates:
  - id: "PREFIX_QG_001"
    name: "Gate Name"
    description: "What this checks"
    blocking: true                 # Stops workflow if failed
    minimum_score: 7.0             # Numeric threshold
  - id: "PREFIX_QG_002"
    name: "Veto Gate"
    description: "Auto-fail dimension"
    blocking: true
    veto: true                     # Auto-fail regardless of composite score
    minimum_score: 7.0
    bypass_allowed: false          # Explicitly no bypass
```

### Routing
```yaml
routing:
  foundation_first: true|false      # true = diagnostic blocks first; false = orchestrator routes directly
  entry_point: "{chief-agent}"
  qa_gate: "{scoring-agent-or-tool}"
  flow: |
    1. {agent} classifies the request (BLOCKING)
    2. Appropriate specialist handles the task
    3. {qa-agent} validates quality (BLOCKING)
```

### Voice Configuration
```yaml
voice:
  owner: "Voice owner name"
  tone: "direct, no-BS, mentor"
  words_use: [word1, word2, word3]
  words_avoid: [word1, word2, word3]
  emotional_anchors:
    - "anchor description 1"
    - "anchor description 2"
```

### Target Audience & Products (Optional)
```yaml
target_audience:
  name: "Audience segment name"
  age: "30+"
  situation: "Description of their situation"
  psychology: "What motivates them"
  test: "A psychological test for this audience"

products:
  - name: "Product Name"
    type: "free|paid"
    description: "What it is"
```

### Dependencies
```yaml
dependencies:
  node: []                         # npm packages
  python: []                       # pip packages
  squads: []                       # Other squads this depends on

mcps: {}                           # MCP server configurations
integration: {}                    # Integration configurations
```

**Note:** `additionalProperties: true` — the schema allows custom fields beyond what's defined. Squads like `family-specialist` use this for `specialists` sections.

---

## Squad Design Blueprint Schema

When using `*design-squad`, the output is a blueprint YAML:

### Required Top-Level
```yaml
squad:                             # REQUIRED
  name: "squad-name"               # kebab-case, 2-64 chars
  domain: "domain-name"            # kebab-case, 2-50 chars
  description: "max 500 chars"

recommendations:                   # REQUIRED
  agents: []                       # Array of agent recommendations
  tasks: []                        # Array of task recommendations
  template: "basic"                # basic|etl|agent-only|custom
  config_mode: "extend"            # extend|override|none

metadata:                          # REQUIRED
  created_at: "2026-01-15T00:00:00Z"  # ISO 8601
  source_docs: []
  user_adjustments: 0
  overall_confidence: 0.85         # 0-1
```

### Agent Recommendation
```yaml
agents:
  - id: "agent-name"              # kebab-case, 2-64 chars
    role: "Role description"       # 5-200 chars
    commands: ["cmd-1", "cmd-2"]   # max 20 commands
    confidence: 0.85               # 0-1
    user_added: false
    user_modified: false
```

### Task Recommendation
```yaml
tasks:
  - name: "task-name"             # kebab-case, 2-64 chars
    agent: "owning-agent"          # Must match an agent id
    entrada: ["input-1"]           # max 20 items
    saida: ["output-1"]            # max 20 items
    confidence: 0.88               # 0-1
    checklist: ["check-1"]         # max 20 items
```

---

## Squad Types & Their Characteristics

### Expert Squad (Mind-Clone Based)
- Based on real people's methodologies
- Requires source material collection and validation
- Agents have Voice DNA and Thinking DNA
- Tier 0 MUST be a diagnostic agent
- Quality gates include authenticity checks
- Agent:Task ratio ~1:3-4
- Minimum 300 lines per agent (800 for good, 1200+ for excellent)

### Pipeline Squad
- Sequential processing with clear phases
- Phase-based flow with intermediate outputs
- Orchestrator manages the pipeline
- Quality gates between major phases
- Agent:Task ratio ~1:5-10
- Focus on process consistency over personality

### Hybrid Squad
- Combines process automation with expert knowledge
- Heuristics and behavioral states
- Process standards with quality dimensions
- Agent:Task ratio ~1:1-2
- Balances personality with process

---

## Task Format Specification (TASK-FORMAT-V1)

Every task file MUST have these fields in YAML frontmatter:

```yaml
---
task: "Task Name"                   # Human-readable name
responsavel: "{agent-id}"          # Owning agent
responsavel_type: "agent"          # Always "agent"
atomic_layer: "task"               # Always "task"
Entrada: |                         # Inputs (Portuguese for historical reasons)
  - input_1: Description
  - input_2: Description
Saida: |                           # Outputs
  - output_1: Description
Checklist:                         # Validation items
  - [ ] Check item 1
  - [ ] Check item 2
---
```

---

## Naming Conventions

| Component | Pattern | Example |
|-----------|---------|---------|
| Squad name | `{domain}-{optional}` | `youtube-growth` |
| Agent file | `{role-noun}.md` | `script-analyst.md` |
| Task file | `{verb}-{noun}.md` | `analyze-script.md` |
| Workflow file | `{adjective}-{noun}-pipeline.md` | `full-script-pipeline.md` |
| Checklist file | `{domain}-{type}-checklist.md` | `script-quality-checklist.md` |
| Template file | `{artifact}-template.md` | `hook-template.md` |
| Quality gate ID | `{PREFIX}_QG_{NNN}` | `YS_QG_001` |

---

## Validation Rules Summary

### Blocking (Must Pass)
1. `squad.yaml` exists and has required fields (name, version)
2. Entry agent exists and can be activated
3. All file references in components resolve to actual files
4. Task files have TASK-FORMAT-V1 fields
5. No security issues (no API keys, credentials, etc.)

### Quality Scoring (7.0 minimum to pass)
- Prompt Quality (25%) — examples, anti-patterns, step-by-step
- Pipeline Coherence (25%) — output/input chain, checkpoints
- Checklist Actionability (25%) — measurable, scoring, correction guidance
- Documentation (25%) — README, commands, architecture

### Veto Conditions (Override Any Score)
- No entry agent defined
- Can't activate entry agent
- >20% missing file references
- Invalid squad.yaml
- Security vulnerability
- Broken cross-references

---

*Reference: squad-schema.json, squad-design-schema.json, squad-checklist.md*
