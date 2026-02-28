---
task: Production Deployment
responsavel: "@el-clonador"
responsavel_type: Agente
atomic_layer: Organism
elicit: true

Entrada:
  - campo: deployment_target
    tipo: string
    origem: "user input"
    obrigatorio: true
    validacao: "value in ['ChatGPT Custom GPT', 'Claude Project', 'API', 'Standalone', 'Multi-Platform']"
  - campo: system_prompt_path
    tipo: string
    origem: "user input"
    obrigatorio: true
    validacao: "path exists && file readable && file extension in ['.md', '.txt']"
  - campo: kb_path
    tipo: string
    origem: "user input"
    obrigatorio: false
    padrao: null
    validacao: "path exists && directory contains files"
  - campo: tools_path
    tipo: string
    origem: "user input"
    obrigatorio: false
    padrao: null
    validacao: "path exists && file readable"

Saida:
  - campo: deployment_package
    tipo: "directory (deployment-package/)"
    destino: "file"
    persistido: true
  - campo: user_guide
    tipo: "file (user-guide.md)"
    destino: "file"
    persistido: true
  - campo: deployment_checklist
    tipo: "file (deployment-checklist.md)"
    destino: "file"
    persistido: true
  - campo: deployment_summary
    tipo: "object { target: string, files_packaged: array<string>, prompt_tokens: number, kb_chunks: number, tools_count: number, platform_config: object }"
    destino: "user output"
    persistido: false

Checklist:
  pre-conditions:
    - descricao: "Todas as 6 fases anteriores do pipeline passaram phase gate (GO)"
      tipo: pre-condition
      blocker: true
      validacao: "metadata.phases.every(p => p.id != 'production' ? p.gate_status == 'GO' : true)"
    - descricao: "Fidelity score >= 93% confirmado na Phase 6 (Testing)"
      tipo: pre-condition
      blocker: true
      validacao: "metadata.phases.testing.fidelity_score >= 93"
    - descricao: "System prompt existe e e legivel"
      tipo: pre-condition
      blocker: true
      validacao: "fs.existsSync(system_prompt_path) && fs.readFileSync(system_prompt_path).length > 0"
    - descricao: "Deployment target e uma plataforma suportada"
      tipo: pre-condition
      blocker: true
      validacao: "['ChatGPT Custom GPT', 'Claude Project', 'API', 'Standalone', 'Multi-Platform'].includes(deployment_target)"
  post-conditions:
    - descricao: "Deployment package gerado com todos os arquivos necessarios para a plataforma"
      tipo: post-condition
      blocker: true
      validacao: "fs.existsSync(deploymentDir) && fs.readdirSync(deploymentDir).length > 0"
    - descricao: "User guide gerado com instrucoes de uso especificas para a plataforma"
      tipo: post-condition
      blocker: true
      validacao: "fs.existsSync(deploymentDir + '/user-guide.md') && fileContainsSections(['Setup', 'Usage', 'Troubleshooting'])"
    - descricao: "Deployment checklist gerado e todos os itens verificaveis"
      tipo: post-condition
      blocker: true
      validacao: "fs.existsSync(deploymentDir + '/deployment-checklist.md')"
    - descricao: "System prompt adaptado para o formato da plataforma target"
      tipo: post-condition
      blocker: true
      validacao: "platformPromptValid(deployment_target, deploymentDir)"
    - descricao: "Knowledge base empacotada no formato aceito pela plataforma (se aplicavel)"
      tipo: post-condition
      blocker: true
      validacao: "kb_path == null || kbPackageValid(deployment_target, deploymentDir)"
  acceptance-criteria:
    - descricao: "Clone pode ser deployado seguindo apenas o user guide (sem conhecimento adicional)"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Deployment checklist cobre todos os passos de setup na plataforma"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Package e auto-contido — todos os arquivos necessarios estao incluidos"
      tipo: acceptance
      blocker: false
      manual_check: true

Performance:
  duration_expected: "interactive (5-10min)"
  cost_estimated: "$0"
  cacheable: false
  parallelizable: false

Error_Handling:
  strategy: fallback
  fallback: "Gerar package parcial e listar itens pendentes para completar manualmente"
  retry:
    max_attempts: 2
    backoff: linear
    backoff_ms: 0
  abort_workflow: false
  notification: log

Metadata:
  version: "1.0.0"
  dependencies: []
  author: "Felipe Rosa"
  created_at: "2026-02-01"
  updated_at: "2026-02-01"
---

# *deploy

Empacota o clone finalizado para deployment em producao na plataforma alvo. Verifica que todas as fases do pipeline foram completadas, adapta o system prompt e knowledge base para o formato da plataforma, gera user guide e deployment checklist.

## Uso

```
@el-clonador
*deploy
# -> Modo interativo, elicita plataforma target e caminhos

*deploy --target "ChatGPT Custom GPT" --prompt ./system_prompts/main.md --kb ./kb/
# -> Deploy para ChatGPT Custom GPT com KB

*deploy --target "Claude Project" --prompt ./system_prompts/main.md
# -> Deploy para Claude Project sem KB separada

*deploy --target "API" --prompt ./system_prompts/main.md --kb ./kb/ --tools ./tools.md
# -> Deploy para API com KB e tools
```

## Plataformas Suportadas

| Plataforma | System Prompt | KB | Tools | Notas |
|-----------|--------------|-----|-------|-------|
| ChatGPT Custom GPT | Instructions field | Knowledge files (max 20) | Actions (OpenAPI) | Max 8K chars instructions |
| Claude Project | Project instructions | Project knowledge | MCP tools | Suporta prompts longos |
| API | System message | RAG integration | Function calling | Requer infraestrutura |
| Standalone | Embedded | Local files | Custom | Self-contained app |
| Multi-Platform | Adaptado por target | Adaptado por target | Adaptado por target | Gera para multiplas |

## Workflow

### Step 1: Verificar Pipeline Completion
- Carregar metadata.yaml do projeto
- Verificar que todas 6 fases anteriores tem gate_status = GO
- Verificar fidelity score >= 93% (Phase 6)
- Se alguma fase incompleta: listar gaps e BLOQUEAR deployment
- Exibir resumo do pipeline status

### Step 2: Coletar Informacoes de Deployment
- Solicitar deployment_target (plataforma)
- Validar system_prompt_path (obrigatorio)
- Solicitar kb_path (opcional, depende da plataforma)
- Solicitar tools_path (opcional, depende da plataforma)
- Confirmar configuracao com usuario

### Step 3: Adaptar System Prompt para Plataforma
- **ChatGPT Custom GPT:** Truncar para 8K chars, priorizar instrucoes criticas
- **Claude Project:** Manter prompt completo, formatar para Project instructions
- **API:** Formatar como system message, incluir exemplos few-shot se aplicavel
- **Standalone:** Embeddar no formato do runtime
- **Multi-Platform:** Gerar versao adaptada para cada target

### Step 4: Empacotar Knowledge Base (se aplicavel)
- **ChatGPT Custom GPT:** Converter para files uploadaveis (max 20 files, formatos aceitos)
- **Claude Project:** Converter para Project knowledge files
- **API:** Preparar para RAG integration (chunks indexados)
- **Standalone:** Incluir como local files no package
- Validar tamanho total e limites da plataforma

### Step 5: Empacotar Tool Definitions (se aplicavel)
- **ChatGPT Custom GPT:** Converter para Actions (OpenAPI schema)
- **Claude Project:** Converter para MCP tool definitions
- **API:** Converter para function calling schemas
- **Standalone:** Incluir como modulos executaveis
- Validar schemas e parametros

### Step 6: Gerar Deployment Configuration
- Criar config file especifico da plataforma:
  - `config.json` para API
  - `gpt-config.json` para ChatGPT
  - `project-config.yaml` para Claude
- Incluir metadata do clone (subject, version, fidelity score)
- Incluir parametros recomendados (temperature, top_p, etc.)

### Step 7: Gerar User Guide
- Secao Setup: como configurar na plataforma
- Secao Usage: como interagir com o clone
- Secao Examples: exemplos de conversas tipicas
- Secao Troubleshooting: problemas comuns e solucoes
- Secao Limitations: o que o clone NAO faz
- Adaptar linguagem para usuario final (nao tecnico)

### Step 8: Executar Final Validation Checklist
- [ ] Todas as fases do pipeline completadas (GO)
- [ ] Fidelity >= 93% confirmado
- [ ] System prompt adaptado para plataforma
- [ ] KB empacotada no formato correto (se aplicavel)
- [ ] Tools definidos no formato correto (se aplicavel)
- [ ] Config file gerado
- [ ] User guide completo
- [ ] Package auto-contido (sem dependencias externas)
- [ ] Limites da plataforma respeitados (tamanho, tokens, files)
- Gerar deployment-checklist.md com status de cada item

### Step 9: Gerar Deployment Package Summary
- Listar todos os arquivos no package
- Token count do system prompt
- Chunk count da KB
- Tool count
- Platform-specific config
- Instrucoes de proximo passo (como fazer o upload/deploy)

## Estrutura do Deployment Package

```
deployment-package/
├── system-prompt/
│   └── main.md (ou .txt, adaptado por plataforma)
├── knowledge-base/
│   └── (files convertidos para formato da plataforma)
├── tools/
│   └── (schemas no formato da plataforma)
├── config/
│   └── (config file da plataforma)
├── user-guide.md
├── deployment-checklist.md
└── README.md (quick start)
```

## Output

Deployment Package com:
- System prompt adaptado para a plataforma target
- Knowledge base empacotada (se aplicavel)
- Tool definitions (se aplicavel)
- Configuration file da plataforma
- User guide com instrucoes completas
- Deployment checklist verificado
- Summary com metricas do package
