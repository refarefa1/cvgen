<template>
    <footer class="resume-footer">
        <div @click="save" class="save">
            <span><v-icon name="bi-check-lg"></v-icon></span>
            <div class="seperator" />
            <button class="save-btn">Save</button>
        </div>
        <div @click="cancel" class="cancel">
            <button>Cancel</button>
        </div>
    </footer>
</template>
<script lang="ts">
export default {
    name: 'resume-footer',
    emits: ['save', 'cancel'],
    methods: {
        save() {
            this.$emit('save')
        },
        cancel() {
            this.$emit('cancel')
        }
    }
}
</script>