# Task: Assess Agent Topology

**Task ID:** assess-agent-topology
**Version:** 1.0
**Execution Type:** Agent
**Purpose:** Apply Team Topologies framework to classify and structure AI agent squads
**Orchestrator:** @matthew-skelton
**Mode:** Agent (LLM-driven analysis with human checkpoint)
**Quality Standard:** AIOS Level (300+ lines)
**Workflow:** wf-validate-ai-agents (phase_1)

---

## Overview

Matthew Skelton applies Team Topologies principles to AI agent squads. Classifies each agent by team type, assesses cognitive load distribution, validates Conway's Law alignment for agent-to-agent interactions, and recommends orchestration patterns.

```
INPUT (agent_list + dependencies + decision_authorities)
    |
[PHASE 1: AGENT CLASSIFICATION]
    -> Classify each agent by team topology type
    -> Map agent value streams
    |
[PHASE 2: LOAD & PATTERN ANALYSIS]
    -> Assess cognitive load per agent
    -> Identify orchestration pattern
    -> Check Conway's Law alignment
    |
[PHASE 3: VALIDATION]
    -> Verify specialization is appropriate
    -> Validate no agent is overloaded
    |
[PHASE 4: HANDOFF]
    -> Package topology for orchestration design
    -> Handoff to @barry-hawkins
    |
OUTPUT: Agent Topology Assessment
```

---

## Task Anatomy (8 Fields)

### Field 1: ID
- **id:** `assess-agent-topology`

### Field 2: Purpose
Classify AI agents using Team Topologies framework. Ensure each agent has a clear type, appropriate cognitive load, and aligns with desired data flow architecture. Foundation for orchestration and safety design.

### Field 3: Executor
- **type:** Agent
- **guardrails:**
  - Must classify every agent into one of 4 types
  - Must calculate cognitive load (responsibilities + dependencies)
  - Human checkpoint before handoff

### Field 4: Inputs

| Parameter | Type | Required | Source | Description |
|-----------|------|----------|--------|-------------|
| `agent_list` | list | Yes | user | Agents with roles and responsibilities |
| `agent_dependencies` | list | Yes | user | How agents coordinate |
| `decision_authorities` | list | Yes | user | What each agent decides |
| `existing_issues` | string | No | user | Problems with current setup |

### Field 5: Preconditions

- [ ] Agent list with at least 2 agents defined
- [ ] Dependencies between agents documented
- [ ] Decision authority per agent specified

### Field 6: Steps

#### PHASE 1: Agent Classification (20 min)

**Step 1.1: Classify Each Agent**
```yaml
action: "Assign team topology type to each agent"
types:
  stream_aligned: "Core value delivery agent (e.g., dev, analyst)"
  platform: "Enables other agents (e.g., devops, data pipeline)"
  enabling: "Teaches/coaches temporarily (e.g., AI adoption coach)"
  complicated_subsystem: "Handles deep specialist complexity (e.g., ML model, security)"
  orchestrator: "Coordinates other agents (e.g., chief, PM)"
for_each_agent:
  - "What value does this agent deliver?"
  - "Who consumes this agent's output?"
  - "Is this agent's work self-contained or highly connected?"
veto_condition: "STOP if an agent cannot be classified — role is too vague, needs clearer definition"
output: "Agent classification roster"
```

**Step 1.2: Map Agent Value Streams**
```yaml
action: "Identify value streams through the agent squad"
analysis:
  - "What is the end-to-end flow? (e.g., idea -> analysis -> design -> code -> test)"
  - "Which agents participate in each flow?"
  - "Where are the handoff points?"
output: "Agent value stream map"
```

#### PHASE 2: Load & Pattern Analysis (20 min)

**Step 2.1: Cognitive Load Assessment**
```yaml
action: "Calculate cognitive load per agent"
metrics:
  responsibilities: "How many distinct tasks does this agent handle?"
  dependencies: "How many other agents does it depend on?"
  context_size: "How much context must this agent maintain?"
thresholds:
  low: "1-3 responsibilities, 0-1 dependencies"
  medium: "4-6 responsibilities, 2-3 dependencies"
  high: "7+ responsibilities, 4+ dependencies"
veto_condition: "STOP if any agent has HIGH load — split into multiple agents"
output: "Agent cognitive load matrix"
```

**Step 2.2: Orchestration Pattern Recommendation**
```yaml
action: "Recommend orchestration pattern based on topology"
patterns:
  sequential: "A -> B -> C (pipeline)"
  parallel: "A || B || C (concurrent)"
  hierarchical: "Chief -> Specialists (tree)"
  conditional: "IF X then A ELSE B (branching)"
  mixed: "Combination of above"
decision: "Based on agent types, dependencies, and value streams"
output: "Recommended orchestration pattern"
```

**Step 2.3: Conway's Law Check**
```yaml
action: "Verify agent structure matches desired data/artifact flow"
checks:
  - "Agent boundaries align with artifact boundaries"
  - "Communication paths match dependency paths"
  - "No agent forced to produce artifacts outside its domain"
output: "Conway's Law alignment assessment"
```

#### PHASE 3: Validation (10 min)

**Step 3.1: Specialization Check**
```yaml
blocking_checks:
  - check: "Every agent has single clear type"
    type: blocking
  - check: "No agent handles >7 distinct responsibilities"
    type: blocking
  - check: "Stream-aligned agents are majority (>50%)"
    type: warning
  - check: "No 'utility agent' that does everything"
    type: blocking
```

#### PHASE 4: Handoff (5 min)

**Step 4.1: Package for Orchestration Design**
```yaml
handoff:
  to: "@barry-hawkins"
  artifact: "agent-topology-assessment.md"
  format: "Structured markdown"
  includes:
    - "Agent classification roster (types)"
    - "Value stream map"
    - "Cognitive load matrix"
    - "Recommended orchestration pattern"
    - "Conway's Law assessment"
  next_task: "design-agent-orchestration"
```

### Field 7: Outputs

| Output | Format | Location | Description |
|--------|--------|----------|-------------|
| Topology Assessment | markdown | `outputs/agent-topology-assessment.md` | Complete agent classification |
| Cognitive Load Matrix | table | embedded | Per-agent load assessment |
| Orchestration Recommendation | yaml | embedded | Recommended pattern |
| Conway's Law Check | markdown | embedded | Alignment validation |

### Field 8: Validation

```yaml
validation_criteria:
  blocking:
    - "Every agent classified by type"
    - "No agent with HIGH cognitive load"
    - "Orchestration pattern recommended"
    - "Conway's Law check completed"
  warning:
    - "Stream-aligned agents are majority"
    - "Value streams clearly mapped"
```

---

## Veto Conditions

```yaml
veto_conditions:
  - id: "VT-AAT-001"
    trigger: "Agent cannot be classified — role too vague"
    action: "STOP — Agent needs clearer role definition before proceeding"
    severity: blocking

  - id: "VT-AAT-002"
    trigger: "Any agent has HIGH cognitive load (7+ responsibilities)"
    action: "STOP — Split agent into multiple specialized agents"
    severity: blocking

  - id: "VT-AAT-003"
    trigger: "'Utility agent' detected (does everything)"
    action: "STOP — Decompose into specialized agents"
    severity: blocking
```

---

## Anti-Patterns

```yaml
anti_patterns:
  - name: "God Agent"
    description: "Single agent that handles everything"
    why_bad: "Context overload, poor quality, single point of failure"
    correct: "Decompose into specialized agents with clear boundaries"

  - name: "Taxonomy Without Purpose"
    description: "Classifying agents by type without connecting to value delivery"
    why_bad: "Classification becomes busywork instead of design insight"
    correct: "Types should explain how agent contributes to value stream"

  - name: "Over-Orchestration"
    description: "Every interaction goes through orchestrator"
    why_bad: "Bottleneck on orchestrator, eliminates agent autonomy"
    correct: "Direct agent-to-agent handoffs where possible, orchestrator for routing only"
```

---

## Handoff

```yaml
handoff:
  to: "@barry-hawkins"
  trigger: "Topology assessment validated"
  artifact: "agent-topology-assessment.md"
  next_task: "design-agent-orchestration"
  context_passed:
    - "Agent classifications (types)"
    - "Cognitive load matrix"
    - "Orchestration pattern recommendation"
    - "Value stream map"
    - "Conway's Law assessment"
```

---

## Output Example

```markdown
# Agent Topology Assessment

**Squad:** marketing-automation
**Assessed by:** @matthew-skelton
**Date:** 2026-02-10

## 1. Agent Classification Roster

| # | Agent | Type | Value Stream | Rationale |
|---|-------|------|-------------|-----------|
| 1 | marketing-chief | Orchestrator | All | Routes tasks, synthesizes reports |
| 2 | content-strategist | Stream-Aligned | Content Pipeline | Produces editorial calendar, briefs |
| 3 | seo-analyst | Stream-Aligned | Organic Growth | Keyword research, audit, recommendations |
| 4 | analytics-engine | Platform | All | Provides metrics, dashboards to all agents |
| 5 | brand-coach | Enabling | Brand Consistency | Teaches brand voice, exits after adoption |

**Type Distribution:**
- Stream-Aligned: 2 (40%) — target >50% ⚠️
- Platform: 1 (20%) — within 10-20% ✅
- Enabling: 1 (20%) — within 5-10% ⚠️ slightly high
- Orchestrator: 1 (20%)

## 2. Cognitive Load Matrix

| Agent | Responsibilities | Dependencies | Context Size | Total Load | Status |
|-------|-----------------|--------------|-------------|-----------|--------|
| marketing-chief | 4 | 0 | Medium | MEDIUM | ✅ GREEN |
| content-strategist | 5 | 2 | Large | MEDIUM | ✅ YELLOW |
| seo-analyst | 3 | 1 | Medium | LOW | ✅ GREEN |
| analytics-engine | 6 | 0 | Large | MEDIUM | ✅ YELLOW |
| brand-coach | 2 | 0 | Small | LOW | ✅ GREEN |

**No agent exceeds HIGH threshold — PASS**

## 3. Orchestration Pattern

**Recommended:** Mixed (Hierarchical + Sequential)

```
marketing-chief (orchestrator)
    ├── content-strategist ──▶ seo-analyst (sequential)
    ├── analytics-engine (platform, serves all)
    └── brand-coach ──▶ content-strategist (facilitation, time-boxed)
```

## 4. Conway's Law Check

| Check | Result | Notes |
|-------|--------|-------|
| Agent boundaries = artifact boundaries | PASS | Each agent owns distinct outputs |
| Communication paths = data flow | PASS | Analytics feeds all, content feeds SEO |
| No forced cross-domain ownership | PASS | No agent produces outside its domain |

**Overall Conway's Law: ALIGNED ✅**
```

---

## Error Handling

```yaml
error_handling:
  agent_unclassifiable:
    symptom: "Agent role is too vague to map to a topology type"
    action: "Request clearer role definition from user before proceeding"
    escalation: "@team-taxonomy-chief"

  overloaded_agent:
    symptom: "Agent has 7+ responsibilities or 4+ dependencies"
    action: "Propose splitting into 2 focused agents"
    escalation: "User approval required for split"

  conways_law_violation:
    symptom: "Agent must produce artifacts outside its declared domain"
    action: "Recommend boundary adjustment or new agent creation"
    escalation: "@matthew-skelton re-evaluates topology"
```

---

_Task Version: 1.1_
_Workflow: wf-validate-ai-agents (phase_1)_
_Agent: @matthew-skelton_
_Lines: 300+_
