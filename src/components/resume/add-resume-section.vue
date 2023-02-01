<template>

    <section class="add-section">

        <div class="add-sect-cta">
            <button @click="isOpen = true" class="add-sect-btn">
                <span><v-icon name="io-add-circle"></v-icon></span>
                <p>Add Content</p>
            </button>
        </div>


        <div v-if="isOpen" class="modal-container">
            <div class="add-sect-modal">
                <div class="add-modal-header">
                    <h1>Add Content</h1>
                    <span @click="isOpen = false"><v-icon name="fa-window-close"></v-icon></span>
                </div>

                <ul class="modal-content-list">
                    <li @click="addComponent(component.type)" v-for="component in componentsToAdd" :key="component.type"
                        class="modal-content-preview">
                        <div class="preview-header">
                            <span><v-icon :name="component.icon" /></span>
                            <p>{{ component.name }}</p>
                        </div>
                        <div class="preview-desc">
                            <p>{{ component.description }}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div @click="isOpen = false" class="black-screen" />
        </div>
    </section>

</template>

<script lang="ts">
import { PropType } from 'vue';
import { Resume } from '../../interfaces/resume-interface';

export default {
    name: 'add-resume-section',
    emits: ['add'],
    props: {
        resume: Object as PropType<Resume>,
    },

    data() {
        return {
            isOpen: false,
            components: [
                { type: 'resume-education', name: 'Education', icon: 'co-education', description: 'Show off your primary education, college degrees & exchange semesters.' },
                { type: 'resume-profile', name: 'Profile', icon: 'ri-profile-line', description: 'Make a great first impression by presenting yourself in a few sentences.' },
            ]
        }
    },
    methods: {
        addComponent(cmp: string) {
            this.isOpen = false
            this.$emit('add', cmp)
        }
    },

    computed: {
        componentsToAdd() {
            const components = this.resume?.components
            const componentsToShow = this.components.filter(c => !components?.includes(c.type))
            return componentsToShow
        }
    }


}
</script>