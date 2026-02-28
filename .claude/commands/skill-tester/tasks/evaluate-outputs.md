---
task: evaluate-outputs
responsavel: "@quality-judge"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: evaluation_plan
    tipo: object
    obrigatorio: true
    descricao: "Plano com critérios e pesos"
  - campo: execution_results
    tipo: object
    obrigatorio: true
    descricao: "Outputs brutos de cada skill em cada cenário"

Saida:
  - campo: evaluation_results
    tipo: object
    descricao: "Scores e análises para cada output"
---

# Evaluate Outputs

**Task ID:** evaluate-outputs
**Squad:** skill-tester
**Type:** evaluation
**Complexity:** high

## Objective

Avaliar cada output coletado usando os critérios definidos, produzindo scores justificados e análise qualitativa.

## Evaluation Protocol

### REGRA DE OURO: Avaliação Cega Sequencial

1. **Primeiro:** Avaliar CADA output individualmente, sem comparar
2. **Depois:** Fazer análise comparativa entre os outputs

Isso evita viés de ancoragem.

### Fase 1: Avaliação Individual

Para cada output (skill × cenário):

```markdown
### Avaliação: [Skill Name] — [Cenário]

| Critério | Score (1-10) | Peso | Justificativa |
|----------|:----:|:----:|---------------|
| Relevância | X | 25% | [Evidência do output] |
| Qualidade | X | 25% | [Evidência do output] |
| Formato | X | 15% | [Evidência do output] |
| Tom | X | 15% | [Evidência do output] |
| Completude | X | 10% | [Evidência do output] |
| Criatividade | X | 10% | [Evidência do output] |

**Score Ponderado:** X.X / 10

**Forças:**
- Ponto forte 1 (com exemplo do output)
- Ponto forte 2

**Fraquezas:**
- Ponto fraco 1 (com exemplo do output)
- Ponto fraco 2
```

### Escala de Pontuação

| Score | Label | Significado |
|:-----:|-------|------------|
| 9-10 | Excepcional | Supera expectativas, difícil de melhorar |
| 7-8 | Bom | Atende bem, pontos fortes claros |
| 5-6 | Adequado | Funcional mas sem destaque |
| 3-4 | Fraco | Falhas significativas no critério |
| 1-2 | Insuficiente | Não atende ao critério |

### Regras de Justificativa

- **OBRIGATÓRIO** citar trecho ou aspecto específico do output
- Não usar adjetivos vagos sem contexto ("bom", "ruim")
- Comparar com o que seria ideal para o objetivo
- Ser construtivo: identificar o que faltou, não apenas criticar

### Fase 2: Consolidação por Skill

Após avaliar todos os cenários de uma skill:

```yaml
skill_consolidated:
  skill_id: "skill-a"
  scores_by_scenario:
    scenario-1: 7.8
    scenario-2: 6.5
  average_score: 7.15

  strongest_criterion: "relevância"
  weakest_criterion: "criatividade"

  consistency: high|medium|low  # Variação entre cenários

  summary: |
    Análise resumida de 2-3 frases sobre o desempenho geral.
```

## Output Format

```yaml
evaluation_results:
  evaluation_id: "eval-{id}"
  evaluated_at: "ISO datetime"

  criteria_used:
    - { name: "relevance", weight: 25 }
    - { name: "quality", weight: 25 }
    # ...

  individual_evaluations:
    - skill_id: "skill-a"
      scenario_id: "scenario-1"
      scores:
        relevance: { score: 8, justification: "..." }
        quality: { score: 7, justification: "..." }
        format: { score: 9, justification: "..." }
        tone: { score: 7, justification: "..." }
        completeness: { score: 6, justification: "..." }
        creativity: { score: 5, justification: "..." }
      weighted_score: 7.25
      strengths: ["...", "..."]
      weaknesses: ["...", "..."]
    # ... para cada skill × cenário

  consolidated:
    - skill_id: "skill-a"
      average_score: 7.15
      scores_by_scenario: { "scenario-1": 7.25, "scenario-2": 7.05 }
      strongest: "format"
      weakest: "creativity"
      consistency: medium
    - skill_id: "skill-b"
      # ...

  status: evaluated
```

## Completion Criteria

- [ ] Todos os outputs avaliados individualmente
- [ ] Scores atribuídos com justificativa para cada critério
- [ ] Forças e fraquezas identificadas para cada output
- [ ] Consolidação por skill calculada
- [ ] Consistência entre cenários avaliada
