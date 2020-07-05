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
        "powerShot" : 0,
        "accuracy" : 0,
        "assist" : 0,
        "intercepter" : 0,
        "fortitude" : 0,
        "mark" : 0
    }
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
        if (state.rate[rateInfo.skillName] >= 100) {
            state.rate[rateInfo.skillName] = 100
        } else if ( state.rate[rateInfo.skillName] <= 0 ) {
            state.rate[rateInfo.skillName] = 0
        }
    },
}

const actions = {
    setPlayers: async function ({commit}) {
        const players = await (await fetch("http://localhost:8080/api/players")).json()
        commit("setPlayers", players)
        setSkills(players)
    },
    ratePlayer: async function (context, rateData) {
        const response = await fetch("http://localhost:8080/api/player", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + context.rootState.auth.token
            },
            body: JSON.stringify(rateData)
        })

        context.dispatch("setPlayers")
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
        await player.rates.forEach(rate => {
            const ammount = player.rates.length
            player.skills.powerShot += rate.skills.powerShot / ammount
            player.skills.accuracy += rate.skills.accuracy / ammount
            player.skills.assist += rate.skills.assist / ammount
            player.skills.intercepter += rate.skills.intercepter / ammount
            player.skills.fortitude += rate.skills.fortitude / ammount
            player.skills.mark += rate.skills.mark / ammount
        })
    })
}



export default {
    state,
    getters,
    actions,
    mutations
}