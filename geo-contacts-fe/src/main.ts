import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import axios from 'axios';

const app = createApp(App);

app.use(createPinia());

app.config.globalProperties.$http = axios;

app.mount('#app');
