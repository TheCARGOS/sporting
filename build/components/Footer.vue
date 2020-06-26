<template>
    <footer class="main-footer flex-container">
        <ul class="flex-container">
            <li><router-link to="/players" tag="img" src="./assets/icons/users.jpg"></router-link></li>
            <li><router-link to="/matches" tag="img" src="./assets/icons/matches.jpg"></router-link></li>
            <li><router-link to="/login" tag="img" src="./assets/icons/key.jpg"></router-link></li>
        </ul>
    </footer>
</template>


<script>
export default {
    name: "main-footer",
}
</script>

<style lang="scss" scoped>
    .router-link-active {
        transform: scale(1.3);
        transition: .3s all ease;
    }
</style>