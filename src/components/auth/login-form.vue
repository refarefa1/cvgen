<template>
	<form @submit="login" class="auth-form">
		<h1>Login</h1>

		<CFormFloating class="mb-3">
			<CFormInput v-model="credentials.username" type="text" placeholder="User name" required />
			<CFormLabel for="floatingInput">
				<span v-svg-icon="'username'" class="floating-label" />
				<p>User name</p>
			</CFormLabel>
		</CFormFloating>

		<div class="password-container">
			<CFormFloating class="mb-3">
				<CFormInput v-model="credentials.password" :type="showPassword ? 'text' : 'password'" required
					placeholder="Password" />
				<CFormLabel for="floatingInput">
					<span v-svg-icon="'password'" class="floating-label" />
					<p>Password</p>
				</CFormLabel>
			</CFormFloating>

			<button @click.prevent="showPassword = !showPassword" class="password-reveal form-link">
				{{ showPassword? 'Hide': 'Show' }}
			</button>

			<router-link to="/forget-password" class="forget-password form-link">
				Forget password?
			</router-link>
		</div>

		<button type="submit" class="form-submit form-link">Login</button>

		<router-link class="form-link" to="/signup">
			Create Account
		</router-link>
	</form>
</template>

<script lang="ts">
import { CFormFloating, CFormInput, CFormLabel } from '@coreui/vue';
import { useUserStore } from '../../store/user.store';

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
			userStore: useUserStore(),
			credentials: {
				username: '',
				password: ''
			}
		}
	},
	methods: {
		async login() {
			try {
				const res = await this.userStore.login({ ...this.credentials })
				console.log(res)
			} catch (err) {
				console.log(err)
			}
		}
	}
};
</script>
