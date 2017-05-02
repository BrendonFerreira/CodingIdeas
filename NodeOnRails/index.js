

const DataBase = require('./database')
const Model = require('./model')
const Collection = require('./collection')


// Controllers
const Posts = ( /* Put models access here? */ ) => {
    const Post = new Model( 'post', require('./app/models/post'), DataBase )
    return {
        index: (search, pagination) => Post.find(search,pagination),
        consult: (id) => Post.find({id}),
        create: (data) => Post.insert(data),
        update: (id, data) => Post.update({id}, data), 
        remove: id => Post.remove({id})
    }
}

const Users = ( /* Put models access here? */ ) => {
    const User = new Model( 'user', require('./app/models/user'), DataBase )
    return {
        index: (search, pagination) => User.find(search,pagination),
        consult: (id) => User.find({id}),
        create: (user) => User.insert(user),
        update: (id, user) => User.update({id}, user), 
        remove: id => User.remove({id})
    }
}


Users().create({name: "Silva World da silva", age: "21"}).then( (response) => { 
    Users().create({name: "Hello World da silva", age: "23"}).then( (response) => { 
        Users().create({name: "Pereira World da silva", age: "18"}).then( (response) => { 
            Users().create({name: "World da silva", age: "30"}).then( (response) => { 
                Users().create({name: "Tux World da silva", age: "19"}).then( (response) => { 
                    Users().create({name: "World da Silva World da silva", age: "29"}).then( (response) => { 
                        Users().create({name: "XPTO World da silva", age: "31"}).then( (response) => { 
                            Posts().create({title: "Hello World", content: "This is my first post"}).then( (response) => { 
                                Users().index().then(console.log)
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
const {router: Router, main_page} = Application

const user_router = Router()
user_router.get('/user', main_page)
user_router.get('/user/:id', main_page)

const application_router = Router();
application_router.get('/', main_page)
application_router.use(user_router)

Application.use(application_router)
Application.start(3000)
