<template>
  <div class="wrapper" @click="handleClick">
    <IconFullscreen v-if="!fullScreen.isFullscreen.value"/>
    <IconFullscreenExit v-else></IconFullscreenExit>
  </div>
</template>

<script setup>
import {IconFullscreen, IconFullscreenExit} from '@arco-design/web-vue/es/icon';
import {useFullscreen} from '@vueuse/core'

const fullScreen = useFullscreen()
const handleClick = () => {
  if (fullScreen.isFullscreen.value) {
    fullScreen.exit()
  } else {
    fullScreen.enter()
  }
}

</script>

<style scoped lang="scss">
@import "src/assets/common";
</style>