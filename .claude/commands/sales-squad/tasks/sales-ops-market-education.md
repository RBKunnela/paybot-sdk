---
task: Market Education
responsavel: "@sales-ops"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - topic: Tema do conteúdo educacional
  - audience: Público-alvo (revendedores, equipe interna, mercado)
Saida: |
  - educational_content: Conteúdo educacional estruturado
  - presentation_deck: Estrutura de apresentação
Checklist:
  - "[ ] Definir tema e público-alvo"
  - "[ ] Pesquisar boas práticas e referências"
  - "[ ] Estruturar conteúdo educacional"
  - "[ ] Criar deck de apresentação"
  - "[ ] Revisar linguagem para o público"
---

# *market-education

Cria conteúdo educacional para elevar o nível do mercado B2B.

## Uso

```
@sales-ops
*market-education --topic "gestão de estoque" --audience "revendedores"
*market-education --topic "venda consultiva" --audience "equipe interna"
```

## Flow

1. Definir tema e público-alvo
2. Pesquisar boas práticas, dados e referências do setor
3. Estruturar conteúdo educacional (texto corrido ou módulos)
4. Adaptar linguagem ao público brasileiro
5. Criar estrutura de apresentação (slides/deck)
6. Incluir exemplos práticos e cases
