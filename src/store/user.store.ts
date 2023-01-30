import { defineStore } from "pinia"
import { User } from "../interfaces/user.interface"
import { userService } from "../services/user.service"

interface State {
    user: User | null
}

export const useUserStore = defineStore('userStore', {

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