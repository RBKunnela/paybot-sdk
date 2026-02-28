---
task: Triangulate Claim
responsavel: "@mind-mapper"
responsavel_type: Agente
atomic_layer: Organism
elicit: true

Entrada:
  - campo: claim
    tipo: string
    origem: "user input"
    obrigatorio: true
    validacao: "length >= 10"
  - campo: sources
    tipo: "array<string>"
    origem: "user input"
    obrigatorio: true
    validacao: "sources.length >= 3"
  - campo: layer_context
    tipo: string
    origem: "user input"
    obrigatorio: false
    padrao: null
    validacao: "value in ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4', 'Layer 5', 'Layer 6', 'Layer 7', 'Layer 8'] || value == null"

Saida:
  - campo: triangulation_result
    tipo: "object { claim: string, verdict: string, confidence: string, evidence: array<object { source: string, source_tier: number, strength: string, excerpt: string }>, cross_references: array<string>, dissenting_evidence: array<object { source: string, excerpt: string }> }"
    destino: "user output"
    persistido: false
  - campo: triangulation_report
    tipo: "string (markdown report with full analysis)"
    destino: "file"
    persistido: true

Checklist:
  pre-conditions:
    - descricao: "Claim esta formulado como afirmacao verificavel"
      tipo: pre-condition
      blocker: true
      validacao: "claim != null && claim.length >= 10"
    - descricao: "Pelo menos 3 fontes independentes fornecidas"
      tipo: pre-condition
      blocker: true
      validacao: "sources.length >= 3"
    - descricao: "Fontes sao independentes entre si (nao derivadas uma da outra)"
      tipo: pre-condition
      blocker: false
      validacao: "manual verification"
  post-conditions:
    - descricao: "Cada fonte analisada independentemente com evidencia documentada"
      tipo: post-condition
      blocker: true
      validacao: "evidence.length === sources.length"
    - descricao: "Strength classificada para cada fonte (strong/moderate/weak/absent)"
      tipo: post-condition
      blocker: true
      validacao: "evidence.every(e => ['strong', 'moderate', 'weak', 'absent'].includes(e.strength))"
    - descricao: "Verdict emitido (Confirmed/Probable/Uncertain/Contradicted)"
      tipo: post-condition
      blocker: true
      validacao: "['Confirmed', 'Probable', 'Uncertain', 'Contradicted'].includes(verdict)"
    - descricao: "Confidence tag atribuido (Alta/Media/Baixa)"
      tipo: post-condition
      blocker: true
      validacao: "['Alta', 'Media', 'Baixa'].includes(confidence)"
    - descricao: "Evidencia dissidente documentada se existir"
      tipo: post-condition
      blocker: false
      validacao: "dissenting_evidence validated"
  acceptance-criteria:
    - descricao: "Analise de cada fonte foi genuinamente independente (nao influenciada pelas outras)"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Verdict reflete a realidade da evidencia, sem vies de confirmacao"
      tipo: acceptance
      blocker: false
      manual_check: true
    - descricao: "Evidencia contraria tratada com mesmo rigor que evidencia a favor"
      tipo: acceptance
      blocker: false
      manual_check: true

Performance:
  duration_expected: "interactive (5-15min)"
  cost_estimated: "$0"
  cacheable: false
  parallelizable: false

Error_Handling:
  strategy: fallback
  fallback: "Se fontes insuficientes ou ilegíveis, solicitar fontes adicionais ao usuario"
  retry:
    max_attempts: 2
    backoff: linear
    backoff_ms: 0
  abort_workflow: false
  notification: log

Metadata:
  version: "1.0.0"
  dependencies:
    - dna-mental-layers.md
    - mind-mapper-classify-sources.md
  author: "Felipe Rosa"
  created_at: "2026-02-01"
  updated_at: "2026-02-01"
---

# *triangulate

Cross-valida um claim especifico contra 3+ fontes independentes. Analisa cada fonte isoladamente, classifica forca da evidencia, emite verdict e gera report de triangulacao completo.

## Uso

```
@mind-mapper
*triangulate
# -> Modo interativo, solicita claim e fontes

*triangulate --claim "Pedro prioriza processo acima de ferramenta" --sources file1.md,file2.md,file3.md
# -> Triangula claim especifico contra 3 fontes

*triangulate --claim "Valor #1 e rastreabilidade" --sources file1.md,file2.md,file3.md --layer "Layer 6"
# -> Triangula com contexto de layer
```

## Workflow

### Step 1: State the Claim
- Receber ou solicitar o claim a ser validado
- Claim deve ser uma afirmacao verificavel (nao uma pergunta ou opiniao vaga)
- Exemplo bom: "Pedro prioriza rastreabilidade acima de velocidade de entrega"
- Exemplo ruim: "Pedro gosta de processos" (vago demais)
- Se claim vago: solicitar reformulacao ao usuario

### Step 2: Read Each Source Independently
- Para cada fonte na lista:
  - Ler conteudo completo
  - Analisar em isolamento (sem considerar outras fontes ainda)
  - Buscar evidencia que suporte OU contradiga o claim
  - Documentar excerpts relevantes com citacao direta

### Step 3: Classify Evidence Strength Per Source
- Para cada fonte, classificar forca da evidencia:
  - **Strong**: Evidencia direta, explicita, inequivoca (ex: sujeito declara o claim em primeira pessoa)
  - **Moderate**: Evidencia indireta mas consistente (ex: comportamento demonstrado que implica o claim)
  - **Weak**: Evidencia tangencial ou ambigua (ex: mencao passageira, contexto diferente)
  - **Absent**: Fonte nao contem evidencia relevante para este claim

### Step 4: Identify Dissenting Evidence
- Buscar ativamente evidencia que contradiga o claim
- Documentar com mesmo rigor que evidencia a favor
- Regra: vies de confirmacao e o maior risco — buscar contra-evidencia com intencionalidade

### Step 5: Cross-Reference Findings
- Comparar extracoes entre fontes
- Identificar padroes de convergencia (fontes concordam)
- Identificar padroes de divergencia (fontes discordam)
- Documentar cross-references entre fontes

### Step 6: Calculate Triangulation Score
- Regra de scoring:
  - 3+ strong = score alto
  - 2 strong + 1 moderate = score medio-alto
  - 1 strong + 2 moderate = score medio
  - Maioria weak/absent = score baixo
  - Qualquer strong contra = reduz score significativamente

### Step 7: Emit Verdict
- **Confirmed**: 3+ fontes com evidencia strong, sem contra-evidencia strong
- **Probable**: 2 fontes strong + 1 moderate, sem contra-evidencia strong
- **Uncertain**: Evidencia mista, menos de 2 fontes strong, ou contra-evidencia presente
- **Contradicted**: Pelo menos 1 fonte strong contradiz + maioria das fontes nao suportam

### Step 8: Generate Triangulation Report
- Gerar report markdown completo:
  - Claim original
  - Analise por fonte (excerpt, strength, tier)
  - Cross-references identificadas
  - Evidencia dissidente (se existir)
  - Verdict final com justificativa
  - Confidence tag (Alta/Media/Baixa)
  - Recomendacoes (se Uncertain: sugerir fontes adicionais ou elicitation)

## Output

Resultado de triangulacao com:
- Verdict: Confirmed, Probable, Uncertain, ou Contradicted
- Evidencia documentada por fonte com strength classification
- Cross-references entre fontes
- Evidencia dissidente documentada
- Confidence tag (Alta/Media/Baixa)
- Report markdown completo para referencia futura
