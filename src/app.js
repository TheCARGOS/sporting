const express = require("express")
const app = express()
const routes = require("./routes/index")
const playersRoutes = require("./routes/api/player")
const cors = require("cors")
const logger = require("morgan")

app
    .set("port", process.env.PORT || 8080)
    
    .use( logger("dev") )
    .use( cors() )
    .use( express.static("dist") )
    .use( express.urlencoded({extended: false}) )
    .use( express.json() )
    .use( routes )
    .use( "/api", playersRoutes )

module.exports = app