const routesApiIndexer = (request, response)=> {
   return request.routeMatch( require('./routesConfig') ).action( request, response);
}

module.exports = {
  responsePipes : function() {
     return piper([pug(), compress()]) 
  },
  requestPipes : function() {
     return piper([require('configured/multer'), routeMatch(), routesApiIndexer()])
  }
}
