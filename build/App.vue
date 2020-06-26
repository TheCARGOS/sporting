<template>
    <main class="main-app">
        <!-- <main-menu></main-menu> -->
        <router-view></router-view>

        <Footer></Footer>
    </main>
</template>

<script>
// import MainMenu from "./layouts/MainMenu.vue"
import Footer from "./components/Footer.vue"

export default {
    name: "App",
    components: { Footer }
}
</script>