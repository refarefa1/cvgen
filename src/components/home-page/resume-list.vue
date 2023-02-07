<template>
	<section ref="container" class="resume-list-container">

		<div class="resume-list-header">
			<h2>My resumes</h2>
		</div>
		<div ref="list" class="resume-list" :class="{ 'overflow': isOverflow }">
			<div class=" resume-preview-add">
				<router-link to="resume/content">
					<div class="resume-info">
						<span v-svg-icon="'plus'" class="resume-icon"></span>
						<p class="resume-title">New resume</p>
					</div>
				</router-link>
			</div>
			<div v-for="resume in user.resumes" :key="resume._id" class="resume-preview">
				<router-link :to="'/resume/content/' + resume._id">
					<div class="resume-info">
						<p class="resume-title">{{ resume.name }}</p>
					</div>
				</router-link>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { PropType } from 'vue';
import User from '../../interfaces/user.interface';

export default {
	props: {
		user: {
			type: Object as PropType<User>,
			required: true,
		},
	},
	mounted() {
		this.isOverflow = this.checkIfOverflow()
	},
	data() {
		return {
			isOverflow: false
		}
	},
	computed: {
		overflow() {
			return this.isOverflow
		}
	},
	methods: {
		checkIfOverflow() {
			if (!this.$refs.list) return false
			const elemWidth = (this.$refs.list as HTMLElement).scrollWidth
			const parentWidth = (this.$refs.container as HTMLElement).getBoundingClientRect().width - 48
			return elemWidth > parentWidth
		}
	}
};
</script>
