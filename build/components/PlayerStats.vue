<template>
    <div class="player-stats">
        <button @click.prevent="toggleEdit()" class="player-stats__form__btn">VOTAR</button>
        <form v-if="editing" class="player-stats__form">
            <div class="flex-container">
                <legend class="player-stats__title">HABILIDADES</legend>
            </div>
            <fieldset class="player-stats__form__fieldset">
                <label>POTENCIA DE TIRO</label>
                <player-skill-input :loggedIn="loggedIn" :edit="editing" index="0" skillName="powerShot"></player-skill-input>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>DEFINICION AL ARCO</label>
                <player-skill-input :loggedIn="loggedIn" :edit="editing" index="1" skillName="accuracy"></player-skill-input>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>ASISTENCIA PASE GOL</label>
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
        <chart-item></chart-item>
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
            edit: false
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
        }
    },
    methods: {
        async ratePlayer () {
            this.$store.dispatch("ratePlayer", {
                id: this.player._id,
                skills: {
                    powerShot: parseInt(this.rate.powerShot),
                    accuracy: parseInt(this.rate.accuracy),
                    assist: parseInt(this.rate.assist),
                    intercepter: parseInt(this.rate.intercepter),
                    fortitude: parseInt(this.rate.fortitude),
                    mark: parseInt(this.rate.mark)
            }
            })
            window.eventBus.$emit("updateChart")
        },
        toggleEdit () {
            this.edit = !this.edit
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