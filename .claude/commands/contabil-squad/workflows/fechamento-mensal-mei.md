---
workflow: Fechamento Mensal MEI e Simples
responsavel: "@tributarista"
tipo: sequential
frequencia: mensal
agentes_envolvidos:
  - "@tributarista"
  - "@fiscal-digital"
  - "@compliance"
  - "@gerencial"
---

# Workflow: Fechamento Mensal MEI & Simples Nacional

Sequencia completa de fechamento mensal para empresas MEI e Simples Nacional, coordenando os agentes especializados.

## Quando Usar

- Todo final de mes / inicio do mes seguinte
- Antes do vencimento do DAS (dia 20)
- Para garantir conformidade fiscal mensal

## Steps

### Step 1: Conferencia de Notas Fiscais
**Agente:** @fiscal-digital
**Task:** `*emissao-nfe`

```
- Verificar todas as NF-e/NFC-e/NFS-e emitidas no mes
- Conferir valores, CFOP, NCM e CSOSN
- Identificar notas canceladas ou com erros
- Totalizar faturamento bruto do mes
```

### Step 2: Apuracao de Impostos
**Agente:** @tributarista
**Task:** `*apuracao-simples`

```
- Calcular RBT12 atualizada
- Identificar faixa e aliquota efetiva
- Calcular valor do DAS mensal
- Gerar guia de pagamento
```

### Step 3: Verificacao de Pendencias
**Agente:** @compliance
**Task:** `*revisao-pendencias`

```
- Verificar se DAS anterior foi pago
- Checar pendencias junto a RFB/SEFAZ
- Alertar sobre obrigacoes acessorias do mes
```

### Step 4: Relatorio Gerencial
**Agente:** @gerencial
**Task:** `*relatorio-desempenho`

```
- Gerar DRE simplificada do mes
- Calcular indicadores de desempenho
- Comparar com mes anterior
- Alertar sobre proximidade de limites de faixa/regime
```

## Output Esperado

```
✅ Fechamento Mensal Concluido — [Mes/Ano]

📊 Resumo:
  - Faturamento bruto: R$ XX.XXX,XX
  - NF-e emitidas: XX
  - DAS calculado: R$ X.XXX,XX (vencimento dia 20)
  - Pendencias: [nenhuma | lista]
  - Margem liquida: XX%

📋 Proximas acoes:
  1. Pagar DAS ate dia 20
  2. [Obrigacoes acessorias pendentes]
```
