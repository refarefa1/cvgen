<template>
    <section class="resume-title" :class="{ 'editing': isEditing }">
        <h1 ref="title" @keydown.enter="enter" @focus="isEditing = true" @blur="edit" class="title-content"
            contenteditable="true">
            {{ resume?.name }}</h1>
        <hr class="line" />
    </section>
</template>
<script lang="ts">
import { PropType } from 'vue';
import { Resume } from '../../interfaces/resume-interface';

export default {
    name: 'resume-title',
    emits: ['update', 'save'],
    props: {
        resume: Object as PropType<Resume>,
    },
    data() {
        return {
            isEditing: false,
        }
    },
    methods: {
        edit(ev: any) {
            ev.preventDefault()
            this.isEditing = false

            // Need to sanitize this!!
            
            const val = ev.target.textContent
            const payload = { type: 'title', val }
            this.$emit('update', payload)
            this.$emit('save')
        },
        enter(ev: Event) {
            ev.preventDefault();
            (this.$refs.title as HTMLElement).blur()
        }
    }
}
</script>