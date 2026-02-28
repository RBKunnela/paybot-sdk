# Task: Write Sales Page

**Task ID:** write-sales-page
**Executor:** Agent (gary-halbert OR stefan-georgi)
**Execution Type:** Agent
**Quality Gate:** QG-003
**Template:** templates/sales-page-tmpl.md

---

## Purpose

Escrever uma sales page completa de alta conversao seguindo os principios de direct response.

---

## Inputs

| Input           | Required    | Description                   |
| --------------- | ----------- | ----------------------------- |
| product         | Yes         | Produto/servico sendo vendido |
| market          | Yes         | Publico-alvo                  |
| diagnosis       | Recommended | Output do diagnose-market     |
| price           | Yes         | Preco e opcoes de pagamento   |
| guarantee       | Yes         | Tipo e prazo da garantia      |
| testimonials    | Recommended | Depoimentos de clientes       |
| competitor_urls | No          | URLs de concorrentes          |

---

## Steps

1. **Review Diagnosis** - Ler output do diagnose-market (awareness + sophistication)
2. **Load Template** - Carregar sales-page-tmpl.md
3. **Define Mechanism** - Nomear e documentar mecanismo unico
4. **Write Headline Set** - 5+ variacoes de headline
5. **Write Lead** - Escolher tipo (Story/Problem/Secret) e escrever
6. **Write Problem Amplification** - 3 camadas de dor
7. **Write Mechanism Reveal** - Explicar o "por que funciona"
8. **Write Proof Section** - Credibilidade + testimonials
9. **Build Offer Stack** - Usando offer-stack-tmpl.md
10. **Write Guarantee** - Risk reversal
11. **Write CTA** - Call to action
12. **Write PS** - Minimo 1 PS (obrigatorio - Halbert Rule)
13. **Self-Review** - Checklist pre-Torriani
14. **Handoff** - Enviar para @oraculo-torriani

---

## Acceptance Criteria

- [ ] Headline com beneficio + numero/prazo
- [ ] Lead abre com tensao
- [ ] Mecanismo unico nomeado e visual
- [ ] Dor em cena viva (VoC)
- [ ] Offer stack com valor empilhado
- [ ] Garantia clara
- [ ] CTA binario e especifico
- [ ] PS presente (obrigatorio)
- [ ] Zero cliches de coach
- [ ] Copy proprietaria (teste do concorrente)
