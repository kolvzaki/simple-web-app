import {defineStore} from 'pinia'
import pinia from "@/store/index.js";

const useAppStore = defineStore({
    id:'appStore',
    state:()=>({
        isSidebarCollapse:false,
        isDarkMode:false,
        headerHeight: '50px'
    }),
    actions:{
        setDarkMode(status){
          this.isDarkMode = status
        },
        changeSidebarCollapse(){
            this.isSidebarCollapse = !this.isSidebarCollapse
        },
    }
})

export function useAppStoreOutside(){
    return useAppStore(pinia)
}

export default useAppStore