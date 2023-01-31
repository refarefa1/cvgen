<template>
    <section v-if="resume" class="resume-app-container">

        <div class="resume-builder">
            <router-view />
        </div>

        <div class="a4-resume" format="A4">
            <component is="template-no1" :resume="resume"></component>
        </div>
    </section>
</template>

<script lang="ts">
import resumeForm from '../../components/resume/resume-form.vue'
import resumeHeader from '../../components/resume/resume-header.vue'
import templateNo1 from '../../components/templates/template-no1.vue'
import { useUserStore } from '../../store/user.store'
import { useResumeStore } from '../../store/resume.store'

export default {

    created() {
        this.resumeStore.setResume(this.$route.params.id)
    },
    data() {
        return {
            userStore: useUserStore(),
            resumeStore: useResumeStore(),
        }
    },
    computed: {
        user() {
            return this.userStore.loggedinUser || { _id: null }
        },
        resume() {
            return this.resumeStore.resumeToEdit
        },

    },
    components: {
        resumeForm,
        resumeHeader,
        templateNo1
    }

}

</script>