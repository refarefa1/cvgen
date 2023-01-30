<template>
	<form class="auth-form">
		<h1>Login</h1>

		<CFormFloating class="mb-3">
			<CFormInput type="email" placeholder="Email" autofocus required />
			<CFormLabel for="floatingInput">
				<span class="floating-label">
					<v-icon name="md-email" />Email
				</span>
			</CFormLabel>
		</CFormFloating>

		<div class="password-container">
			<CFormFloating class="mb-3">
				<CFormInput
					:type="showPassword ? 'text' : 'password'"
					required
					placeholder="Password" />

				<CFormLabel for="floatingInput">
					<span class="floating-label">
						<v-icon name="ri-lock-line" />Password
					</span>
				</CFormLabel>
			</CFormFloating>

			<button
				@click.prevent="showPassword = !showPassword"
				class="password-reveal form-link">
				{{ showPassword ? 'Hide' : 'Show' }}
			</button>
		</div>

		<button
			@click.prevent="$emit('change-component', 'resetPassword')"
			class="forget-password form-link">
			Forget password?
		</button>

		<button type="submit" class="form-submit form-link">Login</button>

		<button
			class="form-link"
			@click="$emit('change-component', 'signUpForm')">
			Create Account
		</button>
	</form>
</template>

<script lang="ts">
import { CFormFloating, CFormInput, CFormLabel } from '@coreui/vue';

export default {
	name: 'loginForm',
	components: {
		CFormFloating,
		CFormInput,
		CFormLabel,
	},
	emits: ['change-component'],
	data() {
		return {
			showPassword: false,
		};
	},
};
</script>
