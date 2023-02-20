<template>
    <resume-header :resume="resume" @download="download" />
    <section class="resume-customize">
        <resume-layout @update="update" :resume="resume" />
        <resume-heading @update="update" :resume="resume" />
        <resume-c-skills @update="update" :resume="resume" />
        <resume-c-languages @update="update" :resume="resume" />
    </section>
</template>

<script lang="ts">
import resumeHeader from '../../components/resume/resume-header.vue'

import resumeLayout from '../../components/resume/resume-customize/resume-layout.vue'
import resumeHeading from '../../components/resume/resume-customize/resume-heading.vue'
import resumeCSkills from '../../components/resume/resume-customize/resume-c-skills.vue'
import resumeCLanguages from '../../components/resume/resume-customize/resume-c-languages.vue'

import { useFileStore } from '../../store/file.store'
import { useResumeStore } from '../../store/resume.store'

export default {
    name: 'resume-customize',

    data() {
        return {
            fileStore: useFileStore(),
            resumeStore: useResumeStore(),
        }
    },

    methods: {
        download() {
            const elResume: HTMLElement | null = document.querySelector('.a4-resume');
            if (elResume) this.fileStore.download(elResume)
        },
        update(payload: { type: string, val: any }) {
            this.resumeStore.update(payload)
            this.save()
        },
        save() {
            this.resumeStore.save()
        }
    },
    computed: {
        resume() { return this.resumeStore.resumeToEdit },
    },

    components: {
        resumeHeader,
        resumeLayout,
        resumeHeading,
        resumeCSkills,
        resumeCLanguages,
    }

}
</script>