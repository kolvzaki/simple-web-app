const staticRoutes = [
    {
        path: '/',
        component:()=>import('@/layout/index.vue'),
        children:[]
    }
]

const dynamicRoutes = [

]

export const generateDynamicRoutes = () => {

}

export const routes = [...staticRoutes,...dynamicRoutes]


