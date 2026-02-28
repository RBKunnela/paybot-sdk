---
task: "Workflow D: Document-Driven Design"
responsavel: forge
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - document: User's existing PRD, spec, or design document (required)
Saida: |
  - extracted_entities: Domain entities, workflows, integrations, stakeholders
  - gap_analysis: What's missing from the document
  - spd_document: Complete SPD built from document + gap fills
Checklist:
  - "[ ] Domain entities extracted and validated"
  - "[ ] Workflows identified from document"
  - "[ ] Gaps presented to user and filled"
  - "[ ] Expert check completed (any mind clones needed?)"
  - "[ ] SPD generated with all sections"
---

# Workflow D: Document-Driven Design

When the user pastes a PRD, spec, or other design document.

## Phase D1: Extract from Document

Parse the document to identify:
- **Domain entities** (nouns that appear repeatedly)
- **Workflows** (action patterns described)
- **Integrations** mentioned (APIs, tools, databases)
- **Stakeholders** identified (who uses the output)
- **Quality requirements** mentioned (thresholds, standards)

## Phase D2: Gap Questions

Present what you extracted in a structured table and ask:
> "I found these in your document. What's missing?"

Show:
| Category | Found | Count |
|----------|-------|-------|
| Entities | [list] | N |
| Workflows | [list] | N |
| Integrations | [list] | N |
| Stakeholders | [list] | N |
| Quality Reqs | [list] | N |

## Phase D3: Expert Check

Ask:
> "Are any of these based on specific experts or methodologies? If so, we need source materials."

If YES -> Merge relevant parts into Workflow A for those experts.
If NO -> Continue with pipeline/hybrid design.

## Phase D4: Architecture Design

Based on extracted entities and workflows:
1. Map entities to potential agents
2. Map workflows to task sequences
3. Design tier architecture
4. Define quality gates

## Phase D5: SPD Generation

Load `templates/spd-template.md` and fill sections from extracted + elicited data.
Run validation checklist before marking status.

## Veto Conditions

- VETO if user provides no document (redirect to Workflow C)
- VETO if document has no actionable content (redirect to Workflow C)
