<template>
    <van-nav-bar
        title="账号管理"
        left-arrow
        fixed
        placeholder
        z-index="2"
        @click-left="$router.go(-1)"
    />
    <section class="avatar">
        <van-uploader :max-count="1" :after-read="afterRead">
            <van-image class="avatar-img" width="90" height="90" :src="userInfo.avatar" v-if="userInfo.avatar" />
            <van-icon v-else class="default-icon" name="contact" />
        </van-uploader>
    </section>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                v-model="userInfo.userName"
                name="userName"
                label="用户名"
                placeholder="用户名"
                input-align="right"
                readonly
            />
            <van-field
                v-model="userInfo.nickName"
                name="nickName"
                label="昵称"
                placeholder="昵称"
                input-align="right"
            />
            <van-field
                v-model="userInfo.phone"
                name="phone"
                label="手机号"
                placeholder="手机号"
                input-align="right"
            />
            <van-field
                v-model="userInfo.email"
                name="email"
                label="邮箱"
                placeholder="邮箱"
                input-align="right"
            />
        </van-cell-group>
        <div style="margin: 30px 16px">
            <van-button round block native-type="submit">保存</van-button>
            <van-button round block style="margin-top: 10px;" to="/mine/reset-pwd">修改密码</van-button>
        </div>
    </van-form>
</template>

<script lang="ts">
import { UserInfo } from '@/types'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { ref } from 'vue'
import { getUserInfo, updateUserInfo, uploadFile } from '@/api'

export default defineComponent({
    setup() {
        const state = reactive<{
            userInfo: Partial<UserInfo>
        }>({
            userInfo: {}
        })

        onMounted(() => {
            getUser()
        })

        const getUser = async () => {
            const { data } = await getUserInfo()
            state.userInfo = data
        }

        const afterRead = async (value: any) => {
            const file = new FormData()
            file.append('file', value.file)
            const { data: {url} } = await uploadFile(file)
            state.userInfo.avatar = url
            await updateUserInfo(state.userInfo)
        }

        const onSubmit = async (values: any) => {
            console.log('submit', values);
            await updateUserInfo(values)
        }

        return {
            ...toRefs(state),
            afterRead,
            onSubmit,
        }
    },

})
</script>

<style scoped lang="less">
.avatar {
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--van-blue);
    margin-bottom: 16px;
    .default-icon{
        width: 90px;
        height: 90px;
        line-height: 90px;
        text-align: center;
        font-size: 42px;
        color: var(--van-gray-6);
        border-radius: 80px;
        background-color: var(--van-gray-3);
    }
    .avatar-img{
        border-radius: 80px;
        overflow: hidden;
    }
}
</style>