<template>
    <resume-header />
    <resume-form />
</template>

<script lang="ts">
import resumeForm from '../../components/resume/resume-form.vue'
import resumeHeader from '../../components/resume/resume-header.vue'

export default {
    name: 'resume-content',

    components: {
        resumeForm,
        resumeHeader
    }
}
</script>