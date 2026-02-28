---
task: CRM Update
responsavel: "@sales-ops"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - reseller_id: Identificador do revendedor
  - interaction_data: Dados da interação (tipo, resumo, outcomes)
Saida: |
  - crm_record: Registro formatado para o CRM
  - follow_up_actions: Ações de follow-up geradas
Checklist:
  - "[ ] Validar dados da interação"
  - "[ ] Formatar registro para CRM"
  - "[ ] Identificar ações de follow-up"
  - "[ ] Agendar próximos contatos"
  - "[ ] Confirmar registro"
---

# *crm-update

Registra interação com revendedor no CRM e gera ações de follow-up.

## Uso

```
@sales-ops
*crm-update {reseller_id}
```

## Flow

1. Coletar dados da interação (visita, ligação, email, pedido)
2. Estruturar registro no formato CRM
3. Identificar ações de follow-up automáticas
4. Agendar próximo contato recomendado
5. Confirmar e salvar registro
