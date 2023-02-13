<template>
    <form class="resume-form" :class="{ 'open': isOpen }">

        <div @click="openAccordion" class="resume-title">
            <h1>Military service</h1>
            <p v-if="!isOpen">Edit Military service
                <span v-svg-icon="'expand'" />
            </p>
            <div @click.stop="isModalOpen = !isModalOpen" class="more-options">
                <span v-svg-icon="'options'"></span>
            </div>
            <div v-if="isModalOpen" v-click-outside="closeModal" class="options-modal">
                <div @click="edit" class="edit">
                    <span v-svg-icon="'edit'"></span>
                    <h3>Edit</h3>
                </div>
                <div @click.stop="openRemoveModal" class="remove">
                    <span v-svg-icon="'trash'"></span>
                    <h3>Remove</h3>
                </div>
                <div @click.stop="closeModal" class="cancel-modal">
                    <h3>Cancel</h3>
                </div>
            </div>
            <div v-if="isOptionsOpen || isRemoving" @click.stop="closeModal" class="black-screen" />
        </div>

        <remove-modal v-if="isRemoving" @cancel="closeModal" @remove="remove" />


        <div v-if="isOpen" class="resume-military">
            <div v-for="input in inputs" :key="input.label" :class="'resume-input ' + input.class">
                <span v-svg-icon="'camera'" v-if="input.type === 'file'" />
                <CFormInput v-model="(military as Military)[input.name]" @keydown.enter="save" @input="update"
                    :name="input.name" :label="input.label" :type="input.type" :placeholder="input.placeholder"
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
import removeModal from '../remove-modal.vue'

export default {
    props: {
        resume: Object as PropType<Resume>,
    },
    emits: ['update', 'open', 'save', 'remove'],
    created() {
        eventBus.on('closeAccordion', () => { this.isOpen = false })
    },
    data() {
        return {
            inputs: [
                { name: 'role', class: 'role-input', label: "Role", type: "text", placeholder: "Enter your role" },
            ],
            isOpen: false,
            isModalOpen: false,
            isRemoving: false,
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
        save() {
            this.$emit('save')
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
        },
        openRemoveModal() {
            this.isRemoving = true
            this.isModalOpen = false
        },
        closeModal() {
            this.isModalOpen = false
            this.isRemoving = false
        },
        edit() {
            this.closeModal()
            this.openAccordion()
        },
        remove() {
            const payload = { type: 'military', val: null }
            this.$emit('remove', payload)
            this.closeModal()
        }
    },
    computed: {
        isOptionsOpen() {
            return (this.isModalOpen && window.innerWidth < 500)
        }
    },
    components: {
        CFormInput,
        Datepicker,
        removeModal
    }
}
</script>