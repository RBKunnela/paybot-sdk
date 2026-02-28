# Template: Diagnosis Report

# Usado por: Diagnostician (Sage)

# Preenchido em: Step 5 da diagnostic_methodology

# Consumido por: Chief -> Impact Analyst (Nova)

## Diagnostico

**Bug ID:** [Sera atribuido pelo Chief no kb-record]
**Data:** [YYYY-MM-DD]
**Severidade:** [CRITICO | ALTO | MEDIO | BAIXO]

---

**Sintoma:** [O que o usuario ve - descricao objetiva do comportamento errado]

**Causa Raiz:** [Por que acontece - explicacao tecnica da causa real, nao do sintoma]

**O Que Causa:** [Explicacao detalhada em linguagem acessivel - alguem que nunca viu o codigo deve entender]

---

### Arquivos Envolvidos

| #   | Arquivo             | Linha(s) | Papel no Bug                                |
| --- | ------------------- | -------- | ------------------------------------------- |
| 1   | [src/path/file.ts]  | [~L42]   | [O que esse arquivo faz no contexto do bug] |
| 2   | [src/path/file2.ts] | [~L100]  | [O que esse arquivo faz no contexto do bug] |

### Fluxos Afetados

| #   | Fluxo           | Criticidade                | Como e Afetado                  |
| --- | --------------- | -------------------------- | ------------------------------- |
| 1   | [nome-do-fluxo] | [CRITICAL/HIGH/MEDIUM/LOW] | [Descricao do impacto no fluxo] |

---

### Trace Completo

```
[Acao do usuario]
  -> [Componente] chama [hook/funcao]
  -> [Hook] chama [service]
  -> [Service] faz [operacao]
  -> AQUI QUEBRA: [o que acontece de errado]
  -> Resultado: [o que o usuario ve]
```

### Evidencia

[Como chegou a essa conclusao - referencias a codigo, logs, comportamento observado]

---

### Patterns da Knowledge Base

[Se ha bugs similares ja resolvidos, referenciar IDs e padroes]

- Match: [BUG-ID] - [descricao breve] (relevancia: ALTA/MEDIA/BAIXA)
- Pattern: [nome-do-padrao] - [como se aplica a este bug]
- Ou: "Nenhum bug similar encontrado na KB."

### Diferenca Localhost vs Producao

| Aspecto   | Localhost       | Producao        |
| --------- | --------------- | --------------- |
| [aspecto] | [comportamento] | [comportamento] |

[Se nao aplicavel: "Comportamento identico em ambos ambientes."]

---

_Gerado por Sage (Diagnostician) - Quality Shield Squad_
