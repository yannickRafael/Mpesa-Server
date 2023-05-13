const http = require('http');
const querystring = require('querystring');
const transaction = require('../mpesa.js');
const { log } = require('console');



http.createServer(function (req, res) {

    console.log('Servidor iniciou')
    const query = querystring.parse(req.url.split('?')[1]); // Get the query parameters from the URL
  
    const amount = query.amount;
    const phone = query.phone;
    const ref = query.ref;
    const thirdPartyRef = query.third_party_ref;
  
    if (amount && phone && ref && thirdPartyRef) {
      
      transaction.c2b({
        amount: amount,
        msisdn: phone,
        reference: ref,
        third_party_reference: thirdPartyRef
    })
      // lide com o sucesso
      .then(function(response){
          console.log(response)
          res.writeHead(200, response)
          res.end
      })
      // lide com o erro
      .catch(function(error){
          console.log(error)
      })
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Missing query parameters.');
      res.end();
    }
  }).listen(8080);
