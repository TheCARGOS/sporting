import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import players from "./modules/players"
import auth from "./modules/auth"

export default new Vuex.Store({
    modules: {
        players,
        auth
    }
})