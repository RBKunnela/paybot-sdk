# Deploy Checklist

Template usado pelo @devops (Gage) e pelo Chief para verificar pre-condicoes de deploy e validacao pos-deploy. Complementa o rollback plan com verificacoes explicitas.

## Pre-Deploy

### Build & Tests

- [ ] `npm run build` completa sem erros
- [ ] `npm test` todos os testes passam
- [ ] `npm run lint` sem erros de linting
- [ ] Sem warnings criticos novos no build
- [ ] Bundle size dentro do esperado (nao cresceu > 10%)

### Regressao

- [ ] Regression check APROVADO pelo Shield
- [ ] Regression report gerado com confianca HIGH ou MEDIUM
- [ ] Se confianca LOW: usuario aprovou deploy manualmente

### Git & Branch

- [ ] Branch atualizada com main (sem conflitos)
- [ ] Commit message segue convencao (feat/fix/chore)
- [ ] Nenhum arquivo sensivel no commit (.env, credentials, secrets)
- [ ] Diff revisado - apenas mudancas intencionais

### Rollback Plan

- [ ] Commit seguro identificado (hash anotado)
- [ ] Comando de rollback pronto: `git revert [hash]` ou `git reset`
- [ ] Rollback testavel em < 2 minutos

## Deploy

### Execucao

- [ ] Deploy iniciado via @devops
- [ ] Build de producao gerado com sucesso
- [ ] Deploy concluido sem erros
- [ ] URL de producao acessivel

## Pos-Deploy

### Health Check Imediato (< 1 minuto)

- [ ] Pagina de login carrega
- [ ] Feed carrega com dados
- [ ] Sem erros no console do browser
- [ ] Sem erros 5xx nos logs

### Verificacao Funcional (se CRITICO/ALTO)

- [ ] Fluxo afetado pelo fix funciona em producao
- [ ] Fluxos adjacentes nao foram impactados
- [ ] Production verify executado pelo Sentinel

### Monitoramento (5 minutos pos-deploy)

- [ ] Sem aumento de erros nos logs
- [ ] Performance estavel (sem degradacao)
- [ ] Sem reclamacoes de usuarios

## Criterios de Rollback

Executar rollback IMEDIATO se qualquer um:

- [ ] Health check falha (login ou feed down)
- [ ] Erro 5xx em fluxo critico
- [ ] Production verify REPROVADO pelo Sentinel
- [ ] Bug original nao resolvido em producao
- [ ] Novo bug critico introduzido pelo fix

## Notas

- Este checklist e usado em conjunto com o regression-checklist
- Para hotfix: usar versao reduzida (apenas Pre-Deploy essencial + Pos-Deploy)
- Rollback plan e NON-NEGOTIABLE - deploy sem rollback plan nao deve prosseguir
