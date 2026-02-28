# Quality Shield - Feature Flows

Mapa de todos os fluxos de usuario do Fomi.
Gerado: 2026-02-11

---

## Fluxos Criticos

### login-email

**Ponto de entrada:** Login.tsx (tela /login)
**Resultado esperado:** Usuario autenticado, redirecionado para /feed com perfil carregado
**Dependencias externas:** Supabase Auth

**Caminho:**

```
Botao "Entrar" clicado
  → Login.tsx chama supabase.auth.signInWithPassword(email, password)
  → Supabase retorna session
  → onAuthStateChange dispara evento SIGNED_IN
    → useAuthStateListener.ts captura o evento
    → Verifica initialLoadComplete flag
    → Se initialLoadComplete=true: chama fetchUserData(userId)
      → useUserData.ts chama AuthService.getSessionData(supabase, userId) com timeout 8s
        → auth.service.ts faz RPC para buscar profile + following + lists
        → Se timeout: fallback direto com supabase.from('profiles').select()
      → Seta currentUser no AuthContext
    → Se initialLoadComplete=false: pula fetchUserData (init flow trata)
  → AuthContext atualiza: loading=false, currentUser=user, isAuthReady=true
  → ProtectedRoute verifica: currentUser existe E onboarding_completed=true
    → Se sim: renderiza /feed
    → Se nao: redireciona para /onboarding
```

**Arquivos envolvidos:**

- `src/screens/Auth/Login.tsx` - Formulario de login
- `src/hooks/auth/useAuth.ts` - Orquestra todo o auth flow
- `src/hooks/auth/useAuthStateListener.ts` - Escuta onAuthStateChange
- `src/hooks/auth/useUserData.ts` - Busca perfil do usuario
- `src/hooks/auth/useSessionStorage.ts` - Remember me / session only
- `src/hooks/auth/types.ts` - Timeouts e tipos
- `src/services/auth.service.ts` - Chamadas ao Supabase
- `src/contexts/AuthContext.tsx` - Estado global de auth
- `src/components/ProtectedRoute.tsx` - Guarda de rota
- `src/App.tsx` - Definicao de rotas

**Estados:**

- Sucesso: redirect para /feed com perfil carregado
- Erro credenciais: mensagem "Email ou senha incorretos"
- Erro rede: timeout apos AUTH_TIMEOUT_MS (15s)
- Loading: botao desabilitado, spinner

**Diferenca localhost vs producao:**

- Localhost: Supabase local responde em ms, fetchUserData nunca da timeout
- Producao: Latencia de rede pode causar timeout no fetchUserData (8s), fallback para query direta (6s)

---

### login-google-oauth

**Ponto de entrada:** Login.tsx → botao "Entrar com Google"
**Resultado esperado:** OAuth completo, usuario autenticado, redirecionado para /feed ou /onboarding
**Dependencias externas:** Google OAuth, Supabase Auth

**Caminho:**

```
Botao Google clicado
  → useOAuthFlow.ts inicia OAuth
    → Web: supabase.auth.signInWithOAuth({ provider: 'google' })
      → Redireciona para Google → usuario autoriza → Google redireciona de volta
      → URL volta com code= ou access_token= nos params
    → Native: usa deep link handler
  → App.tsx detecta tokens na URL via hasOAuthTokensInUrl()
    → utils.ts verifica: nao e isResetPasswordPage() E tem code= ou access_token=
    → Se detectado: seta isOAuthRedirect=true, mostra OAuthLoadingOverlay
  → Supabase SDK processa os tokens internamente
  → onAuthStateChange dispara SIGNED_IN
    → useAuthStateListener escuta
    → Verifica initialLoadComplete (usa AUTH_OAUTH_TIMEOUT_MS = 30s para OAuth)
    → fetchUserData(userId)
    → currentUser setado
  → ProtectedRoute verifica onboarding_completed
    → Se true: /feed
    → Se false: /onboarding (usuario novo)
```

**Arquivos envolvidos:**

- `src/screens/Auth/Login.tsx` - Botao OAuth
- `src/screens/Auth/components/OAuthButton.tsx` - Componente do botao
- `src/screens/Auth/components/OAuthLoadingOverlay.tsx` - Loading durante OAuth
- `src/screens/Auth/hooks/useOAuthFlow.ts` - Inicia OAuth
- `src/hooks/auth/useAuth.ts` - Orquestra auth
- `src/hooks/auth/useOAuthHandler.ts` - Processa deep links / tokens
- `src/hooks/auth/useAuthStateListener.ts` - Escuta eventos
- `src/hooks/auth/useUserData.ts` - Busca perfil
- `src/hooks/auth/utils.ts` - hasOAuthTokensInUrl, isResetPasswordPage, clearOAuthTokensFromUrl
- `src/hooks/auth/types.ts` - AUTH_OAUTH_TIMEOUT_MS
- `src/App.tsx` - Detecta OAuth redirect, rotas
- `src/components/ProtectedRoute.tsx` - Guarda de rota

**Estados:**

- Sucesso: redirect para /feed (usuario existente) ou /onboarding (novo)
- Erro OAuth: Google recusa, mostra erro
- Timeout: AUTH_OAUTH_TIMEOUT_MS (30s) para o fluxo completo
- Loading: OAuthLoadingOverlay enquanto processa

**Diferenca localhost vs producao:**

- OAuth SEMPRE redireciona para a URL de producao configurada no Google Console
- Localhost NAO consegue testar o fluxo completo de OAuth
- Em producao: latencia de rede, possivel timeout no fetchUserData

---

### register

**Ponto de entrada:** Register.tsx (tela /register)
**Resultado esperado:** Conta criada, email de verificacao enviado, modal de sucesso
**Dependencias externas:** Supabase Auth, email service

**Caminho:**

```
Formulario de registro preenchido
  → useRegistrationValidation valida campos
  → useUsernameAvailability verifica username via auth.service
  → useEmailAvailability verifica email
  → usePasswordStrength avalia senha
  → Botao "Criar conta" clicado
    → Register.tsx chama supabase.auth.signUp({ email, password, data: { full_name, username } })
    → Supabase cria usuario + envia email de verificacao
    → RegisterSuccessModal exibido
    → Usuario clica link no email → verifica conta → pode fazer login
```

**Arquivos envolvidos:**

- `src/screens/Auth/Register.tsx` - Formulario
- `src/screens/Auth/hooks/useRegistrationValidation.ts` - Validacao
- `src/screens/Auth/hooks/useUsernameAvailability.ts` - Verifica username
- `src/screens/Auth/hooks/useEmailAvailability.ts` - Verifica email
- `src/screens/Auth/hooks/usePasswordStrength.ts` - Avalia senha
- `src/screens/Auth/hooks/useGeolocation.ts` - Localizacao do usuario
- `src/services/auth.service.ts` - signUp, checkUsernameAvailable

**Estados:**

- Sucesso: modal de verificacao exibido
- Erro: username/email ja existe, senha fraca
- Loading: botao desabilitado

---

### reset-password

**Ponto de entrada:** Login.tsx → "Esqueci minha senha" → ForgotPasswordModal
**Resultado esperado:** Email de reset enviado, usuario reseta senha na tela /reset-password
**Dependencias externas:** Supabase Auth, email service

**Caminho:**

```
Fase 1: Solicitar reset
  → ForgotPasswordModal abre
  → Usuario digita email
  → Chama supabase.auth.resetPasswordForEmail(email, { redirectTo: '/reset-password' })
  → Email enviado com link contendo code=

Fase 2: Resetar senha (tela /reset-password)
  → Usuario clica link no email
  → Navega para /reset-password?code=XXX
  → ResetPassword.tsx renderiza
  → IMPORTANTE: hasOAuthTokensInUrl() deve retornar FALSE aqui
    → utils.ts: isResetPasswordPage() retorna true → hasOAuthTokensInUrl retorna false
  → Supabase SDK automaticamente troca o code por session
  → Usuario digita nova senha
  → Chama supabase.auth.updateUser({ password: novaSenha })
  → Sucesso: redirect para /login
```

**Arquivos envolvidos:**

- `src/screens/Auth/components/ForgotPasswordModal.tsx` - Modal de solicitar reset
- `src/screens/ResetPassword.tsx` - Tela de resetar senha
- `src/hooks/auth/utils.ts` - isResetPasswordPage (CRITICO: evita conflito com OAuth)
- `src/App.tsx` - Rota /reset-password

**Estados:**

- Sucesso: senha alterada, redirect para /login
- Erro: link expirado, senha fraca
- Loading: spinner durante operacao

**Diferenca localhost vs producao:**

- Link de reset aponta para URL de producao
- code= na URL pode conflitar com deteccao de OAuth se isResetPasswordPage falhar
- BUG CONHECIDO: ja houve conflito entre code= de reset e code= de OAuth

---

### onboarding

**Ponto de entrada:** Onboarding/index.tsx (rota /onboarding)
**Resultado esperado:** Perfil do usuario configurado com preferencias
**Dependencias externas:** Supabase (update profile)

**Caminho:**

```
ProtectedRoute detecta onboarding_completed=false
  → Redireciona para /onboarding
  → useOnboardingForm gerencia estado do formulario
  → Steps em sequencia:
    1. ProfileStep - foto, nome, bio, localizacao
    2. DislikesStep - cuisines que nao gosta
    3. OccasionsStep - ocasioes preferidas
    4. RadarStep - frequencia, tipos de lugar, comportamento
    5. RestrictionsStep - restricoes alimentares
  → Ao completar: salva preferencias via auth.service.updatePreferences
  → Marca onboarding_completed=true
  → Redirect para /feed
```

**Arquivos envolvidos:**

- `src/screens/Onboarding/index.tsx` - Container
- `src/screens/Onboarding/hooks/useOnboardingForm.ts` - Estado do formulario
- `src/screens/Onboarding/steps/*.tsx` - 5 steps
- `src/services/auth.service.ts` - updatePreferences, upsertProfile
- `src/components/ProtectedRoute.tsx` - Detecta onboarding incompleto

---

### feed

**Ponto de entrada:** Feed/index.tsx (rota /feed, tela principal)
**Resultado esperado:** Lista de reviews dos usuarios seguidos + descoberta
**Dependencias externas:** Supabase (reviews, likes, comments)

**Caminho:**

```
Feed/index.tsx renderiza
  → useFeedQuery busca reviews via FeedService.getOptimizedFeed()
    → feed.service.ts faz query com REVIEW_FEED_SELECT (reviews + user + restaurant)
    → Retorna reviews ordenadas por created_at DESC
  → useAuthContext fornece currentUser
  → useFollowContext fornece followingIds (para destacar reviews de seguidos)
  → useListsContext fornece listas (para modal de salvar)
  → ReviewCard renderiza cada review
  → Interacoes:
    - Like: FeedService.addLike / removeLike
    - Comentar: abre CommentsModal → FeedService.addComment
    - Salvar: abre ListModal → ListsService.addRestaurantToList
    - Ver restaurante: abre RestaurantDetailsModal
    - Ver review completa: abre FullReviewModal
    - Opcoes: abre OptionsModal
```

**Arquivos envolvidos:**

- `src/screens/Feed/index.tsx` - Container principal
- `src/screens/Feed/FeedHeader.tsx` - Header com tabs
- `src/screens/Feed/CommentsModal.tsx` - Modal de comentarios
- `src/screens/Feed/ListModal.tsx` - Modal de salvar em lista
- `src/screens/Feed/FullReviewModal.tsx` - Review expandida
- `src/screens/Feed/OptionsModal.tsx` - Opcoes (denunciar, etc)
- `src/hooks/useFeedQuery.ts` - Query de reviews
- `src/services/feed.service.ts` - CRUD de reviews, likes, comments
- `src/contexts/FeedContext.tsx` - Estado global do feed
- `src/components/ReviewCard.tsx` - Card de review
- `src/components/RestaurantDetailsModal.tsx` - Detalhes do restaurante

---

### discover

**Ponto de entrada:** Discover/index.tsx (rota /discover)
**Resultado esperado:** Buscar e descobrir restaurantes
**Dependencias externas:** Supabase, Google Places API (via Edge Function)

**Caminho:**

```
Discover/index.tsx renderiza
  → Modo Explore (padrao):
    → ExploreMode.tsx mostra restaurantes em grid
    → useRestaurantSearch busca restaurantes do banco local
  → Modo Busca (quando usuario digita):
    → SearchView.tsx exibe resultados
    → useRestaurantAutocomplete busca via Google Places autocomplete
    → useRestaurantSearch busca restaurantes combinando local + Google
      → google-places.service busca via Edge Function supabase.functions.invoke('google-places')
    → useRecentSearches salva/carrega buscas recentes
  → Modo Perfis:
    → ProfilesView.tsx busca usuarios
  → Filtros:
    → FiltersModal aplica filtros (cuisine, price, distance)
  → Ao clicar restaurante:
    → RestaurantDetailsModal com detalhes + reviews
```

**Arquivos envolvidos:**

- `src/screens/Discover/index.tsx` - Container
- `src/screens/Discover/ExploreMode.tsx` - Grid de exploracao
- `src/screens/Discover/SearchView.tsx` - Resultados de busca
- `src/screens/Discover/ProfilesView.tsx` - Busca de perfis
- `src/screens/Discover/FiltersModal.tsx` - Filtros
- `src/hooks/useRestaurantSearch.ts` - Busca combinada
- `src/hooks/useRestaurantAutocomplete.ts` - Autocomplete Google
- `src/hooks/useRecentSearches.ts` - Buscas recentes
- `src/services/google-places.service.ts` - Google Places API
- `src/components/RestaurantDetailsModal.tsx` - Detalhes
- `src/components/RestaurantPreview.tsx` - Preview card

**Diferenca localhost vs producao:**

- Google Places Edge Function roda em Supabase hosted (producao) ou local
- Localhost: Supabase local pode nao ter a Edge Function deployada
- Chaves de API podem ser diferentes

---

### create-review

**Ponto de entrada:** NewReview/index.tsx (rota /new-review)
**Resultado esperado:** Review criada com fotos, scores, tags
**Dependencias externas:** Supabase (storage, DB), Google Places (busca restaurante)

**Caminho:**

```
NewReview/index.tsx renderiza
  → useReviewForm gerencia estado do formulario
  → useDraftManagement salva/carrega rascunhos
  → Step1.tsx:
    → RestaurantSelector busca restaurante (Google Places + local)
    → PhotoManager gerencia upload de fotos
      → usePhotoUpload comprime e faz upload via StorageService
    → ScoreSliders para notas (1-5)
  → Step2.tsx:
    → TagCategorySection para tags (formato, cuisine, diet, occasion)
    → TagFriendsModal para marcar amigos
    → Campo de descricao
  → usePostReview envia review:
    → FeedService.createReview cria review no banco
    → FeedService.updateReviewPhotos associa fotos
    → FeedService.addReviewTags adiciona tags
    → Invalida cache do feed
    → Redirect para /feed
```

**Arquivos envolvidos:**

- `src/screens/NewReview/index.tsx` - Container
- `src/screens/NewReview/Step1.tsx` - Restaurante, fotos, scores
- `src/screens/NewReview/Step2.tsx` - Tags, descricao
- `src/screens/NewReview/components/*.tsx` - Sub-componentes
- `src/screens/NewReview/hooks/*.ts` - Form, draft, upload, post
- `src/services/feed.service.ts` - createReview
- `src/services/storage.service.ts` - Upload de fotos
- `src/services/google-places.service.ts` - Busca restaurante
- `src/contexts/FeedContext.tsx` - Invalida cache

---

### lists

**Ponto de entrada:** Lists/index.tsx (rota /lists)
**Resultado esperado:** Visualizar, criar e gerenciar listas de restaurantes
**Dependencias externas:** Supabase

**Caminho:**

```
Lists/index.tsx renderiza
  → useListsContext fornece listas do usuario
  → SavedListsGrid exibe listas em grid
  → useListReorder permite reordenar listas via drag
  → CreateListModal: criar nova lista
    → ListsService.createList
  → Ao clicar lista: navega para /lists/:id (ListDetails)
```

**Arquivos envolvidos:**

- `src/screens/Lists/index.tsx` - Container
- `src/screens/Lists/CreateListModal.tsx` - Criar lista
- `src/screens/Lists/SavedListsGrid.tsx` - Grid de listas
- `src/hooks/useListReorder.ts` - Reordenacao
- `src/contexts/ListsContext.tsx` - Estado de listas
- `src/services/lists.service.ts` - CRUD de listas

---

### profile

**Ponto de entrada:** Profile/index.tsx (rota /profile ou /profile/:username)
**Resultado esperado:** Ver perfil (proprio ou de outro usuario) com reviews, listas, stats
**Dependencias externas:** Supabase

**Caminho:**

```
Profile/index.tsx renderiza
  → useAuthContext fornece currentUser
  → Se perfil proprio: usa dados do AuthContext
  → Se perfil de outro: busca via query
  → ProfileHeader: foto, nome, username
  → ProfileInfo: bio, stats (reviews, followers, following)
  → RecentActivity: reviews recentes do usuario
  → ListsSlider: listas do usuario
  → FollowListModal: lista de seguidores/seguindo
  → EditProfileModal: editar perfil proprio
```

**Arquivos envolvidos:**

- `src/screens/Profile/index.tsx` - Container
- `src/screens/Profile/ProfileHeader.tsx` - Header
- `src/screens/Profile/ProfileInfo.tsx` - Info + stats
- `src/screens/Profile/RecentActivity.tsx` - Reviews recentes
- `src/screens/Profile/ListsSlider.tsx` - Listas
- `src/screens/Profile/modals/*.tsx` - Modals diversos
- `src/contexts/FollowContext.tsx` - Follow/unfollow
- `src/contexts/ListsContext.tsx` - Listas
- `src/services/lists.service.ts` - Query de listas

---

## Fluxos Importantes

### follow-unfollow

**Ponto de entrada:** Qualquer tela com botao Follow (Profile, Feed, Discover, Notifications, Recommendations)
**Resultado esperado:** Seguir/parar de seguir usuario, atualizar contadores

**Caminho:**

```
Botao Follow clicado
  → useFollowContext.toggleFollow(userId)
    → useFollowQuery chama FollowService.follow/unfollow
    → Atualiza followingIds local
    → Haptic feedback
    → Invalida caches relacionados
  → Notificacao criada para o usuario seguido (via trigger DB)
```

**Arquivos envolvidos:**

- `src/contexts/FollowContext.tsx` - toggleFollow
- `src/hooks/useFollowQuery.ts` - Mutations
- `src/services/follow.service.ts` - follow, unfollow
- Consumidores: Feed, Profile, Discover, Notifications, Recommendations

---

### likes

**Ponto de entrada:** ReviewCard (botao de like) em Feed, Profile, ReviewDetail
**Resultado esperado:** Like/unlike em review, atualiza contagem

**Caminho:**

```
Botao like clicado
  → useFeedContext.toggleLike(reviewId)
    → FeedService.addLike / removeLike
    → Atualiza estado local (optimistic update)
    → Haptic feedback
  → Notificacao criada (via trigger DB)
```

**Arquivos envolvidos:**

- `src/contexts/FeedContext.tsx` - toggleLike
- `src/hooks/useFeedQuery.ts` - Mutation
- `src/services/feed.service.ts` - addLike, removeLike
- `src/components/ReviewCard.tsx` - Botao de like

---

### comments

**Ponto de entrada:** CommentsModal (aberto de Feed, ReviewDetail)
**Resultado esperado:** Visualizar e adicionar comentarios em review

**Caminho:**

```
CommentsModal abre
  → FeedService.getComments(reviewId)
    → comment-threading.ts organiza em arvore (replies)
  → Usuario digita comentario
  → FeedService.addComment(reviewId, content, parentId?)
  → Atualiza lista local
  → Notificacao criada (via trigger DB)
```

**Arquivos envolvidos:**

- `src/screens/Feed/CommentsModal.tsx` - Modal
- `src/services/feed.service.ts` - getComments, addComment
- `src/utils/comment-threading.ts` - Organiza replies
- `src/services/comment-likes.service.ts` - Likes em comentarios

---

### notifications

**Ponto de entrada:** Notifications.tsx (rota /notifications)
**Resultado esperado:** Listar notificacoes (likes, comments, follows)

**Caminho:**

```
Notifications.tsx renderiza
  → useNotificationsQuery busca via NotificationService.getNotifications
  → Lista notificacoes por tipo (like, comment, follow)
  → Mark as read: NotificationService.markAllAsRead
  → Ao clicar: navega para contexto (review, profile)
```

**Arquivos envolvidos:**

- `src/screens/Notifications.tsx` - Tela
- `src/hooks/useNotificationsQuery.ts` - Query
- `src/services/notification.service.ts` - CRUD

---

## Fluxos Secundarios

### settings

**Ponto de entrada:** Settings/index.tsx (rota /settings)
**Resultado esperado:** Gerenciar configuracoes da conta

**Caminho:**

```
Settings/index.tsx renderiza
  → SettingsList mostra opcoes
  → Modals: EditProfile, Security (trocar senha), Privacy, Notifications, Help, About
  → Logout: useAuthContext.signOut()
```

**Arquivos envolvidos:**

- `src/screens/Settings/index.tsx` - Container
- `src/screens/Settings/components/*.tsx` - Modals de cada secao
- `src/contexts/AuthContext.tsx` - signOut

---

### restaurant-detail

**Ponto de entrada:** RestaurantDetailsModal (aberto de Feed, Discover, ListDetails, Recommendations)
**Resultado esperado:** Ver detalhes do restaurante com reviews

**Caminho:**

```
RestaurantDetailsModal abre com restaurante selecionado
  → Mostra info do restaurante (nome, endereco, tipo, foto)
  → RestaurantReviewsSection busca reviews do restaurante
  → Botoes: salvar em lista, ver no mapa, compartilhar
```

**Arquivos envolvidos:**

- `src/components/RestaurantDetailsModal.tsx` - Modal
- `src/components/RestaurantReviewsSection.tsx` - Reviews
- `src/components/RestaurantMap.tsx` - Mapa
- `src/hooks/useRestaurantReviews.ts` - Query de reviews

---

## Error Paths - Caminhos de Erro Conhecidos

Documentacao dos caminhos de erro criticos que os fluxos podem tomar.
Referencia para Diagnostician (Sage) e Regression Guard (Shield).

### Auth Errors (afetam todos os fluxos protegidos)

| Erro                        | Trigger                              | Resultado Visivel                            | Recovery                           |
| --------------------------- | ------------------------------------ | -------------------------------------------- | ---------------------------------- |
| Token expirado              | Session > 1h sem refresh             | Redirect para /login                         | Auto-refresh via onAuthStateChange |
| fetchUserData timeout (8s)  | Latencia de rede alta (3G/4G)        | Loading infinito ou redirect para onboarding | Fallback para query direta (6s)    |
| PKCE code_verifier lost     | www vs non-www redirect              | "Erro de conexao" generico                   | Auto-retry OAuth (1x)              |
| OAuth error in hash         | Supabase retorna erro no fragment    | Mensagem amigavel via mapOAuthError()        | Redireciona para login             |
| Email ja registrado (OAuth) | Usuario com email+senha tenta Google | "E-mail ja cadastrado com senha"             | Botao "Ir para login"              |
| Session null apos refresh   | Supabase SDK bug ou token corrupto   | Redirect para /login                         | signOut + re-login                 |

### Network Errors (afetam qualquer operacao de dados)

| Erro                  | Trigger                             | Resultado Visivel                      | Recovery                       |
| --------------------- | ----------------------------------- | -------------------------------------- | ------------------------------ |
| Supabase offline      | Manutencao ou DNS failure           | "Erro de conexao" em qualquer operacao | Retry automatico (React Query) |
| Edge Function timeout | google-places demora > 25s          | Busca de restaurante falha             | Retry com backoff              |
| Rate limit (429)      | Muitas requests em sequencia        | Operacao falha silenciosamente         | Exponential backoff            |
| RLS policy block      | Usuario tenta acessar dado de outro | Data retorna vazio (nao erro)          | Nao ha recovery - by design    |

### State Errors (afetam fluxos especificos)

| Erro                      | Trigger                             | Resultado Visivel               | Recovery                                     |
| ------------------------- | ----------------------------------- | ------------------------------- | -------------------------------------------- |
| currentUser=null          | fetchUserData falhou ou nao rodou   | App redireciona para onboarding | Re-login ou refresh page                     |
| Stale cache (React Query) | Cache nao invalidado apos mutacao   | Dados antigos exibidos          | Manual invalidation ou pull-to-refresh       |
| Optimistic update revert  | Operacao falha apos update otimista | Like/unlike "pisca"             | Revert automatico pelo React Query           |
| Context provider order    | AppContext wraps em ordem errada    | Hooks nao encontram context     | Fix no AppContext.tsx (raro, so em refactor) |

### Third-Party Errors

| Erro                    | Trigger                            | Resultado Visivel           | Recovery                       |
| ----------------------- | ---------------------------------- | --------------------------- | ------------------------------ |
| Google OAuth down       | Google fora do ar (raro)           | Botao Google nao funciona   | Usar login email+senha         |
| Google Places API error | Quota excedida ou API key invalida | Busca de restaurantes vazia | Verificar quota no GCP console |
| Capacitor bridge fail   | API nativa nao disponivel          | Feature degrada para web    | isNative() check + fallback    |

---

# Sub-Fluxos Detalhados

Mapeamento completo de todos os sub-fluxos de usuario por feature.
Gerado: 2026-02-11 | Total: 77 sub-fluxos

---

## Lists - Sub-Fluxos (12)

### lists/create-list

**Ponto de entrada:** Botao "+" no header da tela Lists
**Resultado esperado:** Nova lista criada e visivel no grid

**Caminho:**
```
Botao "+" clicado
  → Lists/index.tsx abre CreateListModal
  → Usuario preenche nome, toggle privacidade, cover photo (opcional)
  → Se cover: CropModal abre (aspect ratio 2:1) → crop confirma
  → handleSave()
    → useListsContext().createList()
      → useListsQuery.createListMutation.mutate()
        → ListsService.createList(supabase, { user_id, name, is_private, cover_photo_url })
          → supabase.from("lists").insert()
    → Optimistic update no React Query cache
  → Modal fecha, lista aparece no grid
```

**Arquivos envolvidos:**
- `src/screens/Lists/index.tsx` - Botao e estado do modal
- `src/screens/Lists/CreateListModal.tsx` - Formulario
- `src/contexts/ListsContext.tsx` - createList
- `src/hooks/useListsQuery.ts` - createListMutation
- `src/services/lists.service.ts` - createList
- `src/services/storage.service.ts` - uploadListCover (se cover)
- `src/components/CropModal.tsx` - Crop de imagem

**Estados:**
- Loading: `saving` state no CreateListModal
- Sucesso: Modal fecha, lista aparece no grid
- Erro: Alert dialog, modal permanece aberto
- Cover: Opcional com CropModal para aspect ratio 2:1

---

### lists/edit-list

**Ponto de entrada:** Botao de editar (icone lapis) no card da lista
**Resultado esperado:** Lista atualizada com novos dados

**Caminho:**
```
Botao editar clicado
  → Lists/index.tsx abre CreateListModal (mode: "edit")
  → Formulario pre-preenchido com dados atuais
  → Usuario edita nome, privacidade, cover
  → handleSave()
    → useListsContext().updateList()
      → useListsQuery.updateListMutation.mutate()
        → ListsService.updateList(supabase, listId, updates)
          → supabase.from("lists").update().eq("user_id", userId)
    → Optimistic update no cache
  → Modal fecha, lista atualizada no grid
```

**Arquivos envolvidos:**
- `src/screens/Lists/index.tsx` - openEditModal
- `src/screens/Lists/CreateListModal.tsx` - Formulario em modo edit
- `src/contexts/ListsContext.tsx` - updateList
- `src/hooks/useListsQuery.ts` - updateListMutation
- `src/services/lists.service.ts` - updateList com ownership validation

**Estados:**
- Loading: `saving` state
- Sucesso: Modal fecha, lista atualiza
- Erro: Alert dialog
- Restricao: Nome da lista default ("Quero ir") nao pode ser editado

---

### lists/delete-list

**Ponto de entrada:** Botao "Excluir lista" no CreateListModal (modo edit)
**Resultado esperado:** Lista removida do grid

**Caminho:**
```
Botao "Excluir lista" clicado
  → window.confirm() com nome da lista
  → handleDelete()
    → useListsContext().deleteList()
      → useListsQuery.deleteListMutation.mutate()
        → ListsService.deleteList(supabase, listId)
          → supabase.from("lists").delete().eq("user_id", userId)
    → Optimistic delete com rollback em caso de erro
  → Modal fecha, lista removida do grid
```

**Arquivos envolvidos:**
- `src/screens/Lists/CreateListModal.tsx` - handleDelete
- `src/contexts/ListsContext.tsx` - deleteList
- `src/hooks/useListsQuery.ts` - deleteListMutation com rollback
- `src/services/lists.service.ts` - deleteList com ownership validation

**Estados:**
- Confirmacao: window.confirm() antes de deletar
- Loading: `saving` state
- Sucesso: Lista removida do grid
- Erro: Alert dialog, lista restaurada via rollback
- Restricao: Listas default nao podem ser deletadas

---

### lists/change-list-photo

**Ponto de entrada:** Area de upload de cover no CreateListModal ou EditListModal
**Resultado esperado:** Cover photo atualizada

**Caminho:**
```
Area de upload clicada
  → File input abre
  → Imagem selecionada
  → CropModal abre (aspect ratio 2:1)
  → Usuario posiciona crop → confirma
  → handleCropConfirm()
    → Blob URL criada para preview
    → Upload acontece so no save (nao na selecao)
  → No save:
    → StorageService.uploadListCover(supabase, file, userId, listId)
      → supabase.storage.from("lists").upload()
    → URL salva no campo cover_photo_url
```

**Arquivos envolvidos:**
- `src/screens/Lists/CreateListModal.tsx` - Upload em modo create
- `src/screens/ListDetails/EditListModal.tsx` - Upload em modo edit
- `src/components/CropModal.tsx` - Crop UI
- `src/services/storage.service.ts` - uploadListCover

**Estados:**
- Crop: CropModal com controles de posicao
- Preview: Blob URL atualiza imediatamente
- Sucesso: Cover atualizada apos save
- Cleanup: Blob URLs revogadas no unmount

---

### lists/save-third-party-list

**Ponto de entrada:** Icone de bookmark no header do ListDetails (lista de outro usuario)
**Resultado esperado:** Lista salva nos favoritos do usuario

**Caminho:**
```
Icone bookmark clicado
  → useListDetails().toggleSaveList()
    → ListsService.saveList(supabase, userId, listId)
      → supabase.from("saved_lists").insert({ user_id, list_id })
  → Icone muda para preenchido
  → Toast "Lista salva! Atualizacoes serao sincronizadas automaticamente"
```

**Arquivos envolvidos:**
- `src/screens/ListDetails/index.tsx` - Botao bookmark
- `src/hooks/useListDetails.ts` - toggleSaveList, isListSaved
- `src/services/lists.service.ts` - saveList, unsaveList, isListSaved

**Estados:**
- Loading: `savingList` durante toggle
- Salvo: Icone preenchido, background primary/10
- Nao salvo: Icone outlined
- Erro: Toast "Erro ao salvar lista"

---

### lists/unsave-list

**Ponto de entrada:** Icone de bookmark (preenchido) no ListDetails
**Resultado esperado:** Lista removida dos salvos

**Caminho:**
```
Icone bookmark clicado (ja salvo)
  → useListDetails().toggleSaveList()
    → ListsService.unsaveList(supabase, userId, listId)
      → supabase.from("saved_lists").delete().eq("user_id", userId).eq("list_id", listId)
  → Icone muda para outlined
  → Toast "Lista removida dos salvos"
```

---

### lists/reorder-lists

**Ponto de entrada:** Icone swap no header da tela Lists (aparece se count > 1)
**Resultado esperado:** Listas reordenadas

**Caminho:**
```
Icone swap clicado
  → useListReorder() ativa modo reorder
  → Header muda: mostra "Close" e "Check"
  → Grid mostra drag handles
  → Usuario arrasta lista:
    → Touch/mouse drag detection
    → RequestAnimationFrame para drag suave
    → Cached DOM rects para performance
    → Haptic feedback (50ms vibracao)
    → Outros items deslocam com transicao 150ms
  → Botao "Check" clicado:
    → ListsService.reorderLists(supabase, userId, listIds, orders)
      → supabase.rpc("fn_reorder_lists", { p_user_id, p_list_ids, p_orders })
    → Optimistic update com rollback em erro
  → Modo reorder desativa
```

**Arquivos envolvidos:**
- `src/screens/Lists/index.tsx` - Toggle modo reorder
- `src/hooks/useListReorder.ts` - Drag state, DOM transforms, save
- `src/services/lists.service.ts` - reorderLists RPC
- `src/contexts/ListsContext.tsx` - seedLists para optimistic update

**Estados:**
- Modo reorder: Header com Close/Check, drag handles visiveis
- Dragging: Opacity 0.6, scale 0.97, z-index 10
- Saving: Check button com spinner
- Sucesso: Reorder mode desativa
- Erro: Alert, rollback para ordem anterior

---

### lists/share-list

**Ponto de entrada:** Icone share no header do ListDetails
**Resultado esperado:** Lista compartilhada via WhatsApp, link ou native share

**Caminho:**
```
Icone share clicado
  → ShareModal abre
  → 3 opcoes:
    1. WhatsApp:
       → Mobile: whatsapp://send?text=*{nome}* no Fomi\n{count} restaurantes\n\n{url}
       → Desktop: https://wa.me/?text=...
       → Fallback para web apos 500ms no mobile
    2. Copiar link:
       → navigator.clipboard.writeText(shareUrl)
       → shareUrl = ${origin}/lists/{listId}
    3. Native share:
       → navigator.share({ title, text, url })
  → Modal fecha apos acao
```

**Arquivos envolvidos:**
- `src/screens/ListDetails/index.tsx` - Botao share
- `src/screens/ListDetails/ShareModal.tsx` - Opcoes de compartilhamento

**Estados:**
- Modal abre/fecha
- Todas as acoes fecham o modal
- Nao tem loading (client-side)

---

### lists/add-restaurant-to-list

**Ponto de entrada:** Botao "+" no header do ListDetails (so listas proprias)
**Resultado esperado:** Restaurante adicionado a lista

**Caminho:**
```
Botao "+" clicado
  → AddRestaurantModal abre
  → Usuario digita nome (debounce 300ms)
    → ListsService.searchRestaurants(supabase, query)
      → supabase.from("restaurants").select().ilike("name", "%{query}%")
      → Input sanitizado: query.replace(/[%_]/g, "\\$&").slice(0, 50)
  → Resultados aparecem com fotos
  → Restaurantes ja na lista: disabled (opacity 0.6, checkmark)
  → Usuario clica resultado:
    → useListDetails().addItem(restaurantId)
      → ListsService.addRestaurantToList(supabase, listId, restaurantId)
        → supabase.from("list_restaurants").insert({ list_id, restaurant_id })
    → Toast "Restaurante adicionado!"
    → Se duplicado: Toast "Restaurante ja esta na lista!"
```

**Arquivos envolvidos:**
- `src/screens/ListDetails/index.tsx` - Botao e integracao
- `src/screens/ListDetails/AddRestaurantModal.tsx` - Busca e selecao
- `src/hooks/useListDetails.ts` - addItem
- `src/contexts/ListsContext.tsx` - addRestaurantToList
- `src/hooks/useListsQuery.ts` - addToListMutation
- `src/services/lists.service.ts` - searchRestaurants, addRestaurantToList

**Estados:**
- Busca: Debounce 300ms com spinner
- Resultados: Grid com fotos e nomes
- Duplicado: Toast + modal permanece aberto
- Sucesso: Toast + modal fecha
- Prevencao SQL injection: Input sanitizado

---

### lists/remove-restaurant-from-list

**Ponto de entrada:** Swipe left no item do restaurante no ListDetails
**Resultado esperado:** Restaurante removido da lista

**Caminho:**
```
Swipe left no item
  → Botao delete vermelho aparece (80px)
  → Usuario clica delete:
    → useListDetails().removeItem(restaurantId)
      → ListsService.removeRestaurantFromList(supabase, listId, restaurantId)
        → supabase.from("list_restaurants").delete()
          .eq("list_id", listId).eq("restaurant_id", restaurantId)
    → Optimistic update no cache
    → Toast "Restaurante removido"
    → Contador decrementado
```

**Arquivos envolvidos:**
- `src/screens/ListDetails/index.tsx` - Swipeable container
- `src/hooks/useListDetails.ts` - removeItem
- `src/contexts/ListsContext.tsx` - removeRestaurantFromList
- `src/hooks/useListsQuery.ts` - removeFromListMutation
- `src/services/lists.service.ts` - removeRestaurantFromList

---

### lists/view-list-details

**Ponto de entrada:** Click no card de lista na tela Lists ou SavedListsGrid
**Resultado esperado:** Pagina de detalhes da lista com restaurantes

**Caminho:**
```
Card clicado → navigate(/lists/{listId})
  → ListDetails/index.tsx renderiza
  → useListDetails() busca dados:
    → Lista propria: dados do contexto
    → Lista de outro: supabase.from("lists").select().eq("id", listId)
    → Restaurantes: supabase.from("list_restaurants").select().eq("list_id", id)
    → Status salvo: supabase.from("saved_lists").select().eq("user_id").eq("list_id")
  → Header com nome, privacidade, botoes de acao
  → Lista de restaurantes com fotos
  → AbortController previne dados stale
```

**Arquivos envolvidos:**
- `src/screens/ListDetails/index.tsx` - Display principal
- `src/hooks/useListDetails.ts` - Data fetching
- `src/contexts/ListsContext.tsx` - getRestaurantsByIds
- `src/services/lists.service.ts` - Queries

**Estados:**
- Loading: Skeleton cards
- Loaded: Header + lista de restaurantes
- Permissoes: Lista propria vs alheia (botoes diferentes)
- Privada: Icone de cadeado no header
- Vazia: Empty state com botao de adicionar
- Nao encontrada: Mensagem de erro
- Login: Modal de login apos 3s para usuarios nao logados

---

## Feed - Sub-Fluxos (24)

### feed/like-review

**Ponto de entrada:** Botao de coracao no ReviewCard OU double-tap na foto
**Resultado esperado:** Review curtida, contador incrementado

**Caminho:**
```
Botao like clicado OU double-tap na foto
  → Feed/index.tsx handleToggleLike(reviewId)
  → useFeedQuery().toggleLike(reviewId)
    → likeMutation.mutate()
      → Se nao curtido: FeedService.addLike(supabase, reviewId, userId)
        → supabase.from("likes").insert({ review_id, user_id })
      → Se curtido: FeedService.removeLike(supabase, reviewId, userId)
        → supabase.from("likes").delete()
    → Optimistic update: is_liked toggle, likes_count +/-1
    → onError: rollback para estado anterior
```

**Arquivos envolvidos:**
- `src/components/ReviewCard.tsx` - Botao like + double-tap
- `src/screens/Feed/index.tsx` - handleToggleLike
- `src/hooks/useFeedQuery.ts` - toggleLike, likeMutation
- `src/services/feed.service.ts` - addLike, removeLike

**Estados:**
- Optimistic: Update imediato na UI
- Sucesso: Estado persiste
- Erro: Rollback automatico
- Double-tap: Animacao de coracao ping (800ms), so aplica like (nunca unlike)

---

### feed/comment-on-review

**Ponto de entrada:** Botao de comentario no ReviewCard ou input no CommentsModal
**Resultado esperado:** Comentario adicionado a review

**Caminho:**
```
Botao comentario clicado → CommentsModal abre
  → FeedService.getComments(supabase, reviewId) busca comentarios
  → Usuario digita comentario → handleSend()
    → useFeedContext().addComment(reviewId, content)
      → addCommentMutation.mutate()
        → FeedService.addComment(supabase, { review_id, content, user_id })
          → supabase.from("comments").insert()
    → Comentario adicionado a UI
    → comments_count incrementado na review
    → Input limpo
```

**Arquivos envolvidos:**
- `src/components/ReviewCard.tsx` - Botao comentario
- `src/screens/Feed/CommentsModal.tsx` - Modal + input + lista
- `src/contexts/FeedContext.tsx` - addComment
- `src/hooks/useFeedQuery.ts` - addCommentMutation
- `src/services/feed.service.ts` - addComment, getComments

**Estados:**
- Loading: `sending` state, botao disabled
- Sucesso: Comentario aparece, input limpo, contador incrementa
- Erro: Comentario nao adicionado

---

### feed/reply-to-comment

**Ponto de entrada:** Botao "Responder" em comentario no CommentsModal
**Resultado esperado:** Reply adicionado ao comentario pai

**Caminho:**
```
Botao "Responder" clicado
  → handleReply() seta replyingTo + pre-fill "@username"
  → Usuario digita reply → handleSend()
    → addComment(reviewId, content, parentCommentId)
      → supabase.from("comments").insert({ review_id, content, parent_comment_id })
  → Reply aparece abaixo do comentario pai
```

---

### feed/delete-comment

**Ponto de entrada:** Swipe left no comentario no CommentsModal
**Resultado esperado:** Comentario deletado

**Caminho:**
```
Swipe left no comentario
  → Botao delete aparece
  → handleDelete(commentId)
    → useFeedContext().deleteComment(commentId, reviewId)
      → deleteCommentMutation.mutate()
        → FeedService.deleteComment(supabase, commentId)
          → supabase.from("comments").delete()
    → Comentario removido da UI
    → comments_count decrementado
```

**Permissoes:** Usuario pode deletar seus proprios comentarios OU se e dono da review

---

### feed/like-comment

**Ponto de entrada:** Icone de coracao no comentario no CommentsModal
**Resultado esperado:** Like/unlike no comentario

**Caminho:**
```
Icone like clicado
  → handleLikeComment(commentId)
    → Mutex ref previne likes concorrentes
    → Optimistic update: isLikedByMe toggle, likes_count +/-1
    → Se ja curtido: supabase.from("comment_likes").delete()
    → Se nao curtido: supabase.from("comment_likes").insert()
    → onError: optimistic revert
```

---

### feed/share-review

**Ponto de entrada:** Botao share/send no ReviewCard
**Resultado esperado:** Review compartilhada via native share ou WhatsApp

**Caminho:**
```
Botao share clicado
  → handleShare(review)
    → Se navigator.share disponivel: native share dialog
    → Fallback: WhatsApp deep link
      → Mensagem: "Olha essa review de {restaurantName} no Fomi! {postUrl}"
```

---

### feed/report-review

**Ponto de entrada:** OptionsModal → "Denunciar" (reviews de outros)
**Resultado esperado:** Denuncia enviada

**Caminho:**
```
OptionsModal abre → "Denunciar" clicado
  → Selecao de motivo (radio buttons):
    - Spam
    - Conteudo improprio
    - Informacao falsa
    - Assedio ou bullying
    - Outro (com textarea)
  → handleReport()
    → supabase.from("reports").insert({ review_id, reason, details })
  → Toast "Denuncia enviada. Obrigado!"
```

---

### feed/delete-review

**Ponto de entrada:** OptionsModal → "Excluir" (so dono) → Confirmacao
**Resultado esperado:** Review removida do feed (soft delete)

**Caminho:**
```
OptionsModal → "Excluir" → Modal confirmacao
  → handleDeleteReview()
    → supabase.from("reviews").update({ is_active: false }).eq("id", reviewId)
    → Feed re-fetched via React Query
  → Toast "Review excluida"
```

**Nota:** Soft delete - review marcada is_active = false, nao deletada permanentemente

---

### feed/edit-review

**Ponto de entrada:** OptionsModal → "Editar" (so dono)
**Resultado esperado:** Navegacao para tela de edicao

**Caminho:**
```
OptionsModal → "Editar"
  → handleEditReview(review)
    → navigate("/new-review", { state: { editReview: review } })
  → NewReview carrega dados da review para edicao
```

---

### feed/save-restaurant-to-list

**Ponto de entrada:** Botao bookmark no ReviewCard
**Resultado esperado:** Restaurante salvo em lista selecionada

**Caminho:**
```
Botao bookmark clicado → ListModal abre
  → Mostra listas do usuario
  → toggleList(listId)
    → useListsContext().addRestaurantToList(listId, restaurantId)
      OU removeRestaurantFromList(listId, restaurantId)
  → Toast "Salvo em {listName}" OU "Removido de {listName}"
  → Sub-opcao: "Criar nova lista" → input nome + checkbox privada
```

---

### feed/view-full-review

**Ponto de entrada:** Link "ver review completo" no ReviewCard
**Resultado esperado:** Modal com review completa

**Caminho:**
```
Link clicado
  → setFullReviewModal(review)
  → FullReviewModal renderiza:
    → Info restaurante (clicavel → RestaurantDetailsModal)
    → Info usuario (clicavel → Profile)
    → Descricao completa
    → Todas as fotos (clicavel → fullscreen viewer com prev/next)
    → Tags (formato, cuisine, ocasiao, dieta)
    → Usuarios marcados
    → Scores individuais (5 criterios)
    → Media ponderada
    → Voltaria
    → Prato favorito
```

---

### feed/view-fullscreen-photo

**Ponto de entrada:** Click na foto no FullReviewModal
**Resultado esperado:** Foto em tela cheia com navegacao

**Caminho:**
```
Foto clicada → setFullscreenPhoto(index)
  → Overlay fullscreen com imagem centralizada
  → Botoes prev/next (se multiplas fotos) OU teclas setas
  → Click na imagem/X/backdrop fecha
```

---

### feed/view-restaurant-details

**Ponto de entrada:** Click no nome/badge do restaurante no ReviewCard ou FullReviewModal
**Resultado esperado:** Modal de detalhes do restaurante

**Caminho:**
```
Nome do restaurante clicado
  → handleRestaurantClick(restaurant)
  → setSelectedRestaurant(restaurant)
  → RestaurantDetailsModal renderiza
```

---

### feed/view-user-profile

**Ponto de entrada:** Click no username/avatar no ReviewCard, CommentsModal ou FullReviewModal
**Resultado esperado:** Navegacao para perfil do usuario

**Caminho:**
```
Avatar/username clicado
  → handleProfileClick(username)
  → navigate(/profile/@{username})
  → CommentsModal fecha antes de navegar (se aberto)
```

---

### feed/filter-feed-tabs

**Ponto de entrada:** Tabs "Para Voce" ou "Amigos" no FeedHeader
**Resultado esperado:** Feed filtrado por tab selecionada

**Caminho:**
```
Tab clicada → setActiveTab("forYou" | "friends")
  → displayedReviews (useMemo) filtra:
    → "Para Voce": todas as reviews
    → "Amigos": so mutual follows (eu sigo E me seguem)
      → reviews.filter(r => followingSet.has(r.user_id) && followersSet.has(r.user_id))
  → Virtualizer re-renderiza com reviews filtradas
```

---

### feed/toggle-follow-user

**Ponto de entrada:** Botao follow/following no ReviewCard
**Resultado esperado:** Follow/unfollow do usuario

**Caminho:**
```
Botao follow clicado
  → handleToggleFollow(userId)
    → Se seguindo: unfollowUser(userId)
    → Se nao seguindo: followUser(userId)
  → useFollowContext processa
  → Botao alterna entre "Seguir" e "Seguindo"
```

---

### feed/load-more-reviews

**Ponto de entrada:** Auto-trigger ao scrollar perto do final (infinite scroll)
**Resultado esperado:** Mais reviews carregadas

**Caminho:**
```
Scroll detecta ultimo item visivel >= length - 3
  → Mutex previne chamadas concorrentes (loadMoreInProgressRef)
  → useFeedQuery().fetchNextPage()
    → FeedService.getOptimizedFeed() com cursor
      → Paginacao cursor-based (created_at + id) para evitar duplicatas
      → Limite: 20 reviews por pagina
  → Novas reviews adicionadas a lista
  → Spinner no fundo durante loading
```

---

### feed/refresh-feed

**Ponto de entrada:** Pull-to-refresh OU click no logo do FeedHeader
**Resultado esperado:** Feed atualizado com reviews mais recentes

**Caminho:**
```
Pull gesture OU logo click
  → Logo click: smooth scroll para topo
  → Pull refresh: refreshFeed()
    → useFeedQuery().feedQuery.refetch()
    → Re-busca primeira pagina do feed
  → PullToRefreshIndicator mostra progresso
```

---

### feed/view-notifications-badge

**Ponto de entrada:** Icone de sino no FeedHeader
**Resultado esperado:** Navegacao para tela de notificacoes

**Caminho:**
```
Icone sino clicado → navigate("/notifications")
  → Badge mostra contagem (cap em "9+")
  → Realtime subscription: supabase channel escuta INSERT em notifications
  → Contagem incrementa automaticamente em tempo real
```

---

### feed/double-tap-heart-animation

**Ponto de entrada:** Double-tap na foto da review
**Resultado esperado:** Animacao de coracao + like aplicado

**Caminho:**
```
Segundo tap dentro de 300ms
  → handleDoubleTap()
    → Se review.is_liked === false: aplica like
    → Animacao: coracao grande com ping por 800ms
  → Nota: double-tap SEMPRE aplica like (nunca unlike)
```

---

### feed/scroll-restoration

**Ponto de entrada:** Retorno para Feed de outra tela
**Resultado esperado:** Scroll restaurado na posicao anterior

**Caminho:**
```
Navegacao de volta para /feed
  → useScrollRestoration(feedContainerRef, 'feed')
  → Verifica location.state?.scrollToReview
  → Virtualizer scrolla para review alvo
  → history.replaceState limpa state
```

---

## Profile - Sub-Fluxos (18)

### profile/edit-profile

**Ponto de entrada:** Menu → "Editar Perfil" no ProfileHeader
**Resultado esperado:** Perfil atualizado

**Caminho:**
```
Menu → "Editar Perfil"
  → EditProfileModal abre (multi-step form)
  → Campos editaveis: full_name, username, bio, city, neighborhood
  → handleSaveMain() valida username
  → onSave(updates)
    → supabase.from("profiles").update(updates).eq("id", currentUser.id)
  → Toast "Perfil atualizado!"
  → Modal fecha, perfil atualiza
```

**Arquivos envolvidos:**
- `src/screens/Profile/index.tsx` - Orquestracao
- `src/screens/Profile/ProfileHeader.tsx` - Entry point
- `src/screens/Profile/modals/EditProfileModal.tsx` - Formulario
- `src/screens/Profile/modals/CropModal.tsx` - Crop de foto

---

### profile/change-profile-photo

**Ponto de entrada:** Click no avatar no EditProfileModal → "Alterar foto"
**Resultado esperado:** Foto de perfil atualizada

**Caminho:**
```
Avatar clicado → file input abre
  → Imagem selecionada → validacao
  → setTempPhotoPreview(blob URL)
  → CropModal abre
    → handleCropConfirm()
      → StorageService.uploadProfilePhoto(supabase, file, userId)
        → supabase.storage.from("profile-photos").upload()
        → supabase.storage.from("profile-photos").getPublicUrl()
      → profile_photo_url atualizada com cache-bust timestamp
  → Toast "Foto atualizada com sucesso!"
```

**Arquivos envolvidos:**
- `src/screens/Profile/modals/EditProfileModal.tsx` - Upload handler
- `src/screens/Profile/modals/CropModal.tsx` - Crop UI
- `src/services/storage.service.ts` - uploadProfilePhoto

**Estados:**
- Blob URL: Criada e revogada para prevenir memory leaks
- Cache-busting: Timestamp adicionado a URL para forcar refresh

---

### profile/view-followers

**Ponto de entrada:** Contador de followers no ProfileInfo
**Resultado esperado:** Modal com lista de seguidores

**Caminho:**
```
Contador clicado → setFollowListType("followers")
  → useEffect dispara fetchFollowers()
    → supabase.from("follows").select(
        "follower:profiles!follower_id(id, username, full_name, profile_photo_url)"
      ).eq("following_id", profileUser.id)
  → FollowListModal exibe usuarios
  → Click em usuario → navigate(/profile/@{username})
```

---

### profile/view-following

**Ponto de entrada:** Contador de following no ProfileInfo
**Resultado esperado:** Modal com lista de seguindo

**Caminho:**
```
Contador clicado → setFollowListType("following")
  → useEffect dispara fetchFollowing()
    → supabase.from("follows").select(
        "following:profiles!following_id(id, username, full_name, profile_photo_url)"
      ).eq("follower_id", profileUser.id)
  → FollowListModal exibe usuarios
```

---

### profile/follow-user

**Ponto de entrada:** Botao "Seguir" no ProfileInfo (so perfis de outros)
**Resultado esperado:** Usuario seguido

**Caminho:**
```
Botao "Seguir" clicado
  → toggleFollow()
    → followUser(profileUser.id) [FollowContext]
      → FollowService.follow(supabase, currentUser.id, profileUser.id)
        → supabase.from("follows").insert({ follower_id, following_id })
      → Optimistic update no React Query
      → Invalidate feeds, profile, followers counts
  → followers_count + 1
  → Haptic feedback: medium vibration
  → Toast "Seguindo!"
  → Botao muda para "Seguindo"
```

---

### profile/unfollow-user

**Ponto de entrada:** Botao "Seguindo" → ConfirmModal
**Resultado esperado:** Deixou de seguir usuario

**Caminho:**
```
Botao "Seguindo" clicado → setShowUnfollowConfirm(true)
  → ConfirmModal: "Deixar de seguir @username?"
  → Confirma:
    → unfollowUser(profileUser.id)
      → FollowService.unfollow(supabase, currentUser.id, profileUser.id)
        → supabase.from("follows").delete()
      → Optimistic update
      → Feed invalidado (remove conteudo do usuario)
  → followers_count - 1
  → Haptic feedback: light vibration
  → Toast "Deixou de seguir"
```

---

### profile/view-user-reviews

**Ponto de entrada:** Scroll na pagina de perfil (infinite scroll)
**Resultado esperado:** Reviews do usuario carregadas

**Caminho:**
```
Perfil carrega:
  → supabase.rpc("get_profile_data", { p_username, p_viewer_id })
    → Retorna reviews com restaurant + user relations
  → setUserReviews(reviews)
  → RecentActivity exibe como ActivityCards

Infinite scroll:
  → IntersectionObserver no sentinel
  → supabase.from("reviews").select(...)
    .eq("user_id", profileUser.id)
    .eq("is_active", true)
    .range(offset, offset + 10 - 1)
  → Novas reviews adicionadas
```

---

### profile/view-user-lists

**Ponto de entrada:** ListsSlider no perfil
**Resultado esperado:** Listas do usuario exibidas em carousel

**Caminho:**
```
Perfil carrega → get_profile_data retorna listas
  → ListsSlider filtra por visibilidade:
    → is_default: mostra se perfil proprio OU seguindo
    → !is_default: mostra se perfil proprio OU nao privada
  → Carousel horizontal com cover photos
  → Click → navigate(/lists/{listId})
  → Perfil proprio: botao "Criar nova lista"
```

---

### profile/block-user

**Ponto de entrada:** Menu → "Bloquear" (perfis de outros)
**Resultado esperado:** Usuario bloqueado

**Caminho:**
```
Menu → "Bloquear" → ConfirmModal
  → "Bloquear @username? Eles nao poderao ver seu perfil."
  → Confirma:
    → supabase.from("blocks").insert({ blocker_id, blocked_id })
    → setIsBlocked(true)
  → UI muda para estado bloqueado:
    → Icone cadeado + "Usuario Bloqueado"
    → "Desbloqueie para ver o perfil"
  → Toast "Bloqueou @{username}"
```

---

### profile/report-user

**Ponto de entrada:** Menu → "Denunciar" (perfis de outros)
**Resultado esperado:** Denuncia registrada

**Caminho:**
```
Menu → "Denunciar"
  → Toast "Denuncia enviada"
  → NOTA: Implementacao placeholder - nao cria registro no DB atualmente
```

---

### profile/delete-review

**Ponto de entrada:** ActivityCard options → Delete → ConfirmModal
**Resultado esperado:** Review removida (soft delete)

**Caminho:**
```
Options → Delete → ConfirmModal "Excluir review? Esta acao nao pode ser desfeita."
  → handleDeleteReview()
    → supabase.from("reviews").update({ is_active: false }).eq("id", reviewId)
    → setUserReviews filter out
    → reviews_count - 1
  → Toast "Review excluida"
```

---

### profile/edit-review

**Ponto de entrada:** ActivityCard options → Editar
**Resultado esperado:** Navegacao para edicao

**Caminho:**
```
Options → "Editar"
  → navigate("/new-review", { state: { editReview: review } })
```

---

### profile/add-restaurant-to-list

**Ponto de entrada:** Botao add-circle no ActivityCard
**Resultado esperado:** Restaurante adicionado a lista selecionada

**Caminho:**
```
Botao add-circle clicado
  → ListSelectorModal abre com listas do usuario
  → Usuario seleciona lista
    → addRestaurantToList(listId, restaurantId) [ListsContext]
  → Toast "Salvo em \"{listName}\""
```

---

### profile/toggle-want-to-go

**Ponto de entrada:** Botao bookmark no ActivityCard
**Resultado esperado:** Restaurante salvo/removido da lista "Quero ir"

**Caminho:**
```
Botao bookmark clicado
  → Se nao autenticado: Toast "Faca login para salvar" → return
  → toggleSaveRestaurant(restaurantId) [ListsContext]
    → Adiciona/remove da lista default "Quero ir"
  → Toast "Salvo em 'Quero ir'" OU "Removido de 'Quero ir'"
```

---

### profile/view-expanded-photo

**Ponto de entrada:** Click no avatar no ProfileInfo
**Resultado esperado:** Foto em tela cheia

**Caminho:**
```
Avatar clicado → setShowExpandedPhoto(true)
  → ExpandedPhotoModal abre com backdrop blur
  → Mostra foto full size + nome
  → Click para fechar
  → Fallback: DEFAULT_AVATAR se sem foto ou erro
```

---

### profile/share-profile

**Ponto de entrada:** Menu → "Compartilhar Perfil" (perfil proprio)
**Resultado esperado:** Perfil compartilhado

**Caminho:**
```
Menu → "Compartilhar Perfil"
  → Se navigator.share: native share({ title: "Perfil de {name}", url })
  → Fallback: navigator.clipboard.writeText(url)
  → Toast "Link copiado!"
```

---

### profile/save-list

**Ponto de entrada:** Bookmark no ListsSlider (perfis de outros)
**Resultado esperado:** Lista salva nos favoritos

**Caminho:**
```
Bookmark clicado
  → handleToggleSaveList(listId)
    → ListsService.saveList(supabase, userId, listId)
      → supabase.from("list_saved_by").insert()
  → Bookmark muda cor (primary)
  → Toast "Lista salva!"
```

---

## NewReview - Sub-Fluxos (9)

### new-review/select-restaurant

**Ponto de entrada:** Step1 → RestaurantSelector
**Resultado esperado:** Restaurante selecionado para review

**Caminho:**
```
Input de restaurante clicado → usuario digita
  → Google Places API autocomplete (>= 3 chars)
  → Dropdown com resultados
  → Click no resultado:
    → form.setSelectedRestaurant(restaurant)
    → Dropdown fecha
    → Botao Next habilitado
```

**Arquivos envolvidos:**
- `src/screens/NewReview/Step1.tsx`
- `src/screens/NewReview/components/RestaurantSelector.tsx`
- `src/screens/NewReview/hooks/useReviewForm.ts`

---

### new-review/upload-photos

**Ponto de entrada:** Step1 → PhotoManager
**Resultado esperado:** Fotos adicionadas com preview

**Caminho:**
```
Botao "Add photos" OU drag-drop
  → Validacao: max 10MB por foto, max 10 fotos
  → Preview blob URL criada: URL.createObjectURL(file)
  → PhotoItem adicionado ao array
  → Drag-to-reorder suportado (desktop + touch)
  → Contador mostra X/10
```

**Arquivos envolvidos:**
- `src/screens/NewReview/components/PhotoManager.tsx`
- `src/screens/NewReview/hooks/usePhotoUpload.ts`

---

### new-review/delete-photo

**Ponto de entrada:** Botao X na thumbnail da foto
**Resultado esperado:** Foto removida da lista

**Caminho:**
```
X clicado → handleRemovePhoto(index)
  → Blob URL revogada
  → Foto filtrada do array
  → UI atualiza, contador decrementa
```

---

### new-review/set-scores

**Ponto de entrada:** Step2 → ScoreSliders
**Resultado esperado:** Notas atribuidas com media calculada

**Caminho:**
```
Step2 renderiza
  → Selecao tipo: "Presencial" ou "Delivery"
  → Criterios mudam por tipo:
    Presencial: Comida(50%), Apresentacao(10%), Proposta/CB(15%), Atendimento(10%), Ambiente(15%)
    Delivery: Qualidade(50%), Apresentacao(10%), CB(15%), Embalagem(10%), Tempo Entrega(15%)
  → Slider ajustado → handleScoreChange(key, value)
  → calculateAverage() recalcula media ponderada em tempo real
```

---

### new-review/add-tags

**Ponto de entrada:** Step1 → TagCategorySection para cada categoria
**Resultado esperado:** Tags selecionadas (max 3 por categoria)

**Caminho:**
```
Busca por tag (filtra todas as categorias)
  → Click no badge da tag
    → Se < 3 selecionadas: toggle add
    → Se = 3 selecionadas: previne adicao
  → Categorias: FORMAT_OPTIONS, REVIEW_CUISINE_OPTIONS, OCCASION_OPTIONS, REVIEW_DIET_OPTIONS
  → Tags destacadas com styling diferente
```

---

### new-review/tag-friends

**Ponto de entrada:** Step1 → botao "Adicionar amigos"
**Resultado esperado:** Amigos marcados na review

**Caminho:**
```
"Adicionar amigos" clicado → TagFriendsModal abre
  → loadFriends() busca mutual followers via FollowContext
  → Busca na modal filtra por nome/username
  → Click no amigo: toggleTagUser() add/remove
  → Selecionados mostram como pills com avatar acima do botao
```

---

### new-review/save-draft

**Ponto de entrada:** Icone save no header OU modal de descarte → "Salvar Rascunho"
**Resultado esperado:** Rascunho salvo no localStorage

**Caminho:**
```
Save clicado
  → handleSaveDraft()
    → Coleta todo o estado do formulario
    → saveDraftToStorage() → localStorage
    → Dados salvos: restaurante, descricao, scores, tags, tipo, voltaria, prato favorito
    → NOTA: Fotos NAO sao persistidas (precisam re-upload)
  → Toast "Rascunho salvo!"
  → Se exitAfterSave: navega de volta + revoke blob URLs
```

---

### new-review/restore-draft

**Ponto de entrada:** Ao abrir NewReview com rascunho existente (nao modo edit)
**Resultado esperado:** Formulario pre-preenchido com dados do rascunho

**Caminho:**
```
NewReview monta → useEffect detecta hasDraft
  → Modal "Rascunho encontrado!" com nome do restaurante
  → "Restaurar": loadDraft() → restoreDraftData()
    → Pre-preenche todos os campos do formulario
    → Toast "Rascunho restaurado!" (+ info sobre fotos)
  → "Descartar": ignora rascunho
  → "Ver lista": mostra multiplos rascunhos para escolher
```

---

### new-review/submit-review

**Ponto de entrada:** Step2 → botao "POSTAR REVIEW" ou "ATUALIZAR REVIEW"
**Resultado esperado:** Review publicada ou atualizada

**Caminho (CREATE):**
```
"POSTAR REVIEW" clicado
  → Se descricao < 200 chars: warning modal
    → "Publicar assim" OU "Melhorar texto"
  → executePost():
    → Valida: restaurante selecionado, descricao presente
    → Se fotos: StorageService.uploadReviewPhotos()
      → supabase.storage.from("reviews").upload()
      → Track progress: uploadProgress { current, total }
    → Prepara reviewData
    → FeedContext.addReview(reviewData)
      → supabase.from("reviews").insert()
    → clearDraft(), revoke blob URLs
    → Haptic notification: "success"
    → Toast "Review publicada!"
    → refreshFeed()
    → navigate("/feed") apos 1.5s
```

**Caminho (EDIT):**
```
"ATUALIZAR REVIEW" clicado
  → Separa fotos existentes de novas
  → Se novas fotos: upload apenas as novas
  → supabase.from("reviews").update(updateData).eq("id", editReviewId)
  → Toast "Review atualizada!"
  → navigate("/feed") apos 1.5s
```

**Arquivos envolvidos:**
- `src/screens/NewReview/Step2.tsx` - Botao post
- `src/screens/NewReview/hooks/usePostReview.ts` - Logica de publicacao
- `src/screens/NewReview/hooks/useReviewForm.ts` - Estado do formulario
- `src/services/storage.service.ts` - Upload de fotos
- `src/services/feed.service.ts` - createReview

---

## Discover - Sub-Fluxos (6)

### discover/search-restaurants

**Ponto de entrada:** Barra de busca "Buscar restaurantes, listas e perfis"
**Resultado esperado:** Resultados de restaurantes exibidos

**Caminho:**
```
Click na barra → SearchView ativa
  → Usuario digita (>= 3 chars trigger)
  → useRestaurantAutocomplete busca Google Places API
  → Resultados: nome, endereco, localizacao, foto, cuisine
  → Click resultado:
    → Salva em buscas recentes
    → Cria Restaurant object
    → Muda para map view
    → Centraliza mapa no restaurante
    → Abre detalhes do restaurante
```

---

### discover/filter-restaurants

**Ponto de entrada:** Icone "tune" no mapa → FiltersModal
**Resultado esperado:** Restaurantes filtrados no mapa

**Caminho:**
```
Icone filtro clicado → FiltersModal abre
  → Filtros: Cuisine, Occasion, Neighborhood, Price Level ($-$$$$), Min Rating (5+/7+/8+/9+)
  → "Aplicar" → onFiltersChange()
  → Debounce 300ms → searchRestaurants() com novos filtros
    → supabase.from("restaurants").select(...)
      .ilike("cuisine_types", `%${cuisine}%`)
      .gte("rating", minRating)
  → Mapa atualiza com resultados filtrados
  → "Limpar" reseta todos os filtros
```

---

### discover/search-profiles

**Ponto de entrada:** SearchView → tab "Perfis" OU ProfilesView
**Resultado esperado:** Perfis de usuarios encontrados

**Caminho:**
```
Tab "Perfis" selecionada → usuario digita (>= 3 chars)
  → supabase.from("profiles").select(...)
    .or(`full_name.ilike.%${query}%,username.ilike.%${query}%`)
    .neq("id", currentUser.id)
    .limit(5 ou 20)
  → Resultados com avatar, nome, username, badge verificado
  → Click → navigate(/profile/@{username})
```

---

### discover/view-recent-searches

**Ponto de entrada:** SearchView com busca vazia
**Resultado esperado:** Buscas recentes exibidas

**Caminho:**
```
SearchView com searchQuery vazio
  → useRecentSearches() carrega do localStorage
  → Lista de buscas recentes exibida
  → Click:
    → type="restaurant": carrega restaurante, centraliza mapa
    → type="profile": navega para perfil
    → type="list": navega para lista
```

---

### discover/clear-recent-searches

**Ponto de entrada:** Secao buscas recentes → botao "Limpar"
**Resultado esperado:** Buscas recentes limpas

**Caminho:**
```
"Limpar" clicado
  → clearSearches()
  → localStorage limpo
  → UI esconde secao de buscas recentes
```

---

### discover/view-restaurant-detail

**Ponto de entrada:** Click no marker do mapa, resultado de busca, ou card no explore
**Resultado esperado:** Modal de detalhes do restaurante

**Caminho:**
```
Restaurante clicado
  → Mobile: bottom sheet preview (nome, rating, preco, distancia)
    → "Ver detalhes" → modal completo
  → Desktop: modal completo direto
  → RestaurantDetailsModal:
    → useRestaurantReviews() busca reviews paginadas
    → Fotos, nome, endereco, rating, reviews
    → Horarios, telefone, website, localizacao
    → "Salvar" → ListPickerModal
    → "Fazer review" → navigate("/new-review", { state: { restaurant } })
```

---

## Settings - Sub-Fluxos (5)

### settings/edit-profile-settings

**Ponto de entrada:** Settings → "Dados pessoais"
**Resultado esperado:** Perfil atualizado

**Caminho:**
```
"Dados pessoais" clicado → EditProfileModal abre
  → Campos: avatar, full_name, username, city, neighborhood, bio
  → Alterar avatar:
    → File input → ImageCropModal (400x400px, WebP)
    → StorageService.uploadProfilePhoto()
      → supabase.storage.from("profile-photos").upload()
  → "Salvar":
    → supabase.from("profiles").update().eq("id", userId)
    → updateCurrentUser() no AuthContext
  → Toast "Perfil atualizado!"
  → navigate("/profile")
```

**Arquivos envolvidos:**
- `src/screens/Settings/index.tsx`
- `src/screens/Settings/components/EditProfileModal.tsx`
- `src/screens/Settings/components/ImageCropModal.tsx`
- `src/services/auth.service.ts`
- `src/services/storage.service.ts`

---

### settings/change-password

**Ponto de entrada:** Settings → "Seguranca"
**Resultado esperado:** Senha alterada

**Caminho:**
```
"Seguranca" clicado → SecurityModal abre
  → 3 campos: Senha Atual, Nova Senha (min 6), Confirmar Nova Senha
  → "Alterar Senha":
    → Validacao: campos preenchidos, >= 6 chars, senhas conferem
    → supabase.auth.signInWithPassword(email, senhaAtual) - verifica atual
    → supabase.auth.updateUser({ password: novaSenha })
  → Sucesso: tela de confirmacao por 2s → modal auto-fecha
  → Erro: banner com mensagem especifica
```

**Erros possiveis:**
- "Preencha todos os campos"
- "A senha deve ter pelo menos 6 caracteres"
- "As senhas nao conferem"
- "Senha atual incorreta"

---

### settings/view-privacy

**Ponto de entrada:** Settings → "Privacidade"
**Resultado esperado:** Politica de privacidade exibida

**Caminho:**
```
"Privacidade" clicado → PrivacyModal abre
  → Conteudo estatico da politica de privacidade
  → Fechar via botao ou backdrop
```

---

### settings/view-notifications-settings

**Ponto de entrada:** Settings → "Notificacoes"
**Resultado esperado:** Configuracoes de notificacoes (placeholder)

**Caminho:**
```
"Notificacoes" clicado → NotificationsModal abre
  → Placeholder: "As configuracoes de notificacoes estarao disponiveis em breve"
  → Preview de toggles futuros (disabled):
    - Novos seguidores
    - Curtidas nas suas reviews
    - Comentarios
    - Recomendacoes personalizadas
```

---

### settings/logout

**Ponto de entrada:** Settings → "Sair" (botao vermelho no fundo)
**Resultado esperado:** Usuario deslogado, redirecionado para login

**Caminho:**
```
"Sair" clicado → ConfirmModal
  → "Sair da conta? Voce precisara fazer login novamente."
  → Confirma:
    → AuthContext.signOut()
      → supabase.auth.signOut()
    → navigate("/login")
    → Sessao limpa
```

---

## Notifications - Sub-Fluxos (3)

### notifications/view-notifications

**Ponto de entrada:** Bottom nav → icone Notifications OU navigate(/notifications)
**Resultado esperado:** Lista de notificacoes carregada

**Caminho:**
```
Tela monta
  → useNotificationsQuery(currentUser.id) busca:
    → supabase.from("notifications").select(`
        id, type, actor_id, review_id, is_read, created_at,
        actor:profiles!actor_id(...),
        review:reviews!review_id(...)
      `).eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20)
  → Paginacao cursor-based: .lt("created_at", lastTimestamp)
  → Tipos: like, comment, follow, tag, new_review
  → Cada notificacao: avatar + badge tipo, nome, mensagem, tempo, imagem
  → Tipo new_follower: botao Follow visivel
  → Infinite scroll para mais
```

**Arquivos envolvidos:**
- `src/screens/Notifications.tsx`
- `src/hooks/useNotificationsQuery.ts`
- `src/services/notification.service.ts`

**Estados:**
- Loading: Spinner inicial
- Sucesso: Lista de notificacoes
- Vazio: "Voce esta em dia!"
- Infinite scroll: Carrega mais ao scrollar

---

### notifications/mark-as-read

**Ponto de entrada:** Automatico ao visualizar tela de notificacoes
**Resultado esperado:** Todas as notificacoes marcadas como lidas

**Caminho:**
```
Tela monta → useEffect apos fetch
  → supabase.from("notifications")
    .update({ is_read: true })
    .eq("user_id", userId)
    .eq("is_read", false)
  → Assincrono (non-blocking)
  → unreadCount = 0
  → Badge no bottom nav atualiza
```

---

### notifications/navigate-from-notification

**Ponto de entrada:** Click na notificacao ou avatar
**Resultado esperado:** Navegacao para conteudo relacionado

**Caminho:**
```
Click na notificacao:
  → Se type="new_follower" sem review_id: navigate(/profile/@{username})
  → Se tem review_id: navigate(/review/{review_id})
  → Click no avatar: navigate(/profile/@{username})
```

---

## Resumo Geral - 77 Sub-Fluxos

| Feature | Sub-fluxos | Tabelas Supabase |
|---------|-----------|-----------------|
| Lists | 12 | lists, list_restaurants, saved_lists, storage |
| Feed | 24 | reviews, likes, comments, comment_likes, reports, follows |
| Profile | 18 | profiles, follows, blocks, lists, reviews, storage |
| NewReview | 9 | reviews, storage, Google Places API |
| Discover | 6 | restaurants, profiles, Google Places API |
| Settings | 5 | profiles, auth, storage |
| Notifications | 3 | notifications |
| **Total** | **77** | |

### Pontos de Cruzamento Criticos

| Componente Compartilhado | Usado por |
|-------------------------|-----------|
| ReviewCard | Feed, Profile, ReviewDetail |
| RestaurantDetailsModal | Feed, Discover, ListDetails, Recommendations |
| CommentsModal | Feed, ReviewDetail |
| ListModal / ListSelectorModal | Feed, Profile |
| FollowContext | Feed, Profile, Discover, Notifications |
| ListsContext | Feed, Lists, ListDetails, Profile |
| FeedContext | Feed, NewReview, ReviewDetail |
| AuthContext | Todas as features |
| StorageService | NewReview, Profile, Lists, Settings |

### Tabelas mais Afetadas por Mudancas

| Tabela | Features que usam |
|--------|------------------|
| profiles | Auth, Profile, Feed, Discover, Notifications, Settings |
| reviews | Feed, NewReview, Profile, Notifications |
| follows | Profile, Feed, Discover, Notifications |
| lists | Lists, ListDetails, Profile, Feed |
| notifications | Notifications, Feed (badge) |
| comments | Feed, ReviewDetail |
| likes | Feed, ReviewDetail |
