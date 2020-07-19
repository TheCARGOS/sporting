<template>
    <div class="container flex-column">
        <div class="main-login" v-if="!loggedIn">
            <div class="player-item">
                <div class="flex-column">
                    <div class="player-item__header">
                        <img class="player-item__img"  src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png" alt="">
                        <span class="player-item__span" >??</span>
                    </div>
                    <div class="player-item__body">
                        <span class="player-item__name">JUGADOR</span>
                    </div>
                </div>
            </div>

            <form @submit.prevent="login" class="container">
                <fieldset>
                    <label for="username">USUARIO</label>
                    <input id="username" v-model="username" type="text">
                </fieldset>

                <fieldset>
                    <label for="password">CONTRASEÑA</label>
                    <input id="password" v-model="password" type="password">
                </fieldset>
                <button type="submit">INGRESAR</button>
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
            username: "",
            password: ""
        }
    },
    created () {
        
    },
    computed: {
        loggedIn () { return this.$store.getters.loggedIn }
    },
    methods: {
        async login () {
            try {
                const data = {username: username.value.toLowerCase(), password: password.value.toLowerCase()}
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
        async goToDashboard () {
            await this.$store.dispatch("getUserInfo", this.$store.state.auth.token)
            this.$router.push("/dashboard")
        }
    }
}
</script>

<style lang="scss" scoped>
    .main-login {
        background-color: white;
        color: #727272;
        padding: 0 2em;
        min-height: 70vh;
    }

    .player-item {
        margin-top: 1.58em;
    }

    form {
        width: 100%;
        background-color: white;
    }

    label {
        font-size: 12px;
        font-family: "Segoe UI";
        font-weight: bolder;
        margin-bottom: 8px;
        line-height: 2;
    }

    fieldset {
        margin-bottom: 1em;
    }

    input {
        font-size: 12px;
        padding: 0 0.66em;
        width: 100%;
        line-height: 2;
        border: 1px solid #C5C5C5;
    }

    button {
        background: #46ABF8;
        color: white;
        font-family: "Segoe UI";
        border: none;
        display: block;
        width: 100%;
        margin-top: 30px;
        font-weight: bolder;
        line-height: 2;
    }


    .profile-section {
        margin-top: 30px;
    }
</style>