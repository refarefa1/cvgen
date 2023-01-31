<template>
    <resume-header @download="download" />
    <resume-form v-if="resume" :resume="resume" @updateResume="updateResume" />
    <resume-footer @save="save" />
</template>

<script lang="ts">
import resumeForm from '../../components/resume/resume-form.vue'
import resumeHeader from '../../components/resume/resume-header.vue'
import resumeFooter from '../../components/resume/resume-footer.vue'
import { useUserStore } from '../../store/user.store'

export default {
    name: 'resume-content',

    data() {
        return {
            userStore: useUserStore()
        }
    },
    methods: {
        updateResume(payload: { type: string, val: string }) {
            this.userStore.updateResume(payload)
        },
        download() {
            const elResume: HTMLElement | null = document.querySelector('.a4-resume');
            if (elResume) this.userStore.download(elResume)
        },
        save() {
            // this.
        },

    },
    computed: {
        resume() { return this.userStore.resumeToEdit }
    },

    components: {
        resumeForm,
        resumeHeader,
        resumeFooter
    }
}
</script>