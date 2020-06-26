<template>
    <div class="players-list__item" @click="setPlayerToShow()">
        <div class="flex-column">
            <div class="players-list__item__header">
                <img class="players-list__item__img" :class="player.position" src="https://i.pinimg.com/originals/6c/f7/1e/6cf71ea97c72da175277c42a72d6ae85.jpg" alt="">
                <span class="players-list__item__span" :class="color">{{averageSkill}}</span>
                <span v-if="sidenav" class="players-list__item__span2" :class="player.position">{{player.position}}</span>
            </div>
            <div class="players-list__item__body">
                <div v-if="sidenav" class="players-list__item__socials flex-container">
                    <ul>
                        <i class="fa fa-facebook" aria-hidden="true"></i>
                        <i class="fa fa-instagram" aria-hidden="true"></i>
                    </ul>
                </div>
                <span v-if="!sidenav" class="players-list__item__name">{{shortName}}</span>
                <span v-if="sidenav" class="players-list__item__name">{{player.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "player-item",
    props: ["player", "sidenav"],
    computed: {
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
        },
        averageSkill () {
            if ( this.player.position == "FWD" ) {
                return parseInt(((parseInt(this.player.skills.powerShot) + parseInt(this.player.skills.accuracy)) / 2))
            }

            if ( this.player.position == "MID" ) {
                return parseInt(((parseInt(this.player.skills.assist) + parseInt(this.player.skills.intercepter)) / 2))
            }

            if ( this.player.position == "DEF" || this.player.position == "GK") {
                return parseInt(((parseInt(this.player.skills.fortitude) + parseInt(this.player.skills.mark)) / 2))
            }
        },
        shortName () {
            return this.player.name.split(" ")[0]
        }
    },
    methods: {
        setPlayerToShow() {
            if ( !this.sidenav ) {
                window.eventBus.$emit("setPlayerToShow", this.player)
            }
        }
    }
}
</script>