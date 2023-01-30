<template>
	<div class="custom-modal">
		<transition name="fade" appear>
			<div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
		</transition>

		<Transition name="pop" appear>
			<div class="modal-content" v-if="showModal" role="dialog">
				<login-form />
			</div>
		</Transition>

		<button @click="showModal = true" class="login-btn">
			Login
		</button>
	</div>
</template>

<script lang="ts">
import { PropType, Transition } from 'vue';
import type User from '../../interfaces/user.interface';
import loginForm from './login-form.vue';

export default {
	components: {
		loginForm,
		Transition,
	},
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
