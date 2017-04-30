function Query( config ) {
    return () => true
}

function Collection(){
    this.items= [];
    
    this.find = (query) => {
        return new Promise( (resolve, reject) => {
            resolve( this.items.filter( new Query(query) ) )
        })
    }
    this.findOne = (query) => {
        return new Promise( (resolve, reject) => {
            resolve( this.items.find( new Query(config) ) )
        })
    }
    this.remove = (query) => {
        return new Promise( (resolve, reject) => {
            let before = this.items.length
            this.items = this.items.filter( new Query(query) )
            resolve( 'removed: '+ before - this.items.length  )
        })
    }
    this.insert = (data) => {
        return new Promise( (resolve, reject) => {
            this.items.push(data);
            resolve( "Inserted" )
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

    let parser = i => i

    model.middlewheres = {
    } 

    model.defineMiddleWhere = ( action, fn ) => {
        model.middlewheres[action] = [
            ...model.middlewheres[action] || [],
            fn
        ]
    }
    
    model.defineMiddleWheres = ( action, fnArray ) => {
        model.middlewheres[action] = [
            ...model.middlewheres[action],
            ...fnArray
        ]
    }

    model.applyMiddleWheres = ( action ) => {
        return (params) => {
            return model[action](...params)
            return new Promise( (resolve, reject) => {
                resolve(model[action])
                //return new Promise.all( model.middlewheres[action].map( middlewheres => middlewheres() ) )
            })
        }
    }

    model.define_fields = (schema) => {
        model.defineMiddleWhere('insert', (object) => {
            return new Promise( resolve => {
                resolve(Object.keys(schema).map( (field, constructor) => {
                    return (input) => constructor( input[field] )
                }))
            });
        })
    }

    model.has_many = (Model) => {
    }

    model.belongs_to = (Model) => {
    }


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
        create: (post) => Post.insert(post)
    }
}

const Users = () => {
    return {
        index: () => User.find(),
        create: (user) => User.insert(user)
    }
}

Users().create({name: "Hello World da silva", age: "23"}).then((createdUser) => {
    Users().index().then(console.log)
})
Posts().create({title: "Hello World", content: "This is my first post"}).then((createdObject)=>{
    Posts().index().then(console.log).catch(console.log)
})

/*
module.exports = {
    database : MySql,
    controllers : [
        Users,
        Posts
    ]
}
*/