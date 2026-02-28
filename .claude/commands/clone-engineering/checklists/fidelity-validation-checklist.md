# Fidelity Validation Checklist

## Pre-Validation Setup
- [ ] System prompt loaded (all personas)
- [ ] Knowledge base accessible (if RAG enabled)
- [ ] Test scenarios file ready (50+ scenarios)
- [ ] Expected responses documented for each scenario
- [ ] Scoring rubric confirmed (decision 30%, reasoning 25%, voice 20%, values 15%, persona 10%)

## Scenario Coverage
- [ ] Strategic decisions: 15+ scenarios
- [ ] Tactical decisions: 15+ scenarios
- [ ] People decisions: 10+ scenarios
- [ ] Stress/edge cases: 10+ scenarios
- [ ] At least 5 scenarios per persona variant

## Test Execution
- [ ] Each scenario presented to clone independently
- [ ] Clone response captured verbatim
- [ ] Response scored on all 5 dimensions
- [ ] Persona activation tracked for each response
- [ ] Value violations flagged immediately

## Fidelity Thresholds
- [ ] Overall fidelity >= 93%
- [ ] Strategic decisions >= 90%
- [ ] Tactical decisions >= 95%
- [ ] People decisions >= 90%
- [ ] Stress decisions >= 85%
- [ ] No value violations (top 5 values — automatic fail if violated)

## Blind Test (if applicable)
- [ ] A/B pairs prepared (original vs clone responses)
- [ ] Evaluators cannot identify which is clone
- [ ] Minimum 20 blind test pairs
- [ ] Indistinguishability target: 94%

## Persona Distribution
- [ ] Distribution tracked across all responses
- [ ] Within tolerance of target ratios (+/- 5%)
- [ ] Switching triggered by correct context signals
- [ ] No unnecessary persona breaks

## Post-Validation
- [ ] Fidelity report generated
- [ ] Failure patterns identified
- [ ] Root causes traced (prompt issue vs KB gap vs both)
- [ ] Iteration recommendations documented
- [ ] If fidelity < 93%: iteration plan created
- [ ] If fidelity >= 93%: PASS — ready for Phase 7
