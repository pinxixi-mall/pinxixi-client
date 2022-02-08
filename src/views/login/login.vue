<template>
  <div class="page">
    <van-image round class="logo" :src="logo" />
    <van-form @submit="onSubmit" class="login-form" ref="formRef">
      <van-field
        v-model="state.username"
        name="username"
        label="用户名"
        placeholder="请填写用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="state.password"
        type="password"
        name="password"
        label="密码"
        placeholder="请填写密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="submit-btn">
        <van-button round block type="primary" native-type="submit"> 登录 </van-button>
        <van-button round block type="primary" plain class="register-btn" @click="onRegister">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted, DefineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/index'
import { setToken } from '@/utils/utils'
import logo from '@/assets/icons/logo.png'

const Login = {
  setup() {
    const router = useRouter()
    const formRef = ref(null)
    const state = reactive({
      username: '',
      password: '',
      avater: ''
    })

    onMounted(() => {
      setToken('')
    })

    // 登录
    const onSubmit = async (values: any) => {
      const params = {
        username: state.username,
        password: state.password
      }
      const { data: { userInfo, token } } = await login(params)
      state.avater = userInfo.avater
      setToken(token)
      router.push('home')
    }

    // 注册
    const onRegister = async () => {
      router.push('register')
    }

    return {
      logo,
      state,
      onSubmit,
      formRef,
      onRegister
    }
  }
}

export default Login
</script>

<style lang="less">
.page {
  width: 375px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .logo {
    width: 80px;
    height: 80px;
    padding: 20px;
    margin: 80px auto 50px;
    background: #eee;
  }
  .avater {
    font-size: 90px;
    color: #f35517;
  }
  .login-form {
    padding: 0 30px;
    .submit-btn {
      margin-top: 50px;
    }
    .register-btn {
      margin-top: 20px;
      border-color: #ccc;
      color: #666;
    }
  }
}
</style>
