const RequestHasPermission = require('../helpers/request_has_permission')

module.exports = function Post({Permission}) {
    this.name = () => 'post';

    this.define_schema({
        title: String,
        content: String
    })

    this.validate({
        insert: RequestHasPermission(Permission)
    })

    this.define_middlewere('insert', (object, next) => {
        Socket.emit('new post', object)
        next()
    })

    return this;
}