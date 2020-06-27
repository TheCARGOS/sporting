import "./scss/styles.scss"
import Vue from "vue"
import VueRouter from "vue-router"
import App from "./App.vue"

import routes from "./routes"

import store from "./store/index"

Vue.use(VueRouter)


window.eventBus = new Vue()

const router = new VueRouter({
    routes,
    mode: "history"
})

const app = new Vue({
    store,
    router,
    render: h => h(App)
}).$mount("#app")