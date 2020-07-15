const Player = require("../models/Player")

async function getPlayers (req, res) {
    const response = await Player.find({}, {password: 0, username: 0})
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
            urlImage: req.body.urlImage
            // skills: [],
            // skills: {
            //     powerShot: req.body.skills.powerShot,
            //     accuracy : req.body.skills.accuracy,
            //     assist : req.body.skills.assist,
            //     intercepter : req.body.skills.intercepter,
            //     fortitude : req.body.skills.fortitude,
            //     mark : req.body.skills.mark
            // }
        })
        const response = newPlayer.save()
        return res.send({message: "Player added successfully", response})
    } else {
        return res.json({message: "NAME and POSITION are required.", error: true})
    }
}

async function ratePlayer (req, res) {
    const rateFromUser = {
        userId: req.userId,
        toPlayer: req.body.id,
        skills: {
            powerShot: req.body.skills.powerShot,
            accuracy : req.body.skills.accuracy,
            assist : req.body.skills.assist,
            intercepter : req.body.skills.intercepter,
            fortitude : req.body.skills.fortitude,
            mark : req.body.skills.mark
        }
    }

    Object.keys(rateFromUser.skills).forEach(skillname => {
        if (rateFromUser.skills[skillname] < 5) {
            rateFromUser.skills[skillname] = 5
        }
    })

    // const response = await Player.findByIdAndUpdate(req.userId, rate)
    if ( req.body.id != req.userId ) {
        const response = await Player.findOne({_id: req.body.id}, {rates: 1, _id: 0})
        let foundEquals = false
        if (response.rates) {
            response.rates.forEach(async rate => {
                if (rate.userId == req.userId) {
                    foundEquals = true
                    rate = rateFromUser
                    await Player.updateOne(
                    {
                        _id: req.body.id,
                        "rates.userId": rate.userId
                    },
                    {
                        $set : {"rates.$.skills": rateFromUser.skills}
                    }
                    )
                }
            })
    
            if ( !foundEquals ) {
                await Player.updateOne({_id: req.body.id},
                    {$push: {rates: rateFromUser}}
                )
    
            }
        }
        return res.send({message: response.rates})
    } else {
        return res.send({message: "You cannot rate yourself.", error: "true"})
    }
}

module.exports = {
    getPlayers,
    postPlayer,
    ratePlayer
}