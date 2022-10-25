import {generateDynamicRouteItem, generateRouteTreeByRawRoutes,regenerateRoute} from '@/router/routesOperation.js'
import {
    queryMenuItems,
    queryMenuRoles,
    saveRoles,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    deleteBatchMenuItems
} from "@/api/menu/index.js";
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
        id: null,
        pid: null,
        name: '',
        path: '',
        //redirect: '',
        icon: '',
        hidden: false,
        //roles: []
    })

    let menuItems = ref([])
    let menuRoles = ref([])

    const initMenuItemForm = () => {
        _.assign(menuItemForm,{
            id:null,
            pid: null,
            name: '',
            path: '',
            redirect: '',
            icon: '',
            hidden: false,
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

    const create = async () => {
        await createMenuItem(menuItemForm)
        Message.success({
            content:'Success to create menu item!'
        })
        await regenerateRoute(router)
    }

    const update = async () => {
        await updateMenuItem(menuItemForm)
        Message.success({
            content: 'Success to update menu item!'
        })
        await regenerateRoute(router)
    }

    const del = async(menuId = -1) => {
        await deleteMenuItem(menuId)
        Message.success({
            content: 'Success to delete menu item!'
        })
        await regenerateRoute(router)
    }

    const batchDel = async (menuIds = []) => {
        await deleteBatchMenuItems(menuIds)
        Message.success({
            content: 'Success to delete menu items!'
        })
        await regenerateRoute(router)
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

        create,
        query,
        update,
        del,
        batchDel,

        queryMenuRole,
        saveMenuRoles,
        initMenuItemForm
    }
}