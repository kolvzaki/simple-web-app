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
          <a-button type="primary" status="danger" :disabled="_.isEmpty(selectedRoles)">
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
      <a-table :data="roleData" :loading="tableLoading" row-key="id" v-model:selected-keys="selectedRoles"
               :row-selection="rowSelection" @selection-change="showSelected" @row-click="clickCurrent">
        <template #columns>
          <a-table-column title="Role Name" data-index="roleName"></a-table-column>
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
                <a-button type="primary" status="danger" @click.stop="deleteCurrentRole(record)">
                  <template #icon>
                    <icon-delete/>
                  </template>
                </a-button>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
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
  </div>
</template>

<script setup>
import {IconRefresh, IconEdit, IconDelete, IconPlus, IconClose} from '@arco-design/web-vue/es/icon'
import {reactive, ref} from "vue";
import moment from "moment";
import _ from 'lodash'

const tableLoading = ref(false)
const showRolePermission = ref(false)
const currentRole = reactive({})

const getRoles = () => {
  tableLoading.value = true
  showRolePermission.value = false
  setTimeout(() => {
    tableLoading.value = false
  }, 500)
}

const openCreateModal = () => {

}

const openModifyModal = (record) => {
  _.assign(currentRole,record)
  console.log(record)
}

const deleteCurrentRole = (record) => {
  console.log(record)
}

const showSelected = (rowKeys) => {
  console.log(rowKeys)
}

const clickCurrent = (record) => {
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

const roleData = ref([
  {
    id: 1,
    roleName: 'root',
    description: 'root',
    createdTime: moment().format('YYYY-MM-DD HH:mm:SS')
  },
  {
    id: 2,
    roleName: 'admin',
    description: 'admin',
    createdTime: moment().format('YYYY-MM-DD HH:mm:SS')
  },
  {
    id: 3,
    roleName: 'user',
    description: 'user',
    createdTime: moment().format('YYYY-MM-DD HH:mm:SS')
  }
])


</script>

<style scoped lang="scss">
@import 'src/assets/sys-animate';
.main-wrapper {
  background: aliceblue;
  width: 100%;
  height: 100%;

  .role-wrapper {

  }

  .role-permission-wrapper {
    margin-top: 20px;
  }
}

</style>