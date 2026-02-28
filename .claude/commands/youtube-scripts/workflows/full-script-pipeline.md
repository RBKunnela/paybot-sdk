# Full Script Pipeline Workflow

> **Purpose:** This workflow orchestrates the entire YouTube script creation process from initial brief through final scored delivery. It coordinates handoffs between agents, enforces quality gates, and ensures every script meets minimum retention standards before delivery.
>
> **Trigger:** User submits a completed Script Brief or requests a new script.
>
> **Output:** Final script with quality scorecard, retention predictions, and next-step recommendations.

---

## Workflow Definition

```yaml
workflow:
  id: full-script-pipeline
  name: Full Script Pipeline
  description: >
    End-to-end YouTube script creation from brief intake to scored,
    quality-assured final delivery. Orchestrates the Script Chief,
    Script Analyst, specialist writers, and Script Scorer in a
    coordinated multi-phase pipeline with quality gates and
    automated revision loops.
  version: 1.0.0
  squad: youtube-scripts
  owner: script-chief

  triggers:
    - manual: "User submits script brief"
    - command: "*pipeline"
    - workflow: "Invoked by script-chief routing"

  inputs:
    - id: script_brief
      type: document
      template: script-brief-template
      required: true
      description: "Completed script brief from the user"
    - id: existing_script
      type: document
      required: false
      description: "Optional existing script for revision/analysis"
    - id: existing_prompt
      type: text
      required: false
      description: "Optional prompt to audit before script creation"

  outputs:
    - id: final_script
      type: document
      description: "The completed, scored, quality-assured script"
    - id: quality_scorecard
      type: document
      description: "9-dimension quality scorecard with composite score"
    - id: recommendations
      type: document
      description: "Next steps, A/B test suggestions, and improvement notes"
```

---

## Pipeline Flow Diagram

```
                         FULL SCRIPT PIPELINE
  ═══════════════════════════════════════════════════════════════

  ┌─────────────┐    ┌──────────────┐    ┌──────────────┐
  │  PHASE 1    │    │   PHASE 2    │    │   PHASE 3    │
  │  INTAKE &   │───>│  ANALYSIS &  │───>│   SCRIPT     │
  │  BRIEF      │    │  DIAGNOSIS   │    │  CREATION    │
  │             │    │              │    │              │
  │ script-chief│    │script-analyst│    │ {specialist} │
  └─────────────┘    └──────────────┘    └──────┬───────┘
                            ▲                    │
                            │                    ▼
                     ┌──────┴───────┐    ┌──────────────┐
                     │   PHASE 5    │    │   PHASE 4    │
                     │  REVISION    │<───│   QUALITY    │
                     │  (if needed) │ No │   SCORING    │
                     │              │    │              │
                     │ {specialist} │    │ script-scorer│
                     └──────────────┘    └──────┬───────┘
                                                │ Yes (9.5+)
                                                ▼
                                         ┌──────────────┐
                                         │   PHASE 6    │
                                         │  DELIVERY    │
                                         │              │
                                         │ script-chief │
                                         └──────────────┘

  ═══════════════════════════════════════════════════════════════

  Simplified:

  [BRIEF] --> [ANALYSIS] --> [CREATION] --> [SCORING] --> [PASS?]
                                               |  No        |  Yes
                                          [REVISION] --> [DELIVERY]
```

---

## Phase Definitions

### Phase 1: Intake & Brief

```yaml
phase:
  id: phase-1-intake
  name: "Intake & Brief"
  agent: script-chief
  blocking: false
  estimated_duration: "5-10 minutes"

  description: >
    The Script Chief receives the user's request and ensures a complete,
    actionable brief exists before any work begins. If the user provides
    a raw idea instead of a completed brief, the Script Chief guides them
    through the script-brief-template to capture all required fields.

  steps:
    - id: "1.1"
      action: "Receive request from user"
      details: >
        Determine the request type:
        (a) New script from scratch — needs full brief
        (b) Existing script for revision — needs brief + script
        (c) Prompt audit — needs brief + prompt text
        (d) Hook-only request — needs partial brief (sections 1-4)
        (e) Short script — needs brief + shorts-specific fields

    - id: "1.2"
      action: "Validate brief completeness"
      details: >
        Check all required fields (marked * in the template):
        - Working Title
        - Core Promise
        - Target Length
        - Format
        - Audience (who + what they want)
        - Awareness Level
        - Primary Niche
        - Hook Type
        - Script Type
        - Key Points (minimum 3)
        - Primary CTA
      on_missing: "Return to user with specific questions for missing fields"

    - id: "1.3"
      action: "Identify routing path"
      details: >
        Based on format, niche, and request type, determine which
        specialist agent will handle Phase 3:
        - Tutorial/Listicle/Comparison → script-writer (general)
        - Story/Documentary → script-writer (narrative specialist)
        - Short → shorts-specialist
        - Hook-only → hook-specialist
        - Niche-specific needs → apply niche-adapter overlay

    - id: "1.4"
      action: "Assign Brief ID"
      details: >
        Generate a unique brief ID in the format YSB-YYYY-NNN
        (e.g., YSB-2025-042). Attach to all documents flowing
        through the pipeline for this request.

    - id: "1.5"
      action: "Pass to Phase 2"
      details: >
        Hand the validated brief (and any attached materials) to
        the Script Analyst with the routing recommendation.

  checkpoint:
    description: "Brief is complete with all required fields filled and validated"
    verification: "Script Chief confirms all * fields are present and coherent"

  error_handling:
    missing_fields:
      action: "Ask user for specific missing information"
      message_template: >
        Your brief is missing the following required fields: {fields}.
        Please provide these so I can route your script to the right
        specialist.
    contradictory_fields:
      action: "Flag contradiction and ask user to clarify"
      message_template: >
        I noticed a potential conflict in your brief: {description}.
        Could you clarify which direction you'd prefer?
```

---

### Phase 2: Analysis & Diagnosis

```yaml
phase:
  id: phase-2-analysis
  name: "Analysis & Diagnosis"
  agent: script-analyst
  blocking: true
  estimated_duration: "10-15 minutes"
  quality_gate: YS_QG_002

  description: >
    The Script Analyst examines the brief (and any attached materials)
    to produce a context brief that arms the specialist with everything
    they need for a strong first draft. This phase is BLOCKING — no
    script creation begins until the analysis is complete.

  steps:
    - id: "2.1"
      action: "Determine analysis path"
      details: >
        Route based on what was provided:
        (a) Existing script provided → Run full PCCE analysis
            (Pacing, Clarity, Connection, Engagement)
        (b) Prompt provided → Run prompt audit across 10 categories
        (c) New script request → Analyze brief for patterns

    - id: "2.2"
      action: "Niche pattern analysis"
      details: >
        Using the niche-adapter data for the specified niche:
        - Identify retention benchmarks for this niche and format
        - Flag niche-specific language patterns and vocabulary
        - Note common pitfalls for this niche (what to avoid)
        - Identify hook types that perform best in this niche
        - Set expected AVD (Average View Duration) targets

    - id: "2.3"
      action: "Audience alignment check"
      details: >
        Cross-reference the audience description with:
        - The chosen awareness level (do they match?)
        - The hook type (is it appropriate for this awareness level?)
        - The emotional arc (does it resonate with this audience?)
        - The readability level (appropriate for the audience?)

    - id: "2.4"
      action: "Structural recommendations"
      details: >
        Based on target length and format:
        - Recommend section timing (hook, setup, body sections, CTA, close)
        - Suggest open loop placement points
        - Recommend re-hook positions (25%, 50%, 75% marks)
        - Identify natural pattern interrupt opportunities
        - Map the golden thread through the key points

    - id: "2.5"
      action: "Produce context brief for specialist"
      details: >
        Compile all analysis into a structured context brief containing:
        - Original brief (complete)
        - Niche benchmarks and targets
        - Structural recommendations with timing
        - Audience/awareness alignment notes
        - Risk flags (potential issues to watch for)
        - Recommended hooks (top 2-3 options with rationale)
        - Retention mechanic placement map

  checkpoint:
    description: "Analysis complete; context brief produced"
    verification: "Context brief contains all required sections"
    quality_gate: "YS_QG_002"

  output:
    - id: analysis_report
      description: "Full analysis of the brief with niche benchmarks"
    - id: context_brief
      description: "Actionable context brief for the specialist agent"

  error_handling:
    niche_not_recognized:
      action: >
        Use general best practices as baseline. Flag for niche-adapter
        review. Include note in context brief: "Niche-specific data
        unavailable — using general benchmarks. Recommend manual review
        of niche conventions."
    insufficient_brief:
      action: >
        Return to Phase 1 with specific fields that need more detail.
        Do not proceed to Phase 3 with an incomplete context brief.
```

---

### Phase 3: Script Creation

```yaml
phase:
  id: phase-3-creation
  name: "Script Creation"
  agent: "{routed specialist — determined in Phase 1}"
  blocking: false
  estimated_duration: "15-30 minutes"

  description: >
    The assigned specialist receives the context brief from the Script
    Analyst and creates the script. The specialist applies their
    specific frameworks, niche knowledge, and the structural
    recommendations from the analysis phase.

  steps:
    - id: "3.1"
      action: "Receive and internalize context brief"
      details: >
        The specialist reads the complete context brief and:
        - Confirms understanding of the target audience
        - Notes the retention benchmarks to hit
        - Reviews the structural recommendations
        - Identifies the golden thread to weave throughout
        - Acknowledges any risk flags

    - id: "3.2"
      action: "Draft the hook"
      details: >
        Using the hook type from the brief (or selecting one based on
        the analyst's recommendations):
        - Write 2-3 hook variations
        - Select the strongest
        - Ensure it delivers on the thumbnail/title promise
        - Verify it matches the audience's awareness level
        - Use the hook-template as a structural guide

    - id: "3.3"
      action: "Build the script structure"
      details: >
        Following the analyst's timing recommendations:
        - Outline all major sections with timing targets
        - Place open loops at recommended positions
        - Position re-hooks at 25%, 50%, and 75% marks
        - Map pattern interrupts throughout
        - Thread the golden thread through every section

    - id: "3.4"
      action: "Write the full script"
      details: >
        Execute the appropriate task based on script type:
        - Full word-for-word: write-script task
        - Hook only: write-hook task
        - Short: write-short task (use shorts-script-template)
        - Outline: write-outline task

        Apply all retention mechanics:
        - Open loops (plant and resolve)
        - Stakes escalation (progressive urgency)
        - Pattern interrupts (visual/tonal/structural)
        - Re-hooks at designated points
        - Emotional arc alignment

        Include retention annotations throughout:
        - [OPEN LOOP] — marks where a loop is planted
        - [LOOP CLOSED] — marks where a loop is resolved
        - [RE-HOOK] — marks re-engagement points
        - [PATTERN INTERRUPT] — marks attention resets
        - [STAKES UP] — marks escalation moments
        - [CTA] — marks call-to-action placement
        - [EMOTION: {type}] — marks emotional arc beats

    - id: "3.5"
      action: "Self-review before submission"
      details: >
        Before passing to scoring, the specialist runs a self-check:
        - Does the hook grab in under 3 seconds?
        - Are all key points from the brief covered?
        - Is the golden thread present throughout?
        - Are retention annotations complete?
        - Does the readability match the target level?
        - Is the emotional arc realized?
        - Is the CTA natural and compelling?
        - Does the script length match the target duration?

    - id: "3.6"
      action: "Submit draft to Phase 4"
      details: >
        Pass the completed draft script with all annotations to
        the Script Scorer. Include a self-assessment note flagging
        any areas where the specialist had concerns.

  checkpoint:
    description: "Draft script complete with all retention annotations"
    verification: "Script contains all required annotations and covers all brief key points"

  output:
    - id: draft_script
      description: "Complete draft script with retention annotations"
    - id: specialist_notes
      description: "Self-assessment and flagged concerns from the specialist"
```

---

### Phase 4: Quality Scoring

```yaml
phase:
  id: phase-4-scoring
  name: "Quality Scoring"
  agent: script-scorer
  blocking: true
  estimated_duration: "10-15 minutes"
  quality_gates:
    - YS_QG_003
    - YS_QG_004

  description: >
    The Script Scorer evaluates the draft script across 9 dimensions,
    calculates a weighted composite score, and determines whether the
    script passes (7.0+) or requires revision. This phase is BLOCKING —
    no delivery occurs until scoring is complete.

  steps:
    - id: "4.1"
      action: "Score across 9 dimensions"
      details: >
        Evaluate each dimension on a 1-10 scale:

        1. HOOK STRENGTH (weight: 15%)
           - First 3 seconds: instant grab?
           - First 15 seconds: promise delivered?
           - Thumbnail/title alignment?

        2. RETENTION MECHANICS (weight: 15%)
           - Open loops: planted and resolved?
           - Re-hooks: present at 25/50/75%?
           - Pattern interrupts: sufficient frequency?
           - Stakes escalation: progressive?

        3. STRUCTURE & PACING (weight: 12%)
           - Section timing: appropriate for format?
           - Flow: logical progression?
           - Transitions: smooth and engaging?

        4. EMOTIONAL ARC (weight: 10%)
           - Arc matches brief specification?
           - Emotional beats are genuine, not forced?
           - Climax is satisfying?

        5. CLARITY & READABILITY (weight: 10%)
           - Matches target readability level?
           - No confusing passages?
           - Jargon appropriate for audience?

        6. AUDIENCE ALIGNMENT (weight: 10%)
           - Speaks to the specified audience?
           - Awareness level appropriate?
           - Pain points addressed?

        7. CTA EFFECTIVENESS (weight: 8%)
           - Natural integration?
           - Compelling reason to act?
           - Properly placed?

        8. NICHE COMPLIANCE (weight: 10%)
           - Follows niche conventions?
           - Uses appropriate language patterns?
           - Meets niche retention benchmarks?

        9. PRODUCTION READINESS (weight: 10%)
           - B-roll/visual cues included?
           - Music/mood notes present?
           - Ready for recording/production?

    - id: "4.2"
      action: "Calculate weighted composite score"
      details: >
        Composite = Sum of (dimension_score * weight) for all 9 dimensions.

        Score interpretation:
        - 9.5 - 10.0: PASS — elite quality, ready for delivery
        - 8.5 - 9.4:  NEEDS WORK — close, targeted fixes needed
        - 7.0 - 8.4:  NEEDS WORK — significant fixes needed
        - 5.0 - 6.9:  REWRITE — reassign to different specialist
        - Below 5.0:  REWRITE — fundamental issues, start over

        SHORTS-SPECIFIC SCORING:
        If the script is a YouTube Short (< 60 seconds), apply adjusted weights:
        - Hook Strength: 25% (up from 15%, 1-Second Rule)
        - Rewatch Engineering: 20% (replaces Retention Mechanics)
        - Emotional Punch: 15% (compressed arc)
        - Value Density: 15%
        - Pacing Rhythm: 10%
        - Stakes/Tension: 5% (less weight for Shorts)
        - CTA Integration: 0% (CTAs tank rewatch rate)
        - Readability: 5% (3rd-grade target for Shorts)
        - Bookend Structure: 5% (last line must loop to hook)

    - id: "4.3"
      action: "Compare against niche benchmarks"
      details: >
        Pull the niche-specific benchmarks from Phase 2 analysis and
        compare the script's scores. Flag any dimension where the
        script falls below the niche average.

    - id: "4.4"
      action: "Identify top 3 priority issues"
      details: >
        If the script needs revision, identify the 3 most impactful
        issues to address, ranked by:
        1. Weight of the dimension (higher weight = higher priority)
        2. Gap from target (larger gap = higher priority)
        3. Fixability (easier fixes prioritized for faster iteration)

    - id: "4.5"
      action: "Determine PASS or FAIL"
      details: >
        PASS (9.5+): Route to Phase 6 (Delivery)
        NEEDS WORK (7.0-9.4): Route to Phase 5 (Revision)
        REWRITE (below 7.0): Route back to script-chief for reassignment

        Generate the full scorecard document with:
        - All 9 dimension scores with justifications
        - Weighted composite score
        - Niche benchmark comparison
        - Top 3 issues (if applicable)
        - Specific, actionable revision instructions (if applicable)
        - Retention prediction estimate

    - id: "4.6"
      action: "Generate retention prediction"
      details: >
        Based on the scores and niche benchmarks, estimate:
        - Predicted hook retention (% still watching at 30 seconds)
        - Predicted mid-point retention (% at 50% mark)
        - Predicted overall retention (% at end)
        - Confidence level (low/medium/high based on niche data availability)

  checkpoint:
    description: "Quality score calculated and pass/fail determined"
    quality_gates:
      - "YS_QG_003: All 9 dimensions scored with justifications"
      - "YS_QG_004: Composite score calculated and routing decision made"

  output:
    - id: quality_scorecard
      description: "Complete 9-dimension scorecard with composite score"
    - id: revision_instructions
      description: "Specific issues and fixes (only if FAIL)"
    - id: retention_prediction
      description: "Estimated retention metrics for the script"
```

---

### Phase 5: Revision (Conditional)

```yaml
phase:
  id: phase-5-revision
  name: "Revision"
  agent: "{original specialist from Phase 3}"
  blocking: false
  estimated_duration: "10-20 minutes"
  condition: "composite_score < 9.5"
  max_iterations: 3
  bypass_allowed: false

  description: >
    If the script scores below 9.5, it returns to the original
    specialist with the scorecard and specific revision instructions.
    The specialist addresses each flagged issue and resubmits for
    re-scoring. After 3 failed revision cycles, the script is
    REASSIGNED to a different specialist — NEVER delivered below 9.5.

  steps:
    - id: "5.1"
      action: "Receive scorecard and revision instructions"
      details: >
        The specialist reviews:
        - The full scorecard with all 9 dimension scores
        - The top 3 priority issues with specific fix instructions
        - The niche benchmark gaps
        - Any notes from the scorer about what's working well
          (preserve these strengths during revision)

    - id: "5.2"
      action: "Address each flagged issue"
      details: >
        Work through the top 3 issues in priority order:
        - For each issue, apply the specific fix instruction
        - Verify the fix doesn't introduce new problems
        - Preserve existing strengths identified by the scorer
        - Update retention annotations if structure changes

    - id: "5.3"
      action: "Re-optimize retention mechanics"
      details: >
        After fixing specific issues, do a full pass on retention:
        - Verify open loops still plant and resolve cleanly
        - Check re-hooks haven't been displaced by edits
        - Ensure stakes still escalate progressively
        - Confirm pattern interrupts maintain good frequency
        - Validate golden thread continuity

    - id: "5.4"
      action: "Self-review revised script"
      details: >
        Run the same self-check as Phase 3, step 3.5, plus:
        - Specifically verify each flagged issue has been addressed
        - Note any trade-offs made during revision
        - Flag any areas where the fix may have weakened another dimension

    - id: "5.5"
      action: "Resubmit for scoring"
      details: >
        Return the revised script to Phase 4 for re-scoring.
        Include a revision notes document explaining what was changed
        and why, so the scorer can evaluate improvements efficiently.

  checkpoint:
    description: "Revised script addresses all flagged issues"
    verification: "Each top-3 issue has a documented fix"

  iteration_handling:
    on_pass: "Route to Phase 6 (Delivery) — score >= 9.5 confirmed"
    on_fail_iteration_1: >
      Return to step 5.1 with updated scorecard.
      Scorer provides additional context on persistent issues.
    on_fail_iteration_2: >
      Return to step 5.1 with updated scorecard.
      Scorer identifies the ROOT CAUSE of why the script can't reach 9.5.
      Consider whether the problem is the specialist or the brief.
    on_fail_iteration_3: >
      REASSIGN to a different specialist via script-chief.
      The current specialist's approach is not working for this brief.
      Script-chief selects the next-best specialist and restarts Phase 3.
      If ALL specialists have been tried, HALT and consult the user.
    max_iterations: 3
    bypass_allowed: false
    escalation_message: >
      This script has been through 3 revision cycles with the current
      specialist and still scores below 9.5. REASSIGNING to a different
      specialist. We do NOT ship scripts below 9.5. If reassignment
      also fails, we will consult you to revisit the brief.
    CRITICAL_RULE: >
      NEVER deliver a script that scores below 9.5. There is NO
      "best available version" delivery. Either the script reaches
      9.5+ or it goes back for more work. Quality is non-negotiable.
```

---

### Phase 6: Delivery

```yaml
phase:
  id: phase-6-delivery
  name: "Delivery"
  agent: script-chief
  blocking: false
  estimated_duration: "5-10 minutes"

  description: >
    The Script Chief packages the final script with all supporting
    materials and delivers to the user. This phase also generates
    next-step recommendations to maximize the video's performance.

  steps:
    - id: "6.1"
      action: "Compile delivery package"
      details: >
        Assemble the final delivery containing:

        A. FINAL SCRIPT
           - Clean version (no annotations — ready for teleprompter/recording)
           - Annotated version (with all retention markers for reference)
           - Script metadata (word count, estimated duration, readability score)

        B. QUALITY SCORECARD
           - All 9 dimension scores
           - Weighted composite score
           - Niche benchmark comparison
           - Retention prediction

        C. RECOMMENDATIONS
           - Compiled in step 6.3

    - id: "6.2"
      action: "Present final script to user"
      details: >
        Deliver the clean script first, followed by the scorecard
        summary. Highlight:
        - Composite score and what it means
        - Strongest dimensions (what's working well)
        - Predicted retention metrics
        - Any caveats (if delivered after max revision cycles)

    - id: "6.3"
      action: "Generate next-step recommendations"
      details: >
        Based on the script and scores, suggest:

        IMMEDIATE NEXT STEPS:
        - A/B test hook variations (provide 2-3 alternates)
        - Thumbnail concepts that pair with the final title
        - Title variations to test

        PRODUCTION RECOMMENDATIONS:
        - Key visual moments to invest production value in
        - Music mood transitions aligned with emotional arc
        - Text overlay opportunities for retention

        PERFORMANCE OPTIMIZATION:
        - Suggested publish time (based on niche norms)
        - Recommended tags and description keywords
        - Community post or Short to tease the video

        FUTURE IMPROVEMENTS:
        - Areas to strengthen in the next script
        - Patterns to watch in analytics after publishing
        - Suggested follow-up video topics

    - id: "6.4"
      action: "Archive pipeline artifacts"
      details: >
        Store all pipeline documents for future reference:
        - Original brief (with Brief ID)
        - Analysis report and context brief
        - All draft versions (including revisions)
        - All scorecards
        - Final delivery package
        - Pipeline execution metadata (timing, iterations, agents used)

  checkpoint:
    description: "Delivery package complete and presented to user"
    verification: "User has received script, scorecard, and recommendations"

  output:
    - id: final_script
      description: "Clean + annotated versions of the final script"
    - id: quality_scorecard
      description: "Complete scoring results with retention predictions"
    - id: recommendations
      description: "Next steps, production notes, and optimization suggestions"
    - id: pipeline_archive
      description: "Complete record of the pipeline execution"
```

---

## Quality Gates

```yaml
quality_gates:
  - id: YS_QG_002
    name: "Analysis Complete"
    phase: phase-2-analysis
    blocking: true
    criteria:
      - "Context brief contains niche benchmarks"
      - "Audience alignment has been verified"
      - "Structural recommendations include timing"
      - "Risk flags have been documented (even if none found)"
    on_fail: "Return to Phase 1 for brief clarification"

  - id: YS_QG_003
    name: "Scoring Complete"
    phase: phase-4-scoring
    blocking: true
    criteria:
      - "All 9 dimensions have been scored (1-10)"
      - "Each score has a written justification"
      - "Composite score has been calculated with correct weights"
    on_fail: "Scorer must complete all dimensions before proceeding"

  - id: YS_QG_004
    name: "Routing Decision Made"
    phase: phase-4-scoring
    blocking: true
    criteria:
      - "PASS or FAIL determination is explicit"
      - "If FAIL: top 3 issues identified with fix instructions"
      - "If PASS: retention prediction generated"
      - "Routing to next phase is confirmed"
    on_fail: "Scorer must provide explicit pass/fail with required details"
```

---

## Error Handling

```yaml
error_handling:
  score_below_threshold:
    description: "Script scores below 9.5 after creation"
    action: "Return to Phase 3 specialist with specific feedback via Phase 5"
    max_retries: 3
    bypass_allowed: false
    on_max_retries: >
      REASSIGN to a different specialist via script-chief. Do NOT deliver
      a sub-9.5 script. If all specialists have been tried and none can
      reach 9.5, HALT the pipeline and consult the user to revisit the
      brief. We never ship mediocre scripts.

  missing_brief_info:
    description: "Required brief fields are empty or unclear"
    action: "Script Chief asks user for the specific missing fields"
    max_retries: 3
    on_max_retries: >
      Proceed with available information, using defaults for missing fields.
      Flag all assumptions in the context brief so the specialist is aware.

  niche_not_recognized:
    description: "The specified niche has no adapter data"
    action: >
      Use general best practices as the baseline. Flag for niche-adapter
      review. Include a note in all downstream documents that niche-specific
      optimization could not be applied.

  specialist_unavailable:
    description: "The routed specialist agent is not available"
    action: >
      Script Chief re-routes to the most appropriate available specialist.
      Document the substitution in pipeline metadata.

  scoring_disagreement:
    description: "Specialist believes scoring is incorrect"
    action: >
      Script Chief mediates. Review scoring justifications against the
      script. If scoring error is found, re-score. If specialist disagrees
      with valid scoring, proceed with revision.

  user_cancellation:
    description: "User cancels the pipeline mid-execution"
    action: >
      Archive all work completed so far. Provide the user with whatever
      has been produced (partial brief, analysis, draft) so nothing is lost.
```

---

## Pipeline Metrics

```yaml
metrics:
  tracked:
    - pipeline_duration_total: "End-to-end time from brief to delivery"
    - phase_durations: "Time spent in each phase"
    - revision_count: "Number of revision cycles needed"
    - first_draft_score: "Composite score of the initial draft"
    - final_score: "Composite score of the delivered script"
    - score_improvement: "Delta between first draft and final"
    - dimension_averages: "Average scores per dimension across all pipelines"
    - niche_distribution: "Which niches are most frequently requested"

  targets:
    - pipeline_duration: "< 60 minutes for standard, < 30 for rush"
    - first_draft_pass_rate: "> 40% of scripts pass on first scoring (9.5+ is strict)"
    - average_composite_score: "> 9.6 across all delivered scripts"
    - max_revision_cycles: "< 2.5 average revisions per script"
```

---

## Usage Examples

### Example 1: New Script from Scratch

```
User: I need a script about why most people fail at budgeting.
Pipeline: Phase 1 (collect brief) → Phase 2 (analyze) → Phase 3 (write) →
          Phase 4 (score: 7.8) → Phase 6 (deliver)
Result: Script delivered in 1 cycle, no revision needed.
```

### Example 2: Script with Revision

```
User: Write a technical tutorial on Docker containers.
Pipeline: Phase 1 (brief) → Phase 2 (analyze) → Phase 3 (write) →
          Phase 4 (score: 6.2 — hook weak, pacing off) →
          Phase 5 (revise hook, adjust pacing) →
          Phase 4 (re-score: 7.4) → Phase 6 (deliver)
Result: Script delivered after 1 revision cycle.
```

### Example 3: Existing Script Audit

```
User: Here's my script — can you improve it?
Pipeline: Phase 1 (brief + existing script) →
          Phase 2 (PCCE analysis of existing script) →
          Phase 3 (rewrite based on analysis) →
          Phase 4 (score: 8.1) → Phase 6 (deliver with comparison)
Result: Improved script delivered with before/after analysis.
```

### Example 4: YouTube Short

```
User: I need a 30-second Short about compound interest.
Pipeline: Phase 1 (brief, short format) →
          Phase 2 (analyze with Shorts benchmarks) →
          Phase 3 (write using shorts-script-template) →
          Phase 4 (score with Shorts-specific criteria) →
          Phase 6 (deliver)
Result: Short script delivered optimized for 90%+ retention.
```

---

## Integration Points

```yaml
integrations:
  templates:
    - script-brief-template: "Used in Phase 1 for brief collection"
    - hook-template: "Used in Phase 3 for hook creation"
    - shorts-script-template: "Used in Phase 3 for Shorts creation"

  agents:
    - script-chief: "Phases 1, 6 (intake and delivery)"
    - script-analyst: "Phase 2 (analysis and diagnosis)"
    - script-scorer: "Phase 4 (quality scoring)"
    - script-writer: "Phase 3 (general script creation)"
    - shorts-specialist: "Phase 3 (Shorts creation)"
    - hook-specialist: "Phase 3 (hook-only requests)"
    - niche-adapter: "Phase 2 (niche-specific data overlay)"

  tasks:
    - write-script: "Full script creation task"
    - write-hook: "Hook-only creation task"
    - write-short: "YouTube Short creation task"
    - score-script: "9-dimension scoring task"
    - analyze-script: "PCCE analysis task"
    - audit-prompt: "Prompt audit task"

  checklists:
    - script-quality-checklist: "Used in Phase 3 self-review"
    - hook-quality-checklist: "Used in Phase 3 hook validation"
    - delivery-checklist: "Used in Phase 6 before delivery"

  data:
    - niche-benchmarks: "Retention and scoring benchmarks per niche"
    - scoring-weights: "Dimension weights for composite calculation"
```

---

*Workflow version 1.0.0 -- YouTube Scripts Squad*
