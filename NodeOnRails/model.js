
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

    model.validate = (config) => {

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

module.exports = Model