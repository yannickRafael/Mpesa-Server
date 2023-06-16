const express = require('express');
const querystring = require('querystring');
const transaction = require('./mpesa.js');
const { log } = require('console');

console.log('iniciado');

const app = express();
const port = 8080;

app.get('/', async (req, res) => {
  console.log('Servidor iniciou');
  const query = querystring.parse(req.url.split('?')[1]); // Obter os parâmetros da consulta da URL

  const amount = query.amount;
  const phone = query.phone;
  const ref = query.ref;
  const thirdPartyRef = query.third_party_ref;

  if (amount && phone && ref && thirdPartyRef) {
    try {
      const response = await transaction.c2b({
        amount: amount,
        msisdn: phone,
        reference: ref,
        third_party_reference: thirdPartyRef
      });
      console.log(response);
      res.status(200).send(response); // Enviar status de sucesso (200) e a resposta
    } catch (error) {
      console.log(error);
      res.status(500).send('An error occurred.'); // Enviar status de erro do servidor (500) e mensagem de erro
    }
  } else {
    res.status(400).send('Missing query parameters.'); // Enviar status de requisição inválida (400) e mensagem de erro
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
