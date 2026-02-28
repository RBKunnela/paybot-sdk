# Processo: {NOME_DO_PROCESSO}

## Metadata

| Campo | Valor |
|-------|-------|
| **Area** | {area responsavel} |
| **Responsavel** | {dono do processo} |
| **Frequencia** | {diario / semanal / por demanda / etc} |
| **Ultima revisao** | {data} |
| **Status** | {rascunho / validado / ativo / descontinuado} |

---

## 1. Objetivo

{Descricao clara do que este processo entrega e por que existe}

---

## 2. Trigger (O que inicia o processo)

- {Evento ou condicao que dispara o processo}
- {Exemplo: "Cliente faz compra no Hotmart"}

---

## 3. Etapas

| # | Etapa | Responsavel | Ferramenta | SLA | Output |
|---|-------|-------------|-----------|-----|--------|
| 1 | {etapa} | {quem} | {onde} | {tempo} | {entregavel} |
| 2 | {etapa} | {quem} | {onde} | {tempo} | {entregavel} |
| 3 | {etapa} | {quem} | {onde} | {tempo} | {entregavel} |

---

## 4. Fluxograma

```
[Trigger] --> [Etapa 1] --> [Decisao?]
                              |
                     Sim -----+----- Nao
                      |               |
               [Etapa 2A]       [Etapa 2B]
                      |               |
                      +-------+-------+
                              |
                        [Etapa 3]
                              |
                         [Output]
```

---

## 5. Regras de Negocio

- {Regra 1: condicao e consequencia}
- {Regra 2: condicao e consequencia}

---

## 6. Excecoes e Edge Cases

| Cenario | Acao | Responsavel |
|---------|------|-------------|
| {excecao 1} | {como tratar} | {quem decide} |
| {excecao 2} | {como tratar} | {quem decide} |

---

## 7. Metricas

| Metrica | Meta | Como medir |
|---------|------|-----------|
| {tempo medio} | {X horas} | {ClickUp time tracking} |
| {taxa de erro} | {< X%} | {contagem manual / dashboard} |

---

## 8. Ferramentas Utilizadas

- **ClickUp:** {como e usado}
- **n8n:** {automacoes envolvidas}
- **Outras:** {listar}

---

## 9. Historico de Alteracoes

| Data | Alteracao | Autor |
|------|-----------|-------|
| {data} | Criacao inicial | {autor} |
