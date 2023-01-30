<template>
	<div class="login-page">
		<div class="login-header">
			<router-link to="/" class="logo">
				<logo-svg2 />
			</router-link>
		</div>

		<form class="login-container">
			<h1>Login</h1>

			<CFormFloating class="mb-3">
				<CFormInput type="email" placeholder="Email" />
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
					<span
						><v-icon name="ri-lock-line" /> Password</span
					></CFormLabel
				>
			</CFormFloating>

			<button @click="showPassword = !showPassword">
				{{ showPassword ? 'Show' : 'Hide' }}
			</button>

			<router-link to="/forget-password">Forget password?</router-link>

			<button type="submit">Login</button>
		</form>
	</div>
</template>

<script lang="ts">
import { CFormFloating, CFormInput, CFormLabel } from '@coreui/vue';
import logoSvg2 from '../../components/logo-svg2.vue';

export default {
	components: {
		logoSvg2,
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
