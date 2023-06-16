const http = require('http');
const querystring = require('querystring');
const transaction = require('./mpesa.js');
const { log } = require('console');

console.log('iniciado');

http.createServer(async function (req, res) {
  console.log('Servidor iniciou');
  const query = querystring.parse(req.url.split('?')[1]); // Get the query parameters from the URL

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
      res.writeHead(200, response);
      res.end();
    } catch (error) {
      console.log(error);
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.write('An error occurred.');
      res.end();
    }
  } else {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('Missing query parameters.');
    res.end();
  }
}).listen(8080);
