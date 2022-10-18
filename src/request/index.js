import axios from "axios";
import {HTTP_CODE, TOKEN_KEY} from '@/common/index.js';
import {Message} from '@arco-design/web-vue';

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3 * 1000,
    headers: {
        token: sessionStorage.getItem(TOKEN_KEY) || ''
    }
})

request.interceptors.response.use((response) => {
    if (HTTP_CODE.SUCCESS.includes(response.status)) {
        return Promise.resolve(response)
    } else if (HTTP_CODE.UNAUTHORIZED === response.status) {
        sessionStorage.clear()
        location.reload()
    }
    Message.error({
        content: `${response.status}: ${response.statusText}`
    })
    return Promise.reject(response)
}, error => {
    Message.error({
        content: `System Error! Reason:${error?.code}:${error?.message || 'Unknown!'}`
    })
    console.log(error)
    return Promise.reject(error)
})

export default request

