<template>
  <a-modal v-model:visible="dialogConfig.visible" v-model:title="dialogConfig.title">

  </a-modal>
</template>

<script setup>

import {inject} from "vue";
const dialogConfig = inject('dialogConfig')

</script>

<style scoped>

</style>