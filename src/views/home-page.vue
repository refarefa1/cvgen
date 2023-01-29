<template>

    <section class="home-page">
        <home-header />
        <home-hero />
        <resume-list :user="user" />
    </section>

</template>

<script lang="ts">
import homeHeader from '../components/home-page/home-header.vue'
import homeHero from '../components/home-page/home-hero.vue'
import resumeList from '../components/home-page/resume-list.vue'

export default {

    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    components: {
        homeHeader,
        homeHero,
        resumeList
    }
}

</script>