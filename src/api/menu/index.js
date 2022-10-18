import request from "@/request/index.js";

const URL = {
    getRawMenus: '/menus/raw',
    queryMenuItems: '/menus/query',
    queryMenuRoles: '/menus/queryMenuRole'
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