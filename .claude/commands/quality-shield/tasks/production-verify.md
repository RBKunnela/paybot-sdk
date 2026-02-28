---
task: Production Verify
responsavel: "@production-monitor"
responsavel_type: agent
squad: quality-shield
atomic_layer: task
elicit: false
Entrada: |
  - deploy_description: O que foi deployado
  - affected_flows: Fluxos afetados (do Impact Analyst)
  - rollback_plan: Plano de rollback do @devops
Saida: |
  - verdict: DEPLOY CONFIRMADO ou ROLLBACK RECOMENDADO
  - results: Resultados por fluxo testado
  - evidence: Screenshots/logs se houver falha
Checklist:
  - "[ ] Testar cada fluxo afetado em producao via browser"
  - "[ ] Testar todos os fluxos criticos (8 fluxos)"
  - "[ ] Comparar comportamento com feature-flows.md"
  - "[ ] Emitir veredicto"
  - "[ ] Se ROLLBACK, acionar @devops"
  - "[ ] Registrar diferencas localhost vs prod na KB"
---

# \*production-verify

Verifica em producao se o deploy funcionou, testando fluxos reais via browser.

## Entrada

O Production Monitor (Sentinel) recebe do Chief:

- **Deploy Description**: O que foi deployado
- **Affected Flows**: Lista de fluxos que deveriam ser verificados
- **Rollback Plan**: Commit seguro para reverter (do @devops)

## Quando Executa

- Apenas para severidade **CRITICO** e **ALTO**
- Apos o @devops confirmar deploy bem sucedido

## Execucao

### Passo 1: Abrir Producao

```
1. Usar Playwright MCP para navegar ate https://fomibrasil.com.br
2. Autenticar com a conta do usuario
3. Verificar que o site carrega
```

### Passo 2: Testar Fluxos Afetados

```
Para cada fluxo listado no affected_flows:
  1. Navegar ate a tela relevante
  2. Executar a acao do usuario
  3. Verificar resultado vs esperado (de feature-flows.md)
  4. Capturar evidencia se falhar (screenshot, URL, estado)
  5. Medir tempo de resposta
```

### Passo 3: Testar Fluxos Criticos

```
Independente dos afetados, testar TODOS os 8 fluxos criticos:
  1. Login Email/Senha
  2. Login Google OAuth (ate redirect)
  3. Reset Senha (ate formulario)
  4. Feed (carregar reviews + imagens)
  5. Discover (carregar + buscar restaurantes)
  6. Criar Review (formulario funcional)
  7. Listas (carregar + abrir lista)
  8. Profile (info + reviews + lists tabs)
```

### Passo 4: Emitir Veredicto

```
Se todos OK:
  → DEPLOY CONFIRMADO
  → Registrar resultado positivo

Se falha em fluxo CRITICO:
  → ROLLBACK RECOMENDADO
  → Acionar @devops para reverter ao commit seguro
  → Registrar o que falhou em producao (para KB)
  → Disparar novo ciclo de diagnostico

Se falha em fluxo nao-critico:
  → DEPLOY PARCIAL - INVESTIGAR
  → Registrar o que falhou
  → Sugerir novo ciclo de diagnostico para o fluxo afetado
```

## Saida

Relatorio de verificacao com veredicto, passado ao Chief.

## Regras

- Testar em PRODUCAO, nao localhost
- Sempre testar os 8 fluxos criticos, mesmo que so 1 tenha sido afetado
- Se falhar, capturar evidencia (screenshot, URL, estado do DOM)
- Registrar TODA diferenca entre localhost e producao na knowledge base
