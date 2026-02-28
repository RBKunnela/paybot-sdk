# Academic Research

**Category:** T3 Specialized | **Status:** Active | **Version:** 1.1.0

Squad especializado em pesquisa acadêmica rigorosa, escrita científica e publicação em periódicos peer-reviewed. Suporta metodologias qualitativas, quantitativas e mistas, revisões sistemáticas (PRISMA 2020), gestão de citações e peer review interno.

---

## Agents

| Agent | Role | Type |
|-------|------|------|
| research-chief | P0 Chief — Research Strategy, Project Leadership, Ethics, Publication | Chief |
| academic-writer | P1 Specialist — Scientific Writing (IMRaD), Revision | Specialist |
| literature-reviewer | P1 Specialist — Literature Search, Screening, Systematic Reviews (PRISMA) | Specialist |
| citation-manager | P1 Specialist — Citations (APA/MLA/Chicago), References, Plagiarism Prevention | Specialist |
| peer-reviewer | P1 Specialist — Internal Peer Review, Reviewer Response Support | Specialist |
| academic-research | User-Facing Orchestrator — Entry point for activating the squad | Activatable |

## Knowledge Docs

| Document | Content |
|----------|---------|
| [RESEARCH-METHODOLOGY.md](knowledge/RESEARCH-METHODOLOGY.md) | Research design patterns, methodologies (qual/quant/mixed), IMRaD, ethics, best practices |
| [SYSTEMATIC-REVIEW-GUIDE.md](knowledge/SYSTEMATIC-REVIEW-GUIDE.md) | PRISMA 2020 protocol, search strategy, screening, data extraction, meta-analysis |
| [CITATION-STANDARDS.md](knowledge/CITATION-STANDARDS.md) | Citation styles (APA, MLA, Chicago, Harvard, Vancouver, IEEE), reference management, plagiarism prevention |
| [INDEX.md](knowledge/INDEX.md) | Knowledge index with decision maps by situation and by agent |

## Templates

| Template | Use |
|----------|-----|
| `research-proposal-template.md` | Research proposal with methodology, timeline, budget |
| `paper-template.md` | IMRaD paper with all sections structured |
| `systematic-review-template.md` | PRISMA 2020 systematic review format |
| `response-to-reviewers-template.md` | Point-by-point response to reviewer comments |

## Checklists

| Checklist | Use |
|-----------|-----|
| `pre-submission-checklist.md` | Validate manuscript before journal submission |
| `ethics-compliance-checklist.md` | Verify ethics requirements before data collection |

---

## Workflow Pipeline

```
User → @academic-research → research-chief
                              │
                              ├── 1. Research Design: Define RQ, methodology, timeline
                              │      (research-chief)
                              │
                              ├── 2. Ethics Approval: IRB/CEP submission
                              │      (research-chief)
                              │
                              ├── 3. Literature Review: Search → Screen → Extract → Synthesize
                              │      (literature-reviewer)
                              │
                              ├── 4. Writing: IMRaD paper or Systematic Review (PRISMA)
                              │      (academic-writer + literature-reviewer)
                              │
                              ├── 5. Citations: Format, check plagiarism, verify references
                              │      (citation-manager)
                              │
                              ├── 6. Peer Review: Internal review before submission
                              │      (peer-reviewer)
                              │
                              └── 7. Publication: Journal selection, submission, revision
                                     (research-chief)
```

---

## Workflows

### 1. Complete Research Project (9-12 months)
End-to-end research from design to publication.

**Phases:**
1. Research Design & Ethics Approval (1-2 months)
2. Data Collection (2-4 months)
3. Literature Review (1-2 months, parallel)
4. Data Analysis (1-2 months)
5. Manuscript Writing (2-3 months)
6. Internal Review & Revision (2-3 weeks)
7. Submission & Publication (1-2 weeks + journal review time)

**Best for:** PhD dissertations, journal articles, independent research projects

```bash
*complete-research "AI in education" --type quantitative --journal "Educational Research"
```

---

### 2. Systematic Review Protocol (4-6 months)
PRISMA-compliant systematic review of existing literature.

**Phases:**
1. Protocol Development & Registration (2-3 weeks)
2. Comprehensive Literature Search (1 week)
3. Study Selection & Screening (2-4 weeks)
4. Data Extraction & Quality Assessment (3-4 weeks)
5. Evidence Synthesis (2-3 weeks)
6. Manuscript Writing (4-6 weeks)
7. Internal Review & Revision (1-2 weeks)
8. Submission & Publication (1 week + journal review)

**Best for:** Systematic reviews, meta-analyses, evidence synthesis

```bash
*systematic-review "Does AI improve learning outcomes?"
```

---

### 3. Paper Submission Workflow (2-4 weeks)
Fast-track paper from draft to submission.

**Phases:**
1. Polish & Format Manuscript (3-5 days)
2. Internal Peer Review (1 week)
3. Prepare & Submit (2-3 days)
4. Track & Respond (ongoing)

**Best for:** Conference papers, quick submissions, revisions

```bash
*submit-paper draft.docx --journals "Nature,Science" --style APA7
```

---

## Quick Start

### Design Research Study
```bash
*research-design "Teacher attitudes toward AI" --type qualitative --journal "Educational Research"
```

### Conduct Literature Search
```bash
*literature-search "machine learning" --scope systematic --databases PubMed,Scopus,GoogleScholar
```

### Write Research Paper
```bash
*write-paper --lit-review lit-review.md --methodology methods.md --journal "Nature"
```

### Format Citations
```bash
*format-citations manuscript.docx --style APA7
```

### Check Plagiarism
```bash
*check-plagiarism manuscript.docx --tool Turnitin
```

### Internal Peer Review
```bash
*peer-review manuscript.docx --journal "Science"
```

### Submit to Journal
```bash
*submit manuscript.docx --journals "Nature,Science,PNAS"
```

---

## All Commands

| Command | Description | Example |
|---------|-------------|---------|
| `*research-design` | Design research study | `*research-design "AI in education" --type quantitative` |
| `*ethics-approval` | Prepare IRB application | `*ethics-approval --design research-design.md` |
| `*literature-search` | Conduct literature search | `*literature-search "machine learning" --scope systematic` |
| `*screen-papers` | Screen papers for inclusion | `*screen-papers results.csv --level full_text` |
| `*extract-data` | Extract data from papers | `*extract-data included-papers.csv` |
| `*synthesize` | Synthesize findings | `*synthesize data.csv --type thematic` |
| `*write-paper` | Write complete paper | `*write-paper --lit-review lit.md --methods methods.md` |
| `*write-lit-review` | Write literature review | `*write-lit-review synthesis.md --type thematic` |
| `*write-methodology` | Write methodology section | `*write-methodology --design research-design.md` |
| `*write-systematic-review` | Write systematic review | `*write-systematic-review --search results.csv` |
| `*format-citations` | Format citations | `*format-citations manuscript.docx --style APA7` |
| `*check-plagiarism` | Check plagiarism | `*check-plagiarism manuscript.docx --tool Turnitin` |
| `*manage-refs` | Organize references | `*manage-refs papers/ --tool Zotero` |
| `*convert-style` | Convert citation style | `*convert-style manuscript.docx --from APA7 --to MLA9` |
| `*peer-review` | Internal peer review | `*peer-review manuscript.docx` |
| `*address-comments` | Respond to reviewers | `*address-comments --feedback reviewers.pdf` |
| `*revise` | Revise manuscript | `*revise manuscript.docx --feedback peer-review.md` |
| `*final-review` | Final quality check | `*final-review manuscript.docx --journal "Nature"` |
| `*submit` | Submit to journal | `*submit manuscript.docx --journals "Nature,Science"` |

---

## Use Cases

### Use Case 1: PhD Dissertation Chapter

**Scenario:** PhD student needs to conduct research study and publish results.

**Timeline:** 9-12 months

**Workflow:**
```bash
# 1. Design study (Month 1)
*research-design "Does AI tutoring improve learning outcomes?" --type quantitative

# 2. Get ethics approval (Month 1-2)
*ethics-approval --design research-design.md

# 3. Conduct literature review (Month 2-3, parallel with data collection)
*literature-search "AI tutoring" --scope systematic
*screen-papers search-results.csv --level full_text
*extract-data included-papers.csv
*synthesize data-extraction.csv --type thematic
*write-lit-review synthesis.md

# 4. Write paper (Month 8-10, after data collection/analysis)
*write-methodology --design research-design.md
*write-paper --lit-review lit-review.md --methodology methods.md

# 5. Quality assurance (Month 11)
*format-citations manuscript.docx --style APA7
*check-plagiarism manuscript.docx
*peer-review manuscript.docx

# 6. Submit (Month 12)
*submit manuscript.docx --journals "Journal of Educational Psychology"
```

**Outcome:** Published paper in peer-reviewed journal, contributing to PhD dissertation.

---

### Use Case 2: Systematic Review

**Scenario:** Research team conducting systematic review on effectiveness of personalized learning.

**Timeline:** 4-6 months

**Workflow:**
```bash
# Complete systematic review workflow
*systematic-review "Effectiveness of personalized learning interventions"

# Or step-by-step:
*research-design "Personalized learning" --type systematic_review
*literature-search "personalized learning" --scope systematic --databases PubMed,Scopus,ERIC
*screen-papers search-results.csv --level title_abstract --dual-screening
*screen-papers included-abstracts.csv --level full_text
*extract-data included-full-text.csv
*synthesize data-extraction.csv --type meta_analysis
*write-systematic-review --search results.csv --extraction data.csv --synthesis synthesis.md
*peer-review manuscript.docx
*submit manuscript.docx --journals "Review of Educational Research"
```

**Outcome:** PRISMA-compliant systematic review published in high-impact journal.

---

### Use Case 3: Fast-Track Conference Paper

**Scenario:** Researcher has draft paper and conference deadline in 3 weeks.

**Timeline:** 2-3 weeks

**Workflow:**
```bash
# Fast-track submission workflow
*submit-paper draft.docx --journals "ICML,NeurIPS" --style IEEE

# Or step-by-step:
*format-citations draft.docx --style IEEE
*check-plagiarism draft.docx
*peer-review draft.docx
*revise draft.docx --feedback peer-review.md --level minor
*final-review revised.docx --journal "ICML"
*submit revised.docx --journals "ICML,NeurIPS"
```

**Outcome:** High-quality paper submitted to conference on time.

---

## Research Methodologies Supported

### Qualitative Research
- **Methods:** Interviews, focus groups, ethnography, case studies, document analysis
- **Analysis:** Thematic analysis, grounded theory, phenomenology, discourse analysis
- **Tools:** NVivo, MAXQDA, ATLAS.ti

### Quantitative Research
- **Methods:** Surveys, experiments, RCTs, quasi-experimental designs
- **Analysis:** Descriptive statistics, t-tests, ANOVA, regression, structural equation modeling
- **Tools:** SPSS, R, Stata, Python (statsmodels, scikit-learn)

### Mixed-Methods Research
- **Designs:** Explanatory sequential, exploratory sequential, convergent parallel
- **Integration:** Side-by-side comparison, data transformation, joint display
- **Tools:** MAXQDA, NVivo (mixed-methods modules)

### Systematic Reviews
- **Approaches:** Narrative synthesis, thematic synthesis, meta-analysis, meta-ethnography
- **Guidelines:** PRISMA 2020, Cochrane Handbook, JBI methodology
- **Registration:** PROSPERO (systematic reviews), OSF (other pre-registrations)

---

## Citation Styles Supported

### APA 7th Edition
**Used in:** Psychology, education, social sciences

**In-text:** Smith (2024) found that...
**Reference:** Smith, J. A. (2024). Title of article. *Journal Name*, 15(3), 123-145. https://doi.org/10.1234/example

### MLA 9th Edition
**Used in:** Humanities, literature, arts

**In-text:** (Smith 123)
**Reference:** Smith, John A. "Title of Article." *Journal Name*, vol. 15, no. 3, 2024, pp. 123-145.

### Chicago Style
**Used in:** History, arts, humanities

**Note:** ¹ John A. Smith, "Title," *Journal Name* 15, no. 3 (2024): 123.
**Bibliography:** Smith, John A. "Title of Article." *Journal Name* 15, no. 3 (2024): 123-145.

### Harvard Style
**Used in:** Business, economics, social sciences

**In-text:** (Smith 2024)
**Reference:** Smith, J.A. (2024) 'Title of article', *Journal Name*, 15(3), pp. 123-145.

### Vancouver Style
**Used in:** Medicine, health sciences

**In-text:** [1]
**Reference:** 1. Smith JA. Title of article. Journal Name. 2024;15(3):123-45.

### IEEE Style
**Used in:** Engineering, computer science

**In-text:** [1]
**Reference:** [1] J. A. Smith, "Title of article," *Journal Name*, vol. 15, no. 3, pp. 123-145, 2024.

---

## Tools & Integrations

### Reference Managers
- **Zotero** - Open-source, browser integration, citation plugin
- **Mendeley** - PDF annotation, social features, Elsevier integration
- **EndNote** - Advanced features, institutional use, expensive
- **BibTeX** - LaTeX integration, plain-text storage

### Literature Databases
- **PubMed** - Biomedical literature, MeSH terms, free access
- **Scopus** - Multidisciplinary, citation tracking, Elsevier
- **Web of Science** - Citation database, impact factor, Clarivate
- **Google Scholar** - Broad coverage, easy access, some quality issues
- **IEEE Xplore** - Engineering, computer science, technical papers
- **ERIC** - Education research, free access, US Dept of Education
- **PsycINFO** - Psychology, behavioral sciences, APA database

### Analysis Tools
- **SPSS** - Statistical analysis, user-friendly GUI, expensive
- **R** - Statistical programming, free, steep learning curve
- **NVivo** - Qualitative analysis, coding, visualization
- **MAXQDA** - Mixed-methods analysis, integration features
- **Python** - Data science, machine learning, flexible

### Writing & Typesetting
- **LaTeX** - Scientific typesetting, beautiful equations, version control
- **Overleaf** - Collaborative LaTeX, online editor, templates
- **Microsoft Word** - Standard document editor, citation plugins
- **Google Docs** - Collaborative editing, cloud-based, citation add-ons
- **Grammarly** - Grammar checking, style suggestions, plagiarism detection

### Plagiarism Detection
- **Turnitin** - Industry standard, used by most universities
- **iThenticate** - Pre-publication checking, high accuracy
- **Grammarly** - Real-time plagiarism checking, affordable

### Other Services
- **PROSPERO** - Systematic review protocol registration
- **OSF** - Open Science Framework, pre-registration, data sharing
- **figshare** - Data repository, DOI assignment, open access
- **Mendeley Data** - Data storage, linked to publications

---

## Success Metrics

| Metric | Target | Description |
|--------|--------|-------------|
| **Publication Rate** | 80%+ | Percentage of submissions eventually accepted |
| **Review Quality** | < 2 major revisions | Number of major revision rounds needed |
| **Timeline Adherence** | 90%+ | Projects completed on time |
| **Ethical Compliance** | 100% | Zero ethics violations or IRB issues |
| **Plagiarism Rate** | < 15% | Similarity score (excluding references) |
| **Citation Accuracy** | 100% | No citation formatting errors |

---

## Best Practices

### Research Design
✅ Start with clear research questions (SMART framework)
✅ Pre-register study protocol (PROSPERO for systematic reviews)
✅ Get ethics approval BEFORE data collection
✅ Plan adequate sample size (power analysis for quantitative)

### Literature Review
✅ Use broad search initially, then screen
✅ Conduct dual screening for systematic reviews
✅ Document all search strings and decisions
✅ Include grey literature when appropriate

### Writing
✅ Follow IMRaD structure strictly
✅ Use past tense for methods/results, present tense for general facts
✅ One idea per paragraph with clear topic sentences
✅ Cite as you write (don't wait until the end)

### Citations
✅ Use reference manager (never format manually)
✅ Always include DOI when available
✅ Be consistent with citation style throughout
✅ Check for plagiarism before submission

### Peer Review
✅ Get internal peer review before submission
✅ Address ALL reviewer comments (even minor ones)
✅ Be respectful and professional in responses
✅ Never be defensive or hostile

---

## Common Pitfalls (Avoid)

### Research Design
❌ Unclear or vague research questions
❌ Methodology too ambitious for timeline/resources
❌ Ignoring ethical considerations until too late
❌ Not considering potential limitations upfront

### Literature Review
❌ Search too narrow (miss relevant papers)
❌ Cherry-picking studies that support hypothesis
❌ No quality assessment of included studies
❌ Ignoring contradictory findings

### Writing
❌ Overclaiming ("proves" instead of "suggests")
❌ Missing methodological details (can't replicate)
❌ Results interpretation in results section
❌ Poor writing quality burying good research

### Citations
❌ Inconsistent formatting (mixing styles)
❌ Missing information (incomplete citations)
❌ Plagiarism (not paraphrasing, no citations)
❌ Self-plagiarism (not citing own prior work)

### Submission
❌ Submitting before manuscript is truly ready
❌ Not following journal formatting guidelines
❌ Weak or generic cover letter
❌ Defensive responses to reviewers

---

## Target Audience

### Primary Users
- **PhD students and doctoral researchers** - Dissertation chapters, thesis projects
- **Postdoctoral researchers** - Independent research projects, grant proposals
- **Junior faculty** - Publish-or-perish pressure, tenure-track requirements
- **Independent researchers** - Passion projects, self-funded research

### Secondary Users
- **Master's students** - Thesis projects, capstone papers
- **Research labs and centers** - Lab publications, collaborative projects
- **Think tanks and policy organizations** - Policy research, white papers
- **Corporate research teams** - R&D publications, industry research
- **Government research agencies** - Policy research, public health studies

---

## Example: AIOS Internal Use Case

**Scenario:** AIOS needs to publish research on "Effectiveness of AI-Powered Development Agents"

### Phase 1: Research Design (Week 1-2)
```bash
*research-design "AI development agents effectiveness" --type mixed_methods --journal "ACM Computing Surveys"
```
**Output:** Research design with qualitative (interviews with developers) + quantitative (productivity metrics) components.

### Phase 2: Literature Review (Week 2-4, parallel)
```bash
*literature-search "AI code generation" --scope systematic --databases ACM,IEEE,Scopus
*screen-papers search-results.csv --level full_text
*extract-data included-papers.csv --variables "Model,Task,Performance"
*synthesize data-extraction.csv --type thematic
*write-lit-review synthesis.md
```
**Output:** Comprehensive literature review showing gap in real-world agent effectiveness research.

### Phase 3: Data Collection (Month 2-4)
Manual data collection: developer interviews, productivity logs, error rates.

### Phase 4: Analysis & Writing (Month 5-7)
```bash
*write-methodology --design research-design.md
*write-paper --lit-review lit-review.md --methodology methods.md --journal "ACM Computing Surveys"
*format-citations manuscript.docx --style ACM
*check-plagiarism manuscript.docx
```

### Phase 5: Review & Submit (Month 7-8)
```bash
*peer-review manuscript.docx
*revise manuscript.docx --feedback peer-review.md
*final-review revised.docx --journal "ACM Computing Surveys"
*submit revised.docx --journals "ACM Computing Surveys,IEEE Software"
```

### Expected Outcomes
- **Publication:** "Effectiveness of AI-Powered Development Agents: A Mixed-Methods Study" in ACM Computing Surveys (IF: 14.3)
- **Impact:** Establishes AIOS as research-backed solution, increases credibility
- **Marketing:** Use publication in sales materials, website, conference presentations
- **ROI:** 10x increase in enterprise leads citing "research-backed" as decision factor

---

## Integration with Other Squads

### Upstream (Provides input to)
- **knowledge-creator** - Turn research findings into teaching materials, courses
- **copywriting** - Turn research into blog posts, white papers, marketing materials
- **infoproduct-creation** - Package research into online courses, workshops

### Downstream (Receives input from)
- **data-analytics** - Statistical analysis, data visualization, dashboards
- **deep-scraper** - Augment literature search with web scraping, grey literature
- **knowledge-creator** - Existing knowledge synthesis for research background

### Complementary (Works alongside)
- **project-management-clickup** - Track research milestones, deadlines, tasks
- **creative-studio** - Design figures, diagrams, infographics for papers
- **full-stack-dev** - Build research tools, data collection platforms, analysis dashboards

---

## Pricing & ROI

### Investment
**Tier:** T3 Specialized
**Typical Engagement:** 3-12 months
**Cost:** High (specialized expertise, long timeline)

### ROI for Academia
- **Publications = Career Advancement** - Tenure, promotions, grants depend on publications
- **Time Savings** - Saves months of work on literature reviews, writing, revisions
- **Rejection Risk Reduction** - Internal peer review catches issues before submission
- **Quality Improvement** - Professional writing and methodology increase acceptance rates

### ROI Calculation Example
**PhD Student Publishing 1 Paper:**
- Time saved: 200 hours (literature review + writing assistance)
- @ $50/hour opportunity cost = $10,000 saved
- Reduced rejection risk: 1 fewer submission attempt = 6 months saved
- Career value: Publication enables graduation + postdoc position ($50k+ salary difference)

**Total ROI:** 10x+ return on investment

---

## Support & Resources

### Documentation
- Agent profiles: `agents/`
- Task definitions: `tasks/`
- Workflow specifications: `workflows/`
- Configuration: `config.yaml`

### External Resources
- **PRISMA 2020 Guidelines:** https://www.prisma-statement.org/
- **APA Style Guide:** https://apastyle.apa.org/
- **PROSPERO Registration:** https://www.crd.york.ac.uk/prospero/
- **Cochrane Handbook:** https://training.cochrane.org/handbook
- **OSF Pre-registration:** https://osf.io/

### Community
- Academia.edu
- ResearchGate
- r/AskAcademia
- PhD Support Groups

---

**Created:** 2026-02-07
**Updated:** 2026-02-10
**Version:** 1.1.0
**Category:** T3 Specialized
**Status:** Active
