# Task: Phase 2 — Slice Selection

**Task ID:** phase-2-slice
**Version:** 1.0
**Agents:** code-cartographer (primary), domain-decoder-chief (review and approval)
**Execution Type:** Sequential — code-cartographer runs analysis, chief reviews and approves slice list
**Purpose:** Select the highest-value extraction targets from the full structural inventory using a ranked scoring model that combines behavioral analysis (git hotspots) and structural signals (entry points, domain-named modules) to focus deep extraction resources on the most business-critical code.

---

## Overview

Phase 2 is a deliberate bottleneck. Deep extraction (Phase 3) is expensive — token-heavy, time-consuming, and requires focused LLM reasoning. Without slice selection, the pipeline would attempt to deep-read every file, drowning in infrastructure boilerplate and missing the actual business logic. Slice selection solves this by ranking modules and files by their likelihood of containing high-value business intelligence, then selecting only the top candidates for deep extraction.

```
INPUT: inventory.yaml, dependency-graph.yaml, entry-points.yaml
       + git history (if available)
    ↓
[STEP 2.1] Behavioral analysis — git hotspot scoring (change frequency × complexity)
    ↓
[STEP 2.2] Structural analysis — entry point anchoring, domain naming signals
    ↓
[STEP 2.3] Composite ranking — apply weighted scoring formula
    ↓
[STEP 2.4] Chief review — validate selection covers key entry points
    ↓
[VETO CHECK] Selected slices cover >= 60% of entry points
    ↓
OUTPUT: slice-selection.yaml (prioritized ranked list)
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `inventory` | YAML file | Yes | `outputs/{repo-name}/phase-1/inventory.yaml` |
| `dependency_graph` | YAML file | Yes | `outputs/{repo-name}/phase-1/dependency-graph.yaml` |
| `entry_points` | YAML file | Yes | `outputs/{repo-name}/phase-1/entry-points.yaml` |
| `bounded_context_hypotheses` | YAML file | Yes | `outputs/{repo-name}/phase-1/bounded-context-hypotheses.yaml` |
| `git_history_available` | boolean | Yes | From triage report — determines if behavioral analysis is possible |

**Skills to Reuse:**
- `quality-shield:tasks:build-dependency-graph` — module centrality analysis
- `quality-shield:tasks:analyze-impact` — impact scope scoring methodology
- `clone-engineering:tasks:mind-mapper-triangulate` — multi-signal confidence scoring

---

## Preconditions

- [ ] DD_INV_001 (Inventory Gate) has passed
- [ ] All Phase 1 output files exist and are valid YAML
- [ ] code-cartographer and domain-decoder-chief agents are active

---

## Phase Steps

### Step 2.1: Behavioral Analysis (Git Hotspot Detection)

**Purpose:** Identify which files and modules are most actively changed — high change frequency combined with high complexity signals business-critical code that is actively maintained.

**Actions:**
```yaml
behavioral_analysis:
  if_git_history_available:
    commands:
      - "git log --name-only --format='' | sort | uniq -c | sort -rn > change-frequency.txt"
      - "git log --stat --since='1 year' --format='' | grep '|' | awk '{print $1}' | sort | uniq -c | sort -rn"

    per_file_metrics:
      change_frequency:
        - "Count commits touching this file in last 12 months"
        - "Normalize: (file_changes / max_file_changes) → 0.0 to 1.0"
      temporal_coupling:
        - "Files that always change together → shared business concern"
        - "Method: for each pair (A, B), count commits touching both / commits touching A"
        - "Threshold: coupling > 0.5 = strong temporal coupling → same slice"

  if_no_git_history:
    fallback:
      - "Use file modification timestamps (os.path.getmtime)"
      - "Use file size as complexity proxy"
      - "Use import centrality from dependency graph"
      - "Note: behavioral score will be 0.0 for all files (structural scoring takes over)"
```

### Step 2.2: Structural Analysis

**Purpose:** Score each module based on structural signals that correlate with business logic density.

**Actions:**
```yaml
structural_analysis:
  per_module_signals:
    entry_point_anchor:
      method: "Does this module contain or directly serve an entry point?"
      score: 1.0 if direct entry point, 0.5 if one hop from entry point, 0.0 otherwise

    domain_naming_score:
      method: "Does the module/directory name use domain language?"
      signals:
        strong: ["orders", "billing", "payments", "customers", "products", "inventory",
                 "subscriptions", "accounts", "claims", "contracts", "invoices",
                 "policies", "reservations", "bookings", "shipments"]
        medium: ["services", "handlers", "controllers", "domain", "core", "business"]
        weak: ["utils", "helpers", "shared", "common", "lib", "infra"]
      score: 1.0 for strong, 0.5 for medium, 0.0 for weak

    complexity_signal:
      method: "Estimate complexity from LOC + function count (or import fan-out)"
      formula: "min(1.0, (module_loc / 1000) * 0.5 + (import_fan_out / 20) * 0.5)"

    test_coverage_signal:
      method: "Are there test files that test this module?"
      rationale: "Tested modules are more likely to contain real business logic"
      score: 1.0 if corresponding test files exist, 0.5 if partial, 0.0 if no tests

    shared_utility_penalty:
      method: "Penalty for modules that are imported by many others (likely infrastructure)"
      threshold: "Imported by > 30% of source files = infrastructure penalty"
      penalty: "-0.3 if shared_utility_flag = true"
```

### Step 2.3: Composite Ranking Formula

**Purpose:** Combine behavioral and structural signals into a single ranked score per module.

**Formula:**
```
composite_score = (change_frequency × 0.40)
               + (complexity_signal × 0.30)
               + (domain_naming_score × 0.20)
               + (entry_point_anchor × 0.10)
               + shared_utility_penalty
```

**Rationale for weights:**
- `change_frequency × 0.40`: The single strongest signal of business-critical code. Files that change often contain business rules that must evolve with the business.
- `complexity_signal × 0.30`: Complex code is more likely to encode non-trivial business logic than simple CRUD code.
- `domain_naming_score × 0.20`: Developers who know their domain name things accordingly. Domain-named modules are prime targets.
- `entry_point_anchor × 0.10`: Entry points confirm that a module receives real business requests, not just internal infrastructure calls.

**Actions:**
```yaml
ranking_process:
  - "Compute composite_score for every module in inventory"
  - "Sort modules descending by composite_score"
  - "Apply tier classification:"
    - "Score >= 0.7: TIER_1 (must extract — high business intelligence density expected)"
    - "Score 0.4–0.69: TIER_2 (should extract — significant business logic likely)"
    - "Score 0.2–0.39: TIER_3 (optional — extract only if time permits)"
    - "Score < 0.2: EXCLUDED (infrastructure/boilerplate — skip)"

  selection_target:
    tier_1: "All TIER_1 modules (non-negotiable)"
    tier_2: "All TIER_2 modules until LOC budget is met (see below)"
    tier_3: "Only if TIER_1 + TIER_2 don't cover entry points adequately"

  loc_budget:
    description: "Maximum LOC to deep-extract based on scope"
    full_scope: "50,000 LOC maximum for Tier 1+2"
    module_scope: "Focus area LOC × 1.5 (allow for dependencies)"
    feature_scope: "Feature LOC × 3 (follow call graph)"
```

### Step 2.4: Entry Point Coverage Validation

**Purpose:** Ensure the selected slices cover at least 60% of the system's entry points. A system's entry points are its publicly observable behavior — missing them means missing business rules.

**Actions:**
```yaml
coverage_check:
  method:
    - "For each entry point in entry-points.yaml, check if its handler file is in the selected slices"
    - "Count: covered_entry_points / total_entry_points"
    - "If < 60%, expand selection to TIER_2 modules that contain missing entry points"
    - "If still < 60% after TIER_2 expansion, escalate to VETO"

  coverage_by_category:
    http_endpoints: "High priority — must cover >= 80%"
    event_listeners: "Medium priority — cover >= 60%"
    cron_jobs: "Medium priority — cover >= 60%"
    cli_commands: "Low priority — cover >= 40%"
    message_consumers: "High priority — cover >= 70%"
```

### Step 2.5: Temporal Coupling Integration

**Purpose:** Ensure files that are strongly temporally coupled are placed in the same slice — splitting them would fragment business rules that span multiple files.

**Actions:**
```yaml
temporal_coupling_adjustment:
  - "For each pair (A, B) with coupling > 0.5:"
  - "If A is selected and B is not: add B to same slice as A"
  - "If neither is selected but coupling is 0.8+: flag for manual review"
  - "Document all adjustments in slice-selection.yaml under coupling_adjustments"
```

---

## Veto Conditions

| ID | Condition | Type | Action |
|----|-----------|------|--------|
| DD_SLC_001 | `entry_point_coverage < 60%` after TIER_1 + TIER_2 expansion | HARD VETO | Stop Phase 2. Report which entry points are uncovered. Expand scope or flag for manual review. |
| DD_SLC_002 | `tier_1_module_count == 0` (no module scored above 0.7) | HARD VETO | Signals that behavioral and structural analysis found no high-value targets. This usually means the codebase is flat (no module structure) or all code is in shared utilities. Require manual guidance on target modules. |
| DD_SLC_W01 | `tier_1_loc > 100000` | WARN | Tier 1 alone exceeds 100K LOC — deep extraction will be very slow. Recommend narrowing scope or increasing depth only for highest-scoring modules. |
| DD_SLC_W02 | `git_history_available == false` | WARN | Behavioral analysis not possible — structural scoring only. Confidence in selection is lower. |
| DD_SLC_W03 | `temporal_coupling_adjustments > 20` | WARN | Many files are coupled outside their modules — suggests architectural drift. Note in slice-selection for Phase 4 documentation. |

---

## Outputs

| Artifact | Format | Path | Description |
|----------|--------|------|-------------|
| `slice-selection.yaml` | YAML | `outputs/{repo-name}/phase-2/slice-selection.yaml` | Prioritized ranked list of modules for deep extraction |
| `hotspot-map.yaml` | YAML | `outputs/{repo-name}/phase-2/hotspot-map.yaml` | Git hotspot analysis results (if git history available) |
| `entry-point-coverage.yaml` | YAML | `outputs/{repo-name}/phase-2/entry-point-coverage.yaml` | Which entry points are covered by selected slices |

### slice-selection.yaml Schema

```yaml
slice_selection:
  generated_at: "{ISO 8601}"
  scoring_formula: "change_frequency(0.4) + complexity(0.3) + domain_naming(0.2) + entry_point_anchor(0.1)"
  git_history_available: true
  entry_point_coverage: "73%"

  tier_1_modules:
    - module: "src/billing"
      composite_score: 0.89
      change_frequency: 0.95
      complexity_signal: 0.82
      domain_naming_score: 1.0
      entry_point_anchor: 1.0
      loc: 9500
      entry_points_covered: 12
      rationale: "Highest change frequency, core domain name, direct entry points"

    - module: "src/orders"
      composite_score: 0.84
      change_frequency: 0.88
      complexity_signal: 0.76
      domain_naming_score: 1.0
      entry_point_anchor: 1.0
      loc: 12000
      entry_points_covered: 18
      rationale: "High change frequency, core domain, most entry points"

  tier_2_modules:
    - module: "src/subscriptions"
      composite_score: 0.61
      loc: 6200
      entry_points_covered: 8
      rationale: "Medium change frequency, strong domain naming"

  tier_3_modules:
    - module: "src/notifications"
      composite_score: 0.28
      loc: 3100
      entry_points_covered: 2
      rationale: "Low change, supporting domain — extract only if time permits"

  excluded_modules:
    - module: "src/shared"
      composite_score: 0.08
      reason: "Infrastructure utility — shared_utility_penalty applied"

    - module: "src/config"
      composite_score: 0.05
      reason: "Configuration only — no business logic expected"

  coupling_adjustments:
    - added_file: "src/shared/pricing-calculator.ts"
      coupled_to: "src/billing/subscription-service.ts"
      coupling_strength: 0.82
      reason: "Strong temporal coupling — always changes with billing module"

  selected_total_loc: 27700
  selected_entry_point_coverage: "73%"
  estimated_phase_3_duration: "3–4 hours"
```

---

## Completion Criteria

**Checkpoint:** `DD_SLC_001` — Slice Selection Approved

```yaml
heuristic_id: DD_SLC_001
name: "Slice Selection Gate Passed"
blocking: true
required_before: "phase-3-extract"

criteria:
  - slice_selection_yaml_exists: true
  - tier_1_module_count: ">= 1"
  - entry_point_coverage: ">= 60%"
  - no_hard_veto_fired: true
  - chief_review_approved: true

on_fail:
  action: "STOP pipeline — surface coverage gap and ask user for guidance"
  retry_allowed: true
  retry_condition: "User specifies additional focus areas or reduces scope"
```

## Agent Notes

- **No guessing:** If behavioral analysis cannot be performed (no git history), this must be clearly stated in the slice-selection.yaml. Do not invent change frequency scores.
- **Chief approval is required:** The code-cartographer generates the ranked list; the domain-decoder-chief must review and approve before Phase 3 begins. The chief checks that the selection makes business sense, not just algorithmic sense.
- **Temporal coupling is a signal, not a rule:** Adding a coupled file to a slice is a recommendation, not a mandate. If a coupled file is infrastructure (e.g., a shared logger), exclude it despite coupling.
- **Document exclusions:** Every excluded module must have a documented reason. Exclusions are auditable.
