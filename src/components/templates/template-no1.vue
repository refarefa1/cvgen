<template>
    <section class="template-no1">
        <div class="personal-info">
            <div data-scale class="title">
                <h1>{{ resume?.fullName }}</h1>
                <h2>{{ resume?.jobTitle }}</h2>
            </div>
            <div data-scale class="img">
                <img v-if="resume?.imgUrl" :src="resume?.imgUrl" alt="">
            </div>
        </div>
        <div class="contact">
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
    methods: {
        setTransform() {
            if (window.innerWidth > 1480) return
            const scale = window.innerWidth / 1480;
            const els = document.querySelectorAll('[data-scale]');
            els.forEach(el => (el as HTMLElement).style.transform = `scale(${scale})`)
        }
    }
}
</script>