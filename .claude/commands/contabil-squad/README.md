# contabil-squad

Squad para contabilidade completa — MEI & Simples Nacional 2026.

Cobre contabilidade tributaria, gerencial, fiscal digital, compliance e planejamento estrategico, com foco na transicao da Reforma Tributaria (IBS/CBS).

## Agents

| Agent | Icon | Foco |
|-------|------|------|
| `tributarista` | 🧾 | Apuracao Simples, IBS/CBS, DAS MEI, obrigacoes acessorias |
| `gerencial` | 📈 | Relatorios, custos, comparativo de regimes, projecoes |
| `fiscal-digital` | 🖥️ | NF-e, NFC-e, NFS-e, leiautes, ERP |
| `compliance` | ⚖️ | Enquadramento, pendencias, fiscalizacao, regularizacao |
| `planejamento` | 🎯 | Simulacoes, reducao de carga, creditos, transicao 2026-2033 |

## Structure

```
contabil-squad/
├── squad.yaml
├── README.md
├── config/
│   ├── coding-standards.md
│   ├── tech-stack.md
│   └── source-tree.md
├── agents/
│   ├── tributarista.md          (4 tasks)
│   ├── gerencial.md             (4 tasks)
│   ├── fiscal-digital.md        (4 tasks)
│   ├── compliance.md            (4 tasks)
│   └── planejamento.md          (4 tasks)
├── tasks/                       (20 tasks total)
├── workflows/
│   └── fechamento-mensal-mei.md
├── checklists/
│   └── checklist-conformidade-2026.md
├── data/
│   └── calendario-fiscal-2026.yaml
├── templates/
├── tools/
└── scripts/
```

## Quick Start

```
@tributarista    → *apuracao-simples, *calculo-das-mei
@gerencial       → *comparativo-regimes, *relatorio-desempenho
@fiscal-digital  → *emissao-nfe, *atualizacao-leiautes
@compliance      → *verificacao-enquadramento, *revisao-pendencias
@planejamento    → *simulacao-impacto, *transicao-2026
```

## Author

Adriano

## License

UNLICENSED
