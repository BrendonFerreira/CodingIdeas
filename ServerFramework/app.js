const futurename = require('futurename');
const app = new futurename.App()

const routesApiIndexer = (request, response)=>{
   // This is going to be insane!!! (I'm so exited!)
   return request.routeMatch( require('./routesConfig') ).action( request, response)
}

const responsePipes = function() {
   return piper([pug(), compress()]) 
}

const requestPipes = function() {
   return piper([require('configured/multer'), routeMatch(), routesApiIndexer()])
}

app.on('response', (response, end) => {  
   return response.pipe(responsePipes()).pipe(end)
})

app.on('request', (request, end) => {
   return request.pipe(requestPipes()).pipe(end)
})

app.listen(3000)
