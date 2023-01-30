<template>
	<header class="home-header">
		<div class="header-wrapper">
			<div class="logo">
				<h1>FlowCV</h1>
			</div>
			<div class="login">
				<!-- <router-link class="login-btn" v-if="user._id" to="/login"
					>Log In</router-link
				>
				<signup-modal class="login-btn" v-else :user="user" /> -->
				<login-modal class="login-btn" :user="user" />
			</div>
		</div>
	</header>
</template>

<script lang="ts">
import { PropType } from 'vue';
import type User from '../../interfaces/user.interface';
import loginModal from '../auth/login-modal.vue';

export default {
	props: {
		user: {
			required: true,
			type: Object as PropType<User>,
		},
	},
	components: {
		loginModal,
	},
};
</script>
