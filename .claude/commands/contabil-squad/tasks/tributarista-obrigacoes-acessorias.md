---
task: Gestao de Obrigacoes Acessorias
responsavel: "@tributarista"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - tipo_empresa: MEI ou Simples Nacional
  - uf: Unidade federativa da empresa
  - atividades: Lista de atividades (CNAE)
  - periodo: Mes/ano de referencia
Saida: |
  - calendario: Calendario de obrigacoes com prazos
  - pendencias: Obrigacoes vencidas ou proximas do vencimento
  - orientacoes: Instrucoes para cumprimento de cada obrigacao
Checklist:
  - "[ ] Identificar regime e atividades da empresa"
  - "[ ] Listar todas as obrigacoes acessorias aplicaveis"
  - "[ ] Mapear prazos federais, estaduais e municipais"
  - "[ ] Identificar pendencias e atrasos"
  - "[ ] Orientar sobre cumprimento de cada obrigacao"
  - "[ ] Alertar sobre novas obrigacoes 2026 (MAT, leiautes)"
---

# *obrigacoes-acessorias

Gestao completa de obrigacoes acessorias aplicaveis ao MEI e Simples Nacional, com calendario de prazos e orientacoes de cumprimento.

## Uso

```
@tributarista
*obrigacoes-acessorias
```

## Contexto 2026

- DASN-SIMEI (Declaracao Anual MEI) — prazo ate 31/05
- DEFIS (Declaracao de Informacoes Socioeconomicas e Fiscais)
- PGDAS-D (Programa Gerador do DAS) — mensal
- DIRF, EFD-Reinf, DCTFWeb conforme aplicabilidade
- Novo MAT (Modulo de Administracao Tributaria) — formalizacao na abertura
- Novas regras de antecipacao e eventos fiscais (NT 1.10)

## Flow

1. Identificar tipo de empresa, UF e atividades
2. Listar obrigacoes federais (RFB): DASN-SIMEI, DEFIS, PGDAS-D, DIRF
3. Listar obrigacoes estaduais (SEFAZ): STDA, DeSTDA conforme UF
4. Listar obrigacoes municipais: ISS, NFS-e
5. Montar calendario com todos os prazos do periodo
6. Verificar pendencias e atrasos
7. Orientar sobre cumprimento e regularizacao
