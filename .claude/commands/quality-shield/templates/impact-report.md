# Template: Impact Report

# Usado por: Impact Analyst (Nova)

# Preenchido em: Step 5 da impact_analysis_methodology

# Consumido por: @dev (contexto), Regression Guard (checklist), Chief (orquestracao)

## Relatorio de Impacto

**Bug Ref:** [ID do diagnostico ou descricao breve]
**Data:** [YYYY-MM-DD]
**Severidade:** [CRITICO | ALTO | MEDIO | BAIXO]

---

**Arquivo(s) a Modificar:** [lista de arquivos que o fix vai alterar]
**Funcao(oes) Afetada(s):** [funcoes/metodos especificos]
**Raio de Explosao:** [LOW | MEDIUM | HIGH | CRITICAL]

---

### Consumidores Diretos

| #   | Arquivo                 | Funcao     | Como Usa o Codigo Afetado   |
| --- | ----------------------- | ---------- | --------------------------- |
| 1   | [src/path/consumer.ts]  | [funcName] | [descricao de como consome] |
| 2   | [src/path/consumer2.ts] | [funcName] | [descricao de como consome] |

### Consumidores Indiretos (Transitivos)

| #   | Arquivo                  | Afetado Via          | Risco             |
| --- | ------------------------ | -------------------- | ----------------- |
| 1   | [src/path/transitive.ts] | [chain: A -> B -> C] | [HIGH/MEDIUM/LOW] |

---

### Fluxos de Usuario Afetados

| #   | Fluxo           | Risco             | Por Que e Afetado    |
| --- | --------------- | ----------------- | -------------------- |
| 1   | [nome-do-fluxo] | [HIGH/MEDIUM/LOW] | [explicacao concisa] |

---

### Checklist de Regressao (para Regression Guard)

> Cada item deve ser ESPECIFICO - passos exatos, nao genericos.
> Este checklist sera usado diretamente pelo Regression Guard (Shield).

**Fluxos de risco HIGH:**

- [ ] [Fluxo]: [Passos exatos para testar - acao 1, verificar resultado X, acao 2, verificar Y]
- [ ] [Fluxo]: [Passos exatos para testar]

**Fluxos de risco MEDIUM:**

- [ ] [Fluxo]: [Passos exatos para testar]

**Fluxos de risco LOW:**

- [ ] [Fluxo]: [Passos exatos para testar]

**Verificacoes extras:**

- [ ] Race conditions: [cenario especifico a verificar]
- [ ] State cleanup: [o que verificar sobre estado apos operacao]
- [ ] Shared utilities: [utilidades compartilhadas que NAO devem mudar comportamento]

---

### Alertas

- **Localhost vs Prod:** [diferencas conhecidas que afetam este fix]
- **Race Conditions:** [cenarios de timing a considerar]
- **Shared State:** [contextos/estados compartilhados que podem ser afetados]
- **Third-party:** [dependencias externas envolvidas - OAuth, APIs, Edge Functions]

### Contexto para @dev

- **NAO alterar:** [lista explicita de coisas que nao devem mudar]
- **Cuidado com:** [pontos de atencao durante implementacao]
- **Testar localmente:** [o que o dev deve verificar antes de passar pro Regression Guard]

---

_Gerado por Nova (Impact Analyst) - Quality Shield Squad_
