<template>
    <form class="resume-form">
        <div class="personal-details">
            <div v-for="input in inputs" :key="input.label" :class="'resume-input ' + input.class">
                <span v-if="input.type === 'file'"><v-icon name="bi-camera-fill"></v-icon></span>
                <CFormInput :label="input.label" :type="input.type" :placeholder="input.placeholder"
                    aria-label="default input" />
            </div>
        </div>
    </form>

</template>

<script lang="ts">
import { CFormFloating, CFormInput, CFormLabel } from '@coreui/vue';

export default {

    data() {
        return {
            inputs: [
                { class: 'name-input', label: "Full name", type: "text", placeholder: "Enter your first and last name" },
                { class: 'job-input', label: "Job title", type: "text", placeholder: "Enter job title" },
                { class: 'file-input', type: "file", placeholder: "" },
                { class: 'mail-input', label: "Email", type: "email", placeholder: "Enter email" },
                { class: 'phone-input', label: "Phone", type: "number", placeholder: "Enter Phone" },
                { class: 'address-input', label: "Address", type: "text", placeholder: "City, Country" },
            ],
        }
    },


    components: {
        CFormFloating,
        CFormInput,
        CFormLabel
    }
}
</script>