<template>
    <div>
        <div class="players-list">
            <section>
                <span class="players-list__title animate__animated animate__fadeInLeft DEF" style="margin-top: 0;">DEFENSAS</span>
                <player-filtered :filteredPlayers="defPlayers"></player-filtered>
            </section>

            <section>
                <span class="players-list__title animate__animated animate__fadeInLeft MID">MEDIO CAMPO</span>
                <player-filtered :filteredPlayers="midPlayers"></player-filtered>
            </section>

            <section>
                <span class="players-list__title animate__animated animate__fadeInLeft FWD">DELANTEROS</span>
                <player-filtered :filteredPlayers="fwdPlayers"></player-filtered>
            </section>
        </div>

        <div class="player-info flex-column" id="mySidenav" >
            <div class="player-info__content">
                <a href="#!" class="player-info__close" @click="closeSidenav">x</a>
                <player-item :player="playerToShow" sidenav="true"></player-item>
                <player-stats></player-stats>
            </div>
        </div>
    </div>
</template>

<script>
import PlayerItem from "./PlayerItem.vue"
import PlayerStats from "./PlayerStats.vue"
import PlayerFiltered from "./PlayerFiltered.vue"
import { mapGetters } from "vuex"

// import { mapGetters } from "vuex"

export default {
    name: "list-players",
    components: { PlayerItem, PlayerFiltered, PlayerStats },
    created () {
        window.eventBus.$on("setPlayerToShow", this.setPlayerToShow)
        this.$store.dispatch("setPlayers")
    },
    computed: {
        ...mapGetters([
            "allPlayers",
            "defPlayers",
            "midPlayers",
            "fwdPlayers",
            "playerToShow"
        ])
    },
    methods: {
        setPlayerToShow (player) {
            window.eventBus.$emit("updateChart")
            document.getElementById("mySidenav").style.width = "300px"
            document.getElementById("mySidenav").style.padding = "30px"
            document.getElementById("mySidenav").classList.add("opacity")
            setTimeout(() => {
                document.getElementsByClassName("player-stats")[0].style.display = "block"
            }, 300)
        },
        closeSidenav () {
            document.getElementById("mySidenav").style.padding = "0px";
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("mySidenav").classList.remove("opacity")
            document.getElementsByClassName("player-stats")[0].style.display = "none"
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