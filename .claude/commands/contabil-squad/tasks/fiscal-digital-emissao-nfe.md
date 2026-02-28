---
task: Emissao e Validacao NF-e NFC-e
responsavel: "@fiscal-digital"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - tipo_documento: NF-e ou NFC-e
  - tipo_empresa: MEI ou Simples Nacional
  - sistema_emissao: Sistema/ERP utilizado
  - problema: Descricao do problema ou duvida (opcional)
Saida: |
  - orientacao: Passo a passo para emissao/correcao
  - validacoes: Checklist de validacao pre-emissao
  - erros_comuns: Erros e rejeicoes comuns com solucao
Checklist:
  - "[ ] Identificar tipo de documento e regime"
  - "[ ] Verificar certificado digital (validade e tipo)"
  - "[ ] Orientar sobre campos obrigatorios"
  - "[ ] Validar CFOP, NCM e CST/CSOSN corretos"
  - "[ ] Verificar ambiente (homologacao vs producao)"
  - "[ ] Tratar rejeicoes e erros de transmissao"
---

# *emissao-nfe

Orienta sobre emissao e validacao de NF-e e NFC-e para empresas do MEI e Simples Nacional.

## Uso

```
@fiscal-digital
*emissao-nfe
```

## Contexto 2026

- Obrigatoriedade gradual de NF-e para MEI em todas as vendas
- Campos IBS/CBS nos leiautes: dispensados para MEI/Simples em 2026
- CSOSN (Codigo de Situacao da Operacao no Simples Nacional) obrigatorio
- Novos tipos de debito e eventos fiscais (NT 1.10)

## Flow

1. Identificar tipo de documento e regime da empresa
2. Verificar certificado digital (A1/A3, validade)
3. Orientar sobre campos obrigatorios e opcionais
4. Validar codigos fiscais (CFOP, NCM, CSOSN)
5. Testar em ambiente de homologacao se necessario
6. Transmitir e validar retorno da SEFAZ
7. Tratar rejeicoes com orientacao de correcao
