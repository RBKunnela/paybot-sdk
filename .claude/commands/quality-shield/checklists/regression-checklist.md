# Regression Checklist Template

Template usado pelo Impact Analyst (Nova) para gerar checklists de regressao especificos para cada bug fix. O Regression Guard (Shield) usa o checklist gerado como plano de teste.

## Formato do Checklist Gerado

```markdown
## Checklist de Regressao - [BUG-ID]

**Fix:** [descricao do fix]
**Arquivos Modificados:** [lista]
**Severidade:** [nivel]
**Niveis a Executar:** [1-N]

### Fluxos a Testar

#### Fluxo 1: [nome] (Risco: HIGH/MEDIUM/LOW)

- [ ] **Nivel 1**: [teste unitario especifico a rodar]
- [ ] **Nivel 2**: Trace estatico
  - Ponto de entrada: [tela/componente]
  - Caminho: [componente] → [hook] → [service] → [API]
  - Verificar no ponto do fix: [o que checar]
  - Verificar estado apos fix: [o que deve acontecer]
- [ ] **Nivel 3**: Teste de integracao (se CRITICO/ALTO)
  - Cenario: [descricao]
  - Esperado: [resultado]
- [ ] **Nivel 4**: Validacao manual (se CRITICO)
  - Passo 1: [acao] → Esperado: [resultado]
  - Passo 2: [acao] → Esperado: [resultado]

#### Fluxo 2: [nome] (Risco: HIGH/MEDIUM/LOW)

[mesma estrutura]

### Verificacoes Extras

- [ ] Diferenca localhost vs producao considerada
- [ ] Race conditions verificadas
- [ ] Limpeza de estado verificada
- [ ] Shared utilities nao alterados inadvertidamente
```

## Regras para Gerar o Checklist

1. **Especifico, nao generico**: Cada item deve dizer EXATAMENTE o que testar
2. **Baseado no impacto**: So incluir fluxos que o Impact Analyst identificou como afetados
3. **Risco classificado**: Cada fluxo deve ter seu nivel de risco
4. **Niveis corretos**: Respeitar a matriz de severidade
5. **Passos claros**: Nivel 4 deve ter passos que qualquer pessoa consiga seguir
