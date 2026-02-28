# Automacao: {NOME_DA_AUTOMACAO}

## Metadata

| Campo | Valor |
|-------|-------|
| **ID** | {auto-NNN} |
| **Space** | {space onde esta configurada} |
| **List** | {list especifica, se aplicavel} |
| **Criada por** | {autor} |
| **Data criacao** | {data} |
| **Status** | {ativa / pausada / desativada} |
| **Ultima modificacao** | {data} |

---

## Especificacao

### Trigger
```
WHEN {evento que dispara a automacao}
```

### Conditions
```
AND {condicao 1}
AND {condicao 2}
```

### Actions
```
THEN {acao 1}
AND {acao 2}
AND {acao 3}
```

---

## Configuracao no ClickUp

| Passo | Campo | Valor |
|-------|-------|-------|
| 1 | Trigger | {tipo de trigger} |
| 2 | Condition | {condicao} |
| 3 | Action 1 | {primeira acao} |
| 4 | Action 2 | {segunda acao} |

---

## Edge Cases Tratados

- {cenario 1}: {como e tratado}
- {cenario 2}: {como e tratado}

## Edge Cases NAO Tratados

- {cenario que nao cobre}: {motivo / workaround}

---

## Dependencias

- **Requer:** {custom fields, statuses, etc que precisam existir}
- **Afeta:** {outras automacoes ou processos que sao impactados}

---

## Testes Realizados

| Cenario | Resultado | Data |
|---------|-----------|------|
| {cenario normal} | {OK / Falha} | {data} |
| {edge case} | {OK / Falha} | {data} |

---

## Historico

| Data | Alteracao | Autor |
|------|-----------|-------|
| {data} | Criacao inicial | {autor} |
