const { connect } = require("mongoose")

async function startConnection () {
    await connect("mongodb://localhost:27017/sporting", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log(`We're connected`)
}

module.exports = { startConnection }