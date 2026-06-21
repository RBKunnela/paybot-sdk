# Module 16 — Defenses (Attacking-AI)

**Source:** Attacking-AI course (full details + vectors + labs in Drive ZIP).

## Core Topics Covered
- Prompt injection classes and canonical mitigations
- Tool poisoning (MCP/tool definition tampering)
- Indirect prompt attacks via retrieved content
- Runtime guardrails and input/output sanitization patterns
- OpenClaw evasion-resistant design principles (resilience under adversarial prompt crafting)
- Attestation envelopes for high-stakes actions

## PayBot SDK Relevance
- Apply defenses around micropayment-engine, x402-handler, settlement paths.
- Wrap client calls and CLI commands.
- Use witness receipts (paybotfin-witness) for post-defense attestation.

## Stub Integration
```ts
// After ZIP integration populate real impl
export async function applyModule16Defenses(ctx: any) {
  // 1. sanitize prompts / tool args
  // 2. check against known evasion patterns
  // 3. require attestation for value > threshold
  console.log('[module16] defenses applied (stub)');
}
```

See README-SECURITY-MODULE16.md for ZIP + script.

*Replace this stub with full module content extracted from ZIP.*
