# 🏗️ Team Taxonomy Squad

**Master team structure design and AI agent orchestration for AI-first product development**

---

## Overview

The **Team Taxonomy Squad** specializes in designing, validating, and orchestrating organizational structures for AI-first product development. It applies battle-tested frameworks from **Team Topologies** (Skelton & Pais) and **Socio-Technical Architecture** (Malan) to both human teams and AI agent squads.

This squad is essential for organizations scaling AI agents, because:

> **"AI agents scale execution. Team taxonomy scales judgment."**
> — Team Topology Principle

---

## 🎯 What This Squad Does

### 1. **Diagnoses Organizational Problems** (Tier 0 - Ruth Malan)
- Identifies socio-technical misalignments before restructuring
- Maps current communication patterns to architecture
- Assesses if restructuring will actually solve the problem
- **Principle:** "Fix the diagnosis first, not the symptoms"

### 2. **Designs Team Structures** (Tier 1 - Matthew Skelton)
- Applies 4-type Team Topologies model
- Assigns teams around value streams (not technology)
- Optimizes for fast flow and minimal cognitive load
- Defines team APIs and boundaries
- **Principle:** "Org design is system design"

### 3. **Designs Interaction Patterns** (Tier 1 - Manuel Pais)
- Chooses optimal interaction modes (Collaboration, X-as-a-Service, Facilitation)
- Manages cognitive load across team interactions
- Eliminates unnecessary coupling
- Creates sustainable team contracts
- **Principle:** "The interaction mode determines team effectiveness"

### 4. **Governs AI Agent Squads** (Tier 2 - Barry Hawkins)
- Structures multi-agent systems with explicit safety boundaries
- Designs orchestration patterns (sequential, parallel, hierarchical)
- Establishes failure mode protections
- Applies human-in-the-loop controls
- **Principle:** "Safety is the primary constraint for AI agents"

### 5. **Validates Agent Coordination** (Tier 2 - Yoav Shoham)
- Uses game theory to predict multi-agent behavior
- Validates coordination protocols mathematically
- Detects pathological equilibria (agent conflicts)
- Ensures protocol stability
- **Principle:** "Mathematical validation prevents runtime surprises"

---

## 👥 The Six Agents

### **team-taxonomy-chief** (Orchestrator)
**Role:** Routes requests to specialists, coordinates workflows, synthesizes insights

**Use when:** Starting any work with the squad
- "I need to restructure my organization"
- "I'm designing an AI agent squad"
- "Is our current structure the problem?"

**Does:** Analyzes problem → routes to appropriate specialist(s) → coordinates their inputs → provides synthesized recommendation

---

### **ruth-malan** (Tier 0 - Diagnostic)
**Role:** Decision Architecture Diagnostician

**Specialties:**
- Socio-technical congruence analysis
- Communication structure assessment
- Decision architecture evaluation
- Conway's Law impact analysis
- Current state architecture reconstruction

**Use when:**
- Diagnosing why a team is struggling
- Unsure if restructuring is the right solution
- Need to understand current organizational DNA
- Evaluating impact of proposed changes

**Framework:** Socio-Technical System Design
- Maps organization as a socio-technical whole
- Identifies misalignment between people, processes, and technology
- Provides root cause diagnosis, not symptom fixes

---

### **matthew-skelton** (Tier 1 - Master)
**Role:** Team Topologies Architect

**Specialties:**
- Team Topologies design (4 fundamental types)
- Cognitive load assessment
- Team API definition
- Conway's Law inversion
- Fast flow optimization

**Use when:**
- Designing a new team structure from scratch
- Restructuring existing organization
- Evaluating current topology against best practices
- Creating team boundaries and APIs

**Framework:** Team Topologies
```
Stream-Aligned Team
├─ Owns a flow of business value
├─ Organized around customer needs
└─ Interacts with others via team API

Platform Team
├─ Provides internal services
├─ Reduces cognitive load for stream-aligned teams
└─ Uses X-as-a-Service interaction mode

Enabling Team
├─ Accelerates capability adoption
├─ Temporary by design
└─ Transitions to facilitation or dissolves

Complicated Subsystem Team
├─ Handles irreducible technical complexity
├─ Example: ML model training, infrastructure
└─ Should be kept small and specialized
```

---

### **manuel-pais** (Tier 1 - Master)
**Role:** Team Interaction Patterns Designer

**Specialties:**
- Interaction mode selection (Collaboration, X-as-a-Service, Facilitation)
- Cognitive load optimization through interactions
- Team coupling analysis
- Pull-based vs push-based design
- Team contract definition

**Use when:**
- Designing how teams interact with each other
- Reducing unnecessary team dependencies
- Implementing sustainable interaction patterns
- Creating clear team boundaries

**Framework:** Team Interaction Modes
```
Collaboration (High-touch)
├─ Use: Cross-team learning, solving complex dependencies
├─ Duration: Time-boxed (2-4 weeks)
├─ Risk: Can become permanent coupling
└─ Outcome: Shared understanding

X-as-a-Service (Stable)
├─ Use: Platform teams serving stream-aligned teams
├─ Interaction: Pull-based, asynchronous
├─ Best for: Self-service platforms
└─ Outcome: Predictable, scalable service delivery

Facilitation (Enablement)
├─ Use: Teaching new skills or practices
├─ Duration: Temporary, with exit criteria
├─ Approach: Coaching and mentoring
└─ Outcome: Team becomes independent
```

---

### **barry-hawkins** (Tier 2 - Systematizer)
**Role:** AI Agent Orchestration Architect

**Specialties:**
- Agent boundary definition
- Orchestration patterns (Sequential, Parallel, Hierarchical, Peer)
- Safety constraints and veto conditions
- Agent interaction protocols
- Failure mode analysis
- Human-in-the-loop mechanisms

**Use when:**
- Designing multi-agent systems
- Building AI agent squads
- Establishing safety guardrails for agents
- Analyzing failure modes of agent interactions

**Framework:** AI Agent Orchestration & Multi-Agent Governance

**Orchestration Patterns:**
```
Sequential
├─ Agent A → Agent B → Agent C → Human
├─ Use: Dependency chains, stage-gate reviews
└─ Risk: Cascading failures

Parallel
├─ Agent A ║ Agent B ║ Agent C → Merge → Human
├─ Use: Independent tasks, voting mechanisms
└─ Benefit: Fast execution, redundancy

Hierarchical
├─ Chief Agent → Specialist Agents → Human
├─ Use: Complex decision making, AIOS squad structure
└─ Benefit: Clear accountability, structured escalation

Peer
├─ Agent A ↔ Agent B ↔ Agent C (negotiation)
├─ Use: Complex coordination, consensus-seeking
└─ Risk: Deadlock, requires game-theoretic validation
```

---

### **yoav-shoham** (Tier 2 - Systematizer)
**Role:** Multi-Agent Theory Specialist

**Specialties:**
- Game-theoretic analysis
- Coordination protocol design
- Equilibrium analysis
- Strategic interaction patterns
- Protocol stability validation
- Pathological equilibria detection

**Use when:**
- Validating multi-agent protocols
- Analyzing strategic interactions between agents
- Designing coordination mechanisms
- Detecting potential agent conflicts

**Framework:** Multi-Agent Systems Theory

**Game-Theoretic Analysis:**
```
Coordination Game
├─ Agents benefit from agreeing
├─ Example: Sequential execution order
└─ Solution: Explicit protocol

Conflict/Competition
├─ Agents have opposing interests
├─ Risk: Both agents fail to achieve goals
└─ Solution: Incentive alignment or governance

Stalemate/Deadlock
├─ Agents waiting for each other
├─ Example: Circular dependencies
└─ Solution: Break cycle with human intervention
```

---

## 🚀 How to Use This Squad

### **Option 1: Single Specialist**

**"I need to design how my teams should interact"**
```
You → team-taxonomy-chief
→ Chief routes to: manuel-pais
→ Manuel provides: Interaction mode design
→ Output: Team interaction patterns and contracts
```

**"My AI agent squad keeps failing. Why?"**
```
You → team-taxonomy-chief
→ Chief routes to: barry-hawkins + yoav-shoham
→ Barry analyzes: Orchestration pattern problems
→ Yoav validates: Game theory conflicts
→ Output: Root causes and fixes
```

---

### **Option 2: Multi-Specialist Workflow**

#### **Workflow 1: Design Team Structure (1-2 days)**
```
PHASE 1: Diagnosis (Ruth Malan)
├─ Input: Current organization description
├─ Actions: Assess socio-technical health
├─ Output: Diagnosis report + recommendations
└─ Question: "Do we need restructuring?"

PHASE 2: Design (Matthew Skelton)
├─ Input: Strategic direction + constraints
├─ Actions: Apply Team Topologies model
├─ Output: New team structure diagram
└─ Checkpoints: Validates fast flow + minimal cognitive load

PHASE 3: Interaction Design (Manuel Pais)
├─ Input: Proposed team structure
├─ Actions: Design interaction modes
├─ Output: Team API contracts + interaction patterns
└─ Outcome: Ready for implementation
```

#### **Workflow 2: Validate AI Agent Squad (4-6 hours)**
```
PHASE 1: Structure Assessment (Matthew Skelton)
├─ Input: Proposed agent squad
├─ Actions: Apply Topologies to agent teams
├─ Output: Squad structure recommendations
└─ Question: "Is this topology correct?"

PHASE 2: Orchestration Design (Barry Hawkins)
├─ Input: Agent relationships + dependencies
├─ Actions: Design orchestration patterns
├─ Output: Orchestration diagram + safety constraints
└─ Checkpoints: Validates failure mode protections

PHASE 3: Game-Theoretic Validation (Yoav Shoham)
├─ Input: Agent protocols and interactions
├─ Actions: Analyze agent coordination
├─ Output: Protocol stability analysis + conflict detection
└─ Outcome: Mathematically validated design
```

#### **Workflow 3: Org Health Check (2-3 hours)**
```
PHASE 1: Diagnosis (Ruth Malan)
├─ Input: Description of problems
├─ Actions: Analyze current structure
├─ Output: Root cause diagnosis
└─ Decision: "Restructure or change interactions?"

PHASE 2A: If Structure Issue → Matthew Skelton
├─ Actions: Design improved topology
└─ Output: Reorganization plan

PHASE 2B: If Interaction Issue → Manuel Pais
├─ Actions: Redesign interaction patterns
└─ Output: New team contracts + collaboration rules

PHASE 3: Implementation Plan
├─ Actions: Roadmap + timing
└─ Outcome: Clear next steps
```

---

## 📊 Quick Reference: When to Use Which Agent

| Situation | Primary Agent | Secondary Agents |
|-----------|---------------|-----------------|
| **Diagnosing org problems** | ruth-malan | (none) |
| **Designing team structure** | matthew-skelton | ruth-malan |
| **Fixing team interactions** | manuel-pais | matthew-skelton |
| **Building AI agent squad** | barry-hawkins | matthew-skelton + yoav-shoham |
| **Validating agent protocols** | yoav-shoham | barry-hawkins |
| **"I'm not sure what's wrong"** | team-taxonomy-chief | (all others as needed) |

---

## 🎓 Key Concepts Explained

### **1. The Four Team Types**

**Stream-Aligned Team** (Focus on value delivery)
- Owns complete slice of customer value
- Cross-functional (product, engineering, design)
- Interacts with others via team API
- Example: "Checkout squad", "Auth squad"

**Platform Team** (Focus on enabling services)
- Provides internal services to stream-aligned teams
- Removes friction and cognitive load
- Uses X-as-a-Service mode
- Example: "Infrastructure team", "Data platform team"

**Enabling Team** (Focus on capability transfer)
- Temporary by design
- Teaches practices/technology to other teams
- Dissolves when goal achieved
- Example: "Cloud migration team", "AI adoption team"

**Complicated Subsystem Team** (Focus on reducing complexity)
- Handles irreducible technical complexity
- Isolated from other teams by expertise
- Use only when complexity can't be abstracted
- Example: "ML model team", "Real-time processing team"

---

### **2. The Three Interaction Modes**

**Collaboration**
- "We need to figure this out together"
- High communication, frequent sync-ups
- Time-boxed (2-4 weeks)
- Risk: Can become permanent if not managed
- Use when: Solving complex cross-team dependencies

**X-as-a-Service** (Platform provides service)
- "Platform provides stable service, teams consume via API"
- Asynchronous, pull-based
- Clear contracts and SLAs
- Best for: Platform teams serving stream-aligned teams
- Example: Kubernetes as a service, data warehouse as a service

**Facilitation**
- "Expert coaches other team"
- Temporary engagement
- Goal: Team becomes independent
- Use when: Teaching new practices or technology
- Duration: Usually 2-3 months

---

### **3. Conway's Law Inversion**

**Conway's Law** (Original, 1968):
> "Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure."

**Conway's Law Inversion** (How we use it):
> "Design the organization structure such that the system architecture matches your desired design."

**In practice:**
- If you want microservices, structure teams around business domains (stream-aligned)
- If you want clear APIs, enforce explicit team boundaries (team APIs)
- If you want fast deployment, avoid hand-offs between teams
- If you want AI agent orchestration, structure agents like teams (hierarchical, parallel, sequential)

**Key insight:** Organization structure IS system design. They are inseparable.

---

### **4. Cognitive Load**

**Definition:** The maximum amount of mental effort/complexity a team can sustain while remaining effective.

**Factors:**
- Team size (larger = more communication overhead)
- Codebase complexity
- Number of dependencies on other teams
- Frequency of context switching
- Tooling friction

**Management:**
- Right-size teams for their domain (usually 6-10 people)
- Use platform teams to reduce cognitive load for stream-aligned teams
- Design clear boundaries to minimize hand-offs
- Automate operational overhead

**For AI agents:** Similar principle applies - each agent has maximum complexity it can handle

---

### **5. Tier System**

The squad uses a 4-tier classification:

**Tier 0 - Diagnostic Foundation**
- Answers: "SHOULD we do this?"
- Provides root cause analysis
- Example: Ruth Malan (diagnose before restructuring)

**Tier 1 - Masters**
- Answers: "HOW do we structure this?"
- Applies proven patterns
- Examples: Matthew Skelton (design), Manuel Pais (interactions)

**Tier 2 - Systematizers**
- Answers: "WHAT patterns apply to this situation?"
- Provides specialized frameworks
- Examples: Barry Hawkins (orchestration), Yoav Shoham (game theory)

**Orchestrator**
- Routes to appropriate tier(s)
- Coordinates multi-specialist workflows
- Synthesizes recommendations from multiple perspectives

---

## 🔗 Integration with AIOS

### **Use Team Taxonomy Squad BEFORE Creating Agent Squads**

```
Your New Project
       ↓
team-taxonomy-chief (initial assessment)
       ↓
"What's the best team structure for this?"
       ↓
matthew-skelton + manuel-pais (design)
       ↓
"Now I know how to organize my agents"
       ↓
squad-creator (build agents based on team design)
       ↓
"Now I have my specialized agent squad"
```

### **Handoff to Other Squads**

After team-taxonomy designs the structure:
- **→ squad-creator:** Build agents for each specialized domain
- **→ dev squad:** Implement the designed structure
- **→ qa squad:** Validate that implementation matches design

---

## 📚 Recommended Reading

### **Core Books**
- "Team Topologies" by Matthew Skelton & Manuel Pais (2019)
  - Foundation for team structure design
  - Includes case studies and implementation patterns

- "Fundamentals of Software Architecture" by Mark Richards & Neal Ford
  - Chapter on organizational implications of architecture

### **Key Papers**
- Ruth Malan's work on decision architecture
- Melvin Conway's original 1968 paper
- Game theory papers by Yoav Shoham (Stanford)

### **Online Resources**
- Team Topologies website: https://teamtopologies.com
- AIOS framework documentation
- This squad's example scenarios (see below)

---

## 💡 Example Scenarios

### **Scenario 1: Scaling a 20-person startup to 100**

**Problem:** "We're growing fast. How should we organize?"

**Workflow:**
```
1. ruth-malan → Diagnoses current informal structure + pain points
2. matthew-skelton → Designs topology for 100 people (4-6 stream-aligned teams + 2 platform teams)
3. manuel-pais → Designs interaction patterns (mostly X-as-a-Service to platform)
4. squad-creator → Builds specialized agent squads for each team type
5. dev → Implements organizational structure + tooling

Result: Clear team boundaries, optimized for fast flow
```

---

### **Scenario 2: Building a multi-agent system**

**Problem:** "I have 5 AI agents that need to coordinate. How should they orchestrate?"

**Workflow:**
```
1. matthew-skelton → Apply Team Topologies to agent structure
   → Classify agents by type (stream-aligned, platform, enabling, complicated-subsystem)

2. barry-hawkins → Design orchestration pattern
   → Sequential? Parallel? Hierarchical? (depends on dependencies)
   → Define safety constraints + human-in-the-loop points

3. yoav-shoham → Validate coordination protocol
   → Game theory analysis: Will agents cooperate?
   → Detect conflicts, deadlocks, pathological equilibria

4. dev → Implement orchestration using validated design

Result: Multi-agent system with proven coordination protocol
```

---

### **Scenario 3: Diagnosing org dysfunction**

**Problem:** "Our teams keep stepping on each other's toes. Communication is a mess."

**Workflow:**
```
1. ruth-malan → Root cause diagnosis
   → Map current communication structure
   → Identify socio-technical misalignments
   → Question: "Restructure? Change interactions? Change tools?"

2. If answer = "Change interactions":
   → manuel-pais → Redesign interaction modes + team contracts
   → Result: Clearer boundaries, less thrashing

3. If answer = "Restructure":
   → matthew-skelton → Design new team topology
   → Then: manuel-pais → Design interactions in new structure
   → Result: New org chart + implementation plan

Result: Clear diagnosis + actionable fix
```

---

## ❌ Common Mistakes to Avoid

### **1. Restructuring Without Diagnosis**
❌ **Wrong:** "Let's reorganize!" (assumes structure is the problem)
✅ **Right:** "Let's diagnose the problem first" (ruth-malan)

### **2. Designing Structure in Isolation**
❌ **Wrong:** Design team topology without considering how they'll interact
✅ **Right:** Design topology (matthew-skelton) + interactions (manuel-pais) together

### **3. Ignoring Cognitive Load**
❌ **Wrong:** "Let's put everything in one team" (overload)
✅ **Right:** Right-size teams for their domain + use platform teams to reduce load

### **4. AI Agents Without Orchestration Design**
❌ **Wrong:** "Just launch 5 agents and see what happens" (chaos)
✅ **Right:** Design orchestration first (barry-hawkins + yoav-shoham)

### **5. Not Applying Conway's Law**
❌ **Wrong:** Design system architecture without thinking about team structure
✅ **Right:** Design org structure to match desired system architecture

---

## 🎯 Advanced Topics

### **Conway's Law Inversion in AI Systems**

When designing AI agent squads:
1. Define system behavior you want (what should the agents accomplish?)
2. Design agent team structure to match that (hierarchical? parallel? sequential?)
3. Design agent interactions (protocols, data flow)
4. Implement agents to the design

**Key insight:** Agent orchestration mirrors team orchestration principles

---

### **Socio-Technical Debt**

Just like technical debt, organizations accumulate:
- Old team structures that no longer fit
- Interaction patterns that create friction
- Communication overhead that kills velocity

**Assessment:**
- Fast flow of value? (Ruth's diagnosis)
- Low cognitive load? (Matthew + Manuel)
- Clear decision making? (Ruth's architecture analysis)

**Payoff:** Restructuring is expensive, but living with debt is MORE expensive

---

### **Team API Design**

Each team should publish an API:
- **What services does this team provide?**
- **How do other teams consume those services?** (collaboration/XaaS/facilitation)
- **What are the SLAs and constraints?**
- **How do teams coordinate dependencies?**

Example from Platform Team:
```
Service: Infrastructure as Code Deployment
Consumption: XaaS (pull-based)
SLA: Deploy in <5 minutes
Constraint: Deploys must be validated by platform team first
Support: Async (email/ticket), no synchronous calls
```

---

## 📞 Getting Help

When you're stuck:

1. **"I don't know where to start"**
   → Use `team-taxonomy-chief` (will route you appropriately)

2. **"I have a specific team structure question"**
   → Use the **Quick Reference table** above to find the right agent

3. **"I need a complete organizational redesign"**
   → Run the **Design Team Structure** workflow (3-4 phases)

4. **"I'm building an AI agent system"**
   → Run the **Validate AI Agent Squad** workflow (5 phases)

---

## 📊 Squad Statistics

| Metric | Value |
|--------|-------|
| Total Agents | 6 |
| Total Lines of Code | 7,144 |
| Tiers Represented | 4 (0, 1, 2, Orchestrator) |
| Frameworks Applied | 4 |
| Workflows Included | 3 |
| Example Scenarios | 12+ |
| Quality Score | 8.5/10 |

---

## 🚀 Next Steps

1. **Read** this README completely
2. **Choose** a scenario that matches your situation
3. **Start** with `team-taxonomy-chief`
4. **Follow** the suggested workflow
5. **Implement** the recommendations

---

**Last Updated:** February 5, 2025
**Version:** 1.0.0
**Maintained by:** Squad Architect

🏗️ Building organizational intelligence, one team at a time.
