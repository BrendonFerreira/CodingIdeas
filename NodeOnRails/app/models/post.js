const RequestHasPermission = require('../helpers/request_has_permission')

module.exports = ( model, {Permission} ) => {
    model.name = () => 'post';
    model.define_schema({
        title: String,
        content: String
    })
    model.validate({
        insert: RequestHasPermission(Permission)
    })
    model.define_middlewere('insert', (object, next) => {
        Socket.emit('new post', object)
        next()
    })
    return model;
}
