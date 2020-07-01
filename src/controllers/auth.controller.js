const Player = require("../models/Player")
const jwt = require("jsonwebtoken")

function createToken (user) {
    return jwt.sign({id: user.id}, "secretkey", {
        expiresIn: 60 * 60
    })
}

async function verifyToken (req, res, next) {
    const token = req.header("Authorization").split(" ")[1]
    const decoded = jwt.verify(token, "secretkey")
    req.userId = decoded.id
    next()
}


async function signIn (req, res) {
    if (req.body.username && req.body.password) {
        const user = await Player.findOne({username: req.body.username})
        if ( user ) {
            const isMatched = await user.comparePassword(req.body.password)
            isMatched?
                res.json({token: createToken(user)}):
                res.json({error: "Username or password is incorrect."})
        } else {
            return res.json({error: "Username not found."})
        }
    } else {
        return res.json({error: "User and password are required."})
    }
}

async function userFromJWT (req, res, next) {
    const user = await Player.findById(req.userId)
    res.json(user)
}

async function myProfile (req, res) {
    res.send("success")
}


module.exports = {
    signIn,
    myProfile,
    userFromJWT,
    verifyToken
}