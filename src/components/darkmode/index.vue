<template>
  <div class="wrapper" @click="handleClick">
    <IconSun v-if="isDarkMode"/>
    <IconMoon v-else/>
  </div>
</template>

<script setup>
import {IconMoon, IconSun} from '@arco-design/web-vue/es/icon';
import useAppStore from "@/store/useAppStore.js";
import {storeToRefs} from "pinia";

const appStore = useAppStore()
const {isDarkMode} = storeToRefs(appStore)

const handleClick = () => {
  if (isDarkMode.value) {
    document.body.removeAttribute('arco-theme')
    appStore.setDarkMode(false)
  } else {
    document.body.setAttribute('arco-theme','dark')
    appStore.setDarkMode(true)
  }
}

</script>

<style scoped lang="scss">
@import "src/assets/common";

</style>