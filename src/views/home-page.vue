<template>
	<section class="home-page">
		<home-header :user="user" />
		<div class="home-content">
			<hero-text />
			<resume-list @remove="remove" @create="create" :user="user" />
			<hero-img />
		</div>
		<router-view />
	</section>
</template>

<script lang="ts">
import { useUserStore } from '../store/user.store';
import homeHeader from '../components/home-page/home-header.vue';
import heroImg from '../components/home-page/hero-img.vue';
import heroText from '../components/home-page/hero-text.vue';
import resumeList from '../components/home-page/resume-list.vue';
import { useResumeStore } from '../store/resume.store';

export default {
	data() {
		return {
			userStore: useUserStore(),
			resumeStore: useResumeStore(),
		}
	},

	computed: {
		user() {
			return this.userStore.loggedinUser
		},
		resume() {
			return this.resumeStore.resumeToEdit
		}
	},
	methods: {
		create() {
			const id = this.resumeStore.query(null)
			this.$router.push(`resume/${id}/content`)
		},
		remove(id: string) {
			const payload = { type: 'resume', val: id }
			this.resumeStore.remove(payload)
		}
	},
	components: {
		homeHeader,
		heroImg,
		resumeList,
		heroText,
	},
};
</script>
