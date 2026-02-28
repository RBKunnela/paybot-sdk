# Diagnosis Checklist

Template usado pelo Diagnostician (Sage) para garantir que o diagnostico de causa raiz seja sistematico e completo. Evita pular etapas e garante qualidade do diagnostico.

## Coleta de Informacoes

### Sintoma

- [ ] Descricao clara do que o usuario esta vendo
- [ ] Tela/pagina onde ocorre
- [ ] Acao que dispara o problema
- [ ] Comportamento esperado vs real
- [ ] Consistente ou intermitente?
- [ ] Desde quando (se usuario sabe)?

### Ambiente

- [ ] Ocorre em localhost?
- [ ] Ocorre em producao?
- [ ] Se ambos: comportamento identico ou diferente?
- [ ] Browser/device especifico?
- [ ] Conectividade (Wi-Fi, 3G, offline)?

### Contexto

- [ ] Knowledge base consultada (squads/quality-shield/data/knowledge-base.yaml)
- [ ] Bugs similares encontrados? Se sim, quais?
- [ ] Houve deploy recente que pode ter causado?
- [ ] Houve mudanca de dependencia recente?

## Investigacao

### Trace do Codigo

- [ ] Ponto de entrada identificado (componente/tela)
- [ ] Fluxo tracado: componente → hook → service → API/DB
- [ ] Ponto de divergencia encontrado (onde comportamento muda)
- [ ] Dependency graph consultado (squads/quality-shield/data/dependency-graph.yaml)
- [ ] Feature flows consultado (squads/quality-shield/data/feature-flows.md)

### Analise de Causa

- [ ] Sintoma vs causa distinguidos (nao confundir)
- [ ] Causa raiz explica TODOS os sintomas?
- [ ] "Mas POR QUE?" perguntado ate chegar na raiz verdadeira?
- [ ] Race condition verificada?
- [ ] Timing dependency verificada?
- [ ] State management issue verificada?

### Verificacao de Ambiente

- [ ] Se localhost != producao: diferenca identificada
- [ ] Environment variables checadas
- [ ] Servicos externos checados (OAuth, Google Places)
- [ ] Build differences consideradas (minificacao, tree shaking)
- [ ] Network latency considerada

## Qualidade do Diagnostico

### Relatorio

- [ ] Causa raiz documentada com explicacao tecnica
- [ ] Arquivos envolvidos listados (com linhas)
- [ ] Fluxo afetado identificado
- [ ] Evidencia apresentada (trace passo a passo)
- [ ] Ambiente especificado (localhost/producao/ambos)

### Validacao

- [ ] Causa raiz e verificavel (nao e suposicao)
- [ ] Outro desenvolvedor conseguiria entender o diagnostico?
- [ ] Impact Analyst teria dados suficientes para trabalhar?
- [ ] Se incerteza: o que falta esta documentado?

## Red Flags (Parar e Escalar)

Se qualquer um destes, escalar ao Chief:

- [ ] Causa raiz nao encontrada apos investigar todos os arquivos
- [ ] Multiplas causas possiveis sem evidencia para distinguir
- [ ] Bug depende de estado que nao pode ser reproduzido
- [ ] Bug requer acesso que o Diagnostician nao tem
- [ ] Timeout de diagnostico excedido (ver squad-config.yaml)
