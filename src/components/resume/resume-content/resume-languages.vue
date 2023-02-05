<template>

    <form class="resume-form" :class="{ 'open': isOpen }">

        <div @click="add" class="resume-title">
            <h1>Languages</h1>
            <p v-if="!isOpen">Edit languages
                <span><v-icon name="md-keyboardarrowdown"></v-icon></span>
            </p>
        </div>

        <div v-if="isAdding" class="add-info">
            <ul class="resume-cmp-list">
                <li @click="edit(language)" class="resume-cmp-preview" v-for="language in resume?.languages"
                    :key="language._id">
                    <div>
                        <h3>{{ language.name }}<span v-if="language.level"></span></h3>
                        <h4>{{ formatLanguageLevel(language.level) }}</h4>
                    </div>
                    <span><v-icon name="md-keyboardarrowdown"></v-icon></span>
                </li>
            </ul>
            <button class="add-btn" @click="openAccordion">
                <span><v-icon name="md-add-outlined"></v-icon></span>
                <p>Language</p>
            </button>
        </div>

        <div v-if="!isAdding && isOpen" class="resume-languages">
            <div v-for="input in inputs" :key="input.label" :class="'resume-input ' + input.class">
                <span v-if="input.type === 'file'"><v-icon name="bi-camera-fill"></v-icon></span>
                <CFormInput v-model="language[input.name as keyof Language]" @input="update" :name="input.name"
                    :label="input.label" :type="input.type" :placeholder="input.placeholder"
                    aria-label="default input" />
            </div>
            <div class="resume-input level-input">
                <label>Language level</label>
                <p>Level: <span> {{ formatLanguageLevel(language.level) }} </span></p>
                <div class="level-list">
                    <div @click="handleLanguageLevel(i)" v-for="i in 5" :key="i" class="level-preview"
                        :class="{ 'selected': language.level === i }" />
                </div>
            </div>
        </div>
    </form>

</template>

<script lang="ts">
import { CFormInput, CFormTextarea } from '@coreui/vue';
import { PropType } from 'vue';
import { Language, Resume } from '../../../interfaces/resume-interface';
import { eventBus } from '../../../services/event.bus.service';
import { utilService } from '../../../services/util.service';

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
                { name: 'name', class: 'name-input', label: "Language", type: "text", placeholder: "Enter language" },
            ],
            language: { _id: '', name: '', level: 0 },
            isOpen: false,
            isAdding: false,
        }
    },
    methods: {
        update() {
            setTimeout(() => {
                const payload = { type: 'languages', val: { ...this.language } }
                this.$emit('update', payload)
            }, 0)
        },
        add() {
            this.language = { _id: utilService.makeId(), name: '', level: 1 }
            this.isAdding = true
            this.isOpen = true
        },
        edit(language: Language) {
            this.language = { ...language }
            this.openAccordion()
        },
        openAccordion() {
            this.isAdding = false
            this.$emit('open', 'resume-languages')
        },
        handleLanguageLevel(level: number) {
            this.language.level = level
            this.update()
        },
        formatLanguageLevel(level: number) {
            switch (level) {
                case 1: return 'Beginner'
                case 2: return 'Elementary'
                case 3: return 'Intermediate proficiency'
                case 4: return 'Highly proficient'
                case 5: return 'Native'
            }
        }
    },

    components: {
        CFormInput,
        CFormTextarea
    }
}
</script>