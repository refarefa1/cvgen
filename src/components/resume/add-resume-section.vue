<template>

    <section class="add-section">

        <div v-if="componentsToAdd.length" class="add-sect-cta">
            <button @click="isOpen = !isOpen" class="add-sect-btn">
                <span v-svg-icon="'plus'" v-if="!isOpen" />
                <p>{{ isOpen?'Cancel': 'Add Content' }}</p>
            </button>
        </div>


        <div v-if="isOpen" class="modal-container">
            <div class="add-sect-modal">
                <ul class="modal-content-list">
                    <li @click="addComponent(component.type)" v-for="component in componentsToAdd" :key="component.type"
                        class="modal-content-preview">
                        <div class="preview-header">
                            <span v-svg-icon="`${component.icon}`"></span>
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
                { type: 'resume-profile', name: 'Profile', icon: 'profile', description: 'Make a great first impression by presenting yourself in a few sentences.' },
                { type: 'resume-education', name: 'Education', icon: 'education', description: 'Show off your primary education, college degrees & exchange semesters.' },
                { type: 'resume-experience', name: 'Experience', icon: 'experience', description: 'A place to highlight your professional experience - including internships.' },
                { type: 'resume-skills', name: 'Skills', icon: 'skill', description: 'List your technical, managerial or soft skills in this section.' },
                { type: 'resume-languages', name: 'Languages', icon: 'language', description: 'You speak more than one language? Make sure to list them here.' },
                { type: 'resume-military', name: 'Military service', icon: 'military', description: 'If you served in the army, why not state it?' },
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
            if (!components) return []
            const componentsToShow = this.components.filter(c => !components?.includes(c.type))
            return componentsToShow
        }
    }


}
</script>