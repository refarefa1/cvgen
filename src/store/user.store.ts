import { defineStore } from "pinia"
import { Resume } from "../interfaces/resume-interface"
import User from "../interfaces/user.interface"
import { pdfService } from "../services/pdf.service"
import { userService } from "../services/user.service"

interface Payload {
    type: string
    val: string
}

interface State {
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
        async loadUser() {
            const user: User = userService.query()
            this.$state.user = user
        },
        setResume(id: string | string[]) {
            const resumes: Resume[] | undefined = this.$state.user.resumes
            const resume = (id && resumes) && resumes.find(r => r._id === id) || userService.getEmptyResume()
            this.$state.resume = { ...resume }
        },
        updateResume(payload: Payload) {
            const { type, val } = payload
            this.$state.resume[type] = val
        },
        download(file: HTMLElement) {
            pdfService.download(file)
        },
        save() {
            const resumes = this.$state.user.resumes
            const idx: number = resumes?.findIndex(r => r._id === this.$state.resume._id) || 0
            if (resumes) resumes[idx] = { ...this.$state.resume }
            const user: User = { ...this.$state.user, resumes }
            userService.save(user)
        },
        cancel() {
            const resume: Resume = this.$state.user.resumes?.find(r => r._id === this.$state.resume._id)
            this.$state.resume = resume
        }
    }

})