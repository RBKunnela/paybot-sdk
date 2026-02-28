# Template: CRM Deal

> Template para registro de deals/oportunidades no CRM do ClickUp

---

## Estrutura do Deal

```yaml
# CRM DEAL TEMPLATE
# Para pipeline de vendas no ClickUp

deal:
  name: "[Nome do Lead] - [Produto de Interesse]"
  value: "R$ [Valor]"
  stage: "Lead | Qualificado | Proposta | Negociação | Fechado Ganho | Fechado Perdido"
  probability: "[X]%"
  expected_close: "[Data]"
  owner: "[Vendedor responsável]"
```

---

## Informações do Lead

### Dados Básicos
| Campo | Valor |
|-------|-------|
| Nome completo | |
| Email | |
| WhatsApp | |
| Instagram | |
| Cidade/Estado | |

### Dados de Qualificação
| Campo | Valor |
|-------|-------|
| Origem do lead | [Ads / Orgânico / Indicação / Evento] |
| Produto de interesse | |
| Ticket potencial | R$ |
| Temperatura | 🔥 Quente / 🟡 Morno / 🔵 Frio |
| Budget disponível | Sim / Não / A verificar |
| Timing | Imediato / 30 dias / 60 dias / Indefinido |

### BANT
- **Budget:** [Tem orçamento?]
- **Authority:** [É o decisor?]
- **Need:** [Qual a dor/necessidade?]
- **Timeline:** [Prazo para decidir?]

---

## Histórico de Interações

### Template de Registro

```
📅 [Data] - [Tipo: WhatsApp/Ligação/Email/Reunião]
👤 [Quem interagiu]

📝 Resumo:
[O que foi conversado]

📌 Próximos passos:
[O que ficou combinado]

📊 Temperatura após interação: [🔥/🟡/🔵]
```

### Interações
| Data | Tipo | Resumo | Próximo Passo |
|------|------|--------|---------------|
| | | | |
| | | | |
| | | | |

---

## Pipeline Stages

### 1. Lead (0%)
**Critérios de entrada:**
- Cadastro na landing page
- Mensagem no WhatsApp
- Interação no Instagram

**Ações:**
- [ ] Enviar mensagem de boas-vindas
- [ ] Qualificar interesse inicial

### 2. Qualificado (25%)
**Critérios de entrada:**
- BANT verificado
- Interesse confirmado
- Orçamento compatível

**Ações:**
- [ ] Agendar call de descoberta
- [ ] Enviar material de apoio

### 3. Proposta (50%)
**Critérios de entrada:**
- Necessidades mapeadas
- Solução apresentada
- Proposta enviada

**Ações:**
- [ ] Preparar proposta personalizada
- [ ] Enviar e agendar follow-up

### 4. Negociação (75%)
**Critérios de entrada:**
- Proposta em análise
- Objeções sendo tratadas
- Decisão pendente

**Ações:**
- [ ] Tratar objeções
- [ ] Negociar termos
- [ ] Facilitar decisão

### 5. Fechado Ganho (100%)
**Critérios de entrada:**
- Pagamento confirmado
- Contrato assinado (se aplicável)

**Ações:**
- [ ] Celebrar! 🎉
- [ ] Iniciar onboarding
- [ ] Registrar fonte e aprendizados

### 6. Fechado Perdido (0%)
**Critérios de entrada:**
- Lead recusou
- Não respondeu após X tentativas
- Comprou do concorrente

**Ações:**
- [ ] Registrar motivo da perda
- [ ] Mover para lista de nutrição
- [ ] Agendar recontato futuro (se aplicável)

---

## Objeções Comuns e Respostas

### "Está caro"
**Resposta sugerida:**
> [Inserir resposta padrão do squad comercial]

### "Preciso pensar"
**Resposta sugerida:**
> [Inserir resposta padrão]

### "Não é o momento"
**Resposta sugerida:**
> [Inserir resposta padrão]

---

## Custom Fields para ClickUp

| Campo | Tipo | Opções |
|-------|------|--------|
| Valor do Deal | Currency | - |
| Stage | Dropdown | Lead, Qualificado, Proposta, Negociação, Ganho, Perdido |
| Origem | Dropdown | Ads FB, Ads Google, Orgânico IG, Indicação, Evento |
| Temperatura | Dropdown | Quente, Morno, Frio |
| Produto | Dropdown | [Lista de produtos] |
| Vendedor | People | [Time de vendas] |
| Próximo contato | Date | - |
| Motivo da perda | Dropdown | Preço, Timing, Concorrente, Não respondeu, Outros |

---

## Automações Sugeridas

1. **Lead criado** → Notificar vendedor + criar task de qualificação
2. **Stage = Proposta** → Criar task de follow-up em 3 dias
3. **Sem atividade em 7 dias** → Alerta para vendedor
4. **Fechado Ganho** → Notificar onboarding + atualizar métricas
5. **Fechado Perdido** → Mover para lista de recontato + registrar motivo

---

## Métricas do Deal

| Métrica | Valor |
|---------|-------|
| Tempo no pipeline | [X] dias |
| Número de touchpoints | [X] |
| Conversão de stage | [%] |

---

*Template v1.0 - Project Management ClickUp Squad*
