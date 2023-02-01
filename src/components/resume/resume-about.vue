<template>

    <form class="resume-form" :class="{ 'open': isOpen }">
        <CAccordion>
            <CAccordionItem :item-key="4">
                <CAccordionHeader @click="openAccordion">
                    <h1 class="resume-title">Profile</h1>
                </CAccordionHeader>
                <CAccordionBody>
                    <div class="personal-details">
                        <div v-for="input in inputs" :key="input.label" :class="'resume-input ' + input.class">
                            <span v-if="input.type === 'file'"><v-icon name="bi-camera-fill"></v-icon></span>
                            <CFormInput @change="handleChange($event)" @input="handleInput($event)" :value="input.value"
                                :name="input.name" :label="input.label" :type="input.type"
                                :placeholder="input.placeholder" aria-label="default input" />
                        </div>
                    </div>
                </CAccordionBody>
            </CAccordionItem>
        </CAccordion>
    </form>

</template>

<script lang="ts">
import { CFormFloating, CFormInput, CFormLabel, CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody } from '@coreui/vue';
import { PropType } from 'vue';
import { Resume } from '../../interfaces/resume-interface';

export default {
    props: {
        resume: Object as PropType<Resume>,
    },
    emits: ['updateResume', 'open'],

    data() {
        return {
            inputs: [
                { value: this.resume?.fullName, name: 'fullName', class: 'name-input', label: "Full name", type: "text", placeholder: "Enter your first and last name" },
                { value: this.resume?.jobTitle, name: 'jobTitle', class: 'job-input', label: "Job title", type: "text", placeholder: "Enter job title" },
                { name: 'imgUrl', class: 'file-input', type: "file" },
                { value: this.resume?.email, name: 'email', class: 'mail-input', label: "Email", type: "email", placeholder: "Enter email" },
                { value: this.resume?.phone, name: 'phone', class: 'phone-input', label: "Phone", type: "text", placeholder: "Enter Phone" },
                { value: this.resume?.address, name: 'address', class: 'address-input', label: "Address", type: "text", placeholder: "City, Country" },
            ],
            isOpen: false,
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
            console.log(val)

            const type = 'imgUrl'
            const payload: { type: string, val: string } = { type, val }
            this.$emit('updateResume', payload)
        },
        openAccordion() {
            this.isOpen = true
            this.$emit('open')
        },


    },


    components: {
        CFormFloating,
        CFormInput,
        CFormLabel,
        CAccordion,
        CAccordionBody,
        CAccordionHeader,
        CAccordionItem
    }
}
</script>