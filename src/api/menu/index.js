import request from "@/request/index.js";

const URL = {
    getRawMenus: '/menus/raw',
    queryMenuItems: '/menus/query',
    queryMenuRoles: '/menus/queryMenuRole',
    saveMenuRoles: '/menus/updateRoles'
}
export const getRawMenus = (roles = []) => {
    return request.post(URL.getRawMenus, roles)
}

export const queryMenuItems = (queryCriteria) => {
    return request.post(URL.queryMenuItems, queryCriteria);
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