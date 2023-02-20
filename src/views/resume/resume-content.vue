<template>
    <resume-header @update="update" @save="save" @download="download" :resume="resume" />

    <section class="resume-forms" :class="{ 'open': isOpen }">
        <component v-for="component in components" :key="component" :is="component" :resume="resume" @update="update"
            @open="open" @save="save" @upload="upload" @remove="remove" />
    </section>

    <add-resume-section v-if="!isOpen" @add="add" :resume="resume" />

    <resume-footer v-if="isOpen" @save="save" @cancel="cancel" />
</template>

<script lang="ts">
import resumePersonal from '../../components/resume/resume-content/resume-personal.vue'
import resumeEducation from '../../components/resume/resume-content/resume-education.vue'
import resumeExperience from '../../components/resume/resume-content/resume-experience.vue'
import resumeProfile from '../../components/resume/resume-content/resume-profile.vue'
import resumeSkills from '../../components/resume/resume-content/resume-skills.vue'
import resumeLanguages from '../../components/resume/resume-content/resume-languages.vue'
import resumeMilitary from '../../components/resume/resume-content/resume-military.vue'


import resumeHeader from '../../components/resume/resume-header.vue'
import resumeFooter from '../../components/resume/resume-footer.vue'
import addResumeSection from '../../components/resume/add-resume-section.vue'

import { useUserStore } from '../../store/user.store'
import { useResumeStore } from '../../store/resume.store'
import { useFileStore } from '../../store/file.store'
import { eventBus } from '../../services/event.bus.service'


export default {
    name: 'resume-content',
    mounted() {
        this.components = ['resume-personal', ...this.resume.components]
    },
    data() {
        return {
            userStore: useUserStore(),
            resumeStore: useResumeStore(),
            fileStore: useFileStore(),
            components: [] as string[],
            isOpen: false,
        }
    },
    methods: {
        update(payload: { type: string, val: any }) {
            this.resumeStore.update(payload)
        },
        download() {
            const elResume: HTMLElement | null = document.querySelector('.a4-resume');
            if (elResume) this.fileStore.download(elResume)
        },
        open(cmp: string) {
            this.components = [cmp]
            this.isOpen = true
        },
        save() {
            this.resumeStore.save()
            this.isOpen = false
            eventBus.emit('closeAccordion', null)
            eventBus.showSuccessMsg()
            this.components = ['resume-personal', ...this.resume.components]
        },
        remove(payload: { type: string, val: any }) {
            this.resumeStore.remove(payload)
            this.resumeStore.save()
            eventBus.showDeleteMsg(this.getSect(payload.type))
            this.components = ['resume-personal', ...this.resume.components]
        },
        cancel() {
            this.resumeStore.cancel()
            this.isOpen = false
            eventBus.emit('closeAccordion', null)
            this.components = ['resume-personal', ...this.resume.components]
        },
        async upload(file: FileList) {
            const imgUrl = await this.fileStore.upload(file)
            const personal = this.resume.personal
            const payload = { type: 'personal', val: { ...personal, imgUrl } }
            this.update(payload)
            this.resumeStore.save()
            eventBus.emit('file-uploaded', null)
        },
        add(cmp: string) {
            this.components.push(cmp)
            this.resumeStore.add(cmp)
        },
        getSect(cmp: string): string {
            let str = ''
            switch (cmp) {
                case 'profile': str = 'Profile'
                    break
                case 'education': str = 'Education'
                    break
                case 'experience': str = 'Experience'
                    break
                case 'languages': str = 'Languages'
                    break
                case 'skills': str = 'Skills'
                    break
                case 'military': str = 'Military'
                    break
            }
            return str
        }
    },
    computed: {
        resume() { return this.resumeStore.resumeToEdit },
        user() { return this.userStore.loggedinUser }
    },
    components: {
        resumePersonal,
        resumeEducation,
        resumeExperience,
        resumeProfile,
        resumeSkills,
        resumeLanguages,
        resumeMilitary,
        resumeHeader,
        resumeFooter,
        addResumeSection,
    }
}
</script>