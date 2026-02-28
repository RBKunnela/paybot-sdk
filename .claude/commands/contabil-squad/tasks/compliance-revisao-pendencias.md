---
task: Revisao de Pendencias Fiscais
responsavel: "@compliance"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - cnpj: CNPJ da empresa
  - regime: Regime tributario atual
  - periodo: Periodo de analise
Saida: |
  - pendencias: Lista de pendencias identificadas
  - risco_exclusao: Nivel de risco de exclusao do Simples
  - plano_regularizacao: Plano de regularizacao priorizado
  - prazos: Prazos para regularizacao
Checklist:
  - "[ ] Consultar situacao cadastral CNPJ"
  - "[ ] Verificar pendencias junto a RFB (eCAC)"
  - "[ ] Verificar pendencias estaduais (SEFAZ)"
  - "[ ] Verificar pendencias municipais"
  - "[ ] Avaliar risco de exclusao do Simples/MEI"
  - "[ ] Elaborar plano de regularizacao priorizado"
---

# *revisao-pendencias

Revisa pendencias fiscais e cadastrais junto a Receita Federal, estados e municipios, avaliando risco de exclusao do Simples.

## Uso

```
@compliance
*revisao-pendencias
```

## Contexto 2026

- Fiscalizacao digital intensificada com cruzamento de dados bancarios e NF-e
- Notificacoes de exclusao por debitos via DTE (Domicilio Tributario Eletronico)
- Prazo para regularizacao apos notificacao: 30 dias
- Parcelamento de debitos: ate 60x para manter Simples

## Flow

1. Consultar situacao cadastral do CNPJ
2. Levantar pendencias federais (eCAC/RFB)
3. Levantar pendencias estaduais (SEFAZ da UF)
4. Levantar pendencias municipais (ISS, taxas)
5. Classificar pendencias por gravidade e urgencia
6. Avaliar risco de exclusao do regime
7. Elaborar plano de regularizacao com prazos e prioridades
