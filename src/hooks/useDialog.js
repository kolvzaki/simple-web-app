import {defineAsyncComponent} from "vue";

export default function useDialog() {
    const dialogConfig = {
        title: '',
        content: defineAsyncComponent(() => import('@/components/sysdialog/index.vue')),
        visible: false,
        width: '25%',
        draggable: false,
        fullscreen: false,
        onBeforeOk: () => {
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
    const openDialog = (dialogConfig) => {

    }

    return {
        dialogConfig,
        openDialog
    }
}