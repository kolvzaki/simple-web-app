<template>
  <a-layout-sider :width="220" :collapsed-width="48" :collapsed="isSidebarCollapse" hide-trigger class="side-bar">
    Sider
  </a-layout-sider>
</template>

<script setup>
import useAppStore from "@/store/useAppStore.js";
import {storeToRefs} from 'pinia'
const appStore = useAppStore()
const {isSidebarCollapse} = storeToRefs(appStore)

</script>

<style scoped>
.side-bar{
}
</style>