<template>
    <div>
        <div class="players-list">
            <section>
                <span class="players-list__title DEF" style="margin-top: 0;">DEFENSAS</span>
                <player-filtered :filteredPlayers="defPlayers"></player-filtered>
            </section>

            <section>
                <span class="players-list__title MID">MEDIO CAMPO</span>
                <player-filtered :filteredPlayers="midPlayers"></player-filtered>
            </section>

            <section>
                <span class="players-list__title FWD">DELANTEROS</span>
                <div class="players-list__list">
                    <player-filtered :filteredPlayers="fwdPlayers"></player-filtered>
                </div>
            </section>
        </div>

        <div class="player-info flex-column" id="mySidenav" >
            <a href="#!" class="player-info__close" @click="closeSidenav">x</a>
            <player-item :player="playerToShow" sidenav="true"></player-item>
            <player-stats :player="playerToShow"></player-stats>
        </div>
    </div>
</template>

<script>
import PlayerItem from "./PlayerItem.vue"
import PlayerStats from "./PlayerStats.vue"
import PlayerFiltered from "./PlayerFiltered.vue"

export default {
    name: "list-players",
    components: { PlayerItem, PlayerFiltered, PlayerStats },
    data() {
        return {
            players: this.getPlayers(),
            playerToShow: {
                "name": "Samuel Garces",
                "position": "FWD",
                "username": "samuelg",
                "password": "2929",
                "country": "PER",
                "skills" : {
                    "powerShot" : 85,
                    "accuracy" : 85,
                    "assist" : 70,
                    "intercepter" : 70,
                    "fortitude" : 90,
                    "mark" : 75
                }
            },
            defPlayers: [],
            midPlayers: [],
            fwdPlayers: []
        }
    },
    created () {
        this.players = this.getPlayers()
        window.eventBus.$on("setPlayerToShow", player => this.setPlayerToShow(player))
    },

    methods: {
        async getPlayers () {
            const response = await fetch("http://localhost:8080/api/players")
            this.players = await response.json()
            this.defPlayers = await this.players.filter(player => player.position == "DEF")
            this.midPlayers = await this.players.filter(player => player.position == "MID")
            this.fwdPlayers = await this.players.filter(player => player.position == "FWD")
        },
        setPlayerToShow (player) {
            this.playerToShow = player
            document.getElementById("mySidenav").style.width = "300px"
            document.getElementById("mySidenav").style.padding = "30px"
            this.toggleOpacity()
        },
        closeSidenav () {
            document.getElementById("mySidenav").style.padding = "0px";
            document.getElementById("mySidenav").style.width = "0";
            this.toggleOpacity()
        },

        toggleOpacity () {
            document.getElementById("mySidenav").classList.toggle("opacity")
        }
    }
}
</script>

<style lang="scss">
    .opacity {
        overflow: visible;
        position: fixed;
        &::before {
            content: "";
            background: rgba(black, .8);
            position: absolute;
            top: 0;
            left: 100%;
            height: 100vh;
            width: 100vw;
            z-index: 150;
        }
    }
</style>