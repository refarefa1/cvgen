<template>
    <header class="resume-header">
        <div class="logo">
            <router-link to="/">
                <h1>FlowCV</h1>
            </router-link>
        </div>
        <div @click="goTo('/resume/content/')" class="content" :class="{'active':$route.path.includes('content')}">
            <span><v-icon name="bi-file-text"></v-icon></span>
            <p>Content</p>
        </div>
        <div @click="goTo('/resume/customize/')" class="customize"
            :class="{ 'active': $route.path.includes('customize') }">
            <span><v-icon name="fa-regular-edit"></v-icon></span>
            <p>Customize</p>
        </div>
        <div @click="downloadResume" class="download">
            <span><v-icon name="bi-download"></v-icon></span>
            <p>Download</p>
        </div>
    </header>
</template>
<script lang="ts">
export default {
    name: 'resume-header',
    methods: {
        downloadResume() {
            this.$emit('download')
        },
        goTo(newPath: string) {
            const id: string | string[] | undefined = this.$route.params.id
            const oldPath = (id) ? this.$route.path.split(`${id}`)[0] : this.$route.path
            this.$router.push(`${newPath + id}`)
        }
    }
}
</script>