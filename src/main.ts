import './assets/scss/global.scss';

import { createApp } from 'vue';
import router from './router';
import { createPinia } from 'pinia';
import App from './App.vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { MdEmail, RiLockLine } from 'oh-vue-icons/icons';

const pinia = createPinia();

addIcons(MdEmail, RiLockLine);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.component('v-icon', OhVueIcon);
app.mount('#app');
