<template>
    <div class="flex-container">
        <button v-if="edit" @click.prevent="updateRate(-0.5)"><</button>
        <div class="input">
            <div :class="color[1]" class="bar" :style="{'width': skill * 10 + '%'}"></div>
            <input style="display: none;" :class="color[1]" class="player-stats__form__input" type="range" min="0" max="10" :value="skill">
        </div>
        <button v-if="edit" @click.prevent="updateRate(0.5)">></button>
        <span>{{skill.toFixed(1)}}</span>
    </div>
</template>

<script>
export default {
    name: "player-skill-input",
    props: ["skillName", "index", "edit"],
    methods: {
        updateRate: function (number) {
            this.$store.commit("updateRate", {
                skillName: this.skillName,
                ammount: number
            })
            document.getElementsByClassName("bar")[this.index].style.width = this.skill + "%"
        }
    },
    computed: {
        skill () {
            return this.$store.state.players.rate[this.skillName]
        },
        color () {
            if ( this.skill < 7 ) {
                return ["black-color", "grey-bg"]
            } else if ( this.skill < 8 ) {
                return ["green-color", "green-bg"]
            } else if ( this.skill < 8.5 ) {
                return ["semiorange-color", "semiorange-bg"]
            } else if ( this.skill < 9 ) {
                return ["orange-color", "orange-bg"]
            } else if ( this.averageSkill < 9.5 ) {
                return ["red-color", "red-bg"]
            } else {
                return ["red-color", "red-bg"]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .input {
        width: 100%;
        height: 0.58em;
        position: relative;
        background: grey;
    }

    .bar {
        height: 100%;
        width: 0%;
        position: absolute;
        left: 0;
        top: 0;
    }

    button {
        font-size: 0.7em;
        border: none;
    }
</style>