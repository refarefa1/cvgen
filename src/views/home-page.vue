<template>
	<section class="home-page">
		<home-header :user="user" />
		<div class="home-content">
			<hero-text />
			<resume-list :user="user" />
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

export default {
	data() {
		return {
			userStore: useUserStore(),
		};
	},

	computed: {
		user() {
			return this.userStore.loggedinUser
		},
	},
	components: {
		homeHeader,
		heroImg,
		resumeList,
		heroText
	},
};
</script>
