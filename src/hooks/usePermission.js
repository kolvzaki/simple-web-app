import _ from "lodash";
import {reactive} from "vue";


export default function usePermission(){
    let queryCriteria = reactive({
        permissionName: '',
    })

    let permissionForm = reactive({
        name: '',
        description: '',
    })

    const initPermissionForm = () => {
        _.assign(permissionForm,{
            name: '',
            description: '',
        })
    }

    const query = (queryCriteria = {permissionName: ''}) => {
        console.log(queryCriteria)
    }

    const submitCreate = (permissionForm) => {
        console.log(permissionForm)
    }

    const submitUpdate = (permissionForm) => {
        console.log(permissionForm)
    }

    const requestDelete = (permission) => {
        console.log(permission)
    }

    const requestDeleteBatch = (permissions = []) => {
        console.log(permissions)
        return true
    }

    return {
        queryCriteria,
        permissionForm,

        initPermissionForm,
        submitCreate,
        requestDelete,
        requestDeleteBatch,
        submitUpdate,
        query,
    }
}