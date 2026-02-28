---
workflow: Hotfix Flow
responsavel: "@chief"
responsavel_type: agent
squad: quality-shield
description: >
  Fluxo expedido para bugs CRITICO. Reduz etapas opcionais e prioriza
  velocidade mantendo seguranca minima. Usado quando producao esta
  com funcionalidade core quebrada e cada minuto conta.
trigger: "Bug severidade CRITICO com funcao principal down"
---

# Hotfix Flow

Workflow expedido orquestrado pelo Chief para bugs CRITICO que afetam funcoes principais em producao. Prioriza velocidade de resolucao sem sacrificar seguranca minima.

## Quando Usar

- Severidade CRITICO confirmada
- Funcao principal indisponivel (login, feed, reviews, discover, lists, profile)
- Producao afetada (nao apenas localhost)
- Tempo e fator critico

## Diferenca vs Bug Fix Flow

| Aspecto             | Bug Fix Flow            | Hotfix Flow                |
| ------------------- | ----------------------- | -------------------------- |
| Severidade          | Todas                   | Apenas CRITICO             |
| KB Search           | Sempre                  | Paralelo ao diagnostico    |
| Deep Trace          | Se necessario           | Pulado (pos-deploy)        |
| Risk Score          | Sempre                  | Pulado (pos-deploy)        |
| Impact Analysis     | Completa                | Focada (so fluxo afetado)  |
| Regressao           | Niveis 1-4              | Niveis 1+2 (minimo)       |
| Deploy              | Normal                  | Fast-track                 |
| Production Verify   | Se CRITICO/ALTO         | Obrigatorio                |
| KB Record           | Pos-verify              | Pos-verify                 |
| Post-mortem         | Nao                     | Sim (apos estabilizar)     |

## Fluxo Visual

```
Usuario reporta bug CRITICO
       │
       ▼
┌──────────────┐
│    Chief     │ Confirma: producao down? Funcao principal?
│              │ Se NAO → redireciona para bug-fix-flow normal
└──────┬───────┘
       │ SIM
       │
       ├──────────────────┐
       ▼                  ▼
┌──────────────┐  ┌──────────────┐
│    Sage      │  │  KB Search   │  (PARALELO)
│ (diagnose)   │  │ (kb-search)  │
│ Modo: fast   │  │              │
└──────┬───────┘  └──────┬───────┘
       │                  │
       └────────┬─────────┘
                ▼
┌──────────────┐
│    Nova      │ Impact Analysis FOCADA
│ (analyze-    │ Apenas fluxo diretamente afetado
│  impact)     │ Sem trace transitivo profundo
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    @dev      │ Implementa fix minimo
│ (implement)  │ Menor mudanca possivel
│              │ Zero refactoring
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Shield     │ Regressao MINIMA
│ (regression- │ Nivel 1 (testes) + Nivel 2 (trace)
│  check)      │ Nao rodar Nivel 3+4
└──────┬───────┘
       │
       ├── REPROVADO → @dev re-implementa (max 2 loops)
       │
       ▼ APROVADO
┌──────────────┐
│   @devops    │ Deploy fast-track
│ (deploy)     │ Rollback plan obrigatorio
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Sentinel    │ Production verify OBRIGATORIO
│ (production- │ Foco no fluxo afetado
│  verify)     │ + health check dos outros fluxos criticos
└──────┬───────┘
       │
       ├── ROLLBACK → @devops reverte + bug-fix-flow normal
       │
       ▼ CONFIRMADO
┌──────────────┐
│    Chief     │ Registra na KB
│ (kb-record)  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Post-Mortem  │ Chief agenda post-mortem:
│              │ - Deep trace completo
│              │ - Risk score do fix
│              │ - Regressao completa (Niveis 3+4)
│              │ - Avaliar se fix precisa ser melhorado
└──────────────┘
```

## Etapas Detalhadas

### 1. Triagem Rapida (Chief)

```
Chief verifica em < 1 minuto:
1. Producao realmente afetada? (nao so localhost)
2. Funcao principal indisponivel?
3. Erro intermitente ou consistente?

Se producao OK → redirecionar para bug-fix-flow
Se producao DOWN → prosseguir hotfix
```

### 2. Diagnostico + KB Search (Paralelo)

```
PARALELO:
  Thread A: Sage diagnostica causa raiz (modo fast)
    - Foco no caminho mais provavel
    - Nao investigar causas secundarias
    - Identificar fix MINIMO
  Thread B: KB Search por bugs similares
    - Se match: passar hipotese para Sage

Sage recebe KB matches assim que disponiveis.
Timeout: 3 minutos (vs 5 do fluxo normal)
```

### 3. Analise de Impacto Focada (Nova)

```
APENAS:
- Fluxo diretamente afetado
- Consumidores diretos (nivel 1 apenas)
- Checklist de regressao minimo

NAO FAZER:
- Trace transitivo profundo
- Risk score completo
- Analise de todos os fluxos

Timeout: 2 minutos (vs 3 do fluxo normal)
```

### 4. Implementacao Minima (@dev)

```
Regras para hotfix:
- MENOR mudanca possivel
- ZERO refactoring
- ZERO melhorias
- Se possivel, uma unica mudanca em um unico arquivo
- Comentar: // HOTFIX: [BUG-ID] - fix minimo, avaliar melhorias no post-mortem

Timeout: 10 minutos (vs 15 do fluxo normal)
```

### 5. Regressao Minima (Shield)

```
APENAS Niveis 1 e 2:
- Nivel 1: npm test (deve passar)
- Nivel 2: Trace estatico do fluxo afetado e adjacentes diretos

NAO RODAR:
- Nivel 3 (integracao) - sera feito no post-mortem
- Nivel 4 (manual) - sera feito no post-mortem

Max loops: 2 (vs 3 do fluxo normal)
Timeout: 3 minutos
```

### 6. Deploy Fast-Track (@devops)

```
Deploy imediato apos aprovacao:
- Rollback plan OBRIGATORIO
- Commit taggeado: hotfix/[BUG-ID]
- Monitor ativo apos deploy
```

### 7. Production Verify (Sentinel)

```
OBRIGATORIO (independente da severidade no hotfix):
1. Fluxo afetado funciona?
2. Health check rapido dos outros fluxos criticos
3. Se FALHA → rollback imediato

Timeout: 3 minutos
```

### 8. Post-Mortem (Agendado)

```
Apos estabilizar producao, Chief agenda:

1. Deep trace completo do fix
2. Risk score da mudanca
3. Regressao completa (Niveis 3+4)
4. Avaliar se fix precisa ser melhorado/refatorado
5. Atualizar KB com detalhes completos
6. Documentar: por que foi CRITICO? Podia ser prevenido?
```

## Timeouts do Hotfix

| Etapa              | Normal | Hotfix |
| ------------------ | ------ | ------ |
| KB Search          | 1 min  | 1 min (paralelo) |
| Diagnostico        | 5 min  | 3 min  |
| Analise de Impacto | 3 min  | 2 min  |
| Implementacao      | 15 min | 10 min |
| Regressao          | 5 min  | 3 min  |
| Deploy             | 3 min  | 2 min  |
| Production Verify  | 5 min  | 3 min  |
| **Total**          | 40 min | 25 min |

## Escalation (Hotfix)

| Situacao                  | Acao                                   |
| ------------------------- | -------------------------------------- |
| Sage nao acha causa em 3min | Escalar IMEDIATO ao usuario           |
| Fix falha 2x              | Escalar com contexto + sugerir rollback|
| Producao falha pos-deploy | Rollback automatico + escalar          |
| Timeout total (25min)     | Escalar com tudo que tem               |

## Regras do Hotfix

- VELOCIDADE e prioridade, mas nao a custo de seguranca
- Rollback plan e NON-NEGOTIABLE
- Production verify e OBRIGATORIO
- Post-mortem e OBRIGATORIO (mas pode ser feito depois)
- NUNCA pular KB record - bugs criticos sao os mais valiosos na KB
- Se o fix minimo nao resolve, considerar rollback ao estado anterior
