const express = require('express');
const transaction = require('./mpesa.js');

const app = express();
const port = 8080;

app.get('/', async (req, res) => {
  console.log('Servidor iniciou');
  const query = req.query; // Obtém os parâmetros da consulta da URL

  const amount = query.amount; // Valor da transação
  const phone = query.phone; // Número de telefone
  const ref = query.ref; // Referência da transação
  const thirdPartyRef = query.third_party_ref; // Referência de terceiros

  if (amount && phone && ref && thirdPartyRef) {
    try {
      const response = await transaction.c2b({
        amount: amount,
        msisdn: phone,
        reference: ref,
        third_party_reference: thirdPartyRef
      });
      console.log(response);
      res.sendStatus(200); // Envie o status de sucesso (200)
    } catch (error) {
      console.log(error);
      res.sendStatus(500); // Envie o status de erro do servidor (500)
    }
  } else {
    res.sendStatus(400); // Envie o status de requisição inválida (400)
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
