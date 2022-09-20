import { createApp } from 'vue'
import './assets/global.scss'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import App from './App.vue'
import router from "./router/index.js";
import pinia from "@/store/index.js";

const app = createApp(App)
app.use(ArcoVue)
    .use(router)
    .use(pinia)
    .mount('#app')
