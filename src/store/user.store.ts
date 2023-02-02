import { defineStore } from "pinia"
import User from "../interfaces/user.interface"
import { userService } from "../services/user.service"

type Credentials = {
    email: string
    password: string
}

type State = {
    user: User
}

export const useUserStore = defineStore('userStore', {

    state: () => <State>({
        user: userService.getEmptyUser(),
    }),

    getters: {
        loggedinUser: (state) => state.user
    },

    actions: {
        async query() {
            const user: User = await userService.query()
            this.$state.user = user
        },
        async login(credentials: Credentials) {
            /* TODO: Call authService.login(credentials)
            Gets hard coded user for now and saves to state */
        },
        async signup(credentials: Credentials) {
            /* TODO: Call authService.signup(credentials)
            Gets hard coded user for now and saves to state */
        },
        async reset(email: keyof Credentials) {
            //  TODO: Call authService.reset(credentials)
        }
    }

})