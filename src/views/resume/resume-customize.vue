<template>
    <resume-header @download="download" />
    <resume-footer />
</template>

<script lang="ts">
import resumeHeader from '../../components/resume/resume-header.vue'
import resumeFooter from '../../components/resume/resume-footer.vue'
import { useUserStore } from '../../store/user.store'

export default {
    name: 'resume-customize',

    data() {
        return {
            userStore: useUserStore()
        }
    },

    methods: {
        download() {
            const elResume: HTMLElement | null = document.querySelector('.a4-resume');
            if (elResume) this.userStore.download(elResume)
        },
    },

    components: {
        resumeHeader,
        resumeFooter
    }

}
</script>