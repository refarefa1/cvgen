<template>
	<form class="auth-form">
		<h1>Create account</h1>

		<CFormFloating class="mb-3">
			<CFormInput type="email" placeholder="Email" autofocus required />
			<CFormLabel for="floatingInput"
				><span class="floating-label"
					><v-icon name="md-email" />Email</span
				></CFormLabel
			>
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

		<div class="sub-checkbox">
			<input
				type="checkbox"
				name="subscribeCheckBox"
				:checked="subscribeCheckBox" />
			<label
				@click="subscribeCheckBox = !subscribeCheckBox"
				for="subscribeCheckBox"
				>Get FlowCV updates. No spam ever.</label
			>
		</div>

		<button type="submit" class="form-submit">Create account</button>

		<p>
			By creating an account, you agree to our
			<a href="/terms-of-service">Terms of Service</a>. We do not sell
			your personal data. To learn more about how we collect, use, share
			and protect it please read our
			<a href="/privacy-policy">Privacy Policy</a>
		</p>

		<p>
			Have already account?
			<button @click="$emit('changeComponent', 'logInForm')">
				Login
			</button>
		</p>
	</form>
</template>

<script lang="ts">
import { CFormFloating, CFormInput, CFormLabel } from '@coreui/vue';

export default {
	name: 'signUpForm',
	components: {
		CFormFloating,
		CFormInput,
		CFormLabel,
	},
	data() {
		return {
			showPassword: false,
			subscribeCheckBox: false,
		};
	},
};
</script>
