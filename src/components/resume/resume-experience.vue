<template>
    <form class="resume-form" :class="{ 'open': isOpen }">

        <div @click="add" class="resume-title">
            <h1>Experience</h1>
            <p v-if="!isOpen">Edit experience
                <span><v-icon name="md-keyboardarrowdown"></v-icon></span>
            </p>
        </div>

        <div v-if="isAdding" class="add-info">
            <ul class="resume-cmp-list">
                <li @click="edit(ex)" class="resume-cmp-preview" v-for="ex in resume?.experience" :key="ex._id">
                    <h3>{{ ex.employer }}<span v-if="ex.jobTitle">,</span></h3>
                    <h4>{{ ex.jobTitle }}</h4>
                </li>
            </ul>
            <button class="add-btn" @click="openAccordion">
                <span><v-icon name="md-add-outlined"></v-icon></span>
                <p>Experience</p>
            </button>
        </div>


        <div v-if="!isAdding && isOpen" class="resume-experience">
            <div v-for="input in inputs" :key="input.label" :class="'resume-input ' + input.class">
                <span v-if="input.type === 'file'"><v-icon name="bi-camera-fill"></v-icon></span>
                <CFormInput v-model="(experience as Experience)[input.name]" @input="update" :name="input.name"
                    :label="input.label" :type="input.type" :placeholder="input.placeholder"
                    aria-label="default input" />
            </div>
            <div class="resume-input date-input">
                <label>Start date</label>
                <datepicker v-model="experience.startDate" @input="handleDate($event, 'startDate')"
                    @update:modelValue="handleDate($event, 'startDate')" />
            </div>
            <div class="resume-input date-input">
                <label>End date</label>
                <datepicker v-model="experience.endDate" @input="handleDate($event, 'endDate')"
                    @update:modelValue="handleDate($event, 'startDate')" />
            </div>
        </div>
    </form>

</template>

<script lang="ts">
import { CFormInput } from '@coreui/vue'
import { PropType } from 'vue'
import { Resume, Experience } from '../../interfaces/resume-interface'
import Datepicker from 'vuejs3-datepicker'
import { utilService } from '../../services/util.service'
import { eventBus } from '../../services/event.bus.service'

export default {
    props: {
        resume: Object as PropType<Resume>,
    },
    emits: ['update', 'open'],
    created() {
        eventBus.on('closeAccordion', () => { this.isOpen = false })
    },
    data() {
        return {
            inputs: [
                { name: 'employer', class: 'employer-input', label: "Employer", type: "text", placeholder: "Enter employer" },
                { name: 'jobTitle', class: 'job-input', label: "Job Title", type: "text", placeholder: "Enter job title" },
                { name: 'city', class: 'city-input', label: "City", type: "email", placeholder: "Enter City" },
                { name: 'country', class: 'country-input', label: "Country", type: "text", placeholder: "Enter Country" },
            ],
            isOpen: false,
            isAdding: false,
            experience: { _id: '', employer: '', jobTitle: '', city: '', country: '', startDate: 0, endDate: 0 }
        }
    },
    methods: {
        update() {
            setTimeout(() => {
                const payload = { type: 'experience', val: { ...this.experience } }
                this.$emit('update', payload)
            }, 0)
        },
        add() {
            this.experience = { _id: utilService.makeId(), employer: '', jobTitle: '', city: '', country: '', startDate: 0, endDate: 0 }
            this.isAdding = true
            this.isOpen = true
        },
        edit(ex: Experience) {
            (this.experience as Experience) = { ...ex }
            this.openAccordion()
        },
        openAccordion() {
            this.isAdding = false
            this.$emit('open', 'resume-experience')
        },
        handleDate(val: Date, key: string): void {
            console.log('handling');

            const date: number = Math.round(val.getTime());
            (this.experience as Experience)[key] = date
            this.update()
        }

    },


    components: {
        CFormInput,
        Datepicker
    }
}
</script>