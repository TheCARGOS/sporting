const state = {
    players: [],
    playerToShow: {
        "name": "SAMUEL GARCES",
        "position": "FWD",
        "username": "garzo",
        "country": "PER",
        "skills" : {
            "powerShot" : 0,
            "accuracy" : 0,
            "assist" : 0,
            "intercepter" : 0,
            "fortitude" : 0,
            "mark" : 0
        },
        "urlImage": "samuelg.jpg"
    },
    rate: {
        "powerShot" : 5,
        "accuracy" : 5,
        "assist" : 5,
        "intercepter" : 5,
        "fortitude" : 5,
        "mark" : 5
    },
    rates: [],
    ratesFromUser: []
}

const getters = {
    allPlayers: state => this.setPlayers(),
    defPlayers: state => state.players.filter(player => player.position == "DEF"),
    midPlayers: state => state.players.filter(player => player.position == "MID"),
    fwdPlayers: state => state.players.filter(player => player.position == "FWD"),
    newRate: state => state.rate = state.playerToShow.skills,
    playerToShow: state => state.playerToShow
}


const mutations = {
    setPlayers: (state, players) => state.players = players,
    setPlayerToShow: async (state, payload) => {
        state.playerToShow = payload.player
        state.rate = state.playerToShow.skills
    },
    updateRate: (state, rateInfo) => {
        state.rate[rateInfo.skillName] += rateInfo.ammount
        if (state.rate[rateInfo.skillName] >= 10) {
            state.rate[rateInfo.skillName] = 10
        } else if ( state.rate[rateInfo.skillName] <= 5 ) {
            state.rate[rateInfo.skillName] = 5
        }
    },
    updateRatesFromUser: (state, rates) => state.ratesFromUser = rates 
}

const actions = {
    setPlayers: async function ({commit, dispatch}) {
        const players = await (await fetch("/api/players")).json()
        if (players.length > 0) {
            commit("setPlayers", players)
            setSkills()
        }
    },
    ratePlayer: async function (context, rateData) {
        const response = await fetch("/api/player", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + context.rootState.auth.token
            },
            body: JSON.stringify(rateData)
        })

        context.dispatch("setPlayers")
    },
    setRates: context => {
        context.state.rates = []
        context.state.players.forEach(player => {
            if ( player.rates.length > 0 ) {
                player.rates.forEach(rate => {
                    context.state.rates.push(rate)
                })
            }
        })
        context.dispatch("setRatesFromUser")
    },
    setRatesFromUser: async (context) => {
        const rates = context.state.rates.filter( rate => rate.userId == context.getters.loggedUser._id )
        context.commit("updateRatesFromUser", rates)
    }
}

async function setSkills () {
    await state.players.forEach(async player => {
        player.skills = {
            powerShot : 0,
            accuracy : 0,
            assist : 0,
            intercepter : 0,
            fortitude : 0,
            mark : 0
        }
        if (player.rates.length > 0) {
            await player.rates.forEach(rate => {
                const ammount = player.rates.length
                if (ammount > 0 && rate.skills) {
                    player.skills.powerShot += rate.skills.powerShot / ammount
                    player.skills.accuracy += rate.skills.accuracy / ammount
                    player.skills.assist += rate.skills.assist / ammount
                    player.skills.intercepter += rate.skills.intercepter / ammount
                    player.skills.fortitude += rate.skills.fortitude / ammount
                    player.skills.mark += rate.skills.mark / ammount
                }
            })
        }
    })
}



export default {
    state,
    getters,
    actions,
    mutations
}