<template>

    <form class="resume-form" :class="{ 'open': isOpen }">

        <div @click="openAccordion" class="resume-title">
            <h1>Personal details</h1>
            <p v-if="!isOpen">Edit personal details
                <span v-svg-icon="'expand'" />
            </p>
            <div @click.stop="toggleModal" class="more-options">
                <span v-svg-icon="'options'"></span>
            </div>
            <div v-if="isModalOpen" v-click-outside="toggleModal" class="options-modal">
                <div @click="edit" class="edit">
                    <span v-svg-icon="'edit'"></span>
                    <h3>Edit</h3>
                </div>
                <div class="remove">
                    <span v-svg-icon="'trash'"></span>
                    <h3>Remove</h3>
                </div>
            </div>

        </div>

        <div v-if="isOpen" class="resume-personal">
            <div v-for="input in inputs" :key="input.label" :class="'resume-input ' + input.class">
                <CFormInput v-model="personal[input.name as keyof Personal]" @keydown.enter="save" @input="update"
                    :name="input.name" :label="input.label" :type="input.type" :placeholder="input.placeholder"
                    aria-label="default input" />
            </div>
            <h1 class="file-label">Upload file</h1>
            <div class="resume-input file-input">
                <span v-svg-icon="'camera'" />
                <CFormInput @change="handleChange($event)" type="file" name="imgUrl" />
            </div>

        </div>

    </form>

</template>

<script lang="ts">
import { CFormInput } from '@coreui/vue';
import { PropType } from 'vue';
import { Personal, Resume } from '../../../interfaces/resume-interface';
import { eventBus } from '../../../services/event.bus.service'

interface FileInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

export default {
    props: {
        resume: Object as PropType<Resume>,
    },
    emits: ['update', 'open', 'save', 'upload'],
    created() {
        eventBus.on('closeAccordion', () => { this.isOpen = false })
    },
    data() {
        return {
            inputs: [
                { name: 'fullName', class: 'name-input', label: "Full name", type: "text", placeholder: "Enter your first and last name" },
                { name: 'jobTitle', class: 'job-input', label: "Job title", type: "text", placeholder: "Enter job title" },
                { name: 'email', class: 'mail-input', label: "Email", type: "email", placeholder: "Enter email" },
                { name: 'phone', class: 'phone-input', label: "Phone", type: "text", placeholder: "Enter Phone" },
                { name: 'address', class: 'address-input', label: "Address", type: "text", placeholder: "City, Country" },
            ],
            personal: { fullName: '', jobTitle: '', email: '', phone: '', address: '', imgUrl: '' },
            isOpen: false,
            isModalOpen: false
        }
    },
    methods: {
        update() {
            setTimeout(() => {
                const payload = { type: 'personal', val: { ...this.personal } }
                this.$emit('update', payload)
            }, 0)
        },
        handleChange(ev: FileInputEvent) {
            if (!ev.target.files) return

            // Just for now until we got backend
            this.personal.imgUrl = URL.createObjectURL(ev.target.files[0])
            this.update()

            // This is for backend
            this.$emit('upload', ev.target.files[0])
        },
        save() {
            this.$emit('save')
        },
        openAccordion() {
            this.isOpen = true
            if (this.resume?.personal) this.personal = this.resume.personal
            this.$emit('open', 'resume-personal')
        },
        toggleModal() {
            this.isModalOpen = !this.isModalOpen
        },
        edit() {
            this.toggleModal()
            this.openAccordion()
        }
    },
    components: {
        CFormInput
    }

}
</script>