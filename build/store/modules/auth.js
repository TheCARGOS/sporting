const state = {
    token: localStorage.getItem("Authorization")? localStorage.getItem("Authorization").split(" ")[1]: "" || null,
    user: {}
}

const getters = {
    loggedIn (state) { return state.token !== null },
    loggedUser (state) { return this.user },
}

const mutations = {
    retrieveToken (state, token) { state.token = token },
    destroyToken (state) { state.token = null },
    setUserInfo (state, user) { state.user = user }
}

const actions = {
    async retrieveToken ({state, commit}, payload) {
        const user = await fetch ("/api/signin", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(payload)
        })
        const response = await user.json()
        if (!response.error) {
            localStorage.setItem("Authorization", "Bearer " + response.token)
            commit("retrieveToken", response.token)
            return true
        } else {
            return false
        }
        // now you have your token, time to register our user!
    },
    async destroyToken ({commit}) {
        commit("destroyToken")
        localStorage.removeItem('Authorization')
    },
    async getUserInfo ({commit}, token) {
        const response = await fetch("/api/user", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
        commit("setUserInfo", await response.json())
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}