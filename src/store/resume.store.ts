import { defineStore } from "pinia"
import { Resume } from "../interfaces/resume-interface"
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
        query(id: string | string[]) {
            if (!id) this.$state.resume = resumeService.getEmptyResume()
            else {
                const resume = (this.$state.userStore.loggedinUser.resumes as Resume[]).find(r => r._id === id)
                if (resume) this.$state.resume = JSON.parse(JSON.stringify(resume))
            }
        },
        async save() {
            try {
                const deepCloneResume: Resume = JSON.parse(JSON.stringify(this.$state.resume))
                this.$state.resume = deepCloneResume
                await resumeService.save(deepCloneResume)
                this.$state.userStore.query()
            } catch (err: any) {
                console.log(err)
            }
        },
        update(payload: Payload) {
            const { type, val } = payload
            switch (type) {
                case 'personal':
                    this.$state.resume = { ...this.$state.resume, personal: { ...val } }
                    break
                case 'education': this.format(payload)
                    break
                case 'experience': this.format(payload)
                    break
                case 'profile':
                    this.$state.resume = { ...this.$state.resume, profile: { ...val } }
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