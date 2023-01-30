<template>
    <section class="resume-app-container">

        <div class="resume-builder">
            <router-view />
        </div>

        <div class="a4-resume" width="210mm" height="297mm" format="A4"></div>
    </section>
</template>

<script lang="ts">
import resumeForm from '../../components/resume/resume-form.vue'
import resumeHeader from '../../components/resume/resume-header.vue'

export default {

    components: {
        resumeForm,
        resumeHeader
    }

}

</script>