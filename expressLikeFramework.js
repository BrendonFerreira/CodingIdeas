const futurename = require('futurename');
const app = new futurename.App()

// pipe usage 
fn( request, response ){
   return `The message is ${request.params.message}`;
}  

// example 1
app.on('request', (request) => {
  return { body : "<h1>Hello World</h1>" }
});

// example 2
const mainRedirector = (request, response) => {
  switch( request.url ){
    case "/home" : {
      // The usage of function response may be optional
      // but will not be able to apply pipe middlewheres
      return response({ body : "<h1>Hello World</h1>" })
    } 
    case "/message" : {
      return { body : "<h1>This is awesome</h1>" }
    }
  }
}

app.on('request', function(request, response){
    return request.pipe( mainRedirector )
})

app.listen(3000)
