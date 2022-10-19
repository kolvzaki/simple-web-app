import {generateDynamicRouteItem, generateRouteTreeByRawRoutes,regenerateRoute} from '@/router/routesOperation.js'
import {queryMenuItems,queryMenuRoles,saveRoles} from "@/api/menu/index.js";
import {reactive, ref} from "vue";
import {Message} from "@arco-design/web-vue";
import router from "@/router/index.js";
import _ from "lodash";


export default function useMenuItem() {
    let queryCriteria = reactive({
        menuName: '',
        roles: []
    })

    let menuItemForm = reactive({
        pid: null,
        name: '',
        path: '',
        redirect: '',
        icon: '',
        hidden: false,
        roles: []
    })

    let menuItems = ref([])
    let menuRoles = ref([])

    const initMenuItemForm = () => {
        _.assign(menuItemForm,{
            pid: null,
            name: '',
            path: '',
            redirect: '',
            icon: '',
            hidden: false,
            roles: []
        })
    }

    const query = async (queryCriteria = {menuName: '', roles: []}) => {
        const {data} = await queryMenuItems(queryCriteria)
        menuItems.value = generateDynamicRouteItem(generateRouteTreeByRawRoutes(data))
    }
    const queryMenuRole = async(menuId=-1) => {
        const {data} = await queryMenuRoles(menuId)
        menuRoles.value = data
    }

    const saveMenuRoles = async(menuId = -1) => {
        await saveRoles(menuId,menuRoles.value)
        Message.success({
            content:'Success to save menu roles!'
        })
        await regenerateRoute(router)
    }

    return {
        queryCriteria,
        menuItemForm,
        menuItems,
        menuRoles,

        query,
        queryMenuRole,
        saveMenuRoles,
        initMenuItemForm
    }
}