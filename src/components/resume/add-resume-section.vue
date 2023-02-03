<template>

    <section class="add-section">

        <div v-if="componentsToAdd.length" class="add-sect-cta">
            <button @click="isOpen = !isOpen" class="add-sect-btn">
                <span v-if="!isOpen"><v-icon name="md-add-outlined"></v-icon></span>
                <p>{{ isOpen?'Cancel': 'Add Content' }}</p>
            </button>
        </div>


        <div v-if="isOpen" class="modal-container">
            <div class="add-sect-modal">
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
                { type: 'resume-profile', name: 'Profile', icon: 'ri-profile-line', description: 'Make a great first impression by presenting yourself in a few sentences.' },
                { type: 'resume-education', name: 'Education', icon: 'co-education', description: 'Show off your primary education, college degrees & exchange semesters.' },
                { type: 'resume-experience', name: 'Experience', icon: 'la-suitcase-solid', description: 'A place to highlight your professional experience - including internships.' },
                { type: 'resume-skills', name: 'Skills', icon: 'gi-skills', description: 'List your technical, managerial or soft skills in this section.' },
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