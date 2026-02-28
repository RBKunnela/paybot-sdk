# Task: Phase 1 — Structural Inventory

**Task ID:** phase-1-inventory
**Version:** 1.0
**Agent:** code-cartographer
**Execution Type:** Sequential with parallelizable sub-steps
**Purpose:** Build a complete structural inventory of the codebase — file taxonomy, dependency graph, tech stack fingerprint, and entry points — forming the foundation that all subsequent extraction phases depend on.

---

## Overview

Phase 1 is the foundation scan. Everything extracted in Phases 2–6 is anchored in the structural map built here. The code-cartographer must parse as many source files as possible, build the full import/dependency graph, and identify all system entry points. Incomplete inventory compounds into compounded errors in deep extraction.

```
INPUT: triage-report.yaml (approved, DD_GAP_001 passed)
    ↓
[STEP 1.1] Full file taxonomy — directory tree + file classification
    ↓
[STEP 1.2] Tech stack deep scan — all libraries, versions, configs
    ↓
[STEP 1.3] Dependency graph construction — import/require analysis
    ↓
[STEP 1.4] Entry point identification — main files, API routers, event listeners
    ↓
[STEP 1.5] Module boundary hypothesis — initial bounded context candidates
    ↓
[VETO CHECK] Parse success rate >= 80%
    ↓
OUTPUT: inventory.yaml, dependency-graph.mermaid, tech-stack.yaml, entry-points.yaml
```

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `triage_report` | YAML file | Yes | Output from Phase 0. Contains repo path, scope, language breakdown |
| `repo_path` | string | Yes | Absolute path to cloned/local codebase |
| `scope` | enum | Yes | `full`, `module`, or `feature` from triage |
| `focus_areas` | list | No | Directories to restrict scan to (from triage scope negotiation) |

**Skills to Reuse:**
- `quality-shield:tasks:build-dependency-graph` — import/dependency analysis methodology (reuse as-is)
- `design:tasks:audit-system` — structural inventory methodology (adapt: code structure vs design system)
- `design:tasks:pattern-classify` — pattern classification (adapt: code patterns vs UI patterns)

---

## Preconditions

- [ ] DD_GAP_001 (Triage Gate) has passed
- [ ] `triage-report.yaml` exists and `verdict == "APPROVED"`
- [ ] code-cartographer agent is active
- [ ] Tools available: Glob, Grep, Bash, Read
- [ ] External tools (if available): `dependency-cruiser`, `madge` (JavaScript), `pipdeptree` (Python)

---

## Phase Steps

### Step 1.1: File Taxonomy

**Purpose:** Classify every source file into a structural category so later phases know where to look for each type of information.

**Actions:**
```yaml
file_taxonomy:
  scan_strategy:
    - "Use Glob to list all files in scope"
    - "Exclude: node_modules/, .git/, dist/, build/, __pycache__/, vendor/"
    - "Classify each file by extension and directory pattern"

  classification_schema:
    source:
      - "*.ts, *.js, *.py, *.go, *.java, *.cs, *.rb, *.rs"
    test:
      - "*.test.*, *.spec.*, test_*.py, *_test.go"
      - "Directories: test/, tests/, __tests__, spec/"
    config:
      - "*.yaml, *.yml, *.json (non-package), *.toml, *.ini, *.env.example"
    schema:
      - "*.prisma, *.graphql, *.gql, migrations/, schema.rb, *.sql"
    api_definition:
      - "*.openapi.yaml, swagger.yaml, *.proto"
    documentation:
      - "*.md, *.rst, docs/"
    infrastructure:
      - "Dockerfile, docker-compose.yml, *.tf, k8s/, helm/"

  output_per_file:
    - path: "relative path from repo root"
    - category: "source | test | config | schema | api | docs | infra"
    - language: "TypeScript | Python | SQL | etc."
    - size_loc: "line count"
    - last_modified: "date if available"
```

### Step 1.2: Tech Stack Deep Scan

**Purpose:** Identify every library, framework, and tool used — with versions — to inform which extraction patterns apply in later phases.

**Actions:**
```yaml
tech_stack_scan:
  manifest_files_to_parse:
    javascript:
      - "package.json → dependencies + devDependencies"
      - "package-lock.json or yarn.lock → exact versions"
    python:
      - "requirements.txt, Pipfile, pyproject.toml"
    java:
      - "pom.xml, build.gradle"
    go:
      - "go.mod, go.sum"
    ruby:
      - "Gemfile, Gemfile.lock"
    dotnet:
      - "*.csproj, packages.config"
    rust:
      - "Cargo.toml"

  classify_libraries:
    web_framework: "express, nestjs, fastapi, django, rails, gin, etc."
    orm_database: "prisma, typeorm, sqlalchemy, activerecord, gorm, etc."
    auth_library: "passport, jwt, devise, spring-security, etc."
    testing: "jest, pytest, rspec, junit, etc."
    message_queue: "bull, amqplib, kafka-node, celery, etc."
    payment: "stripe, braintree, paypal-sdk, etc."
    email: "nodemailer, sendgrid, mailgun, etc."
    monitoring: "datadog, sentry, newrelic, etc."
    cache: "ioredis, redis, memcached, etc."

  output:
    tech_stack_yaml: "Full classified library list with versions"
```

### Step 1.3: Dependency Graph Construction

**Purpose:** Build the import/require graph across all source files to reveal module coupling, identify clusters (candidate bounded contexts), and find shared utilities.

**Actions:**
```yaml
dependency_graph:
  extraction_approach:
    typescript_javascript:
      - "Grep: import .* from ['\"]([^'\"]+)['\"] across all *.ts, *.js files"
      - "Grep: require\\(['\"]([^'\"]+)['\"]\\)"
      - "Filter to internal imports only (paths starting with './' or '@/')"
    python:
      - "Grep: from {module} import or import {module}"
      - "Filter to internal packages"
    java:
      - "Grep: import {package}.{class}"
      - "Filter to project package prefix"
    go:
      - "Grep: import statements in go files"
      - "Filter to module path prefix from go.mod"

  graph_construction:
    nodes: "Each source file = one node"
    edges: "Directed edge A → B means A imports B"
    clustering:
      - "Identify clusters with high internal imports, low external imports"
      - "Each cluster = candidate bounded context"
      - "Record: intra-cluster edge density vs inter-cluster edge density"
    shared_utilities:
      - "Files imported by 3+ other modules = shared utility"
      - "Flag: these are high-risk for business logic leakage (utility masquerading as domain)"

  circular_dependency_detection:
    method: "DFS cycle detection on import graph"
    report: "List all circular dependency chains"
    severity:
      - "< 10% files in cycles: LOW"
      - "10–30%: MEDIUM (warn)"
      - "> 30%: HIGH (warn, proceed with caution)"

  output_formats:
    mermaid: |
      graph TD
        A[src/orders/order-service.ts] --> B[src/orders/order-repository.ts]
        A --> C[src/shared/money.ts]
        B --> D[prisma/client]
    yaml: "dependency-graph.yaml with adjacency list"
```

### Step 1.4: Entry Point Identification

**Purpose:** Identify all points where the system receives external input — these are the anchors for L3 workflow tracing and L5 rule extraction.

**Actions:**
```yaml
entry_point_scan:
  categories:
    http_endpoints:
      patterns:
        - "@Get, @Post, @Put, @Delete, @Patch (NestJS/TypeScript decorators)"
        - "app.get, app.post, router.get, router.post (Express)"
        - "@app.route, @bp.route (Flask)"
        - "path(), include() in urls.py (Django)"
        - "func.*http.HandlerFunc (Go)"
        - "@GetMapping, @PostMapping (Spring)"
      output: "Method + path + handler file + handler function"

    event_listeners:
      patterns:
        - "EventEmitter.on, emitter.on (Node.js)"
        - "@OnEvent, @EventPattern (NestJS)"
        - "socket.on, io.on (WebSocket)"
        - "consumer.subscribe (Kafka)"
        - "queue.process (Bull)"
      output: "Event name + handler file + handler function"

    cron_jobs:
      patterns:
        - "@Cron (NestJS)"
        - "schedule.scheduleJob, node-cron"
        - "cron.schedule"
        - "celery @app.task + beat schedule"
        - "@Scheduled (Spring)"
      output: "Cron expression + handler file + description (if in comment)"

    cli_commands:
      patterns:
        - "program.command (Commander.js)"
        - "click.command (Python Click)"
        - "cobra.Command (Go)"
      output: "Command name + handler"

    message_consumers:
      patterns:
        - "@MessagePattern (NestJS Microservices)"
        - "amqplib.channel.consume"
        - "kafka consumer.run"
      output: "Pattern/topic + handler"
```

### Step 1.5: Initial Bounded Context Hypothesis

**Purpose:** Use clustering data from the dependency graph to form initial hypotheses about bounded contexts, which Phase 2 (Slice) and Phase 3 (Extract) will refine.

**Actions:**
```yaml
bounded_context_hypothesis:
  input: "dependency-graph clusters + file taxonomy"
  method:
    - "Each high-cohesion cluster = candidate bounded context"
    - "Name each context based on dominant directory name or entity names within"
    - "Classify: Core | Supporting | Generic (based on business-centricity)"
    - "Record confidence: HIGH (clear isolation) | MEDIUM (partial) | LOW (speculative)"

  naming_heuristics:
    - "Directory named 'orders/' → 'Order Management'"
    - "Directory named 'billing/' or 'payments/' → 'Billing & Payments'"
    - "Shared utilities with no business names → 'Infrastructure / Generic'"
    - "Files named *-service, *-domain, *-aggregate → signal of intentional domain design"
```

---

## Tools Used

| Tool | Layer Application | Usage |
|------|------------------|-------|
| `Glob` | L1 | File discovery and directory tree mapping |
| `Grep` | L1, L2 | Import analysis, framework pattern detection |
| `Read` | L1, L2 | Manifest file parsing (package.json, go.mod, etc.) |
| `Bash` | L1 | `scc` or `cloc` for LOC metrics, `git ls-files` for file list |
| `dependency-cruiser` | L1 | JavaScript/TypeScript dependency graph (if installed) |
| `madge` | L1 | JavaScript circular dependency detection (if installed) |
| `pipdeptree` | L1 | Python dependency tree (if installed) |

---

## Veto Conditions

| ID | Condition | Type | Action |
|----|-----------|------|--------|
| DD_INV_001 | `parse_success_rate < 80%` (fewer than 80% of source files successfully parsed for imports) | HARD VETO | Stop Phase 1. Report which files failed parsing. Require manual remediation or scope narrowing before retry. |
| DD_INV_002 | Primary language detected in triage cannot be parsed by any available import-analysis method | HARD VETO | Stop. Flag language as unsupported. Suggest manual analysis or Tree-sitter integration. |
| DD_INV_W01 | `circular_dependency_rate > 50%` | WARN | Log to inventory — extraction will be significantly harder. Proceed with caution. |
| DD_INV_W02 | `language_count > 5` (confirmed in inventory, not just triage) | WARN | Polyglot codebase — each language requires separate import analysis pass. |
| DD_INV_W03 | `entry_points_found == 0` | WARN | No recognizable entry points — system may use non-standard patterns. Proceed to Phase 2 with flag. |

---

## Outputs

| Artifact | Format | Path | Description |
|----------|--------|------|-------------|
| `inventory.yaml` | YAML | `outputs/{repo-name}/phase-1/inventory.yaml` | Complete file taxonomy, metrics, module list |
| `dependency-graph.mermaid` | Mermaid | `outputs/{repo-name}/phase-1/dependency-graph.mermaid` | Visual import graph |
| `dependency-graph.yaml` | YAML | `outputs/{repo-name}/phase-1/dependency-graph.yaml` | Machine-readable adjacency list |
| `tech-stack.yaml` | YAML | `outputs/{repo-name}/phase-1/tech-stack.yaml` | All libraries with versions and classification |
| `entry-points.yaml` | YAML | `outputs/{repo-name}/phase-1/entry-points.yaml` | All system entry points by category |
| `bounded-context-hypotheses.yaml` | YAML | `outputs/{repo-name}/phase-1/bounded-context-hypotheses.yaml` | Initial context candidates |

---

## Completion Criteria

**Checkpoint:** `DD_INV_001` — Inventory Complete

```yaml
heuristic_id: DD_INV_001
name: "Inventory Gate Passed"
blocking: true
required_before: "phase-2-slice"

criteria:
  - inventory_yaml_exists: true
  - dependency_graph_exists: true
  - tech_stack_yaml_exists: true
  - entry_points_yaml_exists: true
  - parse_success_rate: ">= 80%"
  - no_hard_veto_fired: true
  - bounded_context_hypotheses_count: ">= 1"

on_fail:
  action: "STOP pipeline — surface parse failures to user"
  retry_allowed: true
  retry_condition: "User provides missing parser tools or narrows scope to parseable subset"
```

The `parse_success_rate` is computed as: `(successfully_parsed_source_files / total_source_files) * 100`. A file counts as successfully parsed if at least its imports and its classification could be determined.
