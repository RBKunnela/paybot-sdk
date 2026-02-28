# Quality Shield - Regression Patterns

Padroes de regressao conhecidos, aprendidos com bugs resolvidos e analise do codebase.
O Diagnostician (Sage) consulta estes padroes para acelerar diagnosticos futuros.
Atualizado automaticamente pela task `kb-record.md` quando um novo padrao e identificado.

> **STATUS:** Ativo. 12 padroes registrados.

---

## Padroes Conhecidos

### pkce-code-verifier-cross-origin

**Descricao:** PKCE code_verifier armazenado no localStorage de uma origin e nao encontrado em outra (ex: www vs non-www, http vs https)
**Sintomas tipicos:** "Login com Google fica carregando e depois da erro", "Erro de conexao apos Google redirect", "Login funciona com email mas nao com Google"
**Causa raiz comum:** O Supabase SDK armazena o code_verifier no localStorage antes do redirect ao provider. Se o redirect de volta muda a origin (www->non-www, dominio diferente), o localStorage e diferente e o exchange falha silenciosamente com {session: null, error: null}
**Arquivos tipicos:** src/hooks/auth/useAuth.ts, src/hooks/auth/utils.ts, index.html
**Primeira acao:** Verificar se a URL de producao tem redirect (www->non-www, http->https) e se o code_verifier esta no localStorage da origin correta
**Bugs relacionados:** BUG-2026-02-11-001

### oauth-error-in-hash-fragment

**Descricao:** Erros OAuth retornados no hash fragment (#error=) em vez do query string (?error=), passando despercebidos pelo parser
**Sintomas tipicos:** "Erro generico apos tentar login com Google", "App mostra loading infinito apos OAuth falhar"
**Causa raiz comum:** O Supabase/GoTrue pode retornar erros tanto no query string quanto no hash fragment dependendo do tipo de erro. Parsers que so checam window.location.search nao capturam erros no hash.
**Arquivos tipicos:** src/hooks/auth/utils.ts, src/hooks/auth/useAuth.ts
**Primeira acao:** Verificar se hasOAuthTokensInUrl() e o parser de erros checam AMBOS query string e hash fragment
**Bugs relacionados:** BUG-2026-02-11-001

### erro-silencioso-sdk-supabase

**Descricao:** Supabase SDK retorna {data: null, error: null} em vez de erro explicito quando uma operacao falha internamente
**Sintomas tipicos:** "Tela fica em loading infinito", "Timeout generico sem mensagem de erro util", "Funciona as vezes sim, as vezes nao"
**Causa raiz comum:** O SDK captura erros internos e retorna null em ambos campos em vez de propagar o erro. Acontece em: PKCE exchange sem code_verifier, session refresh com token expirado, operacoes durante \_initialize()
**Arquivos tipicos:** src/hooks/auth/useAuth.ts, src/hooks/auth/useAuthStateListener.ts
**Primeira acao:** Verificar se o codigo trata o caso {data: null, error: null} como falha explicita, nao como "nada aconteceu"
**Bugs relacionados:** BUG-2026-02-11-001

---

## Padroes do Codebase (Analise Estatica)

### token-lock-race-condition

**Descricao:** Eventos duplicados SIGNED_IN causam chamadas concorrentes a fetchUserData, criando estado de sessao inconsistente
**Sintomas tipicos:** "Perfil carrega com dados antigos apos login", "Dados do usuario piscam e mudam", "Contagem de seguidores errada apos login"
**Causa raiz comum:** lockRef.current.isProcessing nao e setado antes de fetchUserData, permitindo que dois eventos SIGNED_IN passem a checagem simultaneamente
**Arquivos tipicos:** src/hooks/auth/useAuth.ts, src/hooks/auth/useAuthStateListener.ts
**Primeira acao:** Verificar se lockRef.current.isProcessing e true durante initAuth. Contar chamadas a fetchUserData no console.

### pkce-exchange-race-condition

**Descricao:** SDK processa PKCE code enquanto \_initialize() esta rodando, causando race entre getSession() e onAuthStateChange
**Sintomas tipicos:** "Usuario OAuth novo fica preso em loading", "Timeout de 25s no OAuthRedirectHandler", "Login funciona na segunda tentativa"
**Causa raiz comum:** getSession() retorna sessao mas SDK nao completou setup interno. initialLoadComplete flag nao setada corretamente no finally block do initAuth.
**Arquivos tipicos:** src/App.tsx (OAuthRedirectHandler), src/hooks/auth/useAuth.ts, src/hooks/auth/useAuthStateListener.ts
**Primeira acao:** Verificar se initialLoadComplete e setado no finally block de initAuth. Contar chamadas a fetchUserData no fluxo OAuth (deveria ser exatamente 1-2).

### stale-ref-closure

**Descricao:** useCallback com refs que nao atualizam no timing correto, causando operacoes com dados stale
**Sintomas tipicos:** "refreshFeed nao atualiza o feed", "Follow/unfollow mostra contagem errada", "Acao funciona na segunda tentativa"
**Causa raiz comum:** feedRef.current atualizado em useEffect (apos render), mas callback usa o ref antes do effect rodar. useCallback sem dependencias nunca atualiza.
**Arquivos tipicos:** src/contexts/FeedContext.tsx, src/contexts/FollowContext.tsx, src/contexts/ListsContext.tsx
**Primeira acao:** Adicionar log antes e depois de feedRef.current.refetch(). Verificar se feed.data existe quando refreshFeed e chamado.

### remember-me-oauth-collision

**Descricao:** Flag "remember me" de sessao anterior (email/senha) limpa sessao OAuth nova
**Sintomas tipicos:** "Login com Google faz logout imediato", "Apos OAuth, volta pra tela de login", "Funciona se limpar localStorage"
**Causa raiz comum:** checkRememberMe() roda mesmo em fluxos OAuth, encontra flag stale da sessao anterior, e faz signOut() na sessao nova.
**Arquivos tipicos:** src/hooks/auth/useAuth.ts, src/hooks/auth/useSessionStorage.ts
**Primeira acao:** Verificar se hasOAuthTokensInUrl() retorna true antes de checkRememberMe(). Procurar signOut() em fluxos OAuth (nunca deveria acontecer).

### cursor-pagination-fallback

**Descricao:** JSON.parse do cursor de paginacao falha silenciosamente e fallback usa comparacao legacy, causando reviews duplicados ou pulados
**Sintomas tipicos:** "Reviews duplicados no feed", "Scroll infinito pula reviews", "Feed mostra items fora de ordem"
**Causa raiz comum:** nextCursor da pagina anterior nao e JSON valido, ou campos created_at/id estao ausentes. Fallback lt("created_at", cursor) perde reviews com mesmo timestamp.
**Arquivos tipicos:** src/services/feed.service.ts, src/hooks/useFeedQuery.ts
**Primeira acao:** Logar conteudo do cursor em FeedService. Verificar se nextCursor e JSON valido com created_at e id.

### query-cache-key-mismatch

**Descricao:** Mutation invalida cache com userId antigo enquanto userId mudou, deixando cache stale
**Sintomas tipicos:** "Seguir usuario nao atualiza lista de seguidos", "Dados antigos persistem ate refresh manual", "Follow funciona mas UI nao atualiza"
**Causa raiz comum:** No onSettled da mutation, queryKeys.following(userId) usa userId que pode ser '' se o componente re-renderizou entre mutation start e settled.
**Arquivos tipicos:** src/hooks/useFollowQuery.ts, src/lib/queryClient.ts, src/hooks/useFeedQuery.ts
**Primeira acao:** Logar userId quando mutation inicia e quando onSettled dispara. Verificar React Query DevTools para cache keys orphans.

### rls-missing-user-filter

**Descricao:** Operacoes de delete/update sem filtro .eq("user_id", userId), dependendo apenas do RLS para seguranca
**Sintomas tipicos:** "403 ao deletar comentario", "Erro de permissao intermitente", "Like/unlike falha as vezes"
**Causa raiz comum:** userId e parametro opcional em metodos de service. Se nao passado, query nao filtra por usuario e RLS pode rejeitar. Alguns services retornam resposta Supabase raw, outros usam ServiceResult.
**Arquivos tipicos:** src/services/feed.service.ts, src/services/follow.service.ts
**Primeira acao:** Verificar que TODA operacao delete/update tem .eq("user_id", userId). Buscar parametros userId opcionais em services.

### protected-route-double-redirect

**Descricao:** OAuthRedirectHandler na rota / e ProtectedRoute em /feed disputam navegacao durante auth initialization
**Sintomas tipicos:** "Tela pisca entre loading e login", "Redirect loop apos OAuth", "Navegacao flicker ao abrir app"
**Causa raiz comum:** isAuthReady=false mostra loading em ProtectedRoute enquanto OAuthRedirectHandler faz Navigate to /onboarding. Dois renders disputam o controle.
**Arquivos tipicos:** src/App.tsx (OAuthRedirectHandler), src/components/ProtectedRoute.tsx
**Primeira acao:** Verificar se OAuthRedirectHandler so renderiza na rota /. Monitorar console para "[REDIRECT]" logs duplicados.

### service-error-inconsistency

**Descricao:** Alguns services retornam ServiceResult (serviceOk/serviceErr), outros retornam resposta Supabase raw, causando falhas silenciosas
**Sintomas tipicos:** "Mutation parece funcionar mas nao salvou", "Erro nao aparece na UI", "Acao silenciosa sem feedback"
**Causa raiz comum:** Caller espera .error no formato ServiceResult mas recebe PostgrestError. Ou espera throw mas recebe return null.
**Arquivos tipicos:** src/services/*.service.ts, src/types.ts (ServiceResult)
**Primeira acao:** Buscar serviceErr()/serviceOk() e comparar com services que retornam supabase response raw. Padronizar.
