<template>
    <div>
        <div class="matches-list flex-column">
            <img src="/assets/face-mask.png" alt="">
            <h1>AUN NO SE HAN JUGADO PARTIDOS OFICIALES.</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: "list-matches"
}
</script>

<style scoped lang="scss">
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 200px;
        transform: translate(-50%, -50%);
    }

    h1 {
        position: absolute;
        top: 80%;
        left: 50%;
        width: 100%;
        height: 200px;
        transform: translate(-50%, -50%);
        text-align: center;

        color: black;
        font-weight: bolder;
        font-size: 23px;
    }
</style>