const futurename = require('futurename');
const app = new futurename.App()

// pipe usage 
fn( request, response ){
   return `The message is ${request.params.message}`;
}  

// example 2
const mainRouter = (request, response) => {
  switch( request.url ){
    case "/home" : {
      // The usage of function response may be optional
      // but will not be able to apply pipe middlewheres
      return response({ body : "<h1>Hello World</h1>" })
    } 
    case "/message" : {
      return { body : "<h1>This is awesome</h1>" }
    }
    case "/help" : {
      return response("I can not help you");
    }
    default : {
      return apiRouter( request, response ); 
    }
  }
};


let Peoples = ['Brendon', 'Braian', 'Bruno'];
const People = {
   all : function(request, response){
      return response( null , Peoples);
   },
   delete : function(request, response) {
      Peoples.splice( request.params.id , -1);
      return response( { ok : 1 } )
   },
   create : function(request, response){
      Peoples.push( request.body );
      return response( request.body );
   }
};

const models = [
   {
      route : 'api/people',
      method: 'get',
      action : People.all
   },{
      route : 'api/people/:id',
      method: 'delete',
      action : People.delete
   },{
      route : 'api/people',
      method: 'post',
      action : People.create
   } 
];

const modelsIndexer = (request, response)=>{
   // api/:model/action
   for( let index in models ) {
      if( request.routeMatch( models[index].route ) ){
         return models[index].action( request, response)     
      }
   }
}

const apiRouter = (request, response) => {
   return request
      .pipe( require('config/multerConfig') )
      .pipe( routeMatch() )
      .pipe( modelsIndexModels() )
}

app.on('request', function(request){
    return request.pipe( mainRouter )
})

app.listen(3000)
