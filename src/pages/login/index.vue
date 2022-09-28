<template>
  <div class="main-wrapper">
    <div class="logo-wrapper">
      <a-image src="/src/assets/logo.png" :preview="false" width="256" height="256" fit="contain"></a-image>
    </div>
    <div class="login-wrapper">
      <a-form :model="loginForm" auto-label-width>
        <a-form-item label="Username" show-colon>
          <a-input v-model:model-value="loginForm.username"></a-input>
        </a-form-item>
        <a-form-item label="Password" show-colon>
          <a-input v-model:model-value="loginForm.password"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleLogin">Login</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import _ from 'lodash'
import {reactive} from "vue";
import {TOKEN_KEY} from '@/common/index.js'
import {Message} from '@arco-design/web-vue'
import router from "@/router/index.js";

const loginForm = reactive({
  username:'123',
  password: '123'
})

const handleLogin = () => {
  sessionStorage.setItem(TOKEN_KEY,'111')
  router.push('/')
  Message.success({
    content: 'Login success'
  })
}

</script>

<style scoped lang="scss">
.main-wrapper{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  .login-wrapper{
    width: 25%;
  }
}

</style>