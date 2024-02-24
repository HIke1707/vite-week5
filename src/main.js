import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Field, Form, ErrorMessage } from 'vee-validate';
import Loading from 'vue-loading-overlay';

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './validation/index';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.component('VueLoading', Loading)
import 'vue-loading-overlay/dist/css/index.css';
app.component('v-form', Form);
app.component('v-field', Field);
app.component('error-message', ErrorMessage);

app.mount('#app')
