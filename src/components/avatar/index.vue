<template>
  <div class="avatar-wrapper">
    <a-dropdown trigger="hover">
      <a-avatar></a-avatar>
      <template #content>
        <a-doption>Option 1</a-doption>
        <a-doption>Option 2</a-doption>
        <a-doption>Option 3</a-doption>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.avatar-wrapper{
  margin-right: 10px;
  transition: all .3s;
}
.avatar-wrapper:hover{
  cursor: pointer;
  transform: scale(1.1);
}
</style>