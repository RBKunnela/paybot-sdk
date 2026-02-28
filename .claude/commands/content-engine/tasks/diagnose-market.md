# Task: Diagnose Market

**Task ID:** diagnose-market
**Executor:** Agent (eugene-schwartz)
**Execution Type:** Agent
**Quality Gate:** QG-002

---

## Purpose

Diagnosticar o mercado-alvo usando os frameworks de Eugene Schwartz (5 Levels of Awareness + 5 Levels of Sophistication) para determinar a abordagem correta de copy ANTES de escrever qualquer palavra.

---

## Inputs

| Input            | Required | Description               |
| ---------------- | -------- | ------------------------- |
| product          | Yes      | O que esta sendo vendido  |
| market           | Yes      | Para quem (nicho/publico) |
| competitors      | No       | Principais concorrentes   |
| existing_copy    | No       | Copy atual (se houver)    |
| campaign_context | No       | Contexto da campanha      |

---

## Steps

### Step 1: Product Immersion

```
- O que e o produto/servico?
- Que problema resolve?
- Como funciona (mecanismo)?
- Qual o resultado principal?
- O que o diferencia?
```

### Step 2: Market Analysis

```
- Quem e o publico-alvo (demografico)?
- O que eles DESEJAM (mass desire)?
- O que eles TEMEM?
- Onde eles estao (canais)?
- O que ja tentaram antes?
```

### Step 3: Awareness Level Determination

| Level          | Sinais                            | Copy Approach                                   |
| -------------- | --------------------------------- | ----------------------------------------------- |
| Unaware        | Nao sabe que tem problema         | Educacao, storytelling, agitacao de dor latente |
| Problem Aware  | Sabe do problema, nao da solucao  | Amplificar dor, apresentar categoria de solucao |
| Solution Aware | Conhece solucoes, nao seu produto | Diferenciar com mecanismo unico                 |
| Product Aware  | Conhece seu produto               | Remover objecoes, prova social, oferta          |
| Most Aware     | Pronto para comprar               | Oferta direta, urgencia, CTA                    |

```
Awareness Level: ____
Evidencias:
- ____
- ____
- ____
```

### Step 4: Sophistication Level Determination

| Level        | Sinais                    | Copy Approach                         |
| ------------ | ------------------------- | ------------------------------------- |
| 1. First     | Ninguem fez essa promessa | Promessa direta e simples             |
| 2. Second    | Promessa ja foi feita     | Amplie (mais, melhor, mais rapido)    |
| 3. Mechanism | Amplificacoes esgotadas   | Revele o mecanismo (POR QUE funciona) |
| 4. Enlarged  | Mecanismos ja revelados   | Mecanismo novo/melhorado              |
| 5. Identity  | Tudo ja foi dito          | Venda identidade/experiencia          |

```
Sophistication Level: ____
Evidencias:
- ____
- ____
```

### Step 5: Strategic Recommendation

```
DIAGNOSTICO:
- Awareness: [Level] - [Explicacao]
- Sophistication: [Level] - [Explicacao]
- Mass Desire: [O que o mercado realmente quer]

RECOMENDACAO:
- Tipo de copy: [Sales page / Email / VSL / Ad / Landing page]
- Abordagem: [Storytelling / Direct / Mechanism / Identity]
- Agent recomendado: [Halbert / Georgi / Wiebe / Ogilvy / Kennedy]
- Lead type: [Story / Problem / Secret / Proclamation]
- Tom: [Agressivo / Educativo / Empatico / Autoritario]

HANDOFF PARA: @[agent-recomendado] com brief estrategico
```

---

## Output

Documento de diagnostico com:

1. Awareness level + evidencias
2. Sophistication level + evidencias
3. Mass desire mapeada
4. Recomendacao de abordagem
5. Agent recomendado para execucao
6. Brief estrategico para handoff

---

## Acceptance Criteria

- [ ] Awareness level identificado com evidencias
- [ ] Sophistication level identificado com evidencias
- [ ] Mass desire articulada (nao generica)
- [ ] Recomendacao de abordagem clara
- [ ] Handoff agent definido
- [ ] Brief estrategico preenchido
