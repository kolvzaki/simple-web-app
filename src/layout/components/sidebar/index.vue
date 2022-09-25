<template>
  <a-layout-sider :width="220" :collapsed-width="48" :collapsed="isSidebarCollapse" hide-trigger class="side-bar">
    <div class="title">
      <span v-if="!isSidebarCollapse">Simple Web</span>
    </div>
    <div class="menu-wrapper">
      <sidebar-menu/>
    </div>
  </a-layout-sider>
</template>

<script setup>
import SidebarMenu from './sidebar-menu/index.vue'
import useAppStore from "@/store/useAppStore.js";
import {storeToRefs} from 'pinia'
import {onMounted} from "vue";

const appStore = useAppStore()
const {isSidebarCollapse, headerHeight} = storeToRefs(appStore)
onMounted(() => {
})

</script>

<style scoped lang="scss">
@import "src/assets/common.scss";

.side-bar {
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $background-theme;
    color: #fff;
    font-size: 22px;
    font-weight: bolder;
    letter-spacing: .15em;
    width: 220px;
    height: 50px;
  }
}
</style>