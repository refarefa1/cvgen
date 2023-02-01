import { defineStore } from "pinia"
import { Resume } from "../interfaces/resume-interface"
import User from "../interfaces/user.interface"
import { pdfService } from "../services/pdf.service"
import { userService } from "../services/user.service"
import { utilService } from "../services/util.service"

type Payload  = {
    type: string
    val: any
}

type State = {
    user: User
    resume: Resume
} 

export const useUserStore = defineStore('userStore', {

    state: () => <State>({
        user: userService.query(),
        resume: userService.getEmptyResume()
    }),

    getters: {
        loggedinUser: (state) => state.user,
        resumeToEdit: (state) => state.resume,
    },

    actions: {
        loadUser() {
            const user: User = userService.query()
            this.$state.user = user
        },
        setResume(id: string | string[]) {
            const resumes: Resume[] | undefined = this.$state.user.resumes
            const resume = (id && resumes) && JSON.parse(JSON.stringify(resumes.find(r => r._id === id)))
                || userService.getEmptyResume()
            this.$state.resume = resume
        },
        update(payload: Payload) {
            const { type, val } = payload
            switch (type) {
                case 'personal':
                    this.$state.resume = { ...this.$state.resume, personal: {...val} }
                    break
                case 'education': this.format(payload)
                    break
                case 'profile':
                    this.$state.resume = { ...this.$state.resume, profile: {...val} }
                    break
            }
        },
        download(file: HTMLElement) {
            pdfService.download(file)
        },
        save() {
            if (!this.$state.user.resumes) this.$state.user.resumes = []
            const deepCloneResume: Resume = JSON.parse(JSON.stringify(this.$state.resume))
            if (!deepCloneResume._id) {
                deepCloneResume._id = utilService.makeId()
                this.$state.user.resumes.push(deepCloneResume)
            } else {
                const idx: number = this.$state.user.resumes.findIndex(r => r._id === deepCloneResume._id)
                this.$state.user.resumes[idx] = deepCloneResume
            }
            this.$state.resume = deepCloneResume
            userService.save({ ...this.$state.user })
        },
        cancel() {
            const isResumeEmpty = (!this.$state.user.resumes || this.$state.user.resumes && !this.$state.resume._id)
            this.$state.resume = (isResumeEmpty)
                ? userService.getEmptyResume()
                : JSON.parse(JSON.stringify(this.$state.user.resumes!.find(r => r._id === this.$state.resume._id)))
        },
        format(payload: Payload): void {
            const { type, val } = payload
            if (!this.$state.resume[type]) this.$state.resume[type] = []
            const idx: number = (this.$state.resume[type] as any[]).findIndex(ed => ed._id === val._id)
            if (idx === -1) this.$state.resume[type].push(val)
            else this.$state.resume[type][idx] = { ...val }
        },
        add(cmp:string){
            this.$state.resume.components.push(cmp)
        }
    }

})