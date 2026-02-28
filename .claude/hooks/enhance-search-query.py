#!/usr/bin/env python3
"""
Hook: Enhance Search Query

RULE: Search queries targeting technical documentation should be enhanced
with specificity markers to get better results.

Trigger: PreToolUse → WebSearch
Behavior: MODIFIES tool input (enhances vague queries with better terms)

This hook improves query quality by:
1. Adding "documentation" to library/framework queries
2. Adding "example" to how-to queries
3. Adding "API reference" to function/method queries

Exit Codes:
- 0: Always (modifies, never blocks)
"""

import json
import sys
import re


# Enhancement rules: (pattern, suffix to add, condition_not_present)
ENHANCEMENT_RULES = [
    # Library queries: add "documentation" if not present
    {
        "match": r'\b(react|next\.?js|vue|angular|svelte|express|fastapi|django|flask|supabase|prisma|drizzle|tailwind|shadcn)\b',
        "add": "documentation",
        "unless": r'\b(docs?|documentation|guide|tutorial|reference)\b',
    },
    # How-to queries: add "example" if not present
    {
        "match": r'^how\s+to\s+',
        "add": "example code",
        "unless": r'\b(example|sample|snippet|code)\b',
    },
    # Error queries: add "solution" if not present
    {
        "match": r'\b(error|exception|traceback|stack\s*trace|ENOENT|ECONNREFUSED|TypeError|SyntaxError)\b',
        "add": "solution fix",
        "unless": r'\b(fix|solution|resolve|solved|workaround)\b',
    },
    # API queries: add "reference" if not present
    {
        "match": r'\b(api|endpoint|method|function|hook|middleware)\b.*\b(usage|use|call|invoke)\b',
        "add": "API reference",
        "unless": r'\b(reference|docs?|documentation)\b',
    },
]


def enhance_query(query: str) -> str:
    """Apply enhancement rules to improve query specificity."""
    query_lower = query.lower()
    enhanced = query

    for rule in ENHANCEMENT_RULES:
        # Check if pattern matches
        if not re.search(rule["match"], query_lower, re.IGNORECASE):
            continue

        # Check if enhancement term already present
        if re.search(rule["unless"], query_lower, re.IGNORECASE):
            continue

        # Add enhancement (only apply first matching rule)
        enhanced = f"{query} {rule['add']}"
        break

    return enhanced


def main():
    try:
        input_data = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    tool_name = input_data.get("tool_name", "")
    tool_input = input_data.get("tool_input", {})

    # Only process WebSearch
    if tool_name != "WebSearch":
        sys.exit(0)

    query = tool_input.get("query", "")
    if not query:
        sys.exit(0)

    # Enhance query
    modified_query = enhance_query(query)

    # If no change needed, pass through
    if modified_query == query:
        sys.exit(0)

    # Output modified input
    output = {
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "allow",
            "permissionDecisionReason": "Enhanced search query with specificity markers",
            "updatedInput": {
                "query": modified_query
            }
        }
    }

    print(json.dumps(output))
    sys.exit(0)


if __name__ == "__main__":
    main()
