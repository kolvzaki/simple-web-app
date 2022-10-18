import {generateDynamicRouteItem, generateRouteTreeByRawRoutes} from '@/router/routesOperation.js'
import {queryMenuItems,queryMenuRoles} from "@/api/menu/index.js";
import {reactive, ref} from "vue";


export default function useMenuItem() {
    let queryCriteria = reactive({
        menuName: '',
        roles: []
    })

    let menuItemForm = reactive({
        pid: -1,
        name: '',
        path: '',
        redirect: '',
        icon: '',
        hidden: false,
        roles: []
    })

    let menuItems = ref([])
    let menuRoles = ref([])

    const query = async (queryCriteria = {menuName: '', roles: []}) => {
        const {data} = await queryMenuItems(queryCriteria)
        menuItems.value = generateDynamicRouteItem(generateRouteTreeByRawRoutes(data))
    }
    const queryMenuRole = async(menuId=-1) => {
        const {data} = await queryMenuRoles(menuId)
        menuRoles.value = data
    }

    return {
        queryCriteria,
        menuItemForm,
        menuItems,
        menuRoles,

        query,
        queryMenuRole
    }
}