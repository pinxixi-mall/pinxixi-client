<template>
    <div class="page">
        <van-nav-bar title="登录" left-arrow @click-left="$router.go(-1)">
            <template #right>
                <van-icon name="home-o" size="20" @click="$router.push('/home')" />
            </template>
        </van-nav-bar>
        <van-image class="logo" :src="logo" />
        <van-form class="login-form" ref="formRef" label-width="50px" validate-trigger="onSubmit" @submit="onSubmit">
            <van-field
                v-model="userName"
                name="userName"
                label="用户名"
                :rules="[{ required: true, message: '请输入用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                :rules="[{ required: true, message: '请输入密码' }]"
            />
            <van-field
                v-model="verifyCode"
                name="verifyCode"
                center
                clearable
                label="验证码"
                :rules="[{ required: true, message: '请输入验证码' },
                { validator: checkVerifyCode, message: '验证码不正确' }]"
            >
                <template #button>
                    <VerifyCode v-model="codeImgText" />
                </template>
            </van-field>
            <div class="submit-btn">
                <van-button round block type="primary" native-type="submit">登录</van-button>
                <van-button
                    round
                    block
                    type="primary"
                    plain
                    class="register-btn"
                    @click="onRegister"
                >注册</van-button>
            </div>
        </van-form>
    </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted, toRefs, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/index'
import { setToken } from '@/utils'
import logo from '@/assets/icons/pxx-logo.png'
import VerifyCode from '@/components/VerifyCode/index.vue'

export default defineComponent({
    components: {
        VerifyCode
    },
    setup() {
        const router = useRouter()
        const formRef = ref(null)
        const codeImgText = ref<any>(null)
        const state = reactive({
            userName: '',
            password: '',
            avatar: '',
            verifyCode: ''
        })

        onMounted(() => {
            setToken('')
        })

        // 登录
        const onSubmit = async (values: any) => {
            const { data: { token } } = await login(values)
            setToken(token)
            router.push('home')
        }

        // 注册
        const onRegister = async () => {
            router.push('register')
        }

        // 验证码校验
        const checkVerifyCode = (val: string) => val.toLowerCase() === codeImgText.value.toLowerCase()

        return {
            ...toRefs(state),
            logo,
            codeImgText,
            formRef,
            onSubmit,
            onRegister,
            checkVerifyCode
        }
    }
})

</script>

<style lang="less" scoped>
.page {
    width: 375px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .logo {
        width: 200px;
        margin: 50px auto;
    }
    .avatar {
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
