<template>
    <resume-header @download="download" />
    <resume-footer />
</template>

<script lang="ts">
import resumeHeader from '../../components/resume/resume-header.vue'
import resumeFooter from '../../components/resume/resume-footer.vue'
import { useResumeStore } from '../../store/resume.store'

export default {
    name: 'resume-customize',

    data() {
        return {
            resumeStore: useResumeStore()
        }
    },

    methods: {
        download() {
            const elResume: HTMLElement | null = document.querySelector('.a4-resume');
            if (elResume) this.resumeStore.download(elResume)
        },
    },

    components: {
        resumeHeader,
        resumeFooter
    }

}
</script>