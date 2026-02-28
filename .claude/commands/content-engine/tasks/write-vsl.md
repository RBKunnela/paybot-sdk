# Task: Write VSL Script

**Task ID:** write-vsl
**Executor:** Agent (stefan-georgi)
**Execution Type:** Agent
**Quality Gate:** QG-003
**Template:** templates/vsl-script-tmpl.md

---

## Purpose

Escrever um script de Video Sales Letter (VSL) completo usando o metodo RMBC, otimizado para retencao e conversao.

---

## Inputs

| Input           | Required    | Description                              |
| --------------- | ----------- | ---------------------------------------- |
| product         | Yes         | Produto/servico sendo vendido            |
| market          | Yes         | Publico-alvo                             |
| diagnosis       | Recommended | Output do diagnose-market                |
| duration_target | No          | Duracao alvo em minutos (default: 15-30) |
| rmbc_brief      | Recommended | Output do rmbc-workflow                  |
| price           | Yes         | Preco e opcoes de pagamento              |
| guarantee       | Yes         | Tipo e prazo da garantia                 |

---

## Steps

1. **Review RMBC Brief** - Se disponivel, usar como base
2. **Load Template** - Carregar vsl-script-tmpl.md
3. **Write Pattern Interrupt** - Hook que trava scroll (primeiros 30s)
4. **Write Problem Agitation** - Dor visceral, nao bonita
5. **Write Mechanism Reveal** - O "por que funciona" unico
6. **Write Credibility Section** - Prova + autoridade
7. **Build Offer Stack** - Valor empilhado com ancora de preco
8. **Write Risk Reversal** - Garantia forte
9. **Write Urgency Close** - Escassez real
10. **Write CTA** - Instrucoes claras
11. **Add Slide Notes** - Indicacoes visuais por segmento
12. **Self-Review** - Checklist pre-Torriani
13. **Handoff** - Enviar para @oraculo-torriani

---

## Acceptance Criteria

- [ ] Hook trava nos primeiros 30 segundos
- [ ] Dor amplificada em cena viva
- [ ] Mecanismo unico nomeado e explicado
- [ ] Transicoes suaves entre segmentos
- [ ] Offer stack com valor > 10x preco
- [ ] Garantia presente e forte
- [ ] CTA unico e claro
- [ ] Notas de slide/visual incluidas
- [ ] Duracao dentro do target
- [ ] Zero cliches de coach
