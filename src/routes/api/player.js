const router = require("express").Router()
const { getPlayers, postPlayer, ratePlayer } = require("../../controllers/player.controller")

router
    .get("/players", getPlayers)
    .post("/player", postPlayer)
    .put("/player", ratePlayer)
module.exports = router