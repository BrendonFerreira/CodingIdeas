

const DataBase = require('./database')
const Model = require('./model')
const Collection = require('./collection')

// Controllers
const Posts = ( { Post } ) => {
    return {
        index: (search, pagination) => Post.find(search,pagination),
        consult: (id) => Post.find({id}),
        create: (data) => Post.insert(data),
        update: (id, data) => Post.update({id}, data), 
        remove: id => Post.remove({id})
    }
}

const Users = ( { User } /* access for another functions here? */ ) => {
    return {
        index: { pagination } => User.find( ...pagination ), // Pagination plugin, parse all requests and detect, maybe the id can be used by this way 
        consult: { params : { id } } => User.find(id), 
        create: { undefined, body } => User.insert(body), // If has some error with insert will be returned to controller
        update: { params : { id }, body } => User.update(id, body),
        remove: { params: { id } } => User.remove(id),
        view: { pagination }    
    }
}

const Models = {
    Post: new Model( 'post', require('./app/models/post'), DataBase ),
    User: new Model( 'user', require('./app/models/user'), DataBase )
}

// Create controller
//   define wich parameter wanted to controller from request
//   i think in add something like before middlewheres to parse request
//   and return on a object

Users(Models).create({name: "Silva World da silva", age: "21"}).then( (response) => { 
    Users(Models).create({name: "Hello World da silva", age: "23"}).then( (response) => { 
        Users(Models).create({name: "Pereira World da silva", age: "18"}).then( (response) => { 
            Users(Models).create({name: "World da silva", age: "30"}).then( (response) => { 
                Users(Models).create({name: "Tux World da silva", age: "19"}).then( (response) => { 
                    Users(Models).create({name: "World da Silva World da silva", age: "29"}).then( (response) => { 
                        Users(Models).create({name: "XPTO World da silva", age: "31"}).then( (response) => { 
                            Posts(Models).create({title: "Hello World", content: "This is my first post"}).then( (response) => { 
                                Users(Models).index().then(console.log)
                            })
                        })
                    })
                })
            })
        })
    })
}) 

const UsersRouter = (route) => {
    route.main('user')
    route.get('/')
    route.get('/:id', 'consult')
    route.post('/', 'create')
    route.set('/:id', 'update')
    return route;
}
                
const Application = require('./application')
const router = require('express').Router;
router.use( Application.createRoute(UsersRouter) )

Application.use(application_router)
Application.start(3000)
