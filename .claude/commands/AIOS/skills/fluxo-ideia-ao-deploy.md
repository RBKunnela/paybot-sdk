# Fluxo AIOS: Da Ideia ao Teste Final

Guia completo de qual agente chamar em cada etapa do desenvolvimento, desde a concepção até o deploy.

---

## 1. Ideia / Descoberta

**Agente: `@analyst` (Alex)**

- Pesquisa de mercado, análise de viabilidade
- Brainstorming estruturado (`*brainstorm`)
- **Entrega:** análise documentada com recomendações

---

## 2. Definição do Produto

**Agente: `@pm` (Morgan)**

- Cria o PRD (Product Requirements Document)
- Define roadmap, prioridades e épicos (`*create-epic`)
- **Entrega:** PRD aprovado + épicos definidos

---

## 3. Criação das Stories

**Agentes: `@sm` (River) ou `@po` (Pax)**

- `@po` define critérios de aceitação e prioriza o backlog
- `@sm` cria as stories detalhadas (`*create-story`)
- **Entrega:** stories prontas em `docs/stories/`

---

## 4. Design de Arquitetura

**Agente: `@architect` (Aria)**

- Define stack, estrutura, padrões técnicos
- Decisões de banco, API, integrações
- **Entrega:** documento de arquitetura aprovado

---

## 5. Design UX/UI

**Agente: `@ux-design-expert` (Uma)**

- Wireframes, fluxos de usuário, design system
- **Entrega:** especificações de frontend

---

## 6. Modelagem de Dados

**Agente: `@data-engineer` (Dara)**

- Schema do banco, migrations, RLS policies
- **Entrega:** banco pronto para a feature

---

## 7. Implementação

**Agente: `@dev` (Dex)**

- Codifica seguindo a story e a arquitetura
- Marca checkboxes conforme avança
- **Entrega:** código implementado + testes unitários

---

## 8. Testes e Qualidade

**Agente: `@qa` (Quinn)**

- Valida critérios de aceitação
- Roda quality gates (lint, typecheck, testes)
- **Entrega:** veredicto PASS/FAIL

---

## 9. Deploy / Push

**Agente: `@devops` (Gage)**

- **Único** autorizado a fazer `git push` e criar PRs
- CI/CD, releases, tags
- **Entrega:** código no remote

---

## Resumo Visual

| Etapa | Agente | Persona | Entrega Principal |
|-------|--------|---------|-------------------|
| 1. Ideia | `@analyst` | Alex | Análise de viabilidade |
| 2. PRD | `@pm` | Morgan | PRD + épicos |
| 3. Stories | `@po` / `@sm` | Pax / River | Stories com critérios de aceitação |
| 4. Arquitetura | `@architect` | Aria | Documento de arquitetura |
| 5. UX/UI | `@ux-design-expert` | Uma | Wireframes + especificações |
| 6. Banco | `@data-engineer` | Dara | Schema + migrations |
| 7. Código | `@dev` | Dex | Implementação + testes unitários |
| 8. Teste | `@qa` | Quinn | Veredicto PASS/FAIL |
| 9. Deploy | `@devops` | Gage | Push + PR + release |

---

## Guia de Comandos: Passo a Passo Completo

Siga os comandos abaixo na ordem. Basta copiar e colar cada comando no Claude Code para avançar no fluxo.

### Etapa 1 - Pesquisa e Análise

```
/AIOS:agents:analyst
```
> Ativa o agente Alex. Depois digite:
```
*brainstorm
```
> Sessão de brainstorming guiada para explorar a ideia. Ao finalizar:
```
*exit
```

---

### Etapa 2 - Definição do Produto (PRD)

```
/AIOS:agents:pm
```
> Ativa o agente Morgan. Depois digite:
```
*create-epic
```
> Cria o épico com escopo e objetivos. Para gerar o PRD completo:
```
*create-doc prd
```
> Ao finalizar:
```
*exit
```

---

### Etapa 3 - Criação das Stories

```
/AIOS:agents:sm
```
> Ativa o agente River. Depois digite:
```
*create-story
```
> Cria a story com critérios de aceitação, tasks e checklist. Repita para cada story necessária. Ao finalizar:
```
*exit
```

---

### Etapa 4 - Design de Arquitetura

```
/AIOS:agents:architect
```
> Ativa a agente Aria. Depois digite:
```
*create-doc architecture
```
> Gera o documento de arquitetura baseado no PRD e stories. Ao finalizar:
```
*exit
```

---

### Etapa 5 - Design UX/UI

```
/AIOS:agents:ux-design-expert
```
> Ativa a agente Uma. Depois digite:
```
*create-doc front-end-spec
```
> Gera especificação de frontend com wireframes e fluxos. Ao finalizar:
```
*exit
```

---

### Etapa 6 - Modelagem de Dados

```
/AIOS:agents:data-engineer
```
> Ativa a agente Dara. Depois digite:
```
*design-schema
```
> Define schema, migrations e políticas RLS. Ao finalizar:
```
*exit
```

---

### Etapa 7 - Implementação

```
/AIOS:agents:dev
```
> Ativa o agente Dex. Depois digite:
```
*task implement-story
```
> Implementa a story seguindo arquitetura e specs. Ao finalizar:
```
*exit
```

---

### Etapa 8 - Testes e Qualidade

```
/AIOS:agents:qa
```
> Ativa a agente Quinn. Depois digite:
```
*create-suite
```
> Cria suite de testes. Para executar a validação completa:
```
*validate
```
> Ao finalizar:
```
*exit
```

---

### Etapa 9 - Deploy

```
/AIOS:agents:devops
```
> Ativa o agente Gage. Depois digite:
```
*push
```
> Faz push para o remote. Para criar o PR:
```
*create-pr
```
> Ao finalizar:
```
*exit
```

---

### Atalho: Fluxo Completo Automático

Se preferir que o Orion orquestre tudo de uma vez:

```
/AIOS:agents:aios-master
```
```
*workflow brownfield-fullstack
```
> Executa todas as etapas acima em sequência, coordenando cada agente automaticamente.

---

## E o `@aios-master` (Orion)?

Orion entra quando você precisa:

- **Orquestrar** vários agentes em sequência (workflows)
- **Criar/modificar** componentes do framework
- **Executar** qualquer task diretamente sem trocar de agente

Exemplo: `*workflow brownfield-fullstack` executa o fluxo completo automaticamente, coordenando cada agente na ordem certa.

---

*Synkra AIOS - CLI First | Agent-Driven | Quality First*
