<template>
  <div class="main-wrapper">
    <a-card>
      <template #title>
        <a-space>
          <span>Permission</span>
          <a-button type="primary" @click="openCreateModal">
            <template #icon>
              <icon-plus/>
            </template>
          </a-button>
          <a-button type="primary" status="danger" :disabled="_.isEmpty(selectedPermissions)" @click="deleteBatchPermissions">
            <template #icon>
              <icon-delete/>
            </template>
          </a-button>
        </a-space>
      </template>
      <template #extra>
        <a-button type="primary" @click="getPermissions">
          <template #icon>
            <icon-refresh/>
          </template>
        </a-button>
      </template>
      <a-row :gutter="16">
        <a-col :span="5">
          <a-input v-model="permissionName" placeholder="Please input">
            <template #prepend>Permission Name:</template>
          </a-input>
        </a-col>
        <a-col :span="5">
          <a-button type="primary" @click="query(queryCriteria)">Submit</a-button>
        </a-col>
      </a-row>
      <div class="list-wrapper">
        <a-table :data="permissionData" :loading="tableLoading" row-key="id" v-model:selected-keys="selectedPermissions"
                 :row-selection="rowSelection" @row-click="selectCurrent">
          <template #columns>
            <a-table-column title="Permission Name" data-index="name"></a-table-column>
            <a-table-column title="Description" data-index="description"></a-table-column>
            <a-table-column title="Created Time" data-index="createdTime"></a-table-column>
            <a-table-column title="Operation">
              <template #cell="{record}">
                <a-space>
                  <a-button type="primary" status="warning" @click.stop="openModifyModal(record)">
                    <template #icon>
                      <icon-edit/>
                    </template>
                  </a-button>
                  <a-popconfirm @ok="deleteCurrentPermission(record)" :content="`Are you sure to delete ${record.name} permission?`" ok-text="Sure" cancel-text="Cancel">
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
    <a-modal v-model:visible="dialogConfig.visible" v-model:title="dialogConfig.title"
             v-model:draggable="dialogConfig.draggable" title-align="start"
    >
      <a-form v-model:model="permissionForm" ref="permissionFormRef" :rules="PERMISSION_FORM_RULES" auto-label-width>
        <a-form-item label="Role Name" field="name" feedback validate-trigger="blur">
          <a-input v-model:model-value="name"></a-input>
        </a-form-item>
        <a-form-item label="Description" field="description">
          <a-input v-model:model-value="description"></a-input>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="submitPermissionForm" type="primary">Confirm</a-button>
        <a-button @click="cancelSubmit" type="primary" status="warning">Cancel</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import _ from 'lodash'
import {reactive, ref, toRefs} from "vue";
import {IconClose, IconDelete, IconEdit, IconList, IconPlus, IconRefresh} from '@arco-design/web-vue/es/icon'
import usePermission from "@/hooks/usePermission.js";
import moment from "moment/moment.js";
import {PERMISSION_FORM_RULES} from "@/common/rule.js";
import {Message} from "@arco-design/web-vue";


const tableLoading = ref(false)
const isCreatedMode = ref(false)
const {query,queryCriteria,permissionForm,initPermissionForm,submitCreate,submitUpdate,requestDelete,requestDeleteBatch} = usePermission()
const {permissionName} = toRefs(queryCriteria)
const {name,description} = toRefs(permissionForm)
const permissionFormRef = ref(null)

const dialogConfig = reactive({
  title: '',
  visible: false,
  draggable: true
})
const initDialogConfig = () => {
  _.assign(dialogConfig, {
    title: '',
    visible: false,
    draggable: true
  })
}

const openCreateModal = () => {
  isCreatedMode.value = true
  initPermissionForm()
  _.assign(dialogConfig, {
    title: 'Create Permission',
    visible: true,
    draggable: true
  })
}

const getPermissions = () => {
  tableLoading.value = true

  setTimeout(() => {
    tableLoading.value = false
  }, 500)
}

const openModifyModal = (record) => {
  isCreatedMode.value = false
  initPermissionForm()
  _.assign(permissionForm, record)
  _.assign(dialogConfig, {
    title: 'Update Permission',
    visible: true,
    draggable: true
  })
}

const deleteBatchPermissions = () => {

}
const deleteCurrentPermission = (record) => {

}

const submitPermissionForm = async () => {
  await permissionFormRef.value.validate((errors) => {
    if (!_.isEmpty(errors)) {
      Message.error({
        content: 'Invalid param!Stop submitting'
      })
      return false
    }
  })
  if (isCreatedMode.value) {
    submitCreate(permissionForm)
  } else {
    submitUpdate(permissionForm)
  }
  return true;
}
const cancelSubmit = () => {
  initPermissionForm()
  initDialogConfig()
}

const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: true
})
const selectedPermissions = ref([])
const selectCurrent = (record) => {
  if (_.includes(selectedPermissions.value, record.id)) {
    _.remove(selectedPermissions.value, (id) => id === record.id)
  } else {
    selectedPermissions.value.push(record.id)
  }
}
const permissionData = ref([
  {
    id: 1,
    name: 'user:manage',
    description: 'manage user',
    createdTime: moment().format('YYYY-MM-DD HH:mm:SS')
  },
  {
    id: 2,
    name: 'user:add',
    description: 'add user',
    createdTime: moment().format('YYYY-MM-DD HH:mm:SS')
  },
  {
    id: 3,
    name: 'user:update',
    description: 'update user',
    createdTime: moment().format('YYYY-MM-DD HH:mm:SS')
  }
])

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