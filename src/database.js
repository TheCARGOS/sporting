const { connect } = require("mongoose")

async function startConnection () {
    await connect("mongodb://"+ process.env.DB_HOST +"/sporting", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log(`We're connected`)
}

module.exports = { startConnection }