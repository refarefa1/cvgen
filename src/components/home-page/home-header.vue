<template>
	<header class="home-header">
		<div class="header-wrapper">
			<div class="logo">
				<h1>FlowCV</h1>
			</div>

			<div class="login">
				<router-link to="/login" class="login-btn">
					Log In <v-icon name="ri-login-box-line" />
				</router-link>
			</div>
		</div>
	</header>
</template>

<script lang="ts">
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
