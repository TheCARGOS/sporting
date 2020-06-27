import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import players from "./modules/players"

export default new Vuex.Store({
    modules: {
        players
    }
})