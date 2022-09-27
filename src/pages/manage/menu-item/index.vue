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
          <a-select  v-model="roles" multiple allow-clear allow-search :max-tag-count="3" placeholder="Please select" value-key="id">
            <template #prefix>Role</template>
            <a-option v-for="option in roleOption" :label="option.name" :value="option.id" :index="option.id"></a-option>
          </a-select>
        </a-col>
        <a-col :span="5">
          <a-button @click="query(queryCriteria)" type="primary" >Submit</a-button>
        </a-col>
      </a-row>
      <div class="list-wrapper">
        <a-table :data="menuItems" :row-selection="rowSelection" row-key="id" v-model:selected-keys="selectedItems">
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
  </div>
</template>

<script setup>
import _ from 'lodash'
import useMenuItem from "@/hooks/useMenuItem.js";
import {onMounted, reactive, ref, toRefs} from "vue";
import {IconPlus,IconDelete,IconRefresh,IconEdit} from '@arco-design/web-vue/es/icon'

const selectedItems = ref([])
const {queryCriteria,menuItemForm,menuItems,query} = useMenuItem()
const {menuName,roles} = toRefs(queryCriteria)
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent:true,
})
const roleOption = ref([
  {
    id: 1,
    name: 'root'
  },
  {
    id: 2,
    name: 'admin'
  },
  {
    id: 3,
    name: 'user'
  },
])
const openCreateModal = () => {

}
const openModifyModal = (record) => {
  console.log(record)
}
const deleteCurrentMenuItem = (record) => {
  console.log(record)
}

onMounted(()=>{
  query(queryCriteria)
})

</script>

<style scoped lang="scss">
.main-wrapper{
  width: 100%;
  height: 100%;
  .list-wrapper{
    margin-top: 20px;
    background: aliceblue;
  }
}

</style>