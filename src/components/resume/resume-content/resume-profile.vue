<template>
    <form class="resume-form" :class="{ 'open': isOpen }">

        <div @click="openAccordion" class="resume-title">
            <h1>Profile</h1>
            <p v-if="!isOpen">Edit profile
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

        <div v-if="isOpen" class="resume-profile">
            <div ref="textarea" class="resume-input resume-textarea">
                <CFormTextarea v-model="profile.about" @input="update" name="profile" label="Text" rows="4"
                    placeholder="introduce yourself by pitching your skills & explaining how they can be of value to a company">
                </CFormTextarea>
            </div>
        </div>

    </form>
</template>

<script lang="ts">
import { CFormInput, CFormTextarea } from '@coreui/vue';
import { PropType } from 'vue';
import { Resume } from '../../../interfaces/resume-interface';
import { eventBus } from '../../../services/event.bus.service';
import removeModal from '../remove-modal.vue'

export default {
    props: {
        resume: Object as PropType<Resume>,
    },
    emits: ['update', 'open', 'remove'],
    created() {
        eventBus.on('close-accordion', () => { this.isOpen = false })
        eventBus.on('add-component', (cmp) => {
            if (cmp as any !== 'resume-profile') return
            this.openAccordion()
        })
    },

    data() {
        return {
            isOpen: false,
            isModalOpen: false,
            isRemoving: false,
            profile: { about: '' },

        }
    },
    methods: {
        update() {
            setTimeout(() => {
                const payload = { type: 'profile', val: { ...this.profile } }
                this.$emit('update', payload)
            }, 0)
        },
        openAccordion() {
            this.isOpen = true
            this.profile.about = this.resume?.profile?.about
            this.$emit('open', 'resume-profile')
        },
        edit() {
            this.closeModal()
            this.openAccordion()
        },
        openRemoveModal() {
            this.isRemoving = true
            this.isModalOpen = false
        },
        closeModal() {
            this.isRemoving = false
            this.isModalOpen = false
        },
        remove() {
            this.isRemoving = false
            const payload = { type: 'profile', val: null }
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
        CFormTextarea,
        removeModal
    }
}
</script>