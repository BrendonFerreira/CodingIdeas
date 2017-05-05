module.exports = ( model, {Comment, Post} ) => {
    model.name = () => 'user'
    model.define_schema({    
        name: String,
        age: Number
    })
    model.has_many(Comment)
    model.has_many(Post)
    return model;
}
