<template>
  <a-menu class="menu" :collapsed="isSidebarCollapse" :default-selected-keys="currentPath" auto-open-selected>
    <menu-item v-for="route in appRoutes" :route="route"/>
  </a-menu>
</template>

<script setup>
import MenuItem from './menu-item.vue'
import useAppStore from "@/store/useAppStore.js";
import useUserStore from "@/store/useUserStore.js";
import {storeToRefs} from "pinia";
import {ref, watch} from "vue";
import router from "@/router/index.js";

const appStore = useAppStore()
const userStore = useUserStore()
const {isSidebarCollapse} = storeToRefs(appStore)
const {appRoutes} = storeToRefs(userStore)
const currentPath = ref([router.currentRoute.value.fullPath])

</script>

<style scoped lang="scss">
.menu{
  font-size: 16px;
  height: calc(100vh - v-bind(headerHeight));
}
</style>