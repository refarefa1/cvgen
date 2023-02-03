<template>

    <form class="resume-form" :class="{ 'open': isOpen }">

        <div @click="openAccordion" class="resume-title">
            <h1>Profile</h1>
            <p v-if="!isOpen">Edit profile
                <span><v-icon name="md-keyboardarrowdown"></v-icon></span>
            </p>
        </div>

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
import { Resume } from '../../interfaces/resume-interface';
import { eventBus } from '../../services/event.bus.service';

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
            isOpen: false,
            profile: { about: '' }
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


    },

    components: {
        CFormInput,
        CFormTextarea
    }
}
</script>