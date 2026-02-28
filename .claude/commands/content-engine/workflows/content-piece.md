# Workflow: Content Piece (Post Estático / Frase-Tese)

## Metadata
- id: content-piece
- version: 1.0.0
- type: multi-agent
- estimated_time: 30-45 min
- agents_involved: [@eugene-schwartz, @nicolas-cole, @dan-koe, @devil-advocate, @oraculo-torriani]

## Propósito

Criar uma peça de conteúdo estática (frase-tese, opinião, reflexão) com debate obrigatório e validação Torriani. Segue o pipeline completo: diagnóstico → produção com debate → validação.

## Quando Usar

- Post estático para Instagram feed
- Frase-tese forte (opinião polarizada)
- Reflexão com CTA leve
- LinkedIn post de autoridade

## Inputs

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| tema | string | sim | Tema ou ângulo do post |
| plataforma | string | sim | Instagram, LinkedIn, etc. |
| anc_tag | string | sim | Attract, Nurture ou Convert |
| contexto | string | não | Contexto do sprint semanal ou momento |
| tom | string | não | Tom específico (reflexivo, provocativo, confessional) |

## Fases

### Fase 1: DIAGNÓSTICO (5 min)
- **Agente**: @eugene-schwartz
- **Ações**:
  1. Determinar nível de awareness do público para o tema
  2. Determinar nível de sofisticação do mercado
  3. Recomendar ângulo de abordagem
- **Output**: diagnostico (awareness level + sophistication + ângulo)
- **Gate**: QG-002 (blocking)

### Fase 2: DEBATE — Duas Versões (15 min)
- **Agente A**: @nicolas-cole (Headline Engineering + Atomic Essay)
- **Agente B**: @dan-koe (Art of Focus + Content Philosophy)
- **Ações**:
  1. Ambos recebem o mesmo brief + diagnóstico
  2. Agente A produz versão com foco em craft e headline
  3. Agente B produz versão com foco em filosofia e profundidade
  4. Trabalham sem ver o trabalho um do outro
- **Output**: versao_a, versao_b
- **Regra**: Abordagens DEVEM ser diferentes

### Fase 3: DEVIL'S ADVOCATE (10 min)
- **Agente**: @devil-advocate
- **Ações**:
  1. Aplicar Teste da Substituição em ambas
  2. Aplicar Teste do Dado em ambas
  3. Aplicar Teste do Scroll em ambas
  4. Produzir relatório com forças e fraquezas
- **Output**: relatorio_debate

### Fase 4: CONSOLIDAÇÃO (5 min)
- **Agente**: @nicolas-cole (consolidador padrão para frases estáticas)
- **Ações**:
  1. Selecionar melhor headline entre as duas versões
  2. Integrar defesas do Devil's Advocate
  3. Produzir versão consolidada
- **Output**: versao_consolidada

### Fase 5: VALIDAÇÃO TORRIANI (5 min)
- **Agente**: @oraculo-torriani
- **Ações**:
  1. Executar Validador Master (5 critérios)
  2. Emitir score final
- **Output**: veredito_final
- **Gate**: QG-004 (mín 7/10 para social)

## Regras de Iteração

| Cenário | Ação |
|---------|------|
| Torriani aprova (>= 7/10) | Conteúdo aprovado. Gerar PNG. |
| Torriani reprova (1a vez) | Volta para Fase 4 com feedback. |
| Torriani reprova (2a vez) | Volta para Fase 4 com feedback refinado. |
| Torriani reprova (3a vez) | ESCALAR para Tiago. |

**Limite de iterações**: máximo 2 rodadas de correção (3 submissões totais). Na 3a reprovação, decisão humana.

## Outputs

| Entregável | Formato | Descrição |
|------------|---------|-----------|
| versao_consolidada | markdown | Copy final do post |
| render_batch | JSON | Batch para render.ts (template: static-post) |
| veredito_final | markdown | Score e feedback do Torriani |

## Integração com Render

Após aprovação, gerar JSON batch usando template `static-post`:

```json
[
  {
    "template": "static-post",
    "data": {
      "BG_COLOR": "#14213D",
      "TEXT_COLOR": "#FFFFFF",
      "BODY_COLOR": "rgba(255,255,255,0.7)",
      "MUTED_COLOR": "rgba(255,255,255,0.4)",
      "HEADLINE": "[frase-tese aprovada]",
      "BODY": "[complemento se houver]",
      "AUTHOR": "@tiagoalmeidaoficial"
    },
    "out": "semana-N/static-X/01-frase-tese.png"
  }
]
```

## Quality Gates

- [ ] Diagnóstico Schwartz realizado antes da produção
- [ ] Duas versões produzidas independentemente
- [ ] Devil's Advocate aplicou os 3 testes
- [ ] Consolidação guiada pelo relatório do Devil's Advocate
- [ ] Torriani validou com score >= 7/10
- [ ] Máximo 2 iterações respeitado
- [ ] JSON batch gerado com template correto
