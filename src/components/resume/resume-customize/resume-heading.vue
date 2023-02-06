<template>

    <section class="resume-heading">
        <div class="title">
            <h1>Heading</h1>
        </div>
        <div class="heading-style">
            <div class="sub-title">
                <h2>Style</h2>
            </div>
            <div class="style-options">
                <div @click="setHeading('underline')" class="option"
                    :class="{ 'selected': resume?.style.heading.style === 'underline' }">
                    <div class="shape">
                        <div class="fill-rect" />
                        <div class="long-line" />
                    </div>
                </div>
                <div @click="setHeading('center')" class="option"
                    :class="{ 'selected': resume?.style.heading.style === 'center' }">
                    <div class="shape center">
                        <div class="rect">
                            <div class="fill-rect" />
                        </div>
                    </div>
                </div>
                <div @click="setHeading('normal')" class="option"
                    :class="{ 'selected': resume?.style.heading.style === 'normal' }">
                    <div class="shape">
                        <div class="fill-rect" />
                    </div>
                </div>
                <div @click="setHeading('bordered')" class="option"
                    :class="{ 'selected': resume?.style.heading.style === 'bordered' }">
                    <div class="shape center">
                        <div class="long-line" />
                        <div class="fill-rect" />
                        <div class="long-line" />
                    </div>
                </div>
            </div>
        </div>
        <div class="heading-capitalize">
            <div class="sub-title">
                <h2>Capitalization</h2>
            </div>
            <div class="capitalize-options">
                <div @click="capitalize('capitalize')" class="option"
                    :class="{ 'selected': resume?.style.heading.capitalization === 'capitalize' }">
                    <p>Capitalize</p>
                </div>
                <div @click="capitalize('uppercase')" class="option"
                    :class="{ 'selected': resume?.style.heading.capitalization === 'uppercase' }">
                    <p>Uppercase</p>
                </div>
            </div>
        </div>
        <div class="heading-color">
            <div class="sub-title">
                <h2>Color</h2>
            </div>
            <div class="color-picker">
                <input v-model="color" @change="colorizeHeading()" type="color" name="color-picker" />
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Resume } from '../../../interfaces/resume-interface';

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
            isDragging: false,
            color: '#000000'
        }
    },
    methods: {
        capitalize(option: string) {
            const heading = this.resume?.style.heading
            const payload = { type: 'heading', val: { ...heading, capitalization: option } }
            this.$emit('update', payload)
        },
        setHeading(option: string) {
            const heading = this.resume?.style.heading
            const payload = { type: 'heading', val: { ...heading, style: option } }
            this.$emit('update', payload)
        },
        colorizeHeading() {
            const heading = this.resume?.style.heading
            const payload = { type: 'heading', val: { ...heading, headingColor: this.color } }
            this.$emit('update', payload)
        }
    },
}
</script>