<template>
  <div class="item-wrapper">
    <a-badge text="NEW" v-if="!item.isRead">
      <span class="title">{{ item.title }}</span>
    </a-badge>
    <span class="title" v-else>{{ item.title }}</span>
    <span class="context">{{ item.context }}</span>
    <span class="created-time">{{ item.createdTime }}</span>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import moment from "moment";

const item = reactive({
  id: 1,
  title: 'Test',
  context: 'Test Context',
  createdTime: moment().format('YYYY-MM-DD HH:mm:SS'),
  isRead:false,
  type: 1,
})

</script>

<style scoped lang="scss">
@import "src/assets/common";

.item-wrapper {
  display: flex;
  flex-flow: column;
  transition: all .3s;
  padding: 5px;

  .title {
    font-size: 16px;
  }

  .context {
    font-size: 14px;
  }

  .created-time {
    font-size: 12px;
  }
}

.item-wrapper:hover {
  cursor: pointer;
  background: $background-hover-theme;
  transform: scale(1.05);

  .title {
    color: $text-hover-color;
  }
}

</style>