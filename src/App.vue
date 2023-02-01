<template>
	<user-msg />
	<router-view />
</template>

<script lang="ts">
import { useUserStore } from './store/user.store';
import userMsg from './components/user-msg.vue'

export default {
	data() {
		return {
			userStore: useUserStore(),
		}
	},
	created() {
		this.userStore.loadUser()
	},
	components: {
		userMsg
	}
}
</script>
