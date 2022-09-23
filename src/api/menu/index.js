import request from "@/request/index.js";

const URL = {
    getMenus: '/user/login'
}
export const getMenus = (permissions=[]) => {
    return request.post(URL.getMenus,permissions)
}