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
    user: User | null
    resume: Resume | null
}

export const useUserStore = defineStore('userStore', {

    state: () => <State>({
        user: null,
        resume: null
    }),

    getters: {
        loggedinUser: (state) => state.user,
        resumeToEdit: (state) => state.resume,
    },

    actions: {
        async loadUser() {
            const user: User = await userService.query()
            this.$state.user = user
        },
        async saveUser() {

        },
        setResume(id: string | string[]) {
            const resumes: Resume[] | undefined = this.$state.user?.resumes
            this.$state.resume = (id && resumes) && resumes.find(r => r._id === id) || userService.getEmptyResume()
        },
        updateResume(payload: Payload) {
            const { type, val } = payload
            this.$state.resume![type] = val
        },
        download(file: HTMLElement) {
            pdfService.download(file)
        }
    }

})