<template>
  <a-layout-sider :width="220" :collapsed-width="48" :collapsed="isSidebarCollapse" hide-trigger class="side-bar">
    <div class="title">
      <span v-if="!isSidebarCollapse">Simple Web</span>
    </div>
    <div class="menu-wrapper">
      <a-menu
          class="menu"
          :collapsed="isSidebarCollapse"
      >
        <a-sub-menu key="0">
          <template #icon><icon-apps></icon-apps></template>
          <template #title>Navigation 1</template>
          <a-menu-item key="0_0">Menu 1</a-menu-item>
          <a-menu-item key="0_1">Menu 2</a-menu-item>
          <a-menu-item key="0_2">Menu 3</a-menu-item>
          <a-menu-item key="0_3">Menu 4</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="1">
          <template #icon><icon-bug></icon-bug></template>
          <template #title>Navigation 2</template>
          <a-menu-item key="1_0">Menu 1</a-menu-item>
          <a-menu-item key="1_1">Menu 2</a-menu-item>
          <a-menu-item key="1_2">Menu 3</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="2">
          <template #icon><icon-bulb></icon-bulb></template>
          <template #title>Navigation 3</template>
          <a-menu-item key="2_0">Menu 1</a-menu-item>
          <a-menu-item key="2_1">Menu 2</a-menu-item>
          <a-sub-menu key="2_2" title="Navigation 4">
            <a-menu-item key="2_2_0">Menu 1</a-menu-item>
            <a-menu-item key="2_2_1">Menu 2</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script setup>
import useAppStore from "@/store/useAppStore.js";
import {storeToRefs} from 'pinia'
import {
  IconApps,
  IconBug,
  IconBulb,
} from '@arco-design/web-vue/es/icon';
import {onMounted} from "vue";
const appStore = useAppStore()
const {isSidebarCollapse,headerHeight} = storeToRefs(appStore)
onMounted(()=>{
})

</script>

<style scoped lang="scss">
@import "src/assets/common.scss";
.side-bar{
  .title{
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
  .menu{
    font-size: 16px;
    height: calc(100vh - v-bind(headerHeight));
  }
}
</style>