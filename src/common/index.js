import {defineAsyncComponent} from "vue";

export const TOKEN_KEY = 'token'
export const ROUTE_KEY = 'rawRoutes'
export const CURRENT_PATH_KEY = 'currentPath'
export const HTTP_CODE = {
    SUCCESS: [200,201,204],
    SERVER_ERROR: 500,
    UNAUTHORIZED: 403,
    NOT_FOUND: 404
}

export const dialogConfig = {
    title: '',
    content: defineAsyncComponent(() => import('@/components/sysdialog/index.vue')),
    visible: false,
    okText: 'Confirm',
    cancelText: 'Cancel',
    draggable: false,
    fullscreen: false,
    onBeforeOk:()=>{
        console.log('before ok')
    },
    onOkCb: () => {
        console.log('ok')
    },
    onCancel: () => {
        console.log('cancel')
    },
    onClose: () => {
        console.log('close')
    },
    onOpen: () => {
        console.log('open')
    }
}