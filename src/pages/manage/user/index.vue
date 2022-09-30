<template>
  <div class="main-wrapper">
    <a-card>
      <template #title>
        <a-space>
          <span>User</span>
          <a-button type="primary">
            <template #icon>
              <icon-plus/>
            </template>
          </a-button>
          <a-button type="primary" status="danger" :disabled="_.isEmpty(selectedUser)" @click="deleteBatchUsers">
            <template #icon>
              <icon-delete/>
            </template>
          </a-button>
        </a-space>
      </template>
      <template #extra>
        <a-button type="primary" @click="getUsers">
          <template #icon>
            <icon-refresh/>
          </template>
        </a-button>
      </template>
      <a-row :gutter="16">
        <a-col :span="4">
          <a-input  placeholder="Please input" allow-clear v-model:model-value="username">
            <template #prepend>User Name:</template>
          </a-input>
        </a-col>
        <a-col :span="4">
          <a-input  placeholder="Please input" allow-clear v-model:model-value="mobile">
            <template #prepend>Mobile:</template>
          </a-input>
        </a-col>
        <a-col :span="4">
         <a-select v-model:model-value="userStatus">
           <template #prefix>
             User Status:
           </template>
           <a-option v-for="(opt,index) in statusOptions" :index="index" :label="opt.label" :value="opt.value"></a-option>
         </a-select>
        </a-col>
        <a-col :span="4">
          <a-select v-model:model-value="queryCriteria.role">
            <template #prefix>
              User Role:
            </template>
            <a-option v-for="(opt,index) in roleOptions" :index="index" :label="opt.name" :value="opt.id"></a-option>
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-range-picker :disabled-date="getDisabledDate" @select="showSelect" format="YYYY/MM/DD" v-model:model-value="dateRange"></a-range-picker>
        </a-col>
        <a-col :span="4">
          <a-button type="primary">Submit</a-button>
        </a-col>
      </a-row>
      <div class="list-wrapper">
        <a-table :data="userData" :loading="tableLoading" row-key="id" v-model:selected-keys="selectedUser"
                 :row-selection="rowSelection" @row-click="selectCurrent">
          <template #columns>
            <a-table-column title="Username" data-index="username"></a-table-column>
            <a-table-column title="Mobile" data-index="mobile"></a-table-column>
            <a-table-column title="User Role" data-index="role"></a-table-column>
            <a-table-column title="User Status" data-index="userStatus">
              <template #cell="{record}">
                <a-switch v-model:model-value="userStatus" :checked-value="1" :unchecked-value="0"></a-switch>
              </template>
            </a-table-column>
            <a-table-column title="Last Login Time" data-index="lastLoginTime"></a-table-column>
            <a-table-column title="Operation">
              <template #cell="{record}">
                <a-space>
                  <a-button type="primary" status="warning">
                    <template #icon>
                      <icon-edit/>
                    </template>
                  </a-button>
                  <a-popconfirm @ok="deleteCurrentUser(record)" :content="`Are you sure to delete ${record.name}?`" ok-text="Sure" cancel-text="Cancel">
                    <a-button type="primary" status="danger">
                      <template #icon>
                        <icon-delete/>
                      </template>
                    </a-button>
                  </a-popconfirm>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import {IconClose, IconDelete, IconEdit, IconList, IconPlus, IconRefresh} from '@arco-design/web-vue/es/icon'
import {onMounted, reactive, ref, toRefs} from "vue";
import _ from 'lodash'
import moment from "moment/moment.js";

const tableLoading = ref(false)
const queryCriteria = reactive({
  username:'',
  mobile: '',
  role:3,
  userStatus: 1,
  dateRange:[],
})
const {username,mobile,role,userStatus,dateRange} = toRefs(queryCriteria)

const statusOptions = ref([
  {
    value: 1,
    label:'Active'
  },
  {
    value: 0,
    label: 'Inactive'
  }
])

const getDisabledDate = (current)=> {
  return moment().isBefore(current)
}
const showSelect = (dateString,date) => {
  dateRange.value = dateString
}


const roleOptions = ref([
  {
    id: 1,
    name: 'root',
    description: 'root',
    createdTime: moment().format('YYYY-MM-DD HH:mm:SS')
  },
  {
    id: 2,
    name: 'admin',
    description: 'admin',
    createdTime: moment().format('YYYY-MM-DD HH:mm:SS')
  },
  {
    id: 3,
    name: 'user',
    description: 'user',
    createdTime: moment().format('YYYY-MM-DD HH:mm:SS')
  }
])
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: true
})
const selectedUser = ref([])
const selectCurrent = (record) => {
  if (_.includes(selectedUser.value, record.id)) {
    _.remove(selectedUser.value, (id) => id === record.id)
  } else {
    selectedUser.value.push(record.id)
  }
}
const deleteBatchUsers = () => {

}
const deleteCurrentUser = (record) => {

}
const userData = ref([
  {
    id: 1,
    username: 'Root',
    mobile: '',
    role: 1,
    lastLoginTime: moment().format('YYYY-MM-DD HH:mm:SS'),
    userStatus: 1
  }
])
const getUsers = () => {

}

onMounted(()=>{
  for (let user of userData.value){
    user.role = roleOptions.value.find((role)=>role.id === user.role).name
  }
})

</script>

<style scoped lang="scss">
.main-wrapper {
  width: 100%;
  height: 100%;
  .list-wrapper {
    margin-top: 20px;
  }
}
</style>