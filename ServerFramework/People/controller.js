let Peoples = ['Brendon', 'Braian', 'Bruno'];

const People = {
   all : function(request, response){
      return response( null , Peoples);
   },
   delete : function(request, response) {
      Peoples.splice( request.params.id , -1);
      return response( { ok : 1 } )
   },
   create : function(request, response){
      Peoples.push( request.body );
      return response( request.body );
   }
};
