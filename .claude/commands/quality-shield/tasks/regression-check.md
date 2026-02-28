---
task: Regression Check
responsavel: "@regression-guard"
responsavel_type: agent
squad: quality-shield
atomic_layer: task
elicit: false
Entrada: |
  - regression_checklist: Checklist gerado pelo Impact Analyst
  - severity: Nivel de severidade (determina quantos niveis rodar)
  - fix_description: O que o @dev fez
  - modified_files: Arquivos que foram modificados
Saida: |
  - verdict: APROVADO ou REPROVADO
  - results: Resultados detalhados por nivel
  - failure_info: Se REPROVADO, informacoes para re-diagnostico
Checklist:
  - "[ ] Executar Nivel 1 - Testes unitarios (npm test)"
  - "[ ] Executar Nivel 2 - Trace estatico dos fluxos afetados"
  - "[ ] Executar Nivel 3 - Testes de integracao (se CRITICO/ALTO)"
  - "[ ] Gerar Nivel 4 - Checklist manual (se CRITICO)"
  - "[ ] Emitir veredicto: APROVADO ou REPROVADO"
  - "[ ] Se REPROVADO, documentar exatamente o que falhou"
---

# \*regression-check

Executa testes de regressao em niveis progressivos para garantir que o fix nao quebrou nada.

## Entrada

O Regression Guard (Shield) recebe do Chief:

- **Regression Checklist**: Lista exata do Impact Analyst do que testar
- **Severidade**: Determina quantos niveis executar
- **Fix Description**: O que o @dev mudou
- **Modified Files**: Arquivos alterados

## Matriz de Severidade

| Severidade | Niveis        | Producao |
| ---------- | ------------- | -------- |
| CRITICO    | 1 + 2 + 3 + 4 | Sim      |
| ALTO       | 1 + 2 + 3     | Sim      |
| MEDIO      | 1 + 2         | Nao      |
| BAIXO      | 1             | Nao      |

## Execucao

### Nivel 1: Testes Unitarios

```
1. Rodar: npm test
2. Destacar resultados dos testes relacionados aos arquivos afetados
3. Verificar: falhas, warnings novos, mudancas de coverage
PARAR se falhou.
```

### Nivel 2: Trace Estatico dos Fluxos

```
Para cada fluxo no checklist de regressao:

**Fase A - Trace de Entrada (grep/read):**
  1. Identificar entry point do fluxo (tela/componente)
  2. Grep todos os imports do arquivo modificado no fix
  3. Para cada consumidor encontrado: ler o trecho que usa o codigo afetado

**Fase B - Verificacao de Comportamento:**
  4. No ponto do fix, verificar (ler codigo, nao executar):
     a. O fix resolve o bug original? (comparar antes/depois)
     b. Outros fluxos passando por aqui: o comportamento mudou? (checar cada consumidor)
     c. Race conditions: o fix introduz async onde antes era sync? Ou vice-versa?
     d. Timing: o fix adiciona delays, timeouts, ou remove-os?
     e. State management: o fix altera quando/como estado e limpo ou propagado?

**Fase C - Verificacao Cross-Environment:**
  5. Para cada diferenca conhecida localhost vs producao (consultar feature-flows.md):
     a. Network latency: o fix e sensivel a latencia? (ex: timeout que funciona local mas nao em 3G)
     b. Environment variables: o fix depende de algo que muda entre ambientes?
     c. Third-party: o fix interage com servico externo (OAuth, Google Places)?
     d. Build: tree shaking ou minificacao podem afetar o fix?

**Criterio de PASSO:** Todas as fases A+B+C verificadas sem problemas para todos os fluxos.
**Criterio de FALHA:** Qualquer consumidor com comportamento alterado nao-intencional.
PARAR se falhou.
```

### Nivel 3: Testes de Integracao

````
Para cada fluxo HIGH risk no checklist:

**Estrutura do teste:**
  - Arquivo: `src/__tests__/integration/{fluxo-name}.integration.test.ts`
  - Nomear: `describe('[fluxo-name] - regression after fix', () => { ... })`

**O que mockar (minimo possivel):**
  - SIM mockar: Supabase client (usar mock padrao do projeto)
  - SIM mockar: External APIs (Google Places, OAuth provider)
  - NAO mockar: Hooks que foram fixados
  - NAO mockar: Services que fazem parte do fluxo afetado
  - NAO mockar: State management (contexts, React Query cache)

**Casos de teste obrigatorios:**
  1. Happy path: fluxo completo funciona como esperado
  2. Caso do bug original: reproduzir o cenario que causava o bug, verificar que agora funciona
  3. Edge cases do Impact Analyst: cada caso identificado no relatorio de impacto
  4. Timing: se o fix envolve async/timeout, testar com delays realistas

**Exemplo de estrutura:**
```typescript
describe('login-google-oauth - regression after fix', () => {
  it('should complete OAuth flow successfully', async () => { ... });
  it('should handle PKCE code_verifier missing gracefully', async () => { ... });
  it('should show friendly error for email already registered', async () => { ... });
  it('should auto-retry on silent PKCE failure', async () => { ... });
});
````

IMPORTANTE: NAO mockar as partes que foram fixadas.
PARAR se falhou.

```

### Nivel 4: Checklist Manual
```

Para fluxos que precisam de browser/device real (OAuth, deep links, notificacoes push):

**Formato obrigatorio (usar template regression-checklist.md):**

1. Cada passo DEVE ter:
   - Acao: o que o testador faz (ex: "Clicar no botao 'Login com Google'")
   - Esperado: resultado visivel (ex: "Redirect para accounts.google.com em < 3s")
   - Verificar: o que confirma sucesso (ex: "URL contem accounts.google.com/o/oauth2")
   - Timeout: tempo maximo aceitavel
2. Agrupar por fluxo
3. Indicar pre-condicoes (ex: "usuario deve ter conta email+senha")
4. Indicar device/browser necessario (ex: "Safari mobile iOS" ou "Chrome desktop")

**Exemplo:**

```
## Checklist Manual - login-google-oauth

**Pre-condicoes:**
- Usuario com conta email+senha cadastrada
- Browser: Chrome (qualquer) ou Safari mobile

| # | Acao | Esperado | Verificar | Timeout |
|---|------|----------|-----------|---------|
| 1 | Abrir fomibrasil.com.br | Pagina de login carrega | Form de login visivel | 5s |
| 2 | Clicar "Entrar com Google" | Redirect para Google | URL muda para accounts.google.com | 3s |
| 3 | Selecionar conta Google (mesmo email) | Redirect de volta ao app | URL volta para fomibrasil.com.br | 10s |
| 4 | Aguardar carregamento | Feed carrega com perfil | Nome e avatar visiveis no nav | 5s |
```

Marcar como "Requer verificacao manual pelo usuario".

```

## Saida

### Se APROVADO
```

Veredicto: APROVADO PARA DEPLOY

- Niveis executados: 1-N
- Todos os fluxos do checklist validados
- Pronto para @devops

```

### Se REPROVADO
```

Veredicto: REPROVADO

- Nivel que falhou: [N]
- Fluxo que falhou: [nome]
- O que aconteceu: [descricao com evidencia]
- Recomendacao: [o que o Diagnostician deve re-analisar]
  → Chief faz loop back para Diagnostician com essa info

```

## Regras

- PARAR no primeiro nivel que falhar
- Testar TODOS os fluxos do checklist, nao so o que foi fixado
- Ser explicito sobre passa/falha - zero ambiguidade
- Se REPROVADO, dar info suficiente pro loop back ser produtivo
```
