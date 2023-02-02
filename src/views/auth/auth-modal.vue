<template>
	<div class="custom-modal">
		<div class="modal-overlay" @click="$router.push('/')" />
		<div class="modal-content" role="dialog">
			<span @click="$router.push('/')" class="close-modal-btn"><v-icon name="fa-window-close"></v-icon></span>
			<component :user="user" :is="component" />
		</div>
	</div>
</template>

<script lang="ts">
import loginForm from '../../components/auth/login-form.vue';
import signupForm from '../../components/auth/signup-form.vue';
import resetForm from '../../components/auth/reset-form.vue';
import { useUserStore } from '../../store/user.store';

export default {
	components: {
		loginForm,
		signupForm,
		resetForm,
	},
	created() {
		this.component = this.$route.name as string
	},

	data() {
		return {
			component: '',
			userStore: useUserStore()
		}
	},
	computed: {
		user() { return this.userStore.loggedinUser },
		route() { return this.$route.name }
	},

	watch: {
		route(newVal) {
			this.component = newVal
		}
	}
}
</script>
