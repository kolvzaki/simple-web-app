import request from "@/request/index.js";

const URL = {
    getRawMenus: '/menus/raw',
    queryMenuItems: '/menus/query'
}
export const getRawMenus = (roles = []) => {
    return request.post(URL.getRawMenus, roles)
}

export const queryMenuItems = (queryCriteria) => {
    return request.post(URL.queryMenuItems, queryCriteria);
}