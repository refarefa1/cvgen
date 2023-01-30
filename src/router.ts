import homePage from './views/home-page.vue'
import resumeApp from './views/resume/resume-app.vue'
import resumeContent from './views/resume/resume-content.vue'
import SignUpPage from './views/auth/signup-page.vue'
import loginPage from './views/auth/login-page.vue'
import forgetPassword from './views/auth/forget-password-page.vue'

import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
	{
		path: '/',
		component: homePage,
	},
	{
		path: '/resume',
		component: resumeApp,
		children: [
			{
				path: 'content/:id?',
				component: resumeContent
			}
		]
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

export default createRouter({
	history: createWebHashHistory(),
	routes,
});
