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
            <van-image class="avatar-img" width="80" height="80" :src="avatar" v-if="avatar" />
            <van-icon v-else class="default-icon" name="contact" />
        </van-uploader>
    </section>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                v-model="userName"
                name="userName"
                label="用户名"
                placeholder="用户名"
                input-align="right"
                :rules="[{ required: true, message: '用户名不能为空' }]"
            />
            <van-field
                v-model="nickName"
                name="nickName"
                label="昵称"
                placeholder="昵称"
                input-align="right"
            />
            <van-field
                v-model="phone"
                name="phone"
                label="手机号"
                placeholder="手机号"
                input-align="right"
            />
            <van-field
                v-model="email"
                name="email"
                label="邮箱"
                placeholder="邮箱"
                input-align="right"
            />
        </van-cell-group>
        <div style="margin: 30px 16px">
            <van-button round block native-type="submit">保存</van-button>
            <van-button round block style="margin-top: 10px;">修改密码</van-button>
        </div>
    </van-form>
</template>

<script lang="ts">
import { UserInfo } from '@/types'
import { defineComponent, reactive, toRefs } from 'vue'
import { ref } from 'vue'
import { updateUserInfo } from '@/api'

export default defineComponent({
    setup() {
        const userInfo = reactive<Partial<UserInfo>>({
            avatar: '',
            userName: '',
            nickName: '',
            phone: '',
            email: ''
        })
        const afterRead = (file: any) => {
            // 此时可以自行将文件上传至服务器
            userInfo.avatar = file.content

            console.log(file);
        };

        const onSubmit = async (values: any) => {
            console.log('submit', values);
            await updateUserInfo(values)
        };

        return {
            ...toRefs(userInfo),
            afterRead,
            onSubmit,
        };
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
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
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