const jwt = require("jsonwebtoken")

async function verifyToken (req, res, next) {
    try {
        const token = req.header("Authorization").split(" ")[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userId = decoded.id
        next()
    } catch (e) {
        req.userId = null
        res.json({message: "ERROR: token expired or invalid.", error: true})
    }
}

module.exports = {
    verifyToken
}