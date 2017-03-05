
const apiRoute = [{ 
   route: 'people',
   child: require('People/routes')
}, {
   route: 'human',
   child: require('People/routes')
}]

module.exports = [{ 
   route: 'api', 
   child: apiRoute
}]
