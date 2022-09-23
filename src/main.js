import { createApp } from 'vue'
import './assets/global.scss'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import App from './App.vue'
import InitialRouter from "./router/index.js";
import pinia from "@/store/index.js";

const app = createApp(App)
const router = InitialRouter()
app.use(ArcoVue)
    .use(ArcoVueIcon)
    .use(router)
    .use(pinia)
    .mount('#app')
