# Team Taxonomy Squad - Knowledge Base

## Core Frameworks

### 1. Team Topologies (Skelton & Pais, 2019)

**Four Fundamental Team Types:**

| Type | Purpose | Size | Duration |
|------|---------|------|----------|
| **Stream-Aligned** | Owns a flow of business value end-to-end | 5-9 | Permanent |
| **Platform** | Reduces cognitive load via internal self-service | 3-7 | Permanent |
| **Enabling** | Accelerates capability adoption in other teams | 2-4 | Temporary (3-6 months) |
| **Complicated-Subsystem** | Handles irreducible technical complexity | 3-5 specialists | Permanent |

**Three Interaction Modes:**

| Mode | Nature | When | Duration |
|------|--------|------|----------|
| **Collaboration** | High-touch, synchronous joint work | Joint problem-solving on new capability | Time-boxed (2-6 weeks) |
| **X-as-a-Service** | Low-touch, async self-service consumption | Stable interface, clear contract | Ongoing |
| **Facilitation** | Teaching/coaching one team helps another | Capability transfer needed | Temporary (3-6 months) |

**Key Heuristics:**
- Stream-aligned teams should be the majority (>60%)
- Cognitive load per team must be sustainable (<7 major responsibilities)
- Team boundaries should match desired system boundaries (Conway's Law)
- Collaboration mode MUST be time-boxed — permanent collaboration = organizational smell
- X-as-a-Service is the preferred default for most interactions

---

### 2. Socio-Technical Architecture (Malan & Bredemeyer, 2003+)

**Core Insight:** Organization structure directly shapes system behavior. You cannot separate org design from system design.

**Conway's Law:** "Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure."

**Conway's Law Inversion:** Design your organization to produce the system architecture you want.

**Diagnostic Principles:**
- Architecture is not only about technology — it's about people and communication
- Team structure affects system boundaries
- Communication paths constrain design options
- Restructuring without diagnosis is organizational superstition

**Problem Classification Framework:**

| Type | Indicators | Fix Cost | Fix Approach |
|------|-----------|----------|-------------|
| Structure | Teams don't map to value streams | HIGH (months) | Restructure teams |
| Interaction | Teams exist but interact chaotically | MEDIUM (weeks) | Fix interaction modes + contracts |
| Governance | Decisions are slow, unclear authority | LOW (days-weeks) | Clarify decision authority |
| Tools/Process | Infrastructure friction | MEDIUM (weeks) | Fix tooling (not org) |
| Culture | Trust issues, knowledge hoarding | HIGH (months) | Address norms and values |

---

### 3. AI Agent Orchestration (Hawkins, 2024+)

**Core Insight:** Multi-agent systems need explicit boundaries and protocols. Agents without governance are chaos.

**Agent Boundary Matrix:**

| Dimension | Definition | Example |
|-----------|-----------|---------|
| `can_do` | Actions agent performs autonomously | "Analyze code, generate tests" |
| `cannot_do` | Actions explicitly forbidden | "Deploy to production, delete data" |
| `requires_approval` | Actions needing human/chief approval | "Modify architecture, change APIs" |

**Safety Constraints:**
- Input validation on every agent
- Output validation before handoff
- Scope enforcement (no out-of-boundary operation)
- Resource limits (token, time, retry)
- Audit logging for all decisions

**Failure Mode Categories:**
- Invalid output (agent produces garbage)
- Boundary violation (agent exceeds authority)
- Infinite loop (agents pass work back and forth)
- Agent crash (mid-execution failure)
- Human gate timeout (no human response)
- Cascade failure (one failure triggers others)

---

### 4. Multi-Agent Systems Theory (Shoham, 2000+)

**Core Insight:** Game theory predicts multi-agent behavior. Mathematical validation prevents pathological equilibria.

**Game Types in Agent Interactions:**

| Type | Description | Risk Level | Example |
|------|------------|-----------|---------|
| Coordination | Both benefit from aligning | Low | analyst -> architect |
| Cooperation with tension | Benefit from cooperating but competing sub-goals | Medium | dev <-> qa |
| Potential conflict | Misaligned incentives possible | High | Agent that can skip validation |

**Pathological Equilibria to Detect:**

| Pattern | Description | Mitigation |
|---------|------------|-----------|
| Deadlock | Both agents waiting for the other | Timeout + escalation |
| Infinite loop | Agents pass work back and forth | Iteration limit + arbiter |
| Collusion | Agents cooperate to bypass safety | Independent validation agent |
| Mutual defection | Both choose selfish strategy | Reputation system / enforcement |
| Race condition | Agents compete for same resource | Resource locking / serialization |

---

## Tier System

```
Tier 0 — DIAGNOSTIC (Ruth Malan)
  "SHOULD we do this?"
  Diagnostic veto power — can stop entire workflow

Tier 1 — MASTERS (Matthew Skelton, Manuel Pais)
  "HOW do we structure this?"
  Structure design + interaction design

Tier 2 — SYSTEMATIZERS (Barry Hawkins, Yoav Shoham)
  "WHAT patterns apply here?"
  Orchestration engineering + mathematical validation

ORCHESTRATOR (Team Taxonomy Chief)
  "WHICH specialist for this problem?"
  Routes, coordinates, synthesizes
```

---

## Conflict Resolution Quick Reference

| Conflict | Arbiter | Rule |
|----------|---------|------|
| Tier 0 vs anyone | Human stakeholder | Ruth's diagnostic veto is absolute |
| Tier 1 vs Tier 1 | Chief | Chief weighs evidence, makes decision |
| Tier 2 vs Tier 2 | Escalate to Tier 1 → Chief | Theory prevails on math, engineering on implementation |
| Lower vs Higher tier | Chief | Lower cannot override higher without Chief approval |

---

## Key Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Decision time | <3 days | Time from question to decision |
| Meeting load | -30% from baseline | Calendar audit |
| Team autonomy | +40% from baseline | Blocker count reduction |
| Cognitive load | GREEN for all teams | Responsibilities + dependencies count |
| Handoff time | <2 hours | Time between specialist phases |

---

_Knowledge Base Version: 1.0_
_Squad: team-taxonomy_
_Last Updated: 2026-02-10_
