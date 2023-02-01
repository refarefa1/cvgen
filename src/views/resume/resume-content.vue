<template>
    <resume-header @download="download" />

    <component v-for="component in components" :key="component" :is="component" :resume="resume" @update="update"
        @open="open" @save="save" />

    <add-resume-section v-if="!isOpen" @add="add" :resume="resume" />

    <resume-footer v-if="isOpen" @save="save" @cancel="cancel" />

</template>

<script lang="ts">
import resumePersonal from '../../components/resume/resume-personal.vue'
import resumeEducation from '../../components/resume/resume-education.vue'
import resumeExperience from '../../components/resume/resume-experience.vue'
import resumeAbout from '../../components/resume/resume-about.vue'

import resumeHeader from '../../components/resume/resume-header.vue'
import resumeFooter from '../../components/resume/resume-footer.vue'
import addResumeSection from '../../components/resume/add-resume-section.vue'
import { useUserStore } from '../../store/user.store'
import { eventBus } from '../../services/event.bus.service'

export default {
    name: 'resume-content',

    mounted() {
        this.components = this.resume.components
    },

    data() {
        return {
            userStore: useUserStore(),
            components: ['personal-details'],
            isOpen: false,
        }
    },
    methods: {
        update(payload: { type: string, val: string }) {
            this.userStore.update(payload)
        },
        download() {
            const elResume: HTMLElement | null = document.querySelector('.a4-resume');
            if (elResume) this.userStore.download(elResume)
        },
        open(cmp: string) {
            this.components = [cmp]
            this.isOpen = !this.isOpen
        },
        save() {
            this.userStore.save()
            this.isOpen = !this.isOpen
            eventBus.emit('closeAccordion', null)
            this.components = this.resume.components
        },
        cancel() {
            this.userStore.cancel()
            this.isOpen = !this.isOpen
            eventBus.emit('closeAccordion', null)
            this.components = this.resume.components
        },
        add(cmp: string) {
            this.userStore.add(cmp)
        }

    },
    computed: {
        resume() { return this.userStore.resumeToEdit },
        user() { return this.userStore.loggedinUser }
    },

    components: {
        resumePersonal,
        resumeEducation,
        resumeExperience,
        resumeAbout,
        resumeHeader,
        resumeFooter,
        addResumeSection
    }
}
</script>