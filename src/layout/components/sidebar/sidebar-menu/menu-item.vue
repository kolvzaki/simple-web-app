<template>
  <div class="item-wrapper">
    <a-sub-menu v-if="!_.isEmpty(props.route.children)" :key="props.route.path">
      <template #title>
        {{props.route.name}}
      </template>
      <menu-item v-for="item of props.route.children" :route="item"></menu-item>
    </a-sub-menu>
    <a-menu-item v-else :key="props.route.path" @click="gotoCurrentRoute">
      {{props.route.name}}
    </a-menu-item>
  </div>
</template>

<script setup>
import router from "@/router/index.js";
import _ from 'lodash'

const props = defineProps({
  route:{
    type:Object,
    default:{
      name: '',
      path: '',
      redirect: undefined,
      meta:{
        hidden: false,
        icon: '',
        roles: []
      },
      children:{
        type:[Array,undefined],
        default: undefined
      }
    }
  }
})
const gotoCurrentRoute = () => {
  router.push(props.route.path)
}



</script>

<style scoped>

</style>