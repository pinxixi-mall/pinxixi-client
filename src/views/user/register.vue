<template>
  <div class="page">
    <van-nav-bar title="注册" left-arrow @click-left="onCancel" />
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
      <van-field
        v-model="state.confirmPassword"
        type="password"
        name="password"
        label="确认密码"
        placeholder="请再次输入密码"
        :rules="[{ validator: rules.confirmPassword, message: '请再次输入密码' }]"
      />
      <div class="submit-btn">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
        <van-button round block type="primary" plain class="register-btn" @click="onCancel">
          取消
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted, DefineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/api/index'
import { Toast } from 'vant'

const Register = {
  setup() {
    const router = useRouter()
    const formRef = ref(null)
    const state = reactive({
      username: '',
      password: '',
      confirmPassword: ''
    })

    const rules = {
      confirmPassword: (val: string) => (val === state.password ? true : '两次输入的密码不一致')
    }

    onMounted(() => {})

    // 注册
    const onSubmit = async () => {
      const params = {
        username: state.username,
        password: state.password
      }
      const { code } = await register(params)
      Toast('注册成功')
      onCancel()
    }

    const onCancel = () => {
      router.go(-1)
    }

    return {
      state,
      onSubmit,
      formRef,
      onCancel,
      rules
    }
  }
}

export default Register
</script>

<style lang="less">
.page {
  width: 375px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .login-form {
    margin-top: 50px;
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
