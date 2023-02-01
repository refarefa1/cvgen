import homePage from './views/home-page.vue'
import resumeApp from './views/resume/resume-app.vue'
import resumeContent from './views/resume/resume-content.vue'
import resumeCustomize from './views/resume/resume-customize.vue'
import SignUpPage from './views/auth/signup-page.vue'
import loginPage from './views/auth/login-page.vue'
import forgetPassword from './views/auth/forget-password-page.vue'
import loginForm from './components/auth/login-form.vue'
import signupForm from './components/auth/signup-form.vue'
import forgetPasswordForm from './components/auth/forget-password-form.vue'

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		component: homePage,
		children: [
			{
				path: '/login',
				component: loginForm
			},
			{
				path: '/signup',
				component: signupForm
			},
			{
				path: '/forget-password',
				component: forgetPasswordForm
			},
		]
	},
	{
		path: '/resume',
		component: resumeApp,
		children: [
			{
				path: 'content/:id?',
				component: resumeContent
			},
			{
				path: 'customize/:id?',
				component: resumeCustomize
			},
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
