<template>
	<div>
		<vue-final-modal v-model="showModal">
			Modal Content Here
		</vue-final-modal>
		<button @click="showModal = true">
			{{ user?._id ? 'Logout' : 'Login' }}
		</button>
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import type User from '../interfaces/user.interface';

export default {
	props: {
		user: {
			required: true,
			type: Object as PropType<User>,
		},
	},
	data: () => ({
		showModal: false,
	}),
};
</script>
