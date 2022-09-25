import {defineStore} from 'pinia'
import pinia from "@/store/index.js";
import _ from "lodash";
import {TOKEN_KEY,CURRENT_PATH_KEY} from '@/common/index.js';
import {getRawMenus} from "@/api/menu/index.js";

const useUserStore = defineStore({
    id: 'userStore',
    state: () => ({
        userInfo: {
            id: 0,
            username: '',
            avatar: '',
            mobile: '',
            lastLoginTime: ''
        },
        roles: [{
            id: 1,
            name: 'root'
        }],
        permissions: [],
        appRoutes: [],
        rawRoutes: [],
    }),
    actions: {
        getAppRoutes() {
            return this.appRoutes;
        },
        setAppRoutes(routes) {
            this.appRoutes = routes;
        },
        async getRawRoutes() {
            if (_.isEmpty(this.rawRoutes)) {
                const {data} = await getRawMenus(this.roles)
                this.rawRoutes = data
            }
            return this.rawRoutes
        },
        isLogon() {
            let storeToken = sessionStorage.getItem(TOKEN_KEY)
            return !_.isEmpty(storeToken);
        }
    }
})

export function useUserStoreOutside() {
    return useUserStore(pinia)
}

export default useUserStore