<template>
    <section ref="template" class="template-no1">
        <div class="personal-info">
            <div class="contact">
                <div class="title">
                    <h1>{{ resume?.personal?.fullName }}</h1>
                    <h2>{{ resume?.personal?.jobTitle }}</h2>
                </div>
                <div v-if="resume?.personal?.email" class="contact-item">
                    <img src="src/assets/images/mail.png" alt="">
                    <p class="mail">{{ resume.personal.email }}</p>
                </div>
                <div v-if="resume?.personal?.phone" class="contact-item">
                    <img src="src/assets/images/whatsapp.png" alt="">
                    <p class="phone">{{ resume.personal.phone }}</p>
                </div>
                <div v-if="resume?.personal?.address" class="contact-item">
                    <img src="src/assets/images/address.png" alt="">
                    <p class="address">{{ resume.personal?.address }}</p>
                </div>
            </div>

            <div class="img">
                <img v-if="resume?.personal?.imgUrl" :src="resume.personal.imgUrl" alt="">
            </div>
        </div>
        <div v-if="resume?.education?.length" class="education-info">
            <div class="title">
                <h1>Education</h1>
            </div>
            <ul class="education-list">
                <li v-for="(ed, idx) in resume?.education" :key="idx" class="education-preview">
                    <div class="education-degree">
                        <h2>{{ ed.degree }}</h2>
                        <h3>{{ ed.school }}</h3>
                    </div>
                    <div class="education-location">
                        <h2>{{ ed.city }}<span v-if="ed.country">,</span></h2>
                        <h3>{{ ed.country }}</h3>
                    </div>
                    <div class="education-desc">
                        <p>{{ ed.description }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="resume?.profile?.about" class="profile-info">
            <div class="title">
                <h1>Profile</h1>
            </div>
            <div class="education-about-txt">
                <p>{{ resume.profile.about }}</p>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Resume } from '../../interfaces/resume-interface';

export default {
    name: 'template-no1',
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
    watch: {
        vw() {
            console.log('BABA');
        }
    }
}
</script>