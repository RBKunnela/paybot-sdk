---
task: Health Check
responsavel: "@production-monitor"
responsavel_type: agent
squad: quality-shield
atomic_layer: task
elicit: false
Entrada: |
  - type: quick | full (quick = login + feed, full = todos os 8 fluxos)
  - trigger: activation | on-demand | post-deploy
Saida: |
  - results: Resultados por fluxo testado
  - issues_found: Problemas detectados (se houver)
  - recommendation: Acao recomendada
Checklist:
  - "[ ] Abrir producao via browser"
  - "[ ] Autenticar com conta do usuario"
  - "[ ] Testar fluxos conforme type (quick ou full)"
  - "[ ] Reportar resultados"
  - "[ ] Se problema encontrado, recomendar acao"
---

# \*health-check

Verifica a saude de producao testando fluxos criticos do usuario.

## Gatilhos

| Gatilho           | Tipo                 | Quando                                         |
| ----------------- | -------------------- | ---------------------------------------------- |
| Ativacao do squad | Quick (login + feed) | Automatico ao ativar @quality-shield           |
| Sob demanda       | Full (8 fluxos)      | Usuario chama `*health-check`                  |
| Pos-deploy        | Full (8 fluxos)      | Automatico apos deploy (via production-verify) |

## Execucao - Quick Check

```
1. Navegar ate https://fomibrasil.com.br/login
2. Verificar: pagina carrega? Formulario visivel?
3. Autenticar
4. Verificar: redirect para /feed? Feed carrega? Reviews visiveis?
5. Reportar: Login [OK/FAIL] | Feed [OK/FAIL]
```

**Formato de saida:**

```
Quick check producao: Login [OK/FAIL] | Feed [OK/FAIL]
```

## Execucao - Full Check

```
Testar todos os 8 fluxos criticos:
1. Login Email/Senha → pagina + autenticacao + redirect
2. Login Google OAuth → pagina + botao + redirect OAuth
3. Reset Senha → pagina + formulario funcional
4. Feed → reviews carregam + imagens + scroll + interacoes
5. Discover → restaurantes carregam + busca funciona
6. Criar Review → formulario carrega + busca restaurante
7. Listas → listas carregam + abrir lista + restaurantes
8. Profile → info + reviews tab + lists tab + stats

Para cada: medir tempo de resposta e capturar estado.
```

**Formato de saida:**

```
## Health Check - Producao

| # | Fluxo | Status | Tempo |
|---|-------|--------|-------|
| 1 | Login Email | OK/FAIL | Xs |
| ... | ... | ... | ... |

Fluxos OK: X/8
Problemas: [lista ou nenhum]
```

## Acoes por Resultado

| Resultado                 | Acao                                            |
| ------------------------- | ----------------------------------------------- |
| 8/8 OK                    | Producao saudavel                               |
| Falha em fluxo critico    | Sugerir acionar squad completo para diagnostico |
| Falha em fluxo secundario | Registrar e sugerir investigacao                |

## Regras

- Quick check deve ser rapido (< 30s)
- Full check testa TODOS os 8 fluxos
- Se encontrar problema na ativacao, informar o usuario ANTES de pedir o bug report
- Registrar resultados para historico
