import {reactive, ref} from "vue";
import _ from "lodash";
import {fetchRoles} from "@/api/role/index.js";
import {Message} from "@arco-design/web-vue";

export default function useRole() {
    let queryCriteria = reactive({
        roleName: '',
    })

    let roleForm = reactive({
        name: '',
        description: '',
    })

    let rolesOption = ref([])

    const initRoleForm = () => {
        _.assign(roleForm,{
            name: '',
            description: '',
        })
    }

    const getAllRoles = async () => {
        const {data} = await fetchRoles()
        rolesOption.value = data
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
        rolesOption,

        initRoleForm,
        submitCreate,
        requestDelete,
        requestDeleteBatch,
        submitUpdate,
        query,
        getAllRoles,

    }
}
