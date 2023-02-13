<template>
	<header class="resume-header">
		<nav class="header-nav">
			<div class="content">
				<router-link :to="'/resume/content/' + $route.params.id">
					<p>Content</p>
				</router-link>
			</div>
			<div class="customize">
				<router-link :to="'/resume/customize/' + $route.params.id">
					<p>Customize</p>
				</router-link>
			</div>
		</nav>
		<div @click="download" class="download">
			<button class="download-btn">
				<span v-svg-icon="'download'"></span>
				<p>Download</p>
			</button>
		</div>
	</header>

	<div class="progress-bar-container">
		<p>
			<span class="percent" :style="{ color: progressBarColor }" v-animate-number="progressBarPercent"
				>{{ progressBarPercent }}%
			</span>
			Profile completeness
		</p>
		<div class="progress-bar">
			<div
				class="inner"
				:style="{
					backgroundColor: progressBarColor,
					width: `${progressBarPercent}%`,
				}" />
		</div>
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { RouterLink } from 'vue-router';
import { Resume } from '../../interfaces/resume-interface';

export default {
	name: 'resume-header',
	emits: ['download'],
	props: {
		resume: Object as PropType<Resume>,
	},
	methods: {
		goTo(newPath: string) {
			const id: string | string[] | undefined = this.$route.params.id;
			this.$router.push(`${newPath + id}`);
		},
		download() {
			this.$emit('download');
		},
	},
	computed: {
		progressBarPercent: function () {
			const res = this.resume?.components.length! / 6;
			return Math.floor(100 * res);
		},
		progressBarColor: function () {
			const percent = this.progressBarPercent;
			if (percent < 30) return '#fb4458';
			else if (percent < 70) return '#cf760d';
			else return '#339d5d';
		},
	},
};
</script>
