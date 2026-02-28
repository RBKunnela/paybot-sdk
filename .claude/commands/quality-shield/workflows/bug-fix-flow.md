---
workflow: Bug Fix Flow
responsavel: "@chief"
responsavel_type: agent
squad: quality-shield
description: >
  Fluxo completo e automatico de resolucao de bugs.
  Do report do usuario ate a verificacao em producao.
  O usuario so interage no inicio (report + severidade) e ve o resultado final.
trigger: "Usuario reporta bug via @quality-shield"
---

# Bug Fix Flow

Workflow orquestrado pelo Chief que roda automaticamente do report ate o deploy verificado.

## Fluxo Visual

```
Usuario reporta bug
       │
       ▼
┌──────────────┐
│    Chief     │ Pergunta severidade (CRITICO/ALTO/MEDIO/BAIXO)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  KB Search   │ Busca bugs similares na knowledge base
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    Sage      │ Diagnostician: traça causa raiz
│ (diagnose)   │ Input: sintoma + severidade + KB matches
│              │ Output: diagnostico com causa raiz + arquivos + fluxos
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    Nova      │ Impact Analyst: mapeia raio de explosao
│ (analyze-    │ Input: diagnostico
│  impact)     │ Output: relatorio de impacto + checklist de regressao
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    @dev      │ Dex: implementa o fix
│ (implement)  │ Input: diagnostico + relatorio de impacto + contexto
│              │ Output: fix implementado, arquivos modificados
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Shield     │ Regression Guard: testa regressao (N niveis por severidade)
│ (regression- │ Input: checklist + severidade + fix description
│  check)      │ Output: APROVADO ou REPROVADO
└──────┬───────┘
       │
       ├── REPROVADO → volta para Sage com info da falha
       │
       ▼ APROVADO
┌──────────────┐
│   @devops    │ Gage: deploy com rollback plan
│ (deploy)     │ Input: fix aprovado
│              │ Output: deployado + commit seguro para rollback
└──────┬───────┘
       │
       ▼ (se CRITICO ou ALTO)
┌──────────────┐
│  Sentinel    │ Production Monitor: verifica em producao
│ (production- │ Input: deploy + fluxos afetados
│  verify)     │ Output: CONFIRMADO ou ROLLBACK
└──────┬───────┘
       │
       ├── ROLLBACK → @devops reverte + volta para Sage
       │
       ▼ CONFIRMADO
┌──────────────┐
│    Chief     │ Registra na knowledge base
│ (kb-record)  │ Input: todos os dados do fluxo
│              │ Output: entrada na KB
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Resultado   │ Apresenta resultado final ao usuario
│   Final      │ Bug resolvido, deployado, verificado, registrado
└──────────────┘
```

## Etapas Detalhadas

### 1. Receber Bug Report

```
Chief recebe descricao do bug do usuario
Chief pergunta: "Qual a severidade?"
  1. CRITICO - Funcoes principais (login, discover, feed, reviews, listas, profile)
  2. ALTO - Funcoes importantes (notifications, settings, social)
  3. MEDIO - Funcoes secundarias
  4. BAIXO - UI, texto, estilo
```

### 2. Buscar Knowledge Base

```
Chief executa kb-search com o sintoma
Se match alta relevancia: passar como contexto para Diagnostician
Se sem match: Diagnostician faz analise fresca
```

### 3. Diagnostico (Sage)

```
Executa task: diagnose.md
Entrega: relatorio com causa raiz, arquivos, fluxos, evidencia
```

### 4. Analise de Impacto (Nova)

```
Executa task: analyze-impact.md
Entrega: relatorio de impacto + checklist de regressao + contexto @dev
```

### 5. Implementacao (@dev)

```
@dev recebe:
  - Diagnostico completo (causa raiz, arquivos, evidencia)
  - Relatorio de impacto (o que NAO quebrar, cuidados)
  - Checklist de regressao (o que sera testado depois)
@dev implementa o fix com esse contexto completo
```

### 6. Regressao (Shield)

```
Executa task: regression-check.md
Niveis determinados pela severidade:
  CRITICO: 1+2+3+4
  ALTO: 1+2+3
  MEDIO: 1+2
  BAIXO: 1

Se REPROVADO (loop de correcao - max 3 tentativas):
  Loop 1: @dev re-implementa com feedback do Shield (causa: fix incompleto?)
    → Re-rodar regression-check. Se APROVADO → prosseguir.
  Loop 2: Sage re-diagnostica com contexto da falha (causa: diagnostico errado?)
    → Nova re-analisa impacto → @dev implementa → Shield testa.
  Loop 3: Sage + Nova re-analisam com TODOS os dados acumulados.
    → Ultima tentativa de fix + teste.
  Apos 3 loops: escalar ao usuario com diagnostico completo:
    - Tentativas feitas
    - Onde cada tentativa falhou
    - Hipoteses restantes
    - Recomendacao de acao manual
```

### 7. Deploy (@devops)

```
@devops recebe fix aprovado
1. Identifica commit seguro para rollback
2. Faz deploy para producao
3. Confirma deploy bem sucedido
```

### 7.5. Health Check Gate (obrigatorio)

```
Sentinel roda quick-check IMEDIATAMENTE apos deploy:
1. Login page carrega?
2. Feed carrega?
Se FAIL → @devops faz rollback imediato (nao precisa analise completa)
Se PASS → prosseguir para verificacao detalhada (passo 8)
NOTA: Este gate e obrigatorio para TODAS as severidades, nao apenas CRITICO/ALTO.
```

### 8. Verificacao em Producao (Sentinel)

```
Apenas para CRITICO e ALTO.
Executa task: production-verify.md

Se CONFIRMADO: prosseguir
Se ROLLBACK RECOMENDADO:
  → @devops reverte ao commit seguro
  → Chief passa info da falha prod para Sage
  → Sage re-analisa com contexto "funciona localhost, falha prod"
  → Fluxo recomeça do passo 3
```

### 9. Registrar na KB (Chief)

```
Executa task: kb-record.md
Registra todos os dados do bug resolvido
```

### 10. Resultado Final

```
Chief apresenta ao usuario:
  - Bug original
  - Causa raiz
  - Fix aplicado
  - Resultado regressao
  - Status producao
  - KB entry
```

## Escalation Path

O fluxo escala ao usuario nestas situacoes:

| Situacao                              | Quando                                                   | O que Chief reporta                                                          |
| ------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Sage nao encontra root cause          | Apos investigar todos os arquivos e fluxos sem conclusao | Sintomas, hipoteses descartadas, arquivos investigados, o que falta          |
| Nova identifica blast radius CRITICAL | Mudanca afeta 5+ fluxos criticos                         | Lista de fluxos afetados, risco de cada um, opcoes (fix parcial vs completo) |
| Shield reprova 3x                     | 3 loops de correcao falharam                             | Historico de tentativas, onde falhou cada vez, recomendacao                  |
| Sentinel recomenda rollback           | Producao falhou apos deploy                              | O que falhou, rollback ja executado, proximos passos                         |
| Timeout de etapa excedido             | Qualquer etapa excede o timeout do squad-config.yaml     | Etapa travada, tempo decorrido, estado parcial                               |

**Formato de escalacao:**

```
## Escalacao - Quality Shield

**Bug:** [descricao]
**Etapa bloqueada:** [nome da etapa]
**Tentativas:** [N]
**Motivo:** [por que nao conseguiu resolver]

### Contexto Acumulado
[tudo que foi investigado/tentado]

### Opcoes
1. [opcao 1 - risco/beneficio]
2. [opcao 2 - risco/beneficio]
3. [opcao 3 - abandonar e registrar como known issue]
```

## Regras do Workflow

- O usuario so interage no passo 1 (report + severidade)
- Tudo entre passo 2 e 9 e automatico
- Se regressao falha, loop back automatico (max 3x)
- Se producao falha, rollback automatico + loop back
- Apos 3 loops sem sucesso, escalar ao usuario com todo o contexto
- SEMPRE registrar na KB ao final, mesmo se levou multiplos loops

## Distinção: Health Check vs Production Verify

| Aspecto           | Health Check (\*health-check)                  | Production Verify (\*production-verify)         |
| ----------------- | ---------------------------------------------- | ----------------------------------------------- |
| **Quando**        | On activation, on demand, como gate pos-deploy | Somente apos deploy dentro do bug-fix-flow      |
| **Quem aciona**   | Chief (automatico ou usuario)                  | Chief (automatico no fluxo)                     |
| **Escopo**        | Quick (login+feed) ou Full (8 fluxos)          | Fluxos AFETADOS pelo fix + todos os criticos    |
| **Objetivo**      | Monitoramento proativo - algo quebrou?         | Verificacao especifica - o deploy quebrou algo? |
| **Acao se falha** | Alertar usuario ou iniciar \*fix               | Rollback imediato + loop back no fluxo          |
| **Severidade**    | Todas                                          | Apenas CRITICO e ALTO                           |
