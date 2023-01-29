import homePage from './views/home-page.vue';
import resumeApp from './views/resume-app.vue';
import SignUpPage from './views/auth/signup-page.vue';
import loginPage from './views/auth/login-page.vue';
import forgetPassword from './views/auth/forget-password-page.vue';

import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
	{
		path: '/',
		component: homePage,
	},
	{
		path: '/resume/:id',
		component: resumeApp,
	},
	{
		path: '/signup',
		component: SignUpPage,
	},
	{
		path: '/login',
		component: loginPage,
	},
	{
		path: '/forget-password',
		component: forgetPassword,
	},
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes,
});
