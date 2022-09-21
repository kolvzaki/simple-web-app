<template>
  <a-layout>
    <side-bar/>
    <a-layout>
      <web-header/>
      <a-layout-content>
        <div class="content-wrapper">
          <router-view/>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import SideBar from '@/layout/components/sidebar/index.vue';
import WebHeader from '@/layout/components/header/index.vue';
import useAppStore from "@/store/useAppStore.js";
import {storeToRefs} from "pinia";
const appStore = useAppStore()
const {headerHeight} = storeToRefs(appStore)

</script>

<style scoped lang="scss">
.content-wrapper{
  height: calc(100vh - v-bind(headerHeight));
}
</style>