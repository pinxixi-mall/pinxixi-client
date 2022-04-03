<template>
    <div class="page">
        <van-nav-bar title="修改密码" left-arrow @click-left="onCancel" />
        <van-form class="reset-form" ref="formRef" validate-trigger="onSubmit" @submit="onSubmit">
            <van-field
                v-model="state.oldPassword"
                name="oldPassword"
                label="原密码"
                placeholder="原密码"
                :rules="[{ required: true, message: '请填写原密码' }]"
            />
            <van-field
                v-model="state.newPassword"
                type="password"
                name="password"
                label="新密码"
                placeholder="请填写新密码"
                :rules="[{ required: true, message: '请填写新密码' }]"
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
                <van-button round block type="primary" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script lang="ts">
import { resetPassword, updateUserInfo } from '@/api'
import { Toast } from 'vant'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const router = useRouter()
        const formRef = ref(null)
        const state = reactive({
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        })

        const rules = {
            confirmPassword: (val: string) => (val === state.newPassword ? true : '两次输入的密码不一致')
        }

        // 重置密码
        const onSubmit = async () => {
            const params = {
                oldPassword: state.oldPassword,
                newPassword: state.newPassword,
                confirmPassword: state.confirmPassword
            }
            const { msg } = await resetPassword(params)
            Toast.success(msg)
            router.replace('/login')
        }

        const onCancel = () => {
            router.go(-1)
        }

        return {
            state,
            formRef,
            rules,
            onSubmit,
            onCancel,
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
    .reset-form {
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