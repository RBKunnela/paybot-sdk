---
task: Atualizacao de Leiautes Fiscais
responsavel: "@fiscal-digital"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - sistema_atual: Sistema ERP/emissor em uso
  - versao_atual: Versao atual do leiaute
  - tipo_documento: NF-e, NFC-e e/ou NFS-e
Saida: |
  - mudancas: Lista de mudancas na NT 1.10+
  - impacto: Impacto no sistema atual
  - plano_atualizacao: Plano de atualizacao passo a passo
  - testes: Roteiro de testes em homologacao
Checklist:
  - "[ ] Identificar versao atual do leiaute no sistema"
  - "[ ] Listar mudancas da NT 1.10 (campos IBS, CBS, eventos)"
  - "[ ] Avaliar impacto no sistema de emissao atual"
  - "[ ] Elaborar plano de atualizacao"
  - "[ ] Definir roteiro de testes em homologacao"
  - "[ ] Validar emissao pos-atualizacao"
---

# *atualizacao-leiautes

Orienta sobre atualizacao dos leiautes fiscais de NF-e, NFC-e e NFS-e conforme Notas Tecnicas vigentes, incluindo campos de IBS e CBS.

## Uso

```
@fiscal-digital
*atualizacao-leiautes
```

## Contexto 2026

- NT 1.10: novos campos para IBS e CBS nos leiautes XML
- Novos tipos de debito e eventos fiscais
- MEI/Simples dispensados de preencher IBS/CBS em 2026 (muda em 2027)
- Novas regras de antecipacao de pagamento
- Atualizacao de tabelas de CFOP e CST

## Flow

1. Identificar sistema e versao atual do leiaute
2. Listar todas as mudancas da NT 1.10+ aplicaveis
3. Avaliar impacto: campos novos, campos alterados, regras de validacao
4. Elaborar plano de atualizacao com cronograma
5. Preparar roteiro de testes em homologacao
6. Executar atualizacao e validar emissao
