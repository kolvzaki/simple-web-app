import request from "@/request/index.js";

const URL = {
    fetchRole: '/role/fetch'
}

export const fetchRoles = () => {
    return request.get(URL.fetchRole)
}