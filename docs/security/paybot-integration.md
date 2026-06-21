# PayBot Security Module16 Integration Notes

## SDK (paybot-sdk)
- Defenses wrap: `micropayment-engine.ts`, `x402-handler.ts`, `x402-v2.ts`, settlement paths.
- Add optional `security/defenses.ts` (post-ZIP).
- Witness receipt verification for value thresholds (see paybotfin-witness).
- CLI commands can gate behind attested training (module completion receipt).

**Diff stub (example — apply after populating):**
```diff
diff --git a/src/micropayment-engine.ts b/src/micropayment-engine.ts
index ...
--- a/src/micropayment-engine.ts
+++ b/src/micropayment-engine.ts
@@
+import { applyModule16Defenses } from '../docs/security/stubs/defenses';
+
 export async function settle(...) {
+  await applyModule16Defenses({op: 'settle', amount});
   ...
 }
```

## MCP (paybot-mcp)
- Extend `governed-tool.ts` + `denial-guidance.ts`.
- MCP server registration attestation.
- Tool call logging + witness for high-risk (payment) tools.

## Fund + Witness (paybotfin-fund + paybotfin-witness)
- Use AWP receipts to prove operators/agents completed Attacking-AI modules 16-18.
- Public verification endpoint / on-chain anchor for compliance evidence.
- Fund site can link to attested security posture.

## General
- After ZIP: run `docs/security/apply-module16-from-zip.ps1 -ZipPath C:\path\to\unzipped`
- Then `npm run type-check && npm test`
- Update package peer if needed (sdk <-> mcp).

This file lives in all three repos for consistency.
