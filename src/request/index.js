import axios from "axios";
import {TOKEN_KEY} from '@/common/index.js'
const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3 * 1000,
    headers:{
        token: sessionStorage.getItem(TOKEN_KEY) || ''
    }
})

export default request

