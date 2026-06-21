# SECURITY MODULE 16-18 — Attacking-AI Course Integration (v1)

**Branch:** `security-module16-v1`

**Status:** Local integration. Full detailed artifacts (slides, transcripts, code samples, evasion vectors) live in the Google Drive ZIP.

**Drive ZIP location (update with your link):**  
`https://drive.google.com/file/d/REPLACE-WITH-YOUR-ZIP-ID/view`  
(Attacking-AI-module16-artifacts.zip or equivalent export from course materials)

## What security-module16-v1 Provides

- **Module 16 — Defenses (SECURITY_MODULE16_DEFENSES.md)**: Practical countermeasures against prompt injection, tool poisoning, indirect prompt attacks, MCP-specific surface attacks, attestation patterns, and runtime guardrails. Includes OpenClaw evasion-resistant patterns.
- **Module 17 — Compliance (MODULE17_COMPLIANCE.md)**: Mapping to EU AI Act Annex III (high-risk systems), obligations for payment/financial AI agents, transparency, human oversight, risk management, and logging/audit requirements applicable to PayBot flows.
- **Module 18 — Swarm (MODULE18_SWARM.md)**: Defenses and attestation for multi-agent swarms, witness coordination, consensus on high-risk actions, and propagation of security posture across agents.
- **18-Module Summary**: Condensed reference of the full Attacking-AI curriculum with PayBot relevance notes (see SUMMARY_18_MODULES.md).

## PayBot Integration Stubs

See:
- `paybot-integration.md` (cross-repo)
- SDK-specific usage notes below and in `src` examples.

**SDK usage example (defense wrapper sketch):**
```ts
// Example: wrap x402 settlement with module16 defense checks
import { applyModule16Defenses } from './security/defenses'; // stub after ZIP integration

export async function safeSettle(...) {
  await applyModule16Defenses({ action: 'settle', context });
  return settle(...);
}
```

MCP attestation hook (see paybot-mcp):
- Use governed-tool + witness receipt for attested completion of high-risk flows.

## paybotfin-witness Integration

The receipt/anchor system in paybotfin-witness (AWP — Attested Witness Protocol) can be used to create **verifiable completion receipts** for Attacking-AI course modules:

- On successful module quiz / lab / swarm exercise completion, witness issues a signed receipt anchored on-chain or via merkle.
- Receipt payload: `{ module: "16" | "17" | "18" | "attacking-ai/18", agent_id, timestamp, hash_of_artifacts, signature }`
- SDK/MCP consumers can require a fresh witness receipt before enabling privileged payment tools (e.g. high-value transfers, swarm settlement).
- Enables audit-grade compliance evidence for EU AI Act high-risk classification.

See paybotfin-witness docs for AWP receipt issuance.

## Next Steps (after ZIP download)

1. Download + unzip the Drive archive.
2. Run the integration script: `docs/security/apply-module16-from-zip.ps1` (or `.sh` port) with path to unzipped content.
3. Review/apply the provided code diffs into `src/`.
4. `npm install && npm run type-check && npm test` (or equivalent).
5. Commit on this branch and open PR when ready.

Files in this dir on branch creation:
- README-SECURITY-MODULE16.md (this)
- SECURITY_MODULE16_DEFENSES.md
- MODULE17_COMPLIANCE.md
- MODULE18_SWARM.md
- SUMMARY_18_MODULES.md
- paybot-integration.md
- apply-module16-from-zip.ps1

---

*Integrated locally 2026-06-21. Do not merge without full ZIP population + validation.*
