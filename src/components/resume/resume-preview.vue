<template>

    <header class="preview-header">
        <div @click="close" class="back">
            <span class="arrow" v-svg-icon="'expand'"></span>
            <button>Back to editor</button>
            <span class="close" v-svg-icon="'close'"></span>
        </div>
        <div @click="download" class="download">
            <button>Download PDF</button>
        </div>
    </header>

    <div class="a4-resume" format="A4">
        <component is="template-no1" :resume="resume"></component>
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Resume } from '../../interfaces/resume-interface'
import templateNo1 from '../templates/template-no1.vue'
export default {
    name: 'resume-preview',
    emits: ['toggle','download'],
    props: {
        resume: Object as PropType<Resume>
    },
    methods: {
        close() {
            this.$emit('toggle', false)
        },
        download() {
            this.$emit('download')
        }
    },
    components: {
        templateNo1
    }
}
</script>