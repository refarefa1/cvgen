<template>
	<header class="home-header">
		<div class="header-wrapper">
			<div class="logo">
				<h1 class="logo-title">CVGen</h1>
			</div>

			<div class="login">
				<router-link to="/login" class="login-btn">
					<p>
						Log In
						<span v-svg-icon="'login'"></span>
					</p>
				</router-link>
			</div>
		</div>
	</header>
</template>

<script lang="ts">
import { log } from 'console';
import { PropType } from 'vue';
import User from '../../interfaces/user.interface';
import customModal from '../../views/auth/auth-modal.vue';

export default {
	props: {
		user: {
			required: true,
			type: Object as PropType<User>,
		},
	},
	components: {
		customModal,
	},
};
</script>
