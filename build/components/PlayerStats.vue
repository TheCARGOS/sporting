<template>
    <div class="player-stats">
        <button v-if="loggedIn" @click.prevent="toggleEdit()" class="player-stats__form__btn">VOTAR</button>
        <button @click.prevent="toggleView()" class="player-stats__form__btn">{{viewMessage}}</button>
            <div class="flex-container">
        <legend class="player-stats__title">HABILIDADES</legend>
            </div>
        <form v-if="editing || !graphView" class="player-stats__form animate__animated animate__fadeIn">
            <span v-if="editing">EDITANDO....</span>
            <fieldset class="player-stats__form__fieldset">
                <label>POTENCIA DE TIRO</label>
                <player-skill-input :loggedIn="loggedIn" :edit="editing" index="0" skillName="powerShot"></player-skill-input>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>DEFINICION AL ARCO</label>
                <player-skill-input :loggedIn="loggedIn" :edit="editing" index="1" skillName="accuracy"></player-skill-input>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>PRECISION DE PASE</label>
                <player-skill-input :loggedIn="loggedIn" :edit="editing" index="2" skillName="assist"></player-skill-input>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>INTERCEPTOR DE BALONES</label>
                <player-skill-input :loggedIn="loggedIn" :edit="editing" index="3" skillName="intercepter"></player-skill-input>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>FORTALEZA</label>
                <player-skill-input :loggedIn="loggedIn" :edit="editing" index="4" skillName="fortitude"></player-skill-input>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>MARCA</label>
                <player-skill-input :loggedIn="loggedIn" :edit="editing" index="5" skillName="mark"></player-skill-input>
            </fieldset>
            <button v-if="editing" @click="toggleEdit()" class="player-stats__form__button" @click.prevent="ratePlayer()" >SAVE CHANGES</button>
        </form>
        <chart-item class="animate__animated animate__fadeIn" v-if="viewGraph && !editing"></chart-item>
    </div>
</template>

<script>
import PlayerSkillInput from "./PlayerSkillInput.vue"
import ChartItem from "./ChartItem.vue"

export default {
    name: "player-stats",
    components: { PlayerSkillInput, ChartItem },
    data() {
        return {
            edit: false,
            viewGraph: true,
            message: "BARRAS"
        }
    },
    computed: {
        player () {
            return this.$store.state.players.playerToShow
        },
        rate () {
            return this.$store.state.players.rate
        },
        loggedIn () {
            return this.$store.getters.loggedIn
        },
        editing () {
            return this.edit
        },
        graphView () {
            return this.viewGraph
        },
        viewMessage () {
            if (this.viewGraph) {
                return "BARRAS"
            } else {
                return "GRAFICO"
            }
        }
    },
    methods: {
        async ratePlayer () {
            this.$store.dispatch("ratePlayer", {
                id: this.player._id,
                skills: {
                    powerShot: parseFloat(this.rate.powerShot),
                    accuracy: parseFloat(this.rate.accuracy),
                    assist: parseFloat(this.rate.assist),
                    intercepter: parseFloat(this.rate.intercepter),
                    fortitude: parseFloat(this.rate.fortitude),
                    mark: parseFloat(this.rate.mark)
            }
            })
            window.eventBus.$emit("updateChart")
        },
        toggleEdit () {
            this.edit = !this.edit
        },
        toggleView () {
            this.viewGraph = !this.viewGraph
        }
    }
}
</script>

<style lang="scss" scoped>
    .player-stats__form__btn {
        margin-left: 10px;
        line-height: 1.5;
        border: 0;
        padding: 0 8px;
        background: skyblue;
        color: white;
        font-weight: bolder;
        border-radius: 10px;
        float: right;
    }
</style>