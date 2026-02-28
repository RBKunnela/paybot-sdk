# Quality Shield - Known Interconnections

Pontos onde features se cruzam no sistema.
Mudancas nesses pontos afetam multiplos fluxos simultaneamente.
Gerado: 2026-02-11

---

## Pontos de Cruzamento - CRITICAL

### AuthContext (context)

**Arquivo:** `src/contexts/AuthContext.tsx`
**Usado por:** login-email, login-google-oauth, register, reset-password, onboarding, feed, discover, create-review, profile, lists, list-details, notifications, settings, community, recommendations, review-detail
**Impacto:** Qualquer mudanca afeta TODAS as telas do app. currentUser, loading, isAuthReady, signOut sao consumidos por praticamente tudo.
**Risco:** CRITICAL
**Ultimo bug conhecido:** fetchUserData timeout causava currentUser=null, redirecionando para onboarding

### SupabaseContext (context)

**Arquivo:** `src/contexts/SupabaseContext.tsx`
**Usado por:** Todos os hooks de dados (12+), metade das screens
**Impacto:** Fornece o cliente Supabase para todo o app. Se quebrar, NADA funciona.
**Risco:** CRITICAL

### useAuth (hook)

**Arquivo:** `src/hooks/auth/useAuth.ts`
**Usado por:** AuthContext (e transitivamente, todo o app)
**Impacto:** Orquestra 5 sub-hooks de auth. Qualquer mudanca pode afetar login, register, OAuth, reset password, session refresh.
**Risco:** CRITICAL
**Componentes internos:** useSessionStorage, useUserData, useOAuthHandler, useAuthStateListener, useAppStateRefresh

### auth/utils.ts (utility)

**Arquivo:** `src/hooks/auth/utils.ts`
**Usado por:** useAuth, useOAuthHandler, useSessionStorage, useUserData
**Impacto:** hasOAuthTokensInUrl() e isResetPasswordPage() determinam se URL e OAuth ou reset. ERRO AQUI = OAuth e reset password se confundem.
**Risco:** CRITICAL
**Bug conhecido:** code= na URL de reset era detectado como OAuth, quebrando o fluxo de reset

### auth/types.ts (types + constants)

**Arquivo:** `src/hooks/auth/types.ts`
**Usado por:** Todos os 6 hooks de auth
**Impacto:** Define timeouts (AUTH_TIMEOUT_MS, FETCH_TIMEOUT_MS, etc) e tipos compartilhados. Mudanca em timeout afeta TODOS os fluxos de auth.
**Risco:** CRITICAL

### types.ts (types)

**Arquivo:** `src/types.ts`
**Usado por:** Virtualmente todo o projeto
**Impacto:** User, Restaurant, Review, List, Comment - tipos base do sistema. Mudanca de shape quebra tudo.
**Risco:** CRITICAL

### queryClient (lib)

**Arquivo:** `src/lib/queryClient.ts`
**Usado por:** 8 hooks + 2 contexts + App.tsx
**Impacto:** Cache keys e configuracao do React Query. Mudanca em keys invalida caches incorretamente.
**Risco:** CRITICAL

### App.tsx (core)

**Arquivo:** `src/App.tsx`
**Usado por:** Entry point
**Impacto:** Define TODAS as rotas, lazy imports, ProtectedRoute/PublicRoute guards, detecta OAuth redirect. Mudanca aqui pode quebrar navegacao inteira.
**Risco:** CRITICAL

### ProtectedRoute (component)

**Arquivo:** `src/components/ProtectedRoute.tsx`
**Usado por:** App.tsx (protege todas as rotas autenticadas)
**Impacto:** Decide se usuario pode acessar rota baseado em auth state e onboarding_completed. Erro = redirect infinito ou acesso nao autorizado.
**Risco:** CRITICAL

---

## Pontos de Cruzamento - HIGH

### FeedContext (context)

**Arquivo:** `src/contexts/FeedContext.tsx`
**Usado por:** feed, create-review, review-detail
**Impacto:** Estado global do feed, likes, comments. Mudanca afeta feed + criacao de review + detalhe de review.
**Risco:** HIGH

### FollowContext (context)

**Arquivo:** `src/contexts/FollowContext.tsx`
**Usado por:** feed, create-review, notifications, profile, recommendations
**Impacto:** Estado de follow/unfollow. Mudanca afeta 5 telas + contadores.
**Risco:** HIGH

### ListsContext (context)

**Arquivo:** `src/contexts/ListsContext.tsx`
**Usado por:** feed, discover, profile, lists, list-details
**Impacto:** Estado de listas. Mudanca afeta 5 telas + salvar em lista.
**Risco:** HIGH

### AppContext (core)

**Arquivo:** `src/AppContext.tsx`
**Usado por:** App.tsx (wraps tudo)
**Impacto:** Orquestra TODOS os context providers (Supabase > Auth > Feed > Lists > Follow). Ordem de providers importa.
**Risco:** HIGH

### auth.service (service)

**Arquivo:** `src/services/auth.service.ts`
**Usado por:** useAuth, useUserData, Register
**Impacto:** Todas as operacoes de auth (login, signup, reset, session, profile update). Mudanca afeta todos os fluxos de autenticacao.
**Risco:** HIGH

### feed.service (service)

**Arquivo:** `src/services/feed.service.ts`
**Usado por:** useFeedQuery, useReviewsQuery, FeedContext
**Impacto:** CRUD de reviews, likes, comments. Mudanca afeta feed + criacao de review + interacoes sociais.
**Risco:** HIGH

### lists.service (service)

**Arquivo:** `src/services/lists.service.ts`
**Usado por:** useListsQuery, useListDetails, useListReorder, Profile, Lists, Recommendations
**Impacto:** CRUD de listas + busca de restaurantes. Mudanca afeta listas + perfil + recomendacoes.
**Risco:** HIGH

### google-places.service (service)

**Arquivo:** `src/services/google-places.service.ts`
**Usado por:** useRestaurantAutocomplete, useRestaurantSearch, Discover, AppContext
**Impacto:** Busca de restaurantes via Google. Mudanca afeta discover + criacao de review (selecao de restaurante).
**Risco:** HIGH
**Diferenca localhost/prod:** Edge Function pode nao estar deployada em localhost

### query-fields (service)

**Arquivo:** `src/services/query-fields.ts`
**Usado por:** 5 services + 2 hooks
**Impacto:** Define campos de SELECT para todas as queries. Mudanca pode quebrar desserializacao de dados em multiplos fluxos.
**Risco:** HIGH

### useUserData (hook)

**Arquivo:** `src/hooks/auth/useUserData.ts`
**Usado por:** useAuth → AuthContext → todo o app
**Impacto:** Busca perfil do usuario apos login. Se falhar, currentUser=null e app redireciona para onboarding.
**Risco:** HIGH
**Bug conhecido:** timeout de fetchUserData em producao (latencia de rede)

---

## Pontos de Cruzamento - MEDIUM

### ReviewCard (component)

**Arquivo:** `src/components/ReviewCard.tsx`
**Usado por:** Feed, Profile, ReviewDetail
**Impacto:** Card de review com like, comment, save. Mudanca visual/funcional afeta 3 telas.
**Risco:** MEDIUM

### RestaurantDetailsModal (component)

**Arquivo:** `src/components/RestaurantDetailsModal.tsx`
**Usado por:** Feed, Discover, ListDetails, Recommendations
**Impacto:** Modal de detalhes de restaurante. Mudanca afeta 4 telas.
**Risco:** MEDIUM

### capacitor-bridge (utility)

**Arquivo:** `src/utils/capacitor-bridge.ts`
**Usado por:** 8+ hooks/contexts (auth, feed, follow, lists, draft, push notifications)
**Impacto:** Bridge nativo/web. isNative(), storage, deepLink, haptics. Mudanca pode quebrar comportamento em plataformas diferentes.
**Risco:** MEDIUM

### logger (utility)

**Arquivo:** `src/utils/logger.ts`
**Usado por:** 15+ arquivos
**Impacto:** Usado em todo lugar mas improvavel de causar bug funcional. Risco baixo funcional, alto em observabilidade.
**Risco:** MEDIUM

### useScrollRestoration (hook)

**Arquivo:** `src/hooks/useScrollRestoration.ts`
**Usado por:** Feed, Discover, Profile, Lists
**Impacto:** Restaura posicao de scroll. Mudanca afeta UX de 4 telas mas nao funcionalidade core.
**Risco:** MEDIUM

### Button (component)

**Arquivo:** `src/components/Button.tsx`
**Usado por:** Todas as telas
**Impacto:** Componente base. Mudanca de props/comportamento afeta TUDO.
**Risco:** MEDIUM (se visual) / HIGH (se funcional)

---

## Tabelas de Cruzamento por DB

### profiles (tabela)

**Afeta:** auth (login, register, onboarding, profile edit), feed (user info em reviews), follow (user info), lists (owner info), notifications (actor info)
**Mudanca de schema:** Quebra User type em types.ts → cascata em todo o app

### reviews (tabela)

**Afeta:** feed, create-review, profile (reviews do usuario), restaurant-detail, notifications (likes/comments)
**Mudanca de schema:** Quebra Review type → afeta feed + profile + review detail

### restaurants (tabela)

**Afeta:** discover, create-review, lists, feed (restaurant info em reviews)
**Mudanca de schema:** Quebra Restaurant type → afeta discover + listas + reviews

### lists / list_restaurants (tabelas)

**Afeta:** lists, list-details, profile, feed (salvar em lista), recommendations
**Mudanca de schema:** Quebra List type → afeta listas + perfil + recomendacoes

### follows (tabela)

**Afeta:** follow-unfollow, profile (contadores), feed (reviews de seguidos), notifications
**Mudanca de schema:** Afeta follow context + contadores de perfil

### notifications (tabela)

**Afeta:** notifications (listagem), todas as interacoes (triggers de DB criam notificacoes)
**Mudanca de schema:** Afeta apenas tela de notificacoes

---

## Regras de Teste por Interconnection

Quando um ponto de cruzamento e afetado, estes sao os testes minimos obrigatorios:

### CRITICAL Interconnections

| Ponto           | Teste Minimo                                                               |
| --------------- | -------------------------------------------------------------------------- |
| AuthContext     | Testar login email, login Google, logout, session refresh                  |
| SupabaseContext | Testar qualquer query (feed load e suficiente)                             |
| useAuth         | Testar login + logout + session persistence                                |
| auth/utils.ts   | Testar hasOAuthTokensInUrl com URLs de OAuth E reset-password              |
| auth/types.ts   | Verificar que timeouts nao quebraram fluxos lentos (3G mobile)             |
| types.ts        | Verificar que TODAS as queries que usam o tipo alterado ainda deserializam |
| queryClient     | Invalidar cache manualmente e verificar que dados recarregam               |
| App.tsx         | Navegar para todas as rotas protegidas e publicas                          |
| ProtectedRoute  | Testar acesso autenticado e nao-autenticado                                |

### HIGH Interconnections

| Ponto                 | Teste Minimo                                           |
| --------------------- | ------------------------------------------------------ |
| FeedContext           | Carregar feed, dar like, comentar                      |
| FollowContext         | Follow/unfollow + verificar contadores                 |
| ListsContext          | Criar lista, adicionar restaurante, remover            |
| AppContext            | Verificar que providers inicializam na ordem correta   |
| auth.service          | Login + signup + reset (pelo menos 1 de cada)          |
| feed.service          | Listar reviews + criar review                          |
| lists.service         | Listar listas + criar lista                            |
| google-places.service | Buscar restaurante no discover                         |
| query-fields.ts       | Verificar que SELECT retorna todos os campos esperados |
| useUserData           | Login → verificar que perfil carrega (name, avatar)    |

### Database Tables

| Tabela        | Teste Minimo                                          |
| ------------- | ----------------------------------------------------- |
| profiles      | Login + verificar dados do perfil                     |
| reviews       | Feed load + criar review                              |
| restaurants   | Discover search                                       |
| lists         | Listar + criar lista                                  |
| follows       | Follow + verificar contador                           |
| notifications | Gerar notificacao (like/comment) + verificar listagem |
