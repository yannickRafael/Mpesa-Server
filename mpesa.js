const express = require('express');
const Transaction = require('mpesa-mz-nodejs-lib');

const app = express();

// Configuração do M-Pesa
const config = {
  public_key: 'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmptSWqV7cGUUJJhUBxsMLonux24u+FoTlrb+4Kgc6092JIszmI1QUoMohaDDXSVueXx6IXwYGsjjWY32HGXj1iQhkALXfObJ4DqXn5h6E8y5/xQYNAyd5bpN5Z8r892B6toGzZQVB7qtebH4apDjmvTi5FGZVjVYxalyyQkj4uQbbRQjgCkubSi45Xl4CGtLqZztsKssWz3mcKncgTnq3DHGYYEYiKq0xIj100LGbnvNz20Sgqmw/cH+Bua4GJsWYLEqf/h/yiMgiBbxFxsnwZl0im5vXDlwKPw+QnO2fscDhxZFAwV06bgG0oEoWm9FnjMsfvwm0rUNYFlZ+TOtCEhmhtFp+Tsx9jPCuOd5h2emGdSKD8A6jtwhNa7oQ8RtLEEqwAn44orENa1ibOkxMiiiFpmmJkwgZPOG/zMCjXIrrhDWTDUOZaPx/lEQoInJoE2i43VN/HTGCCw8dKQAwg0jsEXau5ixD0GUothqvuX3B9taoeoFAIvUPEq35YulprMM7ThdKodSHvhnwKG82dCsodRwY428kg2xM/UjiTENog4B6zzZfPhMxFlOSFX4MnrqkAS+8Jamhy1GgoHkEMrsT5+/ofjCx0HjKbT5NuA2V/lmzgJLl3jIERadLzuTYnKGWxVJcGLkWXlEPYLbiaKzbJb2sYxt+Kt5OxQqC1MCAwEAAQ==',
  api_host: 'api.sandbox.vm.co.mz',
  api_key: '7pbjezaspkydj52msie53472a8a7hold',
  origin: '*',
  service_provider_code: '171717',
  initiator_identifier: 'MyLunch',
  security_credential: '<Security Credential>'
};

// Instancie o objeto Transaction
const transaction = new Transaction(config);

// Defina uma rota para iniciar a transação C2B
app.get('/c2b', async (req, res) => {
  try {
    // Inicie a transação C2B
    const result = await transaction.initiateC2BTransaction();

    // Envie a resposta com o resultado da transação
    res.json(result);
  } catch (error) {
    // Em caso de erro, envie uma resposta com o status de erro
    res.status(500).json({ error: 'Ocorreu um erro ao iniciar a transação C2B.' });
  }
});

// Inicie o servidor na porta desejada
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
