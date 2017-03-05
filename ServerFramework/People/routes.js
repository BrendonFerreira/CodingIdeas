
module.exports = [{
   method: 'get',
   action: People.all
}, {
   url : '/:id',
   method: 'delete',
   action: People.delete
}, {
   method : 'post',
   action: People.create
}]
