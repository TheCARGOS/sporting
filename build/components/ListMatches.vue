<template>
    <div>
        <div class="matches-list flex-column">
            <!-- <img src="/assets/face-mask.png" alt=""> -->
            <img class="animate__animated animate__bounceInDown" src="https://cdn11.bigcommerce.com/s-5ig7x53cx8/images/stencil/1280x1280/products/2805/5906/ME-4024-Sports-Ball-Soccer-2__49617.1539788684.png?c=2" alt="">
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