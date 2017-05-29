const shoio = new (require('shoio'))()

shoio.createModel("author", function Author({ Book }){
	this.hasMany(Book)
	return {
		moreBooks : ( query ) => {
			// Promise
		}
	}
})

shoio.createModel("book", function Book({ Author }){
	this.hasMany(Author)
	return {
		bestRated : ( query ) => {
			// Promise
		}
	}
})

shoio.createControllerForModel("book", function Book(){
	return {
		getBestRated : async (ctx, next) => {
			ctx.body = await this.model.bestRated();
		}
	}
})

shoio.createRouter(function Book(){
	this.get('/best', 'getBestRated')
	this.root('book')
	return this;
})

shoio.listen(3000)

