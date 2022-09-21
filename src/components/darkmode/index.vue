<template>
  <div class="wrapper" @click="handleClick">
    <IconSun v-if="isDark"/>
    <IconMoon v-else/>
  </div>
</template>

<script setup>
import {IconMoon,IconSun} from '@arco-design/web-vue/es/icon';
import {useDark,useToggle} from '@vueuse/core'
import {computed} from "vue";

const isDark = computed(()=>{
  return localStorage.getItem('isDark') === 'dark'
})
const darkMode = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: '',
  initialValue:'',
  storageKey:'isDark'
})

const handleClick = () => {

  useToggle(darkMode)
}

</script>

<style scoped lang="scss">
@import "src/assets/common";

</style>