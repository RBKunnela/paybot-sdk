---
task: Record Bug in Knowledge Base
responsavel: "@chief"
responsavel_type: agent
squad: quality-shield
atomic_layer: task
elicit: false
Entrada: |
  - symptom: Sintoma reportado pelo usuario
  - root_cause: Causa raiz identificada pelo Diagnostician
  - affected_files: Arquivos envolvidos
  - what_caused_it: Explicacao tecnica do que causava o problema
  - flows_affected: Fluxos de usuario afetados
  - fix_applied: O que foi feito para resolver
  - severity: Nivel de severidade
  - worked_in_localhost: Se funcionava em localhost
  - prod_difference: Diferenca especifica de producao (se aplicavel)
Saida: |
  - entry_id: ID da entrada na knowledge base
  - pattern: Padrao identificado (se aplicavel)
Checklist:
  - "[ ] Ler knowledge-base.yaml atual"
  - "[ ] Criar nova entrada com todos os campos"
  - "[ ] Verificar se existe padrao similar (agrupar)"
  - "[ ] Atualizar regression-patterns.md se padrao novo"
  - "[ ] Salvar knowledge-base.yaml"
---

# \*kb-record

Registra um bug resolvido na knowledge base para aprendizado futuro.

## Entrada

Apos o fluxo completo de resolucao, o Chief coleta todos os dados e registra.

## Formato da Entrada na Knowledge Base

```yaml
- id: "BUG-YYYY-MM-DD-NNN"
  date: "YYYY-MM-DD"
  severity: "CRITICO|ALTO|MEDIO|BAIXO"

  symptom: "O que o usuario reportou"
  root_cause: "Causa raiz tecnica"
  what_caused_it: "Explicacao detalhada do por que"

  files:
    - path: "src/hooks/auth/useAuthStateListener.ts"
      role: "O que esse arquivo faz no contexto do bug"
    - path: "src/App.tsx"
      role: "O que esse arquivo faz no contexto do bug"

  flows_affected:
    - "google-oauth-login"
    - "email-login"
    - "reset-password"

  fix_applied: "Descricao do que foi feito para resolver"
  fix_files:
    - "src/hooks/auth/useAuthStateListener.ts"

  environment:
    worked_in_localhost: true
    prod_difference: "Latencia de rede faz fetchUserData exceder timeout de 8s"

  pattern: "chamadas-http-em-callback-sdk"
  related_bugs: ["BUG-2025-XX-XX-NNN"]

  regression:
    tested_levels: [1, 2, 3, 4]
    result: "APROVADO"
    production_verified: true
```

## Execucao

### Passo 1: Ler KB Atual

```
Ler: squads/quality-shield/data/knowledge-base.yaml
```

### Passo 2: Criar Entrada

```
Gerar ID: BUG-{date}-{sequence}
Preencher todos os campos do formato acima
```

### Passo 3: Identificar Padroes

```
Comparar com bugs existentes:
- Mesmos arquivos? → possivel area problematica
- Mesmo tipo de causa? → padrao de bug
- Mesmo fluxo? → fluxo fragil
Se padrao novo identificado:
  → Adicionar em regression-patterns.md
  → Marcar related_bugs no registro
```

### Passo 4: Salvar

```
Append na knowledge-base.yaml
Atualizar regression-patterns.md se necessario
```

## Regras

- SEMPRE registrar apos bug resolvido - sem excecao
- Incluir TODOS os campos - nenhum opcional
- Identificar padroes - isso e o que torna o squad mais inteligente com o tempo
- O campo `what_caused_it` deve ser claro o suficiente para alguem que nunca viu o codigo entender
