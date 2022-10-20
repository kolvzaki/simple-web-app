<template>
  <div class="main-wrapper">
    <a-card>
      <template #title>
        <a-space>
          <span>Menu Item</span>
          <a-button type="primary" @click="openCreateModal">
            <template #icon>
              <icon-plus/>
            </template>
          </a-button>
          <a-button type="primary" status="danger" :disabled="_.isEmpty(selectedItems)">
            <template #icon>
              <icon-delete/>
            </template>
          </a-button>
        </a-space>
      </template>
      <template #extra>
        <a-button type="primary" @click="query">
          <template #icon>
            <icon-refresh/>
          </template>
        </a-button>
      </template>
      <a-row :gutter="16">
        <a-col :span="5">
          <a-input v-model="menuName" placeholder="Please input">
            <template #prepend>Menu Name:</template>
          </a-input>
        </a-col>
        <a-col :span="5">
          <a-select v-model="roles" multiple allow-clear allow-search :max-tag-count="3" placeholder="Please select"
                    value-key="id">
            <template #prefix>Role</template>
            <a-option v-for="option in rolesOption" :label="option.name" :value="option.id"
                      :index="option.id"></a-option>
          </a-select>
        </a-col>
        <a-col :span="5">
          <a-button @click="query(queryCriteria)" type="primary">Submit</a-button>
        </a-col>
      </a-row>
      <div class="list-wrapper">
        <a-table :data="menuItems" :row-selection="rowSelection"
                 v-model:expanded-keys="selectedItems" :default-expand-all-rows="true"
                 row-key="path"
        >
          <template #columns>
            <a-table-column title="Menu Name" data-index="name"></a-table-column>
            <a-table-column title="Menu Path" data-index="path"></a-table-column>
            <a-table-column title="Menu Icon" data-index="meta.icon"></a-table-column>
            <a-table-column title="Hidden" data-index="meta.hidden"></a-table-column>
            <a-table-column title="Created Time" data-index="meta.createdTime"></a-table-column>
            <a-table-column title="Operation">
              <template #cell="{record}">
                <a-space>
                  <a-button type="primary" status="warning" @click.stop="openModifyModal(record)">
                    <template #icon>
                      <icon-edit/>
                    </template>
                  </a-button>
                  <a-button type="primary" status="success" @click.stop="editCurrentMenuRole(record)">
                    <template #icon>
                      <icon-list/>
                    </template>
                  </a-button>
                  <a-button type="primary" status="danger" @click.stop="deleteCurrentMenuItem(record)">
                    <template #icon>
                      <icon-delete/>
                    </template>
                  </a-button>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </div>
    </a-card>

    <transition name="menuRoleAnime">
      <a-card v-show="showMenuRole" class="menu-role-wrapper" title="Role Permission">
        <template #extra>
          <a-space>
            <a-button type="primary" status="success" @click="saveMenuRoles(currentMenu.meta.id)">
              <template #icon>
                <icon-save/>
              </template>
            </a-button>
            <a-button type="primary" @click="queryMenuRole(currentMenu.meta.id)">
              <template #icon>
                <icon-refresh/>
              </template>
            </a-button>
            <a-button type="primary" status="warning" @click="closeCurrentMenuRole">
              <template #icon>
                <icon-close/>
              </template>
            </a-button>
          </a-space>
        </template>
        <div class="role-wrapper">
          <a-tooltip v-for="role in menuRoles" :key="role.id" :content="role.description" position="bottom">
            <a-tag :key="role.id" size="large" bordered closable color="arcoblue" class="role-tag"
                   @close="deleteCurrentRole(role.id)">
              {{ role.name }}
            </a-tag>
          </a-tooltip>
          <a-tag class="role-tag" size="large" bordered @click="showSelector" v-if="!isClicked">
            <template #icon>
              <icon-plus></icon-plus>
            </template>
            Add Role
          </a-tag>
          <a-select allow-clear allow-search placeholder="Please select"
                    @change="insertNewRole" @blur="onSelectorBlur"
                    style="width: 200px" value-key="id" v-else>
            <a-option v-for="option in rolesOption" :label="option.name" :value="option.id"
                      :index="option.id"></a-option>
          </a-select>
        </div>
      </a-card>
    </transition>

    <a-modal v-model:visible="dialogConfig.visible" v-model:title="dialogConfig.title"
             v-model:draggable="dialogConfig.draggable" title-align="start"
    >
      <a-form v-model:model="menuItemForm" ref="menuFormRef" :rules="MENU_ITEM_FORM_RULES" auto-label-width>
        <a-form-item label="Parent">
          <a-cascader :options="menuItems" placeholder="Please select..."
                      check-strictly @change="onParentChange"
                      :field-names="cascaderFieldName" allow-clear allow-search
          ></a-cascader>
        </a-form-item>
        <a-form-item label="Menu Name" field="name" feedback validate-trigger="blur">
          <a-input v-model:model-value="name"></a-input>
        </a-form-item>
        <a-form-item label="Path" field="path" :rules="pathRules">
          <a-input v-model:model-value="path">
            <template #prefix>
              {{ parentPath }}
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="Icon">
          <a-select></a-select>
        </a-form-item>
        <a-form-item label="Hidden">
          <a-select :options="hiddenOptions" @change="changeHidden" default-value="false"></a-select>
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="submitMenuForm" type="primary">Confirm</a-button>
        <a-button @click="cancelSubmit" type="primary" status="warning">Cancel</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import _ from 'lodash'
import useMenuItem from "@/hooks/useMenuItem.js";
import useRole from "@/hooks/useRole.js";
import {computed, onMounted, reactive, ref, toRefs} from "vue";
import {IconClose, IconDelete, IconEdit, IconList, IconPlus, IconRefresh, IconSave} from '@arco-design/web-vue/es/icon'
import {Message} from "@arco-design/web-vue";
import {MENU_ITEM_FORM_RULES} from '@/common/rule.js'
import {letterOnlyRegex} from "@/common/regex.js";

const selectedItems = ref([])
const currentMenu = reactive({})
const showMenuRole = ref(false)
const {
  queryCriteria,
  menuItemForm,
  menuItems,
  menuRoles,
  query,
  create,
  queryMenuRole,
  saveMenuRoles,
  initMenuItemForm
} = useMenuItem()
const {menuName, roles} = toRefs(queryCriteria)
const {pid, name, path, redirect, icon, hidden} = toRefs(menuItemForm)
const {rolesOption, getAllRoles} = useRole()
const isCreatedMode = ref(false)
const cascaderFieldName = {
  label: "name",
  value: "path"
}
const menuFormRef = ref(null)
const hiddenOptions = ref([
  {
    value: 'false',
    label: 'false'
  },
  {
    value: 'true',
    label: 'true'
  }
])
const pathRules = [
  {
    required: true,
    message: 'Path required!'
  },
  {
    validator: (value, cb) => {
      return new Promise(resolve => {
        let fullPath = parentPath.value + `${value}`
        let node = findParent(menuItems.value, fullPath)
        if (!_.isEmpty(node)) {
          cb('Duplicate path!')
        }
        if (!letterOnlyRegex.test(value)) {
          cb('Invalid path! Letters only!')
        }
        resolve()
      })
    }
  }
]
const changeHidden = (val) => {
  hidden.value = Boolean(val) //组件不支持选择Boolean类型值?
}

const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: true,
})
const dialogConfig = reactive({
  title: '',
  visible: false,
  draggable: true
})
let parentNode = reactive({})
const parentPath = computed(() => {
  return _.isEmpty(parentNode.path) ? '/' : parentNode.path + "/"
})

const findParent = (itemList = [], path = '') => {
  let parent = null;
  const item = _.find(itemList, (e) => {
    return e.path === path
  }, 0)
  if (!_.isEmpty(item)) return item
  for (let item of itemList) {
    if (!_.isEmpty(item.children)) {
      parent = findParent(item.children, path)
    }
  }
  return parent;
}

const onParentChange = (val) => {
  if (!_.isEmpty(val)) {
    parentNode = _.assign(parentNode, findParent(menuItems.value, val))
    pid.value = parentNode.meta.id
  } else {
    pid.value = null
  }
}


const openCreateModal = () => {
  console.log(menuItems.value)
  isCreatedMode.value = true
  initMenuItemForm()
  _.assign(dialogConfig, {
    title: 'Create Menu Item',
    visible: true,
    draggable: true
  })
}
const openModifyModal = (record) => {
  console.log(record)
}

const closeModal = () => {
  initMenuItemForm()
  _.assign(dialogConfig, {
    title: '',
    visible: false,
    draggable: false
  })
}

const deleteCurrentMenuItem = (record) => {
  console.log(record)
}

const editCurrentMenuRole = async (record) => {
  _.assign(currentMenu, record)
  showMenuRole.value = true
  await queryMenuRole(record.meta.id)
}

const submitMenuForm = async () => {
  await menuFormRef.value.validate((errors) => {
    if (!_.isEmpty(errors)) {
      Message.error({
        content: 'Invalid form params!Please check your input!'
      })
      return false
    }
  })
  path.value = `/${path.value}`
  if (isCreatedMode.value) {
    await create()
    closeModal()
  } else {

  }
  await initData()
}

const cancelSubmit = () => {

}

const isClicked = ref(false)
const showSelector = () => {
  isClicked.value = true
}

const onSelectorBlur = () => {
  isClicked.value = false
}

const insertNewRole = (val) => {
  let option = _.find(rolesOption.value, (e) => {
    return e.id === val
  })
  if (_.find(menuRoles.value, (e) => {
    return e.id === option.id
  })) {
    Message.info({
      content: 'Role already exists!'
    })
  } else {
    menuRoles.value.push(option)
  }
  isClicked.value = false
}

const deleteCurrentRole = (roleId) => {
  _.remove(menuRoles.value, (e) => {
    return e.id === roleId
  })
}

const closeCurrentMenuRole = () => {
  showMenuRole.value = false
  _.assign(currentMenu, {})
}

const initData = async () => {
  await query(queryCriteria)
  await getAllRoles()
}

onMounted(async () => {
  await initData()
})

</script>

<style scoped lang="scss">
@import 'src/assets/sys-animate';
.main-wrapper {
  width: 100%;
  height: 100%;
  .list-wrapper {
    margin-top: 20px;
  }
  .menu-role-wrapper {
    margin-top: 20px;
    .role-tag {
      cursor: pointer;
      margin-right: 10px;
    }
    .role-tag:hover {
      animation: pulse .3s;
    }
  }
}
</style>