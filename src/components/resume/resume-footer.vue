<template>
    <footer class="resume-footer">
        <div class="save">
            <span><v-icon name="bi-check-lg"></v-icon></span>
            <div class="seperator" />
            <button class="save-btn">Save</button>
        </div>
        <div class="cancel">
            <button>Cancel</button>
        </div>
    </footer>
</template>
<script lang="ts">
export default {
    name: 'resume-footer',
    methods: {
        downloadResume() {
            this.$emit('download')
        }
    }
}
</script>