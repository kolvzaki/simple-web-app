import {defineStore} from 'pinia'
import pinia from "@/store/index.js";

const useUserStore = defineStore({
    id:'userStore',
    state:()=>({
        userInfo:{

        },
        token: '',
        roles: [],
        permissions:[]
    }),
    actions:{

    }
})

export function useUserStoreOutside(){
    return useUserStore(pinia)
}

export default useUserStore