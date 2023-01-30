<template>
    <section class="template-no1">
        <div class="title">
            <h1>{{ resume?.fullName }}</h1>
            <h2>{{ resume?.jobTitle }}</h2>
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
    }

}
</script>