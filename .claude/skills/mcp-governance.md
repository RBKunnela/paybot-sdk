---
name: mcp-governance
description: MCP Server governance rules, configuration architecture, and usage guidelines. Invoke when MCP configuration, troubleshooting, or management is needed.
---

# MCP Server Usage Rules - AIOS Architecture

## MCP Governance

**IMPORTANT:** All MCP infrastructure management is handled EXCLUSIVELY by the **DevOps Agent (@devops / Gage)**.

| Operation | Agent | Command |
|-----------|-------|---------|
| Search MCP catalog | DevOps | `*search-mcp` |
| Add MCP server | DevOps | `*add-mcp` |
| List enabled MCPs | DevOps | `*list-mcps` |
| Remove MCP server | DevOps | `*remove-mcp` |
| Setup Docker MCP | DevOps | `*setup-mcp-docker` |

Other agents are MCP **consumers**, not administrators. Delegate MCP management to @devops.

---

## MCP Configuration Architecture

### Direct in Claude Code (global ~/.claude.json)
| MCP | Purpose |
|-----|---------|
| **playwright** | Browser automation, screenshots, web testing |
| **desktop-commander** | Docker container operations via docker-gateway |

### Inside Docker Desktop (via docker-gateway)
| MCP | Purpose |
|-----|---------|
| **EXA** | Web search, research, company/competitor analysis |
| **Context7** | Library documentation lookup |
| **Apify** | Web scraping, Actors, social media data extraction |

---

## CRITICAL: Tool Selection Priority

ALWAYS prefer native Claude Code tools over MCP servers:

| Task | USE THIS | NOT THIS |
|------|----------|----------|
| Read files | `Read` tool | docker-gateway |
| Write files | `Write` / `Edit` tools | docker-gateway |
| Run commands | `Bash` tool | docker-gateway |
| Search files | `Glob` tool | docker-gateway |
| Search content | `Grep` tool | docker-gateway |

---

## docker-gateway Usage

### ONLY use when:
1. User explicitly says "use docker" or "use container"
2. Task specifically requires Docker container operations
3. Accessing MCPs running inside Docker (EXA, Context7, Apify)

### NEVER use for:
- Local file operations (Read/Write/Edit/Glob/Grep)
- Running shell commands on host (Bash)
- Running scripts on host (Bash)

---

## playwright MCP

ONLY for browser automation, screenshots, web interaction, and web testing.
NEVER for file operations or command execution.

---

## EXA MCP (via Docker)

For web searches, research, company/competitor analysis.
Access: `mcp__docker-gateway__web_search_exa`

## Context7 MCP (via Docker)

For library documentation and API reference lookup.
Access: `mcp__docker-gateway__resolve-library-id` / `mcp__docker-gateway__get-library-docs`

## Apify MCP (via Docker)

For web scraping, social media data extraction, automated data collection.

Access patterns:
```
mcp__docker-gateway__apify-slash-rag-web-browser
mcp__docker-gateway__search-actors
mcp__docker-gateway__call-actor
mcp__docker-gateway__fetch-actor-details
mcp__docker-gateway__get-actor-output
mcp__docker-gateway__search-apify-docs
mcp__docker-gateway__fetch-apify-docs
```

### Tool Selection
| Task | Tool |
|------|------|
| General web search | EXA |
| Scrape specific website | Apify |
| Social media data | Apify |
| Library docs | Context7 |

---

## Known Issues

### Docker MCP Secrets Bug (Dec 2025)

Credentials set via `docker mcp secret set` are NOT passed to containers.

**Workaround:** Edit `~/.docker/mcp/catalogs/docker-mcp.yaml` directly:
```yaml
{mcp-name}:
  env:
    - name: API_TOKEN
      value: 'actual-token-value'
```

EXA works because its key is in `~/.docker/mcp/config.yaml` under `apiKeys`.
For details, see `*add-mcp` task or ask @devops.
