<template>
	<header class="home-header">
		<div class="header-wrapper">
			<div class="logo">
				<h1>FlowCV</h1>
			</div>
			<div class="login">
				<login-modal :user="user" />
			</div>
		</div>
	</header>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { User } from '../../interfaces/user.interface';
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
