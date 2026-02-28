# Template: Launch Tracker

> Template para tracking de lançamentos de infoprodutos no ClickUp

---

## Estrutura do Lançamento

```yaml
# LAUNCH TRACKER TEMPLATE
# Baseado na Fórmula de Lançamento (PLF)

launch:
  name: "[Nome do Produto] - [Mês/Ano]"
  type: "Semente | Interno | Externo | Perpétuo"
  product: "[Nome do Produto]"
  ticket: "R$ X"
  goal_revenue: "R$ X"
  goal_units: "X unidades"
  launch_date: "[Data]"
  cart_open: "[Data/Hora]"
  cart_close: "[Data/Hora]"
```

---

## Fases do Lançamento

### Fase 1: Pré-Pré-Lançamento (PPL)
**Duração:** 4-6 semanas antes

| Task | Status | Responsável | Prazo |
|------|--------|-------------|-------|
| Definir avatar e dores | ⬜ | PM | [Data] |
| Criar isca digital | ⬜ | Copy | [Data] |
| Configurar página de captura | ⬜ | Dev | [Data] |
| Criar sequência de emails PPL | ⬜ | Copy | [Data] |
| Configurar automações | ⬜ | Automação | [Data] |
| Iniciar captação de leads | ⬜ | Traffic | [Data] |

**Meta de leads:** [X leads]
**Investimento em tráfego:** R$ [X]

### Fase 2: Pré-Lançamento (PL)
**Duração:** 7-10 dias

| Task | Status | Responsável | Prazo |
|------|--------|-------------|-------|
| CPL 1 - Oportunidade | ⬜ | Copy/Video | [Data] |
| CPL 2 - Transformação | ⬜ | Copy/Video | [Data] |
| CPL 3 - Experiência | ⬜ | Copy/Video | [Data] |
| CPL 4 - Oferta (opcional) | ⬜ | Copy/Video | [Data] |
| Emails de CPL | ⬜ | Copy | [Data] |
| Interação em comentários | ⬜ | Social | Diário |
| Live de aquecimento | ⬜ | Expert | [Data] |

**Engajamento esperado:**
- CPL1: [X]% de abertura, [X] comentários
- CPL2: [X]% de abertura, [X] comentários
- CPL3: [X]% de abertura, [X] comentários

### Fase 3: Lançamento (L)
**Duração:** 5-7 dias

| Task | Status | Responsável | Prazo |
|------|--------|-------------|-------|
| Página de vendas finalizada | ⬜ | Copy/Dev | [Data] |
| Checkout configurado | ⬜ | Tech | [Data] |
| Email de abertura | ⬜ | Copy | [Data/Hora] |
| Live de abertura | ⬜ | Expert | [Data/Hora] |
| Emails de carrinho | ⬜ | Copy | Diário |
| Atendimento vendas | ⬜ | Comercial | Integral |
| FAQ atualizado | ⬜ | Suporte | [Data] |
| Email de fechamento | ⬜ | Copy | [Data/Hora] |
| Contagem regressiva | ⬜ | Dev | [Data] |

**Metas diárias:**
| Dia | Meta Vendas | Meta Receita |
|-----|-------------|--------------|
| D1 | [X] | R$ [X] |
| D2 | [X] | R$ [X] |
| D3 | [X] | R$ [X] |
| D4 | [X] | R$ [X] |
| D5 | [X] | R$ [X] |
| D6 | [X] | R$ [X] |
| D7 | [X] | R$ [X] |

### Fase 4: Pós-Lançamento
**Duração:** 1-2 semanas

| Task | Status | Responsável | Prazo |
|------|--------|-------------|-------|
| Email de boas-vindas | ⬜ | Copy | D+1 |
| Onboarding de compradores | ⬜ | Suporte | D+1 |
| Recuperação de boletos | ⬜ | Comercial | D+3 |
| Pesquisa NPS | ⬜ | Sucesso | D+7 |
| Análise de métricas | ⬜ | Dados | D+7 |
| Retrospectiva do time | ⬜ | PM | D+10 |
| Documentação de aprendizados | ⬜ | PM | D+14 |

---

## Dashboard de Métricas

### Leads
```
Leads Capturados: [    ] / [Meta]
Taxa de Conversão Esperada: [X]%
```

### Vendas
```
┌─────────────────────────────────────────────────┐
│ VENDAS ACUMULADAS                               │
├─────────────────────────────────────────────────┤
│ Unidades: [    ] / [Meta]      [  ]% da meta   │
│ Receita:  R$ [    ] / R$ [Meta] [  ]% da meta  │
│ Ticket Médio: R$ [    ]                        │
└─────────────────────────────────────────────────┘
```

### Por Dia
| Dia | Vendas | Receita | Acumulado |
|-----|--------|---------|-----------|
| D1 | | | |
| D2 | | | |
| D3 | | | |
| D4 | | | |
| D5 | | | |
| D6 | | | |
| D7 | | | |

### Fontes de Tráfego
| Fonte | Leads | Vendas | CAC | ROI |
|-------|-------|--------|-----|-----|
| Facebook Ads | | | | |
| Instagram Organic | | | | |
| YouTube | | | | |
| Email List | | | | |
| Afiliados | | | | |

---

## Checklist Final

### Pré-abertura (24h antes)
- [ ] Página de vendas testada em mobile e desktop
- [ ] Checkout testando com cartão real
- [ ] Emails agendados e revisados
- [ ] Time de vendas briefado
- [ ] Suporte preparado com FAQ
- [ ] Automações testadas end-to-end
- [ ] Backup de contingência definido

### Durante (diário)
- [ ] Verificar vendas às 9h, 14h, 18h, 22h
- [ ] Monitorar comentários e DMs
- [ ] Responder dúvidas em < 2h
- [ ] Atualizar dashboard
- [ ] Comunicar status ao time

### Pós-fechamento
- [ ] Desativar página de vendas
- [ ] Enviar email de agradecimento
- [ ] Processar reembolsos pendentes
- [ ] Consolidar números finais
- [ ] Agendar retrospectiva

---

## Contatos de Emergência

| Papel | Nome | Telefone | Quando acionar |
|-------|------|----------|----------------|
| Decisor | [Nome] | [Tel] | Problemas estratégicos |
| Tech Lead | [Nome] | [Tel] | Bugs críticos |
| Hotmart | [Suporte] | [Tel] | Problemas de checkout |

---

*Template v1.0 - Project Management ClickUp Squad*
