<template>
    <van-nav-bar title="确认订单" left-arrow fixed placeholder @click-left="$router.go(-1)"></van-nav-bar>
    <!-- 地址 -->
    <section class="order-address">
        <van-cell v-if="addressInfo.addressId" is-link icon="location-o" :to="'/mine/address?id=' + addressInfo.addressId">
            <template #title>
                <p>{{addressInfo.fullAddress}}</p>
            </template>
            <template #label>
                <p>{{addressInfo.name}} {{addressInfo.tel}}</p>
            </template>
        </van-cell>
        <van-cell v-else is-link title="添加收货地址" icon="add-square" to="/mine/address" />
    </section>

    <!-- 订单内容 -->
    <Card class="order-content card">
        <goods-card
            class="order-goods"
            v-for="goods in goodsList"
            :key="goods.goodsId"
            :goods="goods"
        >
            <template #stepper>
                <p class="count">x{{ goods.goodsCount }}</p>
            </template>
        </goods-card>
    </Card>
    <!-- 订单总计 -->
    <van-cell-group inset class="order-cost">
        <van-cell title="商品金额" :value="goodsPrice" />
        <van-cell title="运费" value="￥0.00" />
        <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
        <div class="total">
            <span class="label">合计：</span>
            <span class="value price">{{totalPrice}}</span>
        </div>
    </van-cell-group>
    <!-- 备注 -->
    <van-cell-group inset class="payment-type card">
        <van-cell title="备注" value="选填" />
    </van-cell-group>
    <!-- 提交 -->
    <van-submit-bar
        :price="Number(totalPrice) * 100"
        label=" "
        button-text="提交订单"
        text-align="left"
        @submit="onConfirm"
    />
    <!-- submitbar占位 -->
    <div style="height: 50px;"></div>

    <!-- 优惠券列表 -->
    <van-popup
        v-model:show="showList"
        round
        position="bottom"
        style="height: 70%; padding-top: 4px;"
    >
        <van-coupon-list
            :show-exchange-bar="false"
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            @change="onChange"
        />
    </van-popup>
</template>

<script lang="ts">
import { Address, CartItemType } from "@/types";
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from "vue"
import GoodsCard from '@/components/GoodsCard/index.vue'
import Card from '@/components/Card/index.vue'
import { useRoute, useRouter } from "vue-router"
import { PRICE_DECIMAL } from "@/config/constants"
import { getCartListByIds, createOrder } from '@/api'
import { Dialog, Toast } from "vant"
import coupon from "@/config/coupon"
import { getCurrentAddress } from "@/utils/addressUtils";

export default defineComponent({
    components: { GoodsCard, Card },
    setup() {
        const state = reactive<{
            addressInfo: Partial<Address>,
            goodsList: CartItemType[],
        }>({
            addressInfo: {},
            goodsList: [],
        })
        const router = useRouter()
        const route = useRoute()
        let cartIds: string

        onMounted(async () => {
            const { ids, addressId } = route.query
            if (ids) {
                // 获取购物车商品
                cartIds = ids.toString()
                getGoods()
            }
            // 获取地址信息
            const data = await getCurrentAddress(addressId)
            state.addressInfo = data
        })

        const getGoods = async () => {
            const { data } = await getCartListByIds({ cartIds })
            if (!data || !data.length) {
                Dialog.alert({
                    title: '订单不存在',
                }).then(() => {
                    router.replace('/cart')
                })
            }
            state.goodsList = data
        }

        // 商品金额
        const goodsPrice = computed(() => state.goodsList.reduce((ret, it) => ret + it.goodsCount * it.goodsPrice, 0).toFixed(PRICE_DECIMAL))
        // 优惠金额
        const couponValue = computed(() => chosenCoupon.value > -1 ? coupons.value[chosenCoupon.value].value / 100 : 0)
        // 总金额
        const totalPrice = computed(() => {
            return (Number(goodsPrice.value) - couponValue.value).toFixed(PRICE_DECIMAL)
        })

        // 确认提交
        const onConfirm = async () => {
            if (!state.addressInfo.addressId) {
                Toast('还没有添加收货地址哦')
                return
            }
            const { data } = await createOrder({
                cartIds: state.goodsList.map(it => it.cartId),
                orderCoupon: couponValue.value,
                addressId: state.addressInfo.addressId
            })
            if(data && data.orderId) {
                router.push({
                    path: '/order/detail',
                    query: { orderId: data.orderId }
                })
            }
        }

        /**
         * 优惠券
         */
        const coupons = ref<any[]>(coupon)
        const showList = ref(false)
        const chosenCoupon = ref(-1)
        const onChange = (index: number) => {
            showList.value = false
            chosenCoupon.value = index
        }

        return {
            ...toRefs(state),
            coupons,
            showList,
            chosenCoupon,
            goodsPrice,
            totalPrice,
            onChange,
            onConfirm
        }
    },
})
</script>

<style lang="less" scoped>
.order-address {
    position: relative;
    padding: 4px 0;
    background-color: #fff;
    :deep(.van-cell){
        background-color: #fff;
        .van-icon-add-square{
            color: var(--van-primary-color);
            font-size: 20px;
            margin-right: 10px;
        }
    }
    &::before {
        position: absolute;
        right: 8px;
        bottom: -2px;
        left: 8px;
        height: 2px;
        background: repeating-linear-gradient(
            -45deg,
            var(--van-warning-color) 0,
            var(--van-warning-color) 20%,
            transparent 0,
            transparent 25%,
            var(--van-blue) 0,
            var(--van-blue) 45%,
            transparent 0,
            transparent 50%
        );
        background-size: 80px;
        content: "";
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
    }
}

</style>