<template>
    <div class="container flex-column">
        <div class="flex-container" v-if="!loggedIn">
            <div class="player-item">
                <div class="flex-column">
                    <div class="player-item__body">
                        <span class="player-item__name">JUGADOR</span>
                    </div>
                    <div class="player-item__header">
                        <img class="player-item__img"  src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png" alt="">
                        <span class="player-item__span" >??</span>
                    </div>
                </div>
            </div>

            <form @submit.prevent="login">
                <fieldset>
                    <input id="username" v-model="username" type="text" placeholder="username">
                </fieldset>

                <fieldset>
                    <input id="password" v-model="password" type="password" placeholder="password">
                </fieldset>
                <button type="submit" class="player-stats__form__button">INGRESAR</button>
            </form>
        </div>

        <div class="profile-section" v-if="loggedIn">
            {{goToDashboard()}}
        </div>
    </div>
</template>

<script>
import PlayerItem from "../PlayerItem.vue"

export default {
    name: "login",
    components: {PlayerItem},
    data () {
        return {
            userLogged: {},
            username: "",
            password: ""
        }
    },
    computed: {
        loggedIn () { return this.$store.getters.loggedIn }
    },
    methods: {
        async login () {
            try {
                const data = {username: username.value, password: password.value}
                const response = await this.$store.dispatch("retrieveToken", data)
                if ( !response ) {
                    alert("username or password are incorrect")
                } else {
                    this.$store.dispatch("getUserInfo", this.$store.state.auth.token)
                }
            } catch (e) {
                console.error(e)
            }
        },
        goToDashboard () {
            this.$router.push("/dashboard")
        }
    }
}
</script>

<style lang="scss" scoped>
    form {
        width: 90%;
    }

    input {
        border: none;
        font-size: 1.5em;
        padding: 0 1em;
        width: 100%;
        border-radius: 10px;
        line-height: 1.3;
        background-color: white;
    }

    fieldset {
        margin: 1.75em 0;
    }

    .profile-section {
        margin-top: 30px;
    }
</style>