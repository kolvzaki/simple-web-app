<template>
  <div class="hamburger-wrapper" @click="appStore.changeSidebarCollapse">
    <icon-menu-fold v-if="!isSidebarCollapse"/>
    <icon-menu-unfold v-else/>
  </div>
</template>

<script setup>
import { IconMenuUnfold,IconMenuFold } from '@arco-design/web-vue/es/icon';
import {storeToRefs} from "pinia";
import useAppStore from "@/store/useAppStore.js";
const appStore = useAppStore()
const {isSidebarCollapse} = storeToRefs(appStore)

</script>

<style scoped>
/*todo:抽取变量*/
.hamburger-wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  padding: 2px;
  height: 32px;
  width: 32px;
  transition: .3s all;
}
.hamburger-wrapper:hover{

}
</style>