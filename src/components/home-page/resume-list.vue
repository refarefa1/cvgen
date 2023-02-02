<template>
	<section class="resume-list-container">
		
		<div class="resume-list-header">
			<h2>My resumes</h2>
		</div>
		<div class="resume-list">
			<div class="resume-preview-add">
				<router-link to="resume/content">
					<div class="resume-info">
						<span class="resume-icon"><v-icon name="md-contactpage-outlined" /></span>
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
};
</script>
