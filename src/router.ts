import homePage from './views/home-page.vue'
import resumeApp from './views/resume/resume-app.vue'
import resumeContent from './views/resume/resume-content.vue'
import resumeCustomize from './views/resume/resume-customize.vue'
import authModal from './views/auth/auth-modal.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'home-page',
		component: homePage,
		children: [
			{
				path: 'login',
				name: 'loginForm',
				component: authModal
			},
			{
				path: 'signup',
				name: 'signupForm',
				component: authModal
			},
			{
				path: 'forget-password',
				name: 'resetForm',
				component: authModal
			},
		]
	},
	{
		path: '/resume/:id',
		name: 'resume-app',
		component: resumeApp,
		children: [
			{
				path: 'content',
				name: 'resume-content',
				component: resumeContent
			},
			{
				path: 'customize',
				name: 'resume-customize',
				component: resumeCustomize
			},
		]
	},
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
