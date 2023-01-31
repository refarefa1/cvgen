<template>
	<div class="custom-modal">
		<Transition name="fade">
			<div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
		</Transition>

		<Transition name="pop">
			<div class="modal-content" v-if="showModal" role="dialog">
				<component :is="stateChildComponent" @change-component="changeComponent"></component>
			</div>
		</Transition>

		<button @click="showModal = true" class="login-btn">
			{{ buttonText }}
		</button>
	</div>
</template>

<script lang="ts">
import { PropType, Transition } from 'vue';
import type User from '../interfaces/user.interface';
import logInForm from '../components/auth/login-form.vue';
import signUpForm from '../components/auth/signup-form.vue';
import resetPassword from './auth/reset-password.vue';

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
		childComponent: {
			type: String,
			default: 'logInForm',
		},
		buttonText: {
			required: true,
			type: String,
		},
	},
	methods: {
		changeComponent(componentName: string) {
			this.stateChildComponent = componentName;
		},
	},
	data() {
		return {
			showModal: false,
			stateChildComponent: this.childComponent,
		};
	},
	watch: {
		showModal(newVal) {
			if (!newVal) {
				this.stateChildComponent = 'logInForm';
			}
		},
	},
	mounted() {
		this.stateChildComponent = 'logInForm';
	},
};
</script>
