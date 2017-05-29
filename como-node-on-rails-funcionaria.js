const shoio = new (require('shoio'))()

shoio.createModel("author", function Author({ Book }){
	this.hasMany("book") // ?
	return {
		moreBooks : ( query ) => {
			// Promise
		}
	}
})

shoio.createModel("book", function Book({ Author }){
	this.hasMany("author") // ?
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

// 
shoio.createRouterForController("book", function Book(){
	this.get('/best', 'getBestRated')
	this.root('book')
})

shoio.listen(3000)

