<template>
    <div class="player-stats">
        <form class="player-stats__form">
            <legend class="player-stats__title">HABILIDADES</legend>
            <fieldset class="player-stats__form__fieldset">
                <label>POTENCIA DE TIRO</label>
                <!-- <player-skill-input :stat="player.skills.powerShot"></player-skill-input> -->
                <div class="flex-container">
                    <input class="player-stats__form__input" type="range" value="70" min="00" max="100" v-model="player.skills.powerShot">
                    <span>{{player.skills.powerShot}}</span>
                </div>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>DEFINICION AL ARCO</label>
                <div class="flex-container">
                    <input class="player-stats__form__input" type="range" value="70" min="00" max="100" v-model="player.skills.accuracy">
                    <span>{{player.skills.accuracy}}</span>
                </div>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>ASISTENCIA PASE GOL</label>
                <div class="flex-container">
                    <input class="player-stats__form__input" type="range" value="70" min="00" max="100" v-model="player.skills.assist">
                    <span>{{player.skills.assist}}</span>
                </div>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>INTERCEPTOR DE BALONES</label>
                <div class="flex-container">
                    <input class="player-stats__form__input" type="range" value="70" min="00" max="100" v-model="player.skills.intercepter">
                    <span>{{player.skills.intercepter}}</span>
                </div>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>FORTALEZA</label>
                <div class="flex-container">
                    <input class="player-stats__form__input" type="range" value="70" min="00" max="100" v-model="player.skills.fortitude">
                    <span>{{player.skills.fortitude}}</span>
                </div>
            </fieldset>
            <fieldset class="player-stats__form__fieldset">
                <label>MARCA</label>
                <div class="flex-container">
                    <input type="range" value="70" min="00" max="100" v-model="player.skills.mark">
                    <span>{{player.skills.mark}}</span>
                </div>
            </fieldset>
            <!-- <button>GUARDAR</button> -->
            <button @click.prevent="ratePlayer()" >SAVE CHANGES</button>
            <span><small>you need to be logged in in order to vote.</small><a href="#!">logged in</a></span>
        </form>
    </div>
</template>

<script>
import PlayerSkillInput from "./PlayerSkillInput.vue"

export default {
    name: "player-stats",
    components: { PlayerSkillInput },
    props: ["player"],
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        }
    }
}
</script>