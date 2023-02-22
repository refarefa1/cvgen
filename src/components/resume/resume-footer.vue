<template>
    <footer class="resume-footer">
        <div @click="cancel" class="cancel">
            <button>Cancel</button>
        </div>
        <div @click="save" class="save">
            <span v-svg-icon="'checkmark'"></span>
            <button class="save-btn">Save</button>
        </div>
    </footer>
</template>
<script lang="ts">
import { eventBus } from '../../services/event.bus.service';

export default {
    name: 'resume-footer',
    emits: ['save', 'cancel'],
    methods: {
        save() {
            eventBus.emit('save', null)
        },
        cancel() {
            this.$emit('cancel')
        }
    }
}
</script>