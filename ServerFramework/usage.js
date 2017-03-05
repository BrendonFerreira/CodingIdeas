const futurename = require('futurename');
const app = new futurename.App()

const routesApiIndexer = (request, response)=>{
   // api/:model/action
   for( let index in models ) {
      if( request.routeMatch( routes[index]. ) ){
         return models[index].action( request, response)     
      }
   }
}

const apiRouter = (request, response) => {
   return request
      .pipe( require('config/multerConfig') )
      .pipe( routeMatch() )
      .pipe( routesApiIndexer() )
}

app.on('request', function(request){
    return request.pipe( mainRouter )
})

app.listen(3000)
