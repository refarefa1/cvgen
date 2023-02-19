<template>
    <section class="resume-customize-languages">
        <h1 class="languages-title">Languages</h1>
        <div class="options">
            <div @click="update('grid')" :class="{ 'selected': resume?.style.languages.display === 'grid' }" class="option">
                <p>Grid</p>
            </div>
            <div @click="update('bubble')" :class="{ 'selected': resume?.style.languages.display === 'bubble' }"
                class="option">
                <p>Bubble</p>
            </div>
        </div>
</section>
</template>


<script lang="ts">
import { PropType } from 'vue';
import { Resume } from '../../../interfaces/resume-interface';

export default {
    name: 'resume-skills-languages',
    emits: ['update'],
    props: {
        resume: Object as PropType<Resume>,
    },
    methods: {
        update(display: string) {
            const payload = { type: 'language-style', val: { display } }
            this.$emit('update', payload)
        }
    }
}
</script>