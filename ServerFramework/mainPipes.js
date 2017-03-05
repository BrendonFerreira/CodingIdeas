module.exports = {
  responsePipes : function() {
     return piper([pug(), compress()]) 
  },
  requestPipes : function() {
     return piper([require('configured/multer'), routeMatch(), routesApiIndexer()])
  }
}
