// What if server was oriented to events

let {listener} = new App();

listener.attach( apiRequests );

listener.on('notFoundPage', requestData => {
   this.emit('response', 'page not found')
})

listener.on('homeRequest', requestData => {
   this.emit('response', "Hello World")
})

listener.on('welcomeApiRequest', requestData => {
   this.emit('response', {'message': 'welcome to our api'})
})

listener.on('request', (requestData) => {
   let {url} = requestData; 
   
   urlMatches(url, '/api') ? return this.emit('welcomeApiRequest',requestData) : null;
   urlMatches(url, '/home') ? return this.emit('homeRequest',requestData) : null;
   this.emit('notFoundPage', requestData)
   
)
