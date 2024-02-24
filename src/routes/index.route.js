const router = require('express').Router();

/**
 * Archivos de rutas
 */
const userRoute = require('./user.route');



const init_routes = () => {
    router.use("/users", userRoute)
    
    return router
}

module.exports = {init_routes};