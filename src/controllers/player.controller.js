const Player = require("../models/Player")

async function getPlayers (req, res) {
    const response = await Player.find({}, {password: 0})
    return res.send(response)
}

async function postPlayer (req, res) {
    if ( req.body.name && req.body.position ) {
        const newPlayer = new Player({
            name: req.body.name,
            nickname: req.body.nickname,
            position: req.body.position,
            country: req.body.country,
            rates: [],
            username: req.body.username,
            password: req.body.password,
            // skills: [],
            skills: {
                powerShot: req.body.skills.powerShot,
                accuracy : req.body.skills.accuracy,
                assist : req.body.skills.assist,
                intercepter : req.body.skills.intercepter,
                fortitude : req.body.skills.fortitude,
                mark : req.body.skills.mark
            }
        })
        const response = newPlayer.save()
        return res.send({message: "Player added successfully", response})
    } else {
        return res.json({message: "NAME and POSITION are required."})
    }
}

async function ratePlayer (req, res) {
    const id = req.body.id
    const rate = {
        skills: {
            powerShot: req.body.skills.powerShot,
            accuracy : req.body.skills.accuracy,
            assist : req.body.skills.assist,
            intercepter : req.body.skills.intercepter,
            fortitude : req.body.skills.fortitude,
            mark : req.body.skills.mark
        }
    }

    console.log( req.body )
    const response = await Player.findByIdAndUpdate(id, rate)
    return res.send({message: "Played edited", message: response})


    // return res.json(rate)
}

module.exports = {
    getPlayers,
    postPlayer,
    ratePlayer
}