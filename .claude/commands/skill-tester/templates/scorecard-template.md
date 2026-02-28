# ⚖️ Skill Comparison — Scorecard

**Objetivo:** {{objective}}
**Skills testadas:** {{skills_count}}
**Cenários:** {{scenarios_count}}
**Execuções totais:** {{total_executions}}
**Data:** {{date}}

---

## Ranking Final

| # | Skill | Score | Destaque |
|:-:|-------|:-----:|----------|
{{#each ranking}}
| {{this.medal}} | {{this.skill_name}} | **{{this.score}}** | {{this.highlight}} |
{{/each}}

---

## Scores por Critério

| Critério | Peso | {{#each skills}}{{this.name}} | {{/each}}Líder |
|----------|:----:|{{#each skills}}:------:|{{/each}}-------|
{{#each criteria}}
| {{this.name}} | {{this.weight}}% | {{#each this.scores}}{{this.value}} | {{/each}}{{this.leader}} |
{{/each}}

---

## Resumo por Skill

{{#each skills}}
### {{this.name}}
- **Score:** {{this.score}}/10
- **Forte em:** {{this.strongest}}
- **Pode melhorar:** {{this.weakest}}
- **Consistência:** {{this.consistency}}
{{/each}}

---

*Avaliação realizada pelo squad skill-tester — {{date}}*
