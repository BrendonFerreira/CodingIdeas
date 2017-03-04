// example 1
app.on('request', function(request, response){
  response.body = "<h1>Hello World</h1>"
  return request.pipe(response);
});

// example 2
const redirect = ( request, response ) => {
  switch( request.url ){
    case "/home" : {
      request.body = "<h1>Hello World</h1>";
      request.pipe(response)
    }
  }
}

application = function( request ) {
    return request.pipe( redirect )
}

app.on('request', function(request, response){
    request.pipe( route('home') )
    return request.pipe( application ).pipe( response )
})


