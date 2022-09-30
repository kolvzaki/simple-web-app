<template>
  <div class="main-wrapper">
    <a-card class="role-wrapper">
      <template #title>
        <a-space>
          <span>Roles</span>
          <a-button type="primary" @click="openCreateModal">
            <template #icon>
              <icon-plus/>
            </template>
          </a-button>
          <a-button type="primary" status="danger" :disabled="_.isEmpty(selectedRoles)" @click="deleteBatchRoles">
            <template #icon>
              <icon-delete/>
            </template>
          </a-button>
        </a-space>
      </template>
      <template #extra>
        <a-button type="primary" @click="getRoles">
          <template #icon>
            <icon-refresh/>
          </template>
        </a-button>
      </template>
      <a-row :gutter="16">
        <a-col :span="5">
          <a-input v-model="roleName" placeholder="Please input">
            <template #prepend>Role Name:</template>
          </a-input>
        </a-col>
        <a-col :span="5">
          <a-button type="primary" @click="query(queryCriteria)">Submit</a-button>
        </a-col>
      </a-row>
      <div class="list-wrapper">
        <a-table :data="roleData" :loading="tableLoading" row-key="id" v-model:selected-keys="selectedRoles"
                 :row-selection="rowSelection" @row-click="selectCurrent">
          <template #columns>
            <a-table-column title="Role Name" data-index="name"></a-table-column>
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
                  <a-button type="primary" status="success" @click.stop="editCurrentRolePermission(record)">
                    <template #icon>
                      <icon-list/>
                    </template>
                  </a-button>
                  <a-popconfirm @ok="deleteCurrentRole(record)" :content="`Are you sure to delete ${record.name} role?`" ok-text="Sure" cancel-text="Cancel">
                    <a-button type="primary" status="danger" :disabled="isRoot(record)">
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
      <transition name="rolePermissionAnime">
        <a-card class="role-permission-wrapper" v-show="showRolePermission" title="Role Permission">
          <template #extra>
            <a-space>
              <a-button type="primary" @click="getCurrentRolesPermission">
                <template #icon>
                  <icon-refresh/>
                </template>
              </a-button>
              <a-button type="primary" status="warning" @click="closeCurrentRolePermission">
                <template #icon>
                  <icon-close/>
                </template>
              </a-button>
            </a-space>
          </template>
        </a-card>
      </transition>
    </a-card>

    <a-modal v-model:visible="dialogConfig.visible" v-model:title="dialogConfig.title"
             v-model:draggable="dialogConfig.draggable" title-align="start"
    >
      <a-form v-model:model="roleForm" ref="roleFormRef" :rules="ROLE_FORM_RULES" auto-label-width>
        <a-form-item label="Role Name" field="name" feedback validate-trigger="blur">
          <a-input v-model:model-value="name"></a-input>
        </a-form-item>
        <a-form-item label="Description" field="description">
          <a-input v-model:model-value="description"></a-input>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="submitRoleForm" type="primary">Confirm</a-button>
        <a-button @click="cancelSubmit" type="primary" status="warning">Cancel</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import {IconClose, IconDelete, IconEdit, IconList, IconPlus, IconRefresh} from '@arco-design/web-vue/es/icon'
import {reactive, ref, toRefs} from "vue";
import moment from "moment";
import _ from 'lodash'
import useRole from "@/hooks/useRole.js";
import {ROLE_FORM_RULES} from "@/common/rule.js";
import {Message} from "@arco-design/web-vue";

const {
  query,
  queryCriteria,
  roleForm,
  initRoleForm,
  submitCreate,
  submitUpdate,
  requestDelete,
  requestDeleteBatch
} = useRole()
const {roleName} = toRefs(queryCriteria)
const {name, description} = toRefs(roleForm)

const tableLoading = ref(false)
const showRolePermission = ref(false)
const currentRole = reactive({})
const roleFormRef = ref(null)
const isCreatedMode = ref(false)
const dialogConfig = reactive({
  title: '',
  visible: false,
  draggable: true
})
const isRoot = (record) => {
  return _.isEqual(record.name, 'root')
}

const initDialogConfig = () => {
  _.assign(dialogConfig, {
    title: '',
    visible: false,
    draggable: true
  })
}
const getRoles = () => {
  tableLoading.value = true
  showRolePermission.value = false
  query(queryCriteria)
  setTimeout(() => {
    tableLoading.value = false
  }, 500)
}

const openCreateModal = () => {
  isCreatedMode.value = true
  initRoleForm()
  _.assign(dialogConfig, {
    title: 'Create Role',
    visible: true,
    draggable: true
  })

}

const openModifyModal = (record) => {
  isCreatedMode.value = false
  initRoleForm()
  _.assign(roleForm, record)
  _.assign(dialogConfig, {
    title: 'Update Role',
    visible: true,
    draggable: true
  })
}

const submitRoleForm = async () => {
  await roleFormRef.value.validate((errors) => {
    if (!_.isEmpty(errors)) {
      Message.error({
        content: 'Invalid param!Stop submitting'
      })
      return false
    }
  })
  if (isCreatedMode.value) {
    submitCreate(roleForm)
  } else {
    submitUpdate(roleForm)
  }
  return true;
}

const cancelSubmit = () => {
  initRoleForm()
  initDialogConfig()
}

const deleteCurrentRole = (record) => {
  console.log(record)
}

const deleteBatchRoles = async () => {
  let res = await requestDeleteBatch(selectedRoles.value)
}

const editCurrentRolePermission = (record) => {
  _.assign(currentRole, record)
  showRolePermission.value = true
}

const getCurrentRolesPermission = () => {
  console.log(currentRole)
}

const closeCurrentRolePermission = () => {
  showRolePermission.value = false
  _.assign(currentRole, {})
}

const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: true
})

const selectedRoles = ref([])
const selectCurrent = (record) => {
  if (_.includes(selectedRoles.value, record.id)) {
    _.remove(selectedRoles.value, (id) => id === record.id)
  } else {
    selectedRoles.value.push(record.id)
  }
}

const roleData = ref([
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


</script>

<style scoped lang="scss">
@import 'src/assets/sys-animate';
.main-wrapper {
  width: 100%;
  height: 100%;
  .role-wrapper {

  }
  .role-permission-wrapper {
    margin-top: 20px;
  }
  .list-wrapper {
    margin-top: 20px;
  }
}

</style>