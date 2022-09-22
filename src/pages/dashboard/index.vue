<template>
  <div class="wrapper">
    dash board
  </div>
</template>

<script setup>
import _ from 'lodash'
import {onMounted, ref} from "vue";
//fetch route data from db according to user permissions
const routeStruct = ref([
  {
    id: 1,
    pid: null,
    path: '/dashboard',
    name: 'dashboard',
    permissions: [],
    icon: '',
    hidden: false
  },
  {
    id: 2,
    pid: null,
    path: '/menu-item',
    name: 'Menu Item',
    permissions: [],
    icon: '',
    hidden: false
  },
])

const generateRouteTree = (routeList = ref([])) => {
  let routeTree = []
  let outLayerRoutes = _.filter(routeList.value, (route)=>{
    return _.isNull(route.pid)
  })
  _.concat(routeTree, outLayerRoutes)

}

onMounted(() => {
  generateRouteTree(routeStruct)
})
</script>

<style scoped lang="scss">

</style>