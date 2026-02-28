# Task: Compare Squads

**Task ID:** compare-squads
**Version:** 1.0.0
**Purpose:** Deep comparative analysis of 2-4 squads with actionable Merge Blueprint
**Orchestrator:** @squad-chief
**Execution Type:** `Hybrid` (Worker scripts for structural census + Agent for quality/gap/blueprint)
**Estimated Time:** 10-25 minutes (depends on squad count and depth)
**Quality Gate:** SC_CMP_001 (comparison completeness)

---

## Execution Model

```
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 1: STRUCTURAL CENSUS (Worker — Deterministic)            │
│  → Glob/Bash: component counts, folder structure, config meta   │
│  → Output: Raw structural metrics per squad                     │
│  → Cost: $0 (no LLM)                                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 2: AGENT QUALITY COMPARISON (Hybrid)                     │
│  → Read sample agents from each squad                           │
│  → Evaluate voice_dna, thinking_dna, depth, SC_AGT_001          │
│  → Output: Agent quality scores per squad                       │
│  → Cost: LLM tokens                                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 3: TASK & WORKFLOW MATURITY (Hybrid)                     │
│  → Check Task Anatomy (8 fields), workflow complexity, vetos    │
│  → Output: Maturity scores per squad                            │
│  → Cost: LLM tokens                                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 4: DOMAIN & KNOWLEDGE DEPTH (Agent)                      │
│  → Source coverage, MMOS integration, frameworks, SOPs          │
│  → Output: Knowledge depth assessment per squad                 │
│  → Cost: LLM tokens                                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 5: GAP ANALYSIS & STRENGTHS MAP (Agent)                  │
│  → Unique capabilities, overlaps, strengths/weaknesses          │
│  → Output: Gap matrix + Strengths map                           │
│  → Cost: LLM tokens                                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 6: MERGE BLUEPRINT (Agent)                               │
│  → Components to take from each, conflicts, new components      │
│  → Output: Actionable Merge Blueprint with specific filenames   │
│  → Cost: LLM tokens                                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Inputs

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `squad_names` | string[] | Yes | Names of squads to compare (2-4) | `["hormozi", "brunson"]` |
| `--dimensions` | string[] | No | Filter to specific dimensions | `["agents", "workflows"]` |
| `--output` | string | No | Output format | `"console"` (default), `"markdown"`, `"yaml"` |
| `--focus` | string | No | Focus area for merge blueprint | `"best-agents"`, `"best-workflows"`, `"balanced"` |

---

## Veto Conditions

```yaml
veto_conditions:
  - id: "SC_CMP_V01"
    condition: "Less than 2 squads provided"
    check: "squad_names.length < 2"
    result: "VETO — Comparison requires minimum 2 squads"

  - id: "SC_CMP_V02"
    condition: "More than 4 squads provided"
    check: "squad_names.length > 4"
    result: "VETO — Maximum 4 squads for meaningful comparison (use *squad-analytics for overview)"

  - id: "SC_CMP_V03"
    condition: "Squad directory not found"
    check: "!path_exists('squads/{squad_name}/')"
    result: "VETO — Squad '{squad_name}' not found in squads/"

  - id: "SC_CMP_V04"
    condition: "Squad has no config.yaml"
    check: "!file_exists('squads/{squad_name}/config.yaml')"
    result: "VETO — Squad '{squad_name}' has no config.yaml (not a valid squad)"

  - id: "SC_CMP_V05"
    condition: "Blueprint attempted before all phases complete"
    check: "phases_1_to_5_incomplete"
    result: "VETO — Cannot generate Merge Blueprint without completing all analysis phases"
```

---

## PHASE 1: STRUCTURAL CENSUS (Worker — Deterministic)

**Duration:** < 1 minute
**Mode:** Autonomous (no LLM needed)
**Purpose:** Gather raw structural metrics for each squad

### Step 1.1: Component Count per Squad

```yaml
structural_census:
  for_each_squad:
    action: "Count files in standard directories"
    directories:
      agents: "squads/{name}/agents/*.md"
      tasks: "squads/{name}/tasks/*.md"
      workflows: "squads/{name}/workflows/*.yaml OR *.md"
      templates: "squads/{name}/templates/*"
      checklists: "squads/{name}/checklists/*.md"
      data: "squads/{name}/data/*"
      scripts: "squads/{name}/scripts/*"
      docs: "squads/{name}/docs/**/*.md"

    extra_detection:
      minds: "squads/{name}/data/minds/ OR squads/{name}/minds/"
      sops: "squads/{name}/docs/sops/"
      pipelines: "squads/{name}/pipelines/ OR squads/{name}/scripts/*.py"
      config_files: "squads/{name}/config/*.yaml"
```

### Step 1.2: Config Metadata Extraction

```yaml
config_extraction:
  for_each_squad:
    parse: "squads/{name}/config.yaml"
    extract:
      - name
      - version
      - description
      - entry_agent
      - squad_type  # expert, pipeline, hybrid
      - dependencies.external  # cross-squad deps
```

### Step 1.3: Line Count Summary

```yaml
line_counts:
  for_each_squad:
    total_lines: "wc -l all files"
    avg_agent_lines: "total agent lines / agent count"
    avg_task_lines: "total task lines / task count"
    largest_file: "file with most lines"
    smallest_file: "file with fewest lines"
```

**Phase 1 Output:**

```yaml
phase_1_output:
  squads:
    hormozi:
      components:
        agents: 16
        tasks: 55
        workflows: 9
        templates: 3
        checklists: 45
        data: 4
        scripts: 2
        docs: 12
      extras:
        minds: 17
        sops: 67
      config:
        version: "2.1.0"
        type: "expert"
        entry_agent: "hormozi-chief"
      lines:
        total: 125000
        avg_agent: 1814
        avg_task: 450
    brunson:
      # ... same structure
```

---

## PHASE 2: AGENT QUALITY COMPARISON (Hybrid)

**Duration:** 3-5 minutes
**Mode:** Agent reads sample agents from each squad
**Purpose:** Compare agent quality across squads

### Step 2.1: Agent Sampling Strategy

```yaml
agent_sampling:
  per_squad:
    sample_size: 3
    selection:
      - "Entry/chief agent (orchestrator)"
      - "Largest agent by lines (most detailed)"
      - "Random specialist agent"
    fallback_if_less_than_3: "Sample all available"
```

### Step 2.2: Quality Dimensions per Agent

```yaml
agent_quality_checks:
  for_each_sampled_agent:
    voice_dna:
      check: "Has voice_dna section?"
      sub_checks:
        - "sentence_starters defined? (yes/no + count)"
        - "vocabulary.always_use exists? (count)"
        - "vocabulary.never_use exists? (count)"
        - "emotional_states defined?"
      score: "0-10"

    thinking_dna:
      check: "Has thinking_dna or heuristics?"
      sub_checks:
        - "Heuristic IDs present? (SC_*, PV_*, etc.)"
        - "WHEN context for each heuristic?"
        - "Veto conditions defined?"
        - "Decision tree or framework?"
      score: "0-10"

    operational_depth:
      check: "Agent is functional, not just philosophical"
      sub_checks:
        - "output_examples >= 3?"
        - "anti_patterns section exists?"
        - "handoff_to defined?"
        - "completion_criteria exists?"
        - "smoke_tests defined?"
      score: "0-10"

    sc_agt_001_compliance:
      check: "Passes SC_AGT_001 quality gate"
      criteria:
        - "3 smoke tests (domain, decision, objection)"
        - "Voice DNA with [SOURCE:] traces"
        - "Heuristics with WHEN context"
      score: "PASS / PARTIAL / FAIL"
```

### Step 2.3: Agent Comparison Table

```yaml
agent_comparison_output:
  format: |
    ## Agent Quality Comparison

    | Dimension | {squad_A} | {squad_B} | {squad_C} | Winner |
    |-----------|-----------|-----------|-----------|--------|
    | Voice DNA avg | 8.5/10 | 7.0/10 | 6.5/10 | {A} |
    | Thinking DNA avg | 7.5/10 | 8.0/10 | 7.0/10 | {B} |
    | Operational Depth avg | 8.0/10 | 7.5/10 | 8.5/10 | {C} |
    | SC_AGT_001 Pass Rate | 100% | 75% | 50% | {A} |
    | Avg Lines/Agent | 1814 | 1200 | 900 | {A} |
    | **Agent Quality Score** | **8.0** | **7.5** | **7.0** | **{A}** |
```

---

## PHASE 3: TASK & WORKFLOW MATURITY (Hybrid)

**Duration:** 3-5 minutes
**Mode:** Agent reads sample tasks and workflows
**Purpose:** Compare task rigor and workflow sophistication

### Step 3.1: Task Anatomy Compliance

```yaml
task_anatomy_check:
  mandatory_8_fields:
    - task_id
    - version
    - purpose
    - orchestrator
    - execution_type  # Worker / Agent / Hybrid / Human
    - inputs
    - outputs
    - quality_gate

  per_squad:
    sample: "3 tasks (largest, entry, random)"
    check: "Count fields present out of 8"
    score: "fields_present / 8 × 10"
```

### Step 3.2: Workflow Complexity Analysis

```yaml
workflow_analysis:
  per_squad:
    total_workflows: "count"
    avg_phases_per_workflow: "sum phases / count"
    has_checkpoints: "workflows with quality gates"
    has_veto_conditions: "workflows with veto blocks"
    has_rework_rules: "workflows with failure paths"
    unidirectional_flow: "no backward arrows"

  scoring:
    phases_3_plus: "+2"
    checkpoints_present: "+2"
    veto_conditions: "+2"
    rework_rules: "+1"
    unidirectional: "+1"
    automation_scripts: "+2"
    max_score: 10
```

### Step 3.3: Maturity Comparison Table

```yaml
maturity_output:
  format: |
    ## Task & Workflow Maturity

    | Dimension | {squad_A} | {squad_B} | Winner |
    |-----------|-----------|-----------|--------|
    | Task Anatomy (8-field avg) | 7/8 | 5/8 | {A} |
    | Veto Conditions | 85% tasks | 40% tasks | {A} |
    | Workflow Count | 9 | 3 | {A} |
    | Avg Phases/Workflow | 6.2 | 4.0 | {A} |
    | Checkpoints Present | 100% | 67% | {A} |
    | Automation Scripts | 2 | 0 | {A} |
    | **Maturity Score** | **8.5** | **6.0** | **{A}** |
```

---

## PHASE 4: DOMAIN & KNOWLEDGE DEPTH (Agent)

**Duration:** 2-4 minutes
**Mode:** Agent analysis (requires interpretation)
**Purpose:** Evaluate depth and breadth of domain knowledge

### Step 4.1: Source & Knowledge Assessment

```yaml
knowledge_checks:
  per_squad:
    source_coverage:
      check: "Does squad reference primary sources?"
      signals:
        - "[SOURCE:] tags in agents"
        - "Source files in data/ or sources/"
        - "Bibliography or reference sections"
      score: "0-10"

    mmos_integration:
      check: "Does squad leverage MMOS mind cloning?"
      signals:
        - "mind_dna_complete.yaml exists"
        - "voice_dna extracted from real sources"
        - "thinking_dna has documented frameworks"
      score: "0-10 (0 if N/A)"

    framework_density:
      check: "How many unique, named frameworks does the squad implement?"
      signals:
        - "Named frameworks in agents (e.g., 'AIDA', '28-step sales letter')"
        - "Proprietary models with steps"
        - "Decision trees or matrices"
      score: "count × weight"

    sop_coverage:
      check: "Standard Operating Procedures exist?"
      signals:
        - "docs/sops/ directory"
        - "Step-by-step procedures"
        - "Blueprint YAML files"
      score: "0-10"
```

### Step 4.2: Knowledge Depth Comparison

```yaml
knowledge_output:
  format: |
    ## Domain & Knowledge Depth

    | Dimension | {squad_A} | {squad_B} | Winner |
    |-----------|-----------|-----------|--------|
    | Source Coverage | 9/10 | 6/10 | {A} |
    | MMOS Integration | 8/10 | N/A | {A} |
    | Named Frameworks | 23 | 8 | {A} |
    | SOP Count | 35 | 0 | {A} |
    | Checklist Count | 45 | 5 | {A} |
    | **Knowledge Depth Score** | **9.0** | **5.5** | **{A}** |
```

---

## PHASE 5: GAP ANALYSIS & STRENGTHS MAP (Agent)

**Duration:** 2-3 minutes
**Mode:** Agent synthesis (requires interpretation across all previous phases)
**Purpose:** Identify unique capabilities, overlaps, and gaps

### Step 5.1: Capability Extraction

```yaml
capability_extraction:
  per_squad:
    unique_capabilities:
      description: "What can THIS squad do that others can't?"
      check:
        - "Unique agent specialties (no equivalent in other squads)"
        - "Unique workflows (no equivalent)"
        - "Unique data assets (SOPs, frameworks, checklists)"
        - "Unique tool integrations"

    shared_capabilities:
      description: "What do multiple squads cover?"
      check:
        - "Agents with similar roles across squads"
        - "Tasks with overlapping purposes"
        - "Shared domain areas"
```

### Step 5.2: Strengths & Weaknesses Matrix

```yaml
strengths_weaknesses:
  per_squad:
    strengths:
      - category: "Best agent quality"
        evidence: "Highest voice_dna scores, most smoke tests"
      - category: "Best workflow maturity"
        evidence: "Most phases, all checkpoints, veto conditions"

    weaknesses:
      - category: "Missing SOPs"
        evidence: "0 SOPs vs {other_squad}'s 35"
      - category: "Low automation"
        evidence: "No pipeline scripts vs {other_squad}'s 2"
```

### Step 5.3: Gap Analysis Output

```yaml
gap_analysis_output:
  format: |
    ## Gap Analysis

    ### Unique to {squad_A} (not in {squad_B})
    - [specific agent/task/workflow files]

    ### Unique to {squad_B} (not in {squad_A})
    - [specific agent/task/workflow files]

    ### Overlap (both cover)
    - [capability]: {squad_A} via [file], {squad_B} via [file]

    ### Neither Covers (gaps)
    - [capability gap description]

    ### Strengths Summary
    | Area | Best Squad | Why |
    |------|-----------|-----|
    | Agent Quality | {squad} | Highest SC_AGT_001 pass rate |
    | Workflow Maturity | {squad} | Most checkpoints + vetos |
    | Knowledge Depth | {squad} | Most named frameworks |
    | Automation | {squad} | Pipeline scripts + CI |
```

---

## PHASE 6: MERGE BLUEPRINT (Agent)

**Duration:** 3-5 minutes
**Mode:** Agent synthesis (requires all previous phases)
**Purpose:** Generate actionable merge plan with specific filenames

### Precondition

```yaml
precondition:
  phases_complete: [1, 2, 3, 4, 5]
  all_metrics_available: true
  on_incomplete: "VETO SC_CMP_V05 — Complete all phases before blueprint"
```

### Step 6.1: Component Selection

```yaml
component_selection:
  strategy: "Take the BEST version of each component from whichever squad has it"

  rules:
    agents:
      - "For overlapping roles: take agent with higher SC_AGT_001 score"
      - "For unique agents: include ALL (they add capability)"
      - "For orchestrator: design NEW that knows all agents"

    tasks:
      - "For overlapping: take task with better anatomy score"
      - "For unique: include ALL"
      - "Merge veto conditions from both versions"

    workflows:
      - "Take workflow with more phases/checkpoints"
      - "Merge veto conditions from both"

    data:
      - "Merge all unique data assets"
      - "For overlapping: merge content, not replace"

    checklists:
      - "Include ALL (checklists are additive)"

    sops:
      - "Include ALL (SOPs are additive)"
```

### Step 6.2: Conflict Resolution

```yaml
conflict_resolution:
  types:
    naming_conflict:
      description: "Same filename, different content"
      strategy: "Rename with squad prefix: {squad}-{filename}"

    role_overlap:
      description: "Two agents serve similar purpose"
      strategy: |
        1. Compare quality scores
        2. Take higher-scoring agent as PRIMARY
        3. Extract unique heuristics from lower-scoring agent
        4. Merge unique heuristics into PRIMARY agent
        5. Document what was merged in changelog

    config_conflict:
      description: "Different config.yaml structures"
      strategy: "Design new config.yaml that encompasses both squads"

    dependency_conflict:
      description: "Agents reference different data files"
      strategy: "Include both data files, update references in merged agents"
```

### Step 6.3: Blueprint Output Format

```yaml
blueprint_format: |
  ## Merge Blueprint: "{suggested_merged_squad_name}"

  **Source Squads:** {squad_A}, {squad_B} [, {squad_C}, {squad_D}]
  **Merged Squad Type:** {detected_type}
  **Estimated Components:** {total_agents} agents, {total_tasks} tasks, {total_workflows} workflows
  **Estimated Effort:** {hours} hours

  ---

  ### From {squad_A}: (Take These Components)
  **Agents:**
  - `agents/{specific-file-1}.md` — Reason: highest voice_dna score
  - `agents/{specific-file-2}.md` — Reason: unique capability, no equivalent in {squad_B}

  **Tasks:**
  - `tasks/{specific-file}.md` — Reason: better anatomy compliance

  **Workflows:**
  - `workflows/{specific-file}.yaml` — Reason: more phases, all checkpoints

  **Data & Assets:**
  - `data/{specific-file}.yaml` — Reason: unique framework
  - `docs/sops/{specific-file}.md` — Reason: no equivalent

  ---

  ### From {squad_B}: (Take These Components)
  (same structure as above)

  ---

  ### Conflicts & Resolution Strategy
  | Component | {squad_A} Version | {squad_B} Version | Resolution |
  |-----------|-------------------|-------------------|------------|
  | `agents/closer.md` | 2440 lines, 8.5/10 | 1800 lines, 7.2/10 | Take {A}, merge {B}'s unique heuristics |
  | `config.yaml` | expert type | pipeline type | Design new hybrid config |

  ---

  ### New Components Needed (Gaps Neither Covers)
  | Component | Type | Purpose | Estimated Effort |
  |-----------|------|---------|-----------------|
  | `agents/{merged}-chief.md` | Agent | New orchestrator for merged squad | 2h |
  | `config.yaml` | Config | Unified configuration | 30min |
  | `README.md` | Doc | Merged squad documentation | 1h |

  ---

  ### Execution Priority (Ordered Steps)
  | # | Action | Components | Estimated Time |
  |---|--------|-----------|----------------|
  | 1 | Create target directory | `squads/{merged-name}/` | 5min |
  | 2 | Copy best agents | {list} | 10min |
  | 3 | Copy best tasks | {list} | 10min |
  | 4 | Copy workflows | {list} | 5min |
  | 5 | Merge data assets | {list} | 15min |
  | 6 | Resolve conflicts | {list} | 30min |
  | 7 | Create new orchestrator | `agents/{merged}-chief.md` | 2h |
  | 8 | Create unified config | `config.yaml` | 30min |
  | 9 | Generate README | `README.md` | 1h |
  | 10 | Run *validate-squad | Quality gate | 15min |
```

---

## Quality Gate: SC_CMP_001

```yaml
quality_gate:
  id: "SC_CMP_001"
  name: "Comparison Completeness Gate"
  type: "Automated"
  blocking: true

  checks:
    - id: "SC_CMP_001a"
      check: "All 6 phases produced output"
      threshold: "6/6"
      on_fail: "FAIL — Phase {N} missing output"

    - id: "SC_CMP_001b"
      check: "Merge Blueprint references specific filenames"
      threshold: "Zero generic references (e.g., no 'best agents' without names)"
      on_fail: "FAIL — Blueprint must reference specific files, not categories"

    - id: "SC_CMP_001c"
      check: "Conflict resolution strategy defined for each overlap"
      threshold: "100% overlaps addressed"
      on_fail: "FAIL — {N} overlapping components without resolution strategy"

    - id: "SC_CMP_001d"
      check: "Execution priority has time estimates"
      threshold: "100% steps have estimates"
      on_fail: "WARN — Some steps missing time estimates"

    - id: "SC_CMP_001e"
      check: "New components list is complete"
      threshold: "At minimum: orchestrator + config + README"
      on_fail: "WARN — Missing new orchestrator/config in blueprint"
```

---

## Output Summary

| Output | Format | Description |
|--------|--------|-------------|
| Comparative Dashboard | Table | Side-by-side metrics for all squads |
| Agent Quality Comparison | Table | Voice DNA, Thinking DNA, Depth scores |
| Task & Workflow Maturity | Table | Anatomy, vetos, checkpoints scores |
| Knowledge Depth | Table | Sources, frameworks, SOPs |
| Gap Analysis | Sections | Unique, shared, neither-covers |
| Merge Blueprint | Structured | Specific files, conflicts, execution plan |

---

## Command: *compare-squads

### Usage

```bash
# Basic comparison (2 squads)
*compare-squads hormozi brunson

# Compare 3 squads
*compare-squads hormozi brunson kennedy

# Filter to specific dimensions
*compare-squads hormozi brunson --dimensions agents,workflows

# Focus merge blueprint on best agents
*compare-squads hormozi brunson --focus best-agents

# Output as markdown file
*compare-squads hormozi brunson --output markdown
```

### Agent Execution Flow

```
1. Parse squad_names from input
2. VETO CHECK: Validate 2-4 squads, all exist
3. PHASE 1: Structural Census (Glob + count)
4. PHASE 2: Agent Quality Comparison (read samples, score)
5. PHASE 3: Task & Workflow Maturity (read samples, score)
6. PHASE 4: Domain Knowledge Depth (read data, analyze)
7. PHASE 5: Gap Analysis & Strengths Map (synthesize)
8. PHASE 6: Merge Blueprint (synthesize, specific files)
9. QUALITY GATE: SC_CMP_001 check
10. Present complete report
```

---

## Output Example

```markdown
# Squad Comparison: hormozi vs brunson

## Comparative Dashboard

| Metric | hormozi | brunson | Winner |
|--------|---------|---------|--------|
| Agents | 16 | 12 | hormozi |
| Tasks | 55 | 38 | hormozi |
| Workflows | 9 | 5 | hormozi |
| Checklists | 45 | 8 | hormozi |
| SOPs | 35+32 yaml | 0 | hormozi |
| Named Frameworks | 23 | 15 | hormozi |
| Total Lines | 125K | 68K | hormozi |
| Agent Quality Avg | 8.0/10 | 7.5/10 | hormozi |
| Workflow Maturity | 8.5/10 | 7.0/10 | hormozi |
| Knowledge Depth | 9.0/10 | 7.0/10 | hormozi |

## Deep Analysis
(per-squad strengths and weaknesses)

## Gap Analysis
(unique capabilities, overlaps, gaps)

## Merge Blueprint: "growth-engine"

### From hormozi:
- agents/hormozi-workshop.md (2440 lines, highest voice_dna)
- agents/hormozi-closer.md (2408 lines, unique closing methodology)
- docs/sops/ (entire directory — 67 SOPs, no equivalent in brunson)
- checklists/ (45 checklists, comprehensive)
...

### From brunson:
- agents/brunson-funnel-architect.md (unique funnel expertise)
- workflows/wf-funnel-build.yaml (5-phase funnel construction)
- data/funnel-frameworks.yaml (unique data asset)
...

### Conflicts & Resolution
| Component | hormozi | brunson | Strategy |
|-----------|---------|---------|----------|
| agents/closer.md | 8.5/10 | 7.2/10 | Take hormozi, merge brunson's webinar close heuristics |

### New Components Needed
| Component | Type | Purpose | Effort |
|-----------|------|---------|--------|
| growth-engine-chief.md | Agent | Orchestrator | 2h |
| config.yaml | Config | Unified | 30min |
| README.md | Doc | Documentation | 1h |

### Execution Priority
| # | Action | Time |
|---|--------|------|
| 1 | Create squads/growth-engine/ | 5min |
| 2 | Copy hormozi best agents (6) | 10min |
| 3 | Copy brunson best agents (4) | 10min |
| ... | ... | ... |
| 10 | Run *validate-squad | 15min |
```

---

## Related Commands

| Command | Purpose |
|---------|---------|
| `*squad-analytics` | Single squad metrics (Phase 1 data source) |
| `*validate-squad` | Deep validation of single squad |
| `*create-squad` | Create new squad (use after merge blueprint) |
| `*upgrade-squad` | Upgrade existing squad to current standards |

---

## Changelog

### v1.0.0 (2026-02-15)
- Initial release with 6-phase comparison
- Structural Census (Worker), Agent Quality, Task Maturity, Knowledge Depth, Gap Analysis, Merge Blueprint
- Quality gate SC_CMP_001
- Support for 2-4 squads
- Specific filename references in blueprint (not generic categories)

---

_Task Version: 1.0.0_
_Author: squad-chief_
_Philosophy: Compare to merge the best — specific files, not generic categories_
