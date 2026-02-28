# Task: Phase 0 — Triage

**Task ID:** phase-0-triage
**Version:** 1.0
**Agent:** domain-decoder-chief
**Execution Type:** Sequential
**Purpose:** Receive target codebase, run initial assessment (language detection, size estimation, framework identification), and determine whether the codebase is viable for extraction and at what scope.

---

## Overview

Phase 0 is the entry gate for the entire Domain Decoder pipeline. Before committing any extraction resources, the chief must assess whether the codebase is structured, accessible, and large enough to warrant squad-level analysis. This phase also determines scope narrowing for large codebases.

```
INPUT: repo_url or local_path
    ↓
[STEP 0.1] Clone/access repository
    ↓
[STEP 0.2] Run L1 code pattern scan (automated, 5–10 min)
    ↓
[STEP 0.3] Measure codebase metrics (LOC, languages, age, contributors)
    ↓
[STEP 0.4] Detect tech stack and framework fingerprints
    ↓
[STEP 0.5] Assess extraction difficulty (monolith vs distributed, test coverage, doc quality)
    ↓
[STEP 0.6] Scope negotiation (if >500K LOC without module focus)
    ↓
[VETO CHECK] Apply veto conditions
    ↓
OUTPUT: triage-report.yaml
```

---

## Inputs

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `repo_url` | string | Conditional | Git repository URL | `"https://github.com/org/legacy-app"` |
| `local_path` | string | Conditional | Absolute path to local codebase | `"/home/user/projects/legacy-app"` |
| `scope` | enum | Yes | Extraction scope | `"full"`, `"module"`, `"feature"` |
| `focus_areas` | list | No | Specific modules or directories to prioritize | `["src/billing", "src/orders"]` |
| `available_docs` | list | No | Paths to README, wiki, ADRs, or any documentation | `["README.md", "docs/architecture.md"]` |
| `stakeholder_context` | string | No | What stakeholders believe the system does | `"B2B SaaS order management platform"` |

One of `repo_url` or `local_path` is required.

---

## Preconditions

- [ ] domain-decoder-chief agent is active
- [ ] Repository is accessible (credentials provided if private)
- [ ] Write permissions exist for `outputs/{repo-name}/` directory
- [ ] Tools available: Glob, Grep, Bash (for `git log`, `wc -l`, `cloc` or `scc`)

---

## Phase Steps

### Step 0.1: Access Repository

**Actions:**
```yaml
repository_access:
  if_remote:
    - "Verify URL is reachable"
    - "Clone to temporary working directory"
    - "Record clone timestamp and commit hash"
  if_local:
    - "Verify path exists and is a directory"
    - "Check for .git directory (version-controlled vs export)"
    - "Record last-modified timestamp"

  output:
    repo_path: "{local path to codebase}"
    has_git_history: true|false
    head_commit: "{SHA if available}"
```

### Step 0.2: Language and Framework Detection

**Actions:**
```yaml
detection_scan:
  tools:
    - "Glob: *.json, *.toml, *.gemfile, *.gradle, *.csproj, go.mod, Cargo.toml"
    - "Grep: framework keywords in manifest files"
    - "Bash: cloc or scc for per-language line counts"

  detect:
    primary_language: "Language with highest LOC percentage"
    secondary_languages: "Languages > 5% of total LOC"
    frameworks:
      - "package.json → Node.js/npm ecosystem → check for express, nestjs, next, react, vue"
      - "pom.xml / build.gradle → Java/JVM → check for spring, quarkus, micronaut"
      - "Gemfile → Ruby → check for rails, sinatra"
      - "requirements.txt / pyproject.toml → Python → check for django, fastapi, flask"
      - "go.mod → Go → check for gin, echo, fiber"
      - "*.csproj → .NET → check for asp.net, entity framework"
      - "Cargo.toml → Rust → check for actix, axum"
    architecture_hints:
      - "Folder names: controllers/, services/, repositories/, domain/, application/"
      - "Presence of docker-compose.yml → multi-service"
      - "Presence of terraform/ or k8s/ → infrastructure-heavy"
```

### Step 0.3: Codebase Metrics

**Actions:**
```yaml
metrics_collection:
  mandatory:
    - total_files: "wc -l on file list or cloc output"
    - total_loc: "Source lines of code (excluding blanks and comments)"
    - language_breakdown: "Percentage per language"
    - directory_count: "Number of top-level source directories"

  git_history_metrics (if has_git_history):
    - oldest_commit_date: "git log --reverse --format='%ci' | head -1"
    - newest_commit_date: "git log -1 --format='%ci'"
    - contributor_count: "git log --format='%ae' | sort -u | wc -l"
    - total_commits: "git rev-list --count HEAD"
    - commits_last_90_days: "git log --since='90 days ago' --oneline | wc -l"

  test_coverage_hint:
    - "Count test files: Glob **/*.test.*, **/*.spec.*, test/**, tests/**, __tests__/**"
    - "Ratio: test_files / source_files (rough coverage indicator)"
```

### Step 0.4: Complexity Assessment

**Actions:**
```yaml
complexity_scoring:
  dimensions:
    monolith_vs_distributed:
      monolith: 1      # Single deployable unit
      modular_monolith: 2
      micro_services: 3  # Multiple services = more L6 extraction work
    test_coverage:
      high: 1    # >60% test ratio — better L5 triangulation
      medium: 2  # 30–60%
      low: 3     # <30% — harder L5 confidence
    documentation_quality:
      good: 1    # README + ADRs + inline comments
      partial: 2
      none: 3
    code_age:
      recent: 1  # <3 years — likely modern patterns
      medium: 2  # 3–8 years
      legacy: 3  # >8 years — higher L8 debt, but more stable L5 rules
    language_count:
      single: 1
      dual: 2
      polyglot: 3  # 3+ languages — extraction complexity multiplier

  estimated_extraction_depth:
    - score <= 5: "Full extraction (L1–L8), high confidence expected"
    - score 6–9: "Full extraction, MEDIUM confidence baseline"
    - score >= 10: "Selective extraction recommended — focus on L5–L7 in high-value modules"
```

### Step 0.5: Scope Determination

**Actions:**
```yaml
scope_negotiation:
  if_scope == "full" AND total_loc > 500000:
    action: "VETO — must narrow scope"
    message: |
      Codebase exceeds 500K LOC without module focus.
      Full extraction would require 15–25+ hours of LLM processing.
      Please specify focus_areas (e.g., ["src/billing", "src/orders"]).
    resolution: "Wait for user to specify modules, then re-run with scope='module'"

  if_scope == "module":
    action: "Apply focus_areas filter to all subsequent phases"
    scope_boundary: "Only extract from files within focus_areas directories"

  if_scope == "feature":
    action: "Follow feature's call graph from entry point"
    requires: "focus_areas must include entry point file or API endpoint"
```

### Step 0.6: Generate Triage Report

**Actions:**
```yaml
report_generation:
  output_file: "outputs/{repo-name}/triage-report.yaml"
  sections:
    - languages: "Detected languages with LOC counts and percentages"
    - frameworks: "Identified frameworks and libraries"
    - loc: "Total source lines of code (excluding test files)"
    - modules: "Top-level module list with approximate LOC per module"
    - estimated_complexity: "Score and interpretation"
    - recommended_extraction_depth: "Which layers are feasible given complexity score"
    - git_summary: "If available: age, contributor count, commit velocity"
    - test_coverage_hint: "Test file ratio and estimated triangulation quality"
    - warnings: "List of WARNs (non-blocking)"
    - recommended_scope: "Confirmed scope after negotiation"
    - estimated_duration: "Per-phase and total time estimate"
```

---

## Veto Conditions

| ID | Condition | Type | Action |
|----|-----------|------|--------|
| DD_T_001 | `total_loc < 500` | HARD VETO | Reject: too small for squad-level extraction. Use single-agent analysis instead. |
| DD_T_002 | `total_loc > 500000 AND scope == "full"` | HARD VETO | Block: must narrow scope to specific modules before proceeding. |
| DD_T_003 | Codebase is obfuscated or minified without source maps | HARD VETO | Reject: not extractable — source code required. |
| DD_T_004 | No executable code found (documentation-only repo) | HARD VETO | Reject: Domain Decoder requires source code, not documentation. |
| DD_T_005 | Primary language undetectable (0 manifest files, no recognizable structure) | HARD VETO | Reject: requires manual assessment before automated extraction. |
| DD_T_W01 | `test_file_ratio < 0.1` (less than 10% test files) | WARN | Proceed with caution — L5 triangulation via tests will be limited. |
| DD_T_W02 | `contributor_count == 1 AND comments_density < 5%` | WARN | Knowledge silo risk — all business context lives in one person's head. |
| DD_T_W03 | `language_count > 5` | WARN | Polyglot complexity multiplier — extraction will be slower and confidence lower. |
| DD_T_W04 | `newest_commit_date > 6 months ago` | WARN | Repository may be abandoned — validate that extraction is still relevant. |

---

## Outputs

| Artifact | Format | Path | Description |
|----------|--------|------|-------------|
| `triage-report.yaml` | YAML | `outputs/{repo-name}/triage-report.yaml` | Complete triage assessment with all metrics |

### triage-report.yaml Schema

```yaml
triage_report:
  repo_name: "{name}"
  repo_url: "{url or local_path}"
  extraction_date: "{ISO 8601}"
  head_commit: "{SHA}"

  languages:
    primary: "{language}"
    breakdown:
      - { language: "TypeScript", loc: 45000, percentage: "72%" }
      - { language: "SQL", loc: 8000, percentage: "13%" }

  frameworks:
    - { name: "NestJS", type: "backend_framework", confidence: "HIGH" }
    - { name: "Prisma", type: "orm", confidence: "HIGH" }
    - { name: "React", type: "frontend_framework", confidence: "MEDIUM" }

  metrics:
    total_files: 342
    total_loc: 63000
    test_files: 89
    test_file_ratio: "26%"
    top_level_modules:
      - { name: "src/orders", loc: 12000 }
      - { name: "src/billing", loc: 9500 }
      - { name: "src/users", loc: 8000 }

  git_summary:
    oldest_commit: "2019-03-12"
    newest_commit: "2026-01-30"
    age_years: 6.9
    contributor_count: 14
    total_commits: 2847
    commits_last_90_days: 43

  complexity:
    score: 7
    interpretation: "Full extraction, MEDIUM confidence baseline"
    recommended_extraction_depth: "L1–L7 (skip L8 unless git history confirms hotspots)"

  scope:
    confirmed_scope: "full"
    focus_areas: []
    rationale: "LOC within limits, scope accepted"

  extraction_estimate:
    phase_0: "15 min (complete)"
    phase_1: "30 min"
    phase_2: "30 min"
    phase_3: "3–4 hours"
    phase_4: "30 min"
    phase_5: "45 min"
    phase_6: "45 min"
    total: "~6.5 hours"

  warnings:
    - "Test file ratio is 26% — L5 triangulation via tests will be partial"

  verdict: "APPROVED — proceed to Phase 1"
```

---

## Completion Criteria

**Checkpoint:** `DD_GAP_001` — Triage Approved

```yaml
heuristic_id: DD_GAP_001
name: "Triage Gate Passed"
blocking: true
required_before: "phase-1-inventory"

criteria:
  - triage_report_exists: true
  - no_hard_veto_fired: true
  - scope_confirmed: true
  - extraction_estimate_generated: true
  - verdict_is_approved: true

on_fail:
  action: "STOP pipeline — surface veto reason to user"
  retry_allowed: true
  retry_condition: "User adjusts scope or provides different target"
```

All criteria must pass for Phase 1 to begin. Warnings do not block progression but are logged to the triage report.

---

## Agent Notes

- **Read-only mode:** Domain Decoder NEVER modifies the target codebase. All outputs go to `outputs/{repo-name}/`.
- **Tool priority:** Use Glob for file discovery, Grep for pattern detection, Bash only for `git log` and `scc`/`cloc` commands.
- **Estimation honesty:** If metrics suggest extraction will be slow or confidence will be low, surface this clearly in the triage report. Better to set expectations here than to deliver a low-quality final output.
- **Scope creep prevention:** Scope confirmed in Phase 0 cannot be expanded in later phases without re-running triage.
