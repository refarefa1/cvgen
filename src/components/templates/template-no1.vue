<template>
    <section class="template-no1">
        <div class="title">
            <h1>{{ resume?.fullName }}</h1>
            <h2>{{ resume?.jobTitle }}</h2>
        </div>
        <div class="contact">
            <div v-if="resume?.email" class="contact-item">
                <span><v-icon name="io-mail"></v-icon></span>
                <p class="mail">{{ resume.email }}</p>
            </div>
            <div v-if="resume?.phone" class="contact-item">
                <span><v-icon name="bi-telephone-fill"></v-icon></span>
                <p class="phone">{{ resume.phone }}</p>
            </div>
            <div v-if="resume?.address" class="contact-item">
                <span><v-icon name="io-location-sharp"></v-icon></span>
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