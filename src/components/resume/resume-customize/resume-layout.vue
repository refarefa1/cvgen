<template>

    <section class="resume-layout">
        <div class="title">
            <h1>Layout</h1>
        </div>
        <div class="arrange-layout">
            <div class="sub-title">
                <h2>Rearrange sections</h2>
            </div>
            <div class="component-item disabled">
                <span><v-icon name="fa-regular-user"></v-icon></span>
            </div>
            <SlickList axis="y" v-model:list="components">
                <SlickItem v-for="(component, i) in components" :key="component" :index="i">
                    <div @mousedown="setIsDragging(true)" class="component-item">
                        <span><v-icon name="md-dragindicator-sharp"></v-icon></span>
                        <span><v-icon :name="getIcon(component)"></v-icon></span>
                        <h3>{{ formatName(component) }}</h3>
                    </div>
                </SlickItem>
            </SlickList>
        </div>
    </section>
    
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Resume } from '../../../interfaces/resume-interface';
import { SlickList, SlickItem } from 'vue-slicksort';



export default {
    name: 'resume-layout',
    emits: ['update'],
    props: {
        resume: Object as PropType<Resume>,
    },
    created() {
        this.components = this.resume?.components as string[]
    },
    data() {
        return {
            components: [] as string[],
            isDragging: false
        }
    },
    methods: {
        getIcon(cmp: string) {
            switch (cmp) {
                case 'resume-profile': return 'ri-profile-line'
                case 'resume-education': return 'co-education'
                case 'resume-experience': return 'la-suitcase-solid'
                case 'resume-skills': return 'gi-skills'
                case 'resume-languages': return 'io-earth'
                case 'resume-military': return 'md-militarytech-outlined'
            }
        },
        formatName(cmp: string) {
            switch (cmp) {
                case 'resume-profile': return 'Profile'
                case 'resume-education': return 'Education'
                case 'resume-experience': return 'Experience'
                case 'resume-skills': return 'Skills'
                case 'resume-languages': return 'Languages'
                case 'resume-military': return 'Military service'
            }
        },
        setIsDragging(isDragging: boolean) {
            this.isDragging = isDragging
            const body = document.querySelector('body')
            if (isDragging) body?.classList.add('dragging')
            else body?.classList.remove('dragging')
        },
        handleDrag() {
            const payload = { type: 'arrange', val: [...this.components] }
            this.$emit('update', payload)
        }
    },
    components: {
        SlickItem,
        SlickList
    },
    watch: {
        components() {
            this.handleDrag()
            this.setIsDragging(false)
        }
    }
}
</script>