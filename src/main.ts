import './assets/css/main.css'
import './assets/scss/global.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin as Slicksort } from 'vue-slicksort';
import router from './router'
import App from './App.vue'
import {
    focusDirective,
    svgIconDirective,
} from './directives'


const app = createApp(App)
const pinia = createPinia()

app.directive('focus', focusDirective)
app.directive('svg-icon', svgIconDirective)
app.use(pinia)
app.use(router)
app.use(Slicksort)
app.mount('#app')
