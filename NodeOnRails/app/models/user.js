module.exports = function User({Comment, Post}) {
    this.name = () => 'user'
    this.define_schema({    
        name: String,
        age: Number
    })
    this.has_many(Comment)
    this.has_many(Post)
    return this;
}