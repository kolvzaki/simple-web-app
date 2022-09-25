import _ from "lodash";
import {useUserStoreOutside} from '@/store/useUserStore.js'

let userStore = useUserStoreOutside()
const modules = import.meta.glob('@/pages/**/index.vue')

export const generateRouteTree = async() => {
    let routeList = await userStore.getRawRoutes()
    let routeTree = []
    const findNode = (tree = [], id = -1) => {
        let res;
        res = _.find(tree, node => node.id === id)
        if (!_.isEmpty(res)) return res;
        for (const node of tree) {
            if (!_.has(node, 'children')) continue;
            else {
                res = findNode(node.children, id)
            }
        }
        return res;
    }
    routeTree = _.filter(routeList, (route) => {
        return _.isNull(route.pid)
    })
    // console.log(routeTree)
    routeList.forEach(route => {
        // console.log(route)
        if (!_.isNull(route.pid)) {
            let parentNode = findNode(routeTree, route.pid)
            if (!_.isEmpty(parentNode)){
                const childNode = {
                    ...route,
                    path: parentNode.path + route.path,
                    parentPath: parentNode.path,
                }
                if (!_.has(parentNode, 'children')) {
                    _.assign(parentNode, {
                        children: [childNode]
                    })
                } else {
                    parentNode.children.push(childNode)
                }
            }
        }
    })
    return routeTree
}

export const generateDynamicRouteItem = (routeList = []) => {
    let res = []
    for (let routeItem of routeList) {
        try {
            if (_.has(routeItem, 'children')) {
                routeItem.children = generateDynamicRouteItem(routeItem.children)
                res.push({
                    name: routeItem.name,
                    path: routeItem.path,
                    redirect: routeItem?.redirect || undefined,
                    children: routeItem?.children || undefined,
                    component: modules[`/src/pages${routeItem.path}/index.vue`],
                    meta: {
                        icon: routeItem.icon,
                        hidden: routeItem.hidden || false
                    }
                })
            } else {
                res.push({
                    name: routeItem.name,
                    path: routeItem.path,
                    redirect: routeItem?.redirect || undefined,
                    component: modules[`/src/pages${routeItem.path}/index.vue`],
                    meta: {
                        icon: routeItem.icon,
                        hidden: routeItem.hidden || false
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
    return res
}

export const generateDynamicRoutes = async () => {
    let routeList = await generateRouteTree()
    let dynamicRoutes = generateDynamicRouteItem(routeList)
    userStore.setAppRoutes(dynamicRoutes)
    return dynamicRoutes
    // return []
}

export const buildRoute = (router) => {
    let routes = router.getRoutes();
    let r = generateDynamicRoutes()
    routes[0].children = []
    routes[0].children.push(...r, {
        path: '/:pathMatch(.*)*',
        name: 'Exception',
        component: () => import('@/pages/exception/404/index.vue'),
    })
}
