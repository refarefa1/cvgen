<template>
    <section class="remove-modal">
        <div class="modal-header">
            <h1>Remove Entry</h1>
            <p>Are you sure you want to remove this entry?</p>
        </div>
        <div class="actions">
            <button @click="cancel" class="cancel-btn">Cancel</button>
            <button @click="remove" class="remove-btn">Remove</button>
        </div>
        <span @click="cancel" class="close-modal-btn" v-svg-icon="'close'"></span>
    </section>
</template>
<script lang="ts">
export default {
    name: 'remove-modal',
    emits: ['cancel', 'remove'],
    methods: {
        cancel() {
            this.$emit('cancel')
        },
        remove() {
            this.$emit('remove')
        }
    }
}
</script>