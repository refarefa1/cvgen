<template>

    <form class="resume-form" :class="{ 'open': isOpen }">

    </form>

</template>

<script lang="ts">
import { CFormInput } from '@coreui/vue';
import { PropType } from 'vue';
import { Resume } from '../../interfaces/resume-interface';

export default {
    props: {
        resume: Object as PropType<Resume>,
    },
    emits: ['update', 'open'],

    data() {
        return {
            isOpen: false,
        }
    },
    methods: {


    },


    components: {
        CFormInput,
    }
}
</script>