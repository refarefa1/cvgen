<template>
    <resume-header @download="download" />
    <resume-form @updateResume="updateResume" />
</template>

<script lang="ts">
import resumeForm from '../../components/resume/resume-form.vue'
import resumeHeader from '../../components/resume/resume-header.vue'
import { useResumeStore } from '../../store/resume.store';

export default {
    name: 'resume-content',

    data() {
        return {
            resumeStore: useResumeStore()
        }
    },
    methods: {
        updateResume(payload: { type: string, val: string }) {
            this.resumeStore.updateResume(payload)
        },
        download() {
            const elResume: HTMLElement | null = document.querySelector('.a4-resume')
            if (elResume) this.resumeStore.download(elResume)
        },
    },

    components: {
        resumeForm,
        resumeHeader
    }
}
</script>