import MainMenu from "./layouts/MainMenu.vue"
import ListPlayers from "./components/ListPlayers.vue"
import ListMatches from "./components/ListMatches.vue"
import Login from "./components/auth/Login.vue"
import Dashboard from "./components/Dashboard.vue"

export default  [
    {
        path: "/",
        component: ListPlayers,
        name: "home"
    },
    {
        path: "/matches",
        component: ListMatches,
        name: "matches"
    },
    {
        path: "/login",
        component: Login,
        name: "login"
    },
    {
        path: "/dashboard",
        component: Dashboard,
        name: "dashboard"
    },
    {
        path: "/players",
        component: ListPlayers,
        name: "players"
    }
]