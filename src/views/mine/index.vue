<template>
    <section class="user-card">
        <div class="info" @click="$router.push('/mine/account')">
            <van-image
                class="avatar"
                round
                width="60"
                height="60"
                :src="userInfo?.avatar"
            />
            <div>
                <p class="name">{{userInfo?.nickName || userInfo?.userName}}</p>
                <p class="phone" v-if="userInfo?.phone">{{userInfo?.phone}}</p>
            </div>
        </div>
        <ul class="list">
            <li v-for="item in list" :key="item.value">
                <p class="value">{{ item.value }}</p>
                <p class="label">
                    <van-icon class="icon" :name="item.icon" />
                    <span>{{ item.label }}</span>
                </p>
            </li>
        </ul>
    </section>
    <van-cell-group inset class="my-order card">
        <van-cell title="我的订单" value="全部订单" is-link @click="navToOrderList(99)" />
        <van-grid :border="false">
            <van-grid-item icon="pending-payment" text="待付款" @click="navToOrderList(0)"/>
            <van-grid-item icon="send-gift-o" text="待收货" @click="navToOrderList(1)" />
            <van-grid-item icon="comment-o" text="待评价" />
            <van-grid-item icon="after-sale" text="退款/售后" />
        </van-grid>
    </van-cell-group>
    <van-cell-group inset class="address card">
        <van-cell title="地址管理" to="/mine/address" is-link />
    </van-cell-group>
    <van-cell-group inset class="account card">
        <van-cell title="账号管理" to="/mine/account" is-link />
    </van-cell-group>
    <van-button class="logout-btn" round block @click="onLogout">退出登录</van-button>
</template>
<script lang="ts">
import { getUserInfo, logout } from '@/api'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserInfo } from '@/types'
import { setToken } from '@/utils'
import { Dialog } from 'vant'

export default defineComponent({
    name: "demo",
    setup() {
        const userInfo = ref<UserInfo>()
        const list = ref([
            { label: '商品收藏', value: 16, icon: 'star-o' },
            { label: '红包卡券', value: 6, icon: 'cash-on-deliver' },
            { label: '浏览记录', value: 61, icon: 'clock-o' },
        ])
        const router = useRouter()

        onMounted(() => {
            getUser()
        })

        // 获取用户信息
        const getUser = async () => {
            const { data } = await getUserInfo({ noLoading: true })
            userInfo.value = data
        }

        // 退出登录
        const onLogout = async () => {
            await Dialog.confirm({
                title: '确认退出登录？'
            })
            await logout()
            setToken('')
            router.push('/home')
        }

        // 去订单列表
        const navToOrderList = (status: number) => {
            router.push(`/order/list/${status}`)
        }

        return {
            list,
            userInfo,
            navToOrderList,
            onLogout
        }
    },
})
</script>

<style lang="less" scoped>
.user-card {
    padding: 20px 20px 60px;
    background: linear-gradient(to top, #ff6034, #ee0a24);
    .info {
        display: flex;
        color: var(--van-gray-1);
        align-items: center;
        .avatar {
            margin-right: 16px;
        }
        .name {
            font-size: 18px;
        }
        .phone {
            color: var(--van-gray-3);
            font-size: 14px;
            margin-top: 8px;
        }
    }
    .list {
        display: flex;
        justify-content: space-around;
        margin-top: 24px;
        li {
            flex: 1;
            text-align: center;
            .value {
                color: var(--van-gray-1);
                font-size: 16px;
                margin-bottom: 8px;
            }
            .label {
                display: flex;
                justify-content: center;
                align-items: center;
                color: var(--van-gray-3);
            }
            .icon {
                font-size: 16px;
                margin-right: 4px;
            }
        }
    }
}

.card{
    margin: 16px;
}
.my-order{
    margin-top: -30px;
}

.logout-btn{
    width: 90%;
    margin: 30px auto;
}
</style>