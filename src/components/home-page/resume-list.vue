<template>
	<section ref="container" class="resume-list-container">

		<remove-modal v-if="isRemoving" @cancel="closeModal" @remove="remove" />
		<div v-if="isRemoving" @click.stop="closeModal" class="black-screen" />

		<div class="resume-list-header">
			<h2>My resumes</h2>
		</div>
		<div ref="list" class="resume-list" :class="{ 'overflow': isOverflow }">
			<div @click="read(null)" class="resume-preview-add">
				<div class="resume-info">
					<span v-svg-icon="'plus'" class="resume-icon"></span>
					<p class="resume-title">New resume</p>
				</div>
			</div>
			<div @click="read(resume._id)" v-for="resume in user.resumes" :key="resume._id" class="resume-preview">
				<div class="resume-info">
					<span @click.stop="openRemoveModal(resume._id)" class="remove" v-svg-icon="'trash'"></span>
					<p class="resume-title">{{ resume.name }}</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { PropType } from 'vue';
import User from '../../interfaces/user.interface';
import { useResumeStore } from '../../store/resume.store';
import removeModal from '../resume/remove-modal.vue';

export default {
	emits: ['create', 'remove'],
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
			isOverflow: false,
			isRemoving: false,
			selected: null as string | null,
			resumeStore: useResumeStore()
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
		},
		read(resumeId: string | null) {
			if (resumeId) this.$router.push(`resume/${resumeId}/content`)
			else this.$emit('create')
		},
		openRemoveModal(resumeId: string) {
			this.isRemoving = true
			this.selected = resumeId
		},
		closeModal() {
			this.isRemoving = false
			this.selected = null
		},
		remove() {
			this.$emit('remove', this.selected)
			this.isRemoving = false
		}
	},
	components: {
		removeModal
	}
};
</script>
