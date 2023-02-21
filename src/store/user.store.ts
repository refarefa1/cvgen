import { defineStore } from "pinia"
import User, { Credentials } from "../interfaces/user.interface"
import { authService } from "../services/auth.service"
import { userService } from "../services/user.service"

type State = {
    user: User
}

export const useUserStore = defineStore('userStore', {

    state: () => <State>({
        user: userService.query(),
    }),

    getters: {
        loggedinUser: (state) => state.user
    },

    actions: {
        query() {
            const user: User = userService.query()
            this.$state.user = user
        },
        async login(credentials: Credentials) {
            try {
                // const session = await authService.login(credentials)
                // console.log(session)
                // return session
            } catch (err: any) {
                console.log('There was an error when logging in, please try again', err);
                throw new Error(err);
            }
        },
        async signup(credentials: Credentials) {
            try {
                // const session = await authService.signup(credentials)
                // console.log(session)
                // return session
            } catch (err: any) {
                console.log('There was an error when signing up, please try again', err);
                throw new Error(err);
            }
        },
        async reset(email: keyof Credentials) {
            try {
                // const session = await authService.reset(email)
                // console.log(session)
                // return session
            } catch (err: any) {
                console.log('There was an error while trying to send mail, please try again', err);
                throw new Error(err);
            }
        }
    }

})