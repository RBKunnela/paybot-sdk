---
task: setup-evaluation
responsavel: "@eval-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: skills
    tipo: array
    obrigatorio: true
    descricao: "2+ skills para comparar (texto do prompt, path de arquivo, ou skill name)"
  - campo: objective
    tipo: string
    obrigatorio: true
    descricao: "Objetivo que as skills devem atingir"
  - campo: custom_criteria
    tipo: array
    obrigatorio: false
    descricao: "Critérios customizados (se não fornecido, usa defaults do squad.yaml)"
  - campo: scenarios
    tipo: array
    obrigatorio: false
    descricao: "Cenários de teste customizados"

Saida:
  - campo: evaluation_plan
    tipo: object
    descricao: "Plano completo de avaliação pronto para execução"
---

# Setup Evaluation

**Task ID:** setup-evaluation
**Squad:** skill-tester
**Type:** configuration
**Complexity:** medium

## Objective

Receber as skills do usuário, definir critérios de avaliação e cenários de teste, e produzir um plano de avaliação aprovado antes da execução.

## Process

### Step 1: Coletar Skills (elicit)

Perguntar ao usuário:

```
⚖️ Vamos configurar a comparação.

Quantas skills você quer comparar? (mínimo 2)

Para cada skill, preciso de:
1. **Nome** — identificador curto (ex: "prompt-v1", "skill-formal")
2. **Conteúdo** — o texto do prompt/system prompt, OU o path do arquivo .md
3. **Tipo** — prompt | system_prompt | slash_command

Cole as skills abaixo, separando cada uma claramente.
```

### Step 2: Validar Skills

- Verificar que há pelo menos 2 skills
- Verificar que são comparáveis (mesmo objetivo geral)
- Se skill é path, ler o arquivo e extrair o conteúdo
- Identificar tipo de cada skill automaticamente quando possível

### Step 3: Definir Objetivo (elicit)

Se o objetivo não foi explicitado:

```
Qual é o OBJETIVO que essas skills devem atingir?
Exemplos:
- "Gerar copy de vendas para produto digital"
- "Criar resumo executivo de documento"
- "Responder dúvidas de suporte técnico"
```

### Step 4: Definir Critérios

Apresentar critérios default e perguntar se quer customizar:

```
📋 Critérios de avaliação (default):

| Critério | Peso | Descrição |
|----------|------|-----------|
| Relevância | 25% | Output atende ao objetivo |
| Qualidade | 25% | Profundidade e precisão |
| Formato | 15% | Estrutura e legibilidade |
| Tom | 15% | Estilo adequado ao contexto |
| Completude | 10% | Cobertura de todos os pontos |
| Criatividade | 10% | Originalidade e valor extra |

Quer usar esses critérios ou customizar?
```

### Step 5: Definir Cenários de Teste

Criar 1-3 cenários que exercitem as skills:

```
🎯 Cenários de teste propostos:

1. **Cenário Base** — Input simples e direto para o objetivo
2. **Cenário Complexo** — Input com nuances ou restrições extras
3. **Cenário Edge** — Caso limite para testar robustez (opcional)

Cada skill será executada em TODOS os cenários com inputs idênticos.
```

### Step 6: Confirmar Plano (elicit)

Apresentar plano completo para aprovação:

```
📋 PLANO DE AVALIAÇÃO

Skills: [N] skills identificadas
Critérios: [N] critérios com pesos definidos
Cenários: [N] cenários de teste
Execuções totais: [skills × cenários]

Aprovar e executar?
```

## Output Format

```yaml
evaluation_plan:
  id: "eval-{timestamp}"
  objective: "Objetivo da comparação"

  skills:
    - id: "skill-a"
      name: "Nome da Skill A"
      type: prompt|system_prompt|slash_command
      content: |
        Conteúdo completo da skill
    - id: "skill-b"
      name: "Nome da Skill B"
      type: prompt|system_prompt|slash_command
      content: |
        Conteúdo completo da skill

  criteria:
    - name: relevance
      weight: 25
      description: "..."
    # ... todos os critérios

  scenarios:
    - id: "scenario-1"
      name: "Cenário Base"
      description: "..."
      input: |
        O input exato que será dado para cada skill
    - id: "scenario-2"
      name: "Cenário Complexo"
      input: |
        ...

  total_executions: N
  status: approved
```

## Completion Criteria

- [ ] Pelo menos 2 skills coletadas e validadas
- [ ] Objetivo claramente definido
- [ ] Critérios definidos com pesos que somam 100%
- [ ] Pelo menos 1 cenário de teste definido
- [ ] Plano aprovado pelo usuário
