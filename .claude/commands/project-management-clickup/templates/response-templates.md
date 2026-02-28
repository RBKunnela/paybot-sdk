# Response Templates - Support Operations

## Purpose

Templates de resposta padronizados para atendimento ao cliente. Usado pelo support-operations-specialist para garantir consistencia e agilidade.

---

## Saudacao Inicial

### Template: Primeiro Contato
```
Ola, {nome}! Tudo bem?

Sou do suporte da Natalia Tanaka e recebi sua mensagem.

{contexto_especifico}

Vou resolver isso para voce. Me da so um momento.
```

### Template: Retorno de Contato
```
Ola, {nome}!

Estou retornando sobre o seu chamado #{ticket_id}.

{atualizacao}

Qualquer duvida, estou por aqui!
```

---

## Acesso ao Produto

### Template: Orientacao de Acesso
```
Para acessar seu curso:

1. Acesse: https://app.hotmart.com/login
2. Use o email cadastrado na compra: {email}
3. Se nao lembra a senha, clique em "Esqueci minha senha"
4. Voce recebera um link de redefinicao no email

Se precisar de mais ajuda, me avise!
```

### Template: Acesso Liberado
```
Ola, {nome}!

Seu acesso foi liberado com sucesso!

Produto: {produto}
Email de acesso: {email}
Link: https://app.hotmart.com/login

Bons estudos!
```

---

## Financeiro

### Template: Reembolso Aprovado
```
Ola, {nome}.

Seu reembolso foi processado com sucesso.

Produto: {produto}
Valor: R$ {valor}
Prazo para estorno: 7 a 15 dias uteis (depende da operadora do cartao)

Se tiver duvidas sobre o prazo, entre em contato com a operadora do seu cartao.
```

### Template: Reembolso Fora do Prazo
```
Ola, {nome}.

Analisei seu pedido de reembolso para o produto {produto}.

O prazo de garantia de 7 dias ja foi encerrado (compra em {data_compra}).

Gostaria de entender melhor o motivo para verificar se podemos ajudar de outra forma. Pode me contar o que aconteceu?
```

### Template: Boleto - Orientacao
```
Ola, {nome}!

Sobre o boleto do produto {produto}:

- Boletos levam ate 3 dias uteis para compensar apos o pagamento
- Se o boleto venceu, posso gerar um novo para voce
- Alternativa mais rapida: pagamento via Pix ou cartao de credito

Qual opcao prefere?
```

---

## Tecnico

### Template: Problema com Video
```
Ola, {nome}!

Para resolver o problema com o video:

1. Limpe o cache do navegador (Ctrl+Shift+Del)
2. Tente em outro navegador (recomendo Chrome)
3. Verifique sua conexao de internet
4. Tente no modo anonimo/privado

Se ainda nao funcionar, me envie:
- Qual navegador esta usando
- Print da tela de erro
- Sua velocidade de internet (teste em speedtest.net)
```

---

## Encerramento

### Template: Resolucao Confirmada
```
Que bom que deu tudo certo, {nome}!

Se precisar de qualquer coisa, estou por aqui.

Bons estudos!
```

### Template: Aguardando Retorno
```
{nome}, fico no aguardo do seu retorno.

Se precisar de mais alguma coisa, e so me chamar!

Vou manter seu chamado aberto por 48h. Se nao houver retorno, encerro automaticamente.
```

### Template: Encerramento por Inatividade
```
Ola, {nome}!

Como nao recebi retorno, estou encerrando este chamado.

Se precisar de ajuda novamente, e so abrir um novo chamado. Estarei por aqui!
```
