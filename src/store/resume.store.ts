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
        async query(resumeId: string | null) {
            try {
                if (!resumeId) {
                    this.$state.resume = resumeService.getEmptyResume()
                    await this.save()
                    return this.$state.resume._id
                }
                else {
                    const resume = (this.$state.userStore.loggedinUser.resumes as Resume[]).find(r => r._id === resumeId)
                    if (resume) this.$state.resume = JSON.parse(JSON.stringify(resume))
                }
            } catch (err) {
                console.log(err)
            }
        },
        async save() {
            try {
                const deepCloneResume: Resume = JSON.parse(JSON.stringify(this.$state.resume))
                this.$state.resume = deepCloneResume
                const resume = await resumeService.save(deepCloneResume)
                this.$state.resume = resume
                this.$state.userStore.query()
            } catch (err: any) {
                console.log(err)
            }
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
            }
        },
        remove(payload: Payload) {
            const { type, val } = payload
            const resume = { ...this.$state.resume }
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