import {createRouter, createWebHashHistory} from 'vue-router'
import {generateDynamicRoutes} from './routesOperation.js'
import _ from 'lodash'
import {Message} from '@arco-design/web-vue';
import useUserStore from "@/store/useUserStore.js";

const whiteList = ['/login', '/404']
let routes = [
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'Root',
        redirect: '/dashboard',
        children: []
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/login/index.vue')
    }
]

const InitialRouter = async () => {
    console.log('Router Initializing....')
    let r = await generateDynamicRoutes()
    routes[0].children = []
    routes[0].children.push(...r, {
        path: '/:pathMatch(.*)*',
        name: 'Exception',
        component: () => import('@/pages/exception/404/index.vue'),
    })
    const router = createRouter({
        history: createWebHashHistory(),
        routes: routes,
    })
    router.beforeEach((to, from, next) => {
        const userStore = useUserStore()

        if (userStore.isLogon()) {
            if (_.isEqual(to.path, '/login')) {
                next('/')
            } else {
                if (_.isUndefined(to.matched[to.matched.length - 1].components)) {
                    Message.error({
                        content: `No related component for route ${to.path}!`
                    })
                    next('/404')
                } else {
                    next()
                }
            }
        } else {
            if (whiteList.includes(to.path)) {
                if (_.isUndefined(to.matched[to.matched.length - 1].components)) {
                    Message.error({
                        content: `No related component for route ${to.path}!`
                    })
                    next('/404')
                } else {
                    next()
                }
            } else {
                Message.error({
                    content: `Please login to continue!`
                })
                next('/login')
            }
        }
    })
    return router
}

const router = await InitialRouter()

export default router