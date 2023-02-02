import { defineStore } from "pinia"
import User from "../interfaces/user.interface"
import { userService } from "../services/user.service"

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
    }

})