# Task: Quick Scan

**Task ID:** quick-scan
**Version:** 1.0
**Agents:** domain-decoder-chief (triage), code-cartographer (inventory + surface extraction)
**Execution Type:** Sequential — designed to complete in 15 minutes or less
**Purpose:** Perform a fast, surface-level scan of a codebase to produce a high-level overview — tech stack, size, module structure, top hotspots, and a sample of business rules — without committing to a full extraction. Use when the user wants a quick assessment before deciding whether to invest in a full decode.

---

## Overview

Quick Scan runs only Phase 0 (Triage) and Phase 1 (Inventory) plus a basic L4 pattern-matching pass to surface a sample of business rules. It deliberately skips the expensive deep extraction phases (Phase 3 LLM multi-pass). The output is a single quick-scan-report.md that can be read in 5 minutes.

**When to use Quick Scan:**
- User is evaluating whether the codebase warrants full extraction
- User wants a technology audit without the business intelligence detail
- User needs a fast deliverable for a sprint planning discussion
- User is uncertain about scope and wants to see what modules exist before committing

**When NOT to use Quick Scan:**
- Business rules extraction is the goal → use `full-decode`
- Domain model recovery is needed → use `full-decode`
- Any Phase 3–6 output is needed → use `full-decode`

```
INPUT: repo_url or local_path + scope (optional)
    ↓
[PHASE 0] Triage — 5 min
    ↓
[PHASE 1] Inventory — 5 min
    ↓
[BASIC L4 SCAN] Pattern-matching for business rule signals — 5 min
    ↓
OUTPUT: quick-scan-report.md (single file, readable in 5 minutes)
```

---

## Inputs

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `repo_url` | string | Conditional | Git repository URL | `"https://github.com/org/app"` |
| `local_path` | string | Conditional | Absolute local path | `"/projects/legacy-app"` |
| `scope` | enum | No | Defaults to `"full"` for quick scan | `"full"`, `"module"` |
| `focus_areas` | list | No | Specific directories to prioritize in scan | `["src/billing"]` |

---

## Preconditions

- [ ] domain-decoder-chief and code-cartographer agents are active
- [ ] Tools: Glob, Grep, Bash available
- [ ] Target codebase is accessible (cloned or local)

---

## Execution Steps

### Step 1: Run Phase 0 (Abbreviated Triage)

**Run:** `tasks/phase-0-triage.md` — Steps 0.1 through 0.4 only.

Skip: Step 0.5 (complexity scoring) and Step 0.6 (scope negotiation) for speed.

**Record:** Languages, frameworks, total LOC, directory count.

**Time target:** 5 minutes.

**Veto:** Apply Phase 0 hard veto conditions only (obfuscated, no code, <500 LOC).

### Step 2: Run Phase 1 (Abbreviated Inventory)

**Run:** `tasks/phase-1-inventory.md` — Steps 1.1 through 1.4 only.

Skip: Step 1.5 (bounded context hypotheses) — that's Phase 4 work.

**Record:** File taxonomy, tech stack, entry points, top-level module list.

**Time target:** 5 minutes.

**No veto check for quick scan** — record warnings but don't stop.

### Step 3: Basic L4 Pattern Scan (Business Rule Signals)

**Purpose:** Run a fast grep-based pass to surface indicators of business rules — without the full LLM deep read of Phase 3.

**Actions:**
```yaml
quick_business_rule_signals:
  patterns:
    - "Grep for: calculate*, compute*, check*, validate*, canDo*, isEligible*, getPrice*"
    - "Grep for: policy, rule, constraint, limit, threshold in function/class names"
    - "Grep for: if conditions with 3+ branches in service/ domain/ files"
    - "Grep for: RATE_, MAX_, MIN_, FEE_, TAX_, LIMIT_ constants"
    - "Grep for: payment, subscription, billing, pricing keywords"

  output:
    - "Total candidate signals found: N"
    - "Top 10 most significant candidates (highest signal density files)"
    - "3–5 sample rule excerpts (raw code snippets with file references)"
    - "Note: These are SIGNALS, not validated business rules"
    - "Estimated rule count if full extraction is run: rough estimate based on signal density"

  time_limit: "5 minutes — stop when time limit reached, report what was found"
```

### Step 4: Hotspot Identification (If Git History Available)

**Purpose:** If git history is available, identify the top 10 files by change frequency in under 2 minutes.

**Actions:**
```yaml
quick_hotspots:
  command: "git log --name-only --format='' | sort | uniq -c | sort -rn | head -20"
  filter: "Exclude: test files, config files, package.json, lock files"
  output: "Top 10 source files by change frequency with approximate change count"
  time_limit: "2 minutes or skip if git history not available"
```

---

## Output Document

```markdown
# Quick Scan Report: {repo_name}

**Date:** {date}
**Duration:** ~15 minutes
**Type:** Quick Scan (surface-level assessment)
**Note:** This is a quick scan. For full business rule extraction, run `*full-decode`.

---

## At a Glance

| Metric | Value |
|--------|-------|
| Primary Language | {language} |
| Total Lines of Code | {LOC:,} |
| Frameworks | {framework list} |
| Top-Level Modules | {N} |
| Entry Points Found | {N} |
| Business Rule Signals | {N} candidates (estimated {estimated_rules} validated rules) |
| Hotspot Files | {N} identified |
| Recommended Action | {full-decode | targeted-decode | single-agent-analysis} |

---

## Tech Stack

**Backend:** {framework, language, version if detected}
**Frontend:** {framework if detected}
**Database:** {ORM or raw SQL, database type}
**Infrastructure:** {deployment tech if detected}
**Testing:** {test framework}
**Key Libraries:** {top 5-10 notable libraries}

---

## Module Structure

| Module | LOC (approx) | Likely Domain |
|--------|-------------|---------------|
| {directory} | {N} | {inferred business area} |
| ... | | |

---

## Top 10 Hotspots (Most Changed Files)

{If git history available:}

| # | File | Change Count (12 months) | Likely Business Concern |
|---|------|--------------------------|------------------------|
| 1 | {file} | {N} | {inferred purpose} |
| ... | | | |

{If no git history:}
*Git history not available — hotspot analysis requires version control history.*

---

## Business Rule Signals (Sample)

*These are code signals, not validated business rules. Confidence is not assessed.*

**{N} total business-rule signal patterns found across {M} files.**

Top signal concentrations:
- `{file}` — {N} signals (e.g., {function names with business semantics})
- `{file}` — {N} signals
- ...

### Sample Signals (raw)

```
File: {path}
Lines: {N}–{N}
Snippet: {code excerpt}
Signal type: {calculation | validation | policy | calculation}
```

---

## Entry Points

| Type | Count | Notable Examples |
|------|-------|-----------------|
| HTTP Endpoints | {N} | {sample paths} |
| Cron Jobs | {N} | {sample schedules} |
| Event Listeners | {N} | {sample events} |
| Message Consumers | {N} | {sample topics} |

---

## Recommendations

**Recommended next step:** {full-decode | targeted-decode on specific module | single-agent analysis}

**Why:**
{1-2 sentence rationale based on findings}

**Estimated full-decode effort:**
{Based on LOC: small/medium/large estimate with time range}

**Highest-value modules to prioritize (if targeted):**
1. {module} — {reason}
2. {module} — {reason}
3. {module} — {reason}

---

*Quick Scan does not include business rule validation, domain model recovery, or tech debt analysis.*
*Run `*full-decode` for the complete Domain Decoder pipeline.*
```

---

## Veto Conditions

| ID | Condition | Type | Action |
|----|-----------|------|--------|
| QS_001 | `total_loc < 500` | HARD VETO | Reject: too small for even a quick scan. Suggest single-agent analysis. |
| QS_002 | Codebase is obfuscated | HARD VETO | Reject: source code required. |
| QS_W01 | `total_loc > 1000000` | WARN | Quick scan on 1M+ LOC will take longer than 15 minutes. Proceed with focus_areas to limit scope. |

---

## Outputs

| Artifact | Format | Path | Description |
|----------|--------|------|-------------|
| `quick-scan-report.md` | Markdown | `outputs/{repo-name}/quick-scan-report.md` | Complete quick scan report |

---

## Completion Criteria

```yaml
completion_criteria:
  quick_scan_report_exists: true
  tech_stack_section_populated: true
  module_structure_populated: true
  business_rule_signals_section_exists: true
  duration_under_20_minutes: true
  recommendations_section_present: true
```

## Agent Notes

- **15-minute discipline:** Quick scan must deliver results in under 20 minutes. If it takes longer, reduce the signal scan scope. Speed is the product here.
- **Signal ≠ finding:** The business rule signals section must clearly state that these are code patterns, not validated rules. Never present quick scan signals as confirmed business logic.
- **Recommendation must be actionable:** The final recommendation section must give the user a clear next step, not a list of options with no guidance.
- **No Roundtable, no deep LLM reads:** Quick scan is grep-based and pattern-matching only. LLM reasoning is used only for interpreting the scan results, not for deep file analysis.
