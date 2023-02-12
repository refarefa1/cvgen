<template>
    <header class="resume-header">
        <nav class="header-nav">
            <div class="home">
                <router-link to="/">
                    <span v-svg-icon="'home'"></span>
                </router-link>
            </div>
            <div class="content">
                <router-link :to="'/resume/' + $route.params.id + '/content/'">
                    <p>Content</p>
                </router-link>
            </div>
            <div class="customize">
                <router-link :to="'/resume/' + $route.params.id + '/customize/'">
                    <p>Customize</p>
                </router-link>
            </div>
        </nav>
        <div @click="download" class="download">
            <button class="download-btn">
                <span v-svg-icon="'download'"></span>
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