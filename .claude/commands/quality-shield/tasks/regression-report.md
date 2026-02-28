---
task: Regression Report
responsavel: "@regression-guard"
responsavel_type: agent
squad: quality-shield
atomic_layer: task
elicit: false
Entrada: |
  - regression_results: Resultados do regression-check (todos os niveis executados)
  - bug_id: Identificador do bug
  - severity: Nivel de severidade
  - modified_files: Arquivos modificados no fix
  - fix_description: Descricao do fix aplicado
  - loops_count: Numero de loops de correcao executados
Saida: |
  - regression_report: Relatorio completo de regressao formatado
  - summary: Resumo executivo (1 paragrafo)
  - metrics: Metricas quantitativas (testes passaram, coverage, fluxos verificados)
  - confidence_level: Nivel de confianca no fix (HIGH/MEDIUM/LOW)
Checklist:
  - "[ ] Coletar resultados de todos os niveis executados"
  - "[ ] Calcular metricas quantitativas"
  - "[ ] Determinar nivel de confianca"
  - "[ ] Gerar resumo executivo"
  - "[ ] Documentar fluxos verificados com resultado"
  - "[ ] Listar riscos residuais (se houver)"
  - "[ ] Formatar relatorio completo"
---

# \*regression-report

Gera relatorio consolidado e estruturado dos resultados de regressao, incluindo metricas quantitativas e nivel de confianca. Complementa o veredicto do regression-check com documentacao completa.

## Entrada

O Regression Guard (Shield) executa automaticamente apos o regression-check:

- **Regression Results**: Dados brutos de cada nivel executado
- **Bug ID**: Para referencia e tracking
- **Severity**: Nivel de severidade original
- **Modified Files**: Arquivos que o @dev alterou
- **Fix Description**: O que foi feito
- **Loops Count**: Quantas tentativas de fix foram necessarias

## Execucao

### Passo 1: Coletar Resultados por Nivel

```
Para cada nivel executado:

Nivel 1 (Testes Unitarios):
  - Total de testes: N
  - Passaram: N
  - Falharam: N
  - Skipped: N
  - Coverage: X%
  - Coverage delta: +/- X% vs antes do fix
  - Novos warnings: N

Nivel 2 (Trace Estatico):
  - Fluxos tracados: N
  - Fluxos OK: N
  - Fluxos com risco residual: N
  - Consumidores verificados: N

Nivel 3 (Integracao):
  - Testes criados: N
  - Cenarios testados: N
  - Passaram: N
  - Falharam: N

Nivel 4 (Manual):
  - Passos no checklist: N
  - Status: Gerado / Executado / Pendente
```

### Passo 2: Calcular Metricas

```
Metricas agregadas:

- Test Pass Rate: (testes passaram / total) * 100
- Flow Coverage: (fluxos verificados / fluxos afetados) * 100
- Fix Stability: baseado em loops (1 loop = HIGH, 2 = MEDIUM, 3 = LOW)
- Coverage Impact: delta de coverage (positivo = bom)
```

### Passo 3: Determinar Confianca

```
Confidence Level:

HIGH (verde):
  - Todos os testes passaram
  - Todos os fluxos tracados sem risco
  - 1 loop de correcao
  - Coverage nao diminuiu
  - Nenhum warning novo

MEDIUM (amarelo):
  - Testes passaram mas com warnings
  - Algum fluxo com risco residual baixo
  - 2 loops de correcao
  - OU coverage diminuiu levemente

LOW (vermelho):
  - 3 loops de correcao
  - Fluxos com risco residual medio/alto
  - Coverage diminuiu significativamente
  - OU riscos que nao podem ser testados automaticamente
```

### Passo 4: Identificar Riscos Residuais

```
Listar qualquer risco que permanece apos o fix:

- Fluxos que nao puderam ser verificados automaticamente
- Race conditions que dependem de timing real
- Diferencas localhost vs producao nao testadas
- Casos que so podem ser validados com Nivel 4 (manual)
- Dependencias externas nao mockadas
```

### Passo 5: Gerar Relatorio

```
## Regression Report - [BUG-ID]

**Data:** [data]
**Severidade:** [nivel]
**Veredicto:** [APROVADO/REPROVADO]
**Confianca:** [HIGH/MEDIUM/LOW]

### Resumo Executivo

[1 paragrafo descrevendo o fix, o que foi testado, e o resultado]

### Fix Aplicado

- **Descricao:** [o que foi feito]
- **Arquivos:** [lista de arquivos modificados]
- **Loops:** [N] tentativa(s) de correcao

### Resultados por Nivel

#### Nivel 1 - Testes Unitarios
| Metrica    | Valor |
|------------|-------|
| Total      | N     |
| Passaram   | N     |
| Falharam   | N     |
| Coverage   | X%    |
| Delta      | +/-X% |

#### Nivel 2 - Trace Estatico
| Fluxo          | Status | Risco Residual |
|----------------|--------|----------------|
| [fluxo-name]   | OK     | Nenhum         |

#### Nivel 3 - Integracao (se executado)
| Cenario             | Status  |
|---------------------|---------|
| Happy path          | PASS    |
| Bug original        | PASS    |

#### Nivel 4 - Manual (se gerado)
Status: [Gerado para execucao / Executado / N/A]

### Metricas

| Metrica          | Valor  |
|------------------|--------|
| Test Pass Rate   | X%     |
| Flow Coverage    | X%     |
| Fix Stability    | [H/M/L]|
| Coverage Impact  | +/-X%  |

### Riscos Residuais

[lista de riscos ou "Nenhum risco residual identificado"]

### Recomendacao para Deploy

[recomendacao baseada na confianca e riscos]
```

## Saida

- **Regression Report** → passado ao Chief para decisao de deploy
- **Summary** → incluido no resultado final ao usuario
- **Metrics** → registrados na KB junto com o bug

## Regras

- SEMPRE gerar relatorio, mesmo se REPROVADO (documentar o que falhou e por que).
- Metricas devem ser EXATAS, nao estimativas.
- Confianca LOW nao significa REPROVADO - significa cautela no deploy.
- Riscos residuais devem ser ESPECIFICOS, nao genericos.
- O relatorio e um documento de registro - deve ser compreensivel sem contexto adicional.
