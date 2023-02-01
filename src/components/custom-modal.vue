<template>
	<router-view v-slot="{ Component }">
		<div class="custom-modal">
			<Transition name="fade">
				<div
					v-if="Component"
					class="modal-overlay"
					@click="$router.push('/')" />
			</Transition>

			<transition>
				<div class="modal-content" role="dialog">
					<component :is="Component" />
				</div>
			</transition>
		</div>
	</router-view>
</template>

<script lang="ts">
import { PropType, Transition } from 'vue';
import type User from '../interfaces/user.interface';
import logInForm from '../components/auth/login-form.vue';
import signUpForm from '../components/auth/signup-form.vue';
import resetPassword from './auth/forget-password-form.vue';

export default {
	components: {
		Transition,
		logInForm,
		signUpForm,
		resetPassword,
	},
	props: {
		user: {
			required: true,
			type: Object as PropType<User>,
		},
	},
};
</script>
