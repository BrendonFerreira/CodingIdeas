const futurename = require('futurename');
const app = new futurename.App();

const { responsePipes, requestPipes } = require('./mainPipes');

app.on('response', (response) => {  
   return response.pipe(responsePipes())
})

app.on('request', (request) => {
   return request.pipe(requestPipes())
})

// Huge curious to see this working 
app.attach( (request, response) => {
   return require('http').createServer( (req, res) => {
      let parsedRequest = request( req )
      let parsedResponse = response( parsedRequest )
      res( parsedResponse )
   })
})

app.listen(3000)
