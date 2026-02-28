---
task: Planejamento da Transicao 2026-2033
responsavel: "@planejamento"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - tipo_empresa: MEI ou Simples Nacional
  - atividade: Atividade principal
  - faturamento: Faturamento atual e projetado
  - prioridades: Prioridades do empresario (custo, simplicidade, creditos)
Saida: |
  - roadmap: Roadmap de transicao 2026-2033
  - acoes_por_fase: Acoes recomendadas em cada fase
  - marcos_criticos: Marcos criticos e datas-chave
  - investimentos: Investimentos necessarios (sistemas, capacitacao)
Checklist:
  - "[ ] Mapear situacao atual da empresa"
  - "[ ] Detalhar fases da transicao tributaria (2026-2033)"
  - "[ ] Identificar acoes necessarias em cada fase"
  - "[ ] Marcar datas-chave e marcos criticos"
  - "[ ] Estimar investimentos em sistemas e capacitacao"
  - "[ ] Elaborar roadmap visual da transicao"
---

# *transicao-2026

Elabora roadmap completo para a transicao tributaria 2026-2033 (Reforma Tributaria — IBS/CBS), personalizado para o perfil da empresa.

## Uso

```
@planejamento
*transicao-2026
```

## Contexto 2026

Cronograma da Reforma Tributaria:
- **2026**: Inicio dos testes IBS/CBS. MEI/Simples dispensados de campos novos na NF-e
- **2027**: Obrigatoriedade de campos IBS/CBS na NF-e para todos
- **2028-2029**: Reducao gradual de PIS/COFINS, aumento de CBS
- **2030-2032**: Reducao gradual de ICMS/ISS, aumento de IBS
- **2033**: Extincao completa de PIS/COFINS/ICMS/ISS/IPI

## Flow

1. Diagnosticar situacao atual da empresa
2. Mapear cada fase da transicao e seu impacto especifico
3. Identificar acoes por fase:
   - 2026: Atualizar sistemas, capacitar equipe, monitorar regulamentacao
   - 2027: Implementar campos IBS/CBS na NF-e
   - 2028-2032: Adaptar apuracao conforme reducao/aumento gradual
   - 2033: Operar integralmente no novo modelo
4. Definir marcos criticos e datas-chave
5. Estimar investimentos necessarios
6. Consolidar em roadmap visual
