<template>
    <form class="resume-form" :class="{ 'open': isOpen }">

        <div @click="add" class="resume-title">
            <h1>Experience</h1>
            <p v-if="!isOpen">Edit experience
                <span v-svg-icon="'expand'" />
            </p>
            <div @click.stop="toggleModal" class="more-options">
                <span v-svg-icon="'options'"></span>
            </div>
            <div v-if="isModalOpen" v-click-outside="toggleModal" class="options-modal">
                <div @click="open" class="edit">
                    <span v-svg-icon="'edit'"></span>
                    <h3>Edit</h3>
                </div>
                <div class="remove">
                    <span v-svg-icon="'trash'"></span>
                    <h3>Remove</h3>
                </div>
                <div @click.stop="toggleModal" class="cancel-modal">
                    <h3>Cancel</h3>
                </div>
            </div>
            <div v-if="isModalOpen" @click.stop="toggleModal" class="black-screen" />

        </div>

        <div v-if="isAdding" class="add-info">
            <ul class="resume-cmp-list">
                <li @click="edit(ex)" class="resume-cmp-preview" v-for="ex in resume?.experience" :key="ex._id">
                    <div>
                        <h3>{{ ex.employer }}<span v-if="ex.jobTitle">,</span></h3>
                        <h4>{{ ex.jobTitle }}</h4>
                    </div>
                    <span v-svg-icon="'expand'" />
                </li>
            </ul>
            <button class="add-btn" @click="openAccordion">
                <span v-svg-icon="'plus'" />
                <p>Experience</p>
            </button>
            <p @click="close" class="close-btn">Close experience
                <span v-svg-icon="'expand'" />
            </p>
        </div>


        <div v-if="!isAdding && isOpen" class="resume-experience">
            <div v-for="input in inputs" :key="input.label" :class="'resume-input ' + input.class">
                <span v-svg-icon="'camera'" v-if="input.type === 'file'" />
                <CFormInput v-model="(experience as Experience)[input.name]" @keydown.enter="save" @input="update"
                    :name="input.name" :label="input.label" :type="input.type" :placeholder="input.placeholder"
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
import { Resume, Experience } from '../../../interfaces/resume-interface'
import Datepicker from 'vuejs3-datepicker'
import { utilService } from '../../../services/util.service'
import { eventBus } from '../../../services/event.bus.service'

export default {
    props: {
        resume: Object as PropType<Resume>,
    },
    emits: ['update', 'open', 'save'],
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
            isModalOpen: false,
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
        save() {
            this.$emit('save')
        },
        openAccordion() {
            this.isAdding = false
            this.$emit('open', 'resume-experience')
        },
        toggleModal() {
            this.isModalOpen = !this.isModalOpen
        },
        open() {
            this.toggleModal()
            this.add()
        },
        handleDate(val: Date, key: string): void {
            console.log('handling');

            const date: number = Math.round(val.getTime());
            (this.experience as Experience)[key] = date
            this.update()
        },
        close() {
            this.isAdding = false
            this.isOpen = false
        }

    },


    components: {
        CFormInput,
        Datepicker
    }
}
</script>