<template>
	<div class="login-page">
		<div class="login-header">
			<router-link to="/" class="logo">
				<logo-svg2 />
			</router-link>
		</div>

		<login-form />
	</div>
</template>

<script lang="ts">
import logoSvg2 from '../../assets/svgs/logo-svg2.vue';
import loginForm from '../../components/auth/login-form.vue';

export default {
	components: {
		logoSvg2,
		loginForm,
	},
};
</script>
