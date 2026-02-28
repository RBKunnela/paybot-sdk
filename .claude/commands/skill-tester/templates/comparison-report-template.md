# ⚖️ Skill Comparison — Relatório Completo

**Objetivo:** {{objective}}
**Skills testadas:** {{skills_count}}
**Cenários:** {{scenarios_count}}
**Data:** {{date}}

---

## 1. Scorecard

{{scorecard}}

---

## 2. Análise Detalhada

{{#each skills}}
### {{this.name}}

**Score Geral: {{this.score}}/10**

**O que faz bem:**
{{#each this.strengths}}
- {{this}}
{{/each}}

**Onde pode melhorar:**
{{#each this.weaknesses}}
- {{this}}
{{/each}}

**Performance por cenário:**

| Cenário | Score | Observação |
|---------|:-----:|------------|
{{#each this.scenario_scores}}
| {{this.scenario}} | {{this.score}} | {{this.note}} |
{{/each}}

**Consistência:** {{this.consistency}}

---

{{/each}}

## 3. Comparativo Head-to-Head

{{#each matchups}}
### {{this.skill_a}} vs {{this.skill_b}}

| Aspecto | {{this.skill_a}} | {{this.skill_b}} |
|---------|:-:|:-:|
{{#each this.criteria}}
| {{this.name}} | {{this.score_a}} | {{this.score_b}} |
{{/each}}

**{{this.skill_a}} é melhor em:** {{this.a_wins}}
**{{this.skill_b}} é melhor em:** {{this.b_wins}}
**Empate em:** {{this.ties}}

> **Diferença chave:** {{this.key_difference}}

---

{{/each}}

## 4. Veredicto Final

### 🏆 Vencedora: {{winner.name}}

**Score: {{winner.score}}/10**

**Por que esta skill vence:**
{{#each winner.reasons}}
{{@index}}. {{this}}
{{/each}}

**Ressalvas:**
{{#each winner.caveats}}
- {{this}}
{{/each}}

---

## 5. Recomendação

> {{recommendation}}

---

## 6. Sugestões de Melhoria

Para tornar a skill vencedora ainda melhor:

{{#each improvement_suggestions}}
{{@index}}. **{{this.area}}** — {{this.suggestion}}
{{/each}}

---

## Metodologia

- **Avaliação cega:** Cada output avaliado individualmente antes da comparação
- **Critérios pré-definidos:** Todos os critérios e pesos definidos antes da execução
- **Cenários idênticos:** Mesmos inputs para todas as skills
- **Justificativa obrigatória:** Todo score acompanhado de evidência do output

---

*Relatório gerado pelo squad skill-tester — {{date}}*
