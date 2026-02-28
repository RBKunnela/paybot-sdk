# Production Incident Checklist

Template usado pelo Chief e Production Monitor (Sentinel) para resposta a incidentes em producao. Define passos claros desde a deteccao ate a resolucao e post-mortem.

## Deteccao & Triagem (< 2 minutos)

### Confirmar Incidente

- [ ] Producao realmente afetada? (nao so localhost)
- [ ] Qual funcao principal esta impactada?
- [ ] Erro consistente ou intermitente?
- [ ] Desde quando? (verificar ultimo deploy)
- [ ] Quantidade de usuarios potencialmente afetados

### Classificar Severidade

- [ ] **CRITICO**: Login, discover, feed, reviews, listas, profile DOWN
- [ ] **ALTO**: Notifications, settings, social DOWN
- [ ] **MEDIO**: Funcao secundaria degradada
- [ ] **BAIXO**: UI/texto/estilo incorreto

### Acoes Imediatas

- [ ] Se CRITICO: ativar hotfix-flow
- [ ] Se deploy recente (< 1 hora): considerar rollback imediato
- [ ] Health check executado (`*health-check`)
- [ ] Resultados do health check documentados

## Contencao (< 5 minutos)

### Se Deploy Recente Causou

- [ ] Identificar commit do deploy
- [ ] Rollback viavel? (commit anterior seguro?)
- [ ] Se sim: @devops executa rollback
- [ ] Pos-rollback: health check para confirmar restauracao
- [ ] Se rollback nao resolve: prosseguir com diagnostico

### Se Nao Relacionado a Deploy

- [ ] Verificar status dos servicos externos:
  - [ ] Supabase (dashboard/status page)
  - [ ] Google OAuth (Google Cloud Console)
  - [ ] Google Places API
  - [ ] DNS/CDN
- [ ] Verificar se e issue de infraestrutura vs codigo
- [ ] Se infra: documentar e aguardar (fora do escopo do squad)
- [ ] Se codigo: prosseguir com diagnostico

## Diagnostico & Fix

### Diagnostico Rapido

- [ ] Sage acionado via Chief (modo fast se CRITICO)
- [ ] KB consultada para bugs similares
- [ ] Causa raiz identificada
- [ ] Causa e no codigo do projeto? (vs dependencia/infra)

### Fix

- [ ] Impact analysis focada executada (Nova)
- [ ] Fix minimo implementado (@dev)
- [ ] Regressao executada (Shield) - nivel minimo para severidade
- [ ] Fix aprovado para deploy

### Deploy do Fix

- [ ] Rollback plan preparado
- [ ] Deploy executado (@devops)
- [ ] Health check pos-deploy executado
- [ ] Production verify executado (Sentinel)
- [ ] Funcao afetada restaurada em producao

## Estabilizacao (< 30 minutos pos-fix)

### Monitoramento

- [ ] Health check completo (todos os fluxos criticos)
- [ ] Sem novos erros nos logs
- [ ] Performance estavel
- [ ] Sem regressao em outros fluxos

### Comunicacao

- [ ] Incidente documentado com timeline
- [ ] Se usuarios foram afetados: nota sobre resolucao
- [ ] Equipe informada do status

## Post-Mortem (< 24 horas)

### Analise

- [ ] Timeline completa do incidente documentada
- [ ] Causa raiz confirmada e detalhada
- [ ] Impacto real medido (duracao, usuarios afetados)
- [ ] Fluxo de resposta avaliado (o que funcionou, o que nao)

### Aprendizados

- [ ] Bug registrado na knowledge base (`*kb-record`)
- [ ] Regression patterns atualizado se aplicavel
- [ ] Feature flows atualizado se fluxo estava incompleto
- [ ] Known interconnections atualizado se conexao desconhecida

### Prevencao

- [ ] O que poderia ter prevenido este incidente?
- [ ] Precisa de mais testes? Quais?
- [ ] Precisa de melhor monitoramento? Onde?
- [ ] Dependency graph precisa ser atualizado?
- [ ] Fix precisa ser melhorado? (vs hotfix minimo)

## Metricas do Incidente

```
## Incident Report

**ID:** INC-[YYYY-MM-DD]-[NNN]
**Severidade:** [CRITICO/ALTO/MEDIO/BAIXO]
**Detectado em:** [timestamp]
**Contido em:** [timestamp] (TTM - Time to Mitigate)
**Resolvido em:** [timestamp] (TTR - Time to Resolve)
**Duracao total:** [minutos]

**Funcao afetada:** [funcao]
**Causa raiz:** [descricao curta]
**Fix aplicado:** [descricao curta]
**Rollback necessario:** [SIM/NAO]
**Loops de correcao:** [N]
```

## Notas

- Em caso de duvida sobre severidade, classificar como mais alta
- Rollback e SEMPRE preferivel a um fix apressado e inseguro
- Post-mortem nao e opcional - cada incidente e uma oportunidade de aprendizado
- Este checklist complementa o hotfix-flow e o bug-fix-flow
