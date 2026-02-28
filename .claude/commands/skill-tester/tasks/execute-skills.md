---
task: execute-skills
responsavel: "@test-runner"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: evaluation_plan
    tipo: object
    obrigatorio: true
    descricao: "Plano de avaliação aprovado do step anterior"

Saida:
  - campo: execution_results
    tipo: object
    descricao: "Outputs brutos de cada skill em cada cenário"
---

# Execute Skills

**Task ID:** execute-skills
**Squad:** skill-tester
**Type:** execution
**Complexity:** medium

## Objective

Executar cada skill em cada cenário de teste definido no plano de avaliação, coletando outputs brutos sem interpretação.

## Execution Protocol

### Para cada cenário × skill:

#### 1. Preparar Input
- Usar o input exato definido no cenário
- Não adicionar, modificar ou remover nada do input
- Manter formatação idêntica

#### 2. Executar Skill

**Se tipo = `prompt` ou `system_prompt`:**
- Usar o prompt/system prompt como instrução
- Passar o input do cenário como mensagem do usuário
- Gerar o output seguindo fielmente o prompt da skill

**Se tipo = `slash_command`:**
- Ler o conteúdo do arquivo da skill
- Simular a execução com o input do cenário
- Gerar output como se a skill estivesse ativa

#### 3. Coletar Output
- Capturar output COMPLETO — não truncar
- Registrar metadata (comprimento, estrutura, formatação)
- Documentar qualquer anomalia

### Ordem de Execução

```
Para cada cenário:
  Para cada skill:
    1. Preparar input idêntico
    2. Executar skill
    3. Coletar output bruto
    4. Registrar metadata
  Confirmar todos outputs coletados
Próximo cenário
```

## Important Rules

- **NUNCA** modificar o conteúdo da skill durante execução
- **NUNCA** dar vantagem a uma skill (ex: input mais claro)
- **NUNCA** resumir ou editar o output coletado
- Se uma skill falhar, registrar o erro como output
- Se uma skill produzir output parcial, registrar como está

## Output Format

```yaml
execution_results:
  evaluation_id: "eval-{id}"
  executed_at: "ISO datetime"
  total_executions: N

  results:
    - scenario_id: "scenario-1"
      scenario_name: "Cenário Base"
      executions:
        - skill_id: "skill-a"
          skill_name: "Nome A"
          output: |
            Output completo e bruto da skill A no cenário 1.
            Múltiplas linhas preservadas exatamente como gerado.
          metadata:
            output_length_chars: 1234
            output_length_words: 200
            paragraphs: 5
            has_headers: true
            has_lists: true
            has_code_blocks: false
            anomalies: []

        - skill_id: "skill-b"
          skill_name: "Nome B"
          output: |
            Output completo e bruto da skill B no cenário 1.
          metadata:
            output_length_chars: 987
            output_length_words: 165
            paragraphs: 3
            has_headers: false
            has_lists: true
            has_code_blocks: false
            anomalies: []

    - scenario_id: "scenario-2"
      # ... mesmo formato

  summary:
    skills_executed: N
    scenarios_tested: N
    total_outputs: N
    failures: 0
    status: complete
```

## Completion Criteria

- [ ] Todas as skills executadas em todos os cenários
- [ ] Outputs brutos coletados sem modificação
- [ ] Metadata registrada para cada output
- [ ] Anomalias documentadas (se houver)
- [ ] Summary com contagem correta
