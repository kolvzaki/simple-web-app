import _ from 'lodash'
import {reactive} from "vue";

export default function useRole() {
    let queryCriteria = reactive({
        roleName: '',

    })

    let roleForm = reactive({
        name: '',
        description: '',
        createdTime: '',
    })

    const query = (queryCriteria = {roleName:''}) => {
        console.log(queryCriteria)
    }

    return {
        queryCriteria,
        roleForm,

        query
    }
}
