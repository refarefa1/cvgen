<template>
	<header class="resume-header">
		<nav class="header-nav">
			<div class="home">
				<router-link to="/">
					<p>Home</p>
				</router-link>
			</div>
			<div class="content">
				<router-link :to="'/resume/' + $route.params.id + '/content/'">
					<p>Content</p>
				</router-link>
			</div>
			<div class="customize">
				<router-link :to="'/resume/' + $route.params.id + '/customize/'">
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

	<resume-title @update="update" @save="save" :resume="resume" />

	<div class="progress-bar-container">
		<p>
			<span class="percent" :style="{ color: progressBarColor }">
				<span v-animate-number="progressBarPercent" />%
			</span>
			Profile completeness
		</p>
		<div class="progress-bar">
			<div class="inner" :style="{
				backgroundColor: progressBarColor,
				width: `${progressBarPercent}%`,
			}" />
		</div>
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { RouterLink } from 'vue-router'
import { Resume } from '../../interfaces/resume-interface'
import resumeTitle from './resume-title.vue'
export default {
	name: 'resume-header',
	emits: ['download', 'update', 'save'],
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
		update(payload: { type: string, val: any }) {
			this.$emit('update', payload)
		},
		save() {
			this.$emit('save')
		}
	},
	computed: {
		progressBarPercent() {
			const res = (this.resume?.components.length! + 1) / 7;
			return Math.floor(100 * res);
		},
		progressBarColor() {
			const percent = this.progressBarPercent;
			if (percent < 30) return '#fb4458';
			else if (percent < 70) return '#cf760d';
			else return '#339d5d';
		},
	},
	components: {
		resumeTitle
	}
};
</script>
