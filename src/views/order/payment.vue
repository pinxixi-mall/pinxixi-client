<template>
    <van-nav-bar
        class="nav-bar"
        title="支付结果"
        :border="false"
        fixed
        placeholder
        @click-left="$router.go(-1)"
    />
    <div class="top">
        <van-icon class="success-icon" name="completed" />
        <p class="success-text">支付成功</p>
        <div class="line"></div>
    </div>
    <van-cell-group inset class="order-info">
        <p class="order-price">
            <price :value="orderDetail.orderPrice" :font-size="16" />
        </p>
        <van-cell title="订单编号" :value="orderDetail.orderNo" />
        <van-cell title="下单时间" :value="orderDetail.createTime" />
        <van-cell title="支付方式" :value="getDictName(paymentTypeList, orderDetail.paymentType)" />
    </van-cell-group>
    <section class="bottom">
        <van-button block round @click="$router.push('/order/detail?orderId=' + orderId)">查看订单</van-button>
        <van-button
            type="primary"
            round
            block
            style="margin-top: 20px"
            @click="$router.push('/home')"
        >返回首页</van-button>
    </section>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { OrderDetail } from '@/types'
import { getOrder } from '@/api'
import { Dialog } from 'vant'
import { getDictName, isEmpty } from '@/utils'
import { paymentTypeList } from '@/config/dicts'
import { PRICE_DECIMAL } from '@/config/constants'
import Price from '@/components/Price'

interface stateType {
    orderId: number | null;
    orderDetail: Partial<OrderDetail>;
}

export default defineComponent({
    components: { Price },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const state = reactive<stateType>({
            orderId: null,
            orderDetail: {}
        })

        onMounted(() => {
            const { orderId } = route.query
            if (!isEmpty(orderId)) {
                state.orderId = Number(orderId)
                getOrderDetail()
            }
        })

        const getOrderDetail = async () => {
            try {
                const { data } = await getOrder(Number(state.orderId))
                state.orderDetail = data
            } catch (error) {
                Dialog.alert({
                    title: '订单不存在'
                }).then(() => router.push('/cart'))
            }
        }
        return {
            ...toRefs(state),
            paymentTypeList,
            PRICE_DECIMAL,
            getDictName
        }
    }
})
</script>

<style lang="less" scoped>
.nav-bar {
    :deep(.van-nav-bar) {
        background-color: var(--van-success-color);
        .van-nav-bar__title {
            color: #fff;
        }
    }
}
.top {
    text-align: center;
    padding: 30px 0;
    background-color: var(--van-success-color);
    .success-icon {
        font-size: 56px;
        color: #fff;
        margin-bottom: 20px;
    }
    .success-text {
        font-size: 16px;
        color: #fff;
    }
    .line {
        width: 90%;
        height: 14px;
        background-color: rgba(0, 0, 0, 0.3);
        margin: 20px auto 0;
        border-radius: 100px;
    }
}

.order-info {
    padding: 10px 0;
    margin: -38px 30px 0;
    border-radius: 0;
    box-shadow: inset 0 12px 12px -12px #333;
    .order-price {
        text-align: center;
        font-size: 30px;
        padding: 16px 0;
    }
    :deep(.van-cell__title) {
        flex: none;
        color: var(--van-cell-value-color);
    }
}

.bottom {
    margin: 50px 30px;
}
</style>
