import { Store } from 'vuex'
import { Resume } from './resume-interface'
import { User } from './user.interface'

declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
        resume: Resume
        resumeList: Resume[]
        user: User
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}