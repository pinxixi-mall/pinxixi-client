<template>
    <van-nav-bar title="订单详情" left-arrow fixed placeholder @click-left="onBackClick" />
    <section class="order-status">
        <div class="left">
            <p class="status">{{getDictName(orderStatusList, orderDetail.orderStatus)}}</p>
            <p class="desc" v-if="isToBePaid">
                <span>订单将在</span>
                <van-count-down class="count-down" :time="remainTime" />
                <span>后关闭，请及时支付</span>
            </p>
        </div>
        <van-icon class="icon" name="paid" />
    </section>
    <section class="order-address card">
        <van-cell is-link icon="location-o">
            <template #title>
                <p>{{addressInfo.fullAddress}}</p>
            </template>
            <template #label>
                <p>{{addressInfo.name}} {{addressInfo.tel}}</p>
            </template>
        </van-cell>
    </section>
    <!-- 订单内容 -->
    <Card class="order-content card">
        <goods-card
            class="order-goods"
            v-for="goods in orderDetail.goodsList"
            :key="goods.goodsId"
            :goods="goods"
        >
            <template #stepper>
                <p class="count">x{{ goods.goodsCount }}</p>
            </template>
        </goods-card>
    </Card>
    <!-- 商品金额 -->
    <van-cell-group inset class="order-cost">
        <van-cell title="商品金额" :value="'￥' + totalGoodsPrice" />
        <van-cell title="优惠金额" :value="'￥' + orderDetail.orderCoupon" />
        <van-cell title="运费" value="￥0.00" />
        <div class="total">
            <span class="label">合计：</span>
            <price class="value" :value="orderDetail.orderPrice" />
        </div>
    </van-cell-group>
    <!-- 支付方式 -->
    <van-cell-group inset class="payment-way card">
        <van-cell title="支付方式" />
        <van-radio-group v-model="orderDetail.paymentType">
            <van-cell-group class="cell" inset>
                <van-cell class="ali" title="支付宝" icon="alipay">
                    <template #right-icon>
                        <van-radio :name="1" :disabled="orderDetail.orderStatus !== 0"/>
                    </template>
                </van-cell>
                <van-cell class="weixin" title="微信" icon="wechat">
                    <template #right-icon>
                        <van-radio :name="2" :disabled="orderDetail.orderStatus !== 0" />
                    </template>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </van-cell-group>
    <!-- 发票 -->
    <van-cell-group inset class="payment-type card">
        <van-cell title="发票" value="不开发票" is-link />
    </van-cell-group>
    <!-- 订单明细 -->
    <van-cell-group inset class="order-detail card" :border="false">
        <van-cell title="下单时间" :value="orderDetail.createTime" />
        <van-cell title="订单编号" :value="orderDetail.orderNo">
            <template #right-icon>
                <span style="font-size: 12px;color: var(--van-blue);margin-left: 6px;">复制</span>
            </template>
        </van-cell>
    </van-cell-group>
    <!-- 提交支付 -->
    <van-submit-bar v-if="isToBePaid" button-text="立即支付" @submit="onSubmit" />
    <!-- 占位 -->
    <div style="height: 50px;" ></div>
</template>

<script lang="ts">
import { Address, OrderGoods } from "@/types";
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from "vue"
import GoodsCard from '@/components/GoodsCard/index.vue'
import Card from '@/components/Card/index.vue'
import { useRoute, useRouter } from "vue-router"
import { getOrder, updateOrder } from '@/api'
import { getDictName } from "@/utils"
import { orderStatusList } from "@/config/dicts"
import { Dialog, Toast } from "vant"
import { UpdateOrder, OrderDetail } from '@/types'
import Price from '@/components/Price'
import { getCurrentAddress } from "@/utils/addressUtils";

export default defineComponent({
    components: { GoodsCard, Card, Price },
    setup() {
        const state = reactive<{
            orderId: number;
            orderDetail: Partial<OrderDetail>;
            addressInfo: Partial<Address>,
        }>({
            orderId: -1,
            orderDetail: {},
            addressInfo: {}
        })
        const route = useRoute()

        const remainTime = ref(15 * 60 * 60 * 1000)
        // 待支付
        const isToBePaid = computed(() => state.orderDetail.orderStatus === 0)
        // 状态栏背景色
        const statusBgColor = computed(() => {
            const colors: Record<number, string> = {
                0: '#ff976a', // 待支付
                1: '#1989fa', // 待发货
                2: '#07c160', // 交易成功
            }
            const status = state.orderDetail.orderStatus
            return colors[Number(status)] || '#ccc'
        })

        onMounted(() => {
            const { orderId } = route.query
            state.orderId = Number(orderId)
            if (orderId) {
                getOrderDetail()
            }
        })

        const getOrderDetail = async () => {
            try {
                const { data } = await getOrder(state.orderId)
                state.orderDetail = data
                // 获取地址信息
                const address = await getCurrentAddress(data.addressId)
                state.addressInfo = address
            } catch (error) {
                Dialog.alert({
                    title: "订单不存在"
                }).then(() => router.push("/cart"))
            }
        }

        const totalGoodsPrice = computed(() => {
            return state.orderDetail.goodsList && state.orderDetail.goodsList.reduce((ret: number, it: OrderGoods) => ret + it.goodsPrice * it.goodsCount, 0)
        })

        const router = useRouter()
        const onSubmit = async () => {
            if (!state.orderDetail.paymentType) {
                Toast("请选择支付方式")
                return
            }
            const param: UpdateOrder = {
                orderId: state.orderId,
                orderStatus: 1,
                paymentStatus: 1,
                paymentType: state.orderDetail.paymentType
            }
            await updateOrder(param)
            Toast.success('支付成功！')
            router.push({
                path: '/order/payment',
                query: { orderId: state.orderId }
            })
        }

        const onBackClick = () => {
            if (state.orderDetail.orderStatus === 0) {
                // 待支付订单返回提示
                Dialog.confirm({
                    title: '订单还没支付哦，确认返回？',
                    cancelButtonText: '返回支付',
                    confirmButtonText: '稍后支付',
                    confirmButtonColor: 'black',
                    cancelButtonColor: '#ee0a24'
                }).then(() => {
                    router.push('/cart')
                })
            }
        }

        return {
            ...toRefs(state),
            remainTime,
            totalGoodsPrice,
            orderStatusList,
            isToBePaid,
            statusBgColor,
            onSubmit,
            getDictName,
            onBackClick
        }
    },
})
</script>

<style lang="less" scoped>
.order-status {
    height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    color: #fff;
    background-color: v-bind(statusBgColor);
    .status {
        font-size: 20px;
        margin-bottom: 4px;
    }
    .desc {
        font-size: 12px;
        display: flex;
        align-items: center;
        .count-down{
            width: 60px;
            margin: 0 2px;
            font-weight: 500;
            color: var(--van-danger-color);
        }
    }
    .icon {
        font-size: 42px;
    }
}
.order-address {
    position: relative;
    :deep(.van-cell) {
        background-color: #fff;
    }
}

.card {
    margin: 16px;
}

.order-content {
    box-sizing: border-box;
    border-radius: var(--van-border-radius-lg);
    .order-goods {
        :deep(.van-card) {
            padding: 10px 0;
        }
        .count {
            line-height: 30px;
        }
    }
    .order-goods + .order-goods {
        border-top: 1px solid var(--van-border-color);
    }
}

.order-cost {
    .total {
        text-align: right;
        padding: 16px;
        .label {
            font-size: 14px;
        }
        .value {
            color: var(--);
        }
    }
}

.payment-way {
    .cell {
        :deep(.van-cell) {
            padding: var(--van-cell-vertical-padding) 0;
        }
        .ali {
            :deep(.van-icon-alipay) {
                font-size: 26px;
                color: #326bf4;
            }
        }
        .weixin {
            :deep(.van-icon-wechat) {
                font-size: 26px;
                color: #4eaf67;
            }
        }
    }
}

.order-detail {
    :deep(.van-cell){
        justify-content: space-between;
    }
    :deep(.van-cell__title) {
        color: var(--van-cell-value-color);
    }
    :deep(.van-cell__value) {
        flex: 2;
    }
}
</style>