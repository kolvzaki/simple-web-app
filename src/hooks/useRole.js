import {reactive} from "vue";
import _ from "lodash";

export default function useRole() {
    let queryCriteria = reactive({
        roleName: '',
    })

    let roleForm = reactive({
        name: '',
        description: '',
    })

    const initRoleForm = () => {
        _.assign(roleForm,{
            name: '',
            description: '',
        })
    }

    const query = (queryCriteria = {roleName: ''}) => {
        console.log(queryCriteria)
    }

    const submitCreate = (roleForm) => {
        console.log(roleForm)
    }

    const submitUpdate = (roleForm) => {
        console.log(roleForm)
    }

    const requestDelete = (role) => {
        console.log(role)
    }

    const requestDeleteBatch = (roles = []) => {
        console.log(roles)
        return true
    }

    return {
        queryCriteria,
        roleForm,

        initRoleForm,
        submitCreate,
        requestDelete,
        requestDeleteBatch,
        submitUpdate,
        query,
    }
}
