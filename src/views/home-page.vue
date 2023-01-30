<template>
	<section class="home-page">
		<home-header :user="user" />
		<home-hero />
		<resume-list :user="user" />
	</section>
</template>

<script lang="ts">
import useUserStore from '../store/user.store';
import homeHeader from '../components/home-page/home-header.vue';
import homeHero from '../components/home-page/home-hero.vue';
import resumeList from '../components/home-page/resume-list.vue';
import type User from '../interfaces/user.interface';

export default {
	data() {
		return {
			userStore: useUserStore(),
		};
	},

	computed: {
		user() {
			return (
				this.userStore.loggedinUser || {
					_id: null,
				}
			);
		},
	},
	components: {
		homeHeader,
		homeHero,
		resumeList,
	},
};
</script>
