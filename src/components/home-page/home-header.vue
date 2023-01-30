<template>
	<header class="home-header">
		<div class="header-wrapper">
			<div class="logo">
				<h1>FlowCV</h1>
			</div>
			<div class="login">
				<!-- <login-modal :user="user" /> -->
				<custom-modal :user="user" buttonText="Login"/>
			</div>
		</div>
	</header>
</template>

<script lang="ts">
import { PropType } from 'vue';
import User from '../../interfaces/user.interface';
import customModal from '../custom-modal.vue';

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
