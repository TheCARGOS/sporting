import MainMenu from "./layouts/MainMenu.vue"
import ListPlayers from "./components/ListPlayers.vue"

export default  [
    {
        path: "/",
        component: ListPlayers,
        name: "home"
    },
    {
        path: "/menu",
        component: MainMenu,
        name: "menu"
    },
    {
        path: "/players",
        component: ListPlayers,
        name: "players"
    }
]