<template>
    <section ref="template" class="template-no1">
        <div class="personal-info">
            <div class="contact">
                <div class="personal-title">
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
        <section class="template-sections">
            <div ref="resume-profile" v-if="resume?.profile?.about" class="profile-info">
                <div class="title">
                    <h1>Profile</h1>
                </div>
                <div class="education-about-txt">
                    <p>{{ resume.profile.about }}</p>
                </div>
            </div>
            <div ref="resume-education" v-if="resume?.education?.length" class="education-info">
                <div class="title">
                    <h1>Education</h1>
                </div>
                <ul class="education-list">
                    <li v-for="ed in resume?.education" :key="ed._id" class="education-preview">
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
            <div ref="resume-experience" v-if="resume?.experience?.length" class="experience-info">
                <div class="title">
                    <h1>Experience</h1>
                </div>
                <ul class="experience-list">
                    <li v-for="ex in resume?.experience" :key="ex._id" class="experience-preview">
                        <div class="experience-job">
                            <h2>{{ ex.employer }}<span v-if="ex.jobTitle">,</span></h2>
                            <h3>{{ ex.jobTitle }}</h3>
                        </div>
                        <div class="experience-location">
                            <h2>{{ ex.city }}<span v-if="ex.country">,</span></h2>
                            <h3>{{ ex.country }}</h3>
                        </div>
                        <div class="experience-date">
                            <p>
                                <span v-if="ex.startDate !== 0">{{ format(ex.startDate) }}</span>
                                <span v-if="ex.startDate !== 0 && ex.endDate !== 0"> - </span>
                                <span v-if="ex.endDate !== 0">{{ format(ex.endDate) }}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div ref="resume-skills" v-if="resume?.skills?.length" class="skills-info">
                <div class="title">
                    <h1>Skills</h1>
                </div>
                <ul class="skill-list">
                    <li v-for="skill in resume?.skills" :key="skill._id" class="skill-preview">
                        <h2>{{ skill.name }}</h2>
                        <div class="indication">
                            <div v-for="i in 5" :key="i" class="level-indication"
                                :class="{ 'active': skill.level >= i }" />
                        </div>
                    </li>
                </ul>
            </div>
            <div ref="resume-languages" v-if="resume?.languages?.length" class="languages-info">
                <div class="title">
                    <h1>Languages</h1>
                </div>
                <ul class="language-list">
                    <li v-for="language in resume?.languages" :key="language._id" class="language-preview">
                        <h2>{{ language.name }}</h2>
                        <div class="indication">
                            <div v-for="i in 5" :key="i" class="level-indication"
                                :class="{ 'active': language.level >= i }" />
                        </div>
                    </li>
                </ul>
            </div>
            <div ref="resume-military" v-if="resume?.military" class="military-info">
                <div class="title">
                    <h1>Military service</h1>
                </div>
                <div class="military-data">
                    <h2>{{ resume.military.role }}</h2>
                    <p>
                        <span v-if="resume.military.startDate !== 0">{{ format(resume.military.startDate) }}</span>
                        <span v-if="resume.military.startDate !== 0 && resume.military.endDate !== 0"> - </span>
                        <span v-if="resume.military.endDate !== 0">{{ format(resume.military.endDate) }}</span>
                    </p>
                </div>
            </div>
        </section>
    </section>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Resume } from '../../interfaces/resume-interface';
import { eventBus } from '../../services/event.bus.service';

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
        eventBus.on('customize', this.customize)
        this.setHeading(this.resume?.style.heading)
        if (this.resume?.components) this.arrange(this.resume.components)
    },
    data() {
        return {
            originalWidth: 696,
            vw: window.innerWidth,
        }
    },
    methods: {
        setTransform() {
            const width = document.querySelector('.a4-resume')!.clientWidth
            const scale = width / this.originalWidth;
            (this.$refs.template as HTMLElement).style.transform = `scale(${scale})`;
            (this.$refs.template as HTMLElement).style.width = (width * (this.originalWidth / width)) + 'px'
        },
        format(timestamp: number) {
            return (new Date(timestamp)).toLocaleDateString("en-GB")
        },
        customize(payload: any) {
            const { type, val } = payload
            switch (type) {
                case 'arrange': this.arrange(val)
                case 'heading': this.setHeading(val)
            }
        },
        arrange(cmpOrder: string[]) {
            cmpOrder.forEach((cmp, idx) => {
                if (!this.$refs[cmp]) return
                (this.$refs[cmp] as HTMLElement).style.order = idx.toString()
            })
        },
        setHeading(val: any) {
            const nodeTitles = document.querySelectorAll('.template-no1 .title')
            const titles: Element[] = Array.from(nodeTitles)
            this.setCapitalization(titles, val)
            this.setHeadingStyle(titles, val)

        },
        setCapitalization(titles: Element[], val: any) {
            const uppercase = (val.capitalization === 'uppercase')
            titles.forEach(title => {
                if (uppercase) title.classList.add('uppercase')
                else title.classList.remove('uppercase')
            })
        },
        setHeadingStyle(titles: Element[], val: any) {
            titles.forEach(title => {
                switch (val.style) {
                    case 'underline':
                        title.classList.remove('normal', 'bordered', 'center')
                        break
                    case 'center':
                        title.classList.remove('normal', 'bordered')
                        title.classList.add('center')
                        break
                    case 'normal':
                        title.classList.remove('center', 'bordered')
                        title.classList.add('normal')
                        break
                    case 'bordered':
                        title.classList.remove('normal', 'center')
                        title.classList.add('bordered')
                        break
                }
            })
        }
    },
}
</script>