<template>
    <form class="resume-form" :class="{ 'open': isOpen }">

        <div @click="openAccordion" class="resume-title">
            <h1>Military service</h1>
            <p v-if="!isOpen">Edit Military service
                <span><v-icon name="md-keyboardarrowdown"></v-icon></span>
            </p>
        </div>


        <div v-if="isOpen" class="resume-military">
            <div v-for="input in inputs" :key="input.label" :class="'resume-input ' + input.class">
                <span v-if="input.type === 'file'"><v-icon name="bi-camera-fill"></v-icon></span>
                <CFormInput v-model="(military as Military)[input.name]" @input="update" :name="input.name"
                    :label="input.label" :type="input.type" :placeholder="input.placeholder"
                    aria-label="default input" />
            </div>
            <div class="resume-input date-input">
                <label>Start date</label>
                <datepicker v-model="military.startDate" @input="handleDate($event, 'startDate')"
                    @update:modelValue="handleDate($event, 'startDate')" />
            </div>
            <div class="resume-input date-input">
                <label>End date</label>
                <datepicker v-model="military.endDate" @input="handleDate($event, 'endDate')"
                    @update:modelValue="handleDate($event, 'startDate')" />
            </div>
        </div>
    </form>

</template>

<script lang="ts">
import { CFormInput } from '@coreui/vue'
import { PropType } from 'vue'
import { Resume, Military } from '../../../interfaces/resume-interface'
import Datepicker from 'vuejs3-datepicker'
import { eventBus } from '../../../services/event.bus.service'

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
                { name: 'role', class: 'role-input', label: "Role", type: "text", placeholder: "Enter your role" },
            ],
            isOpen: false,
            military: { role: '', startDate: 0, endDate: 0 }
        }
    },
    methods: {
        update() {
            setTimeout(() => {
                const payload = { type: 'military', val: { ...this.military } }
                this.$emit('update', payload)
            }, 0)
        },
        openAccordion() {
            this.isOpen = true
            if (this.resume?.military) this.military = this.resume.military
            this.$emit('open', 'resume-military')
        },
        handleDate(val: Date, key: string): void {
            const date: number = Math.round(val.getTime());
            (this.military as Military)[key] = date
            this.update()
        }

    },
    components: {
        CFormInput,
        Datepicker
    }
}
</script>