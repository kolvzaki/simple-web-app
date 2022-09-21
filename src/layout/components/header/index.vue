<template>
  <a-layout-header class="header-wrapper">
    <hamburger/>
    <div class="right-wrapper">
      <a-space size="medium">
        <a-tooltip position="bottom" content="Full Screen" mini>
          <full-screen/>
        </a-tooltip>
        <a-tooltip position="bottom" content="Full Screen" mini>
          <dark-mode/>
        </a-tooltip>
        <a-avatar></a-avatar>
      </a-space>
    </div>
  </a-layout-header>
</template>

<script setup>
import Hamburger from '@/components/hamburger/index.vue'
import FullScreen from '@/components/fullscreen/index.vue'
import DarkMode from '@/components/darkmode/index.vue'
import useAppStore from "@/store/useAppStore.js";
import {storeToRefs} from "pinia";
const appStore = useAppStore()
const {headerHeight} = storeToRefs(appStore)

</script>

<style scoped lang="scss">
@import "src/assets/common";
.header-wrapper{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  height: v-bind(headerHeight);
  border-bottom: 1px solid $border-color-grey;
}
.right-wrapper{
  width: max-content;
  padding: 0 10px;
}
</style>