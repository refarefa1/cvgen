<template>
    <form class="resume-form">
        <h1 class="resume-title">Edit personal details</h1>
        <div class="personal-details">
            <div v-for="input in inputs" :key="input.label" :class="'resume-input ' + input.class">
                <span v-if="input.type === 'file'"><v-icon name="bi-camera-fill"></v-icon></span>
                <CFormInput @change="handleChange($event)" @input="handleInput($event)" :name="input.name"
                    :label="input.label" :type="input.type" :placeholder="input.placeholder"
                    aria-label="default input" />
            </div>
        </div>
    </form>

</template>

<script lang="ts">
import { CFormFloating, CFormInput, CFormLabel } from '@coreui/vue';

export default {
    emits: ['updateResume'],

    data() {
        return {
            inputs: [
                { name: 'fullName', class: 'name-input', label: "Full name", type: "text", placeholder: "Enter your first and last name" },
                { name: 'jobTitle', class: 'job-input', label: "Job title", type: "text", placeholder: "Enter job title" },
                { name: 'imgUrl', class: 'file-input', type: "file" },
                { name: 'email', class: 'mail-input', label: "Email", type: "email", placeholder: "Enter email" },
                { name: 'phone', class: 'phone-input', label: "Phone", type: "number", placeholder: "Enter Phone" },
                { name: 'address', class: 'address-input', label: "Address", type: "text", placeholder: "City, Country" },
            ],
        }
    },
    methods: {
        handleInput(ev: InputEvent) {
            const val = (ev.target as HTMLInputElement).value
            const type = (ev.target as HTMLInputElement).name
            const payload: { type: string, val: string } = { type, val }
            this.$emit('updateResume', payload)
        },
        handleChange(ev: any) {
            if (!ev.target.files) return
            const val = URL.createObjectURL(ev.target.files[0])
            const type = 'imgUrl'
            const payload: { type: string, val: string } = { type, val }
            this.$emit('updateResume', payload)
        }
    },


    components: {
        CFormFloating,
        CFormInput,
        CFormLabel
    }
}
</script>