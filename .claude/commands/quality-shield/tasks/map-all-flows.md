---
task: Map All Flows
responsavel: "@chief"
responsavel_type: agent
squad: quality-shield
atomic_layer: task
elicit: false
Entrada: |
  - codebase_path: Raiz do projeto (default: .)
Saida: |
  - feature_flows: Arquivo feature-flows.md completo com todos os fluxos
  - known_interconnections: Arquivo known-interconnections.md com cruzamentos
Checklist:
  - "[ ] Mapear fluxo: Login Email/Senha"
  - "[ ] Mapear fluxo: Login Google OAuth"
  - "[ ] Mapear fluxo: Registro de conta"
  - "[ ] Mapear fluxo: Reset de senha"
  - "[ ] Mapear fluxo: Onboarding"
  - "[ ] Mapear fluxo: Feed (visualizar reviews)"
  - "[ ] Mapear fluxo: Discover (buscar restaurantes)"
  - "[ ] Mapear fluxo: Criar review"
  - "[ ] Mapear fluxo: Listas (criar, ver, gerenciar)"
  - "[ ] Mapear fluxo: Profile (ver, editar)"
  - "[ ] Mapear fluxo: Follow/Unfollow"
  - "[ ] Mapear fluxo: Likes e Comments"
  - "[ ] Mapear fluxo: Notifications"
  - "[ ] Identificar cruzamentos entre fluxos"
  - "[ ] Gerar known-interconnections.md"
---

# \*map-all-flows

Mapeia TODOS os fluxos de usuario do sistema. Task de setup inicial.

## Quando Usar

- **Setup inicial**: Primeira vez que o squad e configurado (`*map-flows`)
- **Rebuild completo**: Quando muitas features foram adicionadas/alteradas (`*map-flows --full`)
- **Incremental**: Atualizar apenas fluxos que mudaram (`*map-flows --incremental`)

### Modo Incremental

```
Para detectar quais fluxos precisam ser re-mapeados:
1. Ler feature-flows.md atual
2. Para cada fluxo, verificar se algum arquivo listado foi modificado desde o ultimo mapeamento:
   - git diff --name-only {last_map_date}..HEAD
   - Comparar com arquivos listados em cada fluxo
3. Fluxos com arquivos modificados → re-mapear
4. Fluxos sem modificacoes → manter como esta
5. Novos arquivos em src/screens/ que nao aparecem em nenhum fluxo → flaggar como "fluxo nao mapeado"
```

## Fluxos a Mapear

### Fluxos Criticos (core do app)

1. **login-email** - Login com email e senha
2. **login-google-oauth** - Login com Google
3. **register** - Criar conta nova
4. **reset-password** - Recuperar senha
5. **onboarding** - Fluxo pos-registro
6. **feed** - Visualizar feed de reviews
7. **discover** - Buscar e descobrir restaurantes
8. **create-review** - Criar uma review
9. **lists** - Criar, ver, gerenciar listas
10. **profile** - Ver e editar perfil

### Fluxos Importantes (social)

11. **follow-unfollow** - Seguir/deixar de seguir usuario
12. **likes** - Curtir reviews
13. **comments** - Comentar em reviews
14. **notifications** - Receber e ver notificacoes

### Fluxos Secundarios

15. **settings** - Configuracoes do app
16. **share** - Compartilhar reviews/listas
17. **restaurant-detail** - Ver detalhes de restaurante

## Execucao

### Para Cada Fluxo

```
Executar map-feature-flow.md com o nome do fluxo.
Resultado adicionado em feature-flows.md.
```

### Apos Todos os Fluxos

```
Analisar cruzamentos:
1. Quais arquivos aparecem em multiplos fluxos?
2. Quais hooks sao compartilhados entre fluxos?
3. Quais services sao usados por multiplos fluxos?
4. Quais contexts afetam multiplos fluxos?

Gerar known-interconnections.md:

## Pontos de Cruzamento

### profiles (tabela)
Usado por: auth, feed, reviews, follow, lists, notifications, profile
Impacto: Mudanca aqui afeta TUDO

### useAuth (hook)
Usado por: login, register, reset-password, onboarding, todas as telas protegidas
Impacto: Qualquer mudanca afeta todo o sistema de autenticacao

### AppContext
Usado por: todas as telas
Impacto: Mudanca no state global afeta todo o app

### [etc para cada ponto de cruzamento]
```

## Saida

- `squads/quality-shield/data/feature-flows.md` - Todos os fluxos mapeados
- `squads/quality-shield/data/known-interconnections.md` - Pontos de cruzamento

## Regras

- Mapear TODOS os fluxos listados acima
- Nao pular fluxos "simples" - bugs podem estar em qualquer lugar
- O resultado deve ser completo o suficiente para o Impact Analyst avaliar impacto de QUALQUER mudanca
- Identificar e documentar TODOS os pontos de cruzamento
