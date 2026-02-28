---
task: Apuracao Simples Nacional
responsavel: "@tributarista"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - faturamento_mensal: Faturamento bruto do mes (obrigatorio)
  - anexo: Anexo do Simples Nacional (I a V)
  - rbt12: Receita bruta acumulada 12 meses (obrigatorio)
  - atividade: Atividade principal CNAE
Saida: |
  - das_valor: Valor do DAS a recolher
  - aliquota_efetiva: Aliquota efetiva calculada
  - detalhamento: Detalhamento por tributo (IRPJ, CSLL, COFINS, PIS, CPP, ICMS/ISS)
  - observacoes: Alertas sobre sublimites e faixas
Checklist:
  - "[ ] Identificar anexo correto do Simples Nacional"
  - "[ ] Calcular RBT12 (Receita Bruta acumulada 12 meses)"
  - "[ ] Aplicar tabela de aliquotas e faixa correspondente"
  - "[ ] Calcular aliquota efetiva e valor do DAS"
  - "[ ] Detalhar reparticao por tributo"
  - "[ ] Verificar sublimites estaduais/municipais"
  - "[ ] Alertar sobre proximidade de mudanca de faixa"
---

# *apuracao-simples

Realiza a apuracao completa de impostos no regime do Simples Nacional, calculando o DAS mensal com base no faturamento e anexo correspondente.

## Uso

```
@tributarista
*apuracao-simples
```

## Contexto 2026

- Tabelas e faixas do Simples Nacional (LC 123/2006, atualizada)
- Periodo de transicao IBS/CBS — em 2026 o calculo permanece no modelo atual
- Sublimites estaduais para ICMS e ISS
- Fator R para atividades do Anexo V que podem migrar para Anexo III

## Flow

1. Coletar faturamento bruto mensal e atividade CNAE
2. Identificar anexo correto (I a V) com base na atividade
3. Calcular RBT12 (receita bruta acumulada ultimos 12 meses)
4. Localizar faixa de faturamento na tabela do anexo
5. Calcular aliquota efetiva: (RBT12 x Aliq - PD) / RBT12
6. Aplicar aliquota efetiva sobre faturamento do mes = valor DAS
7. Detalhar reparticao por tributo conforme percentuais do anexo
8. Verificar sublimites e alertar sobre mudancas de faixa
