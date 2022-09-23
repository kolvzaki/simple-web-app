import request from "@/request/index.js";

const URL = {
    login: '/user/login'
}
export const login = (data={account:'',secret:''}) => {
    return request.post(URL.login,data)
}