<template>
    <section class="resume-main-title" :class="{ 'editing': isEditing }">
        <h1 ref="title" @keydown.enter="enter" @focus="handleFocus" @blur="edit" class="title-content"
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
            lastVal: ''
        }
    },
    methods: {
        edit(ev: any) {
            ev.preventDefault()
            this.isEditing = false
            let val = ev.target.textContent
            if (!val) {
                val = this.lastVal;
                (this.$refs.title as HTMLElement).innerText = this.lastVal
            }
            const payload = { type: 'title', val }
            this.$emit('update', payload)
            this.$emit('save')
            this.lastVal = ''
        },
        enter(ev: Event) {
            ev.preventDefault();
            (this.$refs.title as HTMLElement).blur()
        },
        handleFocus(ev: any) {
            this.isEditing = true
            this.lastVal = ev.target.textContent
        }
    }
}
</script>