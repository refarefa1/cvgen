<template>
    <section ref="template" class="template-no1">
        <div class="personal-info">
            <div class="contact">
                <div class="title">
                    <h1>{{ resume?.fullName }}</h1>
                    <h2>{{ resume?.jobTitle }}</h2>
                </div>
                <div v-if="resume?.email" class="contact-item">
                    <img src="src/assets/images/mail.png" alt="">
                    <p class="mail">{{ resume.email }}</p>
                </div>
                <div v-if="resume?.phone" class="contact-item">
                    <img src="src/assets/images/whatsapp.png" alt="">
                    <p class="phone">{{ resume.phone }}</p>
                </div>
                <div v-if="resume?.address" class="contact-item">
                    <img src="src/assets/images/address.png" alt="">
                    <p class="address">{{ resume?.address }}</p>
                </div>
            </div>

            <div class="img">
                <img v-if="resume?.imgUrl" :src="resume?.imgUrl" alt="">
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import { PropType } from 'vue';
import { Resume } from '../../interfaces/resume-interface';

export default {
    props: {
        resume: Object as PropType<Resume>,
    },
    created() {
        window.addEventListener('resize', this.setTransform)
    },
    mounted() {
        this.setTransform()
    },
    data() {
        return {
            originalWidth: 696,
            vw: window.innerWidth
        }
    },
    methods: {
        setTransform() {
            if (window.innerWidth > 1480) return
            const width = document.querySelector('.a4-resume')!.clientWidth
            const scale = width / this.originalWidth;
            (this.$refs.template as HTMLElement).style.transform = `scale(${scale})`;
            (this.$refs.template as HTMLElement).style.width = (width * (this.originalWidth / width)) + 'px'
        },
    },
    computed: {
    },
    watch: {
        vw() {
            console.log('BABA');
        }
    }
}
</script>