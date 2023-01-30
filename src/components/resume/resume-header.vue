<template>
    <header class="resume-header">
        <div class="logo">
            <router-link to="/">
                <h1>FlowCV</h1>
            </router-link>
        </div>
        <div class="content">
            <span><v-icon name="bi-file-text"></v-icon></span>
            <p>Content</p>
        </div>
        <div class="customize">
            <span><v-icon name="fa-regular-edit"></v-icon></span>
            <p>Customize</p>
        </div>
        <div class="download">
            <span><v-icon name="bi-download"></v-icon></span>
            <p>Download</p>
        </div>
    </header>
</template>
<script lang="ts">
export default {
    name: 'resume-header',
}
</script>