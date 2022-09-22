import {createRouter, createWebHashHistory} from 'vue-router'

const staticRoutes = [
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'root',
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: () => import('@/pages/dashboard/index.vue'),
                meta: {
                    icon: '',
                    hidden: false,
                    permissions: []
                },
            },
            {
                path: '/menu-item',
                name: 'Menu Item',
                component: () => import('@/pages/menuItem/index.vue'),
                meta: {
                    icon: '',
                    hidden: false,
                    permissions: []
                },
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: staticRoutes,
})

export default router