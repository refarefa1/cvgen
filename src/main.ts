import './assets/scss/global.scss'
import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { MdEmail, RiLockLine, MdContactpageOutlined } from 'oh-vue-icons/icons'
addIcons(MdEmail, RiLockLine, MdContactpageOutlined)



const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.component('v-icon', OhVueIcon)
app.mount('#app')
