<template>
  <div class="wrapper" @click="handleClick">
    <a-popover style="width: 20%">
      <a-badge dot :count="1" :offset="[2,-2]" v-if="hasNotice">
        <icon-notification/>
      </a-badge>
      <icon-notification v-else/>
      <template #content>
        <a-card size="small" title="Notifications" :bordered="false">
          <template #extra>
            <a-button type="text">Read all</a-button>
          </template>
          <notice-item v-for="i in 2" :key="i"/>
        </a-card>
      </template>
    </a-popover>
  </div>
</template>

<script setup>
import {IconNotification} from '@arco-design/web-vue/es/icon';
import NoticeItem from './NoticeItem.vue'
import {ref} from "vue";

const hasNotice = ref(false)
const handleClick = () => {

}

</script>

<style scoped lang="scss">
@import "src/assets/common";


</style>