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
import { User } from '../interfaces/user.interface'
import { useUserStore } from '../store/user.store'

export default {

    data() {
        return {
            userStore: useUserStore()
        }
    },

    computed: {
        user() { return this.userStore.loggedinUser || {} }
    },
    components: {
        homeHeader,
        homeHero,
        resumeList
    }
}

</script>