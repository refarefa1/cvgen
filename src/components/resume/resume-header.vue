<template>
    <header class="resume-header">
        <nav class="header-nav">
            <div class="content">
                <router-link :to="'/resume/content/' + $route.params.id">
                    <p>Content</p>
                </router-link>
            </div>
            <div class="customize">
                <router-link :to="'/resume/customize/' + $route.params.id">
                    <p>Customize</p>
                </router-link>
            </div>
        </nav>
        <div @click="download" class="download">
            <button class="download-btn">
                <span><v-icon name="md-filedownload"></v-icon></span>
                <p>Download</p>
            </button>
        </div>
    </header>
</template>

<script lang="ts">
export default {
    name: 'resume-header',
    emits: ['download'],
    methods: {
        goTo(newPath: string) {
            const id: string | string[] | undefined = this.$route.params.id
            this.$router.push(`${newPath + id}`)
        },
        download() {
            this.$emit('download')
        }
    }
}
</script>