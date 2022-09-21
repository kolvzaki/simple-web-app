import {createRouter, createWebHashHistory} from 'vue-router'

const staticRoutes = [
    {
        path: '/',
        component:()=>import('@/layout/index.vue'),
        redirect: '/dashboard',
        children:[
            {
                path: '/dashboard',
                component: ()=>import('@/pages/dashboard/index.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes:staticRoutes,
})

export default router