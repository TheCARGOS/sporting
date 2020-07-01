<template>
    <div class="flex-column">
        <div v-if="loggedIn">
            <!-- <player-item :player="user" sidenav="true"></player-item> -->
            <div class="flex-column">
                <div class="player-item flex-container">
                    <div class="player-item__header">
                        <img class="player-item__img" style="height: 116px;" :class="user.position" src="https://i.pinimg.com/originals/6c/f7/1e/6cf71ea97c72da175277c42a72d6ae85.jpg" alt="">
                        <span class="player-item__span" style="font-size: 25px;" :class="color">{{averageSkill}}</span>
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

            <div class="flex-container">
                TUS VALORIACIONES...
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
        user () { return this.$store.state.auth.user },
        loggedIn () { return this.$store.getters.loggedIn },
        averageSkill () {
            if ( this.user.position == "FWD" ) {
                return parseInt(((parseInt(this.user.skills.powerShot) + parseInt(this.user.skills.accuracy)) / 2))
            }

            if ( this.user.position == "MID" ) {
                return parseInt(((parseInt(this.user.skills.assist) + parseInt(this.user.skills.intercepter)) / 2))
            }

            if ( this.user.position == "DEF" || this.user.position == "GK") {
                return parseInt(((parseInt(this.user.skills.fortitude) + parseInt(this.user.skills.mark)) / 2))
            }
        },
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
        this.setUser()
    },
    methods: {
        setUser () {
            this.$store.dispatch("getUserInfo", this.$store.state.auth.token)
        },
        destroyToken () {
            this.$store.dispatch("destroyToken")
        },
        goToLogin () {
            this.$router.push("/login")
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