import {createRouter, createWebHashHistory} from 'vue-router'
import {routes, generateDynamicRoutes} from './routes.js'

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router