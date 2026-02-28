# Task: Full Decode — End-to-End Pipeline

**Task ID:** full-decode
**Version:** 1.0
**Agent:** domain-decoder-chief (orchestrator)
**Execution Type:** Sequential pipeline with parallel sub-phases (Phase 3 and Phase 4 use internal parallelism)
**Purpose:** Execute the complete 7-phase Domain Decoder pipeline end-to-end, from triage through documentation delivery. This is the primary entry task — the command a user invokes when they want a full codebase extraction with no shortcuts.

---

## Overview

`full-decode` is the main orchestration task. It sequences all 7 phases, enforces checkpoint gates between each, handles VETO conditions by surfacing them to the user, and produces the complete extraction package in `outputs/{repo-name}/`.

The chief's role in `full-decode` is coordination and quality control — not execution. Each phase is delegated to its specialist agent(s). The chief monitors progress, applies veto gates, and steps in for scope decisions.

```
USER INPUT: repo_url or local_path + scope + focus_areas (optional)
    ↓
[PHASE 0] domain-decoder-chief: Triage
    → Checkpoint DD_GAP_001 (VETO if fail)
    ↓
[PHASE 1] code-cartographer: Structural Inventory
    → Checkpoint DD_INV_001 (VETO if fail)
    ↓
[PHASE 2] code-cartographer + chief: Slice Selection
    → Checkpoint DD_SLC_001 (VETO if fail)
    ↓
[PHASE 3] rule-archaeologist || domain-modeler (PARALLEL): Deep Extraction
    → Checkpoint DD_SUM_001 (VETO if fail)
    ↓
[PHASE 4] domain-modeler || business-model-analyst (PARALLEL): Model Recovery
    → Checkpoint DD_DDD_001 (VETO if fail)
    ↓
[PHASE 5] validation-arbiter: Validation (BLOCKING gate)
    → Checkpoint DD_VAL_001 (HARD VETO — must score >= 0.70)
    ↓
[PHASE 6] documentation-scribe || tech-debt-geologist (PARALLEL): Documentation
    → Checkpoint DD_DOC_001 (VETO if fail)
    ↓
DELIVERY: outputs/{repo-name}/final/
```

---

## Inputs

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `repo_url` | string | Conditional | Git repository URL to analyze | `"https://github.com/org/app"` |
| `local_path` | string | Conditional | Absolute path to local codebase | `"/projects/legacy-app"` |
| `scope` | enum | Yes | Extraction breadth | `"full"`, `"module"`, `"feature"` |
| `focus_areas` | list | No | Directories to prioritize (required if scope=module) | `["src/billing", "src/orders"]` |
| `mode` | enum | Yes | Execution mode | `"incremental"` (checkpoints pause for approval) or `"autonomous"` (proceed automatically) |
| `skip_phases` | list | No | Phases to skip (only for re-runs) | `[0, 1, 2]` (skip triage/inventory/slice if already done) |

One of `repo_url` or `local_path` is required.

---

## Preconditions

- [ ] domain-decoder-chief agent is active
- [ ] All specialist agents are available: code-cartographer, rule-archaeologist, domain-modeler, business-model-analyst, validation-arbiter, documentation-scribe, tech-debt-geologist
- [ ] Write access to `outputs/` directory
- [ ] If `repo_url`: Git and network access available

---

## Orchestration Protocol

### Checkpoint Behavior

```yaml
checkpoint_protocol:
  incremental_mode:
    - "At each checkpoint, pause and present results to user"
    - "Show: phase outputs summary, any warnings, next phase description"
    - "Await: user confirmation to proceed OR user instruction to adjust"
    - "User can: approve (continue), adjust scope, re-run phase, or abort"

  autonomous_mode:
    - "At each checkpoint, validate gate automatically"
    - "PASS: log to progress file and proceed immediately"
    - "WARN: log warning, proceed"
    - "VETO (HARD): STOP, surface veto to user — always requires human decision"
    - "Note: HARD VETOs always pause even in autonomous mode"

  veto_handling:
    hard_veto:
      - "Stop pipeline immediately"
      - "Write veto-report.yaml to outputs/{repo-name}/ with: phase, condition, evidence"
      - "Display veto reason and resolution options to user"
      - "Await user decision: adjust scope, retry with parameters, or abort"
    warn:
      - "Log to pipeline-log.yaml with timestamp"
      - "Continue — warn does not stop the pipeline"
```

### Progress Tracking

```yaml
pipeline_log:
  file: "outputs/{repo-name}/pipeline-log.yaml"
  per_phase_entry:
    phase: "phase-{N}"
    started_at: "{ISO 8601}"
    completed_at: "{ISO 8601}"
    duration_minutes: N
    checkpoint_id: "DD_{XXX}_{NNN}"
    status: "passed | vetoed | warned"
    warnings: []
    agents_used: []
    output_files: []
```

### Phase Sequencing with Dependency Map

```yaml
phase_dependencies:
  phase_0:
    task: "tasks/phase-0-triage.md"
    depends_on: []
    blocks: [phase_1]

  phase_1:
    task: "tasks/phase-1-inventory.md"
    depends_on: [phase_0]
    blocks: [phase_2]

  phase_2:
    task: "tasks/phase-2-slice.md"
    depends_on: [phase_1]
    blocks: [phase_3]

  phase_3:
    task: "tasks/phase-3-extract.md"
    depends_on: [phase_2]
    blocks: [phase_4]
    internal_parallelism: ["rule-archaeologist", "domain-modeler"]

  phase_4:
    task: "tasks/phase-4-model.md"
    depends_on: [phase_3]
    blocks: [phase_5]
    internal_parallelism: ["domain-modeler", "business-model-analyst"]

  phase_5:
    task: "tasks/phase-5-validate.md"
    depends_on: [phase_3, phase_4]
    blocks: [phase_6]
    note: "Blocking gate — composite score must be >= 0.70 before Phase 6 can start"

  phase_6:
    task: "tasks/phase-6-document.md"
    depends_on: [phase_5]
    blocks: [delivery]
    internal_parallelism: ["documentation-scribe", "tech-debt-geologist"]
```

---

## Chief's Decision Points

The chief acts at these specific decision points — not during specialist execution:

| Decision Point | Chief Action | Timing |
|----------------|-------------|--------|
| After Phase 0 Triage | Review triage report, confirm scope, approve or re-scope | After DD_GAP_001 check |
| After Phase 2 Slice Selection | Review slice selection — does it make business sense? | After DD_SLC_001 check |
| VETO on any phase | Surface to user, present options, await guidance | Immediately on VETO |
| After Phase 5 Validation | Review composite score, acceptance/rejection rates | After DD_VAL_001 check |
| On completion | Generate pipeline summary, deliver package location | After DD_DOC_001 check |

---

## Pipeline Summary Report

On successful completion, the chief generates a pipeline summary:

```yaml
pipeline_summary:
  filename: "outputs/{repo-name}/pipeline-summary.yaml"
  content:
    repo_analyzed: "{name}"
    extraction_date: "{date}"
    total_duration_minutes: N
    phases_completed: 7
    checkpoint_ids:
      - "DD_GAP_001: PASSED"
      - "DD_INV_001: PASSED"
      - "DD_SLC_001: PASSED (entry point coverage: 73%)"
      - "DD_SUM_001: PASSED (142 rules extracted)"
      - "DD_DDD_001: PASSED (5 bounded contexts)"
      - "DD_VAL_001: PASSED (composite score: 0.78)"
      - "DD_DOC_001: PASSED (9 output documents)"
    final_outputs:
      location: "outputs/{repo-name}/final/"
      files: [...]
    key_metrics:
      business_rules_extracted: 142
      bounded_contexts: 5
      domain_terms: 87
      tech_debt_items: 34
      composite_validation_score: 0.78
      items_for_human_review: 12
    agents_used: [...]
    warnings_logged: 2
    vetoes_encountered: 0
```

---

## Outputs

| Artifact | Format | Path | Description |
|----------|--------|------|-------------|
| `pipeline-log.yaml` | YAML | `outputs/{repo-name}/pipeline-log.yaml` | Real-time phase progress log |
| `pipeline-summary.yaml` | YAML | `outputs/{repo-name}/pipeline-summary.yaml` | Final summary of extraction results |
| `outputs/{repo-name}/final/` | Directory | Full path | All Phase 6 documentation outputs |
| Per-phase subdirectories | Directories | `outputs/{repo-name}/phase-{N}/` | Raw extraction outputs (audit trail) |

---

## Veto Conditions

All veto conditions from each phase task apply. The chief enforces them at each phase transition. See individual phase task files for specific conditions.

---

## Completion Criteria

```yaml
completion_criteria:
  all_phase_checkpoints_passed:
    - DD_GAP_001
    - DD_INV_001
    - DD_SLC_001
    - DD_SUM_001
    - DD_DDD_001
    - DD_VAL_001
    - DD_DOC_001
  pipeline_summary_generated: true
  final_output_directory_populated: true
  no_pending_vetoes: true
```

## Agent Notes

- **Idempotency:** Re-running `full-decode` with `skip_phases: [0, 1, 2]` on the same repo must produce consistent results. Phase outputs are written to versioned directories — they are never overwritten.
- **Audit trail:** Every file produced in every phase is retained. The `outputs/{repo-name}/` directory is the complete audit trail of the extraction.
- **Manual escape:** At any point, a `*pause` command stops the pipeline and surfaces the current state. The chief saves the pipeline-log and presents the current phase state.
- **Re-run from checkpoint:** If a VETO occurs at Phase 3, the user can fix the issue and re-run starting from Phase 3 only — Phases 0, 1, and 2 outputs are reused.
