<template>

    <form class="resume-form" :class="{ 'open': isOpen }">

        <div @click="add" class="resume-title">
            <h1>Skills</h1>
            <p v-if="!isOpen">Edit skills
                <span v-svg-icon="'expand'" />
            </p>
        </div>

        <div v-if="isAdding" class="add-info">
            <ul class="resume-cmp-list">
                <li @click="edit(skill)" class="resume-cmp-preview" v-for="skill in resume?.skills" :key="skill._id">
                    <div>
                        <h3>{{ skill.name }}<span v-if="skill.level"></span></h3>
                        <h4>{{ formatSkillLevel(skill.level) }}</h4>
                    </div>
                    <span v-svg-icon="'expand'" />
                </li>
            </ul>
            <button class="add-btn" @click="openAccordion">
                <span v-svg-icon="'plus'" />
                <p>Skill</p>
            </button>
        </div>

        <div v-if="!isAdding && isOpen" class="resume-skills">
            <div v-for="input in inputs" :key="input.label" :class="'resume-input ' + input.class">
                <span v-if="input.type === 'file'" v-svg-icon="'camera'" />
                <CFormInput v-model="skill[input.name as keyof Skill]" @input="update" :name="input.name"
                    :label="input.label" :type="input.type" :placeholder="input.placeholder"
                    aria-label="default input" />
            </div>
            <div class="resume-input level-input">
                <label>Skill level</label>
                <p>Level: <span> {{ formatSkillLevel(skill.level) }} </span></p>
                <div class="level-list">
                    <div @click="handleSkillLevel(i)" v-for="i in 5" :key="i" class="level-preview"
                        :class="{ 'selected': skill.level === i }" />
                </div>
            </div>
        </div>
    </form>

</template>

<script lang="ts">
import { CFormInput, CFormTextarea } from '@coreui/vue';
import { PropType } from 'vue';
import { Skill, Resume } from '../../interfaces/resume-interface';
import { eventBus } from '../../services/event.bus.service';
import { utilService } from '../../services/util.service';

export default {
    props: {
        resume: Object as PropType<Resume>,
    },
    emits: ['update', 'open'],
    created() {
        eventBus.on('close-accordion', () => { this.isOpen = false })
    },
    data() {
        return {
            inputs: [
                { name: 'name', class: 'name-input', label: "Skill", type: "text", placeholder: "Enter skill" },
            ],
            skill: { _id: '', name: '', level: 0 },
            isOpen: false,
            isAdding: false,
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
        openAccordion() {
            this.isAdding = false
            this.$emit('open', 'resume-skills')
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

    components: {
        CFormInput,
        CFormTextarea
    }
}
</script>