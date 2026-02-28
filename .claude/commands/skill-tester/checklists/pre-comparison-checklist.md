# Pre-Comparison Checklist

> Validar ANTES de iniciar qualquer comparação de skills.
> Usado por: eval-chief (setup), test-runner (execução)

---

## Setup (eval-chief)

- [ ] **2+ skills coletadas** — Mínimo 2 skills para comparação
- [ ] **Skills são comparáveis** — Mesmo domínio/objetivo (não comparar copy vs design)
- [ ] **Tipo identificado** — Cada skill classificada como prompt/system_prompt/slash_command/agent_definition
- [ ] **Critérios definidos ANTES da execução** — Usar defaults ou custom, nunca post-hoc
- [ ] **Pesos somam 100%** — Verificar que soma dos pesos dos critérios = 100
- [ ] **Cenário(s) selecionado(s)** — 1-3 cenários definidos e documentados
- [ ] **Alinhamento com usuário** — Critérios e cenários aprovados antes de executar

## Execução (test-runner)

- [ ] **Inputs idênticos** — Character-for-character o mesmo para todas as skills
- [ ] **Mesma tech stack** — Constraints técnicas iguais para todos
- [ ] **Mesmo escopo** — Lista de features idêntica
- [ ] **Mesma persona** — Target user igual para todas as skills
- [ ] **Clean state** — Nenhum contexto prévio entre execuções
- [ ] **Output bruto coletado** — Sem edição, resumo ou interpretação
- [ ] **Metadata registrada** — output_length, sections_count, anomalies

## Avaliação (quality-judge)

- [ ] **Avaliação cega individual** — Cada output avaliado separadamente primeiro
- [ ] **Sem comparação prematura** — Não comparar antes de pontuar individualmente
- [ ] **Justificativa por critério** — Toda nota tem evidência do output
- [ ] **Escala consistente** — Mesma régua para todos os outputs
- [ ] **Anti-patterns verificados** — Para skills UI/UX, checar Visual Crimes/UX Violations/Technical Sins

## Relatório (eval-chief)

- [ ] **Scorecard completo** — Tabela com score por critério para cada skill
- [ ] **Consistência entre cenários** — Se múltiplos cenários, verificar variância
- [ ] **Veredicto justificado** — Vencedor declarado com evidência
- [ ] **Recomendação de uso** — Quando usar cada skill
- [ ] **Caveats documentados** — Limitações e edge cases mencionados
