<template>
  <div class="wrapper" @click="appStore.changeSidebarCollapse">
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

<style scoped lang="scss">
@import "src/assets/common";


</style>