<template>
  <div class="page">
    <!-- <van-image round class="logo" :src="logo" /> -->
    <van-form @submit="onSubmit" class="login-form" ref="formRef">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="请输入"
        :rules="[{ required: true, message: '请输入用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <van-field
        v-model="verifyCode"
        center
        clearable
        label="验证码"
        placeholder="请输入"
        :rules="[{ required: true, message: '请输入验证码' }, 
        { validator: checkVerifyCode, message: '验证码不正确'}]"
      >
        <template #button>
          <VerifyCode v-model="codeImgText" />
        </template>
      </van-field>
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
import { ref, reactive, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/index'
import { setToken } from '@/utils/utils'
import logo from '@/assets/icons/logo.png'
import VerifyCode from '@/components/VerifyCode/index.vue'

const Login = {
  components: {
    VerifyCode
  },
  setup() {
    const router = useRouter()
    const formRef = ref(null)
    const codeImgText = ref(null)
    const state = reactive({
      username: null,
      password: null,
      avater: null,
      verifyCode: null
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

    // 验证码校验
    const checkVerifyCode = (val) => val.toLowerCase() === codeImgText.value.toLowerCase()

    return {
      logo,
      ...toRefs(state),
      onSubmit,
      formRef,
      onRegister,
      codeImgText,
      checkVerifyCode
    }
  }
}

export default Login
</script>

<style lang="less" scoped>
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
