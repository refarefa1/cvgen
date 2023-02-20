import { defineStore } from "pinia"
import { Resume } from "../interfaces/resume-interface"
import { eventBus } from "../services/event.bus.service"
import { resumeService } from "../services/resume.service"
import { useUserStore } from "./user.store"

type Payload = {
    type: string
    val: any
}

type State = {
    resume: Resume
    userStore: any
}

export const useResumeStore = defineStore('resumeStore', {

    state: () => <State>({
        resume: resumeService.getEmptyResume(),
        userStore: useUserStore()
    }),

    getters: {
        resumeToEdit: (state) => state.resume
    },

    actions: {
        query(resumeId: string | string[] | null) {
            if (!resumeId) {
                this.$state.resume = resumeService.getEmptyResume()
                this.save()
                return this.$state.resume._id
            }
            else {
                const resume = (this.$state.userStore.loggedinUser.resumes as Resume[]).find(r => r._id === resumeId)
                if (resume) this.$state.resume = JSON.parse(JSON.stringify(resume))
            }
        },
        save() {
            const deepCloneResume: Resume = JSON.parse(JSON.stringify(this.$state.resume))
            this.$state.resume = deepCloneResume
            const resume = resumeService.save(deepCloneResume)
            this.$state.resume = resume
            this.$state.userStore.query()

        },
        update(payload: Payload) {
            const { type, val } = payload
            switch (type) {
                case 'title':
                    this.$state.resume = { ...this.$state.resume, name: val }
                    break
                case 'personal':
                    this.$state.resume = { ...this.$state.resume, personal: { ...val } }
                    break
                case 'profile':
                    this.$state.resume = { ...this.$state.resume, profile: { ...val } }
                    break
                case 'military':
                    this.$state.resume = { ...this.$state.resume, military: { ...val } }
                    break
                case 'education': this.format(payload)
                    break
                case 'experience': this.format(payload)
                    break
                case 'skills': this.format(payload)
                    break
                case 'languages': this.format(payload)
                    break
                case 'arrange':
                    this.$state.resume = { ...this.$state.resume, components: val }
                    setTimeout(() => eventBus.emit('customize', payload), 0)
                    break
                case 'heading':
                    this.$state.resume = { ...this.$state.resume, style: { ...this.$state.resume.style, heading: val } }
                    setTimeout(() => eventBus.emit('customize', payload), 0)
                    break
                case 'skill-style':
                    this.$state.resume = { ...this.$state.resume, style: { ...this.$state.resume.style, skills: val } }
                    break
                case 'language-style':
                    this.$state.resume = { ...this.$state.resume, style: { ...this.$state.resume.style, languages: val } }
                    break
            }
        },
        remove(payload: Payload) {
            const { type, val } = payload
            const resume = { ...this.$state.resume }
            if (val) {
                if (type === 'resume') this.removeResume(val)
                else this.removeDeep(payload)
                return
            }
            switch (type) {
                case 'profile':
                    delete this.$state.resume.profile
                    this.$state.resume.components = resume.components.filter((cmp: string) => cmp !== 'resume-profile')
                    break
                case 'military':
                    delete this.$state.resume.military
                    this.$state.resume.components = resume.components.filter((cmp: string) => cmp !== 'resume-military')
                    break
                case 'education':
                    delete this.$state.resume.education
                    this.$state.resume.components = resume.components.filter((cmp: string) => cmp !== 'resume-education')
                    break
                case 'experience':
                    delete this.$state.resume.experience
                    this.$state.resume.components = resume.components.filter((cmp: string) => cmp !== 'resume-experience')
                    break
                case 'skills':
                    delete this.$state.resume.skills
                    this.$state.resume.components = resume.components.filter((cmp: string) => cmp !== 'resume-skills')
                    break
                case 'languages':
                    delete this.$state.resume.languages
                    this.$state.resume.components = resume.components.filter((cmp: string) => cmp !== 'resume-languages')
                    break
            }
        },
        removeDeep(payload: Payload) {
            const { type, val } = payload
            const resume = { ...this.$state.resume }
            switch (type) {
                case 'education':
                    this.$state.resume.education = resume.education?.filter(ed => ed._id !== val)
                    break
                case 'experience':
                    this.$state.resume.experience = resume.experience?.filter(exp => exp._id !== val)
                    break
                case 'skills':
                    this.$state.resume.skills = resume.skills?.filter(skill => skill._id !== val)
                    break
                case 'languages':
                    this.$state.resume.languages = resume.languages?.filter(lang => lang._id !== val)
                    break
            }
        },
        removeResume(id: string) {
            resumeService.remove(id)
            this.userStore.query()
        },
        format(payload: Payload): void {
            const { type, val } = payload
            if (!this.$state.resume[type]) this.$state.resume[type] = []
            const idx: number = (this.$state.resume[type] as any[]).findIndex(ed => ed._id === val._id)
            if (idx === -1) this.$state.resume[type].push(val)
            else this.$state.resume[type][idx] = { ...val }
        },
        cancel() {
            const user = this.userStore.loggedinUser
            const isResumeEmpty = (!user.resumes || user.resumes && !this.$state.resume._id)
            this.$state.resume = (isResumeEmpty)
                ? resumeService.getEmptyResume()
                : JSON.parse(JSON.stringify((user.resumes as Resume[]).find(r => r._id === this.$state.resume._id)))
        },
        add(cmp: string) {
            this.$state.resume.components.push(cmp)
        },
    }

})