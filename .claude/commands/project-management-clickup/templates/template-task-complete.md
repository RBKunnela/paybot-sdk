# Template: Task Complete

> Template padrão para tarefas completas no ClickUp

---

## Estrutura da Tarefa

```yaml
# TASK TEMPLATE - CLICKUP
# Use este template para criar tarefas bem estruturadas

task:
  name: "[Tipo] Título claro e acionável"

  description: |
    ## Objetivo
    [O que precisa ser feito e por quê]

    ## Contexto
    [Informações relevantes para entender a tarefa]

    ## Entregáveis
    - [ ] Entregável 1
    - [ ] Entregável 2
    - [ ] Entregável 3

    ## Critérios de Aceite
    - [ ] Critério 1
    - [ ] Critério 2

    ## Recursos
    - [Link para documentação]
    - [Link para referência]

    ## Notas
    [Observações adicionais]

  custom_fields:
    tipo: "[Feature/Bug/Task/Epic]"
    prioridade: "[Urgent/High/Normal/Low]"
    estimativa: "[Xh ou Xd]"
    squad: "[Nome do squad responsável]"
    sprint: "[Sprint X]"

  checklist:
    - item: "Passo 1"
      required: true
    - item: "Passo 2"
      required: true
    - item: "Revisão final"
      required: true
```

---

## Exemplos por Tipo

### Feature (Nova funcionalidade)

```
Nome: [Feature] Implementar sistema de notificações

## Objetivo
Criar sistema de notificações push para alertar usuários sobre eventos importantes.

## Contexto
Atualmente os usuários não são notificados sobre atualizações. Isso causa perda de engajamento e tarefas atrasadas.

## Entregáveis
- [ ] Serviço de notificações backend
- [ ] Componente de UI para exibição
- [ ] Integração com push notifications
- [ ] Testes automatizados

## Critérios de Aceite
- [ ] Usuário recebe notificação em < 5 segundos
- [ ] Funciona em mobile e desktop
- [ ] Tem opção de silenciar
- [ ] Logs de entrega disponíveis

## Recursos
- Design: [link Figma]
- API docs: [link]
```

### Bug (Correção)

```
Nome: [Bug] Login falha com email maiúsculo

## Objetivo
Corrigir bug que impede login quando email tem letras maiúsculas.

## Contexto
Reportado por: Cliente X
Ambiente: Produção
Frequência: 100% reproduzível

## Passos para Reproduzir
1. Acessar página de login
2. Digitar email com maiúsculas (Ex: Usuario@Email.com)
3. Inserir senha correta
4. Clicar em entrar
5. Erro: "Usuário não encontrado"

## Comportamento Esperado
Login deve funcionar independente de maiúsculas/minúsculas no email.

## Entregáveis
- [ ] Correção no backend
- [ ] Teste de regressão
- [ ] Deploy em staging
- [ ] Validação com QA

## Critérios de Aceite
- [ ] Login funciona com qualquer combinação de maiúsculas
- [ ] Testes passando
- [ ] Nenhum side effect em outras funcionalidades
```

### Task (Tarefa operacional)

```
Nome: [Task] Preparar relatório mensal de métricas

## Objetivo
Compilar métricas de janeiro para apresentação à diretoria.

## Entregáveis
- [ ] Dashboard atualizado
- [ ] Slides de apresentação
- [ ] Análise de variações

## Métricas a incluir
- MRR e variação
- CAC e LTV
- Churn rate
- NPS

## Prazo
Apresentação: 05/02 às 14h
```

---

## Custom Fields Padrão

| Campo | Opções | Uso |
|-------|--------|-----|
| Tipo | Feature, Bug, Task, Epic, Spike | Categorização |
| Prioridade | Urgent, High, Normal, Low | Ordenação |
| Estimativa | 1h, 2h, 4h, 1d, 2d, 3d, 1w | Planning |
| Squad | [Lista de squads] | Responsabilidade |
| Sprint | Sprint 1, 2, 3... | Ciclo |
| Status | To Do, In Progress, Review, Done | Fluxo |

---

## Checklist Padrão

### Para Features
- [ ] Requisitos claros
- [ ] Design aprovado
- [ ] Implementação
- [ ] Testes unitários
- [ ] Code review
- [ ] Testes QA
- [ ] Documentação
- [ ] Deploy

### Para Bugs
- [ ] Reprodução confirmada
- [ ] Root cause identificado
- [ ] Fix implementado
- [ ] Teste de regressão
- [ ] Code review
- [ ] Deploy

### Para Tasks
- [ ] Entender requisitos
- [ ] Executar
- [ ] Validar
- [ ] Documentar (se necessário)

---

## Boas Práticas

1. **Título:** Verbo no infinitivo + objeto claro
2. **Descrição:** Sempre incluir "por quê" além de "o quê"
3. **Checklist:** Quebrar em passos pequenos e verificáveis
4. **Estimativa:** Ser realista, incluir buffer
5. **Links:** Anexar todos os recursos necessários
6. **Assignee:** Sempre ter um responsável claro

---

*Template v1.0 - Project Management ClickUp Squad*
