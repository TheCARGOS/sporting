<template>
    <div class="flex-container">
        <input class="player-stats__form__input" type="range" min="00" max="100" v-model="skill">
        <span>{{stat}}</span>
    </div>
</template>

<script>
export default {
    name: "player-skill-input",
    props: ["stat"],
    computed: {
        skill () {
            return this.stat
        }
    }
}
</script>