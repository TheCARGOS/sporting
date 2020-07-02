const express = require("express")
const app = express()
const routes = require("./routes/index")
const playersRoutes = require("./routes/api/player")
const cors = require("cors")
const logger = require("morgan")
const dotenv = require("dotenv")

dotenv.config()
// const passport = require("passport")
// const passportMiddleware = require("./middlewares/passport")

app
    .set("port", process.env.PORT || 8080)
    
    .use( logger("dev") )
    .use( cors() )
    .use( express.static("dist") )
    .use( express.urlencoded({extended: false}) )
    .use( express.json() )
    // .use( passport.initialize() )
    .use( routes )
    .use( "/api", playersRoutes );

    // passport.use( passportMiddleware )

module.exports = app