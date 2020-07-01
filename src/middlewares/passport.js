const Player = require("../models/Player")
const { Strategy, ExtractJwt } = require("passport-jwt")

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secretkey"
}

module.exports = new Strategy(options, async (payload, done) => {
    try {
        const user = await Player.findOne({id: payload._id})
        if (user) {
            req.userId = user.id
            done(null, true)
        } else {
            done(null, false)
        }
    } catch (e) {
        console.error(e)
    }
})
