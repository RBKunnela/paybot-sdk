#!/usr/bin/env python3
"""
Delegate Guard Hook for AIOS Ship-It State
Blocks persona switching by preventing orchestrator from writing to output files
and reading agent PROMPT.md files.
"""

import json
import os
import sys
import re

def is_subagent(transcript_path: str) -> bool:
    """
    Heuristic to detect if we're running as a subagent.
    Subagents usually have transcript paths containing 'subagent' or 'subagents'.
    """
    p = (transcript_path or "").lower()
    return "subagent" in p or "subagents" in p

def deny(reason: str):
    """Deny the tool use with specified reason."""
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason
        }
    }))
    sys.exit(0)

def allow():
    """Allow the tool use."""
    # Empty exit 0 = proceed with the tool
    sys.exit(0)

def get_file_path(tool_input: dict) -> str:
    """Extract file path from tool input."""
    return (tool_input.get("file_path") or
            tool_input.get("path") or
            tool_input.get("content_path") or "")

def normalize_path(file_path: str) -> str:
    """Normalize path to use forward slashes."""
    return file_path.replace("\\", "/")

def is_agent_prompt_file(file_path: str) -> bool:
    """Check if this is an agent PROMPT.md file."""
    norm = normalize_path(file_path)
    # Match patterns like:
    # - /path/to/agent-name/PROMPT.md
    # - /path/to/agents/agent-name/PROMPT.md
    # - /path/to/agent-name/prompt.md (case insensitive)
    pattern = r'.*[\\/].*[\\/]agents?[\\/]([^\\/]+)[\\/]PROMPT\.md$'
    return bool(re.search(pattern, norm, re.IGNORECASE))

def main():
    """Main hook logic."""
    try:
        # Load the hook payload from stdin
        payload = json.load(sys.stdin)

        # Extract information from payload
        tool = payload.get("tool_name", "")
        tool_input = payload.get("tool_input", {})
        transcript_path = payload.get("transcript_path", "")

        # Get file path and normalize
        file_path = get_file_path(tool_input)
        norm_path = normalize_path(file_path)

        # Log for debugging (will show in hook output)
        print(f"[DelegateGuard] Tool: {tool}, Path: {file_path}", file=sys.stderr)

        # Layer 1: Subagents can do anything (spawned via Task)
        if is_subagent(transcript_path):
            print("[DelegateGuard] Subagent detected - allowing", file=sys.stderr)
            return allow()

        # Layer 2: Block orchestrator from reading agent PROMPT.md files (information asymmetry)
        if tool == "Read" and is_agent_prompt_file(file_path):
            reason = "Delegate Mode: o orquestrador não lê PROMPT.md de agentes. Passe o caminho para um subagente via Task()."
            print(f"[DelegateGuard] Blocking PROMPT.md read: {reason}", file=sys.stderr)
            return deny(reason)

        # Layer 3: Block orchestrator from writing to output files
        if tool in ("Write", "Edit"):
            # Allowlist: only state and logs files
            if (norm_path.startswith(".aios/state/") or
                norm_path.startswith(".aios/logs/") or
                norm_path.startswith(".aios/temp/")):
                print("[DelegateGuard] State/logs file - allowing", file=sys.stderr)
                return allow()

            # Blocklist: docs/ files that are workflow outputs (based on workflow.yaml)
            # Allowlist: docs/ files that are not outputs (like README.md, LICENSE, etc.)
            workflow_outputs = [
                "docs/01_PRD.md",
                "docs/03_ARCHITECTURE.md",
                "docs/04_DATA_MODEL.md",
                "docs/05_UX_DESIGN.md",
                "docs/06_SYSTEM_OVERVIEW.md"
            ]

            if norm_path.startswith("docs/") and any(norm_path.endswith(output) for output in workflow_outputs):
                reason = "Delegate Mode: este é um arquivo de output do workflow. Use Task() para spawnar o agente dono da fase."
                print(f"[DelegateGuard] Blocking workflow output write: {reason}", file=sys.stderr)
                return deny(reason)

            # Allow other writes (like configuration files if needed)
            print("[DelegateGuard] Non-docs write - allowing", file=sys.stderr)
            return allow()

        # For all other tools, allow
        print("[DelegateGuard] Tool not restricted - allowing", file=sys.stderr)
        return allow()

    except json.JSONDecodeError as e:
        print(f"[DelegateGuard] JSON decode error: {e}", file=sys.stderr)
        return allow()
    except Exception as e:
        print(f"[DelegateGuard] Unexpected error: {e}", file=sys.stderr)
        return allow()

if __name__ == "__main__":
    main()