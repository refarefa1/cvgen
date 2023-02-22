<template>
    <form class="resume-form" :class="{ 'open': isOpen }">

        <div @click="add" class="resume-title">
            <h1>Skills</h1>
            <p v-if="!isOpen">Edit skills
                <span v-svg-icon="'expand'" />
            </p>
            <span v-svg-icon="'expand'" v-if="isAdding" @click.stop="close" class="close-btn" />
            <div @click.stop="isModalOpen = true" class="more-options">
                <span v-svg-icon="'options'"></span>
            </div>
            <div v-if="isModalOpen" v-click-outside="closeModal" class="options-modal">
                <div @click="open" class="edit">
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

        <div v-if="isAdding" class="add-info">
            <ul class="resume-cmp-list">
                <li @click="edit(skill)" class="resume-cmp-preview" v-for="skill in resume?.skills" :key="skill._id">
                    <div>
                        <h3>{{ skill.name }}<span v-if="skill.level"></span></h3>
                        <h4>{{ formatSkillLevel(skill.level) }}</h4>
                    </div>
                    <span class="remove" title="Remove" @click.stop="removeDeep(skill._id)" v-svg-icon="'trash'"></span>
                </li>
            </ul>
            <button class="add-btn" @click="openAccordion">
                <span v-svg-icon="'plus'" />
                <p>Skill</p>
            </button>
        </div>

        <div v-if="!isAdding && isOpen" class="resume-skills">
            <div v-for="input in inputs" :key="input.label" :class="'resume-input ' + input.class">
                <span v-svg-icon="'camera'" v-if="input.type === 'file'" />
                <CFormInput v-model="skill[input.name as keyof Skill]" @keydown.enter.prevent="save" @input="update"
                    :name="input.name" :label="input.label" :type="input.type" :placeholder="input.placeholder"
                    aria-label="default input" />
            </div>
            <div class="resume-input level-input">
                <label>Skill level</label>
                <p>Level: <span> {{ formatSkillLevel(skill.level) }} </span></p>
                <div class="level-list">
                    <div @click="handleSkillLevel(i)" v-for="i in 5" :key="i" class="level-preview"
                        :class="{ 'selected': skill.level >= i }" />
                </div>
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import { CFormInput, CFormTextarea } from '@coreui/vue';
import { PropType } from 'vue';
import { Skill, Resume } from '../../../interfaces/resume-interface';
import { eventBus } from '../../../services/event.bus.service';
import { utilService } from '../../../services/util.service';
import removeModal from '../remove-modal.vue';


export default {
    props: {
        resume: Object as PropType<Resume>,
    },
    emits: ['update', 'open', 'save', 'remove'],
    created() {
        eventBus.on('close-accordion', () => { this.isOpen = false })
        eventBus.on('add-component', (cmp) => {
            if (cmp as any !== 'resume-skills') return
            this.add()
            this.openAccordion()
        })
    },
    data() {
        return {
            inputs: [
                { name: 'name', class: 'name-input', label: "Skill", type: "text", placeholder: "Enter skill" },
            ],
            skill: { _id: '', name: '', level: 0 },
            isOpen: false,
            isModalOpen: false,
            isRemoving: false,
            isAdding: false,
            selected: null as string | null
        }
    },
    methods: {
        update() {
            setTimeout(() => {
                const payload = { type: 'skills', val: { ...this.skill } }
                this.$emit('update', payload)
            }, 0)
        },
        add() {
            this.skill = { _id: utilService.makeId(), name: '', level: 1 }
            this.isAdding = true
            this.isOpen = true
        },
        edit(skill: Skill) {
            this.skill = { ...skill }
            this.openAccordion()
        },
        save() {
            this.$emit('save')
        },
        close() {
            this.isAdding = false
            this.isOpen = false
        },
        remove() {
            const val = this.selected
            const payload = { type: 'skills', val }
            this.$emit('remove', payload)
            this.closeModal()
        },
        removeDeep(id: string) {
            this.selected = id
            this.openRemoveModal()
        },
        openAccordion() {
            this.isAdding = false
            this.$emit('open', 'resume-skills')
        },
        openRemoveModal() {
            this.isRemoving = true
            this.isModalOpen = false
        },
        closeModal() {
            this.isModalOpen = false
            this.isRemoving = false
            this.selected = null
        },
        open() {
            this.isModalOpen = false
            this.add()
        },
        handleSkillLevel(level: number) {
            this.skill.level = level
            this.update()
        },
        formatSkillLevel(level: number) {
            switch (level) {
                case 1: return 'Novice'
                case 2: return 'Beginner'
                case 3: return 'Skillful'
                case 4: return 'Experienced'
                case 5: return 'Expert'
            }
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