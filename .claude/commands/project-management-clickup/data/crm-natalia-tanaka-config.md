# CRM Natália Tanaka - Configuração Completa

## Visão Geral do Negócio

### Ecossistema de Produtos

| Categoria | Produto | Ticket | Modelo de Venda |
|-----------|---------|--------|-----------------|
| **Front-end** | Manual dos Pontos Gatilhos | Low | Tráfego Pago → Checkout |
| **Order Bump** | Protocolos de Atendimento: 12 Casos Clínicos | Low | Checkout (bump) |
| **Upsell 1** | A Fórmula do Sucesso | Mid | Pós-compra |
| **Upsell 2** | Método Agenda Mágica | Mid | Pós Fórmula do Sucesso |
| **Downsell** | Manual de Pós Operatório na Massoterapia | Low | Para quem não comprou Fórmula |
| **Back-end** | Método Cura Pelas Mãos | High | Lançamentos bimestrais |
| **High-Ticket** | Mentoria MAV | Premium | Aplicação + Call de Vendas |

### Tickets e Preços Estimados

| Nível | Produto | Preço | Tipo |
|-------|---------|-------|------|
| Low Ticket | Manual dos Pontos Gatilhos | ~R$ 47-97 | Entrada |
| Low Ticket | Protocolos (Order Bump) | ~R$ 27-47 | Complemento |
| Low Ticket | Manual Pós Operatório (Downsell) | ~R$ 29-47 | Recuperação |
| Mid Ticket | A Fórmula do Sucesso | ~R$ 297-497 | Upsell |
| Mid Ticket | Método Agenda Mágica | ~R$ 197-397 | Upsell 2 |
| High Ticket | Método Cura Pelas Mãos | ~R$ 1.997-2.997 | Core |
| Premium | Mentoria MAV | R$ 10.997 | High Ticket |

### Avatar Principal: Ana Massoterapeuta

- **Gênero:** 80% mulheres
- **Idade:** 35-54 anos (principal), 25-34 (secundário)
- **Renda atual:** R$ 1.500 - R$ 4.000/mês
- **Objetivo:** R$ 5.000 - R$ 15.000/mês
- **Dor principal:** Insegurança técnica + renda baixa

---

## Estrutura do CRM no ClickUp

### Space: 💰 COMERCIAL

```
💰 COMERCIAL
│
├── 📂 Folder: Pipeline de Vendas
│   ├── 📋 List: 🎯 Leads (Geral)
│   │   └── Todos os leads novos entram aqui
│   │
│   ├── 📋 List: 🛒 Low Ticket (Funil Perpétuo)
│   │   └── Leads do funil de front-end
│   │
│   ├── 📋 List: 📈 Upsell/Cross-sell
│   │   └── Clientes para ofertas adicionais
│   │
│   ├── 📋 List: 🚀 Lançamento (MCPM)
│   │   └── Leads dos lançamentos bimestrais
│   │
│   └── 📋 List: 💎 High Ticket (Mentoria MAV)
│       └── Aplicações para mentoria
│
├── 📂 Folder: Clientes
│   ├── 📋 List: 👥 Base de Clientes
│   │   └── Todos os clientes ativos
│   │
│   ├── 📋 List: 🌟 Clientes VIP
│   │   └── Compraram múltiplos produtos
│   │
│   └── 📋 List: 🔄 Recompra/Renovação
│       └── Oportunidades de nova venda
│
├── 📂 Folder: Perdidos & Nurture
│   ├── 📋 List: ❌ Não Convertidos
│   │   └── Para análise de motivos
│   │
│   └── 📋 List: 🌱 Nurture (Longo Prazo)
│       └── Leads para nutrição contínua
│
└── 📋 List: 📊 Dashboard & Métricas
    └── Resumo executivo de vendas
```

---

## Statuses por Pipeline

### 🎯 Leads (Geral)
```
📥 Novo Lead
🔍 Em Qualificação
🎯 Qualificado (Low)
📈 Qualificado (Mid/High)
➡️ Movido para Pipeline
❌ Desqualificado
```

### 🛒 Low Ticket (Funil Perpétuo)
```
📥 Capturado
🔥 Engajado (abriu email/clicou)
🛒 Iniciou Checkout
💳 Pagamento Pendente (boleto)
✅ Comprou
📈 Upsell Oferecido
✅ Aceitou Upsell
❌ Recusou Upsell
```

### 🚀 Lançamento (MCPM)
```
📥 Lista de Espera
🔥 CPL 1 (Assistiu)
🔥 CPL 2 (Assistiu)
🔥 CPL 3 (Assistiu)
🚀 Carrinho Aberto
💳 Iniciou Checkout
💰 Comprou
❌ Não Comprou
🔄 Remarketing
```

### 💎 High Ticket (Mentoria MAV)
```
📥 Aplicação Recebida
🤖 Triagem IA
✅ Qualificado
📅 Call Agendada
📞 Call Realizada
📝 Proposta Enviada
🤝 Em Negociação
💰 Fechado
❌ Não Fechou
🔄 Nurture (não é o momento)
```

---

## Custom Fields

### Campos Universais (Todas as Lists)

| Campo | Tipo | Opções | Obrigatório |
|-------|------|--------|-------------|
| **Nome** | Text | - | Sim |
| **Email** | Email | - | Sim |
| **WhatsApp** | Phone | - | Sim |
| **Origem** | Dropdown | Ver abaixo | Sim |
| **Produto de Interesse** | Dropdown | Ver abaixo | Não |
| **Data de Entrada** | Date | Auto | Sim |
| **Responsável** | People | Squad Comercial | Não |

### Opções de Origem
```
📱 Tráfego Pago - Meta
📱 Tráfego Pago - Google
🎬 YouTube Orgânico
📸 Instagram Orgânico
🚀 Lançamento MCPM
🔄 Funil Perpétuo
👥 Indicação
📧 Email Marketing
💬 WhatsApp Direto
📱 Direct Instagram
🎯 Lead Magnet
```

### Opções de Produto de Interesse
```
📕 Manual dos Pontos Gatilhos
📗 Protocolos de Atendimento
📘 A Fórmula do Sucesso
📙 Método Agenda Mágica
📒 Manual Pós Operatório
🎓 Método Cura Pelas Mãos
💎 Mentoria MAV
❓ Não definido
```

### Campos de Low Ticket

| Campo | Tipo | Opções |
|-------|------|--------|
| **Etapa do Funil** | Dropdown | Lead Magnet, Página de Vendas, Checkout |
| **Order Bump** | Checkbox | Sim/Não |
| **Upsell Aceito** | Dropdown | Nenhum, Fórmula do Sucesso, Agenda Mágica |
| **Valor Total Compra** | Currency | - |
| **ID Hotmart** | Text | - |

### Campos de Lançamento

| Campo | Tipo | Opções |
|-------|------|--------|
| **Lançamento** | Dropdown | MCPM [Mês/Ano] |
| **CPLs Assistidos** | Checkbox Multiple | CPL1, CPL2, CPL3 |
| **Presença em Lives** | Number | 0-10 |
| **Engajamento Score** | Number | 0-100 |
| **Grupo WhatsApp** | Checkbox | Sim/Não |

### Campos de High Ticket (Mentoria MAV)

| Campo | Tipo | Opções |
|-------|------|--------|
| **Score IA** | Number | 0-100 |
| **Fit Score** | Dropdown | 🟢 Ideal, 🟡 Bom, 🔴 Baixo |
| **Data da Aplicação** | Date | - |
| **Data da Call** | Date | - |
| **Closer Responsável** | People | - |
| **Objeção Principal** | Dropdown | Ver abaixo |
| **Proposta Valor** | Currency | R$ 10.997 |
| **Forma de Pagamento** | Dropdown | À vista, Parcelado 12x, Parcelado 6x |
| **Motivo Não Fechou** | Dropdown | Ver abaixo |

### Objeções Comuns (High Ticket)
```
💰 Preço / Não tenho dinheiro
⏰ Timing / Não é o momento
🤔 Preciso pensar
👥 Preciso consultar alguém
📚 Já fiz outros cursos
❓ Dúvida sobre resultado
🏠 Mercado local / Cidade pequena
```

### Motivos de Não Fechamento
```
💰 Preço
⏰ Timing
🏆 Concorrência
🚫 Não qualificado
📵 Sem resposta
🔄 Desistiu
❓ Outro
```

---

## Automações

### Low Ticket (Funil Perpétuo)

```yaml
# Automação 1: Lead capturado
WHEN: Task created in List "Low Ticket"
THEN:
  - Set status TO "Capturado"
  - Add to ActiveCampaign automation (via webhook)
  - Notify squad comercial

# Automação 2: Iniciou Checkout
WHEN: Status changes TO "Iniciou Checkout"
AND: Status unchanged for 1 hour
THEN:
  - Trigger WhatsApp (ManyChat) - Recuperação de carrinho
  - Set priority TO "Alta"

# Automação 3: Pagamento Pendente (Boleto)
WHEN: Status changes TO "Pagamento Pendente"
THEN:
  - Create reminder for D+1, D+2, D+3
  - Trigger email sequence (ActiveCampaign)

# Automação 4: Compra confirmada
WHEN: Status changes TO "Comprou"
THEN:
  - Move to "Upsell Oferecido"
  - Update "Valor Total Compra"
  - Add tag in ActiveCampaign: "cliente"

# Automação 5: Upsell tracking
WHEN: Status changes TO "Aceitou Upsell"
THEN:
  - Update "Upsell Aceito" field
  - Update "Valor Total Compra"
  - Check if eligible for next upsell
```

### Lançamento (MCPM)

```yaml
# Automação 1: Lista de espera
WHEN: Task created in List "Lançamento"
WITH: Origem = "Lançamento MCPM"
THEN:
  - Set status TO "Lista de Espera"
  - Add to launch sequence (ActiveCampaign)

# Automação 2: Engajamento tracking
WHEN: Custom field "CPLs Assistidos" changes
THEN:
  - Calculate "Engajamento Score"
  - If score >= 70: Set priority TO "Alta"

# Automação 3: Carrinho aberto
WHEN: Status changes TO "Carrinho Aberto"
AND: Engajamento Score >= 50
THEN:
  - Notify closer
  - Trigger WhatsApp sequence

# Automação 4: Não comprou (fim do lançamento)
WHEN: Status changes TO "Não Comprou"
THEN:
  - Move to "Remarketing"
  - Schedule follow-up for próximo lançamento
```

### High Ticket (Mentoria MAV)

```yaml
# Automação 1: Nova aplicação
WHEN: Task created in List "High Ticket"
THEN:
  - Set status TO "Aplicação Recebida"
  - Trigger triagem IA (webhook)
  - Notify @rafael

# Automação 2: Após triagem IA
WHEN: Custom field "Score IA" is set
THEN:
  - IF Score >= 70: Set status TO "Qualificado", Set "Fit Score" TO "Ideal"
  - IF Score 50-69: Set status TO "Qualificado", Set "Fit Score" TO "Bom"
  - IF Score < 50: Set status TO "Nurture", Set "Fit Score" TO "Baixo"

# Automação 3: Agendar call
WHEN: Status changes TO "Qualificado"
THEN:
  - Notify closer
  - Send WhatsApp com link de agendamento
  - Set due date TO 48 hours

# Automação 4: Lembrete de call
WHEN: Custom field "Data da Call" is tomorrow
THEN:
  - Send WhatsApp reminder (lead)
  - Notify closer
  - Create checklist "Preparação para Call"

# Automação 5: Pós-call follow-up
WHEN: Status changes TO "Call Realizada"
AND: No activity for 24 hours
THEN:
  - Notify closer "Enviar proposta?"
  - Set priority TO "Alta"

# Automação 6: Follow-up de proposta
WHEN: Status = "Proposta Enviada"
AND: No activity for 3 days
THEN:
  - Notify closer "Follow-up de proposta"
  - Trigger WhatsApp follow-up

# Automação 7: Deal fechado
WHEN: Status changes TO "Fechado"
THEN:
  - Notify @rafael and @natalia "🎉 Nova venda MAV!"
  - Update dashboard metrics
  - Trigger onboarding sequence
  - Move to "Clientes VIP"

# Automação 8: Não fechou
WHEN: Status changes TO "Não Fechou"
THEN:
  - Require "Motivo Não Fechou"
  - Schedule nurture for 30 days
  - Move to "Nurture"
```

---

## Views Essenciais

### 💰 Pipeline Principal (Kanban)
- **Tipo:** Board
- **Group by:** Status
- **Filter:** List in [Low Ticket, Lançamento, High Ticket]
- **Show:** Nome, Origem, Valor

### 📞 Follow-ups Hoje
- **Tipo:** List
- **Filter:** Due Date = Today
- **Sort:** Priority (desc), Due Time (asc)
- **Show:** Nome, WhatsApp, Último contato, Próxima ação

### 🔥 Hot Leads
- **Tipo:** List
- **Filter:**
  - (Engajamento Score >= 70) OR
  - (Fit Score = Ideal) OR
  - (Status = Iniciou Checkout)
- **Sort:** Engajamento Score (desc)

### 💎 Pipeline High Ticket
- **Tipo:** Board
- **Filter:** List = "High Ticket"
- **Group by:** Status
- **Show:** Nome, Fit Score, Data Call, Closer

### 💵 Forecast de Vendas
- **Tipo:** List
- **Filter:** Status in [Proposta Enviada, Em Negociação, Fechamento]
- **Show:** Nome, Valor, Probabilidade, Valor Ponderado
- **Sum:** Valor Ponderado

### 📊 Por Origem
- **Tipo:** Board
- **Group by:** Origem
- **Show:** Count, Valor total por grupo
- **Filter:** Date >= This Month

### 🛒 Carrinhos Abandonados
- **Tipo:** List
- **Filter:** Status = "Iniciou Checkout" AND Status unchanged for > 1 hour
- **Sort:** Date (desc)
- **Show:** Nome, WhatsApp, Produto, Tempo no checkout

### 📈 Clientes para Upsell
- **Tipo:** List
- **Filter:**
  - Status = "Comprou" AND
  - Upsell Aceito = "Nenhum"
- **Sort:** Valor Total (desc)

---

## Integrações

### ActiveCampaign

**Sincronização:**
- Lead criado no ClickUp → Criar/atualizar contato no AC
- Lead comprou → Adicionar tag "cliente" + produto específico
- Lead no Nurture → Adicionar a automação de nutrição

**Tags importantes:**
- `lead`
- `cliente`
- `cliente_[produto]`
- `lançamento_[mês/ano]`
- `high_ticket_interesse`
- `mentoria_mav`

**Automations a conectar:**
- Sequência de boas-vindas
- Sequência de carrinho abandonado
- Sequência de lançamento (PPL, PL, Carrinho)
- Sequência de nutrição
- Sequência de upsell

### WhatsApp (WAHA + ManyChat)

**Triggers do ClickUp:**
- Carrinho abandonado → Mensagem de recuperação
- Call agendada → Confirmação + lembrete
- Proposta enviada → Mensagem de acompanhamento
- Boleto gerado → Lembretes D+1, D+2, D+3

**Fluxos ManyChat:**
1. Captura de lead (Instagram)
2. Qualificação automática
3. Recuperação de carrinho
4. Follow-up pós-call
5. Suporte básico

### Hotmart

**Webhooks:**
- `purchase.approved` → Criar/atualizar task como "Comprou"
- `purchase.canceled` → Atualizar para "Cancelado"
- `purchase.refunded` → Atualizar para "Reembolso"
- `purchase.billet_printed` → Atualizar para "Pagamento Pendente"

**Dados a sincronizar:**
- ID da transação
- Produto comprado
- Valor
- Forma de pagamento
- Order bumps/upsells

### Instagram Direct

**Via ManyChat:**
- DMs com palavras-chave → Criar lead no ClickUp
- Respostas a stories → Capturar interesse
- Comentários em posts → Iniciar conversa

---

## Métricas e KPIs

### Dashboard Semanal

| Métrica | Fórmula | Meta |
|---------|---------|------|
| Leads novos | Count(status = Novo) | - |
| Taxa de qualificação | Qualificados / Leads novos | > 30% |
| Taxa de checkout | Iniciou Checkout / Qualificados | > 20% |
| Taxa de conversão | Comprou / Iniciou Checkout | > 5% (low), > 30% (high) |
| Ticket médio | Receita / Vendas | R$ 200+ |
| CAC | Investimento Ads / Clientes | < R$ 50 (low) |
| LTV | Receita total por cliente | > R$ 500 |

### Dashboard de Lançamento

| Métrica | Meta |
|---------|------|
| Leads na lista | 5.000+ |
| Taxa de abertura emails | > 40% |
| CPL 1 views | > 50% da lista |
| CPL 2 views | > 40% da lista |
| CPL 3 views | > 30% da lista |
| Conversão carrinho | > 3% |
| Faturamento total | [definir por lançamento] |

### Dashboard High Ticket (Mentoria MAV)

| Métrica | Meta |
|---------|------|
| Aplicações/mês | 30+ |
| Taxa de qualificação | > 50% |
| Taxa de show (calls) | > 80% |
| Taxa de proposta | > 60% |
| Taxa de fechamento | > 30% |
| Ticket médio | R$ 10.997 |
| Ciclo de venda | < 14 dias |

---

## Equipe e Responsabilidades

### Rafael (Estrategista)
- Visão geral do pipeline
- Análise de métricas
- Decisões estratégicas
- Aprovação de propostas especiais

### Closer (Mentoria MAV)
- Ligações de vendas
- Follow-up de propostas
- Negociação
- Fechamento

### Squad Comercial (@comercial-natalia-tanaka)
- Atendimento inicial
- Qualificação de leads
- Follow-up low/mid ticket
- Suporte pré-venda

### Triagem IA
- Análise de aplicações
- Score de qualificação
- Pré-qualificação automática
- Agendamento inteligente

---

## Próximos Passos

1. [ ] Criar Space COMERCIAL no ClickUp
2. [ ] Configurar Lists e Statuses
3. [ ] Adicionar Custom Fields
4. [ ] Criar Views essenciais
5. [ ] Configurar automações básicas
6. [ ] Integrar com ActiveCampaign (webhook)
7. [ ] Integrar com Hotmart (webhook)
8. [ ] Configurar ManyChat para WhatsApp
9. [ ] Treinar equipe no uso do CRM
10. [ ] Definir processo de triagem IA para MAV
