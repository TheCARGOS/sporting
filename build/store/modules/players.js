const state = {
    players: [],
    playerToShow: {
        "name": "SAMUEL GARCES",
        "position": "FWD",
        "username": "garzo",
        "password": "2929",
        "country": "PER",
        "skills" : {
            "powerShot" : 70,
            "accuracy" : 70,
            "assist" : 70,
            "intercepter" : 70,
            "fortitude" : 65,
            "mark" : 75
        }
    }
}

const getters = {
    // setPlayers: async state => state.players = await fetch("http://localhost:8080/api/players")
}

const actions = {}

const mutations = {
    setPlayers: async state => state.players = await (await fetch("http://localhost:8080/api/players")).json(),
    setPlayerToShow: async (state, payload) => state.playerToShow = payload.player
}

export default {
    state,
    getters,
    actions,
    mutations
}