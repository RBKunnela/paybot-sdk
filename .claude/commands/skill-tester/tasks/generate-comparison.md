---
task: generate-comparison
responsavel: "@eval-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: evaluation_plan
    tipo: object
    obrigatorio: true
  - campo: execution_results
    tipo: object
    obrigatorio: true
  - campo: evaluation_results
    tipo: object
    obrigatorio: true

Saida:
  - campo: comparison_report
    tipo: document
    descricao: "Relatório final com scorecard + análise + veredicto"
---

# Generate Comparison

**Task ID:** generate-comparison
**Squad:** skill-tester
**Type:** synthesis
**Complexity:** high

## Objective

Sintetizar todos os dados de avaliação em um relatório comparativo completo com scorecard, análise detalhada e veredicto final.

## Report Structure

O relatório final deve conter 3 seções:

### Seção 1: Scorecard (Visão Rápida)

```markdown
# ⚖️ Skill Comparison — Scorecard

**Objetivo:** {objective}
**Skills testadas:** {N}
**Cenários:** {N}
**Data:** {date}

## Ranking Final

| # | Skill | Score | Destaque |
|:-:|-------|:-----:|----------|
| 🥇 | Skill A | 8.2 | Melhor em relevância e qualidade |
| 🥈 | Skill B | 7.1 | Forte em formato, fraca em tom |
| 🥉 | Skill C | 5.8 | Adequada mas sem diferencial |

## Scores por Critério

| Critério | Peso | Skill A | Skill B | Skill C | Líder |
|----------|:----:|:-------:|:-------:|:-------:|-------|
| Relevância | 25% | **8** | 7 | 6 | Skill A |
| Qualidade | 25% | **9** | 7 | 5 | Skill A |
| Formato | 15% | 7 | **8** | 6 | Skill B |
| Tom | 15% | 8 | 6 | **7** | Skill A |
| Completude | 10% | **8** | 7 | 5 | Skill A |
| Criatividade | 10% | 7 | **8** | 6 | Skill B |

## Radar de Competências

Para cada skill, descrever em uma linha:
- **Skill A:** Forte perfil generalista, lidera em 4/6 critérios
- **Skill B:** Especialista em formato e criatividade, precisa melhorar tom
- **Skill C:** Perfil conservador, funcional sem brilho
```

### Seção 2: Análise Detalhada

```markdown
## Análise Detalhada

### Skill A: {nome}

**Score Geral: X.X/10**

**O que faz bem:**
- Ponto forte 1 — evidência do output
- Ponto forte 2 — evidência do output

**Onde pode melhorar:**
- Oportunidade 1 — sugestão concreta
- Oportunidade 2 — sugestão concreta

**Consistência entre cenários:** Alta|Média|Baixa
> Nota: [Observação sobre variação de performance entre cenários]

---

### Skill B: {nome}
(mesmo formato)

---

### Comparativo Head-to-Head

#### Skill A vs Skill B
- A é superior em: [critérios]
- B é superior em: [critérios]
- Empate em: [critérios]
- **Diferença chave:** [insight principal]

(repetir para cada par se >2 skills)
```

### Seção 3: Veredicto

```markdown
## Veredicto Final

### 🏆 Vencedora: {Skill Name}

**Score: X.X/10**

**Por que esta skill vence:**
1. Razão principal baseada em dados
2. Segunda razão com evidência
3. Terceira razão (se aplicável)

**Ressalvas:**
- Cenário onde outra skill pode ser melhor
- Limitação identificada

### Recomendação

> {Recomendação em 1-2 frases: quando usar a skill vencedora,
> e quando considerar a alternativa}

### Sugestão de Melhoria

Para tornar a skill vencedora ainda melhor:
1. Sugestão concreta 1
2. Sugestão concreta 2
```

## Output Rules

- Usar markdown formatado para máxima legibilidade
- Todos os scores devem ser arredondados para 1 casa decimal
- Bold nos scores mais altos de cada linha
- Incluir emojis apenas nos headers principais (🥇🥈🥉🏆⚖️)
- Se empate técnico (diferença < 0.5), declarar empate e explicar nuances

## Completion Criteria

- [ ] Scorecard com ranking completo
- [ ] Tabela de scores por critério
- [ ] Análise detalhada de cada skill
- [ ] Comparativo head-to-head
- [ ] Veredicto com justificativa
- [ ] Recomendação de uso
- [ ] Sugestões de melhoria
