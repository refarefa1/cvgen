<template>
    <section class="resume-app-container">

        <div class="resume-builder">
            <router-view />
        </div>

        <div class="a4-container">
            <div class="a4-resume" format="A4">
                <component is="template-no1" :resume="resume"></component>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import resumeForm from '../../components/resume/resume-personal.vue'
import resumeHeader from '../../components/resume/resume-header.vue'
import templateNo1 from '../../components/templates/template-no1.vue'
import { useUserStore } from '../../store/user.store'
import { useResumeStore } from '../../store/resume.store'
import { useFileStore } from '../../store/file.store'

export default {
    name: 'resume-app',

    created() {
        this.resumeStore.query(this.$route.params.id)
    },
    data() {
        return {
            userStore: useUserStore(),
            resumeStore: useResumeStore(),
            fileStore: useFileStore()
        }
    },
    computed: {
        user() {
            return this.userStore.loggedinUser
        },
        resume() {
            return this.resumeStore.resumeToEdit
        },

    },
    methods: {
        download() {
            const elResume: HTMLElement | null = document.querySelector('.a4-resume');
            if (elResume) this.fileStore.download(elResume)
        },
    },
    components: {
        resumeForm,
        resumeHeader,
        templateNo1
    }

}

</script>