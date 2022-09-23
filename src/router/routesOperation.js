import _ from "lodash";

const modules = import.meta.glob('@/pages/**/index.vue')

const routeStruct = [
    {
        id: 1,
        pid: null,
        path: '/dashboard',
        name: 'dashboard',
        permissions: [],
        icon: '',
        hidden: false
    },
    {
        id: 2,
        pid: null,
        path: '/menu-item',
        name: 'Menu Item',
        permissions: [],
        icon: '',
        hidden: false
    },
    {
        id: 3,
        pid: null,
        path: '/user',
        name: 'User',
        permissions: [],
        icon: '',
        hidden: false
    },
    {
        id: 4,
        pid: 1,
        path: '/monitor',
        name: 'System Monitor',
        permissions: [],
        icon: '',
        hidden: false
    },
    {
        id: 5,
        pid: 4,
        path: '/machine',
        name: 'Machine',
        permissions: [],
        icon: '',
        hidden: false
    },
]

const generateRouteTree = (routeList = []) => {
    let routeTree = []
    const findNode = (tree = [], id = -1) => {
        let res;
        res = tree.find(node => node.id === id)
        if (!_.isEmpty(res)) return res;
        for (const node of tree) {
            if (!_.has(node, 'children')) break;
            else {
                res = findNode(node.children, id)
            }
        }
        return res;
    }
    for (let route of routeList) {
        if (_.isNull(route.pid)) {
            routeTree.push(route)
        } else {
            let parentNode = findNode(routeTree, route.pid)
            _.assign(route, {
                path: parentNode.path+route.path,
                parentPath: parentNode.path,
            })
            if (!_.has(parentNode, 'children')) {
                _.assign(parentNode, {
                    children: [route]
                })
            } else {
                parentNode.children.push(route)
            }
        }
    }
    return routeTree
}

const generateDynamicRouteItem = (routeList = []) => {
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
                    meta:{
                        permissions: routeItem.permissions || [],
                        icon: routeItem.icon,
                        hidden:routeItem.hidden || false
                    }
                })
            } else {
                res.push({
                    name: routeItem.name,
                    path: routeItem.path,
                    redirect: routeItem?.redirect || undefined,
                    component: modules[`/src/pages${routeItem.path}/index.vue`],
                    meta:{
                        permissions: routeItem.permissions || [],
                        icon: routeItem.icon,
                        hidden:routeItem.hidden || false
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
    return res
}

const generateDynamicRoutes = () => {

    let routeTree = generateRouteTree(routeStruct)
    return generateDynamicRouteItem(routeTree)
    // return []
}


export default generateDynamicRoutes