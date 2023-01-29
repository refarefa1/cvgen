import { State } from "vue"
import { userService } from "../services/user.service"


export const userStore = {
    state: {
        user: null,
    },
    getters: {
        user(state: State) { return state.user },
    },
    mutations: {
        setUser(state: State, { user }: any) {
            state.user = user
        }
    },
    actions: {
        async loadUser(context: any) {
            const user = await userService.query()
            context.commit({ type: 'setUser', user })
        }
    }
}