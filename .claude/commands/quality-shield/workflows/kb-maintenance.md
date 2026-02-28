---
workflow: KB Maintenance
responsavel: "@chief"
responsavel_type: agent
squad: quality-shield
description: >
  Workflow periodico de manutencao da knowledge base.
  Consolida entradas, remove duplicatas, identifica padroes recorrentes,
  e atualiza a base com dados limpos e insights extraidos.
trigger: "On demand via *kb-maintenance ou quando KB > 20 entradas"
---

# KB Maintenance

Workflow de manutencao periodica da knowledge base do Quality Shield. Garante que a KB se mantenha util, organizada, e com padroes bem identificados.

## Quando Executar

- **On demand**: Quando Chief ou usuario solicita
- **Threshold**: Quando KB acumula 20+ entradas desde ultima manutencao
- **Periodico**: Recomendado a cada 2 semanas ou 10 bugs resolvidos

## Fluxo Visual

```
Chief inicia kb-maintenance
       │
       ▼
┌──────────────┐
│  Inventario  │ Contar e categorizar entradas
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Dedup       │ Identificar e consolidar duplicatas
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Padroes     │ Identificar padroes recorrentes
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Qualidade   │ Verificar entradas incompletas
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Atualizar   │ Aplicar mudancas e gerar relatorio
└──────────────┘
```

## Etapas Detalhadas

### 1. Inventario

```
Ler: squads/quality-shield/data/knowledge-base.yaml

Coletar:
- Total de entradas
- Entradas por categoria (causa raiz, sintoma, arquivo)
- Data da entrada mais antiga e mais recente
- Entradas adicionadas desde ultima manutencao
```

### 2. Deduplicacao

```
Para cada par de entradas:

Criterios de duplicata:
  - Mesmos arquivos afetados?
  - Sintomas muito similares? (>80% overlap de palavras-chave)
  - Mesma causa raiz?
  - Mesmo fluxo afetado?

Se duplicata encontrada:
  1. Manter a entrada mais completa
  2. Mesclar informacoes unicas da outra
  3. Adicionar referencia cruzada
  4. Marcar entrada redundante para remocao

Reportar: N duplicatas encontradas, N entradas consolidadas
```

### 3. Identificacao de Padroes

```
Analisar todas as entradas para padroes:

A) Padroes por Arquivo:
   - Arquivo X aparece em N bugs → hotspot
   - Recomendacao: refactoring ou mais testes para hotspots

B) Padroes por Causa Raiz:
   - "Race condition" em N bugs → padrao sistêmico
   - "State management" em N bugs → padrao sistêmico
   - Recomendacao: fix estrutural se padrao > threshold (config)

C) Padroes por Fluxo:
   - Fluxo X quebra N vezes → fluxo fragil
   - Recomendacao: mais testes, melhor monitoramento

D) Padroes por Ambiente:
   - N bugs sao "funciona local, falha prod"
   - Recomendacao: melhorar parity localhost/prod

Threshold para padrao: config knowledge_base.pattern_threshold (default: 2)
```

### 4. Verificacao de Qualidade

```
Para cada entrada, verificar campos obrigatorios:

- [ ] bug_id presente
- [ ] sintoma descrito
- [ ] causa_raiz identificada
- [ ] arquivos_afetados listados
- [ ] fluxo_afetado mapeado
- [ ] fix_aplicado documentado
- [ ] data presente

Entradas incompletas:
  - Listar campos faltantes
  - Se possivel, inferir de dados existentes
  - Se nao, marcar como "requires_update"
```

### 5. Aplicar e Reportar

```
Aplicar mudancas:
1. Remover entradas duplicadas
2. Consolidar entradas mescladas
3. Adicionar padroes identificados (secao patterns no YAML)
4. Marcar entradas incompletas

Gerar relatorio:

## KB Maintenance Report

**Data:** [data]
**Entradas antes:** N
**Entradas depois:** N

### Deduplicacao
- Duplicatas encontradas: N
- Entradas consolidadas: N
- Entradas removidas: N

### Padroes Identificados
| Tipo       | Padrao                    | Ocorrencias | Recomendacao           |
|------------|---------------------------|-------------|------------------------|
| Arquivo    | useAuth.ts e hotspot      | 5           | Refactoring recomendado|
| Causa Raiz | Race conditions           | 3           | Fix estrutural         |
| Fluxo      | OAuth login fragil        | 4           | Mais testes            |

### Qualidade
- Entradas completas: N (X%)
- Entradas incompletas: N
  - [lista de entradas com campos faltantes]

### Recomendacoes
1. [recomendacao baseada em padroes]
2. [recomendacao baseada em hotspots]
3. [proxima manutencao em ~N bugs]
```

## Regras

- NUNCA deletar entradas sem consolidar informacoes uteis primeiro
- Padroes identificados devem ser ESPECIFICOS (arquivo X, fluxo Y), nao genericos
- Manter historico: entradas removidas por dedup devem ter referencia na entrada que ficou
- Se KB ficar com < 3 entradas apos dedup, algo esta errado - verificar
- Relatorio deve ser salvo em squads/quality-shield/data/ para referencia
