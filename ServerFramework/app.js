const futurename = require('futurename');
const app = new futurename.App()

const routesApiIndexer = (request, response)=>{
   // This is going to be insane!!! (I'm so exited!)
   return request.routeMatch( require('routes') ).action( request, response)
}

app.on('request', function(request){
    return request
      .pipe( require('configured/multer') )
      .pipe( routeMatch() )
      .pipe( routesApiIndexer() )
})

app.listen(3000)
