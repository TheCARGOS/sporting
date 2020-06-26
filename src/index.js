const app = require("./app")

const { startConnection } = require("./database")

async function main () {
    await startConnection()
    await app.listen(8080)
    console.log(`Server is running on port ${app.get("port")}`)
}

main()