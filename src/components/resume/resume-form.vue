<template>

    <form class="resume-form">
        <CFormInput label="Full name" type="text" placeholder="Enter your first and last name"
            aria-label="default input example" />
    </form>

</template>

<script lang="ts">
import { CFormFloating, CFormInput, CFormLabel } from '@coreui/vue';

export default {


    components: {
        CFormFloating,
        CFormInput,
        CFormLabel
    }
}
</script>