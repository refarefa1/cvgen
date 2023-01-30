<template>
	<router-view />
</template>

<script lang="ts">
import { useUserStore } from './store/user.store';

export default {
	data() {
		return {
			userStore: useUserStore(),
		};
	},

	created() {
		this.userStore.loadUser();
	},
};
</script>
