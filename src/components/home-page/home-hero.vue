<template>
	<section class="home-hero">
		<div class="content">
			<h1>Let's boost your career</h1>
			<h3>
				Showcase your skills and talents. Make a great first impression.
			</h3>
		</div>
		<div class="hero-img">
			<logo-svg />
		</div>
	</section>
</template>

<script lang="ts">
import logoSvg from '../logo-svg.vue';

export default {
	components: {
		logoSvg,
	},
};
</script>
