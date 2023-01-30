<template>
	<form class="login-container">
		<h1>Login</h1>

		<CFormFloating class="mb-3">
			<CFormInput type="email" placeholder="Email" autofocus />
			<CFormLabel for="floatingInput"
				><span
					><v-icon name="md-email" /> Email address</span
				></CFormLabel
			>
		</CFormFloating>

		<CFormFloating class="mb-3">
			<CFormInput
				:type="showPassword ? 'text' : 'password'"
				placeholder="Password" />
			<CFormLabel for="floatingInput">
				<span><v-icon name="ri-lock-line" /> Password</span></CFormLabel
			>
		</CFormFloating>
		<router-link to="/forget-password" class="forget-password"
			>Forget password?</router-link
		>

		<button @click="showPassword = !showPassword">
			{{ showPassword ? 'Hide' : 'Show' }}
		</button>

		<button type="submit">Login</button>
		<router-link to="/signup">Create Account</router-link>
	</form>
</template>

<script lang="ts">
import { CFormFloating, CFormInput, CFormLabel } from '@coreui/vue';

export default {
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
