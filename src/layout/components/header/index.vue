<template>
  <a-layout-header class="header-wrapper">
    <hamburger/>

  </a-layout-header>
</template>

<script setup>
import Hamburger from '@/components/hamburger/index.vue'
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
  padding: 0 5px;
  height: v-bind(headerHeight);
  border-bottom: 1px solid $border-color-grey;
}
</style>