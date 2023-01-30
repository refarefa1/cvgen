import { defineStore } from "pinia"
import type User from "../interfaces/user.interface"
import { userService } from "../services/user.service"

interface State {
    user: User | null
}

export default defineStore('userStore', {

    state: () => <State>({
        user: null,
    }),

    getters: {
        loggedinUser: (state) => state.user,
    },

    actions: {
        async loadUser() {
            const user: User = await userService.query()
            this.$state.user = user
        }
    }
})