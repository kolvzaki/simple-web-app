import request from "@/request/index.js";

const URL = {
    getRawMenus: '/menus/raw'
}
export const getRawMenus = (roles=[]) => {
    return request.post(URL.getRawMenus,roles)
}