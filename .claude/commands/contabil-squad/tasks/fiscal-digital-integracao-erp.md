---
task: Integracao com Sistemas ERP
responsavel: "@fiscal-digital"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - erp: Nome/tipo do ERP (ex: Bling, Tiny, Omie, Totvs)
  - modulo_fiscal: Modulo fiscal utilizado
  - integracao_desejada: Tipo de integracao (emissao, consulta, cancelamento)
Saida: |
  - diagnostico: Estado atual da integracao fiscal
  - configuracoes: Configuracoes recomendadas
  - testes: Roteiro de testes
  - troubleshooting: Problemas comuns e solucoes
Checklist:
  - "[ ] Identificar ERP e modulo fiscal"
  - "[ ] Diagnosticar estado atual da integracao"
  - "[ ] Verificar configuracoes de certificado digital"
  - "[ ] Validar parametros fiscais (CFOP, NCM, CST/CSOSN)"
  - "[ ] Testar emissao, consulta e cancelamento"
  - "[ ] Documentar configuracoes aplicadas"
---

# *integracao-erp

Diagnostica e orienta sobre integracao de sistemas ERP com plataformas de emissao fiscal eletronica.

## Uso

```
@fiscal-digital
*integracao-erp
```

## Flow

1. Identificar ERP e modulo fiscal em uso
2. Diagnosticar integracao atual (APIs, certificados, parametros)
3. Verificar compatibilidade com leiautes atualizados (NT 1.10)
4. Configurar parametros fiscais corretos para o regime
5. Testar fluxo completo (emissao, consulta, cancelamento, inutilizacao)
6. Documentar configuracoes e troubleshooting
