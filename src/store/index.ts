import { createStore } from 'vuex'
import { resumeStore } from './resume.store'
import { userStore } from './user.store'

const options = {
  strict: true,
  modules: {
    resumeStore,
    userStore
  },
}

export const store = createStore(options)
