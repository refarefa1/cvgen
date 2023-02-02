<template>
	<form @submit.prevent="reset" class="auth-form">
		<h1>Reset Password</h1>

		<p>
			Enter the email address associated with your account, and we’ll
			email you a link to reset your password.
		</p>

		<CFormFloating class="mb-3">
			<CFormInput type="email" placeholder="Email" autofocus v-model="email" />
			<CFormLabel for="floatingInput">
				<span class="floating-label">
					<v-icon name="md-email" />Email
				</span>
			</CFormLabel>
			<div v-if="msg" class="validate-messages">
				<div class="email">{{ msg }}</div>
			</div>
		</CFormFloating>

		<button type="submit" class="form-submit">
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
import { useUserStore } from '../../store/user.store';

export default {
	name: 'resetPassword',
	components: {
		CFormFloating,
		CFormInput,
		CFormLabel,
	},
	data() {
		return {
			email: '',
			msg: '',
			userStore: useUserStore()
		};
	},
	methods: {
		validateEmail() {
			if (!this.email.length) return 'Email is required'
			const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
			const isValid = emailRegex.test(this.email)
			this.msg = isValid ? '' : 'Please enter a valid email'
			return isValid
		},
		reset() {
			const isValid = this.validateEmail()
			if (!isValid) return
			/* TODO: Call userStore.reset(this.email)
			Use the user-msg component to notify user that a mail has been sent to him (Example below)
			eventBus.emit('user-msg', 'Your message here') */
		},
	},
};
</script>
