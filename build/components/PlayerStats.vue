<template>
    <div class="player-stats">
        <form class="player-stats__form">
            <legend class="player-stats__title">HABILIDADES</legend>
            <fieldset class="player-stats__form__fieldset">
                <label>POTENCIA DE TIRO</label>
                <player-skill-input :edit="loggedIn" index="0" skillName="powerShot"></player-skill-input>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>DEFINICION AL ARCO</label>
                <player-skill-input :edit="loggedIn" index="1" skillName="accuracy"></player-skill-input>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>ASISTENCIA PASE GOL</label>
                <player-skill-input :edit="loggedIn" index="2" skillName="assist"></player-skill-input>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>INTERCEPTOR DE BALONES</label>
                <player-skill-input :edit="loggedIn" index="3" skillName="intercepter"></player-skill-input>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>FORTALEZA</label>
                <player-skill-input :edit="loggedIn" index="4" skillName="fortitude"></player-skill-input>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>MARCA</label>
                <player-skill-input :edit="loggedIn" index="5" skillName="mark"></player-skill-input>
            </fieldset>
            <button v-if="loggedIn" class="player-stats__form__button" @click.prevent="ratePlayer()" >SAVE CHANGES</button>
        </form>
    </div>
</template>

<script>
import PlayerSkillInput from "./PlayerSkillInput.vue"

export default {
    name: "player-stats",
    components: { PlayerSkillInput },
    computed: {
        player () {
            return this.$store.state.players.playerToShow
        },
        loggedIn () {
            return this.$store.getters.loggedIn
        }
    },
    methods: {
        async ratePlayer () {
            const data = {
                id: this.player._id,
                skills: {
                    powerShot: parseInt(this.player.skills.powerShot),
                    accuracy: parseInt(this.player.skills.accuracy),
                    assist: parseInt(this.player.skills.assist),
                    intercepter: parseInt(this.player.skills.intercepter),
                    fortitude: parseInt(this.player.skills.fortitude),
                    mark: parseInt(this.player.skills.mark)
                }
            }

            const response = await fetch("http://localhost:8080/api/player", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + this.$store.state.auth.token
                },
                body: JSON.stringify(data)
            })
        }
    }
}
</script>