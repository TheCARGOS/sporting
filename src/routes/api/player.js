const router = require("express").Router()
const { getPlayers, postPlayer, ratePlayer } = require("../../controllers/player.controller")
const { signIn, myProfile, verifyToken, userFromJWT } = require("../../controllers/auth.controller")
// const passport = require("passport")

router
    .get("/players", getPlayers)
    .post("/player", postPlayer)
    .put("/player", ratePlayer)


    // .get("/profile", passport.authenticate("jwt", {session: false}), myProfile)
    // .get("/user", passport.authenticate("jwt", {session: false}), userFromJWT)
    .get("/user", verifyToken, userFromJWT)
    .post("/signin", signIn)

module.exports = router