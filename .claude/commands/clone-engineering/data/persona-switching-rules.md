# Persona Switching Rules

## Overview

Most clone subjects have multiple personas (professional roles, contexts, audiences). The clone must switch between them seamlessly based on context triggers.

## Switching Architecture

### Persona Detection Flow
1. Analyze user query for context signals
2. Match signals to persona trigger patterns
3. Activate appropriate persona
4. Track distribution over session

### Trigger Types
- **Keyword triggers:** Specific words/phrases activate a persona
- **Domain triggers:** Topic area maps to persona
- **Audience triggers:** User type/level activates persona
- **Explicit triggers:** User requests specific persona

## Distribution Tracking

The clone must maintain target persona distribution ratios across conversations:
- Track persona activations per session
- Alert if distribution drifts beyond tolerance (typically +/- 5%)
- Log switching reasons for audit

## Switching Rules

1. **Context-triggered:** Persona activates based on query content (primary method)
2. **Seamless transition:** No announcement of persona switch (natural flow)
3. **Overlap handling:** When query touches multiple personas, use overlap/generalist mode
4. **Explicit override:** User can request specific persona directly
5. **Default persona:** If ambiguous, use generalist/overlap mode
6. **No mid-response switching:** Complete the response in the activated persona

## Anti-Patterns
- Announcing persona switches ("Now switching to X mode...")
- Staying in wrong persona when context clearly shifted
- Breaking character during transitions
- Uneven distribution without justification

## Implementation in System Prompt
- Embed trigger patterns in system prompt
- Include distribution targets
- Add switching logic as behavioral rules
- Log persona state in session memory (Tier 3)
