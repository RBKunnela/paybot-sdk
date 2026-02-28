# MMOS Pipeline Phases Reference

## Pipeline Overview

MMOS (Mind Mapping Operating System) is a 7-phase pipeline for creating high-fidelity AI clones.

## Phase Details

### Phase 1: Viability Assessment
- **Owner:** El Clonador
- **Gate:** APEX >= 6.0 AND ICP Match >= 70%
- **Inputs:** Subject name, available sources, deployment context
- **Outputs:** PRD.md, TODO.md, metadata.yaml, GO/NO-GO decision
- **APEX Scoring:** Assesses clone feasibility (source quality, subject accessibility, complexity)
- **ICP Scoring:** Ideal Clone Profile match (deployment fit, audience alignment)

### Phase 2: Research Collection
- **Owner:** Mind Mapper
- **Gate:** sources_master.yaml complete, all sources classified by tier
- **Inputs:** Source materials (documents, videos, audio, transcripts)
- **Outputs:** sources_master.yaml with tier classification
- **Source Tiers:**
  - Tier 1 (Crown Jewels): Self-analysis, direct Q&A, psychometric profiles
  - Tier 2 (Core): Courses, content, interviews
  - Tier 3 (Supporting): Business docs, historical content

### Phase 3: Cognitive Analysis
- **Owner:** Mind Mapper
- **Gate:** All 8 layers extracted, identity-core.yaml + cognitive-spec.yaml generated
- **Inputs:** Classified sources from Phase 2
- **Outputs:** 8 layer YAML files, identity-core.yaml, cognitive-spec.yaml
- **Checkpoints:** Human review after layers 6, 7, 8
- **Duration Estimate:** Longest phase (20-30h)

### Phase 4: Knowledge Synthesis
- **Owner:** KB Curator
- **Gate:** 800+ chunks indexed, retrieval precision validated (80%+ in top-5)
- **Inputs:** Source materials + extracted layers from Phase 3
- **Outputs:** kb/domains/**/*.yaml, kb/index.yaml, retrieval-config.yaml
- **Chunking:** 300-500 words, 50-word overlap, 15+ metadata fields

### Phase 5: Prompt Engineering
- **Owner:** Prompt Architect
- **Gate:** All persona prompts generated, memory system integrated
- **Inputs:** identity-core.yaml, cognitive-spec.yaml, KB from Phase 4
- **Outputs:** system_prompts/*.md, tools.md, memory-system.yaml
- **Checkpoint:** Human review before finalization

### Phase 6: Fidelity Validation
- **Owner:** Fidelity Tester
- **Gate:** 50+ scenarios tested, fidelity >= 93%
- **Inputs:** System prompts from Phase 5
- **Outputs:** test-scenarios.yaml, fidelity-report.md, iteration-log.md
- **Max Iterations:** 3 cycles before escalation
- **Blind Test Target:** 94% indistinguishability

### Phase 7: Production Deployment
- **Owner:** El Clonador
- **Gate:** Documentation complete, deployment package ready
- **Inputs:** Validated prompts + KB from Phase 6
- **Outputs:** deployment-package/, user-guide.md, maintenance.md
