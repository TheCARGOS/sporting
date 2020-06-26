<template>
    <div class="players-list__list">
        <div class="container">
            <div class="flex-column">
                <div class="flex-container">
                    <player-item v-for="(player, index) in filteredPlayers" v-if="index <= 2" :player="player" :key="index"></player-item>
                </div>
                <div class="flex-container">
                    <player-item v-for="(player, index) in filteredPlayers" v-if="(index > 2) && (index <= 4)" :player="player" :key="index"></player-item>
                </div>
                <div class="flex-container">
                    <player-item v-for="(player, index) in filteredPlayers" v-if="(index > 4) && (index <= 7)" :player="player" :key="index"></player-item>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PlayerItem from "./PlayerItem.vue"

export default {
    name: "player-filtered",
    props: ["filteredPlayers"],
    components: {PlayerItem}
}
</script>