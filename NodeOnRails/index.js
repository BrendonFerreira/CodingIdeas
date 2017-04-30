function Query( config ) {
    return () => true
}

function Collection(){
    this.items= [];
    
    this._find = (query) => {
        return new Promise( (resolve, reject) => {
            resolve( this.items.filter( new Query(query) ) )
        })
    }
    this._findOne = (query) => {
        return new Promise( (resolve, reject) => {
            resolve( this.items.find( new Query(config) ) )
        })
    }
    this._remove = (query) => {
        return new Promise( (resolve, reject) => {
            let before = this.items.length
            this.items = this.items.filter( new Query(query) )
            resolve( 'removed: '+ before - this.items.length  )
        })
    }
    this._insert = (data) => {
        return new Promise( (resolve, reject) => {
            this.items.push(data);
            resolve( data )
        })
    }
    this._count = () => {
        return new Promise( resolve => {
            resolve( this.items.length )
        })
    }
    return this;
}

const DataBase = {
    collections: {},
    createCollection : function(collectionName){
        this.collections[collectionName] = new Collection()
        return this.collections[collectionName]
    },
    getCollection : function(collectionName){
        return this.collections[collectionName]
    }
}


function Model(name, fn, db) {

    const model = db.createCollection(name)

    model.middleweres = {} 

    model.schema = {}

    model.define_middlewere = ( action, fn ) => {
        model.middleweres[action] = [
            ...model.middleweres[action] || [],
            fn
        ]
    }
    
    model.define_middleweres = ( action, fnArray ) => {
        model.middleweres[action] = [
            ...model.middleweres[action] || [],
            ...fnArray
        ]
    }

    model.apply_middleweres = ( action ) => {
        return ( params ) => {
            return new Promise( (resolve) => {
                const chain = ( params , middleweres ) => {
                    try {
                        middleweres.shift()(params, (result) => {
                            chain(result, middleweres)
                        })
                    } catch(i) {
                        resolve(params)
                    }
                }
                chain( params , [...model.middleweres[action]] )
            })
        }
    }

    model.define_fields = (schema) => {
        model.schema = schema
        model.define_middleweres('insert', [
            (object, next) => {
                let newObject = {}
                for( let index in schema ){
                    newObject[index] = schema[index]( object[index] )
                }
                next(newObject)
            }, 
            (object, next) => {
                object.createdAt = new Date()
                next(object)
            },
            (object, next) => {
                db.getCollection(name)._count().then((result)=>{      
                    object.id = result
                    next(object)
                })
            }
        ])
        return model;
    }
    model.define_schema = model.define_fields 

    model.has_many = (Model) => {
    }

    model.belongs_to =  (Model) => {
    }

    model.insert = (data) => {
        return new Promise( (resolve, reject) => {
            model.apply_middleweres('insert')(data).then( (result) => {
                model._insert(result).then(resolve)
            })
        })    
    }

    model.find = model._find
    model.findOne = model._findOne
    model.remove = model._remove

    return fn.bind( model )(db)
}

const User = new Model( 'user', function ({Comment, Post}) {
    this.define_fields({    
        name: String,
        age: Number
    })
    this.has_many(Comment)
    this.has_many(Post)
    return this;
}, DataBase)

const Post = new Model('post', function ({User, Comment}) {
    this.define_fields({
        title: String,
        content: String
    })
    return this;
}, DataBase)

// Controllers
const Posts = () => {
    return {
        index: () => Post.find(),
        create: (post) => Post.insert(post),
        getModel: () => Post
    }
}

const Users = () => {
    return {
        index: () => User.find(),
        create: (user) => User.insert(user),
        getModel: () => User,
    }
}

(async function(){
    await Users().create({name: "Hello World da silva", age: "23"})
    await Users().create({name: "Silva World da silva", age: "21"})
    await Users().create({name: "Pereira World da silva", age: "18"})
    await Users().create({name: "World da silva", age: "30"})
    await Users().create({name: "World da Silva World da silva", age: "29"})
    await Users().create({name: "Tux World da silva", age: "19"})
    await Users().create({name: "XPTO World da silva", age: "31"})
    await Posts().create({title: "Hello World", content: "This is my first post"})
})()

const futureExports = { 
    main_route: '/user',
    controller: Users,
    child: {
        '/:id': { 
            'get': 'consult'
        },
        '/': {
            'post': 'create',
            'get': Users().index
        }
    }
}

const Application = ( function() {

    const routes = [];

    return {
        registerRoute(config) {
            routes.push(config)
        },
        start(port){
            const http = require('http')
            const server = http.createServer( function(req, res){
                let {url} = req
                let {child} = routes[0]
                let {get} = child['/']
                get().then(result => {
                    res.write( JSON.stringify( result ).toString() )
                    res.end()
                })
            });
            server.listen(port)
        }
    }
    

})()

Application.registerRoute(futureExports)
Application.start(3000)