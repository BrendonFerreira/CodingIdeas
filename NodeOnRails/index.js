

const DataBase = require('./database')
const Model = require('./model')
const Collection = require('./collection')

// Controllers
const Posts = ( generateController, { Post } ) => {
    return generateController(Post, {
        // Extensions
    })
}

// First parameter come with default controller values
const Users = ( generateController, { User } ) => {
    return generateController(User, {
        // Extensions
    }) 
}

const Models = {
    Post: new Model( 'post', require('./app/models/post'), DataBase ),
    User: new Model( 'user', require('./app/models/user'), DataBase )
}

// Create controller
//   define wich parameter wanted to controller from request
//   i think in add something like before middlewheres to parse request
//   and return on a object


function Controller(controller, Models) {
    const getDefaultCrudFunctions = (Model, ToExtend={}) => {
        return Object.assign({
            index : ({ pagination }) => Model.find( ...pagination ),
            consult: ({ params: { id } }) => Model.find( id ),
            create: ({ undefined, body }) => Model.insert(body),
            update: ({ params : { id }, body }) => Model.update(id, body),
            remove: ({ params: { id } }) => Model.remove(id)
        }, ToExtend)
    }

    return controller( getDefaultCrudFunctions , Models );
}

function Router(nativeRouter, routesConfigurator, controller) {

    const parseRoute = ( root, path ) => `${root}${path}`;
    let rootName = ""
    const untouchedRouter = nativeRouter();
    const routerActioner = nativeRouter();

    routerActioner.create = function(name) {
        rootName = name;
     
        for( let method of ['get', 'post', 'delete', 'put', 'patch'] ){
            routerActioner[method] = ( path, functionName ) => {
                console.log( parseRoute(rootName, path))
                return untouchedRouter[method]( parseRoute(rootName, path) , controller[functionName]  )
            }
        }
        routerActioner.get('/', 'index')
        routerActioner.get('/:id', 'consult')
        routerActioner.post('/', 'create')
        routerActioner.put('/:id', 'update')

    }

    

    

    return routesConfigurator(routerActioner)
}

const UsersController = new Controller( Users , Models);
const PostsController = new Controller( Posts , Models);

UsersController.create({name: "Silva World da silva", age: "21"}).then( (response) => { 
    UsersController.create({name: "Hello World da silva", age: "23"}).then( (response) => { 
        UsersController.create({name: "Pereira World da silva", age: "18"}).then( (response) => { 
            UsersController.create({name: "World da silva", age: "30"}).then( (response) => { 
                UsersController.create({name: "Tux World da silva", age: "19"}).then( (response) => { 
                    UsersController.create({name: "World da Silva World da silva", age: "29"}).then( (response) => { 
                        UsersController.create({name: "XPTO World da silva", age: "31"}).then( (response) => { 
                            UsersController.create({title: "Hello World", content: "This is my first post"}).then( (response) => { 
                                UsersController.index().then(console.log)
                            })
                        })
                    })
                })
            })
        })
    })
}) 

const UsersRouter = (routes) => {
    routes.create('user')
    return routes;
}
                
const Application = require('./application')


Application.use( new Router(Application.getRouter, UsersRouter, UsersController) )
Application.start(3000)
