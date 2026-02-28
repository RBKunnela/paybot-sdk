---
task: Preparacao para Fiscalizacao Digital
responsavel: "@compliance"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - tipo_empresa: MEI ou Simples Nacional
  - periodo_risco: Periodo com maior risco de fiscalizacao
  - tipo_fiscalizacao: RFB, SEFAZ ou Municipio
Saida: |
  - checklist_documentos: Documentos necessarios organizados
  - pontos_atencao: Inconsistencias a corrigir preventivamente
  - orientacoes: Como se comportar durante fiscalizacao
  - defesa: Opcoes de defesa administrativa
Checklist:
  - "[ ] Identificar tipo e origem da fiscalizacao"
  - "[ ] Organizar documentos fiscais do periodo"
  - "[ ] Verificar consistencia entre NF-e emitidas e DAS recolhido"
  - "[ ] Cruzar movimentacao bancaria com faturamento declarado"
  - "[ ] Identificar e corrigir inconsistencias preventivamente"
  - "[ ] Preparar documentacao de defesa se necessario"
---

# *preparacao-fiscalizacao

Prepara a empresa para fiscalizacao digital, organizando documentos e identificando inconsistencias preventivamente.

## Uso

```
@compliance
*preparacao-fiscalizacao
```

## Contexto 2026

- Cruzamento automatizado: dados bancarios x NF-e x DAS x DEFIS
- Receita Federal, SEFAZ e municipios com sistemas integrados
- Malha fiscal MEI: divergencias entre faturamento declarado e movimentacao
- Intimacoes eletronicas via DTE com prazo curto de resposta

## Flow

1. Identificar tipo de fiscalizacao (federal, estadual, municipal)
2. Levantar documentos fiscais do periodo auditado
3. Cruzar NF-e emitidas x DAS recolhido x movimentacao bancaria
4. Identificar divergencias e inconsistencias
5. Corrigir preventivamente o que for possivel (retificacoes)
6. Organizar documentacao para apresentacao
7. Orientar sobre defesa administrativa se necessario
