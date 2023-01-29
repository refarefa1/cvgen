import homePage from './views/home-page.vue'
import resumeApp from './views/resume-app.vue'
import signUp from './views/sign-up.vue'

import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/resume/:id',
        component: resumeApp,
    },
    {
        path: '/signup',
        component: signUp
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})