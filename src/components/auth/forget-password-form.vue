<template>
	<form class="auth-form">
		<h1>Reset Password</h1>

		<p>
			Enter the email address associated with your account, and we’ll
			email you a link to reset your password.
		</p>

		<CFormFloating class="mb-3">
			<CFormInput
				type="email"
				placeholder="Email"
				autofocus
				v-model="inputs.email" />
			<CFormLabel for="floatingInput">
				<span class="floating-label">
					<v-icon name="md-email" />Email
				</span>
			</CFormLabel>
			<div v-if="validMessage.email" class="validate-messages">
				<div class="email">{{ validMessage.email }}</div>
			</div>
		</CFormFloating>

		<button type="submit" class="form-submit" @click.prevent="submit">
			Send reset instructions
		</button>

		<hr />

		<p>
			Remember your password?
			<router-link to="/login">Login</router-link>
		</p>
	</form>
</template>

<script lang="ts">
import { CFormFloating, CFormInput, CFormLabel } from '@coreui/vue';

export default {
	name: 'resetPassword',
	components: {
		CFormFloating,
		CFormInput,
		CFormLabel,
	},
	data() {
		return {
			inputs: {
				email: '',
			},
			validMessage: {
				email: '',
			},
		};
	},
	methods: {
		validateEmail() {
			if (!this.inputs.email.length) {
				return 'Email is required';
			}

			const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			const isValid = !emailRegex.test(this.inputs.email);
			return isValid ? 'Please enter a valid email' : '';
		},
		submit() {
			this.validMessage.email = this.validateEmail();
		},
	},
	watch: {
		email(newVal) {
			this.inputs.email = this.validateEmail();
		},
	},
};
</script>
