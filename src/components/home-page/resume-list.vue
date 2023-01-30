<template>
	<section class="resume-list-container">
		<div class="header">
			<h2>Resumes</h2>
			<p>
				Your first resume - 100% free, forever, all features, unlimited
				downloads, yes really.
			</p>
		</div>
		<div class="resume-list">
			<div
				v-for="resume in user.resumeList"
				:key="resume._id"
				class="resume-preview">
				<router-link :to="'/resume/' + resume._id">
					<button>{{ resume.name }}</button>
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
