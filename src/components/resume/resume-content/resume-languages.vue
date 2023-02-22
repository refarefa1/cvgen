<template>
    <form class="resume-form" :class="{ 'open': isOpen }">

        <div @click="add" class="resume-title">
            <h1>Languages</h1>
            <p v-if="!isOpen">Edit languages
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

        <div v-if="isAdding" class="add-info">
            <ul class="resume-cmp-list">
                <li @click="edit(language)" class="resume-cmp-preview" v-for="language in resume?.languages"
                    :key="language._id">
                    <div>
                        <h3>{{ language.name }}<span v-if="language.level"></span></h3>
                        <h4>{{ formatLanguageLevel(language.level) }}</h4>
                    </div>
                    <span class="remove" title="Remove" @click.stop="removeDeep(language._id)" v-svg-icon="'trash'"></span>
                </li>
            </ul>
            <button class="add-btn" @click="openAccordion">
                <span v-svg-icon="'plus'" />
                <p>Language</p>
            </button>
        </div>

        <remove-modal v-if="isRemoving" @cancel="closeModal" @remove="remove" />

        <div v-if="!isAdding && isOpen" class="resume-languages">
            <div v-for="input in inputs" :key="input.label" :class="'resume-input ' + input.class">
                <span v-svg-icon="'camera'" v-if="input.type === 'file'" />
                <CFormInput v-model="language[input.name as keyof Language]" @keydown.enter.prevent="save" @input="update"
                    :name="input.name" :label="input.label" :type="input.type" :placeholder="input.placeholder"
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
import removeModal from '../remove-modal.vue';


export default {
    props: {
        resume: Object as PropType<Resume>,
    },
    emits: ['update', 'open', 'save', 'remove'],
    created() {
        eventBus.on('save', () => {
            if (!this.isOpen) return
            this.save()
        })
        eventBus.on('close-accordion', () => { this.isOpen = false })
        eventBus.on('add-component', (cmp) => {
            if (cmp as any !== 'resume-languages') return
            this.add()
            this.openAccordion()
        })
    },
    data() {
        return {
            inputs: [
                { name: 'name', class: 'name-input', label: "Language", type: "text", placeholder: "Enter language" },
            ],
            language: { _id: '', name: '', level: 0 },
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
        save() {
            if (!this.language.name) {
                eventBus.showErrorMsg('Input is required')
                return
            }
            this.$emit('save')
        },
        close() {
            this.isAdding = false
            this.isOpen = false
        },
        remove() {
            const val = this.selected
            const payload = { type: 'languages', val }
            this.$emit('remove', payload)
            this.closeModal()
        },
        removeDeep(id: string) {
            this.selected = id
            this.openRemoveModal()
        },
        openAccordion() {
            this.isAdding = false
            this.$emit('open', 'resume-languages')
        },
        openRemoveModal() {
            this.isRemoving = true
            this.isModalOpen = false
            this.selected = null
        },
        closeModal() {
            this.isModalOpen = false
            this.isRemoving = false
        },
        open() {
            this.isModalOpen = false
            this.add()
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