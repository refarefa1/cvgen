<template>
	<form @submit="signup" class="auth-form">
		<h1>Create account</h1>

		<CFormFloating class="mb-3">
			<CFormInput v-model="credentials.email" type="email" placeholder="Email" autofocus required />
			<CFormLabel for="floatingInput">
				<span v-svg-icon="'email'" />
				<p>Email</p>
			</CFormLabel>
		</CFormFloating>

		<CFormFloating class="mb-3">
			<CFormInput v-model="credentials.username" type="email" placeholder="User name" required />
			<CFormLabel for="floatingInput">
				<span v-svg-icon="'username'" />
				<p>User name</p>
			</CFormLabel>
		</CFormFloating>

		<div class="password-container">
			<CFormFloating class="mb-3">
				<CFormInput v-model="credentials.password" :type="showPassword ? 'text' : 'password'" required
					placeholder="Password" inputmode="tel" />
				<CFormLabel for="floatingInput">
					<span v-svg-icon="'password'" />
					<p>Password</p>
				</CFormLabel>
			</CFormFloating>

			<button @click.prevent="showPassword = !showPassword" class="password-reveal form-link">
				{{ showPassword? 'Hide': 'Show' }}
			</button>
		</div>

		<div class="sub-checkbox">
			<input type="checkbox" name="subscribeCheckBox" :checked="subscribeCheckBox" />
			<label @click="subscribeCheckBox = !subscribeCheckBox" for="subscribeCheckBox">Get FlowCV updates. No spam
				ever.</label>
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
			Have already account? <router-link to="/login">Login</router-link>
		</p>
	</form>
</template>

<script lang="ts">
import { CFormFloating, CFormInput, CFormLabel } from '@coreui/vue';
import { useUserStore } from '../../store/user.store';

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
			credentials: {
				email: '',
				username: '',
				password: ''
			},
			userStore: useUserStore()
		}
	},
	methods: {
		async signup() {
			try {
				const res = await this.userStore.signup({ ...this.credentials })
				console.log(res);
			} catch (err) {
				console.log(err);
			}
		}
	}
}
</script>
