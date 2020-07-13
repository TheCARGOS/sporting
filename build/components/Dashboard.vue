<template>
    <div class="flex-column">
        <div v-if="loggedIn">
            <!-- <player-item :player="user" sidenav="true"></player-item> -->
            <div class="flex-column">
                <div class="player-item flex-container">
                    <div class="player-item__header">
                        <img class="player-item__img" style="height: 116px;" :class="user.position" :src="'/assets/photos/'+user.urlImage" alt="">
                        <span class="player-item__span2" style="font-size: 18px;" :class="user.position">{{user.position}}</span>
                    </div>
                    <div class="flex-column">
                        <span class="player-item__name" style="font-size: 20px;">{{user.name}}</span>
                        <button @click="destroyToken()">
                            <i class="fa fa-sign-out red-color" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div class="flex-column">
                <span class="subtitle">Tus valoraciones <i class="fa fa-bolt" style="color: #FFDA22;"></i>...</span>
                <div v-for="(rate, index) in ratesFromUser" :key="index" class="player-item player-item--rate flex-container">
                    <div class="player-item__header">
                        <!-- players.find(player => player._id == rate.toPlayer) -->
                        <img class="player-item__img" :class="players.find(player => player._id == rate.toPlayer).position" :src="'/assets/photos/'+players.find(player => player._id == rate.toPlayer).urlImage" alt="">
                        <span class="player-item__span" :class="getColorFromNumber(averageSkill(players.find(player => player._id == rate.toPlayer)).toFixed(0))">{{averageSkill(players.find(player => player._id == rate.toPlayer)).toFixed(0)}}</span>
                        <span class="player-item__span2" :class="players.find(player => player._id == rate.toPlayer).position">{{players.find(player => player._id == rate.toPlayer).position}}</span>
                    </div>
                    <div class="player-item__body flex-column">
                        <span class="player-item__name">{{players.find(player => player._id == rate.toPlayer).name}}</span>
                        <div class="flex-container">
                            <span class="player-item__overall">overall:</span>
                            <span class="player-item__average" v-if="players.find(player => player._id == rate.toPlayer).position == 'FWD'" :class="getColorFromNumber(averageSkillFromSkills(rate.skills.powerShot, rate.skills.accuracy))">{{averageSkillFromSkills(rate.skills.powerShot, rate.skills.accuracy).toFixed(0)}}</span>
                            <span class="player-item__average" v-if="players.find(player => player._id == rate.toPlayer).position == 'MID'" :class="getColorFromNumber(averageSkillFromSkills(rate.skills.intercepter, rate.skills.assist))">{{averageSkillFromSkills(rate.skills.intercepter, rate.skills.assist).toFixed(0)}}</span>
                            <span class="player-item__average" v-if="players.find(player => player._id == rate.toPlayer).position == 'DEF'" :class="getColorFromNumber(averageSkillFromSkills(rate.skills.fortitude, rate.skills.mark))">{{averageSkillFromSkills(rate.skills.fortitude, rate.skills.mark).toFixed(0)}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-column">
                <span class="subtitle" style="line-height: 3; text-align: center;">Personas que te valoran <i class="fa fa-heart red-color"></i></span>
                <span>caracteristica no implementada de momento</span>
            </div>
        </div>


        <div v-else>
            {{goToLogin()}}
        </div>
    </div>
</template>

<script>
import PlayerItem from "./PlayerItem.vue"

export default {
    name: "dashboard",
    components: {PlayerItem},
    computed: {
        players () { return this.$store.state.players.players },
        user () { return this.$store.state.auth.user },
        loggedIn () { return this.$store.getters.loggedIn },
        ratesFromUser () { return this.$store.state.players.ratesFromUser },
        color () {
            if ( this.averageSkill < 75 ) {
                return "grey-color"
            } else if ( this.averageSkill < 80 ) {
                return "green-color"
            } else if ( this.averageSkill < 85 ) {
                return "semiorange-color"
            } else if ( this.averageSkill < 90 ) {
                return "orange-color"
            } else if ( this.averageSkill < 95 ) {
                return "red-color"
            } else {
                return "red-color"
            }
        }
    },
    created () {
        this.$store.dispatch("setPlayers")
        this.$store.dispatch("getUserInfo", this.$store.state.auth.token)
        this.$store.dispatch("setRates")
    },
    methods: {
        destroyToken () {
            this.$store.dispatch("destroyToken")
        },
        goToLogin () {
            this.$router.push("/login")
        },
        getPlayerFromId (id) {
            const player = this.players.find(player => player._id == id)
            return {
                name: player.name,
                position: player.position,
                urlImage: player.urlImage
            }
        },
        averageSkill (player) {
            if ( player.position == "FWD" ) {
                return parseFloat(((parseFloat(player.skills.powerShot) + parseFloat(player.skills.accuracy)) / 2)) * 10
            }

            if ( player.position == "MID" ) {
                return parseFloat(((parseFloat(player.skills.assist) + parseFloat(player.skills.intercepter)) / 2)) * 10
            }

            if ( player.position == "DEF" || player.position == "GK") {
                return parseFloat(((parseFloat(player.skills.fortitude) + parseFloat(player.skills.mark)) / 2)) * 10
            }
        },
        averageSkillFromSkills (skill1, skill2) {
            return parseFloat(((parseFloat(skill1) + parseFloat(skill2)) / 2)) * 10
        },
        getColorFromNumber (color) {
            if ( color < 75 ) {
                return "grey-color"
            } else if ( color < 80 ) {
                return "green-color"
            } else if ( color < 85 ) {
                return "semiorange-color"
            } else if ( color < 90 ) {
                return "orange-color"
            } else if ( color < 95 ) {
                return "red-color"
            } else {
                return "red-color"
            }
        }
    }
}
</script>

<style lang="scss" scoped>
button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 1.9em;
}

.flex-column {
    margin-left: 1em;
}
</style>