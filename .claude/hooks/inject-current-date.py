#!/usr/bin/env python3
"""
Hook: Inject Current Date into Search Queries

RULE: WebSearch and WebFetch queries should include the current year
to avoid getting outdated results.

Trigger: PreToolUse → WebSearch | WebFetch
Behavior: MODIFIES tool input (adds current year to query if missing)

Exit Codes:
- 0: Always (modifies, never blocks)
"""

import json
import sys
import re
from datetime import datetime


# Year patterns that indicate the query already has temporal context
YEAR_PATTERNS = [
    r'\b20\d{2}\b',           # 2024, 2025, 2026, etc.
    r'\blatest\b',            # "latest" implies current
    r'\bcurrent\b',           # "current" implies now
    r'\btoday\b',             # explicit today
    r'\brecent\b',            # recent implies current
    r'\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+20\d{2}\b',  # Month Year
]

# Queries that should NOT get date injection (timeless topics)
SKIP_PATTERNS = [
    r'^(what|who|how)\s+(is|are|was|were)\s+',  # definitional queries
    r'\bhistory\b',
    r'\boriginal\b',
    r'\bclassic\b',
    r'\blegacy\b',
]


def has_temporal_context(query: str) -> bool:
    """Check if query already contains year/date context."""
    query_lower = query.lower()
    for pattern in YEAR_PATTERNS:
        if re.search(pattern, query_lower):
            return True
    return False


def is_timeless_query(query: str) -> bool:
    """Check if query is about timeless/historical topics."""
    query_lower = query.lower()
    for pattern in SKIP_PATTERNS:
        if re.search(pattern, query_lower):
            return True
    return False


def inject_year(query: str) -> str:
    """Inject current year into query if needed."""
    current_year = datetime.now().strftime("%Y")

    if has_temporal_context(query):
        return query

    if is_timeless_query(query):
        return query

    # Inject year at the end of the query
    return f"{query} {current_year}"


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

    # Inject year
    modified_query = inject_year(query)

    # If no change needed, pass through
    if modified_query == query:
        sys.exit(0)

    # Output modified input
    output = {
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "allow",
            "permissionDecisionReason": f"Injected current year ({datetime.now().year}) into search query",
            "updatedInput": {
                "query": modified_query
            }
        }
    }

    print(json.dumps(output))
    sys.exit(0)


if __name__ == "__main__":
    main()
