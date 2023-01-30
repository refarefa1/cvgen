<template>
	<form class="auth-form">
		<h1>Reset Password</h1>

		<p>
			Enter the email address associated with your account, and we’ll
			email you a link to reset your password.
		</p>

		<CFormFloating class="mb-3">
			<CFormInput type="email" placeholder="Email" autofocus required />
			<CFormLabel for="floatingInput">
				<span class="floating-label">
					<v-icon name="md-email" />Email
				</span>
			</CFormLabel>
		</CFormFloating>

		<button type="submit" class="form-submit">
			Send reset instructions
		</button>

		<p>
			Remember your password?<button
				@click.prevent="$emit('change-component', 'signUpForm')"
				class="form-link">
				Create Account
			</button>
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
			showPassword: false,
		};
	},
};
</script>
