---
task: Consultive Approach
responsavel: "@sales-consultant"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - reseller_id: Identificador do revendedor
  - product_catalog: Catálogo de produtos relevantes
Saida: |
  - approach_plan: Plano de abordagem consultiva
  - talking_points: Pontos-chave para a conversa
Checklist:
  - "[ ] Levantar contexto do revendedor"
  - "[ ] Definir objetivo da visita/contato"
  - "[ ] Preparar talking points técnicos"
  - "[ ] Mapear objeções prováveis e respostas"
  - "[ ] Gerar plano de abordagem"
---

# *consultive-approach

Gera plano de abordagem consultiva com talking points para interação com revendedor.

## Uso

```
@sales-consultant
*consultive-approach {reseller_id}
```

## Flow

1. Levantar contexto do revendedor (último contato, compras recentes, pendências)
2. Definir objetivo estratégico do contato
3. Preparar argumentos técnicos sobre produtos
4. Antecipar objeções e preparar respostas
5. Gerar roteiro de abordagem consultiva
6. Incluir sugestões de follow-up
