import {defineStore} from 'pinia'
import pinia from "@/store/index.js";

const useAppStore = defineStore({
    id:'appStore',
    state:()=>({
        isSidebarCollapse:false,
        headerHeight: '50px'
    }),
    actions:{
        changeSidebarCollapse(){
            this.isSidebarCollapse = !this.isSidebarCollapse
        },
    }
})

export function useAppStoreOutside(){
    return useAppStore(pinia)
}

export default useAppStore