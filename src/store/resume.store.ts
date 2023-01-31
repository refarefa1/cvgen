import { defineStore } from "pinia"
import { Resume } from "../interfaces/resume-interface"
import { resumeService } from "../services/resume.service"
import { useUserStore } from "./user.store"
import { pdfService } from '../services/pdf.service';

interface Payload {
    type: string
    val: string
}

interface State {
    userStore: any
    resume: Resume | null
}

export const useResumeStore = defineStore('resumeStore', {

    state: () => <State>({
        userStore: useUserStore(),
        resume: null
    }),

    getters: {
        resumeToEdit: (state) => state.resume,
    },

    actions: {
        setResume(id: string | string[]) {
            let resume
            const resumes: Resume[] = this.userStore.$state.user.resumes
            if (id && resumes) resume = resumes.find(r => r._id === id)
            if (!resume) resume = resumeService.getEmptyResume()
            this.$state.resume = resume
        },
        updateResume(payload: Payload) {
            const { type, val } = payload
            this.$state.resume[type] = val
        },
        download(file: HTMLElement) {
            pdfService.download(file)
        }
    }
})