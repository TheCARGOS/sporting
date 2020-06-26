import MainMenu from "./layouts/MainMenu.vue"
import ListPlayers from "./components/ListPlayers.vue"
import ListMatches from "./components/ListMatches.vue"

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
        path: "/players",
        component: ListPlayers,
        name: "players"
    }
]