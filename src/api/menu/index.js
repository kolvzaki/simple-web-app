import request from "@/request/index.js";

const URL = {
    getRawMenus: '/menus/raw',
    queryMenuItems: '/menus/query',
    queryMenuRoles: '/menus/queryMenuRole',
    saveMenuRoles: '/menus/updateRoles',
    createMenuItem: '/menus/create',
    updateMenuItem: '/menus/update',
    deleteMenuItem: '/menus/delete',
    deleteBatchMenuItems: '/menus/delete/batch'
}
export const getRawMenus = (roles = []) => {
    return request.post(URL.getRawMenus, roles)
}

export const queryMenuItems = (queryCriteria) => {
    return request.post(URL.queryMenuItems, queryCriteria);
}

export const createMenuItem = (menuItemForm = {}) => {
    return request.post(URL.createMenuItem,menuItemForm)
}

export const queryMenuRoles = (menuId = -1) => {
    return request.get(URL.queryMenuRoles,{
        params: {
            menuId:menuId
        }
    })
}

export const saveRoles = (menuId = -1,menuRoles=[]) => {
    return request.post(URL.saveMenuRoles,{
        menuId: menuId,
        menuRoles: menuRoles
    })
}

export const updateMenuItem = (menuItemForm = {}) => {
    return request.post(URL.updateMenuItem,menuItemForm)
}

export const deleteMenuItem = (menuId = -1) => {
    return request.delete(URL.deleteMenuItem,{
        params: {
            menuId: menuId
        }
    })
}

export const deleteBatchMenuItems = (menuIds = []) => {
    return request.delete(URL.deleteBatchMenuItems,{
        data:menuIds
    })
}