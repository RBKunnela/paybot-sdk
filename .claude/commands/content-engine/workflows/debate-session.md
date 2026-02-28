# Workflow: Debate Session

## Metadata
- id: debate-session
- version: 1.0.0
- type: multi-agent
- estimated_time: 30-45 min
- agents_involved: [varia por tipo de conteudo + @devil-advocate + @nicolas-cole + @oraculo-torriani]

## Proposito
Garantir que todo conteudo de alto impacto passe por debate estruturado entre multiplos agentes antes da publicacao. Tres perspectivas criativas + um ataque de qualidade + uma validacao final = conteudo robusto e anti-generico.

## Quando Aplicar

| Tipo de Conteudo | Debate | Formato |
|-----------------|--------|---------|
| Feed posts | OBRIGATORIO | Debate completo (3 opinicoes) |
| Carrosseis | OBRIGATORIO | Debate completo (3 opinicoes) |
| Reels | OBRIGATORIO | Debate completo (3 opinicoes) |
| Stories | NAO | Producao direta (1 agente + checklist) |
| Adaptacoes mid-week | PARCIAL | Debate rapido (2 opinicoes + devil's advocate) |

## Pares de Agentes por Tipo de Conteudo

| Tipo | Agente A | Agente B |
|------|----------|----------|
| Copy de carrossel | @nicolas-cole | @alex-hormozi |
| Script de reel | @george-blackman | @nicolas-cole |
| Frase estatica | @nicolas-cole | @dan-koe |
| Landing page / email | @joanna-wiebe | @stefan-georgi |

## Inputs

| Campo | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| tema | string | sim | Tema do conteudo a ser produzido |
| formato | string | sim | Tipo de conteudo (carrossel, reel, post, email, landing) |
| plataforma | string | sim | Plataforma alvo (Instagram, LinkedIn, YouTube, etc.) |
| anc_tag | string | sim | Tag do funil ANC — Attract, Nurture ou Convert |
| brief | object | sim | Brief completo com contexto, publico, objetivo |
| sprint_context | object | nao | Contexto do sprint semanal (tema da semana, emocional arc) |

## Fases

### Fase 1: BRIEF (5 min)
- **Responsavel**: Quem ativa o workflow (lead ou agente designado)
- **Acoes**:
  1. Definir tema, formato e plataforma
  2. Definir tag ANC (Attract / Nurture / Convert)
  3. Estabelecer contexto do sprint (se aplicavel)
  4. Distribuir brief para Agente A e Agente B simultaneamente
- **Output**: brief_completo
- **Regra**: O brief deve ser identico para ambos os agentes — mesma informacao, sem vantagem

### Fase 2: AGENTE A — Versao 1 (10 min)
- **Agente**: Definido pela tabela de pares (coluna Agente A)
- **Inputs**: brief_completo
- **Acoes**:
  1. Produzir versao completa (copy + direcao de arte, se aplicavel)
  2. Aplicar seus frameworks nativos ao conteudo
  3. Entregar versao pronta para debate
- **Output**: versao_a (copy completa + art direction)
- **Regra**: Agente A trabalha sem ver o trabalho de Agente B

### Fase 3: AGENTE B — Versao Alternativa (10 min)
- **Agente**: Definido pela tabela de pares (coluna Agente B)
- **Inputs**: brief_completo (mesmo que Agente A)
- **Acoes**:
  1. Produzir versao alternativa com abordagem diferente
  2. Aplicar seus frameworks nativos (diferentes de A)
  3. Entregar versao pronta para debate
- **Output**: versao_b (copy completa + art direction)
- **Regra**: Agente B trabalha sem ver o trabalho de Agente A. A abordagem DEVE ser diferente — se A foi emocional, B vai analitico; se A foi storytelling, B vai dados.

### Fase 4: DEVIL'S ADVOCATE — Ataque (10 min)
- **Agente**: @devil-advocate
- **Inputs**: versao_a, versao_b, brief_completo
- **Acoes**:
  1. Aplicar Teste da Substituicao em ambas as versoes
  2. Aplicar Teste do Dado em ambas as versoes
  3. Aplicar Teste do Scroll em ambas as versoes
  4. Mapear fraquezas de cada versao com severidade
  5. Identificar o que eh forte em cada versao
  6. Produzir relatorio de debate com recomendacao de consolidacao
- **Output**: relatorio_debate (scores, fraquezas, forcas, recomendacao)
- **Perguntas obrigatorias**:
  - "O que eh fraco e generico em cada versao?"
  - "O que falta de dados/evidencias?"
  - "Qual hook para o scroll de verdade?"
  - "Qual versao tem mais especificidade?"
  - "O que pegar de A e o que pegar de B?"
- **Regra**: Atacar AMBAS igualmente. Sem favoritos. Fraqueza eh fraqueza.

### Fase 5: CONSOLIDACAO — Smart Merge (10 min)
- **Agente**: @nicolas-cole (consolidador padrao)
- **Inputs**: versao_a, versao_b, relatorio_debate
- **Acoes**:
  1. Ler relatorio do Devil's Advocate
  2. Selecionar o melhor hook entre as duas versoes
  3. Selecionar o melhor corpo entre as duas versoes
  4. Integrar as defesas recomendadas pelo Devil's Advocate
  5. Produzir versao consolidada final
- **Output**: versao_consolidada (copy final + art direction)
- **Regra**: A consolidacao pega o MELHOR de cada versao, nao eh uma media. Hook de A + corpo de B eh valido. O relatorio do Devil's Advocate guia o que manter e o que descartar.

### Fase 6: VALIDACAO TORRIANI (5 min)
- **Agente**: @oraculo-torriani
- **Inputs**: versao_consolidada
- **Acoes**:
  1. Executar Validador Master (5 criterios nao-negociaveis)
  2. Se Master aprovar: executar Checkpoints relevantes
  3. Emitir score final
- **Output**: veredito_final (aprovado/reprovado + score + feedback)
- **Regra**: Score minimo para aprovacao = 8/10 media geral. Abaixo disso, volta para iteracao.

## Regras de Iteracao

| Cenario | Acao |
|---------|------|
| Torriani aprova (>= 8/10) | Conteudo aprovado. Vai para publicacao. |
| Torriani reprova (1a vez) | Volta para Fase 5 (Consolidacao) com feedback. |
| Torriani reprova (2a vez) | Volta para Fase 5 com feedback refinado. Ultima tentativa. |
| Torriani reprova (3a vez) | ESCALAR para Tiago (decisao humana). Nao iterar mais. |

**Limite de iteracoes**: maximo 2 rodadas de correcao (ou seja, 3 submissoes totais: 1 original + 2 revisoes). Na 3a reprovacao consecutiva, eh decisao humana (escalar para Tiago).

## Tempo Maximo

| Debate completo | 30-45 min |
|----------------|-----------|
| Debate rapido (mid-week) | 15-25 min |

Se ultrapassar o tempo, o lead decide: publicar a melhor versao disponivel ou escalar.

## Outputs

| Entregavel | Formato | Descricao |
|------------|---------|-----------|
| versao_a | markdown | Versao do Agente A |
| versao_b | markdown | Versao do Agente B |
| relatorio_debate | markdown | Analise do Devil's Advocate |
| versao_consolidada | markdown | Versao final apos merge |
| veredito_final | markdown | Aprovacao/reprovacao do Torriani |
| decision_log | markdown | Registro de decisoes para o tracker |

## Quality Gates

- [ ] Brief identico enviado para ambos os agentes
- [ ] Agente A e Agente B trabalharam sem ver o trabalho um do outro
- [ ] Devil's Advocate aplicou os 3 testes em ambas as versoes
- [ ] Consolidacao usou o relatorio do Devil's Advocate como guia
- [ ] Torriani validou a versao consolidada
- [ ] Score minimo >= 8/10 atingido (ou escalado para humano)
- [ ] Maximo 2 iteracoes respeitado
- [ ] Tempo total <= 45 min

## Debate Rapido (Mid-Week)

Versao simplificada para adaptacoes mid-week:

1. **BRIEF**: Mesmo formato, com contexto da adaptacao
2. **2 AGENTES**: Apenas 2 agentes relevantes (sem par obrigatorio)
3. **DEVIL'S ADVOCATE**: Ataque focado — pergunta principal: "Por que NAO mudar?" (prevenir reacao exagerada)
4. **CONSOLIDACAO**: Merge rapido pelo agente mais relevante
5. **SEM TORRIANI**: Validacao simplificada pelo lead do sprint

Tempo maximo: 15-25 min.
