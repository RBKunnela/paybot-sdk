---
task: NFS-e e Obrigacoes Municipais
responsavel: "@fiscal-digital"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - municipio: Municipio da empresa
  - atividade_servico: Tipo de servico prestado
  - sistema_nfse: Sistema de NFS-e utilizado (portal municipal, integrado)
Saida: |
  - orientacao: Orientacao sobre emissao de NFS-e no municipio
  - obrigacoes: Obrigacoes municipais de ISS
  - configuracao: Configuracao do sistema de emissao
  - prazos: Prazos de declaracao e recolhimento
Checklist:
  - "[ ] Identificar municipio e portal de NFS-e"
  - "[ ] Verificar enquadramento no LC 116/2003 (lista de servicos)"
  - "[ ] Orientar sobre emissao de NFS-e no padrao nacional"
  - "[ ] Configurar sistema de emissao municipal"
  - "[ ] Mapear obrigacoes de ISS (declaracao, recolhimento)"
  - "[ ] Alertar sobre retencao de ISS na fonte"
---

# *nfse-municipal

Orienta sobre emissao de NFS-e (Nota Fiscal de Servico Eletronica) e obrigacoes municipais de ISS.

## Uso

```
@fiscal-digital
*nfse-municipal
```

## Contexto 2026

- Padrao nacional de NFS-e em expansao (muitos municipios ja aderiram)
- Leiaute da NFS-e tambem recebera campos de IBS/CBS futuramente
- ISS sera substituido pelo IBS (municipal) na transicao
- Retencao na fonte de ISS continua aplicavel conforme LC 116/2003

## Flow

1. Identificar municipio e sistema de NFS-e utilizado
2. Verificar adesao do municipio ao padrao nacional de NFS-e
3. Classificar servico conforme LC 116/2003
4. Orientar sobre emissao correta (campos, aliquota ISS)
5. Mapear obrigacoes de declaracao e recolhimento
6. Alertar sobre retencao de ISS quando aplicavel
