<template>
    <section class="resume-app-container">

        <div class="resume-builder">
            <router-view />
        </div>

        <div class="a4-container">
            <resume-preview @download="download" @toggle="toggle" :resume="resume" />
        </div>

        <div class="preview-pdf">
            <button @click="toggle(true)" class="preview-pdf-btn">
                <span v-svg-icon="'preview'"></span>
                <p>Preview PDF</p>
            </button>
        </div>

    </section>
</template>

<script lang="ts">
import resumeForm from '../../components/resume/resume-content/resume-personal.vue'
import resumeHeader from '../../components/resume/resume-header.vue'
import resumePreview from '../../components/resume/resume-preview.vue'
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
            fileStore: useFileStore(),
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
        toggle(isPreviewing: boolean) {
            if (isPreviewing) {
                document.querySelector('body')?.classList.add('no-overflow')
                document.querySelector('.a4-container')?.classList.add('show')
                window.scrollTo(0, 0)
            }
            else {
                document.querySelector('body')?.classList.remove('no-overflow')
                document.querySelector('.a4-container')?.classList.remove('show')
            }
        },
    },
    components: {
        resumeForm,
        resumeHeader,
        resumePreview,
        templateNo1
    }

}

</script>