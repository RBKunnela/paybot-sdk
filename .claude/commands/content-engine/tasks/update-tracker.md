# Task: Update Tracker

## Metadata
- id: update-tracker
- version: 1.0.0
- tipo: task (executável)
- integração: Fase 4 e Fase 5 do Weekly Sprint

## Propósito

Atualizar o status de uma peça no tracker semanal, recalcular contadores e registrar feedback quando aplicável.

---

## Inputs

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `week_number` | integer | sim | Número da semana do sprint |
| `piece_id` | string | sim | ID/nome da peça (ex: "carousel-1", "static-2") |
| `new_status` | enum | sim | Novo status: `pendente` / `produzido` / `publicado` |
| `generated_files` | list | não | Caminhos dos PNGs gerados (se houver) |
| `notes` | string | não | Observações sobre a peça |
| `feedback` | string | não | Feedback recebido (comentários, DMs, métricas iniciais) |
| `metrics` | object | não | Métricas parciais: `{alcance, likes, saves, shares, comments}` |

## Status Flow

```
⬜ Pendente  →  🟡 Produzido  →  🟢 Publicado
```

- **⬜ Pendente**: peça planejada, copy ainda não produzida
- **🟡 Produzido**: copy aprovada pelo Torriani, PNGs gerados, pronta para publicar
- **🟢 Publicado**: peça publicada na plataforma

## Steps

### 1. Localizar tracker

Abrir `tracker/tracker-semana-{week_number}.md`.

### 2. Atualizar status da peça

Encontrar a linha da peça (`piece_id`) na tabela e atualizar:
- Coluna **Status**: substituir pelo novo emoji/status
- Se `generated_files` fornecido: adicionar referência na coluna **Notas**

### 3. Recalcular contadores

Após atualizar a peça, recalcular a seção de contadores:

```markdown
### Contadores
- Total: X peças
- ⬜ Pendente: Y
- 🟡 Produzido: Z
- 🟢 Publicado: W
```

Regra: `Total = Pendente + Produzido + Publicado`

### 4. Registrar feedback (se fornecido)

Se `feedback` não é vazio, adicionar na seção "Feedback Acumulado":

```markdown
### Feedback Acumulado

#### [piece_id] — [data]
- **Tipo**: [positivo/negativo/neutro]
- **Fonte**: [comentário/DM/métrica]
- **Conteúdo**: [texto do feedback]
- **Métricas**: alcance: X | likes: Y | saves: Z | shares: W | comments: V
- **Insight**: [o que aprendemos com isso]
```

### 5. Registrar métricas parciais (se fornecidas)

Se `metrics` fornecido, atualizar a linha da peça com dados parciais. Esses dados alimentam a Fase 0 da próxima semana.

## Outputs

| Output | Formato | Descrição |
|--------|---------|-----------|
| Tracker atualizado | markdown | `tracker/tracker-semana-{N}.md` com status e contadores atualizados |
| Feedback registrado | markdown | Seção de feedback atualizada (se aplicável) |

## Integração com Weekly Sprint

| Momento | Quem chama | Status | Detalhe |
|---------|-----------|--------|---------|
| Fase 4 (copy aprovada) | Automático | ⬜ → 🟡 | Após Torriani >= 7/10 e PNG gerado |
| Publicação | Manual/Automático | 🟡 → 🟢 | Quando a peça é publicada na plataforma |
| Feedback recebido | Manual | — | Adiciona feedback sem mudar status |
| Fase 0 (próxima semana) | Automático | Leitura | Dados do tracker alimentam o relatório de performance |

## Validação

- [ ] Peça encontrada no tracker
- [ ] Transição de status é válida (⬜→🟡→🟢, nunca regressão)
- [ ] Contadores recalculados corretamente
- [ ] Feedback formatado corretamente (se fornecido)
- [ ] Arquivo salvo sem perder dados existentes

## Exemplo de Uso

```
Inputs:
  week_number: 5
  piece_id: carousel-1
  new_status: produzido
  generated_files:
    - output/semana-5/carousel-1/01-cover.png
    - output/semana-5/carousel-1/02-sinal-1.png
    - output/semana-5/carousel-1/03-sinal-2.png
  notes: "Torriani 8/10. Hook forte."

Resultado:
  tracker-semana-5.md atualizado:
  - carousel-1: ⬜ → 🟡
  - Contadores: Pendente -1, Produzido +1
  - Notas: "Torriani 8/10. Hook forte. [7 PNGs gerados]"
```
