<template>
	<div class="login-page">
		<div class="header">
			<router-link to="/" class="logo">
				<logo-svg2 />
			</router-link>
		</div>

		<form class="login-container">
			<h1>Login</h1>
			<div>
				<!-- Email icon here -->
				<input type="email" name="email" placeholder="Email" />
			</div>
			<div>
				<!-- Password icon here -->
				<input type="password" name="password" placeholder="Password" />
			</div>
			<router-link to="/forget-password">Forget password?</router-link>
			<button type="submit">Login</button>
		</form>
	</div>
</template>

<script lang="ts">
import logoSvg2 from '../../components/logo-svg2.vue';

export default {
	components: {
		logoSvg2,
	},
};
</script>
