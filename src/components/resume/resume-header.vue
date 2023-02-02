<template>
    <header class="resume-header">
        <div class="logo">
            <router-link to="/">
                <h1>CVGen</h1>
            </router-link>
        </div>
        <div class="content">
            <router-link :to="'/resume/content/' + $route.params.id">
                <span><v-icon name="bi-file-text"></v-icon></span>
                <p>Content</p>
            </router-link>
        </div>
        <div class="customize">
            <router-link :to="'/resume/customize/' + $route.params.id">
                <span><v-icon name="fa-regular-edit"></v-icon></span>
                <p>Customize</p>
            </router-link>

        </div>
        
    </header>
</template>

<script lang="ts">
export default {
    name: 'resume-header',
    methods: {
        goTo(newPath: string) {
            const id: string | string[] | undefined = this.$route.params.id
            this.$router.push(`${newPath + id}`)
        }
    }
}
</script>