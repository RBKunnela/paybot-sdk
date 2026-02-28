---
name: story
description: |
  Technical analysis skill for new functionalities.
  Analyzes codebase, researches patterns, evaluates feasibility, and produces
  a technical brief that feeds into story creation.
  Pipeline: Scope > Codebase Scan > Tech Research > Feasibility > Brief.
  Output: docs/stories/analysis/{slug}-technical-analysis.md
---

# Story — Technical Analysis for New Functionalities

Analyzes proposed features technically before story creation. Bridges the gap between an idea and an actionable story.

## Quick Start

```
/story "Add real-time notifications to the dashboard"
```

## Activation

1. Parse feature description from `$ARGUMENTS` (or ask if not provided)
2. Execute 5-phase technical analysis
3. Save to `docs/stories/analysis/{slug}-technical-analysis.md`

**CRITICAL:**
- NEVER implement code. Output is analysis only.
- NEVER create stories directly. Redirect to @po for story creation.
- NEVER write files outside `docs/stories/analysis/`.

---

## SKILL DEFINITION

```yaml
skill:
  name: Story Technical Analysis
  id: story

veto_conditions:
  - id: VETO_IMPLEMENTATION_REQUEST
    trigger: "User asks to implement, code, deploy, or build"
    action: "REDIRECT: 'Implementation is not my scope. Use @dev for execution or @po for story creation.'"
    keywords:
      - "implementa"
      - "build this"
      - "code this"
      - "deploy"
      - "implement"
      - "faz o codigo"
      - "desenvolve"

  - id: VETO_STORY_CREATION
    trigger: "User asks to create the actual story"
    action: "REDIRECT: 'Story creation is @po scope. Run: @po *create-story with this analysis as input.'"

  - id: VETO_FORBIDDEN_PATH
    trigger: "Attempt to write outside docs/stories/analysis/"
    action: "BLOCK + Error: 'Writing outside docs/stories/analysis/ is forbidden.'"

constraints:
  forbidden_actions:
    - NEVER implement code or production artifacts
    - NEVER create stories (redirect to @po)
    - NEVER create files outside docs/stories/analysis/
    - NEVER modify existing source code
    - NEVER write to .claude/agents/, .claude/skills/, squads/, src/

tool_hierarchy:
  codebase_search:
    primary: "Glob + Grep (always available)"
    secondary: "Read tool for deep file inspection"

  external_research:
    1_preferred: "Context7 MCP (resolve-library-id + query-docs) - for library docs"
    2_fallback: "WebSearch + WebFetch - for patterns, APIs, best practices"
    detection: "Try Context7 first for known libraries. WebSearch for everything else."

  workers:
    type: "general-purpose"
    model: "haiku"
    max_parallel: 3

workflow:
  phases:

    # ──────────────────────────────────────────────
    # PHASE 1: SCOPE DEFINITION
    # ──────────────────────────────────────────────
    1_scope:
      name: "Scope Definition"
      model_tier: "MAIN MODEL (inline)"
      description: |
        Parse the feature request and define clear scope boundaries.

      execution: |
        1. Read user's feature description (original text, unmodified)

        2. EXTRACT:
           - feature_name: Short name for the feature
           - feature_description: What the feature does (1-2 sentences)
           - scope_in: What IS included
           - scope_out: What is NOT included (boundaries)
           - affected_layers: Which layers are affected (CLI, Observability, UI)
           - estimated_complexity: S / M / L / XL (initial estimate)

        3. VALIDATE against AIOS principles:
           - CLI First: Does this feature work via CLI?
           - Story-Driven: Can this be broken into stories?
           - No Invention: Does this follow existing patterns?

        4. IF scope is unclear or too broad:
           - Ask ONE clarifying question using AskUserQuestion
           - Example: "This touches both CLI and UI. Should I focus on CLI-first implementation only?"

      output: "scope_definition object"

    # ──────────────────────────────────────────────
    # PHASE 2: CODEBASE SCAN
    # ──────────────────────────────────────────────
    2_codebase_scan:
      name: "Codebase Scan"
      model_tier: "MAIN MODEL + HAIKU workers"
      description: |
        Scan the existing codebase to understand current patterns,
        identify integration points, and find related code.

      execution: |
        1. IDENTIFY search targets from scope:
           - Related modules/files (Glob patterns)
           - Similar functionality (Grep patterns)
           - Configuration files that may need changes
           - Test files for related features

        2. DISPATCH up to 3 parallel Haiku workers:

           Worker A: "Pattern Discovery"
           - Search for similar implementations in codebase
           - Identify design patterns used (hooks, commands, agents, skills)
           - Map file structure for affected areas

           Worker B: "Dependency Mapping"
           - Identify modules this feature would depend on
           - Check for existing utilities that can be reused
           - Map the import graph for affected areas

           Worker C: "Test Coverage Scan"
           - Find existing tests for related features
           - Identify test patterns used (unit, integration)
           - Estimate test effort required

        3. AGGREGATE results:
           - existing_patterns: [{file, pattern, description}]
           - integration_points: [{file, line, what}]
           - reusable_modules: [{module, purpose, how_to_use}]
           - test_patterns: [{file, type, coverage}]
           - affected_files: [list of files that would change]

      output: "codebase_scan_result JSON"

    # ──────────────────────────────────────────────
    # PHASE 3: TECHNICAL RESEARCH
    # ──────────────────────────────────────────────
    3_tech_research:
      name: "Technical Research"
      model_tier: "HAIKU workers"
      description: |
        Research external patterns, libraries, and best practices
        relevant to the proposed feature.

      execution: |
        1. DETERMINE research needs from scope:
           - New libraries/APIs needed?
           - External patterns to follow?
           - Security considerations?
           - Performance benchmarks?

        2. IF external research needed:
           Dispatch up to 2 Haiku workers:

           Worker A: "Library & API Research"
           - Search for relevant libraries (Context7 or WebSearch)
           - Check compatibility with existing stack (Node.js, Jest, YAML)
           - Compare alternatives if multiple options exist

           Worker B: "Pattern & Best Practices"
           - Search for implementation patterns (WebSearch)
           - Find security best practices for this feature type
           - Look for common pitfalls and anti-patterns

        3. IF no external research needed (pure internal feature):
           - Skip this phase
           - Note: "No external dependencies identified"

        4. AGGREGATE:
           - recommended_libraries: [{name, version, why}]
           - patterns_to_follow: [{pattern, source, applicability}]
           - security_considerations: [list]
           - performance_notes: [list]

      output: "tech_research_result JSON"

    # ──────────────────────────────────────────────
    # PHASE 4: FEASIBILITY ASSESSMENT
    # ──────────────────────────────────────────────
    4_feasibility:
      name: "Feasibility Assessment"
      model_tier: "MAIN MODEL"
      description: |
        Evaluate feasibility, estimate effort, identify risks,
        and determine implementation approach.

      execution: |
        ultrathink

        1. ANALYZE all gathered data:
           - Codebase patterns + external research + scope

        2. ASSESS:
           - technical_feasibility: HIGH / MEDIUM / LOW
           - effort_estimate: S (1-2h) / M (4-8h) / L (2-3 days) / XL (1+ week)
           - risk_level: LOW / MEDIUM / HIGH
           - breaking_changes: true/false + details

        3. IDENTIFY RISKS:
           For each risk:
           - description: What could go wrong
           - probability: LOW / MEDIUM / HIGH
           - impact: LOW / MEDIUM / HIGH
           - mitigation: How to prevent or handle it

        4. DETERMINE APPROACH:
           - recommended_approach: Description of how to implement
           - alternative_approaches: Other valid options with tradeoffs
           - implementation_order: Suggested phase/task breakdown
           - dependencies: What must exist before this can be built

        5. MAP TO AIOS ARTIFACTS:
           - needs_command: true/false + which command
           - needs_hook: true/false + which hook
           - needs_agent_update: true/false + which agents
           - needs_skill: true/false + which skill
           - needs_template: true/false + which template
           - needs_workflow: true/false + which workflow
           - needs_tests: true/false + what kind

      output: "feasibility_assessment JSON"

    # ──────────────────────────────────────────────
    # PHASE 5: DOCUMENT
    # ──────────────────────────────────────────────
    5_document:
      name: "Document Technical Brief"
      model_tier: "MAIN MODEL"
      description: |
        Produce the final technical analysis document.
        This document feeds directly into @po story creation.

      execution: |
        1. Write technical analysis document with ALL sections
        2. Save to docs/stories/analysis/{slug}-technical-analysis.md
        3. Print summary to user
        4. Suggest next steps: "@po *create-story based on this analysis"

      output_template: |
        # Technical Analysis: {feature_name}

        **Date:** {YYYY-MM-DD}
        **Requested by:** {user or auto}
        **Complexity:** {S/M/L/XL}
        **Feasibility:** {HIGH/MEDIUM/LOW}
        **Risk:** {LOW/MEDIUM/HIGH}

        ---

        ## 1. Feature Overview

        **Description:** {feature_description}

        **Scope IN:**
        - {scope_in items}

        **Scope OUT:**
        - {scope_out items}

        **Affected Layers:** {CLI / Observability / UI}

        ---

        ## 2. Codebase Analysis

        ### Existing Patterns
        | File | Pattern | Relevance |
        |------|---------|-----------|
        | {file} | {pattern} | {how it relates} |

        ### Integration Points
        - {file:line} — {what connects here}

        ### Reusable Modules
        - {module} — {can be reused for X}

        ---

        ## 3. Technical Research

        ### Libraries / Dependencies
        | Library | Version | Purpose | Status |
        |---------|---------|---------|--------|
        | {name} | {ver} | {why} | New / Existing |

        ### Patterns & Best Practices
        - {pattern from research}

        ### Security Considerations
        - {security note}

        ---

        ## 4. Feasibility Assessment

        | Dimension | Rating | Notes |
        |-----------|--------|-------|
        | Technical Feasibility | {HIGH/MED/LOW} | {why} |
        | Effort Estimate | {S/M/L/XL} | {hours/days} |
        | Risk Level | {LOW/MED/HIGH} | {primary risk} |
        | Breaking Changes | {Yes/No} | {details} |

        ### Risks
        | Risk | Probability | Impact | Mitigation |
        |------|------------|--------|------------|
        | {risk} | {P} | {I} | {how to handle} |

        ---

        ## 5. Recommended Approach

        {Description of how to implement}

        ### Implementation Phases
        1. {Phase 1}: {description} ({effort})
        2. {Phase 2}: {description} ({effort})

        ### Alternative Approaches
        - {Alternative A}: {tradeoffs}

        ---

        ## 6. AIOS Artifacts Required

        | Artifact | Type | Name | Description |
        |----------|------|------|-------------|
        | {artifact} | Command/Hook/Agent/Skill/Template/Workflow | {name} | {what it does} |

        ### Files to Create
        - {new_file_path} — {purpose}

        ### Files to Modify
        - {existing_file_path} — {what changes}

        ### Tests Required
        - {test_type}: {what to test}

        ---

        ## 7. Next Steps

        1. **Create Story:** `@po *create-story` using this analysis
        2. **Architecture Review:** `@architect` validate approach (if L/XL)
        3. **Implementation:** `@dev` execute story tasks
        4. **Quality Gate:** `@qa` validate implementation

        ---

        *Generated by /story skill — Technical Analysis Pipeline*

security:
  - Never include API keys or secrets
  - Never modify source code
  - Never create production artifacts
  - Only write to docs/stories/analysis/

scope_boundaries:
  allowed_paths:
    - "docs/stories/analysis/**"
  forbidden_paths:
    - ".claude/agents/"
    - ".claude/skills/"
    - "squads/"
    - "src/"
    - "app/"
    - "lib/"
    - "*.ts"
    - "*.tsx"
    - "*.js"
    - "*.py"
  exception: "Code examples within analysis markdown are allowed for DOCUMENTATION only"
```

---

## Execution Flow

```
Feature Request → Scope Definition (MAIN MODEL)
                        |
              [Codebase Scan]  ←── 3 Haiku workers (patterns, deps, tests)
                        |
              [Tech Research]  ←── 2 Haiku workers (libraries, practices)
                        |
              [Feasibility]    ←── MAIN MODEL (ultrathink)
                        |
              [Document]       ←── Technical Analysis Brief
                        |
              → @po *create-story (suggested next step)
```

## When to Use This Skill

| Scenario | Use /story? | Why |
|----------|------------|-----|
| New feature idea | YES | Analyze feasibility before committing to a story |
| Bug fix | NO | Use @dev directly or @qa for investigation |
| Refactoring proposal | YES | Analyze impact and approach |
| New agent/command | YES | Analyze patterns, integration points |
| Documentation update | NO | Just do it directly |
| Performance optimization | YES | Research patterns, benchmark, assess risk |

## What This Skill Does NOT Do

- Does not implement code
- Does not create stories (redirects to @po)
- Does not create agents, skills, or commands
- Does not modify existing files
- Does not deploy anything
- Does not run tests

## Output Structure

```
docs/stories/analysis/
└── {slug}-technical-analysis.md   # Complete technical brief
```

## Integration with Story Workflow

```
/story "feature idea"
    ↓
docs/stories/analysis/{slug}-technical-analysis.md
    ↓
@po *create-story (uses analysis as input)
    ↓
docs/stories/{epic}/{story}.md
    ↓
@dev implements → @qa tests → @devops push
```
