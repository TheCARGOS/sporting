const { connect } = require("mongoose")

async function startConnection () {
    try {
        await connect(process.env.DB_ENTIRE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (e) {
        console.error(e)
    }
    console.log(`We're connected`)
}

module.exports = { startConnection }