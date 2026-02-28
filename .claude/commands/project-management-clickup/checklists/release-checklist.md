# Release Checklist

Use este checklist para validar releases de SaaS antes de ir para producao.

## Metadata
```yaml
id: release-checklist
name: Checklist de Release SaaS
version: 1.0.0
executor: saas-operations-specialist
```

---

## Pre-Release
- [ ] Todas as user stories do sprint concluidas
- [ ] Testes unitarios passando (100%)
- [ ] Testes de integracao passando
- [ ] Code review aprovado
- [ ] Branch de release criada
- [ ] Versao atualizada (semver)
- [ ] Changelog escrito
- [ ] Migration scripts testados (se aplicavel)
- [ ] Variaveis de ambiente configuradas

## QA
- [ ] Smoke tests executados
- [ ] Regressao verificada
- [ ] Testes de performance OK
- [ ] Testes de seguranca OK
- [ ] Cross-browser verificado
- [ ] Mobile responsiveness OK
- [ ] Dados de teste limpos

## Deploy
- [ ] Backup do banco de dados
- [ ] Deploy em staging concluido
- [ ] Validacao em staging aprovada
- [ ] Deploy em producao executado
- [ ] Health checks passando
- [ ] Monitoramento ativo
- [ ] Rollback plan documentado

## Pos-Release
- [ ] Equipe de suporte notificada
- [ ] Release notes publicadas
- [ ] Usuarios notificados (se feature voltada ao usuario)
- [ ] Metricas de erro monitoradas (24h)
- [ ] Sprint retrospective agendada
- [ ] Tasks atualizadas no ClickUp para "Released"
