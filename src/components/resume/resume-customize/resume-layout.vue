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
                <span v-svg-icon="'username'" />
            </div>
            <SlickList :useDragHandle="isMobile" class="component-list" axis="y" v-model:list="components">
                <SlickItem class="component-preview" v-for="(component, i) in components" :key="component" :index="i">
                    <div @mousedown="setIsDragging(true)" class="component-item">
                        <div class="mobile-drag">
                            <DragHandle>
                                <span v-svg-icon="'drag'"></span>
                            </DragHandle>
                        </div>
                        <span class="desktop-drag" v-svg-icon="'drag'"></span>
                        <span v-svg-icon="getIcon(component)" />
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
import { SlickList, SlickItem, DragHandle } from 'vue-slicksort';

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
                case 'resume-profile': return 'profile'
                case 'resume-education': return 'education'
                case 'resume-experience': return 'experience'
                case 'resume-skills': return 'skill'
                case 'resume-languages': return 'language'
                case 'resume-military': return 'military'
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
    computed: {
        isMobile() {
            const vw = window.innerWidth
            return vw < 500
        }
    },
    components: {
        SlickItem,
        SlickList,
        DragHandle
    },
    watch: {
        components() {
            this.handleDrag()
            this.setIsDragging(false)
        }
    }
}
</script>