# Module 17 — Compliance (Attacking-AI)

**Source:** Attacking-AI course (full details + vectors + labs in Drive ZIP).

## Core Topics Covered
- EU AI Act Annex III: high-risk AI systems classification
- Requirements for payment / financial decision systems
- Risk management, data governance, transparency & human oversight
- Logging, auditability, post-market monitoring
- Conformity assessment + CE marking implications for agentic payments

## PayBot SDK Relevance
- Classify x402 + settlement agents as potential high-risk when autonomous value movement.
- Ensure traceability (use existing telemetry + witness anchors).
- Add explicit consent / human-in-loop gates for Annex III triggers.

## Stub Integration Notes
- Extend `src/telemetry.ts` and webhook events with compliance fields.
- Document mapping in future ADR or `docs/compliance/`.

See README-SECURITY-MODULE16.md for ZIP + script.

*Replace this stub with full module content extracted from ZIP.*
