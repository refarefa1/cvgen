import { State } from "vue"
import { ActionContext } from "vuex"
import { resumeService } from "../services/resume.service"


export const resumeStore = {
    state: {
        resume: null,
        resumeList: null
    },
    getters: {
        resume(state: State) { return state.resume },
        resumeList(state: State) { return state.resumeList },
    },
    mutations: {
        setResume(state: State, { resume }: any) {
            state.resume = resume
        }

    },
    actions: {
        async loadResume(context: any) {
            const resume = await resumeService.query()
            context.commit({ type: 'setResume', resume })
        }
    }
}