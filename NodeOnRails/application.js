const express = require('express')

const Application = ( function() {

    const router = express.Router()

    return {
        main_page(req, res) {
            res.json({message: 'Hello World'})
            res.end()
        },
        use(...a) {
            router.use(...a)
        },
        router() {
            return express.Router();
        },
        start(port){
            const app = express()
            app.use(router)
            app.listen(port)
        }
    }
    

})()

module.exports = Application