import {createRouter, createWebHashHistory} from 'vue-router'
import generateDynamicRoutes from './routesOperation.js'
import _ from 'lodash'
import {Message} from '@arco-design/web-vue';

let routes = [
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'root',
        redirect: '/dashboard',
        children: [
            // {
            //     path: '/dashboard',
            //     name: 'Dashboard',
            //     component: () => import('@/pages/dashboard/index.vue'),
            //     meta: {
            //         icon: '',
            //         hidden: false,
            //         permissions: []
            //     },
            //     children:[
            //         {
            //             path: '/dashboard/monitor',
            //             name: 'Monitor',
            //             component: () => import('@/pages/dashboard/monitor/index.vue'),
            //             meta: {
            //                 icon: '',
            //                 hidden: false,
            //                 permissions: []
            //             },
            //         }
            //     ]
            // },
        ]
    }
]

const InitialRouter = () => {
    let r = generateDynamicRoutes()
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
        if (_.isUndefined(to.matched[to.matched.length - 1].components)) {
            Message.error({
                content: `No related component for route ${to.path}!`
            })
            next('/404')
        } else {
            next()
        }
    })
    return router
}

export default InitialRouter